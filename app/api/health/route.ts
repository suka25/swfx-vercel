import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  const startTime = Date.now();
  
  try {
    // Check database
    const dbPath = path.join(process.cwd(), 'swfx-data.json');
    const dbExists = fs.existsSync(dbPath);
    
    // Check memory usage
    const memoryUsage = process.memoryUsage();
    
    return NextResponse.json({
      status: 'healthy',
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
      database: {
        exists: dbExists,
        path: dbPath,
      },
      memory: {
        rss: `${Math.round(memoryUsage.rss / 1024 / 1024)} MB`,
        heapTotal: `${Math.round(memoryUsage.heapTotal / 1024 / 1024)} MB`,
        heapUsed: `${Math.round(memoryUsage.heapUsed / 1024 / 1024)} MB`,
      },
      responseTime: `${Date.now() - startTime}ms`,
    });
  } catch (error: any) {
    return NextResponse.json({
      status: 'unhealthy',
      error: error.message,
      timestamp: new Date().toISOString(),
    }, { status: 500 });
  }
}
