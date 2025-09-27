import { useMemo } from 'react';
import { BarChart, DollarSign, Package, Users, ShoppingCart } from "lucide-react";
import { useAuth } from "../../contexts/auth/AuthContext";
import { useProducts } from '../../contexts/product/ProductContext';
import { useOrders } from '../../contexts/order/OrderContext';
import { mockUsers } from '../../data/users';
import SalesChart from '../../components/admin/SalesChart';
import StatCard  from '../../components/admin/StatCard';

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
  
  const chartData = useMemo(() => {
    const salesByDay = orders.reduce((acc, order) => {
      const orderDate = new Date(order.date).toLocaleDateString('pt-BR');
      const orderTotal = order.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
      if (!acc[orderDate]) acc[orderDate] = 0;
      acc[orderDate] += orderTotal;
      return acc;
    }, {});

    return Object.keys(salesByDay).map(date => ({
      name: date.slice(0, 5),
      Vendas: salesByDay[date],
    })).sort((a, b) => {
        const dateA = a.name.split('/').reverse().join('-');
        const dateB = b.name.split('/').reverse().join('-');
        return new Date(`2025-${dateA}`) - new Date(`2025-${dateB}`);
    });
  }, [orders]);

  return (
    <div>
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
        <div className="h-80 w-full">
          {chartData.length > 0 ? (
            <SalesChart data={chartData} />
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-text-muted">
              <BarChart size={48} />
              <p className="mt-4">Não há dados de vendas para exibir no gráfico ainda.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}