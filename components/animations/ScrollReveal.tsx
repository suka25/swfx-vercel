'use client';

import { motion } from 'framer-motion';
import { forwardRef, HTMLAttributes } from 'react';
import { cn } from '@/lib/utils/cn';

interface ScrollRevealProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  distance?: number;
  duration?: number;
  delay?: number;
  once?: boolean;
  threshold?: number;
}

const ScrollReveal = forwardRef<HTMLDivElement, ScrollRevealProps>(
  (
    {
      children,
      direction = 'up',
      distance = 40,
      duration = 0.6,
      delay = 0,
      once = true,
      threshold = 0.1,
      className,
      ...props
    },
    ref
  ) => {
    const directionMap = {
      up: { y: distance },
      down: { y: -distance },
      left: { x: distance },
      right: { x: -distance },
      none: {},
    };

    const initial = { opacity: 0, ...directionMap[direction] };
    const animate = { opacity: 1, x: 0, y: 0 };

    return (
      <div ref={ref} className={cn('w-full', className)} {...props}>
        <motion.div
          initial={initial}
          whileInView={animate}
          viewport={{ once, threshold }}
          transition={{
            duration,
            delay,
            ease: 'easeOut',
          }}
        >
          {children}
        </motion.div>
      </div>
    );
  }
);

ScrollReveal.displayName = 'ScrollReveal';

export { ScrollReveal };
