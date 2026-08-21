'use client';

import { useState, useEffect } from 'react';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { Heading, Text } from '@/components/ui/Typography';
import { Navbar } from '@/components/layout/Navigation/Navbar';
import { Footer } from '@/components/layout/Footer/Footer';
import { motion, AnimatePresence } from 'framer-motion';
import { useSettings } from '@/hooks/useSettings';
import { 
  Sparkles,
  Globe,
  Activity,
  Filter,
  RefreshCw,
  Newspaper,
  Calendar,
  Grid3X3,
  Table2,
  BarChart3,
  Eye,
  Loader2,
  TrendingUp,
  TrendingDown,
  DollarSign
} from 'lucide-react';

// Import widgets
import SingleTickerWidget from '@/components/tradingview/widgets/SingleTickerWidget';
import ForexCrossRatesWidget from '@/components/tradingview/widgets/ForexCrossRatesWidget';
import ForexHeatmapWidget from '@/components/tradingview/widgets/ForexHeatmapWidget';
import ScreenerWidget from '@/components/tradingview/widgets/ScreenerWidget';
import NewsWidget from '@/components/tradingview/widgets/NewsWidget';
import EconomicEventsWidget from '@/components/tradingview/widgets/EconomicEventsWidget';

type TabType = 'overview' | 'cross-rates' | 'heatmap' | 'screener' | 'news' | 'events';

interface Tab {
  id: TabType;
  label: string;
  icon: any;
  description: string;
}

