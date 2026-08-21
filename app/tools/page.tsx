'use client';

import { useState } from 'react';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { Heading, Text } from '@/components/ui/Typography';
import { Card } from '@/components/ui/Card';
import { Navbar } from '@/components/layout/Navigation/Navbar';
import { Footer } from '@/components/layout/Footer/Footer';
import { ScrollReveal } from '@/components/animations/ScrollReveal';
import { motion, AnimatePresence } from 'framer-motion';
import { RiskCalculator } from '@/components/trading/RiskCalculator';
import { PipCalculator } from '@/components/tools/PipCalculator';
import { PositionSizeCalculator } from '@/components/tools/PositionSizeCalculator';
import { ProfitCalculator } from '@/components/tools/ProfitCalculator';
import { MarginCalculator } from '@/components/tools/MarginCalculator';
import { RiskRewardCalculator } from '@/components/tools/RiskRewardCalculator';
import { CompoundCalculator } from '@/components/tools/CompoundCalculator';
import { TradingJournalStats } from '@/components/tools/TradingJournalStats';
import { 
  Calculator, 
  DollarSign, 
  Target, 
  TrendingUp,
  BarChart3,
  Activity,
  Wrench,
  Percent,
  Shield,
  Sparkles,
  CheckCircle,
  Flame
} from 'lucide-react';

interface Tool {
  id: string;
  name: string;
  description: string;
  longDescription: string;
  icon: any;
  category: string;
  color: string;
  badge?: string;
  component: React.ReactNode;
  stats?: { label: string; value: string }[];
}

const tools: Tool[] = [
  {
    id: 'risk-calculator',
    name: 'Risk Calculator',
    description: 'Calculate position size based on account balance and risk percentage.',
    longDescription: 'Determine exactly how much you should risk per trade based on your account size and risk tolerance.',
    icon: Calculator,
    category: 'Risk Management',
    color: 'from-emerald-500/20 to-emerald-500/5',
    component: <RiskCalculator />,
    stats: [{ label: 'Used by', value: '2,847+' }],
    badge: 'Most Used'
  },
  {
    id: 'pip-calculator',
    name: 'Pip Calculator',
    description: 'Calculate pip values and potential profit/loss for any trade.',
    longDescription: 'Know exactly how much each pip is worth for any currency pair and lot size.',
    icon: TrendingUp,
    category: 'Trading',
    color: 'from-blue-500/20 to-blue-500/5',
    component: <PipCalculator />,
    stats: [{ label: 'Pairs Supported', value: '10+' }],
  },
  {
    id: 'position-size',
    name: 'Position Size Calculator',
    description: 'Determine the optimal position size for your trades.',
    longDescription: 'Calculate the perfect lot size based on your risk percentage, stop loss distance, and account balance.',
    icon: Target,
    category: 'Risk Management',
    color: 'from-purple-500/20 to-purple-500/5',
    component: <PositionSizeCalculator />,
    stats: [{ label: 'Risk Precision', value: '0.01 lot' }],
  },
  {
    id: 'profit-calculator',
    name: 'Profit/Loss Calculator',
    description: 'Calculate potential profit or loss before entering a trade.',
    longDescription: 'See exactly how much you could gain or lose before you enter a trade.',
    icon: DollarSign,
    category: 'Trading',
    color: 'from-green-500/20 to-green-500/5',
    component: <ProfitCalculator />,
    stats: [{ label: 'Real-time', value: 'Updates' }],
  },
  {
    id: 'margin-calculator',
    name: 'Margin Calculator',
    description: 'Calculate required margin for different lot sizes.',
    longDescription: 'Know exactly how much margin you need for any trade. Prevent margin calls.',
    icon: Percent,
    category: 'Risk Management',
    color: 'from-orange-500/20 to-orange-500/5',
    component: <MarginCalculator />,
    stats: [{ label: 'Leverage', value: '1:1 to 1:1000' }],
  },
  {
    id: 'risk-reward',
    name: 'Risk/Reward Calculator',
    description: 'Calculate risk-reward ratio for your trade setups.',
    longDescription: 'Determine if a trade is worth taking by calculating the risk-reward ratio.',
    icon: Shield,
    category: 'Risk Management',
    color: 'from-red-500/20 to-red-500/5',
    component: <RiskRewardCalculator />,
    stats: [{ label: 'Ratio', value: '1:1 to 1:10+' }],
  },
  {
    id: 'compound-interest',
    name: 'Compound Calculator',
    description: 'Calculate the power of compounding in your trading account.',
    longDescription: 'See the incredible power of compounding. Visualize how your account can grow over time.',
    icon: Activity,
    category: 'Planning',
    color: 'from-cyan-500/20 to-cyan-500/5',
    component: <CompoundCalculator />,
    stats: [{ label: 'Time Period', value: '1-60 months' }],
  },
  {
    id: 'trading-journal',
    name: 'Journal Stats',
    description: 'Analyze your trading performance with detailed statistics.',
    longDescription: 'Get deep insights into your trading performance. Win rate, average profit, and more.',
    icon: BarChart3,
    category: 'Analysis',
    color: 'from-yellow-500/20 to-yellow-500/5',
    component: <TradingJournalStats />,
    stats: [{ label: 'Live Data', value: 'From Journal' }],
  },
];

