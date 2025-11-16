


"use client";

import { motion } from "framer-motion";
import styles from "./freatured.module.css";
import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Featured({ scrollRef }) {
  const sectionRef = useRef(null);

     const products = [
    {
      id: 1,
      title: "Ultra-Wide Curved Monitor – Immersive Display",
      description: `The curved monitor delivers an immersive viewing experience designed for gamers, professionals, and multi-tasking users. Its ultra-wide display and 1500R curvature create a natural field of vision that reduces eye strain and enhances depth perception. With high refresh rate options, vivid color accuracy, and a sleek frameless design, it offers smooth performance for gaming, editing, and productivity. 
      
      Multiple size and resolution choices, including Full HD, QHD, and 4K, ensure flexibility for every setup. Equipped with HDMI, DisplayPort, and adaptive-sync compatibility, this curved monitor combines style, comfort, and performance for an elevated visual experience.`,
      images: ["/monitor.webp", "/monitor.webp", "/monitor.webp"],
     
    },
    {
      id: 2,
      title: "Cute Panda Silicone Keychain for Backpacks, Keys & Car",
      description: `Bring a smile to your day with this adorable 3D Panda Silicone Keychain! Crafted from high-quality, soft PVC rubber, this charm is durable, lightweight, and gentle to the touch. The cute cartoon design features a cheerful panda with sweet rosy cheeks and even includes a tiny green bamboo accessory.
      
      It's the perfect accessory for adding personality to your everyday items. Easily attach it to your backpack, purse, car keys, house keys, or lanyard using the sturdy metal ring. A fantastic gift for panda lovers, children, teens, and anyone who loves cute animal accessories. Get yours today and carry a little bit of cuteness wherever you go!`,
      images: ["/keychain.png", "/keychain.png", "/keychain.png"],
     
    },
    {
      id: 3,
      title: "USB Rechargeable Portable Blender - Mini Electric Juicer Cup for Smoothies, Shakes & Travel (6-Blade)",
      description: `This USB rechargeable portable blender is the ideal partner for a healthy, active lifestyle. Designed for ultimate convenience, this mini electric juicer allows you to mix fresh smoothies, protein shakes, and baby food quickly, whether you are at the gym, traveling, or commuting. 
      
      It features a powerful 6-blade stainless steel system capable of crushing ice and frozen fruits effortlessly. The blender is lightweight, compact, and completely safe, being made from BPA-free materials. It charges easily via USB, providing multiple uses per charge, ensuring you never miss out on your essential nutrients. Simply blend, drink, and go!`,
      images: ["/mixer.png", "/mixer.png", "/mixer.png"],
   
    },
  ];

  const [index, setIndex] = useState(0);

  // ⭐ SIMPLE GSAP ANIMATION
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

  // AUTO SLIDE
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const nextSlide = () =>
    setIndex((prev) => (prev + 1) % products.length);

  const prevSlide = () =>
    setIndex((prev) => (prev - 1 + products.length) % products.length);

  // TOUCH SWIPE
  const touchStartX = useRef(null);

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    if (!touchStartX.current) return;
    const diff = e.changedTouches[0].clientX - touchStartX.current;

    if (diff > 50) prevSlide();
    else if (diff < -50) nextSlide();

    touchStartX.current = null;
  };

  // CLICK TO NAVIGATE
  const handleClick = (e) => {
    const width = e.currentTarget.clientWidth;
    const clickX =
      e.clientX - e.currentTarget.getBoundingClientRect().left;

    if (clickX < width / 2) prevSlide();
    else nextSlide();
  };

  return (
    <div
      className={styles.featuredSection}
      ref={sectionRef} // ⭐ GSAP trigger
    >
      <div className={styles.title}>Top Trending Products This Month</div>
      <div className={styles.subtitle}>
        Discover our most popular products sourced from verified suppliers.
      </div>

      <div
        className={styles.featuredProductSection}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onClick={handleClick}
      >
        <motion.div
          key={index}
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className={styles.featuredProductContainer}
        >
          {/* IMAGE + BLUR BACKGROUND */}
          <div className={styles.imageCatalog}>
            <div className={styles.mainImageWrapper}>
              <div
                className={styles.bgBlur}
                style={{
                  backgroundImage: `url(${products[index].images[0]})`,
                }}
              ></div>

              <img
                className={styles.mainImage}
                src={products[index].images[0]}
                alt="product"
              />
            </div>

            <div className={styles.imagesRow}>
              {products[index].images.map((img, i) => (
                <img key={i} className={styles.otherImage} src={img} />
              ))}
            </div>
          </div>

          {/* TEXT */}
          <div className={styles.textContent}>
            <div className={styles.productTitle}>
              {products[index].title}
            </div>

            <div className={styles.productDescription}>
              {products[index].description}
            </div>

            <button className={styles.contactButton}>
              Contact To Know More
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

