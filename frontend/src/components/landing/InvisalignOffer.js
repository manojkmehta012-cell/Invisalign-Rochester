import { Reveal, Eyebrow } from "./Reveal";
import { scrollToSection } from "@/constants/clinic";

const PRICES = ["£2,400", "£3,000", "£3,990"];

export default function InvisalignOffer() {
  const enquire = () => {
    window.dispatchEvent(new CustomEvent("gm:prefill-treatment", { detail: "Invisalign" }));
    scrollToSection("book");
  };

  return (
    <section id="invisalign" data-testid="invisalign-offer-section" className="relative bg-ink-900 py-20 lg:py-28 px-4 sm:px-8 lg:px-16 overflow-hidden">
      <div className="gold-halo absolute -bottom-52 -left-40 w-[46rem] h-[46rem] pointer-events-none" />
      <div className="relative max-w-7xl mx-auto">
        <Reveal>
          <Eyebrow>Straighten Your Smile</Eyebrow>
          <h2 className="font-display font-medium text-3xl sm:text-4xl lg:text-5xl tracking-tight max-w-3xl text-cream">
            Discover Invisalign at GM Dental Rochester
          </h2>
          <p className="mt-5 max-w-2xl text-cream/70 leading-relaxed">
            Explore a discreet alternative to traditional braces with clear aligners designed around your treatment
            plan. Your dentist can assess your smile, explain your options and discuss the likely treatment journey.
          </p>
        </Reveal>

        <div className="mt-14 grid lg:grid-cols-2 gap-10 items-start">
          <Reveal className="relative">
            <div className="grid grid-cols-[1fr_0.62fr] gap-5 items-start">
              <div className="relative rounded-3xl overflow-hidden border border-gold/25 bg-ink-800">
                <video
                  data-testid="invisalign-promo-video"
                  src="/media/invisalign-promo.mp4"
                  poster="/media/invisalign-promo.jpg"
                  className="w-full h-[26rem] md:h-[30rem] object-cover"
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                />
                <span className="absolute top-4 left-4 bg-ink-900/85 border border-gold/30 text-gold text-[0.65rem] tracking-[0.2em] uppercase px-3 py-1.5 rounded-full">
                  Free consultation includes a smile simulation
                </span>
              </div>
              <img
                src="/img/handover.jpg"
                alt="Patient collecting his Invisalign aligners with his dentist at GM Dental"
                className="w-full h-[26rem] md:h-[30rem] object-cover rounded-3xl border border-gold/25 mt-8"
              />
            </div>
            <p className="mt-4 text-xs text-cream/50">Invisalign Zone smile simulation · aligner collection at the clinic</p>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="bg-ink-800/70 border border-gold/25 rounded-3xl p-7 md:p-9">
              <div className="flex flex-wrap items-end justify-between gap-4">
                <h3 className="font-display text-2xl text-cream">Invisalign packages</h3>
                <span className="text-[0.65rem] tracking-[0.2em] uppercase text-gold border border-gold/40 rounded-full px-3 py-1.5">Confirmed for Rochester</span>
              </div>
              <div className="mt-6 grid grid-cols-3 gap-3 md:gap-4">
                {PRICES.map((p, i) => (
                  <div key={p} data-testid={`invisalign-price-${i + 1}`} className={`rounded-2xl border p-4 md:p-5 text-center ${i === 0 ? "border-gold bg-gold/10" : "border-gold/25 bg-ink-900/50"}`}>
                    <p className="text-[0.6rem] md:text-[0.65rem] tracking-[0.18em] uppercase text-cream/60">Package {i + 1}</p>
                    <p className="font-display text-xl md:text-3xl text-gold mt-2">{p}</p>
                  </div>
                ))}
              </div>
              <p className="mt-4 text-xs text-cream/55 leading-relaxed">
                The exact package, its inclusions and any additional costs are confirmed at your free initial
                assessment, based on your clinical needs.
              </p>

              <div className="mt-6 space-y-3">
                <div className="flex items-start gap-3 rounded-xl border border-gold/25 bg-ink-900/50 p-4">
                  <span className="mt-0.5 w-2 h-2 rotate-45 bg-gold shrink-0" />
                  <p className="text-sm text-cream/85"><span className="text-gold font-semibold">Free initial assessment</span> — including a smile simulation so you can see how your new smile could look before you begin.</p>
                </div>
                <div className="flex items-start gap-3 rounded-xl border border-gold/25 bg-ink-900/50 p-4">
                  <span className="mt-0.5 w-2 h-2 rotate-45 bg-gold shrink-0" />
                  <p className="text-sm text-cream/85"><span className="text-gold font-semibold">Finance from £50.40 per month</span> — representative example. Eligibility, deposit and terms are subject to status.</p>
                </div>
                <div className="flex items-start gap-3 rounded-xl border border-gold/25 bg-ink-900/50 p-4">
                  <span className="mt-0.5 w-2 h-2 rotate-45 bg-gold shrink-0" />
                  <p className="text-sm text-cream/85"><span className="text-gold font-semibold">Supporting options</span> — iTero digital scan £65 · professional teeth whitening £348.</p>
                </div>
              </div>

              <button
                data-testid="invisalign-cta"
                onClick={enquire}
                className="mt-8 w-full rounded-full bg-gold hover:bg-gold-hover text-ink-900 font-semibold tracking-[0.12em] uppercase text-sm px-8 py-4 transition-colors"
              >
                Enquire About Invisalign
              </button>
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