export default function ToolsPage() {
  const [activeTool, setActiveTool] = useState<string>('risk-calculator');

  const activeToolData = tools.find(t => t.id === activeTool);

  return (
    <>
      <Navbar />
      <main className="pt-16 md:pt-20 overflow-x-hidden">
        {/* Hero Section */}
        <Section background="primary" padding="md" className="relative overflow-hidden">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-[#080A0D]" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] md:w-[800px] h-[400px] md:h-[600px] bg-[#39FF88]/5 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-0 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-[#39FF88]/3 rounded-full blur-3xl" />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#080A0D]/50" />
          </div>

          <Container className="relative z-10 px-4">
            <div className="text-center max-w-4xl mx-auto py-8 md:py-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-bullish/10 border border-accent-bullish/20 mb-4"
              >
                <Sparkles size={14} className="text-accent-bullish" />
                <span className="text-xs font-medium text-accent-bullish">8 Powerful Tools</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-4xl md:text-6xl lg:text-7xl font-bold"
              >
                Trading Tools
                <br />
                <span className="text-gradient-premium">Made Simple</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="mt-4 text-text-secondary text-base md:text-lg max-w-2xl mx-auto"
              >
                Everything you need to calculate risk, profit, margin, and more.
                Make better trading decisions with our suite of professional tools.
              </motion.p>

              {/* Quick Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto"
              >
                <div className="bg-[#0D1117] border border-[rgba(255,255,255,0.08)] rounded-xl p-3 text-center">
                  <p className="text-2xl font-bold text-accent-bullish">{tools.length}</p>
                  <p className="text-xs text-text-muted">Total Tools</p>
                </div>
                <div className="bg-[#0D1117] border border-[rgba(255,255,255,0.08)] rounded-xl p-3 text-center">
                  <p className="text-2xl font-bold text-accent-bullish">4</p>
                  <p className="text-xs text-text-muted">Categories</p>
                </div>
                <div className="bg-[#0D1117] border border-[rgba(255,255,255,0.08)] rounded-xl p-3 text-center">
                  <p className="text-2xl font-bold text-accent-bullish">100%</p>
                  <p className="text-xs text-text-muted">Free to Use</p>
                </div>
                <div className="bg-[#0D1117] border border-[rgba(255,255,255,0.08)] rounded-xl p-3 text-center">
                  <p className="text-2xl font-bold text-accent-bullish">Real-time</p>
                  <p className="text-xs text-text-muted">Calculations</p>
                </div>
              </motion.div>
            </div>
          </Container>
        </Section>

        {/* Tools Grid */}
        <Section background="primary" padding="md" className="py-6 md:py-10">
          <Container>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 px-4">
              {tools.map((tool, index) => {
                const Icon = tool.icon;
                const isActive = activeTool === tool.id;
                return (
                  <motion.button
                    key={tool.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    onClick={() => setActiveTool(tool.id)}
                    className={`relative p-4 md:p-5 rounded-xl border text-left transition-all duration-300 ${
                      isActive
                        ? 'bg-[#39FF88]/10 border-[#39FF88]/30 shadow-lg shadow-[#39FF88]/10 scale-[1.02]'
                        : 'bg-[#0D1117] border-[rgba(255,255,255,0.08)] hover:border-[rgba(255,255,255,0.2)] hover:scale-[1.02]'
                    }`}
                  >
                    {tool.badge && (
                      <span className="absolute -top-2 -right-2 px-2 py-0.5 rounded-full text-[10px] font-medium bg-accent-bullish text-background-primary">
                        {tool.badge}
                      </span>
                    )}
                    <div className={`p-2 rounded-lg inline-block ${
                      isActive ? 'bg-[#39FF88]/20' : 'bg-white/5'
                    }`}>
                      <Icon className={isActive ? 'text-[#39FF88]' : 'text-text-muted'} size={20} />
                    </div>
                    <p className={`text-sm font-semibold mt-3 ${
                      isActive ? 'text-text-primary' : 'text-text-secondary'
                    }`}>
                      {tool.name}
                    </p>
                    <p className="text-xs text-text-muted mt-1 line-clamp-2">{tool.description}</p>
                    <div className="flex items-center justify-between mt-3">
                      <span className="text-[10px] text-text-muted">{tool.category}</span>
                      {isActive && (
                        <span className="text-xs text-accent-bullish flex items-center gap-1">
                          Active <CheckCircle size={12} />
                        </span>
                      )}
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </Container>
        </Section>

        {/* Active Tool */}
        <Section background="surface" padding="md" className="py-8 md:py-12">
          <Container>
            <AnimatePresence mode="wait">
              {activeToolData && (
                <motion.div
                  key={activeToolData.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                  className="bg-[#0D1117] border border-[rgba(255,255,255,0.08)] rounded-2xl p-4 md:p-8 mx-4"
                >
                  <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6 pb-4 border-b border-[rgba(255,255,255,0.05)]">
                    <div className="flex items-center gap-4">
                      <div className="p-3 rounded-xl bg-accent-bullish/10">
                        <activeToolData.icon size={24} className="text-accent-bullish" />
                      </div>
                      <div>
                        <h3 className="text-xl md:text-2xl font-bold text-text-primary">{activeToolData.name}</h3>
                        <p className="text-sm text-text-muted">{activeToolData.longDescription}</p>
                      </div>
                    </div>
                    {activeToolData.stats && (
                      <div className="flex gap-2">
                        {activeToolData.stats.map((stat, i) => (
                          <div key={i} className="bg-[#121820] rounded-lg px-3 py-1.5 text-center">
                            <p className="text-xs font-medium text-accent-bullish">{stat.value}</p>
                            <p className="text-[10px] text-text-muted">{stat.label}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="max-w-2xl mx-auto">
                    {activeToolData.component}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </Container>
        </Section>

        {/* Bottom CTA */}
        <Section background="primary" padding="md" className="py-8 md:py-12 border-t border-[rgba(255,255,255,0.05)]">
          <Container>
            <div className="text-center max-w-2xl mx-auto px-4">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#39FF88]/10 border border-[#39FF88]/20 mb-4">
                <Flame size={14} className="text-accent-bullish" />
                <span className="text-xs font-medium text-accent-bullish">Pro Tips</span>
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-text-primary">
                Master Your Trading with the Right Tools
              </h3>
              <p className="text-sm text-text-muted mt-2">
                Use these tools to plan your trades, manage risk, and track your performance.
                All calculations are real-time and completely free.
              </p>
              <div className="mt-4 flex flex-wrap justify-center gap-3">
                <span className="text-xs bg-[#121820] px-3 py-1 rounded-full text-text-muted">✅ Accurate Results</span>
                <span className="text-xs bg-[#121820] px-3 py-1 rounded-full text-text-muted">⚡ Real-time</span>
                <span className="text-xs bg-[#121820] px-3 py-1 rounded-full text-text-muted">🔒 Free to Use</span>
                <span className="text-xs bg-[#121820] px-3 py-1 rounded-full text-text-muted">📊 Data-Driven</span>
              </div>
            </div>
          </Container>
        </Section>
      </main>
      <Footer />
    </>
  );
}
