"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import Image from "next/image";

const PANELS = [
  {
    step: "I",
    caption: "Raw Earth",
    text: "From earth to your morning.",
    image: "/images/hero.png",
    pos: "center 30%",
  },
  {
    step: "II",
    caption: "The Wheel",
    text: "Centered. Opened. Given form.",
    image: "/images/texture.png",
    pos: "center center",
  },
  {
    step: "III",
    caption: "Trimming",
    text: "Excess removed. Character revealed.",
    image: "/images/hero.png",
    pos: "center 70%",
  },
  {
    step: "IV",
    caption: "Glazing",
    text: "Colour chosen. Surface prepared.",
    image: "/images/lifestyle.png",
    pos: "center center",
  },
  {
    step: "V",
    caption: "The Kiln",
    text: "Heat transforms. Earth becomes vessel.",
    image: "/images/environment.png",
    pos: "center center",
  },
  {
    step: "VI",
    caption: "Fired & Finished",
    text: "Twelve weeks ago, this was soil.",
    image: "/images/lifestyle.png",
    pos: "center 60%",
  },
];

function Panel({
  panel,
  index,
  scrollYProgress,
  total,
}: {
  panel: (typeof PANELS)[number];
  index: number;
  scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"];
  total: number;
}) {
  const start = index / total;
  const mid = (index + 0.5) / total;
  const end = Math.min((index + 1) / total, 1);

  const opacity = useTransform(
    scrollYProgress,
    [Math.max(start - 0.05, 0), start, mid, end, Math.min(end + 0.05, 1)],
    [0.4, 0.7, 1, 0.7, 0.4]
  );
  const captionY = useTransform(
    scrollYProgress,
    [start, Math.min(start + 0.1, mid)],
    ["24px", "0px"]
  );

  return (
    <div className="flex-none w-screen h-full relative">
      <Image
        src={panel.image}
        alt={panel.caption}
        fill
        className="object-cover"
        style={{ objectPosition: panel.pos }}
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-charred-oak/60" />

      <motion.div
        style={{ opacity }}
        className="absolute inset-0 flex flex-col items-center justify-center text-center px-8"
      >
        <span className="font-cormorant italic text-[12vw] leading-none text-bone/10 select-none mb-6">
          {panel.step}
        </span>
        <motion.div style={{ y: captionY }} className="space-y-4">
          <p className="font-cormorant text-[11px] tracking-[0.45em] uppercase text-bone/60 font-small-caps">
            {panel.caption}
          </p>
          <p className="font-cormorant italic text-[clamp(1.4rem,2.5vw,2rem)] text-bone/80 max-w-sm">
            {panel.text}
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default function ProcessPanel() {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const x = useTransform(
    scrollYProgress,
    [0, 1],
    shouldReduce ? ["0vw", "0vw"] : ["0vw", `${-(PANELS.length - 1) * 100}vw`]
  );

  return (
    <section
      id="process"
      ref={containerRef}
      className="relative"
      style={{ height: `${PANELS.length * 100}vh` }}
    >
      <div className="sticky top-0 h-screen overflow-hidden bg-charred-oak">
        {/* Chapter title */}
        <div className="absolute top-10 left-0 right-0 z-10 flex justify-center pointer-events-none">
          <p className="font-cormorant text-[10px] tracking-[0.5em] uppercase text-bone/40">
            From earth to your morning
          </p>
        </div>

        {shouldReduce ? (
          /* Reduced motion: stack panels vertically */
          <div className="flex flex-col h-full overflow-y-auto">
            {PANELS.map((panel, i) => (
              <div key={i} className="relative flex-none h-screen">
                <Image src={panel.image} alt={panel.caption} fill className="object-cover" sizes="100vw" />
                <div className="absolute inset-0 bg-charred-oak/60 flex flex-col items-center justify-center text-center">
                  <p className="font-cormorant text-sm tracking-[0.4em] uppercase text-bone/60">{panel.caption}</p>
                  <p className="font-cormorant italic text-2xl text-bone/80 mt-3 max-w-sm">{panel.text}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <motion.div
            style={{ x, width: `${PANELS.length * 100}vw` }}
            className="flex h-full"
          >
            {PANELS.map((panel, i) => (
              <Panel
                key={i}
                panel={panel}
                index={i}
                scrollYProgress={scrollYProgress}
                total={PANELS.length}
              />
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}
