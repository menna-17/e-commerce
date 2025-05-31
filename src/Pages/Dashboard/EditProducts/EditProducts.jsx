import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axiosInstance from "../../../Apis/config.js";
import styles from "./EditProducts.module.css";
import { FiPlus } from "react-icons/fi"; // ✅ Icon import

function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({ name: "", price: "" });
  const [editIndex, setEditIndex] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    setLoading(true);
    axiosInstance
      .get(`/api/products?page=${page}`)
      .then((res) => {
        const data = res.data;
        if (Array.isArray(data)) {
          setProducts(data);
        } else if (Array.isArray(data.products)) {
          setProducts(data.products);
        } else if (data.data && Array.isArray(data.data.products)) {
          setProducts(data.data.products);
        } else {
          throw new Error("Unexpected API response structure");
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
        setError("Error fetching products");
        setLoading(false);
      });
  }, [page]);

  const handleAdd = () => {
    setProducts([...products, newProduct]);
    setNewProduct({ name: "", price: "" });
  };

  const handleEdit = (index) => {
    setNewProduct(products[index]);
    setEditIndex(index);
  };

  const handleUpdate = () => {
    const updated = [...products];
    updated[editIndex] = newProduct;
    setProducts(updated);
    setNewProduct({ name: "", price: "" });
    setEditIndex(null);
  };

  return (
    <div className={`container ${styles.productsPage}`}>
      <h2 className="text-center">Products Dashboard</h2>

      {error && <div className="alert alert-danger">{error}</div>}
      {loading && <div className="alert alert-info">Loading products...</div>}

      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (editIndex === null) {
            handleAdd();
          } else {
            handleUpdate();
          }
        }}
        className={`p-3 mb-4 border rounded ${styles.formSection}`}
      >
        <h5 className="mb-3">
          {editIndex === null ? "Add New Product" : "Edit Product"}
        </h5>
        <input
          type="text"
          className={`form-control mb-2 ${styles.inputControl}`}
          placeholder="Product Name"
          value={newProduct.name}
          onChange={(e) =>
            setNewProduct({ ...newProduct, name: e.target.value })
          }
          required
        />
        <input
          type="number"
          className={`form-control mb-2 ${styles.inputControl}`}
          placeholder="Price"
          value={newProduct.price}
          onChange={(e) =>
            setNewProduct({ ...newProduct, price: e.target.value })
          }
          required
          min="0"
          step="0.01"
        />
        <button
          type="submit"
          className={`btn w-100 ${
            editIndex === null ? styles.customAddBtn : styles.btnWarning
          }`}
        >
          {editIndex === null ? (
            <span className="d-flex align-items-center justify-content-center gap-2">
              <FiPlus color="white" size={22} />
              Add Product
            </span>
          ) : (
            "Update Product"
          )}
        </button>
      </form>

      <table
        className={`table table-hover table-bordered text-center ${styles.tableStyle}`}
      >
        <thead className={styles.tableHead}>
          <tr>
            <th>Name</th>
            <th>Price (EGP)</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody className={styles.tableHover}>
          {products.length > 0 ? (
            products.map((p, i) => (
              <tr key={i}>
                <td className={styles.tableCell}>{p.name || p.title}</td>
                <td className={styles.tableCell}>{p.price}</td>
                <td className={styles.tableCell}>
                  <button
                    className={`btn btn-sm ${styles.btnWarning}`}
                    onClick={() => handleEdit(i)}
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" className="text-muted">
                No products found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <div
        className={`d-flex justify-content-center align-items-center gap-3 mt-4 ${styles.paginationWrapper}`}
      >
        <button
          className={styles.paginationBtn}
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
        >
          Previous
        </button>

        <span className={styles.pageNumber}>Page {page}</span>

        <button
          className={styles.paginationBtn}
          onClick={() => setPage((prev) => prev + 1)}
          disabled={page === 3} // Replace with a dynamic condition if needed
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default ProductsPage;
