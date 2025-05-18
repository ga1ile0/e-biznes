import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import Cart from './Cart';
import { CartContext } from '../../context/CartContext';

describe('Cart Component', () => {
  test('displays empty cart message when cart is empty', () => {
    const contextValue = {
      cartItems: [],
      updateItemQuantity: jest.fn(),
      removeItem: jest.fn(),
      calculateTotal: jest.fn(() => 0)
    };
    
    render(
      <BrowserRouter>
        <CartContext.Provider value={contextValue}>
          <Cart />
        </CartContext.Provider>
      </BrowserRouter>
    );
    
    expect(screen.getByText('Your Cart')).toBeInTheDocument();
    expect(screen.getByText('Your cart is empty')).toBeInTheDocument();
    expect(screen.getByText('Continue Shopping')).toBeInTheDocument();
  });
  
  test('renders cart items correctly', () => {
    const cartItems = [
      { id: 1, name: 'Test Item 1', price: 10.99, quantity: 1, imageUrl: 'image1.jpg' },
      { id: 2, name: 'Test Item 2', price: 19.99, quantity: 2, imageUrl: 'image2.jpg' }
    ];
    
    const contextValue = {
      cartItems,
      updateItemQuantity: jest.fn(),
      removeItem: jest.fn(),
      calculateTotal: jest.fn(() => 50.97)
    };
    
    render(
      <BrowserRouter>
        <CartContext.Provider value={contextValue}>
          <Cart />
        </CartContext.Provider>
      </BrowserRouter>
    );
    
    expect(screen.getByText('Your Cart')).toBeInTheDocument();
    expect(screen.queryByText('Your cart is empty')).not.toBeInTheDocument();
    
    expect(screen.getByText('Test Item 1')).toBeInTheDocument();
    expect(screen.getByText('$10.99')).toBeInTheDocument();
    expect(screen.getByText('Test Item 2')).toBeInTheDocument();
    expect(screen.getByText('$19.99')).toBeInTheDocument();
    
    expect(screen.getAllByText('1')[0]).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    
    expect(screen.getByText('$10.99')).toBeInTheDocument();
    expect(screen.getByText('$39.98')).toBeInTheDocument();
    
    expect(screen.getByText('$50.97')).toBeInTheDocument();
  });
  
  test('updateItemQuantity is called when + button is clicked', () => {
    const updateItemQuantity = jest.fn();
    
    const cartItems = [
      { id: 1, name: 'Test Item', price: 10.99, quantity: 1, imageUrl: 'image1.jpg' }
    ];
    
    const contextValue = {
      cartItems,
      updateItemQuantity,
      removeItem: jest.fn(),
      calculateTotal: jest.fn(() => 10.99)
    };
    
    render(
      <BrowserRouter>
        <CartContext.Provider value={contextValue}>
          <Cart />
        </CartContext.Provider>
      </BrowserRouter>
    );
    
    const increaseButton = screen.getAllByRole('button')[1];
    fireEvent.click(increaseButton);
    
    expect(updateItemQuantity).toHaveBeenCalledWith(1, 2);
  });
  
  test('updateItemQuantity is called when - button is clicked', () => {
    const updateItemQuantity = jest.fn();
    
    const cartItems = [
      { id: 1, name: 'Test Item', price: 10.99, quantity: 2, imageUrl: 'image1.jpg' }
    ];
    
    const contextValue = {
      cartItems,
      updateItemQuantity,
      removeItem: jest.fn(),
      calculateTotal: jest.fn(() => 21.98)
    };
    
    render(
      <BrowserRouter>
        <CartContext.Provider value={contextValue}>
          <Cart />
        </CartContext.Provider>
      </BrowserRouter>
    );
    
    const decreaseButton = screen.getAllByRole('button')[0];
    fireEvent.click(decreaseButton);
    
    expect(updateItemQuantity).toHaveBeenCalledWith(1, 1);
  });
  
  test('removeItem is called when remove button is clicked', () => {
    const removeItem = jest.fn();
    
    const cartItems = [
      { id: 1, name: 'Test Item', price: 10.99, quantity: 1, imageUrl: 'image1.jpg' }
    ];
    
    const contextValue = {
      cartItems,
      updateItemQuantity: jest.fn(),
      removeItem,
      calculateTotal: jest.fn(() => 10.99)
    };
    
    render(
      <BrowserRouter>
        <CartContext.Provider value={contextValue}>
          <Cart />
        </CartContext.Provider>
      </BrowserRouter>
    );
    
    const removeButton = screen.getByText('✕');
    fireEvent.click(removeButton);
    
    expect(removeItem).toHaveBeenCalledWith(1);
  });
});