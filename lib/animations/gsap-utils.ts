'use client';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export const animationDefaults = {
  duration: 0.8,
  ease: 'power3.inOut',
};

// Text Reveal
export function animateTextReveal(element: string | Element, delay: number = 0) {
  return gsap.fromTo(
    element,
    { y: 60, opacity: 0, filter: 'blur(8px)' },
    {
      y: 0,
      opacity: 1,
      filter: 'blur(0px)',
      duration: animationDefaults.duration,
      ease: animationDefaults.ease,
      delay,
      scrollTrigger: {
        trigger: element,
        start: 'top 85%',
        toggleActions: 'play none none reverse',
      },
    }
  );
}

// Image Reveal
export function animateImageReveal(element: string | Element, delay: number = 0) {
  return gsap.fromTo(
    element,
    { scale: 1.1, opacity: 0, filter: 'blur(4px)' },
    {
      scale: 1,
      opacity: 1,
      filter: 'blur(0px)',
      duration: 1,
      ease: 'power2.out',
      delay,
      scrollTrigger: {
        trigger: element,
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      },
    }
  );
}

// Stagger Children
export function staggerReveal(
  container: string | Element,
  children: string,
  delay: number = 0
) {
  return gsap.fromTo(
    children,
    { y: 40, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 0.6,
      ease: 'power2.out',
      stagger: 0.08,
      delay,
      scrollTrigger: {
        trigger: container,
        start: 'top 85%',
        toggleActions: 'play none none reverse',
      },
    }
  );
}

// Parallax
export function createParallax(
  element: string | Element,
  speed: number = 0.1
) {
  return gsap.to(element, {
    y: () => -window.innerHeight * speed,
    ease: 'none',
    scrollTrigger: {
      trigger: element,
      start: 'top bottom',
      end: 'bottom top',
      scrub: 1,
    },
  });
}

// Cleanup
export function cleanupAnimations() {
  ScrollTrigger.getAll().forEach((st) => st.kill());
  gsap.killTweensOf('*');
}
