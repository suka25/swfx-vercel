import { NextResponse } from 'next/server';
import { checkAuth } from '@/lib/auth';
import fs from 'fs';
import path from 'path';

const DB_PATH = path.join(process.cwd(), 'swfx-data.json');
const BACKUP_DIR = path.join(process.cwd(), 'backups');

// Ensure backup directory exists
if (!fs.existsSync(BACKUP_DIR)) {
  fs.mkdirSync(BACKUP_DIR, { recursive: true });
}

// GET: List backups
export async function GET(request: Request) {
  try {
    const auth = await checkAuth(request);
    if (!auth) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const files = fs.readdirSync(BACKUP_DIR)
      .filter(f => f.endsWith('.json'))
      .sort()
      .reverse();

    return NextResponse.json({
      success: true,
      files,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// POST: Create backup
export async function POST(request: Request) {
  try {
    const auth = await checkAuth(request);
    if (!auth) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    if (!fs.existsSync(DB_PATH)) {
      return NextResponse.json(
        { success: false, error: 'Database not found' },
        { status: 404 }
      );
    }

    const data = fs.readFileSync(DB_PATH, 'utf-8');
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filename = `backup-${timestamp}.json`;
    const filepath = path.join(BACKUP_DIR, filename);

    fs.writeFileSync(filepath, data);

    // Keep only last 10 backups
    const files = fs.readdirSync(BACKUP_DIR)
      .filter(f => f.endsWith('.json'))
      .sort()
      .reverse();

    if (files.length > 10) {
      for (const file of files.slice(10)) {
        fs.unlinkSync(path.join(BACKUP_DIR, file));
      }
    }

    return NextResponse.json({
      success: true,
      filename,
      message: 'Backup created successfully',
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// PUT: Restore backup
export async function PUT(request: Request) {
  try {
    const auth = await checkAuth(request);
    if (!auth) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const { filename } = await request.json();

    if (!filename) {
      return NextResponse.json(
        { success: false, error: 'Filename required' },
        { status: 400 }
      );
    }

    const filepath = path.join(BACKUP_DIR, filename);
    
    if (!fs.existsSync(filepath)) {
      return NextResponse.json(
        { success: false, error: 'Backup file not found' },
        { status: 404 }
      );
    }

    const data = fs.readFileSync(filepath, 'utf-8');
    
    // Validate JSON
    JSON.parse(data);

    fs.writeFileSync(DB_PATH, data);

    return NextResponse.json({
      success: true,
      message: 'Restore completed successfully',
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// DELETE: Delete backup
export async function DELETE(request: Request) {
  try {
    const auth = await checkAuth(request);
    if (!auth) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const filename = searchParams.get('filename');

    if (!filename) {
      return NextResponse.json(
        { success: false, error: 'Filename required' },
        { status: 400 }
      );
    }

    const filepath = path.join(BACKUP_DIR, filename);
    
    if (!fs.existsSync(filepath)) {
      return NextResponse.json(
        { success: false, error: 'Backup file not found' },
        { status: 404 }
      );
    }

    fs.unlinkSync(filepath);

    return NextResponse.json({
      success: true,
      message: 'Backup deleted successfully',
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
