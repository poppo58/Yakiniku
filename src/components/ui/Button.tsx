import type { ButtonHTMLAttributes } from 'react';

type Variant = 'primary' | 'secondary' | 'ghost' | 'danger';
type Size = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
}

const variantClasses: Record<Variant, string> = {
  primary: 'bg-red-600 text-white hover:bg-red-700 active:bg-red-800',
  secondary: 'bg-gray-100 text-gray-800 hover:bg-gray-200 active:bg-gray-300',
  ghost: 'bg-transparent text-gray-600 hover:bg-gray-100 active:bg-gray-200',
  danger: 'bg-red-100 text-red-700 hover:bg-red-200 active:bg-red-300',
};

const sizeClasses: Record<Size, string> = {
  sm: 'px-2 py-1 text-sm',
  md: 'px-4 py-2 text-base',
  lg: 'px-6 py-3 text-lg',
};

export function Button({
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={`inline-flex items-center justify-center rounded-lg font-medium transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-1 disabled:opacity-40 disabled:cursor-not-allowed ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
