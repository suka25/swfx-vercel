'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { cn } from '@/lib/utils/cn';

interface TradingViewChartProps {
  symbol?: string;
  theme?: 'dark' | 'light';
  interval?: string;
  height?: number | string;
  width?: string | number;
  containerClassName?: string;
  allowSymbolChange?: boolean;
}

declare global {
  interface Window {
    TradingView: any;
  }
}

export function TradingViewChart({
  symbol = 'OANDA:XAUUSD',
  theme = 'dark',
  interval = '60',
  height = 600,
  width = '100%',
  containerClassName = '',
  allowSymbolChange = true,
}: TradingViewChartProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetRef = useRef<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  const scriptLoadedRef = useRef(false);

  const containerId = useRef(`tv-chart-${Math.random().toString(36).substring(2, 10)}`);

  useEffect(() => {
    setIsMounted(true);
    return () => {
      setIsMounted(false);
      if (widgetRef.current) {
        try {
          widgetRef.current.remove();
        } catch (e) {}
        widgetRef.current = null;
      }
    };
  }, []);

  const initWidget = useCallback(() => {
    if (!isMounted || !containerRef.current || typeof window.TradingView === 'undefined') {
      return;
    }

    if (widgetRef.current) {
      try {
        widgetRef.current.remove();
      } catch (e) {}
      widgetRef.current = null;
    }

    try {
      const container = containerRef.current;
      if (container) {
        container.innerHTML = '';
      }

      const widget = new window.TradingView.widget({
        container_id: containerId.current,
        symbol: symbol,
        interval: interval,
        timezone: 'Asia/Jakarta',
        theme: theme,
        style: '1',
        locale: 'en',
        toolbar_bg: '#080A0D',
        enable_publishing: false,
        hide_top_toolbar: false,
        hide_legend: false,
        save_image: false,
        calendar: false,
        hide_volume: false,
        support_host: 'https://www.tradingview.com',
        allow_symbol_change: allowSymbolChange,
        studies: ['MASimple@tv-basicstudies', 'RSI@tv-basicstudies'],
        width: '100%',
        height: typeof height === 'number' ? height : 600,
        backgroundColor: '#080A0D',
        gridColor: 'rgba(255,255,255,0.05)',
        show_popup_button: true,
        details: true,
        hotlist: true,
        loading_screen: {
          backgroundColor: '#080A0D',
          foregroundColor: '#39FF88',
        },
        autosize: false,
      });

      widgetRef.current = widget;
      setIsLoading(false);
      setError(null);

    } catch (err) {
      console.error('TradingView widget error:', err);
      setError('Failed to initialize chart');
      setIsLoading(false);
    }
  }, [isMounted, symbol, interval, theme, height, allowSymbolChange]);

  useEffect(() => {
    if (!isMounted) return;

    const loadScript = () => {
      if (scriptLoadedRef.current && typeof window.TradingView !== 'undefined') {
        setTimeout(initWidget, 100);
        return;
      }

      const existingScript = document.querySelector('script[src="https://s3.tradingview.com/tv.js"]');
      
      if (existingScript) {
        scriptLoadedRef.current = true;
        const checkInterval = setInterval(() => {
          if (typeof window.TradingView !== 'undefined') {
            clearInterval(checkInterval);
            setTimeout(initWidget, 100);
          }
        }, 100);

        setTimeout(() => clearInterval(checkInterval), 5000);
        return;
      }

      const script = document.createElement('script');
      script.src = 'https://s3.tradingview.com/tv.js';
      script.async = true;
      script.onload = () => {
        scriptLoadedRef.current = true;
        setTimeout(initWidget, 200);
      };
      script.onerror = () => {
        setError('Failed to load TradingView script');
        setIsLoading(false);
      };

      document.head.appendChild(script);
    };

    loadScript();

    const timeout = setTimeout(() => {
      if (isLoading) {
        setIsLoading(false);
        setError('Chart loading timeout');
      }
    }, 10000);

    return () => {
      clearTimeout(timeout);
    };
  }, [isMounted, initWidget, isLoading]);

  useEffect(() => {
    if (widgetRef.current && widgetRef.current.chart) {
      try {
        widgetRef.current.chart.setSymbol(symbol);
      } catch (e) {}
    }
  }, [symbol]);

  if (!isMounted) {
    return (
      <div className="w-full rounded-xl overflow-hidden border border-ui-border bg-[#080A0D]" style={{ height: typeof height === 'number' ? height : 600 }}>
        <div className="flex items-center justify-center h-full">
          <div className="flex flex-col items-center gap-3">
            <div className="h-8 w-8 border-2 border-[#39FF88]/30 border-t-[#39FF88] rounded-full animate-spin" />
            <span className="text-sm text-[#8B949E]">Loading chart...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={cn('relative w-full', containerClassName)} style={{ height: typeof height === 'number' ? height : 600 }}>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-[#080A0D]/90 z-10 rounded-xl">
          <div className="flex flex-col items-center gap-3">
            <div className="h-8 w-8 border-2 border-[#39FF88]/30 border-t-[#39FF88] rounded-full animate-spin" />
            <span className="text-sm text-[#8B949E]">Loading chart...</span>
          </div>
        </div>
      )}

      {error && (
        <div className="flex flex-col items-center justify-center rounded-xl border border-ui-border bg-[#0D1117] h-full">
          <div className="text-center p-4 md:p-6">
            <div className="text-3xl md:text-4xl mb-3">📊</div>
            <h3 className="text-base md:text-lg font-semibold text-[#F5F7FA]">Chart Unavailable</h3>
            <p className="text-xs md:text-sm text-[#8B949E] mt-1 md:mt-2">{error}</p>
            <button
              onClick={() => {
                setIsLoading(true);
                setError(null);
                scriptLoadedRef.current = false;
                setTimeout(() => {
                  if (typeof window.TradingView !== 'undefined') {
                    initWidget();
                  } else {
                    window.location.reload();
                  }
                }, 500);
              }}
              className="mt-3 md:mt-4 px-4 py-2 bg-[#39FF88]/20 text-[#39FF88] rounded-lg hover:bg-[#39FF88]/30 transition-colors text-sm"
            >
              Retry
            </button>
          </div>
        </div>
      )}

      <div
        id={containerId.current}
        ref={containerRef}
        className={cn(
          'w-full rounded-xl overflow-hidden border border-ui-border bg-[#080A0D]',
          error && 'hidden'
        )}
        style={{ height: typeof height === 'number' ? height : 600 }}
      />

      {!error && (
        <div className="mt-1 md:mt-2 text-[8px] md:text-[10px] text-[#4B5563] text-right">
          Powered by TradingView
        </div>
      )}
    </div>
  );
}
