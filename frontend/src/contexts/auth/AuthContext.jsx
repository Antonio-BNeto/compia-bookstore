/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect } from 'react';
import { api } from "../../services/mockApi"; // Corrigido para 'mockApi' (minúsculo)

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // CORREÇÃO: Usando a chave correta 'compia_user' (singular)
    const savedUser = localStorage.getItem('compia_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = (username, password) => {
    const users = api.getUsers();
    
    // A linha abaixo foi alterada para ser mais segura
    const foundUser = users.find(
      (u) => 
        // CORREÇÃO: Verifica se 'u.username' é uma string antes de comparar
        typeof u.username === 'string' && 
        u.username.toLowerCase() === username.toLowerCase() && 
        u.password === password
    );

    if (foundUser) {
      setUser(foundUser);
      localStorage.setItem('compia_user', JSON.stringify(foundUser));
      return foundUser;
    }
    return null;
  };
  
  const register = (newUserData) => {
    const createdUser = api.addUser(newUserData);
    return createdUser;
  };

  const logout = () => {
    setUser(null);
    // Remove a chave correta ao deslogar
    localStorage.removeItem('compia_user');
  };

  const value = { user, login, logout, register, loading, isAuthenticated: !!user };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);