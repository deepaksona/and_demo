"use client";

import { useEffect, useState, useRef } from "react";
import Lottie from "lottie-react";
import styles from "./whyus.module.css";
import { lotties } from "@/app/utilities/assets_path/assets_path";
import { gsap } from "gsap";

export default function Whyus() {
  const [animation, setAnimation] = useState(null);

  const sectionRef = useRef(null);
  const lottieRef = useRef(null);
  const titleRef = useRef(null);
  const listRefs = useRef([]);

  const whyChooseUs = [
    { title: "Verified Suppliers", description: "All manufacturers are carefully checked and approved for quality." },
    { title: "Secure Payments", description: "Your transactions stay protected until you receive your order." },
    { title: "Fast Shipping", description: "Reliable logistics partners ensure safe and timely delivery." },
    { title: "Competitive Pricing", description: "Direct factory sourcing helps you get the best prices." },
    { title: "Dedicated Support", description: "Our team is available 24/7 to assist you throughout the process." }
  ];

  useEffect(() => {
    fetch(lotties.financial)
      .then((res) => res.json())
      .then((data) => setAnimation(data));
  }, []);

  useEffect(() => {
    if (!animation) return;

    const elements = [
      { el: lottieRef.current, delay: 0 },
      { el: titleRef.current, delay: 0.1 },
      ...listRefs.current.map((item, i) => ({
        el: item,
        delay: i * 0.12 + 0.15,
      })),
    ];

    // Intersection Observer (scroll-based trigger)
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          elements.forEach((obj) => {
            gsap.fromTo(
              obj.el,
              { opacity: 0, y: 20 },
              {
                opacity: 1,
                y: 0,
                duration: 0.7,
                delay: obj.delay,
                ease: "power2.out",
              }
            );
          });

          observer.unobserve(entry.target); // run once
        });
      },
      { threshold: 0.2 }
    );

    observer.observe(sectionRef.current);

    return () => observer.disconnect();
  }, [animation]);

  return (
    <div className={styles.whyusSection} ref={sectionRef}>
      <div className={styles.whyusRow}>

        {animation && (
          <div className={styles.lottieWrapper} ref={lottieRef}>
            <Lottie animationData={animation} />
          </div>
        )}

        <div className={styles.textContent}>
          <div className={styles.title} ref={titleRef}>
            Why Trade With A&D Global Trader?
          </div>

          <ul className={styles.textList}>
            {whyChooseUs.map((e, index) => (
              <li
                key={index}
                ref={(el) => (listRefs.current[index] = el)}
                className={styles.textItems}
              >
                <b>{e.title}: </b>
                {e.description}
              </li>
            ))}
          </ul>
        </div>

      </div>
    </div>
  );
}
