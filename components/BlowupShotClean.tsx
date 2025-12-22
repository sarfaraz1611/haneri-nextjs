"use client";

import { useEffect, useRef } from "react";

export default function BlowupShotClean() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef(0);
  const targetFrameRef = useRef(0);
  const rafRef = useRef<number>(0);

  const frameCount = 250;

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    const sticky = stickyRef.current;
    if (!canvas || !container || !sticky) return;

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

    // Resize canvas - sized for right half of screen
    const resize = () => {
      canvas.width = window.innerWidth * 0.5; // Half width
      canvas.height = window.innerHeight * 0.7; // 70% height
      render();
    };

    resize();
    window.addEventListener("resize", resize);

    // Load images
    for (let i = 0; i < frameCount; i++) {
      const img = new Image();
      img.src = `/blowup_shot/webmp/${String(i + 1).padStart(4, "0")}.webp`;
      imagesRef.current[i] = img;
      if (i === 0) {
        img.onload = () => {
          // Ensure frame 0 is rendered initially
          currentFrameRef.current = 0;
          targetFrameRef.current = 0;
          render();
        };
      }
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

    // Scroll handler - based on scroll position within the tall container
    const onScroll = () => {
      const rect = container.getBoundingClientRect();

      // Calculate how much we've scrolled through the container
      // The scrollable distance is container height minus viewport height
      const scrollableDistance = container.offsetHeight - window.innerHeight;

      // How far into the container we've scrolled (0 at top, scrollableDistance at bottom)
      const scrolled = -rect.top;

      // Progress from 0 to 1
      const progress = Math.max(0, Math.min(1, scrolled / scrollableDistance));
      targetFrameRef.current = progress * (frameCount - 1);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    animate();
    // Initial scroll check
    requestAnimationFrame(onScroll);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full"
      style={{ height: "300vh" }} // Tall container to allow scrolling through frames
    >
      <div
        ref={stickyRef}
        className="sticky top-0 w-full h-screen flex items-center justify-center"
      >
        {/* Canvas for frame animation - positioned on the right */}
        <canvas
          ref={canvasRef}
          className="absolute right-0 top-1/2 -translate-y-1/2"
          style={{ width: "50%", height: "70%" }}
        />

        {/* Hero content overlay */}
        <div className="relative z-10 container mx-auto px-6 flex items-center h-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center w-full">
            {/* Content */}
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#315859]/10 border border-[#315859]/20 backdrop-blur-sm">
                <svg
                  className="w-4 h-4 text-yellow-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                  />
                </svg>
                <span className="text-sm text-[#315859] font-medium">
                  Premium Collection 2026
                </span>
              </div>

              <h1 className="text-3xl text-[#315859] md:text-7xl font-bold leading-tight">
                Elegance in
                <span className="block text-[#CA5D27]">Every Breeze</span>
              </h1>

              <p className="text-lg text-gray-600 max-w-md leading-relaxed">
                Experience the perfect harmony of cutting-edge technology and
                timeless design. Our premium ceiling fans transform your space
                with whisper-quiet performance.
              </p>
            </div>

            {/* Empty right column - fan animation fills the background */}
            <div />
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce z-10">
          <span className="text-xs text-gray-500 tracking-widest uppercase">
            Scroll to Explore
          </span>
          <svg
            className="w-5 h-5 text-yellow-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
