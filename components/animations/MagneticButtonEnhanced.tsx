'use client';

import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface MagneticButtonEnhancedProps {
  children: ReactNode;
  className?: string;
  strength?: number;
}

export function MagneticButtonEnhanced({
  children,
  className = '',
  strength = 20,
}: MagneticButtonEnhancedProps) {
  return (
    <motion.div
      className={className}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
    >
      {children}
    </motion.div>
  );
}
