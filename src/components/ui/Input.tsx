import React from 'react';
import { cn } from '../../lib/utils';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  isTextArea?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className = '', label, error, isTextArea, ...props }, ref) => {
    return (
      <div className="space-y-1">
        {label && (
          <label className="block text-sm font-medium text-gray-300">
            {label}
          </label>
        )}
        {isTextArea ? (
          <textarea
            className={cn(
              'w-full bg-cyber-dark border border-neon-primary/30 rounded-lg px-4 py-2',
              'text-white placeholder-gray-500',
              'focus:outline-none focus:border-neon-primary focus:ring-1 focus:ring-neon-primary',
              'transition-all duration-200',
              'min-h-[100px] resize-y',
              error && 'border-red-500 focus:border-red-500 focus:ring-red-500',
              className
            )}
            {...(props as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
          />
        ) : (
          <input
            ref={ref}
            className={cn(
              'w-full bg-cyber-dark border border-neon-primary/30 rounded-lg px-4 py-2',
              'text-white placeholder-gray-500',
              'focus:outline-none focus:border-neon-primary focus:ring-1 focus:ring-neon-primary',
              'transition-all duration-200',
              error && 'border-red-500 focus:border-red-500 focus:ring-red-500',
              className
            )}
            {...props}
          />
        )}
        {error && <p className="text-sm text-red-500">{error}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;