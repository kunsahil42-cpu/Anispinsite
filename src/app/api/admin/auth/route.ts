import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

// Default Admin Password (can be overridden via process.env.ADMIN_PASSWORD)
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'anispin2026';
const AUTH_COOKIE_NAME = 'anispin_admin_session';

export async function POST(request: Request) {
  try {
    const { password } = await request.json();

    if (password === ADMIN_PASSWORD) {
      const cookieStore = await cookies();
      cookieStore.set(AUTH_COOKIE_NAME, 'authenticated_token_' + Date.now(), {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7, // 7 days
        path: '/',
      });

      return NextResponse.json({ success: true, message: 'Authentication successful' });
    }

    return NextResponse.json({ success: false, message: 'Invalid admin passcode' }, { status: 401 });
  } catch {
    return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 });
  }
}

export async function GET() {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get(AUTH_COOKIE_NAME);

  if (sessionToken && sessionToken.value.startsWith('authenticated_token_')) {
    return NextResponse.json({ authenticated: true });
  }

  return NextResponse.json({ authenticated: false }, { status: 401 });
}

export async function DELETE() {
  const cookieStore = await cookies();
  cookieStore.delete(AUTH_COOKIE_NAME);
  return NextResponse.json({ success: true, message: 'Logged out successfully' });
}
