"use client";

import { useEffect, useState, useRef } from "react";
import { gsap } from "gsap";

export default function Preloader() {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [alreadyLoaded, setAlreadyLoaded] = useState(false);
  const logoRef = useRef<HTMLImageElement>(null);

  // Check if preloader has already been shown this session
  useEffect(() => {
    if (sessionStorage.getItem("preloaderShown")) {
      setAlreadyLoaded(true);
      setIsComplete(true);
    }
  }, []);

  useEffect(() => {
    if (alreadyLoaded) return;
    let isMounted = true;
    let progressInterval: NodeJS.Timeout;
    let finalInterval: NodeJS.Timeout;
    let hasStartedCompletion = false;

    // Simulate smooth loading progress
    let currentProgress = 0;
    progressInterval = setInterval(() => {
      if (!isMounted) return;

      if (currentProgress < 90) {
        currentProgress += Math.random() * 15;
        setProgress(Math.min(currentProgress, 90));
      }
    }, 300);

    const completeLoading = () => {
      if (!isMounted || hasStartedCompletion) return;
      hasStartedCompletion = true;
      clearInterval(progressInterval);

      finalInterval = setInterval(() => {
        if (!isMounted) {
          clearInterval(finalInterval);
          return;
        }
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(finalInterval);
            return 100;
          }
          return Math.min(prev + 5, 100);
        });
      }, 50);
    };

    const onLoad = () => setTimeout(completeLoading, 1000);

    if (document.readyState === "complete") {
      setTimeout(completeLoading, 1000);
    } else {
      window.addEventListener("load", onLoad);
    }

    // Fallback: force completion after 4 seconds
    const maxWaitTime = setTimeout(completeLoading, 4000);

    return () => {
      isMounted = false;
      clearInterval(progressInterval);
      clearInterval(finalInterval);
      clearTimeout(maxWaitTime);
      window.removeEventListener("load", onLoad);
    };
  }, [alreadyLoaded]);

  useEffect(() => {
    if (alreadyLoaded) return;
    if (progress >= 100) {
      sessionStorage.setItem("preloaderShown", "true");
      // Small delay before starting exit animation
      const timer = setTimeout(() => {
        const logo = logoRef.current;
        const headerLogo = document.querySelector("header img[alt='Haneri']");

        if (logo && headerLogo) {
          // Get positions
          const logoRect = logo.getBoundingClientRect();
          const headerRect = headerLogo.getBoundingClientRect();

          // Calculate the center points
          const logoCenterX = logoRect.left + logoRect.width / 2;
          const logoCenterY = logoRect.top + logoRect.height / 2;
          const headerCenterX = headerRect.left + headerRect.width / 2;
          const headerCenterY = headerRect.top + headerRect.height / 2;

          // Calculate distance to move from center to center
          const xDiff = headerCenterX - logoCenterX;
          const yDiff = headerCenterY - logoCenterY;
          const scaleRatio = headerRect.height / logoRect.height;

          // Create timeline for smooth animation
          const tl = gsap.timeline({
            onComplete: () => {
              setIsComplete(true);
              document.body.style.overflow = "unset";
            },
          });

          // First fade out everything except logo
          tl.to(".preloader-content", {
            opacity: 0,
            duration: 0.3,
            ease: "power2.inOut",
          });

          // Then animate logo to header position
          tl.to(
            logo,
            {
              x: xDiff,
              y: yDiff,
              scale: scaleRatio,
              duration: 1.2,
              ease: "power3.inOut",
              transformOrigin: "center center",
            },
            "-=0.1"
          );

          // Finally fade out the preloader background
          tl.to(
            ".preloader",
            {
              opacity: 0,
              duration: 0.5,
              ease: "power2.inOut",
            },
            "-=0.4"
          );
        } else {
          // Fallback animation if elements not found
          gsap.to(".preloader", {
            opacity: 0,
            duration: 0.8,
            ease: "power2.inOut",
            onComplete: () => {
              setIsComplete(true);
              document.body.style.overflow = "unset";
            },
          });
        }
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [progress, alreadyLoaded]);

  useEffect(() => {
    if (alreadyLoaded) return;
    // Prevent scrolling while preloader is active
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [alreadyLoaded]);

  if (isComplete) {
    return null;
  }

  return (
    <div className="preloader fixed inset-0 z-[9999] bg-white flex items-center justify-center">
      <div className="text-center">
        {/* Logo */}
        <div className="mb-8">
          <img
            ref={logoRef}
            src="/images/Haneri Logo.png"
            alt="Haneri"
            className="h-16 md:h-24 w-auto mx-auto mb-4"
          />
        </div>

        {/* Progress Content */}
        <div className="preloader-content">
          {/* <p className="text-sm md:text-base text-gray-600 mb-6">
            Loading experience...
          </p> */}

          {/* Progress Bar */}
          <div className="w-64 md:w-80 h-1 bg-gray-200 rounded-full overflow-hidden mx-auto">
            <div
              className="h-full bg-[#CA5D27] transition-all duration-300 ease-out"
              style={{ width: `${Math.min(progress, 100)}%` }}
            />
          </div>

          {/* Progress Percentage */}
          {/* <div className="mt-4 text-lg font-semibold text-[#00473E]">
            {Math.floor(Math.min(progress, 100))}%
          </div> */}

          {/* Loading Animation */}
          {/* <div className="mt-8 flex justify-center gap-2">
            <div
              className="w-2 h-2 bg-[#00473E] rounded-full animate-bounce"
              style={{ animationDelay: "0ms" }}
            />
            <div
              className="w-2 h-2 bg-[#00473E] rounded-full animate-bounce"
              style={{ animationDelay: "150ms" }}
            />
            <div
              className="w-2 h-2 bg-[#00473E] rounded-full animate-bounce"
              style={{ animationDelay: "300ms" }}
            />
          </div> */}
        </div>
      </div>
    </div>
  );
}
