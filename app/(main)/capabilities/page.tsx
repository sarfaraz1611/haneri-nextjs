"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger only on client-side
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function CapabilitiesPage() {
  useEffect(() => {
    /* ---------- PAGE ENTER ---------- */
    gsap.fromTo(
      ".page",
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
    );

    /* ---------- TEXT ANIMATION ---------- */
    gsap.utils.toArray<HTMLElement>(".cap-text").forEach((el) => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 80%",
            once: true,
          },
        },
      );
    });

    /* ---------- IMAGE ANIMATION ---------- */
    gsap.utils.toArray<HTMLElement>(".cap-image").forEach((el) => {
      gsap.fromTo(
        el,
        { opacity: 0, scale: 0.92 },
        {
          opacity: 1,
          scale: 1,
          duration: 1.1,
          ease: "expo.out",
          scrollTrigger: {
            trigger: el,
            start: "top 80%",
            once: true,
          },
        },
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
      gsap.killTweensOf("*");
    };
  }, []);

  return (
    <div className="page w-full mt-20 space-y-12 px-4 sm:px-6 lg:px-10">
      {DATA.map((item, index) => (
        <section
          key={index}
          className="grid grid-cols-1  gap-8 rounded-[14px] bg-white p-6
                     lg:grid-cols-2 lg:gap-14 lg:p-10"
        >
          {/* TEXT */}
          <div className="cap-text flex flex-col gap-3 order-2 lg:order-1">
            <h2
              className="font-heading font-medium text-[#005d5a]
                         text-[34px] leading-tight
                         sm:text-[40px]
                        "
            >
              {item.title}
            </h2>

            <p
              className="font-['Open_Sans'] font-semibold text-[#c07a3a]
                         text-base sm:text-lg leading-snug"
            >
              {item.subtitle}
            </p>

            <p
              className="mt-1 font-['Open_Sans'] text-[#005d5a] leading-relaxed
                         text-sm sm:text-base"
            >
              {item.desc}
            </p>
          </div>

          {/* IMAGE */}
          <div className="cap-image relative overflow-hidden rounded-xl group order-1 lg:order-2">
            <img
              src={item.img}
              alt=""
              className="w-full h-[220px] object-cover transition-transform duration-700
                         sm:h-[260px] lg:h-[365px] 
                         group-hover:scale-110"
            />
            <div
              className="pointer-events-none absolute inset-0 rounded-xl
                         transition-colors duration-300
                        "
            />
          </div>
        </section>
      ))}
    </div>
  );
}

/* ---------- DATA ---------- */

const DATA = [
  {
    title: "Innovation Begins with Research",
    subtitle: "Advanced R&D that drives smarter cooling solutions",
    desc: "At Haneri, innovation starts with deep engineering insight. Our research and development teams continuously explore new technologies, materials, and design approaches to create products that enhance everyday comfort. Through rigorous testing, airflow analysis, and performance optimization, we ensure every product is engineered for efficiency, reliability, and long-term performance.",
    img: "/Mask(4).svg",
  },
  {
    title: "From Concept to Reality",
    subtitle: "Rapid prototyping that accelerates innovation",
    desc: "Our in-house design and prototyping capabilities allow ideas to move quickly from concept to functional models. By testing and refining prototypes early in the development process, we ensure that each design meets strict performance, usability, and aesthetic standards before entering production.",
    img: "/Mask(5).svg",
  },
  {
    title: "Precision Built at Scale",
    subtitle: "Comprehensive manufacturing with end-to-end control",
    desc: "Haneri’s integrated manufacturing infrastructure enables complete oversight of the production process — from component fabrication to final assembly. This end-to-end approach ensures consistent quality, operational efficiency, and the flexibility to innovate rapidly.",
    img: "/Mask(6).svg",
  },
  {
    title: "Finishing that Reflects Quality",
    subtitle: "Advanced surface finishing for durability and elegance",
    desc: "Every Haneri product undergoes advanced surface finishing processes designed to enhance both longevity and visual appeal. Our capabilities ensure durable coatings, refined textures, and finishes that meet the highest standards of quality and design.",
    img: "/Mask(8).svg",
  },
  {
    title: "Quality Engineered into Every Detail",
    subtitle: "Rigorous QA/QC systems that ensure reliability",
    desc: "Quality is embedded at every stage of the production process. Our comprehensive quality assurance and quality control systems include systematic inspections, performance testing, and strict compliance standards to ensure every product meets Haneri’s benchmarks for precision and durability.",
    img: "/Mask(7).svg",
  },
];
