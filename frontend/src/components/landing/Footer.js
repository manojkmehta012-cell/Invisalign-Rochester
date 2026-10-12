import { Phone, MessageCircle } from "lucide-react";
import { CLINIC_NAME, PHONE_DISPLAY, PHONE_TEL, WHATSAPP_URL, scrollToSection } from "@/constants/clinic";

const LINKS = [
  { label: "Before & After", id: "results" },
  { label: "Invisalign Offer", id: "offer" },
  { label: "Patient Journey", id: "journey" },
  { label: "Patient Stories", id: "reviews" },
  { label: "FAQ", id: "faq" },
];

export default function Footer() {
  return (
    <footer data-testid="page-footer" className="bg-white border-t border-gold/30 px-4 sm:px-8 lg:px-16 pt-16 pb-28 md:pb-10">
      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-12">
        <div>
          <div className="flex items-center gap-4">
            <img src="/img/logo.webp" alt="GM Dental & Implant Centre gold flower logo" className="h-20 w-20" />
            <div className="leading-none">
              <p className="block font-display text-ink-900 text-2xl tracking-[0.08em]">GM DENTAL</p>
              <p className="block text-[0.6rem] tracking-[0.34em] text-gold-hover mt-1.5">&amp; IMPLANT CENTRE</p>
            </div>
          </div>
          <p className="mt-5 text-sm text-smoke leading-relaxed max-w-xs">
            {CLINIC_NAME} — private Invisalign and cosmetic dentistry in Rochester, Kent.
          </p>
        </div>
        <div>
          <p className="eyebrow mb-5">Explore</p>
          <ul className="space-y-3">
            {LINKS.map((l) => (
              <li key={l.id}>
                <a
                  href={`#${l.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(l.id);
                  }}
                  className="text-sm text-smoke hover:text-gold-hover transition-colors"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="eyebrow mb-5">Book Your Free Consultation</p>
          <div className="space-y-3">
            <a href={PHONE_TEL} data-testid="footer-call-link" className="flex items-center gap-3 text-smoke hover:text-gold-hover transition-colors text-sm">
              <Phone size={16} strokeWidth={1.8} className="text-gold" />
              {PHONE_DISPLAY}
            </a>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" data-testid="footer-whatsapp-link" className="flex items-center gap-3 text-smoke hover:text-gold-hover transition-colors text-sm">
              <MessageCircle size={16} strokeWidth={1.8} className="text-gold" />
              Message us on WhatsApp
            </a>
          </div>
          <p className="mt-6 text-xs text-smoke/70 leading-relaxed">
            This page is for information only. Treatment suitability, costs and outcomes depend on a clinical
            assessment and vary between patients.
          </p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-12 pt-6 border-t border-smoke/15 flex flex-col sm:flex-row justify-between gap-3 text-xs text-smoke/70">
        <p>© 2026 {CLINIC_NAME}. All rights reserved.</p>
        <p>Invisalign Rochester · 0% Finance Available</p>
      </div>
    </footer>
  );
}
