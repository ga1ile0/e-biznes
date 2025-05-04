import React, { useState, useEffect } from 'react';
import './Products.css';

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:8080/api/products')
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(error => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  const addToCart = (product) => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    const existingProduct = cart.find(item => item.id === product.ID);
    
    if (existingProduct) {
      const updatedCart = cart.map(item => 
        item.id === product.ID 
          ? { ...item, quantity: item.quantity + 1 } 
          : item
      );
      localStorage.setItem('cart', JSON.stringify(updatedCart));
    } else {
      const cartItem = {
        id: product.ID,
        name: product.name,
        price: product.price,
        description: product.description,
        imageUrl: product.image_url,
        quantity: 1
      };
      localStorage.setItem('cart', JSON.stringify([...cart, cartItem]));
    }
    
    setProducts([...products]);
  };

  if (loading) return <div className="loading">Loading products...</div>;
  if (error) return <div className="error">Error loading products: {error}</div>;

  return (
    <div className="products-container">
      <h1>Products</h1>
      <div className="product-list">
        {products.map(product => (
          <div className="product-card" key={product.ID}>
            <img src={product.image_url || 'https://via.placeholder.com/150'} alt={product.name} />
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p className="price">${product.price.toFixed(2)}</p>
            <button 
              className="buy-button" 
              onClick={() => addToCart(product)}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Products;