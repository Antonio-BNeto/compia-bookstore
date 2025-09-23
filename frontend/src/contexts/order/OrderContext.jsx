/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from "react";

export const OrderContext = createContext(null);

export function OrderProvider({ children }) {
  const [orders, setOrders] = useState([]);

  const placeOrder = (cart) => {
    const newOrder = {
      id: Date.now(),
      items: cart,
      date: new Date().toLocaleDateString(),
      status: "Pendente"
    };
    setOrders([...orders, newOrder]);
  };

  return (
    <OrderContext.Provider value={{ orders, placeOrder }}>
      {children}
    </OrderContext.Provider>
  );
}

export function useOrders() {
  return useContext(OrderContext);
}
