import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Outlet
} from 'react-router-dom';

import Navigation from './components/Navigation/Navigation';
import { CartProvider } from './context/CartContext';
import Products   from './components/Products/Products';
import Cart       from './components/Cart/Cart';
import Payments   from './components/Payments/Payments';
import Login      from './components/Auth/Login';
import Register   from './components/Auth/Register';
import OAuthCallback from './components/Auth/OAuthCallback';

import './App.css';

// Only for unauthenticated users; if logged in, send to /products
const PublicOnly = () => {
  const token = localStorage.getItem('token');
  return token
    ? <Navigate to="/products" replace />
    : <Outlet />;
};

// Only for authenticated users; if not logged in, send to /login
const RequireAuth = () => {
  const token = localStorage.getItem('token');
  return token
    ? <Outlet />
    : <Navigate to="/login" replace />;
};

function App() {
  return (
    <CartProvider>
      <Router>
        <div className="app">
          <header className="app-header">
            <h1>E-Commerce Store</h1>
          </header>

          <Navigation />

          <main>
            <Routes>
              {/* Root always => /login */}
              <Route path="/" element={<Navigate to="/login" replace />} />

              {/* Public routes */}
              <Route element={<PublicOnly />}>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/oauth/callback" element={<OAuthCallback />} />
              </Route>

              {/* Protected routes */}
              <Route element={<RequireAuth />}>
                <Route path="/products" element={<Products />} />
                <Route path="/cart"     element={<Cart />} />
                <Route path="/payment"  element={<Payments />} />
              </Route>

              {/* Any other path => /login */}
              <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>
          </main>

          <footer className="app-footer">
            <p>© 2025 E-Commerce Store</p>
          </footer>
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;