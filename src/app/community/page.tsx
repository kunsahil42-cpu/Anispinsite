import React from 'react';
import { getSiteConfig } from '@/lib/configStore';
import { CommunitySection } from '@/components/CommunitySection';

export const metadata = {
  title: 'AniSpin Official Community - Discord & Reddit Hubs',
  description: 'Join the official AniSpin Discord server and Reddit community. Connect with otaku fans, report issues, and request anime/manga features.',
};

export default function CommunityPage() {
  const config = getSiteConfig();
  return (
    <div className="pt-20">
      <CommunitySection config={config} />
    </div>
  );
}
