import React from 'react';
import { FAQSection } from '@/components/FAQSection';

export const metadata = {
  title: 'AniSpin FAQ - Frequently Asked Questions & Troubleshooting',
  description: 'Search answers for AniSpin APK installation, safety checks, predicted episode schedules, and manga reader settings.',
};

export default function FAQPage() {
  return (
    <div className="pt-20">
      <FAQSection />
    </div>
  );
}
