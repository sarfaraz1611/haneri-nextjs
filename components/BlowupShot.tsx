"use client";

import { useEffect, useRef } from "react";

interface BlowupShotProps {
  onAnimationComplete?: () => void;
}

export default function BlowupShot({ onAnimationComplete }: BlowupShotProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const imagesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef(0);
  const rafRef = useRef<number | null>(null);

  const frameCount = 250;

  const getFramePath = (index: number) =>
    `/blowup_shot/${(index + 1).toString().padStart(4, "0")}.webp`; // 🔥 use WebP

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    // Resize canvas
    const resizeCanvas = () => {
      const rect = container.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
      render();
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Load ONLY first few images initially
    const preloadInitialFrames = () => {
      for (let i = 0; i < 20; i++) {
        loadImage(i);
      }
    };

    const loadImage = (index: number) => {
      if (imagesRef.current[index]) return;

      const img = new Image();
      img.src = getFramePath(index);
      imagesRef.current[index] = img;
    };

    preloadInitialFrames();

    const render = () => {
      const frame = currentFrameRef.current;
      const img = imagesRef.current[frame];
      if (!img || !img.complete) return;

    context.clearRect(0, 0, canvas.width, canvas.height);

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

    const onScroll = () => {
      if (rafRef.current) return;

      rafRef.current = requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        const frame = Math.min(
          Math.floor((scrollY * 0.5) % frameCount),
          frameCount - 1
        );

        currentFrameRef.current = frame;

        // Preload nearby frames
        for (let i = frame; i < frame + 10; i++) {
          if (i < frameCount) loadImage(i);
        }

        render();
        rafRef.current = null;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("scroll", onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    }
  }, []);

  return (
    <div ref={containerRef} className="relative w-full h-full">
      <div className="absolute inset-0 bg-gradient-to-r from-brand/20 to-brand-light/30 rounded-full blur-3xl" />
      <canvas
        ref={canvasRef}
        className="relative w-full h-full object-contain"
      />
    </div>
  );
}
