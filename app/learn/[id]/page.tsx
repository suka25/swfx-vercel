'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { Heading, Text } from '@/components/ui/Typography';
import { Button } from '@/components/ui/Button';
import { Navbar } from '@/components/layout/Navigation/Navbar';
import { Footer } from '@/components/layout/Footer/Footer';
import { CoursePlayer } from '@/components/course/CoursePlayer';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BookOpen, 
  TrendingUp, 
  Target, 
  Shield, 
  Brain, 
  Activity, 
  LineChart,
  Play,
  FileText,
  Clock,
  CheckCircle,
  ArrowLeft,
  Users,
  Award,
  Star,
  Download,
  Share2,
  ChevronDown,
  ChevronUp,
  X,
  Check,
  AlertCircle,
  ExternalLink,
  Loader2
} from 'lucide-react';

interface Course {
  id: string;
  title: string;
  description: string;
  icon: any;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  lessons: number;
  duration: string;
  longDescription?: string;
  whatYouLearn?: string[];
  prerequisites?: string[];
  instructor?: string;
  rating?: number;
  students?: number;
  lastUpdated?: string;
  curriculum?: { title: string; duration: string; content: string; keyPoints?: string[]; example?: string }[];
}

const coursesData: Record<string, Course> = {
  '1': {
    id: '1',
    title: 'Forex Basics',
    description: 'Learn the fundamentals of forex trading, currency pairs, and market structure.',
    icon: BookOpen,
    level: 'Beginner',
    lessons: 12,
    duration: '4h 30m',
    longDescription: 'This comprehensive course covers everything you need to know to start trading forex. From understanding currency pairs to reading quotes, you will build a solid foundation.',
    whatYouLearn: [
      'What is Forex and how it works',
      'Understanding currency pairs and quotes',
      'Major, minor, and exotic pairs',
      'Market participants and their roles',
      'How to read forex charts',
      'Basic trading terminology',
      'Introduction to trading platforms',
      'How to open a demo account'
    ],
    prerequisites: ['No prior experience needed', 'Basic understanding of finance'],
    instructor: 'SWFX Trading Team',
    rating: 4.8,
    students: 1247,
    lastUpdated: 'January 2025',
    curriculum: [
      { 
        title: 'Introduction to Forex', 
        duration: '25:00',
        content: 'Forex (Foreign Exchange) is the largest financial market in the world, with a daily trading volume exceeding $6 trillion. Unlike stock markets, forex operates 24 hours a day, 5 days a week, allowing traders to participate at any time.\n\nThe forex market is decentralized, meaning there is no central exchange. Instead, trading occurs electronically over-the-counter (OTC) through a global network of banks, financial institutions, and individual traders.\n\nKey characteristics of the forex market:\n• High liquidity - You can enter and exit positions easily\n• Leverage - Trade with more capital than you actually have\n• 24/5 trading - Trade anytime from Sunday evening to Friday evening\n• Low barriers to entry - Start with small capital',
        keyPoints: [
          'Forex is the largest financial market globally',
          'Decentralized OTC market with no central exchange',
          '24/5 trading schedule from Sunday to Friday',
          'High liquidity allows easy entry and exit'
        ],
        example: 'Example: When you travel abroad and exchange your money, you are participating in the forex market. The exchange rate you see at the money changer is a forex quote.'
      },
      { 
        title: 'Currency Pairs Explained', 
        duration: '30:00',
        content: 'In forex trading, currencies are always traded in pairs. The first currency is the base currency, and the second is the quote currency.\n\nFor example, in EUR/USD:\n• EUR is the base currency\n• USD is the quote currency\n• If EUR/USD = 1.1000, it means 1 EUR = 1.1000 USD\n\nCurrency pairs are categorized into three groups:\n\nMajor Pairs:\n• EUR/USD (Euro / US Dollar)\n• USD/JPY (US Dollar / Japanese Yen)\n• GBP/USD (British Pound / US Dollar)\n• USD/CHF (US Dollar / Swiss Franc)\n\nMinor Pairs (Crosses):\n• EUR/GBP (Euro / British Pound)\n• EUR/JPY (Euro / Japanese Yen)\n• GBP/JPY (British Pound / Japanese Yen)\n\nExotic Pairs:\n• USD/TRY (US Dollar / Turkish Lira)\n• USD/SGD (US Dollar / Singapore Dollar)\n• EUR/TRY (Euro / Turkish Lira)',
        keyPoints: [
          'Currencies are traded in pairs (base/quote)',
          'Major pairs are the most liquid',
          'Minor pairs don\'t include USD',
          'Exotic pairs include emerging market currencies'
        ],
        example: 'Example: If you see GBP/USD = 1.2500, it means 1 British Pound equals 1.2500 US Dollars. If you buy GBP/USD, you are buying GBP and selling USD.'
      },
      { 
        title: 'How to Read Quotes', 
        duration: '20:00',
        content: 'Forex quotes consist of two prices: the bid and the ask.\n\nBid Price: The price at which you can sell the base currency\nAsk Price: The price at which you can buy the base currency\nThe difference between the bid and ask is called the spread.\n\nExample: EUR/USD = 1.1000 / 1.1003\n• Bid = 1.1000 (sell EUR)\n• Ask = 1.1003 (buy EUR)\n• Spread = 0.0003 (3 pips)\n\nUnderstanding Pips:\n• A pip is the smallest price move in forex\n• For most pairs, 1 pip = 0.0001 (4 decimal places)\n• For JPY pairs, 1 pip = 0.01 (2 decimal places)\n\nCalculating Profit/Loss:\n• If you buy EUR/USD at 1.1000 and sell at 1.1020\n• Profit = 20 pips\n• Profit in USD = 20 × (lot size × 10)',
        keyPoints: [
          'Bid = sell price, Ask = buy price',
          'Spread is the difference between bid and ask',
          'Pips measure price movement',
          'Profit/Loss is calculated in pips'
        ],
        example: 'Example: You buy 1 standard lot (100,000 units) of EUR/USD at 1.1000 and sell at 1.1020. Your profit is 20 pips × $10 = $200.'
      },
      { 
        title: 'Market Participants', 
        duration: '35:00',
        content: 'The forex market has many different participants, each with different goals and timeframes:\n\n1. Central Banks (e.g., Federal Reserve, ECB, BOJ)\n• Control monetary policy\n• Can intervene to stabilize currency\n• Largest players in the market\n\n2. Commercial Banks\n• Execute trades for clients\n• Trade for their own profit\n• Provide liquidity to the market\n\n3. Hedge Funds\n• Trade for profit\n• Use various strategies\n• Can move markets with large positions\n\n4. Corporations\n• Hedge currency risk\n• Exchange for international business\n• Not primarily profit-driven\n\n5. Retail Traders\n• Individual traders like you\n• Trade for profit\n• Make up a small percentage of volume\n\n6. Brokers\n• Connect traders to the market\n• Provide trading platforms\n• Make money from spreads and commissions',
        keyPoints: [
          'Central banks are the largest players',
          'Commercial banks provide liquidity',
          'Hedge funds trade for profit',
          'Retail traders are individuals'
        ],
        example: 'Example: When the Federal Reserve raises interest rates, it can cause the US Dollar to strengthen against other currencies.'
      },
      { 
        title: 'Chart Reading Basics', 
        duration: '40:00',
        content: 'Charts are the primary tool for analyzing forex markets. The three main types are:\n\n1. Line Charts\n• Simplest type\n• Connects closing prices\n• Shows overall trend\n\n2. Bar Charts\n• Shows open, high, low, close (OHLC)\n• Vertical bar shows range\n• Horizontal lines show open and close\n\n3. Candlestick Charts (Most Popular)\n• Each candle shows OHLC\n• Green/White = Bullish (close > open)\n• Red/Black = Bearish (close < open)\n• Body = between open and close\n• Wick/Shadow = high and low\n\nTimeframes:\n• M1 (1 minute) - For scalping\n• M5, M15 - For day trading\n• H1, H4 - For swing trading\n• D1, W1 - For position trading\n\nKey Chart Patterns:\n• Support and Resistance\n• Trend lines\n• Breakouts',
        keyPoints: [
          'Three main chart types: line, bar, candlestick',
          'Candlesticks are most popular',
          'Different timeframes for different strategies',
          'Support/Resistance are key levels'
        ],
        example: 'Example: A bullish engulfing candlestick pattern occurs when a large green candle completely engulfs the previous red candle, suggesting a potential reversal to the upside.'
      },
      { 
        title: 'Trading Terminology', 
        duration: '25:00',
        content: 'Essential forex terms every trader must know:\n\n• Long - Buying a currency expecting it to rise\n• Short - Selling a currency expecting it to fall\n• Pip - Percentage in point, smallest price move\n• Spread - Difference between bid and ask\n• Leverage - Borrowed capital to increase position size\n• Margin - Collateral required for leveraged trades\n• Lot - Standard unit of trading (100,000 units)\n• Stop Loss - Order to close at a loss limit\n• Take Profit - Order to close at a profit target\n• Slippage - Difference between expected and actual execution\n• Gap - Price jump between sessions\n• Volatility - Measure of price fluctuations\n\nMarket Sessions:\n• Asian Session - Tokyo (00:00-09:00 GMT)\n• London Session - London (08:00-17:00 GMT)\n• New York Session - New York (13:00-22:00 GMT)',
        keyPoints: [
          'Long = Buy, Short = Sell',
          'Leverage amplifies both profits and losses',
          'Different sessions have different characteristics',
          'Stop Loss and Take Profit are essential risk management tools'
        ],
        example: 'Example: You go long (buy) EUR/USD with 1:100 leverage. A 1% movement in price results in a 100% change in your account balance.'
      },
      { 
        title: 'Platform Overview', 
        duration: '30:00',
        content: 'Popular trading platforms used by forex traders:\n\n1. MetaTrader 4 (MT4)\n• Most popular platform\n• User-friendly interface\n• Built-in indicators and tools\n• Expert Advisors (EAs) for automation\n• Available on desktop, web, and mobile\n\n2. MetaTrader 5 (MT5)\n• Advanced version of MT4\n• More timeframes and indicators\n• Additional order types\n• Better backtesting\n\n3. TradingView\n• Web-based platform\n• Social trading features\n• Pine Script for custom indicators\n• Excellent charting tools\n\n4. cTrader\n• Fast execution\n• Advanced order management\n• Clear fee structure\n• Modern interface\n\nKey Platform Features:\n• Order placement (Market, Limit, Stop)\n• Charting tools\n• Technical indicators\n• Risk management tools\n• Mobile trading\n• Account management',
        keyPoints: [
          'MT4 is the most popular platform',
          'TradingView has excellent charting',
          'Mobile trading is essential for modern traders',
          'Choose a platform that fits your trading style'
        ],
        example: 'Example: In MT4, you can place a buy stop order above resistance. If price breaks through, your order will automatically execute.'
      },
      { 
        title: 'Demo Account Setup', 
        duration: '15:00',
        content: 'A demo account is a risk-free way to practice trading with virtual money. Here\'s how to set one up:\n\nStep 1: Choose a Broker\n• Research regulated brokers\n• Check spreads and fees\n• Read reviews\n\nStep 2: Register\n• Fill in personal details\n• Verify email address\n• Choose account type\n\nStep 3: Download Platform\n• Choose desktop, web, or mobile\n• Install and login\n\nStep 4: Start Trading\n• Explore the interface\n• Place some test trades\n• Practice risk management\n\nBenefits of Demo Trading:\n• No financial risk\n• Learn platform features\n• Test strategies\n• Build confidence\n\nImportant: Treat demo trading as you would real trading. Use proper risk management and follow your strategy.\n\nCommon Mistakes on Demo:\n• Taking excessive risk\n• Not using stop losses\n• Trading without a strategy\n• Getting emotional with virtual money',
        keyPoints: [
          'Demo accounts are free and risk-free',
          'Practice with virtual money',
          'Learn the platform before trading real money',
          'Treat demo as if it were real'
        ],
        example: 'Example: Many brokers offer demo accounts with $10,000 or $100,000 virtual balance. Start with this to test your strategies before risking real capital.'
      },
      { 
        title: 'First Trade Simulation', 
        duration: '30:00',
        content: 'Let\'s walk through your first simulated trade step by step:\n\nStep 1: Market Analysis\n• Check the trend (is it up or down?)\n• Look at support and resistance levels\n• Check economic calendar for news\n• Review your trading strategy\n\nStep 2: Trade Setup\n• Identify entry point\n• Set stop loss (risk management)\n• Set take profit (reward target)\n• Calculate position size\n\nExample Trade Setup:\nPair: EUR/USD\nDirection: Long (Buy)\nEntry: 1.1000\nStop Loss: 1.0950 (50 pips)\nTake Profit: 1.1100 (100 pips)\nRisk-Reward: 1:2\nPosition Size: 0.1 lot (1 mini lot)\nRisk: $50\nPotential Profit: $100\n\nStep 3: Execution\n• Place order in platform\n• Monitor position\n• Adjust if needed\n\nStep 4: Exit\n• Take profit hits → celebrate!\n• Stop loss hits → review what went wrong\n• Manual exit → decide when to close\n\nAfter the Trade:\n• Review the outcome\n• Document in trading journal\n• Identify lessons learned',
        keyPoints: [
          'Always plan your trade before entering',
          'Set stop loss to protect your capital',
          'Target a risk-reward ratio of at least 1:2',
          'Review every trade to improve'
        ],
        example: 'Example: You risk $50 to potentially make $100 on EUR/USD with a 1:2 risk-reward ratio. Even if you win only 50% of your trades, you will be profitable.'
      },
      { 
        title: 'Course Summary', 
        duration: '20:00',
        content: 'Congratulations! You\'ve completed the Forex Basics course. Here\'s what you\'ve learned:\n\n1. What is Forex\n• Largest financial market globally\n• Decentralized OTC market\n• 24/5 trading schedule\n\n2. Currency Pairs\n• Major, minor, and exotic pairs\n• Base and quote currencies\n• How to read quotes\n\n3. Market Participants\n• Central banks\n• Commercial banks\n• Hedge funds\n• Retail traders\n\n4. Chart Reading\n• Different chart types\n• Candlestick patterns\n• Support and resistance\n\n5. Trading Terminology\n• Long, short, pips, spread\n• Leverage and margin\n• Orders and positions\n\n6. Platforms\n• MT4, MT5, TradingView\n• Mobile trading\n\n7. Demo Trading\n• Risk-free practice\n• Platform familiarization\n\nNext Steps:\n• Start your demo account\n• Practice what you learned\n• Explore the next course: Technical Analysis\n\nRecommended Resources:\n• TradingView for chart analysis\n• Forex Factory for economic calendar\n• Your broker\'s educational materials\n\nRemember: The journey of a thousand miles begins with a single step. Keep learning and practicing!',
        keyPoints: [
          'You now understand the basics of forex trading',
          'Practice is essential - use a demo account',
          'Continue learning with advanced courses',
          'Develop your trading strategy'
        ],
        example: 'Example: A beginner trader who spends 1 hour per day studying and practicing can become profitable in 6-12 months.'
      }
    ]
  },
  // ... tambahkan course lain dengan content lengkap
};

