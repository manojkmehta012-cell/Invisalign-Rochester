from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
from pydantic import BaseModel, Field, ConfigDict, BeforeValidator, field_validator
from typing import Annotated, List, Optional
import os
import re
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


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
