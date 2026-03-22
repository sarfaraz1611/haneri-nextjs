"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import { BASE_URL, CART_BASE_URL, LEGACY_BASE_URL, COLOR_OPTIONS } from "./constants";
import { Product, Variant } from "./types";

const classNames = (...classes: (string | boolean | undefined)[]) =>
  classes.filter(Boolean).join(" ");

const normalizePrice = (val: string | number | undefined | null) => {
  if (!val) return 0;
  return parseFloat(String(val).replace(/,/g, ""));
};

const formatPrice = (amount: number) => {
  return new Intl.NumberFormat("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
};

function RecommendedCard({
  product,
  addedToCart,
  addingToCart,
  onAddToCart,
}: {
  product: Product;
  addedToCart: Set<string>;
  addingToCart: string | null;
  onAddToCart: (productId: number, variantId: number) => void;
}) {
  const router = useRouter();
  const [activeVariant, setActiveVariant] = useState<Variant>(
    product.variants?.[0] ?? ({} as Variant),
  );

  const regularPrice = normalizePrice(activeVariant.regular_price);
  const sellingPrice = normalizePrice(activeVariant.selling_price);
  const showStrike = regularPrice > sellingPrice && regularPrice > 0;

  const imageUrl =
    activeVariant.file_urls?.[0] ?? "/images/placeholder.jpg";

  const productUrl = `/product_detail?id=${product.id}&v_id=${activeVariant.id}`;
  const cartKey = `${product.id}-${activeVariant.id}`;
  const isAdded = addedToCart.has(cartKey);
  const isAdding = addingToCart === cartKey;

  return (
    <li className="group relative flex flex-col shadow-md rounded-xl p-4 hover:scale-95 transition duration-300 ease-in-out">
      <Link href={productUrl}>
        <div className="aspect-square w-full overflow-hidden rounded-lg">
          <img
            alt={activeVariant.variant_value || product.name}
            src={imageUrl}
            className="h-full w-full object-cover object-center group-hover:opacity-75 transition-opacity"
          />
        </div>
      </Link>

      <div className="mt-3 flex flex-col">
        <h3 className="font-['Barlow_Condensed'] font-semibold text-[22px] leading-tight text-[#CA5D27] uppercase mb-1">
          <Link href={productUrl}>{product.name}</Link>
        </h3>

        {activeVariant.variant_value && (
          <p className="text-sm text-[#005d5a]">{activeVariant.variant_value}</p>
        )}

        <div className="font-['Barlow_Condensed'] text-[20px] font-normal leading-none text-[#005d5a] text-left my-3 flex gap-2 items-baseline">
          <span className="font-semibold">MRP</span>
          <span className="font-semibold">₹{formatPrice(sellingPrice)}</span>
          {showStrike && (
            <del className="text-[#B8B8B8] font-semibold text-[17px]">
              ₹{formatPrice(regularPrice)}
            </del>
          )}
        </div>
      </div>

      {/* Variant swatches */}
      {product.variants && product.variants.length > 1 && (
        <div className="mt-2">
          <ul role="list" className="flex items-center flex-wrap gap-2">
            {product.variants.map((variant) => {
              const colorValue = variant.color || variant.variant_value || "";
              const colorObj = COLOR_OPTIONS.find(
                (c) => c.value.toLowerCase() === colorValue.toLowerCase(),
              );
              const backgroundColor = colorObj?.swatch || "#D1D5DB";
              const isActive = variant.id === activeVariant.id;

              return (
                <li
                  key={variant.id}
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveVariant(variant);
                  }}
                  style={{ backgroundColor }}
                  className={classNames(
                    "block w-6 h-6 rounded-full cursor-pointer transition-transform duration-200 hover:scale-110",
                    isActive ? "ring-2 ring-offset-2 ring-[#CA5D27]" : "",
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

      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          if (isAdded) {
            router.push(`cart`);
          } else {
            onAddToCart(product.id, activeVariant.id);
          }
        }}
        disabled={isAdding}
        className={`mt-4 w-full rounded-lg px-4 py-2 text-sm font-semibold text-white shadow-sm transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed ${
          isAdded
            ? "bg-[#CA5D27] hover:bg-[#b54d1f]"
            : "bg-[#005d5a] hover:bg-[#244a46]"
        }`}
      >
        {isAdding ? "Adding..." : isAdded ? "View Cart" : "Add to Cart"}
      </button>
    </li>
  );
}

export default function RecommendedProducts({
  currentProductId,
}: {
  currentProductId: string;
}) {
  const [products, setProducts] = useState<Product[]>([]);
  const [addedToCart, setAddedToCart] = useState<Set<string>>(new Set());
  const [addingToCart, setAddingToCart] = useState<string | null>(null);

  useEffect(() => {
    const token =
      typeof window !== "undefined" ? localStorage.getItem("auth_token") : null;
    const headers = token ? { Authorization: `Bearer ${token}` } : {};

    axios
      .post(
        `${BASE_URL}/products/get_products`,
        { limit: 10, offset: 0, color: "", sweep_size: "", order_price: "", variant_type: "" },
        { headers },
      )
      .then((res) => {
        const data: Product[] = res.data?.data ?? res.data ?? [];
        const filtered = data
          .filter((p) => String(p.id) !== currentProductId)
          .slice(0, 4);
        setProducts(filtered);
      })
      .catch(() => {});
  }, [currentProductId]);

  const handleAddToCart = async (productId: number, variantId: number) => {
    const key = `${productId}-${variantId}`;
    if (addingToCart === key) return;
    setAddingToCart(key);

    try {
      const token = localStorage.getItem("auth_token");
      const tempId = localStorage.getItem("temp_id");

      const payload: {
        product_id: number;
        quantity: number;
        variant_id: number;
        cart_id?: string;
      } = { product_id: productId, quantity: 1, variant_id: variantId };

      if (!token && tempId) payload.cart_id = tempId;

      const res = await fetch(`${CART_BASE_URL}/cart/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (data.success || data.message?.includes("successfully")) {
        if (!token && !tempId && data.data?.user_id) {
          localStorage.setItem("temp_id", data.data.user_id);
        }
        setAddedToCart((prev) => new Set(prev).add(key));
        window.dispatchEvent(new Event("cartUpdated"));
      }
    } catch {
      // silent
    } finally {
      setAddingToCart(null);
    }
  };

  if (products.length === 0) return null;

  return (
    <section className="container mx-auto px-4 lg:px-6 py-10">
      <h2 className="font-['Barlow_Condensed'] font-semibold text-[32px] text-[#075E5E] uppercase mb-6">
        Recommended Products
      </h2>
      <ul className="grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {products.map((product) => (
          <RecommendedCard
            key={product.id}
            product={product}
            addedToCart={addedToCart}
            addingToCart={addingToCart}
            onAddToCart={handleAddToCart}
          />
        ))}
      </ul>
    </section>
  );
}
