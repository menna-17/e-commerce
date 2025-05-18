import React, { useState } from 'react';
import './ProductCard.css';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../Context/CartContext';

const ProductCard = ({ product }) => {
  const [showModal, setShowModal] = useState(false);
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const handleAddToCart = () => {
    addToCart(product);
    setShowModal(true);
  };

  const handleGoToCart = () => {
    setShowModal(false);
    navigate('/cart');
  };

  const handleContinueShopping = () => {
    setShowModal(false);
  };

  const handleCardClick = (e) => {
    // Prevent clicks on buttons from triggering card navigation
    if (
      e.target.tagName !== 'BUTTON' &&
      !e.target.closest('button')
    ) {
      navigate(`/product/${product.id}`);
    }
  };

  return (
    <div
      className="product-card card"
      onClick={handleCardClick}
      style={{ cursor: 'pointer', color: '#093866' }}
    >
      <img
        src={product.thumbnail || product.img}
        className="card-img-top"
        alt={product.title}
      />
      <div className="card-body">
        <h5 className="card-title" style={{ color: '#093866' }}>{product.title}</h5>
        <p className="card-text" style={{ color: '#093866' }}>${product.price}</p>
        <button
          className="btn add-to-cart-fullwidth"
          onClick={(e) => {
            e.stopPropagation(); // prevent card click
            handleAddToCart();
          }}
          type="button"
        >
          Add to Cart
        </button>
      </div>

      {showModal && (
        <div
          className="modal fade show"
          style={{ display: 'block' }}
          aria-modal="true"
          role="dialog"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" style={{ color: '#093866' }}>
                  Added to Cart
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body" style={{ color: '#093866' }}>
                <p>Do you want to go to the cart or continue shopping?</p>
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={handleContinueShopping}>
                  Continue Shopping
                </button>
                <button className="btn btn-primary" onClick={handleGoToCart}>
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

export default ProductCard;
