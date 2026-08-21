import { NextResponse } from 'next/server';
import { checkAuth } from '@/lib/auth';
import fs from 'fs';
import path from 'path';

const DB_PATH = path.join(process.cwd(), 'swfx-data.json');

function readDB() {
  try {
    if (!fs.existsSync(DB_PATH)) {
      return { users: [], signals: [], testimonials: [], settings: {} };
    }
    const data = fs.readFileSync(DB_PATH, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading database:', error);
    return { users: [], signals: [], testimonials: [], settings: {} };
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

// PUT: Update testimonial
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
    const db = readDB();
    
    const index = db.testimonials.findIndex((t: any) => t.id === params.id);
    
    if (index === -1) {
      return NextResponse.json(
        { success: false, error: 'Testimonial not found' },
        { status: 404 }
      );
    }

    db.testimonials[index] = {
      ...db.testimonials[index],
      ...body,
      updated_at: new Date().toISOString(),
    };

    if (writeDB(db)) {
      return NextResponse.json({
        success: true,
        data: db.testimonials[index],
      });
    } else {
      return NextResponse.json(
        { success: false, error: 'Failed to save data' },
        { status: 500 }
      );
    }
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}

// DELETE: Delete testimonial
export async function DELETE(
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

    const db = readDB();
    const initialLength = db.testimonials.length;
    db.testimonials = db.testimonials.filter((t: any) => t.id !== params.id);
    
    if (db.testimonials.length === initialLength) {
      return NextResponse.json(
        { success: false, error: 'Testimonial not found' },
        { status: 404 }
      );
    }

    if (writeDB(db)) {
      return NextResponse.json({
        success: true,
        message: 'Testimonial deleted successfully',
      });
    } else {
      return NextResponse.json(
        { success: false, error: 'Failed to save data' },
        { status: 500 }
      );
    }
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
