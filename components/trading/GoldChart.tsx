'use client';

import { useEffect, useRef } from 'react';

interface GoldChartProps {
  symbol?: string;
  height?: number | string;
}

export function GoldChart({ symbol = 'OANDA:XAUUSD', height = 500 }: GoldChartProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    containerRef.current.innerHTML = '';

    const wrapper = document.createElement('div');
    wrapper.className = 'tradingview-widget-container';
    wrapper.style.width = '100%';
    wrapper.style.height = '100%';

    const widget = document.createElement('div');
    widget.className = 'tradingview-widget-container__widget';
    widget.style.width = '100%';
    widget.style.height = '100%';

    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js';
    script.type = 'text/javascript';
    script.async = true;
    script.text = JSON.stringify({
      autosize: true,
      symbol: symbol,
      interval: '15',
      timezone: 'Asia/Bangkok',
      theme: 'dark',
      style: '1',
      locale: 'en',
      allow_symbol_change: false,
      hide_top_toolbar: false,
      hide_legend: false,
      hide_side_toolbar: false,
      withdateranges: true,
      save_image: false,
      calendar: false,
      studies: ['MASimple@tv-basicstudies', 'RSI@tv-basicstudies'],
      support_host: 'https://www.tradingview.com',
    });

    wrapper.appendChild(widget);
    wrapper.appendChild(script);
    containerRef.current.appendChild(wrapper);

    return () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
      }
    };
  }, [symbol]);

  return (
    <div className="w-full rounded-2xl overflow-hidden border border-[rgba(255,255,255,0.08)] bg-[#0D1117] p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-[#8B949E] uppercase tracking-wider">Live Chart</span>
          <span className="h-1.5 w-1.5 rounded-full bg-[#39FF88] animate-pulse" />
        </div>
        <span className="text-xs text-[#8B949E]">{symbol.replace('OANDA:', '')}</span>
      </div>
      <div ref={containerRef} className="w-full" style={{ height: typeof height === 'number' ? height : 500 }} />
      <p className="mt-2 text-[10px] text-[#4B5563] text-right">Powered by TradingView</p>
    </div>
  );
}
