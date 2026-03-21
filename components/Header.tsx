"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { FaBars, FaTimes, FaPlus, FaWhatsapp } from "react-icons/fa";
import { FiUser } from "react-icons/fi";
import { LEGACY_BASE_URL } from "./product/constants";

// Category data
const categories = [
  {
    name: "Ceiling Fan",
    image: "/images/Ceilimg Fan.png",
    href: "/shop?category=Ceiling Fan",
  },
  {
    name: "Table Wall Pedestals",
    image: "/images/Table Wall Pedestals.png",
    href: "/shop?category=Table Wall Pedestals",
  },
  {
    name: "Domestic Exhaust",
    image: "/images/Domestic Exhaust.png",
    href: "/shop?category=Domestic Exhaust",
  },
  {
    name: "Personal",
    image: "/images/Personal.png",
    href: "/shop?category=Personal",
  },
];

// Pillar Technology data
const pillarTechnologies = [
  {
    name: "Air Curve Design",
    href: "/air-curve-design",
  },
  {
    name: "TurboSilent BLDC",
    href: "/turbosilent-bldc",
  },
  {
    name: "HASS®",
    href: "/hass",
  },
  {
    name: "LumiAmbience",
    href: "/lumiambience",
  },
  {
    name: "SCAN",
    href: "/scan",
  },
];

// About Us data
const aboutUsMenu = [
  {
    title: "Our Story",
    href: "/our-story",
    subLinks: [
      { name: "VISION", href: "/our-story#vision" },
      { name: "MISSION", href: "/our-story#mission" },
      { name: "VALUES", href: "/our-story#values" },
    ],
  },
  {
    title: "Our Brands",
    href: "/our-brands",
    subLinks: [
      { name: "Haneri", href: "/our-brands#haneri" },
      { name: "Fancraft", href: "/our-brands#fancraft" },
      { name: "Professional", href: "/our-brands#professional" },
    ],
  },
  {
    title: "Capabilities",
    href: "/capabilities",
    subLinks: [],
  },
];

