"use client";

import { useEffect, useState } from "react";
import { gsap } from "gsap";


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
      <main className="flex flex-col items-center justify-center min-h-screen bg-white">
        <img
          src="/Haneri_Logo-.svg"
          alt="Ha"
          className="cs-logo h-16 md:h-24 w-auto mx-auto mb-10 opacity-0"
        />
        <h1 className="cs-title text-3xl font-heading tracking-widest text-gray-700 uppercase opacity-0">
          Coming Soon
        </h1>
      </main>
    </div>
  );
}
