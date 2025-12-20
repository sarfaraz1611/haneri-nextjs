"use client";

import { useEffect, useRef, useState } from "react";

interface BlowupShotUltraSmoothProps {
  onAnimationComplete?: () => void;
}

export default function BlowupShotUltraSmooth({
  onAnimationComplete,
}: BlowupShotUltraSmoothProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const targetFrameRef = useRef(0);
  const currentFrameRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const [loadProgress, setLoadProgress] = useState(0);
  const [isReady, setIsReady] = useState(false);

  const frameCount = 250;

  // Try webp first, fallback to png
  const getFramePath = (index: number) => {
    const frameNum = (index + 1).toString().padStart(4, "0");
    return `/blowup_shot/${frameNum}.webp`;
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const context = canvas.getContext("2d", { alpha: true });
    if (!context) return;

    // Smooth interpolation function
    const lerp = (start: number, end: number, factor: number) => {
      return start + (end - start) * factor;
    };

    // Render function
    const render = () => {
      if (!context || !canvas) return;

      const frameIndex = Math.floor(currentFrameRef.current);
      const img = imagesRef.current[frameIndex];

      if (!img || !img.complete) return;

      context.clearRect(0, 0, canvas.width, canvas.height);

      // Calculate dimensions to fit image
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
    };

    // Resize canvas to match container
    const resizeCanvas = () => {
      if (!canvas || !container) return;
      const rect = container.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
      render();
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Load images progressively
    let loadedCount = 0;
    const totalToPreload = 30; // Preload first 30 frames for instant start

    const loadImage = (index: number) => {
      if (imagesRef.current[index]) return;

      const img = new Image();
      img.src = getFramePath(index);
      imagesRef.current[index] = img;

      img.onload = () => {
        loadedCount++;
        setLoadProgress(Math.round((loadedCount / totalToPreload) * 100));

        if (loadedCount === totalToPreload) {
          setIsReady(true);
        }

        // If this is current frame, render it
        if (Math.floor(currentFrameRef.current) === index) {
          render();
        }
      };

      img.onerror = () => {
        // Fallback to PNG if webp fails
        img.src = `/blowup_shot/${(index + 1).toString().padStart(4, "0")}.png`;
      };
    };

    // Preload initial frames
    for (let i = 0; i < totalToPreload; i++) {
      loadImage(i);
    }

    // Lazy load rest in background
    const lazyLoadRest = () => {
      for (let i = totalToPreload; i < frameCount; i++) {
        setTimeout(() => loadImage(i), (i - totalToPreload) * 20);
      }
    };
    setTimeout(lazyLoadRest, 500);

    // Smooth animation loop
    const animate = () => {
      // Smoothly interpolate towards target frame
      currentFrameRef.current = lerp(
        currentFrameRef.current,
        targetFrameRef.current,
        0.15 // Lower = smoother, Higher = more responsive
      );

      render();
      rafRef.current = requestAnimationFrame(animate);
    };

    // Calculate target frame based on scroll
    const updateTargetFrame = () => {
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      // Calculate scroll progress through the section
      const scrollProgress = Math.max(
        0,
        Math.min(
          1,
          (viewportHeight - rect.top) / (viewportHeight + rect.height)
        )
      );

      // Map to frame
      targetFrameRef.current = scrollProgress * (frameCount - 1);

      // Preload nearby frames
      const currentIndex = Math.floor(targetFrameRef.current);
      for (let i = Math.max(0, currentIndex - 3); i <= Math.min(frameCount - 1, currentIndex + 10); i++) {
        loadImage(i);
      }
    };

    // Handle scroll
    const handleScroll = () => {
      updateTargetFrame();
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    // Start animation loop
    updateTargetFrame();
    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
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

      {/* Canvas for frame animation */}
      <canvas
        ref={canvasRef}
        className={`relative w-full h-full object-contain drop-shadow-2xl transition-opacity duration-500 ${
          isReady ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Loading indicator */}
      {!isReady && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex flex-col items-center gap-3">
            <div className="w-16 h-16 border-4 border-brand/20 border-t-brand rounded-full animate-spin" />
            <div className="text-brand text-sm font-medium">
              Loading {loadProgress}%
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
