const Input = ({
  label,
  type = 'text',
  value,
  onChange,
  placeholder = '',
  error = '',
  disabled = false,
  required = false,
  className = '',
  icon = null,
  ...props
}) => {
  return (
    <div className={`mb-4 ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-text mb-1 dark:text-text">
          {label}
          {required && <span className="text-error ml-1">*</span>}
        </label>
      )}
      <div className="relative">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            {icon}
          </div>
        )}
        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          className={`
            w-full px-4 py-2 border border-gray-300 rounded-lg 
            bg-surface text-text 
            focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
            dark:bg-surface dark:border-gray-600 dark:text-text
            transition-colors
            ${icon ? 'pl-10' : ''}
            ${error ? 'border-error focus:ring-error' : ''}
          `}
          {...props}
        />
      </div>
      {error && <p className="mt-1 text-sm text-error">{error}</p>}
    </div>
  );
};

export default Input;