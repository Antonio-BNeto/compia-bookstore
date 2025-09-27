import { DollarSign, Package, Users, ShoppingCart } from "lucide-react"; // Importe os ícones que ele pode usar

export default function StatCard({ title, value, icon, color }) {
  return (
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
}