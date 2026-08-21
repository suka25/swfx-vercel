'use client';

import { useEffect, useRef } from 'react';

export default function ScreenerWidget({ height = 500 }) {
  const container = useRef(null);

  useEffect(() => {
    if (!container.current) return;
    container.current.innerHTML = '';

    const wrapper = document.createElement('div');
    wrapper.style.width = '100%';
    wrapper.style.height = '100%';
    wrapper.style.minHeight = `${height}px`;

    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-screener.js';
    script.type = 'text/javascript';
    script.async = true;
    script.innerHTML = JSON.stringify({
      market: 'forex',
      showToolbar: true,
      defaultColumn: 'overview',
      defaultScreen: 'general',
      isTransparent: true,
      locale: 'en',
      colorTheme: 'dark',
      width: '100%',
      height: height,
    });

    wrapper.appendChild(script);
    container.current.appendChild(wrapper);

    return () => {
      if (container.current) container.current.innerHTML = '';
    };
  }, [height]);

  return <div ref={container} className="w-full" style={{ minHeight: `${height}px` }} />;
}
