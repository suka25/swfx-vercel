'use client';

import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils/cn';

interface TradingViewTickerProps {
  symbols?: string[];
  className?: string;
}

export function TradingViewTicker({
  symbols = ['XAUUSD', 'EURUSD', 'GBPUSD', 'USDJPY', 'AUDUSD', 'USDCAD', 'USDCHF', 'BTCUSD'],
  className = '',
}: TradingViewTickerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetRef = useRef<any>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    return () => {
      setIsMounted(false);
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
      }
      widgetRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (!isMounted || !containerRef.current) return;

    containerRef.current.innerHTML = '';
    widgetRef.current = null;

    const wrapper = document.createElement('div');
    wrapper.style.width = '100%';
    wrapper.style.height = '100%';
    wrapper.style.minHeight = '40px';
    wrapper.style.position = 'relative';
    containerRef.current.appendChild(wrapper);

    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js';
    script.async = true;
    script.innerHTML = JSON.stringify({
      symbols: symbols.map(s => ({
        proName: `OANDA:${s}`,
        title: s,
      })),
      showSymbolLogo: false,
      isTransparent: true,
      displayMode: 'adaptive',
      colorTheme: 'dark',
      locale: 'en',
    });

    wrapper.appendChild(script);
    widgetRef.current = wrapper;

    return () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
      }
      widgetRef.current = null;
    };
  }, [isMounted, symbols]);

  return (
    <div
      ref={containerRef}
      className={cn('w-full overflow-hidden', className)}
      style={{ minHeight: '40px' }}
    />
  );
}
