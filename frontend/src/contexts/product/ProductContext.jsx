/* eslint-disable react-refresh/only-export-components */
import { createContext, useState } from "react";

export const ProductContext = createContext(null);

const mockProducts = [
  {
    id: 1,
    title: "Introdução à Inteligência Artificial",
    author: "Maria Silva",
    price: 89.90,
    image: "/assets/books/ia.jpg",
    category: "Inteligência Artificial"
  },
  {
    id: 2,
    title: "Algoritmos Modernos",
    author: "João Souza",
    price: 120.00,
    image: "/assets/books/algorithms.png",
    category: "Programação"
  }
];

export function ProductProvider({ children }) {
  const [products] = useState(mockProducts);

  return (
    <ProductContext.Provider value={{ products }}>
      {children}
    </ProductContext.Provider>
  );
}

