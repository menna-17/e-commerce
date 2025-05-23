import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    const productId = product._id || product.id;

    setCart((prevCart) => {
      const existingProduct = prevCart.find(
        (item) => (item._id || item.id) === productId
      );

      if (existingProduct) {
        // Increase quantity by 1, but do not exceed stock
        const stock = product.instock ?? product.stock ?? product.quantity ?? Infinity;
        if ((existingProduct.quantity || 1) >= stock) return prevCart;

        return prevCart.map((item) =>
          (item._id || item.id) === productId
            ? { ...item, quantity: (item.quantity || 1) + 1 }
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) =>
      prevCart.filter((product) => (product._id || product.id) !== productId)
    );
  };

  const calculateTotal = () => {
    return cart
      .reduce(
        (total, product) =>
          total + (Number(product.price) || 0) * (product.quantity || 1),
        0
      )
      .toFixed(2);
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, calculateTotal }}
    >
      {children}
    </CartContext.Provider>
  );
};
