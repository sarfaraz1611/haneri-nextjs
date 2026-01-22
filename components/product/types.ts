export interface Variant {
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

export interface Feature {
  id: number;
  feature_name: string;
  feature_value: string;
  is_filterable: number;
}

export interface FeatureIcon {
  id: number;
  icon_url: string;
  label: string;
}

export interface Product {
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

export interface ProductDetailClientProps {
  productId: string;
  variantId?: string;
}
