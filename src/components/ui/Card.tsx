import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export function Card({ children, className = '', hover = false }: CardProps) {
  const hoverClass = hover ? 'card-hover cursor-pointer' : 'hover:shadow-md';

  return (
    <div
      className={`bg-white rounded-lg shadow-sm transition-all duration-300 ${hoverClass} ${className}`}
      style={{ borderRadius: 'var(--radius-md)' }}
    >
      {children}
    </div>
  );
}
