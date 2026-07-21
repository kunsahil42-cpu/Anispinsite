import React from 'react';
import { ChangelogSection } from '@/components/ChangelogSection';
import { getSiteConfig } from '@/lib/configStore';

export const metadata = {
  title: 'AniSpin Release Changelog & Updates History',
  description: 'View the complete timeline of AniSpin version updates, new features, bug fixes, and performance improvements.',
};

export const dynamic = 'force-dynamic';

export default async function ChangelogPage() {
  const config = await getSiteConfig();

  return (
    <div className="pt-20">
      <ChangelogSection changelog={config.changelog || []} />
    </div>
  );
}
