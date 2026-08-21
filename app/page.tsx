'use client';

import { useState, useEffect, useCallback, lazy, Suspense } from 'react';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { Heading, Text } from '@/components/ui/Typography';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Navbar } from '@/components/layout/Navigation/Navbar';
import { Footer } from '@/components/layout/Footer/Footer';
import { MagneticButton } from '@/components/animations/MagneticButton';
import { CustomCursor } from '@/components/animations/CustomCursor';
import { Preloader } from '@/components/animations/Preloader';
import { TradingViewChart } from '@/components/tradingview/TradingViewChart';
import { TradingViewTicker } from '@/components/tradingview/TradingViewTicker';
import { useSettings } from '@/hooks/useSettings';
import { motion, useScroll, useTransform } from 'framer-motion';
import { 
  Sparkles, 
  Send, 
  ArrowRight, 
  BookOpen,
  Target,
  Zap,
  TrendingUp,
  Shield,
  Users,
  Award,
  BarChart3,
  Globe,
  Activity,
  Flame,
  Crown,
  CheckCircle,
  Brain,
  Calculator,
  DollarSign,
  Wrench,
  Calendar,
  Rocket,
  Star,
  Gauge,
  Compass,
  Loader2,
  TrendingDown,
  LineChart,
  Eye
} from 'lucide-react';

// Lazy load 3D
const UltimateHero3D = lazy(() => 
  import('@/components/3d/UltimateHero').then(mod => ({ default: mod.UltimateHero3D }))
);

// Icon mapping
const iconMap: Record<string, any> = {
  Globe, Target, BarChart3, Calendar, Calculator, Wrench,
  BookOpen, TrendingUp, Brain, Shield, DollarSign, Zap,
  Users, Award, Activity, Flame, Crown, CheckCircle, Star,
  Rocket, Gauge, Compass, LineChart
};

interface Signal {
  id: string;
  title: string;
  pair: string;
  direction: string;
  entry: number;
  sl: number;
  tp1: number;
  status: string;
  created_at: string;
}

interface Course {
  id: string;
  title: string;
  description: string;
  level: string;
  icon: string;
  lessons: number;
  duration: string;
}

interface MarketStatus {
  status: string;
  session: string;
  sessionName: string;
  trend: string;
  volatility: string;
  nextSession: string;
  isWeekend: boolean;
}

