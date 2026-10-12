import { MessageCircle, Phone } from "lucide-react";
import LeadForm from "./LeadForm";
import { Reveal, Eyebrow } from "./Reveal";
import { PHONE_TEL, WHATSAPP_URL } from "@/constants/clinic";

export default function FinalCta() {
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
            Book your free Invisalign consultation this month — completely free, no-obligation, and including a
            smile simulation so you can see your new smile first.
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
