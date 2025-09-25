/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect } from "react";

// 1. Criar o contexto
export const CartContext = createContext(null);

// 2. Criar o Provider (o componente que gerencia o estado)
export function CartProvider({ children }) {
  // Inicializa o estado com o valor do localStorage ou um array vazio
  const [cartItems, setCartItems] = useState(() => {
    try {
      const savedCart = localStorage.getItem('compia_cart');
      return savedCart ? JSON.parse(savedCart) : [];
    } catch (error) {
      console.error("Falha ao ler o carrinho do localStorage", error);
      return [];
    }
  });

  // Salva o carrinho no localStorage sempre que ele for alterado
  useEffect(() => {
    localStorage.setItem('compia_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  // --- FUNÇÕES DE MANIPULAÇÃO DO CARRINHO ---

  /**
   * Adiciona um produto ao carrinho.
   * Se o produto (baseado no SKU) já existir, apenas incrementa a quantidade.
   */
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

  /**
   * Remove um produto completamente do carrinho, usando o SKU.
   */
  const removeFromCart = (sku) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.sku !== sku));
  };

  /**
   * Aumenta a quantidade de um item específico.
   */
  const increaseQuantity = (sku) => {
    setCartItems(prev => 
      prev.map(item => 
        item.sku === sku ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  /**
   * Diminui a quantidade de um item, com um mínimo de 1.
   */
  const decreaseQuantity = (sku) => {
    setCartItems(prev => 
      prev.map(item => 
        (item.sku === sku && item.quantity > 1) 
          ? { ...item, quantity: item.quantity - 1 } 
          : item
      )
    );
  };

  /**
   * Limpa todos os itens do carrinho.
   */
  const clearCart = () => {
    setCartItems([]);
  };
  
  /**
   * Calcula o valor total do carrinho.
   */
  const getTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };
  
  // Objeto de valor a ser passado para os componentes
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