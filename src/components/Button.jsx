import React from 'react';
import './Button.css'; // Importando o arquivo CSS

const Button = ({
  children,
  type = 'button',
  variant = 'primary', // primary, danger, bateria
  size = 'md', // sm, md, lg
  isLoading = false,
  leftIcon = null,
  rightIcon = null,
  className = '',
  disabled = false,
  ...props
}) => {
  // Monta o nome das classes dinamicamente com base nas props
  const classes = `btn btn-${variant} btn-${size} ${isLoading ? 'btn-loading' : ''} ${className}`;

  return (
    <button
      type={type}
      className={classes}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && <span className="btn-spinner"></span>}
      {!isLoading && leftIcon && <span className="btn-icon left">{leftIcon}</span>}
      <span className="btn-content">{children}</span>
      {!isLoading && rightIcon && <span className="btn-icon right">{rightIcon}</span>}
    </button>
  );
};

export default Button;