"use client";

import { useEffect, useRef, useState } from "react";

interface BlowupShotProps {
  onAnimationComplete?: () => void;
}

export default function BlowupShot({ onAnimationComplete }: BlowupShotProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentFrame, setCurrentFrame] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;

    if (!canvas || !container) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    const frameCount = 250;
    const getFramePath = (index: number) =>
      `/blowup_shot/${(index + 1).toString().padStart(4, "0")}.png`;

    const images: HTMLImageElement[] = [];

    // Set canvas size to match container
    function resizeCanvas() {
      if (!canvas || !container) return;
      const rect = container.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
      render();
    }

    // Initial resize
    resizeCanvas();

    // Resize on window change
    window.addEventListener("resize", resizeCanvas);

    // Preload images
    for (let i = 0; i < frameCount; i++) {
      const img = new Image();
      img.src = getFramePath(i);
      images.push(img);
    }

    // Scroll-based frame calculation (like ScrollFan)
    const handleScroll = () => {
      const scrollY = window.scrollY;
      // Calculate frame based on scroll position (adjust multiplier for speed)
      const frame = Math.min(
        Math.floor((scrollY * 0.5) % frameCount),
        frameCount - 1
      );
      setCurrentFrame(frame);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    // Initial render
    images[0].onload = () => render();

    function render() {
      if (!context || !canvas || images.length === 0) return;
      const img = images[currentFrame];
      if (!img || !img.complete) return;

      context.clearRect(0, 0, canvas.width, canvas.height);

      // Calculate dimensions to fit image within canvas while maintaining aspect ratio
      const imgAspect = img.width / img.height;
      const canvasAspect = canvas.width / canvas.height;

      let drawWidth, drawHeight, offsetX, offsetY;

      if (imgAspect > canvasAspect) {
        // Image is wider than canvas
        drawHeight = canvas.height;
        drawWidth = drawHeight * imgAspect;
        offsetX = (canvas.width - drawWidth) / 2;
        offsetY = 0;
      } else {
        // Image is taller than canvas
        drawWidth = canvas.width;
        drawHeight = drawWidth / imgAspect;
        offsetX = 0;
        offsetY = (canvas.height - drawHeight) / 2;
      }

      context.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
    }

    // Re-render when frame changes
    render();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [currentFrame]);

  return (
    <div ref={containerRef} className="relative w-full h-full">
      {/* Outer glow effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-brand/20 to-brand-light/30 rounded-full blur-3xl animate-pulse-slow" />

      {/* Canvas for frame animation */}
      <canvas
        ref={canvasRef}
        className="relative w-full h-full object-contain drop-shadow-2xl"
      />

      {/* Decorative rings */}
      {/* <div className="absolute inset-0 rounded-full border border-brand/20 pointer-events-none" />
      <div className="absolute inset-4 rounded-full border border-primary-green/10 pointer-events-none" /> */}
    </div>
  );
}
