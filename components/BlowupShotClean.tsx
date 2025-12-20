"use client";

import { useEffect, useRef } from "react";

export default function BlowupShotClean() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef(0);
  const targetFrameRef = useRef(0);
  const rafRef = useRef<number>(0);

  const frameCount = 250;

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Lerp for smooth interpolation
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    // Render current frame
    const render = () => {
      const frame = Math.floor(currentFrameRef.current);
      const img = imagesRef.current[frame];
      if (!img?.complete) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const scale = Math.min(
        canvas.width / img.width,
        canvas.height / img.height
      );
      const x = (canvas.width - img.width * scale) / 2;
      const y = (canvas.height - img.height * scale) / 2;
      ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
    };

    // Resize canvas
    const resize = () => {
      const rect = container.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
      render();
    };

    resize();
    window.addEventListener("resize", resize);

    // Load images
    for (let i = 0; i < frameCount; i++) {
      const img = new Image();
      img.src = `/blowup_shot/webmp/${String(i + 1).padStart(4, "0")}.webp`;
      imagesRef.current[i] = img;
      if (i === 0) img.onload = render;
    }

    // Animation loop
    const animate = () => {
      currentFrameRef.current = lerp(
        currentFrameRef.current,
        targetFrameRef.current,
        0.15
      );
      render();
      rafRef.current = requestAnimationFrame(animate);
    };

    // Scroll handler
    const onScroll = () => {
      const rect = container.getBoundingClientRect();
      const progress = Math.max(
        0,
        Math.min(
          1,
          (window.innerHeight - rect.top) / (window.innerHeight + rect.height)
        )
      );
      targetFrameRef.current = progress * (frameCount - 1);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    animate();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div ref={containerRef} className="relative w-full h-full">
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  );
}
