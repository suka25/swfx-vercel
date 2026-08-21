'use client';

import { useState, useEffect, useCallback, useRef } from 'react';

interface Settings {
  site_name: string;
  site_description: string;
  site_tagline: string;
  contact_email: string;
  telegram_link: string;
  twitter_link: string;
  youtube_link: string;
  logo_text: string;
  footer_text: string;
  copyright_text: string;
  enable_preloader: string;
  enable_custom_cursor: string;
  enable_smooth_scroll: string;
  enable_animations: string;
  enable_market_ticker: string;
  enable_signals: string;
  theme_mode: string;
  accent_color: string;
  secondary_color: string;
  hero_title: string;
  hero_subtitle: string;
  hero_cta_text: string;
  hero_cta_link: string;
  philosophy_title: string;
  philosophy_subtitle: string;
  philosophy_read_title: string;
  philosophy_read_subtitle: string;
  philosophy_read_desc: string;
  philosophy_plan_title: string;
  philosophy_plan_subtitle: string;
  philosophy_plan_desc: string;
  philosophy_execute_title: string;
  philosophy_execute_subtitle: string;
  philosophy_execute_desc: string;
  cta_title: string;
  cta_subtitle: string;
  cta_text: string;
  cta_button_text: string;
  footer_nav_title: string;
  footer_community_title: string;
  meta_description: string;
  meta_keywords: string;
  og_image: string;
  twitter_handle: string;
  animation_duration: string;
  animation_ease: string;
  animation_stagger_delay: string;
  scroll_animation_threshold: string;
  preloader_duration: string;
  preloader_text: string;
  members_count: string;
  signals_count: string;
  uptime_count: string;
  maintenance_mode: string;
  maintenance_message: string;
  enable_registration: string;
  enable_dark_mode: string;
  google_analytics_id: string;
  analysis_title: string;
  analysis_subtitle: string;
  signals_title: string;
  signals_subtitle: string;
  markets_title: string;
  markets_subtitle: string;
  tradingview_title: string;
  tradingview_subtitle: string;
}

const defaultSettings: Settings = {
  site_name: 'SWFX',
  site_description: 'READ. PLAN. EXECUTE.',
  site_tagline: 'Understand the market. Build the plan. Execute with discipline.',
  contact_email: 'support@swfx.com',
  telegram_link: 'https://t.me/swfxglobal',
  twitter_link: 'https://twitter.com/swfx',
  youtube_link: 'https://youtube.com/swfx',
  logo_text: 'SWFX',
  footer_text: 'READ. PLAN. EXECUTE. — A premium forex community',
  copyright_text: 'All rights reserved.',
  enable_preloader: 'true',
  enable_custom_cursor: 'true',
  enable_smooth_scroll: 'true',
  enable_animations: 'true',
  enable_market_ticker: 'true',
  enable_signals: 'true',
  theme_mode: 'dark',
  accent_color: '#39FF88',
  secondary_color: '#FF4D5F',
  hero_title: 'READ. PLAN. EXECUTE.',
  hero_subtitle: 'Understand the market. Build the plan. Execute with discipline.',
  hero_cta_text: 'JOIN TELEGRAM',
  hero_cta_link: 'https://t.me/swfxglobal',
  philosophy_title: 'Our Philosophy',
  philosophy_subtitle: 'Three simple steps to disciplined trading.',
  philosophy_read_title: 'READ',
  philosophy_read_subtitle: 'Understand the Market',
  philosophy_read_desc: 'Market structure, liquidity, and context before any decision.',
  philosophy_plan_title: 'PLAN',
  philosophy_plan_subtitle: 'Build the Framework',
  philosophy_plan_desc: 'Entry, invalidation, risk, and target for every trade.',
  philosophy_execute_title: 'EXECUTE',
  philosophy_execute_subtitle: 'Trade with Discipline',
  philosophy_execute_desc: 'Follow the plan. Control emotions. Trust the process.',
  cta_title: 'The Market Never Stops.',
  cta_subtitle: 'Neither Should Your Learning.',
  cta_text: 'Join the SWFX Telegram community for market analysis, trading insights, educational content, structured signals, and market discussion.',
  cta_button_text: 'JOIN SWFX TELEGRAM',
  footer_nav_title: 'Navigation',
  footer_community_title: 'Community',
  meta_description: 'Premium forex analysis, trading education, and structured signals for disciplined traders.',
  meta_keywords: 'forex,trading,forex signals,technical analysis,forex education,trading community,SWFX',
  og_image: '/og-image.png',
  twitter_handle: '@swfxglobal',
  animation_duration: '0.8',
  animation_ease: 'power2.out',
  animation_stagger_delay: '0.05',
  scroll_animation_threshold: '0.15',
  preloader_duration: '2000',
  preloader_text: 'Loading {progress}%',
  members_count: '2,847+',
  signals_count: '156+',
  uptime_count: '99.7%',
  maintenance_mode: 'false',
  maintenance_message: 'We are currently undergoing maintenance. Please check back soon.',
  enable_registration: 'true',
  enable_dark_mode: 'true',
  google_analytics_id: '',
  analysis_title: 'Market Analysis',
  analysis_subtitle: 'Professional technical analysis with clear reasoning and structured approach.',
  signals_title: 'SWFX Signals',
  signals_subtitle: 'Trading signals and market analysis from SWFX',
  markets_title: 'Live Market Data',
  markets_subtitle: 'Real-time prices and charts powered by TradingView',
  tradingview_title: 'TradingView Profile',
  tradingview_subtitle: 'Published analysis and market views from SWFX.',
};

// Cache settings di memory
let cachedSettings: Settings | null = null;
let cacheTimestamp = 0;
const CACHE_DURATION = 5 * 60 * 1000; // 5 menit
let isFetching = false;
let pendingPromise: Promise<void> | null = null;

export function useSettings() {
  const [settings, setSettings] = useState<Settings>(defaultSettings);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const mountedRef = useRef(true);

  const fetchSettings = useCallback(async () => {
    const now = Date.now();
    
    // Jika cache masih valid
    if (cachedSettings && (now - cacheTimestamp) < CACHE_DURATION) {
      if (mountedRef.current) {
        setSettings(cachedSettings);
        setLoading(false);
      }
      return;
    }

    // Jika sedang fetching, tunggu
    if (isFetching && pendingPromise) {
      await pendingPromise;
      if (mountedRef.current) {
        setSettings(cachedSettings || defaultSettings);
        setLoading(false);
      }
      return;
    }

    isFetching = true;
    pendingPromise = (async () => {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 3000);

        const res = await fetch('/api/settings', {
          signal: controller.signal,
          headers: { 'Cache-Control': 'no-cache' },
        });
        
        clearTimeout(timeoutId);

        if (res.ok) {
          const data = await res.json();
          if (data.success && data.data) {
            cachedSettings = { ...defaultSettings, ...data.data };
            cacheTimestamp = now;
            if (mountedRef.current) {
              setSettings(cachedSettings);
            }
          }
        }
      } catch (err) {
        // Fallback ke default
        if (mountedRef.current) {
          setSettings(defaultSettings);
          setError(err instanceof Error ? err.message : 'Failed to load settings');
        }
      } finally {
        isFetching = false;
        pendingPromise = null;
        if (mountedRef.current) {
          setLoading(false);
        }
      }
    })();

    await pendingPromise;
  }, []);

  useEffect(() => {
    mountedRef.current = true;
    fetchSettings();
    return () => {
      mountedRef.current = false;
    };
  }, [fetchSettings]);

  return { settings, loading, error, refetch: fetchSettings };
}
