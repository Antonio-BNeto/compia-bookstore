import { BookOpen, Menu, X } from "lucide-react";
import { Outlet, Link } from "react-router-dom";
import { useState } from "react";
import ThemeToggle from "../components/ui/ThemeToggle";
import { useAuth } from "../contexts/auth/AuthContext";

export default function PublicLayout() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { user, logout } = useAuth();

    return (
        <div className="min-h-screen bg-bg text-text transition-colors duration-200">
            <header className="sticky top-0 z-40 bg-surface shadow-sm dark:shadow-gray-800/20">
                <nav className="container mx-auto px-4 py-3 flex justify-between items-center">
                    {/* Logo */}
                    <Link 
                        to="/" 
                        className="flex items-center gap-2 text-xl font-bold text-primary"
                    >
                        <BookOpen className="h-7 w-7" />
                        <span className="hidden sm:inline">Compia</span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-6">
                        <Link 
                            to="/" 
                            className="font-medium hover:text-primary transition-colors"
                        >
                            Home
                        </Link>

                        {!user ? (
                            // Links quando NÃO logado
                            <Link 
                                to="/auth/login" 
                                className="font-medium hover:text-primary transition-colors"
                            >
                                Login
                            </Link>
                        ) : (
                            // Links quando logado
                            <>
                                <Link 
                                    to="/products" 
                                    className="font-medium hover:text-primary transition-colors"
                                >
                                    Produtos
                                </Link>
                                <Link 
                                    to="/admin" 
                                    className="font-medium hover:text-primary transition-colors"
                                >
                                    Admin
                                </Link>
                                <button 
                                    onClick={logout} 
                                    className="font-medium hover:text-red-500 transition-colors"
                                >
                                    Sair
                                </button>
                            </>
                        )}

                        <div className="h-6 w-px bg-gray-300 dark:bg-gray-600 mx-2"></div>
                        
                        <ThemeToggle />
                    </div>

                    {/* Mobile menu button */}
                    <div className="flex items-center gap-4 md:hidden">
                        <ThemeToggle className="md:hidden" />
                        <button 
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="p-2 rounded-md text-text hover:bg-gray-100 dark:hover:bg-gray-800"
                            aria-label="Abrir menu"
                        >
                            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </nav>

                {/* Mobile Navigation */}
                {isMenuOpen && (
                    <div className="md:hidden bg-surface border-t border-gray-200 dark:border-gray-700 shadow-lg">
                        <div className="container mx-auto px-4 py-3 flex flex-col space-y-3">
                            <Link 
                                to="/" 
                                className="py-2 px-4 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 font-medium"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Home
                            </Link>

                            {!user ? (
                                // Mobile: não logado
                                <Link 
                                    to="/auth/login" 
                                    className="py-2 px-4 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 font-medium"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    Login
                                </Link>
                            ) : (
                                // Mobile: logado
                                <>
                                    <Link 
                                        to="/products" 
                                        className="py-2 px-4 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 font-medium"
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        Produtos
                                    </Link>
                                    <Link 
                                        to="/admin/dashboard" 
                                        className="py-2 px-4 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 font-medium"
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        Admin
                                    </Link>
                                    <button 
                                        onClick={() => {
                                            logout();
                                            setIsMenuOpen(false);
                                        }}
                                        className="py-2 px-4 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 font-medium text-left"
                                    >
                                        Sair
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                )}
            </header>

            <main className="container mx-auto px-4 py-8">
                <Outlet />
            </main>

            {/* Footer */}
            <footer className="bg-surface border-t border-gray-200 dark:border-gray-700 mt-16">
                <div className="container mx-auto px-4 py-8">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <div className="flex items-center gap-2 mb-4 md:mb-0">
                            <BookOpen className="h-6 w-6 text-primary" />
                            <span className="font-bold text-lg">Compia</span>
                        </div>
                        
                        <div className="flex gap-6">
                            <Link 
                                to="/privacy" 
                                className="text-sm text-text-muted hover:text-primary transition-colors"
                            >
                                Privacidade
                            </Link>
                            <Link 
                                to="/terms" 
                                className="text-sm text-text-muted hover:text-primary transition-colors"
                            >
                                Termos
                            </Link>
                            <Link 
                                to="/contact" 
                                className="text-sm text-text-muted hover:text-primary transition-colors"
                            >
                                Contato
                            </Link>
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
