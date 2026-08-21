const https = require('https');
const fs = require('fs');
const path = require('path');

const SITE_URL = process.env.SITE_URL || 'http://localhost:3000';
const LOG_FILE = path.join(process.cwd(), 'logs', 'monitor.log');

// Create logs directory
const logsDir = path.join(process.cwd(), 'logs');
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir, { recursive: true });
}

function log(message) {
  const timestamp = new Date().toISOString();
  const logEntry = `[${timestamp}] ${message}\n`;
  fs.appendFileSync(LOG_FILE, logEntry);
  console.log(logEntry.trim());
}

function checkHealth() {
  return new Promise((resolve) => {
    const startTime = Date.now();
    
    const options = {
      hostname: new URL(SITE_URL).hostname,
      port: new URL(SITE_URL).port || 80,
      path: '/api/health',
      method: 'GET',
      timeout: 5000,
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        const responseTime = Date.now() - startTime;
        try {
          const json = JSON.parse(data);
          resolve({
            status: res.statusCode === 200 ? 'healthy' : 'unhealthy',
            statusCode: res.statusCode,
            responseTime: `${responseTime}ms`,
            data: json,
          });
        } catch (e) {
          resolve({
            status: 'error',
            statusCode: res.statusCode,
            responseTime: `${responseTime}ms`,
            error: 'Invalid JSON response',
          });
        }
      });
    });

    req.on('error', (error) => {
      resolve({
        status: 'error',
        error: error.message,
      });
    });

    req.on('timeout', () => {
      req.destroy();
      resolve({
        status: 'error',
        error: 'Timeout',
      });
    });

    req.end();
  });
}

async function runMonitor() {
  log('🔍 Running health check...');
  const result = await checkHealth();
  
  if (result.status === 'healthy') {
    log(`✅ Status: ${result.status}`);
    log(`   Response Time: ${result.responseTime}`);
    if (result.data?.database) {
      log(`   Database: ${result.data.database.exists ? '✅' : '❌'}`);
    }
  } else {
    log(`❌ Status: ${result.status}`);
    log(`   Error: ${result.error || 'Unknown error'}`);
  }
  
  log('✅ Health check complete');
  log('---');
}

// Run every 5 minutes
runMonitor();
setInterval(runMonitor, 5 * 60 * 1000);

console.log(`🔄 Monitoring started for ${SITE_URL}`);
console.log(`📝 Logs saved to: ${LOG_FILE}`);
console.log('⏰ Checking every 5 minutes');
