import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import fs from 'fs';
import path from 'path';
import { Readable } from 'stream';
import { pipeline } from 'stream/promises';
import { put } from '@vercel/blob';
import { saveSiteConfig } from '@/lib/configStore';

const AUTH_COOKIE_NAME = 'anispin_admin_session';

export const maxDuration = 300;
export const dynamic = 'force-dynamic';

async function isAuthorized() {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get(AUTH_COOKIE_NAME);
  return Boolean(sessionToken && sessionToken.value.startsWith('authenticated_token_'));
}

export async function POST(request: Request) {
  if (!(await isAuthorized())) {
    return NextResponse.json({ error: 'Unauthorized admin access' }, { status: 401 });
  }

  return NextResponse.json(
    { error: 'Direct APK uploads are disabled. To comply with requirements, APKs must be uploaded directly to GitHub Releases and mapped via configuration URLs in the Admin Dashboard.' },
    { status: 400 }
  );
}

// Old upload handler logic removed to enforce GitHub Releases exclusive policy.
/*
async function oldUploadHandler(request: Request) {

    const sanitizedFileName = file.name.replace(/[^a-zA-Z0-9.-_]/g, '_');
    const sizeInMB = (file.size / (1024 * 1024)).toFixed(1) + ' MB';
    let publicUrl = `/downloads/${sanitizedFileName}`;

    // If running on Vercel with Blob Token configured
    if (process.env.BLOB_READ_WRITE_TOKEN) {
      const blob = await put(`downloads/${sanitizedFileName}`, file, {
        access: 'public',
        addRandomSuffix: false,
      });
      publicUrl = blob.url;
    } else {
      // Local / VPS filesystem storage
      const downloadsDir = path.join(process.cwd(), 'public', 'downloads');
      if (!fs.existsSync(downloadsDir)) {
        fs.mkdirSync(downloadsDir, { recursive: true });
      }

      const filePath = path.join(downloadsDir, sanitizedFileName);
      const fileStream = file.stream();
      const nodeReadable = Readable.fromWeb(fileStream as any);
      const writeStream = fs.createWriteStream(filePath);

      await pipeline(nodeReadable, writeStream);
    }

    // Automatically update site config primary download URL & file size
    const updatedConfig = await saveSiteConfig({
      primaryApkUrl: publicUrl,
      apkSize: sizeInMB,
    });

    return NextResponse.json({
      success: true,
      message: `APK file successfully uploaded (${sizeInMB})`,
      url: publicUrl,
      size: sizeInMB,
      config: updatedConfig,
    });
  } catch (error: any) {
    console.error('Error handling APK upload:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to process APK upload. If uploading to Vercel, please paste direct URL or configure Vercel Blob.' },
      { status: 500 }
    );
  }
}
*/
