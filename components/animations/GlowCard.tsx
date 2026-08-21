'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils/cn';
import { ReactNode } from 'react';

interface GlowCardProps {
  children: ReactNode;
  className?: string;
  glowColor?: string;
}

export function GlowCard({ 
  children, 
  className = '', 
  glowColor = 'rgba(57, 255, 136, 0.2)' 
}: GlowCardProps) {
  return (
    <motion.div
      className={cn('relative group', className)}
      whileHover={{ scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      <div 
        className="absolute -inset-0.5 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ backgroundColor: glowColor }}
      />
      <div className="relative bg-background-surface rounded-2xl border border-ui-border group-hover:border-accent-bullish/30 transition-all duration-300">
        {children}
      </div>
    </motion.div>
  );
}