export default function HomePage() {
  const [showPreloader, setShowPreloader] = useState(true);
  const [selectedSymbol, setSelectedSymbol] = useState('XAUUSD');
  const [isMobile, setIsMobile] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [signals, setSignals] = useState<Signal[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [marketStatus, setMarketStatus] = useState<MarketStatus>({
    status: 'OPEN',
    session: 'LONDON',
    sessionName: 'London',
    trend: 'BULLISH',
    volatility: 'HIGH',
    nextSession: 'New York (13:00 UTC)',
    isWeekend: false
  });
  const [isLoadingSignals, setIsLoadingSignals] = useState(true);
  const [isLoadingCourses, setIsLoadingCourses] = useState(true);
  const [isLoadingStatus, setIsLoadingStatus] = useState(true);
  const { settings, loading } = useSettings();
  const { scrollYProgress } = useScroll();

  const hp = settings?.homepage || {};
  const features = hp?.features || [];
  const tools = hp?.tools || [];
  const trustItems = hp?.trust_items || ['Live Data', 'Structured Signals', 'Risk Tools', '100% Free'];
  const ctaBenefits = hp?.cta_benefits || ['No complicated registration', 'No pressure', 'Just join the community'];

  const symbols = ['XAUUSD', 'EURUSD', 'GBPUSD', 'USDJPY'];

  // Fetch market status real-time
  useEffect(() => {
    const fetchMarketStatus = async () => {
      try {
        const res = await fetch('/api/market/status');
        const data = await res.json();
        if (data.success) {
          setMarketStatus(data.data);
        }
      } catch (error) {
        console.error('Error fetching market status:', error);
      } finally {
        setIsLoadingStatus(false);
      }
    };
    fetchMarketStatus();
    const interval = setInterval(fetchMarketStatus, 30000);
    return () => clearInterval(interval);
  }, []);

  // Fetch signals from database
  useEffect(() => {
    const fetchSignals = async () => {
      try {
        const res = await fetch('/api/signals?status=Active');
        const data = await res.json();
        if (data.success) {
          setSignals(data.data.slice(0, 2));
        }
      } catch (error) {
        console.error('Error fetching signals:', error);
      } finally {
        setIsLoadingSignals(false);
      }
    };
    fetchSignals();
  }, []);

  // Fetch courses
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const coursesData = [
          {
            id: '1',
            title: 'Forex Basics',
            description: 'Learn the fundamentals of forex trading, currency pairs, and market structure.',
            level: 'Beginner',
            icon: 'BookOpen',
            lessons: 12,
            duration: '4h 30m'
          },
          {
            id: '2',
            title: 'Technical Analysis',
            description: 'Master chart patterns, indicators, and price action strategies.',
            level: 'Intermediate',
            icon: 'TrendingUp',
            lessons: 18,
            duration: '6h 15m'
          },
          {
            id: '3',
            title: 'Trading Psychology',
            description: 'Master your emotions, develop discipline, and build a winning mindset.',
            level: 'Advanced',
            icon: 'Brain',
            lessons: 8,
            duration: '2h 30m'
          }
        ];
        setCourses(coursesData);
      } catch (error) {
        console.error('Error fetching courses:', error);
      } finally {
        setIsLoadingCourses(false);
      }
    };
    fetchCourses();
  }, []);

  // 3D transform saat scroll
  const scale3D = useTransform(scrollYProgress, [0, 0.2], [1, 0.5]);
  const opacity3D = useTransform(scrollYProgress, [0, 0.2], [1, 0.2]);
  const y3D = useTransform(scrollYProgress, [0, 0.2], [0, -50]);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handlePreloaderComplete = useCallback(() => {
    setShowPreloader(false);
    setIsLoaded(true);
  }, []);

  const telegramLink = loading ? 'https://t.me/swfxglobal' : settings?.telegram_link || 'https://t.me/swfxglobal';
  const heroCtaLink = loading ? 'https://t.me/swfxglobal' : settings?.hero_cta_link || 'https://t.me/swfxglobal';
  const enable3D = true;

  const courseStats = {
    courses: courses.length || 0,
    lessons: courses.reduce((sum: number, c: any) => sum + (c.lessons || 0), 0),
    students: 0,
  };

  const levelColors: Record<string, string> = {
    'Beginner': 'bg-[#39FF88]/20 text-[#39FF88]',
    'Intermediate': 'bg-[#F5A623]/20 text-[#F5A623]',
    'Advanced': 'bg-[#FF4D5F]/20 text-[#FF4D5F]'
  };

  return (
    <>
      <CustomCursor />
      {showPreloader && <Preloader onComplete={handlePreloaderComplete} minDuration={600} />}

      <Navbar />
      <main className="overflow-x-hidden">
        {/* ===== HERO WITH 3D ===== */}
        <Section
          background="primary"
          padding="md"
          className="min-h-screen flex items-center pt-16 md:pt-20 relative overflow-hidden"
        >
          <motion.div 
            className="absolute inset-0 z-0"
            style={{ 
              scale: scale3D,
              opacity: opacity3D,
              y: y3D,
              transformOrigin: 'center center'
            }}
          >
            {isLoaded && (
              <Suspense fallback={null}>
                <UltimateHero3D />
              </Suspense>
            )}
          </motion.div>

          <div className="absolute inset-0 z-1 bg-gradient-to-b from-transparent via-transparent to-[#080A0D]/95" />
          <div className="absolute inset-0 z-1 bg-gradient-to-r from-[#080A0D]/60 via-transparent to-[#080A0D]/40" />

          <Container className="relative z-10 px-4">
            <div className="grid grid-cols-1 gap-6 md:gap-8 lg:grid-cols-2">
              {/* Left Content */}
              <div className="flex flex-col justify-center">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="inline-flex items-center gap-2 mb-3 md:mb-6"
                >
                  <span className="text-[10px] md:text-xs font-medium tracking-[0.15em] text-[#39FF88] uppercase flex items-center gap-2">
                    <Sparkles size={isMobile ? 12 : 14} />
                    SWFX — Suka Wedana Forex
                  </span>
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-[1.05]"
                >
                  <span className="text-[#F5F7FA]">Trade The</span>
                  <br />
                  <span className="text-gradient-premium">Market.</span>
                  <br />
                  <span className="text-[#F5F7FA]">Not Your</span>
                  <br />
                  <span className="text-[#F5F7FA]">Emotions.</span>
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="mt-3 md:mt-6 text-sm md:text-base lg:text-xl text-[#8B949E] max-w-lg"
                >
                  Real-time market intelligence, structured setups, professional analysis 
                  and powerful trading tools — built for traders who want to trade with a plan.
                </motion.p>

                {/* CTA Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.3 }}
                  className="mt-4 md:mt-8 flex flex-wrap gap-3"
                >
                  <MagneticButton>
                    <motion.a
                      href={heroCtaLink || telegramLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                      className="inline-flex items-center gap-2 px-5 py-3 md:px-7 md:py-4 bg-[#39FF88] text-[#080A0D] font-bold rounded-xl hover:bg-[#39FF88]/90 transition-all shadow-2xl shadow-[#39FF88]/30 text-sm md:text-base"
                    >
                      {hp?.hero_cta_text || 'JOIN SWFX FREE'}
                      <Send size={isMobile ? 16 : 20} />
                    </motion.a>
                  </MagneticButton>
                  <a href="#features" className="inline-flex items-center gap-2 px-5 py-3 md:px-7 md:py-4 bg-white/5 text-[#F5F7FA] font-semibold rounded-xl hover:bg-white/10 transition-all border border-white/10 text-sm md:text-base">
                    {hp?.hero_cta_secondary || 'EXPLORE PLATFORM'}
                    <ArrowRight size={isMobile ? 16 : 20} />
                  </a>
                </motion.div>

                {/* Market Status */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.4 }}
                  className="mt-4 md:mt-6 flex flex-wrap gap-3 md:gap-4"
                >
                  {isLoadingStatus ? (
                    <div className="flex items-center gap-2 bg-white/5 backdrop-blur-sm rounded-lg px-3 py-1.5 md:px-4 md:py-2 border border-white/5">
                      <Loader2 size={12} className="text-[#39FF88] animate-spin" />
                      <span className="text-[10px] md:text-xs text-text-muted">Loading...</span>
                    </div>
                  ) : (
                    <>
                      <div className="flex items-center gap-2 bg-white/5 backdrop-blur-sm rounded-lg px-3 py-1.5 md:px-4 md:py-2 border border-white/5">
                        <span className="text-[10px] md:text-xs text-text-muted">MARKET</span>
                        <span className={`text-[10px] md:text-xs font-bold ${marketStatus.status === 'OPEN' ? 'text-[#39FF88]' : 'text-[#FF4D5F]'}`}>
                          {marketStatus.status}
                        </span>
                        {marketStatus.sessionName && (
                          <span className="text-[10px] text-text-muted">· {marketStatus.sessionName}</span>
                        )}
                      </div>
                      <div className="flex items-center gap-2 bg-white/5 backdrop-blur-sm rounded-lg px-3 py-1.5 md:px-4 md:py-2 border border-white/5">
                        <span className="text-[10px] md:text-xs text-text-muted">TREND</span>
                        <span className={`text-[10px] md:text-xs font-bold ${
                          marketStatus.trend === 'BULLISH' ? 'text-[#39FF88]' : 'text-[#FF4D5F]'
                        }`}>
                          {marketStatus.trend}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 bg-white/5 backdrop-blur-sm rounded-lg px-3 py-1.5 md:px-4 md:py-2 border border-white/5">
                        <span className="text-[10px] md:text-xs text-text-muted">VOLATILITY</span>
                        <span className={`text-[10px] md:text-xs font-bold ${
                          marketStatus.volatility === 'HIGH' ? 'text-[#FF4D5F]' :
                          marketStatus.volatility === 'MEDIUM' ? 'text-[#F5A623]' : 'text-[#39FF88]'
                        }`}>
                          {marketStatus.volatility}
                        </span>
                      </div>
                    </>
                  )}
                </motion.div>

                {/* Trust Strip */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.5 }}
                  className="mt-4 md:mt-6 flex flex-wrap gap-2 md:gap-3"
                >
                  {trustItems.map((item: string, index: number) => {
                    const iconMapTrust: Record<string, any> = {
                      'Live Data': Globe,
                      'Structured Signals': Target,
                      'Risk Tools': Shield,
                      '100% Free': Crown
                    };
                    const Icon = iconMapTrust[item] || Crown;
                    return (
                      <div key={index} className="flex items-center gap-1 bg-white/5 backdrop-blur-sm rounded-lg px-2 py-1 md:px-3 md:py-1.5 border border-white/5">
                        <Icon className="text-[#39FF88] flex-shrink-0" size={isMobile ? 10 : 12} />
                        <span className="text-[8px] md:text-[9px] text-[#F5F7FA] font-medium">{item}</span>
                      </div>
                    );
                  })}
                </motion.div>
              </div>

              {/* Right Content - TradingView Chart Widget */}
              <div className="flex flex-col order-1 lg:order-2">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] md:text-xs text-[#8B949E] flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#39FF88] animate-pulse" />
                    Live Chart
                  </span>
                  <div className="flex gap-0.5 md:gap-1 flex-wrap">
                    {symbols.map((s) => (
                      <button
                        key={s}
                        onClick={() => setSelectedSymbol(s)}
                        className={`px-1.5 py-0.5 md:px-2 md:py-0.5 text-[8px] md:text-[10px] font-medium rounded transition-all duration-300 touch-target ${
                          selectedSymbol === s
                            ? 'bg-[#39FF88]/20 text-[#39FF88]'
                            : 'text-[#8B949E] hover:text-[#F5F7FA]'
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="rounded-xl border border-white/5 overflow-hidden shadow-2xl shadow-[#39FF88]/5 bg-[#0D1117]">
                  <TradingViewChart
                    symbol={`OANDA:${selectedSymbol}`}
                    height={isMobile ? 300 : 450}
                    containerClassName="rounded-xl"
                  />
                </div>
                <p className="mt-1 text-[8px] md:text-[10px] text-[#4B5563] text-right">
                  Powered by TradingView
                </p>
              </div>
            </div>
          </Container>
        </Section>

        {/* ===== TICKER ===== */}
        {settings?.enable_market_ticker !== 'false' && (
          <div className="border-y border-white/5 bg-[#0D1117]/30 py-1.5 md:py-2 overflow-hidden">
            <TradingViewTicker />
          </div>
        )}

        {/* ===== FEATURES ===== */}
        <Section background="primary" padding="md" className="py-10 md:py-16" id="features">
          <Container>
            <div className="text-center max-w-3xl mx-auto mb-8 md:mb-12 px-4">
              <span className="text-[10px] md:text-xs font-medium tracking-[0.15em] text-[#39FF88] uppercase flex items-center justify-center gap-2">
                <Rocket size={14} />
                Features
              </span>
              <Heading as="h2" className="mt-1 md:mt-2 text-2xl md:text-4xl">
                {hp?.features_title || 'Everything You Need To Trade Smarter'}
              </Heading>
              <Text className="mt-2 text-text-secondary text-sm md:text-base">
                {hp?.features_subtitle || 'A complete trading ecosystem — all in one place'}
              </Text>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 px-4">
              {features.map((item: any, index: number) => {
                const Icon = iconMap[item?.icon || 'Globe'] || Globe;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    viewport={{ once: true }}
                    whileHover={{ y: -6, scale: 1.01 }}
                    className="bg-[#0D1117] border border-[rgba(255,255,255,0.08)] rounded-2xl p-4 md:p-6 hover:border-[#39FF88]/30 hover:shadow-lg hover:shadow-[#39FF88]/5 transition-all duration-500"
                  >
                    <div className="inline-flex p-2 md:p-3 rounded-lg bg-[#39FF88]/10 mb-3">
                      <Icon className="text-[#39FF88]" size={20} />
                    </div>
                    <h3 className="font-semibold text-text-primary text-sm md:text-base">{item?.title || 'Feature'}</h3>
                    <p className="mt-1 text-xs md:text-sm text-text-muted">{item?.description || ''}</p>
                  </motion.div>
                );
              })}
            </div>
          </Container>
        </Section>

        {/* ===== READ PLAN EXECUTE - Gabungan ===== */}
        <Section background="surface" padding="md" className="py-10 md:py-16 border-t border-[rgba(255,255,255,0.05)]">
          <Container>
            <div className="max-w-5xl mx-auto px-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
                {/* Left - Philosophy */}
                <div>
                  <span className="text-[10px] md:text-xs font-medium tracking-[0.15em] text-[#39FF88] uppercase flex items-center gap-2">
                    <Brain size={14} />
                    {hp?.philosophy_title || 'Not Just Another Signal Group'}
                  </span>
                  <Heading as="h2" className="mt-2 text-2xl md:text-4xl">
                    <span className="text-[#39FF88]">READ.</span>
                    <br />
                    <span className="text-[#39FF88]">PLAN.</span>
                    <br />
                    <span className="text-[#F5F7FA]">EXECUTE.</span>
                  </Heading>
                  <p className="mt-4 text-text-secondary text-sm md:text-base">
                    We don't want you to blindly follow trades. We want you to understand 
                    <span className="text-[#39FF88]"> why</span> the trade exists.
                  </p>
                  <div className="mt-6 space-y-4">
                    {[
                      { 
                        label: hp?.philosophy_read_label || 'READ', 
                        desc: hp?.philosophy_read_desc || 'Market structure · Liquidity · Key levels', 
                        icon: BookOpen, 
                        color: '#39FF88' 
                      },
                      { 
                        label: hp?.philosophy_plan_label || 'PLAN', 
                        desc: hp?.philosophy_plan_desc || 'Entry · Invalidation · Risk · Target', 
                        icon: Target, 
                        color: '#F5A623' 
                      },
                      { 
                        label: hp?.philosophy_execute_label || 'EXECUTE', 
                        desc: hp?.philosophy_execute_desc || 'Follow the plan · Control emotion · Manage risk', 
                        icon: Zap, 
                        color: '#FF4D5F' 
                      },
                    ].map((item, index) => {
                      const Icon = item.icon;
                      return (
                        <div key={index} className="flex items-start gap-3">
                          <div className="p-1.5 rounded-full" style={{ backgroundColor: `${item.color}20`, marginTop: '2px' }}>
                            <Icon size={14} style={{ color: item.color }} />
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-text-primary">{item.label}</p>
                            <p className="text-xs text-text-muted">{item.desc}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Right - Signal Preview */}
                <div className="bg-[#0D1117] border border-[rgba(255,255,255,0.08)] rounded-2xl p-4 md:p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-[#39FF88] text-xs font-medium">LATEST SETUPS</span>
                    <span className="text-[10px] text-text-muted">From Database</span>
                  </div>
                  <div className="space-y-4">
                    {isLoadingSignals ? (
                      <div className="flex justify-center py-4">
                        <Loader2 size={20} className="text-[#39FF88] animate-spin" />
                      </div>
                    ) : signals.length === 0 ? (
                      <div className="text-center py-4 text-text-muted">
                        <p className="text-sm">No active signals</p>
                        <p className="text-xs">Check back later</p>
                      </div>
                    ) : (
                      signals.map((signal, index) => (
                        <div key={index} className="bg-[#121820] rounded-lg p-3 border border-[rgba(255,255,255,0.05)] hover:border-[#39FF88]/20 transition-all duration-300">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <span className="font-mono font-bold text-text-primary">{signal.pair}</span>
                              <span className={`text-xs font-medium px-2 py-0.5 rounded ${
                                signal.direction === 'Buy' 
                                  ? 'bg-[#39FF88]/20 text-[#39FF88]' 
                                  : 'bg-[#FF4D5F]/20 text-[#FF4D5F]'
                              }`}>
                                {signal.direction}
                              </span>
                            </div>
                            <span className="text-xs text-text-muted">Entry: {signal.entry}</span>
                          </div>
                          <div className="flex items-center gap-3 mt-1 text-xs text-text-muted">
                            <span>SL: {signal.sl}</span>
                            <span>TP1: {signal.tp1}</span>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                  <div className="mt-4 flex flex-wrap gap-3">
                    <a href="/signals" className="text-xs text-[#39FF88] hover:underline flex items-center gap-1">
                      View All Signals <ArrowRight size={12} />
                    </a>
                    <a href={telegramLink} target="_blank" rel="noopener noreferrer" className="text-xs text-[#F5A623] hover:underline flex items-center gap-1">
                      Join Telegram <Send size={12} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </Section>

        {/* ===== FREE TOOLS ===== */}
        <Section background="primary" padding="md" className="py-10 md:py-16 border-t border-[rgba(255,255,255,0.05)]">
          <Container>
            <div className="text-center max-w-3xl mx-auto mb-8 md:mb-12 px-4">
              <span className="text-[10px] md:text-xs font-medium tracking-[0.15em] text-[#39FF88] uppercase flex items-center justify-center gap-2">
                <Calculator size={14} />
                Tools
              </span>
              <Heading as="h2" className="mt-1 md:mt-2 text-2xl md:text-4xl">
                {hp?.tools_title || 'Plan Your Trade Before You Place It'}
              </Heading>
              <Text className="mt-2 text-text-secondary text-sm md:text-base">
                {hp?.tools_subtitle || '8 professional trading tools — completely free'}
              </Text>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 md:gap-4 px-4">
              {tools.map((tool: any, index: number) => {
                const Icon = iconMap[tool?.icon || 'Calculator'] || Calculator;
                return (
                  <motion.div 
                    key={index} 
                    whileHover={{ y: -4, scale: 1.02 }}
                    className="bg-[#0D1117] border border-[rgba(255,255,255,0.08)] rounded-xl p-3 md:p-4 text-center hover:border-[#39FF88]/30 hover:shadow-lg hover:shadow-[#39FF88]/5 transition-all duration-300 cursor-pointer"
                  >
                    <Icon className="mx-auto text-[#39FF88]" size={24} />
                    <p className="text-xs font-medium text-text-primary mt-2">{tool?.label || 'Tool'}</p>
                  </motion.div>
                );
              })}
            </div>

            <div className="text-center mt-4 md:mt-6">
              <a href="/tools" className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#39FF88]/10 text-[#39FF88] border border-[#39FF88]/20 rounded-xl hover:bg-[#39FF88]/20 transition-all duration-300 text-sm">
                +4 More Free Tools <ArrowRight size={14} />
              </a>
            </div>
          </Container>
        </Section>

        {/* ===== EDUCATION ===== */}
        <Section background="surface" padding="md" className="py-10 md:py-16 border-t border-[rgba(255,255,255,0.05)]">
          <Container>
            <div className="text-center max-w-3xl mx-auto mb-6 md:mb-10 px-4">
              <span className="text-[10px] md:text-xs font-medium tracking-[0.15em] text-[#39FF88] uppercase flex items-center justify-center gap-2">
                <BookOpen size={14} />
                Education
              </span>
              <Heading as="h2" className="mt-1 md:mt-2 text-2xl md:text-4xl">
                {hp?.education_title || "Don't Just Follow the Trade. Understand Why."}
              </Heading>
              <Text className="mt-2 text-text-secondary text-sm md:text-base">
                {courseStats.courses} Courses · {courseStats.lessons} Lessons
              </Text>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 px-4">
              {isLoadingCourses ? (
                <div className="col-span-3 flex justify-center py-8">
                  <Loader2 size={24} className="text-[#39FF88] animate-spin" />
                </div>
              ) : courses.length === 0 ? (
                <div className="col-span-3 text-center text-text-muted py-8">
                  <BookOpen size={32} className="mx-auto text-text-muted/30" />
                  <p className="mt-2 text-sm">No courses available yet</p>
                  <p className="text-xs">Check back later for educational content</p>
                </div>
              ) : (
                courses.map((course: any, index: number) => {
                  const Icon = iconMap[course?.icon || 'BookOpen'] || BookOpen;
                  return (
                    <motion.div 
                      key={index} 
                      whileHover={{ y: -4 }}
                      className="bg-[#0D1117] border border-[rgba(255,255,255,0.08)] rounded-xl p-4 md:p-6 hover:border-[#39FF88]/30 transition-all duration-300"
                    >
                      <div className="flex items-start gap-3">
                        <div className="p-2 rounded-lg bg-[#39FF88]/10">
                          <Icon className="text-[#39FF88]" size={20} />
                        </div>
                        <div>
                          <h3 className="font-semibold text-text-primary text-sm md:text-base">{course?.title || 'Course'}</h3>
                          <p className="text-xs text-text-muted mt-0.5 line-clamp-2">{course?.description || ''}</p>
                          <div className="mt-2 flex items-center gap-2">
                            <span className={`text-[10px] font-medium px-2 py-0.5 rounded ${
                              levelColors[course?.level || 'Beginner'] || 'bg-[#39FF88]/20 text-[#39FF88]'
                            }`}>
                              {course?.level || 'Beginner'}
                            </span>
                            <span className="text-[10px] text-text-muted">{course?.lessons || 0} lessons</span>
                            <span className="text-[10px] text-text-muted">{course?.duration || ''}</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })
              )}
            </div>

            <div className="text-center mt-4 md:mt-6">
              <a href="/learn" className="inline-flex items-center gap-2 text-sm text-[#39FF88] hover:text-[#39FF88]/80 transition-colors">
                Explore All Courses <ArrowRight size={14} />
              </a>
            </div>
          </Container>
        </Section>

        {/* ===== HARD CTA ===== */}
        <Section background="primary" padding="md" className="py-12 md:py-20 border-t border-[rgba(255,255,255,0.05)]">
          <Container>
            <div className="max-w-3xl mx-auto text-center px-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#39FF88]/10 border border-[#39FF88]/20 mb-4">
                  <Flame size={14} className="text-[#39FF88]" />
                  <span className="text-xs font-medium text-[#39FF88]">Join Free</span>
                </div>

                <Heading as="h2" className="text-3xl md:text-5xl lg:text-6xl leading-[1.1]">
                  {hp?.cta_title || 'Stop Trading Alone.'}
                </Heading>
                <p className="mt-4 text-lg md:text-xl text-text-secondary max-w-2xl mx-auto">
                  {hp?.cta_subtitle || 'Get market analysis, structured setups, trading education and professional tools — all in one place.'}
                </p>

                <div className="mt-6 md:mt-10">
                  <MagneticButton>
                    <motion.a
                      href={telegramLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                      className="inline-flex items-center gap-2 px-8 py-4 md:px-10 md:py-5 bg-[#39FF88] text-[#080A0D] font-bold rounded-xl hover:bg-[#39FF88]/90 transition-all shadow-2xl shadow-[#39FF88]/30 text-base md:text-lg"
                    >
                      {hp?.cta_button || 'JOIN SWFX FREE'}
                      <Send size={isMobile ? 16 : 20} />
                    </motion.a>
                  </MagneticButton>
                </div>

                <div className="mt-4 flex flex-wrap justify-center gap-4 text-xs text-text-muted">
                  {ctaBenefits.map((benefit: string, index: number) => (
                    <span key={index} className="flex items-center gap-1">
                      <CheckCircle size={12} className="text-[#39FF88]" />
                      {benefit}
                    </span>
                  ))}
                </div>
              </motion.div>
            </div>
          </Container>
        </Section>

        {/* ===== FINAL ===== */}
        <Section background="primary" padding="md" border>
          <Container>
            <div className="text-center px-4 py-4 md:py-8">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, type: 'spring', stiffness: 300 }}
                viewport={{ once: true }}
              >
                <Heading as="h2" className="text-3xl md:text-6xl lg:text-7xl leading-[1.05]">
                  READ.
                  <br />
                  PLAN.
                  <br />
                  <span className="text-[#39FF88]">EXECUTE.</span>
                </Heading>

                <div className="mt-4 md:mt-6">
                  <span className="text-xl md:text-2xl font-bold tracking-tight text-[#F5F7FA]">
                    {settings?.site_name || 'SWFX'}
                  </span>
                  <p className="text-xs md:text-sm text-[#8B949E]">Suka Wedana Forex</p>
                  <p className="text-xs text-[#8B949E]/60 mt-1">Real-Time Market Intelligence for Disciplined Traders</p>
                </div>

                <div className="mt-4 md:mt-6">
                  <MagneticButton>
                    <motion.a
                      href={telegramLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                    >
                      <Button variant="primary" size={isMobile ? 'md' : 'lg'}>
                        {hp?.cta_button || 'JOIN SWFX FREE'}
                        <Send size={isMobile ? 14 : 18} />
                      </Button>
                    </motion.a>
                  </MagneticButton>
                </div>
              </motion.div>
            </div>
          </Container>
        </Section>
      </main>

      <Footer />
    </>
  );
}
