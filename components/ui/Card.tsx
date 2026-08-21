'use client';

import { cn } from '@/lib/utils/cn';
import { forwardRef, HTMLAttributes } from 'react';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'elevated' | 'glass' | 'bordered' | 'outline';
  hover?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = 'default', hover = false, padding = 'md', children, ...props }, ref) => {
    const variantClasses = {
      default: 'bg-[#0D1117]',
      elevated: 'bg-[#121820] shadow-lg shadow-black/20',
      glass: 'backdrop-blur-xl bg-white/5 border border-white/10',
      bordered: 'bg-[#0D1117] border border-white/10',
      outline: 'bg-transparent border border-white/10',
    };

    const paddingClasses = {
      none: 'p-0',
      sm: 'p-3',
      md: 'p-4 md:p-6',
      lg: 'p-6 md:p-8',
      xl: 'p-8 md:p-10',
    };

    return (
      <div
        ref={ref}
        className={cn(
          'rounded-2xl transition-all duration-300',
          variantClasses[variant],
          paddingClasses[padding],
          hover && 'hover:border-white/20 hover:shadow-xl hover:shadow-[#39FF88]/5 hover:-translate-y-1',
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';

export { Card };
