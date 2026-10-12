import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { Reveal, Eyebrow } from "./Reveal";

export const FAQS = [
  {
    q: "What is cosmetic dentistry?",
    a: "Cosmetic dentistry focuses on the appearance of your smile — straighter, whiter and well-shaped teeth — while protecting your oral health. At GM Dental Rochester it can include Invisalign clear aligners, teeth whitening, composite bonding, veneers, cosmetic crowns and smile makeovers.",
  },
  {
    q: "Which cosmetic treatments may be suitable for me?",
    a: "That depends on your teeth, your goals and your oral health. The best first step is a free initial assessment, where a dentist examines your smile, listens to what you want and explains which options may suit you.",
  },
  {
    q: "What is Invisalign?",
    a: "Invisalign is a series of custom-made, nearly invisible clear aligners that fit over your teeth and gently move them into a planned position. They are removable for eating and cleaning.",
  },
  {
    q: "How does Invisalign treatment work?",
    a: "Your dentist assesses your smile and scans your teeth with the iTero scanner, then builds a personalised plan with a smile simulation showing how your new smile could look. You wear a series of aligners for the recommended hours each day, changing them as directed, with reviews at the clinic. Duration depends on your individual case.",
  },
  {
    q: "How much does Invisalign cost?",
    a: "Current Invisalign packages at our Rochester clinic are £2,400, £3,000 and £3,990. The exact cost depends on your clinical assessment and the treatment plan you agree.",
  },
  {
    q: "What is included in the current Invisalign offer?",
    a: "The initial assessment is free and includes a smile simulation. The three package prices are £2,400, £3,000 and £3,990; supporting options include an iTero digital scan (£65) and professional teeth whitening (£348). Package inclusions and any additional costs are confirmed at your assessment.",
  },
  {
    q: "Is finance available?",
    a: "Finance is available from £50.40 per month (representative example). Eligibility, deposit and terms are subject to status and confirmed in writing before you commit to anything.",
  },
  {
    q: "Can I combine Invisalign with other cosmetic treatments?",
    a: "Often, yes. Treatments such as whitening or composite bonding are commonly planned after or alongside clear aligner treatment. Your dentist will advise what is safe and appropriate for your teeth.",
  },
  {
    q: "How do I arrange a consultation in Rochester?",
    a: "Complete the form on this page, send us a WhatsApp message, or call the clinic. Our team will arrange your free initial assessment at GM Dental Rochester.",
  },
  {
    q: "What happens at my first appointment?",
    a: "You will discuss your smile goals, have your teeth examined and, where appropriate, receive an iTero scan with a smile simulation. Your dentist explains suitable options and costs, and there is never any pressure to proceed.",
  },
];

export default function Faq() {
  const [open, setOpen] = useState(0);

  return (
    <section id="faq" data-testid="faq-section" className="bg-cream text-ink-900 py-20 lg:py-28 px-4 sm:px-8 lg:px-16">
      <div className="max-w-4xl mx-auto">
        <Reveal className="text-center">
          <Eyebrow>Good to Know</Eyebrow>
          <h2 className="font-display font-medium text-3xl sm:text-4xl lg:text-5xl tracking-tight">
            Questions, Answered Honestly
          </h2>
        </Reveal>

        <div className="mt-12 border-t border-gold/20">
          {FAQS.map((f, i) => (
            <div key={i} className="border-b border-gold/20">
              <button
                data-testid={`faq-question-${i + 1}`}
                onClick={() => setOpen(open === i ? -1 : i)}
                aria-expanded={open === i}
                className="w-full flex justify-between items-center gap-6 py-6 text-left"
              >
                <span className="font-display text-lg md:text-xl text-ink-900">{f.q}</span>
                <Plus size={20} strokeWidth={1.8} className={`text-gold shrink-0 transition-transform duration-300 ${open === i ? "rotate-45" : ""}`} />
              </button>
              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <p className="pb-6 text-smoke text-sm md:text-base leading-relaxed max-w-3xl">{f.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
