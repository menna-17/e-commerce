import React, { useEffect, useState } from 'react';
import axiosInstance from '../../Apis/config';
import ProductCard from '../../Components/ProductCard/ProductCard';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);  // Track loading state
  const [error, setError] = useState(null);      // Track error state

  useEffect(() => {
    axiosInstance.get('/api/products')  // Remove the base URL - it's already in axiosInstance
      .then((res) => {
        setProducts(res.data);  // Remove .products unless your backend wraps data in {products: [...]}
        setLoading(false);
      })
      .catch((err) => {
        setError(err.response?.data?.message || 'Error fetching products');
        setLoading(false);
        console.error('Error:', err.response?.data || err.message);
      });
  }, []);

  if (loading) {
    return <div>Loading products...</div>;  // Show loading message while data is being fetched
  }

  if (error) {
    return <div>{error}</div>;  // Show error message if something goes wrong
  }

  return (
    <div className="container py-4">
      <div className="row g-4">
        {products.map((product) => (
          <div className="col-sm-6 col-md-4 col-lg-3" key={product.id}>
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;