import { useEffect, useState } from "react";
import axiosInstance from "../../../Apis/config.js";

function AdminView() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({ title: "", price: "", category: "" });

  useEffect(() => {
    axiosInstance
      .get("/products")
      .then((res) => {
        setProducts(res.data.products);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || "Error fetching products");
        setLoading(false);
      });
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      const filtered = products.filter((product) => product.id !== id);
      const reIndexed = filtered.map((product, index) => ({
        ...product,
        id: index + 1,
      }));
      setProducts(reIndexed);
    }
  };

  const handleEdit = (product) => {
    setEditId(product.id);
    setEditData({
      title: product.title,
      price: product.price,
      category: product.category,
    });
  };

  const handleSave = (id) => {
    const updatedProducts = products.map((product) => {
      if (product.id === id) {
        return { ...product, ...editData };
      }
      return product;
    });
    setProducts(updatedProducts);
    setEditId(null);
  };

  const handleCancel = () => {
    setEditId(null);
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
    <div
      className="d-flex justify-content-center align-items-center bg-light p-4"
      style={{ minHeight: "calc(100vh - 56px)" }} // space below navbar (adjust if your navbar height differs)
    >
      <div className="w-100" style={{ maxWidth: "900px" }}>
        <h1 className="text-center mb-4">Admin - Products</h1>
        <table className="table table-bordered table-hover bg-white shadow-sm rounded">
          <thead className="table-light">
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Price</th>
              <th>Category</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>{product.id}</td>

                {editId === product.id ? (
                  <>
                    <td>
                      <input
                        type="text"
                        name="title"
                        value={editData.title}
                        onChange={handleChange}
                        className="form-control"
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        name="price"
                        value={editData.price}
                        onChange={handleChange}
                        className="form-control"
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        name="category"
                        value={editData.category}
                        onChange={handleChange}
                        className="form-control"
                      />
                    </td>
                  </>
                ) : (
                  <>
                    <td>${product.price}</td>
                    <td>{product.category}</td>
                    <td>{product.title}</td>
                  </>
                )}

                <td className="d-flex gap-2">
                  {editId === product.id ? (
                    <>
                      <button
                        onClick={() => handleSave(product.id)}
                        className="btn btn-success"
                      >
                        Save
                      </button>
                      <button
                        onClick={handleCancel}
                        className="btn btn-warning text-white"
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => handleEdit(product)}
                        className="btn btn-primary"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(product.id)}
                        className="btn btn-danger"
                      >
                        Delete
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminView;
