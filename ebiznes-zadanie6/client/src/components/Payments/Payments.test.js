import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import Payments from './Payments';
import { CartContext } from '../../context/CartContext';

global.fetch = jest.fn();

const mockedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedNavigate
}));

describe('Payments Component', () => {
  beforeEach(() => {
    fetch.mockClear();
    mockedNavigate.mockClear();
  });

  test('displays empty payment message when cart is empty', () => {
    const contextValue = {
      cartItems: [],
      calculateTotal: jest.fn(() => 0),
      clearCart: jest.fn()
    };
    
    render(
      <BrowserRouter>
        <CartContext.Provider value={contextValue}>
          <Payments />
        </CartContext.Provider>
      </BrowserRouter>
    );
    
    expect(screen.getByText('Payment Form')).toBeInTheDocument();
    expect(screen.getByText('Your cart is empty. Add items to your cart before proceeding to payment.')).toBeInTheDocument();
    expect(screen.getByText('Return to Products')).toBeInTheDocument();
  });
  
  test('renders payment form with total when cart has items', () => {
    const cartItems = [
      { id: 1, name: 'Item 1', price: 29.99, quantity: 2 }
    ];
    
    const contextValue = {
      cartItems,
      calculateTotal: jest.fn(() => 59.98),
      clearCart: jest.fn()
    };
    
    render(
      <BrowserRouter>
        <CartContext.Provider value={contextValue}>
          <Payments />
        </CartContext.Provider>
      </BrowserRouter>
    );
    
    expect(screen.getByText('Payment Form')).toBeInTheDocument();
    expect(screen.getByText('Order Summary')).toBeInTheDocument();
    expect(screen.getByText('Total Amount:')).toBeInTheDocument();
    expect(screen.getByText('$59.98')).toBeInTheDocument();
    
    expect(screen.getByLabelText('Card Number')).toBeInTheDocument();
    expect(screen.getByLabelText('Cardholder Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Expiry Date')).toBeInTheDocument();
    expect(screen.getByLabelText('CVV')).toBeInTheDocument();
    
    expect(screen.getByText('Pay $59.98')).toBeInTheDocument();
  });
  
  test('validates form fields are required', () => {
    const contextValue = {
      cartItems: [{ id: 1, name: 'Item 1', price: 29.99, quantity: 2 }],
      calculateTotal: jest.fn(() => 59.98),
      clearCart: jest.fn()
    };
    
    render(
      <BrowserRouter>
        <CartContext.Provider value={contextValue}>
          <Payments />
        </CartContext.Provider>
      </BrowserRouter>
    );
    
    const submitButton = screen.getByText('Pay $59.98');
    fireEvent.click(submitButton);

    const cardNumberInput = screen.getByLabelText('Card Number');
    const cardHolderInput = screen.getByLabelText('Cardholder Name');
    const expiryInput = screen.getByLabelText('Expiry Date');
    const cvvInput = screen.getByLabelText('CVV');
    
    expect(cardNumberInput).toBeRequired();
    expect(cardHolderInput).toBeRequired();
    expect(expiryInput).toBeRequired();
    expect(cvvInput).toBeRequired();
  });
  
  test('submits payment data and handles success', async () => {
    const clearCart = jest.fn();
    
    const contextValue = {
      cartItems: [{ id: 1, name: 'Item 1', price: 29.99, quantity: 2 }],
      calculateTotal: jest.fn(() => 59.98),
      clearCart
    };
    
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ message: 'Payment processed successfully' })
    });
    
    render(
      <BrowserRouter>
        <CartContext.Provider value={contextValue}>
          <Payments />
        </CartContext.Provider>
      </BrowserRouter>
    );
    
    fireEvent.change(screen.getByLabelText('Card Number'), {
      target: { value: '4242424242424242' }
    });
    
    fireEvent.change(screen.getByLabelText('Cardholder Name'), {
      target: { value: 'Test User' }
    });
    
    fireEvent.change(screen.getByLabelText('Expiry Date'), {
      target: { value: '12/25' }
    });
    
    fireEvent.change(screen.getByLabelText('CVV'), {
      target: { value: '123' }
    });
    
    fireEvent.click(screen.getByText('Pay $59.98'));
    
    expect(fetch).toHaveBeenCalledWith(
      'http://localhost:8080/api/payments',
      expect.objectContaining({
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: expect.any(String)
      })
    );
    
    const callBody = JSON.parse(fetch.mock.calls[0][1].body);
    expect(callBody.card_number).toBe('4242424242424242');
    expect(callBody.card_holder_name).toBe('Test User');
    expect(callBody.expiry_date).toBe('12/25');
    expect(callBody.cvv).toBe('123');
    expect(callBody.amount).toBe(59.98);
    
    await waitFor(() => {
      expect(screen.getByText('Payment processed successfully!')).toBeInTheDocument();
    });
    
    expect(clearCart).toHaveBeenCalled();
    
    jest.advanceTimersByTime(2100); 
    expect(mockedNavigate).toHaveBeenCalledWith('/');
  });
  
  test('handles payment errors', async () => {
    const contextValue = {
      cartItems: [{ id: 1, name: 'Item 1', price: 29.99, quantity: 2 }],
      calculateTotal: jest.fn(() => 59.98),
      clearCart: jest.fn()
    };
    
    fetch.mockResolvedValueOnce({
      ok: false,
      json: async () => ({ error: 'Payment failed' })
    });
    
    render(
      <BrowserRouter>
        <CartContext.Provider value={contextValue}>
          <Payments />
        </CartContext.Provider>
      </BrowserRouter>
    );
    
    fireEvent.change(screen.getByLabelText('Card Number'), { target: { value: '4242424242424242' } });
    fireEvent.change(screen.getByLabelText('Cardholder Name'), { target: { value: 'Test User' } });
    fireEvent.change(screen.getByLabelText('Expiry Date'), { target: { value: '12/25' } });
    fireEvent.change(screen.getByLabelText('CVV'), { target: { value: '123' } });
    fireEvent.click(screen.getByText('Pay $59.98'));
    
    await waitFor(() => {
      expect(screen.getByText('Payment failed')).toBeInTheDocument();
    });
  });
});