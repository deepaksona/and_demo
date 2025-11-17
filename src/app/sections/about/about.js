"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { images } from "@/app/utilities/assets_path/assets_path";
import styles from "./about.module.css";

export default function About({ scrollRef }) {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const elements = [
      { el: titleRef.current, delay: 0 },
      { el: subtitleRef.current, delay: 0.12 },
      { el: imageRef.current, delay: 0.22 },
    ];

    // Intersection Observer + GSAP
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          elements.forEach((item) => {
            gsap.fromTo(
              item.el,
              { opacity: 0, y: 20 },
              {
                opacity: 1,
                y: 0,
                duration: 0.7,
                delay: item.delay,
                ease: "power2.out",
              }
            );
          });

          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.2 }
    );

    observer.observe(sectionRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <div className={styles.aboutSection} ref={sectionRef}>
      <div className={styles.textContent}>
        <h2 className={styles.title} ref={titleRef}>
          Who We Are
        </h2>

        <p className={styles.subtitle} ref={subtitleRef}>
          A&D Global Trader is a full-service trading company dedicated to simplifying 
          product sourcing for businesses across India. We connect Indian buyers with 
          reliable manufacturers and wholesalers, ensuring access to high-quality 
          products at competitive prices.
          <br /><br />
          We manage the complete process—supplier verification, product sourcing, 
          quality checks, documentation, logistics coordination, and safe delivery—so 
          Indian businesses can focus on selling rather than struggling with supply 
          chain issues. Our goal is to provide transparent, dependable, and hassle-free 
          trade solutions tailored to the Indian market.
        </p>
      </div>

      <img
        ref={imageRef}
        className={styles.imageContent}
        src={images.team}
        alt="Our Team"
      />
    </div>
  );
}
