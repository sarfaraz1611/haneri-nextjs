"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import DiscoverHero from "./DiscoverHero";
import { LEGACY_BASE_URL } from "./product/constants";

// --- Types ---
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
  file_urls?: string[];
  banner_urls?: string[];
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

const isLightColor = (hex: string): boolean => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.8;
};

// --- Component ---
export default function FeaturedProductsMobile() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const [addingToCart, setAddingToCart] = useState<string | number | null>(
    null,
  );
  const [addedToCart, setAddedToCart] = useState<Set<string | number>>(
    new Set(),
  );

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        let headers: HeadersInit = { "Content-Type": "application/json" };

        if (typeof window !== "undefined") {
          const authToken = localStorage.getItem("auth_token");
          if (authToken) headers["Authorization"] = `Bearer ${authToken}`;
        }

        const response = await fetch("/api/products/get_products", {
          method: "POST",
          headers,
          body: JSON.stringify({}),
        });

        if (!response.ok) throw new Error("Failed to fetch products");

        const result = await response.json();
        if (result.success && Array.isArray(result.data)) {
          setProducts(result.data);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

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
        process.env.NEXT_PUBLIC_API_URL || "https://api.haneri.com/api";
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

      if (!token && tempId) payload.cart_id = tempId;

      const response = await fetch(`${BASE_URL}/cart/add`, {
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
        window.dispatchEvent(new Event("cartUpdated"));
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

  const displayProducts = [...products,...products].slice(0, 6);

  return (
    <section className="pt-6 relative px-6" aria-label="Featured Products">
      <DiscoverHero
        centered={false}
        className="  top-0 left-0 w-full pointer-events-none overflow-hidden featured-hero"
      />

      <div className="w-full    flex flex-col justify-center items-center z-10  pt-10 pb-4">
        {/* Wrapping grid — no gap on mobile, gap restored at sm+ */}
        <div className="grid grid-cols-1  sm:grid-cols-2 gap-4 sm:gap-4  lg:grid-cols-3 xl:grid-cols-4 w-full">
          {displayProducts.map((product, index) => {
            const variants = product.variants || [];
            if (variants.length === 0) return null;

            const first = variants[0];
            const sellingPrice = Number(
              String(first.selling_price).replace(/,/g, "") || 0,
            );
            const regularPrice = Number(first.regular_price || 0);
            const showStrike = regularPrice > sellingPrice && regularPrice > 0;

            return (
              <article
                key={`${product.id}-${index}`}
                className={`group relative bg-white inset-shadow-2xs rounded-xl shadow-md p-4 border-0 overflow-hidden cursor-default hover:scale-95 transition duration-300 ease-in-out${index >= 4 ? " hidden lg:block xl:hidden" : ""}`}
                style={{ opacity: 1 }}
              >
                <div className="relative h-[20vh] 2xl:h-[290px] grid place-items-center mb-3 overflow-hidden">
                  <Link
                    href={`/product_detail?id=${product.id}&v_id=${first.id}`}
                    className="block w-full h-full relative"
                  >
                    <Image
                      src={first.file_urls?.[0] || "/images/placeholder.png"}
                      alt={first.variant_value || product.name}
                      fill
                      priority={false}
                      sizes="(max-width: 600px) 50vw, 25vw"
                      style={{ objectFit: "contain" }}
                      className="origin-center z-1"
                    />
                  </Link>
                </div>

                <h3 className="font-['Barlow_Condensed'] font-semibold text-[22px] sm:text-[27px] leading-[1.05] text-[#CA5D27] uppercase mb-2.5 line-clamp-2 min-h-[2.1em]">
                  <Link href={`/product_detail?id=${product.id}`}>
                    {product.name}
                  </Link>
                </h3>
                <p className="text-[#6F6F6F] text-sm leading-relaxed mb-4 max-w-[60ch] line-clamp-2">
                  {product.description}
                </p>
                <div className="font-['Barlow_Condensed'] text-[22px] sm:text-[24px] font-normal leading-none text-[#005d5a] text-left mb-4 flex gap-2 items-baseline flex-wrap">
                  <span className="font-semibold">MRP</span>
                  <span className="font-semibold">
                    ₹{formatPrice(sellingPrice)}
                  </span>
                  {showStrike && (
                    <del className="text-[#B8B8B8] font-semibold text-[18px] sm:text-[20px]">
                      ₹{formatPrice(regularPrice)}
                    </del>
                  )}
                </div>
                <div className="flex gap-2.5 mb-[18px] pl-1 ">
                  {variants.map((v) => {
                    const color = getColorHex(v.variant_value);
                    const isActive = v.id === first.id;
                    const needsBorder = isLightColor(color);
                    return (
                      <Link
                        key={v.id}
                        href={`/product_detail?id=${product.id}&v_id=${v.id}`}
                        title={v.variant_value}
                        className={`block w-6 h-6 sm:w-7 sm:h-7 rounded-full cursor-pointer transition-transform duration-200 hover:scale-110 ${needsBorder ? "border-2 border-gray-300" : ""} ${isActive ? "ring-2 ring-offset-2 ring-[#CA5D27]" : ""}`}
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
                      router.push(`${LEGACY_BASE_URL}/cart`);
                    } else {
                      handleAddToCart(e, product.id, first.id);
                    }
                  }}
                  disabled={addingToCart === product.id}
                  className={`mt-2 w-full rounded-lg px-4 py-2 text-sm font-semibold text-white shadow-sm hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-50 disabled:cursor-not-allowed ${
                    addedToCart.has(product.id)
                      ? "bg-[#CA5D27] hover:bg-[#b54d1f]"
                      : "bg-[#005d5a] hover:bg-[#244a46]"
                  }`}
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
    </section>
  );
}
