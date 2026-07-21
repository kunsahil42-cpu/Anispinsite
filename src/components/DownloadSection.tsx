'use client';

import React from 'react';
import { Download, Play, Apple, ShieldCheck, HardDrive } from 'lucide-react';
import { SiteConfig } from '@/types';

interface DownloadSectionProps {
  config: SiteConfig;
}

export const DownloadSection: React.FC<DownloadSectionProps> = ({ config }) => {
  return (
    <section id="download" className="py-24 bg-void-950 relative overflow-hidden border-t border-purple-900/30">
      
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-gradient-to-r from-purple-600/10 to-cyan-500/10 blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-purple-900/40 border border-purple-500/30 text-purple-300 text-xs font-semibold">
            <Download className="w-3.5 h-3.5" />
            <span>Official Distribution Hub</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight font-display">
            Download <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">AniSpin APK</span>
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            Safe, verified, and ad-free. Download the official package directly to your Android device.
          </p>
        </div>

        {/* Download Card Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Main Download Card */}
          <div className="lg:col-span-7 bg-surface-container/80 border border-purple-500/30 rounded-3xl p-8 sm:p-10 shadow-neon-purple/20 flex flex-col justify-between space-y-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 px-6 py-2 bg-gradient-to-l from-purple-600 to-cyan-500 text-white font-extrabold text-xs rounded-bl-2xl uppercase tracking-wider">
              {config.version} Stable
            </div>

            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-600 to-cyan-500 p-0.5 shadow-neon-purple">
                  <div className="w-full h-full bg-void-950 rounded-[14px] flex items-center justify-center">
                    <span className="text-3xl font-black bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                      A
                    </span>
                  </div>
                </div>
                <div>
                  <h3 className="text-2xl font-black text-white font-display">{config.appName} Official Package</h3>
                  <p className="text-xs text-purple-300 font-medium">Released {config.releaseDate} • {config.apkSize}</p>
                </div>
              </div>

              {/* Package Metadata Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-2">
                <div className="bg-void-950/80 p-3.5 rounded-2xl border border-white/5">
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">Version</span>
                  <span className="text-sm font-bold text-white">{config.version}</span>
                </div>
                <div className="bg-void-950/80 p-3.5 rounded-2xl border border-white/5">
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">File Size</span>
                  <span className="text-sm font-bold text-white">{config.apkSize}</span>
                </div>
                <div className="bg-void-950/80 p-3.5 rounded-2xl border border-white/5 col-span-2 sm:col-span-1">
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">Requirements</span>
                  <span className="text-xs font-bold text-slate-200">{config.minAndroidVersion}</span>
                </div>
              </div>

              {/* Dynamic Release Notes */}
              {config.releaseNotes && (
                <div className="bg-void-950/40 p-5 rounded-2xl border border-white/5 space-y-2 mt-4">
                  <span className="text-[10px] text-purple-400 uppercase font-bold block tracking-wider">What's New in this Version</span>
                  <div className="text-xs sm:text-sm text-slate-300 leading-relaxed whitespace-pre-line">
                    {config.releaseNotes}
                  </div>
                </div>
              )}
            </div>

            {/* Direct Download Action */}
            <div className="space-y-4 pt-4">
              <a
                href={config.primaryApkUrl}
                download
                className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-purple-600 via-purple-700 to-cyan-500 text-white font-bold text-base shadow-neon-purple hover:shadow-neon-cyan transition-all duration-300 flex items-center justify-center space-x-3 transform hover:-translate-y-0.5"
              >
                <Download className="w-5 h-5 animate-bounce" />
                <span>Download AniSpin v{config.version} APK</span>
              </a>

              {/* Store buttons */}
              <div className="grid grid-cols-2 gap-4">
                {config.playStoreEnabled ? (
                  <a
                    href={config.playStoreUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-void-950/80 p-3 rounded-2xl border border-emerald-500/30 hover:border-emerald-400/60 flex items-center space-x-3 transition-colors group"
                  >
                    <Play className="w-5 h-5 text-emerald-400 group-hover:scale-110 transition-transform" />
                    <div className="text-left">
                      <div className="text-[9px] text-slate-450 uppercase font-bold">Google Play</div>
                      <div className="text-xs font-semibold text-white">Get on Play Store</div>
                    </div>
                  </a>
                ) : (
                  <div className="bg-void-950/80 p-3 rounded-2xl border border-white/5 flex items-center space-x-3 opacity-50 cursor-not-allowed">
                    <Play className="w-5 h-5 text-slate-500" />
                    <div className="text-left">
                      <div className="text-[9px] text-slate-500 uppercase font-bold">Google Play</div>
                      <div className="text-xs font-semibold text-slate-400">Coming Soon</div>
                    </div>
                  </div>
                )}

                {config.appStoreEnabled ? (
                  <a
                    href={config.appStoreUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-void-950/80 p-3 rounded-2xl border border-emerald-500/30 hover:border-emerald-400/60 flex items-center space-x-3 transition-colors group"
                  >
                    <Apple className="w-5 h-5 text-emerald-400 group-hover:scale-110 transition-transform" />
                    <div className="text-left">
                      <div className="text-[9px] text-slate-450 uppercase font-bold">App Store</div>
                      <div className="text-xs font-semibold text-white">Download on iOS</div>
                    </div>
                  </a>
                ) : (
                  <div className="bg-void-950/80 p-3 rounded-2xl border border-white/5 flex items-center space-x-3 opacity-50 cursor-not-allowed">
                    <Apple className="w-5 h-5 text-slate-500" />
                    <div className="text-left">
                      <div className="text-[9px] text-slate-500 uppercase font-bold">App Store</div>
                      <div className="text-xs font-semibold text-slate-400">Coming Soon</div>
                    </div>
                  </div>
                )}
              </div>
            </div>

          </div>

          {/* Sideloading Instructions Column */}
          <div className="lg:col-span-5 bg-surface-container/60 border border-white/10 rounded-3xl p-8 flex flex-col justify-between space-y-6">
            <div>
              <h4 className="text-lg font-bold text-white mb-6 font-display flex items-center space-x-2">
                <HardDrive className="w-5 h-5 text-purple-400" />
                <span>Installation Guide</span>
              </h4>

              <div className="space-y-6">
                {[
                  { step: '1', title: 'Download APK', desc: 'Tap the Download button to get the official AniSpin APK package.' },
                  { step: '2', title: 'Allow Installation', desc: 'If prompted by Android, enable "Install from unknown sources" in browser settings.' },
                  { step: '3', title: 'Install & Launch', desc: 'Open your device file manager, tap AniSpin.apk, and complete the instant installation.' },
                ].map((s) => (
                  <div key={s.step} className="flex items-start space-x-4 bg-void-950/60 p-4 rounded-2xl border border-white/5">
                    <div className="w-8 h-8 rounded-xl bg-purple-600/30 border border-purple-500/40 text-purple-300 font-bold text-sm flex items-center justify-center shrink-0">
                      {s.step}
                    </div>
                    <div>
                      <h5 className="font-bold text-base text-white">{s.title}</h5>
                      <p className="text-slate-400 text-xs leading-relaxed mt-0.5">{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-purple-950/30 border border-purple-500/20 p-4 rounded-2xl text-xs text-purple-300 flex items-center space-x-2">
              <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
              <span>100% Ad-Free & Clean Package</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
