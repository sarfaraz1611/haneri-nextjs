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

  const thumbnails: Record<string, string> = {
    "1147584196": "https://i.vimeocdn.com/video/2097424977-b59989a611318063cd4e0756b7e056d8e4431dbc88ca64e9287b74f183195fce-d_1280x720",
    "1147581103": "https://i.vimeocdn.com/video/2097420936-7999dd1ff7e5826992c11cb7adae3c1bfd86e4aee4f74a2c50eb71fac6784bf3-d_1280x720",
    "1147584097": "https://i.vimeocdn.com/video/2097424830-8c46d779d008510ec538d15464b0c407e7772e77baefb0dbaea8fc20ae828d11-d_1280x720",
    "1147584148": "https://i.vimeocdn.com/video/2097424909-8e5f2e6f884363a97d66dc2c950cfefac5fa5979248d84bee780e158d7637e94-d_1280x720",
  };

  return (
    <div className="video-slider-container" ref={containerRef}>
      <div className="track" ref={trackRef} id="videoTrack">
        <div className="video-slide" style={{ backgroundImage: `url(${thumbnails["1147584196"]})` }}>
          <iframe
            src="https://player.vimeo.com/video/1147584196?autoplay=1&muted=1&loop=1&playsinline=1&controls=0&title=0&byline=0&portrait=0&background=1&autopause=0"
            allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
            frameBorder="0"
            referrerPolicy="strict-origin-when-cross-origin"
            title="envo shot 21_9"
          ></iframe>
        </div>
        <div className="video-slide" style={{ backgroundImage: `url(${thumbnails["1147581103"]})` }}>
          <iframe
            src="https://player.vimeo.com/video/1147581103?autoplay=1&muted=1&loop=1&playsinline=1&controls=0&title=0&byline=0&portrait=0&background=1&autopause=0"
            allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
            frameBorder="0"
            referrerPolicy="strict-origin-when-cross-origin"
            title="blowup 21_9"
          ></iframe>
        </div>
        <div className="video-slide" style={{ backgroundImage: `url(${thumbnails["1147584097"]})` }}>
          <iframe
            src="https://player.vimeo.com/video/1147584097?autoplay=1&muted=1&loop=1&playsinline=1&controls=0&title=0&byline=0&portrait=0&background=1&autopause=0"
            allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
            frameBorder="0"
            referrerPolicy="strict-origin-when-cross-origin"
            title="rock one 1.2x"
          ></iframe>
        </div>
        <div className="video-slide" style={{ backgroundImage: `url(${thumbnails["1147584148"]})` }}>
          <iframe
            src="https://player.vimeo.com/video/1147584148?autoplay=1&muted=1&loop=1&playsinline=1&controls=0&title=0&byline=0&portrait=0&background=1&autopause=0"
            allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
            frameBorder="0"
            referrerPolicy="strict-origin-when-cross-origin"
            title="aesthetic cinematics"
          ></iframe>
        </div>
        <div className="video-slide" style={{ backgroundImage: `url(${thumbnails["1147584196"]})` }}>
          <iframe
            src="https://player.vimeo.com/video/1147584196?autoplay=1&muted=1&loop=1&playsinline=1&controls=0&title=0&byline=0&portrait=0&background=1&autopause=0"
            allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
            frameBorder="0"
            referrerPolicy="strict-origin-when-cross-origin"
            title="envo shot 21_9"
          ></iframe>
        </div>
        <div className="video-slide" style={{ backgroundImage: `url(${thumbnails["1147581103"]})` }}>
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
