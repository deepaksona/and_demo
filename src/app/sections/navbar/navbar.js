"use client";
import { useState } from "react";
import styles from "./navbar.module.css";
import Image from "next/image";
import { images } from "@/app/utilities/assets_path/assets_path";
import { IoMenu, IoClose } from "react-icons/io5";

export default function Navbar({ sections }) {
  const [open, setOpen] = useState(false);
  
  const menulinks = [
    { name: "Home", link: "home" },
    { name: "About Us", link: "about" },
    { name: "Categories", link: "category" },
    { name: "Featured", link: "feature" },
    { name: "Testimonials", link: "testimonial" },
  ];

  const handleMenuClick = (link) => {
    sections(link);
    setOpen(false);
  };

  return (
    <div className={styles.navbarSection}>
      {/* Logo */}
      <Image
        src={images.logo}
        width={100}
        height={100}
        alt="logo"
        className={styles.logo}
      />

      {/* Menu Desktop */}
      <ul className={styles.menu}>
        {menulinks.map((e, index) => (
          <li onClick={() => sections(e.link)} key={index} className={styles.menuItems}>
            <a>{e.name}</a>
          </li>
        ))}
      </ul>

      {/* Contact Button */}
      <div className={styles.loginSection}>
        <button onClick={() => sections("contact")} className={styles.login}>
          Contact
        </button>
      </div>

      {/* Hamburger Icon (Mobile) */}
      <div className={styles.hamburger} onClick={() => setOpen(true)}>
        <IoMenu size={32} />
      </div>

      {/* Drawer Sidebar */}
      <div className={`${styles.drawer} ${open ? styles.openDrawer : ""}`}>
        <div className={styles.drawerHeader}>
          <p className={styles.drawerLogo}>A&D Global Trader</p>
          <IoClose
            size={32}
            onClick={() => setOpen(false)}
            className={styles.closeIcon}
          />
        </div>
        <ul className={styles.drawerMenu}>
          {menulinks.map((item, i) => (
            <li key={i} onClick={() => handleMenuClick(item.link)}>
              {item.name}
            </li>
          ))}
        </ul>
        <button className={styles.drawerBtn} onClick={() => handleMenuClick("contact")}>
          Contact
        </button>
      </div>

      {/* Drawer Background Overlay */}
      {open && <div className={styles.overlay} onClick={() => setOpen(false)} />}
    </div>
  );
}