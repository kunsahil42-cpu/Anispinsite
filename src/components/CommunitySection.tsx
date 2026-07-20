'use client';

import React from 'react';
import { Disc as Discord, MessageSquare, ExternalLink, Users, Sparkles } from 'lucide-react';
import { SiteConfig } from '@/types';

interface CommunitySectionProps {
  config: SiteConfig;
}

export const CommunitySection: React.FC<CommunitySectionProps> = ({ config }) => {
  return (
    <section className="py-24 bg-void-950 relative overflow-hidden border-t border-purple-900/30">
      
      {/* Glow background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-purple-600/10 blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-cyan-900/30 border border-cyan-500/40 text-cyan-300 text-xs font-semibold">
            <Users className="w-3.5 h-3.5" />
            <span>Join the Otaku Guild</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight font-display">
            Official AniSpin <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">Community</span>
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            Connect with fellow anime lovers, request series recommendations, discuss latest manga chapters, and get real-time update alerts.
          </p>
        </div>

        {/* Community Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          
          {/* Discord Card */}
          <div className="group relative bg-surface-container/80 border border-purple-500/30 hover:border-purple-500 rounded-3xl p-8 transition-all duration-300 shadow-xl hover:shadow-neon-purple/30 hover:-translate-y-1 flex flex-col justify-between">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="w-14 h-14 rounded-2xl bg-purple-600/30 border border-purple-500/40 text-purple-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Discord className="w-8 h-8" />
                </div>
                <span className="px-3 py-1 rounded-full bg-purple-900/50 text-purple-300 text-xs font-bold border border-purple-500/30 flex items-center space-x-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>25,400+ Online</span>
                </span>
              </div>

              <div>
                <h3 className="text-2xl font-black text-white font-display mb-2">Discord Server</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Join our official Discord community for live anime watch parties, episode release countdowns, bug reports, and beta testing feedback.
                </p>
              </div>
            </div>

            <div className="pt-8">
              <a
                href={config.discordUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold text-sm shadow-neon-purple hover:shadow-neon-cyan transition-all flex items-center justify-center space-x-2"
              >
                <span>Join Discord Server</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Reddit Card */}
          <div className="group relative bg-surface-container/80 border border-cyan-500/30 hover:border-cyan-500 rounded-3xl p-8 transition-all duration-300 shadow-xl hover:shadow-neon-cyan/30 hover:-translate-y-1 flex flex-col justify-between">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="w-14 h-14 rounded-2xl bg-cyan-600/30 border border-cyan-500/40 text-cyan-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <MessageSquare className="w-8 h-8" />
                </div>
                <span className="px-3 py-1 rounded-full bg-cyan-900/50 text-cyan-300 text-xs font-bold border border-cyan-500/30 flex items-center space-x-1.5">
                  <Users className="w-3.5 h-3.5 text-cyan-300" />
                  <span>r/AniSpin</span>
                </span>
              </div>

              <div>
                <h3 className="text-2xl font-black text-white font-display mb-2">Reddit Subreddit</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Share your favorite anime memes, manga chapter theories, app custom theme setups, and feature requests on Reddit.
                </p>
              </div>
            </div>

            <div className="pt-8">
              <a
                href={config.redditUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-cyan-600 to-teal-600 text-white font-bold text-sm shadow-neon-cyan hover:shadow-neon-purple transition-all flex items-center justify-center space-x-2"
              >
                <span>Visit Subreddit</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
