"use client";
import { useEffect, useRef } from "react";
import "./../../../../components/VideoSlider.css";

export default function HeroSection() {
  const trackRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const slideCount = track.children.length;
    const slideWidth = 100;
    let currentIndex = 0;

    const autoSlide = () => {
      currentIndex = (currentIndex + 1) % slideCount;
      track.style.transform = `translateX(-${currentIndex * slideWidth}%)`;
    };

    const interval = setInterval(autoSlide, 5000);
    return () => clearInterval(interval);
  }, []);
  return (
    <section id="top" className="w-full scroll-mt-20">
      <div className="relative w-full bg-white">
        <div className="w-full   mx-auto     pt-2 sm:pt-8 pb-2 ">
          <h1 className="text-[24px] sm:text-[32px] lg:text-[42px] text-[#005d5a] font-heading leading-tight font-medium mb-2 sm:mb-3">
            Designing Tomorrow's Comfort
          </h1>
          <p className="text-[12px] sm:text-[14px] lg:text-[16px] text-black leading-[1.6] sm:leading-6 max-w-[350px] mb-2 sm:mb-6 font-['Open_Sans']">
            Thoughtful innovation, enduring quality, and timeless design -
            crafted to elevate everyday living.
          </p>
        </div>

        {/* <div className=" px-4 sm:px-8 lg:px-16 " ref={containerRef}> */}

        <div className="  " ref={containerRef}>
          <div className="track" ref={trackRef} id="videoTrack">
            <div className="video-slide">
              <div className="video-thumbnail" />
              <iframe
                src={`https://player.vimeo.com/video/1131575735?autoplay=1&muted=1&loop=1&playsinline=1&controls=0&title=0&byline=0&portrait=0&background=1&autopause=0`}
                allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
                frameBorder="0"
                referrerPolicy="strict-origin-when-cross-origin"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
