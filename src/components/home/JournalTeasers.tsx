"use client";
import { useRef } from "react";
import Link from "next/link";
import { motion, useInView, useReducedMotion } from "framer-motion";

const TEASERS = [
  {
    title: "What the Kiln Teaches You About Patience",
    excerpt:
      "You load the kiln on a Thursday. You open it the following Monday. Five days of not knowing. Every potter has a story about a firing that went wrong — and how it changed them.",
    href: "/blog",
  },
  {
    title: "Setting a Slow Table",
    excerpt:
      "There is a particular pleasure in setting a table with things that have weight. Not heavy — weighted. Objects that know what they are and ask nothing of you.",
    href: "/blog",
  },
];

export default function JournalTeasers() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const shouldReduce = useReducedMotion();

  return (
    <section ref={ref} className="bg-bone py-24 md:py-32 px-6 md:px-16">
      <div className="max-w-screen-xl mx-auto">
        {/* Header */}
        <motion.div
          initial={shouldReduce ? {} : { opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-end justify-between mb-14"
        >
          <div>
            <p className="font-dm text-[10px] tracking-[0.3em] uppercase text-charred-oak/40 mb-2">
              From the studio
            </p>
            <h2 className="font-cormorant italic text-[clamp(2rem,4vw,3rem)] text-charred-oak leading-none">
              Essays, not posts.
            </h2>
          </div>
          <Link
            href="/blog"
            className="hidden md:flex items-center gap-3 font-dm text-[11px] tracking-[0.2em] uppercase text-charred-oak/50 hover:text-charred-oak transition-colors group"
          >
            All essays
            <span className="h-px w-8 bg-charred-oak/30 group-hover:w-12 transition-all duration-300" />
          </Link>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {TEASERS.map((post, i) => (
            <motion.div
              key={post.title}
              initial={shouldReduce ? {} : { opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.8,
                delay: i * 0.15,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <Link href={post.href} className="group block border-t border-charred-oak/15 pt-8">
                <h3 className="font-cormorant italic text-[clamp(1.4rem,2.5vw,1.8rem)] text-charred-oak leading-snug mb-4 group-hover:opacity-70 transition-opacity duration-200">
                  {post.title}
                </h3>
                <p className="font-dm text-sm leading-[1.8] text-charred-oak/60 mb-6">
                  {post.excerpt}
                </p>
                <span className="font-dm text-[10px] tracking-[0.2em] uppercase text-charred-oak/40 group-hover:text-fired-terra transition-colors duration-200 flex items-center gap-2">
                  Read
                  <span className="h-px w-6 bg-current" />
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
