const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const DB_PATH = path.join(process.cwd(), 'swfx-data.json');
const BACKUP_DIR = path.join(process.cwd(), 'backups');

// Create backup directory
if (!fs.existsSync(BACKUP_DIR)) {
  fs.mkdirSync(BACKUP_DIR, { recursive: true });
}

function createBackup() {
  if (!fs.existsSync(DB_PATH)) {
    console.log('❌ Database file not found');
    return;
  }

  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const backupFile = path.join(BACKUP_DIR, `backup-${timestamp}.json`);
  
  try {
    const data = fs.readFileSync(DB_PATH, 'utf-8');
    fs.writeFileSync(backupFile, data);
    
    // Create hash for verification
    const hash = crypto.createHash('sha256').update(data).digest('hex');
    const hashFile = `${backupFile}.sha256`;
    fs.writeFileSync(hashFile, hash);
    
    console.log(`✅ Backup created: ${backupFile}`);
    console.log(`   Hash: ${hash}`);
    
    // Keep only last 10 backups
    const files = fs.readdirSync(BACKUP_DIR)
      .filter(f => f.startsWith('backup-') && f.endsWith('.json'))
      .sort()
      .reverse();
    
    if (files.length > 10) {
      for (const file of files.slice(10)) {
        const fullPath = path.join(BACKUP_DIR, file);
        fs.unlinkSync(fullPath);
        const hashPath = `${fullPath}.sha256`;
        if (fs.existsSync(hashPath)) {
          fs.unlinkSync(hashPath);
        }
        console.log(`🗑️ Removed old backup: ${file}`);
      }
    }
  } catch (error) {
    console.error('❌ Backup failed:', error.message);
  }
}

// Run backup
console.log('📦 Creating backup...');
createBackup();
console.log('✅ Backup complete!');
