"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

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
  const sectionRef = useRef<HTMLElement>(null);
  const contentWrapperRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardContainersRef = useRef<HTMLLIElement[]>([]);

  // Title entrance animation
  useEffect(() => {
    if (!titleRef.current) return;

    gsap.fromTo(
      titleRef.current,
      {
        opacity: 0,
        y: 50,
      },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      }
    );
  }, []);

  // Card animations (desktop only)
  useEffect(() => {
    if (typeof window === "undefined") return;

    const mediaQuery = window.matchMedia("(min-width: 1200px)");

    if (!mediaQuery.matches || cardContainersRef.current.length === 0) return;

    const ctx = gsap.context(() => {
      cardContainersRef.current.forEach((card, index) => {
        if (!card) return;

        // Initial state
        gsap.set(card, {
          opacity: 0,
          y: 60,
          scale: 0.9,
        });

        // Animate in
        gsap.to(card, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: "power3.out",
          delay: index * 0.1,
          scrollTrigger: {
            trigger: card,
            start: "top 90%",
            toggleActions: "play none none none",
          },
        });
      });
    });

    return () => ctx.revert();
  }, []);

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
        { root: null, rootMargin: "100px", threshold: 0.25 }
      );

      observer.observe(iframe);
      observers.push(observer);
    });

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, []);

  // GSAP Horizontal Scroll Animation (only for mobile/tablet)
  useEffect(() => {
    const section = sectionRef.current;
    const contentWrapper = contentWrapperRef.current;

    if (!section || !contentWrapper || typeof window === "undefined") return;

    // Only enable horizontal scroll on mobile/tablet (max-width: 1199px)
    const mediaQuery = window.matchMedia("(max-width: 1199px)");

    const setupScrollAnimation = () => {
      if (!mediaQuery.matches) {
        // Desktop: no animation
        return null;
      }

      // Find the inner flex container (the element we will animate)
      const innerFlex = contentWrapper.querySelector("ul");
      if (!innerFlex) return null;

      // Calculate the maximum horizontal distance we need to scroll the content.
      const scrollDistance = innerFlex.scrollWidth - contentWrapper.offsetWidth;

      // Safety check: only run the animation if there is content to scroll
      if (scrollDistance <= 0) return null;

      // Use GSAP Context for proper scope and cleanup
      const ctx = gsap.context(() => {
        // Main Horizontal Scroll Animation
        gsap.to(innerFlex, {
          x: -scrollDistance,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            pin: true,
            scrub: 1,
            start: "top top",
            // end: `+=${scrollDistance}`,
              end: "top -20%",
            markers: false,
            invalidateOnRefresh: true,
          },
        });
      }, section);

      return ctx;
    };

    let ctx = setupScrollAnimation();

    // Handle resize
    const handleResize = () => {
      if (ctx) {
        ctx.revert();
      }
      ctx = setupScrollAnimation();
    };

    mediaQuery.addEventListener("change", handleResize);

    return () => {
      if (ctx) {
        ctx.revert();
      }
      mediaQuery.removeEventListener("change", handleResize);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-6 max-[1199px]:py-0 max-[1199px]:mt-[100vh] max-[1199px]:relative"
      aria-label="Innovations that take Haneri further"
    >
      <div className="container mx-auto px-4 max-[1199px]:sticky max-[1199px]:top-0 max-[1199px]:bg-white max-[1199px]:h-screen max-[1199px]:flex max-[1199px]:flex-col max-[1199px]:justify-center max-[1199px]:z-30">
        <h2
          ref={titleRef}
          className="heading_1 mb-6"
        >
          Innovations that take Haneri further
        </h2>

        <div ref={contentWrapperRef} className="overflow-hidden">
          <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5 list-none m-0 p-0 max-[1199px]:flex max-[1199px]:gap-5 max-[1199px]:min-w-max">
            {innovations.map((item, index) => (
              <li
                key={item.id}
                ref={(el) => {
                  if (el) cardContainersRef.current[index] = el;
                }}
                className="rounded-[var(--radius)] overflow-hidden bg-black shadow-DEFAULT max-[1199px]:shrink-0 max-[1199px]:w-[300px] max-[1199px]:sm:w-[320px] max-[1199px]:md:w-[340px] transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:-translate-y-2 min-[1200px]:cursor-pointer"
              >
                <div className="relative w-full pt-[177.78%] bg-[#111] max-[1199px]:pt-0 max-[1199px]:aspect-9/16">
                  <iframe
                    ref={(el) => {
                      if (el) cardsRef.current[index] = el;
                    }}
                    src={`https://player.vimeo.com/video/${item.videoId}?autoplay=1&muted=1&loop=1&autopause=0&background=1&playsinline=1&title=0&byline=0&portrait=0&badge=0&controls=0&dnt=1`}
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
