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
      // Fade-in + Slide animation when hero section enters viewport
      gsap.from(headingRef.current, {
        y: 40,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%", // जब viewport में आये तब
        },
      });

      gsap.from(subheadingRef.current, {
        y: 40,
        opacity: 0,
        duration: 1,
        delay: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        },
      });

      gsap.from(buttonRef.current, {
        scale: 0.8,
        opacity: 0,
        duration: 0.8,
        delay: 0.3,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%",
        },
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

        <button onClick={()=>scrollRef("contact")} className={styles.ctaButton} ref={buttonRef}>
          Explore Products
        </button>
      </div>
    </div>
  );
}
