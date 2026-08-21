'use client';

import { useEffect, useRef, memo, useState } from 'react';

function EconomicCalendarWidget() {
  const container = useRef<HTMLDivElement>(null);
  const widgetRef = useRef<any>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    return () => {
      setIsMounted(false);
      if (container.current) {
        container.current.innerHTML = '';
      }
      widgetRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (!isMounted || !container.current) return;
    
    container.current.innerHTML = '';
    widgetRef.current = null;

    const wrapper = document.createElement('div');
    wrapper.className = 'tradingview-widget-container';
    wrapper.style.width = '100%';
    wrapper.style.height = '100%';
    wrapper.style.minHeight = '350px';
    wrapper.style.position = 'relative';

    const widget = document.createElement('div');
    widget.className = 'tradingview-widget-container__widget';
    widget.style.width = '100%';
    widget.style.height = '100%';
    widget.style.minHeight = '350px';
    widget.style.position = 'relative';

    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-events.js';
    script.type = 'text/javascript';
    script.async = true;
    script.innerHTML = JSON.stringify({
      colorTheme: 'dark',
      isTransparent: true,
      locale: 'en',
      countryFilter: 'ar,au,br,ca,cn,fr,de,in,id,it,jp,kr,mx,ru,sa,za,tr,gb,us,eu',
      importanceFilter: '0,1',
      width: '100%',
      height: '100%',
    });

    wrapper.appendChild(widget);
    wrapper.appendChild(script);
    container.current.appendChild(wrapper);
    widgetRef.current = wrapper;

    return () => {
      if (container.current) {
        container.current.innerHTML = '';
      }
      widgetRef.current = null;
    };
  }, [isMounted]);

  return (
    <div ref={container} className="w-full h-full min-h-[350px] md:min-h-[450px]" />
  );
}

export default memo(EconomicCalendarWidget);