// Support Menu data
const supportMenu = [
  {
    title: "Product Help",
    isClickable: false,
    subLinks: [
      { name: "FAQs", href: "/faqs" },
      // { name: "Videos", href: "/videos" },
      // { name: "Catalogues", href: "/catalogues" },
      // { name: "Manuals", href: "/manuals" },
    ],
  },
  {
    title: "Corporate Enquiry",
    isClickable: false,
    subLinks: [{ name: "FORM", href: "/contact" }],
  },
  {
    title: "Contact Us",
    href: "/contact",
    isClickable: true,
    subLinks: [],
  },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [cartCount, setCartCount] = useState(0);

  const fetchCartCount = async () => {
    try {
      const token = localStorage.getItem("auth_token");
      const tempId = localStorage.getItem("temp_id");

      const payload: { cart_id?: string } = {};
      if (!token && tempId) {
        payload.cart_id = tempId;
      }

      const res = await fetch("https://api.haneri.com/api/cart/fetch", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      console.log("Cart API response:", data);
      console.log("count value:", data?.count, typeof data?.count);

      if (data?.count !== undefined && data?.count !== null) {
        setCartCount(data.count);
        console.log("setCartCount called with:", data.count);
      } else if (Array.isArray(data?.data)) {
        setCartCount(data.data.length);
        console.log("setCartCount from data.data.length:", data.data.length);
      }
    } catch {
      // silently fail
    }
  };

  useEffect(() => {
    // Check if user is logged in
    const authToken = localStorage.getItem("auth_token");
    setIsLoggedIn(!!authToken);
    fetchCartCount();

    window.addEventListener("cartUpdated", fetchCartCount);
    return () => window.removeEventListener("cartUpdated", fetchCartCount);
  }, []);

  useEffect(() => {
    if (!activeDropdown?.startsWith("desktop-")) return;
    const handleClickOutside = () => setActiveDropdown(null);
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [activeDropdown]);

  // const handleLogout = () => {
  //   localStorage.removeItem("auth_token");
  //   localStorage.removeItem("user_name");
  //   localStorage.removeItem("user_role");
  //   localStorage.removeItem("user_id");
  //   setIsLoggedIn(false);
  //   window.location.href = `${LEGACY_BASE_URL}/login.php`;
  // };

  const toggleDropdown = (menu: string) => {
    setActiveDropdown(activeDropdown === menu ? null : menu);
  };

  console.log("Header render - cartCount:", cartCount);

  return (
    // Ensure header has high z-index relative to page
    <header className="fixed w-full top-0 z-50 bg-white backdrop-blur-md shadow-sm">
      <div className="py-[15px] max-md:py-2.5">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-[30px] max-lg:gap-[15px]">
              <button
                className="hidden max-lg:block bg-transparent border-none text-2xl cursor-pointer z-50 relative p-2 text-[#005d5a]"
                type="button"
                onClick={() => {
                  setMobileMenuOpen(!mobileMenuOpen);
                }}
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? (
                  <FaTimes style={{ pointerEvents: "none" }} />
                ) : (
                  <FaBars style={{ pointerEvents: "none" }} />
                )}
              </button>

              <Link href="/" className="block">
                <img
                  src="/Haneri_Logo-.svg"
                  alt="Haneri"
                  className="h-10 w-auto max-lg:h-8 max-md:h-7 max-sm:h-6"
                />
              </Link>

              <nav className="flex max-lg:hidden font-sans">
                <ul className="list-none flex gap-[30px] lg:gap-0 m-0 p-0 pl-10 ">
                  {/* Categories Menu */}
                  <li className="relative group" onMouseEnter={() => { if (activeDropdown && activeDropdown !== "desktop-categories") setActiveDropdown(null); }}>
                    <button
                      onClick={(e) => { e.stopPropagation(); toggleDropdown("desktop-categories"); }}
                      className="text-[#464646] font-semibold text-[14px] font-sans transition-colors duration-300 py-[15px] px-[15px] block hover:text-brand uppercase tracking-[-0.25px] bg-transparent border-none cursor-pointer"
                    >
                      Categories
                    </button>

                    <div onClick={(e) => e.stopPropagation()} className={`absolute top-full left-1/2 -translate-x-1/2 pt-2.5 transition-all duration-300 z-50 ${activeDropdown === "desktop-categories" ? "visible opacity-100" : "invisible opacity-0 group-hover:visible group-hover:opacity-100"}`}>
                      <div className="bg-white min-w-1000 px-[30px] py-[25px] rounded-lg shadow-lg ">
                        <div className="flex justify-center items-center gap-5">
                          {categories.map((category) => (
                            <Link
                              key={category.name}
                              href={category.href}
                              onClick={() => setActiveDropdown(null)}
                              className="text-center   p-[15px]  w-[150px] rounded-lg transition-all duration-300 border border-transparent hover:bg-neutral-50  hover:-translate-y-1"
                            >
                              <div className="w-10 h-10 mx-auto mb-2.5 flex items-center justify-center max-[1200px]:w-[60px] max-[1200px]:h-[60px]">
                                <img
                                  src={category.image}
                                  alt={category.name}
                                  className="max-w-full max-h-full object-contain"
                                />
                              </div>
                              <p className="m-0 text-sm font-medium uppercase ">
                                {category.name}
                              </p>
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  </li>

                  {/* Pillar Technology Menu */}
                  <li className="relative group" onMouseEnter={() => { if (activeDropdown && activeDropdown !== "desktop-pillar") setActiveDropdown(null); }}>
                    <button
                      onClick={(e) => { e.stopPropagation(); toggleDropdown("desktop-pillar"); }}
                      className="text-[#464646] font-semibold text-[14px] font-sans transition-colors duration-300 py-[15px] px-[15px] block hover:text-brand uppercase tracking-[-0.25px] bg-transparent border-none cursor-pointer"
                    >
                      Pillar Technology
                    </button>
                    <div onClick={(e) => e.stopPropagation()} className={`absolute top-full left-1/2 -translate-x-1/2 pt-2.5 transition-all duration-300 z-50 ${activeDropdown === "desktop-pillar" ? "visible opacity-100" : "invisible opacity-0 group-hover:visible group-hover:opacity-100"}`}>
                      <div className="bg-white min-w-[300px] px-[30px] py-[25px] rounded-lg shadow-lg">
                        <ul className="list-none p-0 m-0 flex flex-col gap-[5px] ">
                          {pillarTechnologies.map((tech) => (
                            <li key={tech.name}>
                              <Link
                                href={tech.href}
                                onClick={() => setActiveDropdown(null)}
                                className="text-[14px] font-sans hover:text-brand transition-colors uppercase"
                              >
                                {tech.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </li>

                  {/* About Us Menu */}
                  <li className="relative group" onMouseEnter={() => { if (activeDropdown && activeDropdown !== "desktop-about") setActiveDropdown(null); }}>
                    <button
                      onClick={(e) => { e.stopPropagation(); toggleDropdown("desktop-about"); }}
                      className="text-[#464646] font-semibold text-[14px] font-sans transition-colors duration-300 py-[15px] px-[15px] block hover:text-brand uppercase tracking-[-0.25px] bg-transparent border-none cursor-pointer"
                    >
                      About Us
                    </button>
                    <div onClick={(e) => e.stopPropagation()} className={`absolute top-full left-1/2 -translate-x-1/2 transition-all duration-300 z-50 ${activeDropdown === "desktop-about" ? "visible opacity-100" : "invisible opacity-0 group-hover:visible group-hover:opacity-100"}`}>
                      <div className="bg-white min-w-[300px] px-[30px] py-[25px] rounded-lg shadow-lg">
                        <ul className="list-none p-0 m-0 flex flex-col gap-[15px]">
                          {aboutUsMenu.map((item) => (
                            <li
                              key={item.title}
                              className="py-2 border-b border-neutral-200 last:border-b-0"
                            >
                              <Link
                                href={item.href}
                                onClick={() => setActiveDropdown(null)}
                                className="font-semibold text-[14px]  inline-block mb-1 hover:text-brand uppercase"
                              >
                                {item.title}
                              </Link>
                              {item.subLinks.length > 0 && (
                                <div className="mt-1 text-[13px] text-neutral-600">
                                  {item.subLinks.map((subLink, index) => (
                                    <span key={subLink.name}>
                                      <Link
                                        href={subLink.href}
                                        onClick={() => setActiveDropdown(null)}
                                        className="text-neutral-600 text-xs font-light hover:text-brand uppercase"
                                      >
                                        {subLink.name}
                                      </Link>
                                      {index < item.subLinks.length - 1 && (
                                        <span> | </span>
                                      )}
                                    </span>
                                  ))}
                                </div>
                              )}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </li>

                  {/* Support Menu */}
                  <li className="relative group" onMouseEnter={() => { if (activeDropdown && activeDropdown !== "desktop-support") setActiveDropdown(null); }}>
                    <button
                      onClick={() => toggleDropdown("desktop-support")}
                      className="text-[#464646] font-semibold text-[14px] font-sans transition-colors duration-300 py-[15px] px-[15px] block hover:text-brand uppercase tracking-[-0.25px] bg-transparent border-none cursor-pointer"
                    >
                      Support
                    </button>
                    <div className={`absolute top-full left-1/2 -translate-x-1/2 pt-2.5 transition-all duration-300 z-50 ${activeDropdown === "desktop-support" ? "visible opacity-100" : "invisible opacity-0 group-hover:visible group-hover:opacity-100"}`}>
                      <div className="bg-white min-w-[300px] px-[30px] py-[25px] rounded-lg shadow-lg">
                        <ul className="list-none p-0 m-0 flex flex-col gap-[15px]">
                          {supportMenu.map((item) => (
                            <li
                              key={item.title}
                              className="py-2 border-b border-neutral-200 last:border-b-0"
                            >
                              {item.isClickable ? (
                                <Link
                                  href={item.href!}
                                  onClick={() => setActiveDropdown(null)}
                                  className="font-semibold text-[14px]  inline-block mb-1 uppercase"
                                >
                                  {item.title}
                                </Link>
                              ) : (
                                <>
                                  <span className="font-semibold text-[14px]  inline-block mb-1 uppercase">
                                    {item.title}
                                  </span>
                                  {item.subLinks.length > 0 && (
                                    <div className="mt-1 text-[13px] text-neutral-600">
                                      {item.subLinks.map((subLink, index) => (
                                        <span key={subLink.name}>
                                          <Link
                                            href={subLink.href}
                                            onClick={() => setActiveDropdown(null)}
                                            className="text-neutral-600 text-xs font-light hover:text-brand  uppercase"
                                          >
                                            {subLink.name}
                                          </Link>
                                          {index < item.subLinks.length - 1 && (
                                            <span> | </span>
                                          )}
                                        </span>
                                      ))}
                                    </div>
                                  )}
                                </>
                              )}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </li>
                </ul>
              </nav>
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center gap-2.5">
              {isLoggedIn ? (
                <div className="flex items-center gap-2.5">
                  <Link
                    href={`${LEGACY_BASE_URL}/profile.php`}
                    className="text-lg cursor-pointer transition-colors duration-300 p-1 hover:text-brand  text-primary"
                    title="Profile"
                  >
                    <FiUser />
                  </Link>
                   <span className="max-sm:text-sm text-primary">|</span>
                  <Link
                    href={`${LEGACY_BASE_URL}/cart.php`}
                    className="relative text-xl cursor-pointer transition-colors duration-300 p-1 hover:text-brand text-primary"
                    title="Cart"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="size-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                      />
                    </svg>
                    {cartCount > 0 && (
                      <span
                        className="absolute -top-1 -right-2 rounded-full flex items-center justify-center z-10 pointer-events-none"
                        style={{
                          backgroundColor: "#CA5D27",
                          color: "#fff",
                          fontSize: "9px",
                          fontWeight: 700,
                          minWidth: "18px",
                          height: "18px",
                          lineHeight: 1,
                          padding: "0 4px",
                        }}
                      >
                        {cartCount}
                      </span>
                    )}
                  </Link>
                  <span className="max-sm:text-sm text-primary">|</span>
                  <a
                    href="https://wa.me/"
                    className="text-xl cursor-pointer transition-colors duration-300 p-1 hover:text-brand text-primary"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaWhatsapp />
                  </a>
                 
                  {/* <span className="max-sm:text-sm text-primary">|</span> */}
                  {/* <button
                    onClick={handleLogout}
                    className="text-xl cursor-pointer transition-colors duration-300 bg-transparent border-none p-1 hover:text-brand text-primary"
                    title="Logout"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.7}
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
                      />
                    </svg>
                  </button> */}
                </div>
              ) : (
                <>
                  <Link
                    href={`${LEGACY_BASE_URL}/login.php`}
                    className="text-lg cursor-pointer transition-colors duration-300 p-1 hover:text-brand  max-sm:p-[3px] text-primary"
                    title="Login"
                  >
                    <FiUser />
                  </Link>
                  <span className="max-sm:text-sm text-primary">|</span>
                  <Link
                    href={`${LEGACY_BASE_URL}/cart.php`}
                    className="relative text-sm cursor-pointer transition-colors duration-300 p-1 hover:text-brand  max-sm:p-[3px] text-primary"
                    title="Cart"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="size-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                      />
                    </svg>
                    {cartCount > 0 && (
                      <span
                        className="absolute -top-2 -right-2 rounded-full flex items-center justify-center z-10 pointer-events-none"
                        style={{
                          backgroundColor: "#CA5D27",
                          color: "#fff",
                          fontSize: "9px",
                          fontWeight: 700,
                          minWidth: "18px",
                          height: "18px",
                          lineHeight: 1,
                          padding: "0 4px",
                        }}
                      >
                        {cartCount}
                      </span>
                    )}
                  </Link>
                  <span className="max-sm:text-sm text-primary">|</span>
                  <a
                    href="https://wa.me/"
                    className="text-xl cursor-pointer transition-colors duration-300 p-1 hover:text-brand text-primary"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaWhatsapp />
                  </a>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu Sidebar */}
      {mobileMenuOpen && (
        <>
          {/* Sidebar */}
          <div className="bg-[#005d5a] z-50 max-h-[calc(100vh-60px)] overflow-y-auto">
            {/* Close Button */}
            {/* <button
              onClick={() => setMobileMenuOpen(false)}
              className="absolute top-4 right-4 text-white text-2xl bg-transparent border-none cursor-pointer p-2"
              aria-label="Close menu"
            >
              <i className="fas fa-times"></i>
            </button> */}

            <nav className="">
              <ul className="list-none p-0 ">
                {/* Home */}
                <li className="border-b border-white/20">
                  <Link
                    href="/"
                    className="block py-4 px-6 text-white text-base font-normal tracking-wide uppercase"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    HOME
                  </Link>
                </li>

                {/* Categories */}
                <li className="border-b border-white/20">
                  <button
                    onClick={() => toggleDropdown("categories")}
                    className="w-full py-4 px-6 bg-transparent border-none text-left text-base font-normal tracking-wide uppercase cursor-pointer flex justify-between items-center text-white"
                  >
                    CATEGORIES
                    <FaPlus
                      className={`text-sm transition-transform duration-300 ${
                        activeDropdown === "categories" ? "rotate-45" : ""
                      }`}
                    />
                  </button>
                  {activeDropdown === "categories" && (
                    <ul className="list-none py-2 m-0 bg-primary-dark">
                      {categories.map((category) => (
                        <li key={category.name} className="py-2.5">
                          <Link
                            href={category.href}
                            className="block px-6 text-white/90 text-sm transition-colors hover:text-white"
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            {category.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>

                {/* Pillar Technology */}
                <li className="border-b border-white/20">
                  <button
                    onClick={() => toggleDropdown("pillar")}
                    className="w-full py-4 px-6 bg-transparent border-none text-left text-base font-normal tracking-wide uppercase cursor-pointer flex justify-between items-center text-white"
                  >
                    PILLAR TECHNOLOLGY
                    <FaPlus
                      className={`text-sm transition-transform duration-300 ${
                        activeDropdown === "pillar" ? "rotate-45" : ""
                      }`}
                    />
                  </button>
                  {activeDropdown === "pillar" && (
                    <ul className="list-none py-2 m-0 bg-primary-dark">
                      {pillarTechnologies.map((tech) => (
                        <li key={tech.name} className="py-2.5">
                          <Link
                            href={tech.href}
                            className="block px-6 text-white/90 text-sm transition-colors hover:text-white"
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            {tech.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>

                {/* About Us */}
                <li className="border-b border-white/20">
                  <button
                    onClick={() => toggleDropdown("about")}
                    className="w-full py-4 px-6 bg-transparent border-none text-left text-base font-normal tracking-wide uppercase cursor-pointer flex justify-between items-center text-white"
                  >
                    ABOUT US
                    <FaPlus
                      className={`text-sm transition-transform duration-300 ${
                        activeDropdown === "about" ? "rotate-45" : ""
                      }`}
                    />
                  </button>
                  {activeDropdown === "about" && (
                    <ul className="list-none py-2 m-0 ">
                      {aboutUsMenu.map((item) => (
                        <li key={item.title} className="py-2.5">
                          <Link
                            href={item.href}
                            className="block px-6 text-white/90 text-sm transition-colors hover:text-white"
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            {item.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>

                {/* Contact Us */}
                <li className="border-b border-white/20">
                  <Link
                    href="/contact"
                    className="block py-4 px-6 text-white text-base font-normal tracking-wide uppercase"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    CONTACT US
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </>
      )}
    </header>
  );
}
