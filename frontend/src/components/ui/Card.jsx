const Card = ({ 
  children, 
  title, 
  footer, 
  className = '', 
  hover = false,
  ...props 
}) => {
  return (
    <div
      className={`
        bg-[color:var(--color-surface)] 
        text-[color:var(--color-text)]
        rounded-2xl shadow-md p-6 
        border border-[color:var(--color-text-muted)]/20
        ${hover ? 'transition-shadow duration-300 hover:shadow-lg' : ''}
        ${className}
      `}
      {...props}
    >
      {/* Cabeçalho */}
      {title && (
        <div className="mb-4 pb-2 border-b border-[color:var(--color-text-muted)]/20">
          <h3 className="text-lg font-semibold">{title}</h3>
        </div>
      )}

      {/* Conteúdo */}
      <div>
        {children}
      </div>

      {/* Rodapé */}
      {footer && (
        <div className="mt-4 pt-4 border-t border-[color:var(--color-text-muted)]/20">
          {footer}
        </div>
      )}
    </div>
  );
};

export default Card;
