'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { ReactNode, useRef } from 'react';

interface ScrollAssemblyProps {
  children: ReactNode;
  className?: string;
  scale?: boolean;
  opacity?: boolean;
  translateY?: boolean;
}

export function ScrollAssembly({
  children,
  className = '',
  scale = true,
  opacity = true,
  translateY = true,
}: ScrollAssemblyProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const scaleValue = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 1]);
  const opacityValue = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0.3]);
  const yValue = useTransform(scrollYProgress, [0, 0.5, 1], [50, 0, 0]);

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{
        scale: scale ? scaleValue : 1,
        opacity: opacity ? opacityValue : 1,
        y: translateY ? yValue : 0,
        willChange: 'transform, opacity',
      }}
    >
      {children}
    </motion.div>
  );
}
