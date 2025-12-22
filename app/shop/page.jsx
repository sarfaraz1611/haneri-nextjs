"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  ChevronDownIcon,
  FunnelIcon,
  MinusIcon,
  PlusIcon,
  Squares2X2Icon,
} from "@heroicons/react/20/solid";
import Link from "next/link";

// ==================== Constants ====================

const BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://haneri.ongoingsites.xyz/domex";

const COLOR_OPTIONS = [
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
];

const SWEEP_OPTIONS = [
  { label: "600mm", value: "600mm" },
  { label: "1200mm", value: "1200mm" },
  { label: "1320mm", value: "1320mm" },
];

const SORT_OPTIONS = [
  { name: "Default", value: "", current: true },
  { name: "Price: Low to High", value: "ascending", current: false },
  { name: "Price: High to Low", value: "descending", current: false },
];

const FEATURE_ITEMS = [
  {
    img: "/images/Group_19.png",
    alt: "Pan India Delivery",
    label: "Pan India Delivery",
  },
  { img: "/images/Group_20.png", alt: "Free Delivery", label: "Free Delivery" },
  { img: "/images/Group_18.png", alt: "Easy Returns", label: "Easy Returns" },
  { img: "/images/Group_.png", alt: "GST Billing", label: "GST Billing" },
];

// ==================== Utility Functions ====================

const classNames = (...classes) => classes.filter(Boolean).join(" ");

const normalizePrice = (val) => {
  if (!val) return 0;
  return parseFloat(String(val).replace(/,/g, ""));
};

// ==================== Components ====================

