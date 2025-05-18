import React, { useState } from 'react';
import { useCart } from '../../Context/CartContext';
import { useNavigate } from 'react-router-dom';

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
    <div className="container py-4">
   

      <form onSubmit={handleSubmit}>

        {/* Contact Section */}
        <h4>Contact </h4>
        <div className="mb-3">
          <label>Email:</label>
          <input type="email" name="email" className="form-control" required onChange={handleChange} />
        </div>

        {/* Delivery Section */}
        <h4>Delivery </h4>
        <div className="mb-3">
          <label>Country/Region:</label>
          <input type="text" name="country" className="form-control" value="Egypt" readOnly />
        </div>

        <div className="mb-3">
          <label>First Name:</label>
          <input type="text" name="firstName" className="form-control" required onChange={handleChange} />
        </div>

        <div className="mb-3">
          <label>Last Name:</label>
          <input type="text" name="lastName" className="form-control" required onChange={handleChange} />
        </div>

        <div className="mb-3">
          <label>Address:</label>
          <input type="text" name="address" className="form-control" required onChange={handleChange} />
        </div>

        <div className="mb-3">
          <label>Apartment (optional):</label>
          <input type="text" name="apartment" className="form-control" onChange={handleChange} />
        </div>

        <div className="mb-3">
          <label>City:</label>
          <input type="text" name="city" className="form-control" required onChange={handleChange} />
        </div>

        <div className="mb-3">
          <label>Governorate:</label>
          <select name="governorate" className="form-control" required onChange={handleChange}>
            <option value="">Select Governorate</option>
            {egyptGovernorates.map((gov, idx) => (
              <option key={idx} value={gov}>{gov}</option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label>Postal Code:</label>
          <input type="text" name="postalCode" className="form-control" required onChange={handleChange} />
        </div>

        <div className="mb-3">
          <label>Phone:</label>
          <input type="text" name="phone" className="form-control" required onChange={handleChange} />
        </div>

        {/* Payment Section */}
        <h4>Payment Method</h4>
        <div className="mb-3">
          <select name="paymentMethod" className="form-control" value={form.paymentMethod} onChange={handleChange}>
            <option value="Cash on Delivery">Cash on Delivery</option>
            <option value="Card">Debit/Credit Card</option>
            
          </select>
        </div>

        {/* Conditionally show payment inputs */}
        {form.paymentMethod === 'Card' && (
          <div>
            <div className="mb-3">
              <label>Card Number:</label>
              <input type="text" name="cardNumber" className="form-control" onChange={handleChange} required />
            </div>

            <div className="mb-3">
              <label>Cardholder Name:</label>
              <input type="text" name="cardName" className="form-control" onChange={handleChange} required />
            </div>

            <div className="mb-3">
              <label>Expiry Date:</label>
              <input type="text" name="expiry" placeholder="MM/YY" className="form-control" onChange={handleChange} required />
            </div>

            <div className="mb-3">
              <label>CVV:</label>
              <input type="text" name="cvv" className="form-control" onChange={handleChange} required />
            </div>
          </div>
        )}

      {/* Order Summary */}
<h4>Order Summary</h4>
<ul className="list-group mb-3">
  {cart.map((item, index) => (
    <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
      <div className="d-flex align-items-center">
        <img 
          src={item.images ? item.images : item.thumbnail} 
          alt={item.title} 
          style={{ width: '50px', height: '50px', objectFit: 'cover', marginRight: '10px', borderRadius: '4px' }} 
        />
        <span>{item.title}</span>
      </div>
      <span>${item.price}</span>
    </li>
  ))}
  <li className="list-group-item d-flex justify-content-between">
    <strong>Total</strong> <strong>${totalPrice}</strong>
  </li> 
</ul>


        <button type="submit" className="btn btn-success w-100">Place Order</button>
      </form>
    </div>
  );
};

export default Checkout;
