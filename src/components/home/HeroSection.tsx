"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import Image from "next/image";

export default function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const shouldReduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const imgScale = useTransform(scrollYProgress, [0, 1], shouldReduce ? [1, 1] : [1.05, 1.0]);
  const textY = useTransform(scrollYProgress, [0, 1], shouldReduce ? ["0%", "0%"] : ["0%", "20%"]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section ref={ref} className="relative h-screen overflow-hidden">
      {/* Full-bleed background image */}
      <motion.div className="absolute inset-0" style={{ scale: imgScale }}>
        <Image
          src="/images/hero.png"
          alt="Hands shaping wet clay on a spinning wheel, studio light catching the wet surface"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-charred-oak/20 via-transparent to-charred-oak/60" />
      </motion.div>

      {/* Hero text */}
      <motion.div
        style={{ y: textY, opacity: textOpacity }}
        className="absolute inset-0 flex flex-col items-center justify-center text-center px-6"
      >
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="font-cormorant text-sm tracking-[0.4em] uppercase text-bone/70 mb-6"
        >
          Handcrafted ceramics
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="font-cormorant italic text-[clamp(3.5rem,10vw,8rem)] leading-[0.9] tracking-[0.06em] text-bone"
        >
          Kiln &amp; Hearth
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.4, delay: 1.0 }}
          className="font-cormorant italic text-xl md:text-2xl text-bone/70 mt-6 tracking-wide"
        >
          Made slowly. Used daily.
        </motion.p>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.8 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
      >
        <motion.div
          animate={shouldReduce ? {} : { y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="w-px h-12 bg-gradient-to-b from-bone/0 to-bone/60"
        />
        <span className="font-dm text-[9px] tracking-[0.3em] uppercase text-bone/40">Scroll</span>
      </motion.div>
    </section>
  );
}
