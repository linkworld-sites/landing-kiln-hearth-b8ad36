"use client";
import { useRef } from "react";
import Link from "next/link";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { formatPrice } from "@/lib/checkout";
import type { Product } from "@/lib/checkout";
import Image from "next/image";

const IMAGES = ["/images/lifestyle.png", "/images/texture.png", "/images/environment.png"];

function ProductCard({
  product,
  index,
  imageOverride,
  tall,
}: {
  product: Product;
  index: number;
  imageOverride?: string;
  tall?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const shouldReduce = useReducedMotion();

  return (
    <motion.div
      ref={ref}
      initial={shouldReduce ? {} : { opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.7,
        delay: index * 0.12,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="group"
    >
      <Link href="/shop" className="block">
        <div
          className={`relative overflow-hidden bg-bone ${tall ? "aspect-[3/4]" : "aspect-[4/5]"}`}
        >
          {imageOverride ? (
            <Image
              src={imageOverride}
              alt={product.name}
              fill
              className="object-cover transition-all duration-700 ease-settle group-hover:scale-105 group-hover:brightness-110"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 border-2 border-dashed border-charred-oak/20">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none" className="opacity-20">
                <circle cx="16" cy="16" r="12" stroke="#2C2016" strokeWidth="1" />
                <circle cx="16" cy="16" r="5" stroke="#2C2016" strokeWidth="1" />
                <line x1="16" y1="4" x2="16" y2="0" stroke="#2C2016" strokeWidth="1" />
              </svg>
              <p className="font-cormorant italic text-sm text-charred-oak/30">Product photo</p>
            </div>
          )}
          {/* Warm overlay on hover */}
          <div className="absolute inset-0 bg-fired-terra/0 group-hover:bg-fired-terra/8 transition-colors duration-500" />
        </div>
        <div className="mt-4">
          <h3 className="font-dm text-sm tracking-wide text-charred-oak">{product.name}</h3>
          <p className="font-dm text-xs text-charred-oak/50 mt-0.5">
            {formatPrice(product.price_cents, product.currency)}
          </p>
        </div>
      </Link>
    </motion.div>
  );
}

export default function CollectionPreview({ products }: { products: Product[] }) {
  const featured = products.slice(0, 3);

  return (
    <section className="bg-kiln-ash py-24 md:py-32 px-6 md:px-16">
      <div className="max-w-screen-xl mx-auto">
        {/* Section header */}
        <div className="flex items-end justify-between mb-12 md:mb-16">
          <div>
            <p className="font-dm text-[10px] tracking-[0.3em] uppercase text-charred-oak/40 mb-2">
              Current collection
            </p>
            <h2 className="font-cormorant italic text-[clamp(2rem,4vw,3rem)] text-charred-oak leading-none">
              Made to Last
            </h2>
          </div>
          <Link
            href="/shop"
            className="hidden md:flex items-center gap-3 font-dm text-[11px] tracking-[0.2em] uppercase text-charred-oak/60 hover:text-charred-oak transition-colors duration-200 group"
          >
            View all
            <span className="h-px w-8 bg-charred-oak/30 group-hover:w-12 transition-all duration-300" />
          </Link>
        </div>

        {/* Asymmetric editorial grid */}
        {featured.length === 0 ? (
          <p className="font-cormorant italic text-xl text-charred-oak/40 text-center py-16">
            New pieces arriving soon.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-6">
            {/* Large left card */}
            {featured[0] && (
              <div className="md:col-span-7 md:row-span-2">
                <ProductCard product={featured[0]} index={0} imageOverride={IMAGES[0]} tall />
              </div>
            )}
            {/* Two right cards stacked */}
            {featured[1] && (
              <div className="md:col-span-5">
                <ProductCard product={featured[1]} index={1} imageOverride={IMAGES[1]} />
              </div>
            )}
            {featured[2] && (
              <div className="md:col-span-5">
                <ProductCard product={featured[2]} index={2} imageOverride={IMAGES[2]} />
              </div>
            )}
          </div>
        )}

        {/* Mobile view all */}
        <div className="mt-10 md:hidden text-center">
          <Link
            href="/shop"
            className="inline-block font-dm text-[11px] tracking-[0.2em] uppercase border border-charred-oak px-8 py-3 hover:bg-charred-oak hover:text-kiln-ash transition-colors duration-300"
          >
            View all pieces
          </Link>
        </div>
      </div>
    </section>
  );
}
