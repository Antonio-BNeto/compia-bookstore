import { createContext, useContext, useState, ReactNode } from "react";

export type Product = {
  id: number;
  title: string;
  author: string;
  price: number;
  image: string;
  category: string;
};

type ProductContextType = {
  products: Product[];
};

const ProductContext = createContext<ProductContextType | undefined>(undefined);

const mockProducts: Product[] = [
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

export function ProductProvider({ children }: { children: ReactNode }) {
  const [products] = useState<Product[]>(mockProducts);

  return (
    <ProductContext.Provider value={{ products }}>
      {children}
    </ProductContext.Provider>
  );
}

export function useProducts() {
  const ctx = useContext(ProductContext);
  if (!ctx) throw new Error("useProducts deve ser usado dentro de ProductProvider");
  return ctx;
}
