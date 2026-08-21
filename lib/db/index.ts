import fs from 'fs';
import path from 'path';
import bcrypt from 'bcryptjs';

const DB_PATH = path.join(process.cwd(), 'swfx-data.json');

// Default data dengan settings lengkap
const defaultData = {
  users: [
    {
      id: 'admin-1',
      username: 'admin',
      password: bcrypt.hashSync('admin123', 10),
      role: 'admin',
      created_at: new Date().toISOString(),
    }
  ],
  signals: [],
  settings: {
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
    hero_title: 'READ. PLAN. EXECUTE.',
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
    
    // Performance
    enable_cache: 'true',
    enable_compression: 'true',
    enable_minify: 'true',
    
    // Security
    enable_ssl: 'true',
    enable_ratelimit: 'true',
    enable_cors: 'true',
    
    // Analytics
    google_analytics_id: '',
    facebook_pixel_id: '',
    
    // Maintenance
    maintenance_mode: 'false',
    maintenance_message: 'We are currently undergoing maintenance. Please check back soon.',
    
    // Misc
    enable_registration: 'true',
    enable_dark_mode: 'true',
    enable_telegram_widget: 'true',
    enable_tradingview_widget: 'true',
    
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
  }
};

// Load or create database
export function loadDB() {
  try {
    if (!fs.existsSync(DB_PATH)) {
      fs.writeFileSync(DB_PATH, JSON.stringify(defaultData, null, 2));
      console.log('✅ Database created with full settings');
    }
    const data = fs.readFileSync(DB_PATH, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error loading database:', error);
    return defaultData;
  }
}

export function saveDB(data: any) {
  try {
    fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('Error saving database:', error);
  }
}

// ============ USERS ============
export function getUsers() {
  const db = loadDB();
  return db.users || [];
}

export function getUser(username: string) {
  const db = loadDB();
  return db.users.find((u: any) => u.username === username) || null;
}

export function getUserById(id: string) {
  const db = loadDB();
  return db.users.find((u: any) => u.id === id) || null;
}

export function getAdminUser() {
  const db = loadDB();
  return db.users.find((u: any) => u.role === 'admin') || null;
}

export function createUser(userData: any) {
  const db = loadDB();
  const newUser = {
    id: `user-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
    ...userData,
    password: bcrypt.hashSync(userData.password, 10),
    created_at: new Date().toISOString(),
  };
  db.users.push(newUser);
  saveDB(db);
  return newUser;
}

export function updateUser(id: string, data: any) {
  const db = loadDB();
  const index = db.users.findIndex((u: any) => u.id === id);
  if (index === -1) return null;
  if (data.password) {
    data.password = bcrypt.hashSync(data.password, 10);
  }
  db.users[index] = { ...db.users[index], ...data };
  saveDB(db);
  return db.users[index];
}

export function deleteUser(id: string) {
  const db = loadDB();
  db.users = db.users.filter((u: any) => u.id !== id);
  saveDB(db);
  return true;
}

// ============ SIGNALS ============
export function getSignals() {
  const db = loadDB();
  return db.signals || [];
}

export function getSignal(id: string) {
  const db = loadDB();
  return db.signals.find((s: any) => s.id === id) || null;
}

export function createSignal(signal: any) {
  const db = loadDB();
  const newSignal = {
    id: `sig-${Date.now()}-${Math.random().toString(36).substring(2, 8)}`,
    ...signal,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
  db.signals.unshift(newSignal);
  saveDB(db);
  return newSignal;
}

export function updateSignal(id: string, data: any) {
  const db = loadDB();
  const index = db.signals.findIndex((s: any) => s.id === id);
  if (index === -1) return null;
  db.signals[index] = { ...db.signals[index], ...data, updated_at: new Date().toISOString() };
  saveDB(db);
  return db.signals[index];
}

export function deleteSignal(id: string) {
  const db = loadDB();
  db.signals = db.signals.filter((s: any) => s.id !== id);
  saveDB(db);
  return true;
}

// ============ SETTINGS ============
export function getSettings() {
  const db = loadDB();
  return db.settings || {};
}

export function getSetting(key: string) {
  const db = loadDB();
  return db.settings?.[key] || null;
}

export function updateSettings(settings: any) {
  const db = loadDB();
  db.settings = { ...db.settings, ...settings };
  saveDB(db);
  return db.settings;
}
