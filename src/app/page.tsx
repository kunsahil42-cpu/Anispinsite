import React from 'react';
import { getSiteConfig } from '@/lib/configStore';
import { appScreenshots } from '@/lib/data';
import { HeroSection } from '@/components/HeroSection';
import { FeaturesSection } from '@/components/FeaturesSection';
import { ScreenshotsSection } from '@/components/ScreenshotsSection';
import { DownloadSection } from '@/components/DownloadSection';
import { ChangelogSection } from '@/components/ChangelogSection';
import { FAQSection } from '@/components/FAQSection';
import { CommunitySection } from '@/components/CommunitySection';
import { Sparkles, Layers, ShieldCheck, Heart, Zap, Compass } from 'lucide-react';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default function HomePage() {
  const config = getSiteConfig();
  const homeScreenshot = appScreenshots.find((s) => s.id === 'home') || appScreenshots[0];

  return (
    <div className="space-y-0">
      
      {/* 1. Hero Section */}
      <HeroSection config={config} screenshot={homeScreenshot} />

      {/* 2. About Section */}
      <section className="py-24 bg-void-900/80 relative overflow-hidden border-t border-purple-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-purple-900/40 border border-purple-500/30 text-purple-300 text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>The AniSpin Philosophy</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight font-display leading-tight">
                Two Worlds, One Platform. <br />
                <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
                  Uncompromised Quality.
                </span>
              </h2>

              <p className="text-slate-300 text-base leading-relaxed">
                AniSpin was engineered to solve the fragmentation in mobile anime entertainment. Instead of relying on multiple apps with intrusive ads, AniSpin unifies high-definition anime streaming with a high-resolution manga reader inside a single lightweight Flutter application.
              </p>

              <p className="text-slate-400 text-sm leading-relaxed">
                Designed around Material 3 principles with dynamic system purple accents, AniSpin gives you instantaneous access to random anime & manga rolls, live episode release predictions, offline bookmarks, and comprehensive progress tracking.
              </p>

              <div className="pt-2 flex items-center space-x-4">
                <Link
                  href="/about"
                  className="px-6 py-3 rounded-2xl bg-surface-container hover:bg-surface-high border border-purple-500/40 text-purple-300 hover:text-white font-bold text-sm transition-all"
                >
                  Read Full Architecture & Story &rarr;
                </Link>
              </div>
            </div>

            <div className="lg:col-span-6 grid grid-cols-2 gap-4">
              <div className="bg-surface-container/60 border border-white/10 p-6 rounded-3xl space-y-3">
                <div className="w-10 h-10 rounded-2xl bg-purple-600/30 border border-purple-500/40 text-purple-400 flex items-center justify-center">
                  <Layers className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-white text-base font-display">Dual Switch Engine</h3>
                <p className="text-slate-400 text-xs leading-relaxed">Seamlessly toggle between Anime and Manga modes with dedicated history & search filters.</p>
              </div>

              <div className="bg-surface-container/60 border border-white/10 p-6 rounded-3xl space-y-3">
                <div className="w-10 h-10 rounded-2xl bg-cyan-600/30 border border-cyan-500/40 text-cyan-400 flex items-center justify-center">
                  <Zap className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-white text-base font-display">Random Roll Gacha</h3>
                <p className="text-slate-400 text-xs leading-relaxed">Instant 5-dot Anime Roll and Manga Roll recommendation algorithms to discover hidden gems.</p>
              </div>

              <div className="bg-surface-container/60 border border-white/10 p-6 rounded-3xl space-y-3">
                <div className="w-10 h-10 rounded-2xl bg-emerald-600/30 border border-emerald-500/40 text-emerald-400 flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-white text-base font-display">Predictive Timers</h3>
                <p className="text-slate-400 text-xs leading-relaxed">Automatic broadcast calculation and local timezone alerts for upcoming episode releases.</p>
              </div>

              <div className="bg-surface-container/60 border border-white/10 p-6 rounded-3xl space-y-3">
                <div className="w-10 h-10 rounded-2xl bg-pink-600/30 border border-pink-500/40 text-pink-400 flex items-center justify-center">
                  <Heart className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-white text-base font-display">Favorites & History</h3>
                <p className="text-slate-400 text-xs leading-relaxed">Save series offline and track watching/reading stats across episodes and chapters.</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. Features Section */}
      <FeaturesSection />

      {/* 4. Screenshots Section */}
      <ScreenshotsSection screenshots={appScreenshots} />

      {/* 5. Download Section */}
      <DownloadSection config={config} />

      {/* 6. Changelog Section */}
      <ChangelogSection changelog={config.changelog || []} />

      {/* 7. FAQ Section */}
      <FAQSection />

      {/* 8. Community Section */}
      <CommunitySection config={config} />

    </div>
  );
}
