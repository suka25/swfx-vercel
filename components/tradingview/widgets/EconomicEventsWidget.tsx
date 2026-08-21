'use client';

import { useEffect, useRef } from 'react';

export default function EconomicEventsWidget({ height = 450 }) {
  const container = useRef(null);

  useEffect(() => {
    if (!container.current) return;
    container.current.innerHTML = '';

    const wrapper = document.createElement('div');
    wrapper.style.width = '100%';
    wrapper.style.height = '100%';
    wrapper.style.minHeight = `${height}px`;

    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-events.js';
    script.type = 'text/javascript';
    script.async = true;
    script.innerHTML = JSON.stringify({
      colorTheme: 'dark',
      isTransparent: true,
      locale: 'en',
      width: '100%',
      height: height,
      countryFilter: 'ar,au,br,ca,cn,fr,de,in,id,it,jp,kr,mx,ru,sa,za,tr,gb,us,eu',
      importanceFilter: '0,1',
    });

    wrapper.appendChild(script);
    container.current.appendChild(wrapper);

    return () => {
      if (container.current) container.current.innerHTML = '';
    };
  }, [height]);

  return <div ref={container} className="w-full" style={{ minHeight: `${height}px` }} />;
}
