"use client";
import { useEffect, useState, useRef } from "react";
import Lottie from "lottie-react";
import styles from "./whyus.module.css";
import { lotties } from "@/app/utilities/assets_path/assets_path";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export default function Whyus() {
  const [animation, setAnimation] = useState(null);

  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const lottieRef = useRef(null);
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
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      
      // ⭐ Fix mobile height issue
      setTimeout(() => ScrollTrigger.refresh(), 200);

      // ⭐ Lottie animation
      gsap.from(lottieRef.current, {
        opacity: 0,
        y: 25,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 95%",   // mobile-friendly
          once: true          // performance boost
        },
      });

      // ⭐ Title
      gsap.from(titleRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.9,
        delay: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 93%",
          once: true
        },
      });

      // ⭐ List Items stagger
      gsap.from(listRefs.current, {
        opacity: 0,
        y: 18,
        duration: 0.7,
        stagger: 0.14,
        ease: "power3.out",
        scrollTrigger: {
          trigger: listRefs.current[0],
          start: "top 92%",
          once: true
        },
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

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
                className={styles.textItems}
                ref={(el) => (listRefs.current[index] = el)}
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
