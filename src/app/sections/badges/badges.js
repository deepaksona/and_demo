import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./badges.module.css";
import { images } from "@/app/utilities/assets_path/assets_path";

gsap.registerPlugin(ScrollTrigger);

export default function Badges() {

  const badgesRef = useRef([]);

  const badgesList = [
    {
      image: images.product,
      text: "10,000+ Products across multiple categories including electronics, fashion, home goods, industrial tools, and much more."
    },
    {
      image: images.globalTrade,
      text: "Verified Global Suppliers from more than 50+ countries ensuring you get top-tier manufacturing and wholesale services."
    },
    {
      image: images.fastDelivery,
      text: "Fast Shipping & Guaranteed Quality with trusted logistics partners and real-time tracking available worldwide."
    },
    {
      image: images.tradeProtection,
      text: "Secure Trade Protection with buyer insurance, safe payments, hassle-free refunds, and dedicated customer support."
    }
  ];

  useEffect(() => {
    gsap.from(badgesRef.current, {
      opacity: 0,
      y: 50,
      duration: 1,
      stagger: 0.25,
      ease: "power3.out",
      scrollTrigger: {
        trigger: badgesRef.current[0],
        start: "top 80%",
      }
    });
  }, []);

  return (
    <div className={styles.badgesSection}>
      {badgesList.map((item, index) => (
        <div
          key={index}
          className={styles.badgesItem}
          ref={(el) => (badgesRef.current[index] = el)}
        >
          <div className={styles.badgesIconWrapper}>
            <img src={item.image} alt="img" className={styles.badgesIcon} />
          </div>
          <p className={styles.badgesText}>{item.text}</p>
        </div>
      ))}
    </div>
  );
}
