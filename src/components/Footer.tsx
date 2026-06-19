"use client";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-charred-oak text-bone/80 pt-20 pb-10">
      <div className="max-w-screen-xl mx-auto px-8 md:px-16">
        {/* Top grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 pb-16 border-b border-bone/10">
          {/* Studio stamp */}
          <div className="space-y-4">
            <p className="font-cormorant text-2xl italic text-bone">Kiln &amp; Hearth</p>
            <address className="not-italic font-dm text-sm leading-relaxed text-bone/50 font-small-caps tracking-widest">
              Studio & Workshop<br />
              12 Potters Lane<br />
              Made slowly. Used daily.
            </address>
          </div>

          {/* Navigation */}
          <div>
            <p className="font-dm text-[10px] tracking-[0.25em] uppercase text-bone/40 mb-5">
              Navigate
            </p>
            <ul className="space-y-3">
              {[
                ["Collection", "/shop"],
                ["Process", "/#process"],
                ["Journal", "/blog"],
                ["Privacy", "/legal/privacy"],
                ["Cookies", "/legal/cookies"],
              ].map(([label, href]) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="font-dm text-sm text-bone/60 hover:text-bone transition-colors duration-200 font-small-caps tracking-widest"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Email signup */}
          <div>
            <p className="font-cormorant text-lg italic text-bone/70 mb-4">
              Letters from the studio.
            </p>
            <p className="font-dm text-sm text-bone/50 mb-5 leading-relaxed">
              Slow notes on making, glazing, and the occasional new piece.
            </p>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex border border-bone/20"
            >
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 bg-transparent px-4 py-3 font-dm text-sm text-bone/80 placeholder-bone/30 outline-none"
              />
              <button
                type="submit"
                className="px-5 py-3 font-dm text-[10px] tracking-[0.2em] uppercase text-bone/50 hover:text-bone hover:bg-bone/5 transition-colors duration-200 border-l border-bone/20"
              >
                Send
              </button>
            </form>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8">
          <p className="font-dm text-[11px] tracking-widest text-bone/30 font-small-caps">
            © {new Date().getFullYear()} Kiln &amp; Hearth
          </p>
          {/* Kiln icon — SVG mark */}
          <svg
            width="28"
            height="28"
            viewBox="0 0 28 28"
            fill="none"
            className="opacity-30"
            aria-hidden="true"
          >
            <ellipse cx="14" cy="20" rx="8" ry="4" stroke="#E8D5B7" strokeWidth="1" />
            <path d="M6 20 C6 12 10 6 14 4 C18 6 22 12 22 20" stroke="#E8D5B7" strokeWidth="1" fill="none" />
            <line x1="14" y1="4" x2="14" y2="1" stroke="#E8D5B7" strokeWidth="1" />
            <line x1="10" y1="6" x2="8" y2="3" stroke="#E8D5B7" strokeWidth="1" />
            <line x1="18" y1="6" x2="20" y2="3" stroke="#E8D5B7" strokeWidth="1" />
          </svg>
          <p className="font-dm text-[11px] tracking-widest text-bone/30 font-small-caps">
            Handmade in small batches
          </p>
        </div>
      </div>
    </footer>
  );
}
