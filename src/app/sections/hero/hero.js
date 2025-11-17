import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import styles from "./hero.module.css";

export default function Hero({ scrollRef }) {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const subheadingRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    const elements = [
      { ref: headingRef, y: 35, delay: 0 },
      { ref: subheadingRef, y: 30, delay: 0.15 },
      { ref: buttonRef, scale: 0.85, delay: 0.25 },
    ];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            elements.forEach((el) => {
              if (entry.target === sectionRef.current) {
                gsap.fromTo(
                  el.ref.current,
                  {
                    opacity: 0,
                    y: el.y || 0,
                    scale: el.scale || 1,
                  },
                  {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 0.9,
                    delay: el.delay,
                    ease: "power3.out",
                  }
                );
              }
            });

            observer.unobserve(entry.target); // Runs only once
          }
        });
      },
      { threshold: 0.2 } // 20% visible → animate
    );

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <div className={styles.heroSection} ref={sectionRef}>
      <div className={styles.heroBanner}>
        <video autoPlay loop muted playsInline className={styles.heroVideo}>
          <source src="/video/banner.mp4" type="video/mp4" />
        </video>

        <div className={styles.heading} ref={headingRef}>
          Connecting the World With Quality Products & Trusted Trade
        </div>

        <div className={styles.subheading} ref={subheadingRef}>
          A&D Global Trader brings buyers and suppliers together on one secure
          platform. Discover verified manufacturers, competitive pricing, and
          smooth global shipping all in one place.
        </div>

        <button
          onClick={() => scrollRef("contact")}
          className={styles.ctaButton}
          ref={buttonRef}
        >
          Explore Products
        </button>
      </div>
    </div>
  );
}
