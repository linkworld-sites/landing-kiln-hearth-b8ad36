import Link from "next/link";
import { notFound } from "next/navigation";
import { getPost, getPosts } from "@/lib/posts";

export function generateStaticParams() {
  return getPosts().map((p) => ({ slug: p.slug }));
}

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();
  return (
    <main className="min-h-screen bg-kiln-ash pt-28 pb-24 px-6 md:px-16">
      <div className="max-w-2xl mx-auto">
        <Link
          href="/blog"
          className="font-dm text-[10px] tracking-[0.2em] uppercase text-charred-oak/40 hover:text-charred-oak transition-colors duration-200 flex items-center gap-2 mb-12"
        >
          <span className="h-px w-6 bg-current" />
          All essays
        </Link>
        <h1 className="font-cormorant italic text-[clamp(2rem,4vw,3rem)] text-charred-oak leading-tight mb-6">
          {post.title}
        </h1>
        {post.date && (
          <p className="font-dm text-[11px] tracking-widest uppercase text-charred-oak/30 mb-10 font-small-caps">
            {post.date}
          </p>
        )}
        <article
          className="post-body text-charred-oak"
          dangerouslySetInnerHTML={{ __html: post.html }}
        />
        <div className="mt-16 pt-10 border-t border-charred-oak/10">
          <Link
            href="/blog"
            className="font-dm text-[10px] tracking-[0.2em] uppercase text-charred-oak/40 hover:text-charred-oak transition-colors duration-200 flex items-center gap-2"
          >
            <span className="h-px w-6 bg-current" />
            All essays
          </Link>
        </div>
      </div>
    </main>
  );
}
