import React from 'react';
import { ChangelogSection } from '@/components/ChangelogSection';

export const metadata = {
  title: 'AniSpin Release Changelog & Updates History',
  description: 'View the complete timeline of AniSpin version updates, new features, bug fixes, and performance improvements.',
};

export default function ChangelogPage() {
  return (
    <div className="pt-20">
      <ChangelogSection />
    </div>
  );
}
