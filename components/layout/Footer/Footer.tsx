'use client';

import { Container } from '@/components/ui/Container';
import { navigationItems, TELEGRAM_LINK } from '@/data/navigation';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Send, Twitter, Youtube, ArrowUp, TrendingUp, Users, BookOpen, BarChart3, Calendar, Wrench, Home } from 'lucide-react';
import { useSettings } from '@/hooks/useSettings';
import { motion } from 'framer-motion';

// Icon mapping untuk navigation
const navIcons: Record<string, any> = {
  'Home': Home,
  'Market': TrendingUp,
  'Signals': BarChart3,
  'Analysis': BookOpen,
  'Learn': Users,
  'About': Users,
  'Sessions': Calendar,
  'Tools': Wrench,
};

export function Footer() {
  const { settings, loading } = useSettings();
  const pathname = usePathname();

  const siteName = loading ? 'SWFX' : settings?.site_name || 'SWFX';
  const footerText = loading ? 'READ. PLAN. EXECUTE. — A premium forex community' : settings?.footer_text || 'READ. PLAN. EXECUTE. — A premium forex community';
  const copyrightText = loading ? 'All rights reserved.' : settings?.copyright_text || 'All rights reserved.';
  const telegramLink = loading ? 'https://t.me/swfxglobal' : settings?.telegram_link || 'https://t.me/swfxglobal';
  const twitterLink = settings?.twitter_link || 'https://twitter.com/swfx';
  const youtubeLink = settings?.youtube_link || 'https://youtube.com/swfx';
  const footerNavTitle = loading ? 'Navigation' : settings?.footer_nav_title || 'Navigation';
  const footerCommunityTitle = loading ? 'Community' : settings?.footer_community_title || 'Community';

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-white/5 bg-background-primary">
      <Container>
        <div className="py-12 md:py-16">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
            {/* Brand */}
            <div className="col-span-1 md:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <span className="text-2xl font-bold tracking-tight text-text-primary">
                  {siteName}
                </span>
                <p className="mt-2 text-sm text-text-muted">Suka Wedana Forex</p>
                <p className="mt-4 max-w-sm text-sm text-text-secondary">
                  {footerText}
                </p>
                <div className="flex gap-3 mt-4">
                  <motion.a
                    href={telegramLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-text-muted hover:text-accent-bullish transition-colors"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Send size={18} />
                  </motion.a>
                  {twitterLink && (
                    <motion.a
                      href={twitterLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-text-muted hover:text-accent-bullish transition-colors"
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Twitter size={18} />
                    </motion.a>
                  )}
                  {youtubeLink && (
                    <motion.a
                      href={youtubeLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-text-muted hover:text-accent-bullish transition-colors"
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Youtube size={18} />
                    </motion.a>
                  )}
                </div>
              </motion.div>
            </div>

            {/* Navigation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <h4 className="mb-4 text-xs font-semibold text-text-secondary uppercase tracking-[0.15em]">
                {footerNavTitle}
              </h4>
              <ul className="space-y-3">
                {navigationItems.map((item) => {
                  const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
                  const Icon = navIcons[item.label] || TrendingUp;
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className={`text-sm transition-colors duration-300 hover:pl-1 flex items-center gap-2 ${
                          isActive ? 'text-text-primary' : 'text-text-muted hover:text-text-primary'
                        }`}
                      >
                        <Icon size={14} className={isActive ? 'text-accent-bullish' : 'text-text-muted'} />
                        {item.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </motion.div>

            {/* Community */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h4 className="mb-4 text-xs font-semibold text-text-secondary uppercase tracking-[0.15em]">
                {footerCommunityTitle}
              </h4>
              <ul className="space-y-3">
                <li>
                  <a
                    href={telegramLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-text-muted transition-colors duration-300 hover:text-text-primary hover:pl-1 flex items-center gap-2"
                  >
                    <Send size={14} /> Telegram
                  </a>
                </li>
                {twitterLink && (
                  <li>
                    <a
                      href={twitterLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-text-muted transition-colors duration-300 hover:text-text-primary hover:pl-1 flex items-center gap-2"
                    >
                      <Twitter size={14} /> Twitter
                    </a>
                  </li>
                )}
                {youtubeLink && (
                  <li>
                    <a
                      href={youtubeLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-text-muted transition-colors duration-300 hover:text-text-primary hover:pl-1 flex items-center gap-2"
                    >
                      <Youtube size={14} /> YouTube
                    </a>
                  </li>
                )}
              </ul>
            </motion.div>
          </div>

          {/* Bottom */}
          <motion.div
            className="mt-12 border-t border-white/5 pt-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
              <p className="text-sm text-text-muted">
                © {new Date().getFullYear()} {siteName} — Suka Wedana Forex. {copyrightText}
              </p>
              <div className="flex items-center gap-4">
                <p className="text-xs text-text-muted/60 text-center">
                  Trading involves risk. Past performance does not guarantee future results.
                </p>
                <motion.button
                  onClick={scrollToTop}
                  className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="Scroll to top"
                >
                  <ArrowUp size={16} className="text-text-muted" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </footer>
  );
}
