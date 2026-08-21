'use client';

import { useEffect, useRef, useState } from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface AnimatedCounterProps {
  from: number;
  to: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
  className?: string;
  showTrend?: boolean;
}

export function AnimatedCounter({
  from,
  to,
  duration = 2000,
  suffix = '',
  prefix = '',
  className = '',
  showTrend = false,
}: AnimatedCounterProps) {
  const [count, setCount] = useState(from);
  const ref = useRef<HTMLDivElement>(null);
  const isPositive = to >= from;

  useEffect(() => {
    let startTime: number;
    let animationFrame: number;

    const updateCount = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = from + (to - from) * eased;
      setCount(current);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(updateCount);
      }
    };

    animationFrame = requestAnimationFrame(updateCount);

    return () => cancelAnimationFrame(animationFrame);
  }, [from, to, duration]);

  return (
    <div className={`flex items-center gap-1 ${className}`}>
      {showTrend && (
        isPositive ? (
          <TrendingUp size={14} className="text-[#39FF88]" />
        ) : (
          <TrendingDown size={14} className="text-[#FF4D5F]" />
        )
      )}
      {prefix}
      {Math.round(count).toLocaleString()}
      {suffix}
    </div>
  );
}
