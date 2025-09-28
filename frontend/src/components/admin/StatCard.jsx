import { DollarSign, Package, Users, ShoppingCart } from "lucide-react"; // Importe os ícones que ele pode usar

export default function StatCard({ title, value, icon, color }) {
  return (
    <div className="
      bg-[color:var(--color-surface)] 
      p-6 rounded-2xl shadow-md 
      border border-[color:var(--color-dark)]/10
      flex items-center gap-4
    ">
      <div
        className={`
          w-12 h-12 rounded-full flex items-center justify-center
          bg-${color}-500/10 text-${color}-600
        `}
      >
        {icon}
      </div>
      <div>
        <p className="text-sm text-[color:var(--color-text-muted)]">{title}</p>
        <p className="text-2xl font-bold text-[color:var(--color-text)]">{value}</p>
      </div>
    </div>
  );
}