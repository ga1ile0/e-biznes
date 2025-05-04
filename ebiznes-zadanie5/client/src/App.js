import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Products from './components/Products/Products';
import Payments from './components/Payments/Payments';
import Cart from './components/Cart/Cart';
import Navigation from './components/Navigation/Navigation';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <header className="app-header">
          <h1>E-Commerce Store</h1>
        </header>
        
        <Navigation />
        
        <main>
          <Routes>
            <Route path="/" element={<Products />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/payment" element={<Payments />} />
          </Routes>
        </main>
        
        <footer className="app-footer">
          <p>© 2025 E-Commerce Store</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;