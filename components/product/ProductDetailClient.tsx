"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import axios from "axios";

const BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://haneri.ongoingsites.xyz/domex";

// Color options with swatches (matching shop page)
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

// Default feature icons (fallback if API doesn't provide them)
const DEFAULT_FEATURE_ICONS = [
  { id: 1, icon_url: "/images/turbo_mood.png", label: "Turbo\nMode" },
  { id: 2, icon_url: "/images/Breeze_model.png", label: "Breeze\nMode" },
  { id: 3, icon_url: "/images/Low_noise.png", label: "Low\nNoise" },
  { id: 4, icon_url: "/images/Timer_mode.png", label: "Timer\nMode" },
  { id: 5, icon_url: "/images/Night_mode.png", label: "Night\nMode" },
  { id: 6, icon_url: "/images/Sweep_mm.png", label: "Sweep\n1320mm" },
  { id: 7, icon_url: "/images/Double_balt.png", label: "Double\nBall bearing" },
  { id: 8, icon_url: "/images/Eco_mode.png", label: "Eco\nMode" },
  {
    id: 9,
    icon_url: "/images/Forward_Reverse_mode.png",
    label: "Forward/\nReverse Mode",
  },
  { id: 10, icon_url: "/images/3_in_1_led.png", label: "3 in 1 LED\nOption" },
  { id: 11, icon_url: "/images/Easy_clean.png", label: "Easy\nClean" },
  {
    id: 12,
    icon_url: "/images/Study_ABS_blades.png",
    label: "Sturdy ABS\nBlades",
  },
];

interface ProductDetailClientProps {
  productId: string;
  variantId?: string;
}

interface Variant {
  id: number;
  variant_value: string;
  variant_type: string;
  selling_price: number;
  regular_price: string;
  file_urls?: string[];
  banner_urls?: string[];
  description?: string;
  color?: string;
}

interface Feature {
  id: number;
  feature_name: string;
  feature_value: string;
  is_filterable: number;
}

interface Product {
  id: number;
  name: string;
  category: string;
  description: string;
  brand?: string;
  slug?: string;
  variants: Variant[];
  features?: Feature[];
  image?: string[];
  rating?: number;
  review_count?: number;
  feature_icons?: FeatureIcon[];
}

interface FeatureIcon {
  id: number;
  icon_url: string;
  label: string;
}

