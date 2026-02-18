"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://api.haneri.com/api";

interface CartItem {
  id: number;
  product_name: string;
  variant_value?: string;
  selling_price: number | string;
  quantity: number;
  file_urls?: string[];
}

const parsePrice = (price: number | string): number => {
  if (typeof price === "number") return price;
  // Remove commas and parse as float
  return parseFloat(price.replace(/,/g, "")) || 0;
};

interface FlashMessage {
  type: "success" | "error";
  message: string;
}

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState<number | null>(null);
  const [flash, setFlash] = useState<FlashMessage | null>(null);

  useEffect(() => {
    fetchCart();
  }, []);

  useEffect(() => {
    if (flash) {
      const timer = setTimeout(() => setFlash(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [flash]);

  const getAuthHeaders = () => {
    const token = localStorage.getItem("auth_token");
    if (token) {
      return { Authorization: `Bearer ${token}` };
    }
    return {};
  };

  const fetchCart = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("auth_token");
      const tempId = localStorage.getItem("temp_id");

      const payload: { cart_id?: string } = {};
      if (!token && tempId) {
        payload.cart_id = tempId;
      }

      const response = await axios.post(`${BASE_URL}/cart/fetch`, payload, {
        headers: getAuthHeaders(),
      });

      if (response.data && response.data.data) {
        setCartItems(response.data.data);
      } else if (response.data && Array.isArray(response.data)) {
        setCartItems(response.data);
      }
    } catch (error) {
      console.error("Error fetching cart:", error);
      setFlash({ type: "error", message: "Failed to load cart" });
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (itemId: number, newQuantity: number) => {
    if (newQuantity < 1) return;

    const currentItem = cartItems.find((item) => item.id === itemId);
    if (currentItem && currentItem.quantity === newQuantity) return;

    try {
      setUpdating(itemId);
      const token = localStorage.getItem("auth_token");
      const tempId = localStorage.getItem("temp_id");

      const payload: { quantity: number; cart_id?: string } = {
        quantity: newQuantity,
      };
      if (!token && tempId) {
        payload.cart_id = tempId;
      }

      await axios.post(`${BASE_URL}/api/cart/update/${itemId}`, payload, {
        headers: getAuthHeaders(),
      });

      setCartItems((prev) =>
        prev.map((item) =>
          item.id === itemId ? { ...item, quantity: newQuantity } : item,
        ),
      );
      setFlash({ type: "success", message: "Cart updated" });
    } catch (error) {
      console.error("Error updating cart:", error);
      setFlash({ type: "error", message: "Failed to update cart" });
    } finally {
      setUpdating(null);
    }
  };

  const removeItem = async (itemId: number) => {
    try {
      setUpdating(itemId);
      const token = localStorage.getItem("auth_token");
      const tempId = localStorage.getItem("temp_id");

      const payload: { cart_id?: string } = {};
      if (!token && tempId) {
        payload.cart_id = tempId;
      }

      await axios.delete(`${BASE_URL}/api/cart/remove/${itemId}`, {
        headers: getAuthHeaders(),
        data: payload,
      });

      setCartItems((prev) => prev.filter((item) => item.id !== itemId));
      setFlash({ type: "success", message: "Item removed from cart" });
    } catch (error) {
      console.error("Error removing item:", error);
      setFlash({ type: "error", message: "Failed to remove item" });
    } finally {
      setUpdating(null);
    }
  };

  const calculateSubtotal = () => {
    return cartItems.reduce(
      (sum, item) => sum + parsePrice(item.selling_price) * item.quantity,
      0,
    );
  };

  const calculateTax = () => {
    return calculateSubtotal() * 0.18;
  };

  const calculateShipping = () => {
    return calculateSubtotal() > 1000 ? 0 : 99;
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateTax() + calculateShipping();
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const getProductImage = (item: CartItem) => {
    if (item.file_urls && item.file_urls.length > 0) {
      return item.file_urls[0];
    }
    return "/images/placeholder.png";
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F5F5F5]">
        {/* Breadcrumb Skeleton */}
        <div className="bg-primary py-6">
          <div className="container mx-auto px-4">
            <div className="h-8 w-32 bg-white/20 rounded animate-pulse"></div>
          </div>
        </div>

        {/* Content Skeleton */}
        <div className="container mx-auto px-4 py-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="bg-white rounded-lg p-4 flex gap-4 animate-pulse"
                >
                  <div className="w-24 h-24 bg-gray-200 rounded"></div>
                  <div className="flex-1 space-y-3">
                    <div className="h-5 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                  </div>
                </div>
              ))}
            </div>
            <div className="bg-white rounded-lg p-6 h-fit animate-pulse">
              <div className="h-6 bg-gray-200 rounded w-1/2 mb-6"></div>
              <div className="space-y-3">
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className=" bg-[#F5F5F5] mt-20">
      {/* Flash Message */}
      {/* {flash && (
        <div
          className={`fixed bottom-5 left-1/2 -translate-x-1/2 z-50 px-6 py-3 rounded-lg shadow-lg transition-all duration-300 ${
            flash.type === "success"
              ? "bg-[#b3e3dd] text-[#00473E]"
              : "bg-red-100 text-red-700"
          }`}
        >
          {flash.message}
        </div>
      )} */}

      {/* Breadcrumb */}
      <div className="bg-primary pt-4">
        <div className="container mx-auto px-4">
          {/* Continue Shopping Link */}
          <Link
            href="/shop"
            className="inline-flex   font-heading  text-3xl items-center gap-2 text-[#075E5E] hover:text-brand font-semibold transition-colors mt-4"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-8 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
              />
            </svg>
            Shopping Cart
          </Link>
        </div>
      </div>

      {/* Cart Content */}
      <div className="container mx-auto px-4 py-10">
        {cartItems.length === 0 ? (
          /* Empty Cart */
          <div className="bg-white rounded-lg p-10 text-center max-w-lg mx-auto">
            <div className="w-24 h-24 mx-auto mb-6 text-gray-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-heading font-semibold text-[#464646] mb-3">
              Your cart is empty
            </h2>
            <p className="text-gray-500 mb-6">
              Looks like you haven&apos;t added any items to your cart yet.
            </p>
            <Link
              href="/shop"
              className="inline-block bg-[#075E5E] hover:bg-[#064d4d] text-white font-semibold px-8 py-3 rounded-lg transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          /* Cart with Items */
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {/* Desktop Header */}
              <div className="hidden md:grid grid-cols-12 gap-4 bg-white rounded-lg p-4 font-semibold text-[#464646]">
                <div className="col-span-6">Product</div>
                <div className="col-span-2 text-center">Price</div>
                <div className="col-span-2 text-center">Quantity</div>
                <div className="col-span-2 text-center">Subtotal</div>
              </div>

              {/* Cart Items List */}
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className={`bg-white rounded-lg p-4 transition-opacity ${
                    updating === item.id ? "opacity-50" : ""
                  }`}
                >
                  {/* Mobile Layout */}
                  <div className="md:hidden">
                    <div className="flex gap-4">
                      <div className="relative w-24 h-24 flex-shrink-0">
                        <Image
                          src={getProductImage(item)}
                          alt={item.product_name}
                          fill
                          className="object-cover rounded-lg"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-[#464646] line-clamp-2">
                          {item.product_name}
                        </h3>
                        {item.variant_value && (
                          <p className="text-sm text-gray-500 mt-1">
                            ({item.variant_value})
                          </p>
                        )}
                        <p className="text-brand font-semibold mt-2">
                          {formatPrice(parsePrice(item.selling_price))}
                        </p>
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-gray-400 hover:text-red-500 transition-colors self-start"
                        disabled={updating === item.id}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-5 h-5"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </div>
                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                      <div className="flex items-center border border-gray-200 rounded-lg">
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                          disabled={updating === item.id || item.quantity <= 1}
                          className="w-10 h-10 flex items-center justify-center text-[#464646] hover:bg-gray-100 disabled:opacity-50 transition-colors"
                        >
                          -
                        </button>
                        <span className="w-12 text-center font-semibold">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                          disabled={updating === item.id}
                          className="w-10 h-10 flex items-center justify-center text-[#464646] hover:bg-gray-100 disabled:opacity-50 transition-colors"
                        >
                          +
                        </button>
                      </div>
                      <p className="font-bold text-[#464646]">
                        {formatPrice(
                          parsePrice(item.selling_price) * item.quantity,
                        )}
                      </p>
                    </div>
                  </div>

                  {/* Desktop Layout */}
                  <div className="hidden md:grid grid-cols-12 gap-4 items-center">
                    <div className="col-span-6 flex items-center gap-4">
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-gray-400 hover:text-red-500 transition-colors"
                        disabled={updating === item.id}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-5 h-5"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                      <div className="relative w-20 h-20 flex-shrink-0">
                        <Image
                          src={getProductImage(item)}
                          alt={item.product_name}
                          fill
                          className="object-cover rounded-lg"
                        />
                      </div>
                      <div>
                        <h3 className="font-semibold text-[#464646]">
                          {item.product_name}
                        </h3>
                        {item.variant_value && (
                          <p className="text-sm text-gray-500 mt-1">
                            ({item.variant_value})
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="col-span-2 text-center font-semibold text-[#464646]">
                      {formatPrice(parsePrice(item.selling_price))}
                    </div>
                    <div className="col-span-2 flex justify-center">
                      <div className="flex items-center border border-gray-200 rounded-lg">
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                          disabled={updating === item.id || item.quantity <= 1}
                          className="w-8 h-8 flex items-center justify-center text-[#464646] hover:bg-gray-100 disabled:opacity-50 transition-colors"
                        >
                          -
                        </button>
                        <span className="w-10 text-center font-semibold">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                          disabled={updating === item.id}
                          className="w-8 h-8 flex items-center justify-center text-[#464646] hover:bg-gray-100 disabled:opacity-50 transition-colors"
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="col-span-2 text-center font-bold text-[#464646]">
                      {formatPrice(
                        parsePrice(item.selling_price) * item.quantity,
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg p-6 sticky top-24">
                <h2 className="text-xl font-heading font-bold text-[#464646] mb-6 uppercase">
                  Order Summary
                </h2>

                <div className="space-y-3 pb-4 border-b border-gray-100">
                  <div className="flex justify-between text-[#464646]">
                    <span>
                      Subtotal ({cartItems.length}{" "}
                      {cartItems.length === 1 ? "item" : "items"})
                    </span>
                    <span className="font-semibold">
                      {formatPrice(calculateSubtotal())}
                    </span>
                  </div>
                  <div className="flex justify-between text-[#464646]">
                    <span>Tax (18%)</span>
                    <span className="font-semibold">
                      {formatPrice(calculateTax())}
                    </span>
                  </div>
                  <div className="flex justify-between text-[#464646]">
                    <span>Shipping</span>
                    <span
                      className={`font-semibold ${calculateShipping() === 0 ? "text-green-600" : ""}`}
                    >
                      {calculateShipping() === 0
                        ? "Free"
                        : formatPrice(calculateShipping())}
                    </span>
                  </div>
                  {calculateShipping() > 0 && (
                    <p className="text-xs text-gray-500">
                      Free shipping on orders above {formatPrice(1000)}
                    </p>
                  )}
                </div>

                <div className="flex justify-between py-4 text-lg">
                  <span className="font-bold text-[#464646]">Total</span>
                  <span className="font-bold text-brand">
                    {formatPrice(calculateTotal())}
                  </span>
                </div>

                <button className="w-full bg-[#075E5E] hover:bg-[#064d4d] text-white font-semibold py-4 rounded-lg transition-colors uppercase tracking-wide">
                  Proceed to Checkout
                </button>

                <p className="text-xs text-gray-500 text-center mt-4">
                  Inclusive of all taxes
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
