import Link from "next/link";
import { getPosts } from "@/lib/posts";

export const metadata = {
  title: "Journal — Kiln & Hearth",
  description: "Essays from the studio on making, slowness, and the objects we live with.",
};

export default function BlogIndex() {
  const posts = getPosts();
  return (
    <main className="min-h-screen bg-kiln-ash pt-28 pb-24 px-6 md:px-16">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <header className="mb-16 border-b border-charred-oak/10 pb-10">
          <p className="font-dm text-[10px] tracking-[0.3em] uppercase text-charred-oak/40 mb-3">
            From the studio
          </p>
          <h1 className="font-cormorant italic text-[clamp(2.5rem,5vw,4rem)] text-charred-oak leading-none">
            Journal
          </h1>
          <p className="font-dm text-sm text-charred-oak/50 mt-4 leading-relaxed">
            Essays on making, slowness, and the objects we live with.
          </p>
        </header>

        {posts.length === 0 ? (
          <p className="font-cormorant italic text-xl text-charred-oak/40">
            New essays arriving soon.
          </p>
        ) : (
          <ul className="space-y-12">
            {posts.map((p) => (
              <li key={p.slug}>
                <Link href={`/blog/${p.slug}`} className="group block border-t border-charred-oak/10 pt-8">
                  <h2 className="font-cormorant italic text-[clamp(1.5rem,2.5vw,2rem)] text-charred-oak leading-snug mb-3 group-hover:opacity-70 transition-opacity duration-200">
                    {p.title}
                  </h2>
                  {p.description && (
                    <p className="font-dm text-sm leading-[1.8] text-charred-oak/55 mb-4">
                      {p.description}
                    </p>
                  )}
                  <span className="font-dm text-[10px] tracking-[0.2em] uppercase text-charred-oak/30 group-hover:text-fired-terra transition-colors duration-200 flex items-center gap-2">
                    Read
                    <span className="h-px w-6 bg-current" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}
