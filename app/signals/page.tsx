'use client';

import { useState, useEffect } from 'react';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { Heading, Text } from '@/components/ui/Typography';
import { Card } from '@/components/ui/Card';
import { Navbar } from '@/components/layout/Navigation/Navbar';
import { Footer } from '@/components/layout/Footer/Footer';
import { ScrollReveal } from '@/components/animations/ScrollReveal';
import { Loader } from '@/components/animations/Loader';
import { useSettings } from '@/hooks/useSettings';
import { motion } from 'framer-motion';
import { Search, User, Calendar, BarChart3, TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface Signal {
  id: string;
  title: string;
  pair: string;
  timeframe: string;
  direction: string;
  entry: number;
  sl: number;
  tp1: number;
  status: string;
  description: string;
  image_url: string;
  created_at: string;
}

export default function SignalsPage() {
  const [signals, setSignals] = useState<Signal[]>([]);
  const [filteredSignals, setFilteredSignals] = useState<Signal[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const { settings } = useSettings();

  // Gunakan settings untuk title dan subtitle
  const title = settings?.signals_title || 'SWFX Signals';
  const subtitle = settings?.signals_subtitle || 'Trading signals and market analysis from SWFX';

  useEffect(() => {
    fetchSignals();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [signals, search]);

  const fetchSignals = async () => {
    try {
      const res = await fetch('/api/signals');
      const data = await res.json();
      if (data.success) {
        setSignals(data.data);
        setFilteredSignals(data.data);
      }
    } catch (error) {
      console.error('Error fetching signals:', error);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let result = signals;
    if (search) {
      const searchLower = search.toLowerCase();
      result = result.filter(s => 
        s.title.toLowerCase().includes(searchLower) ||
        s.pair.toLowerCase().includes(searchLower) ||
        s.description?.toLowerCase().includes(searchLower)
      );
    }
    setFilteredSignals(result);
  };

  const getDirectionColor = (direction: string) => {
    switch (direction) {
      case 'Buy': return 'text-[#39FF88] bg-[#39FF88]/10';
      case 'Sell': return 'text-[#FF4D5F] bg-[#FF4D5F]/10';
      default: return 'text-[#8B949E] bg-[#4B5563]/20';
    }
  };

  const getDirectionIcon = (direction: string) => {
    switch (direction) {
      case 'Buy': return <TrendingUp size={12} className="text-[#39FF88]" />;
      case 'Sell': return <TrendingDown size={12} className="text-[#FF4D5F]" />;
      default: return <Minus size={12} className="text-[#8B949E]" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-[#39FF88]/20 text-[#39FF88]';
      case 'Closed': return 'bg-[#4B5563]/20 text-[#8B949E]';
      default: return 'bg-[#F5A623]/20 text-[#F5A623]';
    }
  };

  const formatValue = (value: number) => {
    if (!value || value === 0) return '—';
    return value.toFixed(4);
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <main className="pt-16 md:pt-20">
          <Section background="primary" padding="md">
            <Container>
              <div className="text-center max-w-3xl mx-auto px-4">
                <Heading as="h1" className="text-2xl md:text-4xl">{title}</Heading>
                <Text className="mt-3 text-text-secondary">Loading signals...</Text>
                <div className="mt-8 flex justify-center">
                  <Loader size="lg" />
                </div>
              </div>
            </Container>
          </Section>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="pt-16 md:pt-20 overflow-x-hidden">
        <Section background="primary" padding="md" className="relative overflow-hidden">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-[#080A0D]" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] md:w-[600px] h-[300px] md:h-[500px] bg-[#39FF88]/5 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-0 w-[200px] md:w-[400px] h-[200px] md:h-[400px] bg-[#39FF88]/3 rounded-full blur-3xl" />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#080A0D]/50" />
          </div>

          <Container className="relative z-10 px-4">
            <div className="text-center max-w-3xl mx-auto py-8 md:py-12">
              <span className="text-[10px] md:text-xs font-medium tracking-[0.15em] text-accent-bullish uppercase">
                Signals
              </span>
              <Heading as="h1" className="mt-2 text-3xl md:text-5xl">
                {title}
              </Heading>
              <Text className="mt-3 text-text-secondary text-sm md:text-base">
                {subtitle}
              </Text>
              <p className="mt-2 text-xs md:text-sm text-text-muted flex items-center justify-center gap-1">
                <BarChart3 size={14} />
                {filteredSignals.length} signals available
              </p>
            </div>

            {/* Search */}
            <div className="mt-4 md:mt-6 max-w-md mx-auto">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" size={16} />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search signals..."
                  className="w-full pl-9 pr-4 py-2.5 bg-background-surface border border-ui-border rounded-lg text-text-primary text-sm focus:outline-none focus:border-[#39FF88] min-h-[44px]"
                />
              </div>
            </div>

            {filteredSignals.length === 0 ? (
              <div className="mt-8 md:mt-12 text-center text-text-muted">
                <p>No signals found matching your search.</p>
              </div>
            ) : (
              <div className="mt-6 md:mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {filteredSignals.map((signal, index) => (
                  <ScrollReveal key={signal.id} direction="up" delay={0.05 * Math.min(index, 10)}>
                    <motion.div
                      whileHover={{ y: -4 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                      className="h-full"
                    >
                      <Card variant="elevated" className="h-full flex flex-col overflow-hidden border border-white/5 hover:border-[#39FF88]/20 transition-all duration-300">
                        <div className="relative w-full aspect-[16/9] bg-background-elevated/30 overflow-hidden">
                          {signal.image_url ? (
                            <img
                              src={signal.image_url}
                              alt={signal.title}
                              className="w-full h-full object-cover transition-transform duration-500"
                              loading="lazy"
                              onError={(e) => {
                                (e.target as HTMLImageElement).style.display = 'none';
                              }}
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-text-muted bg-background-elevated/30">
                              <div className="text-center">
                                <BarChart3 size={32} className="mx-auto text-text-muted" />
                                <p className="text-xs mt-1">No chart</p>
                              </div>
                            </div>
                          )}
                          
                          <div className="absolute bottom-2 left-2 rounded-lg bg-black/60 backdrop-blur-sm px-2 py-0.5">
                            <span className="font-mono text-xs font-bold text-white">{signal.pair}</span>
                            {signal.timeframe && (
                              <span className="ml-1 text-[10px] text-gray-300">{signal.timeframe}</span>
                            )}
                          </div>

                          <div className={`absolute top-2 right-2 rounded-full px-2 py-0.5 text-[10px] font-medium flex items-center gap-1 ${getDirectionColor(signal.direction)}`}>
                            {getDirectionIcon(signal.direction)}
                            {signal.direction}
                          </div>

                          <div className={`absolute top-2 left-2 rounded-full px-2 py-0.5 text-[10px] font-medium ${getStatusColor(signal.status)}`}>
                            {signal.status}
                          </div>
                        </div>

                        <div className="flex-1 p-3 md:p-4 flex flex-col">
                          <h3 className="font-semibold text-text-primary text-sm md:text-base line-clamp-1">
                            {signal.title}
                          </h3>
                          
                          <div className="flex items-center justify-between mt-1">
                            <div className="flex items-center gap-1.5 text-xs text-text-muted">
                              <User size={12} />
                              <span>Admin</span>
                            </div>
                            <div className="flex items-center gap-1 text-xs text-text-muted">
                              <Calendar size={12} />
                              <span>{new Date(signal.created_at).toLocaleDateString()}</span>
                            </div>
                          </div>

                          <div className="mt-3 grid grid-cols-3 gap-1 text-xs">
                            <div className="bg-background-elevated/30 rounded p-1.5 text-center">
                              <span className="text-[10px] text-text-muted">Entry</span>
                              <p className="font-mono font-bold text-text-primary text-xs">{formatValue(signal.entry)}</p>
                            </div>
                            <div className="bg-background-elevated/30 rounded p-1.5 text-center">
                              <span className="text-[10px] text-text-muted">SL</span>
                              <p className="font-mono font-bold text-[#FF4D5F] text-xs">{formatValue(signal.sl)}</p>
                            </div>
                            <div className="bg-background-elevated/30 rounded p-1.5 text-center">
                              <span className="text-[10px] text-text-muted">TP</span>
                              <p className="font-mono text-xs text-[#39FF88]">
                                {signal.tp1 ? signal.tp1.toFixed(4) : '—'}
                              </p>
                            </div>
                          </div>

                          {signal.description && (
                            <p className="mt-2 text-xs md:text-sm text-text-secondary line-clamp-2">
                              {signal.description}
                            </p>
                          )}
                        </div>
                      </Card>
                    </motion.div>
                  </ScrollReveal>
                ))}
              </div>
            )}
          </Container>
        </Section>
      </main>
      <Footer />
    </>
  );
}
