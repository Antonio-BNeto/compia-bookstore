/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect } from 'react';
import { api } from "../../services/mockApi";

export const ProductContext = createContext();

export function ProductProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setProducts(api.getProducts());
    setLoading(false);
  }, []);
  
  const addProduct = (productData) => {
    const newProduct = api.addProduct(productData);
    setProducts(prev => [...prev, newProduct]); // Atualiza o estado do React
  };

  const updateProduct = (productId, productData) => {
    const updatedProduct = api.updateProduct(productId, productData);
    setProducts(prev => prev.map(p => p.id === productId ? updatedProduct : p));
  };
  
  const deleteProduct = (productId) => {
    api.deleteProduct(productId);
    setProducts(prev => prev.filter(p => p.id !== productId));
  };

  const value = { products, loading, addProduct, updateProduct, deleteProduct };

  return <ProductContext.Provider value={value}>{children}</ProductContext.Provider>;
}

export const useProducts = () => useContext(ProductContext);