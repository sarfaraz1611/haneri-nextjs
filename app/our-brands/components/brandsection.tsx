"use client";

import Image from "next/image";
import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger only on client-side
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface Props {
  title: string;
  description: string;
  image: string;
  reverse?: boolean;
}


export function BrandSection({
  title,
  description,
  image,
  reverse,
}: Props) {
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!imageRef.current) return;

    gsap.fromTo(
      imageRef.current,
      { y: 80 },
      {
        y: -40,
        ease: "none",
        scrollTrigger: {
          trigger: imageRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      }
    );
  }, []);

  return (
    <section className="w-full py-[50px]">
      <div
        className={`mx-auto flex max-w-[1200px] items-center 
        ${reverse ? "flex-row-reverse" : ""}`}
      >
        {/* TEXT */}
        <motion.div
          initial={{ opacity: 0, y: 48 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="flex-1"
        >
          <p className="text-[16px] leading-[1.8] text-[#2b2b2b] md:text-justify">
            <span className="font-semibold text-[#00473E]">{title} </span>
            {description}
          </p>
        </motion.div>

        {/* IMAGE */}
        <motion.div
          ref={imageRef}
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="flex flex-1 justify-center md:max-w-[30%]"
        >
          <Image
            src={image}
            alt={title}
            width={680}
            height={440}
            className="w-full h-auto object-cover"
            priority
          />
        </motion.div>
      </div>
    </section>
  );
}
