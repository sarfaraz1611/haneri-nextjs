"use client";

import { useEffect, useState } from "react";
import { gsap } from "gsap";
import BlowupShot from "@/components/BlowupShot";
import FeaturedProducts from "@/components/FeaturedProducts";
import InnovationsSection from "@/components/InnovationsSection";
import ServicesSlider from "@/components/ServicesSlider";
import SteelFanSlider from "@/components/SteelFanSlider";
import WhyChoose from "@/components/WhyChoose";
import Fancraft from "@/components/Fancraft";
import BlogsSection from "@/components/BlogsSection";
import Preloader from "@/components/Preloader";
// import HeroSlider from "@/components/HeroSlider";
import HeroSection from "@/components/HeroSection";
// import HeroSlider from "@/components/HeroSlider";
import VideoSlider from "@/components/VideoSlider";

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Check if page is fully loaded
    if (document.readyState === "complete") {
      setTimeout(() => setIsLoaded(true), 1500);
    } else {
      window.addEventListener("load", () => {
        setTimeout(() => setIsLoaded(true), 1500);
      });
    }
  }, []);

  useEffect(() => {
    if (isLoaded) {
      // Animate content in after preloader
      gsap.fromTo(
        ".main",
        {
          opacity: 0,
        },
        {
          opacity: 1,
          duration: 1,
          ease: "power2.out",
        },
      );
    }
  }, [isLoaded]);

  return (
    <div className=" ">
      <Preloader />
      <main className="main" style={{ opacity: 0 }}>
        {/* <HeroSlider /> */}
        {/* <BlowupShot /> */}
        <HeroSection />
        <div className="overflow-x-hidden">
          <FeaturedProducts />
        </div>

        {/* video Section */}
        <VideoSlider />

        <WhyChoose />
        <div className="container mt-8">
          <InnovationsSection />
        </div>

        {/* <div className=" ">
          <ServicesSlider />
        </div> */}

        <div className="container mt-8">
          {/* <SteelFanSlider /> */}

          <Fancraft />

          <BlogsSection />
        </div>
      </main>
    </div>
  );
}
