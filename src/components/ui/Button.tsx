import { ButtonHTMLAttributes, ReactNode, useState } from 'react';
import { Loader2 } from 'lucide-react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'success';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  loading?: boolean;
  success?: boolean;
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  loading = false,
  success = false,
  className = '',
  disabled,
  onClick,
  ...props
}: ButtonProps) {
  const [ripples, setRipples] = useState<Array<{ x: number; y: number; id: number }>>([]);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled || loading) return;

    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = Date.now();

    setRipples((prev) => [...prev, { x, y, id }]);
    setTimeout(() => {
      setRipples((prev) => prev.filter((ripple) => ripple.id !== id));
    }, 600);

    onClick?.(e);
  };

  const baseStyles = 'relative overflow-hidden font-bold rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed';

  const variantStyles = {
    primary: 'bg-primary-accent text-white hover:bg-blue-500 hover:shadow-lg focus:ring-primary-accent',
    secondary: 'bg-white text-primary-navy border-2 border-primary-navy hover:bg-primary-light hover:shadow-md focus:ring-primary-navy',
    success: 'bg-green-500 text-white hover:bg-green-600 hover:shadow-lg focus:ring-green-500',
  };

  const sizeStyles = {
    sm: 'px-4 py-2 text-base min-h-[40px]',
    md: 'px-6 py-3 text-lg min-h-[48px]',
    lg: 'px-8 py-4 text-xl min-h-[52px]',
  };

  const widthStyle = fullWidth ? 'w-full' : '';
  const currentVariant = success ? 'success' : variant;

  return (
    <button
      className={`${baseStyles} ${variantStyles[currentVariant]} ${sizeStyles[size]} ${widthStyle} ${className}`}
      disabled={disabled || loading}
      onClick={handleClick}
      aria-busy={loading}
      {...props}
    >
      <span className="relative z-10 flex items-center justify-center gap-2">
        {loading && <Loader2 className="w-4 h-4 animate-spin" />}
        {success && !loading && <span className="text-lg">✓</span>}
        {children}
      </span>

      {ripples.map((ripple) => (
        <span
          key={ripple.id}
          className="absolute bg-white opacity-50 rounded-full pointer-events-none"
          style={{
            left: ripple.x,
            top: ripple.y,
            width: 10,
            height: 10,
            transform: 'translate(-50%, -50%)',
            animation: 'ripple 600ms ease-out',
          }}
        />
      ))}
    </button>
  );
}
