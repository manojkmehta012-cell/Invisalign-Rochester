from fastapi import FastAPI, APIRouter, HTTPException, UploadFile, File, Response
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
from pydantic import BaseModel, Field, ConfigDict, BeforeValidator, field_validator
from typing import Annotated, List, Optional
import os
import re
import requests
import logging
import uuid
from datetime import datetime, timezone
from pathlib import Path


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

app = FastAPI()
api_router = APIRouter(prefix="/api")


def _coerce_object_id(v):
    if isinstance(v, uuid.UUID):
        return str(v)
    if isinstance(v, str) and v:
        return v
    return str(v)


PyObjectId = Annotated[str, BeforeValidator(_coerce_object_id)]


class BaseDocument(BaseModel):
    model_config = ConfigDict(populate_by_name=True)

    id: Optional[PyObjectId] = Field(default=None, alias="_id")

    def to_mongo(self):
        d = self.model_dump(by_alias=True, exclude_none=True)
        if not d.get("_id"):
            d.pop("_id", None)
        return d

    @classmethod
    def from_mongo(cls, doc):
        return cls.model_validate(doc)


class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")

    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class StatusCheckCreate(BaseModel):
    client_name: str


ALLOWED_TREATMENTS = {
    "Cosmetic Dentistry",
    "Invisalign",
    "Teeth Whitening",
    "Composite Bonding",
    "Veneers",
    "Smile Makeover",
}


class LeadCreate(BaseModel):
    name: str = Field(min_length=2, max_length=120)
    mobile: str = Field(min_length=7, max_length=25)
    email: str = Field(min_length=5, max_length=160)
    message: str = Field(default="", max_length=2000)
    treatment: str = Field(default="Invisalign", max_length=60)
    location: str = Field(default="Rochester", max_length=60)
    source: str = Field(default="invisalign-landing", max_length=60)

    @field_validator("mobile")
    @classmethod
    def validate_mobile(cls, v):
        digits = re.sub(r"[ \-\(\)]", "", v)
        if not re.fullmatch(r"\+?\d{7,15}", digits):
            raise ValueError("Please enter a valid mobile number")
        return digits

    @field_validator("email")
    @classmethod
    def validate_email(cls, v):
        if not re.fullmatch(r"[^@\s]+@[^@\s]+\.[^@\s]+", v):
            raise ValueError("Please enter a valid email address")
        return v.strip().lower()

    @field_validator("treatment")
    @classmethod
    def validate_treatment(cls, v):
        if v not in ALLOWED_TREATMENTS:
            raise ValueError("Please choose a treatment from the list")
        return v


class Lead(BaseDocument):
    name: str
    mobile: str
    email: str
    message: str = ""
    treatment: str = "Invisalign"
    location: str = "Rochester"
    source: str = "invisalign-landing"
    status: str = "new"
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


@api_router.get("/")
async def root():
    return {"message": "Hello World"}


@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_obj = StatusCheck(**input.model_dump())
    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    _ = await db.status_checks.insert_one(doc)
    return status_obj


@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    for check in status_checks:
        if isinstance(check['timestamp'], str):
            check['timestamp'] = datetime.fromisoformat(check['timestamp'])
    return status_checks


@api_router.post("/leads")
async def create_lead(input: LeadCreate):
    lead = Lead(**input.model_dump())
    res = await db.leads.insert_one(lead.to_mongo())
    return {
        "ok": True,
        "id": str(res.inserted_id),
        "message": "Enquiry received",
    }


@api_router.get("/leads", response_model=List[Lead])
async def get_leads():
    docs = await db.leads.find().sort("created_at", -1).to_list(200)
    return [Lead.from_mongo(d) for d in docs]


