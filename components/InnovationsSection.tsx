"use client";

import { useEffect, useRef, useState } from "react";

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
  const [activeId, setActiveId] = useState<number | null>(null);

  // Intersection Observer for video visibility
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
        { root: null, rootMargin: "100px", threshold: 0.25 },
      );

      observer.observe(iframe);
      observers.push(observer);
    });

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, []);

  return (
    <section
      className="py-2 max-[1199px]:relative"
      aria-label="Innovations that take Haneri further"
    >
      <div className="container">
        {/* <div className="container mx-auto px-4 max-[1199px]:sticky max-[1199px]:top-0 max-[1199px]:bg-white max-[1199px]:h-screen max-[1199px]:flex max-[1199px]:flex-col max-[1199px]:justify-center max-[1199px]:z-30"> */}
        <h2 className="heading_1 mb-6">Innovations that take Haneri further</h2>

        <div className="overflow-hidden">
          <ul className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-5 list-none m-0 p-0">
            {innovations.map((item, index) => (
              <li
                key={item.id}
                className="rounded-md overflow-hidden bg-black transition-all duration-300 hover:scale-95 hover:rounded-md hover:-translate-y-2 cursor-pointer"
                onClick={() => setActiveId(activeId === item.id ? null : item.id)}
              >
                <div className="group relative w-full pt-[177.78%] bg-[#111]">
                  <iframe
                    ref={(el) => {
                      if (el) cardsRef.current[index] = el;
                    }}
                    src={`https://player.vimeo.com/video/${item.videoId}?autoplay=1&muted=1&loop=1&autopause=0&background=1&playsinline=1&title=0&byline=0&portrait=0&badge=0&controls=0&dnt=1`}
                    allow="autoplay; fullscreen; picture-in-picture"
                    referrerPolicy="strict-origin-when-cross-origin"
                    title={item.title}
                    className="absolute inset-0 w-full h-full block border-0 pointer-events-none"
                  ></iframe>
                  <div className={`absolute inset-0 flex items-center justify-center bg-black/50 transition-opacity duration-300 pointer-events-none ${activeId === item.id ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`}>
                    <span className="text-white text-lg font-semibold">{item.title}</span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
