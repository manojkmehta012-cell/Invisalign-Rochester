const ITEMS = [
  "Invisalign Clear Aligners",
  "Teeth Whitening",
  "Composite Bonding",
  "Porcelain Veneers",
  "Smile Makeovers",
  "Cosmetic Crowns",
];

const Row = ({ hidden }) => (
  <div aria-hidden={hidden || undefined} className="flex items-center shrink-0">
    {ITEMS.map((item) => (
      <span key={item} className="flex items-center shrink-0">
        <span className="font-display italic text-3xl md:text-5xl text-cream/90 whitespace-nowrap px-8">{item}</span>
        <span className="w-2.5 h-2.5 rotate-45 bg-gold shrink-0" />
      </span>
    ))}
  </div>
);

export default function Marquee() {
  return (
    <div data-testid="marquee-strip" className="marquee border-y border-gold/20 bg-ink-900 py-8 md:py-10">
      <div className="marquee-track">
        <Row />
        <Row hidden />
      </div>
    </div>
  );
}
