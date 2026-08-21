import { NextResponse } from 'next/server';
import { getSignals } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');

    let signals = getSignals();

    if (status) {
      signals = signals.filter((s: any) => s.status === status);
    } else {
      signals = signals.filter((s: any) => s.status === 'Active' || s.status === 'Pending');
    }

    signals.sort((a: any, b: any) => 
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );

    return NextResponse.json({
      success: true,
      data: signals,
      total: signals.length,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
