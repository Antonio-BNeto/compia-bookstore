/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect } from 'react';
import { api } from "../../services/mockApi"; 

export const OrderContext = createContext();

export function OrderProvider({ children }) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    setOrders(api.getOrders());
    setLoading(false);
  }, []);

  const placeOrder = (orderData) => {
    const newOrder = api.addOrder(orderData);
    setOrders(prev => [...prev, newOrder]);
  };

  const updateOrderStatus = (orderId, newStatus) => {
    const updatedOrders = api.updateOrderStatus(orderId, newStatus);
    setOrders(updatedOrders);
  };
  
  const value = { orders, loading, placeOrder, updateOrderStatus };

  return <OrderContext.Provider value={value}>{children}</OrderContext.Provider>;
}

export const useOrders = () => useContext(OrderContext);