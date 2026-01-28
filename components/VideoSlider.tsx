"use client";

import { useEffect, useRef } from "react";
import "./VideoSlider.css";

export default function VideoSlider() {
  const trackRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const slides = track.children.length;
    const slideWidth = 100; // percentage per slide
    let currentIndex = 0;

    const autoSlide = () => {
      currentIndex = (currentIndex + 1) % slides;
      track.style.transform = `translateX(-${currentIndex * slideWidth}%)`;
    };

    const interval = setInterval(autoSlide, 5000); // Change slide every 5 seconds

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="video-slider-container" ref={containerRef}>
      <div className="track" ref={trackRef} id="videoTrack">
        <div className="video-slide">
          <iframe
            src="https://player.vimeo.com/video/1147584196?autoplay=1&muted=1&loop=1&playsinline=1&controls=0&title=0&byline=0&portrait=0&background=1&autopause=0"
            allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
            frameBorder="0"
            referrerPolicy="strict-origin-when-cross-origin"
            title="envo shot 21_9"
          ></iframe>
        </div>
        <div className="video-slide">
          <iframe
            src="https://player.vimeo.com/video/1147581103?autoplay=1&muted=1&loop=1&playsinline=1&controls=0&title=0&byline=0&portrait=0&background=1&autopause=0"
            allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
            frameBorder="0"
            referrerPolicy="strict-origin-when-cross-origin"
            title="blowup 21_9"
          ></iframe>
        </div>
        <div className="video-slide">
          <iframe
            src="https://player.vimeo.com/video/1147584097?autoplay=1&muted=1&loop=1&playsinline=1&controls=0&title=0&byline=0&portrait=0&background=1&autopause=0"
            allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
            frameBorder="0"
            referrerPolicy="strict-origin-when-cross-origin"
            title="rock one 1.2x"
          ></iframe>
        </div>
        <div className="video-slide">
          <iframe
            src="https://player.vimeo.com/video/1147584148?autoplay=1&muted=1&loop=1&playsinline=1&controls=0&title=0&byline=0&portrait=0&background=1&autopause=0"
            allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
            frameBorder="0"
            referrerPolicy="strict-origin-when-cross-origin"
            title="aesthetic cinematics"
          ></iframe>
        </div>
        <div className="video-slide">
          <iframe
            src="https://player.vimeo.com/video/1147584196?autoplay=1&muted=1&loop=1&playsinline=1&controls=0&title=0&byline=0&portrait=0&background=1&autopause=0"
            allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
            frameBorder="0"
            referrerPolicy="strict-origin-when-cross-origin"
            title="envo shot 21_9"
          ></iframe>
        </div>
        <div className="video-slide">
          <iframe
            src="https://player.vimeo.com/video/1147581103?autoplay=1&muted=1&loop=1&playsinline=1&controls=0&title=0&byline=0&portrait=0&background=1&autopause=0"
            allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
            frameBorder="0"
            referrerPolicy="strict-origin-when-cross-origin"
            title="blowup 21_9"
          ></iframe>
        </div>
      </div>
    </div>
  );
}
