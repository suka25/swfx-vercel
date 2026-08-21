import { NextResponse } from 'next/server';
import { checkAuth } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    console.log('🔍 Checking auth...');
    console.log('🔍 Cookies:', request.headers.get('cookie'));
    
    const authenticated = await checkAuth(request);
    console.log('✅ Authenticated:', authenticated);

    if (authenticated) {
      return NextResponse.json({
        authenticated: true,
        user: { id: '1', username: 'admin', role: 'admin' }
      });
    }

    return NextResponse.json({ authenticated: false });
  } catch (error: any) {
    console.error('❌ Check error:', error);
    return NextResponse.json(
      { authenticated: false, error: error.message },
      { status: 500 }
    );
  }
}
