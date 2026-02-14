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
  const [skipPreloader, setSkipPreloader] = useState(false);

  useEffect(() => {
    // If preloader was already shown this session, skip it
    if (sessionStorage.getItem("preloaderShown")) {
      setSkipPreloader(true);
      setIsLoaded(true);
      return;
    }

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
    if (skipPreloader) return;
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
  }, [isLoaded, skipPreloader]);

  return (
    <div className=" ">
      {!skipPreloader && <Preloader />}
      <main className="main" style={{ opacity: skipPreloader ? 1 : 0 }}>
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

        <Fancraft />
        <div className="container mt-8">
          {/* <SteelFanSlider /> */}

          <BlogsSection />
        </div>
      </main>
    </div>
  );
}
