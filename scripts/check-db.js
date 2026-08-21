const Database = require('better-sqlite3');
const path = require('path');

const dbPath = path.join(process.cwd(), 'swfx.db');
console.log('📁 Database path:', dbPath);

try {
  const db = new Database(dbPath);

  // Cek tabel
  const tables = db.prepare("SELECT name FROM sqlite_master WHERE type='table'").all();
  console.log('📊 Tables:', tables.map(t => t.name).join(', '));

  // Cek user admin
  const admin = db.prepare('SELECT * FROM users WHERE username = ?').get('admin');
  console.log('👤 Admin:', admin ? '✅ Found' : '❌ Not found');
  if (admin) {
    console.log('   Username:', admin.username);
    console.log('   Role:', admin.role);
  }

  // Cek sessions
  try {
    const sessions = db.prepare('SELECT COUNT(*) as count FROM sessions').get();
    console.log('🔐 Sessions:', sessions.count);
  } catch (e) {
    console.log('🔐 Sessions table not found or empty');
  }

  // Cek signals
  try {
    const signals = db.prepare('SELECT COUNT(*) as count FROM signals').get();
    console.log('📈 Signals:', signals.count);
  } catch (e) {
    console.log('📈 Signals table not found or empty');
  }

  db.close();
  console.log('✅ Database check complete');
} catch (error) {
  console.error('❌ Error:', error.message);
}
