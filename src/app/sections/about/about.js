"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { images } from "@/app/utilities/assets_path/assets_path";
import styles from "./about.module.css";

gsap.registerPlugin(ScrollTrigger);

export default function About({ scrollRef }) {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // ⭐ Mobile safe trigger fix
      setTimeout(() => ScrollTrigger.refresh(), 200);

      // Title Animation
      gsap.from(titleRef.current, {
        opacity: 0,
        y: 25,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 95%",
          once: true,
        },
      });

      // Subtitle animation
      gsap.from(subtitleRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.9,
        delay: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 92%",
          once: true,
        },
      });

      // Image animation
      gsap.from(imageRef.current, {
        opacity: 0,
        x: 40,
        duration: 1,
        delay: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 90%",
          once: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className={styles.aboutSection} ref={sectionRef}>
      <div className={styles.textContent}>
        <h2 className={styles.title} ref={titleRef}>
          Who We Are
        </h2>

        <p className={styles.subtitle} ref={subtitleRef}>
          A&D Global Trader is a full-service trading company dedicated to simplifying product sourcing for businesses across India. We connect Indian buyers with reliable manufacturers and wholesalers, ensuring access to high-quality products at competitive prices. Our network covers a wide range of categories, including electronics, home goods, kitchenware, industrial equipment, packaging materials, and daily-use consumer products.
          <br /><br />
          We manage the complete process—supplier verification, product sourcing, quality checks, documentation, logistics coordination, and safe delivery—so Indian businesses can focus on selling rather than struggling with supply chain issues. Our goal is to provide transparent, dependable, and hassle-free trade solutions tailored to the Indian market.
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
