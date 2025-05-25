import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../../hooks/useCart';
import './Navigation.css';

function Navigation() {
  const location = useLocation();
  const { cartItemsCount } = useCart();
  
  return (
    <nav className="navigation">
      <ul>
        <li className={location.pathname === '/' ? 'active' : ''}>
          <Link to="/">Products</Link>
        </li>
        <li className={location.pathname === '/cart' ? 'active' : ''}>
          <Link to="/cart">Cart {cartItemsCount > 0 && <span className="cart-badge">{cartItemsCount}</span>}</Link>
        </li>
        <li className={location.pathname === '/payment' ? 'active' : ''}>
          <Link to="/payment">Payment</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;