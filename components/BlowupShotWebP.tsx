"use client";

import { useEffect, useRef, useState } from "react";

interface BlowupShotWebPProps {
  onAnimationComplete?: () => void;
}

export default function BlowupShotWebP({ onAnimationComplete }: BlowupShotWebPProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentFrame, setCurrentFrame] = useState(0);
  const [loadProgress, setLoadProgress] = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;

    if (!canvas || !container) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    const frameCount = 250;
    // Use WebP instead of PNG (60-90% smaller!)
    const getFramePath = (index: number) =>
      `/blowup_shot_compressed/${(index + 1).toString().padStart(4, "0")}.webp`;

    const images: HTMLImageElement[] = [];
    const loadedImages = new Set<number>();

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

    // Lazy load images - only load what's needed
    function loadImage(index: number) {
      if (loadedImages.has(index) || images[index]) return;
      if (!canvas) return;

      const img = new Image();
      img.src = getFramePath(index);
      images[index] = img;
      loadedImages.add(index);

      img.onload = () => {
        if (currentFrame === index) render();
        // Update load progress
        setLoadProgress(Math.round((loadedImages.size / frameCount) * 100));
      };
    }

    // Preload first few frames for instant start
    for (let i = 0; i < Math.min(3, frameCount); i++) {
      loadImage(i);
    }

    // Smart prefetch: Load frames in chunks
    let prefetchIndex = 3;
    const prefetchInterval = setInterval(() => {
      if (prefetchIndex < frameCount) {
        // Load 3 frames at a time for faster initial loading
        loadImage(prefetchIndex);
        loadImage(Math.min(prefetchIndex + 1, frameCount - 1));
        loadImage(Math.min(prefetchIndex + 2, frameCount - 1));
        prefetchIndex += 3;
      } else {
        clearInterval(prefetchInterval);
      }
    }, 50); // Load 3 frames every 50ms

    // Scroll-based frame calculation
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const frame = Math.min(
        Math.floor((scrollY * 0.5) % frameCount),
        frameCount - 1
      );
      setCurrentFrame(frame);

      // Aggressively load nearby frames
      for (let i = -2; i <= 5; i++) {
        const nearFrame = Math.max(0, Math.min(frame + i, frameCount - 1));
        loadImage(nearFrame);
      }
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
        drawHeight = canvas.height;
        drawWidth = drawHeight * imgAspect;
        offsetX = (canvas.width - drawWidth) / 2;
        offsetY = 0;
      } else {
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
      clearInterval(prefetchInterval);
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

      {/* Loading progress indicator */}
      {loadProgress < 100 && (
        <div className="absolute bottom-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
          Loading: {loadProgress}%
        </div>
      )}
    </div>
  );
}
