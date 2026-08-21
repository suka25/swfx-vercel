'use client';

import { motion } from 'framer-motion';
import { ReactNode, useState } from 'react';
import { Card } from '@/components/ui/Card';

interface AnimatedSupportCardProps {
  children: ReactNode;
  className?: string;
  icon?: ReactNode;
}

export function AnimatedSupportCard({
  children,
  className = '',
  icon,
}: AnimatedSupportCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      animate={{
        y: isHovered ? -8 : 0,
        scale: isHovered ? 1.02 : 1,
      }}
      transition={{
        type: 'spring',
        stiffness: 300,
        damping: 20,
      }}
      className={className}
    >
      <Card variant="elevated" className="p-6 border border-ui-border relative overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-accent-bullish/5 via-transparent to-accent-bullish/5"
          animate={{
            x: isHovered ? ['-100%', '100%'] : '-100%',
          }}
          transition={{
            duration: 0.8,
            ease: 'easeInOut',
          }}
        />
        <div className="relative z-10">
          {icon && <div className="mb-4">{icon}</div>}
          {children}
        </div>
      </Card>
    </motion.div>
  );
}
