
import React from 'react';
import Spinner from './Spinner';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  className = '',
  ...props
}) => {
  const baseStyles = 'font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-50 transition-colors duration-150 flex items-center justify-center';

  const variantStyles = {
    primary: 'bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500 disabled:bg-blue-300 disabled:text-blue-100',
    secondary: 'bg-slate-200 hover:bg-slate-300 text-slate-700 focus:ring-slate-400 disabled:bg-slate-100 disabled:text-slate-400 border border-slate-300 hover:border-slate-400',
    danger: 'bg-red-600 hover:bg-red-700 text-white focus:ring-red-500 disabled:bg-red-300',
    ghost: 'bg-transparent hover:bg-blue-100 text-blue-600 hover:text-blue-700 focus:ring-blue-500 disabled:text-slate-400 disabled:hover:bg-transparent',
  };

  const sizeStyles = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  const spinnerColor = (variant === 'primary' || variant === 'danger') ? 'text-white' : 'text-blue-600';

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className} ${isLoading ? 'cursor-not-allowed' : ''}`}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading && <Spinner size="sm" className="mr-2" color={spinnerColor} />}
      {children}
    </button>
  );
};

export default Button;