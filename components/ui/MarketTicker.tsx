'use client';

import { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface TickerData {
  symbol: string;
  price: number;
  change: number;
  changePercent: number;
}

const fallbackData: TickerData[] = [
  { symbol: 'XAUUSD', price: 2045.32, change: 0.61, changePercent: 0.03 },
  { symbol: 'EURUSD', price: 1.0943, change: -0.19, changePercent: -0.02 },
  { symbol: 'GBPUSD', price: 1.2718, change: 0.27, changePercent: 0.02 },
  { symbol: 'USDJPY', price: 146.82, change: -0.37, changePercent: -0.03 },
  { symbol: 'AUDUSD', price: 0.6584, change: 0.15, changePercent: 0.02 },
  { symbol: 'BTCUSD', price: 43250, change: 1.20, changePercent: 0.03 },
];

export function MarketTicker() {
  const [data, setData] = useState<TickerData[]>(fallbackData);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/market');
        const result = await res.json();
        if (result.success && result.data?.length > 0) {
          setData(result.data);
        } else {
          setData(fallbackData);
        }
      } catch (error) {
        console.error('Error fetching ticker:', error);
        setData(fallbackData);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 15000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center gap-4 text-xs text-text-muted">
        {fallbackData.map((item) => (
          <div key={item.symbol} className="flex items-center gap-1.5">
            <span className="h-3 w-10 bg-white/5 rounded animate-pulse"></span>
            <span className="h-3 w-14 bg-white/5 rounded animate-pulse"></span>
            <span className="h-3 w-12 bg-white/5 rounded animate-pulse"></span>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="flex items-center gap-4 text-xs overflow-x-auto no-scrollbar py-1">
      {data.map((item) => (
        <div key={item.symbol} className="flex items-center gap-1.5 whitespace-nowrap">
          <span className="font-medium text-text-secondary">{item.symbol}</span>
          <span className="font-mono text-text-primary">
            {item.price.toFixed(item.symbol === 'BTCUSD' ? 0 : item.symbol === 'USDJPY' ? 3 : 4)}
          </span>
          <span className={`flex items-center gap-0.5 font-medium ${
            item.change >= 0 ? 'text-accent-bullish' : 'text-accent-bearish'
          }`}>
            {item.change >= 0 ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
            {item.changePercent >= 0 ? '+' : ''}{item.changePercent.toFixed(2)}%
          </span>
        </div>
      ))}
    </div>
  );
}
