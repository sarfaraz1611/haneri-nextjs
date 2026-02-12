"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Decorative circles component with more visible elements
const DecorativeElements = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {/* Large animated gradient orbs */}
    <div className="absolute top-10 left-10 w-72 h-72 rounded-full bg-gradient-to-br from-[#315859]/20 to-[#315859]/5 blur-3xl animate-pulse" />
    <div className="absolute bottom-20 right-20 w-96 h-96 rounded-full bg-gradient-to-tl from-[#CA5D27]/15 to-yellow-400/10 blur-3xl" />
    <div className="absolute top-1/2 left-1/4 w-64 h-64 rounded-full bg-gradient-to-r from-orange-200/20 to-transparent blur-2xl" />

    {/* Decorative rings */}
    {/* <div className="absolute top-20 right-1/3 w-32 h-32 rounded-full border border-[#315859]/10 hidden lg:block" />
    <div className="absolute top-24 right-1/3 w-24 h-24 rounded-full border border-[#CA5D27]/15 hidden lg:block" /> */}

    {/* Floating geometric shapes */}
    <div className="absolute top-1/4 left-20 w-4 h-4 rotate-45 bg-[#CA5D27]/20 hidden lg:block" style={{ animation: 'floatSlow 6s ease-in-out infinite' }} />
    <div className="absolute top-1/3 left-32 w-3 h-3 rotate-45 bg-[#315859]/15 hidden lg:block" style={{ animation: 'floatSlow 8s ease-in-out infinite 1s' }} />
    <div className="absolute bottom-1/3 left-16 w-2 h-2 rounded-full bg-[#CA5D27]/30 hidden lg:block" style={{ animation: 'floatSlow 5s ease-in-out infinite 0.5s' }} />

    {/* Decorative lines */}
    <div className="absolute top-1/4 left-8 w-32 h-[2px] bg-gradient-to-r from-[#CA5D27]/30 via-[#CA5D27]/10 to-transparent hidden lg:block" />
    <div className="absolute top-[30%] left-8 w-20 h-[1px] bg-gradient-to-r from-[#315859]/20 to-transparent hidden lg:block" />
    <div className="absolute bottom-1/4 left-8 w-24 h-[1px] bg-gradient-to-r from-[#315859]/15 to-transparent hidden lg:block" />

    {/* Corner accents */}
    <div className="absolute top-0 left-0 w-40 h-40 border-l-2 border-t-2 border-[#315859]/10 rounded-tl-3xl hidden lg:block" />
    <div className="absolute bottom-0 right-0 w-40 h-40 border-r-2 border-b-2 border-[#CA5D27]/10 rounded-br-3xl hidden lg:block" />

    {/* Dot pattern cluster */}
    <div className="absolute bottom-40 left-20 hidden lg:flex flex-col gap-3">
      <div className="flex gap-3">
        <span className="w-1.5 h-1.5 rounded-full bg-[#315859]/20" />
        <span className="w-1.5 h-1.5 rounded-full bg-[#315859]/15" />
        <span className="w-1.5 h-1.5 rounded-full bg-[#315859]/10" />
      </div>
      <div className="flex gap-3">
        <span className="w-1.5 h-1.5 rounded-full bg-[#315859]/15" />
        <span className="w-1.5 h-1.5 rounded-full bg-[#315859]/10" />
      </div>
      <div className="flex gap-3">
        <span className="w-1.5 h-1.5 rounded-full bg-[#315859]/10" />
      </div>
    </div>

    <style jsx>{`
      @keyframes floatSlow {
        0%, 100% {
          transform: translateY(0) rotate(45deg);
          opacity: 0.5;
        }
        50% {
          transform: translateY(-15px) rotate(45deg);
          opacity: 1;
        }
      }
    `}</style>
  </div>
);

