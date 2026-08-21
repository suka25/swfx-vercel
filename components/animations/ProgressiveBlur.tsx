'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { ReactNode, useRef } from 'react';

interface ProgressiveBlurProps {
  children: ReactNode;
  className?: string;
  blurStart?: number;
  blurEnd?: number;
}

export function ProgressiveBlur({ 
  children, 
  className = '', 
  blurStart = 8,
  blurEnd = 0 
}: ProgressiveBlurProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const blurAmount = useTransform(
    scrollYProgress, 
    [0, 0.5, 1], 
    [blurStart, blurEnd, blurStart]
  );
  const opacity = useTransform(
    scrollYProgress, 
    [0, 0.3, 0.7, 1], 
    [0.3, 1, 1, 0.3]
  );

  return (
    <motion.div
      ref={ref}
      style={{
        filter: blurAmount,
        opacity,
        transition: 'filter 0.1s ease-out',
        willChange: 'filter, opacity',
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
