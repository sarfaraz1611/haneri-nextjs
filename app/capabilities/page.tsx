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
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
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
        }
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
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
      gsap.killTweensOf("*");
    };
  }, []);

  return (
    <div className="page w-full mt-20 space-y-12 px-4 sm:px-6 lg:px-10">
      {DATA.map((item, index) => {
        const isEven = index % 2 === 0;

        return (
          <section
            key={index}
            className="grid grid-cols-1 items-center gap-8 rounded-[14px] bg-white p-6
                       md:grid-cols-2 md:gap-14 md:p-10"
          >
            {/* IMAGE */}
            <div
              className={`cap-image relative overflow-hidden rounded-xl group
                          ${isEven ? "md:order-1" : "md:order-2"}`}
            >
              <img
                src={item.img}
                alt=""
                className="w-full h-[220px] object-cover transition-transform duration-700
                           sm:h-[260px] md:h-[320px] lg:h-[380px] xl:h-[420px]
                           group-hover:scale-110"
              />

              <div
                className="pointer-events-none absolute inset-0 rounded-xl
                           border-2 border-gray-200 transition-colors duration-300
                           group-hover:border-[#00473E]"
              />
            </div>

            {/* TEXT */}
            <div
              className={`cap-text gap-5
                          ${isEven ? "md:order-2" : "md:order-1"}`}
            >
              <h2
                className="font-['Barlow_Condensed'] font-light text-[#00473E]
                           text-[34px] leading-tight
                           sm:text-[40px]
                           lg:text-[48px]"
              >
                {item.title}
              </h2>

              <p
                className="mt-4 font-['Open_Sans'] text-black leading-relaxed
                           text-base sm:text-lg lg:text-xl"
              >
                {item.desc}
              </p>
            </div>
          </section>
        );
      })}
    </div>
  );
}

/* ---------- DATA ---------- */

const DATA = [
  {
    title: "Excellence in Manufacturing, R&D, and Innovation",
    desc: "At Haneri, we seamlessly integrate design, innovation, and precision manufacturing, ensuring every product exemplifies quality, functionality, and elegance.",
    img: "/images/capa_2.png",
  },
  {
    title: "Product-Specific R&D and Prototyping Facilities",
    desc: "Innovation is at the heart of Haneri. Our dedicated research and development teams focus on creating products that redefine everyday living.",
    img: "/images/capa_1.png",
  },
  {
    title: "Comprehensive Manufacturing Processes",
    desc: "Our robust manufacturing capabilities ensure end-to-end control, enabling consistent quality, quick turnarounds, and agile innovation.",
    img: "/images/capa_3.png",
  },
  {
    title: "Superior Surface Finishing Capabilities",
    desc: "Haneri’s advanced surface finishing ensures every product meets the highest standards of aesthetics and longevity.",
    img: "/images/capa_4.png",
  },
  {
    title: "Design & Tooling Expertise",
    desc: "Our in-house tool room and advanced CAD design capabilities empower us to innovate with precision.",
    img: "/images/capa_5.png",
  },
];
