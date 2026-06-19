"use client";
import { useRef } from "react";
import Link from "next/link";
import { motion, useInView, useReducedMotion } from "framer-motion";
import Image from "next/image";

const PIECES = [
  {
    name: "The Everyday Mug",
    price: "€38",
    description:
      "Thrown wide so both hands can hold it. The rim curves inward just enough to keep the heat. It weighs what a mug should weigh — solid, purposeful, alive.",
    detail: "Holds 350ml. Dishwasher safe. Made in batches of twelve.",
    image: "/images/texture.png",
    imageAlt: "Close-up of clay surface detail showing finger ridges and glaze texture",
  },
  {
    name: "The Dinner Bowl",
    price: "€52",
    description:
      "Wide and generous, with a foot ring that lifts it off the table. Made for soups, salads, and long meals that end with bread mopping the last of the sauce.",
    detail: "27cm diameter. Oven safe to 220°C. Made in batches of eight.",
    image: "/images/lifestyle.png",
    imageAlt: "Glazed ceramic bowl catching raking side-light on a raw wood shelf",
  },
  {
    name: "The Bud Vase",
    price: "€45",
    description:
      "A slender neck. A steady, weighted base. Made for the single stem you bring in from the garden without thinking — the one that changes a table.",
    detail: "22cm tall. Each one unique in glaze pooling. Small batch.",
    image: "/images/environment.png",
    imageAlt: "Bud vase silhouette against natural light showing glaze gradients",
  },
];

function PiecePanel({
  piece,
  index,
}: {
  piece: (typeof PIECES)[number];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });
  const shouldReduce = useReducedMotion();
  const isEven = index % 2 === 0;

  return (
    <div
      ref={ref}
      className={`grid grid-cols-1 md:grid-cols-2 min-h-[80vh] ${isEven ? "" : "md:[&>*:first-child]:order-2"}`}
    >
      {/* Image side */}
      <motion.div
        initial={shouldReduce ? {} : { clipPath: "inset(0 100% 0 0)" }}
        animate={inView ? { clipPath: "inset(0 0% 0 0)" } : {}}
        transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
        className="relative min-h-[50vh] md:min-h-full overflow-hidden"
      >
        <Image
          src={piece.image}
          alt={piece.imageAlt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        {/* Product placeholder overlay */}
        <div className="absolute bottom-8 right-8 border border-bone/30 bg-charred-oak/40 backdrop-blur-sm px-4 py-3">
          <p className="font-cormorant italic text-xs text-bone/50">
            Product photo — coming soon
          </p>
        </div>
      </motion.div>

      {/* Text side */}
      <motion.div
        initial={shouldReduce ? {} : { opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="flex flex-col justify-center px-8 md:px-16 py-16 md:py-20 bg-kiln-ash"
      >
        <p className="font-dm text-[10px] tracking-[0.3em] uppercase text-charred-oak/30 mb-6">
          Signature piece
        </p>
        <h2 className="font-cormorant italic text-[clamp(2rem,3.5vw,2.8rem)] text-charred-oak leading-tight mb-2">
          {piece.name}
        </h2>
        <p className="font-cormorant text-lg text-fired-terra mb-8">{piece.price}</p>
        <p className="font-dm text-sm leading-[1.8] text-charred-oak/70 mb-4 max-w-xs">
          {piece.description}
        </p>
        <p className="font-cormorant italic text-sm text-charred-oak/40 mb-10">
          {piece.detail}
        </p>
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}>
          <Link
            href="/shop"
            className="inline-block font-dm text-[11px] tracking-[0.2em] uppercase bg-fired-terra text-bone px-8 py-3.5 hover:bg-charred-oak transition-colors duration-300"
          >
            Add to cart
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default function SignaturePieces() {
  return (
    <section className="overflow-hidden">
      {PIECES.map((piece, i) => (
        <PiecePanel key={piece.name} piece={piece} index={i} />
      ))}
    </section>
  );
}
