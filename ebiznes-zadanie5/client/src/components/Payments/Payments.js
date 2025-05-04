import React, { useState } from 'react';
import './Payments.css';

function Payments() {
  const [paymentData, setPaymentData] = useState({
    card_number: '',
    card_holder_name: '',
    expiry_date: '',
    cvv: '',
    amount: 0
  });
  
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setPaymentData({
      ...paymentData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');

    try {
      const response = await fetch('http://localhost:8080/api/payments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(paymentData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Payment processing failed');
      }

      setMessage('Payment processed successfully!');
      setPaymentData({
        card_number: '',
        card_holder_name: '',
        expiry_date: '',
        cvv: '',
        amount: 0
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="payment-container">
      <h1>Payment Form</h1>
      
      {message && <div className="success-message">{message}</div>}
      {error && <div className="error-message">{error}</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="card_number">Card Number</label>
          <input
            type="text"
            id="card_number"
            name="card_number"
            value={paymentData.card_number}
            onChange={handleChange}
            placeholder="1234 5678 9012 3456"
            required
            maxLength={16}
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="card_holder_name">Cardholder Name</label>
          <input
            type="text"
            id="card_holder_name"
            name="card_holder_name"
            value={paymentData.card_holder_name}
            onChange={handleChange}
            placeholder="John Doe"
            required
          />
        </div>
        
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="expiry_date">Expiry Date</label>
            <input
              type="text"
              id="expiry_date"
              name="expiry_date"
              value={paymentData.expiry_date}
              onChange={handleChange}
              placeholder="MM/YY"
              required
              maxLength={5}
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="cvv">CVV</label>
            <input
              type="text"
              id="cvv"
              name="cvv"
              value={paymentData.cvv}
              onChange={handleChange}
              placeholder="123"
              required
              maxLength={3}
            />
          </div>
        </div>
        
        <div className="form-group">
          <label htmlFor="amount">Amount ($)</label>
          <input
            type="number"
            id="amount"
            name="amount"
            value={paymentData.amount}
            onChange={handleChange}
            placeholder="100.00"
            step="0.01"
            min="0.01"
            required
          />
        </div>
        
        <button type="submit" className="pay-button" disabled={loading}>
          {loading ? 'Processing...' : 'Process Payment'}
        </button>
      </form>
    </div>
  );
}

export default Payments;