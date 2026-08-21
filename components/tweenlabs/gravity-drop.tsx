'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface GravityDropProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export function GravityDrop({
  children,
  className = '',
  delay = 0,
}: GravityDropProps) {
  return (
    <motion.div
      className={className}
      initial={{
        y: -100,
        opacity: 0,
        scale: 0.8,
      }}
      whileInView={{
        y: 0,
        opacity: 1,
        scale: 1,
      }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{
        type: 'spring',
        stiffness: 100,
        damping: 15,
        delay,
        mass: 0.5,
      }}
    >
      {children}
    </motion.div>
  );
}
