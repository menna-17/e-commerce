// src/Components/NewArrivals/NewArrivals.jsx
import React, { useEffect, useState } from "react";
import axiosInstance from "../../Apis/config";
import { useNavigate } from "react-router-dom";
import "./NewArrivals.css";

const NewArrivals = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axiosInstance
      .get("/products?limit=4&skip=10") // fetch 4 products
      .then((res) => setProducts(res.data.products))
      .catch((err) => console.error(err));
  }, []);

  return (
    <section className="new-arrivals-section">
      <h2 className="section-title">New Arrivals</h2>
      <div className="new-arrivals-products-container">
        {products.map((product) => (
          <div
            className="new-arrivals-product-wrapper"
            key={product.id}
            onClick={() => navigate(`/product/${product.id}`)}
            role="button"
            tabIndex={0}
            onKeyPress={(e) => {
              if (e.key === "Enter") navigate(`/product/${product.id}`);
            }}
          >
            <div className="new-arrivals-product-card">
              <img
                src={product.thumbnail}
                alt={product.title}
                className="new-arrivals-image"
                loading="lazy"
              />
            </div>
            <div className="new-arrivals-info">
              <p className="new-arrivals-title">{product.title}</p>
              <p className="new-arrivals-price">${product.price}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default NewArrivals;
