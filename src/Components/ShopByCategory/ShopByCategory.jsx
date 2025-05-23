import React from "react";
import styles from "./ShopByCategory.module.css";

const categories = [
  { name: "Jewelry", image: "J.jpeg" },
  { name: "Crochet", image: "C.jpeg" },
  { name: "Candles", image: "Can.jpeg" },
  { name: "Ceramic", image: "Cer.jpeg" },
  { name: "Personal Essentials", image: "P.jpeg" },
];

const ShopByCategory = () => {
  return (
    <section className={styles["shop-by-category"]}>
      <h2 className={styles["section-title"]}>Shop by Category</h2>

      {/* First row - 2 larger cards */}
      <div className={`${styles["category-row"]} ${styles["large-row"]}`}>
        {categories.slice(0, 2).map((category, idx) => (
          <div
            key={idx}
            className={`${styles["category-card"]} ${styles["large-card"]}`}
            style={{ backgroundImage: `url(${category.image})` }}
          >
            <div className={styles.overlay}>
              <h3 className={styles["category-name"]}>{category.name}</h3>
              <button className={styles["shop-button"]}>Shop Now</button>
            </div>
          </div>
        ))}
      </div>

      {/* Second row - 3 smaller cards */}
      <div className={`${styles["category-row"]} ${styles["small-row"]}`}>
        {categories.slice(2).map((category, idx) => (
          <div
            key={idx}
            className={`${styles["category-card"]} ${styles["small-card"]}`}
            style={{ backgroundImage: `url(${category.image})` }}
          >
            <div className={styles.overlay}>
              <h3 className={styles["category-name"]}>{category.name}</h3>
              <button className={styles["shop-button"]}>Shop Now</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ShopByCategory;
