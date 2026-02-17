"use client";

import { useState, useRef } from "react";
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
  ...Array.from(new Set(faqs.map((faq) => faq.category))),
];

export default function FAQs() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState("About Haneri");
  const [searchQuery, setSearchQuery] = useState("");

  const searchResults = searchQuery.trim()
    ? faqs.filter(
        (faq) =>
          faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
          faq.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
          faq.category.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    : [];

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
    <div className="bg-white mt-20 min-h-screen xl:min-h-[50%]">
      {/* Hero Section */}
      <section
        className="relative bg-cover bg-center bg-no-repeat py-24 sm:py-32 lg:py-40"
        style={{ backgroundImage: "url('/images/faq_top_img.png')" }}
      >
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 mx-auto max-w-4xl px-6 text-center text-white">
          <h2 className="text-2xl font-semibold leading-tight sm:text-4xl lg:text-5xl">
            Everything you wanted to know
            <br />
            about the art of air
          </h2>
          <p className="mt-4 text-sm sm:text-base text-white/80">
            From technology to trust, innovation to installation — explore how
            Haneri redefines comfort, craftsmanship, and performance.
          </p>

          <div className="relative mx-auto mt-8 max-w-lg">
            <div className="flex items-center overflow-hidden rounded-full bg-white shadow-lg">
              <input
                type="text"
                placeholder="Type your question here..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 bg-transparent px-5 py-3 text-sm text-gray-900 placeholder:text-gray-400 outline-none"
              />
              <div className="flex items-center justify-center px-4 py-3 text-gray-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
              </div>
            </div>

            {searchQuery.trim() && (
              <div
                className="absolute left-0 right-0 top-full mt-2 max-h-80 overflow-y-auto rounded-2xl bg-white shadow-2xl"
                style={{ scrollbarWidth: "thin" }}
              >
                {searchResults.length === 0 ? (
                  <div className="px-5 py-6 text-center text-sm text-gray-400">
                    No results found for &ldquo;{searchQuery}&rdquo;
                  </div>
                ) : (
                  <div className="divide-y divide-gray-100">
                    {searchResults.map((faq, index) => (
                      <div
                        key={index}
                        className="px-5 py-4 transition-colors hover:bg-gray-50 cursor-pointer"
                        onClick={() => {
                          setActiveCategory(faq.category);
                          setSearchQuery("");
                          const faqIndex = faqs.indexOf(faq);
                          setOpenIndex(faqIndex);
                        }}
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
                <div className="border-t border-gray-200 px-5 py-2 text-center text-xs text-gray-400">
                  {searchResults.length} result
                  {searchResults.length !== 1 && "s"} found
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
      <div className="mx-auto max-w-[90%] px-6 py-8 sm:py-16 lg:px-8 lg:py-10 min-h-[70vh] ">
        <div className="mx-auto">
          <h2 className="journal-title heading1">
            Categories you would love to discover
          </h2>

          {/* Scrollable Category Section */}
          <div className="mt-6 flex items-center gap-2">
            <div className="">
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
                        ? "bg-[#00473E] text-white shadow-md"
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
                        className={`size-6 text-[#00473E] transition-transform duration-300 ${
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
    </div>
  );
}
