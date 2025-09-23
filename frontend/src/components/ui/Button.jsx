const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'medium', 
  disabled = false, 
  onClick, 
  type = 'button',
  className = '',
  loading = false,
  icon = null,
  ...props 
}) => {
  // Mapeamento de variantes para classes
  const variantClasses = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    success: 'bg-success text-white hover:bg-green-700',
    error: 'bg-error text-white hover:bg-red-700',
    outline: 'border border-gray-300 bg-transparent text-text hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-700',
  };

  // Mapeamento de tamanhos
  const sizeClasses = {
    small: 'px-3 py-1.5 text-sm',
    medium: 'px-4 py-2',
    large: 'px-6 py-3 text-lg',
  };

  // Classes condicionais
  const disabledClass = disabled ? 'opacity-50 cursor-not-allowed' : '';
  const loadingClass = loading ? 'cursor-wait' : '';

  // Combinação de todas as classes
  const buttonClasses = `
    btn
    ${variantClasses[variant]}
    ${sizeClasses[size]}
    ${disabledClass}
    ${loadingClass}
    ${className}
  `.replace(/\s+/g, ' ').trim();

  return (
    <button
      type={type}
      className={buttonClasses}
      disabled={disabled || loading}
      onClick={onClick}
      {...props}
    >
      {loading && (
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      )}
      {icon && !loading && <span className="mr-2">{icon}</span>}
      {children}
    </button>
  );
};

export default Button;