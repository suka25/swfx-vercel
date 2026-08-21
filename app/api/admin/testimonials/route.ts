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

// GET: Get all testimonials
export async function GET(request: Request) {
  try {
    const db = readDB();
    const testimonials = db.testimonials || [];
    
    // Filter hanya yang active
    const activeTestimonials = testimonials.filter((t: any) => t.active !== false);
    
    return NextResponse.json({
      success: true,
      data: activeTestimonials,
      total: activeTestimonials.length,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// POST: Create new testimonial (admin only)
export async function POST(request: Request) {
  try {
    const auth = await checkAuth(request);
    if (!auth) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { name, role, quote, rating, image, active } = body;

    if (!name || !quote) {
      return NextResponse.json(
        { success: false, error: 'Name and quote are required' },
        { status: 400 }
      );
    }

    const db = readDB();
    
    const newTestimonial = {
      id: Date.now().toString(),
      name,
      role: role || 'Trader',
      quote,
      rating: rating || 5,
      image: image || `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=39FF88&color=080A0D&size=40`,
      created_at: new Date().toISOString(),
      active: active !== undefined ? active : true,
    };

    if (!db.testimonials) {
      db.testimonials = [];
    }
    
    db.testimonials.push(newTestimonial);

    if (writeDB(db)) {
      return NextResponse.json({
        success: true,
        data: newTestimonial,
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
