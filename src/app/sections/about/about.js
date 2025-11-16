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
  if (!sectionRef.current) return;

  const img = sectionRef.current.querySelector(`.${styles.imageContent}`);

  function startAnim() {
    setTimeout(() => ScrollTrigger.refresh(), 150);

    gsap.from(titleRef.current, {
      opacity: 0,
      y: 20,
      duration: 0.8,
      ease: "power3.out",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 96%",
        once: true,
      },
    });

    gsap.from(subtitleRef.current, {
      opacity: 0,
      y: 18,
      duration: 0.9,
      delay: 0.1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 95%",
        once: true,
      },
    });

    gsap.from(imageRef.current, {
      opacity: 0,
      x: 30,
      duration: 1,
      delay: 0.15,
      ease: "power3.out",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 93%",
        once: true,
      },
    });
  }


  if (img.complete) startAnim();
  else img.onload = startAnim;

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
