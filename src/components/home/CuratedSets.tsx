"use client";
import { useRef } from "react";
import Link from "next/link";
import { motion, useInView, useReducedMotion } from "framer-motion";
import Image from "next/image";

const SETS = [
  {
    name: "Morning Table",
    tagline: "Not a set. A table.",
    description:
      "Mug, dinner bowl, and side plate in one glaze. The pieces that meet you before the rest of the world does.",
    price: "from €105",
    image: "/images/lifestyle.png",
    imageAlt: "Morning table setting with handmade ceramics in warm studio light",
  },
  {
    name: "The Gathering",
    tagline: "Made for the meal that lingers.",
    description:
      "Four dinner bowls, four mugs. A table worth returning to. Available in any two glazes.",
    price: "from €210",
    image: "/images/environment.png",
    imageAlt: "Gathering table set of bowls and mugs on natural wood surface",
  },
];

export default function CuratedSets() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const shouldReduce = useReducedMotion();

  return (
    <section ref={ref} className="bg-charred-oak py-24 md:py-32 px-6 md:px-16">
      <div className="max-w-screen-xl mx-auto">
        {/* Header */}
        <motion.div
          initial={shouldReduce ? {} : { opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mb-14 md:mb-16"
        >
          <p className="font-dm text-[10px] tracking-[0.3em] uppercase text-bone/30 mb-3">
            Curated sets
          </p>
          <h2 className="font-cormorant italic text-[clamp(2rem,4vw,3rem)] text-bone leading-none">
            A table, not a set.
          </h2>
        </motion.div>

        {/* Two set cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {SETS.map((set, i) => (
            <motion.div
              key={set.name}
              initial={shouldReduce ? {} : { opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.8,
                delay: i * 0.15,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="group relative overflow-hidden"
            >
              {/* Image */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={set.image}
                  alt={set.imageAlt}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-charred-oak/50" />
              </div>

              {/* Content */}
              <div className="bg-charred-oak border border-bone/10 p-8 md:p-10">
                <p className="font-cormorant italic text-sm text-bone/40 mb-3">
                  {set.tagline}
                </p>
                <h3 className="font-cormorant text-[clamp(1.6rem,2.5vw,2rem)] text-bone mb-4 leading-tight">
                  {set.name}
                </h3>
                <p className="font-dm text-sm leading-[1.8] text-bone/60 mb-6 max-w-xs">
                  {set.description}
                </p>
                <div className="flex items-center justify-between">
                  <p className="font-cormorant text-xl text-fired-terra">{set.price}</p>
                  <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                    <Link
                      href="/shop"
                      className="font-dm text-[11px] tracking-[0.2em] uppercase text-bone border border-bone/40 px-6 py-2.5 hover:bg-bone hover:text-charred-oak transition-colors duration-300"
                    >
                      Build Your Table
                    </Link>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
