"use client";

import { useEffect, useRef } from "react";

const innovations = [
  {
    id: 1,
    title: "Air Curve",
    videoId: "1127434008",
  },
  {
    id: 2,
    title: "BLDC",
    videoId: "1127434068",
  },
  {
    id: 3,
    title: "HASS",
    videoId: "1127434033",
  },
  {
    id: 4,
    title: "Lumi",
    videoId: "1127435632",
  },
  {
    id: 5,
    title: "Scan",
    videoId: "1127434145",
  },
];

export default function InnovationsSection() {
  const cardsRef = useRef<HTMLIFrameElement[]>([]);

  useEffect(() => {
    // Pause videos that are off-screen for performance
    if (typeof window === "undefined" || !("IntersectionObserver" in window))
      return;

    const observers: IntersectionObserver[] = [];

    cardsRef.current.forEach((iframe) => {
      if (!iframe) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            // Basic visibility toggle - you can enhance with Vimeo Player API
            if (entry.isIntersecting) {
              iframe.style.visibility = "visible";
            } else {
              iframe.style.visibility = "hidden";
            }
          });
        },
        { root: null, rootMargin: "100px", threshold: 0.25 }
      );

      observer.observe(iframe);
      observers.push(observer);
    });

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, []);

  return (
    <section className="py-6" aria-label="Innovations that take Haneri further">
      <div className="container">
        <h2 className="heading_1">Innovations that take Haneri further</h2>

        <div className="overflow-hidden">
          <ul className="grid grid-cols-5 gap-5 list-none m-0 p-0 max-[1199px]:grid-cols-3 max-md:flex max-md:gap-4 max-md:overflow-x-auto max-md:snap-x max-md:snap-mandatory max-md:p-0 max-md:[&::-webkit-scrollbar]:hidden">
            {innovations.map((item, index) => (
              <li
                key={item.id}
                className="rounded-[var(--radius)] overflow-hidden bg-black shadow-DEFAULT max-md:flex-[0_0_45%] max-md:snap-start"
              >
                <div className="relative w-full pt-[177.78%] bg-[#111] max-[1199px]:pt-0 max-[1199px]:aspect-[9/16] max-[1199px]:max-h-[80vh] max-[1199px]:mx-auto">
                  <iframe
                    ref={(el) => {
                      if (el) cardsRef.current[index] = el;
                    }}
                    src={`https://player.vimeo.com/video/${item.videoId}?autoplay=1&muted=1&loop=1&autopause=0&background=1&playsinline=1&title=0&byline=0&portrait=0&badge=0&controls=0&dnt=1`}
                    frameBorder="0"
                    allow="autoplay; fullscreen; picture-in-picture"
                    referrerPolicy="strict-origin-when-cross-origin"
                    title={item.title}
                    className="absolute inset-0 w-full h-full block border-0"
                  ></iframe>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
