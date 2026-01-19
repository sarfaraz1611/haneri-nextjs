"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface FAQ {
  question: string;
  answer: string;
}

const faqs: FAQ[] = [
  // About Haneri
  {
    question: "What is Haneri?",
    answer:
      "Haneri is a premium appliance brand built by a team with 75+ years of combined experience in consumer durables and innovation, focusing on performance and user-centric design.",
  },
  {
    question: "Why trust a new brand like Haneri?",
    answer:
      "The founding team has deep expertise in product creation and manufacturing, with every product engineered to high standards and supported by reliable after-sales service.",
  },
  {
    question: "How does Haneri compare to established brands?",
    answer:
      "Haneri combines veteran expertise with fresh design perspectives, aiming to match or exceed performance benchmarks while addressing evolving consumer needs.",
  },
  // Personalisation & Design
  {
    question: "What is Haneri BeSpoke™?",
    answer:
      "Haneri BeSpoke™ lets you personalise select fan models with your choice of colours, patterns, finishes—and on select models, even materials, built in smaller lots with a nominal premium.",
  },
  {
    question: "What is Air Curve Design™?",
    answer:
      "Air Curve Design™ uses advanced computational modelling to craft blade profiles that maximise airflow and efficiency for superior aerodynamics.",
  },
  // Core Technologies
  {
    question: "What is Silent H.A.S.S.™ Technology?",
    answer:
      "Silent H.A.S.S.™ integrates two Haneri pillars—Air Curve Design™ blades + TurboSilent BLDC™ motor, delivering exceptional air at reduced RPM with quiet operation.",
  },
  {
    question: "What is TurboSilent BLDC™?",
    answer:
      "A high-torque, energy-efficient BLDC motor platform engineered for strong air delivery, stable speed control, and ultra-quiet performance.",
  },
  {
    question: "What is More Air Slow Speed Technology™?",
    answer:
      "This innovation delivers excellent airflow at lower speeds, enabling comfort while saving energy.",
  },
  {
    question: "What is LumiAmbience™?",
    answer:
      "Selectable ambient lighting on supported models to set a cozy or vibrant mood. Adjustable via the fan's remote.",
  },
  // Products & Performance
  {
    question: "What types of fans do you offer?",
    answer:
      "A wide range including ceiling, pedestal, wall-mounted, table, exhaust, and designer fans.",
  },
  {
    question: "Are Haneri fans suitable for large rooms?",
    answer:
      "Yes, high-performance models are engineered for superior air delivery across larger spaces.",
  },
  {
    question: "Are Haneri fans energy-efficient?",
    answer:
      "Yes, most models use BLDC platform technology for strong airflow with minimal power consumption.",
  },
  {
    question: "Do Haneri fans run quietly?",
    answer:
      "Yes, featuring TurboSilent BLDC™ motors and Silent H.A.S.S.™ integration for low sound levels.",
  },
  {
    question: "Do Haneri fans have remote control?",
    answer:
      "Many models include remote control for speed, modes, and available lighting features.",
  },
  // Quality, Compliance & Manufacturing
  {
    question: "Where are Haneri fans manufactured?",
    answer:
      "Designed and manufactured in-house and comply with BIS and BEE norms; proudly Made in India.",
  },
  {
    question: "How do you ensure durability and quality?",
    answer:
      "Through premium materials, advanced engineering, and multi-stage QC testing aligned to international standards.",
  },
  {
    question: "Are Haneri fans certified?",
    answer:
      "Yes, products meet or exceed safety, energy-efficiency, and performance certifications.",
  },
  // Ownership, Service & Warranty
  {
    question: "Do Haneri fans come with a warranty?",
    answer:
      "Yes, all fans include standard warranty (terms vary by model; see product manual).",
  },
  {
    question: "How do I register my warranty?",
    answer:
      "Register on the website with purchase details and serial number.",
  },
  {
    question: "Is after-sales service available?",
    answer:
      "Yes, comprehensive service through authorised centres nationwide.",
  },
  {
    question: "Can I install the fan myself?",
    answer:
      "Some models are DIY-friendly; professional installation recommended for optimal performance.",
  },
  {
    question: "How do I clean and maintain my fan?",
    answer:
      "Wipe blades and housing with soft, damp cloth; consult product manual for detailed care.",
  },
  {
    question: "Are replacement parts available?",
    answer:
      "Yes, contact customer service or visit authorised service centres for genuine parts.",
  },
  {
    question: "What if my fan isn't working?",
    answer:
      "Check the troubleshooting section in your manual; contact support if issues persist.",
  },
  // Buying, Shipping & Returns
  {
    question: "Where can I buy Haneri fans?",
    answer:
      "Official website, select e-commerce platforms, and leading retail stores.",
  },
  {
    question: "Do you offer free shipping?",
    answer:
      "Free shipping available on select products and locations per Shipping Policy.",
  },
  {
    question: "What's your return/replacement policy?",
    answer:
      "Hassle-free returns/replacements for eligible defective or damaged products per Return Policy.",
  },
  // Support
  {
    question: "How do I contact Haneri?",
    answer:
      "Via customer care number, email, or contact form on the website.",
  },
  {
    question: "How does Haneri engage with customers?",
    answer:
      "Through clear communication about features, warranties, and policies across website, social channels, and support lines.",
  },
];

export default function FAQs() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-[90%] px-6 py-8 sm:py-24 lg:px-8 lg:py-24">
        <div className="mx-auto">
          <motion.h2
            className="text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            Frequently asked questions
          </motion.h2>
          <dl className="mt-16 divide-y divide-gray-900/10">
            {faqs.map((faq, index) => (
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
    </div>
  );
}
