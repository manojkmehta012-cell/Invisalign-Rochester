import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { MessageCircle, Phone } from "lucide-react";
import LeadForm from "./LeadForm";
import { CLINIC_NAME, PHONE_TEL, WHATSAPP_URL } from "@/constants/clinic";

const lineAnim = (i) => ({
  initial: { y: "112%" },
  animate: { y: 0 },
  transition: { duration: 0.95, delay: 0.2 + i * 0.16, ease: [0.22, 1, 0.36, 1] },
});

export default function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 120]);

  return (
    <section id="top" data-testid="hero-section" ref={ref} className="relative overflow-hidden bg-white text-ink-900">
      <motion.img
        src="/img/reveal.jpg"
        alt=""
        aria-hidden="true"
        style={{ y }}
        className="absolute inset-0 w-full h-[112%] object-cover object-top"
        data-testid="hero-background"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-white/40" />
      <div className="absolute inset-0 bg-white/35" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 pt-8 md:pt-10 pb-20 md:pb-28">
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <img src="/img/logo.webp" alt={CLINIC_NAME} className="h-16 md:h-20 w-auto" data-testid="hero-logo" />
        </motion.div>

        <div className="grid lg:grid-cols-[1.02fr_0.98fr] gap-12 lg:gap-14 items-center mt-8 md:mt-12">
          <div>
            <motion.p className="eyebrow" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}>
              Cosmetic Dentistry at GM Dental Rochester
            </motion.p>

            <h1 data-testid="hero-headline" className="font-display font-medium text-[2.5rem] leading-[1.08] sm:text-6xl lg:text-[4rem] tracking-tight mt-5 text-ink-900">
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
              className="mt-6 max-w-xl text-base md:text-lg text-smoke leading-relaxed"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.55 }}
            >
              Explore cosmetic dentistry at GM Dental Rochester, from Invisalign clear aligners to teeth
              whitening, composite bonding and veneers. Discover the options that suit your smile goals and take
              the first step towards a more confident you.
            </motion.p>

            <motion.div
              className="mt-8 flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.7 }}
            >
              <a
                data-testid="hero-cta-whatsapp"
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-gold/60 hover:border-gold bg-white/70 text-ink-900 hover:text-gold-hover text-xs font-semibold tracking-[0.12em] uppercase px-6 py-4 transition-colors"
              >
                <MessageCircle size={16} strokeWidth={1.8} />
                Book on WhatsApp
              </a>
              <a
                data-testid="hero-cta-call"
                href={PHONE_TEL}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-smoke/30 hover:border-gold bg-white/70 text-ink-900 hover:text-gold-hover text-xs font-semibold tracking-[0.12em] uppercase px-6 py-4 transition-colors"
              >
                <Phone size={15} strokeWidth={1.8} />
                Call the Clinic
              </a>
            </motion.div>
          </div>

          <motion.div
            id="book"
            data-testid="hero-form-panel"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="bg-white/95 text-ink-900 rounded-[2rem] border border-gold/50 shadow-[0_30px_90px_rgba(20,19,17,0.25)] backdrop-blur-sm p-6 md:p-9"
          >
            <h2 className="font-display text-2xl md:text-3xl leading-snug">
              Book your <span className="italic text-gold-hover">FREE</span> Invisalign consultation
            </h2>
            <div className="mt-6">
              <LeadForm idPrefix="hero-form" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
