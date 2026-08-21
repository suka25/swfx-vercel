'use client';

import { useEffect, useState, useCallback } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useSettings } from '@/hooks/useSettings';

export function CustomCursor() {
  const { settings } = useSettings();
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const springX = useSpring(cursorX, { damping: 25, stiffness: 400, mass: 0.5 });
  const springY = useSpring(cursorY, { damping: 25, stiffness: 400, mass: 0.5 });

  const enabled = settings?.enable_custom_cursor !== 'false';

  const handleMouseMove = useCallback((e: MouseEvent) => {
    cursorX.set(e.clientX);
    cursorY.set(e.clientY);
    if (!isVisible) setIsVisible(true);
  }, [cursorX, cursorY, isVisible]);

  const handleMouseEnter = useCallback(() => setIsVisible(true), []);
  const handleMouseLeave = useCallback(() => setIsVisible(false), []);

  const handleHoverStart = useCallback(() => setIsHovering(true), []);
  const handleHoverEnd = useCallback(() => setIsHovering(false), []);

  useEffect(() => {
    if (!enabled) return;

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);

    const elements = document.querySelectorAll('a, button, [role="button"], input, select, textarea');
    elements.forEach(el => {
      el.addEventListener('mouseenter', handleHoverStart);
      el.addEventListener('mouseleave', handleHoverEnd);
    });

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
      elements.forEach(el => {
        el.removeEventListener('mouseenter', handleHoverStart);
        el.removeEventListener('mouseleave', handleHoverEnd);
      });
    };
  }, [enabled, handleMouseMove, handleMouseEnter, handleMouseLeave, handleHoverStart, handleHoverEnd]);

  if (!enabled || !isVisible || typeof window === 'undefined') return null;

  const accentColor = settings?.accent_color || '#39FF88';

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 z-[9999] pointer-events-none hidden md:block"
        style={{
          x: springX,
          y: springY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        <div
          className={`w-4 h-4 rounded-full border-2 transition-all duration-200 ${
            isHovering ? 'w-10 h-10 bg-opacity-20' : ''
          }`}
          style={{
            borderColor: isHovering ? accentColor : `${accentColor}60`,
            backgroundColor: isHovering ? `${accentColor}20` : 'transparent',
          }}
        />
      </motion.div>

      <motion.div
        className="fixed top-0 left-0 z-[9998] pointer-events-none hidden md:block"
        style={{
          x: springX,
          y: springY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          opacity: isHovering ? 0 : 0.3,
          scale: isHovering ? 0 : 1,
        }}
        transition={{ duration: 0.2 }}
      >
        <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: `${accentColor}40` }} />
      </motion.div>
    </>
  );
}
