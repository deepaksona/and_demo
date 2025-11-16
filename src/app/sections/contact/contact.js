"use client";

import { useEffect, useState, useRef } from "react";
import Lottie from "lottie-react";
import styles from "./contact.module.css";
import { lotties } from "@/app/utilities/assets_path/assets_path";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const [animation, setAnimation] = useState(null);

  const sectionRef = useRef(null);
  const lottieRef = useRef(null);
  const formRef = useRef(null);

  const inputsRef = useRef([]);

  // Load lottie (doesn't block UI)
  useEffect(() => {
    fetch(lotties.contact)
      .then((res) => res.json())
      .then((data) => setAnimation(data));
  }, []);

  // ⭐ SUPER SAFE MOBILE ANIMATIONS
  useEffect(() => {
    if (!sectionRef.current) return;

    setTimeout(() => ScrollTrigger.refresh(), 120);

    // LOTTIE fade
    gsap.from(lottieRef.current, {
      opacity: 0,
      y: 20,
      duration: 0.7,
      ease: "power2.out",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 92%",
        once: true,
      },
    });

    // FORM box
    gsap.from(formRef.current, {
      opacity: 0,
      y: 15,
      duration: 0.7,
      delay: 0.1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 90%",
        once: true,
      },
    });

    // INPUTS (no opacity → mobile fix)
    gsap.from(inputsRef.current, {
      y: 10,
      duration: 0.5,
      stagger: 0.08,
      delay: 0.2,
      ease: "power1.out",
      scrollTrigger: {
        trigger: formRef.current,
        start: "top 88%",
        once: true,
      },
    });
  }, []);

  return (
    <div className={styles.contactSection} ref={sectionRef}>
      <div className={styles.lottieBox} ref={lottieRef}>
        {animation && (
          <Lottie animationData={animation} loop className={styles.lottieAnim} />
        )}
      </div>

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
