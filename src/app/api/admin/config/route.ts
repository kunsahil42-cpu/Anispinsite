import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { getSiteConfig, saveSiteConfig } from '@/lib/configStore';

const AUTH_COOKIE_NAME = 'anispin_admin_session';

async function isAuthorized() {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get(AUTH_COOKIE_NAME);
  return Boolean(sessionToken && sessionToken.value.startsWith('authenticated_token_'));
}

export async function GET() {
  const config = getSiteConfig();
  return NextResponse.json(config);
}

export async function POST(request: Request) {
  if (!(await isAuthorized())) {
    return NextResponse.json({ error: 'Unauthorized admin access' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const updated = saveSiteConfig(body);
    return NextResponse.json({ success: true, config: updated });
  } catch {
    return NextResponse.json({ error: 'Failed to save configuration' }, { status: 500 });
  }
}
