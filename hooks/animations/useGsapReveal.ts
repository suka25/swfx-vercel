'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface UseGsapRevealOptions {
  animation?: 'fade' | 'slideUp' | 'slideLeft' | 'scale' | 'blur';
  delay?: number;
  duration?: number;
  stagger?: number;
  once?: boolean;
}

export function useGsapReveal<T extends HTMLElement = HTMLDivElement>(
  options: UseGsapRevealOptions = {}
) {
  const ref = useRef<T>(null);
  const {
    animation = 'slideUp',
    delay = 0,
    duration = 0.8,
    stagger = 0,
    once = true,
  } = options;

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const animations = {
      fade: { opacity: 0 },
      slideUp: { y: 60, opacity: 0 },
      slideLeft: { x: -60, opacity: 0 },
      scale: { scale: 0.8, opacity: 0 },
      blur: { filter: 'blur(10px)', opacity: 0 },
    };

    const from = animations[animation] || animations.slideUp;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: element,
        start: 'top 85%',
        toggleActions: once ? 'play none none none' : 'play none none reverse',
      },
    });

    tl.fromTo(
      element,
      { ...from },
      {
        y: 0,
        x: 0,
        scale: 1,
        opacity: 1,
        filter: 'blur(0px)',
        duration,
        ease: 'power2.out',
        delay,
        stagger,
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === element) st.kill();
      });
      tl.kill();
    };
  }, [animation, delay, duration, stagger, once]);

  return ref;
}
