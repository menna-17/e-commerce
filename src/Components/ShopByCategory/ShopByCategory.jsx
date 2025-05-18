import React from "react";
import "./ShopByCategory.css";
const categories = [
    { name: "Jewelry", image: "J.jpeg" },
    { name: "Crochet", image: "C.jpeg" },
    { name: "Candles", image: "Can.jpeg" },
    { name: "Ceramic", image: "Cer.jpeg" },
    { name: "Personal Essentials", image: "P.jpeg" },
  ];
  

const ShopByCategory = () => {
  return (
    <section className="shop-by-category">
      <h2 className="section-title">Shop by Category</h2>

      {/* First row - 2 larger cards */}
      <div className="category-row large-row">
        {categories.slice(0, 2).map((category, idx) => (
          <div
            key={idx}
            className="category-card large-card"
            style={{ backgroundImage: `url(${category.image})` }}
          >
            <div className="overlay">
              <h3 className="category-name">{category.name}</h3>
              <button className="shop-button">Shop Now</button>
            </div>
          </div>
        ))}
      </div>

      {/* Second row - 3 smaller cards */}
      <div className="category-row small-row">
        {categories.slice(2).map((category, idx) => (
          <div
            key={idx}
            className="category-card small-card"
            style={{ backgroundImage: `url(${category.image})` }}
          >
            <div className="overlay">
              <h3 className="category-name">{category.name}</h3>
              <button className="shop-button">Shop Now</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ShopByCategory;
