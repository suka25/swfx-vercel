'use client';

import { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface TickerData {
  symbol: string;
  price: number;
  change: number;
  changePercent: number;
}

export function MarketTicker() {
  const [data, setData] = useState<TickerData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/market');
        const result = await res.json();
        if (result.success) {
          setData(result.data);
          setLoading(false);
        }
      } catch (error) {
        console.error('Error fetching ticker:', error);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 10000); // Update setiap 10 detik
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center gap-4 text-xs text-text-muted">
        <span className="h-3 w-20 bg-white/5 rounded animate-pulse"></span>
        <span className="h-3 w-20 bg-white/5 rounded animate-pulse"></span>
        <span className="h-3 w-20 bg-white/5 rounded animate-pulse"></span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-4 text-xs">
      {data.map((item) => (
        <div key={item.symbol} className="flex items-center gap-1.5">
          <span className="font-medium text-text-secondary">{item.symbol}</span>
          <span className="font-mono text-text-primary">
            {item.price.toFixed(item.symbol === 'USDJPY' ? 3 : 4)}
          </span>
          <span className={`flex items-center gap-0.5 ${
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
