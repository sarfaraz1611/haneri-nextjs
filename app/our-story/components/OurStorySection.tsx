"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { Observer } from "gsap/Observer";

// Register GSAP Plugin safely
if (typeof window !== "undefined") {
  gsap.registerPlugin(Observer);
}

interface OurStorySectionProps {
  onShowFooter?: () => void;
  onHideFooter?: () => void;
}

// Number of sections controlled by GSAP
const GSAP_SECTION_COUNT = 3;

// Map URL Hash IDs to Section Indices
const SECTION_IDS: Record<string, number> = {
  top: 0,
  heart: 1,
  sustainability: 2,
  innovation: 3,
  vision: 4,
  mission: 5,
  values: 6,
  promise: 7,
};

export default function OurStorySection({
  onHideFooter,
}: OurStorySectionProps) {
  // -- Refs --
  const gsapContainerRef = useRef<HTMLDivElement>(null);
  const normalContainerRef = useRef<HTMLDivElement>(null);
  const sectionsRef = useRef<HTMLElement[]>([]);
  const outerWrappersRef = useRef<HTMLDivElement[]>([]);
  const innerWrappersRef = useRef<HTMLDivElement[]>([]);
  const currentIndexRef = useRef(-1);
  const animatingRef = useRef(false);
  const observerRef = useRef<Observer | null>(null);

  // -- State --
  const [isMobile, setIsMobile] = useState(false);
  const [gsapDone, setGsapDone] = useState(false);
  const [hash, setHash] = useState("");

  // Listen for URL hash changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      setHash(window.location.hash.replace("#", ""));
    }

    const handleHashChange = () => {
      setHash(window.location.hash.replace("#", ""));
    };

    window.addEventListener("hashchange", handleHashChange);

    const checkHashInterval = setInterval(() => {
      const currentHash = window.location.hash.replace("#", "");
      setHash((prevHash) => {
        if (prevHash !== currentHash) {
          return currentHash;
        }
        return prevHash;
      });
    }, 100);

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
      clearInterval(checkHashInterval);
    };
  }, []);

  // Check for mobile viewport
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Function to exit GSAP and transition to normal scroll
  const exitGsap = useCallback(() => {
    if (observerRef.current) {
      observerRef.current.kill();
      observerRef.current = null;
    }
    setGsapDone(true);
  }, []);

  // Function to re-engage GSAP from normal scroll
  const reEngageGsap = useCallback(() => {
    setGsapDone(false);
  }, []);

  // MAIN GSAP SCROLL LOGIC (Desktop Only)
  useEffect(() => {
    if (!gsapContainerRef.current || isMobile || gsapDone) return;

    const sections = sectionsRef.current.filter(Boolean);
    const outerWrappers = outerWrappersRef.current.filter(Boolean);
    const innerWrappers = innerWrappersRef.current.filter(Boolean);
    const totalSections = GSAP_SECTION_COUNT;

    if (sections.length === 0) return;

    // Initial State
    gsap.set(outerWrappers, { yPercent: 100 });
    gsap.set(innerWrappers, { yPercent: -100 });

    // Navigation Function
    const gotoSection = (index: number, direction: number) => {
      index = Math.max(0, Math.min(index, totalSections - 1));

      if (index === currentIndexRef.current) {
        // If at last GSAP section and scrolling down, exit GSAP
        if (index === totalSections - 1 && direction === 1) {
          exitGsap();
        }
        return;
      }

      animatingRef.current = true;

      const fromTop = direction === -1;
      const dFactor = fromTop ? -1 : 1;

      const tl = gsap.timeline({
        defaults: { duration: 1.25, ease: "power1.inOut" },
        onComplete: () => {
          animatingRef.current = false;
        },
      });

      if (
        currentIndexRef.current >= 0 &&
        currentIndexRef.current < totalSections
      ) {
        gsap.set(sections[currentIndexRef.current], { zIndex: 0 });
        tl.set(sections[currentIndexRef.current], { autoAlpha: 0 });
      }

      gsap.set(sections[index], { autoAlpha: 1, zIndex: 1 });

      tl.fromTo(
        [outerWrappers[index], innerWrappers[index]],
        {
          yPercent: (i) => (i ? -100 * dFactor : 100 * dFactor),
        },
        {
          yPercent: 0,
        },
        0,
      );

      currentIndexRef.current = index;
    };

    // Scroll/Swipe Observer
    const observer = Observer.create({
      type: "wheel,touch,pointer",
      wheelSpeed: -1,
      onDown: () =>
        !animatingRef.current && gotoSection(currentIndexRef.current - 1, -1),
      onUp: () => {
        if (animatingRef.current) return;
        if (currentIndexRef.current === totalSections - 1) {
          // At sustainability, scrolling down -> exit GSAP
          exitGsap();
        } else {
          gotoSection(currentIndexRef.current + 1, 1);
        }
      },
      tolerance: 10,
      preventDefault: true,
    });
    observerRef.current = observer;

    // Keyboard Navigation
    const handleKeyDown = (e: KeyboardEvent) => {
      if (animatingRef.current) return;
      if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
        gotoSection(currentIndexRef.current - 1, -1);
      } else if (e.key === "ArrowDown" || e.key === "ArrowRight") {
        if (currentIndexRef.current === totalSections - 1) {
          exitGsap();
        } else {
          gotoSection(currentIndexRef.current + 1, 1);
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    // Handle Page Load with Hash
    const initialHash = window.location.hash.replace("#", "");
    const initialIndex =
      SECTION_IDS[initialHash] !== undefined ? SECTION_IDS[initialHash] : 0;

    if (initialIndex >= GSAP_SECTION_COUNT) {
      // Hash points to a normal scroll section, show sustainability and exit GSAP
      gotoSection(GSAP_SECTION_COUNT - 1, 1);
      setTimeout(() => {
        exitGsap();
        // After render, scroll to the target section
        setTimeout(() => {
          const targetEl = document.getElementById(initialHash);
          if (targetEl) {
            targetEl.scrollIntoView({ behavior: "smooth" });
          }
        }, 100);
      }, 1300);
    } else {
      gotoSection(initialIndex, 1);
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      if (observer) observer.kill();
      observerRef.current = null;
    };
  }, [isMobile, gsapDone, exitGsap]);

  // Scroll listener to re-engage GSAP when scrolling back to top
  useEffect(() => {
    if (!gsapDone || isMobile) return;

    const handleScroll = () => {
      if (window.scrollY <= 0) {
        reEngageGsap();
        // Reset to sustainability (index 2) when re-engaging
        currentIndexRef.current = GSAP_SECTION_COUNT - 1;
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [gsapDone, isMobile, reEngageGsap]);

  // React to hash changes (dynamic navigation)
  useEffect(() => {
    if (isMobile) return;

    const targetIndex = SECTION_IDS[hash];
    if (targetIndex === undefined) return;

    if (targetIndex < GSAP_SECTION_COUNT) {
      // Target is a GSAP section
      if (gsapDone) {
        // Re-engage GSAP first, then navigate
        currentIndexRef.current = GSAP_SECTION_COUNT - 1;
        setGsapDone(false);
        window.scrollTo(0, 0);
      }
      // Navigation to GSAP section will be handled by the GSAP effect
    } else {
      // Target is a normal scroll section
      if (!gsapDone) {
        // Need to exit GSAP first, then scroll
        currentIndexRef.current = GSAP_SECTION_COUNT - 1;
        exitGsap();
        setTimeout(() => {
          const targetEl = document.getElementById(hash);
          if (targetEl) {
            targetEl.scrollIntoView({ behavior: "smooth" });
          }
        }, 100);
      } else {
        const targetEl = document.getElementById(hash);
        if (targetEl) {
          targetEl.scrollIntoView({ behavior: "smooth" });
        }
      }
    }
  }, [hash, isMobile, gsapDone, exitGsap]);

  // Hide footer globally for this page
  useEffect(() => {
    onHideFooter?.();
  }, [onHideFooter]);

  // -- RENDER --
  return (
    <div className="relative w-full" style={{ paddingTop: "80px" }}>
      {/* ===== GSAP CONTROLLED SECTIONS (0-2) ===== */}
      {!isMobile && !gsapDone && (
        <div
          ref={gsapContainerRef}
          className="fixed inset-0 w-full overflow-hidden"
          style={{ height: "100vh", paddingTop: "80px", zIndex: 10 }}
        >
          {/* Background Image with Blur */}
          <div
            className="absolute inset-0 w-full h-full z-0"
            style={{
              backgroundImage: "url(/backgroundImage.jpeg)",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              filter: "blur(10px)",
              transform: "scale(1.1)",
            }}
          />

          {/* --- Section 1: About top_block (Index 0) --- */}
          <section
            id="top"
            ref={(el) => {
              if (el) sectionsRef.current[0] = el;
            }}
            className="absolute inset-0 w-full h-full opacity-0 invisible z-10"
          >
            <div
              ref={(el) => {
                if (el) outerWrappersRef.current[0] = el;
              }}
              className="outer absolute inset-0 overflow-hidden z-10"
            >
              <div
                ref={(el) => {
                  if (el) innerWrappersRef.current[0] = el;
                }}
                className="inner absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center"
              >
                <div className="container w-full px-4 pt-10 max-w-7xl">
                  <div className="video-wrapper relative w-full mx-auto pt-[56.25%] overflow-hidden rounded-[5px]">
                    <iframe
                      src="https://player.vimeo.com/video/1131575735?autoplay=1&muted=1&loop=1&autopause=0&background=1&playsinline=1&title=0&byline=0&portrait=0&badge=0&controls=0&dnt=1"
                      frameBorder="0"
                      allow="autoplay; fullscreen; picture-in-picture"
                      allowFullScreen
                      className="absolute top-0 left-0 w-full h-full object-cover pointer-events-none "
                    ></iframe>
                    <div className="absolute top-[20vh] left-8 text-left bg-black/10 p-4 rounded-md">
                      <h1 className="text-[20px] sm:text-[42px] text-white leading-14 font-medium mb-5">
                        Designing Tomorrow's
                        <br />{" "}
                        <span className="text-[20px] sm:text-[42px] text-[#E07339] font-bold">
                          Comfort
                        </span>
                      </h1>
                      <p className="text-base sm:text-[14px] text-white leading-[1.6] sm:leading-[1.75] max-w-[450px] mb-8 font-['Open_Sans']">
                        Thoughtful innovation, enduring quality, and timeless
                        design - crafted to elevate everyday living.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* --- Section 2: The Heart of Who We Are (Index 1) --- */}
          <section
            id="heart"
            ref={(el) => {
              if (el) sectionsRef.current[1] = el;
            }}
            className="absolute inset-0 w-full h-full opacity-0 invisible"
          >
            <div
              ref={(el) => {
                if (el) outerWrappersRef.current[1] = el;
              }}
              className="outer absolute inset-0 overflow-hidden"
            >
              <div
                ref={(el) => {
                  if (el) innerWrappersRef.current[1] = el;
                }}
                className="inner absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center"
              >
                <div className="flex items-center gap-8 flex-col lg:flex-row max-w-7xl w-full p-8">
                  <div className="w-full lg:w-1/2">
                    <h2 className="text-[20px] sm:text-[42px] lg:text-[52px] font-['Barlow_Condensed']  text-[#00473E] font-medium mb-4 leading-12">
                      The Heart of
                      <br />
                      <span className=" font-bold text-[#CA5D27]  font-['Open_Sans'] lg:text-[42px]">Who We Are</span> <span className="h-2 w-2 text-[#CA5D27]">_______________</span>
                    </h2>

                    {/* <div className=" flex  gap-5"> */}

                    <p className="text-[15px] text-black/70 font-['Open_Sans'] mb-5 font-bold">
                      Haneri is the culmination of over 75 years of collective
                      expertise in design, engineering, and manufacturing.
                    </p>
                    <p className="text-base sm:text-[14px] text-black leading-[1.6] sm:leading-[1.75] font-['Open_Sans']">
                      Born from a deep passion for redefining everyday living,
                      Haneri represents a legacy of craftsmanship where
                      technology meets timeless aesthetics. Each product is a
                      reflection of our commitment to innovation, quality, and
                      purposeful design — created to enhance the way people
                      experience their spaces.
                    </p>
                    {/* </div> */}
                  </div>
                  <div className="flex flex-row gap-4 lg:w-1/2 items-center h-[400px] lg:h-[570px]">
                    <div className="w-1/2 -translate-y-4 rounded-[10px] overflow-hidden">
                      <img
                        src="images/The_heart_image_1.png"
                        alt="img"
                        className="w-full h-[300px] object-cover transition-transform duration-300 ease-in-out hover:scale-[1.03]"
                      />
                    </div>
                    <div className="w-1/2 translate-y-8 rounded-[10px] overflow-hidden">
                      <img
                        src="images/The_heart_image_2.png"
                        alt="img"
                        className="w-full h-[300px] object-cover transition-transform duration-300 ease-in-out hover:scale-[1.03]"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* --- Section 3: Sustainability (Index 2) --- */}
          <section
            id="sustainability"
            ref={(el) => {
              if (el) sectionsRef.current[2] = el;
            }}
            className="absolute inset-0 w-full h-full opacity-0 invisible"
          >
            <div
              ref={(el) => {
                if (el) outerWrappersRef.current[2] = el;
              }}
              className="outer absolute inset-0 overflow-hidden"
            >
              <div
                ref={(el) => {
                  if (el) innerWrappersRef.current[2] = el;
                }}
                className="inner absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center"
              >
                <div className="flex items-stretch w-full max-w-[80%] flex-col md:flex-row overflow-hidden rounded-lg shadow-lg">
                  <div className="w-full md:w-3/4">
                    <img
                      src="images/about_sustainability.png"
                      alt="Sustainability"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="w-full md:w-1/2 bg-[#00473E] p-8 sm:p-[40px_36px] flex flex-col justify-center">
                    <h2 className="text-white text-[18px] sm:text-[28px] mb-5">
                      SUSTAINABILITY & RESPONSIBILITY
                    </h2>
                    <p className="text-white mb-5 text-[12px] sm:text-[14px] sm:leading-[1.75]">
                      We believe true innovation is sustainable.
                    </p>
                    <p className="text-white text-[14px] sm:text-[14px] sm:leading-[1.75]">
                      From energy-efficient technology to recyclable packaging
                      and ethically driven manufacturing practices, every Haneri
                      process embodies our unwavering commitment to a cleaner,
                      smarter, and more responsible tomorrow.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Scroll Indicator */}
          {/* <div className="fixed bottom-14 left-1/2 transform -translate-x-1/2 z-40 text-center text-[#00473E] animate-bounce">
            <div className="text-sm mb-2 opacity-70">Scroll to explore</div>
            <svg
              className="w-6 h-6 mx-auto"
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
          </div> */}
        </div>
      )}

      {/* ===== MOBILE LAYOUT - All sections in normal flow ===== */}
      {isMobile && (
        <>
          {/* --- Section 1: About top_block (Index 0) --- */}
          <section id="top" className="relative w-full py-8">
            <div className="relative w-full">
              <div className="relative w-full bg-white flex items-center justify-center">
                <div className="container w-full px-4 py-8 text-center max-w-6xl">
                  <h1 className="text-[20px] sm:text-[42px] text-[#00473E] leading-none font-medium mb-5">
                    Designing Tomorrow's Comfort
                  </h1>
                  <p className="text-base sm:text-[14px] text-black leading-[1.6] sm:leading-[1.75] max-w-[450px] mx-auto mb-8 font-['Open_Sans']">
                    Thoughtful innovation, enduring quality, and timeless design
                    - crafted to elevate everyday living.
                  </p>
                  <div className="video-wrapper relative w-full mx-auto pt-[40.25%] overflow-hidden rounded-[5px]">
                    <iframe
                      src="https://player.vimeo.com/video/1131575735?autoplay=1&muted=1&loop=1&autopause=0&background=1&playsinline=1&title=0&byline=0&portrait=0&badge=0&controls=0&dnt=1"
                      frameBorder="0"
                      allow="autoplay; fullscreen; picture-in-picture"
                      allowFullScreen
                      className="absolute top-0 left-0 w-full h-full object-cover pointer-events-none"
                    ></iframe>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* --- Section 2: The Heart of Who We Are (Index 1) --- */}
          <section id="heart" className="relative w-full">
            <div className="relative w-full">
              <div className="relative w-full bg-white flex items-center justify-center">
                <div className="flex items-center gap-8 flex-col lg:flex-row max-w-7xl w-full p-8">
                  <div className="w-full lg:w-1/2">
                    <h2 className="text-[20px] sm:text-[42px] text-[#00473E] leading-none font-medium mb-4">
                      The Heart of Who We Are
                    </h2>
                    <p className="text-[15px] text-[#CA5D27] font-['Barlow_Condensed'] mb-5">
                      Haneri is the culmination of over 75 years of collective
                      expertise in design, engineering, and manufacturing.
                    </p>
                    <p className="text-base sm:text-[14px] text-black leading-[1.6] sm:leading-[1.75] font-['Open_Sans']">
                      Born from a deep passion for redefining everyday living,
                      Haneri represents a legacy of craftsmanship where
                      technology meets timeless aesthetics. Each product is a
                      reflection of our commitment to innovation, quality, and
                      purposeful design — created to enhance the way people
                      experience their spaces.
                    </p>
                  </div>
                  <div className="flex flex-col md:flex-row gap-4 lg:w-1/2 h-[400px] lg:h-[570px]">
                    <div className="w-full h-full rounded-[10px] overflow-hidden">
                      <img
                        src="images/The_heart_image_1.png"
                        alt="img"
                        className="w-full h-full object-cover transition-transform duration-300 ease-in-out hover:scale-[1.03]"
                      />
                    </div>
                    <div className="w-full h-full rounded-[10px] overflow-hidden">
                      <img
                        src="images/The_heart_image_2.png"
                        alt="img"
                        className="w-full h-full object-cover transition-transform duration-300 ease-in-out hover:scale-[1.03]"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* --- Section 3: Sustainability (Index 2) --- */}
          <section id="sustainability" className="relative w-full py-8">
            <div className="relative w-full">
              <div className="relative w-full flex items-center justify-center">
                <div className="flex items-stretch w-full max-w-[80%] flex-col md:flex-row overflow-hidden rounded-lg shadow-lg">
                  <div className="w-full md:w-3/4">
                    <img
                      src="images/about_sustainability.png"
                      alt="Sustainability"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="w-full md:w-1/2 bg-[#00473E] p-8 sm:p-[40px_36px] flex flex-col justify-center">
                    <h2 className="text-white text-[18px] sm:text-[28px] mb-5">
                      SUSTAINABILITY & RESPONSIBILITY
                    </h2>
                    <p className="text-white mb-5 text-[12px] sm:text-[14px] sm:leading-[1.75]">
                      We believe true innovation is sustainable.
                    </p>
                    <p className="text-white text-[14px] sm:text-[14px] sm:leading-[1.75]">
                      From energy-efficient technology to recyclable packaging
                      and ethically driven manufacturing practices, every Haneri
                      process embodies our unwavering commitment to a cleaner,
                      smarter, and more responsible tomorrow.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </>
      )}

      {/* ===== NORMAL SCROLL SECTIONS (3-7) ===== */}
      {/* These render in normal document flow for both mobile and desktop (after GSAP exits) */}
      <div
        ref={normalContainerRef}
        className={
          isMobile ? "relative w-full" : gsapDone ? "relative w-full" : "hidden"
        }
        style={!isMobile && gsapDone ? { paddingTop: "0px" } : undefined}
      >
        {/* --- Section 4: Innovation (Index 3) --- */}
        <section
          id="innovation"
          className="relative w-full min-h-screen flex items-center justify-center bg-white/80 backdrop-blur-sm py-8"
        >
          <div className="w-full max-w-6xl px-4">
            <h1 className="text-[24px] sm:text-[42px] text-[#00473E] leading-none font-medium text-center mb-5">
              Innovation and Design Philosophy
            </h1>
            <p className="text-base text-[14px] text-black leading-[1.6] sm:leading-[1.75] max-w-[650px] mx-auto mb-8 text-center font-['Open_Sans']">
              Every Haneri product begins with a simple idea — to make
              technology intuitive and design effortless. Our design philosophy
              combines technical precision, aesthetic balance, and human
              understanding.
            </p>
            <div className="flex justify-around items-center gap-4 flex-wrap md:flex-nowrap">
              <div className="flex-1 text-center min-w-[200px]">
                <div className="overflow-hidden rounded-[10px] mb-4">
                  <img
                    src="images/about_innovation_1.png"
                    alt="Design To Delivery"
                    className="w-full h-[200px] object-cover transition-transform duration-300 hover:scale-[1.03]"
                  />
                </div>
                <span className="text-[26px] sm:text-[15px] text-[#CA5D27] font-['Barlow_Condensed']">
                  Design To Delivery
                </span>
              </div>
              <div className="flex-1 text-center min-w-[200px]">
                <div className="overflow-hidden rounded-[10px] mb-4">
                  <img
                    src="images/about_innovation_2.png"
                    alt="20+ Product Prototypes"
                    className="w-full h-[200px] object-cover transition-transform duration-300 hover:scale-[1.03]"
                  />
                </div>
                <span className="text-[26px] sm:text-[15px] text-[#CA5D27] font-['Barlow_Condensed']">
                  20+ Product Prototypes
                </span>
              </div>
              <div className="flex-1 text-center min-w-[200px]">
                <div className="overflow-hidden rounded-[10px] mb-4">
                  <img
                    src="images/about_innovation_3.png"
                    alt="100% Quality Tested"
                    className="w-full h-[200px] object-cover transition-transform duration-300 hover:scale-[1.03]"
                  />
                </div>
                <span className="text-[26px] sm:text-[15px] text-[#CA5D27] font-['Barlow_Condensed']">
                  100% Quality Tested
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* --- Section 5: Vision (Index 4) --- */}
        <section
          id="vision"
          className="relative w-full  flex items-center justify-center bg-white/80 backdrop-blur-sm py-8"
        >
          <div className="flex flex-col md:flex-row gap-8 items-center max-w-6xl w-full px-4">
            <div className={isMobile ? "w-1/2" : "w-full md:w-[35%]"}>
              <img
                src="images/section/Haneri_haVision_Image.jpg"
                alt="Vision"
                className="w-full h-auto rounded-md object-cover"
              />
            </div>
            <div className="w-full md:flex-1">
              <h3 className="text-[32px] text-center md:text-left sm:text-[34px] font-light font-['Barlow_Condensed'] text-[#00473E] mb-4">
                Our Vision
              </h3>
              <p className="text-[14px] text-center md:text-left font-['Open_Sans'] leading-[1.8] sm:leading-[1.75] text-black">
                To redefine aspirational product experiences by creating
                beautifully crafted, technologically advanced, and accessible
                luxury solutions blending exceptional quality with an inclusive
                design that elevates everyday experiences for everyone.
              </p>
            </div>
          </div>
        </section>

        {/* --- Section 6: Mission (Index 5) --- */}
        <section
          id="mission"
          className="relative w-full  flex items-center justify-center bg-white/80 backdrop-blur-sm py-8"
        >
          <div className="flex flex-col md:flex-row gap-8 items-start max-w-6xl w-full px-4">
            <div className="w-full md:flex-1 flex flex-col gap-4 order-2 md:order-1">
              <h3 className="text-[32px] text-center md:text-left sm:text-[34px] font-light font-['Barlow_Condensed'] text-[#00473E] mb-2">
                Our Mission
              </h3>
              <p className="text-md text-center md:text-left sm:text-[14px] font-['Open_Sans'] leading-[1.8] sm:leading-[1.75] text-black">
                We will achieve our mission through thoughtful design, lasting
                quality, inclusive pricing, and exceptional customer care—making
                luxury accessible and elevating everyday living for all.
              </p>
              <p className="text-md text-center md:text-left sm:text-[14px] font-['Open_Sans'] leading-[1.8] sm:leading-[1.75] text-black font-semibold">
                We will achieve our mission by focusing on four key pillars:
              </p>
              <div className="space-y-3">
                <div className="text-center md:text-left">
                  <h4 className="text-[18px] text-[#CA5D27] font-['Barlow_Condensed'] font-semibold mb-1">
                    Innovative Design and Engineering
                  </h4>
                  <p className="text-[13px] font-['Open_Sans'] leading-[1.75] text-black">
                    We will bring together talented designers and engineers to
                    craft solutions that are as aesthetically pleasing as they
                    are functional. By staying ahead of design trends and
                    technological advancements, we ensure that each product is
                    thoughtfully crafted to meet the evolving needs of the
                    modern consumer.
                  </p>
                </div>
                <div className="text-center md:text-left">
                  <h4 className="text-[18px] text-[#CA5D27] font-['Barlow_Condensed'] font-semibold mb-1">
                    Commitment to Quality and Durability
                  </h4>
                  <p className="text-[13px] font-['Open_Sans'] leading-[1.75] text-black">
                    Quality will be at the core of everything we do. From
                    materials to manufacturing processes, we will invest in
                    ensuring that each product is built to last and provide a
                    reliable experience over time.
                  </p>
                </div>
                <div className="text-center md:text-left">
                  <h4 className="text-[18px] text-[#CA5D27] font-['Barlow_Condensed'] font-semibold mb-1">
                    Accessibility and Inclusivity
                  </h4>
                  <p className="text-[13px] font-['Open_Sans'] leading-[1.75] text-black">
                    We believe luxury should be accessible to everyone. By
                    designing products with a broad range of price points and
                    functionality, we will make our solutions available to
                    diverse consumers, considering various lifestyles, budgets,
                    and preferences.
                  </p>
                </div>
                <div className="text-center md:text-left">
                  <h4 className="text-[18px] text-[#CA5D27] font-['Barlow_Condensed'] font-semibold mb-1">
                    Exceptional Customer Experience
                  </h4>
                  <p className="text-[13px] font-['Open_Sans'] leading-[1.75] text-black">
                    We are dedicated to supporting our customers throughout
                    their journey, from purchase to daily use and beyond.
                    Through responsive customer service, educational resources,
                    and aftercare support, we will ensure our customers feel
                    valued and equipped to enjoy our solutions' benefits fully.
                  </p>
                </div>
              </div>
              <p className="text-md text-center md:text-left sm:text-[14px] font-['Open_Sans'] leading-[1.8] sm:leading-[1.75] text-black mt-2">
                Focusing on these pillars will transform aspirational living
                into a reality for every space, continuously elevating everyday
                experiences.
              </p>
            </div>
            <div
              className={
                isMobile
                  ? "w-1/2 mx-auto order-1"
                  : "w-full my-auto md:w-[30%] flex-shrink-0 order-1 md:order-2"
              }
            >
              <img
                src="images/section/haneri_Mission_Image.jpg"
                alt="Mission"
                className="w-full h-auto rounded-md object-cover"
              />
            </div>
          </div>
        </section>

        {/* --- Section 7: Values (Index 6) --- */}
        <section
          id="values"
          className="relative w-full  flex items-center justify-center bg-white/80 backdrop-blur-sm py-8"
        >
          <div className="flex flex-col md:flex-row gap-8 items-start max-w-6xl w-full px-4">
            <div className="w-full md:flex-1 flex flex-col gap-4 order-2 md:order-1">
              <h3 className="text-[32px] text-center md:text-left sm:text-[34px] font-light font-['Barlow_Condensed'] text-[#00473E] mb-2">
                Our Values
              </h3>
              <div className="space-y-3">
                <div className="text-center md:text-left">
                  <h4 className="text-[18px] text-[#CA5D27] font-['Barlow_Condensed'] font-semibold mb-1">
                    Human-Centric Design
                  </h4>
                  <p className="text-[13px] font-['Open_Sans'] leading-[1.75] text-black">
                    We focus on creating products that are intuitive, inclusive,
                    and designed with real people in mind.
                  </p>
                </div>
                <div className="text-center md:text-left">
                  <h4 className="text-[18px] text-[#CA5D27] font-['Barlow_Condensed'] font-semibold mb-1">
                    Excellence in Quality
                  </h4>
                  <p className="text-[13px] font-['Open_Sans'] leading-[1.75] text-black">
                    We uphold the highest standards of craftsmanship, using
                    durable materials for products that stand the test of time.
                  </p>
                </div>
                <div className="text-center md:text-left">
                  <h4 className="text-[18px] text-[#CA5D27] font-['Barlow_Condensed'] font-semibold mb-1">
                    Accessibility and Inclusivity
                  </h4>
                  <p className="text-[13px] font-['Open_Sans'] leading-[1.75] text-black">
                    We believe luxury should be attainable for everyone,
                    creating products that suit diverse lifestyles, needs, and
                    budgets.
                  </p>
                </div>
                <div className="text-center md:text-left">
                  <h4 className="text-[18px] text-[#CA5D27] font-['Barlow_Condensed'] font-semibold mb-1">
                    Responsiveness to Consumer Needs
                  </h4>
                  <p className="text-[13px] font-['Open_Sans'] leading-[1.75] text-black">
                    We listen and adapt to our customers' needs, ensuring a
                    seamless experience from purchase through long-term use.
                  </p>
                </div>
                <div className="text-center md:text-left">
                  <h4 className="text-[18px] text-[#CA5D27] font-['Barlow_Condensed'] font-semibold mb-1">
                    Transparency and Integrity
                  </h4>
                  <p className="text-[13px] font-['Open_Sans'] leading-[1.75] text-black">
                    We operate with honesty and accountability, building trust
                    through clear communication and ethical practices.
                  </p>
                </div>
                <div className="text-center md:text-left">
                  <h4 className="text-[18px] text-[#CA5D27] font-['Barlow_Condensed'] font-semibold mb-1">
                    Sustainability and Responsibility
                  </h4>
                  <p className="text-[13px] font-['Open_Sans'] leading-[1.75] text-black">
                    We are committed to minimizing our environmental impact,
                    choosing sustainable materials and processes to create a
                    positive impact for future generations.
                  </p>
                </div>
              </div>
            </div>
            <div
              className={
                isMobile
                  ? "w-1/2 mx-auto order-1"
                  : "w-full my-auto md:w-[30%] flex-shrink-0 order-1 md:order-2"
              }
            >
              <img
                src="images/section/Haneri_heart_Image.jpg"
                alt="Values"
                className="w-full h-auto rounded-md object-cover"
              />
            </div>
          </div>
        </section>

        {/* --- Section 8: The Haneri Promise (Index 7) --- */}
        <section
          id="promise"
          className="relative w-full  flex items-center justify-center bg-white/80 backdrop-blur-sm py-8"
        >
          {isMobile ? (
            <div className="w-full max-w-[90%] mx-auto overflow-hidden rounded-lg shadow-lg bg-[#4F5D44]">
              <div className="relative w-full h-[200px]">
                <img
                  src="images/about_top_last.png"
                  alt="The Haneri Promise"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6 text-center">
                <h2 className="text-white text-[24px] font-light font-['Barlow_Condensed'] mb-3">
                  THE HANERI PROMISE
                </h2>
                <p className="text-white mb-3 text-[14px] leading-[1.75]">
                  Every product we create is a reflection of our passion for
                  design, precision, and purpose.
                </p>
                <p className="text-white mb-4 text-[14px] leading-[1.75]">
                  We promise innovation that lasts, experiences that inspire,
                  and quality that defines every space you live in.
                </p>
                <a
                  href="shop"
                  className="inline-block bg-white text-[#2b2b2b] font-semibold text-xs font-['Open_Sans'] uppercase tracking-[0.4px] py-2.5 px-4 no-underline transition-all duration-[0.25s] border-2 border-white hover:bg-transparent hover:text-white hover:border-white"
                >
                  Explore Products
                </a>
              </div>
            </div>
          ) : (
            <div className="relative w-full max-w-[80%] overflow-hidden rounded-lg shadow-lg h-[520px]">
              <img
                src="images/about_top_last.png"
                alt="The Haneri Promise"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div
                className="absolute inset-0"
                style={{
                  background: `linear-gradient(90deg, rgba(17,28,21,.75) 0%, rgba(17,28,21,.5) 50%, rgba(17,28,21,.2) 100%),
                    radial-gradient(1000px 100% at 0% 0%, rgba(15,40,25,.4) 0%, rgba(15,40,25,0) 60%)`,
                }}
              ></div>
              <div className="absolute inset-0 flex items-center justify-start">
                <div className="max-w-xl w-full px-12">
                  <h2 className="text-white text-[42px] font-light font-['Barlow_Condensed'] mb-4">
                    THE HANERI PROMISE
                  </h2>
                  <p className="text-white mb-4 text-[16px] leading-[1.8]">
                    Every product we create is a reflection of our passion for
                    design, precision, and purpose.
                  </p>
                  <p className="text-white mb-6 text-[16px] leading-[1.8]">
                    We promise innovation that lasts, experiences that inspire,
                    and quality that defines every space you live in.
                  </p>
                  <a
                    href="shop"
                    className="inline-block bg-white text-[#2b2b2b] font-semibold text-xs font-['Open_Sans'] uppercase tracking-[0.4px] py-2.5 px-4 no-underline transition-all duration-[0.25s] border-2 border-white hover:bg-[#00473E] hover:text-white hover:border-white"
                  >
                    Explore Products
                  </a>
                </div>
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
