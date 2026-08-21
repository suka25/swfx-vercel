import { NextResponse } from 'next/server';

export async function GET() {
  const url = process.env.NEXT_PUBLIC_SITE_URL || 'https://swfx.com';
  return NextResponse.json({ url });
}
