'use client';

import { useEffect, useRef, useState } from 'react';
import { createChart, ColorType, LineSeries, AreaSeries } from 'lightweight-charts';
import { Loader2 } from 'lucide-react';

interface LightweightChartProps {
  symbol?: string;
  height?: number;
  width?: string;
  theme?: 'dark' | 'light';
  chartType?: 'line' | 'area';
  data?: { time: string; value: number }[];
}

// Generate mock data dengan timestamp unik
const generateMockData = (symbol: string, count: number = 60) => {
  const data = [];
  const now = new Date();
  let price = symbol === 'OANDA:XAUUSD' ? 2045 : 
              symbol === 'OANDA:EURUSD' ? 1.0943 :
              symbol === 'OANDA:GBPUSD' ? 1.2718 :
              symbol === 'OANDA:USDJPY' ? 146.82 :
              symbol === 'OANDA:AUDUSD' ? 0.6584 :
              symbol === 'OANDA:BTCUSD' ? 43250 : 100;
  
  const volatility = symbol === 'OANDA:BTCUSD' ? 0.02 : 
                     symbol === 'OANDA:XAUUSD' ? 0.005 : 0.002;
  
  // Generate data dengan interval yang berbeda agar tidak duplikat
  for (let i = count; i >= 0; i--) {
    const date = new Date(now);
    date.setMinutes(date.getMinutes() - i * 3);
    date.setSeconds(0);
    date.setMilliseconds(0);
    
    // Format: yyyy-mm-dd (hanya tanggal)
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const time = `${year}-${month}-${day}`;
    
    const change = (Math.random() - 0.5) * volatility * price;
    price = Math.max(price + change, price * 0.99);
    
    // Cek duplikat dengan data sebelumnya
    if (data.length > 0 && data[data.length - 1].time === time) {
      continue;
    }
    
    data.push({
      time: time,
      value: parseFloat(price.toFixed(4))
    });
  }
  
  return data;
};

export default function LightweightChart({ 
  symbol = 'OANDA:XAUUSD',
  height = 200,
  width = '100%',
  theme = 'dark',
  chartType = 'line',
  data: externalData
}: LightweightChartProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<any>(null);
  const seriesRef = useRef<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    try {
      // Generate data jika tidak ada external data
      const data = externalData || generateMockData(symbol, 50);

      if (data.length === 0) {
        setError('No data available');
        setIsLoading(false);
        return;
      }

      // Chart options untuk dark theme
      const chartOptions = {
        layout: {
          background: { type: ColorType.Solid, color: 'transparent' },
          textColor: '#8B949E',
          fontSize: 9,
          fontFamily: 'Inter, sans-serif',
        },
        grid: {
          vertLines: { color: 'rgba(255,255,255,0.03)' },
          horzLines: { color: 'rgba(255,255,255,0.03)' },
        },
        crosshair: {
          vertLine: { color: 'rgba(57, 255, 136, 0.2)', width: 1 },
          horzLine: { color: 'rgba(57, 255, 136, 0.2)', width: 1 },
        },
        rightPriceScale: {
          borderColor: 'rgba(255,255,255,0.05)',
          textColor: '#8B949E',
          scaleMargins: {
            top: 0.05,
            bottom: 0.05,
          },
        },
        timeScale: {
          borderColor: 'rgba(255,255,255,0.05)',
          textColor: '#8B949E',
          timeVisible: false,
          tickMarkFormatter: (time: any) => {
            try {
              const date = new Date(time * 1000);
              return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
            } catch {
              return '';
            }
          },
        },
        handleScroll: false,
        handleScale: false,
        width: containerRef.current.clientWidth || 200,
        height: height,
      };

      // Create chart
      const chart = createChart(containerRef.current, chartOptions);
      chartRef.current = chart;

      // Add series based on chart type
      let series;
      if (chartType === 'area') {
        series = chart.addSeries(AreaSeries, {
          lineColor: '#39FF88',
          topColor: 'rgba(57, 255, 136, 0.15)',
          bottomColor: 'rgba(57, 255, 136, 0.01)',
          lineWidth: 1.5,
          priceLineVisible: false,
          lastValueVisible: true,
        });
      } else {
        series = chart.addSeries(LineSeries, {
          color: '#39FF88',
          lineWidth: 1.5,
          priceLineVisible: false,
          lastValueVisible: true,
          crosshairMarkerVisible: true,
          crosshairMarkerRadius: 3,
          crosshairMarkerBorderColor: '#39FF88',
          crosshairMarkerBackgroundColor: '#080A0D',
        });
      }

      // Set data dengan validasi
      try {
        series.setData(data);
        seriesRef.current = series;
        chart.timeScale().fitContent();
        setError(null);
      } catch (err: any) {
        console.error('Error setting chart data:', err);
        setError('Failed to render chart data');
      }

      setIsLoading(false);

      // Handle resize
      const handleResize = () => {
        if (containerRef.current && chart) {
          try {
            const width = containerRef.current.clientWidth;
            if (width > 0) {
              chart.applyOptions({ width: width });
            }
          } catch (e) {}
        }
      };

      window.addEventListener('resize', handleResize);
      
      // Resize after a small delay to ensure layout
      setTimeout(handleResize, 100);

      return () => {
        window.removeEventListener('resize', handleResize);
        if (chart) {
          try {
            chart.remove();
          } catch (e) {}
        }
      };
    } catch (err: any) {
      console.error('Chart initialization error:', err);
      setError(err.message || 'Failed to initialize chart');
      setIsLoading(false);
    }
  }, [symbol, height, theme, chartType, externalData]);

  // Update data ketika symbol berubah
  useEffect(() => {
    if (chartRef.current && seriesRef.current) {
      const data = externalData || generateMockData(symbol, 50);
      try {
        if (data.length > 0) {
          seriesRef.current.setData(data);
          chartRef.current.timeScale().fitContent();
        }
      } catch (error) {
        console.error('Error updating chart data:', error);
      }
    }
  }, [symbol, externalData]);

  if (error) {
    return (
      <div className="flex items-center justify-center w-full h-full bg-[#0D1117]/30 rounded-lg">
        <div className="text-center text-text-muted text-xs px-2">
          <span className="text-text-muted">Chart unavailable</span>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full" style={{ height: `${height}px` }}>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-[#0D1117]/50 z-10">
          <Loader2 size={20} className="text-[#39FF88] animate-spin" />
        </div>
      )}
      <div 
        ref={containerRef} 
        className="w-full h-full"
        style={{ backgroundColor: 'transparent' }}
      />
    </div>
  );
}
