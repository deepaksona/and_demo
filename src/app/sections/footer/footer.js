import { images } from "@/app/utilities/assets_path/assets_path";
import styles from "./footer.module.css";
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";

export default function Footer() {
  return (
    <div className={styles.footerSection}>
      <div className={styles.footerWrapper}>

        {/* LOGO + ABOUT */}
        <div className={styles.companyBox}>
          <img src={images.logo} className={styles.logo}/>
          <p className={styles.about}>
            Your trusted sourcing partner for quality products and verified suppliers.
            We simplify global trade for businesses across India.
          </p>
        </div>

        {/* QUICK LINKS */}
        <div className={styles.linksBox}>
          <h3>Quick Links</h3>
          <ul>
            <li>Home</li>
            <li>About Us</li>
            <li>Categories</li>
            <li>Featured Products</li>
            <li>Contact</li>
          </ul>
        </div>

        {/* CATEGORIES */}
        <div className={styles.linksBox}>
          <h3>Top Categories</h3>
          <ul>
            <li>Electronics</li>
            <li>Home & Kitchen</li>
            <li>Machinery</li>
            <li>Fashion</li>
            <li>Beauty Products</li>
          </ul>
        </div>

        {/* CONTACT DETAILS */}
        <div className={styles.contactBox}>
          <h3>Contact</h3>
          <p>Email: support@andglobaltrader.com</p>
          <p>Phone: +91 90000 00000</p>
          <p>Location: Mumbai, India</p>

          <div className={styles.socialRow}>
            <FaFacebook />
            <FaInstagram />
            <FaLinkedin />
            <FaTwitter />
          </div>
        </div>
      </div>

      <div className={styles.bottomBar}>
        © 2025 A&D Global Trader — All Rights Reserved.
      </div>
    </div>
  );
}
