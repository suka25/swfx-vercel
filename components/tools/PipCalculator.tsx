'use client';

import { useState } from 'react';

interface PipResult {
  pipValue: number;
  profitLoss: number;
  pips: number;
}

export function PipCalculator() {
  const [pair, setPair] = useState('EURUSD');
  const [lotSize, setLotSize] = useState('0.10');
  const [entryPrice, setEntryPrice] = useState('1.1000');
  const [exitPrice, setExitPrice] = useState('1.1050');
  const [result, setResult] = useState<PipResult | null>(null);

  const pairs = [
    { value: 'EURUSD', pipDecimal: 4, label: 'EUR/USD' },
    { value: 'GBPUSD', pipDecimal: 4, label: 'GBP/USD' },
    { value: 'USDJPY', pipDecimal: 2, label: 'USD/JPY' },
    { value: 'USDCHF', pipDecimal: 4, label: 'USD/CHF' },
    { value: 'AUDUSD', pipDecimal: 4, label: 'AUD/USD' },
    { value: 'USDCAD', pipDecimal: 4, label: 'USD/CAD' },
    { value: 'NZDUSD', pipDecimal: 4, label: 'NZD/USD' },
    { value: 'XAUUSD', pipDecimal: 2, label: 'XAU/USD' },
    { value: 'BTCUSD', pipDecimal: 2, label: 'BTC/USD' },
  ];

  const calculate = () => {
    const lot = parseFloat(lotSize) || 0;
    const entry = parseFloat(entryPrice) || 0;
    const exit = parseFloat(exitPrice) || 0;
    
    if (!lot || !entry || !exit) return;

    const pairData = pairs.find(p => p.value === pair);
    if (!pairData) return;

    const pipDecimal = pairData.pipDecimal;
    const pipMultiplier = Math.pow(10, pipDecimal);
    const pips = Math.abs((exit - entry) * pipMultiplier);
    
    // Pip value calculation (simplified)
    const pipValue = (lot * 10) / (pair === 'USDJPY' ? entry : 1);
    const profitLoss = pips * pipValue;

    setResult({
      pipValue: Math.round(pipValue * 10000) / 10000,
      profitLoss: Math.round(profitLoss * 100) / 100,
      pips: Math.round(pips * 100) / 100,
    });
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-text-muted mb-1">Currency Pair</label>
          <select
            value={pair}
            onChange={(e) => setPair(e.target.value)}
            className="w-full px-4 py-2.5 bg-[#121820] border border-[rgba(255,255,255,0.08)] rounded-lg text-text-primary focus:outline-none focus:border-[#39FF88] min-h-[44px]"
          >
            {pairs.map((p) => (
              <option key={p.value} value={p.value}>{p.label}</option>
            ))}
          </select>
        </div>
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
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-text-muted mb-1">Entry Price</label>
          <input
            type="number"
            step="any"
            value={entryPrice}
            onChange={(e) => setEntryPrice(e.target.value)}
            className="w-full px-4 py-2.5 bg-[#121820] border border-[rgba(255,255,255,0.08)] rounded-lg text-text-primary focus:outline-none focus:border-[#39FF88] min-h-[44px]"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-text-muted mb-1">Exit Price</label>
          <input
            type="number"
            step="any"
            value={exitPrice}
            onChange={(e) => setExitPrice(e.target.value)}
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
        <div className="grid grid-cols-3 gap-3 pt-4 border-t border-[rgba(255,255,255,0.08)]">
          <div className="bg-[#121820] rounded-lg p-3 text-center">
            <p className="text-xs text-text-muted">Pips</p>
            <p className="text-lg font-bold text-text-primary">{result.pips}</p>
          </div>
          <div className="bg-[#121820] rounded-lg p-3 text-center">
            <p className="text-xs text-text-muted">Pip Value</p>
            <p className="text-lg font-bold text-accent-bullish">${result.pipValue}</p>
          </div>
          <div className="bg-[#121820] rounded-lg p-3 text-center">
            <p className="text-xs text-text-muted">Profit/Loss</p>
            <p className={`text-lg font-bold ${result.profitLoss >= 0 ? 'text-[#39FF88]' : 'text-[#FF4D5F]'}`}>
              ${result.profitLoss}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
