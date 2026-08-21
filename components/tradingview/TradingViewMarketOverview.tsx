'use client';

import { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils/cn';

interface TradingViewMarketOverviewProps {
  symbols?: string[];
  className?: string;
  height?: number;
}

export function TradingViewMarketOverview({
  symbols = ['XAUUSD', 'EURUSD', 'GBPUSD', 'USDJPY', 'AUDUSD', 'USDCAD', 'USDCHF', 'BTCUSD'],
  className = '',
  height = 400,
}: TradingViewMarketOverviewProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    containerRef.current.innerHTML = '';

    const wrapper = document.createElement('div');
    wrapper.style.width = '100%';
    wrapper.style.height = '100%';
    containerRef.current.appendChild(wrapper);

    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-market-quotes.js';
    script.async = true;
    script.innerHTML = JSON.stringify({
      symbols: symbols.map(s => ({
        proName: `OANDA:${s}`,
        title: s,
      })),
      showSymbolLogo: false,
      isTransparent: true,
      colorTheme: 'dark',
      locale: 'en',
      width: '100%',
      height: height,
      gridLineColor: 'rgba(255,255,255,0.05)',
    });

    wrapper.appendChild(script);

    return () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
      }
    };
  }, [symbols, height]);

  return (
    <div
      ref={containerRef}
      className={cn('w-full rounded-xl overflow-hidden', className)}
      style={{ height }}
    />
  );
}