// Product Card Component
function ProductCard({ product, onAddToCart }) {
  const [activeVariant, setActiveVariant] = useState(product.variants[0] || {});

  const regularPrice = normalizePrice(activeVariant.regular_price);
  const sellingPrice = normalizePrice(activeVariant.selling_price);
  const hasDiscount = regularPrice > 0 && regularPrice !== sellingPrice;

  const imageUrl =
    activeVariant.file_urls?.[0] ||
    activeVariant.variant_images?.[0]?.image_url ||
    product.product_images?.[0]?.image_url ||
    "/images/placeholder.jpg";

  const shortDesc = product.description
    ? product.description.replace(/<[^>]*>?/gm, "").substring(0, 80) + "..."
    : "";

  const productUrl = `/product_detail?id=${product.id}&v_id=${activeVariant.id}`;

  return (
    <li className="group relative flex flex-col ">
      {/* Product Image */}
      <Link href={productUrl}>
        <div className="aspect-square w-full overflow-hidden rounded-lg bg-gray-200 shadow">
          <img
            alt={activeVariant.variant_value || product.name}
            src={imageUrl}
            className="h-full w-full object-cover object-center group-hover:opacity-75 transition-opacity "
          />
        </div>
      </Link>

      {/* Brand Logo */}
      {/* <div className="mt-3 flex justify-center"> */}
      {/* <img
          src="/images/Link_img.png"
          alt="Haneri"
          className="h-6 object-contain"
        /> */}
      {/* </div> */}

      {/* Product Info */}
      <div className="mt-3 flex flex-col">
        <h3 className="text-[30px] font-heading font-bold text-[#ca5d27]">
          <Link href={productUrl}>{product.name}</Link>
        </h3>

        {shortDesc && (
          <p className="mt-1 text-xs text-gray-500 line-clamp-2">{shortDesc}</p>
        )}

        {/* Price Display */}
        <div className="mt-2 flex items-center gap-2">
          <p className="text-base font-semibold text-gray-900">
            ₹{sellingPrice || activeVariant.price || 0}
          </p>
          {hasDiscount && (
            <p className="text-sm text-gray-500 line-through">
              ₹{regularPrice}
            </p>
          )}
        </div>
      </div>

      {/* Color Variant Selector */}
      {product.variants && product.variants.length > 0 && (
        <div className="mt-4">
          <h4 className="sr-only">Available colors</h4>
          <ul role="list" className="flex items-center flex-wrap gap-2">
            {product.variants.map((variant) => {
              // Try to find color match from variant.color or variant.variant_value
              const colorValue = variant.color || variant.variant_value || "";
              const colorObj = COLOR_OPTIONS.find(
                (c) => c.value.toLowerCase() === colorValue.toLowerCase()
              );
              const isActive = variant.id === activeVariant.id;

              // Use color swatch or default gray
              const backgroundColor = colorObj?.swatch || "#D1D5DB";

              return (
                <li
                  key={variant.id}
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveVariant(variant);
                  }}
                  style={{ backgroundColor }}
                  className={classNames(
                    "size-7 rounded-full border-2 cursor-pointer hover:scale-110 transition-transform shadow-sm",
                    isActive
                      ? "border-indigo-600 ring-2 ring-indigo-600 ring-offset-2"
                      : "border-gray-400"
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

      {/* Add to Cart Button */}
      <button
        onClick={(e) => {
          e.preventDefault();
          onAddToCart(product.id, activeVariant.id);
        }}
        className="mt-4 w-full rounded-md bg-[#00473E] px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-colors"
      >
        Add to Cart
      </button>
    </li>
  );
}

// Filter Section Component
function FilterSection({ section, selectedValues, onFilterChange }) {
  return (
    <Disclosure
      key={section.id}
      as="div"
      className="border-b border-gray-200 py-6"
    >
      <h3 className="-my-3 flow-root">
        <DisclosureButton className="group flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
          <span className="font-medium text-gray-900">{section.name}</span>
          <span className="ml-6 flex items-center">
            <PlusIcon
              aria-hidden="true"
              className="size-5 group-data-open:hidden"
            />
            <MinusIcon
              aria-hidden="true"
              className="size-5 group-not-data-open:hidden"
            />
          </span>
        </DisclosureButton>
      </h3>
      <DisclosurePanel className="pt-6">
        <div className="space-y-4 max-h-60 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-transparent hover:scrollbar-thumb-gray-500 scrollbar-thumb-rounded-full pr-2">
          {section.options.map((option, optionIdx) => {
            const isChecked = selectedValues.includes(option.value);

            return (
              <div key={option.value} className="flex gap-3">
                <div className="flex h-5 shrink-0 items-center">
                  <div className="group grid size-4 grid-cols-1">
                    <input
                      value={option.value}
                      checked={isChecked}
                      onChange={(e) =>
                        onFilterChange(
                          section.id,
                          option.value,
                          e.target.checked
                        )
                      }
                      id={`filter-${section.id}-${optionIdx}`}
                      name={`${section.id}[]`}
                      type="checkbox"
                      className="col-start-1 row-start-1 appearance-none rounded-sm border border-gray-300 bg-white checked:border-indigo-600 checked:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    />
                    <svg
                      fill="none"
                      viewBox="0 0 14 14"
                      className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white"
                    >
                      <path
                        d="M3 8L6 11L11 3.5"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="opacity-0 group-has-checked:opacity-100"
                      />
                    </svg>
                  </div>
                </div>
                <label
                  htmlFor={`filter-${section.id}-${optionIdx}`}
                  className="text-sm text-gray-600 flex items-center gap-2"
                >
                  {section.id === "color" && option.swatch && (
                    <span
                      className="inline-block size-4 rounded-full border border-gray-300"
                      style={{ backgroundColor: option.swatch }}
                    />
                  )}
                  {option.label}
                </label>
              </div>
            );
          })}
        </div>
      </DisclosurePanel>
    </Disclosure>
  );
}

// Price Range Filter Component
function PriceRangeFilter({ priceRange, onPriceChange, onPageReset }) {
  return (
    <Disclosure as="div" className="border-b border-gray-200 py-6">
      <h3 className="-my-3 flow-root">
        <DisclosureButton className="group flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
          <span className="font-medium text-gray-900">Price Range</span>
          <span className="ml-6 flex items-center">
            <PlusIcon
              aria-hidden="true"
              className="size-5 group-data-open:hidden"
            />
            <MinusIcon
              aria-hidden="true"
              className="size-5 group-not-data-open:hidden"
            />
          </span>
        </DisclosureButton>
      </h3>
      <DisclosurePanel className="pt-6">
        <div className="space-y-4">
          <div className="flex gap-2">
            <input
              type="number"
              placeholder="Min"
              value={priceRange[0]}
              onChange={(e) => {
                onPriceChange([parseInt(e.target.value) || 0, priceRange[1]]);
                onPageReset();
              }}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
            />
            <input
              type="number"
              placeholder="Max"
              value={priceRange[1]}
              onChange={(e) => {
                onPriceChange([
                  priceRange[0],
                  parseInt(e.target.value) || 20000,
                ]);
                onPageReset();
              }}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
            />
          </div>
          <p className="text-sm text-gray-600">
            Rs.{priceRange[0]} - Rs.{priceRange[1]}
          </p>
        </div>
      </DisclosurePanel>
    </Disclosure>
  );
}

// Mobile Filter Dialog Component
function MobileFiltersDialog({
  isOpen,
  onClose,
  filters,
  selectedModels,
  selectedColors,
  selectedSweeps,
  priceRange,
  onFilterChange,
  onPriceChange,
}) {
  const getSelectedValues = (filterId) => {
    switch (filterId) {
      case "model":
        return selectedModels;
      case "color":
        return selectedColors;
      case "sweep":
        return selectedSweeps;
      default:
        return [];
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-40 lg:hidden">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-black/25 transition-opacity duration-300 ease-linear data-closed:opacity-0"
      />

      <div className="fixed inset-0 z-40 flex">
        <DialogPanel
          transition
          className="relative ml-auto flex size-full max-w-xs transform flex-col overflow-y-auto bg-white pt-4 pb-6 shadow-xl transition duration-300 ease-in-out data-closed:translate-x-full"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4">
            <h2 className="text-lg font-medium text-gray-900">Filters</h2>
            <button
              type="button"
              onClick={onClose}
              className="relative -mr-2 flex size-10 items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-50"
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon aria-hidden="true" className="size-6" />
            </button>
          </div>

          {/* Filter Sections */}
          <form className="mt-4 border-t border-gray-200">
            {filters.map((section) => (
              <FilterSection
                key={section.id}
                section={section}
                selectedValues={getSelectedValues(section.id)}
                onFilterChange={onFilterChange}
              />
            ))}

            <PriceRangeFilter
              priceRange={priceRange}
              onPriceChange={onPriceChange}
              onPageReset={() => {}}
            />
          </form>
        </DialogPanel>
      </div>
    </Dialog>
  );
}

// Features Banner Component
function FeaturesBanner({ features }) {
  return (
    <section className="flex flex-wrap gap-4 py-4">
      {features.map((feature, index) => (
        <div
          key={index}
          className="flex-1 min-w-[200px] bg-gradient-to-b from-[#f9f9f9] to-[#eaeaea] rounded-[10px] p-2 flex items-center justify-start gap-3 shadow-[0_2px_5px_rgba(0,0,0,0.05)] transition-colors duration-300 ease-in-out"
        >
          <img
            src={feature.img}
            alt={feature.alt}
            className="w-[30px] h-[30px] object-contain"
          />
          <span className="font-[Barlow_Condensed] text-[1.2rem] text-[#00473E] tracking-[0.02em]">
            {feature.label}
          </span>
        </div>
      ))}
    </section>
  );
}

// Sort Menu Component
function SortMenu({ currentSort, onSortChange, onPageReset }) {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <MenuButton className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
        Sort
        <ChevronDownIcon
          aria-hidden="true"
          className="-mr-1 ml-1 size-5 shrink-0 text-gray-400 group-hover:text-gray-500"
        />
      </MenuButton>

      <MenuItems
        transition
        className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
      >
        <div className="py-1">
          {SORT_OPTIONS.map((option) => (
            <MenuItem key={option.name}>
              <button
                onClick={() => {
                  onSortChange(option.value);
                  onPageReset();
                }}
                className={classNames(
                  currentSort === option.value
                    ? "font-medium text-gray-900"
                    : "text-gray-500",
                  "block w-full text-left px-4 py-2 text-sm data-focus:bg-gray-100"
                )}
              >
                {option.name}
              </button>
            </MenuItem>
          ))}
        </div>
      </MenuItems>
    </Menu>
  );
}

// Flash Message Component
function FlashMessage({ message }) {
  if (!message) return null;

  return (
    <div
      style={{
        position: "fixed",
        bottom: "30px",
        left: "50%",
        transform: "translateX(-50%)",
        background: message.bg,
        color: message.color,
        padding: "14px 24px",
        borderRadius: "8px",
        fontWeight: 500,
        fontSize: "16px",
        zIndex: 9999,
        border: `1px solid ${message.color}`,
      }}
    >
      {message.msg}
    </div>
  );
}

// ==================== Main Component ====================

export default function ShopPage() {
  // State Management
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modelOptions, setModelOptions] = useState([]);
  const [flashMsg, setFlashMsg] = useState(null);

  // Filter States
  const [selectedModels, setSelectedModels] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedSweeps, setSelectedSweeps] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 20000]);
  const [sortBy, setSortBy] = useState("");

  // Pagination States
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(12);
  const [totalItems, setTotalItems] = useState(0);

  // Fetch Models on Mount
  useEffect(() => {
    axios
      .post(`${BASE_URL}/products/get_models`, {})
      .then((res) => {
        if (res.data?.data) {
          const opts = res.data.data.map((m) => ({
            label: m.model_name,
            value: m.model_name,
          }));
          setModelOptions(opts);
        }
      })
      .catch((err) => console.error("Model fetch error", err));
  }, []);

  // Fetch Products
  const fetchProducts = () => {
    setLoading(true);
    const offset = (currentPage - 1) * itemsPerPage;

    const payload = {
      search_product: selectedModels.join(","),
      color: selectedColors.join(","),
      sweep_size: selectedSweeps.join(","),
      min_priceFilter: priceRange[0],
      max_priceFilter: priceRange[1],
      order_price:
        sortBy === "ascending"
          ? "Ascending"
          : sortBy === "descending"
          ? "Descending"
          : "",
      limit: itemsPerPage,
      offset: offset,
      variant_type: "",
    };

    const token =
      typeof window !== "undefined" ? localStorage.getItem("auth_token") : null;
    const headers = token ? { Authorization: `Bearer ${token}` } : {};

    axios
      .post(`${BASE_URL}/products/get_products`, payload, { headers })
      .then((res) => {
        if (res.data?.data) {
          setProducts(res.data.data);
          setTotalItems(res.data.total_records || 0);
        } else {
          setProducts([]);
          setTotalItems(0);
        }
      })
      .catch((err) => {
        console.error(err);
        setProducts([]);
      })
      .finally(() => setLoading(false));
  };

  // Fetch products when filters or pagination changes
  useEffect(() => {
    fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    currentPage,
    itemsPerPage,
    sortBy,
    selectedModels,
    selectedColors,
    selectedSweeps,
    priceRange,
  ]);

  // Handlers
  const handleAddToCart = (productId, variantId) => {
    const token = localStorage.getItem("auth_token");
    const tempId = localStorage.getItem("temp_id");

    const payload = {
      product_id: parseInt(productId),
      quantity: 1,
      variant_id: parseInt(variantId),
    };
    if (!token && tempId) payload.cart_id = tempId;

    axios
      .post(`${BASE_URL}/cart/add`, payload, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      })
      .then((res) => {
        if (
          res.data.success ||
          (res.data.message && res.data.message.includes("successfully"))
        ) {
          if (!token && !tempId && res.data.data?.user_id) {
            localStorage.setItem("temp_id", res.data.data.user_id);
          }
          showFlash("Item added to cart!");
        } else {
          showFlash("Failed to add to cart", "#ffeaea", "#ff0000");
        }
      })
      .catch((err) => {
        console.error(err);
        showFlash("Error adding to cart", "#ffeaea", "#ff0000");
      });
  };

  const showFlash = (msg, bg = "#b3e3dd", color = "#00473E") => {
    setFlashMsg({ msg, bg, color });
    setTimeout(() => setFlashMsg(null), 3000);
  };

  const handleFilterChange = (filterId, value, checked) => {
    const updateFilter = (setter) => {
      setter((prev) =>
        checked ? [...prev, value] : prev.filter((v) => v !== value)
      );
    };

    switch (filterId) {
      case "model":
        updateFilter(setSelectedModels);
        break;
      case "color":
        updateFilter(setSelectedColors);
        break;
      case "sweep":
        updateFilter(setSelectedSweeps);
        break;
    }
    setCurrentPage(1);
  };

  const getSelectedValues = (filterId) => {
    switch (filterId) {
      case "model":
        return selectedModels;
      case "color":
        return selectedColors;
      case "sweep":
        return selectedSweeps;
      default:
        return [];
    }
  };

  // Filter Configuration
  const filters = [
    { id: "model", name: "Model", options: modelOptions },
    { id: "color", name: "Color", options: COLOR_OPTIONS },
    { id: "sweep", name: "Sweep Size", options: SWEEP_OPTIONS },
  ];

  const activeFiltersCount =
    selectedModels.length + selectedColors.length + selectedSweeps.length;

  // ==================== Render ====================

  return (
    <div className="bg-white overflow-x-hidden">
      {/* Mobile Filters Dialog */}
      <MobileFiltersDialog
        isOpen={mobileFiltersOpen}
        onClose={() => setMobileFiltersOpen(false)}
        filters={filters}
        selectedModels={selectedModels}
        selectedColors={selectedColors}
        selectedSweeps={selectedSweeps}
        priceRange={priceRange}
        onFilterChange={handleFilterChange}
        onPriceChange={setPriceRange}
      />

      {/* Features Banner */}
      <div className="mx-auto max-w-[82%]  px-4 sm:px-6 lg:px-8 pt-20">
        <FeaturesBanner features={FEATURE_ITEMS} />
      </div>

      {/* Main Content */}
      <main className="mx-auto max-w-[82%] px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-baseline justify-between border-b border-gray-200 pt-10 pb-6">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900">
            Our Products
          </h1>

          <div className="flex items-center gap-4">
            <SortMenu
              currentSort={sortBy}
              onSortChange={setSortBy}
              onPageReset={() => setCurrentPage(1)}
            />

            <button
              type="button"
              onClick={() => setMobileFiltersOpen(true)}
              className="relative -m-2 p-2 text-gray-400 hover:text-gray-500 lg:hidden"
            >
              <span className="sr-only">Filters</span>
              <FunnelIcon aria-hidden="true" className="size-5" />
              {activeFiltersCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-indigo-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {activeFiltersCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Products Section */}
        <section aria-labelledby="products-heading" className="pt-6 pb-24">
          <h2 id="products-heading" className="sr-only">
            Products
          </h2>

          <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
            {/* Desktop Filters */}
            <form className="hidden lg:block">
              {filters.map((section) => (
                <FilterSection
                  key={section.id}
                  section={section}
                  selectedValues={getSelectedValues(section.id)}
                  onFilterChange={handleFilterChange}
                />
              ))}

              <PriceRangeFilter
                priceRange={priceRange}
                onPriceChange={setPriceRange}
                onPageReset={() => setCurrentPage(1)}
              />
            </form>

            {/* Product Grid */}
            <div className="lg:col-span-3 lg:border-l lg:border-gray-200 lg:pl-8">
              {loading ? (
                <div className="text-center py-12">
                  <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-indigo-600 border-r-transparent"></div>
                  <p className="mt-4 text-gray-600">Loading products...</p>
                </div>
              ) : products.length === 0 ? (
                <div className="text-center py-12">
                  <h3 className="text-2xl font-semibold text-gray-900">
                    No products found
                  </h3>
                  <p className="mt-2 text-gray-600">
                    Try adjusting your filters
                  </p>
                </div>
              ) : (
                <ul
                  role="list"
                  className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8"
                >
                  {products.map((product) => {
                    if (!product.variants || product.variants.length === 0)
                      return null;

                    return (
                      <ProductCard
                        key={product.id}
                        product={product}
                        onAddToCart={handleAddToCart}
                      />
                    );
                  })}
                </ul>
              )}
            </div>
          </div>
        </section>
      </main>

      {/* Flash Message */}
      <FlashMessage message={flashMsg} />
    </div>
  );
}
