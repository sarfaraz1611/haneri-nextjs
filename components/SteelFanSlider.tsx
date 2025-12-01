"use client";

import { useEffect, useState } from "react";
import styles from "./SteelFanSlider.module.css";

const steelFanVideos = [
  { id: 1, videoId: "1127430705", title: "rock one 1.2x" },
  { id: 2, videoId: "1127430579", title: "blowup shot" },
  { id: 3, videoId: "1127430600", title: "180 rotate shot" },
  { id: 4, videoId: "1127430626", title: "transparent motor working shot 1.2x" },
  { id: 5, videoId: "1127430662", title: "dark shot" },
  { id: 6, videoId: "1127430683", title: "nut shot 1x" },
];

export default function SteelFanSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    // Simple auto-slider implementation
    const slides = document.querySelectorAll(`.${styles.steelSlide}`);
    const dots = document.querySelectorAll(`.${styles.dot}`);

    const showSlide = (index: number) => {
      slides.forEach((slide, i) => {
        (slide as HTMLElement).style.display = i === index ? 'block' : 'none';
      });
      dots.forEach((dot, i) => {
        if (i === index) {
          dot.classList.add(styles.active);
        } else {
          dot.classList.remove(styles.active);
        }
      });
    };

    showSlide(currentSlide);

    const interval = setInterval(() => {
      setCurrentSlide((prev) => {
        const nextSlide = (prev + 1) % slides.length;
        showSlide(nextSlide);
        return nextSlide;
      });
    }, 6000);

    return () => clearInterval(interval);
  }, [currentSlide]);

  return (
    <section className={styles.steelHero}>
      <div className="container">
        <h2 className="heading_1">Introducing India&apos;s First Stainless Steel Ceiling Fan</h2>

        <div className={styles.steelSlider}>
          {steelFanVideos.map((video) => (
            <div key={video.id} className={styles.steelSlide}>
              <div className={styles.steelVidWrap}>
                <div className={styles.videoContainer}>
                  <iframe
                    src={`https://player.vimeo.com/video/${video.videoId}?autoplay=1&muted=1&loop=1&autopause=0&background=1&playsinline=1&title=0&byline=0&portrait=0&badge=0&controls=0&dnt=1`}
                    style={{ border: 0 }}
                    allow="autoplay; fullscreen; picture-in-picture"
                    referrerPolicy="strict-origin-when-cross-origin"
                    title={video.title}
                  ></iframe>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.dots}>
          {steelFanVideos.map((_, index) => (
            <span key={index} className={styles.dot}></span>
          ))}
        </div>
      </div>
    </section>
  );
}
