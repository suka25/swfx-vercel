'use client';

import { useState } from 'react';

export function PositionSizeCalculator() {
  const [accountBalance, setAccountBalance] = useState('10000');
  const [riskPercentage, setRiskPercentage] = useState('2');
  const [stopLossPips, setStopLossPips] = useState('50');
  const [pair, setPair] = useState('EURUSD');
  const [result, setResult] = useState<{ positionSize: number; riskAmount: number } | null>(null);

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
    const balance = parseFloat(accountBalance) || 0;
    const riskPct = parseFloat(riskPercentage) || 0;
    const slPips = parseFloat(stopLossPips) || 0;

    if (!balance || !riskPct || !slPips) return;

    const riskAmount = balance * (riskPct / 100);
    const pipValue = 10; // 1 standard lot = $10 per pip
    const positionSize = riskAmount / (slPips * pipValue);

    setResult({
      positionSize: Math.round(positionSize * 100) / 100,
      riskAmount: Math.round(riskAmount * 100) / 100,
    });
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-text-muted mb-1">Account Balance ($)</label>
          <input
            type="number"
            value={accountBalance}
            onChange={(e) => setAccountBalance(e.target.value)}
            className="w-full px-4 py-2.5 bg-[#121820] border border-[rgba(255,255,255,0.08)] rounded-lg text-text-primary focus:outline-none focus:border-[#39FF88] min-h-[44px]"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-text-muted mb-1">Risk (%)</label>
          <input
            type="number"
            step="0.1"
            value={riskPercentage}
            onChange={(e) => setRiskPercentage(e.target.value)}
            className="w-full px-4 py-2.5 bg-[#121820] border border-[rgba(255,255,255,0.08)] rounded-lg text-text-primary focus:outline-none focus:border-[#39FF88] min-h-[44px]"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-text-muted mb-1">Stop Loss (pips)</label>
          <input
            type="number"
            value={stopLossPips}
            onChange={(e) => setStopLossPips(e.target.value)}
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
        <div className="grid grid-cols-2 gap-3 pt-4 border-t border-[rgba(255,255,255,0.08)]">
          <div className="bg-[#121820] rounded-lg p-3 text-center">
            <p className="text-xs text-text-muted">Position Size</p>
            <p className="text-lg font-bold text-text-primary">{result.positionSize} lots</p>
          </div>
          <div className="bg-[#121820] rounded-lg p-3 text-center">
            <p className="text-xs text-text-muted">Risk Amount</p>
            <p className="text-lg font-bold text-[#FF4D5F]">${result.riskAmount}</p>
          </div>
        </div>
      )}
    </div>
  );
}
