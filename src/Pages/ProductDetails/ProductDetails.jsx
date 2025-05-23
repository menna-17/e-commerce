import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import axiosInstance from "../../Apis/config";
import { useCart } from "../../Context/CartContext";
import styles from "./ProductDetails.module.css";

const ProductDetails = () => {
  const { id } = useParams();
  const location = useLocation();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  const page = new URLSearchParams(location.search).get("page") || 1;

  useEffect(() => {
    setLoading(true);
    axiosInstance
      .get(`/api/products/${id}`)
      .then((res) => {
        const data = res.data;
        setProduct(data.product || data);
      })
      .catch((err) => {
        console.error("Error fetching product details:", err);
        setError("Failed to load product details.");
      })
      .finally(() => setLoading(false));
  }, [id]);

  const handleBuy = () => {
    const stock = product.inStock ?? product.stock ?? product.quantity ?? Infinity;
    if (stock > 0) {
      for (let i = 0; i < quantity; i++) {
        addToCart(product);
      }
      window.location.href = "/checkout";
    }
  };

  const handleIncrease = () => {
    const stock = product.inStock ?? product.stock ?? product.quantity ?? Infinity;
    if (quantity < stock) {
      setQuantity((q) => q + 1);
    }
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity((q) => q - 1);
    }
  };

  if (loading) return <div className={styles.loading}>Loading...</div>;
  if (error) return <div className={styles.error}>{error}</div>;
  if (!product) return <div className={styles.error}>Product not found.</div>;

  const stock = product.inStock ?? product.stock ?? product.quantity ?? 0;

  return (
    <div className={`${styles["product-details"]} container py-4`}>
      <div className={`${styles["product-details-flex"]} row`}>
        <div className={`${styles["product-image"]} col-md-6`}>
          <img
            src={
              product.image ||
              product.thumbnail ||
              product.img ||
              product.images?.[0] ||
              "https://via.placeholder.com/400"
            }
            alt={product.title || "Product"}
            className="img-fluid"
            onError={(e) => (e.target.src = "https://via.placeholder.com/400")}
          />
        </div>

        <div className={`${styles["product-info"]} col-md-6`}>
          <h2 className={styles["product-title"]}>{product.title || "Unnamed Product"}</h2>
          <p className={styles["product-price"]}>
            ${product.price ? product.price.toFixed(2) : "N/A"}
          </p>
          <p className={styles["product-description"]}>
            {product.description || "No description available."}
          </p>

          {stock <= 5 && stock > 0 && (
            <p className={styles["low-stock"]}>
              Hurry! Only {stock} item{stock > 1 ? "s" : ""} left in stock.
            </p>
          )}
          {stock === 0 && <p className={styles["out-of-stock"]}>Out of Stock</p>}

          {stock > 0 && (
            <div className={styles["action-row"]}>
              <button className={styles["btn-buy-now"]} onClick={handleBuy}>
                Buy Now
              </button>
              <div className={styles["quantity-control"]}>
                <button onClick={handleDecrease}>-</button>
                <span>{quantity}</span>
                <button onClick={handleIncrease}>+</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
