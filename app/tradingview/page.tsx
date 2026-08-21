'use client';

import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { Heading, Text } from '@/components/ui/Typography';
import { Button } from '@/components/ui/Button';
import { Navbar } from '@/components/layout/Navigation/Navbar';
import { Footer } from '@/components/layout/Footer/Footer';
import { useSettings } from '@/hooks/useSettings';
import { ExternalLink, BarChart3, TrendingUp, Calendar, User } from 'lucide-react';
import { TELEGRAM_LINK } from '@/data/navigation';

const IDEAS = [
  {
    id: '1',
    title: 'USD/JPY Analysis',
    symbol: 'USDJPY',
    date: 'Sep 15, 2025',
    description: 'Price is currently ranging with strong support around 146.600 – 146.800 (demand zone). A liquidity sweep occurred below support, followed by a bullish rejection.',
    imageUrl: 'https://s3.tradingview.com/2/2Kh421WJ_mid.webp',
    link: 'https://www.tradingview.com/chart/USDJPY/2Kh421WJ-USD-JPY-Analysis/',
  },
  {
    id: '2',
    title: 'Gold Technical Outlook',
    symbol: 'XAUUSD',
    date: 'Sep 14, 2025',
    description: 'Gold is showing bullish momentum with key resistance at 2,050. A break above could open the door to 2,080.',
    imageUrl: 'https://s3.tradingview.com/2/2Kh421WJ_mid.webp',
    link: 'https://www.tradingview.com/chart/XAUUSD/',
  },
  {
    id: '3',
    title: 'EUR/USD Breakout',
    symbol: 'EURUSD',
    date: 'Sep 13, 2025',
    description: 'EUR/USD is approaching a key resistance level. A breakout could signal further upside.',
    imageUrl: 'https://s3.tradingview.com/2/2Kh421WJ_mid.webp',
    link: 'https://www.tradingview.com/chart/EURUSD/',
  },
];

export default function TradingViewPage() {
  const { settings, loading } = useSettings();

  // Gunakan settings untuk title dan subtitle
  const title = loading ? 'TradingView Profile' : settings?.tradingview_title || 'TradingView Profile';
  const subtitle = loading ? 'Published analysis and market views...' : settings?.tradingview_subtitle || 'Published analysis and market views from SWFX.';

  return (
    <>
      <Navbar />
      <main className="pt-16 md:pt-20 overflow-x-hidden">
        {/* Header */}
        <Section background="surface" padding="md" border>
          <Container>
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 px-4">
              <div className="flex items-center gap-3 md:gap-4">
                <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-accent-bullish/10 border border-accent-bullish/20 flex items-center justify-center flex-shrink-0">
                  <BarChart3 size={24} className="text-accent-bullish" />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] md:text-xs font-medium tracking-[0.15em] text-accent-bullish uppercase">
                      SWFX / TRADINGVIEW
                    </span>
                  </div>
                  <Heading as="h1" className="text-xl md:text-3xl font-bold">
                    {title}
                  </Heading>
                  <p className="text-xs md:text-sm text-text-muted truncate flex items-center gap-1">
                    <User size={12} />
                    Suka Wedana Forex · TradingView Author
                  </p>
                  <p className="text-[10px] md:text-xs text-text-muted/60 mt-0.5 flex items-center gap-1">
                    <BarChart3 size={12} />
                    {IDEAS.length} published ideas
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 md:gap-3 w-full md:w-auto">
                <a
                  href="https://www.tradingview.com/u/TitikSona/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 md:flex-none"
                >
                  <Button variant="secondary" size="sm" className="w-full md:w-auto text-xs md:text-sm min-h-[44px]">
                    VIEW PROFILE
                    <ExternalLink size={14} />
                  </Button>
                </a>
                <a                  href={TELEGRAM_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 md:flex-none"
                >
                  <Button variant="primary" size="sm" className="w-full md:w-auto text-xs md:text-sm min-h-[44px]">
                    JOIN TELEGRAM
                    <ExternalLink size={14} />
                  </Button>
                </a>
              </div>
            </div>
          </Container>
        </Section>

        {/* Ideas Grid */}
        <Section background="primary" padding="md">
          <Container>
            <div className="flex items-center justify-between mb-4 md:mb-6 px-4">
              <div>
                <Heading as="h2" className="text-xl md:text-2xl flex items-center gap-2">
                  <TrendingUp size={20} className="text-accent-bullish" />
                  LATEST MARKET IDEAS
                </Heading>
                <Text className="text-text-muted text-xs md:text-sm">
                  {subtitle}
                </Text>
              </div>
              <a
                href="https://www.tradingview.com/u/TitikSona/#published-ideas"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs md:text-sm text-accent-bullish hover:text-accent-bullish/80 transition-colors flex items-center gap-1 flex-shrink-0"
              >
                View All <ExternalLink size={14} />
              </a>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 px-4">
              {IDEAS.map((idea) => (
                <div
                  key={idea.id}
                  className="rounded-2xl border border-white/5 bg-background-surface overflow-hidden hover:border-accent-bullish/20 hover:-translate-y-1 transition-all duration-300 group"
                >
                  <div className="relative w-full aspect-[16/9] bg-background-elevated/30 overflow-hidden">
                    <img
                      src={idea.imageUrl}
                      alt={idea.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = 'none';
                      }}
                    />
                    <div className="absolute bottom-2 left-2 rounded-lg bg-black/60 backdrop-blur-sm px-2 py-0.5">
                      <span className="font-mono text-xs font-bold text-white">{idea.symbol}</span>
                    </div>
                  </div>
                  <div className="p-3 md:p-4">
                    <h3 className="font-semibold text-text-primary text-sm md:text-base line-clamp-1">{idea.title}</h3>
                    <p className="text-[10px] md:text-xs text-text-muted mt-0.5 flex items-center gap-1">
                      <User size={12} />
                      TitikSona · {idea.date}
                    </p>
                    <p className="text-xs md:text-sm text-text-secondary mt-2 line-clamp-2">{idea.description}</p>
                    <a
                      href={idea.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 md:mt-3 inline-flex items-center gap-2 text-xs md:text-sm text-accent-bullish hover:text-accent-bullish/80 transition-colors"
                    >
                      View on TradingView <ExternalLink size={14} />
                    </a>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 md:mt-12 text-center px-4">
              <a
                href="https://www.tradingview.com/u/TitikSona/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 md:px-6 md:py-3 bg-accent-bullish/10 text-accent-bullish border border-accent-bullish/20 rounded-xl hover:bg-accent-bullish/20 transition-all duration-300 text-sm md:text-base"
              >
                <ExternalLink size={16} />
                View All Ideas on TradingView
              </a>
            </div>
          </Container>
        </Section>
      </main>
      <Footer />
    </>
  );
}
