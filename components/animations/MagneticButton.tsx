'use client';

import { motion } from 'framer-motion';
import { forwardRef, HTMLAttributes, useState } from 'react';
import { cn } from '@/lib/utils/cn';

interface MagneticButtonProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  enabled?: boolean;
}

const MagneticButton = forwardRef<HTMLDivElement, MagneticButtonProps>(
  ({ className, children, enabled = true, ...props }, ref) => {
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
      if (!enabled) return;
      const rect = e.currentTarget.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) * 0.2;
      const y = (e.clientY - rect.top - rect.height / 2) * 0.2;
      setPosition({ x, y });
    };

    const handleMouseLeave = () => {
      setPosition({ x: 0, y: 0 });
    };

    return (
      <div
        ref={ref}
        className={cn('inline-block', className)}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        {...props}
      >
        <motion.div
          animate={{
            x: position.x,
            y: position.y,
          }}
          transition={{
            type: 'spring',
            stiffness: 400,
            damping: 17,
            mass: 0.5,
          }}
          className="inline-block"
        >
          {children}
        </motion.div>
      </div>
    );
  }
);

MagneticButton.displayName = 'MagneticButton';

export { MagneticButton };
