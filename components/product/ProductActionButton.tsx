"use client";

import { useState } from "react";
import { useSiteMode } from "@/context/SiteModeContext";
import EnquiryModal from "@/components/EnquiryModal";

export interface ProductActionButtonProps {
  productId: string | number;
  productName: string;
  variantId: string | number;
  variantValue: string;
  className?: string;
  onAddToCart?: (e: React.MouseEvent) => void;
  addingToCart?: boolean;
  addedToCart?: boolean;
  onViewCart?: () => void;
}

const defaultShoppingClass =
  "bg-[#005d5a] hover:bg-[#244a46] text-white";
const addedClass = "bg-[#CA5D27] hover:bg-[#b54d1f] text-white";

export default function ProductActionButton({
  productId,
  productName,
  variantId,
  variantValue,
  className = "",
  onAddToCart,
  addingToCart = false,
  addedToCart = false,
  onViewCart,
}: ProductActionButtonProps) {
  const { isEnquiryMode } = useSiteMode();
  const [enquiryOpen, setEnquiryOpen] = useState(false);

  if (isEnquiryMode) {
    return (
      <>
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setEnquiryOpen(true);
          }}
          className={`rounded-lg px-4 py-2 text-sm font-semibold text-white shadow-sm transition-all hover:scale-105 ${defaultShoppingClass} ${className}`}
        >
          Send Enquiry
        </button>
        <EnquiryModal
          productId={productId}
          productName={productName}
          variantId={variantId}
          variantValue={variantValue}
          isOpen={enquiryOpen}
          onClose={() => setEnquiryOpen(false)}
        />
      </>
    );
  }

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (addedToCart && onViewCart) {
      onViewCart();
    } else if (onAddToCart) {
      onAddToCart(e);
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={addingToCart}
      className={`rounded-lg px-4 py-2 text-sm font-semibold shadow-sm transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed ${
        addedToCart ? addedClass : defaultShoppingClass
      } ${className}`}
    >
      {addingToCart ? "Adding..." : addedToCart ? "View Cart" : "Add to Cart"}
    </button>
  );
}
