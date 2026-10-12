import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { MessageCircle, Phone } from "lucide-react";
import { PHONE_TEL, PHONE_DISPLAY, WHATSAPP_URL, scrollToSection } from "@/constants/clinic";

const lineAnim = (i) => ({
  initial: { y: "112%" },
  animate: { y: 0 },
  transition: { duration: 0.95, delay: 0.2 + i * 0.16, ease: [0.22, 1, 0.36, 1] },
});

export default function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 90]);

  return (
    <section id="top" data-testid="hero-section" ref={ref} className="relative overflow-hidden bg-ink-900 pt-28 md:pt-40 pb-20 md:pb-28">
      <div className="gold-halo absolute -top-40 -left-40 w-[42rem] h-[42rem] pointer-events-none" />
      <div className="gold-halo absolute top-1/3 -right-56 w-[46rem] h-[46rem] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 grid lg:grid-cols-[1.05fr_0.95fr] gap-14 lg:gap-10 items-center">
        <div>
          <motion.p className="eyebrow" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.05 }}>
            Cosmetic Dentistry at GM Dental Rochester
          </motion.p>

          <h1 data-testid="hero-headline" className="font-display font-medium text-[2.6rem] leading-[1.08] sm:text-6xl lg:text-[4.2rem] tracking-tight mt-5">
            <span className="block overflow-hidden pb-1">
              <motion.span className="block" {...lineAnim(0)}>
                Your <span className="italic text-gold">Dream Smile</span>.
              </motion.span>
            </span>
            <span className="block overflow-hidden pb-2">
              <motion.span className="block" {...lineAnim(1)}>
                A Plan Made for You.
              </motion.span>
            </span>
          </h1>

          <motion.p
            className="mt-6 max-w-xl text-base md:text-lg text-cream/75 leading-relaxed"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.55 }}
          >
            Explore cosmetic dental treatments designed around your smile goals. From Invisalign clear aligners to
            teeth whitening, composite bonding and veneers, our team can help you understand your options and plan
            your next step.
          </motion.p>

          <motion.div
            className="mt-9 flex flex-col sm:flex-row sm:items-center gap-4"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.7 }}
          >
            <button
              data-testid="hero-cta-book"
              onClick={() => scrollToSection("book")}
              className="rounded-full bg-gold hover:bg-gold-hover text-ink-900 font-semibold tracking-[0.12em] uppercase text-sm px-8 py-4 transition-colors text-center"
            >
              Book Your Free Consultation
            </button>
            <div className="flex gap-3">
              <a
                data-testid="hero-cta-whatsapp"
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 rounded-full border border-gold/40 hover:border-gold text-cream hover:text-gold text-xs font-semibold tracking-[0.12em] uppercase px-6 py-4 transition-colors"
              >
                <MessageCircle size={16} strokeWidth={1.8} />
                Book on WhatsApp
              </a>
              <a
                data-testid="hero-cta-call"
                href={PHONE_TEL}
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 rounded-full border border-white/15 hover:border-gold/60 text-cream/85 hover:text-gold text-xs font-semibold tracking-[0.12em] uppercase px-6 py-4 transition-colors"
              >
                <Phone size={15} strokeWidth={1.8} />
                <span className="hidden xl:inline">{PHONE_DISPLAY}</span>
                <span className="xl:hidden">Call the Clinic</span>
              </a>
            </div>
          </motion.div>

          <motion.p
            className="mt-8 text-[0.7rem] tracking-[0.22em] uppercase text-cream/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.9 }}
          >
            Free initial assessment · Smile simulation · Finance from £50.40/month
          </motion.p>
        </div>

        <motion.div
          className="relative mx-auto w-full max-w-md lg:max-w-none"
          style={{ y }}
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="absolute -inset-3 rounded-t-[10rem] rounded-b-[2rem] border border-gold/30 translate-x-4 translate-y-4" aria-hidden="true" />
          <img
            src="/img/reveal.jpg"
            alt="Patient seeing his new smile in the mirror at GM Dental Rochester"
            className="relative w-full h-[26rem] md:h-[34rem] object-cover rounded-t-[10rem] rounded-b-[2rem]"
            data-testid="hero-image"
          />
          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 w-[86%] bg-ink-900/80 backdrop-blur-md border border-gold/25 rounded-2xl px-5 py-4 flex items-center justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-gold">The moment that matters</p>
              <p className="font-display italic text-cream text-lg mt-1">Seeing your new smile for the first time</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
