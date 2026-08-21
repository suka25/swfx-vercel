'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import { Circle, CircleCheck, CircleOff } from 'lucide-react';

interface AnimatedStatusBadgeProps {
  children: ReactNode;
  status?: 'active' | 'idle' | 'offline';
  className?: string;
}

export function AnimatedStatusBadge({
  children,
  status = 'active',
  className = '',
}: AnimatedStatusBadgeProps) {
  const statusConfig = {
    active: {
      color: 'text-[#39FF88]',
      bg: 'bg-[#39FF88]/10',
      border: 'border-[#39FF88]/20',
      icon: CircleCheck,
    },
    idle: {
      color: 'text-[#F5A623]',
      bg: 'bg-[#F5A623]/10',
      border: 'border-[#F5A623]/20',
      icon: Circle,
    },
    offline: {
      color: 'text-[#4B5563]',
      bg: 'bg-[#4B5563]/10',
      border: 'border-[#4B5563]/20',
      icon: CircleOff,
    },
  };

  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <div className={`flex items-center gap-2 px-3 py-1 rounded-full ${config.bg} ${config.border} ${config.color} ${className}`}>
      <motion.div
        animate={{
          scale: status === 'active' ? [1, 1.2, 1] : 1,
          opacity: status === 'active' ? [0.5, 1, 0.5] : 0.5,
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        <Icon size={14} />
      </motion.div>
      <span className="text-xs font-medium">{children}</span>
    </div>
  );
}
