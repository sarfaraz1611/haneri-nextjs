"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

// Register plugin only on client-side
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const slides = [
  {
    id: 1,
    heading: "Air Curve Design",
    bgColor: "#00473E", // primary
    slideImage: "/images/air_1.png",
    overlayImage: "/images/air_2.png",
  },
  {
    id: 2,
    heading: "TurboSilent BLDC",
    bgColor: "#315859", // primary-green
    slideImage: "/images/turbo_2.png",
    overlayImage: "/images/turbo_1.png",
  },
  {
    id: 3,
    heading: "H.A.S.S®",
    bgColor: "#00473E", // brand
    slideImage: "/images/hass_1.png",
    overlayImage: "/images/hass_2.png",
  },
  {
    id: 4,
    heading: "LumiAmbience",
    bgColor: "#244a46", // primary-dark
    slideImage: "/images/lumi_1.png",
    overlayImage: "/images/lumi_2.png",
  },
  {
    id: 5,
    heading: "S.C.A.N",
    bgColor: "#315859", // brand-dark
    slideImage: "/images/scan_1.png",
    overlayImage: "/images/scan_3.png",
  },
];

export default function ServicesSlider() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const slidesRef = useRef<HTMLElement[]>([]);
  const outerWrappersRef = useRef<HTMLDivElement[]>([]);
  const innerWrappersRef = useRef<HTMLDivElement[]>([]);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const slideImagesRef = useRef<HTMLImageElement[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const animatingRef = useRef(false);
  const currentIndexRef = useRef(0);

  useEffect(() => {
    currentIndexRef.current = currentIndex;
  }, [currentIndex]);

  const gotoSection = useCallback((index: number, direction: number) => {
    if (animatingRef.current) return;

    const totalSlides = slides.length;

    // Check boundaries
    if (index < 0 || index >= totalSlides) {
      return;
    }

    animatingRef.current = true;

    const currentSection = slidesRef.current[currentIndexRef.current];
    const heading = currentSection?.querySelector(".slide-heading") as HTMLElement;
    const nextSection = slidesRef.current[index];
    const nextHeading = nextSection?.querySelector(".slide-heading") as HTMLElement;

    gsap.set(slidesRef.current, { zIndex: 0, autoAlpha: 0 });
    gsap.set(imagesRef.current, { zIndex: 0, autoAlpha: 0 });
    gsap.set([slidesRef.current[currentIndexRef.current], imagesRef.current[index]], {
      zIndex: 1,
      autoAlpha: 1,
    });
    gsap.set([slidesRef.current[index], imagesRef.current[currentIndexRef.current]], {
      zIndex: 2,
      autoAlpha: 1,
    });

    const tl = gsap.timeline({
      defaults: { duration: 1, ease: "expo.inOut" },
      onComplete: () => {
        animatingRef.current = false;
        currentIndexRef.current = index;
        setCurrentIndex(index);
      },
    });

    tl.fromTo(
      outerWrappersRef.current[index],
      { xPercent: 100 * direction },
      { xPercent: 0 },
      0
    )
      .fromTo(
        innerWrappersRef.current[index],
        { xPercent: -100 * direction },
        { xPercent: 0 },
        0
      )
      .to(
        heading,
        {
          "--width": "800",
          xPercent: 30 * direction,
        } as gsap.TweenVars,
        0
      )
      .fromTo(
        nextHeading,
        {
          "--width": "800",
          xPercent: -30 * direction,
        } as gsap.TweenVars,
        {
          "--width": "200",
          xPercent: 0,
        } as gsap.TweenVars,
        0
      )
      .fromTo(
        imagesRef.current[index],
        {
          xPercent: 125 * direction,
          scaleX: 1.5,
          scaleY: 1.3,
        },
        { xPercent: 0, scaleX: 1, scaleY: 1, duration: 1 },
        0
      )
      .fromTo(
        imagesRef.current[currentIndexRef.current],
        { xPercent: 0, scaleX: 1, scaleY: 1 },
        {
          xPercent: -125 * direction,
          scaleX: 1.5,
          scaleY: 1.3,
        },
        0
      )
      .fromTo(slideImagesRef.current[index], { scale: 2 }, { scale: 1 }, 0)
      .timeScale(0.8);
  }, []);

  useEffect(() => {
    if (!containerRef.current || !wrapperRef.current) return;

    // Initial setup
    gsap.set(outerWrappersRef.current, { xPercent: 100 });
    gsap.set(innerWrappersRef.current, { xPercent: -100 });
    gsap.set(outerWrappersRef.current[0], { xPercent: 0 });
    gsap.set(innerWrappersRef.current[0], { xPercent: 0 });
    gsap.set(slidesRef.current[0], { autoAlpha: 1 });
    gsap.set(imagesRef.current, { autoAlpha: 0 });
    gsap.set(imagesRef.current[0], { autoAlpha: 1 });

    let trigger: ScrollTrigger | null = null;

    // Wait for all content to load and render
    const initScrollTrigger = () => {
      if (!containerRef.current) return;

      // Kill any existing triggers with our ID
      ScrollTrigger.getById("servicesSlider")?.kill();

      // Create ScrollTrigger - pin when section reaches top
      trigger = ScrollTrigger.create({
        id: "servicesSlider",
        trigger: containerRef.current,
        start: "top top",
        end: `+=${(slides.length - 1) * 100}%`,
        pin: true,
        pinSpacing: true,
        scrub: 0.5, // Add smooth scrubbing to prevent jumps
        markers: false,
        invalidateOnRefresh: true,
        anticipatePin: 1, // Helps prevent jump when pinning starts
        onUpdate: (self) => {
          if (animatingRef.current) return;

          const progress = self.progress;
          const targetIndex = Math.min(
            Math.floor(progress * slides.length),
            slides.length - 1
          );

          if (targetIndex !== currentIndexRef.current) {
            const direction = targetIndex > currentIndexRef.current ? 1 : -1;
            gotoSection(targetIndex, direction);
          }
        },
        onLeaveBack: () => {
          // Reset to first slide when scrolling back up past the section
          if (currentIndexRef.current !== 0) {
            currentIndexRef.current = 0;
            setCurrentIndex(0);
            gsap.set(outerWrappersRef.current, { xPercent: 100 });
            gsap.set(innerWrappersRef.current, { xPercent: -100 });
            gsap.set(outerWrappersRef.current[0], { xPercent: 0 });
            gsap.set(innerWrappersRef.current[0], { xPercent: 0 });
            gsap.set(slidesRef.current, { zIndex: 0, autoAlpha: 0 });
            gsap.set(slidesRef.current[0], { zIndex: 1, autoAlpha: 1 });
            gsap.set(imagesRef.current, { autoAlpha: 0 });
            gsap.set(imagesRef.current[0], { autoAlpha: 1 });
          }
        },
      });
    };

    // Watch for DOM changes (pin-spacer being added by FeaturedProducts)
    let observer: MutationObserver | null = null;
    let hasInitialized = false;

    const initAfterPinSpacers = () => {
      if (hasInitialized) return;

      // Check if FeaturedProducts pin-spacer exists
      const pinSpacers = document.querySelectorAll(".pin-spacer");

      if (pinSpacers.length > 0 || document.readyState === "complete") {
        hasInitialized = true;

        // Small delay to let pin-spacer settle
        setTimeout(() => {
          initScrollTrigger();
          ScrollTrigger.refresh(true);
        }, 200);
      }
    };

    // Use MutationObserver to detect when pin-spacer is added
    observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (mutation.type === "childList") {
          initAfterPinSpacers();
        }
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    // Also try after a delay as fallback
    const timeoutId = setTimeout(() => {
      initAfterPinSpacers();
    }, 1500);

    // Also refresh on window load
    const handleLoad = () => {
      setTimeout(() => {
        if (!hasInitialized) {
          hasInitialized = true;
          initScrollTrigger();
        }
        ScrollTrigger.refresh(true);
      }, 500);
    };
    window.addEventListener("load", handleLoad);

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("load", handleLoad);
      if (observer) {
        observer.disconnect();
      }
      if (trigger) {
        trigger.kill();
      }
    };
  }, [gotoSection]);

  return (
    <div ref={wrapperRef} className="services-slider-wrapper">
      <section
        ref={containerRef}
        className="relative h-screen w-full overflow-hidden bg-primary"
        style={{ fontFamily: "'Sora', sans-serif" }}
      >
        {/* Slides */}
        {slides.map((slide, index) => (
          <section
            key={slide.id}
            ref={(el) => {
              if (el) slidesRef.current[index] = el;
            }}
            className={`slide absolute inset-0 h-full w-full ${
              index === 0 ? "visible" : "invisible"
            }`}
          >
            <div
              ref={(el) => {
                if (el) outerWrappersRef.current[index] = el;
              }}
              className="slide-outer h-full w-full overflow-y-hidden"
            >
              <div
                ref={(el) => {
                  if (el) innerWrappersRef.current[index] = el;
                }}
                className="slide-inner h-full w-full overflow-y-hidden"
              >
                <div
                  className="slide-content absolute inset-0 flex items-center justify-center"
                  style={{ backgroundColor: slide.bgColor }}
                >
                  <div className="slide-container relative mx-auto flex h-full w-full max-w-[1400px] items-center px-4 md:px-12">
                    <figure className="slide-img-cont relative ml-auto h-[60%] w-[50%] overflow-hidden">
                      <Image
                        ref={(el) => {
                          if (el) slideImagesRef.current[index] = el;
                        }}
                        src={slide.slideImage}
                        alt={slide.heading}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    </figure>
                  </div>
                </div>
              </div>
            </div>
          </section>
        ))}

        {/* Overlay */}
        <section className="overlay pointer-events-none absolute inset-0 z-10">
          <div className="overlay-content mx-auto flex h-full w-full max-w-[1400px] items-center px-4 md:px-12">
            {/* Inverse heading text */}
            <h2
              className="slide-heading absolute z-50 text-left text-[clamp(3rem,10vw,10rem)] font-black text-[#f2f1fc] mix-blend-difference left-4 md:left-12 top-32"
              style={
                {
                  fontFamily: "'Bandeins Sans & Strange Variable', sans-serif",
                  fontVariationSettings: "\"wdth\" var(--width, 200)",
                  "--width": "200",
                } as React.CSSProperties
              }
            >
              {slides[currentIndex].heading}
            </h2>
            <figure className="overlay-img-cont relative ml-[20%] mt-[20%] h-[50%] w-[45%] overflow-hidden">
              {[...slides].reverse().map((slide, index) => {
                const actualIndex = slides.length - 1 - index;
                return (
                  <Image
                    key={slide.id}
                    ref={(el) => {
                      if (el) imagesRef.current[actualIndex] = el;
                    }}
                    src={slide.overlayImage}
                    alt={slide.heading}
                    fill
                    className={`object-cover object-center ${
                      actualIndex === 0 ? "visible" : "invisible"
                    }`}
                    sizes="(max-width: 768px) 100vw, 45vw"
                  />
                );
              })}
            </figure>
          </div>
        </section>

        {/* Slide indicator */}
        <div className="absolute bottom-6 left-1/2 z-50 flex -translate-x-1/2 gap-2">
          {slides.map((_, index) => (
            <div
              key={index}
              className={`h-2 w-2 rounded-full transition-all duration-300 ${
                index === currentIndex ? "w-8 bg-white" : "bg-white/50"
              }`}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
