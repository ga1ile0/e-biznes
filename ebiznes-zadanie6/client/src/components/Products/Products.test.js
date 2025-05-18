import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Products from './Products';
import { CartProvider } from '../../context/CartContext';

global.fetch = jest.fn();

describe('Products Component', () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  test('displays loading state initially', () => {
    fetch.mockImplementationOnce(() => new Promise(resolve => setTimeout(resolve, 100)));
    
    render(
      <CartProvider>
        <Products />
      </CartProvider>
    );
    
    expect(screen.getByText('Loading products...')).toBeInTheDocument();
  });
  
  test('renders products when data is fetched successfully', async () => {
    const mockProducts = [
      { ID: 1, name: 'Test Product 1', description: 'Description 1', price: 99.99, image_url: 'image1.jpg' },
      { ID: 2, name: 'Test Product 2', description: 'Description 2', price: 149.99, image_url: 'image2.jpg' }
    ];
    
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockProducts
    });
    
    render(
      <CartProvider>
        <Products />
      </CartProvider>
    );
    
    await waitFor(() => {
      expect(screen.queryByText('Loading products...')).not.toBeInTheDocument();
    });
    
    expect(screen.getByText('Products')).toBeInTheDocument();
    expect(screen.getByText('Test Product 1')).toBeInTheDocument();
    expect(screen.getByText('Description 1')).toBeInTheDocument();
    expect(screen.getByText('$99.99')).toBeInTheDocument();
    expect(screen.getByText('Test Product 2')).toBeInTheDocument();
    expect(screen.getByText('Description 2')).toBeInTheDocument();
    expect(screen.getByText('$149.99')).toBeInTheDocument();
    
    const buyButtons = screen.getAllByText('Add to Cart');
    expect(buyButtons).toHaveLength(2);
  });
  
  test('displays error message when fetch fails', async () => {
    fetch.mockRejectedValueOnce(new Error('Network error'));
    
    render(
      <CartProvider>
        <Products />
      </CartProvider>
    );
    
    await waitFor(() => {
      expect(screen.queryByText('Loading products...')).not.toBeInTheDocument();
    });
    
    expect(screen.getByText(/Error loading products/)).toBeInTheDocument();
    expect(screen.getByText(/Network error/)).toBeInTheDocument();
  });
  
  test('calls addToCart when Add to Cart button is clicked', async () => {
    const mockProducts = [
      { ID: 1, name: 'Test Product 1', description: 'Description 1', price: 99.99, image_url: 'image1.jpg' }
    ];
    
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockProducts
    });
    
    render(
      <CartProvider>
        <Products />
      </CartProvider>
    );
    
    await waitFor(() => {
      expect(screen.queryByText('Loading products...')).not.toBeInTheDocument();
    });
    
    const addToCartButton = screen.getByText('Add to Cart');
    fireEvent.click(addToCartButton);
    
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    expect(cartItems).toHaveLength(1);
    expect(cartItems[0].id).toBe(1);
    expect(cartItems[0].name).toBe('Test Product 1');
    expect(cartItems[0].price).toBe(99.99);
    expect(cartItems[0].quantity).toBe(1);
  });
});