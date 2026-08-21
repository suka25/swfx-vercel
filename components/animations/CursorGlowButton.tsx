'use client';

import { motion } from 'framer-motion';
import { ReactNode, useState } from 'react';
import { Button, ButtonProps } from '@/components/ui/Button';

interface CursorGlowButtonProps extends ButtonProps {
  children: ReactNode;
  glowColor?: string;
}

export function CursorGlowButton({
  children,
  className = '',
  glowColor = 'rgba(57, 255, 136, 0.3)',
  ...props
}: CursorGlowButtonProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="relative inline-block">
      <motion.div
        className="absolute -inset-1 rounded-xl blur-2xl"
        style={{ backgroundColor: glowColor }}
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 0.5 : 0 }}
        transition={{ duration: 0.3 }}
      />
      <Button
        className={`relative z-10 ${className}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        {...props}
      >
        {children}
      </Button>
    </div>
  );
}
