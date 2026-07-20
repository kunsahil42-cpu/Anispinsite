import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import fs from 'fs';
import path from 'path';
import { saveSiteConfig } from '@/lib/configStore';

const AUTH_COOKIE_NAME = 'anispin_admin_session';

async function isAuthorized() {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get(AUTH_COOKIE_NAME);
  return Boolean(sessionToken && sessionToken.value.startsWith('authenticated_token_'));
}

export async function POST(request: Request) {
  if (!(await isAuthorized())) {
    return NextResponse.json({ error: 'Unauthorized admin access' }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json({ error: 'No APK file provided in request' }, { status: 400 });
    }

    if (!file.name.endsWith('.apk')) {
      return NextResponse.json({ error: 'File must have a .apk extension' }, { status: 400 });
    }

    // Prepare target directory public/downloads
    const downloadsDir = path.join(process.cwd(), 'public', 'downloads');
    if (!fs.existsSync(downloadsDir)) {
      fs.mkdirSync(downloadsDir, { recursive: true });
    }

    // Clean file name
    const sanitizedFileName = file.name.replace(/[^a-zA-Z0-9.-_]/g, '_');
    const filePath = path.join(downloadsDir, sanitizedFileName);

    // Convert File buffer & write to disk
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    fs.writeFileSync(filePath, buffer);

    // Calculate file size formatted
    const sizeInMB = (file.size / (1024 * 1024)).toFixed(1) + ' MB';
    const publicUrl = `/downloads/${sanitizedFileName}`;

    // Automatically update site config primary download URL & file size
    const updatedConfig = saveSiteConfig({
      primaryApkUrl: publicUrl,
      apkSize: sizeInMB,
    });

    return NextResponse.json({
      success: true,
      message: `APK file successfully uploaded: ${sanitizedFileName}`,
      url: publicUrl,
      size: sizeInMB,
      config: updatedConfig,
    });
  } catch (error: any) {
    console.error('Error handling APK upload:', error);
    return NextResponse.json({ error: error.message || 'Failed to process APK upload' }, { status: 500 });
  }
}
