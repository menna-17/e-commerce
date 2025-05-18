import React, { useEffect, useState } from 'react';
import axiosInstance from '../../Apis/config';
import { useNavigate } from 'react-router-dom';  // Import useNavigate
import './FeaturedProducts.css'; // Import your CSS file for styling

const FeaturedProduct = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();  // Initialize navigate

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axiosInstance.get('/products?limit=9');
        setProducts(response.data.products);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="featured-product-sidebar">
      <h2>Featured Products</h2>
      <div className="product-list">
        {products.map(product => (
          <div
            key={product.id}
            className="product-card"
            role="button"
            tabIndex={0}
            onClick={() => navigate(`/product/${product.id}`)}  // Navigate on click
            onKeyPress={(e) => {
              if (e.key === 'Enter') navigate(`/product/${product.id}`);  // Navigate on Enter key
            }}
          >
            <img
              src={product.thumbnail}
              alt={product.title}
              className="product-image"
            />
            <h3 className="product-title">{product.title}</h3>
            <p className="product-price">${product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedProduct;
