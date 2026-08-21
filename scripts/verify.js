const fs = require('fs');
const path = require('path');

console.log('🔍 SWFX Verification');
console.log('====================');
console.log('');

// Check database
const dbPath = path.join(process.cwd(), 'swfx-data.json');
if (fs.existsSync(dbPath)) {
  const data = JSON.parse(fs.readFileSync(dbPath, 'utf-8'));
  console.log('✅ Database found');
  console.log(`   Users: ${data.users.length}`);
  console.log(`   Signals: ${data.signals.length}`);
} else {
  console.log('❌ Database not found');
}

// Check public files
const publicFiles = ['favicon.ico', 'manifest.json', 'robots.txt'];
console.log('');
console.log('📁 Public files:');
for (const file of publicFiles) {
  const exists = fs.existsSync(path.join(process.cwd(), 'public', file));
  console.log(`   ${file}: ${exists ? '✅' : '❌'}`);
}

// Check environment
console.log('');
console.log('🌐 Environment:');
console.log(`   NODE_ENV: ${process.env.NODE_ENV || 'not set'}`);
console.log(`   NEXT_PUBLIC_SITE_URL: ${process.env.NEXT_PUBLIC_SITE_URL || 'not set'}`);

console.log('');
console.log('✅ Verification complete!');
