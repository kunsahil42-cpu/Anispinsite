import React from 'react';
import type { Metadata } from 'next';
import './globals.css';
import { getSiteConfig } from '@/lib/configStore';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { ParticleBackground } from '@/components/ParticleBackground';

export const dynamic = 'force-dynamic';

export async function generateMetadata(): Promise<Metadata> {
  const config = await getSiteConfig();
  return {
    title: config.seoTitle,
    description: config.seoDescription,
    keywords: config.seoKeywords,
    authors: [{ name: 'AniSpin Team' }],
    openGraph: {
      title: config.seoTitle,
      description: config.seoDescription,
      url: 'https://anispin.app',
      siteName: 'AniSpin Official',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: config.seoTitle,
      description: config.seoDescription,
    },
  };
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const config = await getSiteConfig();

  return (
    <html lang="en" className="dark scroll-smooth">
      <body className="bg-void-950 text-slate-100 antialiased min-h-screen flex flex-col justify-between selection:bg-purple-600 selection:text-white">
        <ParticleBackground />
        <Navbar config={config} />
        <main className="flex-1 relative z-10">{children}</main>
        <Footer config={config} />
      </body>
    </html>
  );
}
