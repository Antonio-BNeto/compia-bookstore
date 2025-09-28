import { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';
import Button from './Button';

const ThemeToggle = ({ className = '' }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialTheme = savedTheme === 'dark' || (!savedTheme && prefersDark);
    setIsDarkMode(initialTheme);
    document.documentElement.classList.toggle('dark', initialTheme);
  }, []);

  const toggleTheme = () => {
    setIsDarkMode(prev => {
      const newDarkMode = !prev;
      localStorage.setItem('theme', newDarkMode ? 'dark' : 'light');
      document.documentElement.classList.toggle('dark', newDarkMode);
      return newDarkMode;
    });
  };

  if (!isMounted) {
    // Renderiza um placeholder para evitar 'hydration mismatch'
    return <div className={`w-10 h-10 rounded-lg bg-surface border border-gray-200 dark:border-gray-700 ${className}`} />;
  }

  return (
    <Button
      onClick={toggleTheme}
      variant="outline" // A variante 'outline' já tem o estilo que precisamos
      size="icon"
      className={className}
      aria-label="Alternar tema"
    >
      {isDarkMode ? (
        // Ícone para o tema escuro (mostra o sol)
        <Sun size={20} className="text-yellow-400 transition-transform duration-500 hover:rotate-90" />
      ) : (
        // Ícone para o tema claro (mostra a lua)
        <Moon size={20} className="text-primary transition-transform duration-500 hover:rotate-[20deg]" />
      )}
    </Button>
  );
};

export default ThemeToggle;