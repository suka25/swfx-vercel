import { NextResponse } from 'next/server';
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

export async function GET() {
  try {
    const db = readDB();
    const testimonials = db.testimonials || [];
    
    // Filter hanya yang active
    const activeTestimonials = testimonials.filter((t: any) => t.active !== false);
    
    // Sort by newest
    activeTestimonials.sort((a: any, b: any) => 
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );

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
