"use client";

import { Variant } from "./types";
import { COLOR_OPTIONS } from "./constants";
import { getColorHex, isLightColor } from "../FeaturedProducts";

interface VariantSelectorProps {
  variants: Variant[];
  selectedVariantId: number | null;
  onVariantSelect: (variantId: number) => void;
}

export default function VariantSelector({
  variants,
  selectedVariantId,
  onVariantSelect,
}: VariantSelectorProps) {
  if (!variants || !Array.isArray(variants) || variants.length === 0) {
    return null;
  }

  return (
    <div className="mt-5 flex items-center gap-6">
      <p className="uppercase mt-3 text-sm font-bold text-[#075E5E] mb-3">
        Select The Variant:
      </p>
      <div className="flex flex-wrap gap-3">
        {variants.map((variant) => (
          <VariantButton
            key={variant.id}
            variant={variant}
            isActive={variant.id === selectedVariantId}
            onSelect={() => onVariantSelect(variant.id)}
          />
        ))}
      </div>
    </div>
  );
}

interface VariantButtonProps {
  variant: Variant;
  isActive: boolean;
  onSelect: () => void;
}

function VariantButton({ variant, isActive, onSelect }: VariantButtonProps) {
  const colorValue = variant.color || variant.variant_value || "";
  const colorObj = COLOR_OPTIONS.find(
    (c) => c.value.toLowerCase() === colorValue.toLowerCase()
  );

  const backgroundColor = colorObj?.swatch || "#D1D5DB";
  const color = getColorHex(variant.variant_value);
  const needsBorder = isLightColor(color);

  return (
    <button
      onClick={onSelect}
      style={{ backgroundColor }}
      className={`block w-6 h-6 rounded-full cursor-pointer
        transition-transform duration-200 hover:scale-110
        ${needsBorder ? "border-2 border-gray-300" : ""}
        ${isActive ? "ring-2 ring-offset-2 ring-[#CA5D27]" : ""}`}
      title={variant.variant_value}
    >
      <span className="sr-only">{variant.variant_value}</span>
    </button>
  );
}
