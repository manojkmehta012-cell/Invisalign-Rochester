import { CheckCircle2, MessageCircle, Phone } from "lucide-react";
import { Reveal, Eyebrow } from "./Reveal";
import { PHONE_TEL, WHATSAPP_URL, scrollToSection } from "@/constants/clinic";

const OFFER = [
  { text: "Assessment worth £85", free: true },
  { text: "iTero Scan Smile Simulation worth £65", free: true, star: true },
  { text: "Teeth Whitening worth £348", free: true, star: true },
  { text: "Consultation completely free and no-obligation" },
  { text: "See before-and-after versions of your teeth before accepting treatment" },
  { text: "0% finance available — starts at just £50.40 per month" },
];

const PACKAGES = ["£2,400", "£3,000", "£3,990"];

export default function InvisalignOffer() {
  return (
    <section id="offer" data-testid="invisalign-offer-section" className="relative bg-ink-900 py-20 lg:py-28 overflow-hidden">
      <div className="gold-halo absolute -top-52 -right-40 w-[46rem] h-[46rem] pointer-events-none" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-8 lg:px-16">
        <Reveal>
          <Eyebrow>Straighten Your Smile</Eyebrow>
          <h2 className="font-display font-medium text-3xl sm:text-4xl lg:text-5xl tracking-tight max-w-3xl text-cream">
            Discover Invisalign at GM Dental Rochester
          </h2>
          <p className="mt-5 max-w-2xl text-cream/70 leading-relaxed">
            A discreet alternative to traditional braces, designed around your treatment plan. Your dentist assesses
            your smile, shows you the likely result and explains every step of the journey.
          </p>
        </Reveal>

        <Reveal delay={0.08}>
          <div data-testid="offer-panel" className="mt-12 bg-gold text-ink-900 rounded-[2rem] p-7 md:p-12 shadow-[0_30px_90px_rgba(209,154,21,0.25)]">
            <div className="flex flex-wrap items-center gap-4">
              <span className="text-[0.65rem] font-bold tracking-[0.24em] uppercase bg-ink-900 text-gold px-4 py-2 rounded-full">This Month's Offer</span>
              <span className="font-display italic text-xl md:text-2xl">Book your FREE Invisalign® consultation</span>
            </div>

            <div className="mt-8 grid md:grid-cols-2 gap-x-10 gap-y-4">
              {OFFER.map((o) => (
                <div key={o.text} className="flex items-start gap-3">
                  <CheckCircle2 size={20} strokeWidth={2} className="shrink-0 mt-0.5" />
                  <p className="text-sm md:text-base font-medium leading-relaxed">
                    {o.text}
                    {o.free && (
                      <span className="ml-2 align-middle text-[0.6rem] font-bold tracking-[0.16em] uppercase bg-ink-900 text-gold rounded-full px-2.5 py-1">
                        {o.star ? "FREE*" : "FREE"}
                      </span>
                    )}
                  </p>
                </div>
              ))}
            </div>

            <p className="mt-7 text-xs text-ink-900/75">*Terms apply — confirm current offer details at your free consultation.</p>

            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <button
                data-testid="offer-cta-book"
                onClick={() => scrollToSection("book")}
                className="rounded-full bg-ink-900 hover:bg-ink-800 text-gold font-semibold tracking-[0.12em] uppercase text-sm px-8 py-4 transition-colors"
              >
                Book Your Free Consultation
              </button>
              <a
                data-testid="offer-cta-whatsapp"
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-ink-900/70 hover:border-ink-900 text-ink-900 text-xs font-semibold tracking-[0.12em] uppercase px-6 py-4 transition-colors"
              >
                <MessageCircle size={16} strokeWidth={1.8} />
                Book on WhatsApp
              </a>
              <a
                data-testid="offer-cta-call"
                href={PHONE_TEL}
                className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-ink-900/70 hover:border-ink-900 text-ink-900 text-xs font-semibold tracking-[0.12em] uppercase px-6 py-4 transition-colors"
              >
                <Phone size={15} strokeWidth={1.8} />
                Call the Clinic
              </a>
            </div>
          </div>
        </Reveal>

        <div className="mt-16 grid lg:grid-cols-[1.05fr_0.95fr] gap-10 items-start">
          <Reveal>
            <div className="grid grid-cols-[1fr_0.62fr] gap-5 items-start">
              <div className="relative rounded-3xl overflow-hidden border border-gold/25 bg-ink-800">
                <video
                  data-testid="invisalign-promo-video"
                  src="/media/invisalign-promo.mp4"
                  poster="/media/invisalign-promo.jpg"
                  className="w-full h-[24rem] md:h-[28rem] object-cover"
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                />
              </div>
              <img
                src="/img/handover.jpg"
                alt="Patient collecting his Invisalign aligners with his dentist at GM Dental"
                className="w-full h-[24rem] md:h-[28rem] object-cover rounded-3xl border border-gold/25 mt-8"
              />
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="bg-ink-800/70 border border-gold/25 rounded-3xl p-7 md:p-9">
              <div className="flex flex-wrap items-end justify-between gap-4">
                <h3 className="font-display text-2xl text-cream">Invisalign packages</h3>
                <span className="text-[0.65rem] tracking-[0.2em] uppercase text-gold border border-gold/40 rounded-full px-3 py-1.5">0% finance available</span>
              </div>
              <div className="mt-6 grid grid-cols-3 gap-3 md:gap-4">
                {PACKAGES.map((p, i) => (
                  <div key={p} data-testid={`invisalign-price-${i + 1}`} className={`rounded-2xl border p-4 md:p-5 text-center ${i === 0 ? "border-gold bg-gold/10" : "border-gold/25 bg-ink-900/50"}`}>
                    <p className="text-[0.6rem] md:text-[0.65rem] tracking-[0.18em] uppercase text-cream/60">Package {i + 1}</p>
                    <p className="font-display text-xl md:text-3xl text-gold mt-2">{p}</p>
                  </div>
                ))}
              </div>
              <p className="mt-4 text-xs text-cream/55 leading-relaxed">
                0% finance starts at just £50.40 per month. The exact package, its inclusions and any additional
                costs are confirmed at your free consultation, based on your clinical needs.
              </p>
              <p className="mt-4 text-[0.7rem] text-cream/45 leading-relaxed">
                Invisalign treatment is subject to a clinical assessment. Results vary between patients.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
