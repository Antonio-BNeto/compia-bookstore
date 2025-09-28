/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect } from "react";

export const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const savedCart = localStorage.getItem('compia_cart');
      return savedCart ? JSON.parse(savedCart) : [];
    } catch (error) {
      console.error("Falha ao ler o carrinho do localStorage", error);
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('compia_cart', JSON.stringify(cartItems));
  }, [cartItems]);
  
  const addToCart = (itemToAdd) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.sku === itemToAdd.sku);

      if (existingItem) {
        return prevItems.map((item) =>
          item.sku === itemToAdd.sku ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevItems, { ...itemToAdd, quantity: 1 }];
    });
  };

  const removeFromCart = (sku) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.sku !== sku));
  };

  const increaseQuantity = (sku) => {
    setCartItems(prev => 
      prev.map(item => 
        item.sku === sku ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQuantity = (sku) => {
    setCartItems(prev => 
      prev.map(item => 
        (item.sku === sku && item.quantity > 1) 
          ? { ...item, quantity: item.quantity - 1 } 
          : item
      )
    );
  };


  const clearCart = () => {
    setCartItems([]);
  };
  
  const getTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };
  
  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
    getTotal,
    itemCount: cartItems.reduce((sum, item) => sum + item.quantity, 0)
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

// 3. Criar o hook customizado para facilitar o uso
export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}