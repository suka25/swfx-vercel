import { NextResponse } from 'next/server';
import { getUsers } from '@/lib/db';
import { checkAuth } from '@/lib/auth';

export async function GET(request: Request) {
  try {
    const auth = await checkAuth(request);
    if (!auth) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const users = getUsers();
    return NextResponse.json({ success: true, data: users });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
