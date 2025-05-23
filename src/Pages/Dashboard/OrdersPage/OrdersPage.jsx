import React, { useEffect, useState } from "react";
import styles from "./OrdersPage.module.css"; // ✅ import as module

function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error] = useState(null);

  useEffect(() => {
    const dummyOrders = [
      { id: 1, customer: "Alice Johnson", product: "Laptop", quantity: 1, status: "Shipped" },
      { id: 2, customer: "Mohamed Ali", product: "Smartphone", quantity: 2, status: "Delivered" },
      { id: 3, customer: "Sara Ahmed", product: "Headphones", quantity: 3, status: "Pending" },
    ];
    setTimeout(() => {
      setOrders(dummyOrders);
      setLoading(false);
    }, 500);
  }, []);

  if (loading) return <div className="text-center mt-5">Loading...</div>;
  if (error) return <div className="text-danger text-center">{error}</div>;

  return (
    <div className={styles.ordersPageContainer}>
      <h2 className="mb-4">View Orders</h2>
      <table className={`table table-striped ${styles.customTable}`}>
        <thead>
          <tr>
            <th>#</th>
            <th>Customer</th>
            <th>Product</th>
            <th>Quantity</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.length > 0 ? (
            orders.map((order, index) => (
              <tr key={order.id}>
                <td>{index + 1}</td>
                <td>{order.customer}</td>
                <td>{order.product}</td>
                <td>{order.quantity}</td>
                <td>{order.status}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center">
                No orders found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default OrdersPage;