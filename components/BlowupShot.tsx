"use client";

import { useEffect, useRef, useState } from "react";

interface BlowupShotProps {
  onAnimationComplete?: () => void;
}

export default function BlowupShot({ onAnimationComplete }: BlowupShotProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentFrame, setCurrentFrame] = useState(0);
  const [loadedCount, setLoadedCount] = useState(0);
  const [errorCount, setErrorCount] = useState(0);

  // Use refs to persist data across renders
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const loadedImagesRef = useRef<Set<number>>(new Set());
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  const hasScrolledRef = useRef(false);

  const frameCount = 250;
  const getFramePath = (index: number) =>
    `/blowup_shot/${(index + 1).toString().padStart(4, "0")}.png`;

  // Render function - uses refs to avoid stale closures
  const render = (frameIndex: number) => {
    const canvas = canvasRef.current;
    const context = contextRef.current;
    if (!context || !canvas) return;

    const img = imagesRef.current[frameIndex];
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
  };

  // Load image function
  const loadImage = (index: number) => {
    if (loadedImagesRef.current.has(index) || imagesRef.current[index]) return;

    const img = new Image();
    img.src = getFramePath(index);
    imagesRef.current[index] = img;
    loadedImagesRef.current.add(index);

    img.onload = () => {
      console.log(`Loaded frame ${index + 1}`);
      setLoadedCount(loadedImagesRef.current.size);
      // Render if this is the current frame
      render(index);
    };

    img.onerror = () => {
      console.error(`Failed to load frame ${index + 1}: ${img.src}`);
      setErrorCount((prev) => prev + 1);
    };
  };

  // Setup effect - runs ONCE
  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;

    if (!canvas || !container) return;

    const context = canvas.getContext("2d");
    if (!context) return;
    contextRef.current = context;

    // Set canvas size
    const resizeCanvas = () => {
      if (!canvas || !container) return;
      const rect = container.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
      render(currentFrame);
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Only preload first frame
    loadImage(0);

    // Scroll handler - viewport-based animation
    const handleScroll = () => {
      if (!container) return;

      // Mark that user has scrolled
      hasScrolledRef.current = true;

      const rect = container.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      // Calculate how much of the section is visible
      // When section enters from bottom: progress = 0
      // When section exits from top: progress = 1
      const scrollProgress = Math.max(
        0,
        Math.min(
          1,
          (viewportHeight - rect.top) / (viewportHeight + rect.height)
        )
      );

      // Map scroll progress to frame number
      const frame = Math.floor(scrollProgress * (frameCount - 1));
      setCurrentFrame(frame);

      // Load nearby frames
      loadImage(frame);
      loadImage(Math.min(frame + 1, frameCount - 1));
      loadImage(Math.min(frame + 2, frameCount - 1));
      loadImage(Math.min(frame + 3, frameCount - 1));
      loadImage(Math.max(frame - 1, 0));
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []); // Empty dependency array - runs ONCE

  // Separate effect to handle frame changes and rendering
  useEffect(() => {
    render(currentFrame);
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

      {/* Debug info - remove this after fixing */}
      {/* <div className="absolute top-4 right-4 bg-black/70 text-white px-3 py-2 rounded text-xs space-y-1 z-50">
        <div>Frame: {currentFrame + 1} / 250</div>
        <div>Loaded: {loadedCount}</div>
        {errorCount > 0 && (
          <div className="text-red-400">Errors: {errorCount}</div>
        )}
        <div className="text-gray-400 text-[10px]">Scroll to change frame</div>
      </div> */}
    </div>
  );
}
