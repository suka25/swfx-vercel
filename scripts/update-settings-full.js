const fs = require('fs');
const path = require('path');

const DB_PATH = path.join(process.cwd(), 'swfx-data.json');

// Default settings lengkap dengan semua nilai
const defaultSettings = {
  // ============ SITE SETTINGS ============
  site_name: 'SWFX',
  site_description: 'READ. PLAN. EXECUTE.',
  site_tagline: 'Understand the market. Build the plan. Execute with discipline.',
  contact_email: 'support@swfx.com',
  
  // ============ SOCIAL LINKS ============
  telegram_link: 'https://t.me/swfxglobal',
  twitter_link: 'https://twitter.com/swfx',
  youtube_link: 'https://youtube.com/swfx',
  
  // ============ BRANDING ============
  logo_text: 'SWFX',
  footer_text: 'READ. PLAN. EXECUTE. — A premium forex community',
  copyright_text: 'All rights reserved.',
  
  // ============ FEATURES ============
  enable_preloader: 'true',
  enable_custom_cursor: 'true',
  enable_smooth_scroll: 'true',
  enable_animations: 'true',
  enable_market_ticker: 'true',
  enable_signals: 'true',
  
  // ============ APPEARANCE ============
  theme_mode: 'dark',
  accent_color: '#39FF88',
  secondary_color: '#FF4D5F',
  
  // ============ HERO SECTION ============
  hero_title: 'READ. PLAN. EXECUTE.',
  hero_subtitle: 'Understand the market. Build the plan. Execute with discipline.',
  hero_cta_text: 'JOIN TELEGRAM',
  hero_cta_link: 'https://t.me/swfxglobal',
  
  // ============ PHILOSOPHY SECTION ============
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
  
  // ============ CTA SECTION ============
  cta_title: 'The Market Never Stops.',
  cta_subtitle: 'Neither Should Your Learning.',
  cta_text: 'Join the SWFX Telegram community for market analysis, trading insights, educational content, structured signals, and market discussion.',
  cta_button_text: 'JOIN SWFX TELEGRAM',
  
  // ============ FOOTER ============
  footer_nav_title: 'Navigation',
  footer_community_title: 'Community',
  
  // ============ SEO ============
  meta_description: 'Premium forex analysis, trading education, and structured signals for disciplined traders.',
  meta_keywords: 'forex,trading,forex signals,technical analysis,forex education,trading community,SWFX',
  og_image: '/og-image.png',
  twitter_handle: '@swfxglobal',
  
  // ============ ANALYTICS ============
  google_analytics_id: '',
  
  // ============ ANIMATIONS ============
  animation_duration: '0.8',
  animation_ease: 'power2.out',
  animation_stagger_delay: '0.05',
  scroll_animation_threshold: '0.15',
  
  // ============ PRELOADER ============
  preloader_duration: '2000',
  preloader_text: 'Loading {progress}%',
  
  // ============ STATS ============
  members_count: '2,847+',
  signals_count: '156+',
  uptime_count: '99.7%',
  
  // ============ MAINTENANCE ============
  maintenance_mode: 'false',
  maintenance_message: 'We are currently undergoing maintenance. Please check back soon.',
  
  // ============ REGISTRATION ============
  enable_registration: 'true',
  
  // ============ DARK MODE ============
  enable_dark_mode: 'true',
  
  // ============ PAGE TITLES ============
  analysis_title: 'Market Analysis',
  analysis_subtitle: 'Professional technical analysis with clear reasoning and structured approach.',
  markets_title: 'Live Market Data',
  markets_subtitle: 'Real-time prices and charts powered by TradingView',
  signals_title: 'SWFX Signals',
  signals_subtitle: 'Trading signals and market analysis from SWFX',
  learn_title: 'Learn the Why',
  learn_subtitle: "Don't just follow the trade. Understand the reason behind it.",
  about_title: 'About SWFX',
  about_subtitle: 'READ. PLAN. EXECUTE. — A premium forex community focused on analysis, education, and disciplined trading.',
  tradingview_title: 'TradingView Profile',
  tradingview_subtitle: 'Published analysis and market views from SWFX.',
  
  // ============ ADMIN ============
  admin_title: 'SWFX Admin',
  admin_subtitle: 'Login to manage signals',
};

// Load existing data
let data = {};
if (fs.existsSync(DB_PATH)) {
  data = JSON.parse(fs.readFileSync(DB_PATH, 'utf-8'));
}

// Merge settings (keep existing, add missing)
data.settings = { ...defaultSettings, ...data.settings };

// Save
fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));

console.log('✅ Settings updated successfully!');
console.log(`📊 Total settings keys: ${Object.keys(data.settings).length}`);
console.log('');
console.log('📋 Settings Summary:');
console.log('====================');
const categories = {
  'Site': ['site_name', 'site_description', 'site_tagline', 'contact_email'],
  'Social': ['telegram_link', 'twitter_link', 'youtube_link'],
  'Branding': ['logo_text', 'footer_text', 'copyright_text'],
  'Features': ['enable_preloader', 'enable_custom_cursor', 'enable_smooth_scroll', 'enable_animations', 'enable_market_ticker', 'enable_signals'],
  'Appearance': ['theme_mode', 'accent_color', 'secondary_color'],
  'Hero': ['hero_title', 'hero_subtitle', 'hero_cta_text', 'hero_cta_link'],
  'Philosophy': ['philosophy_title', 'philosophy_subtitle', 'philosophy_read_title', 'philosophy_read_subtitle', 'philosophy_read_desc', 'philosophy_plan_title', 'philosophy_plan_subtitle', 'philosophy_plan_desc', 'philosophy_execute_title', 'philosophy_execute_subtitle', 'philosophy_execute_desc'],
  'CTA': ['cta_title', 'cta_subtitle', 'cta_text', 'cta_button_text'],
  'Footer': ['footer_nav_title', 'footer_community_title'],
  'SEO': ['meta_description', 'meta_keywords', 'og_image', 'twitter_handle'],
  'Analytics': ['google_analytics_id'],
  'Animations': ['animation_duration', 'animation_ease', 'animation_stagger_delay', 'scroll_animation_threshold'],
  'Preloader': ['preloader_duration', 'preloader_text'],
  'Stats': ['members_count', 'signals_count', 'uptime_count'],
  'Maintenance': ['maintenance_mode', 'maintenance_message'],
  'Registration': ['enable_registration'],
  'Dark Mode': ['enable_dark_mode'],
  'Pages': ['analysis_title', 'analysis_subtitle', 'markets_title', 'markets_subtitle', 'signals_title', 'signals_subtitle', 'learn_title', 'learn_subtitle', 'about_title', 'about_subtitle', 'tradingview_title', 'tradingview_subtitle'],
  'Admin': ['admin_title', 'admin_subtitle'],
};

for (const [category, keys] of Object.entries(categories)) {
  console.log(`\n📁 ${category}:`);
  for (const key of keys) {
    const value = data.settings[key] || '(empty)';
    console.log(`   ${key}: ${value}`);
  }
}
