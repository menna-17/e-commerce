import React from 'react';
import { useCart } from '../../Context/CartContext';
import { Link } from 'react-router-dom';

const CartPage = () => {
  const { cart, removeFromCart, calculateTotal } = useCart();

  return (
    <div className="cart-page container py-4">
      <h2>Your Cart</h2>
      
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          {/* Cart Items */}
          <div className="cart-items">
            {cart.map((product) => (
              <div key={product.id} className="cart-item d-flex justify-content-between align-items-center mb-3">
                <div className="d-flex align-items-center">
                  <img
                    src={product.thumbnail || product.img}
                    alt={product.title}
                    className="img-thumbnail"
                    width="100"
                  />
                  <div className="ms-3">
                    <p className="mb-0">{product.title}</p>
                    <p className="mb-0">${product.price}</p>
                  </div>
                </div>
                <button
                  className="btn btn-danger"
                  onClick={() => removeFromCart(product.id)}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          {/* Cart Summary */}
          <div className="cart-summary mt-4">
            <h4>Total Price: ${calculateTotal()}</h4>
            <div className="d-flex justify-content-between">
              <Link to="/product-list" className="btn btn-secondary">
                Continue Shopping
              </Link>
              <Link to="/checkout" className="btn btn-primary">
                Checkout
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
