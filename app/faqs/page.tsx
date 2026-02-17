"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface FAQ {
  question: string;
  category: string;
  answer: string;
}

const faqs: FAQ[] = [
  // About Haneri
  {
    question: "What is Haneri?",
    category: "About Haneri",
    answer:
      "Haneri is a premium appliance brand built by a team with 75+ years of combined experience in consumer durables and innovation, focusing on performance and user-centric design.",
  },
  {
    question: "Why trust a new brand like Haneri?",
    category: "About Haneri",
    answer:
      "The founding team has deep expertise in product creation and manufacturing, with every product engineered to high standards and supported by reliable after-sales service.",
  },
  {
    question: "How does Haneri compare to established brands?",
    category: "About Haneri",
    answer:
      "Haneri combines veteran expertise with fresh design perspectives, aiming to match or exceed performance benchmarks while addressing evolving consumer needs.",
  },
  // Personalisation & Design
  {
    question: "What is Haneri BeSpoke™?",
    category: "Personalization & Design",
    answer:
      "Haneri BeSpoke™ lets you personalise select fan models with your choice of colours, patterns, finishes—and on select models, even materials, built in smaller lots with a nominal premium.",
  },
  {
    question: "What is Air Curve Design™?",
    category: "Personalization & Design",
    answer:
      "Air Curve Design™ uses advanced computational modelling to craft blade profiles that maximise airflow and efficiency for superior aerodynamics.",
  },
  // Core Technologies
  {
    question: "What is Silent H.A.S.S.™ Technology?",
    category: "Core Technologies",
    answer:
      "Silent H.A.S.S.™ integrates two Haneri pillars—Air Curve Design™ blades + TurboSilent BLDC™ motor, delivering exceptional air at reduced RPM with quiet operation.",
  },
  {
    question: "What is TurboSilent BLDC™?",
    category: "Core Technologies",
    answer:
      "A high-torque, energy-efficient BLDC motor platform engineered for strong air delivery, stable speed control, and ultra-quiet performance.",
  },
  {
    question:
      "What is More Air Slow Speed Technology™ (High Air at Low Speed)?",
    category: "Core Technologies",
    answer:
      "This innovation delivers excellent airflow at lower speeds, enabling comfort while saving energy.",
  },
  {
    question: "What is LumiAmbience™(Mood Lighting)?",
    category: "Core Technologies",
    answer:
      "Selectable ambient lighting on supported models to set a cozy or vibrant mood. Adjustable via the fan's remote.",
  },
  // Products & Performance
  {
    question: "What types of fans do you offer?",
    category: "Products & Performance",
    answer:
      "A wide range including ceiling, pedestal, wall-mounted, table, exhaust, and designer fans.",
  },
  {
    question: "Are Haneri fans suitable for large rooms?",
    category: "Products & Performance",
    answer:
      "Yes, high-performance models are engineered for superior air delivery across larger spaces.",
  },
  {
    question: "Are Haneri fans energy-efficient?",
    category: "Products & Performance",
    answer:
      "Yes, most models use BLDC platform technology for strong airflow with minimal power consumption.",
  },
  {
    question: "Do Haneri fans run quietly?",
    category: "Products & Performance",
    answer:
      "Yes, featuring TurboSilent BLDC™ motors and Silent H.A.S.S.™ integration for low sound levels.",
  },
  {
    question: "Do Haneri fans have remote control?",
    category: "Products & Performance",
    answer:
      "Many models include remote control for speed, modes, and available lighting features.",
  },
  // Quality, Compliance & Manufacturing
  {
    question: "Where are Haneri fans manufactured?",
    category: "Quality, Compliance & Manufacturing",
    answer:
      "Designed and manufactured in-house and comply with BIS and BEE norms; proudly Made in India.",
  },
  {
    question: "How do you ensure durability and quality?",
    category: "Quality, Compliance & Manufacturing",
    answer:
      "Through premium materials, advanced engineering, and multi-stage QC testing aligned to international standards.",
  },
  {
    question: "Are Haneri fans certified?",
    category: "Quality, Compliance & Manufacturing",
    answer:
      "Yes, products meet or exceed safety, energy-efficiency, and performance certifications.",
  },
  // Ownership, Service & Warranty
  {
    question: "Do Haneri fans come with a warranty?",
    category: "Ownership, Service & Warranty",
    answer:
      "Yes, all fans include standard warranty (terms vary by model; see product manual).",
  },
  {
    question: "How do I register my warranty?",
    category: "Ownership, Service & Warranty",
    answer: "Register on the website with purchase details and serial number.",
  },
  {
    question: "Is after-sales service available?",
    category: "Ownership, Service & Warranty",
    answer: "Yes, comprehensive service through authorised centres nationwide.",
  },
  {
    question: "Can I install the fan myself?",
    category: "Ownership, Service & Warranty",
    answer:
      "Some models are DIY-friendly; professional installation recommended for optimal performance.",
  },
  {
    question: "How do I clean and maintain my fan?",
    category: "Ownership, Service & Warranty",
    answer:
      "Wipe blades and housing with soft, damp cloth; consult product manual for detailed care.",
  },
  {
    question: "Are replacement parts available?",
    category: "Ownership, Service & Warranty",
    answer:
      "Yes, contact customer service or visit authorised service centres for genuine parts.",
  },
  {
    question: "What if my fan isn't working?",
    category: "Ownership, Service & Warranty",
    answer:
      "Check the troubleshooting section in your manual; contact support if issues persist.",
  },
  // Buying, Shipping & Returns
  {
    question: "Where can I buy Haneri fans?",
    category: "Buying, Shipping & Returns",
    answer:
      "Official website, select e-commerce platforms, and leading retail stores.",
  },
  {
    question: "Do you offer free shipping?",
    category: "Buying, Shipping & Returns",
    answer:
      "Free shipping available on select products and locations per Shipping Policy.",
  },
  {
    question: "What's your return/replacement policy?",
    category: "Buying, Shipping & Returns",
    answer:
      "Hassle-free returns/replacements for eligible defective or damaged products per Return Policy.",
  },
  // Support
  {
    question: "How do I contact Haneri?",
    category: "support",
    answer: "Via customer care number, email, or contact form on the website.",
  },
  {
    question: "How does Haneri engage with customers?",
    category: "support",
    answer:
      "Through clear communication about features, warranties, and policies across website, social channels, and support lines.",
  },
];

