'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

interface TypewriterTextProps {
  words: string[];
  className?: string;
}

export function TypewriterText({ words, className = '' }: TypewriterTextProps) {
  const [index, setIndex] = useState(0);
  const [currentWord, setCurrentWord] = useState(words[0]);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
      setCurrentWord(words[(index + 1) % words.length]);
    }, 3000);

    return () => clearInterval(interval);
  }, [index, words]);

  return (
    <AnimatePresence mode="wait">
      <motion.span
        key={currentWord}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
        className={className}
      >
        {currentWord}
      </motion.span>
    </AnimatePresence>
  );
}
