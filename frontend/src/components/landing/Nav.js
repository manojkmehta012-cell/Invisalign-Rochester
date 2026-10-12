import { useEffect, useState } from "react";
import { Phone } from "lucide-react";
import { PHONE_DISPLAY, PHONE_TEL, scrollToSection } from "@/constants/clinic";

const LINKS = [
  { label: "Treatments", id: "cosmetic" },
  { label: "Invisalign", id: "invisalign" },
  { label: "Results", id: "results" },
  { label: "Our Clinic", id: "clinic" },
  { label: "Reviews", id: "reviews" },
  { label: "FAQ", id: "faq" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (e, id) => {
    e.preventDefault();
    scrollToSection(id);
  };

  return (
    <header
      data-testid="nav-header"
      className={`fixed top-0 inset-x-0 z-50 transition-[background-color,border-color,box-shadow] duration-300 border-b ${
        scrolled
          ? "bg-ink-900/90 backdrop-blur-xl border-gold/20 shadow-[0_8px_30px_rgba(0,0,0,0.35)]"
          : "bg-transparent border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 h-16 md:h-20 flex items-center justify-between gap-4">
        <a href="#top" onClick={(e) => go(e, "top")} className="flex items-center gap-3" data-testid="nav-logo-link">
          <img src="/img/apple-touch-icon.png" alt="GM Dental & Implant Centre gold flower logo" className="h-10 md:h-11 w-10 md:w-11 rounded-lg" />
          <span className="leading-none hidden sm:block">
            <span className="block font-display text-cream text-lg md:text-xl tracking-[0.08em]">GM DENTAL</span>
            <span className="block text-[0.55rem] tracking-[0.34em] text-gold mt-1">&amp; IMPLANT CENTRE</span>
          </span>
        </a>

        <nav className="hidden lg:flex items-center gap-8">
          {LINKS.map((l) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              onClick={(e) => go(e, l.id)}
              className="text-sm tracking-wide text-cream/80 hover:text-gold transition-colors"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={PHONE_TEL}
            data-testid="nav-call-link"
            className="hidden md:flex items-center gap-2 text-sm text-cream/85 hover:text-gold transition-colors"
          >
            <Phone size={15} strokeWidth={1.8} />
            {PHONE_DISPLAY}
          </a>
          <button
            data-testid="nav-book-button"
            onClick={() => scrollToSection("book")}
            className="rounded-full bg-gold hover:bg-gold-hover text-ink-900 text-xs md:text-sm font-semibold tracking-[0.14em] uppercase px-5 md:px-7 py-2.5 transition-colors"
          >
            Book Free Consultation
          </button>
        </div>
      </div>
    </header>
  );
}