export default function CourseDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'info' | 'error' } | null>(null);
  const [expandedLessons, setExpandedLessons] = useState<number[]>([]);
  const [isDownloading, setIsDownloading] = useState(false);
  const [showPlayer, setShowPlayer] = useState(false);

  useEffect(() => {
    const id = params.id as string;
    if (id && coursesData[id]) {
      setCourse(coursesData[id]);
    }
    setLoading(false);
  }, [params.id]);

  const showToast = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  const handleStartLearning = () => {
    if (course) {
      setShowPlayer(true);
    }
  };

  const handleClosePlayer = () => {
    setShowPlayer(false);
  };

  const handleDownloadSyllabus = () => {
    setIsDownloading(true);
    setTimeout(() => {
      showToast(`📥 Downloading syllabus for: ${course?.title}`);
      setIsDownloading(false);
      const link = document.createElement('a');
      link.href = `data:text/plain;charset=utf-8,${encodeURIComponent(
        `Course: ${course?.title}\n\nLessons:\n${course?.curriculum?.map((l, i) => `${i+1}. ${l.title} (${l.duration})`).join('\n')}`
      )}`;
      link.download = `${course?.title}-syllabus.txt`;
      link.click();
    }, 1000);
  };

  const handleShare = async () => {
    const url = window.location.href;
    try {
      if (navigator.share) {
        await navigator.share({
          title: course?.title,
          text: `Check out this course: ${course?.title}`,
          url: url,
        });
        showToast('✅ Shared successfully!', 'success');
      } else if (navigator.clipboard) {
        await navigator.clipboard.writeText(url);
        showToast('📋 Link copied to clipboard!', 'success');
      }
    } catch (error) {
      showToast('❌ Failed to share', 'error');
    }
  };

  const handleViewInstructor = () => {
    showToast(`👨‍🏫 Viewing instructor profile: ${course?.instructor}`, 'info');
  };

  const toggleLesson = (index: number) => {
    setExpandedLessons(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center bg-[#080A0D]">
          <div className="flex flex-col items-center gap-3">
            <Loader2 size={32} className="text-[#39FF88] animate-spin" />
            <span className="text-[#8B949E]">Loading course...</span>
          </div>
        </div>
      </>
    );
  }

  if (!course) {
    return (
      <>
        <Navbar />
        <Section background="primary" padding="xl" className="min-h-[80vh] flex items-center">
          <Container>
            <div className="text-center max-w-2xl mx-auto">
              <Heading as="h1" className="text-3xl md:text-5xl">Course Not Found</Heading>
              <Text className="mt-4 text-text-secondary">The course you're looking for doesn't exist.</Text>
              <Button variant="primary" className="mt-6" onClick={() => router.push('/learn')}>
                Back to Learn
              </Button>
            </div>
          </Container>
        </Section>
        <Footer />
      </>
    );
  }

  const Icon = course.icon;
  const levelColors = {
    Beginner: 'bg-[#39FF88]/20 text-[#39FF88]',
    Intermediate: 'bg-[#F5A623]/20 text-[#F5A623]',
    Advanced: 'bg-[#FF4D5F]/20 text-[#FF4D5F]'
  };

  return (
    <>
      <Navbar />
      <main className="pt-16 md:pt-20 overflow-x-hidden">
        {/* Toast Notification */}
        <AnimatePresence>
          {toast && (
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              className="fixed top-24 left-1/2 -translate-x-1/2 z-50 bg-[#0D1117] border border-[rgba(255,255,255,0.08)] rounded-xl px-4 py-3 shadow-2xl shadow-black/50 flex items-center gap-3 min-w-[300px] max-w-[90vw]"
            >
              {toast.type === 'success' && <Check size={18} className="text-[#39FF88] flex-shrink-0" />}
              {toast.type === 'info' && <AlertCircle size={18} className="text-[#F5A623] flex-shrink-0" />}
              {toast.type === 'error' && <X size={18} className="text-[#FF4D5F] flex-shrink-0" />}
              <span className="text-sm text-text-primary">{toast.message}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Course Player Modal */}
        {showPlayer && course && (
          <CoursePlayer
            courseId={course.id}
            courseTitle={course.title}
            lessons={course.curriculum?.map(l => ({ 
              title: l.title, 
              duration: l.duration,
              content: l.content,
              videoUrl: ''
            })) || []}
            onClose={handleClosePlayer}
          />
        )}

        {/* Header */}
        <Section background="primary" padding="md" className="relative overflow-hidden">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-[#080A0D]" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] md:w-[600px] h-[300px] md:h-[500px] bg-[#39FF88]/5 rounded-full blur-3xl" />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#080A0D]/50" />
          </div>

          <Container className="relative z-10 px-4">
            <button
              onClick={() => router.push('/learn')}
              className="flex items-center gap-2 text-sm text-text-muted hover:text-text-primary transition-colors mb-4 group"
            >
              <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
              Back to Courses
            </button>

            <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-6">
              <div className="p-4 rounded-2xl bg-accent-bullish/10">
                <Icon className="text-accent-bullish" size={32} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className={`text-xs font-medium px-3 py-1 rounded-full ${levelColors[course.level]}`}>
                    {course.level}
                  </span>
                  <span className="text-xs text-text-muted flex items-center gap-1">
                    <Clock size={14} />
                    {course.duration}
                  </span>
                  <span className="text-xs text-text-muted flex items-center gap-1">
                    <FileText size={14} />
                    {course.lessons} lessons
                  </span>
                </div>
                <Heading as="h1" className="text-3xl md:text-5xl">{course.title}</Heading>
                <Text className="mt-2 text-text-secondary text-sm md:text-base">{course.longDescription || course.description}</Text>
              </div>
            </div>
          </Container>
        </Section>

        {/* Course Content */}
        <Section background="surface" padding="md">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 px-4">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-6">
                {/* What You Learn */}
                {course.whatYouLearn && (
                  <div className="bg-[#0D1117] border border-[rgba(255,255,255,0.08)] rounded-2xl p-4 md:p-6">
                    <h3 className="text-lg font-semibold text-text-primary flex items-center gap-2">
                      <Target size={20} className="text-accent-bullish" />
                      What You'll Learn
                    </h3>
                    <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-2">
                      {course.whatYouLearn.map((item, index) => (
                        <div key={index} className="flex items-center gap-2 text-sm text-text-secondary">
                          <CheckCircle size={14} className="text-accent-bullish flex-shrink-0" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Curriculum */}
                {course.curriculum && (
                  <div className="bg-[#0D1117] border border-[rgba(255,255,255,0.08)] rounded-2xl p-4 md:p-6">
                    <h3 className="text-lg font-semibold text-text-primary flex items-center gap-2">
                      <BookOpen size={20} className="text-accent-bullish" />
                      Curriculum
                    </h3>
                    <div className="mt-3 space-y-1">
                      {course.curriculum.map((item, index) => {
                        const isExpanded = expandedLessons.includes(index);
                        return (
                          <div 
                            key={index} 
                            className="border-b border-[rgba(255,255,255,0.05)] last:border-0"
                          >
                            <button
                              onClick={() => toggleLesson(index)}
                              className="w-full flex items-center justify-between py-2 hover:bg-white/5 px-2 rounded-lg transition-colors group"
                            >
                              <div className="flex items-center gap-3 text-sm">
                                <span className="text-text-muted text-xs w-6">{String(index + 1).padStart(2, '0')}</span>
                                <span className="text-text-primary group-hover:text-accent-bullish transition-colors">{item.title}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="text-xs text-text-muted">{item.duration}</span>
                                {isExpanded ? (
                                  <ChevronUp size={16} className="text-text-muted" />
                                ) : (
                                  <ChevronDown size={16} className="text-text-muted" />
                                )}
                              </div>
                            </button>
                            <AnimatePresence>
                              {isExpanded && (
                                <motion.div
                                  initial={{ opacity: 0, height: 0 }}
                                  animate={{ opacity: 1, height: 'auto' }}
                                  exit={{ opacity: 0, height: 0 }}
                                  transition={{ duration: 0.2 }}
                                  className="pl-11 pr-2 pb-2"
                                >
                                  <div className="bg-[#121820] rounded-lg p-3 text-sm text-text-secondary whitespace-pre-wrap">
                                    {item.content}
                                    {item.keyPoints && (
                                      <div className="mt-2 p-2 bg-[#1A1F2E] rounded">
                                        <p className="text-xs text-accent-bullish font-semibold">Key Points:</p>
                                        <ul className="text-xs text-text-secondary mt-1 list-disc list-inside">
                                          {item.keyPoints.map((point, i) => (
                                            <li key={i}>{point}</li>
                                          ))}
                                        </ul>
                                      </div>
                                    )}
                                    {item.example && (
                                      <div className="mt-2 p-2 bg-[#1A1F2E] rounded border-l-2 border-accent-bullish">
                                        <p className="text-xs text-accent-bullish font-semibold">Example:</p>
                                        <p className="text-xs text-text-secondary mt-1">{item.example}</p>
                                      </div>
                                    )}
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              {/* Sidebar */}
              <div className="space-y-4">
                <div className="bg-[#0D1117] border border-[rgba(255,255,255,0.08)] rounded-2xl p-4 md:p-6 sticky top-24">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-text-muted">Level</span>
                      <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${levelColors[course.level]}`}>
                        {course.level}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-text-muted">Lessons</span>
                      <span className="text-text-primary font-medium">{course.lessons}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-text-muted">Duration</span>
                      <span className="text-text-primary font-medium">{course.duration}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-text-muted">Students</span>
                      <span className="text-text-primary font-medium">{course.students?.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-text-muted">Rating</span>
                      <span className="text-text-primary font-medium flex items-center gap-1">
                        <Star size={14} className="text-[#F5A623] fill-[#F5A623]" />
                        {course.rating}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-text-muted">Last Updated</span>
                      <span className="text-text-primary font-medium">{course.lastUpdated}</span>
                    </div>
                    {course.prerequisites && (
                      <div className="pt-3 border-t border-[rgba(255,255,255,0.08)]">
                        <p className="text-xs text-text-muted mb-2">Prerequisites</p>
                        {course.prerequisites.map((item, index) => (
                          <p key={index} className="text-xs text-text-secondary flex items-center gap-1">
                            <span className="text-accent-bullish">•</span> {item}
                          </p>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="mt-4 space-y-2">
                    <Button 
                      variant="primary" 
                      size="lg" 
                      fullWidth 
                      className="gap-2"
                      onClick={handleStartLearning}
                    >
                      <Play size={16} />
                      Start Learning
                    </Button>
                    <div className="flex gap-2">
                      <Button 
                        variant="secondary" 
                        size="sm" 
                        fullWidth 
                        className="gap-1"
                        onClick={handleDownloadSyllabus}
                        disabled={isDownloading}
                      >
                        {isDownloading ? (
                          <Loader2 size={14} className="animate-spin" />
                        ) : (
                          <Download size={14} />
                        )}
                        Syllabus
                      </Button>
                      <Button 
                        variant="secondary" 
                        size="sm" 
                        fullWidth 
                        className="gap-1"
                        onClick={handleShare}
                      >
                        <Share2 size={14} />
                        Share
                      </Button>
                    </div>
                  </div>
                </div>

                {course.instructor && (
                  <div className="bg-[#0D1117] border border-[rgba(255,255,255,0.08)] rounded-2xl p-4">
                    <h4 className="text-sm font-semibold text-text-primary flex items-center gap-2">
                      <Users size={16} className="text-accent-bullish" />
                      Instructor
                    </h4>
                    <p className="text-sm text-text-secondary mt-1">{course.instructor}</p>
                    <p className="text-xs text-text-muted">SWFX Trading Education</p>
                    <button 
                      onClick={handleViewInstructor}
                      className="mt-2 text-xs text-accent-bullish hover:underline flex items-center gap-1"
                    >
                      View Profile <ExternalLink size={12} />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </Container>
        </Section>
      </main>
      <Footer />
    </>
  );
}
