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
      // Lottie fade-in
      gsap.from(lottieRef.current, {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
        },
      });

      // Title fade-in
      gsap.from(titleRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      });

      // ⭐ LIST ITEMS (stagger + scroll)
      gsap.from(listRefs.current, {
        opacity: 0,
        y: 20,
        duration: 0.7,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: listRefs.current[0], // ⭐ Trigger first li
          start: "top 90%",             // Comes on scroll
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
