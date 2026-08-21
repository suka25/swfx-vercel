'use client';

import { useEffect, useRef } from 'react';
import { Calendar } from 'lucide-react';

export function EconomicCalendar() {
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
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-events.js';
    script.async = true;
    script.text = JSON.stringify({
      colorTheme: 'dark',
      isTransparent: true,
      width: '100%',
      height: '100%',
      locale: 'en',
      importanceFilter: '-1,0,1',
      countryFilter: 'us,gb,eu,au,jp,ca,ch,nz',
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
        <Calendar size={16} />
        Economic Calendar
      </h3>
      <div ref={containerRef} className="w-full h-[calc(100%-2rem)] min-h-[300px]" />
    </div>
  );
}
