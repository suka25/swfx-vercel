'use client';

import { motion } from 'framer-motion';
import { ReactNode, useState } from 'react';
import { Card } from '@/components/ui/Card';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface ExpandingCardProps {
  title: string;
  description: string;
  children: ReactNode;
  className?: string;
}

export function ExpandingCard({
  title,
  description,
  children,
  className = '',
}: ExpandingCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      className={className}
      animate={{
        height: isExpanded ? 'auto' : '120px',
      }}
      transition={{
        type: 'spring',
        stiffness: 200,
        damping: 20,
      }}
    >
      <Card
        variant="elevated"
        className="p-6 cursor-pointer border border-ui-border hover:border-accent-bullish/30 transition-all duration-300"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-start justify-between">
          <div className="min-w-0">
            <h3 className="font-semibold text-text-primary">{title}</h3>
            <p className="mt-1 text-sm text-text-muted">{description}</p>
          </div>
          <motion.div
            animate={{
              rotate: isExpanded ? 180 : 0,
            }}
            transition={{ duration: 0.3 }}
            className="flex-shrink-0 ml-4"
          >
            {isExpanded ? (
              <ChevronUp size={20} className="text-text-muted" />
            ) : (
              <ChevronDown size={20} className="text-text-muted" />
            )}
          </motion.div>
        </div>
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{
            opacity: isExpanded ? 1 : 0,
            height: isExpanded ? 'auto' : 0,
          }}
          transition={{ duration: 0.3 }}
          className="mt-4 pt-4 border-t border-ui-border"
        >
          {children}
        </motion.div>
      </Card>
    </motion.div>
  );
}
