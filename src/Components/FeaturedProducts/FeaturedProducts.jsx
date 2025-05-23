import React, { useEffect, useState } from 'react';
import axiosInstance from '../../Apis/config';
import { useNavigate } from 'react-router-dom';
import styles from './FeaturedProducts.module.css';

const FeaturedProduct = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axiosInstance.get('/api/products?limit=9&page=1');
        const data = response.data;

        if (Array.isArray(data)) {
          setProducts(data);
        } else if (Array.isArray(data.products)) {
          setProducts(data.products);
        } else if (data.data && Array.isArray(data.data.products)) {
          setProducts(data.data.products);
        } else {
          throw new Error('Unexpected API response structure');
        }
      } catch (error) {
        console.error('Error fetching products:', error);
        setError('Error fetching products');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <p className={styles.statusMessage}>Loading featured products...</p>;
  if (error) return <p className={styles.statusMessage}>{error}</p>;

  return (
    <div className={styles['featured-product-sidebar']}>
      <h2 className={styles.title}>Featured Products</h2>
      <div className={styles['product-list']}>
        {products.map((product) => {
          const id = product.id || product._id;
          const titleFirstWord = product.title?.split(' ')[0] || 'Product';
          const imgSrc = product.image || product.images?.[0] || product.thumbnail || '/default-product.jpg';

          return (
            <div
              key={id}
              className={styles['product-card']}
              onClick={() => navigate(`/product/${id}`)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && navigate(`/product/${id}`)}
            >
              <img
                src={imgSrc}
                alt={product.title || 'Product'}
                className={styles['product-image']}
                width="240"
                height="160"
                onError={(e) => (e.target.src = '/default-product.jpg')}
              />
              <p className={styles['product-title']}>{titleFirstWord}</p>
              <div className={styles.priceContainer}>
                <p className={styles['product-price']}>{product.price}</p>
                <span className={styles.currency}>EGP</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default React.memo(FeaturedProduct);
