import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const now = new Date();
    const hours = now.getUTCHours();
    const day = now.getUTCDay();
    
    // Market open: Monday 00:00 UTC to Friday 22:00 UTC
    const isWeekend = day === 0 || day === 6;
    const isOpen = !isWeekend && (hours >= 0 && hours < 22);
    
    let session = 'CLOSED';
    let sessionName = 'Closed';
    let nextSession = '';
    let volatility = 'LOW';
    
    if (isOpen) {
      if (hours >= 0 && hours < 8) {
        session = 'ASIAN';
        sessionName = 'Asian (Tokyo)';
        volatility = 'MEDIUM';
        nextSession = 'London (08:00 UTC)';
      } else if (hours >= 8 && hours < 16) {
        session = 'LONDON';
        sessionName = 'London';
        volatility = 'HIGH';
        nextSession = 'New York (13:00 UTC)';
      } else if (hours >= 13 && hours < 22) {
        session = 'NEW_YORK';
        sessionName = 'New York';
        volatility = 'HIGH';
        nextSession = 'Sydney (22:00 UTC)';
      } else {
        session = 'ASIAN';
        sessionName = 'Asian (Tokyo)';
        volatility = 'MEDIUM';
        nextSession = 'London (08:00 UTC)';
      }
    } else {
      if (day === 6 || (day === 0 && hours < 22)) {
        nextSession = 'Sydney (22:00 UTC)';
      } else {
        nextSession = 'Sydney (22:00 UTC)';
      }
    }
    
    // Trend berdasarkan pergerakan harga (simulasi)
    const trend = Math.random() > 0.5 ? 'BULLISH' : 'BEARISH';
    
    return NextResponse.json({
      success: true,
      data: {
        status: isOpen ? 'OPEN' : 'CLOSED',
        session: session,
        sessionName: sessionName,
        trend: trend,
        volatility: volatility,
        nextSession: nextSession,
        timestamp: now.toISOString(),
        isWeekend: isWeekend
      }
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
