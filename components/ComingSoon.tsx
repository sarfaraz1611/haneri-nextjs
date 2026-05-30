"use client";

import { useEffect } from "react";
import { gsap } from "gsap";

export default function ComingSoon() {
  useEffect(() => {
    gsap.fromTo(
      ".cs-logo",
      { opacity: 0, y: -30 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
    );
    gsap.fromTo(
      ".cs-title",
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power2.out", delay: 0.5 },
    );

    gsap.to(".cs-logo", {
      y: -10,
      duration: 2,
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1,
      delay: 0.8,
    });

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
    <main className="flex flex-col items-center justify-center min-h-screen bg-white">
      <img
        src="/Haneri_Logo-.svg"
        alt="Haneri"
        className="cs-logo h-16 md:h-24 w-auto mx-auto mb-10 opacity-0"
      />
      <h1 className="cs-title text-3xl font-heading tracking-widest text-gray-700 uppercase opacity-0">
        Coming Soon
      </h1>
    </main>
  );
}
