"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

export default function BlowupShotSimple() {
  const [currentFrame, setCurrentFrame] = useState(0);
  const [imageError, setImageError] = useState<string | null>(null);
  const frameCount = 250;

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const frame = Math.min(
        Math.floor((scrollY * 0.5) % frameCount),
        frameCount - 1
      );
      setCurrentFrame(frame);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const imagePath = `/blowup_shot/${(currentFrame + 1).toString().padStart(4, "0")}.png`;

  return (
    <div className="relative w-full h-[600px] bg-black/5">
      {/* Debug info */}
      <div className="absolute top-4 left-4 z-10 bg-black/70 text-white p-2 rounded text-sm">
        Frame: {currentFrame + 1} / {frameCount}
        <br />
        Path: {imagePath}
        {imageError && <div className="text-red-400 mt-1">Error: {imageError}</div>}
      </div>

      {/* Simple img tag test */}
      <img
        src={imagePath}
        alt={`Frame ${currentFrame + 1}`}
        className="w-full h-full object-contain"
        onLoad={() => {
          console.log(`Loaded frame ${currentFrame + 1}`);
          setImageError(null);
        }}
        onError={(e) => {
          const error = `Failed to load: ${imagePath}`;
          console.error(error);
          setImageError(error);
        }}
      />
    </div>
  );
}
