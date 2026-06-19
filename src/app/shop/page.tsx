import ShopClient from "@/components/ShopClient";
import ProductViewTracker from "@/components/ProductViewTracker";
import TestClickButton from "@/components/TestClickButton";
import { getProducts } from "@/lib/products";

export const metadata = {
  title: "Shop — Kiln & Hearth",
  description: "Handcrafted ceramics made in small batches. Every piece carries the mark of the hand that made it.",
};

export default async function ShopPage() {
  const products = await getProducts();

  return (
    <>
      <ProductViewTracker />
      <main className="min-h-screen bg-kiln-ash pt-28 pb-24 px-6 md:px-16">
        <div className="max-w-screen-xl mx-auto">
          {/* Page header */}
          <header className="mb-16 md:mb-20 border-b border-charred-oak/10 pb-10">
            <p className="font-dm text-[10px] tracking-[0.3em] uppercase text-charred-oak/40 mb-3">
              Small batch, made to order
            </p>
            <h1 className="font-cormorant italic text-[clamp(2.5rem,5vw,4rem)] text-charred-oak leading-none">
              The Collection
            </h1>
            <p className="font-dm text-sm text-charred-oak/50 mt-4 max-w-md leading-relaxed">
              Every piece is thrown on the wheel, glazed by hand, and fired once.
              A small batch. Once it&rsquo;s gone, it&rsquo;s gone.
            </p>
          </header>

          <TestClickButton />
          {/* Shop grid + cart */}
          <ShopClient products={products} />
        </div>
      </main>
    </>
  );
}
