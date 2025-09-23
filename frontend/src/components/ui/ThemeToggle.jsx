import { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';
import Button from './Button';

const ThemeToggle = ({ 
  className = '',
  size = 20,
  showText = false,
  animated = false
}) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    
    // Verificar se o usuário já tem uma preferência salva
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    const initialTheme = savedTheme === 'dark' || (!savedTheme && prefersDark);
    setIsDarkMode(initialTheme);
    
    if (initialTheme) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    
    if (newDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  // Evitar hidratação inconsistente entre servidor e cliente
  if (!isMounted) {
    return (
      <button
        className={`
          flex items-center justify-center gap-2 
          p-2 rounded-lg 
          bg-surface 
          border border-gray-200
          ${className}
        `}
        aria-label="Alternar tema"
      >
        <Sun size={size} className="opacity-0" />
        {showText && <span className="text-sm opacity-0">Tema</span>}
      </button>
    );
  }

  return (
    <Button
      onClick={toggleTheme}
      className={`
        flex items-center justify-center gap-2 
        p-2 rounded-lg 
        bg-surface hover:bg-gray-100 
        dark:bg-surface dark:hover:bg-gray-700 
        transition-all duration-300
        border border-gray-200 dark:border-gray-600
        ${animated ? 'hover:scale-105' : ''}
        ${className}
      `}
      aria-label="Alternar tema"
    >
      {isDarkMode ? (
        <>
          <Sun 
            size={size} 
            className={`
              text-yellow-400 
              ${animated ? 'transition-transform duration-500 hover:rotate-180' : ''}
            `} 
          />
          {showText && <span className="text-sm">Claro</span>}
        </>
      ) : (
        <>
          <Moon 
            size={size} 
            className={`
              text-blue-500 
              ${animated ? 'transition-transform duration-500 hover:rotate-12' : ''}
            `} 
          />
          {showText && <span className="text-sm">Escuro</span>}
        </>
      )}
    </Button>
  );
};

export default ThemeToggle;