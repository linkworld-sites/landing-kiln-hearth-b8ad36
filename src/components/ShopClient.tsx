"use client";

/**
 * MANAGED — do not edit. Commerce shop UI. Uses `product.id` (NOT product_id);
 * fires track('checkout') here + track('add_to_cart') in CartContext (==
 * storefront_walk). The managed `checkout()` handles hosted payment + redirect.
 * Neutral styling — inherits the site's fonts/colors.
 */
import { useMemo, useState } from "react";
import type { Product } from "@/lib/checkout";
import { checkout, formatPrice } from "@/lib/checkout";
import { track } from "@/lib/funnel";
import { useCart } from "@/components/CartContext";

export default function ShopClient({ products }: { products: Product[] }) {
  const { items, count, add, remove, clear } = useCart();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const byId = useMemo(() => {
    const m = new Map<string, Product>();
    for (const p of products) m.set(p.id, p);
    return m;
  }, [products]);
  const total = useMemo(() => items.reduce((s, i) => {
    const p = byId.get(i.product_id); return s + (p ? p.price_cents * i.quantity : 0);
  }, 0), [items, byId]);

  const onCheckout = async () => {
    if (!items.length) return;
    setError(null); setBusy(true);
    track("checkout");
    const ok = await checkout(items);
    setBusy(false);
    if (!ok) setError("Checkout is not available yet — connect payments in the cockpit.");
  };

  return (
    <div className="grid gap-12 md:grid-cols-[1fr_320px]">
      <ul className="grid gap-8 sm:grid-cols-2">
        {products.map((p) => (
          <li key={p.id} className="group flex flex-col">
            <div className="aspect-[4/5] w-full overflow-hidden rounded-lg bg-neutral-100">
              {p.image_url ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={p.image_url} alt={p.name} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-neutral-300">
                  <span className="text-2xl">{p.name}</span>
                </div>
              )}
            </div>
            <div className="mt-4 flex items-baseline justify-between gap-4">
              <h3 className="text-lg font-medium">{p.name}</h3>
              <span className="tabular-nums opacity-70">{formatPrice(p.price_cents, p.currency)}</span>
            </div>
            {p.description ? <p className="mt-1 text-sm opacity-60">{p.description}</p> : null}
            <button type="button" onClick={() => add(p)} className="mt-4 self-start border border-current px-5 py-2 text-sm uppercase tracking-wide transition-opacity hover:opacity-70">
              Add to cart
            </button>
          </li>
        ))}
      </ul>
      <aside className="h-fit border border-current/15 p-6 md:sticky md:top-24">
        <h2 className="text-xl font-medium">Cart ({count})</h2>
        {items.length === 0 ? (
          <p className="mt-4 text-sm opacity-60">Your cart is empty.</p>
        ) : (
          <>
            <ul className="mt-4 space-y-3">
              {items.map((i) => {
                const p = byId.get(i.product_id);
                if (!p) return null;
                return (
                  <li key={i.product_id} className="flex justify-between gap-3 text-sm">
                    <span>{p.name} × {i.quantity}</span>
                    <span className="flex items-center gap-2">
                      <span className="tabular-nums">{formatPrice(p.price_cents * i.quantity, p.currency)}</span>
                      <button type="button" aria-label={`Remove ${p.name}`} onClick={() => remove(i.product_id)} className="opacity-40 hover:opacity-100">×</button>
                    </span>
                  </li>
                );
              })}
            </ul>
            <div className="mt-4 flex justify-between border-t border-current/15 pt-4 font-medium">
              <span>Total</span><span className="tabular-nums">{formatPrice(total)}</span>
            </div>
            <button type="button" onClick={onCheckout} disabled={busy} className="mt-4 w-full bg-neutral-900 px-5 py-3 text-sm uppercase tracking-wide text-white transition-opacity hover:opacity-90 disabled:opacity-50">
              {busy ? "Starting checkout…" : "Checkout"}
            </button>
            <button type="button" onClick={clear} className="mt-2 w-full text-xs uppercase tracking-wide opacity-40 hover:opacity-100">Clear cart</button>
            {error ? <p className="mt-3 text-sm text-red-600">{error}</p> : null}
          </>
        )}
      </aside>
    </div>
  );
}
