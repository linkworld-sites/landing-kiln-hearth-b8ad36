"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/components/CartContext";

function NavInner() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { count } = useCart();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const links = [
    { label: "Collection", href: "/shop" },
    { label: "Process", href: "/#process" },
    { label: "Journal", href: "/blog" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-kiln-ash/95 backdrop-blur-sm border-b border-charred-oak/10"
          : ""
      }`}
    >
      <nav className="flex items-center justify-between px-6 md:px-10 py-5 max-w-screen-2xl mx-auto">
        {/* Logo */}
        <Link
          href="/"
          className="font-cormorant text-xl italic tracking-[0.08em] text-charred-oak hover:opacity-70 transition-opacity duration-200"
        >
          Kiln &amp; Hearth
        </Link>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-10">
          {links.map(({ label, href }) => (
            <li key={href}>
              <Link
                href={href}
                className="relative group font-dm text-[11px] tracking-[0.2em] uppercase text-charred-oak py-1 block"
              >
                {label}
                <span className="absolute bottom-0 left-0 right-0 h-px bg-charred-oak scale-x-0 group-hover:scale-x-100 transition-transform duration-200 ease-in-out origin-center" />
              </Link>
            </li>
          ))}
        </ul>

        {/* Right actions */}
        <div className="flex items-center gap-5">
          <Link
            href="/shop"
            className="hidden md:flex items-center gap-2 font-dm text-[11px] tracking-[0.2em] uppercase border border-charred-oak px-5 py-2.5 hover:bg-charred-oak hover:text-kiln-ash transition-colors duration-300"
          >
            Shop
            {count > 0 && (
              <span className="w-4 h-4 rounded-full bg-fired-terra text-kiln-ash text-[9px] flex items-center justify-center font-dm">
                {count}
              </span>
            )}
          </Link>

          {/* Mobile menu button */}
          <button
            aria-label="Open menu"
            className="md:hidden w-8 h-8 flex flex-col justify-center gap-[5px]"
            onClick={() => setMenuOpen(true)}
          >
            <span className="block h-px bg-charred-oak" />
            <span className="block h-px bg-charred-oak w-5" />
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-kiln-ash flex flex-col"
          >
            <div className="flex items-center justify-between px-6 py-5">
              <Link
                href="/"
                className="font-cormorant text-xl italic tracking-[0.08em]"
                onClick={() => setMenuOpen(false)}
              >
                Kiln &amp; Hearth
              </Link>
              <button
                aria-label="Close menu"
                className="w-8 h-8 flex items-center justify-center text-2xl text-charred-oak/60"
                onClick={() => setMenuOpen(false)}
              >
                ×
              </button>
            </div>
            <ul className="flex flex-col items-center justify-center flex-1 gap-8">
              {[...links, { label: "Shop", href: "/shop" }].map(({ label, href }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="font-cormorant text-4xl italic text-charred-oak"
                    onClick={() => setMenuOpen(false)}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export default function Navigation() {
  return <NavInner />;
}
