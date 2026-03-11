"use client";

import { useEffect, useState } from "react";
import { gsap } from "gsap";
import FeaturedProductsMobile from "@/components/FeaturedProductsMobile";
import InnovationsSection from "@/components/InnovationsSection";
import WhyChoose from "@/components/WhyChoose";
import Fancraft from "@/components/Fancraft";
import BlogsSection from "@/components/BlogsSection";
import Preloader from "@/components/Preloader";
import HeroSection from "@/components/HeroSection";
import VideoSlider from "@/components/VideoSlider";

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [skipPreloader, setSkipPreloader] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("preloaderShown")) {
      setSkipPreloader(true);
      setIsLoaded(true);
      return;
    }

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
      gsap.fromTo(
        ".main",
        { opacity: 0 },
        { opacity: 1, duration: 1, ease: "power2.out" },
      );
    }
  }, [isLoaded, skipPreloader]);

  return (
    <div>
      {!skipPreloader && <Preloader />}
      <main className="main" style={{ opacity: skipPreloader ? 1 : 0 }}>
        <HeroSection />
        <div className="2xl:container mx-auto">
          <FeaturedProductsMobile />
        </div>
        <VideoSlider />
        <WhyChoose />
        <div className="container mt-8">
          <InnovationsSection />
        </div>
        <Fancraft />
        <div className="container mt-8">
          <BlogsSection />
        </div>
      </main>
    </div>
  );
}
