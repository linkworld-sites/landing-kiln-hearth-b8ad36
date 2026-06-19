"use client";
import { useState } from "react";
import { useCart } from "@/components/CartContext";

export default function TestClickButton() {
  const [clicked, setClicked] = useState(0);
  const { count, items } = useCart();

  return (
    <div className="p-4 border border-fired-terra text-sm font-dm" data-testid="cart-debug">
      <p>Clicks: {clicked} | Cart count: {count} | Items: {items.length}</p>
      <button
        type="button"
        className="mt-2 px-4 py-2 bg-fired-terra text-bone"
        onClick={() => setClicked((c) => c + 1)}
        data-testid="test-click-btn"
      >
        Test click ({clicked})
      </button>
    </div>
  );
}
