import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./hero.module.css";

gsap.registerPlugin(ScrollTrigger);

export default function Hero({ scrollRef }) {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const subheadingRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      
      // ⭐ IMPORTANT: Delay GSAP init so mobile height issues fix ho jaye
      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 200);

      // ⭐ Universal animation settings (mobile safe)
      const common = {
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 95%",       // ⭐ Mobile-friendly trigger
          toggleActions: "play none none none",
          once: true              // ⭐ Only once → no lag
        }
      };

      // Heading Animation
      gsap.from(headingRef.current, {
        y: 35,
        opacity: 0,
        ...common
      });

      // Subheading Animation
      gsap.from(subheadingRef.current, {
        y: 30,
        opacity: 0,
        delay: 0.15,
        ...common
      });

      // Button Animation
      gsap.from(buttonRef.current, {
        scale: 0.85,
        opacity: 0,
        delay: 0.25,
        ease: "back.out(1.8)",
        ...common
      });
    }, sectionRef);

    return () => ctx.revert(); // Cleanup
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
          A&D Global Trader brings buyers and suppliers together on one secure platform. Discover verified manufacturers, competitive pricing, and smooth global shipping all in one place.
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
