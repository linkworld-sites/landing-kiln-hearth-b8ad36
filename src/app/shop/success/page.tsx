"use client";
import { useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { track } from "@/lib/funnel";

export default function SuccessPage() {
  useEffect(() => {
    track("purchase");
  }, []);

  return (
    <main className="min-h-screen bg-kiln-ash flex items-center justify-center px-6 pt-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="text-center max-w-lg"
      >
        {/* Kiln icon */}
        <svg
          width="48"
          height="48"
          viewBox="0 0 48 48"
          fill="none"
          className="mx-auto mb-8 opacity-40"
        >
          <ellipse cx="24" cy="36" rx="14" ry="6" stroke="#C4673A" strokeWidth="1.5" />
          <path d="M10 36 C10 20 16 10 24 7 C32 10 38 20 38 36" stroke="#C4673A" strokeWidth="1.5" fill="none" />
          <line x1="24" y1="7" x2="24" y2="2" stroke="#C4673A" strokeWidth="1.5" />
        </svg>

        <p className="font-dm text-[10px] tracking-[0.3em] uppercase text-charred-oak/40 mb-4">
          Order confirmed
        </p>
        <h1 className="font-cormorant italic text-[clamp(2rem,4vw,3rem)] text-charred-oak mb-4 leading-tight">
          Thank you.
        </h1>
        <p className="font-dm text-sm leading-[1.8] text-charred-oak/60 mb-10">
          Your pieces are in the queue. We&rsquo;ll send a note when they&rsquo;re on
          their way — made slowly, packed carefully.
        </p>
        <Link
          href="/"
          className="inline-block font-dm text-[11px] tracking-[0.2em] uppercase border border-charred-oak px-8 py-3 hover:bg-charred-oak hover:text-kiln-ash transition-colors duration-300"
        >
          Back home
        </Link>
      </motion.div>
    </main>
  );
}
