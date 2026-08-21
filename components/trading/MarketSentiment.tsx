'use client';

import { useEffect, useRef } from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface SentimentData {
  pair: string;
  sentiment: 'bullish' | 'bearish' | 'neutral';
  percentage: number;
}

export function MarketSentiment() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    containerRef.current.innerHTML = '';

    const wrapper = document.createElement('div');
    wrapper.className = 'tradingview-widget-container';
    wrapper.style.width = '100%';
    wrapper.style.height = '100%';
    wrapper.style.minHeight = '350px';
    containerRef.current.appendChild(wrapper);

    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-market-quotes.js';
    script.async = true;
    script.text = JSON.stringify({
      symbolsGroups: [
        {
          name: 'SWFX',
          originalName: 'SWFX',
          symbols: [
            { proName: 'OANDA:XAUUSD', title: 'GOLD / USD' },
            { proName: 'OANDA:EURUSD', title: 'EUR / USD' },
            { proName: 'OANDA:GBPUSD', title: 'GBP / USD' },
            { proName: 'OANDA:USDJPY', title: 'USD / JPY' },
            { proName: 'OANDA:AUDUSD', title: 'AUD / USD' },
            { proName: 'OANDA:USDCAD', title: 'USD / CAD' },
            { proName: 'OANDA:USDCHF', title: 'USD / CHF' },
            { proName: 'OANDA:NZDUSD', title: 'NZD / USD' },
          ],
        },
      ],
      showSymbolLogo: false,
      isTransparent: true,
      colorTheme: 'dark',
      locale: 'en',
      width: '100%',
      height: '100%',
      gridLineColor: 'rgba(255,255,255,0.05)',
    });

    wrapper.appendChild(script);

    return () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
      }
    };
  }, []);

  return (
    <div className="bg-[#0D1117] border border-[rgba(255,255,255,0.08)] rounded-2xl p-4 h-full min-h-[350px]">
      <h3 className="text-sm font-semibold text-[#8B949E] mb-3 flex items-center gap-2">
        <TrendingUp size={16} />
        Market Quotes
      </h3>
      <div ref={containerRef} className="w-full h-[calc(100%-2rem)] min-h-[300px]" />
    </div>
  );
}
