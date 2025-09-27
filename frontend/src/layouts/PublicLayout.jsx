import { BookOpen, Menu, X, ShoppingCart, User, History } from "lucide-react";
import { Outlet, Link } from "react-router-dom";
import { useState } from "react";
import ThemeToggle from "../components/ui/ThemeToggle";
import { useAuth } from "../contexts/auth/AuthContext";
import { useCart } from "../contexts/cart/CartContext";
import Button from "../components/ui/Button";

export default function PublicLayout() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const { cartItems } = useCart();

  // Calcula a quantidade total de itens no carrinho (soma das quantidades)
  const totalItemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-bg text-text transition-colors duration-200">
      <header className="sticky top-0 z-40 bg-surface shadow-sm dark:shadow-gray-800/20 backdrop-blur-sm bg-opacity-80">
        <nav className="container mx-auto px-4 py-3 flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 text-xl font-bold text-primary">
            <BookOpen className="h-7 w-7" />
            <span className="hidden sm:inline">Compia</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <Link to="/" className="font-medium hover:text-primary transition-colors">
              Home
            </Link>

            {!user ? (
              <Link to="/auth/login" className="font-medium hover:text-primary transition-colors">
                Login
              </Link>
            ) : (
              <>
                {user.role === "user" && (
                  <>
                    <Link to="/products" className="font-medium hover:text-primary transition-colors">
                      Produtos
                    </Link>
                    <Link to="/orders" className="font-medium hover:text-primary transition-colors">
                      Meus Pedidos
                    </Link>
                  </>
                )}

                {user.role === "admin" && (
                  <Link to="/admin" className="font-medium hover:text-primary transition-colors">
                    Dashboard
                  </Link>
                )}

                <div className="h-6 w-px bg-gray-300 dark:bg-gray-600"></div>
                
                <Link to="/account" className="relative p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors" title="Minha Conta">
                  <User className="h-6 w-6" />
                </Link>

                {user.role === "user" && (
                  <Link to="/cart" className="relative p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors" title="Carrinho">
                    <ShoppingCart className="h-6 w-6" />
                    {totalItemCount > 0 && (
                      <span className="absolute -top-1 -right-1 bg-error text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                        {totalItemCount}
                      </span>
                    )}
                  </Link>
                )}

                <Button onClick={logout} variant="ghost" className="hover:text-error">
                  Sair
                </Button>
              </>
            )}
            
            <ThemeToggle />
          </div>

          {/* Mobile menu button & Icons */}
          <div className="flex items-center gap-2 md:hidden">
            {user && user.role === "user" && (
              <Link to="/cart" className="relative p-2 rounded-md" title="Carrinho">
                <ShoppingCart className="h-6 w-6" />
                {totalItemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-error text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {totalItemCount}
                  </span>
                )}
              </Link>
            )}
            <ThemeToggle />
            <Button onClick={() => setIsMenuOpen(!isMenuOpen)} variant="ghost" size="icon" aria-label="Abrir menu">
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
        </nav>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-surface border-t border-gray-200 dark:border-gray-700 shadow-lg">
            <div className="container mx-auto px-4 py-4 flex flex-col space-y-2">
              <Link to="/" className="py-2 px-3 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 font-medium" onClick={() => setIsMenuOpen(false)}>Home</Link>
              {!user ? (
                <Link to="/auth/login" className="py-2 px-3 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 font-medium" onClick={() => setIsMenuOpen(false)}>Login</Link>
              ) : (
                <>
                  <Link to="/account" className="py-2 px-3 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 font-medium" onClick={() => setIsMenuOpen(false)}>Minha Conta</Link>
                  {user.role === "user" && (
                    <>
                      <Link to="/products" className="py-2 px-3 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 font-medium" onClick={() => setIsMenuOpen(false)}>Produtos</Link>
                      <Link to="/orders" className="py-2 px-3 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 font-medium" onClick={() => setIsMenuOpen(false)}>Meus Pedidos</Link>
                    </>
                  )}
                  {user.role === "admin" && (
                    <Link to="/admin" className="py-2 px-3 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 font-medium" onClick={() => setIsMenuOpen(false)}>Dashboard</Link>
                  )}
                  <hr className="dark:border-gray-700 my-2" />
                  <Button onClick={() => { logout(); setIsMenuOpen(false); }} variant="ghost" className="w-full justify-start text-error hover:bg-error/10 py-2 px-3">Sair</Button>
                </>
              )}
            </div>
          </div>
        )}
      </header>

      <main className="container mx-auto px-4 py-8">
        <Outlet />
      </main>

      <footer className="bg-surface border-t border-gray-200 dark:border-gray-700 mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <BookOpen className="h-6 w-6 text-primary" />
              <span className="font-bold text-lg">Compia</span>
            </div>
            <div className="flex gap-4 md:gap-6">
              <Link to="/privacy" className="text-sm text-text-muted hover:text-primary transition-colors">Privacidade</Link>
              <Link to="/terms" className="text-sm text-text-muted hover:text-primary transition-colors">Termos</Link>
              <Link to="/contact" className="text-sm text-text-muted hover:text-primary transition-colors">Contato</Link>
            </div>
          </div>
          <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700 text-center">
            <p className="text-sm text-text-muted">
              © {new Date().getFullYear()} Compia Bookstore. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}