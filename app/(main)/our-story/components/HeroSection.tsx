"use client";

export default function HeroSection() {
  return (
    <section id="top" className="w-full scroll-mt-20">
      <div className="relative w-full bg-white">
        <div className="w-full px-4 sm:px-8 lg:px-16 pt-2 sm:pt-8 pb-2 max-w-6xl">
          <h1 className="text-[24px] sm:text-[32px] lg:text-[42px] text-[#005d5a] font-heading leading-tight font-medium mb-2 sm:mb-3">
            Designing Tomorrow's Comfort
          </h1>
          <p className="text-[13px] sm:text-[14px] text-black leading-[1.6] sm:leading-[1.75] max-w-[350px] mb-2 sm:mb-6 font-['Open_Sans']">
            Thoughtful innovation, enduring quality, and timeless design -
            crafted to elevate everyday living.
          </p>
        </div>
        <div className="w-full sm:pb-8">
          <iframe
            src="https://player.vimeo.com/video/1131575735?autoplay=1&muted=1&loop=1&autopause=0&background=1&playsinline=1&title=0&byline=0&portrait=0&badge=0&controls=0&dnt=1"
            frameBorder="0"
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
            className="w-full rounded-[5px] pointer-events-none"
            style={{ height: "clamp(180px, 56vw, 520px)", display: "block" }}
          ></iframe>
        </div>
      </div>
    </section>
  );
}