export default function ProductDetailClient({
  productId,
  variantId,
}: ProductDetailClientProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const featureScrollRef = useRef<HTMLDivElement>(null);
  const [isFeatureAutoScrolling, setIsFeatureAutoScrolling] = useState(true);
  const [selectedVariantId, setSelectedVariantId] = useState<number | null>(
    () => {
      // Initialize with variantId from props if available
      if (variantId) {
        const parsed = parseInt(variantId);
        console.log("Initializing selectedVariantId from props:", parsed);
        return isNaN(parsed) ? null : parsed;
      }
      return null;
    }
  );
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Log props changes and sync variantId prop to state
  useEffect(() => {
    console.log("=== ProductDetailClient Props ===");
    console.log("productId prop:", productId, "type:", typeof productId);
    console.log("variantId prop:", variantId, "type:", typeof variantId);

    // Sync variantId from props to state when it changes
    if (variantId) {
      const parsed = parseInt(variantId);
      if (!isNaN(parsed) && parsed !== selectedVariantId) {
        console.log("Syncing variantId from props to state:", parsed);
        setSelectedVariantId(parsed);
      }
    }
  }, [productId, variantId]);

  useEffect(() => {
    console.log("=== useEffect for fetchProduct triggered ===");
    console.log(
      "productId:",
      productId,
      "type:",
      typeof productId,
      "truthy:",
      !!productId
    );
    console.log("variantId:", variantId);

    const fetchProduct = async () => {
      try {
        setLoading(true);
        console.log(
          "🚀 API CALL STARTING - Fetching product:",
          productId,
          "variantId from URL:",
          variantId
        );
        console.log(
          "API URL:",
          `${BASE_URL}/products/get_products/${productId}`
        );

        const response = await axios.post(
          `${BASE_URL}/products/get_products/${productId}`
        );

        console.log("✅ API RESPONSE RECEIVED:", response);

        // Handle both { success: true, data: {...} } and direct data response (matching PHP)
        const productData =
          response.data && response.data.success && response.data.data
            ? response.data.data
            : response.data;

        console.log("Product data received:", productData);
        console.log("Variants:", productData.variants);
        console.log(
          "Variant IDs:",
          productData.variants?.map((v: Variant) => v.id)
        );

        // Set product first
        setProduct(productData);
        setError(null);
        setCurrentImageIndex(0);

        // Then set variant - matching PHP logic exactly: find variant by ID from URL
        if (
          productData.variants &&
          Array.isArray(productData.variants) &&
          productData.variants.length > 0
        ) {
          const urlVariantId = variantId ? parseInt(variantId) : null;

          console.log("URL variantId:", variantId, "Parsed:", urlVariantId);

          if (urlVariantId && !isNaN(urlVariantId)) {
            // Check if variant exists - matching PHP: p.variants.find(v => v.id === parseInt(variantIdFromUrl))
            const selectedVariant = productData.variants.find(
              (v: Variant) => v.id === urlVariantId
            );

            if (selectedVariant) {
              console.log("Found variant from URL, setting to:", urlVariantId);
              setSelectedVariantId(urlVariantId);
            } else {
              console.log(
                "Variant from URL not found, using first variant:",
                productData.variants[0].id
              );
              setSelectedVariantId(productData.variants[0].id);
            }
          } else {
            // No variant in URL, use first one (matching PHP: updateVariant(first))
            console.log(
              "No variant in URL, using first variant:",
              productData.variants[0].id
            );
            setSelectedVariantId(productData.variants[0].id);
          }
        }
      } catch (err) {
        console.error("❌ API ERROR:", err);
        setError("Failed to load product details");
      } finally {
        setLoading(false);
      }
    };

    // Only fetch if productId exists and is not empty
    if (productId && productId.trim() !== "") {
      console.log("✅ productId is valid, calling fetchProduct");
      fetchProduct();
    } else {
      console.log(
        "❌ productId is invalid, NOT calling fetchProduct. productId:",
        productId
      );
      setLoading(false);
      setError("Product ID is required");
    }
  }, [productId, variantId]);

  // Ensure a variant is always selected when variants are available
  useEffect(() => {
    if (
      product &&
      product.variants &&
      Array.isArray(product.variants) &&
      product.variants.length > 0
    ) {
      if (!selectedVariantId) {
        // No variant selected, select the first one
        console.log(
          "No variant selected, selecting first variant:",
          product.variants[0].id
        );
        setSelectedVariantId(product.variants[0].id);
      } else {
        // Validate selected variant still exists
        const variantExists = product.variants.some(
          (v) => v.id === selectedVariantId
        );
        if (!variantExists) {
          console.log(
            "Selected variant",
            selectedVariantId,
            "no longer exists, selecting first variant:",
            product.variants[0].id
          );
          setSelectedVariantId(product.variants[0].id);
        } else {
          console.log("Selected variant", selectedVariantId, "is valid");
        }
      }
    }
  }, [product, selectedVariantId]);

  // Reset image index when variant changes
  useEffect(() => {
    setCurrentImageIndex(0);
  }, [selectedVariantId]);

  // Ensure currentImageIndex stays within bounds when product/variant changes
  useEffect(() => {
    if (
      product &&
      product.variants &&
      Array.isArray(product.variants) &&
      product.variants.length > 0
    ) {
      const variants = product.variants;
      const selectedVariant = selectedVariantId
        ? variants.find((v) => v.id === selectedVariantId) || variants[0]
        : variants[0] || null;

      if (selectedVariant) {
        const images =
          selectedVariant.file_urls && selectedVariant.file_urls.length > 0
            ? selectedVariant.file_urls
            : selectedVariant.banner_urls &&
              selectedVariant.banner_urls.length > 0
            ? selectedVariant.banner_urls
            : [];

        // Reset index if out of bounds (only check, don't depend on currentImageIndex)
        setCurrentImageIndex((prev) => {
          if (images.length > 0 && prev >= images.length) {
            return 0;
          }
          return prev;
        });
      }
    }
  }, [product, selectedVariantId]);

  // Auto-scroll feature slider
  useEffect(() => {
    if (!isFeatureAutoScrolling || !featureScrollRef.current) return;

    const scrollContainer = featureScrollRef.current;
    const scrollAmount = 1; // Pixels to scroll per interval
    const scrollDelay = 30; // Milliseconds between scrolls

    const autoScroll = setInterval(() => {
      if (scrollContainer) {
        const maxScroll =
          scrollContainer.scrollWidth - scrollContainer.clientWidth;

        // Check if we've reached the end
        if (scrollContainer.scrollLeft >= maxScroll) {
          // Reset to beginning
          scrollContainer.scrollLeft = 0;
        } else {
          // Continue scrolling
          scrollContainer.scrollLeft += scrollAmount;
        }
      }
    }, scrollDelay);

    return () => clearInterval(autoScroll);
  }, [isFeatureAutoScrolling]);

  if (loading) {
    return (
      <main className="bg-white min-h-screen flex items-center justify-center">
        <div className="text-[#075E5E] text-xl">Loading...</div>
      </main>
    );
  }

  if (error || !product) {
    return (
      <main className="bg-white min-h-screen flex items-center justify-center">
        <div className="text-red-600 text-xl">
          {error || "Product not found"}
        </div>
      </main>
    );
  }

  // Ensure variants array exists and is valid
  const variants: Variant[] =
    Array.isArray(product.variants) && product.variants.length > 0
      ? product.variants
      : [];

  // Get selected variant - ensure we always have one if variants exist
  // This is defensive - even if selectedVariantId is null, we'll use the first variant
  const selectedVariant =
    variants.length > 0
      ? selectedVariantId
        ? variants.find((v) => v.id === selectedVariantId) || variants[0]
        : variants[0]
      : null;

  // If we have variants but no variant is selected, log a warning
  if (variants.length > 0 && !selectedVariantId && !loading) {
    console.warn(
      "Variants exist but no variant selected. This should not happen."
    );
  }

  // Get images from selected variant (prefer file_urls, fallback to banner_urls)
  let images: string[] = [];
  if (selectedVariant) {
    if (
      selectedVariant.file_urls &&
      Array.isArray(selectedVariant.file_urls) &&
      selectedVariant.file_urls.length > 0
    ) {
      images = selectedVariant.file_urls;
    } else if (
      selectedVariant.banner_urls &&
      Array.isArray(selectedVariant.banner_urls) &&
      selectedVariant.banner_urls.length > 0
    ) {
      images = selectedVariant.banner_urls;
    }
  }

  // Ensure currentImageIndex is within bounds
  const safeImageIndex =
    images.length > 0
      ? Math.max(0, Math.min(currentImageIndex, images.length - 1))
      : 0;

  // Debug logging
  console.log("=== Product Detail Debug ===");
  console.log("Product:", product);
  console.log("Variants:", variants);
  console.log("Selected Variant ID:", selectedVariantId);
  console.log("Selected variant:", selectedVariant);
  console.log("Selected variant file_urls:", selectedVariant?.file_urls);
  console.log("Selected variant banner_urls:", selectedVariant?.banner_urls);
  console.log("Images array:", images);
  console.log("Images length:", images.length);
  console.log("Safe image index:", safeImageIndex);
  console.log("Current image index:", currentImageIndex);
  console.log("Product name:", product.name);
  console.log("Product description:", product.description);
  console.log("Feature icons:", product.feature_icons);
  console.log("Features:", product.features);

  return (
    <main className="bg-white mt-20">
      <section className="container mx-auto px-4 lg:px-6 py-6">
        <div className="lg:grid lg:grid-cols-2 lg:gap-10">
          {/* ================= LEFT : GALLERY ================= */}
          <div className="lg:pr-4">
            <div className="relative h-[320px] lg:h-[650px] flex items-center justify-center">
              {images.length > 0 && images[safeImageIndex] ? (
                <div className="relative w-full h-full">
                  <Image
                    src={images[safeImageIndex]}
                    alt={product.name || "Product"}
                    fill
                    sizes="(max-width: 768px) 100vw, 55vw"
                    className="object-contain"
                    priority={safeImageIndex === 0}
                    onError={(e) => {
                      console.error(
                        "Image failed to load:",
                        images[safeImageIndex]
                      );
                    }}
                    onLoad={() => {
                      console.log(
                        "Image loaded successfully:",
                        images[safeImageIndex]
                      );
                    }}
                  />
                </div>
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400 border-2 border-dashed border-gray-300 rounded-lg">
                  <div className="text-center p-4">
                    <p className="text-sm font-semibold">No image available</p>
                    {selectedVariant ? (
                      <>
                        <p className="text-xs mt-1 text-gray-500">
                          Variant: {selectedVariant.variant_value}
                        </p>
                        <p className="text-xs mt-1 text-gray-500">
                          file_urls: {selectedVariant.file_urls?.length || 0}{" "}
                          images
                        </p>
                        <p className="text-xs mt-1 text-gray-500">
                          banner_urls:{" "}
                          {selectedVariant.banner_urls?.length || 0} images
                        </p>
                      </>
                    ) : (
                      <p className="text-xs mt-1 text-gray-500">
                        No variant selected
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Thumbnails */}
            {images.length > 0 && (
              <div className="grid grid-cols-4 md:grid-cols-5 gap-2 mt-3">
                {images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentImageIndex(i)}
                    className={`aspect-square rounded-lg border overflow-hidden relative ${
                      safeImageIndex === i
                        ? "border-[#075E5E] border-2"
                        : "border-gray-200"
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`${product.name || "Product"} - Image ${i + 1}`}
                      fill
                      sizes="(max-width: 768px) 25vw, 20vw"
                      className="object-contain"
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Product Banner Images (poster-stack) */}
            {selectedVariant?.banner_urls &&
              selectedVariant.banner_urls.length > 0 && (
                <div className="mt-6 space-y-3">
                  {selectedVariant.banner_urls.map((bannerUrl, index) => (
                    <div key={index} className="relative w-full aspect-video">
                      <Image
                        src={bannerUrl}
                        alt={`Product banner ${index + 1}`}
                        fill
                        sizes="100vw"
                        className="object-cover rounded-lg"
                        loading="lazy"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src =
                            "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";
                        }}
                      />
                    </div>
                  ))}
                </div>
              )}
          </div>

          {/* ================= RIGHT : INFO ================= */}
          <div className="mt-6 lg:mt-0">
            <div className="lg:sticky lg:top-28 lg:max-h-[calc(100vh-8rem)] lg:overflow-y-auto">
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

            {/* Ratings */}
            {(product.rating !== undefined || product.review_count) && (
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
                      style={{ width: `${((product.rating || 0) / 5) * 100}%` }}
                    >
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className="text-yellow-400 text-sm">
                          ★
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                {product.review_count && product.review_count > 0 && (
                  <a
                    href="#"
                    className="text-[#075E5E] text-sm hover:underline"
                  >
                    ( {product.review_count} Reviews )
                  </a>
                )}
              </div>
            )}

            {product.category && (
              <p className="uppercase text-sm font-bold text-[#075E5E] mt-3">
                Category: <span className="font-bold">{product.category}</span>
              </p>
            )}

            {product.description && (
              <div className="text-[#777] font-normal mt-3 text-[14px]">
                Ratings/Reviews section - Not present in current code Feature
                Slider - A horizontal scrolling carousel showing product
                features with icons Discount percentage badge - Shows the
                percentage off MRP label and better price formatting
              </div>
            )}

            {/* Variants */}
            {variants && Array.isArray(variants) && variants.length > 0 && (
              <div className="mt-5 flex  items-center gap-6">
                <p className="uppercase  mt-3 text-sm font-bold text-[#075E5E] mb-3">
                  Select The Variant:
                </p>
                <div className="flex flex-wrap gap-3">
                  {variants.map((v) => {
                    const colorValue = v.color || v.variant_value || "";
                    const colorObj = COLOR_OPTIONS.find(
                      (c) => c.value.toLowerCase() === colorValue.toLowerCase()
                    );
                    const isActive = v.id === selectedVariantId;
                    const backgroundColor = colorObj?.swatch || "#D1D5DB";

                    return (
                      <button
                        key={v.id}
                        onClick={() => setSelectedVariantId(v.id)}
                        style={{ backgroundColor }}
                        className={`w-6 h-6 rounded-full border-2 transition-all hover:scale-110 shadow-sm ${
                          isActive
                            ? "border-[#075E5E] ring-2 ring-[#075E5E] ring-offset-2"
                            : "border-gray-400"
                        }`}
                        title={v.variant_value}
                      >
                        <span className="sr-only">{v.variant_value}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Price */}
            {selectedVariant && (
              <div className="mt-6">
                <div className="flex items-center gap-3">
                  {selectedVariant.regular_price &&
                    parseFloat(selectedVariant.regular_price) >
                      selectedVariant.selling_price && (
                      <span className="bg-[#CA5D27] text-white text-xs font-bold px-2 py-1 rounded">
                        -
                        {(
                          ((parseFloat(selectedVariant.regular_price) -
                            selectedVariant.selling_price) /
                            parseFloat(selectedVariant.regular_price)) *
                          100
                        ).toFixed(2)}
                        %
                      </span>
                    )}
                  <span className="text-3xl font-heading text-[#075E5E] font-semibold">
                    ₹{selectedVariant.selling_price.toLocaleString("en-IN")}
                  </span>
                </div>
                <div className="mt-2 flex items-center gap-2">
                  {selectedVariant.regular_price &&
                    parseFloat(selectedVariant.regular_price) >
                      selectedVariant.selling_price && (
                      <>
                        <span className="text-xs text-gray-500 uppercase font-semibold">
                          MRP
                        </span>
                        <del className="text-gray-400 text-sm">
                          ₹
                          {parseFloat(
                            selectedVariant.regular_price
                          ).toLocaleString("en-IN")}
                        </del>
                      </>
                    )}
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Inclusive All Taxes
                </p>
              </div>
            )}

            {/* Quantity + CTA */}
            <div className="flex items-center gap-4 mt-6">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 rounded-[10px]  border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
                  aria-label="Decrease quantity"
                >
                  <span className="text-lg font-bold">−</span>
                </button>
                <span className="text-lg font-semibold w-8 text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 rounded-[10px] border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
                  aria-label="Increase quantity"
                >
                  <span className="text-lg font-bold">+</span>
                </button>
              </div>
              <button className="bg-[#075E5E] text-white px-6 py-3 rounded-lg font-bold hover:bg-[#064d4d] transition-colors">
                Add to Cart
              </button>
            </div>

            {/* Guides */}
            <hr className="my-6 border-gray-200" />
            <div className="flex gap-6 mt-6 text-sm font-semibold text-[#075E5E]">
              <a href="#">Buying Guide</a>
              <a href="#">Installation Guide</a>
            </div>

            <hr className="my-6 border-gray-200" />

            {/* Feature Slider */}
            {(() => {
              const featureIcons =
                product.feature_icons &&
                Array.isArray(product.feature_icons) &&
                product.feature_icons.length > 0
                  ? product.feature_icons
                  : DEFAULT_FEATURE_ICONS;

              return (
                <div className="relative mt-6">
                  <div
                    ref={featureScrollRef}
                    className="overflow-x-auto scrollbar-hide px-8"
                    onMouseEnter={() => setIsFeatureAutoScrolling(false)}
                    onMouseLeave={() => setIsFeatureAutoScrolling(true)}
                  >
                    <div className="flex gap-4 pb-2">
                      {featureIcons.map((feature) => (
                        <div
                          key={feature.id}
                          className="shrink-0 flex flex-col items-center justify-center w-24 text-center"
                        >
                          <div className="w-8 h-8 relative mb-2">
                            <Image
                              src={feature.icon_url}
                              alt={feature.label}
                              fill
                              sizes="66px"
                              className="object-contain"
                              loading="lazy"
                            />
                          </div>
                          <div
                            className="text-xs text-[#CA5D27] font-semibold leading-tight"
                            style={{ whiteSpace: "pre-line" }}
                          >
                            {feature.label}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })()}
            </div>
          </div>
        </div>
      </section>

      {/* ================= FAQ ================= */}
      <section className="container mx-auto px-4 py-10">
        <h2 className="font-barlow text-3xl text-[#2a5b57] mb-4">
          Frequently Asked Questions
        </h2>

        {[
          [
            "What makes Haneri different?",
            "Design + engineering for fluid airflow.",
          ],
          ["Is installation included?", "Available in supported cities."],
          ["Warranty?", "5 years from purchase date."],
        ].map(([q, a]) => (
          <details key={q} className="border-t py-4">
            <summary className="cursor-pointer font-semibold">{q}</summary>
            <p className="mt-2 text-sm text-gray-600">{a}</p>
          </details>
        ))}
      </section>
    </main>
  );
}
