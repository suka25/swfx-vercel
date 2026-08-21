'use client';

import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { MagneticButton } from '@/components/animations/MagneticButton';
import { motion } from 'framer-motion';
import { ArrowRight, Send } from 'lucide-react';

interface Hero3DProps {
  siteName: string;
  heroTitle: string;
  heroSubtitle: string;
  heroCtaText: string;
  heroCtaLink: string;
  telegramLink: string;
  membersCount: string;
  signalsCount: string;
  uptimeCount: string;
}

export function Hero3D({
  siteName,
  heroTitle,
  heroSubtitle,
  heroCtaText,
  heroCtaLink,
  telegramLink,
  membersCount,
  signalsCount,
  uptimeCount,
}: Hero3DProps) {
  const heroLines = heroTitle.split('\n').filter(line => line.trim());

  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-[#080A0D]">
      {/* 3D Background Effect - Simplified for now */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-[#39FF88]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[500px] bg-[#39FF88]/3 rounded-full blur-3xl" />
      </div>

      {/* Overlay gradient */}
      <div className="absolute inset-0 z-1 bg-gradient-to-b from-[#080A0D]/70 via-transparent to-[#080A0D]/90" />

      {/* Content */}
      <Container className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 mb-6"
            >
              <span className="text-xs font-medium tracking-[0.15em] text-[#39FF88] uppercase flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#39FF88] animate-pulse" />
                LIVE
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-5xl md:text-7xl lg:text-8xl font-bold leading-[1.05] text-[#F5F7FA]"
            >
              {heroLines.map((line, i) => (
                <span key={i}>
                  {line}
                  <br />
                </span>
              ))}
              {heroLines.length === 0 && (
                <>
                  READ.<br />PLAN.<br />
                  <span className="text-gradient-premium">EXECUTE.</span>
                </>
              )}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-6 text-lg text-[#8B949E] max-w-md"
            >
              {heroSubtitle}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-10 flex flex-wrap gap-4"
            >
              <MagneticButton>
                <a
                  href={heroCtaLink || telegramLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-[#39FF88] text-[#080A0D] font-semibold rounded-lg hover:bg-[#39FF88]/90 transition-all"
                >
                  {heroCtaText}
                  <Send size={18} />
                </a>
              </MagneticButton>
              <a href="#markets" className="inline-flex items-center gap-2 px-8 py-4 bg-white/5 text-[#F5F7FA] font-semibold rounded-lg hover:bg-white/10 transition-all border border-white/10">
                EXPLORE MARKETS
                <ArrowRight size={18} />
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-10 flex gap-8 text-sm"
            >
              <div>
                <p className="font-bold text-[#F5F7FA]">{membersCount}</p>
                <p className="text-[#8B949E]">Members</p>
              </div>
              <div>
                <p className="font-bold text-[#F5F7FA]">{signalsCount}</p>
                <p className="text-[#8B949E]">Signals</p>
              </div>
              <div>
                <p className="font-bold text-[#F5F7FA]">{uptimeCount}</p>
                <p className="text-[#8B949E]">Uptime</p>
              </div>
            </motion.div>
          </div>

          <div className="hidden lg:block">
            <div className="glass-premium rounded-2xl p-6 border border-white/10 bg-[#0D1117]">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-xs text-[#8B949E]">MARKET STATUS</span>
                <span className="h-1.5 w-1.5 rounded-full bg-[#39FF88] animate-pulse" />
              </div>
              <div className="space-y-3">
                {[
                  { pair: 'XAUUSD', price: '2,045.32', change: '+0.61%', positive: true },
                  { pair: 'EURUSD', price: '1.0943', change: '-0.19%', positive: false },
                  { pair: 'GBPUSD', price: '1.2718', change: '+0.27%', positive: true },
                  { pair: 'USDJPY', price: '146.82', change: '-0.37%', positive: false },
                ].map((item) => (
                  <div key={item.pair} className="flex items-center justify-between py-2 border-b border-white/5">
                    <span className="font-mono text-sm font-bold text-[#F5F7FA]">{item.pair}</span>
                    <span className="font-mono text-sm text-[#F5F7FA]">{item.price}</span>
                    <span className={`text-sm font-medium ${item.positive ? 'text-[#39FF88]' : 'text-[#FF4D5F]'}`}>
                      {item.change}
                    </span>
                  </div>
                ))}
              </div>
              <p className="mt-4 text-[10px] text-[#4B5563] text-right">Powered by TradingView</p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
