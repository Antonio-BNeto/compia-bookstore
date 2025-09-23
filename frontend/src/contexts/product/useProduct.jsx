import { useContext } from "react";
import { ProductContext } from "./ProductContext";

export function useProducts() {
  return useContext(ProductContext);
}