@api_router.post("/upload")
async def upload(file: UploadFile = File(...)):
    content_type = file.content_type or "application/octet-stream"
    if content_type not in ALLOWED_UPLOAD_TYPES:
        raise HTTPException(status_code=415, detail="File type not allowed. Upload images (JPEG, PNG, GIF, WebP) or videos (MP4, MOV).")
    data = await file.read()
    if len(data) > MAX_UPLOAD_BYTES:
        raise HTTPException(status_code=413, detail="File too large. Maximum size is 60MB.")
    ext = file.filename.rsplit(".", 1)[-1].lower() if file.filename and "." in file.filename else "bin"
    ext = ext if ext in MIME_TYPES else "bin"
    path = f"{APP_NAME}/uploads/{uuid.uuid4()}.{ext}"
    try:
        result = put_object(path, data, content_type)
    except requests.exceptions.HTTPError as e:
        logger.error(f"Storage upload failed: {e}")
        raise HTTPException(status_code=502, detail="Media storage upload failed. Please try again.")
    record = {
        "id": str(uuid.uuid4()),
        "storage_path": result["path"],
        "original_filename": file.filename,
        "content_type": content_type,
        "size": result.get("size", len(data)),
        "is_deleted": False,
        "created_at": datetime.now(timezone.utc).isoformat(),
    }
    await db.files.insert_one(record)
    return {
        "ok": True,
        "path": result["path"],
        "size": record["size"],
        "url": f"/api/files/{result['path']}",
    }


@api_router.get("/files")
async def list_files():
    docs = await db.files.find({"is_deleted": False}).sort("created_at", -1).to_list(1000)
    return [
        {
            "id": d.get("id"),
            "path": d.get("storage_path"),
            "original_filename": d.get("original_filename"),
            "content_type": d.get("content_type"),
            "size": d.get("size"),
            "created_at": d.get("created_at"),
            "url": f"/api/files/{d.get('storage_path')}",
        }
        for d in docs
    ]


@api_router.get("/files/{path:path}")
async def download(path: str):
    record = await db.files.find_one({"storage_path": path, "is_deleted": False})
    if not record:
        raise HTTPException(status_code=404, detail="File not found")
    try:
        data, content_type = get_object(path)
    except requests.exceptions.HTTPError as e:
        logger.error(f"Storage download failed: {e}")
        raise HTTPException(status_code=502, detail="Media storage download failed.")
    return Response(content=data, media_type=record.get("content_type") or content_type)


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# Object storage (Emergent integrations)
STORAGE_BASE = (os.environ.get("INTEGRATION_PROXY_URL") or "").strip() or "https://integrations.emergentagent.com"
STORAGE_URL = STORAGE_BASE.rstrip("/") + "/objstore/api/v1/storage"
EMERGENT_KEY = os.environ.get("EMERGENT_LLM_KEY")
APP_NAME = "gm-dental"
storage_key = None

MIME_TYPES = {
    "jpg": "image/jpeg", "jpeg": "image/jpeg", "png": "image/png",
    "gif": "image/gif", "webp": "image/webp", "pdf": "application/pdf",
    "mp4": "video/mp4", "mov": "video/quicktime", "m4v": "video/mp4",
}
ALLOWED_UPLOAD_TYPES = {
    "image/jpeg", "image/png", "image/gif", "image/webp",
    "video/mp4", "video/quicktime",
}
MAX_UPLOAD_BYTES = 60 * 1024 * 1024


def init_storage(force: bool = False):
    global storage_key
    if storage_key and not force:
        return storage_key
    if not EMERGENT_KEY:
        raise RuntimeError("EMERGENT_LLM_KEY not configured")
    resp = requests.post(f"{STORAGE_URL}/init", json={"emergent_key": EMERGENT_KEY}, timeout=30)
    resp.raise_for_status()
    storage_key = resp.json()["storage_key"]
    logger.info("Object storage initialized")
    return storage_key


def put_object(path: str, data: bytes, content_type: str) -> dict:
    key = init_storage()
    resp = requests.put(
        f"{STORAGE_URL}/objects/{path}",
        headers={"X-Storage-Key": key, "Content-Type": content_type},
        data=data,
        timeout=120,
    )
    if resp.status_code == 404:
        key = init_storage(force=True)
        resp = requests.put(
            f"{STORAGE_URL}/objects/{path}",
            headers={"X-Storage-Key": key, "Content-Type": content_type},
            data=data,
            timeout=120,
        )
    resp.raise_for_status()
    return resp.json()


def get_object(path: str):
    key = init_storage()
    resp = requests.get(f"{STORAGE_URL}/objects/{path}", headers={"X-Storage-Key": key}, timeout=60)
    if resp.status_code == 404:
        key = init_storage(force=True)
        resp = requests.get(f"{STORAGE_URL}/objects/{path}", headers={"X-Storage-Key": key}, timeout=60)
    resp.raise_for_status()
    return resp.content, resp.headers.get("Content-Type", "application/octet-stream")


@app.on_event("startup")
async def startup():
    try:
        init_storage()
    except Exception as e:
        logger.error(f"Storage init failed: {e}")


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
