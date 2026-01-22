"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { Product, Variant } from "../types";
import { BASE_URL } from "../constants";

interface UseProductOptions {
  productId: string;
  variantId?: string;
}

interface UseProductReturn {
  product: Product | null;
  loading: boolean;
  error: string | null;
  selectedVariantId: number | null;
  setSelectedVariantId: (id: number | null) => void;
  selectedVariant: Variant | null;
  variants: Variant[];
  images: string[];
}

export function useProduct({
  productId,
  variantId,
}: UseProductOptions): UseProductReturn {
  const [selectedVariantId, setSelectedVariantId] = useState<number | null>(
    () => {
      if (variantId) {
        const parsed = parseInt(variantId);
        return isNaN(parsed) ? null : parsed;
      }
      return null;
    }
  );
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Sync variantId from props to state when it changes
  useEffect(() => {
    if (variantId) {
      const parsed = parseInt(variantId);
      if (!isNaN(parsed) && parsed !== selectedVariantId) {
        setSelectedVariantId(parsed);
      }
    }
  }, [productId, variantId]);

  // Fetch product data
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await axios.post(
          `${BASE_URL}/products/get_products/${productId}`
        );

        const productData =
          response.data && response.data.success && response.data.data
            ? response.data.data
            : response.data;

        setProduct(productData);
        setError(null);

        // Set initial variant
        if (
          productData.variants &&
          Array.isArray(productData.variants) &&
          productData.variants.length > 0
        ) {
          const urlVariantId = variantId ? parseInt(variantId) : null;

          if (urlVariantId && !isNaN(urlVariantId)) {
            const selectedVariant = productData.variants.find(
              (v: Variant) => v.id === urlVariantId
            );
            setSelectedVariantId(
              selectedVariant ? urlVariantId : productData.variants[0].id
            );
          } else {
            setSelectedVariantId(productData.variants[0].id);
          }
        }
      } catch (err) {
        console.error("API ERROR:", err);
        setError("Failed to load product details");
      } finally {
        setLoading(false);
      }
    };

    if (productId && productId.trim() !== "") {
      fetchProduct();
    } else {
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
        setSelectedVariantId(product.variants[0].id);
      } else {
        const variantExists = product.variants.some(
          (v) => v.id === selectedVariantId
        );
        if (!variantExists) {
          setSelectedVariantId(product.variants[0].id);
        }
      }
    }
  }, [product, selectedVariantId]);

  // Compute derived values
  const variants: Variant[] =
    Array.isArray(product?.variants) && product.variants.length > 0
      ? product.variants
      : [];

  const selectedVariant =
    variants.length > 0
      ? selectedVariantId
        ? variants.find((v) => v.id === selectedVariantId) || variants[0]
        : variants[0]
      : null;

  // Get images from selected variant
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

  return {
    product,
    loading,
    error,
    selectedVariantId,
    setSelectedVariantId,
    selectedVariant,
    variants,
    images,
  };
}
