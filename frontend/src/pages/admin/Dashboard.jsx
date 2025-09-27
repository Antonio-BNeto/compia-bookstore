import { useMemo } from 'react';
import { BarChart, DollarSign, Package, Users, ShoppingCart } from "lucide-react";
import { useAuth } from "../../contexts/auth/AuthContext";
import { useProducts } from '../../contexts/product/ProductContext';
import { useOrders } from '../../contexts/order/OrderContext';

import { mockUsers } from '../../data/users';

const StatCard = ({ title, value, icon, color }) => (
  <div className="bg-surface p-6 rounded-lg shadow-sm flex items-center gap-4">
    <div className={`w-12 h-12 rounded-full flex items-center justify-center bg-${color}-500/10`}>
      {icon}
    </div>
    <div>
      <p className="text-sm text-text-muted">{title}</p>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  </div>
);

export default function Dashboard() {
  const { user } = useAuth();
  const { products } = useProducts();
  const { orders } = useOrders();
  
  const stats = useMemo(() => {
    const totalRevenue = orders.reduce((acc, order) => {
      const orderTotal = order.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
      return acc + orderTotal;
    }, 0);

    const formattedRevenue = totalRevenue.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });

    const totalOrders = orders.length;

    const totalProducts = products.length;

    const totalCustomers = mockUsers.filter(u => u.role === 'user').length;
    
    return {
      revenue: formattedRevenue,
      orders: totalOrders,
      products: totalProducts,
      customers: totalCustomers,
    };
  }, [orders, products]);


  return (
    <div className="p-6 md:p-8">
      <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
      <p className="text-text-muted mb-8">Bem-vindo de volta, {user?.name}!</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Vendas Totais"
          value={stats.revenue}
          icon={<DollarSign className="text-green-500" size={24} />}
          color="green"
        />
        <StatCard
          title="Total de Pedidos"
          value={stats.orders}
          icon={<ShoppingCart className="text-blue-500" size={24} />}
          color="blue"
        />
        <StatCard
          title="Total de Produtos"
          value={stats.products}
          icon={<Package className="text-orange-500" size={24} />}
          color="orange"
        />
        <StatCard
          title="Total de Clientes"
          value={stats.customers}
          icon={<Users className="text-purple-500" size={24} />}
          color="purple"
        />
      </div>

      <div className="mt-10 bg-surface p-6 rounded-lg shadow-sm">
        <h2 className="text-xl font-bold mb-4">Visão Geral das Vendas</h2>
        <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded-md flex items-center justify-center">
            <BarChart size={48} className="text-text-muted" />
            <p className="ml-4 text-text-muted">Componente de gráfico viria aqui.</p>
        </div>
      </div>
    </div>
  );
}