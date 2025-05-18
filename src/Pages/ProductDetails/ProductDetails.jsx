import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../../Apis/config";
import { useCart } from "../../Context/CartContext";
import './ProductDetails.css'; // Import your CSS file for styling

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const { addToCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    axiosInstance
      .get(`/products/${id}`)
      .then((res) => {
        setProduct(res.data);
      })
      .catch((err) => console.error("Error fetching product details:", err));
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  const handleBuy = () => {
    setShowModal(true);
  };

  const handleGoToCart = () => {
    addToCart(product);
    navigate("/cart");
  };

  const handleContinueShopping = () => {
    addToCart(product);
    setShowModal(false);
  };

  return (
    <div className="product-details container py-4">
      <div className="product-details-flex row">
        <div className="col-md-6 product-image">
          <img
            src={product.thumbnail || product.img}
            alt={product.title}
            className="img-fluid"
          />
        </div>
        <div className="col-md-6 product-info">
          <h2 className="product-title">{product.title}</h2>
          <p className="product-price">${product.price}</p>
          <p className="product-description">{product.description}</p>
          <button className="btn-buy-now" onClick={handleBuy}>
            Buy Now
          </button>
        </div>
      </div>

      {showModal && (
        <div
          className="modal fade show"
          style={{ display: "block" }}
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Add to Cart
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={handleContinueShopping}
                ></button>
              </div>
              <div className="modal-body">
                <p>Do you want to go to the cart or continue shopping?</p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handleContinueShopping}
                >
                  Continue Shopping
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleGoToCart}
                >
                  Go to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
