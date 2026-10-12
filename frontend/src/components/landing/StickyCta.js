import { CalendarCheck, MessageCircle, Phone } from "lucide-react";
import { PHONE_TEL, WHATSAPP_URL, scrollToSection } from "@/constants/clinic";

export default function StickyCta() {
  return (
    <div data-testid="mobile-sticky-cta-bar" className="fixed bottom-0 inset-x-0 z-40 md:hidden">
      <div className="bg-ink-900/95 backdrop-blur-md border-t border-gold/25 grid grid-cols-3">
        <a
          href={PHONE_TEL}
          data-testid="sticky-call"
          className="flex items-center justify-center gap-2 py-3.5 text-[0.7rem] font-semibold tracking-[0.14em] uppercase text-cream/85"
        >
          <Phone size={15} strokeWidth={1.8} className="text-gold" />
          Call
        </a>
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          data-testid="sticky-whatsapp"
          className="flex items-center justify-center gap-2 py-3.5 text-[0.7rem] font-semibold tracking-[0.14em] uppercase text-cream/85 border-x border-gold/20"
        >
          <MessageCircle size={15} strokeWidth={1.8} className="text-gold" />
          WhatsApp
        </a>
        <button
          data-testid="sticky-book"
          onClick={() => scrollToSection("book")}
          className="flex items-center justify-center gap-2 py-3.5 text-[0.7rem] font-semibold tracking-[0.14em] uppercase text-gold"
        >
          <CalendarCheck size={15} strokeWidth={1.8} />
          Book
        </button>
      </div>
    </div>
  );
}
