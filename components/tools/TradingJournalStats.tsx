'use client';

import { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';

interface JournalEntry {
  journal: {
    result: 'win' | 'loss';
    profit: number;
  };
}

export function TradingJournalStats() {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchJournal();
  }, []);

  const fetchJournal = async () => {
    try {
      const res = await fetch('/api/journal');
      const data = await res.json();
      if (data.success) {
        setEntries(data.data);
      }
    } catch (error) {
      console.error('Error fetching journal:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-8">
        <Loader2 size={24} className="text-[#39FF88] animate-spin" />
      </div>
    );
  }

  const totalTrades = entries.length;
  const wins = entries.filter(e => e.journal.result === 'win').length;
  const losses = entries.filter(e => e.journal.result === 'loss').length;
  const winRate = totalTrades > 0 ? Math.round((wins / totalTrades) * 100) : 0;
  const totalProfit = entries.reduce((sum, e) => sum + e.journal.profit, 0);
  const avgProfit = totalTrades > 0 ? totalProfit / totalTrades : 0;
  const maxProfit = entries.length > 0 ? Math.max(...entries.map(e => e.journal.profit)) : 0;
  const maxLoss = entries.length > 0 ? Math.min(...entries.map(e => e.journal.profit)) : 0;

  const stats = [
    { label: 'Total Trades', value: totalTrades, color: 'text-text-primary' },
    { label: 'Win Rate', value: `${winRate}%`, color: 'text-[#39FF88]' },
    { label: 'Total Profit', value: `$${totalProfit.toFixed(2)}`, color: totalProfit >= 0 ? 'text-[#39FF88]' : 'text-[#FF4D5F]' },
    { label: 'Avg Profit', value: `$${avgProfit.toFixed(2)}`, color: avgProfit >= 0 ? 'text-[#39FF88]' : 'text-[#FF4D5F]' },
    { label: 'Best Trade', value: `$${maxProfit.toFixed(2)}`, color: 'text-[#39FF88]' },
    { label: 'Worst Trade', value: `$${maxLoss.toFixed(2)}`, color: 'text-[#FF4D5F]' },
  ];

  if (totalTrades === 0) {
    return (
      <div className="text-center py-8 text-text-muted">
        <p>No trading data available yet.</p>
        <p className="text-xs mt-1">Start trading and come back for stats!</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-[#121820] rounded-lg p-3 text-center">
            <p className="text-xs text-text-muted">{stat.label}</p>
            <p className={`text-base font-bold ${stat.color}`}>{stat.value}</p>
          </div>
        ))}
      </div>
      <div className="bg-[#121820] rounded-lg p-3">
        <p className="text-xs text-text-muted mb-2">Quick Summary</p>
        <div className="flex flex-wrap items-center gap-4 text-sm">
          <span className="flex items-center gap-1">
            <span className="h-2 w-2 rounded-full bg-[#39FF88]" />
            Wins: {wins}
          </span>
          <span className="flex items-center gap-1">
            <span className="h-2 w-2 rounded-full bg-[#FF4D5F]" />
            Losses: {losses}
          </span>
          <span className="text-text-muted">Win Rate: {winRate}%</span>
        </div>
      </div>
    </div>
  );
}
