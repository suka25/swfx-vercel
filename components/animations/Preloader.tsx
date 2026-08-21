'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader } from 'lucide-react';

interface PreloaderProps {
  onComplete: () => void;
  minDuration?: number;
}

export function Preloader({ onComplete, minDuration = 600 }: PreloaderProps) {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const startTime = performance.now();
    let animationFrame: number;

    const updateProgress = () => {
      const elapsed = performance.now() - startTime;
      const rawProgress = Math.min((elapsed / minDuration) * 100, 100);
      
      // Easing function untuk progress yang smooth
      const eased = 100 * (1 - Math.pow(1 - rawProgress / 100, 1.5));
      setProgress(Math.min(Math.round(eased), 100));
      
      if (rawProgress < 100) {
        animationFrame = requestAnimationFrame(updateProgress);
      } else {
        setIsComplete(true);
        setTimeout(onComplete, 200);
      }
    };

    animationFrame = requestAnimationFrame(updateProgress);

    // Fallback timeout
    const timeout = setTimeout(() => {
      if (!isComplete) {
        setProgress(100);
        setIsComplete(true);
        setTimeout(onComplete, 200);
      }
    }, minDuration + 1000);

    return () => {
      cancelAnimationFrame(animationFrame);
      clearTimeout(timeout);
    };
  }, [onComplete, minDuration, isComplete]);

  return (
    <AnimatePresence>
      {!isComplete && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 0.4, ease: 'easeInOut' }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#080A0D]"
        >
          <div className="text-center px-4">
            {/* Logo */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className="mb-6"
            >
              <span className="text-3xl md:text-4xl font-bold text-[#39FF88] tracking-tight">SWFX</span>
              <p className="text-[10px] text-[#8B949E] mt-1 tracking-[0.2em] uppercase">
                Suka Wedana Forex
              </p>
            </motion.div>

            {/* Progress Bar */}
            <div className="w-40 md:w-56 mx-auto">
              <div className="relative h-1 bg-[#1A1F2E] rounded-full overflow-hidden">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-[#39FF88] to-[#39FF88]/60 rounded-full"
                  style={{ width: `${progress}%` }}
                  transition={{ duration: 0.05 }}
                />
              </div>
              <div className="mt-2 flex justify-between text-[10px] text-[#4B5563]">
                <span>Loading</span>
                <span className="font-mono text-[#39FF88]">{progress}%</span>
              </div>
            </div>

            {/* Loading dots */}
            <div className="mt-4 flex justify-center gap-1.5">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="w-1.5 h-1.5 rounded-full bg-[#39FF88]"
                  animate={{
                    scale: [1, 1.8, 1],
                    opacity: [0.3, 1, 0.3],
                  }}
                  transition={{
                    duration: 1,
                    delay: i * 0.25,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                />
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
