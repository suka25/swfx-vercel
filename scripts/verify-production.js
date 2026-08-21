const fs = require('fs');
const path = require('path');

console.log('🔍 SWFX Production Verification');
console.log('===============================');
console.log('');

// Check all required files
const requiredFiles = [
  'swfx-data.json',
  'next.config.js',
  'package.json',
  'app/layout.tsx',
  'app/page.tsx',
  'middleware.ts',
];

for (const file of requiredFiles) {
  const exists = fs.existsSync(path.join(process.cwd(), file));
  console.log(`${exists ? '✅' : '❌'} ${file}`);
}

console.log('');
console.log('📊 Database check:');
try {
  const dbData = JSON.parse(fs.readFileSync('swfx-data.json', 'utf-8'));
  console.log(`   Users: ${dbData.users.length}`);
  console.log(`   Signals: ${dbData.signals.length}`);
  console.log(`   Settings: ${Object.keys(dbData.settings).length} keys`);
} catch (error) {
  console.log('   ❌ Database error');
}

console.log('');
console.log('✅ Verification complete!');
