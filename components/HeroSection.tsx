"use client";

import BlowupShotClean from "./BlowupShotClean";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#1a3d3e] via-[#0f1419] via-[#1a1410] to-[#2d1810]">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="container mx-auto px-6 min-h-screen flex items-center">
        <div className="grid lg:grid-cols-2 gap-12 items-center w-full pt-24">
          {/* Content */}
          <div className="space-y-8 z-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20">
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
              <span className="text-sm text-gray-400 font-medium">
                Premium Collection 2026
              </span>
            </div>

            <h1 className="text-3xl text-[#315859] md:text-7xl font-bold leading-tight">
              Elegance in
              <span className="block text-[#CA5D27] bg-clip-text ">
                Every Breeze
              </span>
            </h1>

            <p className="text-lg text-gray-400 max-w-md leading-relaxed">
              Experience the perfect harmony of cutting-edge technology and
              timeless design. Our premium ceiling fans transform your space
              with whisper-quiet performance.
            </p>
          </div>

          {/* Fan Animation */}
          <div className="relative h-[400px] md:h-[600px] flex items-center justify-center">
            <BlowupShotClean />
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
        <span className="text-xs text-gray-400 tracking-widest uppercase">
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
    </section>
  );
};

export default HeroSection;
