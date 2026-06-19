import type { Product } from "@/lib/checkout";
import { fetchProducts } from "@/lib/checkout";

/**
 * Catalog. Live products come from the LinkWorld API (fetchProducts); this demo
 * list is the fallback so the site always renders. REPLACE these with the
 * company's real products (name/description/price/image_url). The `Product`
 * type is MANAGED (src/lib/checkout.ts): the key field is `id` (string) — NOT
 * `product_id`. Use real generated images for image_url.
 */
export const CATALOG: Product[] = [
  {
    id: "everyday-mug",
    name: "Everyday Mug",
    description: "Thrown on the wheel. Holds your morning with both hands.",
    price_cents: 3800,
    currency: "EUR",
    image_url: null,
    stock: null,
  },
  {
    id: "dinner-bowl",
    name: "Dinner Bowl",
    description: "Wide and generous. Made for soups, salads, and long meals.",
    price_cents: 5200,
    currency: "EUR",
    image_url: null,
    stock: null,
  },
  {
    id: "bud-vase",
    name: "Bud Vase",
    description: "Slender neck, steady base. For a single stem from the garden.",
    price_cents: 4500,
    currency: "EUR",
    image_url: null,
    stock: null,
  },
  {
    id: "side-plate",
    name: "Side Plate",
    description: "A plate that earns its place on the table. Every morning.",
    price_cents: 2800,
    currency: "EUR",
    image_url: null,
    stock: null,
  },
  {
    id: "morning-table-set",
    name: "Morning Table",
    description: "Mug, bowl, and side plate in one glaze. A morning made whole.",
    price_cents: 10500,
    currency: "EUR",
    image_url: null,
    stock: null,
  },
  {
    id: "gathering-set",
    name: "The Gathering",
    description: "Four dinner bowls, four mugs. A table worth returning to.",
    price_cents: 21000,
    currency: "EUR",
    image_url: null,
    stock: null,
  },
];

/** Live products when configured, else the demo catalog. */
export async function getProducts(): Promise<Product[]> {
  const live = await fetchProducts();
  return live.length ? live : CATALOG;
}
