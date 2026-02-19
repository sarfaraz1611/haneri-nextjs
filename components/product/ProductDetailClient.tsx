"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

import ProductGallery, { BannerImages } from "./ProductGallery";
import ProductInfo from "./ProductInfo";
import VariantSelector from "./VariantSelector";
import PriceDisplay from "./PriceDisplay";
import QuantitySelector from "./QuantitySelector";
import FeatureSlider from "./FeatureSlider";
import ProductSpecifications from "./ProductSpecifications";
import ProductFAQ from "./ProductFAQ";
import DescriptionSection from "./DescriptionSection";
import { useProduct, useCart } from "./hooks";
import { ProductDetailClientProps } from "./types";

export default function ProductDetailClient({
  productId,
  variantId,
}: ProductDetailClientProps) {
  const router = useRouter();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const {
    product,
    loading,
    error,
    selectedVariantId,
    setSelectedVariantId,
    selectedVariant,
    variants,
    images,
  } = useProduct({ productId, variantId });

  const { quantity, setQuantity, addingToCart, addedToCart, handleAddToCart } =
    useCart({ productId, variantId: selectedVariantId });

  const priceRef = useRef<HTMLDivElement>(null);
  const [showStickyCart, setShowStickyCart] = useState(false);

  // Show sticky cart when price section scrolls out of view
  useEffect(() => {
    const el = priceRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setShowStickyCart(!entry.isIntersecting),
      { threshold: 0 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [loading, selectedVariant]);

  // Reset image index when variant changes
  useEffect(() => {
    setCurrentImageIndex(0);
  }, [selectedVariantId]);

  // Ensure currentImageIndex stays within bounds
  useEffect(() => {
    if (images.length > 0 && currentImageIndex >= images.length) {
      setCurrentImageIndex(0);
    }
  }, [images, currentImageIndex]);

  if (loading) {
    return <LoadingState />;
  }

  if (error || !product) {
    return <ErrorState error={error} />;
  }

  const handleCartAction = () => {
    if (addedToCart) {
      router.push("/cart");
    } else {
      handleAddToCart();
    }
  };

  return (
    <main className="bg-white mt-20">
      <section className="container mx-auto px-4 lg:px-6 py-6">
        <div className="lg:grid lg:grid-cols-2 lg:gap-10">
          {/* Left: Gallery */}
          <ProductGallery
            images={images}
            currentImageIndex={currentImageIndex}
            onImageSelect={setCurrentImageIndex}
            productName={product.name}
            selectedVariant={selectedVariant}
          />

          {/* Right: Product Info */}
          <div className="mt-6 lg:mt-20">
            <div className="sticky top-24 xl:top-40">
              <ProductInfo product={product} />

              <VariantSelector
                variants={variants}
                selectedVariantId={selectedVariantId}
                onVariantSelect={setSelectedVariantId}
              />

              <div ref={priceRef}>
                {selectedVariant && <PriceDisplay variant={selectedVariant} />}
              </div>

              {/* Quantity + CTA */}
              <div className="flex items-center gap-4 mt-6">
                <QuantitySelector
                  quantity={quantity}
                  onQuantityChange={setQuantity}
                />
                <AddToCartButton
                  onClick={handleCartAction}
                  disabled={addingToCart}
                  addingToCart={addingToCart}
                  addedToCart={addedToCart}
                />
              </div>

              <GuideLinks />

              <hr className="my-6 border-gray-200" />

              <FeatureSlider featureIcons={product.feature_icons} />
            </div>
          </div>
        </div>
      </section>
      {selectedVariant?.banner_urls &&
        selectedVariant.banner_urls.length > 0 && (
          <div className="block lg:hidden">
            <BannerImages bannerUrls={selectedVariant.banner_urls} />
          </div>
        )}

      {product.description && (
        <DescriptionSection description={product.description} />
      )}

      {product.features && product.features.length > 0 && (
        <ProductSpecifications features={product.features} />
      )}

      <ProductFAQ />

      {/* Mobile Sticky Cart */}
      {selectedVariant && (
        <div
          className={`fixed left-0 right-0 z-40 bg-white transition-transform duration-300 bottom-0 border-t border-gray-200 shadow-[0_-4px_12px_rgba(0,0,0,0.1)] lg:bottom-auto lg:top-20 lg:border-t-0 lg:border-b lg:shadow-[0_4px_12px_rgba(0,0,0,0.1)] ${
            showStickyCart ? "translate-y-0" : "translate-y-full lg:-translate-y-[200%]"
          }`}
        >
          <div className="flex items-center justify-around gap-3 px-4  py-4">
            {/* Quantity */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-9 h-9 rounded-lg border border-gray-300 flex items-center justify-center text-lg font-bold"
                aria-label="Decrease quantity"
              >
                −
              </button>
              <span className="w-7 text-center font-semibold">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="w-9 h-9 rounded-lg border border-gray-300 flex items-center justify-center text-lg font-bold"
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>

            {/* Total */}
            <div className="text-center">
              <div className="text-lg font-bold text-[#075E5E]">
                ₹
                {(selectedVariant.selling_price * quantity).toLocaleString(
                  "en-IN",
                )}
              </div>
              <small className="text-xs text-gray-500">Incl. taxes</small>
            </div>

            {/* Add to Cart / View Cart */}
            <button
              onClick={handleCartAction}
              disabled={addingToCart}
              className={`px-5 py-2.5 rounded-lg font-bold text-sm text-white transition-colors disabled:opacity-50 ${
                addedToCart
                  ? "bg-[#CA5D27] hover:bg-[#b54d1f]"
                  : "bg-[#075E5E] hover:bg-[#064d4d]"
              }`}
            >
              {addingToCart
                ? "Adding..."
                : addedToCart
                  ? "View Cart"
                  : "Add to Cart"}
            </button>
          </div>
        </div>
      )}
    </main>
  );
}

function LoadingState() {
  return (
    <main className="bg-white min-h-screen flex items-center justify-center">
      <div className="text-[#075E5E] text-xl">Loading...</div>
    </main>
  );
}

function ErrorState({ error }: { error: string | null }) {
  return (
    <main className="bg-white min-h-screen flex items-center justify-center">
      <div className="text-red-600 text-xl">{error || "Product not found"}</div>
    </main>
  );
}

function GuideLinks() {
  return (
    <>
      <hr className="my-6 border-gray-200" />
      <div className="flex gap-6 mt-6 text-sm font-semibold text-[#075E5E]">
        <a href="#">Buying Guide</a>
        <a href="#">Installation Guide</a>
      </div>
    </>
  );
}

interface AddToCartButtonProps {
  onClick: () => void;
  disabled: boolean;
  addingToCart: boolean;
  addedToCart: boolean;
}

function AddToCartButton({
  onClick,
  disabled,
  addingToCart,
  addedToCart,
}: AddToCartButtonProps) {
  const buttonText = addingToCart
    ? "Adding..."
    : addedToCart
      ? "View Cart"
      : "Add to Cart";

  const buttonClass = addedToCart
    ? "bg-[#CA5D27] hover:bg-[#b54d1f] text-white"
    : "bg-[#075E5E] hover:bg-[#064d4d] text-white";

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`px-6 py-3 rounded-lg font-bold transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${buttonClass}`}
    >
      {buttonText}
    </button>
  );
}
