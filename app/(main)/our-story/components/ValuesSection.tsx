"use client";

import { useState } from "react";

const values = [
  {
    title: "Human-Centric Design",
    description:
      "We focus on creating products that are intuitive, inclusive, and designed with real people in mind.",
  },
  {
    title: "Excellence in Quality",
    description:
      "We uphold the highest standards of craftsmanship, using durable materials for products that stand the test of time.",
  },
  {
    title: "Accessibility and Inclusivity",
    description:
      "We believe luxury should be attainable for everyone, creating products that suit diverse lifestyles, needs, and budgets.",
  },
  {
    title: "Responsiveness to Consumer Needs",
    description:
      "We listen and adapt to our customers' needs, ensuring a seamless experience from purchase through long-term use.",
  },
  {
    title: "Transparency and Integrity",
    description:
      "We operate with honesty and accountability, building trust through clear communication and ethical practices.",
  },
  {
    title: "Sustainability and Responsibility",
    description:
      "We are committed to minimizing our environmental impact, choosing sustainable materials and processes to create a positive impact for future generations.",
  },
];

export default function ValuesSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section
      id="values"
      className="relative w-full bg-white/80 backdrop-blur-sm lg:py-8 scroll-mt-20"
    >
      <div className="px-4 sm:px-8 lg:px-16  w-full mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start">
        {/* Left: text + accordion */}
        <div className="flex flex-col gap-4 order-2 lg:order-1">
          <h3 className="text-[40px] sm:text-[48px] font-heading text-[#005d5a] font-semibold leading-tight">
            Values
          </h3>
          <p className="text-[13px] font-['Open_Sans'] leading-[1.75] text-black mb-2">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type.
          </p>
          <div className="flex flex-col">
            {values.map((value, index) => (
              <div key={index} className="border-b border-gray-200">
                <button
                  className="w-full flex items-center justify-between py-3 text-left"
                  onClick={() =>
                    setOpenIndex(openIndex === index ? null : index)
                  }
                >
                  <span className="text-[13px] font-['Open_Sans'] text-[#005d5a]">
                    {value.title}
                  </span>
                  <span className="text-[#CA5D27] text-xs ml-4">▼</span>
                </button>
                {openIndex === index && (
                  <p className="text-[12px] font-['Open_Sans'] leading-[1.75] text-black pb-3">
                    {value.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Right: image */}
        <div className="rounded-[10px] overflow-hidden order-1 lg:order-2">
          <img
            src="images/section/Haneri_heart_Image.jpg"
            alt="Values"
            className="w-full h-[260px] xl:h-[400px] object-cover"
          />
        </div>
      </div>
    </section>
  );
}
