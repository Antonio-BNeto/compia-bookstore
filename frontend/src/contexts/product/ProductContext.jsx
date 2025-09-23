/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from "react";
import { mockProducts } from "../../data/products";

export const ProductContext = createContext(null);

export function ProductProvider({ children }) {
  
  const [products, setProducts] = useState(mockProducts);


  const addProduct = (productData) => {
    const newProduct = {
      id: Date.now(),
      ...productData,
    };
    setProducts((prevProducts) => [...prevProducts, newProduct]);
  };

  const updateProduct = (productId, updatedData) => {
    setProducts((prevProducts) =>
      prevProducts.map((p) => (p.id === productId ? { ...p, ...updatedData } : p))
    );
  };
  
  const deleteProduct = (productId) => {
    setProducts((prevProducts) => prevProducts.filter((p) => p.id !== productId));
  };
  
  const value = {
    products,
    addProduct,
    updateProduct,
    deleteProduct,
  };

  return (
    <ProductContext.Provider value={value}>
      {children}
    </ProductContext.Provider>
  );
}

export function useProducts() {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
}