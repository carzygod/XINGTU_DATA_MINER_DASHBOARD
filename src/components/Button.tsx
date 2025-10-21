import { ButtonHTMLAttributes, ReactNode } from 'react';
import { clsx } from 'clsx';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'danger';
  loading?: boolean;
}

export const Button = ({ 
  children, 
  variant = 'primary', 
  loading = false,
  className,
  disabled,
  ...props 
}: ButtonProps) => {
  const baseStyles = 'px-6 py-3 rounded-xl font-medium transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variantStyles = {
    primary: 'bg-gradient-to-br from-[#5b8def] to-[#4f7cff] text-white neu-button hover:shadow-lg',
    secondary: 'bg-[#2d3250] text-[#e1e7f5] neu-button hover:shadow-lg',
    danger: 'bg-gradient-to-br from-red-600 to-red-700 text-white neu-button hover:shadow-lg'
  };

  return (
    <button
      className={clsx(baseStyles, variantStyles[variant], className)}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <div className="flex items-center justify-center gap-2">
          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          <span>加载中...</span>
        </div>
      ) : children}
    </button>
  );
};
