import { BarChart, DollarSign, Package, Users, ShoppingCart } from "lucide-react";
import { useAuth } from "../../contexts/auth/AuthContext";

const StatCard = ({ title, value, icon, color }) => (
  <div className="bg-surface p-6 rounded-lg shadow-sm flex items-center gap-4">
    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${color}/10`}>
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

  return (
    <div className="p-6 md:p-8">
      <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
      <p className="text-text-muted mb-8">Bem-vindo de volta, {user?.name}!</p>

      {/* Cards de Estatísticas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Vendas Totais"
          value="R$ 12.580,00"
          icon={<DollarSign className="text-green-500" size={24} />}
          color="bg-green-500"
        />
        <StatCard
          title="Novos Pedidos"
          value="42"
          icon={<ShoppingCart className="text-blue-500" size={24} />}
          color="bg-blue-500"
        />
        <StatCard
          title="Total de Produtos"
          value="150"
          icon={<Package className="text-orange-500" size={24} />}
          color="bg-orange-500"
        />
        <StatCard
          title="Novos Clientes"
          value="12"
          icon={<Users className="text-purple-500" size={24} />}
          color="bg-purple-500"
        />
      </div>

      {/* Gráfico Placeholder */}
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