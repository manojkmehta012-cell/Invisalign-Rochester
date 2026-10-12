import { Crown, Layers, PenTool, Smile, Sparkles } from "lucide-react";
import { Reveal, Eyebrow } from "./Reveal";
import { scrollToSection } from "@/constants/clinic";

const TREATMENTS = [
  { icon: Smile, title: "Teeth Whitening", copy: "Professional whitening, supervised by a dentist. The shade you reach depends on your own teeth — we never promise a specific result." },
  { icon: PenTool, title: "Composite Bonding", copy: "Tooth-coloured composite may be used to improve the shape and appearance of selected teeth, subject to suitability and assessment." },
  { icon: Layers, title: "Veneers", copy: "Fine ceramic layers for front teeth. Suitability, preparation and the right type of veneer vary from patient to patient." },
  { icon: Sparkles, title: "Smile Makeovers", copy: "A personalised planning approach combining treatments around your goals — not a fixed package or a guaranteed outcome." },
  { icon: Crown, title: "Cosmetic Crowns", copy: "Natural-looking restorations that strengthen and reshape damaged or heavily filled teeth where clinically appropriate." },
];

export default function Treatments() {
  return (
    <section id="treatments" data-testid="treatments-section" className="bg-cream-soft text-ink-900 py-20 lg:py-28 px-4 sm:px-8 lg:px-16 border-t border-gold/15">
      <div className="max-w-7xl mx-auto">
        <Reveal>
          <Eyebrow>Explore Your Options</Eyebrow>
          <h2 className="font-display font-medium text-3xl sm:text-4xl lg:text-5xl tracking-tight max-w-2xl">
            Treatments Shaped Around Your Smile Goals
          </h2>
        </Reveal>

        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {TREATMENTS.map((t, i) => (
            <Reveal key={t.title} delay={0.05 * i} className="h-full">
              <div className="bg-white border border-gold/25 rounded-2xl p-7 h-full flex flex-col hover:border-gold/60 transition-[border-color] duration-300">
                <t.icon size={26} strokeWidth={1.5} className="text-gold" />
                <h3 className="font-display text-xl sm:text-2xl mt-4 text-ink-900">{t.title}</h3>
                <p className="mt-2.5 text-smoke text-sm leading-relaxed flex-1">{t.copy}</p>
                <button data-testid={`treatment-cta-${i}`} onClick={() => scrollToSection("book")} className="mt-5 self-start text-xs font-semibold tracking-[0.18em] uppercase text-gold-hover hover:text-gold transition-colors">
                  Discuss this treatment →
                </button>
              </div>
            </Reveal>
          ))}

          <Reveal delay={0.25} className="h-full">
            <button
              data-testid="treatment-invisalign-banner"
              onClick={() => scrollToSection("invisalign")}
              className="w-full h-full text-left bg-ink-900 rounded-2xl p-7 flex flex-col justify-between border border-gold/40 hover:border-gold transition-[border-color] duration-300"
            >
              <div>
                <p className="eyebrow">Straighten your smile</p>
                <h3 className="font-display text-2xl text-cream mt-3">Considering Invisalign?</h3>
                <p className="mt-2.5 text-sm text-cream/70 leading-relaxed">
                  Packages from £2,400 with a free initial assessment, including a smile simulation.
                </p>
              </div>
              <span className="mt-6 text-xs font-semibold tracking-[0.18em] uppercase text-gold">See the Invisalign offer →</span>
            </button>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
