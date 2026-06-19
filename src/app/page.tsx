import HeroSection from "@/components/home/HeroSection";
import ManifestoStrip from "@/components/home/ManifestoStrip";
import CollectionPreview from "@/components/home/CollectionPreview";
import ProcessPanel from "@/components/home/ProcessPanel";
import SignaturePieces from "@/components/home/SignaturePieces";
import CuratedSets from "@/components/home/CuratedSets";
import GlazePalette from "@/components/home/GlazePalette";
import JournalTeasers from "@/components/home/JournalTeasers";
import Testimonials from "@/components/home/Testimonials";
import { getProducts } from "@/lib/products";

export default async function Home() {
  const products = await getProducts();

  return (
    <main>
      <HeroSection />
      <ManifestoStrip />
      <CollectionPreview products={products} />
      <ProcessPanel />
      <SignaturePieces />
      <CuratedSets />
      <GlazePalette />
      <JournalTeasers />
      <Testimonials />
    </main>
  );
}
