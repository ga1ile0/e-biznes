import React, { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(savedCart);
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.ID);
      
      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.ID ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        const newItem = {
          id: product.ID,
          name: product.name,
          price: product.price,
          description: product.description,
          imageUrl: product.image_url,
          quantity: 1
        };
        return [...prevItems, newItem];
      }
    });
  };

  const updateItemQuantity = (productId, quantity) => {
    if (quantity < 1) return;
    
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const removeItem = (productId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const cartItemsCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <CartContext.Provider 
      value={{ 
        cartItems, 
        addToCart, 
        updateItemQuantity, 
        removeItem, 
        clearCart,
        calculateTotal,
        cartItemsCount
      }}
    >
      {children}
    </CartContext.Provider>
  );
};