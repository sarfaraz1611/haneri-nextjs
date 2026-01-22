export const BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://api.haneri.com/api";

export const CART_BASE_URL = "https://api.haneri.com/api";

export const COLOR_OPTIONS = [
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
] as const;

export const DEFAULT_FEATURE_ICONS = [
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
] as const;
