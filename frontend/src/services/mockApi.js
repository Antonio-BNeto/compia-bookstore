import { mockProducts } from '../data/products';
import { mockUsers } from '../data/users';

// --- FUNÇÃO DE INICIALIZAÇÃO ---
// Garante que o "banco de dados" no localStorage tenha dados iniciais na primeira vez que o app roda.
export const initializeDatabase = () => {
  if (!localStorage.getItem('products')) {
    localStorage.setItem('products', JSON.stringify(mockProducts));
  }
  if (!localStorage.getItem('users')) {
    localStorage.setItem('users', JSON.stringify(mockUsers));
  }
  if (!localStorage.getItem('orders')) {
    localStorage.setItem('orders', JSON.stringify([]));
  }
};

// --- SERVIÇO DE API ---
// Objeto que agrupa todas as nossas "chamadas de API" falsas.
export const api = {
  // === API DE PRODUTOS ===

  getProducts: () => {
    return JSON.parse(localStorage.getItem('products')) || [];
  },

  getProductById: (productId) => {
    const products = api.getProducts();
    return products.find(p => p.id === productId);
  },

  addProduct: (productData) => {
    const products = api.getProducts();
    const newProduct = {
      id: Date.now(),
      rating: 0,
      ...productData,
    };
    products.push(newProduct);
    localStorage.setItem('products', JSON.stringify(products));
    return newProduct;
  },

  updateProduct: (productId, updatedData) => {
    let products = api.getProducts();
    products = products.map(p =>
      p.id === productId ? { ...p, ...updatedData } : p
    );
    localStorage.setItem('products', JSON.stringify(products));
    return products.find(p => p.id === productId);
  },

  deleteProduct: (productId) => {
    let products = api.getProducts();
    products = products.filter(p => p.id !== productId);
    localStorage.setItem('products', JSON.stringify(products));
  },

  // === API DE PEDIDOS ===

  getOrders: () => {
    return JSON.parse(localStorage.getItem('orders')) || [];
  },

  addOrder: (orderData) => {
    const orders = api.getOrders();
    const newOrder = {
      id: Date.now(),
      date: new Date().toISOString(),
      status: 'Pendente',
      ...orderData,
    };
    orders.push(newOrder);
    localStorage.setItem('orders', JSON.stringify(orders));
    return newOrder;
  },
  
  updateOrderStatus: (orderId, newStatus) => {
    let orders = api.getOrders();
    orders = orders.map(order =>
      order.id === orderId ? { ...order, status: newStatus } : order
    );
    localStorage.setItem('orders', JSON.stringify(orders));
    return orders;
  },

  // === API DE USUÁRIOS ===
  
  getUsers: () => {
    return JSON.parse(localStorage.getItem('users')) || [];
  },
  
  addUser: (userData) => {
    const users = api.getUsers();
    const userExists = users.some(u => u.username.toLowerCase() === userData.username.toLowerCase());
    if (userExists) {
      throw new Error('Este nome de usuário já está em uso.');
    }
    const newUser = {
      id: Date.now(),
      role: 'user',
      ...userData
    };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    return newUser;
  }
};