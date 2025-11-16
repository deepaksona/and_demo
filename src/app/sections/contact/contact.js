"use client";

import { useEffect, useState, useRef } from "react";
import Lottie from "lottie-react";
import styles from "./contact.module.css";
import { lotties } from "@/app/utilities/assets_path/assets_path";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Contact({ scrollRef }) {
  const [animation, setAnimation] = useState(null);

  const sectionRef = useRef(null);
  const lottieRef = useRef(null);
  const formBoxRef = useRef(null);
  const inputsRef = useRef([]);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: "",
  });

  useEffect(() => {
    fetch(lotties.contact)
      .then(res => res.json())
      .then(data => setAnimation(data));
  }, []);

 useEffect(() => {
  if (!sectionRef.current) return;

  const ctx = gsap.context(() => {

    setTimeout(() => ScrollTrigger.refresh(), 150);

    gsap.from(lottieRef.current, {
      opacity: 0,
      y: 20,
      duration: 0.7,
      ease: "power3.out",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 96%",
        once: true,
      },
    });

    // ⭐ Form fade
    gsap.from(formBoxRef.current, {
      opacity: 0,
      y: 15,
      duration: 0.8,
      delay: 0.05,
      ease: "power3.out",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 95%",
        once: true,
      },
    });

    
    gsap.from(inputsRef.current, {
      y: 15,
      duration: 0.55,
      stagger: 0.10,
      delay: 0.15,
      ease: "power2.out",
      scrollTrigger: {
        trigger: formBoxRef.current,
        start: "top 93%",
        once: true,
      },
    });
  }, sectionRef);

  return () => ctx.revert();
}, []);


  return (
    <div className={styles.contactSection} ref={sectionRef}>
      <div className={styles.lottieBox} ref={lottieRef}>
        <Lottie animationData={animation} loop={true} className={styles.lottieAnim} />
      </div>

      <div className={styles.formBox} ref={formBoxRef}>
        <h2 className={styles.title}>Get in Touch With Us</h2>
        <p className={styles.subtitle}>
          Have questions? Send us a message and our team will reach out shortly.
        </p>

        <form>
          <input
            ref={(el) => (inputsRef.current[0] = el)}
            type="text"
            placeholder="Your Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />

          <input
            ref={(el) => (inputsRef.current[1] = el)}
            type="email"
            placeholder="Email Address"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />

          <input
            ref={(el) => (inputsRef.current[2] = el)}
            type="phone"
            placeholder="Your Mobile Number"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
          />

          <input
            ref={(el) => (inputsRef.current[3] = el)}
            type="text"
            placeholder="Company Name"
            value={form.company}
            onChange={(e) => setForm({ ...form, company: e.target.value })}
          />

          <textarea
            ref={(el) => (inputsRef.current[4] = el)}
            placeholder="Your Message"
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
          ></textarea>

          <button
            ref={(el) => (inputsRef.current[5] = el)}
            type="submit"
          >
            Send Inquiry
          </button>
        </form>
      </div>
    </div>
  );
}
