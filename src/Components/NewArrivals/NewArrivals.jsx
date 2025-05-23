import React, { useEffect, useState } from 'react';
import axiosInstance from '../../Apis/config';
import { useNavigate } from 'react-router-dom';
import styles from './NewArrivals.module.css';

const NewArrivals = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axiosInstance.get('/api/products?limit=4&page=1');
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

  if (loading) return <p className={styles.statusMessage}>Loading new arrivals...</p>;
  if (error) return <p className={styles.statusMessage}>{error}</p>;

  return (
    <section className={styles.newArrivalsSection}>
      <h2 className={styles.sectionTitle}>New Arrivals</h2>
      <div className={styles.newArrivalsProductsContainer}>
        {products.map((product) => {
          const id = product.id || product._id;
          const imgSrc = product.thumbnail || product.image || product.images?.[0] || '/default-product.jpg';

          return (
            <div
              className={styles.newArrivalsProductWrapper}
              key={id}
              onClick={() => navigate(`/product/${id}`)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && navigate(`/product/${id}`)}
            >
              <div className={styles.newArrivalsProductCard}>
                <img
                  src={imgSrc}
                  alt={product.title || 'Product'}
                  className={styles.newArrivalsImage}
                  loading="lazy"
                  onError={(e) => {
                    e.target.src = '/default-product.jpg';
                  }}
                />
              </div>
              <div className={styles.newArrivalsInfo}>
                <p className={styles.newArrivalsTitle}>{product.title}</p>
                <div className={styles.priceContainer}>
                  <p className={styles.newArrivalsPrice}>{product.price}</p>
                  <span className={styles.currency}>EGP</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default React.memo(NewArrivals);
