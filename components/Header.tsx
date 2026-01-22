"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

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
    name: "H.A.S.S®",
    href: "/hass",
  },
  {
    name: "LumiAmbience",
    href: "/lumiambience",
  },
  {
    name: "S.C.A.N",
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

  useEffect(() => {
    // Check if user is logged in
    const authToken = localStorage.getItem("auth_token");
    setIsLoggedIn(!!authToken);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("user_name");
    localStorage.removeItem("user_role");
    localStorage.removeItem("user_id");
    setIsLoggedIn(false);
    window.location.href = "/login";
  };

  const toggleDropdown = (menu: string) => {
    setActiveDropdown(activeDropdown === menu ? null : menu);
  };

  return (
    // Ensure header has high z-index relative to page
    <header className="fixed w-full top-0 z-50 bg-white backdrop-blur-md shadow-sm">
      <div className="py-[15px] max-md:py-2.5">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-[30px] max-lg:gap-[15px]">
              <button
                className="hidden max-xl:block bg-transparent border-none text-2xl cursor-pointer z-50 relative p-2 text-[#00473E]"
                type="button"
                onClick={() => {
                  setMobileMenuOpen(!mobileMenuOpen);
                }}
                aria-label="Toggle menu"
              >
                <i
                  className={`fas ${mobileMenuOpen ? "fa-times" : "fa-bars"}`}
                  style={{ pointerEvents: "none" }}
                ></i>
              </button>

              <Link href="/" className="block">
                <img
                  src="/images/Haneri Logo.png"
                  alt="Haneri"
                  className="h-10 w-auto max-lg:h-8 max-md:h-7 max-sm:h-6"
                />
              </Link>

              <nav className="flex max-xl:hidden">
                <ul className="list-none flex gap-[30px] m-0 p-0 pl-10 ">
                  {/* Categories Menu */}
                  <li className="relative group">
                    <Link
                      href="/shop"
                      className="text-[#464646] font-semibold text-[14px] font-sans transition-colors duration-300 py-[15px] px-[15px] block hover:text-brand uppercase tracking-[-0.25px]"
                    >
                      Categories
                    </Link>

                    <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2.5 transition-all duration-300 invisible opacity-0 group-hover:visible group-hover:opacity-100 z-50">
                      <div className="bg-white min-w-1000 px-[30px] py-[25px] rounded-lg shadow-lg ">
                        <div className="flex justify-center items-center gap-5">
                          {categories.map((category) => (
                            <Link
                              key={category.name}
                              href={category.href}
                              className="text-center  p-[15px]  w-[150px] rounded-lg transition-all duration-300 border border-transparent hover:bg-neutral-50 hover:border-brand hover:-translate-y-1"
                            >
                              <div className="w-10 h-10 mx-auto mb-2.5 flex items-center justify-center max-[1200px]:w-[60px] max-[1200px]:h-[60px]">
                                <img
                                  src={category.image}
                                  alt={category.name}
                                  className="max-w-full max-h-full object-contain"
                                />
                              </div>
                              <p className="m-0 text-sm font-medium text-primary-green uppercase">
                                {category.name}
                              </p>
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  </li>

                  {/* Pillar Technology Menu */}
                  <li className="relative group">
                    <Link
                      href="/air-curve-design"
                      className="text-[#464646] font-semibold text-[14px] font-sans transition-colors duration-300 py-[15px] px-[15px] block hover:text-brand uppercase tracking-[-0.25px]"
                    >
                      Pillar Technology
                    </Link>
                    <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2.5 transition-all duration-300 invisible opacity-0 group-hover:visible group-hover:opacity-100 z-50">
                      <div className="bg-white min-w-[300px] px-[30px] py-[25px] rounded-lg shadow-lg">
                        <ul className="list-none p-0 m-0 flex flex-col gap-[5px] ">
                          {pillarTechnologies.map((tech) => (
                            <li key={tech.name}>
                              <Link
                                href={tech.href}
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
                  <li className="relative group">
                    <Link
                      href="/our-story"
                      className="text-[#464646] font-semibold text-[14px] font-sans transition-colors duration-300 py-[15px] px-[15px] block hover:text-brand uppercase tracking-[-0.25px]"
                    >
                      About Us
                    </Link>
                    <div className="absolute top-full left-1/2 -translate-x-1/2  transition-all duration-300 invisible opacity-0 group-hover:visible group-hover:opacity-100 z-50">
                      <div className="bg-white min-w-[300px] px-[30px] py-[25px] rounded-lg shadow-lg">
                        <ul className="list-none p-0 m-0 flex flex-col gap-[15px]">
                          {aboutUsMenu.map((item) => (
                            <li
                              key={item.title}
                              className="py-2 border-b border-neutral-200 last:border-b-0"
                            >
                              <Link
                                href={item.href}
                                className="font-semibold text-[14px] text-primary-green inline-block mb-1 hover:text-brand uppercase"
                                // className={`${
                                //   item.subLinks.length > 0
                                //     ? "font-semibold text-[14px] text-primary-green inline-block mb-1 hover:text-brand uppercase"
                                //     : "text-primary-green hover:text-brand uppercase"
                                // }`}
                              >
                                {item.title}
                              </Link>
                              {item.subLinks.length > 0 && (
                                <div className="mt-1 text-[13px] text-neutral-600">
                                  {item.subLinks.map((subLink, index) => (
                                    <span key={subLink.name}>
                                      <Link
                                        href={subLink.href}
                                        className="text-neutral-600 text-xs font-light hover:text-brand hover:underline uppercase"
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
                  <li className="relative group">
                    <Link
                      href="/contact"
                      className="text-[#464646] font-semibold text-[14px] font-sans transition-colors duration-300 py-[15px] px-[15px] block hover:text-brand uppercase tracking-[-0.25px]"
                    >
                      Support
                    </Link>
                    <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2.5 transition-all duration-300 invisible opacity-0 group-hover:visible group-hover:opacity-100 z-50">
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
                                  className="font-semibold text-[14px] text-primary-green inline-block mb-1 uppercase"
                                >
                                  {item.title}
                                </Link>
                              ) : (
                                <>
                                  <span className="font-semibold text-[14px] text-primary-green inline-block mb-1 uppercase">
                                    {item.title}
                                  </span>
                                  {item.subLinks.length > 0 && (
                                    <div className="mt-1 text-[13px] text-neutral-600">
                                      {item.subLinks.map((subLink, index) => (
                                        <span key={subLink.name}>
                                          <Link
                                            href={subLink.href}
                                            className="text-neutral-600 text-xs font-light hover:text-brand hover:underline uppercase"
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
                <div className="hidden sm:flex items-center gap-2.5">
                  <Link
                    href="/profile"
                    className="text-sm cursor-pointer transition-colors duration-300 p-1 hover:text-brand  text-primary"
                    title="Profile"
                  >
                    <i
                      className="far fa-user"
                      style={{ fontWeight: 300, strokeWidth: "0.2px" }}
                    ></i>
                  </Link>
                  <span className="max-sm:text-sm text-primary">|</span>
                  <a
                    href="https://wa.me/"
                    className="text-xl cursor-pointer transition-colors duration-300 p-1 hover:text-brand text-primary"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i
                      className="fab fa-whatsapp"
                      style={{ fontWeight: 300, strokeWidth: "0.1px" }}
                    ></i>
                  </a>
                  <span className="max-sm:text-sm text-primary">|</span>
                  <Link
                    href="/cart"
                    className="text-xl cursor-pointer transition-colors duration-300 p-1 hover:text-brand text-primary"
                    title="Cart"
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
                        d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                      />
                    </svg>
                  </Link>
                  <span className="max-sm:text-sm text-primary">|</span>
                  <button
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
                  </button>
                </div>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="text-sm cursor-pointer transition-colors duration-300 p-1 hover:text-brand  max-sm:p-[3px] text-primary"
                    title="Login"
                  >
                    <i
                      className="far fa-user"
                      style={{ fontWeight: 300, strokeWidth: "0.2px" }}
                    ></i>
                  </Link>
                  <span className="max-sm:text-sm text-primary">|</span>
                  <Link
                    href="/cart"
                    className="text-sm cursor-pointer transition-colors duration-300 p-1 hover:text-brand  max-sm:p-[3px] text-primary"
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
                  </Link>
                  <span className="max-sm:text-sm text-primary">|</span>
                  <a
                    href="https://wa.me/"
                    className="text-xl cursor-pointer transition-colors duration-300 p-1 hover:text-brand text-primary"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i
                      className="fab fa-whatsapp"
                      style={{ fontWeight: 300, strokeWidth: "0.2px" }}
                    ></i>
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
          <div className="  bg-[#00473E] z-50 overflow-y-auto">
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
                    <i
                      className={`fas fa-plus text-sm transition-transform duration-300 ${
                        activeDropdown === "categories" ? "rotate-45" : ""
                      }`}
                    ></i>
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
                    <i
                      className={`fas fa-plus text-sm transition-transform duration-300 ${
                        activeDropdown === "pillar" ? "rotate-45" : ""
                      }`}
                    ></i>
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
                    <i
                      className={`fas fa-plus text-sm transition-transform duration-300 ${
                        activeDropdown === "about" ? "rotate-45" : ""
                      }`}
                    ></i>
                  </button>
                  {activeDropdown === "about" && (
                    <ul className="list-none py-2 m-0 bg-primary-dark">
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
