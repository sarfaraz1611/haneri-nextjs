"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import ProductDetailClient from "@/components/product/ProductDetailClient";

function ProductDetailContent() {
  const searchParams = useSearchParams();

  // Get productId and variantId from URL search params
  const productId = searchParams.get("id");
  const variantId = searchParams.get("v_id") || undefined;

  // Don't render if no productId
  if (!productId) {
    return (
      <main className="bg-white min-h-screen flex items-center justify-center">
        <div className="text-red-600 text-xl">
          Product ID is required in URL. Current URL:{" "}
          {typeof window !== "undefined" ? window.location.href : "N/A"}
        </div>
      </main>
    );
  }

  return <ProductDetailClient productId={productId} variantId={variantId} />;
}

export default function ProductDetailPage() {
  return (
    <Suspense
      fallback={
        <main className="bg-white min-h-screen flex items-center justify-center">
          <div className="text-[#075E5E] text-xl">Loading...</div>
        </main>
      }
    >
      <ProductDetailContent />
    </Suspense>
  );
}
