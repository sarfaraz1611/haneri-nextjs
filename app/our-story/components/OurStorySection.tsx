"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
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

// 1. CONFIGURATION: Map URL Hash IDs to Section Indices
// Example: connecting /about#mission to Slide 5
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
  onShowFooter,
  onHideFooter,
}: OurStorySectionProps) {
  // -- Refs --
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionsRef = useRef<HTMLElement[]>([]);
  const outerWrappersRef = useRef<HTMLDivElement[]>([]);
  const innerWrappersRef = useRef<HTMLDivElement[]>([]);
  const currentIndexRef = useRef(-1);
  const animatingRef = useRef(false);

  // Ref to hold the navigation function so we can access it outside the GSAP effect
  const gotoSectionRef = useRef<
    ((index: number, direction: number) => void) | null
  >(null);

  // -- State --
  const [isMobile, setIsMobile] = useState(false);
  const [hash, setHash] = useState("");


  // 2. LISTEN FOR URL HASH CHANGES
  // This detects when a user clicks a Navbar link while already on the page
  useEffect(() => {
    // Set initial hash
    if (typeof window !== "undefined") {
      setHash(window.location.hash.replace("#", ""));
    }

    const handleHashChange = () => {
      setHash(window.location.hash.replace("#", ""));
    };

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  // 3. CHECK FOR MOBILE VIEWPORT
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // 4. MAIN GSAP SCROLL LOGIC (Desktop Only)
  useEffect(() => {
    if (!containerRef.current || isMobile) return;

    const sections = sectionsRef.current.filter(Boolean);
    const outerWrappers = outerWrappersRef.current.filter(Boolean);
    const innerWrappers = innerWrappersRef.current.filter(Boolean);
    const totalSections = sections.length;

    if (totalSections === 0) return;

    // -- Initial State --
    gsap.set(outerWrappers, { yPercent: 100 });
    gsap.set(innerWrappers, { yPercent: -100 });

    // -- The Navigation Function --
    const gotoSection = (index: number, direction: number) => {
      // Prevent going out of bounds
      index = Math.max(0, Math.min(index, totalSections - 1));

      // Prevent animating to the same section
      if (index === currentIndexRef.current) return;

      animatingRef.current = true;

      const fromTop = direction === -1;
      const dFactor = fromTop ? -1 : 1;

      const tl = gsap.timeline({
        defaults: { duration: 1.25, ease: "power1.inOut" },
        onComplete: () => {
          animatingRef.current = false;
        },
      });

      // Fade out current section if valid
      if (
        currentIndexRef.current >= 0 &&
        currentIndexRef.current < totalSections
      ) {
        gsap.set(sections[currentIndexRef.current], { zIndex: 0 });
        tl.set(sections[currentIndexRef.current], { autoAlpha: 0 });
      }

      // Prepare next section
      gsap.set(sections[index], { autoAlpha: 1, zIndex: 1 });

      // Animate next section
      tl.fromTo(
        [outerWrappers[index], innerWrappers[index]],
        {
          yPercent: (i) => (i ? -100 * dFactor : 100 * dFactor),
        },
        {
          yPercent: 0,
        },
        0
      );

      currentIndexRef.current = index;
    };

    // Store function in ref for access by hash listener
    gotoSectionRef.current = gotoSection;

    // -- Scroll/Swipe Observer --
    const observer = Observer.create({
      type: "wheel,touch,pointer",
      wheelSpeed: -1,
      onDown: () =>
        !animatingRef.current && gotoSection(currentIndexRef.current - 1, -1),
      onUp: () =>
        !animatingRef.current && gotoSection(currentIndexRef.current + 1, 1),
      tolerance: 10,
      preventDefault: true,
    });

    // -- Keyboard Navigation --
    const handleKeyDown = (e: KeyboardEvent) => {
      if (animatingRef.current) return;
      if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
        gotoSection(currentIndexRef.current - 1, -1);
      } else if (e.key === "ArrowDown" || e.key === "ArrowRight") {
        gotoSection(currentIndexRef.current + 1, 1);
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    // -- Handle Page Load with Hash --
    const initialHash = window.location.hash.replace("#", "");
    const initialIndex =
      SECTION_IDS[initialHash] !== undefined ? SECTION_IDS[initialHash] : 0;

    // Jump to initial section immediately
    gotoSection(initialIndex, 1);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      if (observer) observer.kill();
    };
  }, [onShowFooter, onHideFooter, isMobile]); // Effect dependency array

  // 5. REACT TO HASH CHANGES (Dynamic Navigation)
  useEffect(() => {
    // Only run if not mobile and the GSAP function is ready
    if (isMobile || !gotoSectionRef.current || animatingRef.current) return;

    const targetIndex = SECTION_IDS[hash];

    // If valid hash and not current section, navigate
    if (targetIndex !== undefined && targetIndex !== currentIndexRef.current) {
      const direction = targetIndex > currentIndexRef.current ? 1 : -1;
      gotoSectionRef.current(targetIndex, direction);
    }
  }, [hash, isMobile]); // Runs whenever 'hash' state updates

  // Hide footer globally for this page
  useEffect(() => {
    onHideFooter?.();
  }, [onHideFooter]);

  // -- RENDER --
  return (
    <div
      ref={containerRef}
      className={`relative w-full ${
        isMobile ? "overflow-visible" : "overflow-hidden"
      }`}
      style={
        isMobile
          ? { paddingTop: "80px" }
          : { height: "100vh", paddingTop: "80px" }
      }
    >
      {/* Background Image with Blur (Desktop only) */}
      {!isMobile && (
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
      )}

      {/* --- Section 1: About top_block (Index 0) --- */}
      <section
        id="top"
        ref={(el) => {
          if (el) sectionsRef.current[0] = el;
        }}
        className={
          isMobile
            ? "relative w-full py-8"
            : "absolute inset-0 w-full h-full opacity-0 invisible z-10"
        }
      >
        <div
          ref={(el) => {
            if (el) outerWrappersRef.current[0] = el;
          }}
          className={
            isMobile
              ? "relative w-full"
              : "outer absolute inset-0 overflow-hidden z-10"
          }
        >
          <div
            ref={(el) => {
              if (el) innerWrappersRef.current[0] = el;
            }}
            className={
              isMobile
                ? "relative w-full bg-white flex items-center justify-center"
                : "inner absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center"
            }
          >
            <div className="container w-full px-4 py-8 text-center max-w-6xl">
              <h1 className="text-[20px] sm:text-[42px] text-[#00473E] leading-none font-medium mb-5">
                Designing Tomorrow's Comfort
              </h1>
              <p className="text-base sm:text-[14px] text-black leading-[1.6] sm:leading-[1.75] max-w-[450px] mx-auto mb-8 font-['Open_Sans']">
                Thoughtful innovation, enduring quality, and timeless design -
                crafted to elevate everyday living.
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
      <section
        id="heart"
        ref={(el) => {
          if (el) sectionsRef.current[1] = el;
        }}
        className={
          isMobile
            ? "relative w-full"
            : "absolute inset-0 w-full h-full opacity-0 invisible"
        }
      >
        <div
          ref={(el) => {
            if (el) outerWrappersRef.current[1] = el;
          }}
          className={
            isMobile
              ? "relative w-full"
              : "outer absolute inset-0 overflow-hidden"
          }
        >
          <div
            ref={(el) => {
              if (el) innerWrappersRef.current[1] = el;
            }}
            className={
              isMobile
                ? "relative w-full bg-white flex items-center justify-center"
                : "inner absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center"
            }
          >
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
                  Haneri represents a legacy of craftsmanship where technology
                  meets timeless aesthetics. Each product is a reflection of our
                  commitment to innovation, quality, and purposeful design —
                  created to enhance the way people experience their spaces.
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
      <section
        id="sustainability"
        ref={(el) => {
          if (el) sectionsRef.current[2] = el;
        }}
        className={
          isMobile
            ? "relative w-full py-8"
            : "absolute inset-0 w-full h-full opacity-0 invisible"
        }
      >
        <div
          ref={(el) => {
            if (el) outerWrappersRef.current[2] = el;
          }}
          className={
            isMobile
              ? "relative w-full"
              : "outer absolute inset-0 overflow-hidden"
          }
        >
          <div
            ref={(el) => {
              if (el) innerWrappersRef.current[2] = el;
            }}
            className={
              isMobile
                ? "relative w-full flex items-center justify-center"
                : "inner absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center"
            }
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
                  From energy-efficient technology to recyclable packaging and
                  ethically driven manufacturing practices, every Haneri process
                  embodies our unwavering commitment to a cleaner, smarter, and
                  more responsible tomorrow.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- Section 4: Innovation (Index 3) --- */}
      <section
        id="innovation"
        ref={(el) => {
          if (el) sectionsRef.current[3] = el;
        }}
        className={
          isMobile
            ? "relative w-full py-8"
            : "absolute inset-0 w-full h-full opacity-0 invisible"
        }
      >
        <div
          ref={(el) => {
            if (el) outerWrappersRef.current[3] = el;
          }}
          className={
            isMobile
              ? "relative w-full"
              : "outer absolute inset-0 overflow-hidden"
          }
        >
          <div
            ref={(el) => {
              if (el) innerWrappersRef.current[3] = el;
            }}
            className={
              isMobile
                ? "relative w-full bg-white flex items-center justify-center p-4"
                : "inner absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center p-4"
            }
          >
            <div className="w-full max-w-6xl">
              <h1 className="text-[24px] sm:text-[42px] text-[#00473E] leading-none font-medium text-center mb-5">
                Innovation and Design Philosophy
              </h1>
              <p className="text-base text-[14px] text-black leading-[1.6] sm:leading-[1.75] max-w-[650px] mx-auto mb-8 text-center font-['Open_Sans']">
                Every Haneri product begins with a simple idea — to make
                technology intuitive and design effortless. Our design
                philosophy combines technical precision, aesthetic balance, and
                human understanding.
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
          </div>
        </div>
      </section>

      {/* --- Section 5: Vision (Index 4) --- */}
      <section
        id="vision"
        ref={(el) => {
          if (el) sectionsRef.current[4] = el;
        }}
        className={
          isMobile
            ? "relative w-full py-8"
            : "absolute inset-0 w-full h-full opacity-0 invisible"
        }
      >
        <div
          ref={(el) => {
            if (el) outerWrappersRef.current[4] = el;
          }}
          className={
            isMobile
              ? "relative w-full"
              : "outer absolute inset-0 overflow-hidden"
          }
        >
          <div
            ref={(el) => {
              if (el) innerWrappersRef.current[4] = el;
            }}
            className={
              isMobile
                ? "relative w-full bg-white flex items-center justify-center p-4"
                : "inner absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center p-4"
            }
          >
            <div className="flex flex-col md:flex-row gap-8 items-center max-w-6xl w-full">
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
                  luxury solutions blending exceptional quality with an
                  inclusive design that elevates everyday experiences for
                  everyone.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- Section 6: Mission (Index 5) --- */}
      <section
        id="mission"
        ref={(el) => {
          if (el) sectionsRef.current[5] = el;
        }}
        className={
          isMobile
            ? "relative w-full py-8"
            : "absolute inset-0 w-full h-full opacity-0 invisible"
        }
      >
        <div
          ref={(el) => {
            if (el) outerWrappersRef.current[5] = el;
          }}
          className={
            isMobile
              ? "relative w-full"
              : "outer absolute inset-0 overflow-hidden"
          }
        >
          <div
            ref={(el) => {
              if (el) innerWrappersRef.current[5] = el;
            }}
            className={
              isMobile
                ? "relative w-full bg-white flex items-center justify-center p-4"
                : "inner absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center p-4"
            }
          >
            <div className="flex flex-col md:flex-row gap-8 items-center max-w-6xl w-full">
              <div className="w-full md:flex-1 order-2 md:order-1">
                <h3 className="text-[32px] text-center md:text-left sm:text-[34px] font-light font-['Barlow_Condensed'] text-[#00473E] mb-4">
                  Our Mission
                </h3>
                <p className="text-md text-center md:text-left sm:text-[14px] font-['Open_Sans'] leading-[1.8] sm:leading-[1.75] text-black">
                  We will achieve our mission through thoughtful design, lasting
                  quality, inclusive pricing, and exceptional customer
                  care—making luxury accessible and elevating everyday living
                  for all.
                </p>
              </div>
              <div
                className={
                  isMobile ? "w-1/2" : "w-full md:w-[35%] order-1 md:order-2"
                }
              >
                <img
                  src="images/section/haneri_Mission_Image.jpg"
                  alt="Mission"
                  className="w-full h-auto rounded-md object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- Section 7: Values (Index 6) --- */}
      <section
        id="values"
        ref={(el) => {
          if (el) sectionsRef.current[6] = el;
        }}
        className={
          isMobile
            ? "relative w-full py-8"
            : "absolute inset-0 w-full h-full opacity-0 invisible"
        }
      >
        <div
          ref={(el) => {
            if (el) outerWrappersRef.current[6] = el;
          }}
          className={
            isMobile
              ? "relative w-full"
              : "outer absolute inset-0 overflow-hidden"
          }
        >
          <div
            ref={(el) => {
              if (el) innerWrappersRef.current[6] = el;
            }}
            className={
              isMobile
                ? "relative w-full bg-white flex items-center justify-center p-4"
                : "inner absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center p-4"
            }
          >
            <div className="flex flex-col md:flex-row gap-8 items-center max-w-6xl w-full">
              <div
                className={
                  isMobile ? "w-1/2" : "w-full md:w-[35%] order-1 md:order-2"
                }
              >
                <img
                  src="images/section/Haneri_heart_Image.jpg"
                  alt="Values"
                  className="w-full h-auto rounded-md object-cover"
                />
              </div>
              <div className="w-full md:flex-1">
                <h3 className="text-[32px] text-center md:text-left sm:text-[34px] font-light font-['Barlow_Condensed'] text-[#00473E] mb-4">
                  Our Values
                </h3>
                <p className="text-md text-center md:text-left sm:text-[14px] font-['Open_Sans'] leading-[1.8] sm:leading-[1.75] text-black">
                  We focus on human-centric, intuitive design, lasting quality,
                  and accessible luxury for all lifestyles. With a commitment to
                  transparency, responsiveness, and sustainability, we create
                  thoughtful, ethical, and enduring solutions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- Section 8: The Haneri Promise (Index 7) --- */}
      <section
        id="promise"
        ref={(el) => {
          if (el) sectionsRef.current[7] = el;
        }}
        className={
          isMobile
            ? "relative w-full py-8"
            : "absolute inset-0 w-full h-full opacity-0 invisible"
        }
      >
        <div
          ref={(el) => {
            if (el) outerWrappersRef.current[7] = el;
          }}
          className={
            isMobile
              ? "relative w-full"
              : "outer absolute inset-0 overflow-hidden"
          }
        >
          <div
            ref={(el) => {
              if (el) innerWrappersRef.current[7] = el;
            }}
            className={
              isMobile
                ? "relative w-full flex items-center justify-center p-4 sm:p-2"
                : "inner absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-2"
            }
          >
            <div className="relative w-full max-w-[80%] overflow-hidden rounded-lg shadow-lg h-[500px] sm:h-[400px] md:h-[520px]">
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
                <div className="max-w-xl w-full px-8 md:px-12 sm:px-6">
                  <h2 className="text-white text-[28px] md:text-[42px] sm:text-[28px] font-light font-['Barlow_Condensed'] mb-4 sm:mb-3">
                    THE HANERI PROMISE
                  </h2>
                  <p className="text-white mb-4 sm:mb-3 text-[14px] md:text-[16px] sm:text-[14px] leading-[1.8] sm:leading-[1.75]">
                    Every product we create is a reflection of our passion for
                    design, precision, and purpose.
                  </p>
                  <p className="text-white mb-6 sm:mb-4 text-[14px] md:text-[16px] sm:text-[14px] leading-[1.8] sm:leading-[1.75]">
                    We promise innovation that lasts, experiences that inspire,
                    and quality that defines every space you live in.
                  </p>
                  <a
                    href="shop.php"
                    className="inline-block bg-white text-[#2b2b2b] font-semibold text-xs font-['Open_Sans'] uppercase tracking-[0.4px] py-2.5 px-4 sm:py-2 sm:px-3 no-underline transition-all duration-[0.25s] border-2 border-white hover:bg-[#00473E] hover:text-white hover:border-white"
                  >
                    Explore Products
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- Scroll Indicator (Desktop Only) --- */}
      {!isMobile && (
        <div className="fixed bottom-14 left-1/2 transform -translate-x-1/2 z-40 text-center text-[#00473E] animate-bounce">
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
        </div>
      )}
    </div>
  );
}
