'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface BorderRevealProps {
  children: ReactNode;
  className?: string;
  color?: string;
  duration?: number;
}

export function BorderReveal({
  children,
  className = '',
  color = '#39FF88',
  duration = 2,
}: BorderRevealProps) {
  return (
    <div className={`relative ${className}`}>
      <motion.div
        className="absolute -inset-0.5 rounded-2xl"
        style={{
          background: `linear-gradient(90deg, transparent, ${color}, transparent)`,
          backgroundSize: '200% 100%',
        }}
        animate={{
          backgroundPosition: ['-200% 0', '200% 0'],
        }}
        transition={{
          duration,
          repeat: Infinity,
          ease: 'linear',
        }}
      />
      <div className="relative bg-background-surface rounded-2xl overflow-hidden">
        {children}
      </div>
    </div>
  );
}
