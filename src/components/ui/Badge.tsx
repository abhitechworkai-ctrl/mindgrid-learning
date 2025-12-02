import { ReactNode } from 'react';

interface BadgeProps {
  children: ReactNode;
  variant?: 'primary' | 'success';
  className?: string;
}

export function Badge({ children, variant = 'primary', className = '' }: BadgeProps) {
  const variantStyles = {
    primary: 'bg-primary-accent text-white',
    success: 'bg-green-500 text-white',
  };

  return (
    <span className={`inline-block px-3 py-1 text-sm font-medium rounded-full ${variantStyles[variant]} ${className}`}>
      {children}
    </span>
  );
}
