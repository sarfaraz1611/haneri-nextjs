"use client";

import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import LOGO_SRC from "./../public/images/Haneri Logo.png";

// Import GSAP and ScrollTrigger
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

// Register ScrollTrigger so GSAP knows about the plugin
gsap.registerPlugin(ScrollTrigger);

// --- Types based on your API usage ---
interface Variant {
  id: number | string;
  product_id: number | string;
  variant_type: string;
  variant_value: string;
  min_qty: number;
  is_cod: number;
  weight: string;
  description: string;
  discount_price: string | null;
  regular_price: string;
  selling_price: string;
  hsn: string;
  regular_tax: string;
  selling_tax: string;
  video_url: string;
  product_pdf: string;
  file_urls?: string[]; // Product images
  banner_urls?: string[]; // Product banners
}

interface Product {
  id: number | string;
  slug: string;
  name: string;
  description: string;
  type: string;
  is_active: number;
  image: (string | null)[];
  variants: Variant[];
}

// --- Constants & Helpers ---
const COLOR_MAP: Record<string, string> = {
  "Denim Blue": "#6497B2",
  "Baby Pink": "#C7ABA9",
  "Pearl White": "#F5F5F5",
  "Matte Black": "#21201E",
  Pine: "#DDC194",
  Beige: "#E6E0D4",
  Walnut: "#926148",
  "Sunset Copper": "#936053",
  "Royal Brass": "#B7A97C",
  "Regal Gold": "#D3B063",
  "Pure Steel": "#878782",
  "Metallic Grey": "#D4D4D4",
  "Sand Beige": "#D3CBBB",
  "Metallic Walnut": "#7F513F",
  "Espresso Walnut": "#926148",
  "Moonlit White": "#E6E6E6",
  "Natural Pine": "#DDC194",
  "Velvet Black": "#0B0A08",
  Brown: "#6d4c41",
  Wood: "#7b5e57",
  White: "#ffffff",
  Ivory: "#f5f5f0",
  Cream: "#eee8d5",
  Black: "#000000",
  Graphite: "#2f2f2f",
  Grey: "#8b8b8b",
};

const getColorHex = (label: string) => {
  if (!label) return "#ccc";
  const t = String(label).trim();
  if (COLOR_MAP[t]) return COLOR_MAP[t];
  const part = t.split(/[\/,|]/)[0].trim();
  return COLOR_MAP[part] || "#ccc";
};

const formatPrice = (amount: number | string) => {
  const num = Number(amount) || 0;
  return new Intl.NumberFormat("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(num);
};

// Check if a color is light/similar to white background
const isLightColor = (hex: string): boolean => {
  // Convert hex to RGB
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);

  // Calculate relative luminance
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

  // Return true if luminance is > 0.8 (light colors)
  return luminance > 0.8;
};

// --- Component ---

