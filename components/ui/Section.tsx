'use client';

import { cn } from '@/lib/utils/cn';
import { forwardRef, HTMLAttributes } from 'react';

interface SectionProps extends HTMLAttributes<HTMLElement> {
  background?: 'primary' | 'surface' | 'elevated' | 'transparent' | 'gradient';
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  border?: boolean;
  borderTop?: boolean;
  borderBottom?: boolean;
}

const Section = forwardRef<HTMLElement, SectionProps>(
  ({ className, background = 'primary', padding = 'xl', border = false, borderTop = false, borderBottom = false, children, ...props }, ref) => {
    const backgroundClasses = {
      primary: 'bg-[#080A0D]',
      surface: 'bg-[#0D1117]',
      elevated: 'bg-[#121820]',
      transparent: 'bg-transparent',
      gradient: 'bg-gradient-to-b from-[#080A0D] via-[#0D1117] to-[#080A0D]',
    };

    const paddingClasses = {
      none: 'py-0',
      sm: 'py-6 md:py-10',
      md: 'py-10 md:py-16',
      lg: 'py-16 md:py-24',
      xl: 'py-20 md:py-32',
      '2xl': 'py-24 md:py-40',
    };

    return (
      <section
        ref={ref}
        className={cn(
          'w-full',
          backgroundClasses[background],
          paddingClasses[padding],
          border && 'border border-white/10',
          borderTop && 'border-t border-white/10',
          borderBottom && 'border-b border-white/10',
          className
        )}
        {...props}
      >
        {children}
      </section>
    );
  }
);

Section.displayName = 'Section';

export { Section };
