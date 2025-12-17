"use client";

import { useEffect, useRef, useState } from "react";

interface BlowupShotVideoProps {
  onAnimationComplete?: () => void;
}

export default function BlowupShotVideo({ onAnimationComplete }: BlowupShotVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Set video to be controllable by scroll
    video.pause();

    const handleScroll = () => {
      if (!video || video.duration === 0) return;

      const scrollY = window.scrollY;
      // Map scroll position to video time (adjust multiplier as needed)
      const scrollFraction = Math.min((scrollY * 0.5) / 1000, 1);
      const targetTime = scrollFraction * video.duration;

      video.currentTime = targetTime;
    };

    const handleLoadedMetadata = () => {
      setIsLoaded(true);
      video.currentTime = 0;
    };

    video.addEventListener("loadedmetadata", handleLoadedMetadata);
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div ref={containerRef} className="relative w-full h-full">
      {/* Outer glow effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-brand/20 to-brand-light/30 rounded-full blur-3xl animate-pulse-slow" />

      {/* Video element */}
      <video
        ref={videoRef}
        className="relative w-full h-full object-contain drop-shadow-2xl"
        muted
        playsInline
        preload="auto"
      >
        <source src="/blowup_shot/blowup_shot.mp4" type="video/mp4" />
        <source src="/blowup_shot/blowup_shot.webm" type="video/webm" />
      </video>

      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-brand">Loading...</div>
        </div>
      )}
    </div>
  );
}