export default function FeaturedProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // Ref for the main section (The Trigger and Pin element)
  const sectionRef = useRef<HTMLElement>(null);
  // Ref for the content container (The Wrapper/Viewport)
  const contentWrapperRef = useRef<HTMLDivElement>(null);

  // --- 1. Product Fetching ---
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        let headers: HeadersInit = {
          "Content-Type": "application/json",
        };

        if (typeof window !== "undefined") {
          const authToken = localStorage.getItem("auth_token");
          if (authToken) {
            headers["Authorization"] = `Bearer ${authToken}`;
          }
        }

        const response = await fetch("/api/products/get_products", {
          method: "POST",
          headers,
          body: JSON.stringify({}),
        });

        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }

        const result = await response.json();

        if (result.success && Array.isArray(result.data)) {
          setProducts(result.data);
        } else {
          console.error("Invalid API response:", result);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // --- 2. GSAP ScrollTrigger Setup ---
  useEffect(() => {
    const section = sectionRef.current;
    const contentWrapper = contentWrapperRef.current;

    // Check for necessary elements and client-side environment
    if (
      !section ||
      !contentWrapper ||
      products.length === 0 ||
      typeof window === "undefined"
    )
      return;

    // Find the inner flex container (the element we will animate)
    const innerFlex = contentWrapper.querySelector("div");
    if (!innerFlex) return;

    // Calculate the maximum horizontal distance we need to scroll the content.
    const scrollDistance = innerFlex.scrollWidth - contentWrapper.offsetWidth;

    // Safety check: only run the animation if there is content to scroll
    if (scrollDistance <= 0) return;

    // Use GSAP Context for proper scope and cleanup
    const ctx = gsap.context(() => {
      // --- Main Horizontal Scroll Animation ---
      const horizontalScroll = gsap.to(innerFlex, {
        // Animate the 'x' property (translateX) to the negative scroll distance
        x: -scrollDistance,
        ease: "none",

        scrollTrigger: {
          trigger: section,
          pin: true, // Pin the whole section
          scrub: 1, // Link progress to scroll, with 1 second of lag
          start: "top top", // Start when the section hits the top of the viewport
          // End after scrolling a distance equal to the content's extra width
          end: `+=${scrollDistance}`,

          // CRITICAL FOR DEBUGGING: Show start/end/pin markers
          markers: false,
        },
      });

      // --- Individual Card Animation (Scale/Rotate) ---
      gsap.utils
        .toArray(innerFlex.querySelectorAll("article"))
        .forEach((card) => {
          const cardEl = card as HTMLElement;
          const imgEl = cardEl.querySelector("img") as HTMLElement | null;
          if (!imgEl) return;

          gsap.to(imgEl, {
            scale: 1.1,
            rotate: 2,
            ease: "power1.inOut",
            scrollTrigger: {
              trigger: cardEl,
              // Link this smaller animation to the main horizontal scroll progress
              containerAnimation: horizontalScroll,
              start: "left right", // When the card enters from the right edge of the viewport
              end: "right left", // When the card exits the left edge of the viewport
              scrub: 0.5,
            },
          });
        });
    }, section);

    return () => {
      // Clean up the GSAP instance when the component unmounts
      ctx.revert();
    };
  }, [products]);

  // --- 3. Interaction Handlers ---
  const handleAddToCart = async (
    e: React.MouseEvent,
    productId: string | number,
    variantId: string | number
  ) => {
    e.preventDefault();
    e.stopPropagation();
    console.log(
      `[MOCK CART] Adding Product ${productId}, Variant ${variantId} to cart.`
    );
    alert(`Added Product ${productId} to cart! (Mock Action)`);
  };

  if (loading)
    return (
      <div className="py-12 text-center">Loading Featured Products...</div>
    );
  if (!products.length) return null;

  // Duplicate products to make 8 items
  const displayProducts = [...products, ...products].slice(0, 8);

  return (
    <section
      ref={sectionRef}
      // Increased min-height to provide vertical scroll space for the animation to run
      className="py-6 pt-0  relative"
      aria-label="Featured Products"
    >
      <div
        className="container mx-auto px-4 sticky top-0"
        style={{
          // This container is the viewport for the pinned content
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <h2 className="text-left text-[30px] text-[#315859] py-5 font-medium mb-4 font-['Barlow_Condensed'] uppercase tracking-wide">
          Featured Products
        </h2>

        {/* Horizontal scrolling container (The viewport wrapper) */}
        <div
          ref={contentWrapperRef}
          className="overflow-hidden pb-4" // Use overflow-hidden to hide the native scrollbar
          style={{
            // Removed scrollbar-related CSS since we hide overflow
            overflowX: "hidden",
            scrollBehavior: "auto",
          }}
        >
          {/* Inner div that gets the translateX animation from GSAP */}
          <div
            className="flex gap-9"
            style={{
              minWidth: "max-content", // Ensure the div is wide enough to contain all flex items
            }}
          >
            {displayProducts.map((product, index) => {
              const variants = product.variants || [];
              if (variants.length === 0) return null;

              const first = variants[0];

              const sellingPrice = Number(
                String(first.selling_price).replace(/,/g, "") || 0
              );
              const regularPrice = Number(first.regular_price || 0);

              const showStrike =
                regularPrice > sellingPrice && regularPrice > 0;

              return (
                <article
                  key={`${product.id}-${index}`}
                  className="group relative bg-white border-0 shadow-none overflow-hidden cursor-default shrink-0 w-[300px] sm:w-[320px] md:w-[340px] lg:w-[360px]"
                  style={{
                    scrollSnapAlign: "start",
                    transition: "all 0.3s ease-out",
                    opacity: 1,
                  }}
                >
                  <div className="relative h-[340px] grid place-items-center mb-3 overflow-hidden">
                    <Link
                      href={`/product_detail?id=${product.id}&v_id=${first.id}`}
                      className="block w-full h-full relative"
                    >
                      {/* Image component - GSAP controls the transform style */}
                      <Image
                        src={first.file_urls?.[0] || "/images/placeholder.png"}
                        alt={first.variant_value || product.name}
                        fill
                        priority={false}
                        sizes="(max-width: 600px) 100vw, 25vw"
                        style={{
                          objectFit: "contain",
                        }}
                        className="origin-center z-1"
                      />
                    </Link>
                  </div>

                  {/* Logo, Title, Description, Price, Swatches, CTA (Standard rendering) */}
                  <Image
                    src={LOGO_SRC}
                    alt="Brand Logo"
                    width={110}
                    height={20}
                    className="block mb-2 w-[110px] h-auto"
                    style={{ width: "110px", height: "auto" }}
                  />
                  <h3 className="font-['Barlow_Condensed'] font-semibold text-[30px] leading-[1.05] text-[#CA5D27] uppercase mb-2.5">
                    <Link
                      href={`/product_detail?id=${product.id}`}
                      className="no-underline hover:text-[#CA5D27]"
                    >
                      {product.name}
                    </Link>
                  </h3>
                  <p className="text-[#6F6F6F] text-sm leading-relaxed mb-4 max-w-[60ch] line-clamp-2">
                    {product.description}
                  </p>
                  <div className="font-['Barlow_Condensed'] text-[24px] font-normal leading-none text-[#315859] text-left mb-4 flex gap-2 items-baseline">
                    <span className="font-bold">MRP</span>
                    <span className="font-bold">
                      ₹{formatPrice(sellingPrice)}
                    </span>
                    {showStrike && (
                      <del className="text-[#B8B8B8] font-semibold text-[20px]">
                        ₹{formatPrice(regularPrice)}
                      </del>
                    )}
                  </div>
                  <div className="flex gap-2.5 mb-[18px] pl-1">
                    {variants.map((v) => {
                      const color = getColorHex(v.variant_value);
                      const isActive = v.id === first.id;
                      const needsBorder = isLightColor(color);

                      return (
                        <Link
                          key={v.id}
                          href={`/product_detail?id=${product.id}&v_id=${v.id}`}
                          title={v.variant_value}
                          className={`
                          block w-7 h-7 rounded-full cursor-pointer
                          transition-transform duration-200 hover:scale-110
                          ${needsBorder ? "border-2 border-gray-300" : ""}
                          ${
                            isActive
                              ? "ring-2 ring-offset-2 ring-[#CA5D27]"
                              : ""
                          }
                        `}
                          style={{ backgroundColor: color }}
                        />
                      );
                    })}
                  </div>
                  <button
                    onClick={(e) => handleAddToCart(e, product.id, first.id)}
                    className="inline-block px-5 py-3 rounded-[10px] bg-[#244a46] text-white font-bold tracking-wide no-underline hover:bg-[#1b3835] transition-colors"
                  >
                    Add to Cart
                  </button>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
