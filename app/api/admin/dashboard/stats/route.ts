import { NextResponse } from 'next/server';
import { checkAuth } from '@/lib/auth';
import fs from 'fs';
import path from 'path';

export const dynamic = 'force-dynamic';

const DB_PATH = path.join(process.cwd(), 'swfx-data.json');

function readDB() {
  try {
    if (!fs.existsSync(DB_PATH)) {
      return { users: [], signals: [], settings: {} };
    }
    const data = fs.readFileSync(DB_PATH, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading database:', error);
    return { users: [], signals: [], settings: {} };
  }
}

export async function GET(request: Request) {
  try {
    console.log('📊 Stats API called');
    
    const authenticated = await checkAuth(request);
    console.log('📊 Authenticated:', authenticated);

    if (!authenticated) {
      console.log('❌ Stats - Unauthorized');
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const db = readDB();
    const signals = db.signals || [];
    const users = db.users || [];

    const stats = {
      totalSignals: signals.length,
      activeSignals: signals.filter((s: any) => s.status === 'Active').length,
      closedSignals: signals.filter((s: any) => s.status === 'Closed').length,
      totalUsers: users.length,
    };

    console.log('📊 Stats:', stats);

    return NextResponse.json({
      success: true,
      data: stats,
    });
  } catch (error: any) {
    console.error('❌ Stats error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
