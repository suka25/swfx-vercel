'use client';

import { useState } from 'react';

export function CompoundCalculator() {
  const [initialBalance, setInitialBalance] = useState('10000');
  const [monthlyReturn, setMonthlyReturn] = useState('5');
  const [months, setMonths] = useState('12');
  const [monthlyDeposit, setMonthlyDeposit] = useState('500');
  const [result, setResult] = useState<{
    finalBalance: number;
    totalDeposits: number;
    totalInterest: number;
    yearlyData: { month: number; balance: number }[];
  } | null>(null);

  const calculate = () => {
    const initial = parseFloat(initialBalance) || 0;
    const returnRate = parseFloat(monthlyReturn) || 0;
    const totalMonths = parseInt(months) || 0;
    const deposit = parseFloat(monthlyDeposit) || 0;

    if (!initial || !returnRate || !totalMonths) return;

    let balance = initial;
    let totalDeposits = initial;
    const yearlyData = [];

    for (let i = 1; i <= totalMonths; i++) {
      balance = balance * (1 + returnRate / 100);
      if (i > 0) {
        balance += deposit;
        totalDeposits += deposit;
      }
      if (i % 1 === 0) {
        yearlyData.push({
          month: i,
          balance: Math.round(balance * 100) / 100,
        });
      }
    }

    setResult({
      finalBalance: Math.round(balance * 100) / 100,
      totalDeposits: Math.round(totalDeposits * 100) / 100,
      totalInterest: Math.round((balance - totalDeposits) * 100) / 100,
      yearlyData,
    });
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-text-muted mb-1">Initial Balance ($)</label>
          <input
            type="number"
            value={initialBalance}
            onChange={(e) => setInitialBalance(e.target.value)}
            className="w-full px-4 py-2.5 bg-[#121820] border border-[rgba(255,255,255,0.08)] rounded-lg text-text-primary focus:outline-none focus:border-[#39FF88] min-h-[44px]"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-text-muted mb-1">Monthly Return (%)</label>
          <input
            type="number"
            step="0.1"
            value={monthlyReturn}
            onChange={(e) => setMonthlyReturn(e.target.value)}
            className="w-full px-4 py-2.5 bg-[#121820] border border-[rgba(255,255,255,0.08)] rounded-lg text-text-primary focus:outline-none focus:border-[#39FF88] min-h-[44px]"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-text-muted mb-1">Time Period (months)</label>
          <input
            type="number"
            value={months}
            onChange={(e) => setMonths(e.target.value)}
            className="w-full px-4 py-2.5 bg-[#121820] border border-[rgba(255,255,255,0.08)] rounded-lg text-text-primary focus:outline-none focus:border-[#39FF88] min-h-[44px]"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-text-muted mb-1">Monthly Deposit ($)</label>
          <input
            type="number"
            value={monthlyDeposit}
            onChange={(e) => setMonthlyDeposit(e.target.value)}
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
        <div className="space-y-4 pt-4 border-t border-[rgba(255,255,255,0.08)]">
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-[#121820] rounded-lg p-3 text-center">
              <p className="text-xs text-text-muted">Final Balance</p>
              <p className="text-lg font-bold text-[#39FF88]">${result.finalBalance}</p>
            </div>
            <div className="bg-[#121820] rounded-lg p-3 text-center">
              <p className="text-xs text-text-muted">Total Deposits</p>
              <p className="text-lg font-bold text-text-primary">${result.totalDeposits}</p>
            </div>
            <div className="bg-[#121820] rounded-lg p-3 text-center">
              <p className="text-xs text-text-muted">Total Interest</p>
              <p className="text-lg font-bold text-accent-bullish">${result.totalInterest}</p>
            </div>
          </div>
          <div className="bg-[#121820] rounded-lg p-3 max-h-[200px] overflow-y-auto">
            <p className="text-xs text-text-muted mb-2">Monthly Growth</p>
            <div className="space-y-0.5">
              {result.yearlyData.map((data) => (
                <div key={data.month} className="flex justify-between text-xs">
                  <span className="text-text-muted">Month {data.month}</span>
                  <span className="text-text-primary">${data.balance}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
