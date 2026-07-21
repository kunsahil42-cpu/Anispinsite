import React from 'react';
import { ContactSection } from '@/components/ContactSection';

export const metadata = {
  title: 'Contact AniSpin Support - Reach Out to Our Team',
  description: 'Get in touch with the AniSpin developers. Submit your support requests, bug logs, feedback, and feature recommendations directly.',
};

export const dynamic = 'force-dynamic';

export default function ContactPage() {
  return (
    <div className="pt-20 animate-in fade-in duration-300">
      <ContactSection />
    </div>
  );
}
