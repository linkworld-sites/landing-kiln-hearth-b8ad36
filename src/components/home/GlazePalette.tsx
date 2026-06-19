"use client";
import { useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

const GLAZES = [
  {
    name: "Fog",
    color: "#9CA89B",
    description: "A muted sage drawn from morning mist over the field.",
  },
  {
    name: "Ember",
    color: "#C4673A",
    description: "The warm glow of the kiln door opening at dusk.",
  },
  {
    name: "Chalk",
    color: "#E8D5B7",
    description: "Pale, milky, almost translucent where it runs thin.",
  },
  {
    name: "Seaweed",
    color: "#2C4A3E",
    description: "Deep coastal green with flashes of iron-black at the foot.",
  },
];

export default function GlazePalette() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const shouldReduce = useReducedMotion();
  const [active, setActive] = useState<string | null>(null);

  return (
    <section ref={ref} className="bg-kiln-ash py-24 md:py-32 px-6 md:px-16 overflow-hidden">
      <div className="max-w-screen-xl mx-auto">
        {/* Header */}
        <motion.div
          initial={shouldReduce ? {} : { opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mb-14 md:mb-16"
        >
          <p className="font-dm text-[10px] tracking-[0.3em] uppercase text-charred-oak/40 mb-2">
            Glaze palette
          </p>
          <h2 className="font-cormorant italic text-[clamp(2rem,4vw,3rem)] text-charred-oak leading-none">
            Four Colourways
          </h2>
          <p className="font-dm text-sm text-charred-oak/50 mt-3 max-w-sm leading-relaxed">
            Every piece is available in any of our four studio glazes. Each named
            for the world outside the kiln door.
          </p>
        </motion.div>

        {/* Swatch row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {GLAZES.map((glaze, i) => (
            <motion.div
              key={glaze.name}
              initial={shouldReduce ? {} : { opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.7,
                delay: i * 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="flex flex-col items-center gap-5 cursor-pointer"
              onMouseEnter={() => setActive(glaze.name)}
              onMouseLeave={() => setActive(null)}
            >
              {/* Swatch circle */}
              <div className="relative">
                <motion.div
                  whileHover={shouldReduce ? {} : { scale: 1.08 }}
                  animate={
                    active === glaze.name && !shouldReduce
                      ? { scale: 1.08 }
                      : { scale: 1 }
                  }
                  transition={{ duration: 0.2 }}
                  className="w-[min(22vw,130px)] h-[min(22vw,130px)] rounded-full shadow-lg"
                  style={{ backgroundColor: glaze.color }}
                />
                {/* Ripple effect */}
                {active === glaze.name && !shouldReduce && (
                  <motion.div
                    key={`ripple-${glaze.name}`}
                    initial={{ scale: 1, opacity: 0.3 }}
                    animate={{ scale: 1.6, opacity: 0 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="absolute inset-0 rounded-full pointer-events-none"
                    style={{ backgroundColor: glaze.color }}
                  />
                )}
              </div>

              {/* Label */}
              <div className="text-center space-y-1">
                <p className="font-cormorant text-lg font-small-caps tracking-widest text-charred-oak">
                  {glaze.name}
                </p>
                <p className="font-dm text-[11px] leading-relaxed text-charred-oak/50 max-w-[120px]">
                  {glaze.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Active glaze note */}
        <motion.p
          animate={{ opacity: active ? 1 : 0 }}
          transition={{ duration: 0.2 }}
          className="mt-12 font-cormorant italic text-center text-charred-oak/40 text-lg"
        >
          {active
            ? `All pieces available in ${active} — order from the collection.`
            : ""}
        </motion.p>
      </div>
    </section>
  );
}
