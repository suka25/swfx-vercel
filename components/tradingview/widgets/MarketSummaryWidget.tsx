'use client';

import { useEffect, useRef } from 'react';

interface MarketSummaryWidgetProps {
  symbols?: string[];
  height?: number;
}

export default function MarketSummaryWidget({ 
  symbols = ['OANDA:XAUUSD', 'OANDA:EURUSD', 'OANDA:GBPUSD', 'OANDA:USDJPY', 'OANDA:AUDUSD', 'OANDA:BTCUSD'],
  height = 300 
}: MarketSummaryWidgetProps) {
  const container = useRef<HTMLDivElement>(null);
  const widgetId = useRef(`tv-summary-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`);

  useEffect(() => {
    if (!container.current) return;
    
    // Bersihkan container
    container.current.innerHTML = '';

    // Buat wrapper dengan background transparan
    const wrapper = document.createElement('div');
    wrapper.id = widgetId.current;
    wrapper.style.width = '100%';
    wrapper.style.height = '100%';
    wrapper.style.minHeight = `${height}px`;
    wrapper.style.position = 'relative';
    wrapper.style.backgroundColor = 'transparent';
    wrapper.style.borderRadius = '12px';

    // Buat widget container untuk TradingView
    const widgetContainer = document.createElement('div');
    widgetContainer.className = 'tradingview-widget-container';
    widgetContainer.style.width = '100%';
    widgetContainer.style.height = '100%';
    widgetContainer.style.position = 'relative';

    // Script untuk widget market summary
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-market-quotes.js';
    script.async = true;
    script.innerHTML = JSON.stringify({
      symbolsGroups: [
        {
          name: 'Forex',
          originalName: 'Forex',
          symbols: symbols.map(s => ({
            proName: s,
            title: s.split(':')[1] || s
          }))
        }
      ],
      showSymbolLogo: false,
      isTransparent: true,
      colorTheme: 'dark',
      locale: 'en',
      width: '100%',
      height: '100%',
      gridLineColor: 'rgba(255,255,255,0.05)',
      backgroundColor: 'transparent',
      headerColor: 'transparent',
    });

    widgetContainer.appendChild(script);
    wrapper.appendChild(widgetContainer);
    container.current.appendChild(wrapper);

    return () => {
      if (container.current) {
        container.current.innerHTML = '';
      }
    };
  }, [symbols, height]);

  return (
    <div ref={container} className="w-full" style={{ minHeight: `${height}px` }} />
  );
}
