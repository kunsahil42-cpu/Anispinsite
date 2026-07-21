'use client';

import React from 'react';
import Link from 'next/link';
import { Heart, Send, MessageSquare, ShieldCheck, Download, Sparkles, Terminal } from 'lucide-react';
import { SiteConfig } from '@/types';

interface FooterProps {
  config: SiteConfig;
}

export const Footer: React.FC<FooterProps> = ({ config }) => {
  return (
    <footer className="relative bg-void-950 border-t border-purple-900/30 overflow-hidden pt-16 pb-12">
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-purple-600/10 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-600/10 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-white/10">
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <Link href="/" className="flex items-center space-x-3 group w-fit">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-purple-600 via-purple-800 to-cyan-500 p-0.5 shadow-neon-purple">
                <div className="w-full h-full bg-void-950 rounded-[14px] flex items-center justify-center">
                  <span className="text-xl font-black bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                    A
                  </span>
                </div>
              </div>
              <span className="text-2xl font-black tracking-tight text-white font-display">
                Ani<span className="text-purple-400">Spin</span>
              </span>
            </Link>
            
            <p className="text-slate-400 text-sm max-w-md leading-relaxed">
              The next-generation dual-engine anime streaming and manga reading platform inspired by Material 3 design and cyberpunk aesthetics. Built for anime fans worldwide.
            </p>

            <div className="flex items-center space-x-3 pt-2">
              <a
                href={config.telegramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 px-3.5 py-2 rounded-xl bg-purple-900/30 border border-purple-500/30 text-purple-300 hover:text-white hover:bg-purple-800/40 text-xs font-semibold transition-all shadow-sm"
              >
                <Send className="w-4 h-4 text-purple-400" />
                <span>Telegram</span>
              </a>
              <a
                href={config.redditUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 px-3.5 py-2 rounded-xl bg-cyan-900/30 border border-cyan-500/30 text-cyan-300 hover:text-white hover:bg-cyan-800/40 text-xs font-semibold transition-all shadow-sm"
              >
                <MessageSquare className="w-4 h-4 text-cyan-400" />
                <span>Reddit</span>
              </a>
            </div>
          </div>

          {/* Quick Navigation */}
          <div className="space-y-4">
            <h4 className="text-white font-bold text-sm tracking-wider uppercase font-display flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-purple-400" />
              <span>Navigation</span>
            </h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <Link href="/" className="hover:text-purple-300 transition-colors">
                  Home Overview
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-purple-300 transition-colors">
                  About Platform
                </Link>
              </li>
              <li>
                <Link href="/download" className="hover:text-purple-300 transition-colors">
                  Download APK ({config.version})
                </Link>
              </li>
              <li>
                <Link href="/changelog" className="hover:text-purple-300 transition-colors">
                  Version History
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-purple-300 transition-colors">
                  Search FAQ
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-purple-300 transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal & Governance */}
          <div className="space-y-4">
            <h4 className="text-white font-bold text-sm tracking-wider uppercase font-display flex items-center space-x-2">
              <ShieldCheck className="w-4 h-4 text-cyan-400" />
              <span>Legal & Admin</span>
            </h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <Link href="/privacy" className="hover:text-cyan-300 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-cyan-300 transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/community" className="hover:text-cyan-300 transition-colors">
                  Community Hub
                </Link>
              </li>
              <li>
                <Link href="/admin" className="hover:text-cyan-300 transition-colors flex items-center space-x-1">
                  <span>Admin Panel</span>
                  <span className="text-[10px] bg-purple-500/20 text-purple-300 border border-purple-500/40 px-1.5 py-0.5 rounded">Secure</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p className="flex items-center space-x-1">
            <span>&copy; {new Date().getFullYear()} AniSpin Ecosystem. All rights reserved. Built with</span>
            <Heart className="w-3.5 h-3.5 text-pink-500 fill-pink-500 inline mx-0.5" />
            <span>for Otakus worldwide.</span>
          </p>
          <div className="flex items-center space-x-4">
            <span className="inline-flex items-center space-x-1 text-slate-400">
              <Terminal className="w-3.5 h-3.5 text-purple-400" />
              <span>Version {config.version}</span>
            </span>
            <span className="text-slate-700">|</span>
            <span className="text-slate-400">Dark Mode Active</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
