import { NextResponse } from 'next/server';
import { checkAuth } from '@/lib/auth';
import fs from 'fs';
import path from 'path';

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

function writeDB(db: any) {
  try {
    fs.writeFileSync(DB_PATH, JSON.stringify(db, null, 2));
    return true;
  } catch (error) {
    console.error('Error writing database:', error);
    return false;
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const auth = await checkAuth(request);
    if (!auth) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { exitPrice, result, profit, notes, strategy, closedAt } = body;

    const db = readDB();
    const signalIndex = db.signals.findIndex((s: any) => s.id === params.id);

    if (signalIndex === -1) {
      return NextResponse.json(
        { success: false, error: 'Signal not found' },
        { status: 404 }
      );
    }

    // Update signal dengan journal
    const signal = db.signals[signalIndex];
    signal.status = 'Closed';
    signal.journal = {
      exitPrice: exitPrice || signal.entry,
      result: result || 'win',
      profit: profit || 0,
      notes: notes || '',
      closedAt: closedAt || new Date().toISOString(),
      strategy: strategy || 'N/A'
    };

    db.signals[signalIndex] = signal;

    if (writeDB(db)) {
      return NextResponse.json({
        success: true,
        data: signal,
      });
    } else {
      return NextResponse.json(
        { success: false, error: 'Failed to save data' },
        { status: 500 }
      );
    }
  } catch (error: any) {
    console.error('Error updating journal:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
