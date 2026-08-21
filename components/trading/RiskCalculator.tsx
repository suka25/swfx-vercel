'use client';

import { useState } from 'react';
import { Calculator, DollarSign, Percent, Target } from 'lucide-react';

export function RiskCalculator() {
  const [accountSize, setAccountSize] = useState('10000');
  const [riskPercent, setRiskPercent] = useState('2');
  const [stopLoss, setStopLoss] = useState('50');
  const [result, setResult] = useState({ riskAmount: 0, positionSize: 0 });

  const calculate = () => {
    const account = parseFloat(accountSize) || 0;
    const risk = parseFloat(riskPercent) || 0;
    const sl = parseFloat(stopLoss) || 0;

    const riskAmount = account * (risk / 100);
    const positionSize = sl > 0 ? riskAmount / sl : 0;

    setResult({ riskAmount, positionSize });
  };

  return (
    <div className="bg-[#0D1117] border border-[rgba(255,255,255,0.08)] rounded-2xl p-4 md:p-6 w-full">
      <div className="flex items-center gap-2 mb-4">
        <Calculator size={18} className="text-[#39FF88]" />
        <h3 className="text-sm font-semibold text-[#F5F7FA]">Risk Calculator</h3>
      </div>

      <div className="space-y-3">
        <div>
          <label className="text-xs text-[#8B949E]">Account Size ($)</label>
          <div className="flex items-center gap-2 mt-1">
            <DollarSign size={14} className="text-[#8B949E] flex-shrink-0" />
            <input
              type="number"
              value={accountSize}
              onChange={(e) => setAccountSize(e.target.value)}
              className="flex-1 w-full px-3 py-2 bg-[#121820] border border-[rgba(255,255,255,0.08)] rounded-lg text-[#F5F7FA] text-sm focus:outline-none focus:border-[#39FF88] min-h-[44px]"
            />
          </div>
        </div>

        <div>
          <label className="text-xs text-[#8B949E]">Risk per Trade (%)</label>
          <div className="flex items-center gap-2 mt-1">
            <Percent size={14} className="text-[#8B949E] flex-shrink-0" />
            <input
              type="number"
              value={riskPercent}
              onChange={(e) => setRiskPercent(e.target.value)}
              className="flex-1 w-full px-3 py-2 bg-[#121820] border border-[rgba(255,255,255,0.08)] rounded-lg text-[#F5F7FA] text-sm focus:outline-none focus:border-[#39FF88] min-h-[44px]"
            />
          </div>
        </div>

        <div>
          <label className="text-xs text-[#8B949E]">Stop Loss (pips)</label>
          <div className="flex items-center gap-2 mt-1">
            <Target size={14} className="text-[#8B949E] flex-shrink-0" />
            <input
              type="number"
              value={stopLoss}
              onChange={(e) => setStopLoss(e.target.value)}
              className="flex-1 w-full px-3 py-2 bg-[#121820] border border-[rgba(255,255,255,0.08)] rounded-lg text-[#F5F7FA] text-sm focus:outline-none focus:border-[#39FF88] min-h-[44px]"
            />
          </div>
        </div>

        <button
          onClick={calculate}
          className="w-full py-2.5 md:py-3 bg-[#39FF88] text-[#080A0D] font-medium rounded-lg hover:bg-[#39FF88]/90 transition-colors min-h-[44px] text-sm md:text-base"
        >
          Calculate
        </button>

        {result.positionSize > 0 && (
          <div className="mt-3 p-3 bg-[#121820] rounded-lg">
            <div className="flex justify-between text-sm">
              <span className="text-[#8B949E]">Risk Amount:</span>
              <span className="text-[#39FF88] font-medium">${result.riskAmount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm mt-1">
              <span className="text-[#8B949E]">Position Size:</span>
              <span className="text-[#F5F7FA] font-medium">{result.positionSize.toFixed(2)} lots</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
