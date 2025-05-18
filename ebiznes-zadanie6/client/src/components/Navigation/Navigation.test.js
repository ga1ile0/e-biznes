import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import Navigation from './Navigation';
import { CartContext } from '../../context/CartContext';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: () => ({ pathname: '/' })
}));

describe('Navigation Component', () => {
  test('renders navigation menu with all links', () => {
    const contextValue = {
      cartItemsCount: 0
    };
    
    render(
      <BrowserRouter>
        <CartContext.Provider value={contextValue}>
          <Navigation />
        </CartContext.Provider>
      </BrowserRouter>
    );
    
    expect(screen.getByRole('navigation')).toBeInTheDocument();
    expect(screen.getByText('Products')).toBeInTheDocument();
    expect(screen.getByText('Cart')).toBeInTheDocument();
    expect(screen.getByText('Payment')).toBeInTheDocument();
    
    const links = screen.getAllByRole('link');
    expect(links).toHaveLength(3);
    expect(links[0]).toHaveAttribute('href', '/');
    expect(links[1]).toHaveAttribute('href', '/cart');
    expect(links[2]).toHaveAttribute('href', '/payment');
  });
  
  test('shows cart badge when count > 0', () => {
    const contextValue = {
      cartItemsCount: 5
    };
    
    render(
      <BrowserRouter>
        <CartContext.Provider value={contextValue}>
          <Navigation />
        </CartContext.Provider>
      </BrowserRouter>
    );
    
    const badge = screen.getByText('5');
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveClass('cart-badge');
  });
  
  test('does not show cart badge when count = 0', () => {
    const contextValue = {
      cartItemsCount: 0
    };
    
    render(
      <BrowserRouter>
        <CartContext.Provider value={contextValue}>
          <Navigation />
        </CartContext.Provider>
      </BrowserRouter>
    );
    
    expect(screen.queryByClass('cart-badge')).not.toBeInTheDocument();
  });
  
  test('highlights active route (Products)', () => {
    jest.spyOn(require('react-router-dom'), 'useLocation').mockImplementation(() => ({
      pathname: '/'
    }));
    
    const contextValue = {
      cartItemsCount: 0
    };
    
    render(
      <BrowserRouter>
        <CartContext.Provider value={contextValue}>
          <Navigation />
        </CartContext.Provider>
      </BrowserRouter>
    );
    
    const productLink = screen.getByText('Products').closest('li');
    const cartLink = screen.getByText('Cart').closest('li');
    const paymentLink = screen.getByText('Payment').closest('li');
    
    expect(productLink).toHaveClass('active');
    expect(cartLink).not.toHaveClass('active');
    expect(paymentLink).not.toHaveClass('active');
  });
});