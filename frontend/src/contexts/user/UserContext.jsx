/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../../services/mockApi';

export const UserContext = createContext();

export function UserProvider({ children }) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setUsers(api.getUsers());
    setLoading(false);
  }, []);
  
  const value = { users, loading };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export const useUsers = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUsers deve ser usado dentro de um UserProvider');
  }
  return context;
};