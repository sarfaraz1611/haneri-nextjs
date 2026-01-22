"use client";

import { useState } from "react";
import { CART_BASE_URL } from "../constants";

interface UseCartOptions {
  productId: string;
  variantId: number | null;
}

interface UseCartReturn {
  quantity: number;
  setQuantity: (qty: number) => void;
  addingToCart: boolean;
  addedToCart: boolean;
  handleAddToCart: () => Promise<void>;
}

export function useCart({
  productId,
  variantId,
}: UseCartOptions): UseCartReturn {
  const [quantity, setQuantity] = useState(1);
  const [addingToCart, setAddingToCart] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);

  const handleAddToCart = async () => {
    if (addingToCart || !variantId) return;

    setAddingToCart(true);

    try {
      const token = localStorage.getItem("auth_token");
      const tempId = localStorage.getItem("temp_id");

      const payload: {
        product_id: number;
        quantity: number;
        variant_id: number;
        cart_id?: string;
      } = {
        product_id: Number(productId),
        quantity: quantity,
        variant_id: Number(variantId),
      };

      if (!token && tempId) {
        payload.cart_id = tempId;
      }

      const response = await fetch(`${CART_BASE_URL}/cart/add`, {
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
        setAddedToCart(true);
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
    } finally {
      setAddingToCart(false);
    }
  };

  return {
    quantity,
    setQuantity,
    addingToCart,
    addedToCart,
    handleAddToCart,
  };
}
