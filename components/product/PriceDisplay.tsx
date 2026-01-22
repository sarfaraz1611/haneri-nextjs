"use client";

import { Variant } from "./types";

interface PriceDisplayProps {
  variant: Variant;
}

export default function PriceDisplay({ variant }: PriceDisplayProps) {
  const regularPrice = parseFloat(variant.regular_price);
  const hasDiscount = regularPrice > variant.selling_price;
  const discountPercent = hasDiscount
    ? ((regularPrice - variant.selling_price) / regularPrice) * 100
    : 0;

  return (
    <div className="mt-6">
      <div className="flex items-center gap-3">
        {hasDiscount && (
          <span className="bg-[#CA5D27] text-white text-xs font-bold px-2 py-1 rounded">
            -{discountPercent.toFixed(2)}%
          </span>
        )}
        <span className="text-3xl font-heading text-[#075E5E] font-semibold">
          ₹{variant.selling_price.toLocaleString("en-IN")}
        </span>
      </div>

      <div className="mt-2 flex items-center gap-2">
        {hasDiscount && (
          <>
            <span className="text-xs text-gray-500 uppercase font-semibold">
              MRP
            </span>
            <del className="text-gray-400 text-sm">
              ₹{regularPrice.toLocaleString("en-IN")}
            </del>
          </>
        )}
      </div>

      <p className="text-xs text-gray-500 mt-1">Inclusive All Taxes</p>
    </div>
  );
}
