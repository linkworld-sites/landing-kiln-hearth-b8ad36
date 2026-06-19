"use client";
import { useEffect } from "react";
import { track } from "@/lib/funnel";

export default function ProductViewTracker() {
  useEffect(() => {
    track("product_view");
  }, []);
  return null;
}
