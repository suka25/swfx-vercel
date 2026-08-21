const fs = require('fs');
const path = require('path');

const DB_PATH = path.join(process.cwd(), 'swfx-data.json');

if (!fs.existsSync(DB_PATH)) {
  console.log('❌ Database not found!');
  process.exit(1);
}

const data = JSON.parse(fs.readFileSync(DB_PATH, 'utf-8'));
const settings = data.settings || {};

console.log('📊 Settings Check');
console.log('================');
console.log(`Total settings: ${Object.keys(settings).length}`);
console.log('');

const checkList = [
  'hero_title',
  'hero_subtitle',
  'hero_cta_text',
  'hero_cta_link',
  'meta_description',
  'meta_keywords',
  'twitter_handle',
  'og_image',
  'google_analytics_id',
  'members_count',
  'signals_count',
  'uptime_count',
  'animation_duration',
  'animation_stagger_delay',
  'preloader_duration',
  'maintenance_mode',
  'maintenance_message',
  'enable_registration',
];

console.log('🔍 Checking required settings:');
for (const key of checkList) {
  const exists = settings[key] !== undefined && settings[key] !== '';
  const value = settings[key] || '(empty)';
  console.log(`${exists ? '✅' : '❌'} ${key}: ${value}`);
}
