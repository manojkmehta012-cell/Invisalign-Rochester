import { Reveal, Eyebrow } from "./Reveal";

export default function Trust() {
  return (
    <section id="clinic" data-testid="clinic-trust-section" className="bg-cream text-ink-900 py-20 lg:py-28 px-4 sm:px-8 lg:px-16">
      <div className="max-w-7xl mx-auto">
        <Reveal>
          <Eyebrow>Our Clinic</Eyebrow>
          <h2 className="font-display font-medium text-3xl sm:text-4xl lg:text-5xl tracking-tight max-w-2xl">
            Advanced Care. Lasting Smiles.
          </h2>
          <p className="mt-5 max-w-2xl text-smoke leading-relaxed">
            A caring, experienced team, advanced technology and a dedicated Invisalign Zone — all at our Rochester
            clinic, where every treatment uses quality materials and careful, unhurried planning.
          </p>
        </Reveal>

        <div className="mt-12 grid lg:grid-cols-2 gap-6 items-start">
          <Reveal className="h-full">
            <div className="rounded-3xl overflow-hidden border border-gold/25 bg-ink-900">
              <video
                data-testid="clinic-film-video"
                src="/media/clinic-film.mp4"
                poster="/media/clinic-film.jpg"
                className="w-full h-[24rem] md:h-[30rem] object-cover"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
              />
            </div>
          </Reveal>

          <div className="grid gap-6">
            <Reveal delay={0.08}>
              <img
                src="/img/zone.jpg"
                alt="Patients and team members in the Invisalign Zone at GM Dental Rochester"
                className="w-full h-72 md:h-80 object-cover object-top rounded-3xl border border-gold/25"
              />
            </Reveal>
            <Reveal delay={0.14}>
              <div className="rounded-3xl border border-dashed border-gold/50 bg-white p-7">
                <div className="flex items-center gap-4">
                  <span className="w-14 h-14 rounded-full bg-gold/15 border border-gold/40 flex items-center justify-center font-display text-gold text-xl">GM</span>
                  <div>
                    <h3 className="font-display text-xl text-ink-900">Meet your clinician</h3>
                    <p className="text-xs tracking-[0.18em] uppercase text-gold-hover mt-1">Profile to be confirmed</p>
                  </div>
                </div>
                <p className="mt-4 text-sm text-smoke leading-relaxed">
                  The name, qualifications and professional registrations of the treating clinician will be published
                  here once verified and approved by GM Dental. All GM Dental dentists are registered with the
                  General Dental Council.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
