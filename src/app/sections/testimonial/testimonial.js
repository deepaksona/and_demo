"use client";
import { useEffect, useState, useRef } from "react";
import styles from "./testimonial.module.css";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export default function Testimonial() {
  const testimonials = [
    { name: "Rahul Mehta", company: "Mehta Electronics, Mumbai", picture: "/team.png", message: `A&D Global Trader has completely changed the way we source products.` },
    { name: "Sana Khan", company: "Khan Home & Living, Delhi", picture: "/team.png", message: `Finding dependable suppliers used to be a challenge.` },
    { name: "Rohit Sharma", company: "RS Retail Solutions, Bangalore", picture: "/team.png", message: `Their global supplier network helped us.` },
    { name: "Neha Verma", company: "Urban Style Apparel, Jaipur", picture: "/team.png", message: `We source fashion accessories regularly.` },
    { name: "Amit Patel", company: "Patel Industrial Tools, Ahmedabad", picture: "/team.png", message: `Quality checks saved us from risky purchases.` },
  ];

  const [current, setCurrent] = useState(0);

  // Auto slide
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  // GSAP fade on scroll (only on section)
  const sectionRef = useRef(null);

  useEffect(() => {
    gsap.from(sectionRef.current, {
      opacity: 0,
      y: 40,
      duration: 1.5,
      ease: "power3.out",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 85%",
      },
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
