import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./ShopByCategory.module.css";

const categories = [
  { name: "Jewelry", image: "jewelry.jpeg" },
  { name: "Crochet", image: "crochet.jpeg" },
  { name: "Candles", image: "candles.jpeg" },
  { name: "Ceramics", image: "ceramic.jpeg" },
  { name: "Home Essentials", image: "homeess.jpeg" },
];

// Map frontend category names to backend category names exactly
const categoryMap = {
  jewelry: "Jewelry",
  crochet: "Crochet",
  candles: "Candles",
  ceramic: "Ceramics",       // Note plural form on backend
  "home essentials": "Home Essential"
};

const ShopByCategory = () => {
  const navigate = useNavigate();

  const handleShopNow = (categoryName) => {
    const key = categoryName.toLowerCase();
    const backendCategory = categoryMap[key] || categoryName;
    // Navigate to the new category-products page (not product-list)
    navigate(`/category-products?category=${encodeURIComponent(backendCategory)}`);
  };

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
            onClick={() => handleShopNow(category.name)}
          >
            <div className={styles.overlay}>
              <h3 className={styles["category-name"]}>{category.name}</h3>
              <button
                className={styles["shop-button"]}
                onClick={(e) => {
                  e.stopPropagation();
                  handleShopNow(category.name);
                }}
              >
                Shop Now
              </button>
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
            onClick={() => handleShopNow(category.name)}
          >
            <div className={styles.overlay}>
              <h3 className={styles["category-name"]}>{category.name}</h3>
              <button
                className={styles["shop-button"]}
                onClick={(e) => {
                  e.stopPropagation();
                  handleShopNow(category.name);
                }}
              >
                Shop Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ShopByCategory;
