'use client';

import { useState } from 'react';

export function RiskRewardCalculator() {
  const [entryPrice, setEntryPrice] = useState('1.1000');
  const [stopLoss, setStopLoss] = useState('1.0950');
  const [takeProfit, setTakeProfit] = useState('1.1100');
  const [pair, setPair] = useState('EURUSD');
  const [result, setResult] = useState<{ 
    risk: number; 
    reward: number; 
    ratio: string;
    riskPips: number;
    rewardPips: number;
  } | null>(null);

  const pairs = [
    { value: 'EURUSD', pipDecimal: 4 },
    { value: 'GBPUSD', pipDecimal: 4 },
    { value: 'USDJPY', pipDecimal: 2 },
    { value: 'USDCHF', pipDecimal: 4 },
    { value: 'AUDUSD', pipDecimal: 4 },
    { value: 'USDCAD', pipDecimal: 4 },
    { value: 'NZDUSD', pipDecimal: 4 },
    { value: 'XAUUSD', pipDecimal: 2 },
  ];

  const calculate = () => {
    const entry = parseFloat(entryPrice) || 0;
    const sl = parseFloat(stopLoss) || 0;
    const tp = parseFloat(takeProfit) || 0;

    if (!entry || !sl || !tp) return;

    const pairData = pairs.find(p => p.value === pair);
    if (!pairData) return;

    const pipDecimal = pairData.pipDecimal;
    const pipMultiplier = Math.pow(10, pipDecimal);
    
    const riskPips = Math.abs(entry - sl) * pipMultiplier;
    const rewardPips = Math.abs(tp - entry) * pipMultiplier;
    const ratio = rewardPips / riskPips;

    setResult({
      risk: Math.round(riskPips * 100) / 100,
      reward: Math.round(rewardPips * 100) / 100,
      ratio: ratio.toFixed(2),
      riskPips: Math.round(riskPips * 100) / 100,
      rewardPips: Math.round(rewardPips * 100) / 100,
    });
  };

  return (
    <div className="space-y-4">
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
          <label className="block text-sm font-medium text-text-muted mb-1">Stop Loss</label>
          <input
            type="number"
            step="any"
            value={stopLoss}
            onChange={(e) => setStopLoss(e.target.value)}
            className="w-full px-4 py-2.5 bg-[#121820] border border-[rgba(255,255,255,0.08)] rounded-lg text-text-primary focus:outline-none focus:border-[#39FF88] min-h-[44px]"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-text-muted mb-1">Take Profit</label>
          <input
            type="number"
            step="any"
            value={takeProfit}
            onChange={(e) => setTakeProfit(e.target.value)}
            className="w-full px-4 py-2.5 bg-[#121820] border border-[rgba(255,255,255,0.08)] rounded-lg text-text-primary focus:outline-none focus:border-[#39FF88] min-h-[44px]"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-text-muted mb-1">Pair</label>
          <select
            value={pair}
            onChange={(e) => setPair(e.target.value)}
            className="w-full px-4 py-2.5 bg-[#121820] border border-[rgba(255,255,255,0.08)] rounded-lg text-text-primary focus:outline-none focus:border-[#39FF88] min-h-[44px]"
          >
            {pairs.map((p) => (
              <option key={p.value} value={p.value}>{p.value}</option>
            ))}
          </select>
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
            <p className="text-xs text-text-muted">Risk (pips)</p>
            <p className="text-lg font-bold text-[#FF4D5F]">{result.risk}</p>
          </div>
          <div className="bg-[#121820] rounded-lg p-3 text-center">
            <p className="text-xs text-text-muted">Reward (pips)</p>
            <p className="text-lg font-bold text-[#39FF88]">{result.reward}</p>
          </div>
          <div className="bg-[#121820] rounded-lg p-3 text-center">
            <p className="text-xs text-text-muted">Risk/Reward</p>
            <p className="text-lg font-bold text-accent-bullish">1:{result.ratio}</p>
          </div>
        </div>
      )}
    </div>
  );
}
