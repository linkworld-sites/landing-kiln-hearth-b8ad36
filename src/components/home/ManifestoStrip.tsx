"use client";
import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

const SENTENCES = [
  "Every piece carries the mark of the hand that made it.",
  "We make slowly. You use daily. That is the agreement.",
  "The imperfection is not a flaw. It is the signature.",
];

function RevealText({ text, delay = 0 }: { text: string; delay?: number }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20% 0px" });
  const shouldReduce = useReducedMotion();

  const words = text.split(" ");

  return (
    <p ref={ref} className="overflow-hidden">
      {words.map((word, i) => (
        <motion.span
          key={i}
          className="inline-block mr-[0.3em]"
          initial={shouldReduce ? { opacity: 1 } : { opacity: 0, x: -8 }}
          animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -8 }}
          transition={{
            duration: 0.5,
            delay: shouldReduce ? 0 : delay + i * 0.03,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          {word}
        </motion.span>
      ))}
    </p>
  );
}

export default function ManifestoStrip() {
  return (
    <section className="bg-bone py-28 md:py-36 px-6">
      <div className="max-w-2xl mx-auto text-center space-y-6">
        {SENTENCES.map((sentence, i) => (
          <div
            key={i}
            className="font-cormorant italic text-[clamp(1.5rem,3vw,2.25rem)] leading-snug text-charred-oak"
          >
            <RevealText text={sentence} delay={i * 0.1} />
          </div>
        ))}
      </div>
    </section>
  );
}
