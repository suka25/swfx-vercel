'use client';

import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface StaggerGridProps {
  children: ReactNode[];
  className?: string;
  staggerDelay?: number;
  duration?: number;
}

export function StaggerGrid({ 
  children, 
  className = '', 
  staggerDelay = 0.05,
  duration = 0.5 
}: StaggerGridProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration, ease: 'easeOut' },
    },
  };

  return (
    <motion.div
      className={className}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
    >
      {children.map((child, index) => (
        <motion.div key={index} variants={itemVariants}>
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
}
