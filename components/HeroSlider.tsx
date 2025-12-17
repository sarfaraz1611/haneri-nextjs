"use client";

import { useEffect, useRef } from "react";

export default function HeroSlider() {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const skeletonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const iframe = iframeRef.current;
    const skeleton = skeletonRef.current;

    if (!iframe) return;

    // Fade out skeleton when iframe loads
    const handleLoad = () => {
      if (skeleton) {
        skeleton.style.opacity = "0";
        skeleton.style.transition = "opacity 0.5s ease";
        setTimeout(() => (skeleton.style.display = "none"), 500);
      }
    };

    iframe.addEventListener("load", handleLoad);

    // Fallback: hide skeleton after 2 seconds
    const timeout = setTimeout(() => {
      if (skeleton) {
        skeleton.style.display = "none";
      }
    }, 2000);

    return () => {
      iframe.removeEventListener("load", handleLoad);
      clearTimeout(timeout);
    };
  }, []);

  return (
    <section id="hero-video-wrapper" className="w-screen ml-[calc(-50vw+50%)]">
      <div className="relative w-full overflow-hidden">
        {/* The containing div's height is constrained */}
        <div className="relative w-full h-[clamp(320px,70vh,900px)] bg-black overflow-hidden max-sm:h-[clamp(260px,55vh,720px)]">
          {/* Skeleton shimmer */}
          {/* <div
            ref={skeletonRef}
            className="absolute inset-0 bg-gradient-to-r from-[#1a1a1a] via-[#2a2a2a] to-[#1a1a1a]
            bg-[length:400%_100%] animate-shimmer z-[1]"
          ></div> */}

          {/* Vimeo iframe container */}
          <div className="absolute top-1/2 left-1/2 w-screen h-[56.25vw] min-w-[177.78vh] min-h-screen -translate-x-1/2 -translate-y-1/2">
            <iframe
              ref={iframeRef}
              src="https://player.vimeo.com/video/1127430579?autoplay=1&muted=1&loop=1&autopause=0&background=1&playsinline=1&title=0&byline=0&portrait=0&badge=0&controls=0&dnt=1"
              allow="autoplay; fullscreen; picture-in-picture"
              className="absolute inset-0 w-full h-full border-0"
              title="Hero Video"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
}