const categories = [
  "All",
  ...Array.from(new Set(faqs.map((faq) => faq.category))),
];

export default function FAQs() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const categoryScrollRef = useRef<HTMLDivElement>(null);

  const scrollCategories = (direction: "left" | "right") => {
    if (categoryScrollRef.current) {
      const scrollAmount = 200;
      categoryScrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const searchResults = searchQuery.trim()
    ? faqs.filter(
        (faq) =>
          faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
          faq.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
          faq.category.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    : [];

  useEffect(() => {
    if (isSearchOpen) {
      document.body.style.overflow = "hidden";
      setTimeout(() => searchInputRef.current?.focus(), 100);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isSearchOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsSearchOpen(false);
        setSearchQuery("");
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const filteredFaqs =
    activeCategory === "All"
      ? faqs
      : faqs.filter(
          (faq) => faq.category.toLowerCase() === activeCategory.toLowerCase(),
        );

  return (
    <div className="bg-white mt-20 sm:mt-4">
      <div className="mx-auto max-w-[90%] px-6 py-8 sm:py-24 lg:px-8 lg:py-24">
        <div className="mx-auto">
          <div className="flex items-center justify-between gap-4">
            <motion.h2
              className="text-lg xl:text-4xl font-semibold tracking-tight text-primary sm:text-5xl"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              Frequently asked questions
            </motion.h2>
            <button
              onClick={() => setIsSearchOpen(true)}
              className="flex items-center gap-2 rounded-full border border-neutral-300 px-4 py-2 text-sm text-neutral-500 transition-all duration-300 hover:border-primary hover:text-primary"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="size-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                />
              </svg>
              <span className="hidden sm:inline">Search</span>
            </button>
          </div>

          {/* Scrollable Category Section */}
          <div className="mt-8 flex items-center gap-2">
            {/* <button
              onClick={() => scrollCategories("left")}
              className="shrink-0 flex items-center justify-center size-8 rounded-full border border-neutral-300 text-neutral-500 transition-all duration-300 hover:border-primary hover:text-primary"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="size-4"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
              </svg>
            </button> */}

            <div
              className=""
            >
              <div className="flex gap-3 pb-2  flex-wrap">
                {categories.map((category) => (
                  <button
                    key={category}
                    ref={(el) => {
                      if (activeCategory === category && el) {
                        el.scrollIntoView({
                          behavior: "smooth",
                          block: "nearest",
                          inline: "center",
                        });
                      }
                    }}
                    onClick={() => {
                      setActiveCategory(category);
                      setOpenIndex(null);
                    }}
                    className={`whitespace-nowrap rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-300 ${
                      activeCategory === category
                        ? "bg-gray-500 text-white shadow-md"
                        : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* <button
              onClick={() => scrollCategories("right")}
              className="shrink-0 flex items-center justify-center size-8 rounded-full border border-neutral-300 text-neutral-500 transition-all duration-300 hover:border-primary hover:text-primary"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="size-4"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
              </svg>
            </button> */}
          </div>

          <dl className="mt-10 divide-y divide-gray-900/10">
            {filteredFaqs.map((faq, index) => (
              <motion.div
                key={index}
                className="py-6 first:pt-0 last:pb-0"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  ease: "easeOut",
                  delay: index * 0.1,
                }}
              >
                <dt>
                  <button
                    type="button"
                    onClick={() => toggleFAQ(index)}
                    className="flex w-full items-start justify-between text-left text-gray-900"
                    aria-expanded={openIndex === index}
                  >
                    <span className="text-base/7 font-semibold">
                      {faq.question}
                    </span>
                    <span className="ml-6 flex h-7 items-center">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        aria-hidden="true"
                        className={`size-6 transition-transform duration-300 ${
                          openIndex === index ? "hidden" : "block"
                        }`}
                      >
                        <path
                          d="M12 6v12m6-6H6"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        aria-hidden="true"
                        className={`size-6 transition-transform duration-300 ${
                          openIndex === index ? "block" : "hidden"
                        }`}
                      >
                        <path
                          d="M18 12H6"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  </button>
                </dt>
                <AnimatePresence>
                  {openIndex === index && (
                    <motion.dd
                      className="mt-2 pr-12 overflow-hidden"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <p className="text-base/7 text-gray-600">{faq.answer}</p>
                    </motion.dd>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </dl>
        </div>
      </div>

      {/* Search Modal */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-start justify-center bg-black/50 backdrop-blur-sm pt-20 px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                setIsSearchOpen(false);
                setSearchQuery("");
              }
            }}
          >
            <motion.div
              ref={modalRef}
              className="w-full max-w-2xl rounded-2xl bg-white shadow-2xl overflow-hidden"
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              {/* Search Input */}
              <div className="flex items-center gap-3 border-b border-gray-200 px-5 py-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="size-5 shrink-0 text-gray-400"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                  />
                </svg>
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder="Search FAQs..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 bg-transparent text-base text-gray-900 placeholder:text-gray-400 outline-none"
                />
                <button
                  onClick={() => {
                    setIsSearchOpen(false);
                    setSearchQuery("");
                  }}
                  className="rounded-lg p-1 text-gray-400 transition-colors hover:text-gray-900"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="size-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18 18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              {/* Search Results */}
              <div
                className="max-h-[60vh] overflow-y-auto"
                style={{ scrollbarWidth: "thin" }}
              >
                {searchQuery.trim() === "" ? (
                  <div className="px-5 py-10 text-center text-gray-400">
                    Type to search across all FAQs
                  </div>
                ) : searchResults.length === 0 ? (
                  <div className="px-5 py-10 text-center text-gray-400">
                    No results found for &ldquo;{searchQuery}&rdquo;
                  </div>
                ) : (
                  <div className="divide-y divide-gray-100">
                    {searchResults.map((faq, index) => (
                      <div
                        key={index}
                        className="px-5 py-4 transition-colors hover:bg-gray-50"
                      >
                        <span className="mb-1 inline-block rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-600">
                          {faq.category}
                        </span>
                        <h4 className="text-sm font-semibold text-gray-900">
                          {faq.question}
                        </h4>
                        <p className="mt-1 text-sm text-gray-500 line-clamp-2">
                          {faq.answer}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Footer */}
              {searchResults.length > 0 && (
                <div className="border-t border-gray-200 px-5 py-3 text-center text-xs text-gray-400">
                  {searchResults.length} result
                  {searchResults.length !== 1 && "s"} found
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
