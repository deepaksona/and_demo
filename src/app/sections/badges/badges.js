import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import styles from "./badges.module.css";
import { images } from "@/app/utilities/assets_path/assets_path";

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
    let observer;

    if (typeof window !== "undefined") {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const index = badgesRef.current.indexOf(entry.target);

              gsap.fromTo(
                entry.target,
                { opacity: 0, y: 30 },
                {
                  opacity: 1,
                  y: 0,
                  duration: 0.7,
                  ease: "power2.out",
                  delay: index * 0.12 // nice stagger
                }
              );

              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.2 } // 20% visible → animate
      );

      badgesRef.current.forEach((badge) => observer.observe(badge));
    }

    return () => observer && observer.disconnect();
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
