import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../../hooks/useCart';
import './Navigation.css';

function Navigation() {
  const location = useLocation();
  const { cartItemsCount } = useCart();
  const isLoggedIn = Boolean(localStorage.getItem('token'));

  return (
    <nav className="navigation">
      <ul>
        {isLoggedIn && (
          <>
            <li className={location.pathname === '/products' ? 'active' : ''}>
              <Link to="/products">Products</Link>
            </li>
            <li className={location.pathname === '/cart' ? 'active' : ''}>
              <Link to="/cart">
                Cart {cartItemsCount > 0 && <span className="cart-badge">{cartItemsCount}</span>}
              </Link>
            </li>
            <li className={location.pathname === '/payment' ? 'active' : ''}>
              <Link to="/payment">Payment</Link>
            </li>
          </>
        )}
        <li>
          {isLoggedIn ? (
            <a
              href="#"
              onClick={() => {
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                window.location.href = '/login';
              }}
            >
              Logout
            </a>
          ) : (
            <Link to="/login">Login</Link>
          )}
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;