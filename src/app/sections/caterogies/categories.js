import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./categories.module.css";
import { images } from "@/app/utilities/assets_path/assets_path";

gsap.registerPlugin(ScrollTrigger);

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
    gsap.from(itemsRef.current, {
      opacity: 0,
   
      duration: 0.8,
      stagger: 0.15,
      scrollTrigger: {
        trigger: itemsRef.current[0],
        start: "top 85%",
      },
    });
  }, []);

  return (
    <div className={styles.categoriesSection}>
      <div className={styles.categoryTitle}>Browse Our Main Categories</div>
      <div className={styles.categorySubtitle}>
        Explore a diverse and constantly growing catalog of products sourced directly from certified manufacturers:
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
