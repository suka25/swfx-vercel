'use client';

import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { Heading, Text } from '@/components/ui/Typography';
import { Navbar } from '@/components/layout/Navigation/Navbar';
import { Footer } from '@/components/layout/Footer/Footer';
import { ScrollReveal } from '@/components/animations/ScrollReveal';
import { SessionsWidget } from '@/components/sessions/SessionsWidget';
import { Calendar, Clock, Globe, TrendingUp } from 'lucide-react';

export default function SessionsPage() {
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
                  <Calendar size={14} />
                  Live Sessions
                </span>
                <Heading as="h1" className="mt-2 text-3xl md:text-5xl">
                  Market Sessions
                </Heading>
                <Text className="mt-3 text-text-secondary text-sm md:text-base">
                  Real-time global market session status based on UTC time.
                  <span className="block mt-1 text-xs text-text-muted">
                    🟢 Open • 🟡 Upcoming • 🔴 Closed
                  </span>
                </Text>
              </div>
            </ScrollReveal>

            {/* Sessions Widget */}
            <div className="mt-4 md:mt-8 max-w-4xl mx-auto">
              <SessionsWidget />
            </div>

            {/* Info Box */}
            <div className="mt-6 md:mt-8 max-w-2xl mx-auto bg-[#0D1117] border border-[rgba(255,255,255,0.08)] rounded-xl p-4 md:p-6">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-accent-bullish/10 flex-shrink-0">
                  <Globe size={20} className="text-accent-bullish" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-text-primary">Why Market Sessions Matter</h4>
                  <p className="text-xs md:text-sm text-text-secondary mt-1">
                    Different sessions have different characteristics. The <span className="text-accent-bullish">London-New York overlap (13:00-17:00 UTC)</span> 
                    typically has the highest volatility and liquidity. The Asian session is often quieter with range-bound movements.
                  </p>
                  <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
                    <div className="bg-[#121820] rounded-lg p-2">
                      <span className="text-text-muted">🇬🇧 London</span>
                      <p className="text-text-primary font-medium">EUR/USD, GBP/USD</p>
                    </div>
                    <div className="bg-[#121820] rounded-lg p-2">
                      <span className="text-text-muted">🇺🇸 New York</span>
                      <p className="text-text-primary font-medium">XAUUSD, USD Pairs</p>
                    </div>
                    <div className="bg-[#121820] rounded-lg p-2">
                      <span className="text-text-muted">🇯🇵 Tokyo</span>
                      <p className="text-text-primary font-medium">USD/JPY, AUD/USD</p>
                    </div>
                    <div className="bg-[#121820] rounded-lg p-2">
                      <span className="text-text-muted">🇦🇺 Sydney</span>
                      <p className="text-text-primary font-medium">AUD, NZD Pairs</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </Section>
      </main>
      <Footer />
    </>
  );
}
