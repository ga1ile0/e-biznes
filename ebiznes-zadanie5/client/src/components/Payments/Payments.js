import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Payments.css';

function Payments() {
  const navigate = useNavigate();
  const [cartTotal, setCartTotal] = useState(0);
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

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    setCartTotal(total);
    
    setPaymentData(prev => ({
      ...prev,
      amount: total
    }));
  }, []);

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
      
      localStorage.removeItem('cart');
      
      setPaymentData({
        card_number: '',
        card_holder_name: '',
        expiry_date: '',
        cvv: '',
        amount: 0
      });
      
      setTimeout(() => {
        navigate('/');
      }, 2000);
      
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="payment-container">
      <h1>Payment Form</h1>
      
      {cartTotal === 0 && (
        <div className="empty-payment">
          <p>Your cart is empty. Add items to your cart before proceeding to payment.</p>
          <button onClick={() => navigate('/')} className="return-button">Return to Products</button>
        </div>
      )}
      
      {cartTotal > 0 && (
        <>
          <div className="order-summary">
            <h2>Order Summary</h2>
            <p className="total-amount">Total Amount: <span>${cartTotal.toFixed(2)}</span></p>
          </div>
          
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
            
            <button type="submit" className="pay-button" disabled={loading}>
              {loading ? 'Processing...' : `Pay $${cartTotal.toFixed(2)}`}
            </button>
          </form>
        </>
      )}
    </div>
  );
}

export default Payments;