"use client";
import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import Image from "next/image";

const QUOTES = [
  "I've used the same mug every morning for two years. It still feels new.",
  "It's the weight that gets you. You pick it up and immediately understand why cheap ceramics feel hollow.",
  "I bought the bud vase for myself. I haven't put anything else in it for six months.",
  "The bowl is the first thing I reach for. For everything. It's become part of how I cook.",
  "These are objects that make you slow down. I didn't expect that.",
];

const UGC_IMAGES = [
  "/images/hero.png",
  "/images/lifestyle.png",
  "/images/environment.png",
];

export default function Testimonials() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-5% 0px" });
  const shouldReduce = useReducedMotion();

  return (
    <section ref={ref} className="bg-kiln-ash py-24 md:py-32 px-6 md:px-16 overflow-hidden">
      <div className="max-w-screen-xl mx-auto">
        {/* Section label */}
        <motion.p
          initial={shouldReduce ? {} : { opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8 }}
          className="font-dm text-[10px] tracking-[0.3em] uppercase text-charred-oak/30 mb-16 text-center"
        >
          From the hands that use them
        </motion.p>

        {/* Quotes interspersed with small images */}
        <div className="space-y-12 md:space-y-16">
          {QUOTES.map((quote, i) => (
            <div key={i} className={`flex ${i % 2 === 0 ? "justify-start" : "justify-end"}`}>
              <motion.div
                initial={shouldReduce ? {} : { opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.8,
                  delay: i * 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className={`max-w-lg ${i % 3 === 1 ? "flex items-start gap-6" : ""}`}
              >
                {i % 3 === 1 && UGC_IMAGES[Math.floor(i / 3)] && (
                  <div className="relative flex-none w-20 h-20 overflow-hidden">
                    <Image
                      src={UGC_IMAGES[Math.floor(i / 3)] as string}
                      alt="A customer's piece in their home"
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </div>
                )}
                <blockquote className="font-cormorant italic text-[clamp(1.3rem,2.5vw,1.8rem)] text-charred-oak leading-snug">
                  &ldquo;{quote}&rdquo;
                </blockquote>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
