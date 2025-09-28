/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from "../auth/AuthContext";
import { api, initializeDatabase } from "../../services/mockApi"; 

export const OrderContext = createContext();

export function OrderProvider({ children }) {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    initializeDatabase(); 
    setOrders(api.getOrders());
    setLoading(false);
  }, []);

  const placeOrder = (orderData) => {
    if (!user) {
      throw new Error("Usuário não autenticado.");
    }
    api.addOrder({
      ...orderData,
      userId: user.id,
    });
    setOrders(api.getOrders());
  };

  const updateOrderStatus = (orderId, newStatus) => {
    const updatedOrders = api.updateOrderStatus(orderId, newStatus);
    setOrders(updatedOrders);
  };
  
  const value = { orders, loading, placeOrder, updateOrderStatus };

  return <OrderContext.Provider value={value}>{children}</OrderContext.Provider>;
}

export const useOrders = () => useContext(OrderContext);