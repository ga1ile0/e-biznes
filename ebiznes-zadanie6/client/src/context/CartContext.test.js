import React from 'react';
import { render, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import { CartProvider, CartContext } from './CartContext';
import { localStorageMock } from '../setupTests/mockLocalStorage';

describe('CartContext', () => {
  beforeEach(() => {
    localStorage.clear();
  });
  
  test('initializes with empty cart when localStorage is empty', () => {
    let contextValue;
    
    render(
      <CartProvider>
        <CartContext.Consumer>
          {value => {
            contextValue = value;
            return null;
          }}
        </CartContext.Consumer>
      </CartProvider>
    );
    
    expect(contextValue.cartItems).toEqual([]);
    expect(contextValue.cartItemsCount).toBe(0);
    expect(contextValue.calculateTotal()).toBe(0);
  });
  
  test('loads cart from localStorage', () => {
    const mockCart = [
      { id: 1, name: 'Test Product', price: 29.99, quantity: 2 }
    ];
    localStorage.setItem('cart', JSON.stringify(mockCart));
    
    let contextValue;
    
    render(
      <CartProvider>
        <CartContext.Consumer>
          {value => {
            contextValue = value;
            return null;
          }}
        </CartContext.Consumer>
      </CartProvider>
    );
    
    expect(contextValue.cartItems).toEqual(mockCart);
    expect(contextValue.cartItemsCount).toBe(2);
    expect(contextValue.calculateTotal()).toBe(59.98);
  });
  
  test('adds a new item to cart', () => {
    let contextValue;
    
    const TestComponent = () => {
      const context = React.useContext(CartContext);
      contextValue = context;
      return null;
    };
    
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );
    
    const productToAdd = {
      ID: 1,
      name: 'Test Product',
      price: 29.99,
      description: 'Test description',
      image_url: 'test.jpg'
    };
    
    act(() => {
      contextValue.addToCart(productToAdd);
    });
    
    expect(contextValue.cartItems).toHaveLength(1);
    expect(contextValue.cartItems[0].id).toBe(1);
    expect(contextValue.cartItems[0].name).toBe('Test Product');
    expect(contextValue.cartItems[0].price).toBe(29.99);
    expect(contextValue.cartItems[0].quantity).toBe(1);
    expect(contextValue.cartItemsCount).toBe(1);
    
    const savedCart = JSON.parse(localStorage.getItem('cart'));
    expect(savedCart).toHaveLength(1);
    expect(savedCart[0].id).toBe(1);
  });
  
  test('increases quantity when adding existing item', () => {
    localStorage.setItem('cart', JSON.stringify([
      { id: 1, name: 'Test Product', price: 29.99, quantity: 1 }
    ]));
    
    let contextValue;
    
    const TestComponent = () => {
      const context = React.useContext(CartContext);
      contextValue = context;
      return null;
    };
    
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );
    
    const productToAdd = {
      ID: 1,
      name: 'Test Product',
      price: 29.99,
      description: 'Test description',
      image_url: 'test.jpg'
    };
    
    act(() => {
      contextValue.addToCart(productToAdd);
    });
    
    expect(contextValue.cartItems).toHaveLength(1);
    expect(contextValue.cartItems[0].quantity).toBe(2);
    expect(contextValue.cartItemsCount).toBe(2);
    expect(contextValue.calculateTotal()).toBe(59.98);
  });
  
  test('updates item quantity', () => {
    localStorage.setItem('cart', JSON.stringify([
      { id: 1, name: 'Test Product', price: 29.99, quantity: 1 }
    ]));
    
    let contextValue;
    
    const TestComponent = () => {
      const context = React.useContext(CartContext);
      contextValue = context;
      return null;
    };
    
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );
    
    act(() => {
      contextValue.updateItemQuantity(1, 3);
    });
    
    expect(contextValue.cartItems[0].quantity).toBe(3);
    expect(contextValue.cartItemsCount).toBe(3);
    expect(contextValue.calculateTotal()).toBe(89.97);
  });
  
  test('removes item from cart', () => {
    localStorage.setItem('cart', JSON.stringify([
      { id: 1, name: 'Test Product 1', price: 29.99, quantity: 1 },
      { id: 2, name: 'Test Product 2', price: 39.99, quantity: 1 }
    ]));
    
    let contextValue;
    
    const TestComponent = () => {
      const context = React.useContext(CartContext);
      contextValue = context;
      return null;
    };
    
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );
    
    expect(contextValue.cartItems).toHaveLength(2);
    
    act(() => {
      contextValue.removeItem(1);
    });
    
    expect(contextValue.cartItems).toHaveLength(1);
    expect(contextValue.cartItems[0].id).toBe(2);
    expect(contextValue.cartItemsCount).toBe(1);
    expect(contextValue.calculateTotal()).toBe(39.99);
  });
  
  test('clears the cart', () => {
    localStorage.setItem('cart', JSON.stringify([
      { id: 1, name: 'Test Product 1', price: 29.99, quantity: 1 },
      { id: 2, name: 'Test Product 2', price: 39.99, quantity: 2 }
    ]));
    
    let contextValue;
    
    const TestComponent = () => {
      const context = React.useContext(CartContext);
      contextValue = context;
      return null;
    };
    
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );
    
    expect(contextValue.cartItems).toHaveLength(2);
    expect(contextValue.cartItemsCount).toBe(3);
    
    act(() => {
      contextValue.clearCart();
    });
    
    expect(contextValue.cartItems).toHaveLength(0);
    expect(contextValue.cartItemsCount).toBe(0);
    expect(contextValue.calculateTotal()).toBe(0);
    
    expect(JSON.parse(localStorage.getItem('cart'))).toEqual([]);
  });
});