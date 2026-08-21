import { NextResponse } from 'next/server';
import { getSignals } from '@/lib/db';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const result = searchParams.get('result');

    let signals = getSignals();
    
    // Filter hanya yang sudah Closed dan punya journal
    let journalEntries = signals.filter((s: any) => 
      s.status === 'Closed' && s.journal
    );

    // Filter berdasarkan result (win/loss)
    if (result) {
      journalEntries = journalEntries.filter((s: any) => 
        s.journal.result === result
      );
    }

    // Sort by closedAt
    journalEntries.sort((a: any, b: any) => 
      new Date(b.journal.closedAt).getTime() - new Date(a.journal.closedAt).getTime()
    );

    return NextResponse.json({
      success: true,
      data: journalEntries,
      total: journalEntries.length,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
