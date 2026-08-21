'use client';

import { useEffect } from 'react';

export function RegisterSW() {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/sw.js')
        .then((registration) => {
          console.log('SWFX: Service Worker registered');
        })
        .catch((error) => {
          console.error('SWFX: Service Worker registration failed:', error);
        });
    }
  }, []);

  return null;
}
