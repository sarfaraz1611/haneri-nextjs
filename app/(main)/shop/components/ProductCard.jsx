"use client";
import { useState } from "react";
import Link from "next/link";

// Color options with swatches
const COLOR_OPTIONS = [
  { label: "Denim Blue", value: "Denim Blue", swatch: "#6497B2" },
  { label: "Baby Pink", value: "Baby Pink", swatch: "#C7ABA9" },
  { label: "Pearl White", value: "Pearl White", swatch: "#F5F5F5" },
  { label: "Matte Black", value: "Matte Black", swatch: "#21201E" },
  { label: "Pine", value: "Pine", swatch: "#DDC194" },
  { label: "Beige", value: "Beige", swatch: "#E6E0D4" },
  { label: "Walnut", value: "Walnut", swatch: "#926148" },
  { label: "Sunset Copper", value: "Sunset Copper", swatch: "#936053" },
  { label: "Royal Brass", value: "Royal Brass", swatch: "#B7A97C" },
  { label: "Regal Gold", value: "Regal Gold", swatch: "#D3B063" },
  { label: "Pure Steel", value: "Pure Steel", swatch: "#878782" },
  { label: "Metallic Grey", value: "Metallic Grey", swatch: "#D4D4D4" },
  { label: "Sand Beige", value: "Sand Beige", swatch: "#D3CBBB" },
  { label: "Metallic Walnut", value: "Metallic Walnut", swatch: "#7F513F" },
  { label: "Espresso Walnut", value: "Espresso Walnut", swatch: "#926148" },
  { label: "Moonlit White", value: "Moonlit White", swatch: "#E6E6E6" },
  { label: "Natural Pine", value: "Natural Pine", swatch: "#DDC194" },
  { label: "Velvet Black", value: "Velvet Black", swatch: "#0B0A08" },
];

// Utility function
const classNames = (...classes) => classes.filter(Boolean).join(" ");

const normalizePrice = (val) => {
  if (!val) return 0;
  return parseFloat(String(val).replace(/,/g, ""));
};

export default function ProductCard({ product, onAddToCart }) {
  const [activeVariant, setActiveVariant] = useState(product.variants[0] || {});

  const regularPrice = normalizePrice(activeVariant.regular_price);
  const sellingPrice = normalizePrice(activeVariant.selling_price);
  const hasDiscount = regularPrice > 0 && regularPrice !== sellingPrice;

  const imageUrl =
    activeVariant.file_urls?.[0] ||
    activeVariant.variant_images?.[0]?.image_url ||
    product.product_images?.[0]?.image_url ||
    "/images/placeholder.jpg";

  const shortDesc = product.description
    ? product.description.replace(/<[^>]*>?/gm, "").substring(0, 80) + "..."
    : "";

  const productUrl = `/product_detail?id=${product.id}&v_id=${activeVariant.id}`;

  return (
    <li className="group relative flex flex-col">
      {/* Product Image */}
      <Link href={productUrl}>
        <div className="aspect-square w-full overflow-hidden rounded-lg bg-gray-200">
          <img
            alt={activeVariant.variant_value || product.name}
            src={imageUrl}
            className="h-full w-full object-cover object-center group-hover:opacity-75 transition-opacity"
          />
        </div>
      </Link>

      {/* Brand Logo */}
      <div className="mt-3 flex justify-center">
        <img
          src="/images/Link_img.png"
          alt="Haneri"
          className="h-6 object-contain"
        />
      </div>

      {/* Product Info */}
      <div className="mt-3 flex flex-col">
        <h3 className="text-sm font-medium text-gray-900">
          <Link href={productUrl}>{product.name}</Link>
        </h3>

        {shortDesc && (
          <p className="mt-1 text-xs text-gray-500 line-clamp-2">{shortDesc}</p>
        )}

        {/* Price Display */}
        <div className="mt-2 flex items-center gap-2">
          <p className="text-base font-semibold text-gray-900">
            ₹{sellingPrice || activeVariant.price || 0}
          </p>
          {hasDiscount && (
            <p className="text-sm text-gray-500 line-through">
              ₹{regularPrice}
            </p>
          )}
        </div>
      </div>

      {/* Color Variant Selector */}
      {product.variants && product.variants.length > 0 && (
        <div className="mt-4">
          <h4 className="sr-only">Available colors</h4>
          <ul role="list" className="flex items-center flex-wrap gap-2">
            {product.variants.map((variant) => {
              // Try to find color match from variant.color or variant.variant_value
              const colorValue = variant.color || variant.variant_value || "";
              const colorObj = COLOR_OPTIONS.find(
                (c) => c.value.toLowerCase() === colorValue.toLowerCase()
              );
              const isActive = variant.id === activeVariant.id;

              // Use color swatch or default gray
              const backgroundColor = colorObj?.swatch || "#D1D5DB";

              return (
                <li
                  key={variant.id}
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveVariant(variant);
                  }}
                  style={{ backgroundColor }}
                  className={classNames(
                    "size-7 rounded-full border-2 cursor-pointer hover:scale-110 transition-transform shadow-sm",
                    isActive
                      ? "border-indigo-600 ring-2 ring-indigo-600 ring-offset-2"
                      : "border-gray-400"
                  )}
                  title={colorValue}
                >
                  <span className="sr-only">{colorValue}</span>
                </li>
              );
            })}
          </ul>
        </div>
      )}

      {/* Add to Cart Button */}
      <button
        onClick={(e) => {
          e.preventDefault();
          onAddToCart(product.id, activeVariant.id);
        }}
        className="mt-4 w-full rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-colors"
      >
        Add to Cart
      </button>
    </li>
  );
}
