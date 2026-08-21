'use client';

import { useEffect, useRef, useState } from 'react';

interface UseMagneticProps {
  enabled?: boolean;
  maxDistance?: number;
}

export function useMagnetic({
  enabled = true,
  maxDistance = 12,
}: UseMagneticProps = {}) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (!enabled || !ref.current) return;

    const element = ref.current;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const deltaX = e.clientX - centerX;
      const deltaY = e.clientY - centerY;

      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

      if (distance < maxDistance * 2) {
        const strength = Math.min(1, (maxDistance * 2 - distance) / (maxDistance * 2));
        const x = deltaX * strength * 0.3;
        const y = deltaY * strength * 0.3;

        setPosition({ x, y });
      } else {
        setPosition({ x: 0, y: 0 });
      }
    };

    const handleMouseLeave = () => {
      setPosition({ x: 0, y: 0 });
    };

    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [enabled, maxDistance]);

  return { ref, position };
}
