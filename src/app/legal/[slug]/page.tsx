import Link from "next/link";
import { notFound } from "next/navigation";
import { getLegalPage, getLegalSlugs } from "@/lib/legal";

export function generateStaticParams() {
  return getLegalSlugs().map((slug) => ({ slug }));
}

export const dynamicParams = false;

export default async function LegalPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = getLegalPage(slug);
  if (!page) notFound();
  return (
    <main className="min-h-screen bg-kiln-ash pt-28 pb-24 px-6 md:px-16">
      <div className="max-w-2xl mx-auto">
        <Link
          href="/"
          className="font-dm text-[10px] tracking-[0.2em] uppercase text-charred-oak/40 hover:text-charred-oak transition-colors duration-200 flex items-center gap-2 mb-12"
        >
          <span className="h-px w-6 bg-current" />
          Home
        </Link>
        <article
          className="post-body text-charred-oak"
          dangerouslySetInnerHTML={{ __html: page.html }}
        />
      </div>
    </main>
  );
}