export default function MarketPage() {
  const { settings, loading } = useSettings();
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [lastUpdated, setLastUpdated] = useState<string>('');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const updateTime = () => {
      setLastUpdated(new Date().toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit',
        second: '2-digit',
        hour12: false 
      }));
    };
    updateTime();
    const interval = setInterval(updateTime, 10000);
    return () => clearInterval(interval);
  }, []);

  const title = loading ? 'Market Overview' : settings?.markets_title || 'Market Overview';
  const subtitle = loading ? 'Real-time prices and market data...' : settings?.markets_subtitle || 'Real-time prices, market data, and trading insights.';

  const tabs: Tab[] = [
    { id: 'overview', label: 'Overview', icon: Globe, description: 'Live prices, cross rates & heatmap' },
    { id: 'cross-rates', label: 'Cross Rates', icon: Table2, description: 'Forex cross currency rates' },
    { id: 'heatmap', label: 'Heatmap', icon: Grid3X3, description: 'Market strength visualization' },
    { id: 'screener', label: 'Screener', icon: Filter, description: 'Filter symbols by indicators' },
    { id: 'news', label: 'News', icon: Newspaper, description: 'Latest market news' },
    { id: 'events', label: 'Calendar', icon: Calendar, description: 'Economic events worldwide' },
  ];

  const handleRefresh = () => {
    setIsRefreshing(true);
    setLastUpdated(new Date().toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      second: '2-digit',
      hour12: false 
    }));
    setTimeout(() => setIsRefreshing(false), 500);
  };

  if (!isMounted) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center bg-[#080A0D]">
          <Loader2 size={32} className="text-accent-bullish animate-spin" />
        </div>
      </>
    );
  }

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
            <div className="text-center max-w-3xl mx-auto py-6 md:py-10">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-bullish/10 border border-accent-bullish/20 mb-4">
                <Sparkles size={14} className="text-accent-bullish" />
                <span className="text-xs font-medium text-accent-bullish">Live Market</span>
                <span className="w-1.5 h-1.5 rounded-full bg-accent-bullish animate-pulse" />
                <span className="text-xs text-text-muted">
                  {lastUpdated ? `Updated: ${lastUpdated}` : 'Loading...'}
                </span>
                <button
                  onClick={handleRefresh}
                  disabled={isRefreshing}
                  className="p-0.5 hover:bg-white/10 rounded transition-colors"
                >
                  <RefreshCw size={12} className={`text-text-muted ${isRefreshing ? 'animate-spin' : ''}`} />
                </button>
              </div>

              <Heading as="h1" className="text-3xl md:text-5xl lg:text-6xl">
                {title}
              </Heading>
              <Text className="mt-3 text-text-secondary text-sm md:text-base max-w-2xl mx-auto">
                {subtitle}
              </Text>
            </div>
          </Container>
        </Section>

        {/* Tabs Navigation */}
        <Section background="surface" padding="sm" className="py-2 md:py-3 border-b border-[rgba(255,255,255,0.05)]">
          <Container>
            <div className="flex flex-wrap gap-1 md:gap-2 px-4 overflow-x-auto no-scrollbar">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 md:px-4 md:py-2 rounded-lg text-xs md:text-sm font-medium transition-all whitespace-nowrap ${
                      isActive
                        ? 'bg-accent-bullish/20 text-accent-bullish border border-accent-bullish/30'
                        : 'bg-white/5 text-text-secondary hover:text-text-primary hover:bg-white/10'
                    }`}
                  >
                    <Icon size={14} />
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </Container>
        </Section>

        {/* Tab Content */}
        <Section background="primary" padding="md" className="py-4 md:py-8">
          <Container>
            <div className="px-4">
              <AnimatePresence mode="wait">
                {/* Overview Tab */}
                {activeTab === 'overview' && (
                  <motion.div
                    key="overview"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-4 md:space-y-6"
                  >
                    {/* Single Ticker */}
                    <div>
                      <h3 className="text-xs font-medium text-text-muted uppercase tracking-wider mb-2 flex items-center gap-2">
                        <Eye size={14} className="text-accent-bullish" />
                        Single Ticker
                      </h3>
                      <SingleTickerWidget symbol="OANDA:XAUUSD" height={80} />
                    </div>

                    {/* Forex Cross Rates */}
                    <div>
                      <h3 className="text-xs font-medium text-text-muted uppercase tracking-wider mb-2 flex items-center gap-2">
                        <Table2 size={14} className="text-accent-bullish" />
                        Forex Cross Rates
                      </h3>
                      <div className="bg-[#0D1117] border border-[rgba(255,255,255,0.08)] rounded-xl p-2 md:p-4">
                        <ForexCrossRatesWidget height={350} />
                      </div>
                    </div>

                    {/* Forex Heatmap */}
                    <div>
                      <h3 className="text-xs font-medium text-text-muted uppercase tracking-wider mb-2 flex items-center gap-2">
                        <BarChart3 size={14} className="text-accent-bullish" />
                        Forex Heatmap
                      </h3>
                      <div className="bg-[#0D1117] border border-[rgba(255,255,255,0.08)] rounded-xl p-2 md:p-4">
                        <ForexHeatmapWidget height={350} />
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Cross Rates Tab */}
                {activeTab === 'cross-rates' && (
                  <motion.div
                    key="cross-rates"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="bg-[#0D1117] border border-[rgba(255,255,255,0.08)] rounded-xl p-2 md:p-4">
                      <div className="flex items-center gap-2 mb-3">
                        <Table2 size={16} className="text-accent-bullish" />
                        <h3 className="text-sm font-semibold text-text-primary">Forex Cross Rates</h3>
                        <span className="text-[10px] text-text-muted">All major currency pairs</span>
                      </div>
                      <ForexCrossRatesWidget height={500} />
                    </div>
                  </motion.div>
                )}

                {/* Heatmap Tab */}
                {activeTab === 'heatmap' && (
                  <motion.div
                    key="heatmap"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="bg-[#0D1117] border border-[rgba(255,255,255,0.08)] rounded-xl p-2 md:p-4">
                      <div className="flex items-center gap-2 mb-3">
                        <BarChart3 size={16} className="text-accent-bullish" />
                        <h3 className="text-sm font-semibold text-text-primary">Forex Heatmap</h3>
                        <span className="text-[10px] text-text-muted">Visual market strength</span>
                      </div>
                      <ForexHeatmapWidget height={500} />
                    </div>
                  </motion.div>
                )}

                {/* Screener Tab */}
                {activeTab === 'screener' && (
                  <motion.div
                    key="screener"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="bg-[#0D1117] border border-[rgba(255,255,255,0.08)] rounded-xl p-2 md:p-4">
                      <div className="flex items-center gap-2 mb-3">
                        <Filter size={16} className="text-accent-bullish" />
                        <h3 className="text-sm font-semibold text-text-primary">Market Screener</h3>
                        <span className="text-[10px] text-text-muted">Filter symbols by technical & fundamental indicators</span>
                      </div>
                      <ScreenerWidget height={550} />
                    </div>
                  </motion.div>
                )}

                {/* News Tab */}
                {activeTab === 'news' && (
                  <motion.div
                    key="news"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="bg-[#0D1117] border border-[rgba(255,255,255,0.08)] rounded-xl p-2 md:p-4">
                      <div className="flex items-center gap-2 mb-3">
                        <Newspaper size={16} className="text-accent-bullish" />
                        <h3 className="text-sm font-semibold text-text-primary">Market News</h3>
                        <span className="text-[10px] text-text-muted">Latest market headlines</span>
                      </div>
                      <NewsWidget height={500} symbol="FOREX" />
                    </div>
                  </motion.div>
                )}

                {/* Calendar Tab */}
                {activeTab === 'events' && (
                  <motion.div
                    key="events"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="bg-[#0D1117] border border-[rgba(255,255,255,0.08)] rounded-xl p-2 md:p-4">
                      <div className="flex items-center gap-2 mb-3">
                        <Calendar size={16} className="text-accent-bullish" />
                        <h3 className="text-sm font-semibold text-text-primary">Economic Calendar</h3>
                        <span className="text-[10px] text-text-muted">Global economic events</span>
                      </div>
                      <EconomicEventsWidget height={550} />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </Container>
        </Section>

        {/* Bottom Info */}
        <Section background="surface" padding="sm" className="py-3 border-t border-[rgba(255,255,255,0.05)]">
          <Container>
            <div className="flex flex-wrap items-center justify-between gap-2 px-4">
              <p className="text-[10px] text-text-muted/50">
                Market data provided by TradingView
              </p>
              <div className="flex items-center gap-3 text-[10px] text-text-muted/50">
                <span className="flex items-center gap-1">
                  <Activity size={10} className="text-accent-bullish" />
                  Live
                </span>
                <span>•</span>
                <span>Auto-refresh every 10s</span>
              </div>
            </div>
          </Container>
        </Section>
      </main>
      <Footer />
    </>
  );
}
