import { images } from "@/app/utilities/assets_path/assets_path";
import styles from "./about.module.css";

export default function About({scrollRef}) {
    return (<div  className={styles.aboutSection}>
        <div className={styles.textContent}>
            <h2 className={styles.title}>Who We Are</h2>
            <p className={styles.subtitle}>A&D Global Trader is a full-service trading company dedicated to simplifying product sourcing for businesses across India. We connect Indian buyers with reliable manufacturers and wholesalers, ensuring access to high-quality products at competitive prices. Our network covers a wide range of categories, including electronics, home goods, kitchenware, industrial equipment, packaging materials, and daily-use consumer products.
                <br/><br/>
We manage the complete process—supplier verification, product sourcing, quality checks, documentation, logistics coordination, and safe delivery—so Indian businesses can focus on selling rather than struggling with supply chain issues. Our goal is to provide transparent, dependable, and hassle-free trade solutions tailored to the Indian market.</p>
        </div>

        <img className={styles.imageContent} src={images.team}/>
    </div>)
}