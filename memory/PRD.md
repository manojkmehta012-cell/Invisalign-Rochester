# PRD — GM Dental & Implant Centre: Invisalign Landing Page

## Original Problem Statement
Premium, conversion-focused Invisalign landing page for GM Dental & Implant Centre, Rochester Kent. Stage 1-2 (asset analysis + placement report) were delivered first; approval given with the logo upload. First build: full cosmetic + Invisalign page. Revision request (latest, authoritative): shift the lead form INTO the hero over a background image, remove all menu items, use the uploaded proper logo, focus the page ONLY on Invisalign, add a before/after image grid slider, highlight the offer, form fields = Full Name, Mobile Number, Email, Message. Brand-guide PDF was referenced by the user but never arrived in uploads — colours remain the confirmed gold #D19A15 / dark grey #4C4C4C / white.

## Architecture
- Frontend: React CRA single page. Sections: Hero (bg image reveal.jpg under a light white-transparent overlay, transparent GM Dental logo, eyebrow "Cosmetic Dentistry at GM Dental Rochester", masked line-reveal headline, white 4-field lead form card), Invisalign marquee, Before & After embla slider (6 cases cropped from uploaded grid image), gold highlighted offer panel (exact campaign offer + packages £2,400/£3,000/£3,990 + promo video + handover photo), 5-step patient journey, Elizabeth & Ella video testimonials, 8-question Invisalign FAQ, final CTA + form, footer, mobile sticky Call/WhatsApp/Book bar. Lenis + framer-motion. Fonts: Fraunces + Jost.
- Backend: FastAPI POST /api/leads (name, mobile, email, message; treatment defaults "Invisalign", location "Rochester", source "invisalign-landing"), GET /api/leads. MongoDB `leads` collection.
- SEO: Invisalign-focused title/description, OG/Twitter, MedicalBusiness (Invisalign service) + FAQPage JSON-LD matching on-page text, robots.txt, llms.txt, noscript fallback, favicon.svg + dark apple-touch-icon.

## Confirmed offer (user-supplied, published verbatim)
Book your FREE Invisalign® consultation this month. Assessment worth £85 FREE. iTero Scan Smile Simulation worth £65 FREE*. Teeth Whitening worth £348 FREE*. Consultation completely free and no-obligation. See before-and-after versions of your teeth before accepting treatment. 0% finance available — starts at just £50.40 per month. (*Terms line added: "Terms apply — confirm current offer details at your free consultation.")

## Implemented (2026-10-12)
Asset analysis + placement report; first full build; revision: menu removed, hero redesigned with bg image + embedded 4-field form, Invisalign-only focus (treatments/bento/trust sections removed), case slider from uploaded grid, gold highlighted offer, form field change (message replaces treatment/location selects), FAQ trimmed to 8 Invisalign questions, SEO head updated to match.

## Pending / Backlog
- P0: Real clinic phone + WhatsApp numbers (placeholders 01634 000 000 / wa.me 447700900000 in src/constants/clinic.js).
- P0: Brand guide PDF (user said it defines text/colour codes) — not received; re-upload and I will align fonts/colours to it.
- P0: Production domain → canonical, og:url, og:image, sitemap.xml.
- P1: Patient consent confirmation for before/after photos and testimonial videos.
- P1: Invisalign package inclusions/names.
- P2: GTM/GA4/Meta Pixel + CRM lead routing when IDs/webhook supplied.
