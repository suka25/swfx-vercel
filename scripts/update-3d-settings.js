const fs = require('fs');
const path = require('path');

const DB_PATH = path.join(process.cwd(), 'swfx-data.json');

const defaultSettings = {
  // ... existing settings ...

  // ==== 3D SETTINGS ====
  enable_3d_hero: 'true',
  enable_3d_globe: 'true',
  enable_3d_candles: 'true',
  enable_3d_particles: 'true',
  enable_3d_dataflow: 'true',
  enable_3d_holographic: 'true',
  
  // 3D Colors
  _3d_primary_color: '#39FF88',
  _3d_secondary_color: '#FF4D5F',
  _3d_accent_color: '#F5A623',
  _3d_glow_intensity: '0.3',
  _3d_particle_count: '3000',
  
  // 3D Animations
  _3d_rotation_speed: '0.3',
  _3d_float_speed: '1.5',
  _3d_pulse_speed: '2',
  
  // ==== CINEMATIC SETTINGS ====
  cinematic_title: 'SWFX — Market Intelligence',
  cinematic_subtitle: 'Real-time 3D trading portal',
  cinematic_tagline: 'READ. PLAN. EXECUTE.',
  
  // ==== MARKET GLOBE ====
  globe_markets: 'Sydney,Tokyo,London,New York',
  globe_session_status: 'active',
  
  // ==== 3D BACKGROUND ====
  bg_particle_color: '#39FF88',
  bg_nebula_color: '#39FF88',
  bg_star_count: '2000',
};

let data = {};
if (fs.existsSync(DB_PATH)) {
  data = JSON.parse(fs.readFileSync(DB_PATH, 'utf-8'));
}

data.settings = { ...data.settings, ...defaultSettings };
fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));

console.log('✅ 3D Settings updated!');
console.log('📊 Total settings:', Object.keys(data.settings).length);
