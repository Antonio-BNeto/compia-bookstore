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
  const baseClasses = `
    inline-flex items-center justify-center font-semibold rounded-lg 
    transition-all duration-200 focus:outline-none focus:ring-2 
    focus:ring-offset-2 dark:focus:ring-offset-surface
  `;

  // Variantes baseadas nas cores do tema (light/dark)
  const variantClasses = {
    primary: `
      bg-[color:var(--color-primary)] text-white
      hover:bg-[color:var(--color-primary-hover)]
      focus:ring-[color:var(--color-primary)]
    `,
    secondary: `
      bg-[color:var(--color-accent)] text-white
      hover:bg-[color:var(--color-accent)]/90
      focus:ring-[color:var(--color-accent)]
    `,
    success: `
      bg-[color:var(--color-success)] text-white
      hover:bg-[color:var(--color-success)]/90
      focus:ring-[color:var(--color-success)]
    `,
    error: `
      bg-[color:var(--color-error)] text-white
      hover:bg-[color:var(--color-error)]/90
      focus:ring-[color:var(--color-error)]
    `,
    outline: `
      border border-[color:var(--color-text-muted)]
      bg-transparent text-[color:var(--color-text)]
      hover:bg-[color:var(--color-primary-light)]/20
      dark:hover:bg-[color:var(--color-primary-light)]/10
      focus:ring-[color:var(--color-primary)]
    `,
    ghost: `
      bg-transparent text-[color:var(--color-text)]
      hover:bg-[color:var(--color-primary-light)]/20
      dark:hover:bg-[color:var(--color-primary-light)]/10
      focus:ring-[color:var(--color-primary)]
    `
  };

  const sizeClasses = {
    small: 'px-3 py-1.5 text-sm gap-1.5',
    medium: 'px-4 py-2 gap-2',
    large: 'px-6 py-3 text-lg gap-2.5',
    icon: 'p-2'
  };

  const disabledClass = disabled ? 'opacity-50 cursor-not-allowed' : '';
  const loadingClass = loading ? 'cursor-wait' : '';

  const buttonClasses = `
    ${baseClasses}
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
        <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      )}
      {icon && !loading && <span className={children ? 'mr-2' : ''}>{icon}</span>}
      {!loading && children}
    </button>
  );
};

export default Button;