export default function BlowupShotClean() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef(0);
  const targetFrameRef = useRef(0);
  const rafRef = useRef<number>(0);
  const isScrollingRef = useRef(false);
  const scrollTimeoutRef = useRef<ReturnType<typeof setTimeout>>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [canvasReady, setCanvasReady] = useState(false);

  const frameCount = 250;

  // Lerp for smooth interpolation
  const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

  // Render current frame
  const render = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

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
  }, []);

  // Animation loop — only runs while scrolling
  const animate = useCallback(() => {
    const diff = Math.abs(currentFrameRef.current - targetFrameRef.current);

    currentFrameRef.current = lerp(
      currentFrameRef.current,
      targetFrameRef.current,
      0.15
    );
    render();

    // Keep looping until we've settled close enough to target
    if (diff > 0.1) {
      rafRef.current = requestAnimationFrame(animate);
    } else {
      // Snap to target and stop
      currentFrameRef.current = targetFrameRef.current;
      render();
      isScrollingRef.current = false;
    }
  }, [render]);

  // Kick off animation loop on scroll (if not already running)
  const startAnimating = useCallback(() => {
    if (!isScrollingRef.current) {
      isScrollingRef.current = true;
      rafRef.current = requestAnimationFrame(animate);
    }
  }, [animate]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    const sticky = stickyRef.current;
    if (!canvas || !container || !sticky) return;

    // ── 1. Defer canvas setup until after first paint (text paints first) ──
    // Use requestIdleCallback (or setTimeout fallback) so the browser finishes
    // painting text / LCP content before we touch the canvas or start loading images.
    const scheduleInit = typeof requestIdleCallback !== "undefined"
      ? requestIdleCallback
      : (cb: () => void) => setTimeout(cb, 1);

    scheduleInit(() => {
      setCanvasReady(true);

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      // Resize canvas — responsive sizing
      const resize = () => {
        const isMobile = window.innerWidth < 768;
        if (isMobile) {
          canvas.width = window.innerWidth * 0.9;
          canvas.height = window.innerHeight * 0.45;
        } else {
          canvas.width = window.innerWidth * 0.5;
          canvas.height = window.innerHeight * 0.7;
        }
        render();
      };

      resize();
      window.addEventListener("resize", resize);

      // ── 2 & 3. Lazy-load images with async decoding ──
      // Load first frame eagerly so we can show something quickly,
      // then load remaining frames in small batches during idle time.
      const loadImage = (i: number): Promise<void> => {
        return new Promise((resolve) => {
          const img = new Image();
          img.decoding = "async"; // ← defer heavy decode off main thread
          img.src = `/blowup_shot/webmp/${String(i + 1).padStart(4, "0")}.webp`;
          imagesRef.current[i] = img;

          img.onload = () => {
            // Use decode() to push bitmap decoding off the main thread
            if (img.decode) {
              img.decode().then(() => resolve()).catch(() => resolve());
            } else {
              resolve();
            }
          };
          img.onerror = () => resolve();
        });
      };

      // Load frame 0 first, then batch-load the rest during idle
      loadImage(0).then(() => {
        currentFrameRef.current = 0;
        targetFrameRef.current = 0;
        render();
        setIsLoaded(true);

        // Load remaining frames in small batches to avoid jank
        const BATCH_SIZE = 6;
        let nextIndex = 1;

        const loadNextBatch = () => {
          if (nextIndex >= frameCount) return;

          const batch: Promise<void>[] = [];
          for (let j = 0; j < BATCH_SIZE && nextIndex < frameCount; j++, nextIndex++) {
            batch.push(loadImage(nextIndex));
          }

          Promise.all(batch).then(() => {
            // Schedule next batch during idle time
            if (typeof requestIdleCallback !== "undefined") {
              requestIdleCallback(loadNextBatch);
            } else {
              setTimeout(loadNextBatch, 0);
            }
          });
        };

        // Kick off batch loading during idle
        if (typeof requestIdleCallback !== "undefined") {
          requestIdleCallback(loadNextBatch);
        } else {
          setTimeout(loadNextBatch, 0);
        }
      });

      // ── 4. Scroll handler — only updates target, RAF runs on demand ──
      const onScroll = () => {
        const rect = container.getBoundingClientRect();
        const scrollableDistance = container.offsetHeight - window.innerHeight;
        const scrolled = -rect.top;
        const progress = Math.max(0, Math.min(1, scrolled / scrollableDistance));
        targetFrameRef.current = progress * (frameCount - 1);

        startAnimating();
      };

      window.addEventListener("scroll", onScroll, { passive: true });
      requestAnimationFrame(onScroll);

      // Store cleanup references
      (canvas as any).__cleanup = () => {
        window.removeEventListener("resize", resize);
        window.removeEventListener("scroll", onScroll);
        cancelAnimationFrame(rafRef.current);
      };
    });

    return () => {
      (canvas as any).__cleanup?.();
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    };
  }, [render, startAnimating]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    ScrollTrigger.create({
      trigger: stickyRef.current,
      start: "top top",
      end: "+=300vh", // 300dvh scroll distance
      pin: true,
      scrub: true,
    });
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full bg-gradient-to-br from-white via-gray-50/50 to-orange-50/30"
    >

      <div
        ref={stickyRef}
        className="top-0 w-full py-4 flex flex-col-reverse md:flex-row-reverse items-center justify-center overflow-hidden"
      >
        <DecorativeElements />

        {/* Background decorative elements */}

        <div>        {/* Subtle radial gradient behind content */}
        {/* <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(202,93,39,0.03)_0%,_transparent_70%)]" /> */}

        {/* Canvas for frame animation - right on desktop, bottom on mobile */}
        <canvas
          ref={canvasRef}
          className={`transition-opacity duration-1000 ${isLoaded && canvasReady ? 'opacity-100' : 'opacity-0'}`}
        /></div>

        {/* Hero content overlay */}
        <div className="relative z-10 mt-34 mx-auto px-6 flex items-start h-full pt-8 md:pt-0">
          <div className="gap-12 items-center w-full">
            {/* Content */}
            <div className="space-y-4 md:space-y-4">
              {/* Enhanced badge with glow effect */}
              <div className="relative inline-block group">
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-orange-400/20 rounded-full blur-xl group-hover:blur-2xl transition-all duration-500 opacity-0 group-hover:opacity-100" />
                <div className="relative inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 border border-[#315859]/20 backdrop-blur-sm shadow-sm hover:shadow-md transition-all duration-300">
                  <svg
                    className="w-4 h-4 text-yellow-500 animate-pulse"
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
              </div>

              {/* Title with gradient underline accent */}
              <div className="relative">
                <h1 className="text-5xl text-[#315859] md:text-4xl lg:text-7xl font-bold leading-tight">
                  Elegance in
                  <span className="block text-[#CA5D27] relative">
                    Every Breeze
                    <span className="absolute -bottom-2 left-0 w-1/3 h-1 bg-gradient-to-r from-[#CA5D27] to-yellow-400 rounded-full hidden md:block" />
                  </span>
                </h1>
              </div>

              {/* Description with subtle left border accent */}
              <div className="relative pl-4 border-l-2 border-gradient-to-b from-[#315859]/30 to-transparent">
                <p className="text-sm md:text-md lg:text-lg text-gray-600 max-w-md leading-relaxed hidden md:block">
                  Experience the perfect harmony of cutting-edge technology and
                  timeless design. Our premium ceiling fans transform your space
                  with whisper-quiet performance.
                </p>
                <p className="text-sm text-gray-600 leading-relaxed md:hidden">
                  Premium ceiling fans with whisper-quiet performance.
                </p>
              </div>

              {/* Decorative dots pattern */}
              <div className="flex gap-2 pt-2">
                <span className="w-2 h-2 rounded-full bg-[#CA5D27]" />
                <span className="w-2 h-2 rounded-full bg-[#CA5D27]/60" />
                <span className="w-2 h-2 rounded-full bg-[#CA5D27]/30" />
              </div>
            </div>

            {/* Empty right column - fan animation fills the background */}
          </div>
        </div>

        {/* Enhanced scroll indicator with ring animation
        <div className="absolute bottom-4 md:bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10">
          <span className="text-xs text-gray-500 tracking-widest uppercase">
            Scroll to Explore
          </span>
          <div className="relative">
            <div className="absolute inset-0 rounded-full border-2 border-yellow-400/30 animate-ping" />
            <div className="relative p-2 rounded-full border border-gray-200 bg-white/50 backdrop-blur-sm animate-bounce">
              <svg
                className="w-5 h-5 text-[#CA5D27]"
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
        </div> */}
      </div>
    </div>
  );
}
