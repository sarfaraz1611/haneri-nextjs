"use client";

import { useEffect, useState } from "react";
import { gsap } from "gsap";
import BlowupShot from "@/components/BlowupShot";
import FeaturedProducts from "@/components/FeaturedProducts";
import FeaturedProductsMobile from "@/components/FeaturedProductsMobile";
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
      gsap.fromTo(".main", { opacity: 0 }, { opacity: 1, duration: 1, ease: "power2.out" });
    }
  }, [isLoaded, skipPreloader]);

  useEffect(() => {
    // Entrance animations
    gsap.fromTo(".cs-logo", { opacity: 0, y: -30 }, { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" });
    gsap.fromTo(".cs-title", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, ease: "power2.out", delay: 0.5 });

    // Continuous float on logo
    gsap.to(".cs-logo", {
      y: -10,
      duration: 2,
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1,
      delay: 0.8,
    });

    // Pulsing opacity on title
    gsap.to(".cs-title", {
      opacity: 0.5,
      duration: 1.5,
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1,
      delay: 1.3,
    });
  }, []);

  return (
    <div className=" ">
      {/* COMING SOON */}
      {/* <main className="flex flex-col items-center justify-center min-h-screen bg-white">
        <img
          src="/images/Haneri Logo.png"
          alt="Ha"
          className="cs-logo h-16 md:h-24 w-auto mx-auto mb-10 opacity-0"
        />
        <h1 className="cs-title text-3xl font-heading tracking-widest text-gray-700 uppercase opacity-0">
          Coming Soon
        </h1>
      </main> */}

      {!skipPreloader && <Preloader />}
      <main className="main" style={{ opacity: skipPreloader ? 1 : 0 }}>
        <HeroSection />
        <div className="">
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
