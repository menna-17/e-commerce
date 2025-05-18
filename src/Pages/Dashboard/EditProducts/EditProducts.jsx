import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axiosInstance from "../../../Apis/config.js";
import './EditProducts.css'; // رابط ملف CSS الخارجي

function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({ name: '', price: '' });
  const [editIndex, setEditIndex] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosInstance
      .get('/products')
      .then((res) => {
        setProducts(res.data.products);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching products:', err);
        setError('Failed to load products');
        setLoading(false);
      });
  }, []);

  const handleAdd = () => {
    if (newProduct.name && newProduct.price) {
      setProducts([...products, newProduct]);
      setNewProduct({ name: '', price: '' });
    }
  };

  const handleEdit = (index) => {
    setNewProduct(products[index]);
    setEditIndex(index);
  };

  const handleUpdate = () => {
    const updated = [...products];
    updated[editIndex] = newProduct;
    setProducts(updated);
    setNewProduct({ name: '', price: '' });
    setEditIndex(null);
  };

  return (
    <div className="products-page container mt-5 p-4 shadow rounded bg-white">
      <h2 className="text-center mb-4 ">📦 Products Dashboard</h2>

      {error && <div className="alert alert-danger">{error}</div>}
      {loading && <div className="alert alert-info">Loading products...</div>}

      <div className="form-section p-3 mb-4 border rounded bg-light">
        <h5 className="mb-3">{editIndex === null ? "Add New Product" : "Edit Product"}</h5>
        <input
          type="text"
          className="form-control mb-2"
          placeholder="Product Name"
          value={newProduct.name}
          onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
        />
        <input
          type="number"
          className="form-control mb-2"
          placeholder="Price"
          value={newProduct.price}
          onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
        />
        {editIndex === null ? (
          <button className="btn btn-success w-100" onClick={handleAdd}>➕ Add Product</button>
        ) : (
          <button className="btn btn-warning w-100" onClick={handleUpdate}>✏️ Update Product</button>
        )}
      </div>

      <table className="table table-hover table-bordered text-center">
        <thead className="table-dark">
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Price ($)</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.length > 0 ? (
            products.map((p, i) => (
              <tr key={i}>
                <td>{i + 1}</td>
                <td>{p.name || p.title}</td>
                <td>{p.price}</td>
                <td>
                  <button className="btn btn-sm btn-outline-primary" onClick={() => handleEdit(i)}>Edit</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-muted">No products found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default ProductsPage;