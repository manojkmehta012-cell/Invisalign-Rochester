# PRD — GM Dental & Implant Centre: Cosmetic Dentistry + Invisalign Landing Page

## Original Problem Statement
Build a premium, human-centred, conversion-focused landing page for GM Dental & Implant Centre (Rochester, Kent, UK) covering Cosmetic Dentistry with a dedicated, approved Invisalign offer section. Strict staged workflow: asset analysis → placement report → approval ("GO" given when the user sent the logo with "place it properly make it visible") → build. Brand colours only: gold #D19A15, dark grey #4C4C4C, white. No stock imagery, no AI-generated imagery, no fabricated reviews, prices or credentials. CTAs: Book Your Free Consultation (confirmed free), Book on WhatsApp, Call the Clinic. Lead form: Full Name, Mobile, Email, Preferred Treatment, Location (Rochester only). User later requested award-level art direction: kinetic hero with masked line-by-line reveal, deliberate real photography, aligned bento, slow editorial marquee, framer-motion reveals, lenis smooth scroll, subtle parallax.

## Architecture
- Frontend: React (CRA) single-page landing at /app/frontend — components under src/components/landing/ (Nav, Hero, LeadForm, Marquee, SmilePlan, InvisalignOffer, Results+BeforeAfter slider, Treatments, Journey, Trust, Testimonials, Faq, FinalCta, Footer, StickyCta, Reveal). Lenis momentum scrolling + framer-motion masked hero reveal & scroll reveals. Fonts: Fraunces (display serif) + Jost (sans). Dark charcoal (#141311) / cream (#F5F1E7) alternating sections with gold accents; grain overlay.
- Backend: FastAPI (/app/backend/server.py) — POST /api/leads (validated: name, UK-format mobile, email, treatment whitelist, location fixed Rochester, source), GET /api/leads (most recent 200), plus template status routes. Leads stored in MongoDB (`leads` collection) via BaseDocument/PyObjectId pattern.
- Media pipeline: 4 uploaded videos transcoded with ffmpeg to 720px-wide H.264 web MP4s (2.4–5MB) + posters in /app/frontend/public/media/; 7 uploaded images + logo in /app/frontend/public/img/; before/after composites split into slider halves; favicon.svg + apple-touch-icon derived from the GM Dental logo.

## Assets (all uploaded, verified)
- IMG_7401.jpg — smile-reveal photo (hero) · handover.jpg — Invisalign aligner collection (Invisalign section) · zone.jpg — Invisalign Zone clinic photo (Trust) · smile.jpg — intraoral healthy smile (Smile Plan bento) · 3./9. INVISALIGN.png — two before/after cases (Results sliders) · GM DENTAL LOGO.webp — nav/footer/favicon · 4 videos: invisalign promo (Invisalign section), clinic film (Trust), Elizabeth & Ella testimonials (Testimonials).

## Offer details (user-confirmed, published)
Packages £2,400 / £3,000 / £3,990; free initial assessment incl. smile simulation; finance from £50.40/month (representative example, subject to status); iTero scan £65; whitening £348. NOT published: "additional costs £713" (meaning unexplained) and package inclusions (confirmed at assessment).

## Implemented (2026-10-12)
Stages 1–2 asset analysis + placement report; full landing page (hero with masked reveal + parallax photo, overlapping lead form, marquee, smile-plan bento, Invisalign offer with pricing + promo video, draggable before/after results, treatment cards, 5-step journey, clinic trust with film + clinician placeholder, genuine video testimonials, 10-question FAQ, repeated final CTA + form, footer, mobile sticky Call/WhatsApp/Book bar); lead API with validation + persistence; SEO: unique title/description, OG/Twitter, MedicalBusiness + FAQPage JSON-LD (no fabricated ratings; no canonical/sitemap until production domain), robots.txt, llms.txt, noscript fallback, favicon.

## Pending / Backlog
- P0: Real clinic phone + WhatsApp numbers (placeholders 01634 000 000 / wa.me 447700900000 in src/constants/clinic.js — replace before launch).
- P0: Production domain → add canonical, og:url, og:image, sitemap.xml.
- P1: Clinician name/photo/credentials for Trust section (placeholder card in place).
- P1: Invisalign package names/inclusions and meaning of "additional costs £713".
- P1: Patient consent confirmations for all photos/videos (uploaded by owner, assumed authorised).
- P2: GTM/GA4/Meta Pixel wiring when measurement IDs are provided; CRM/webhook lead routing when supplied.
