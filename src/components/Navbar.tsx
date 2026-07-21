'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Download, Menu, X, Sparkles, ShieldCheck } from 'lucide-react';
import { SiteConfig } from '@/types';

interface NavbarProps {
  config: SiteConfig;
}

export const Navbar: React.FC<NavbarProps> = ({ config }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Download', href: '/download' },
    { name: 'Changelog', href: '/changelog' },
    { name: 'FAQ', href: '/faq' },
    { name: 'Community', href: '/community' },
    { name: 'Contact', href: '/contact' },
  ];

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-void-950/80 backdrop-blur-xl border-b border-purple-900/30 shadow-glass py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo Brand */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="relative w-10 h-10 rounded-2xl bg-gradient-to-br from-purple-600 via-purple-800 to-cyan-500 p-0.5 shadow-neon-purple group-hover:scale-105 transition-transform duration-300">
              <div className="w-full h-full bg-void-950 rounded-[14px] flex items-center justify-center relative overflow-hidden">
                <span className="text-xl font-extrabold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                  A
                </span>
                <div className="absolute inset-0 bg-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center space-x-1.5">
                <span className="text-2xl font-black tracking-tight text-white font-display">
                  Ani<span className="text-purple-400">Spin</span>
                </span>
                <span className="px-1.5 py-0.5 text-[10px] font-semibold bg-purple-500/20 text-purple-300 border border-purple-500/30 rounded-md">
                  PRO
                </span>
              </div>
              <span className="text-[10px] text-slate-400 -mt-1 font-medium tracking-wider">
                ANIME & MANGA
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center space-x-1 bg-surface-container/60 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/10 shadow-inner">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    active
                      ? 'bg-purple-600 text-white shadow-neon-purple'
                      : 'text-slate-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Action Area */}
          <div className="hidden md:flex items-center space-x-3">
            <Link
              href="/admin"
              className="text-xs font-semibold text-slate-400 hover:text-purple-300 px-3 py-2 rounded-lg hover:bg-white/5 transition-colors flex items-center space-x-1"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-purple-400" />
              <span>Admin</span>
            </Link>

            <Link
              href="/download"
              className="relative group overflow-hidden px-5 py-2.5 rounded-full bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-semibold text-sm shadow-neon-purple hover:shadow-neon-cyan transition-all duration-300 flex items-center space-x-2 transform hover:-translate-y-0.5"
            >
              <Download className="w-4 h-4 group-hover:animate-bounce" />
              <span>Get APK ({config.version})</span>
              <Sparkles className="w-3.5 h-3.5 text-cyan-200 animate-pulse" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            <Link
              href="/download"
              className="p-2 rounded-full bg-purple-600/30 text-purple-300 border border-purple-500/40"
            >
              <Download className="w-5 h-5" />
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded.xl text-slate-300 hover:text-white bg-surface-container/80 border border-white/10"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-void-900/95 backdrop-blur-2xl border-b border-purple-900/40 px-4 pt-3 pb-6 mt-3 space-y-3 animate-in slide-in-from-top duration-300">
          <div className="space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-4 py-3 rounded-xl font-medium text-base ${
                  isActive(link.href)
                    ? 'bg-purple-600 text-white font-semibold shadow-neon-purple'
                    : 'text-slate-300 hover:bg-white/5'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="pt-4 border-t border-slate-800 space-y-2">
            <Link
              href="/download"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center space-x-2 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-bold shadow-neon-purple"
            >
              <Download className="w-5 h-5" />
              <span>Download AniSpin APK ({config.version})</span>
            </Link>
            <Link
              href="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center space-x-1.5 py-2.5 rounded-xl text-slate-400 bg-white/5 hover:bg-white/10 text-sm font-medium"
            >
              <ShieldCheck className="w-4 h-4 text-purple-400" />
              <span>Admin Dashboard</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
