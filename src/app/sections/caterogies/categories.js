"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import styles from "./categories.module.css";
import { images } from "@/app/utilities/assets_path/assets_path";

export default function Categories() {
  const itemsRef = useRef([]);

  const categoriesList = [
    { image: images.electronics, lable: "Consumer Electronics" },
    { image: images.kitchen, lable: "Home & Kitchen" },
    { image: images.fashion, lable: "Apparel & Fashion" },
    { image: images.industrial, lable: "Industrial & Machinery" },
    { image: images.beauty, lable: "Beauty & Personal Care" },
    { image: images.agriculture, lable: "Agriculture & Raw Materials" },
    { image: images.automotive, lable: "Automotive Parts & Accessories" },
    { image: images.packaging, lable: "Packaging & Printing" },
  ];

  useEffect(() => {
    // Wait until all category images are loaded
    const imagesLoaded = Array.from(
      document.querySelectorAll(`.${styles.itemImage}`)
    );

    let loaded = 0;

    const checkAndStart = () => {
      loaded++;
      if (loaded === imagesLoaded.length) startObserver();
    };

    imagesLoaded.forEach((img) => {
      if (img.complete) checkAndStart();
      else img.onload = checkAndStart;
    });

    // ---------------------------
    // ⭐ Intersection Observer + GSAP
    // ---------------------------
    function startObserver() {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const index = itemsRef.current.indexOf(entry.target);

              gsap.fromTo(
                entry.target,
                { opacity: 0, y: 30 },
                {
                  opacity: 1,
                  y: 0,
                  duration: 0.6,
                  delay: index * 0.10, // smooth stagger
                  ease: "power2.out",
                }
              );

              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.2 } // animate when 20% in view
      );

      itemsRef.current.forEach((item) => observer.observe(item));
    }
  }, []);

  return (
    <div className={styles.categoriesSection}>
      <div className={styles.categoryTitle}>Browse Our Main Categories</div>
      <div className={styles.categorySubtitle}>
        Explore a diverse and constantly growing catalog of products sourced
        directly from certified manufacturers:
      </div>

      <div className={styles.categoriesListSection}>
        {categoriesList.map((e, index) => (
          <div
            key={index}
            className={styles.catergoriesListItem}
            ref={(el) => (itemsRef.current[index] = el)}
          >
            <img src={e.image} alt="category" className={styles.itemImage} />
            <span className={styles.itemTitle}>{e.lable}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
