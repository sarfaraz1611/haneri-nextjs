"use client";

import Image from "next/image";
import { Product } from "./types";

interface ProductInfoProps {
  product: Product;
}

export default function ProductInfo({ product }: ProductInfoProps) {
  return (
    <div>
      <Image
        src="/images/Haneri Logo.png"
        alt="Haneri"
        width={120}
        height={28}
        className="h-7 mb-2"
      />

      <h1 className="font-heading text-3xl uppercase text-[#CA5D27] font-semibold">
        {product.name || "Product Name"}
      </h1>

      <ProductRating rating={product.rating} reviewCount={product.review_count} />

      {product.category && (
        <p className="uppercase text-sm font-bold text-[#075E5E] mt-3">
          Category: <span className="font-bold">{product.category}</span>
        </p>
      )}

      {product.description && (
        <div className="text-[#777] font-normal mt-3 text-[14px]">
          Ratings/Reviews section - Not present in current code Feature Slider -
          A horizontal scrolling carousel showing product features with icons
          Discount percentage badge - Shows the percentage off MRP label and
          better price formatting
        </div>
      )}
    </div>
  );
}

interface ProductRatingProps {
  rating?: number;
  reviewCount?: number;
}

function ProductRating({ rating, reviewCount }: ProductRatingProps) {
  if (rating === undefined && !reviewCount) return null;

  return (
    <div className="flex items-center gap-3 mt-3">
      <div className="flex items-center">
        <div className="relative w-24 h-4">
          <div className="absolute inset-0 flex gap-0.5">
            {[...Array(5)].map((_, i) => (
              <span key={i} className="text-gray-300 text-sm">
                ★
              </span>
            ))}
          </div>
          <div
            className="absolute inset-0 flex gap-0.5 overflow-hidden"
            style={{
              width: `${((rating || 0) / 5) * 100}%`,
            }}
          >
            {[...Array(5)].map((_, i) => (
              <span key={i} className="text-yellow-400 text-sm">
                ★
              </span>
            ))}
          </div>
        </div>
      </div>
      {reviewCount && reviewCount > 0 && (
        <a href="#" className="text-[#075E5E] text-sm hover:underline">
          ( {reviewCount} Reviews )
        </a>
      )}
    </div>
  );
}
