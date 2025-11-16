"use client";
import { useEffect, useState, useRef } from "react";
import styles from "./testimonial.module.css";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export default function Testimonial() {
  const testimonials = [
    { name: "Rahul Mehta", company: "Mehta Electronics, Mumbai", picture: "/team.webp", message: `A&D Global Trader has completely changed the way we source products.` },
    { name: "Sana Khan", company: "Khan Home & Living, Delhi", picture: "/team.webp", message: `Finding dependable suppliers used to be a challenge.` },
    { name: "Rohit Sharma", company: "RS Retail Solutions, Bangalore", picture: "/team.webp", message: `Their global supplier network helped us.` },
    { name: "Neha Verma", company: "Urban Style Apparel, Jaipur", picture: "/team.webp", message: `We source fashion accessories regularly.` },
    { name: "Amit Patel", company: "Patel Industrial Tools, Ahmedabad", picture: "/team.webp", message: `Quality checks saved us from risky purchases.` },
  ];

  const [current, setCurrent] = useState(0);

  // ⭐ Auto slide
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  // ⭐ GSAP optimized for mobile
  const sectionRef = useRef(null);

  useEffect(() => {
  if (!sectionRef.current) return;

  
  const imgs = Array.from(
    sectionRef.current.querySelectorAll("img")
  );

  let loaded = 0;

  function startAnim() {
    setTimeout(() => ScrollTrigger.refresh(), 150);

    gsap.from(sectionRef.current, {
      opacity: 0,
      y: 25,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 96%", // mobile-friendly
        once: true,
      },
    });
  }

  // If NO images → run animation immediately
  if (imgs.length === 0) {
    startAnim();
    return;
  }

  // Check image loading
  imgs.forEach((img) => {
    if (img.complete) {
      loaded++;
      if (loaded === imgs.length) startAnim();
    } else {
      img.onload = () => {
        loaded++;
        if (loaded === imgs.length) startAnim();
      };
    }
  });
}, []);


  return (
    <div className={styles.testimonialSection} ref={sectionRef}>
      <h2 className={styles.heading}>What Our Clients Say</h2>

      <div className={styles.slider}>
        {testimonials.map((t, index) => (
          <div
            key={index}
            className={`${styles.card} ${
              current === index ? styles.active : styles.hidden
            }`}
          >
            <img src={t.picture} alt={t.name} className={styles.avatar} />

            <h3 className={styles.name}>{t.name}</h3>
            <p className={styles.company}>{t.company}</p>
            <p className={styles.message}>“{t.message}”</p>
          </div>
        ))}
      </div>

      <div className={styles.dots}>
        {testimonials.map((_, i) => (
          <span
            key={i}
            className={`${styles.dot} ${current === i ? styles.activeDot : ""}`}
          ></span>
        ))}
      </div>
    </div>
  );
}
