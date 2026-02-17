"use client";

import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import LOGO_SRC from "./../public/images/Haneri Logo.png";
import DiscoverHero from "./DiscoverHero";

// Import GSAP and ScrollTrigger
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

// Register ScrollTrigger only on client-side
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

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

export const getColorHex = (label: string) => {
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
export const isLightColor = (hex: string): boolean => {
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

    // Reduce the pin spacer height to avoid extra white space after scroll ends

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
          start: "top +26px", // Start when the section hits the top of the viewport
          // End after scrolling a distance equal to the content's extra width
          end: `+=${scrollDistance}`,
          // CRITICAL FOR DEBUGGING: Show start/end/pin markers
          markers: false,
          anticipatePin: 1, // Helps prevent jump when pinning starts/ends
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
  const router = useRouter();
  const [addingToCart, setAddingToCart] = useState<string | number | null>(
    null,
  );
  const [addedToCart, setAddedToCart] = useState<Set<string | number>>(
    new Set(),
  );

  const handleAddToCart = async (
    e: React.MouseEvent,
    productId: string | number,
    variantId: string | number,
  ) => {
    e.preventDefault();
    e.stopPropagation();

    if (addingToCart) return;

    setAddingToCart(productId);

    try {
      const BASE_URL =
        process.env.NEXT_PUBLIC_API_URL || "https://api.haneri.com";
      const token = localStorage.getItem("auth_token");
      const tempId = localStorage.getItem("temp_id");

      const payload: {
        product_id: number;
        quantity: number;
        variant_id: number;
        cart_id?: string;
      } = {
        product_id: Number(productId),
        quantity: 1,
        variant_id: Number(variantId),
      };

      if (!token && tempId) {
        payload.cart_id = tempId;
      }

      const response = await fetch(`${BASE_URL}/api/cart/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (
        data.success ||
        (data.message && data.message.includes("successfully"))
      ) {
        if (!token && !tempId && data.data?.user_id) {
          localStorage.setItem("temp_id", data.data.user_id);
        }
        setAddedToCart((prev) => new Set(prev).add(productId));
      } else {
        alert(data.message || "Failed to add to cart");
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      alert("Failed to add to cart. Please try again.");
    } finally {
      setAddingToCart(null);
    }
  };

  if (loading)
    return (
      <section className="py-6 pt-0 relative min-h-screen flex items-center justify-center">
        <DiscoverHero centered={true} className="w-full" dotted={true} />
      </section>
    );
  if (!products.length) return null;

  // Duplicate products to make 8 items
  const displayProducts = [...products, ...products].slice(0, 8);

  return (
    <section
      ref={sectionRef}
      // Increased min-height to provide vertical scroll space for the animation to run
      className=" py-6  pt-0 relative"
      aria-label="Featured Products"
    >
      {/* Interactive animated header - stays visible */}
      <DiscoverHero
        centered={false}
        className=" absolute h-30  top-0 left-0 w-full pointer-events-none overflow-hidden featured-hero z-20"
      />

      <div className="w-full sticky top-0 flex flex-col justify-center  md:justify-end lg:justify-center items-center z-10 min-h-screen">
        {/* Horizontal scrolling container (The viewport wrapper) */}
        {/* <div className="container">
          <h2
            className="lg:-mt-10 2xl:-mt-20 uppercase tracking-wider"
            style={{
              fontFamily: "var(--font-barlow-condensed), ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, Arial, sans-serif",
              fontWeight: 600,
              fontSize: "clamp(28px, 4vw, 36px)",
              lineHeight: 1.2,
              color: "#315859",
              marginBottom: "20px",
            }}
          >
            Discover
          </h2>
        </div> */}
        <div
          ref={contentWrapperRef}
          className="overflow-hidden mt-20 md:mt-24 pb-4 w-full " // Use overflow-hidden to hide the native scrollbar
          style={{
            // Removed scrollbar-related CSS since we hide overflow
            overflowX: "hidden",
            scrollBehavior: "auto",
          }}
        >
          {/* Inner div that gets the translateX animation from GSAP */}
          <div
            className="flex gap-9 justify-center pl-[45px] pr-[45px] md:pl-40 md:pr-40"
            style={{
              minWidth: "max-content", // Ensure the div is wide enough to contain all flex items
            }}
          >
            {displayProducts.map((product, index) => {
              const variants = product.variants || [];
              if (variants.length === 0) return null;

              const first = variants[0];

              const sellingPrice = Number(
                String(first.selling_price).replace(/,/g, "") || 0,
              );
              const regularPrice = Number(first.regular_price || 0);

              const showStrike =
                regularPrice > sellingPrice && regularPrice > 0;

              return (
                <article
                  key={`${product.id}-${index}`}
                  className="group relative rounded-lg bg-white inset-shadow-2xs shadow-md p-4 border-0  overflow-hidden cursor-default shrink-0 w-[300px] sm:w-[320px] md:w-[340px] lg:w-[360px] hover:scale-95 transition duration-300 ease-in-out"
                  style={{
                    scrollSnapAlign: "start",
                    transition: "all 0.3s ease-out",
                    opacity: 1,
                  }}
                >
                  <div className="relative h-[20vh] 2xl:h-[290px] grid place-items-center mb-3 overflow-hidden">
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

                  <h3 className="font-['Barlow_Condensed'] font-semibold text-[27px] leading-[1.05] text-[#CA5D27] uppercase mb-2.5 line-clamp-2 min-h-[2.1em]">
                    <Link href={`/product_detail?id=${product.id}`}>
                      {product.name}
                    </Link>
                  </h3>
                  <p className="text-[#6F6F6F] text-sm leading-relaxed mb-4 max-w-[60ch] line-clamp-2">
                    {product.description}
                  </p>
                  <div className="font-['Barlow_Condensed'] text-[24px] font-normal leading-none text-[#315859] text-left mb-4 flex gap-2 items-baseline">
                    <span className="font-semibold">MRP</span>
                    <span className="font-semibold">
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
                    onClick={(e) => {
                      if (addedToCart.has(product.id)) {
                        e.preventDefault();
                        e.stopPropagation();
                        router.push("/cart");
                      } else {
                        handleAddToCart(e, product.id, first.id);
                      }
                    }}
                    disabled={addingToCart === product.id}
                    className={`mt-2 w-full rounded-lg px-4 py-2 text-sm font-semibold text-white shadow-sm hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-50 disabled:cursor-not-allowed ${
                      addedToCart.has(product.id)
                        ? "bg-[#CA5D27] hover:bg-[#b54d1f]"
                        : "bg-[#00473E] hover:bg-[#244a46]"
                    }`}

                    // className={` ${
                    //   addedToCart.has(product.id)
                    //     ? "bg-[#CA5D27] text-white hover:bg-[#b54d1f]"
                    //     : "bg-[#244a46] text-white hover:bg-[#1b3835]"
                    // }`}
                  >
                    {addingToCart === product.id
                      ? "Adding..."
                      : addedToCart.has(product.id)
                        ? "View Cart"
                        : "Add to Cart"}
                  </button>
                </article>
              );
            })}
          </div>
        </div>
      </div>
      <div
        className={`hidden 2xl:block absolute bottom-4 md:bottom-16 left-1/2 -translate-x-1/2 xl:flex flex-col items-center gap-2 z-10 `}
        onClick={() => {
          if (sectionRef.current) {
            let el: HTMLElement | null = sectionRef.current;
            let nextSection: Element | null = null;
            while (el && el !== document.body) {
              if (el.nextElementSibling) {
                nextSection = el.nextElementSibling;
                break;
              }
              el = el.parentElement;
            }
            if (nextSection) {
              nextSection.scrollIntoView({ behavior: "smooth" });
            } else {
              // Fallback: scroll past the container
              window.scrollTo({
                top:
                  sectionRef.current.offsetTop +
                  sectionRef.current.offsetHeight,
                behavior: "smooth",
              });
            }
          }
        }}
      >
        <span className="hidden 2xl:block text-xs text-gray-500 tracking-widest uppercase">
          Scroll to Explore
        </span>
        <div className=" hidden   relative 2xl:flex justify-center">
          <div className="absolute  w-10 inset-0 rounded-full border-2 border-yellow-400/30 animate-ping" />
          <div className="relative w-10 p-2 rounded-full border border-gray-200 bg-white/50 backdrop-blur-sm ">
            <svg
              className="w-5 h-5 text-[#CA5D27]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
