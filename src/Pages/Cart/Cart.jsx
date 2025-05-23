import React from 'react';
import { useCart } from '../../Context/CartContext';
import { Link } from 'react-router-dom';
import styles from './CartPage.module.css';

const CartPage = () => {
  const { cart, removeFromCart, calculateTotal } = useCart();

  return (
    <div className={styles.cartPage}>
      <h2 className={styles.title}>Your Cart</h2>

      {cart.length === 0 ? (
        <p className={styles.emptyMessage}>Your cart is empty.</p>
      ) : (
        <div>
          <div className={styles.cartItems}>
            {cart.map((product) => {
              const productId = product._id || product.id;
              const imgSrc = product.image || product.images?.[0] || product.thumbnail || '/default-product.jpg';

              return (
                <div key={productId} className={styles.cartItem}>
                  <div className={styles.itemDetails}>
                    <img
                      src={imgSrc}
                      alt={product.title}
                      className={styles.thumbnail}
                      onError={(e) => (e.target.src = '/default-product.jpg')}
                    />
                    <div className={styles.itemText}>
                      <p className={styles.productTitle}>{product.title}</p>
                      <p className={styles.productPrice}>
                        ${product.price} x {product.quantity}
                      </p>
                      <p className={styles.productTotalPrice}>
                        Total: ${(product.price * product.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                  <button
                    className={styles.removeButton}
                    onClick={() => removeFromCart(productId)}
                  >
                    Remove
                  </button>
                </div>
              );
            })}
          </div>

          <div className={styles.cartSummary}>
            <h4 className={styles.totalPrice}>Total Price: ${calculateTotal()}</h4>
            <div className={styles.actions}>
              <Link to="/product-list" className={styles.continueShopping}>
                Continue Shopping
              </Link>
              <Link to="/checkout" className={styles.checkoutButton}>
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
