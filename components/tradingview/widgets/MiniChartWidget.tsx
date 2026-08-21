'use client';

import { useEffect, useRef } from 'react';

interface MiniChartWidgetProps {
  symbol?: string;
  height?: number;
  width?: string;
  showTimeScale?: boolean;
}

export default function MiniChartWidget({ 
  symbol = 'OANDA:XAUUSD',
  height = 200,
  width = '100%',
  showTimeScale = true
}: MiniChartWidgetProps) {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!container.current) return;
    
    container.current.innerHTML = '';

    const wrapper = document.createElement('div');
    wrapper.style.width = '100%';
    wrapper.style.height = '100%';
    wrapper.style.minHeight = `${height}px`;
    wrapper.style.position = 'relative';
    wrapper.style.backgroundColor = 'transparent';
    wrapper.style.borderRadius = '8px';
    wrapper.style.overflow = 'hidden';

    const script = document.createElement('script');
    script.type = 'module';
    script.src = 'https://widgets.tradingview-widget.com/w/en/tv-mini-chart.js';
    script.async = true;

    const widget = document.createElement('tv-mini-chart');
    widget.setAttribute('symbol', symbol);
    if (showTimeScale) {
      widget.setAttribute('show-time-scale', '');
    }
    widget.setAttribute('width', width);
    widget.setAttribute('height', String(height));
    widget.setAttribute('color-theme', 'dark');
    widget.setAttribute('locale', 'en');
    widget.setAttribute('background-color', 'transparent');
    widget.setAttribute('line-color', '#39FF88');
    widget.setAttribute('border-color', 'rgba(255,255,255,0.05)');
    widget.setAttribute('text-color', '#8B949E');
    widget.setAttribute('chart-type', 'line');

    wrapper.appendChild(widget);
    wrapper.appendChild(script);
    container.current.appendChild(wrapper);

    return () => {
      if (container.current) {
        container.current.innerHTML = '';
      }
    };
  }, [symbol, height, width, showTimeScale]);

  return (
    <div ref={container} className="w-full h-full" style={{ minHeight: `${height}px`, backgroundColor: 'transparent' }} />
  );
}
