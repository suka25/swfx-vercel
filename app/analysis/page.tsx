'use client';

import { useState, useEffect } from 'react';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { Heading, Text } from '@/components/ui/Typography';
import { Card } from '@/components/ui/Card';
import { Navbar } from '@/components/layout/Navigation/Navbar';
import { Footer } from '@/components/layout/Footer/Footer';
import { ScrollReveal } from '@/components/animations/ScrollReveal';
import { motion, AnimatePresence } from 'framer-motion';
import { useSettings } from '@/hooks/useSettings';
import { TradingViewChart } from '@/components/tradingview/TradingViewChart';
import EconomicCalendarWidget from '@/components/tradingview/widgets/EconomicCalendarWidget';
import { 
  BarChart3, 
  Activity, 
  Target, 
  Shield,
  TrendingUp,
  TrendingDown,
  Sparkles,
  Calendar,
  Clock,
  Globe,
  Flame,
  BookOpen,
  RefreshCw,
  Loader2
} from 'lucide-react';

interface MarketData {
  pair: string;
  price: string;
  change: string;
  direction: 'up' | 'down';
}

interface PivotData {
  pivot: string;
  r1: string;
  r2: string;
  r3: string;
  s1: string;
  s2: string;
  s3: string;
}

const analysisTopics = [
  {
    title: 'Market Structure',
    description: 'Understanding market phases, trends, and key levels.',
    icon: BarChart3,
    lessons: 5,
    level: 'Beginner',
  },
  {
    title: 'Technical Analysis',
    description: 'Chart patterns, indicators, and price action strategies.',
    icon: Activity,
    lessons: 8,
    level: 'Intermediate',
  },
  {
    title: 'Risk Management',
    description: 'Position sizing, stop-loss, and portfolio protection.',
    icon: Shield,
    lessons: 6,
    level: 'Intermediate',
  },
  {
    title: 'Trading Psychology',
    description: 'Emotions, discipline, and mindset for consistent trading.',
    icon: Target,
    lessons: 4,
    level: 'Advanced',
  },
];

