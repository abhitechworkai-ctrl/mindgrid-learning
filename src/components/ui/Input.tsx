import { InputHTMLAttributes, forwardRef } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className = '', ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-primary-navy font-medium mb-2 text-base">
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={`w-full px-4 py-3 text-base border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-accent transition-colors ${
            error ? 'border-red-500' : 'border-gray-300 focus:border-primary-accent'
          } ${className}`}
          {...props}
        />
        {error && (
          <p className="mt-1 text-sm text-red-600">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
