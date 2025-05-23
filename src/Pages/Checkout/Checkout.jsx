import React, { useState } from 'react';
import { useCart } from '../../Context/CartContext';
import { useNavigate } from 'react-router-dom';
import styles from './Checkout.module.css';

const egyptGovernorates = [
  "Cairo", "Giza", "Alexandria", "Dakahlia", "Red Sea", "Beheira", "Fayoum",
  "Gharbia", "Ismailia", "Monufia", "Minya", "Qaliubiya", "New Valley", "Suez",
  "Aswan", "Assiut", "Beni Suef", "Port Said", "Damietta", "Sharkia", "South Sinai",
  "Kafr El Sheikh", "Matrouh", "Luxor", "Qena", "North Sinai", "Sohag"
];

const Checkout = () => {
  const { cart } = useCart();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: '',
    country: 'Egypt',
    firstName: '',
    lastName: '',
    address: '',
    apartment: '',
    city: '',
    governorate: '',
    postalCode: '',
    phone: '',
    paymentMethod: 'Cash on Delivery',
    cardNumber: '',
    cardName: '',
    expiry: '',
    cvv: '',
  });

  const totalPrice = cart.reduce((total, item) => total + item.price, 0);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Order placed successfully!');
    navigate('/');
  };

  return (
    <div className={styles.checkoutContainer}>
      <form onSubmit={handleSubmit} className={styles.checkoutForm}>
        <h2 className={styles.sectionTitle}>Contact</h2>
        <div className={styles.formGroup}>
          <label>Email:</label>
          <input type="email" name="email" required onChange={handleChange} />
        </div>

        <h2 className={styles.sectionTitle}>Delivery</h2>
        <div className={styles.formGroup}>
          <label>Country/Region:</label>
          <input type="text" name="country" value="Egypt" readOnly />
        </div>
        <div className={styles.formGroup}>
          <label>First Name:</label>
          <input type="text" name="firstName" required onChange={handleChange} />
        </div>
        <div className={styles.formGroup}>
          <label>Last Name:</label>
          <input type="text" name="lastName" required onChange={handleChange} />
        </div>
        <div className={styles.formGroup}>
          <label>Address:</label>
          <input type="text" name="address" required onChange={handleChange} />
        </div>
        <div className={styles.formGroup}>
          <label>Apartment (optional):</label>
          <input type="text" name="apartment" onChange={handleChange} />
        </div>
        <div className={styles.formGroup}>
          <label>City:</label>
          <input type="text" name="city" required onChange={handleChange} />
        </div>
        <div className={styles.formGroup}>
          <label>Governorate:</label>
          <select name="governorate" required onChange={handleChange}>
            <option value="">Select Governorate</option>
            {egyptGovernorates.map((gov, idx) => (
              <option key={idx} value={gov}>{gov}</option>
            ))}
          </select>
        </div>
        <div className={styles.formGroup}>
          <label>Postal Code:</label>
          <input type="text" name="postalCode" required onChange={handleChange} />
        </div>
        <div className={styles.formGroup}>
          <label>Phone:</label>
          <input type="text" name="phone" required onChange={handleChange} />
        </div>

        <h2 className={styles.sectionTitle}>Payment Method</h2>
        <div className={styles.formGroup}>
          <select name="paymentMethod" value={form.paymentMethod} onChange={handleChange}>
            <option value="Cash on Delivery">Cash on Delivery</option>
            <option value="Card">Debit/Credit Card</option>
          </select>
        </div>

        {form.paymentMethod === 'Card' && (
          <>
            <div className={styles.formGroup}>
              <label>Card Number:</label>
              <input type="text" name="cardNumber" onChange={handleChange} required />
            </div>
            <div className={styles.formGroup}>
              <label>Cardholder Name:</label>
              <input type="text" name="cardName" onChange={handleChange} required />
            </div>
            <div className={styles.formGroup}>
              <label>Expiry Date:</label>
              <input type="text" name="expiry" placeholder="MM/YY" onChange={handleChange} required />
            </div>
            <div className={styles.formGroup}>
              <label>CVV:</label>
              <input type="text" name="cvv" onChange={handleChange} required />
            </div>
          </>
        )}

        <h2 className={styles.sectionTitle}>Order Summary</h2>
        <ul className={styles.orderSummary}>
          {cart.map((item, index) => (
            <li key={index} className={styles.summaryItem}>
              <div className={styles.itemDetails}>
                <img 
                  src={item.images ? item.images : item.thumbnail} 
                  alt={item.title} 
                />
                <span>{item.title}</span>
              </div>
              <span>${item.price}</span>
            </li>
          ))}
          <li className={styles.total}>
            <strong>Total</strong> <strong>${totalPrice}</strong>
          </li>
        </ul>

        <button type="submit" className={styles.submitButton}>Place Order</button>
      </form>
    </div>
  );
};

export default Checkout;
