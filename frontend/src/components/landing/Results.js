import { useCallback, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Reveal, Eyebrow } from "./Reveal";

const CASES = [1, 2, 3, 4, 5, 6];

export default function Results() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" });
  const [canPrev, setCanPrev] = useState(true);
  const [canNext, setCanNext] = useState(true);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCanPrev(emblaApi.canScrollPrev());
    setCanNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  const scroll = (dir) => {
    if (!emblaApi) return;
    if (dir === "prev") emblaApi.scrollPrev();
    else emblaApi.scrollNext();
  };

  return (
    <section id="results" data-testid="results-section" className="bg-cream text-ink-900 py-20 lg:py-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16">
        <Reveal className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <Eyebrow>Real Patients, Real Results</Eyebrow>
            <h2 className="font-display font-medium text-3xl sm:text-4xl lg:text-5xl tracking-tight max-w-2xl">
              Before &amp; After Invisalign
            </h2>
          </div>
          <div className="flex gap-3">
            <button
              data-testid="results-prev"
              onClick={() => scroll("prev")}
              aria-label="Previous case"
              className="w-12 h-12 rounded-full border border-gold/40 hover:border-gold hover:bg-gold/10 text-gold flex items-center justify-center transition-colors"
            >
              <ArrowLeft size={18} />
            </button>
            <button
              data-testid="results-next"
              onClick={() => scroll("next")}
              aria-label="Next case"
              className="w-12 h-12 rounded-full border border-gold/40 hover:border-gold hover:bg-gold/10 text-gold flex items-center justify-center transition-colors"
            >
              <ArrowRight size={18} />
            </button>
          </div>
        </Reveal>
      </div>

      <div className="mt-12" ref={emblaRef} data-testid="before-after-slider">
        <div className="flex">
          {CASES.map((n) => (
            <div key={n} className="shrink-0 grow-0 basis-full sm:basis-1/2 lg:basis-1/3 min-w-0 pl-4 sm:px-4 lg:pl-8 first:pl-4 sm:first:pl-8" data-testid={`before-after-case-${n}`}>
              <img
                src={`/img/case-${n}.jpg`}
                alt={`Before and after Invisalign treatment at GM Dental Rochester — case ${n}`}
                className="w-full rounded-2xl border border-gold/25"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16">
        <Reveal>
          <p className="mt-10 text-xs text-smoke/75 max-w-2xl leading-relaxed">
            Genuine before-and-after photos of GM Dental patients. Results vary between patients; every treatment
            depends on a clinical assessment and the plan you agree with your dentist.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
