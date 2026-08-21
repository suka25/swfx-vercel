'use client';

import { navigationItems, TELEGRAM_LINK } from '@/data/navigation';
import { cn } from '@/lib/utils/cn';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { Menu, X, Send, Shield, Home, TrendingUp, BookOpen, Users, Calendar, Wrench, BarChart3 } from 'lucide-react';
import { ThemeToggle } from '@/components/ui/ThemeToggle';

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

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    const checkAdmin = () => {
      const cookies = document.cookie.split(';');
      const hasSession = cookies.some(cookie => cookie.trim().startsWith('admin_token='));
      setIsAdmin(hasSession);
    };

    checkAdmin();

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Tutup mobile menu saat navigasi
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  return (
    <>
      <motion.header
        className={cn(
          'fixed top-0 z-50 w-full transition-all duration-700',
          isScrolled
            ? 'backdrop-blur-xl bg-black/60 border-b border-white/5'
            : 'bg-transparent'
        )}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <Container padding={false}>
          <div className="flex h-16 items-center justify-between md:h-20">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-xl font-bold tracking-tight text-text-primary md:text-2xl">
                SWFX
              </span>
              <span className="hidden text-[10px] font-medium tracking-[0.15em] text-text-muted uppercase md:block">
                Suka Wedana Forex
              </span>
            </Link>

            <nav className="hidden md:flex items-center gap-8">
              {navigationItems.map((item) => {
                const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
                const Icon = navIcons[item.label] || TrendingUp;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      'text-sm font-medium transition-colors duration-300 relative group flex items-center gap-1.5',
                      isActive ? 'text-text-primary' : 'text-text-secondary hover:text-text-primary'
                    )}
                  >
                    <Icon size={14} className={isActive ? 'text-accent-bullish' : 'text-text-muted'} />
                    {item.label}
                    <span className={cn(
                      'absolute -bottom-1 left-0 h-0.5 bg-accent-bullish transition-all duration-300',
                      isActive ? 'w-full' : 'w-0 group-hover:w-full'
                    )} />
                  </Link>
                );
              })}
              
              {isAdmin && (
                <Link
                  href="/admin/dashboard"
                  className="text-sm font-medium text-accent-bullish transition-colors duration-300 hover:text-accent-bullish/80 relative group flex items-center gap-1"
                >
                  <Shield size={14} />
                  ADMIN
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent-bullish transition-all duration-300 group-hover:w-full" />
                </Link>
              )}
            </nav>

            <div className="hidden md:flex items-center gap-4">
              <ThemeToggle />
              <a href={TELEGRAM_LINK} target="_blank" rel="noopener noreferrer">
                <Button variant="primary" size="md" className="gap-2">
                  JOIN TELEGRAM
                  <Send size={14} />
                </Button>
              </a>
            </div>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="flex md:hidden text-text-primary p-1"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </Container>
      </motion.header>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="fixed inset-x-0 top-16 z-40 bg-background-primary/98 backdrop-blur-xl border-b border-white/5 md:hidden"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex flex-col items-center gap-4 p-6 max-h-[calc(100vh-4rem)] overflow-y-auto">
              {navigationItems.map((item, index) => {
                const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
                const Icon = navIcons[item.label] || TrendingUp;
                return (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="w-full text-center"
                  >
                    <Link
                      href={item.href}
                      className={cn(
                        'text-lg font-medium transition-colors block py-2 flex items-center justify-center gap-2',
                        isActive ? 'text-text-primary' : 'text-text-secondary hover:text-text-primary'
                      )}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <Icon size={18} className={isActive ? 'text-accent-bullish' : 'text-text-muted'} />
                      {item.label}
                    </Link>
                  </motion.div>
                );
              })}
              
              {isAdmin && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="w-full text-center"
                >
                  <Link
                    href="/admin/dashboard"
                    className="text-lg font-medium text-accent-bullish transition-colors hover:text-accent-bullish/80 flex items-center justify-center gap-2 py-2"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Shield size={16} />
                    ADMIN
                  </Link>
                </motion.div>
              )}
              
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="w-full flex flex-col gap-3 pt-2 border-t border-white/5"
              >
                <div className="flex justify-center">
                  <ThemeToggle />
                </div>
                <a href={TELEGRAM_LINK} target="_blank" rel="noopener noreferrer" className="block">
                  <Button variant="primary" size="lg" fullWidth className="gap-2">
                    JOIN TELEGRAM
                    <Send size={16} />
                  </Button>
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
