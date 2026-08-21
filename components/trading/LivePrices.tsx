'use client';

import { useEffect, useRef } from 'react';

export function LivePrices() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    containerRef.current.innerHTML = '';

    const wrapper = document.createElement('div');
    wrapper.style.width = '100%';
    wrapper.style.height = '100%';
    containerRef.current.appendChild(wrapper);

    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-symbol-info.js';
    script.async = true;
    script.innerHTML = JSON.stringify({
      symbols: [
        { proName: 'OANDA:XAUUSD', title: 'XAUUSD' },
        { proName: 'OANDA:EURUSD', title: 'EURUSD' },
        { proName: 'OANDA:GBPUSD', title: 'GBPUSD' },
        { proName: 'OANDA:USDJPY', title: 'USDJPY' },
        { proName: 'OANDA:AUDUSD', title: 'AUDUSD' },
      ],
      showSymbolLogo: false,
      isTransparent: true,
      colorTheme: 'dark',
      locale: 'en',
      width: '100%',
      height: '100%',
    });

    wrapper.appendChild(script);

    return () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full"
      style={{ minHeight: '200px' }}
    />
  );
}
