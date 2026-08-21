'use client';

import { useState, useEffect } from 'react';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { Heading, Text } from '@/components/ui/Typography';
import { Card } from '@/components/ui/Card';
import { Navbar } from '@/components/layout/Navigation/Navbar';
import { Footer } from '@/components/layout/Footer/Footer';
import { ScrollReveal } from '@/components/animations/ScrollReveal';
import { motion } from 'framer-motion';
import { 
  Calendar,
  DollarSign,
  Target,
  Shield,
  FileText,
  CheckCircle,
  XCircle,
  BarChart3,
  Activity,
  TrendingUp,
  TrendingDown,
  Clock,
  Users,
  Award,
  Eye,
  Loader2
} from 'lucide-react';

interface JournalEntry {
  id: string;
  title: string;
  pair: string;
  direction: string;
  entry: number;
  sl: number;
  tp1: number;
  description: string;
  created_at: string;
  status: string;
  journal: {
    exitPrice: number;
    result: 'win' | 'loss';
    profit: number;
    notes: string;
    closedAt: string;
    strategy: string;
  };
}

export default function JournalPage() {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'win' | 'loss'>('all');
  const [selectedEntry, setSelectedEntry] = useState<JournalEntry | null>(null);

  useEffect(() => {
    fetchJournal();
  }, []);

  const fetchJournal = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/journal');
      const data = await res.json();
      console.log('📊 Journal API response:', data);
      
      if (data.success) {
        setEntries(data.data);
      } else {
        console.error('Error fetching journal:', data.error);
        setEntries([]);
      }
    } catch (error) {
      console.error('Error fetching journal:', error);
      setEntries([]);
    } finally {
      setLoading(false);
    }
  };

  const filteredEntries = filter === 'all' 
    ? entries 
    : entries.filter(e => e.journal.result === filter);

  const totalTrades = entries.length;
  const wins = entries.filter(e => e.journal.result === 'win').length;
  const losses = entries.filter(e => e.journal.result === 'loss').length;
  const winRate = totalTrades > 0 ? Math.round((wins / totalTrades) * 100) : 0;
  const totalProfit = entries.reduce((sum, e) => sum + e.journal.profit, 0);
  const avgProfit = totalTrades > 0 ? totalProfit / totalTrades : 0;

  const getResultIcon = (result: string) => {
    return result === 'win' 
      ? <CheckCircle className="text-[#39FF88]" size={18} />
      : <XCircle className="text-[#FF4D5F]" size={18} />;
  };

  const getResultColor = (result: string) => {
    return result === 'win' ? 'text-[#39FF88]' : 'text-[#FF4D5F]';
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const formatTime = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const stats = [
    { label: 'Total Trades', value: totalTrades, icon: Activity, color: 'text-[#8B949E]' },
    { label: 'Win Rate', value: `${winRate}%`, icon: BarChart3, color: 'text-[#39FF88]' },
    { label: 'Total Profit', value: `$${totalProfit.toFixed(2)}`, icon: DollarSign, color: totalProfit >= 0 ? 'text-[#39FF88]' : 'text-[#FF4D5F]' },
    { label: 'Wins', value: wins, icon: CheckCircle, color: 'text-[#39FF88]' },
    { label: 'Losses', value: losses, icon: XCircle, color: 'text-[#FF4D5F]' },
    { label: 'Avg Profit', value: `$${avgProfit.toFixed(2)}`, icon: TrendingUp, color: avgProfit >= 0 ? 'text-[#39FF88]' : 'text-[#FF4D5F]' },
  ];

  const filters = [
    { label: 'All', value: 'all' },
    { label: 'Wins', value: 'win' },
    { label: 'Losses', value: 'loss' },
  ];

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center bg-[#080A0D]">
          <div className="flex flex-col items-center gap-3">
            <Loader2 size={32} className="text-[#39FF88] animate-spin" />
            <span className="text-[#8B949E]">Loading journal...</span>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="pt-16 md:pt-20 overflow-x-hidden">
        <Section background="primary" padding="md" className="relative overflow-hidden min-h-screen">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-[#080A0D]" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] md:w-[600px] h-[300px] md:h-[500px] bg-[#39FF88]/5 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-0 w-[200px] md:w-[400px] h-[200px] md:h-[400px] bg-[#39FF88]/3 rounded-full blur-3xl" />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#080A0D]/50" />
          </div>

          <Container className="relative z-10 px-4">
            <ScrollReveal direction="up">
              <div className="text-center max-w-3xl mx-auto py-8 md:py-12">
                <span className="text-[10px] md:text-xs font-medium tracking-[0.15em] text-accent-bullish uppercase flex items-center justify-center gap-2">
                  <FileText size={14} />
                  Journal
                </span>
                <Heading as="h1" className="mt-2 text-3xl md:text-5xl">
                  Trading Journal
                </Heading>
                <Text className="mt-3 text-text-secondary text-sm md:text-base">
                  Track closed trades, analyze performance, and learn from past decisions.
                </Text>
                <div className="mt-2 flex items-center justify-center gap-2 text-xs text-text-muted">
                  <Eye size={12} />
                  {entries.length} trades recorded
                </div>
              </div>
            </ScrollReveal>

            {/* Stats Grid */}
            <div className="mt-6 md:mt-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <Card key={index} variant="elevated" className="p-3 md:p-4 text-center border border-[rgba(255,255,255,0.05)]">
                    <Icon className={`mx-auto ${stat.color}`} size={18} />
                    <p className="text-lg md:text-xl font-bold text-text-primary mt-1">{stat.value}</p>
                    <p className="text-[10px] md:text-xs text-text-muted truncate">{stat.label}</p>
                  </Card>
                );
              })}
            </div>

            {/* Filters */}
            <div className="mt-4 md:mt-6 flex flex-wrap gap-2 justify-center">
              {filters.map((f) => (
                <button
                  key={f.value}
                  onClick={() => setFilter(f.value as 'all' | 'win' | 'loss')}
                  className={`px-4 py-1.5 rounded-full text-xs md:text-sm font-medium transition-all ${
                    filter === f.value
                      ? 'bg-accent-bullish text-background-primary'
                      : 'bg-white/5 text-text-secondary hover:text-text-primary hover:bg-white/10'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>

            {/* Trade List */}
            <div className="mt-6 md:mt-8 space-y-3 md:space-y-4">
              {filteredEntries.length === 0 ? (
                <div className="text-center py-12 text-text-muted">
                  <FileText className="mx-auto mb-2" size={32} />
                  <p>No trades recorded yet.</p>
                  <p className="text-xs mt-1">Trades will appear here when signals are closed.</p>
                </div>
              ) : (
                filteredEntries.map((entry) => (
                  <motion.div
                    key={entry.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    onClick={() => setSelectedEntry(selectedEntry?.id === entry.id ? null : entry)}
                    className={`cursor-pointer transition-all duration-300 ${
                      selectedEntry?.id === entry.id ? 'scale-[1.01]' : ''
                    }`}
                  >
                    <Card variant="elevated" className={`p-4 md:p-5 border transition-all ${
                      entry.journal.result === 'win' 
                        ? 'border-[#39FF88]/20 hover:border-[#39FF88]/40' 
                        : 'border-[#FF4D5F]/20 hover:border-[#FF4D5F]/40'
                    }`}>
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <div className="flex items-center gap-3 min-w-0 flex-1">
                          {getResultIcon(entry.journal.result)}
                          <div className="min-w-0">
                            <div className="flex flex-wrap items-center gap-2">
                              <span className="font-mono text-base md:text-lg font-bold text-text-primary">
                                {entry.pair}
                              </span>
                              <span className={`text-[10px] md:text-xs font-medium px-2 py-0.5 rounded flex items-center gap-1 ${
                                entry.direction === 'Buy' 
                                  ? 'bg-[#39FF88]/20 text-[#39FF88]' 
                                  : 'bg-[#FF4D5F]/20 text-[#FF4D5F]'
                              }`}>
                                {entry.direction === 'Buy' ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                                {entry.direction}
                              </span>
                              <span className={`text-xs font-medium ${getResultColor(entry.journal.result)}`}>
                                {entry.journal.result === 'win' ? '+' : ''}{entry.journal.profit.toFixed(2)}
                              </span>
                            </div>
                            <div className="flex flex-wrap items-center gap-3 text-[10px] md:text-xs text-text-muted mt-0.5">
                              <span className="flex items-center gap-1">
                                <Target size={12} />
                                Entry: {entry.entry}
                              </span>
                              <span className="flex items-center gap-1">
                                <Shield size={12} />
                                SL: {entry.sl}
                              </span>
                              <span className="flex items-center gap-1">
                                <Calendar size={12} />
                                {formatDate(entry.journal.closedAt)}
                              </span>
                              <span className="flex items-center gap-1">
                                <Clock size={12} />
                                {formatTime(entry.journal.closedAt)}
                              </span>
                              {entry.journal.strategy && (
                                <span className="flex items-center gap-1 bg-[#121820] px-2 py-0.5 rounded">
                                  {entry.journal.strategy}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 flex-shrink-0">
                          <span className={`text-xs font-medium px-2 py-0.5 rounded ${
                            entry.journal.result === 'win' 
                              ? 'bg-[#39FF88]/10 text-[#39FF88]' 
                              : 'bg-[#FF4D5F]/10 text-[#FF4D5F]'
                          }`}>
                            {entry.journal.result === 'win' ? 'Win' : 'Loss'}
                          </span>
                          <span className={`text-xs font-bold ${getResultColor(entry.journal.result)}`}>
                            {entry.journal.result === 'win' ? '+' : ''}{entry.journal.profit.toFixed(2)}
                          </span>
                        </div>
                      </div>

                      {/* Expanded Details */}
                      {selectedEntry?.id === entry.id && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="mt-3 pt-3 border-t border-[rgba(255,255,255,0.08)]"
                        >
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
                            <div className="bg-[#121820] rounded-lg p-2 text-center">
                              <p className="text-text-muted">Entry</p>
                              <p className="font-mono font-bold text-text-primary">{entry.entry}</p>
                            </div>
                            <div className="bg-[#121820] rounded-lg p-2 text-center">
                              <p className="text-text-muted">Exit</p>
                              <p className="font-mono font-bold text-text-primary">{entry.journal.exitPrice}</p>
                            </div>
                            <div className="bg-[#121820] rounded-lg p-2 text-center">
                              <p className="text-text-muted">Stop Loss</p>
                              <p className="font-mono font-bold text-[#FF4D5F]">{entry.sl}</p>
                            </div>
                            <div className="bg-[#121820] rounded-lg p-2 text-center">
                              <p className="text-text-muted">Take Profit</p>
                              <p className="font-mono font-bold text-[#39FF88]">{entry.tp1}</p>
                            </div>
                          </div>
                          
                          <div className="mt-2 grid grid-cols-2 gap-2 text-xs">
                            <div className="bg-[#121820] rounded-lg p-2 text-center">
                              <p className="text-text-muted">Strategy</p>
                              <p className="font-medium text-text-primary">{entry.journal.strategy || 'N/A'}</p>
                            </div>
                            <div className="bg-[#121820] rounded-lg p-2 text-center">
                              <p className="text-text-muted">Signal</p>
                              <p className="font-medium text-text-primary truncate" title={entry.title}>
                                {entry.title}
                              </p>
                            </div>
                          </div>

                          {entry.journal.notes && (
                            <div className="mt-2 text-xs text-text-secondary bg-[#121820] rounded-lg p-3">
                              <FileText size={14} className="inline mr-1 text-text-muted" />
                              {entry.journal.notes}
                            </div>
                          )}
                        </motion.div>
                      )}
                    </Card>
                  </motion.div>
                ))
              )}
            </div>

            {/* Summary Footer */}
            {entries.length > 0 && (
              <div className="mt-6 md:mt-8 bg-[#0D1117] border border-[rgba(255,255,255,0.08)] rounded-2xl p-4 md:p-6">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <Award size={20} className="text-accent-bullish" />
                    <div>
                      <p className="text-sm font-semibold text-text-primary">Performance Summary</p>
                      <p className="text-xs text-text-muted">
                        {wins} wins • {losses} losses • {winRate}% win rate
                      </p>
                    </div>
                  </div>
                  <div className={`text-lg font-bold ${totalProfit >= 0 ? 'text-[#39FF88]' : 'text-[#FF4D5F]'}`}>
                    {totalProfit >= 0 ? '+' : ''}{totalProfit.toFixed(2)}
                  </div>
                </div>
              </div>
            )}
          </Container>
        </Section>
      </main>
      <Footer />
    </>
  );
}
