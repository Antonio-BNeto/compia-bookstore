const Card = ({ 
  children, 
  title, 
  footer, 
  className = '', 
  hover = false,
  ...props 
}) => {
  return (
    <div className={`card ${hover ? 'hover:shadow-lg' : ''} ${className}`} {...props}>
      {title && (
        <div className="mb-4 pb-2 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-text dark:text-text">{title}</h3>
        </div>
      )}
      <div className="text-text dark:text-text">
        {children}
      </div>
      {footer && (
        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          {footer}
        </div>
      )}
    </div>
  );
};

export default Card;