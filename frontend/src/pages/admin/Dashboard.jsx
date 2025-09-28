import { useMemo } from 'react';
import { DollarSign, Package, Users, ShoppingCart } from "lucide-react";
import { useAuth } from "../../contexts/auth/AuthContext";
import { useProducts } from '../../contexts/product/ProductContext';
import { useOrders } from '../../contexts/order/OrderContext';
import { useUsers } from '../../contexts/user/UserContext';
import SalesChart from '../../components/admin/SalesChart';
import StatCard from '../../components/admin/StatCard';

export default function Dashboard() {
  const { user } = useAuth();
  const { products } = useProducts();
  const { orders } = useOrders();
  const { users } = useUsers();
  
  const stats = useMemo(() => {
    const totalRevenue = orders.reduce((acc, order) => acc + order.items.reduce((sum, item) => sum + item.price * item.quantity, 0), 0);
    const formattedRevenue = totalRevenue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    const totalCustomers = users.filter(u => u.role === 'user').length;
    
    return {
      revenue: formattedRevenue,
      orders: orders.length,
      products: products.length,
      customers: totalCustomers,
    };
  }, [orders, products, users]);
  
  const chartData = useMemo(() => {
    const salesByDay = orders.reduce((acc, order) => {
      const orderDate = new Date(order.date).toLocaleDateString('pt-BR');
      const orderTotal = order.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
      if (!acc[orderDate]) acc[orderDate] = 0;
      acc[orderDate] += orderTotal;
      return acc;
    }, {});

    return Object.keys(salesByDay).map(date => ({
      name: date.slice(0, 5), Vendas: parseFloat(salesByDay[date].toFixed(2)),
    })).sort((a, b) => new Date(`2025-${a.name.split('/')[1]}-${a.name.split('/')[0]}`) - new Date(`2025-${b.name.split('/')[1]}-${b.name.split('/')[0]}`));
  }, [orders]);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
      <p className="text-text-muted mb-8">Bem-vindo de volta, {user?.name}!</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Vendas Totais" value={stats.revenue} icon={<DollarSign className="text-success" size={24} />} iconBgClass="bg-success/10" />
        <StatCard title="Total de Pedidos" value={stats.orders} icon={<ShoppingCart className="text-primary" size={24} />} iconBgClass="bg-primary/10" />
        <StatCard title="Total de Produtos" value={stats.products} icon={<Package className="text-accent" size={24} />} iconBgClass="bg-accent/10" />
        <StatCard title="Total de Clientes" value={stats.customers} icon={<Users className="text-primary-light" size={24} />} iconBgClass="bg-primary-light/10" />
      </div>
      <div className="mt-10 bg-surface p-6 rounded-lg shadow-sm">
        <h2 className="text-xl font-bold mb-4">Visão Geral das Vendas</h2>
        <div className="h-80 w-full">
          {chartData.length > 0 ? <SalesChart data={chartData} /> : <p className="text-center text-text-muted">Não há dados de vendas para exibir.</p>}
        </div>
      </div>
    </div>
  );
}