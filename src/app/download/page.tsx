import React from 'react';
import { getSiteConfig } from '@/lib/configStore';
import { DownloadSection } from '@/components/DownloadSection';

export const metadata = {
  title: 'Download AniSpin APK - Official Latest Release',
  description: 'Download the latest AniSpin APK for Android. Verified SHA-256 checksum, multiple mirrors, ad-free anime streaming & manga reading.',
};

export const dynamic = 'force-dynamic';

export default async function DownloadPage() {
  const config = await getSiteConfig();

  return (
    <div className="pt-20">
      <DownloadSection config={config} />
    </div>
  );
}