export default function AnalysisPage() {
  const { settings, loading } = useSettings();
  const [selectedPair, setSelectedPair] = useState('XAUUSD');
  const [activeTab, setActiveTab] = useState<'chart' | 'calendar'>('chart');
  const [currentTime, setCurrentTime] = useState<string>('');
  const [marketData, setMarketData] = useState<MarketData[]>([]);
  const [pivotData, setPivotData] = useState<Record<string, PivotData>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<string>('');
  const [isMounted, setIsMounted] = useState(false);

  // Fix hydration: only render time on client
  useEffect(() => {
    setIsMounted(true);
    const updateTime = () => {
      setCurrentTime(new Date().toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit',
        second: '2-digit',
        hour12: false 
      }));
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  const fetchMarketData = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/market');
      const data = await res.json();
      
      if (data.success) {
        setMarketData(data.data);
        setPivotData(data.pivotData || {});
        setLastUpdated(data.lastUpdated || new Date().toISOString());
      }
    } catch (error) {
      console.error('Error fetching market data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMarketData();
    const interval = setInterval(fetchMarketData, 60000);
    return () => clearInterval(interval);
  }, []);

  const title = loading ? 'Market Analysis' : settings?.analysis_title || 'Market Analysis';
  const subtitle = loading ? 'Professional technical analysis...' : settings?.analysis_subtitle || 'Professional technical analysis with clear reasoning and structured approach.';

  const getPivotForPair = (pair: string): PivotData | null => {
    return pivotData[pair] || null;
  };

  const formatPivotValue = (value: string) => {
    if (!value) return '—';
    if (selectedPair === 'BTCUSD') {
      return parseFloat(value).toFixed(0);
    }
    if (selectedPair === 'USDJPY') {
      return parseFloat(value).toFixed(3);
    }
    return parseFloat(value).toFixed(4);
  };

  return (
    <>
      <Navbar />
      <main className="pt-16 md:pt-20 overflow-x-hidden">
        {/* Hero Section */}
        <Section background="primary" padding="md" className="relative overflow-hidden">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-[#080A0D]" />
            <div className="absolute top-0 right-0 w-[400px] md:w-[700px] h-[400px] md:h-[600px] bg-[#39FF88]/5 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-[#39FF88]/3 rounded-full blur-3xl" />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#080A0D]/50" />
          </div>

          <Container className="relative z-10 px-4">
            <div className="text-center max-w-3xl mx-auto py-8 md:py-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-bullish/10 border border-accent-bullish/20 mb-4">
                <Sparkles size={14} className="text-accent-bullish" />
                <span className="text-xs font-medium text-accent-bullish">Live Analysis</span>
                <span className="w-1.5 h-1.5 rounded-full bg-accent-bullish animate-pulse" />
                {isMounted && (
                  <span className="text-xs text-text-muted">{currentTime}</span>
                )}
              </div>

              <Heading as="h1" className="text-3xl md:text-5xl lg:text-6xl">
                {title}
              </Heading>
              <Text className="mt-4 text-text-secondary text-sm md:text-base max-w-2xl mx-auto">
                {subtitle}
              </Text>
            </div>
          </Container>
        </Section>

        {/* Market Overview */}
        <Section background="surface" padding="md" className="py-4 md:py-6 border-b border-[rgba(255,255,255,0.05)]">
          <Container>
            <div className="flex items-center justify-between mb-3 px-4">
              <h3 className="text-sm font-semibold text-text-primary flex items-center gap-2">
                <Globe size={16} className="text-accent-bullish" />
                Market Overview
              </h3>
              <div className="flex items-center gap-2">
                <span className="text-xs text-text-muted">
                  {lastUpdated ? `Updated: ${new Date(lastUpdated).toLocaleTimeString()}` : 'Loading...'}
                </span>
                <button
                  onClick={fetchMarketData}
                  disabled={isLoading}
                  className="p-1.5 rounded-lg hover:bg-white/5 transition-colors"
                >
                  <RefreshCw size={14} className={`text-text-muted ${isLoading ? 'animate-spin' : ''}`} />
                </button>
              </div>
            </div>
            {isLoading && marketData.length === 0 ? (
              <div className="flex justify-center py-4 px-4">
                <Loader2 size={24} className="text-accent-bullish animate-spin" />
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 md:gap-3 px-4">
                {marketData.map((item) => (
                  <div key={item.pair} className="bg-[#0D1117] border border-[rgba(255,255,255,0.08)] rounded-lg p-2 md:p-3 text-center">
                    <p className="text-xs font-medium text-text-muted">{item.pair}</p>
                    <p className="text-sm md:text-base font-bold text-text-primary">{item.price}</p>
                    <p className={`text-xs font-medium flex items-center justify-center gap-0.5 ${
                      item.direction === 'up' ? 'text-[#39FF88]' : 'text-[#FF4D5F]'
                    }`}>
                      {item.direction === 'up' ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                      {item.change}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </Container>
        </Section>

        {/* Main Content */}
        <Section background="primary" padding="md" className="py-6 md:py-10">
          <Container>
            <div className="flex flex-wrap gap-2 mb-4 md:mb-6 px-4">
              <button
                onClick={() => setActiveTab('chart')}
                className={`px-4 py-2 rounded-lg text-xs md:text-sm font-medium transition-all flex items-center gap-2 ${
                  activeTab === 'chart'
                    ? 'bg-accent-bullish/20 text-accent-bullish border border-accent-bullish/30'
                    : 'bg-white/5 text-text-secondary hover:text-text-primary hover:bg-white/10'
                }`}
              >
                <BarChart3 size={16} />
                Chart Analysis
              </button>
              <button
                onClick={() => setActiveTab('calendar')}
                className={`px-4 py-2 rounded-lg text-xs md:text-sm font-medium transition-all flex items-center gap-2 ${
                  activeTab === 'calendar'
                    ? 'bg-accent-bullish/20 text-accent-bullish border border-accent-bullish/30'
                    : 'bg-white/5 text-text-secondary hover:text-text-primary hover:bg-white/10'
                }`}
              >
                <Calendar size={16} />
                Economic Calendar
              </button>
            </div>

            <AnimatePresence mode="wait">
              {activeTab === 'chart' && (
                <motion.div
                  key="chart"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="px-4"
                >
                  <div className="bg-[#0D1117] border border-[rgba(255,255,255,0.08)] rounded-2xl p-2 md:p-4">
                    <div className="flex flex-wrap items-center gap-2 mb-3">
                      <div className="flex flex-wrap gap-1.5 flex-1">
                        {['XAUUSD', 'EURUSD', 'GBPUSD', 'USDJPY', 'AUDUSD', 'BTCUSD'].map((symbol) => (
                          <button
                            key={symbol}
                            onClick={() => setSelectedPair(symbol)}
                            className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                              selectedPair === symbol
                                ? 'bg-accent-bullish/20 text-accent-bullish border border-accent-bullish/30'
                                : 'bg-white/5 text-text-secondary hover:text-text-primary hover:bg-white/10'
                            }`}
                          >
                            {symbol}
                          </button>
                        ))}
                      </div>
                      <button
                        onClick={fetchMarketData}
                        disabled={isLoading}
                        className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                      >
                        <RefreshCw size={14} className={`text-text-muted ${isLoading ? 'animate-spin' : ''}`} />
                      </button>
                    </div>

                    <TradingViewChart
                      symbol={`OANDA:${selectedPair}`}
                      height={500}
                      containerClassName="rounded-xl"
                    />
                    <p className="mt-2 text-[10px] text-text-muted/30 text-right">Powered by TradingView</p>

                    {!isLoading && getPivotForPair(selectedPair) && (
                      <div className="mt-4 bg-[#121820] rounded-xl p-4">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="text-sm font-semibold text-text-primary flex items-center gap-2">
                            <Target size={16} className="text-accent-bullish" />
                            Pivot Points • {selectedPair}
                          </h4>
                          <span className="text-[10px] text-text-muted">Real-time</span>
                        </div>
                        <div className="grid grid-cols-3 md:grid-cols-7 gap-2">
                          {(() => {
                            const pivot = getPivotForPair(selectedPair);
                            if (!pivot) return null;
                            return (
                              <>
                                <div className="bg-[#1A1F2E] rounded-lg p-2 text-center">
                                  <p className="text-[10px] text-text-muted">R3</p>
                                  <p className="text-xs font-bold text-[#FF4D5F]">{formatPivotValue(pivot.r3)}</p>
                                </div>
                                <div className="bg-[#1A1F2E] rounded-lg p-2 text-center">
                                  <p className="text-[10px] text-text-muted">R2</p>
                                  <p className="text-xs font-bold text-[#FF4D5F]">{formatPivotValue(pivot.r2)}</p>
                                </div>
                                <div className="bg-[#1A1F2E] rounded-lg p-2 text-center">
                                  <p className="text-[10px] text-text-muted">R1</p>
                                  <p className="text-xs font-bold text-[#FF4D5F]">{formatPivotValue(pivot.r1)}</p>
                                </div>
                                <div className="bg-[#39FF88]/10 rounded-lg p-2 text-center border border-[#39FF88]/20">
                                  <p className="text-[10px] text-text-muted">Pivot</p>
                                  <p className="text-xs font-bold text-[#39FF88]">{formatPivotValue(pivot.pivot)}</p>
                                </div>
                                <div className="bg-[#1A1F2E] rounded-lg p-2 text-center">
                                  <p className="text-[10px] text-text-muted">S1</p>
                                  <p className="text-xs font-bold text-[#39FF88]">{formatPivotValue(pivot.s1)}</p>
                                </div>
                                <div className="bg-[#1A1F2E] rounded-lg p-2 text-center">
                                  <p className="text-[10px] text-text-muted">S2</p>
                                  <p className="text-xs font-bold text-[#39FF88]">{formatPivotValue(pivot.s2)}</p>
                                </div>
                                <div className="bg-[#1A1F2E] rounded-lg p-2 text-center">
                                  <p className="text-[10px] text-text-muted">S3</p>
                                  <p className="text-xs font-bold text-[#39FF88]">{formatPivotValue(pivot.s3)}</p>
                                </div>
                              </>
                            );
                          })()}
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}

              {activeTab === 'calendar' && (
                <motion.div
                  key="calendar"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="px-4"
                >
                  <div className="bg-[#0D1117] border border-[rgba(255,255,255,0.08)] rounded-2xl p-2 md:p-4 h-[500px] md:h-[600px]">
                    <EconomicCalendarWidget />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </Container>
        </Section>

        {/* Analysis Topics */}
        <Section background="surface" padding="md" className="py-8 md:py-12 border-t border-[rgba(255,255,255,0.05)]">
          <Container>
            <div className="text-center max-w-3xl mx-auto mb-6 md:mb-10 px-4">
              <span className="text-[10px] md:text-xs font-medium tracking-[0.15em] text-accent-bullish uppercase flex items-center justify-center gap-2">
                <BookOpen size={14} />
                Analysis Topics
              </span>
              <Heading as="h2" className="mt-2 text-2xl md:text-3xl">
                What We Analyze
              </Heading>
              <Text className="mt-2 text-text-secondary text-sm md:text-base">
                Four key pillars of professional market analysis
              </Text>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 px-4">
              {analysisTopics.map((topic, index) => {
                const Icon = topic.icon;
                return (
                  <ScrollReveal key={topic.title} direction="up" delay={0.1 * index}>
                    <motion.div
                      whileHover={{ y: -4 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                      className="h-full"
                    >
                      <Card variant="elevated" className="p-4 md:p-6 border border-white/5 hover:border-accent-bullish/20 transition-all duration-500 h-full">
                        <div className="flex items-start gap-3 md:gap-4">
                          <div className="p-2 md:p-3 rounded-lg bg-accent-bullish/10 flex-shrink-0">
                            <Icon className="text-accent-bullish" size={20} />
                          </div>
                          <div className="min-w-0">
                            <h3 className="font-semibold text-text-primary text-sm md:text-base">{topic.title}</h3>
                            <p className="mt-1 text-xs md:text-sm text-text-muted">{topic.description}</p>
                            <div className="mt-2 flex items-center gap-3 text-[10px] text-text-muted">
                              <span className="flex items-center gap-1">
                                <BookOpen size={12} />
                                {topic.lessons} lessons
                              </span>
                              <span className={`px-2 py-0.5 rounded ${
                                topic.level === 'Beginner' ? 'bg-[#39FF88]/20 text-[#39FF88]' :
                                topic.level === 'Intermediate' ? 'bg-[#F5A623]/20 text-[#F5A623]' :
                                'bg-[#FF4D5F]/20 text-[#FF4D5F]'
                              }`}>
                                {topic.level}
                              </span>
                            </div>
                          </div>
                        </div>
                      </Card>
                    </motion.div>
                  </ScrollReveal>
                );
              })}
            </div>
          </Container>
        </Section>

        {/* Bottom CTA */}
        <Section background="primary" padding="md" className="py-8 md:py-12 border-t border-[rgba(255,255,255,0.05)]">
          <Container>
            <div className="text-center max-w-2xl mx-auto px-4">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#39FF88]/10 border border-[#39FF88]/20 mb-4">
                <Flame size={14} className="text-accent-bullish" />
                <span className="text-xs font-medium text-accent-bullish">Pro Analysis</span>
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-text-primary">
                Ready to Trade with Confidence?
              </h3>
              <p className="text-sm text-text-muted mt-2">
                Use our analysis tools to make informed trading decisions.
                Check live charts, economic events, and real-time pivot levels.
              </p>
              <div className="mt-4 flex flex-wrap justify-center gap-3">
                <span className="text-xs bg-[#121820] px-3 py-1 rounded-full text-text-muted">📊 Live Charts</span>
                <span className="text-xs bg-[#121820] px-3 py-1 rounded-full text-text-muted">📅 Economic Calendar</span>
                <span className="text-xs bg-[#121820] px-3 py-1 rounded-full text-text-muted">🎯 Real Pivot Points</span>
                <span className="text-xs bg-[#121820] px-3 py-1 rounded-full text-text-muted">📈 Market Overview</span>
              </div>
            </div>
          </Container>
        </Section>
      </main>
      <Footer />
    </>
  );
}
