import type { HTMLAttributes } from 'react';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  elevated?: boolean;
}

export function Card({ elevated = false, className = '', children, ...props }: CardProps) {
  return (
    <div
      className={`rounded-xl bg-white ${elevated ? 'shadow-md' : 'shadow-sm border border-gray-200'} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
