"use client";

import { useEffect, useRef, useState } from "react";

interface BlowupShotVideoSmoothProps {
  onAnimationComplete?: () => void;
}

export default function BlowupShotVideoSmooth({
  onAnimationComplete,
}: BlowupShotVideoSmoothProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const targetTimeRef = useRef(0);
  const currentTimeRef = useRef(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    const container = containerRef.current;
    if (!video || !container) return;

    // Pause video - we'll control it manually
    video.pause();

    const handleLoadedMetadata = () => {
      setIsLoaded(true);
      video.currentTime = 0;
      currentTimeRef.current = 0;
    };

    // Smooth interpolation function (lerp)
    const lerp = (start: number, end: number, factor: number) => {
      return start + (end - start) * factor;
    };

    // Calculate target time based on scroll
    const updateTargetTime = () => {
      if (!video || !container || video.duration === 0) return;

      const rect = container.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      // Calculate scroll progress through the section
      // 0 = section just entering viewport from bottom
      // 1 = section just exiting viewport from top
      const scrollProgress = Math.max(
        0,
        Math.min(
          1,
          (viewportHeight - rect.top) / (viewportHeight + rect.height)
        )
      );

      // Map to video time
      targetTimeRef.current = scrollProgress * video.duration;
    };

    // Smooth animation loop
    const animate = () => {
      if (!video || !isFinite(video.duration) || video.duration === 0) return;

      // Smoothly interpolate current time towards target time
      // Lower factor = smoother but slower response (0.1-0.2 is ideal)
      const newTime = lerp(
        currentTimeRef.current,
        targetTimeRef.current,
        0.15
      );

      // Validate before updating
      if (isFinite(newTime) && newTime >= 0 && newTime <= video.duration) {
        currentTimeRef.current = newTime;
        video.currentTime = newTime;
      }

      // Continue animation loop
      rafRef.current = requestAnimationFrame(animate);
    };

    // Handle scroll events
    const handleScroll = () => {
      updateTargetTime();
    };

    // Initialize
    video.addEventListener("loadedmetadata", handleLoadedMetadata);
    window.addEventListener("scroll", handleScroll, { passive: true });

    // Start animation loop only after video is ready
    if (video.readyState >= 1) {
      updateTargetTime();
      animate();
    } else {
      const startAnimation = () => {
        updateTargetTime();
        animate();
        video.removeEventListener("loadedmetadata", startAnimation);
      };
      video.addEventListener("loadedmetadata", startAnimation);
    }

    return () => {
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);
      window.removeEventListener("scroll", handleScroll);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
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

      {/* Loading indicator */}
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex flex-col items-center gap-3">
            <div className="w-12 h-12 border-4 border-brand/30 border-t-brand rounded-full animate-spin" />
            <div className="text-brand text-sm font-medium">Loading...</div>
          </div>
        </div>
      )}
    </div>
  );
}
