'use client';

import { cn } from '@/lib/utils/cn';
import { forwardRef, HTMLAttributes } from 'react';

interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  weight?: 'regular' | 'medium' | 'semibold' | 'bold' | 'extrabold';
  color?: 'primary' | 'secondary' | 'muted' | 'inverse' | 'bullish' | 'bearish' | 'accent';
  gradient?: boolean;
  size?: 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl' | '7xl' | '8xl' | '9xl';
  tracking?: 'tight' | 'normal' | 'wide' | 'wider' | 'widest';
}

const Heading = forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ as: Component = 'h1', className, weight = 'semibold', color = 'primary', gradient = false, size, tracking = 'tight', children, ...props }, ref) => {
    const weightClasses = {
      regular: 'font-normal',
      medium: 'font-medium',
      semibold: 'font-semibold',
      bold: 'font-bold',
      extrabold: 'font-extrabold'
    };
    const colorClasses = {
      primary: 'text-[#F5F7FA]',
      secondary: 'text-[#8B949E]',
      muted: 'text-[#4B5563]',
      inverse: 'text-[#080A0D]',
      bullish: 'text-[#39FF88]',
      bearish: 'text-[#FF4D5F]',
      accent: 'text-[#39FF88]'
    };
    const sizeClasses = {
      xs: 'text-xs',
      sm: 'text-sm',
      base: 'text-base',
      lg: 'text-lg',
      xl: 'text-xl',
      '2xl': 'text-2xl',
      '3xl': 'text-3xl',
      '4xl': 'text-4xl',
      '5xl': 'text-5xl',
      '6xl': 'text-6xl',
      '7xl': 'text-7xl',
      '8xl': 'text-8xl',
      '9xl': 'text-9xl'
    };
    const trackingClasses = {
      tight: 'tracking-tight',
      normal: 'tracking-normal',
      wide: 'tracking-wide',
      wider: 'tracking-wider',
      widest: 'tracking-widest'
    };
    const defaultSize = {
      h1: '4xl',
      h2: '3xl',
      h3: '2xl',
      h4: 'xl',
      h5: 'lg',
      h6: 'base'
    } as const;
    const finalSize = size || defaultSize[Component as keyof typeof defaultSize] || 'xl';

    return (
      <Component
        ref={ref}
        className={cn(
          'leading-[1.1]',
          weightClasses[weight],
          colorClasses[color],
          trackingClasses[tracking],
          sizeClasses[finalSize as keyof typeof sizeClasses],
          gradient && 'bg-gradient-to-r from-[#39FF88] to-[#39FF88]/60 bg-clip-text text-transparent',
          className
        )}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

Heading.displayName = 'Heading';

interface TextProps extends HTMLAttributes<HTMLParagraphElement> {
  size?: 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl';
  color?: 'primary' | 'secondary' | 'muted' | 'inverse' | 'bullish' | 'bearish' | 'accent';
  weight?: 'regular' | 'medium' | 'semibold' | 'bold';
  mono?: boolean;
  align?: 'left' | 'center' | 'right' | 'justify';
}

const Text = forwardRef<HTMLParagraphElement, TextProps>(
  ({ className, size = 'base', color = 'secondary', weight = 'regular', mono = false, align = 'left', children, ...props }, ref) => {
    const sizeClasses = {
      xs: 'text-xs',
      sm: 'text-sm',
      base: 'text-base',
      lg: 'text-lg',
      xl: 'text-xl',
      '2xl': 'text-2xl'
    };
    const colorClasses = {
      primary: 'text-[#F5F7FA]',
      secondary: 'text-[#8B949E]',
      muted: 'text-[#4B5563]',
      inverse: 'text-[#080A0D]',
      bullish: 'text-[#39FF88]',
      bearish: 'text-[#FF4D5F]',
      accent: 'text-[#39FF88]'
    };
    const weightClasses = {
      regular: 'font-normal',
      medium: 'font-medium',
      semibold: 'font-semibold',
      bold: 'font-bold'
    };
    const alignClasses = {
      left: 'text-left',
      center: 'text-center',
      right: 'text-right',
      justify: 'text-justify'
    };

    return (
      <p
        ref={ref}
        className={cn(
          'leading-relaxed',
          mono && 'font-mono',
          sizeClasses[size],
          colorClasses[color],
          weightClasses[weight],
          alignClasses[align],
          className
        )}
        {...props}
      >
        {children}
      </p>
    );
  }
);

Text.displayName = 'Text';

export { Heading, Text };
