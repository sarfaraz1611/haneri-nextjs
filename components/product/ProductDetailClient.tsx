"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import ProductGallery from "./ProductGallery";
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

              {selectedVariant && <PriceDisplay variant={selectedVariant} />}

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

      {product.description && (
        <DescriptionSection description={product.description} />
      )}

      {product.features && product.features.length > 0 && (
        <ProductSpecifications features={product.features} />
      )}

      <ProductFAQ />
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
