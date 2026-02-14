"use client";
import Lenis from "lenis";

import { useEffect } from "react";

export default function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    const lenis = new Lenis({
      smoothWheel: true,
      wheelMultiplier: 1.5,
      touchMultiplier: 1.1,
      lerp: 0.04,
    });
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    if (document.visibilityState === "visible") {
      lenis?.start();
      lenis?.resize();
      lenis?.raf(performance.now());

      requestAnimationFrame(raf);
    } else {
      lenis.stop();
    }
    return () => {
      lenis.destroy();
    };
  }, []);

  return <div className="smooth-scroll-container">{children}</div>;
}
