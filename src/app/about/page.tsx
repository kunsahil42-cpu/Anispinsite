import React from 'react';
import { getSiteConfig } from '@/lib/configStore';
import { Sparkles, Layers, ShieldCheck, Heart, Zap, Terminal, Code } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: 'About AniSpin - Dual Anime & Manga Platform',
  description: 'Learn about the engineering, design principles, and features behind the official AniSpin Android app.',
};

export default function AboutPage() {
  const config = getSiteConfig();

  return (
    <div className="pt-28 pb-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      
      {/* Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-purple-900/40 border border-purple-500/30 text-purple-300 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>About AniSpin</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight font-display">
          Crafted for Anime Streaming & Manga Reading
        </h1>
        <p className="text-slate-400 text-base sm:text-lg">
          AniSpin is an independent, high-performance Android application engineered with Flutter, Material 3, and dark cyberpunk aesthetics.
        </p>
      </div>

      {/* Main Philosophy Card */}
      <div className="bg-surface-container/80 border border-purple-500/30 rounded-3xl p-8 sm:p-12 space-y-6 shadow-neon-purple/10">
        <h2 className="text-2xl font-black text-white font-display">Why We Built AniSpin</h2>
        <p className="text-slate-300 leading-relaxed text-sm sm:text-base">
          Anime and manga enthusiasts often find themselves toggling between bulky streaming apps and ad-heavy manga reader sites. AniSpin unifies both media formats into a single, beautifully responsive native client that respects device resources and battery life.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
          <div className="bg-void-950/80 p-6 rounded-2xl border border-white/5 space-y-2">
            <h3 className="font-bold text-purple-400 text-base flex items-center space-x-2">
              <Layers className="w-5 h-5" />
              <span>Native Flutter Architecture</span>
            </h3>
            <p className="text-slate-400 text-xs leading-relaxed">
              Compiled ahead-of-time to native machine code for 60fps scrolling, minimal RAM footprint, and instant page transitions.
            </p>
          </div>

          <div className="bg-void-950/80 p-6 rounded-2xl border border-white/5 space-y-2">
            <h3 className="font-bold text-cyan-400 text-base flex items-center space-x-2">
              <Zap className="w-5 h-5" />
              <span>Privacy & Ad-Free Promise</span>
            </h3>
            <p className="text-slate-400 text-xs leading-relaxed">
              No tracking cookies, no telemetry selling, and zero pop-up ads during episode playback or chapter reading.
            </p>
          </div>
        </div>
      </div>

      {/* Key Highlights */}
      <div className="space-y-6">
        <h2 className="text-2xl font-black text-white font-display text-center">Core Platform Milestones</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-surface-container/60 border border-white/10 p-6 rounded-2xl space-y-2">
            <span className="text-xs text-purple-400 font-bold uppercase">Milestone 1</span>
            <h4 className="font-bold text-white text-base">Dual Switch Engine</h4>
            <p className="text-slate-400 text-xs">Switch instantly between Anime and Manga modes with independent search index filters.</p>
          </div>

          <div className="bg-surface-container/60 border border-white/10 p-6 rounded-2xl space-y-2">
            <span className="text-xs text-cyan-400 font-bold uppercase">Milestone 2</span>
            <h4 className="font-bold text-white text-base">Predictive Timers</h4>
            <p className="text-slate-400 text-xs">AI broadcast schedule prediction converting Japanese airing timestamps into local timezones.</p>
          </div>

          <div className="bg-surface-container/60 border border-white/10 p-6 rounded-2xl space-y-2">
            <span className="text-xs text-emerald-400 font-bold uppercase">Milestone 3</span>
            <h4 className="font-bold text-white text-base">Gacha Random Roll</h4>
            <p className="text-slate-400 text-xs">5-dot dice algorithm for Anime Roll and Manga Roll random discovery.</p>
          </div>
        </div>
      </div>

      {/* CTA Box */}
      <div className="text-center bg-gradient-to-r from-purple-900/40 to-cyan-900/40 border border-purple-500/30 p-8 rounded-3xl space-y-4">
        <h3 className="text-2xl font-black text-white font-display">Ready to experience AniSpin?</h3>
        <p className="text-slate-300 text-sm max-w-xl mx-auto">Download the official v{config.version} APK file and join thousands of anime fans.</p>
        <div>
          <Link
            href="/download"
            className="inline-flex items-center space-x-2 px-8 py-3.5 rounded-2xl bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-bold shadow-neon-purple hover:shadow-neon-cyan transition-all text-sm"
          >
            <span>Get AniSpin APK</span>
          </Link>
        </div>
      </div>

    </div>
  );
}
