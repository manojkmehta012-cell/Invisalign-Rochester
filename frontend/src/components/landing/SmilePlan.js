import { Reveal, Eyebrow } from "./Reveal";
import { scrollToSection } from "@/constants/clinic";

const CARDS = [
  { n: "01", title: "Invisalign Clear Aligners", copy: "A discreet way to straighten your smile with custom-made, removable aligners.", id: "invisalign" },
  { n: "02", title: "Teeth Whitening", copy: "Professional whitening options, chosen around your teeth and the shade you can realistically achieve.", id: "treatments" },
  { n: "03", title: "Composite Bonding", copy: "Reshaping and refining selected teeth, subject to suitability and assessment.", id: "treatments" },
  { n: "04", title: "Veneers", copy: "Fine ceramic layers that transform the shape and appearance of front teeth where suitable.", id: "treatments" },
  { n: "05", title: "Smile Makeovers", copy: "A personalised treatment plan combining the right treatments for your smile goals.", id: "treatments" },
  { n: "06", title: "Cosmetic Crowns", copy: "Strong, natural-looking restorations for damaged or heavily filled teeth.", id: "treatments" },
];

const cardCls = "group bg-white border border-gold/25 hover:border-gold/60 rounded-2xl p-7 h-full flex flex-col transition-[border-color,transform] duration-300 hover:-translate-y-1";

export default function SmilePlan() {
  return (
    <section id="cosmetic" data-testid="cosmetic-overview-section" className="bg-cream text-ink-900 py-20 lg:py-28 px-4 sm:px-8 lg:px-16">
      <div className="max-w-7xl mx-auto">
        <Reveal>
          <Eyebrow>Cosmetic Dentistry</Eyebrow>
          <h2 className="font-display font-medium text-3xl sm:text-4xl lg:text-5xl tracking-tight max-w-2xl">
            A Smile Plan That Starts With You
          </h2>
          <p className="mt-5 max-w-2xl text-smoke leading-relaxed">
            Every smile is different. Whether you want to explore a brighter shade, improve the appearance of
            individual teeth or consider a straighter smile, the first step is understanding which treatments may be
            suitable for you.
          </p>
        </Reveal>

        <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Reveal className="lg:row-span-2 h-full">
            <div className="relative h-full min-h-[22rem] rounded-2xl overflow-hidden border border-gold/25">
              <img src="/img/smile.jpg" alt="Close-up of a healthy, well-aligned smile treated at GM Dental Rochester" className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-900/85 via-ink-900/10 to-transparent" />
              <p className="absolute bottom-6 left-6 right-6 font-display italic text-2xl text-cream">
                Healthy teeth, thoughtfully treated — the foundation of every cosmetic plan.
              </p>
            </div>
          </Reveal>
          {CARDS.map((c, i) => (
            <Reveal key={c.n} delay={0.05 * i} className="h-full">
              <button onClick={() => scrollToSection(c.id)} className={`${cardCls} text-left w-full`} data-testid={`cosmetic-card-${c.n}`}>
                <span className="font-display italic text-gold text-xl">{c.n}</span>
                <h3 className="font-display text-xl sm:text-2xl mt-3 text-ink-900">{c.title}</h3>
                <p className="mt-2.5 text-smoke text-sm leading-relaxed flex-1">{c.copy}</p>
                <span className="mt-5 text-xs font-semibold tracking-[0.18em] uppercase text-gold-hover group-hover:text-gold transition-colors">Explore →</span>
              </button>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
