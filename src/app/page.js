"use client"
import { useRef } from "react";
import styles from "./page.module.css";
import About from "./sections/about/about";
import Badges from "./sections/badges/badges";
import Categories from "./sections/caterogies/categories";
import Contact from "./sections/contact/contact";
import Featured from "./sections/featured/freatured";
import Footer from "./sections/footer/footer";
import Hero from "./sections/hero/hero";
import Navbar from "./sections/navbar/navbar";
import Testimonial from "./sections/testimonial/testimonial";
import Whyus from "./sections/whyus/whyus";

export default function Home() {
  const sections = useRef({
    home: null,
    about: null,
    category: null,
    feature: null,
    testimonial: null,
    contact: null
  });

  const easeInOutCubic = (t) => {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  };

  const scrollTo = (key) => {
    const target = sections.current[key];
    
    if (!target) {
      alert("Target not found!");
      return;
    }

    const targetPosition = target.offsetTop;
    const startPosition = document.documentElement.scrollTop || document.body.scrollTop;
    const distance = targetPosition - startPosition;
    const duration = 1500;
    let startTime = null;

    const animation = (currentTime) => {
      if (startTime === null) startTime = currentTime;

      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / duration, 1);
      const ease = easeInOutCubic(progress);

      const newPosition = startPosition + distance * ease;
      document.documentElement.scrollTop = newPosition;
      document.body.scrollTop = newPosition; // For Safari

      if (progress < 1) {
        requestAnimationFrame(animation);
      }
    };

    requestAnimationFrame(animation);
  };

  return (
    <div className={styles.page}>
      <Navbar sections={scrollTo} />
      <div ref={(el) => sections.current.home = el}>
        <Hero />
      </div>
      <Badges />
      <div ref={(el) => sections.current.category = el}>
        <Categories />
      </div>
      <div ref={(el) => sections.current.feature = el}>
        <Featured scrollRef={scrollTo} />
      </div>
      <div ref={(el) => sections.current.about = el}>
        <About />
      </div>
      <Whyus />
      <div ref={(el) => sections.current.testimonial = el}>
        <Testimonial />
      </div>
      <div ref={(el) => sections.current.contact = el}>
        <Contact />
      </div>
      <Footer />
    </div>
  );
}