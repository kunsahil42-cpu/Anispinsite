'use client';

import React from 'react';
import Link from 'next/link';
import { Download, Sparkles, Shield, Play, Apple, Star, Zap, CheckCircle2, ChevronRight } from 'lucide-react';
import { SiteConfig, AppScreenshot } from '@/types';
import { AppScreenshotCard } from './AppScreenshotCard';

interface HeroSectionProps {
  config: SiteConfig;
  screenshot: AppScreenshot;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ config, screenshot }) => {
  return (
    <section className="relative min-h-screen pt-28 pb-16 lg:pt-36 lg:pb-24 overflow-hidden flex items-center justify-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Text & Call to Action Column */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Release Version Badge */}
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-purple-900/30 border border-purple-500/40 text-purple-300 shadow-neon-purple/20">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-400" />
              </span>
              <span className="text-xs font-semibold tracking-wide">{config.heroBadgeText}</span>
              <ChevronRight className="w-3.5 h-3.5 text-purple-400" />
            </div>

            {/* Hero Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.1] font-display">
              Stream Anime.{' '}
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
                Read Manga.
              </span>{' '}
              <br />
              <span className="text-slate-200">Spin Your World.</span>
            </h1>

            {/* Tagline & Subtext */}
            <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Experience the official <strong className="text-white">AniSpin</strong> Android app. Seamlessly switch between HD anime episode streaming and high-resolution manga reading with predictive broadcast alerts, Gacha rolls, and dark Material 3 design.
            </p>

            {/* Key Value Propositions */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 max-w-lg mx-auto lg:mx-0 text-left">
              <div className="flex items-center space-x-2 text-xs text-slate-300 bg-surface-container/50 p-2 rounded-xl border border-white/5">
                <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0" />
                <span>Zero Ads & 100% Free</span>
              </div>
              <div className="flex items-center space-x-2 text-xs text-slate-300 bg-surface-container/50 p-2 rounded-xl border border-white/5">
                <Zap className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Under 25MB APK</span>
              </div>
              <div className="flex items-center space-x-2 text-xs text-slate-300 bg-surface-container/50 p-2 rounded-xl border border-white/5 col-span-2 sm:col-span-1">
                <Shield className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Virus Total Verified</span>
              </div>
            </div>

            {/* Download Action Buttons Area */}
            <div className="pt-4 space-y-4">
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                
                {/* Main Direct APK Button */}
                <Link
                  href="/download"
                  className="w-full sm:w-auto relative group overflow-hidden px-8 py-4 rounded-2xl bg-gradient-to-r from-purple-600 via-purple-700 to-cyan-500 text-white font-bold text-base shadow-neon-purple hover:shadow-neon-cyan transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center space-x-3"
                >
                  <Download className="w-5 h-5 group-hover:animate-bounce" />
                  <div className="text-left leading-tight">
                    <div className="text-xs font-normal text-purple-200">Direct Official Install</div>
                    <div>Download APK ({config.apkSize})</div>
                  </div>
                  <Sparkles className="w-4 h-4 text-cyan-200 animate-pulse ml-1" />
                </Link>

              </div>

              {/* Store Platform Buttons (With Coming Soon Badges) */}
              <div className="flex items-center justify-center lg:justify-start space-x-3 pt-2 text-xs">
                
                {/* Google Play Button */}
                {config.playStoreEnabled ? (
                  <a
                    href={config.playStoreUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 px-3.5 py-2 rounded-xl bg-void-850 border border-purple-500/30 hover:border-purple-400 text-white transition-colors group"
                  >
                    <Play className="w-4 h-4 text-purple-400 group-hover:scale-110 transition-transform" />
                    <div className="text-left">
                      <div className="text-[10px] text-slate-400 uppercase font-bold">Google Play</div>
                      <div className="text-[11px] font-semibold text-white">Get it on Play Store</div>
                    </div>
                  </a>
                ) : (
                  <div className="flex items-center space-x-2 px-3.5 py-2 rounded-xl bg-void-850 border border-white/10 text-slate-400 opacity-60 cursor-not-allowed">
                    <Play className="w-4 h-4 text-slate-500" />
                    <div className="text-left">
                      <div className="text-[10px] text-slate-500 uppercase font-bold">Google Play</div>
                      <div className="text-[11px] font-semibold text-slate-450">Coming Soon</div>
                    </div>
                  </div>
                )}

                {/* App Store Button */}
                {config.appStoreEnabled ? (
                  <a
                    href={config.appStoreUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 px-3.5 py-2 rounded-xl bg-void-850 border border-purple-500/30 hover:border-purple-400 text-white transition-colors group"
                  >
                    <Apple className="w-4 h-4 text-purple-400 group-hover:scale-110 transition-transform" />
                    <div className="text-left">
                      <div className="text-[10px] text-slate-400 uppercase font-bold">App Store</div>
                      <div className="text-[11px] font-semibold text-white">Download on iOS</div>
                    </div>
                  </a>
                ) : (
                  <div className="flex items-center space-x-2 px-3.5 py-2 rounded-xl bg-void-850 border border-white/10 text-slate-400 opacity-60 cursor-not-allowed">
                    <Apple className="w-4 h-4 text-slate-500" />
                    <div className="text-left">
                      <div className="text-[10px] text-slate-500 uppercase font-bold">App Store</div>
                      <div className="text-[11px] font-semibold text-slate-450">Coming Soon</div>
                    </div>
                  </div>
                )}

              </div>
            </div>

            {/* Quick Metrics */}
            <div className="pt-6 border-t border-white/10 grid grid-cols-3 gap-4 text-center lg:text-left max-w-lg mx-auto lg:mx-0">
              <div>
                <div className="text-xl sm:text-2xl font-black text-white font-display">100K+</div>
                <div className="text-xs text-slate-400">Active Otakus</div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-black text-purple-400 font-display flex items-center justify-center lg:justify-start space-x-1">
                  <span>4.9</span>
                  <Star className="w-4 h-4 fill-purple-400" />
                </div>
                <div className="text-xs text-slate-400">User Rating</div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-black text-cyan-400 font-display">1080p</div>
                <div className="text-xs text-slate-400">HD Streaming</div>
              </div>
            </div>

          </div>

          {/* Right Actual Screenshot Column */}
          <div className="lg:col-span-5 flex justify-center relative">
            <div className="relative">
              {/* Background ambient lighting circle */}
              <div className="absolute -inset-4 rounded-full bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-500 opacity-30 blur-2xl animate-pulse" />
              
              {/* Actual App Screenshot Card */}
              <AppScreenshotCard screenshot={screenshot} showOverlayTitle />

              {/* Floating 3D Highlight Chips */}
              <div className="absolute top-12 -left-8 bg-void-900/90 backdrop-blur-md px-3.5 py-2 rounded-xl border border-purple-500/40 shadow-xl hidden sm:flex items-center space-x-2 animate-float z-20">
                <Sparkles className="w-4 h-4 text-purple-400" />
                <div className="text-[11px]">
                  <span className="font-bold text-white block">Material 3 UI</span>
                  <span className="text-[9.5px] text-slate-400">System Purple Theme</span>
                </div>
              </div>

              <div className="absolute bottom-16 -right-8 bg-void-900/90 backdrop-blur-md px-3.5 py-2 rounded-xl border border-cyan-500/40 shadow-xl hidden sm:flex items-center space-x-2 animate-float z-20" style={{ animationDelay: '3s' }}>
                <Zap className="w-4 h-4 text-cyan-400" />
                <div className="text-[11px]">
                  <span className="font-bold text-white block">Gacha Random Roll</span>
                  <span className="text-[9.5px] text-slate-400">Instant Discover</span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
