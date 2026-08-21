'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Settings, 
  ArrowLeft, 
  Save, 
  Globe, 
  Users, 
  Palette, 
  Layout, 
  FileText, 
  Search, 
  BarChart3,
  Clock,
  Shield,
  CheckCircle,
  XCircle,
  Loader2,
  Twitter,
  Youtube,
  Send,
  Sparkles,
  Target,
  BookOpen,
  Zap,
  TrendingUp,
  Award,
  Wrench,
  Home,
  Plus,
  Trash2,
  GripVertical,
  Calculator,
  DollarSign,
  Brain,
  Flame,
  Crown,
  Eye,
  EyeOff
} from 'lucide-react';

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
  about_title: string;
  about_subtitle: string;
  tools_title: string;
  tools_subtitle: string;
  homepage: {
    hero_title: string;
    hero_subtitle: string;
    hero_cta_text: string;
    hero_cta_secondary: string;
    market_status_label: string;
    market_trend_label: string;
    market_volatility_label: string;
    trust_items: string[];
    features_title: string;
    features_subtitle: string;
    features: { icon: string; title: string; description: string }[];
    philosophy_title: string;
    philosophy_read_label: string;
    philosophy_read_desc: string;
    philosophy_plan_label: string;
    philosophy_plan_desc: string;
    philosophy_execute_label: string;
    philosophy_execute_desc: string;
    tools_title: string;
    tools_subtitle: string;
    tools: { icon: string; label: string }[];
    education_title: string;
    education_subtitle: string;
    education_courses: { title: string; level: string; icon: string }[];
    cta_title: string;
    cta_subtitle: string;
    cta_button: string;
    cta_benefits: string[];
  };
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
  about_title: 'About SWFX',
  about_subtitle: 'READ. PLAN. EXECUTE. — A premium forex community focused on analysis, education, and disciplined trading.',
  tools_title: 'Trading Tools',
  tools_subtitle: 'Essential tools to help you make better trading decisions.',
  homepage: {
    hero_title: 'Trade The Market. Not Your Emotions.',
    hero_subtitle: 'Real-time market intelligence, structured setups, professional analysis and powerful trading tools — built for traders who want to trade with a plan.',
    hero_cta_text: 'JOIN SWFX FREE',
    hero_cta_secondary: 'EXPLORE PLATFORM',
    market_status_label: 'MARKET',
    market_trend_label: 'TREND',
    market_volatility_label: 'VOLATILITY',
    trust_items: ['Live Data', 'Structured Signals', 'Risk Tools', '100% Free'],
    features_title: 'Everything You Need To Trade Smarter',
    features_subtitle: 'A complete trading ecosystem — all in one place',
    features: [
      { icon: 'Globe', title: 'Live Market', description: 'Real-time charts and market data' },
      { icon: 'Target', title: 'Structured Signals', description: 'Clear setup, entry, invalidation and targets' },
      { icon: 'BarChart3', title: 'Market Analysis', description: 'Understand structure, liquidity and price action' },
      { icon: 'Calendar', title: 'Economic Calendar', description: 'Know what events can move the market' },
      { icon: 'Calculator', title: 'Risk Calculator', description: 'Calculate position size before entering' },
      { icon: 'Wrench', title: '8 Free Tools', description: 'Risk, profit, margin, planning and more' }
    ],
    philosophy_title: 'Not Just Another Signal Group',
    philosophy_read_label: 'READ',
    philosophy_read_desc: 'Market structure · Liquidity · Key levels',
    philosophy_plan_label: 'PLAN',
    philosophy_plan_desc: 'Entry · Invalidation · Risk · Target',
    philosophy_execute_label: 'EXECUTE',
    philosophy_execute_desc: 'Follow the plan · Control emotion · Manage risk',
    tools_title: 'Plan Your Trade Before You Place It',
    tools_subtitle: '8 professional trading tools — completely free',
    tools: [
      { icon: 'Calculator', label: 'Risk Calculator' },
      { icon: 'Target', label: 'Position Size' },
      { icon: 'Shield', label: 'Risk / Reward' },
      { icon: 'DollarSign', label: 'Profit / Loss' }
    ],
    education_title: "Don't Just Follow the Trade. Understand Why.",
    education_subtitle: '6 Courses · 67 Lessons · 4,283 Students',
    education_courses: [
      { title: 'Forex Basics', level: 'Beginner', icon: 'BookOpen' },
      { title: 'Technical Analysis', level: 'Intermediate', icon: 'TrendingUp' },
      { title: 'Trading Psychology', level: 'Advanced', icon: 'Brain' }
    ],
    cta_title: 'Stop Trading Alone.',
    cta_subtitle: 'Get market analysis, structured setups, trading education and professional tools — all in one place.',
    cta_button: 'JOIN SWFX FREE',
    cta_benefits: ['No complicated registration', 'No pressure', 'Just join the community']
  }
};

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<Settings>(defaultSettings);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [activeTab, setActiveTab] = useState('general');
  const router = useRouter();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const res = await fetch('/api/admin/check');
      const data = await res.json();
      if (!data.authenticated) {
        router.push('/admin/login');
        return;
      }
      fetchSettings();
    } catch (error) {
      router.push('/admin/login');
    }
  };

  const fetchSettings = async () => {
    try {
      const res = await fetch('/api/admin/settings');
      const data = await res.json();
      if (data.success && data.data) {
        setSettings({ ...defaultSettings, ...data.data });
      }
    } catch (error) {
      console.error('Error fetching settings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage(null);

    try {
      const res = await fetch('/api/admin/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      });
      const data = await res.json();
      if (data.success) {
        setMessage({ type: 'success', text: 'Settings saved successfully!' });
      } else {
        setMessage({ type: 'error', text: 'Error saving settings' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Network error' });
    } finally {
      setSaving(false);
    }
  };

  const renderTab = () => {
    switch (activeTab) {
      case 'general':
        return <GeneralSettings settings={settings} setSettings={setSettings} />;
      case 'social':
        return <SocialSettings settings={settings} setSettings={setSettings} />;
      case 'appearance':
        return <AppearanceSettings settings={settings} setSettings={setSettings} />;
      case 'features':
        return <FeatureSettings settings={settings} setSettings={setSettings} />;
      case 'content':
        return <ContentSettings settings={settings} setSettings={setSettings} />;
      case 'seo':
        return <SeoSettings settings={settings} setSettings={setSettings} />;
      case 'stats':
        return <StatsSettings settings={settings} setSettings={setSettings} />;
      case 'animations':
        return <AnimationSettings settings={settings} setSettings={setSettings} />;
      case 'advanced':
        return <AdvancedSettings settings={settings} setSettings={setSettings} />;
      case 'pages':
        return <PageSettings settings={settings} setSettings={setSettings} />;
      case 'homepage':
        return <HomepageSettings settings={settings} setSettings={setSettings} />;
      default:
        return <div className="text-[#8B949E]">Select a tab</div>;
    }
  };

  const tabs = [
    { id: 'general', label: 'General', icon: Globe },
    { id: 'social', label: 'Social', icon: Users },
    { id: 'appearance', label: 'Appearance', icon: Palette },
    { id: 'features', label: 'Features', icon: Layout },
    { id: 'content', label: 'Content', icon: FileText },
    { id: 'seo', label: 'SEO', icon: Search },
    { id: 'stats', label: 'Stats', icon: BarChart3 },
    { id: 'animations', label: 'Animations', icon: Clock },
    { id: 'advanced', label: 'Advanced', icon: Shield },
    { id: 'pages', label: 'Pages', icon: FileText },
    { id: 'homepage', label: 'Homepage', icon: Home },
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#080A0D]">
        <Loader2 size={32} className="text-[#39FF88] animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#080A0D] p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-[#F5F7FA] flex items-center gap-2">
            <Settings size={24} className="text-[#39FF88]" />
            Settings
          </h1>
          <a href="/admin/dashboard" className="text-xs md:text-sm text-[#8B949E] hover:text-[#F5F7FA] flex items-center gap-1">
            <ArrowLeft size={14} />
            Back to Dashboard
          </a>
        </div>

        {message && (
          <div className={`p-4 rounded-lg mb-4 flex items-center gap-2 ${
            message.type === 'success' 
              ? 'bg-[#39FF88]/10 text-[#39FF88] border border-[#39FF88]/20' 
              : 'bg-[#FF4D5F]/10 text-[#FF4D5F] border border-[#FF4D5F]/20'
          }`}>
            {message.type === 'success' ? <CheckCircle size={18} /> : <XCircle size={18} />}
            {message.text}
          </div>
        )}

        <div className="bg-[#0D1117] border border-[rgba(255,255,255,0.08)] rounded-2xl overflow-hidden">
          {/* Tabs */}
          <div className="overflow-x-auto border-b border-[rgba(255,255,255,0.08)]">
            <div className="flex gap-1 p-2 md:p-4 min-w-max">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-3 py-2 md:px-4 md:py-2 rounded-lg text-xs md:text-sm font-medium transition-all duration-200 whitespace-nowrap flex items-center gap-1.5 ${
                      activeTab === tab.id
                        ? 'bg-[#39FF88]/10 text-[#39FF88]'
                        : 'text-[#8B949E] hover:text-[#F5F7FA] hover:bg-white/5'
                    }`}
                  >
                    <Icon size={16} />
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Content */}
          <div className="p-4 md:p-6">
            <form onSubmit={handleSubmit}>
              {renderTab()}

              <button
                type="submit"
                disabled={saving}
                className="mt-6 w-full py-3 bg-[#39FF88] text-[#080A0D] font-medium rounded-lg hover:bg-[#39FF88]/90 transition-colors disabled:opacity-50 min-h-[44px] flex items-center justify-center gap-2"
              >
                {saving ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save size={18} />
                    Save All Settings
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

// ===== SETTINGS COMPONENTS =====

function GeneralSettings({ settings, setSettings }: any) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-[#8B949E] mb-1">Site Name</label>
          <input
            type="text"
            value={settings.site_name}
            onChange={(e) => setSettings({ ...settings, site_name: e.target.value })}
            className="w-full px-4 py-2 bg-[#121820] border border-[rgba(255,255,255,0.08)] rounded-lg text-[#F5F7FA] focus:outline-none focus:border-[#39FF88] min-h-[44px]"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-[#8B949E] mb-1">Site Description</label>
          <input
            type="text"
            value={settings.site_description}
            onChange={(e) => setSettings({ ...settings, site_description: e.target.value })}
            className="w-full px-4 py-2 bg-[#121820] border border-[rgba(255,255,255,0.08)] rounded-lg text-[#F5F7FA] focus:outline-none focus:border-[#39FF88] min-h-[44px]"
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-[#8B949E] mb-1">Site Tagline</label>
        <input
          type="text"
          value={settings.site_tagline}
          onChange={(e) => setSettings({ ...settings, site_tagline: e.target.value })}
          className="w-full px-4 py-2 bg-[#121820] border border-[rgba(255,255,255,0.08)] rounded-lg text-[#F5F7FA] focus:outline-none focus:border-[#39FF88] min-h-[44px]"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-[#8B949E] mb-1">Contact Email</label>
        <input
          type="email"
          value={settings.contact_email}
          onChange={(e) => setSettings({ ...settings, contact_email: e.target.value })}
          className="w-full px-4 py-2 bg-[#121820] border border-[rgba(255,255,255,0.08)] rounded-lg text-[#F5F7FA] focus:outline-none focus:border-[#39FF88] min-h-[44px]"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-[#8B949E] mb-1">Logo Text</label>
        <input
          type="text"
          value={settings.logo_text}
          onChange={(e) => setSettings({ ...settings, logo_text: e.target.value })}
          className="w-full px-4 py-2 bg-[#121820] border border-[rgba(255,255,255,0.08)] rounded-lg text-[#F5F7FA] focus:outline-none focus:border-[#39FF88] min-h-[44px]"
        />
      </div>
    </div>
  );
}

function SocialSettings({ settings, setSettings }: any) {
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-[#8B949E] mb-1 flex items-center gap-2">
          <Send size={16} className="text-[#39FF88]" />
          Telegram Link
        </label>
        <input
          type="url"
          value={settings.telegram_link}
          onChange={(e) => setSettings({ ...settings, telegram_link: e.target.value })}
          className="w-full px-4 py-2 bg-[#121820] border border-[rgba(255,255,255,0.08)] rounded-lg text-[#F5F7FA] focus:outline-none focus:border-[#39FF88] min-h-[44px]"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-[#8B949E] mb-1 flex items-center gap-2">
          <Twitter size={16} className="text-[#39FF88]" />
          Twitter Link
        </label>
        <input
          type="url"
          value={settings.twitter_link}
          onChange={(e) => setSettings({ ...settings, twitter_link: e.target.value })}
          className="w-full px-4 py-2 bg-[#121820] border border-[rgba(255,255,255,0.08)] rounded-lg text-[#F5F7FA] focus:outline-none focus:border-[#39FF88] min-h-[44px]"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-[#8B949E] mb-1 flex items-center gap-2">
          <Youtube size={16} className="text-[#39FF88]" />
          YouTube Link
        </label>
        <input
          type="url"
          value={settings.youtube_link}
          onChange={(e) => setSettings({ ...settings, youtube_link: e.target.value })}
          className="w-full px-4 py-2 bg-[#121820] border border-[rgba(255,255,255,0.08)] rounded-lg text-[#F5F7FA] focus:outline-none focus:border-[#39FF88] min-h-[44px]"
        />
      </div>
    </div>
  );
}

function AppearanceSettings({ settings, setSettings }: any) {
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-[#8B949E] mb-1">Theme Mode</label>
        <select
          value={settings.theme_mode}
          onChange={(e) => setSettings({ ...settings, theme_mode: e.target.value })}
          className="w-full px-4 py-2 bg-[#121820] border border-[rgba(255,255,255,0.08)] rounded-lg text-[#F5F7FA] focus:outline-none focus:border-[#39FF88] min-h-[44px]"
        >
          <option value="dark">Dark</option>
          <option value="light">Light</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-[#8B949E] mb-1">Accent Color</label>
        <input
          type="color"
          value={settings.accent_color}
          onChange={(e) => setSettings({ ...settings, accent_color: e.target.value })}
          className="w-full h-12 px-4 py-2 bg-[#121820] border border-[rgba(255,255,255,0.08)] rounded-lg text-[#F5F7FA] focus:outline-none focus:border-[#39FF88]"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-[#8B949E] mb-1">Secondary Color</label>
        <input
          type="color"
          value={settings.secondary_color}
          onChange={(e) => setSettings({ ...settings, secondary_color: e.target.value })}
          className="w-full h-12 px-4 py-2 bg-[#121820] border border-[rgba(255,255,255,0.08)] rounded-lg text-[#F5F7FA] focus:outline-none focus:border-[#39FF88]"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-[#8B949E] mb-1">Footer Text</label>
        <input
          type="text"
          value={settings.footer_text}
          onChange={(e) => setSettings({ ...settings, footer_text: e.target.value })}
          className="w-full px-4 py-2 bg-[#121820] border border-[rgba(255,255,255,0.08)] rounded-lg text-[#F5F7FA] focus:outline-none focus:border-[#39FF88] min-h-[44px]"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-[#8B949E] mb-1">Copyright Text</label>
        <input
          type="text"
          value={settings.copyright_text}
          onChange={(e) => setSettings({ ...settings, copyright_text: e.target.value })}
          className="w-full px-4 py-2 bg-[#121820] border border-[rgba(255,255,255,0.08)] rounded-lg text-[#F5F7FA] focus:outline-none focus:border-[#39FF88] min-h-[44px]"
        />
      </div>
    </div>
  );
}

function FeatureSettings({ settings, setSettings }: any) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-[#8B949E] mb-1">Enable Preloader</label>
          <select
            value={settings.enable_preloader}
            onChange={(e) => setSettings({ ...settings, enable_preloader: e.target.value })}
            className="w-full px-4 py-2 bg-[#121820] border border-[rgba(255,255,255,0.08)] rounded-lg text-[#F5F7FA] focus:outline-none focus:border-[#39FF88] min-h-[44px]"
          >
            <option value="true">Enabled</option>
            <option value="false">Disabled</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-[#8B949E] mb-1">Custom Cursor</label>
          <select
            value={settings.enable_custom_cursor}
            onChange={(e) => setSettings({ ...settings, enable_custom_cursor: e.target.value })}
            className="w-full px-4 py-2 bg-[#121820] border border-[rgba(255,255,255,0.08)] rounded-lg text-[#F5F7FA] focus:outline-none focus:border-[#39FF88] min-h-[44px]"
          >
            <option value="true">Enabled</option>
            <option value="false">Disabled</option>
          </select>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-[#8B949E] mb-1">Smooth Scroll</label>
          <select
            value={settings.enable_smooth_scroll}
            onChange={(e) => setSettings({ ...settings, enable_smooth_scroll: e.target.value })}
            className="w-full px-4 py-2 bg-[#121820] border border-[rgba(255,255,255,0.08)] rounded-lg text-[#F5F7FA] focus:outline-none focus:border-[#39FF88] min-h-[44px]"
          >
            <option value="true">Enabled</option>
            <option value="false">Disabled</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-[#8B949E] mb-1">Market Ticker</label>
          <select
            value={settings.enable_market_ticker}
            onChange={(e) => setSettings({ ...settings, enable_market_ticker: e.target.value })}
            className="w-full px-4 py-2 bg-[#121820] border border-[rgba(255,255,255,0.08)] rounded-lg text-[#F5F7FA] focus:outline-none focus:border-[#39FF88] min-h-[44px]"
          >
            <option value="true">Enabled</option>
            <option value="false">Disabled</option>
          </select>
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-[#8B949E] mb-1">Enable Animations</label>
        <select
          value={settings.enable_animations}
          onChange={(e) => setSettings({ ...settings, enable_animations: e.target.value })}
          className="w-full px-4 py-2 bg-[#121820] border border-[rgba(255,255,255,0.08)] rounded-lg text-[#F5F7FA] focus:outline-none focus:border-[#39FF88] min-h-[44px]"
        >
          <option value="true">Enabled</option>
          <option value="false">Disabled</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-[#8B949E] mb-1">Enable Signals</label>
        <select
          value={settings.enable_signals}
          onChange={(e) => setSettings({ ...settings, enable_signals: e.target.value })}
          className="w-full px-4 py-2 bg-[#121820] border border-[rgba(255,255,255,0.08)] rounded-lg text-[#F5F7FA] focus:outline-none focus:border-[#39FF88] min-h-[44px]"
        >
          <option value="true">Enabled</option>
          <option value="false">Disabled</option>
        </select>
      </div>
    </div>
  );
}

function ContentSettings({ settings, setSettings }: any) {
  return (
    <div className="space-y-4">
      <h3 className="text-sm font-semibold text-[#F5F7FA] flex items-center gap-2">
        <Sparkles size={16} className="text-accent-bullish" />
        Hero Section
      </h3>
      <div>
        <label className="block text-sm font-medium text-[#8B949E] mb-1">Hero Title</label>
        <input
          type="text"
          value={settings.hero_title}
          onChange={(e) => setSettings({ ...settings, hero_title: e.target.value })}
          className="w-full px-4 py-2 bg-[#121820] border border-[rgba(255,255,255,0.08)] rounded-lg text-[#F5F7FA] focus:outline-none focus:border-[#39FF88] min-h-[44px]"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-[#8B949E] mb-1">Hero Subtitle</label>
        <input
          type="text"
          value={settings.hero_subtitle}
          onChange={(e) => setSettings({ ...settings, hero_subtitle: e.target.value })}
          className="w-full px-4 py-2 bg-[#121820] border border-[rgba(255,255,255,0.08)] rounded-lg text-[#F5F7FA] focus:outline-none focus:border-[#39FF88] min-h-[44px]"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-[#8B949E] mb-1">Hero CTA Text</label>
          <input
            type="text"
            value={settings.hero_cta_text}
            onChange={(e) => setSettings({ ...settings, hero_cta_text: e.target.value })}
            className="w-full px-4 py-2 bg-[#121820] border border-[rgba(255,255,255,0.08)] rounded-lg text-[#F5F7FA] focus:outline-none focus:border-[#39FF88] min-h-[44px]"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-[#8B949E] mb-1">Hero CTA Link</label>
          <input
            type="url"
            value={settings.hero_cta_link}
            onChange={(e) => setSettings({ ...settings, hero_cta_link: e.target.value })}
            className="w-full px-4 py-2 bg-[#121820] border border-[rgba(255,255,255,0.08)] rounded-lg text-[#F5F7FA] focus:outline-none focus:border-[#39FF88] min-h-[44px]"
          />
        </div>
      </div>

      <h3 className="text-sm font-semibold text-[#F5F7FA] flex items-center gap-2 mt-6">
        <BookOpen size={16} className="text-accent-bullish" />
        Philosophy Section
      </h3>
      <div>
        <label className="block text-sm font-medium text-[#8B949E] mb-1">Philosophy Title</label>
        <input
          type="text"
          value={settings.philosophy_title}
          onChange={(e) => setSettings({ ...settings, philosophy_title: e.target.value })}
          className="w-full px-4 py-2 bg-[#121820] border border-[rgba(255,255,255,0.08)] rounded-lg text-[#F5F7FA] focus:outline-none focus:border-[#39FF88] min-h-[44px]"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-[#8B949E] mb-1">Philosophy Subtitle</label>
        <input
          type="text"
          value={settings.philosophy_subtitle}
          onChange={(e) => setSettings({ ...settings, philosophy_subtitle: e.target.value })}
          className="w-full px-4 py-2 bg-[#121820] border border-[rgba(255,255,255,0.08)] rounded-lg text-[#F5F7FA] focus:outline-none focus:border-[#39FF88] min-h-[44px]"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-[#39FF88]">READ</label>
          <input
            type="text"
            value={settings.philosophy_read_title}
            onChange={(e) => setSettings({ ...settings, philosophy_read_title: e.target.value })}
            placeholder="Title"
            className="w-full px-4 py-2 bg-[#121820] border border-[rgba(255,255,255,0.08)] rounded-lg text-[#F5F7FA] focus:outline-none focus:border-[#39FF88] min-h-[44px] text-sm"
          />
          <input
            type="text"
            value={settings.philosophy_read_subtitle}
            onChange={(e) => setSettings({ ...settings, philosophy_read_subtitle: e.target.value })}
            placeholder="Subtitle"
            className="w-full px-4 py-2 bg-[#121820] border border-[rgba(255,255,255,0.08)] rounded-lg text-[#F5F7FA] focus:outline-none focus:border-[#39FF88] min-h-[44px] text-sm"
          />
          <input
            type="text"
            value={settings.philosophy_read_desc}
            onChange={(e) => setSettings({ ...settings, philosophy_read_desc: e.target.value })}
            placeholder="Description"
            className="w-full px-4 py-2 bg-[#121820] border border-[rgba(255,255,255,0.08)] rounded-lg text-[#F5F7FA] focus:outline-none focus:border-[#39FF88] min-h-[44px] text-sm"
          />
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-medium text-[#F5A623]">PLAN</label>
          <input
            type="text"
            value={settings.philosophy_plan_title}
            onChange={(e) => setSettings({ ...settings, philosophy_plan_title: e.target.value })}
            placeholder="Title"
            className="w-full px-4 py-2 bg-[#121820] border border-[rgba(255,255,255,0.08)] rounded-lg text-[#F5F7FA] focus:outline-none focus:border-[#39FF88] min-h-[44px] text-sm"
          />
          <input
            type="text"
            value={settings.philosophy_plan_subtitle}
            onChange={(e) => setSettings({ ...settings, philosophy_plan_subtitle: e.target.value })}
            placeholder="Subtitle"
            className="w-full px-4 py-2 bg-[#121820] border border-[rgba(255,255,255,0.08)] rounded-lg text-[#F5F7FA] focus:outline-none focus:border-[#39FF88] min-h-[44px] text-sm"
          />
          <input
            type="text"
            value={settings.philosophy_plan_desc}
            onChange={(e) => setSettings({ ...settings, philosophy_plan_desc: e.target.value })}
            placeholder="Description"
            className="w-full px-4 py-2 bg-[#121820] border border-[rgba(255,255,255,0.08)] rounded-lg text-[#F5F7FA] focus:outline-none focus:border-[#39FF88] min-h-[44px] text-sm"
          />
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-medium text-[#FF4D5F]">EXECUTE</label>
          <input
            type="text"
            value={settings.philosophy_execute_title}
            onChange={(e) => setSettings({ ...settings, philosophy_execute_title: e.target.value })}
            placeholder="Title"
            className="w-full px-4 py-2 bg-[#121820] border border-[rgba(255,255,255,0.08)] rounded-lg text-[#F5F7FA] focus:outline-none focus:border-[#39FF88] min-h-[44px] text-sm"
          />
          <input
            type="text"
            value={settings.philosophy_execute_subtitle}
            onChange={(e) => setSettings({ ...settings, philosophy_execute_subtitle: e.target.value })}
            placeholder="Subtitle"
            className="w-full px-4 py-2 bg-[#121820] border border-[rgba(255,255,255,0.08)] rounded-lg text-[#F5F7FA] focus:outline-none focus:border-[#39FF88] min-h-[44px] text-sm"
          />
          <input
            type="text"
            value={settings.philosophy_execute_desc}
            onChange={(e) => setSettings({ ...settings, philosophy_execute_desc: e.target.value })}
            placeholder="Description"
            className="w-full px-4 py-2 bg-[#121820] border border-[rgba(255,255,255,0.08)] rounded-lg text-[#F5F7FA] focus:outline-none focus:border-[#39FF88] min-h-[44px] text-sm"
          />
        </div>
      </div>

      <h3 className="text-sm font-semibold text-[#F5F7FA] flex items-center gap-2 mt-6">
        <Target size={16} className="text-accent-bullish" />
        CTA Section
      </h3>
      <div>
        <label className="block text-sm font-medium text-[#8B949E] mb-1">CTA Title</label>
        <input
          type="text"
          value={settings.cta_title}
          onChange={(e) => setSettings({ ...settings, cta_title: e.target.value })}
          className="w-full px-4 py-2 bg-[#121820] border border-[rgba(255,255,255,0.08)] rounded-lg text-[#F5F7FA] focus:outline-none focus:border-[#39FF88] min-h-[44px]"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-[#8B949E] mb-1">CTA Subtitle</label>
        <input
          type="text"
          value={settings.cta_subtitle}
          onChange={(e) => setSettings({ ...settings, cta_subtitle: e.target.value })}
          className="w-full px-4 py-2 bg-[#121820] border border-[rgba(255,255,255,0.08)] rounded-lg text-[#F5F7FA] focus:outline-none focus:border-[#39FF88] min-h-[44px]"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-[#8B949E] mb-1">CTA Text</label>
        <textarea
          value={settings.cta_text}
          onChange={(e) => setSettings({ ...settings, cta_text: e.target.value })}
          rows={3}
          className="w-full px-4 py-2 bg-[#121820] border border-[rgba(255,255,255,0.08)] rounded-lg text-[#F5F7FA] focus:outline-none focus:border-[#39FF88]"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-[#8B949E] mb-1">CTA Button Text</label>
        <input
          type="text"
          value={settings.cta_button_text}
          onChange={(e) => setSettings({ ...settings, cta_button_text: e.target.value })}
          className="w-full px-4 py-2 bg-[#121820] border border-[rgba(255,255,255,0.08)] rounded-lg text-[#F5F7FA] focus:outline-none focus:border-[#39FF88] min-h-[44px]"
        />
      </div>
    </div>
  );
}

function SeoSettings({ settings, setSettings }: any) {
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-[#8B949E] mb-1">Meta Description</label>
        <textarea
          value={settings.meta_description}
          onChange={(e) => setSettings({ ...settings, meta_description: e.target.value })}
          rows={2}
          className="w-full px-4 py-2 bg-[#121820] border border-[rgba(255,255,255,0.08)] rounded-lg text-[#F5F7FA] focus:outline-none focus:border-[#39FF88]"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-[#8B949E] mb-1">Meta Keywords</label>
        <input
          type="text"
          value={settings.meta_keywords}
          onChange={(e) => setSettings({ ...settings, meta_keywords: e.target.value })}
          className="w-full px-4 py-2 bg-[#121820] border border-[rgba(255,255,255,0.08)] rounded-lg text-[#F5F7FA] focus:outline-none focus:border-[#39FF88] min-h-[44px]"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-[#8B949E] mb-1">Twitter Handle</label>
        <input
          type="text"
          value={settings.twitter_handle}
          onChange={(e) => setSettings({ ...settings, twitter_handle: e.target.value })}
          className="w-full px-4 py-2 bg-[#121820] border border-[rgba(255,255,255,0.08)] rounded-lg text-[#F5F7FA] focus:outline-none focus:border-[#39FF88] min-h-[44px]"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-[#8B949E] mb-1">OG Image URL</label>
        <input
          type="text"
          value={settings.og_image}
          onChange={(e) => setSettings({ ...settings, og_image: e.target.value })}
          className="w-full px-4 py-2 bg-[#121820] border border-[rgba(255,255,255,0.08)] rounded-lg text-[#F5F7FA] focus:outline-none focus:border-[#39FF88] min-h-[44px]"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-[#8B949E] mb-1">Google Analytics ID</label>
        <input
          type="text"
          value={settings.google_analytics_id}
          onChange={(e) => setSettings({ ...settings, google_analytics_id: e.target.value })}
          placeholder="G-XXXXXXXXXX"
          className="w-full px-4 py-2 bg-[#121820] border border-[rgba(255,255,255,0.08)] rounded-lg text-[#F5F7FA] focus:outline-none focus:border-[#39FF88] min-h-[44px]"
        />
      </div>
    </div>
  );
}

function StatsSettings({ settings, setSettings }: any) {
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-[#8B949E] mb-1 flex items-center gap-2">
          <Users size={16} className="text-[#39FF88]" />
          Members Count
        </label>
        <input
          type="text"
          value={settings.members_count}
          onChange={(e) => setSettings({ ...settings, members_count: e.target.value })}
          placeholder="2,847+"
          className="w-full px-4 py-2 bg-[#121820] border border-[rgba(255,255,255,0.08)] rounded-lg text-[#F5F7FA] focus:outline-none focus:border-[#39FF88] min-h-[44px]"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-[#8B949E] mb-1 flex items-center gap-2">
          <TrendingUp size={16} className="text-[#39FF88]" />
          Signals Count
        </label>
        <input
          type="text"
          value={settings.signals_count}
          onChange={(e) => setSettings({ ...settings, signals_count: e.target.value })}
          placeholder="156+"
          className="w-full px-4 py-2 bg-[#121820] border border-[rgba(255,255,255,0.08)] rounded-lg text-[#F5F7FA] focus:outline-none focus:border-[#39FF88] min-h-[44px]"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-[#8B949E] mb-1 flex items-center gap-2">
          <Award size={16} className="text-[#39FF88]" />
          Uptime Count
        </label>
        <input
          type="text"
          value={settings.uptime_count}
          onChange={(e) => setSettings({ ...settings, uptime_count: e.target.value })}
          placeholder="99.7%"
          className="w-full px-4 py-2 bg-[#121820] border border-[rgba(255,255,255,0.08)] rounded-lg text-[#F5F7FA] focus:outline-none focus:border-[#39FF88] min-h-[44px]"
        />
      </div>
    </div>
  );
}

function AnimationSettings({ settings, setSettings }: any) {
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-[#8B949E] mb-1">Animation Duration (seconds)</label>
        <input
          type="number"
          step="0.1"
          value={settings.animation_duration}
          onChange={(e) => setSettings({ ...settings, animation_duration: e.target.value })}
          className="w-full px-4 py-2 bg-[#121820] border border-[rgba(255,255,255,0.08)] rounded-lg text-[#F5F7FA] focus:outline-none focus:border-[#39FF88] min-h-[44px]"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-[#8B949E] mb-1">Stagger Delay</label>
        <input
          type="number"
          step="0.01"
          value={settings.animation_stagger_delay}
          onChange={(e) => setSettings({ ...settings, animation_stagger_delay: e.target.value })}
          className="w-full px-4 py-2 bg-[#121820] border border-[rgba(255,255,255,0.08)] rounded-lg text-[#F5F7FA] focus:outline-none focus:border-[#39FF88] min-h-[44px]"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-[#8B949E] mb-1">Preloader Duration (ms)</label>
        <input
          type="number"
          value={settings.preloader_duration}
          onChange={(e) => setSettings({ ...settings, preloader_duration: e.target.value })}
          className="w-full px-4 py-2 bg-[#121820] border border-[rgba(255,255,255,0.08)] rounded-lg text-[#F5F7FA] focus:outline-none focus:border-[#39FF88] min-h-[44px]"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-[#8B949E] mb-1">Preloader Text</label>
        <input
          type="text"
          value={settings.preloader_text}
          onChange={(e) => setSettings({ ...settings, preloader_text: e.target.value })}
          placeholder="Loading {progress}%"
          className="w-full px-4 py-2 bg-[#121820] border border-[rgba(255,255,255,0.08)] rounded-lg text-[#F5F7FA] focus:outline-none focus:border-[#39FF88] min-h-[44px]"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-[#8B949E] mb-1">Animation Ease</label>
        <select
          value={settings.animation_ease}
          onChange={(e) => setSettings({ ...settings, animation_ease: e.target.value })}
          className="w-full px-4 py-2 bg-[#121820] border border-[rgba(255,255,255,0.08)] rounded-lg text-[#F5F7FA] focus:outline-none focus:border-[#39FF88] min-h-[44px]"
        >
          <option value="power2.out">Power2 Out</option>
          <option value="power3.out">Power3 Out</option>
          <option value="easeInOut">Ease In Out</option>
          <option value="easeOut">Ease Out</option>
          <option value="linear">Linear</option>
        </select>
      </div>
    </div>
  );
}

function AdvancedSettings({ settings, setSettings }: any) {
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-[#8B949E] mb-1">Maintenance Mode</label>
        <select
          value={settings.maintenance_mode}
          onChange={(e) => setSettings({ ...settings, maintenance_mode: e.target.value })}
          className="w-full px-4 py-2 bg-[#121820] border border-[rgba(255,255,255,0.08)] rounded-lg text-[#F5F7FA] focus:outline-none focus:border-[#39FF88] min-h-[44px]"
        >
          <option value="false">Disabled</option>
          <option value="true">Enabled</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-[#8B949E] mb-1">Maintenance Message</label>
        <textarea
          value={settings.maintenance_message}
          onChange={(e) => setSettings({ ...settings, maintenance_message: e.target.value })}
          rows={3}
          className="w-full px-4 py-2 bg-[#121820] border border-[rgba(255,255,255,0.08)] rounded-lg text-[#F5F7FA] focus:outline-none focus:border-[#39FF88]"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-[#8B949E] mb-1">Enable Registration</label>
        <select
          value={settings.enable_registration}
          onChange={(e) => setSettings({ ...settings, enable_registration: e.target.value })}
          className="w-full px-4 py-2 bg-[#121820] border border-[rgba(255,255,255,0.08)] rounded-lg text-[#F5F7FA] focus:outline-none focus:border-[#39FF88] min-h-[44px]"
        >
          <option value="true">Enabled</option>
          <option value="false">Disabled</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-[#8B949E] mb-1">Enable Dark Mode</label>
        <select
          value={settings.enable_dark_mode}
          onChange={(e) => setSettings({ ...settings, enable_dark_mode: e.target.value })}
          className="w-full px-4 py-2 bg-[#121820] border border-[rgba(255,255,255,0.08)] rounded-lg text-[#F5F7FA] focus:outline-none focus:border-[#39FF88] min-h-[44px]"
        >
          <option value="true">Enabled</option>
          <option value="false">Disabled</option>
        </select>
      </div>
    </div>
  );
}

function PageSettings({ settings, setSettings }: any) {
  return (
    <div className="space-y-4">
      <h3 className="text-sm font-semibold text-[#F5F7FA] flex items-center gap-2">
        <FileText size={16} className="text-accent-bullish" />
        Analysis Page
      </h3>
      <div>
        <label className="block text-sm font-medium text-[#8B949E] mb-1">Analysis Title</label>
        <input
          type="text"
          value={settings.analysis_title}
          onChange={(e) => setSettings({ ...settings, analysis_title: e.target.value })}
          className="w-full px-4 py-2 bg-[#121820] border border-[rgba(255,255,255,0.08)] rounded-lg text-[#F5F7FA] focus:outline-none focus:border-[#39FF88] min-h-[44px]"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-[#8B949E] mb-1">Analysis Subtitle</label>
        <input
          type="text"
          value={settings.analysis_subtitle}
          onChange={(e) => setSettings({ ...settings, analysis_subtitle: e.target.value })}
          className="w-full px-4 py-2 bg-[#121820] border border-[rgba(255,255,255,0.08)] rounded-lg text-[#F5F7FA] focus:outline-none focus:border-[#39FF88] min-h-[44px]"
        />
      </div>

      <h3 className="text-sm font-semibold text-[#F5F7FA] flex items-center gap-2 mt-6">
        <BarChart3 size={16} className="text-accent-bullish" />
        Signals Page
      </h3>
      <div>
        <label className="block text-sm font-medium text-[#8B949E] mb-1">Signals Title</label>
        <input
          type="text"
          value={settings.signals_title}
          onChange={(e) => setSettings({ ...settings, signals_title: e.target.value })}
          className="w-full px-4 py-2 bg-[#121820] border border-[rgba(255,255,255,0.08)] rounded-lg text-[#F5F7FA] focus:outline-none focus:border-[#39FF88] min-h-[44px]"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-[#8B949E] mb-1">Signals Subtitle</label>
        <input
          type="text"
          value={settings.signals_subtitle}
          onChange={(e) => setSettings({ ...settings, signals_subtitle: e.target.value })}
          className="w-full px-4 py-2 bg-[#121820] border border-[rgba(255,255,255,0.08)] rounded-lg text-[#F5F7FA] focus:outline-none focus:border-[#39FF88] min-h-[44px]"
        />
      </div>

      <h3 className="text-sm font-semibold text-[#F5F7FA] flex items-center gap-2 mt-6">
        <Globe size={16} className="text-accent-bullish" />
        Markets Page
      </h3>
      <div>
        <label className="block text-sm font-medium text-[#8B949E] mb-1">Markets Title</label>
        <input
          type="text"
          value={settings.markets_title}
          onChange={(e) => setSettings({ ...settings, markets_title: e.target.value })}
          className="w-full px-4 py-2 bg-[#121820] border border-[rgba(255,255,255,0.08)] rounded-lg text-[#F5F7FA] focus:outline-none focus:border-[#39FF88] min-h-[44px]"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-[#8B949E] mb-1">Markets Subtitle</label>
        <input
          type="text"
          value={settings.markets_subtitle}
          onChange={(e) => setSettings({ ...settings, markets_subtitle: e.target.value })}
          className="w-full px-4 py-2 bg-[#121820] border border-[rgba(255,255,255,0.08)] rounded-lg text-[#F5F7FA] focus:outline-none focus:border-[#39FF88] min-h-[44px]"
        />
      </div>

      <h3 className="text-sm font-semibold text-[#F5F7FA] flex items-center gap-2 mt-6">
        <Users size={16} className="text-accent-bullish" />
        About Page
      </h3>
      <div>
        <label className="block text-sm font-medium text-[#8B949E] mb-1">About Title</label>
        <input
          type="text"
          value={settings.about_title}
          onChange={(e) => setSettings({ ...settings, about_title: e.target.value })}
          className="w-full px-4 py-2 bg-[#121820] border border-[rgba(255,255,255,0.08)] rounded-lg text-[#F5F7FA] focus:outline-none focus:border-[#39FF88] min-h-[44px]"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-[#8B949E] mb-1">About Subtitle</label>
        <input
          type="text"
          value={settings.about_subtitle}
          onChange={(e) => setSettings({ ...settings, about_subtitle: e.target.value })}
          className="w-full px-4 py-2 bg-[#121820] border border-[rgba(255,255,255,0.08)] rounded-lg text-[#F5F7FA] focus:outline-none focus:border-[#39FF88] min-h-[44px]"
        />
      </div>

      <h3 className="text-sm font-semibold text-[#F5F7FA] flex items-center gap-2 mt-6">
        <TrendingUp size={16} className="text-accent-bullish" />
        TradingView Page
      </h3>
      <div>
        <label className="block text-sm font-medium text-[#8B949E] mb-1">TradingView Title</label>
        <input
          type="text"
          value={settings.tradingview_title}
          onChange={(e) => setSettings({ ...settings, tradingview_title: e.target.value })}
          className="w-full px-4 py-2 bg-[#121820] border border-[rgba(255,255,255,0.08)] rounded-lg text-[#F5F7FA] focus:outline-none focus:border-[#39FF88] min-h-[44px]"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-[#8B949E] mb-1">TradingView Subtitle</label>
        <input
          type="text"
          value={settings.tradingview_subtitle}
          onChange={(e) => setSettings({ ...settings, tradingview_subtitle: e.target.value })}
          className="w-full px-4 py-2 bg-[#121820] border border-[rgba(255,255,255,0.08)] rounded-lg text-[#F5F7FA] focus:outline-none focus:border-[#39FF88] min-h-[44px]"
        />
      </div>

      <h3 className="text-sm font-semibold text-[#F5F7FA] flex items-center gap-2 mt-6">
        <Wrench size={16} className="text-accent-bullish" />
        Tools Page
      </h3>
      <div>
        <label className="block text-sm font-medium text-[#8B949E] mb-1">Tools Title</label>
        <input
          type="text"
          value={settings.tools_title}
          onChange={(e) => setSettings({ ...settings, tools_title: e.target.value })}
          className="w-full px-4 py-2 bg-[#121820] border border-[rgba(255,255,255,0.08)] rounded-lg text-[#F5F7FA] focus:outline-none focus:border-[#39FF88] min-h-[44px]"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-[#8B949E] mb-1">Tools Subtitle</label>
        <input
          type="text"
          value={settings.tools_subtitle}
          onChange={(e) => setSettings({ ...settings, tools_subtitle: e.target.value })}
          className="w-full px-4 py-2 bg-[#121820] border border-[rgba(255,255,255,0.08)] rounded-lg text-[#F5F7FA] focus:outline-none focus:border-[#39FF88] min-h-[44px]"
        />
      </div>
    </div>
  );
}

function HomepageSettings({ settings, setSettings }: any) {
  const hp = settings.homepage || {};

  const updateHomepage = (key: string, value: any) => {
    setSettings({
      ...settings,
      homepage: {
        ...hp,
        [key]: value
      }
    });
  };

  const addFeature = () => {
    const features = hp.features || [];
    updateHomepage('features', [
      ...features,
      { icon: 'Globe', title: 'New Feature', description: 'Description here' }
    ]);
  };

  const removeFeature = (index: number) => {
    const features = hp.features || [];
    features.splice(index, 1);
    updateHomepage('features', features);
  };

  const updateFeature = (index: number, field: string, value: string) => {
    const features = hp.features || [];
    features[index][field] = value;
    updateHomepage('features', features);
  };

  const addTool = () => {
    const tools = hp.tools || [];
    updateHomepage('tools', [
      ...tools,
      { icon: 'Calculator', label: 'New Tool' }
    ]);
  };

  const removeTool = (index: number) => {
    const tools = hp.tools || [];
    tools.splice(index, 1);
    updateHomepage('tools', tools);
  };

  const updateTool = (index: number, field: string, value: string) => {
    const tools = hp.tools || [];
    tools[index][field] = value;
    updateHomepage('tools', tools);
  };

  const addEducation = () => {
    const courses = hp.education_courses || [];
    updateHomepage('education_courses', [
      ...courses,
      { title: 'New Course', level: 'Beginner', icon: 'BookOpen' }
    ]);
  };

  const removeEducation = (index: number) => {
    const courses = hp.education_courses || [];
    courses.splice(index, 1);
    updateHomepage('education_courses', courses);
  };

  const updateEducation = (index: number, field: string, value: string) => {
    const courses = hp.education_courses || [];
    courses[index][field] = value;
    updateHomepage('education_courses', courses);
  };

  const addTrustItem = () => {
    const items = hp.trust_items || [];
    updateHomepage('trust_items', [...items, 'New Item']);
  };

  const removeTrustItem = (index: number) => {
    const items = hp.trust_items || [];
    items.splice(index, 1);
    updateHomepage('trust_items', items);
  };

  const updateTrustItem = (index: number, value: string) => {
    const items = hp.trust_items || [];
    items[index] = value;
    updateHomepage('trust_items', items);
  };

  const addBenefit = () => {
    const benefits = hp.cta_benefits || [];
    updateHomepage('cta_benefits', [...benefits, 'New benefit']);
  };

  const removeBenefit = (index: number) => {
    const benefits = hp.cta_benefits || [];
    benefits.splice(index, 1);
    updateHomepage('cta_benefits', benefits);
  };

  const updateBenefit = (index: number, value: string) => {
    const benefits = hp.cta_benefits || [];
    benefits[index] = value;
    updateHomepage('cta_benefits', benefits);
  };

  return (
    <div className="space-y-6">
      {/* Hero Section */}
      <div className="bg-[#121820] rounded-xl p-4 border border-[rgba(255,255,255,0.08)]">
        <h3 className="text-sm font-semibold text-[#F5F7FA] flex items-center gap-2 mb-4">
          <Sparkles size={16} className="text-accent-bullish" />
          Hero Section
        </h3>
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-[#8B949E] mb-1">Hero Title</label>
            <input
              type="text"
              value={hp.hero_title || ''}
              onChange={(e) => updateHomepage('hero_title', e.target.value)}
              className="w-full px-4 py-2 bg-[#0D1117] border border-[rgba(255,255,255,0.08)] rounded-lg text-[#F5F7FA] focus:outline-none focus:border-[#39FF88] min-h-[44px]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#8B949E] mb-1">Hero Subtitle</label>
            <textarea
              value={hp.hero_subtitle || ''}
              onChange={(e) => updateHomepage('hero_subtitle', e.target.value)}
              rows={2}
              className="w-full px-4 py-2 bg-[#0D1117] border border-[rgba(255,255,255,0.08)] rounded-lg text-[#F5F7FA] focus:outline-none focus:border-[#39FF88]"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-[#8B949E] mb-1">CTA Text</label>
              <input
                type="text"
                value={hp.hero_cta_text || ''}
                onChange={(e) => updateHomepage('hero_cta_text', e.target.value)}
                className="w-full px-4 py-2 bg-[#0D1117] border border-[rgba(255,255,255,0.08)] rounded-lg text-[#F5F7FA] focus:outline-none focus:border-[#39FF88] min-h-[44px]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#8B949E] mb-1">Secondary CTA</label>
              <input
                type="text"
                value={hp.hero_cta_secondary || ''}
                onChange={(e) => updateHomepage('hero_cta_secondary', e.target.value)}
                className="w-full px-4 py-2 bg-[#0D1117] border border-[rgba(255,255,255,0.08)] rounded-lg text-[#F5F7FA] focus:outline-none focus:border-[#39FF88] min-h-[44px]"
              />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-sm font-medium text-[#8B949E] mb-1">Market Status Label</label>
              <input
                type="text"
                value={hp.market_status_label || ''}
                onChange={(e) => updateHomepage('market_status_label', e.target.value)}
                className="w-full px-4 py-2 bg-[#0D1117] border border-[rgba(255,255,255,0.08)] rounded-lg text-[#F5F7FA] focus:outline-none focus:border-[#39FF88] min-h-[44px]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#8B949E] mb-1">Trend Label</label>
              <input
                type="text"
                value={hp.market_trend_label || ''}
                onChange={(e) => updateHomepage('market_trend_label', e.target.value)}
                className="w-full px-4 py-2 bg-[#0D1117] border border-[rgba(255,255,255,0.08)] rounded-lg text-[#F5F7FA] focus:outline-none focus:border-[#39FF88] min-h-[44px]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#8B949E] mb-1">Volatility Label</label>
              <input
                type="text"
                value={hp.market_volatility_label || ''}
                onChange={(e) => updateHomepage('market_volatility_label', e.target.value)}
                className="w-full px-4 py-2 bg-[#0D1117] border border-[rgba(255,255,255,0.08)] rounded-lg text-[#F5F7FA] focus:outline-none focus:border-[#39FF88] min-h-[44px]"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Trust Items */}
      <div className="bg-[#121820] rounded-xl p-4 border border-[rgba(255,255,255,0.08)]">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-[#F5F7FA] flex items-center gap-2">
            <Crown size={16} className="text-accent-bullish" />
            Trust Items
          </h3>
          <button onClick={addTrustItem} className="px-3 py-1.5 bg-[#39FF88]/20 text-[#39FF88] rounded-lg text-xs hover:bg-[#39FF88]/30 transition-colors flex items-center gap-1">
            <Plus size={14} /> Add
          </button>
        </div>
        <div className="space-y-2">
          {(hp.trust_items || []).map((item: string, index: number) => (
            <div key={index} className="flex items-center gap-2 bg-[#0D1117] rounded-lg p-2 border border-[rgba(255,255,255,0.05)]">
              <input
                type="text"
                value={item}
                onChange={(e) => updateTrustItem(index, e.target.value)}
                className="flex-1 px-3 py-1.5 bg-[#121820] border border-[rgba(255,255,255,0.08)] rounded-lg text-[#F5F7FA] text-sm focus:outline-none focus:border-[#39FF88]"
              />
              <button onClick={() => removeTrustItem(index)} className="p-1 hover:bg-[#FF4D5F]/20 rounded-lg text-[#FF4D5F]">
                <Trash2 size={14} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Features */}
      <div className="bg-[#121820] rounded-xl p-4 border border-[rgba(255,255,255,0.08)]">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-[#F5F7FA] flex items-center gap-2">
            <Zap size={16} className="text-accent-bullish" />
            Features
          </h3>
          <button onClick={addFeature} className="px-3 py-1.5 bg-[#39FF88]/20 text-[#39FF88] rounded-lg text-xs hover:bg-[#39FF88]/30 transition-colors flex items-center gap-1">
            <Plus size={14} /> Add Feature
          </button>
        </div>
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-[#8B949E] mb-1">Features Title</label>
            <input
              type="text"
              value={hp.features_title || ''}
              onChange={(e) => updateHomepage('features_title', e.target.value)}
              className="w-full px-4 py-2 bg-[#0D1117] border border-[rgba(255,255,255,0.08)] rounded-lg text-[#F5F7FA] focus:outline-none focus:border-[#39FF88] min-h-[44px]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#8B949E] mb-1">Features Subtitle</label>
            <input
              type="text"
              value={hp.features_subtitle || ''}
              onChange={(e) => updateHomepage('features_subtitle', e.target.value)}
              className="w-full px-4 py-2 bg-[#0D1117] border border-[rgba(255,255,255,0.08)] rounded-lg text-[#F5F7FA] focus:outline-none focus:border-[#39FF88] min-h-[44px]"
            />
          </div>
          {(hp.features || []).map((feature: any, index: number) => (
            <div key={index} className="bg-[#0D1117] rounded-lg p-3 border border-[rgba(255,255,255,0.05)]">
              <div className="flex items-center gap-2 mb-2">
                <GripVertical size={16} className="text-text-muted" />
                <span className="text-xs text-text-muted">Feature {index + 1}</span>
                <button onClick={() => removeFeature(index)} className="ml-auto p-1 hover:bg-[#FF4D5F]/20 rounded-lg text-[#FF4D5F]">
                  <Trash2 size={14} />
                </button>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <input
                  type="text"
                  value={feature.icon || ''}
                  onChange={(e) => updateFeature(index, 'icon', e.target.value)}
                  placeholder="Icon"
                  className="px-3 py-1.5 bg-[#121820] border border-[rgba(255,255,255,0.08)] rounded-lg text-[#F5F7FA] text-sm focus:outline-none focus:border-[#39FF88]"
                />
                <input
                  type="text"
                  value={feature.title || ''}
                  onChange={(e) => updateFeature(index, 'title', e.target.value)}
                  placeholder="Title"
                  className="px-3 py-1.5 bg-[#121820] border border-[rgba(255,255,255,0.08)] rounded-lg text-[#F5F7FA] text-sm focus:outline-none focus:border-[#39FF88]"
                />
                <input
                  type="text"
                  value={feature.description || ''}
                  onChange={(e) => updateFeature(index, 'description', e.target.value)}
                  placeholder="Description"
                  className="px-3 py-1.5 bg-[#121820] border border-[rgba(255,255,255,0.08)] rounded-lg text-[#F5F7FA] text-sm focus:outline-none focus:border-[#39FF88]"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Philosophy */}
      <div className="bg-[#121820] rounded-xl p-4 border border-[rgba(255,255,255,0.08)]">
        <h3 className="text-sm font-semibold text-[#F5F7FA] flex items-center gap-2 mb-4">
          <BookOpen size={16} className="text-accent-bullish" />
          Philosophy
        </h3>
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-[#8B949E] mb-1">Philosophy Title</label>
            <input
              type="text"
              value={hp.philosophy_title || ''}
              onChange={(e) => updateHomepage('philosophy_title', e.target.value)}
              className="w-full px-4 py-2 bg-[#0D1117] border border-[rgba(255,255,255,0.08)] rounded-lg text-[#F5F7FA] focus:outline-none focus:border-[#39FF88] min-h-[44px]"
            />
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-sm font-medium text-[#39FF88] mb-1">READ Label</label>
              <input
                type="text"
                value={hp.philosophy_read_label || ''}
                onChange={(e) => updateHomepage('philosophy_read_label', e.target.value)}
                className="w-full px-4 py-2 bg-[#0D1117] border border-[rgba(255,255,255,0.08)] rounded-lg text-[#F5F7FA] focus:outline-none focus:border-[#39FF88] min-h-[44px]"
              />
              <input
                type="text"
                value={hp.philosophy_read_desc || ''}
                onChange={(e) => updateHomepage('philosophy_read_desc', e.target.value)}
                placeholder="Description"
                className="w-full px-4 py-2 bg-[#0D1117] border border-[rgba(255,255,255,0.08)] rounded-lg text-[#F5F7FA] focus:outline-none focus:border-[#39FF88] min-h-[44px] mt-1"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#F5A623] mb-1">PLAN Label</label>
              <input
                type="text"
                value={hp.philosophy_plan_label || ''}
                onChange={(e) => updateHomepage('philosophy_plan_label', e.target.value)}
                className="w-full px-4 py-2 bg-[#0D1117] border border-[rgba(255,255,255,0.08)] rounded-lg text-[#F5F7FA] focus:outline-none focus:border-[#39FF88] min-h-[44px]"
              />
              <input
                type="text"
                value={hp.philosophy_plan_desc || ''}
                onChange={(e) => updateHomepage('philosophy_plan_desc', e.target.value)}
                placeholder="Description"
                className="w-full px-4 py-2 bg-[#0D1117] border border-[rgba(255,255,255,0.08)] rounded-lg text-[#F5F7FA] focus:outline-none focus:border-[#39FF88] min-h-[44px] mt-1"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#FF4D5F] mb-1">EXECUTE Label</label>
              <input
                type="text"
                value={hp.philosophy_execute_label || ''}
                onChange={(e) => updateHomepage('philosophy_execute_label', e.target.value)}
                className="w-full px-4 py-2 bg-[#0D1117] border border-[rgba(255,255,255,0.08)] rounded-lg text-[#F5F7FA] focus:outline-none focus:border-[#39FF88] min-h-[44px]"
              />
              <input
                type="text"
                value={hp.philosophy_execute_desc || ''}
                onChange={(e) => updateHomepage('philosophy_execute_desc', e.target.value)}
                placeholder="Description"
                className="w-full px-4 py-2 bg-[#0D1117] border border-[rgba(255,255,255,0.08)] rounded-lg text-[#F5F7FA] focus:outline-none focus:border-[#39FF88] min-h-[44px] mt-1"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Tools */}
      <div className="bg-[#121820] rounded-xl p-4 border border-[rgba(255,255,255,0.08)]">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-[#F5F7FA] flex items-center gap-2">
            <Calculator size={16} className="text-accent-bullish" />
            Tools Preview
          </h3>
          <button onClick={addTool} className="px-3 py-1.5 bg-[#39FF88]/20 text-[#39FF88] rounded-lg text-xs hover:bg-[#39FF88]/30 transition-colors flex items-center gap-1">
            <Plus size={14} /> Add Tool
          </button>
        </div>
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-[#8B949E] mb-1">Tools Title</label>
            <input
              type="text"
              value={hp.tools_title || ''}
              onChange={(e) => updateHomepage('tools_title', e.target.value)}
              className="w-full px-4 py-2 bg-[#0D1117] border border-[rgba(255,255,255,0.08)] rounded-lg text-[#F5F7FA] focus:outline-none focus:border-[#39FF88] min-h-[44px]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#8B949E] mb-1">Tools Subtitle</label>
            <input
              type="text"
              value={hp.tools_subtitle || ''}
              onChange={(e) => updateHomepage('tools_subtitle', e.target.value)}
              className="w-full px-4 py-2 bg-[#0D1117] border border-[rgba(255,255,255,0.08)] rounded-lg text-[#F5F7FA] focus:outline-none focus:border-[#39FF88] min-h-[44px]"
            />
          </div>
          <div className="grid grid-cols-2 gap-2">
            {(hp.tools || []).map((tool: any, index: number) => (
              <div key={index} className="bg-[#0D1117] rounded-lg p-2 border border-[rgba(255,255,255,0.05)] flex items-center gap-2">
                <input
                  type="text"
                  value={tool.icon || ''}
                  onChange={(e) => updateTool(index, 'icon', e.target.value)}
                  placeholder="Icon"
                  className="flex-1 px-2 py-1 bg-[#121820] border border-[rgba(255,255,255,0.08)] rounded-lg text-[#F5F7FA] text-xs focus:outline-none focus:border-[#39FF88]"
                />
                <input
                  type="text"
                  value={tool.label || ''}
                  onChange={(e) => updateTool(index, 'label', e.target.value)}
                  placeholder="Label"
                  className="flex-1 px-2 py-1 bg-[#121820] border border-[rgba(255,255,255,0.08)] rounded-lg text-[#F5F7FA] text-xs focus:outline-none focus:border-[#39FF88]"
                />
                <button onClick={() => removeTool(index)} className="p-1 hover:bg-[#FF4D5F]/20 rounded-lg text-[#FF4D5F]">
                  <Trash2 size={12} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Education */}
      <div className="bg-[#121820] rounded-xl p-4 border border-[rgba(255,255,255,0.08)]">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-[#F5F7FA] flex items-center gap-2">
            <BookOpen size={16} className="text-accent-bullish" />
            Education Preview
          </h3>
          <button onClick={addEducation} className="px-3 py-1.5 bg-[#39FF88]/20 text-[#39FF88] rounded-lg text-xs hover:bg-[#39FF88]/30 transition-colors flex items-center gap-1">
            <Plus size={14} /> Add Course
          </button>
        </div>
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-[#8B949E] mb-1">Education Title</label>
            <input
              type="text"
              value={hp.education_title || ''}
              onChange={(e) => updateHomepage('education_title', e.target.value)}
              className="w-full px-4 py-2 bg-[#0D1117] border border-[rgba(255,255,255,0.08)] rounded-lg text-[#F5F7FA] focus:outline-none focus:border-[#39FF88] min-h-[44px]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#8B949E] mb-1">Education Subtitle</label>
            <input
              type="text"
              value={hp.education_subtitle || ''}
              onChange={(e) => updateHomepage('education_subtitle', e.target.value)}
              className="w-full px-4 py-2 bg-[#0D1117] border border-[rgba(255,255,255,0.08)] rounded-lg text-[#F5F7FA] focus:outline-none focus:border-[#39FF88] min-h-[44px]"
            />
          </div>
          {(hp.education_courses || []).map((course: any, index: number) => (
            <div key={index} className="bg-[#0D1117] rounded-lg p-2 border border-[rgba(255,255,255,0.05)] flex items-center gap-2">
              <input
                type="text"
                value={course.title || ''}
                onChange={(e) => updateEducation(index, 'title', e.target.value)}
                placeholder="Course title"
                className="flex-1 px-2 py-1 bg-[#121820] border border-[rgba(255,255,255,0.08)] rounded-lg text-[#F5F7FA] text-xs focus:outline-none focus:border-[#39FF88]"
              />
              <select
                value={course.level || 'Beginner'}
                onChange={(e) => updateEducation(index, 'level', e.target.value)}
                className="px-2 py-1 bg-[#121820] border border-[rgba(255,255,255,0.08)] rounded-lg text-[#F5F7FA] text-xs focus:outline-none focus:border-[#39FF88]"
              >
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
              <input
                type="text"
                value={course.icon || ''}
                onChange={(e) => updateEducation(index, 'icon', e.target.value)}
                placeholder="Icon"
                className="w-20 px-2 py-1 bg-[#121820] border border-[rgba(255,255,255,0.08)] rounded-lg text-[#F5F7FA] text-xs focus:outline-none focus:border-[#39FF88]"
              />
              <button onClick={() => removeEducation(index)} className="p-1 hover:bg-[#FF4D5F]/20 rounded-lg text-[#FF4D5F]">
                <Trash2 size={12} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="bg-[#121820] rounded-xl p-4 border border-[rgba(255,255,255,0.08)]">
        <h3 className="text-sm font-semibold text-[#F5F7FA] flex items-center gap-2 mb-4">
          <Flame size={16} className="text-accent-bullish" />
          CTA Section
        </h3>
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-[#8B949E] mb-1">CTA Title</label>
            <input
              type="text"
              value={hp.cta_title || ''}
              onChange={(e) => updateHomepage('cta_title', e.target.value)}
              className="w-full px-4 py-2 bg-[#0D1117] border border-[rgba(255,255,255,0.08)] rounded-lg text-[#F5F7FA] focus:outline-none focus:border-[#39FF88] min-h-[44px]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#8B949E] mb-1">CTA Subtitle</label>
            <textarea
              value={hp.cta_subtitle || ''}
              onChange={(e) => updateHomepage('cta_subtitle', e.target.value)}
              rows={2}
              className="w-full px-4 py-2 bg-[#0D1117] border border-[rgba(255,255,255,0.08)] rounded-lg text-[#F5F7FA] focus:outline-none focus:border-[#39FF88]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#8B949E] mb-1">CTA Button</label>
            <input
              type="text"
              value={hp.cta_button || ''}
              onChange={(e) => updateHomepage('cta_button', e.target.value)}
              className="w-full px-4 py-2 bg-[#0D1117] border border-[rgba(255,255,255,0.08)] rounded-lg text-[#F5F7FA] focus:outline-none focus:border-[#39FF88] min-h-[44px]"
            />
          </div>
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium text-[#8B949E]">CTA Benefits</label>
              <button onClick={addBenefit} className="px-2 py-1 bg-[#39FF88]/20 text-[#39FF88] rounded-lg text-xs hover:bg-[#39FF88]/30 transition-colors flex items-center gap-1">
                <Plus size={12} /> Add
              </button>
            </div>
            {(hp.cta_benefits || []).map((benefit: string, index: number) => (
              <div key={index} className="flex items-center gap-2 mt-1">
                <input
                  type="text"
                  value={benefit}
                  onChange={(e) => updateBenefit(index, e.target.value)}
                  className="flex-1 px-3 py-1.5 bg-[#121820] border border-[rgba(255,255,255,0.08)] rounded-lg text-[#F5F7FA] text-sm focus:outline-none focus:border-[#39FF88]"
                />
                <button onClick={() => removeBenefit(index)} className="p-1 hover:bg-[#FF4D5F]/20 rounded-lg text-[#FF4D5F]">
                  <Trash2 size={14} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
