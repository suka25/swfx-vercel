'use client';

import { useState } from 'react';

export function MarginCalculator() {
  const [lotSize, setLotSize] = useState('0.10');
  const [leverage, setLeverage] = useState('100');
  const [pair, setPair] = useState('EURUSD');
  const [price, setPrice] = useState('1.1000');
  const [result, setResult] = useState<{ margin: number; marginPercent: number } | null>(null);

  const pairs = ['EURUSD', 'GBPUSD', 'USDJPY', 'USDCHF', 'AUDUSD', 'USDCAD', 'NZDUSD', 'XAUUSD'];

  const calculate = () => {
    const lot = parseFloat(lotSize) || 0;
    const lev = parseFloat(leverage) || 0;
    const entryPrice = parseFloat(price) || 0;

    if (!lot || !lev || !entryPrice) return;

    // Contract size: 100,000 units for standard lot
    const contractSize = 100000;
    const notionalValue = lot * contractSize * entryPrice;
    const margin = notionalValue / lev;
    const marginPercent = (margin / notionalValue) * 100;

    setResult({
      margin: Math.round(margin * 100) / 100,
      marginPercent: Math.round(marginPercent * 100) / 100,
    });
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-text-muted mb-1">Lot Size</label>
          <input
            type="number"
            step="0.01"
            value={lotSize}
            onChange={(e) => setLotSize(e.target.value)}
            className="w-full px-4 py-2.5 bg-[#121820] border border-[rgba(255,255,255,0.08)] rounded-lg text-text-primary focus:outline-none focus:border-[#39FF88] min-h-[44px]"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-text-muted mb-1">Leverage (1:X)</label>
          <input
            type="number"
            value={leverage}
            onChange={(e) => setLeverage(e.target.value)}
            className="w-full px-4 py-2.5 bg-[#121820] border border-[rgba(255,255,255,0.08)] rounded-lg text-text-primary focus:outline-none focus:border-[#39FF88] min-h-[44px]"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-text-muted mb-1">Pair</label>
          <select
            value={pair}
            onChange={(e) => setPair(e.target.value)}
            className="w-full px-4 py-2.5 bg-[#121820] border border-[rgba(255,255,255,0.08)] rounded-lg text-text-primary focus:outline-none focus:border-[#39FF88] min-h-[44px]"
          >
            {pairs.map((p) => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-text-muted mb-1">Price</label>
          <input
            type="number"
            step="any"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full px-4 py-2.5 bg-[#121820] border border-[rgba(255,255,255,0.08)] rounded-lg text-text-primary focus:outline-none focus:border-[#39FF88] min-h-[44px]"
          />
        </div>
      </div>
      <button
        onClick={calculate}
        className="w-full py-2.5 bg-[#39FF88] text-[#080A0D] font-medium rounded-lg hover:bg-[#39FF88]/90 transition-colors min-h-[44px]"
      >
        Calculate
      </button>
      {result && (
        <div className="grid grid-cols-2 gap-3 pt-4 border-t border-[rgba(255,255,255,0.08)]">
          <div className="bg-[#121820] rounded-lg p-3 text-center">
            <p className="text-xs text-text-muted">Required Margin</p>
            <p className="text-lg font-bold text-text-primary">${result.margin}</p>
          </div>
          <div className="bg-[#121820] rounded-lg p-3 text-center">
            <p className="text-xs text-text-muted">Margin %</p>
            <p className="text-lg font-bold text-accent-bullish">{result.marginPercent}%</p>
          </div>
        </div>
      )}
    </div>
  );
}
