// Components
export { default as ProductGallery } from "./ProductGallery";
export { default as ProductInfo } from "./ProductInfo";
export { default as VariantSelector } from "./VariantSelector";
export { default as PriceDisplay } from "./PriceDisplay";
export { default as QuantitySelector } from "./QuantitySelector";
export { default as FeatureSlider } from "./FeatureSlider";
export { default as ProductSpecifications } from "./ProductSpecifications";
export { default as ProductFAQ } from "./ProductFAQ";
export { default as DescriptionSection } from "./DescriptionSection";

// Hooks
export { useProduct, useCart } from "./hooks";

// Types
export type {
  Product,
  Variant,
  Feature,
  FeatureIcon,
  ProductDetailClientProps,
} from "./types";

// Constants
export { BASE_URL, CART_BASE_URL, COLOR_OPTIONS, DEFAULT_FEATURE_ICONS } from "./constants";
