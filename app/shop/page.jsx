"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import MultiSelect from "./components/MultiSelect";
import PriceSlider from "./components/PriceSlider"; // Now using nouislider
import ProductCard from "./components/ProductCard";

const BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://haneri.ongoingsites.xyz/domex";

// Static Filter Options
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

export default function ShopPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modelOptions, setModelOptions] = useState([]);

  // Filter States
  const [selectedModels, setSelectedModels] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedSweeps, setSelectedSweeps] = useState([]);
  const [priceRange, setPriceRange] = useState([100, 20000]);
  const [sortBy, setSortBy] = useState("");

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12);
  const [totalItems, setTotalItems] = useState(0);

  // UI States
  const [isSticky, setIsSticky] = useState(false);
  const [flashMsg, setFlashMsg] = useState(null);

  // Fetch Models
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

  // Initial fetch and auto-fetch on Sort/Page/Limit change
  useEffect(() => {
    fetchProducts();
  }, [currentPage, itemsPerPage, sortBy]); // Removed others to prevent double firing, applied via "Apply" button

  // Sticky Scroll Logic
  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 500);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleApplyFilters = () => {
    setCurrentPage(1);
    fetchProducts();
  };

  const handleRemoveFilters = () => {
    setSelectedModels([]);
    setSelectedColors([]);
    setSelectedSweeps([]);
    setPriceRange([100, 20000]);
    setSortBy("");
    setCurrentPage(1);
    // Slight delay to ensure state resets before fetch
    setTimeout(fetchProducts, 50);
  };

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

  // Class string for sticky filter bar
  const stickyClass = `d-none d-lg-block ${isSticky ? "is-stuck" : ""}`;

  const features = [
    {
      img: "/images/Group_19.png",
      alt: "Pan India Delivery",
      label: "Pan India Delivery",
    },
    {
      img: "/images/Group_20.png",
      alt: "Free Delivery",
      label: "Free Delivery",
    },
    {
      img: "/images/Group_18.png",
      alt: "Easy Returns",
      label: "Easy Returns",
    },
    {
      img: "/images/Group_.png",
      alt: "GST Billing",
      label: "GST Billing",
    },
  ];

  return (
    <main className="main about shop_page mt-20">
      <div className="page-wrapper">
        <main className="main">
          <div className="container mb-1">
            <div className="row">
              <div className="col-lg-12 main-content shop">
                {/* Banner */}
                {/* <div className="image_area">
                  <img className="slide-bg" src="/images/categories.png" alt="banner" width="100%" />
                </div>
                <br /> */}

                {/* Features */}
                <section className="flex  flex-wrap gap-4 py-4">
                  {features.map((feature, index) => (
                    <div
                      key={index}
                      className="flex-1 max-w-60 bg-gradient-to-b from-[#f9f9f9] to-[#eaeaea] 
             rounded-[10px] p-2 flex items-center justify-start gap-3 shadow-[0_2px_5px_rgba(0,0,0,0.05)] 
             transition-colors duration-300 ease-in-out"
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
                <br />

                {/* =========================
                     DESKTOP FILTERS
                   ========================= */}
                <div id="desktop-filters-bar" className={stickyClass}>
                  <div className="grid grid-cols-[2fr_2fr_2fr_2fr_1fr] gap-4 bg-white p-4 px-3 rounded-[10px] shadow-[0_6px_16px_rgba(0,0,0,0.06)] border border-[#eee]">
                    {/* Model */}
                    <div className="text-[14px] font-semibold mb-2">
                      <h5 className="text-[14px] font-semibold mb-2">Model</h5>
                      <MultiSelect
                        placeholder="Select Model"
                        options={modelOptions}
                        value={selectedModels}
                        onChange={setSelectedModels}
                      />
                    </div>

                    {/* Color */}
                    <div className="text-[14px] font-semibold mb-2">
                      <h5 className="text-[14px] font-semibold mb-2">Color</h5>
                      <MultiSelect
                        placeholder="Select Color"
                        options={COLOR_OPTIONS}
                        value={selectedColors}
                        onChange={setSelectedColors}
                      />
                    </div>

                    {/* Sweep Size */}
                    <div className="text-[14px] font-semibold mb-2">
                      <h5 className="text-[14px] font-semibold mb-2">Sweep Size</h5>
                      <MultiSelect
                        placeholder="Select Sweep Size"
                        options={SWEEP_OPTIONS}
                        value={selectedSweeps}
                        onChange={setSelectedSweeps}
                      />
                    </div>

                    {/* Price Slider (NOU ISLIDER) */}
                    <div className="text-[14px] font-semibold mb-2">
                      <h5 className="text-[14px] font-semibold mb-2">Price</h5>
                      <div className="price-slider-wrapper">
                        <PriceSlider
                          min={0}
                          max={20000}
                          start={priceRange}
                          onChange={setPriceRange}
                        />
                      </div>
                      <div className="filter-price-action">
                        <div className="filter-price-text">
                          Price:{" "}
                          <span>
                            Rs.{priceRange[0]} - Rs.{priceRange[1]}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="text-[14px] font-semibold mb-2 filter-actions">
                      <button
                        className="apply_filter btn btn-primary w-100"
                        onClick={handleApplyFilters}
                      >
                        Apply Filters
                      </button>
                      <button
                        className="remove_filter btn btn-outline-secondary w-100"
                        onClick={handleRemoveFilters}
                      >
                        Remove Filters
                      </button>
                    </div>
                  </div>
                </div>

                {/* Spacer to prevent layout jump */}
                <div
                  id="filters-spacer"
                  className="d-none d-lg-block"
                  style={{
                    display: isSticky ? "block" : "none",
                    height: isSticky ? "0" : "0",
                  }}
                ></div>
                <br />

                {/* Sort Bar */}
                <nav className="toolbox sticky-header">
                  <div className="toolbox-left">
                    <div className="toolbox-item toolbox-sort">
                      <label>Sort By:</label>
                      <div className="select-custom">
                        <select
                          className="form-control"
                          value={sortBy}
                          onChange={(e) => setSortBy(e.target.value)}
                        >
                          <option value="">-Select-</option>
                          <option value="ascending">low to high</option>
                          <option value="descending">high to low</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="toolbox-right">
                    <div className="toolbox-item toolbox-show">
                      <label>Show:</label>
                      <div className="select-custom">
                        <select
                          className="form-control"
                          value={itemsPerPage}
                          onChange={(e) =>
                            setItemsPerPage(Number(e.target.value))
                          }
                        >
                          <option value="4">4</option>
                          <option value="8">8</option>
                          <option value="12">12</option>
                          <option value="16">16</option>
                          <option value="20">20</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </nav>

                {/* Products Grid */}
                <div className="row products_area" id="products-table">
                  {loading ? (
                    <div className="col-12 text-center my-5">
                      <h5>Loading...</h5>
                    </div>
                  ) : products.length === 0 ? (
                    <div className="col-12 text-center comming_soon">
                      <h3 className="text-danger my-5">Coming Soon!</h3>
                    </div>
                  ) : (
                    products.map(
                      (prod) =>
                        prod.variants &&
                        prod.variants.length > 0 && (
                          <ProductCard
                            key={prod.id}
                            product={prod}
                            initialVariant={prod.variants[0]}
                            addToCart={handleAddToCart}
                          />
                        )
                    )
                  )}
                </div>

                {/* Pagination */}
                <nav className="toolbox toolbox-pagination">
                  <ul className="pagination toolbox-item">
                    {currentPage > 1 && (
                      <button
                        className="page-link pagi"
                        onClick={() => setCurrentPage(currentPage - 1)}
                      >
                        Previous
                      </button>
                    )}

                    <button className="page-link pagi active">
                      {currentPage}
                    </button>

                    {totalItems > currentPage * itemsPerPage && (
                      <button
                        className="page-link pagi"
                        onClick={() => setCurrentPage(currentPage + 1)}
                      >
                        Next
                      </button>
                    )}
                  </ul>
                </nav>
              </div>

              {/* Mobile Sidebar (Structure) */}
              <aside className="sidebar-shop col-lg-3 order-lg-first mobile-sidebar d-block d-lg-none">
                {/* Similar structure to Desktop Filters but inside this aside tag */}
                {/* You can reuse MultiSelect and PriceSlider here if needed for mobile view */}
              </aside>
            </div>
          </div>
        </main>

        {/* Flash Message */}
        {flashMsg && (
          <div
            id="flash-message"
            style={{
              display: "block",
              position: "fixed",
              bottom: "30px",
              left: "50%",
              transform: "translateX(-50%)",
              background: flashMsg.bg,
              color: flashMsg.color,
              padding: "14px 24px",
              borderRadius: "8px",
              fontWeight: 500,
              fontSize: "16px",
              zIndex: 9999,
              border: `1px solid ${flashMsg.color}`,
            }}
          >
            {flashMsg.msg}
          </div>
        )}
      </div>
    </main>
  );
}
