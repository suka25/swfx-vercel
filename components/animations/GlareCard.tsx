'use client';

import { ReactNode, useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface GlareCardProps {
  children: ReactNode;
  className?: string;
  glareColor?: string;
}

export function GlareCard({ 
  children, 
  className = '', 
  glareColor = 'rgba(57, 255, 136, 0.1)' 
}: GlareCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    setPosition({ x, y });
  };

  return (
    <div
      ref={cardRef}
      className={`relative overflow-hidden rounded-2xl ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setPosition({ x: 0, y: 0 });
      }}
      onMouseMove={handleMouseMove}
    >
      <div className="relative z-10">{children}</div>
      <motion.div
        className="absolute inset-0 pointer-events-none z-0"
        animate={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(circle at ${50 + position.x * 25}% ${50 + position.y * 25}%, ${glareColor}, transparent 70%)`,
        }}
        transition={{ duration: 0.3 }}
      />
    </div>
  );
}
