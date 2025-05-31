import { useEffect, useState } from "react";
import axiosInstance from "../../../Apis/config.js";
import styles from "./AdminView.module.css";

function AdminView() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editIndex, setEditIndex] = useState(null);
  const [editData, setEditData] = useState({
    title: "",
    price: "",
    category: "",
  });
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
        setError("Error fetching products");
        setLoading(false);
        console.error("Error fetching products:", err);
      });
  }, [page]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      setProducts(products.filter((product) => product.id !== id));
    }
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    setEditData({
      title: products[index].title,
      price: products[index].price,
      category: products[index].category,
    });
  };

  const handleSave = () => {
    const updatedProducts = [...products];
    updatedProducts[editIndex] = { ...updatedProducts[editIndex], ...editData };
    setProducts(updatedProducts);
    setEditIndex(null);
  };

  const handleCancel = () => {
    setEditIndex(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({ ...prev, [name]: value }));
  };

  if (loading)
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        Loading products...
      </div>
    );

  if (error)
    return (
      <div className="d-flex justify-content-center align-items-center vh-100 text-danger">
        {error}
      </div>
    );

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Admin - Products</h1>
      <table className={`table table-bordered table-hover table-striped ${styles.table}`}>
        <thead className={styles.tableHead}>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Category</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={product.id || index}>
              {editIndex === index ? (
                <>
                  <td className={styles.tableCell}>
                    <input
                      type="text"
                      name="title"
                      value={editData.title}
                      onChange={handleChange}
                      className={`form-control ${styles.input}`}
                    />
                  </td>
                  <td className={styles.tableCell}>
                    <input
                      type="number"
                      name="price"
                      value={editData.price}
                      onChange={handleChange}
                      className={`form-control ${styles.input}`}
                    />
                  </td>
                  <td className={styles.tableCell}>
                    <input
                      type="text"
                      name="category"
                      value={editData.category}
                      onChange={handleChange}
                      className={`form-control ${styles.input}`}
                    />
                  </td>
                </>
              ) : (
                <>
                  <td className={styles.tableCell}>{product.title}</td>
                  <td className={styles.tableCell}>${product.price}</td>
                  <td className={styles.tableCell}>{product.category}</td>
                </>
              )}
              <td className={styles.tableCell}>
                <div className={styles.actionButtons}>
                  {editIndex === index ? (
                    <>
                      <button
                        onClick={handleSave}
                        className={`btn ${styles.btnSuccess}`}
                      >
                        Save
                      </button>
                      <button
                        onClick={handleCancel}
                        className={`btn ${styles.btnWarning}`}
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => handleEdit(index)}
                        className={`btn btn-sm ${styles.btnWarning}`}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(product.id)}
                        className={`btn btn-sm ${styles.btnDanger}`}
                      >
                        Delete
                      </button>
                    </>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Buttons */}
      <div className={styles.pagination}>
        <button
          className={`btn btn-outline-primary ${styles.pageButton}`}
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
        >
          Previous
        </button>
        <span className={styles.pageInfo}>Page {page}</span>
        <button
          className={`btn btn-outline-primary ${styles.pageButton}`}
          onClick={() => setPage((prev) => prev + 1)}
          disabled={page === 3}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default AdminView;
