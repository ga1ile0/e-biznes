import React from 'react';
import Products from './components/products/Products';
import Payments from './components/payments/Payments';
import './App.css';

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1>E-Commerce Store</h1>
      </header>
      <main>
        <Products />
        <Payments />
      </main>
      <footer className="app-footer">
        <p>© 2025 E-Commerce Store</p>
      </footer>
    </div>
  );
}

export default App;