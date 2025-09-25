import { useState } from "react";
import { Outlet, NavLink } from "react-router-dom";
import { useAuth } from "../contexts/auth/AuthContext";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  LogOut,
  Menu,
  X,
  BookOpen,
} from "lucide-react";
import Button from "../components/ui/Button";

// Lista de links para facilitar a manutenção
const adminLinks = [
  { to: "/admin", text: "Dashboard", icon: <LayoutDashboard size={20} /> },
  { to: "/admin/products", text: "Produtos", icon: <Package size={20} /> },
  { to: "/admin/orders", text: "Pedidos", icon: <ShoppingCart size={20} /> },
  { to: "/admin/customers", text: "Clientes", icon: <Users size={20} /> },
];

export default function AdminLayout() {
  const { user, logout } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Componente de link reutilizável para a sidebar
  const SidebarLink = ({ to, icon, text }) => (
    <NavLink
      to={to}
      end={to === "/admin"}
      onClick={() => setIsSidebarOpen(false)}
      className={({ isActive }) =>
        `flex items-center gap-4 p-3 rounded-lg transition-colors text-lg md:text-base ${
          isActive
            ? "bg-primary text-white font-semibold"
            : "hover:bg-gray-100 dark:hover:bg-gray-800"
        }`
      }
    >
      {icon}
      <span>{text}</span>
    </NavLink>
  );

  return (
    <div className="min-h-screen bg-bg text-text flex">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-surface border-r border-gray-200 dark:border-gray-800 p-4 flex flex-col transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Logo e botão de fechar (mobile) */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2 text-xl font-bold text-primary">
            <BookOpen className="h-7 w-7" />
            <span>Painel</span>
          </div>
          <Button
            onClick={() => setIsSidebarOpen(false)}
            variant="ghost"
            size="icon"
            className="lg:hidden"
          >
            <X size={24} />
          </Button>
        </div>

        {/* Navegação Principal */}
        <nav className="flex-grow">
          <ul className="space-y-2">
            {adminLinks.map((link) => (
              <li key={link.to}>
                <SidebarLink to={link.to} icon={link.icon} text={link.text} />
              </li>
            ))}
          </ul>
        </nav>

        {/* Rodapé da Sidebar */}
        <div>
          <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
            <p className="text-sm font-semibold">{user?.name || "Admin"}</p>
            <p className="text-xs text-text-muted">{user?.role}</p>
            <Button
              onClick={logout}
              variant="ghost"
              className="w-full justify-start mt-4 text-error hover:bg-error/10"
              icon={<LogOut size={18} />}
            >
              Sair
            </Button>
          </div>
        </div>
      </aside>

      {/* Overlay para fechar o menu no mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      {/* Conteúdo Principal */}
      <div className="flex flex-col flex-1 lg:ml-64">
        {/* Header do Conteúdo (para o botão de menu mobile) */}
        <header className="sticky top-0 z-30 flex items-center h-16 px-6 bg-surface/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800 lg:hidden">
          <Button
            onClick={() => setIsSidebarOpen(true)}
            variant="ghost"
            size="icon"
          >
            <Menu size={24} />
          </Button>
          <h1 className="text-lg font-semibold ml-4">Admin</h1>
        </header>

        {/* Onde as páginas do admin serão renderizadas */}
        <main className="flex-1 p-6 md:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}