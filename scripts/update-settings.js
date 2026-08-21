const fs = require('fs');
const path = require('path');

const DB_PATH = path.join(process.cwd(), 'swfx-data.json');

// Default settings lengkap
const defaultSettings = {
  // Site Settings
  site_name: 'SWFX',
  site_description: 'READ. PLAN. EXECUTE.',
  site_tagline: 'Understand the market. Build the plan. Execute with discipline.',
  contact_email: 'support@swfx.com',
  
  // Social Links
  telegram_link: 'https://t.me/swfxglobal',
  twitter_link: 'https://twitter.com/swfx',
  youtube_link: 'https://youtube.com/swfx',
  
  // Branding
  logo_text: 'SWFX',
  footer_text: 'READ. PLAN. EXECUTE. — A premium forex community',
  copyright_text: 'All rights reserved.',
  
  // Features
  enable_preloader: 'true',
  enable_custom_cursor: 'true',
  enable_smooth_scroll: 'true',
  enable_animations: 'true',
  enable_market_ticker: 'true',
  enable_signals: 'true',
  
  // Appearance
  theme_mode: 'dark',
  accent_color: '#39FF88',
  secondary_color: '#FF4D5F',
  
  // Hero Section
  hero_title: 'READ.\nPLAN.\nEXECUTE.',
  hero_subtitle: 'Understand the market. Build the plan. Execute with discipline.',
  hero_cta_text: 'JOIN TELEGRAM',
  hero_cta_link: 'https://t.me/swfxglobal',
  
  // Philosophy Section
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
  
  // CTA Section
  cta_title: 'The Market Never Stops.',
  cta_subtitle: 'Neither Should Your Learning.',
  cta_text: 'Join the SWFX Telegram community for market analysis, trading insights, educational content, structured signals, and market discussion.',
  cta_button_text: 'JOIN SWFX TELEGRAM',
  
  // Footer
  footer_nav_title: 'Navigation',
  footer_community_title: 'Community',
  
  // SEO
  meta_description: 'Premium forex analysis, trading education, and structured signals for disciplined traders.',
  meta_keywords: 'forex,trading,forex signals,technical analysis,forex education,trading community,SWFX',
  og_image: '/og-image.png',
  twitter_handle: '@swfxglobal',
  
  // Animations
  animation_duration: '0.8',
  animation_ease: 'power2.out',
  animation_stagger_delay: '0.05',
  scroll_animation_threshold: '0.15',
  
  // Preloader
  preloader_duration: '2000',
  preloader_text: 'Loading {progress}%',
  
  // Stats
  members_count: '2,847+',
  signals_count: '156+',
  uptime_count: '99.7%',
  
  // Maintenance
  maintenance_mode: 'false',
  maintenance_message: 'We are currently undergoing maintenance. Please check back soon.',
  
  // Others
  enable_registration: 'true',
  enable_dark_mode: 'true',
  google_analytics_id: '',
  
  // Analysis Page
  analysis_title: 'Market Analysis',
  analysis_subtitle: 'Professional technical analysis with clear reasoning and structured approach.',
  
  // Markets Page
  markets_title: 'Live Market Data',
  markets_subtitle: 'Real-time prices and charts powered by TradingView',
  
  // Signals Page
  signals_title: 'SWFX Signals',
  signals_subtitle: 'Trading signals and market analysis from SWFX',
  
  // Learn Page
  learn_title: 'Learn the Why',
  learn_subtitle: "Don't just follow the trade. Understand the reason behind it.",
  
  // About Page
  about_title: 'About SWFX',
  about_subtitle: 'READ. PLAN. EXECUTE. — A premium forex community focused on analysis, education, and disciplined trading.',
  
  // TradingView Page
  tradingview_title: 'TradingView Profile',
  tradingview_subtitle: 'Published analysis and market views from SWFX.',
  
  // Admin
  admin_title: 'SWFX Admin',
  admin_subtitle: 'Login to manage signals',
};

// Load existing data
let data = {};
if (fs.existsSync(DB_PATH)) {
  data = JSON.parse(fs.readFileSync(DB_PATH, 'utf-8'));
}

// Update settings
data.settings = { ...defaultSettings, ...data.settings };

// Save
fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
console.log('✅ Settings updated successfully!');
console.log('📊 Total settings keys:', Object.keys(data.settings).length);
