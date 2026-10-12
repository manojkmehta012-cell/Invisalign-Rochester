import { Reveal, Eyebrow } from "./Reveal";

const STEPS = [
  { n: "01", title: "Make an enquiry", copy: "Send the form, WhatsApp or call the Rochester clinic." },
  { n: "02", title: "Discuss your smile goals", copy: "A relaxed conversation about what you would like to change." },
  { n: "03", title: "Attend a clinical assessment", copy: "Including an iTero scan and a smile simulation where appropriate." },
  { n: "04", title: "Explore options and costs", copy: "Suitable treatments, timings and finance — explained clearly." },
  { n: "05", title: "Agree your treatment plan", copy: "You decide whether and when to proceed. No pressure." },
];

export default function Journey() {
  return (
    <section id="journey" data-testid="journey-section" className="bg-ink-900 py-20 lg:py-28 px-4 sm:px-8 lg:px-16">
      <div className="max-w-7xl mx-auto">
        <Reveal>
          <Eyebrow>Your Journey</Eyebrow>
          <h2 className="font-display font-medium text-3xl sm:text-4xl lg:text-5xl tracking-tight max-w-2xl text-cream">
            Five Calm Steps From Enquiry to Treatment
          </h2>
        </Reveal>

        <div className="mt-14 grid md:grid-cols-3 lg:grid-cols-5 gap-6">
          {STEPS.map((s, i) => (
            <Reveal key={s.n} delay={0.07 * i} className="h-full">
              <div className="relative border-t border-gold/30 pt-6 h-full">
                <span className="absolute -top-[9px] left-0 w-[18px] h-[18px] rotate-45 bg-ink-900 border border-gold" />
                <p className="font-display italic text-gold text-3xl">{s.n}</p>
                <h3 className="mt-3 font-display text-lg text-cream">{s.title}</h3>
                <p className="mt-2 text-sm text-cream/65 leading-relaxed">{s.copy}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <p className="mt-10 text-xs text-cream/50 max-w-2xl leading-relaxed">
            The precise process depends on the treatment you choose and your clinical assessment. Not everyone is a
            suitable candidate for Invisalign or every cosmetic treatment — your dentist will always tell you honestly.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
