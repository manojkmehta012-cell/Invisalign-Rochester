import { CheckCircle2, MessageCircle, Phone } from "lucide-react";
import LeadForm from "./LeadForm";
import { Reveal, Eyebrow } from "./Reveal";
import { PHONE_TEL, PHONE_DISPLAY, WHATSAPP_URL, scrollToSection } from "@/constants/clinic";

const BULLETS = [
  "Free initial assessment, including a smile simulation",
  "Honest advice — only suitable treatments are recommended",
  "Finance from £50.40/month (representative example)",
  "Rochester clinic, convenient for Medway",
];

export default function FinalCta({ embed = false }) {
  if (embed) {
    return (
      <div className="bg-cream text-ink-900 rounded-[2rem] border border-gold/30 shadow-[0_30px_80px_rgba(0,0,0,0.45)] p-6 md:p-10 grid lg:grid-cols-[0.8fr_1.2fr] gap-8 md:gap-12">
        <div className="flex flex-col justify-center">
          <p className="eyebrow">Book Your Visit</p>
          <h2 className="font-display text-3xl md:text-4xl mt-3 leading-snug">Your free consultation, arranged around you.</h2>
          <ul className="mt-6 space-y-3">
            {BULLETS.map((b) => (
              <li key={b} className="flex gap-3 text-sm text-smoke leading-relaxed">
                <CheckCircle2 size={18} strokeWidth={1.8} className="text-gold shrink-0 mt-0.5" />
                {b}
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-col gap-3">
            <a href={PHONE_TEL} data-testid="hero-panel-call-link" className="inline-flex items-center gap-3 text-ink-900 hover:text-gold-hover transition-colors font-medium">
              <span className="w-10 h-10 rounded-full bg-gold/15 border border-gold/40 flex items-center justify-center"><Phone size={16} strokeWidth={1.8} /></span>
              {PHONE_DISPLAY}
            </a>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" data-testid="hero-panel-whatsapp-link" className="inline-flex items-center gap-3 text-ink-900 hover:text-gold-hover transition-colors font-medium">
              <span className="w-10 h-10 rounded-full bg-gold/15 border border-gold/40 flex items-center justify-center"><MessageCircle size={16} strokeWidth={1.8} /></span>
              Book on WhatsApp
            </a>
          </div>
        </div>
        <LeadForm idPrefix="hero-form" />
      </div>
    );
  }

  return (
    <section id="book-final" data-testid="final-cta-section" className="relative bg-ink-900 py-20 lg:py-28 px-4 sm:px-8 lg:px-16 overflow-hidden">
      <div className="gold-halo absolute -top-40 -right-32 w-[40rem] h-[40rem] pointer-events-none" />
      <div className="relative max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
        <Reveal>
          <Eyebrow>Ready When You Are</Eyebrow>
          <h2 className="font-display font-medium text-3xl sm:text-4xl lg:text-5xl tracking-tight text-cream leading-tight">
            Your Dream Smile. <span className="italic text-gold">A Plan Made for You.</span>
          </h2>
          <p className="mt-5 text-cream/70 leading-relaxed max-w-lg">
            Enquire today and our Rochester team will arrange your free initial consultation — including a smile
            simulation — at a time that suits you.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <a
              data-testid="final-cta-whatsapp"
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-gold/40 hover:border-gold text-cream hover:text-gold text-xs font-semibold tracking-[0.12em] uppercase px-6 py-4 transition-colors"
            >
              <MessageCircle size={16} strokeWidth={1.8} />
              Book on WhatsApp
            </a>
            <a
              data-testid="final-cta-call"
              href={PHONE_TEL}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 hover:border-gold/60 text-cream/85 hover:text-gold text-xs font-semibold tracking-[0.12em] uppercase px-6 py-4 transition-colors"
            >
              <Phone size={15} strokeWidth={1.8} />
              Call the Clinic
            </a>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="bg-cream rounded-[2rem] p-6 md:p-9 border border-gold/30">
            <LeadForm idPrefix="final-form" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
