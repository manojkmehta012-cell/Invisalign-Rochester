import { useCallback, useRef, useState } from "react";
import { MoveHorizontal } from "lucide-react";
import { Reveal, Eyebrow } from "./Reveal";

function BeforeAfter({ before, after, alt, testid }) {
  const ref = useRef(null);
  const [pos, setPos] = useState(50);
  const dragging = useRef(false);

  const update = useCallback((clientX) => {
    const rect = ref.current.getBoundingClientRect();
    const pct = Math.min(96, Math.max(4, ((clientX - rect.left) / rect.width) * 100));
    setPos(pct);
  }, []);

  const onDown = (e) => {
    dragging.current = true;
    e.currentTarget.setPointerCapture?.(e.pointerId);
    update(e.clientX);
  };
  const onMove = (e) => {
    if (!dragging.current) return;
    update(e.clientX);
  };
  const onUp = () => {
    dragging.current = false;
  };

  return (
    <div
      ref={ref}
      data-testid={testid}
      className="relative select-none overflow-hidden rounded-2xl border border-gold/25 cursor-ew-resize touch-none aspect-[2/1]"
      onPointerDown={onDown}
      onPointerMove={onMove}
      onPointerUp={onUp}
      onPointerLeave={onUp}
    >
      <img src={after} alt={alt.after} className="absolute inset-0 w-full h-full object-cover" draggable={false} />
      <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
        <img src={before} alt={alt.before} className="absolute inset-0 w-full h-full object-cover" draggable={false} />
      </div>
      <div className="absolute inset-y-0 w-[2px] bg-gold" style={{ left: `${pos}%` }}>
        <span className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 left-1/2 w-10 h-10 rounded-full bg-gold text-ink-900 flex items-center justify-center shadow-lg">
          <MoveHorizontal size={18} />
        </span>
      </div>
    </div>
  );
}

const CASES = [
  {
    before: "/img/before-gaps.jpg",
    after: "/img/after-gaps.jpg",
    caption: "Smile transformation — spacing between the front teeth closed.",
    testid: "before-after-slider-gaps",
  },
  {
    before: "/img/before-alignment.jpg",
    after: "/img/after-alignment.jpg",
    caption: "Smile transformation — straighter, brighter teeth.",
    testid: "before-after-slider-alignment",
  },
];

export default function Results() {
  return (
    <section id="results" data-testid="results-section" className="bg-cream text-ink-900 py-20 lg:py-28 px-4 sm:px-8 lg:px-16">
      <div className="max-w-7xl mx-auto">
        <Reveal>
          <Eyebrow>Real Patients, Real Results</Eyebrow>
          <h2 className="font-display font-medium text-3xl sm:text-4xl lg:text-5xl tracking-tight max-w-2xl">
            Drag to See What Changed
          </h2>
        </Reveal>
        <div className="mt-12 grid md:grid-cols-2 gap-8">
          {CASES.map((c, i) => (
            <Reveal key={c.testid} delay={0.08 * i}>
              <BeforeAfter before={c.before} after={c.after} alt={{ before: `Before treatment — ${c.caption}`, after: `After treatment — ${c.caption}` }} testid={c.testid} />
              <p className="mt-4 text-sm text-smoke">{c.caption}</p>
            </Reveal>
          ))}
        </div>
        <Reveal>
          <p className="mt-8 text-xs text-smoke/75 max-w-2xl leading-relaxed">
            Genuine before-and-after photos of GM Dental patients, shared with their permission. Results vary
            between patients; every treatment depends on a clinical assessment and the plan you agree with your dentist.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
