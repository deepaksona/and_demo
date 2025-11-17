"use client";

import { useEffect, useState, useRef } from "react";
import Lottie from "lottie-react";
import styles from "./contact.module.css";
import { lotties } from "@/app/utilities/assets_path/assets_path";
import { gsap } from "gsap";

export default function Contact() {
  const [animation, setAnimation] = useState(null);

  const sectionRef = useRef(null);
  const lottieRef = useRef(null);
  const formRef = useRef(null);
  const inputsRef = useRef([]);

  // Load lottie JSON
  useEffect(() => {
    fetch(lotties.contact)
      .then((res) => res.json())
      .then((data) => setAnimation(data));
  }, []);

  // ⭐ IntersectionObserver + GSAP animations
  useEffect(() => {
    if (!sectionRef.current) return;

    const elements = [
      { el: lottieRef.current, delay: 0 },
      { el: formRef.current, delay: 0.1 },
      ...inputsRef.current.map((input, i) => ({
        el: input,
        delay: 0.2 + i * 0.08,
      })),
    ];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          elements.forEach((item) => {
            if (!item.el) return;

            gsap.fromTo(
              item.el,
              { opacity: 0, y: 15 },
              {
                opacity: 1,
                y: 0,
                duration: 0.6,
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
  }, [animation]);

  return (
    <div className={styles.contactSection} ref={sectionRef}>
      
      {/* LOTTIE BOX */}
      <div className={styles.lottieBox} ref={lottieRef}>
        {animation && (
          <Lottie animationData={animation} loop className={styles.lottieAnim} />
        )}
      </div>

      {/* FORM BOX */}
      <div className={styles.formBox} ref={formRef}>
        <h2 className={styles.title}>Get in Touch With Us</h2>
        <p className={styles.subtitle}>
          Have questions? Send us a message and our team will reach out shortly.
        </p>

        <form>
          {["Your Name", "Email Address", "Your Mobile Number", "Company Name"].map(
            (placeholder, i) => (
              <input
                key={i}
                ref={(el) => (inputsRef.current[i] = el)}
                type="text"
                placeholder={placeholder}
              />
            )
          )}

          <textarea
            ref={(el) => (inputsRef.current[4] = el)}
            placeholder="Your Message"
          ></textarea>

          <button
            type="submit"
            ref={(el) => (inputsRef.current[5] = el)}
          >
            Send Inquiry
          </button>
        </form>
      </div>
    </div>
  );
}
