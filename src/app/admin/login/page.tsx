'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Lock, ShieldCheck, ArrowRight, AlertCircle, Sparkles } from 'lucide-react';

export default function AdminLoginPage() {
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      if (res.ok) {
        router.push('/admin');
        router.refresh();
      } else {
        const data = await res.json();
        setError(data.message || 'Invalid passcode');
      }
    } catch {
      setError('Connection error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-void-950 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Glow Effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-600/15 blur-[160px] pointer-events-none" />

      <div className="w-full max-w-md bg-surface-container/80 border border-purple-500/30 p-8 rounded-3xl shadow-2xl backdrop-blur-xl relative z-10 space-y-6">
        
        {/* Logo & Header */}
        <div className="text-center space-y-3">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-gradient-to-br from-purple-600 to-cyan-500 p-0.5 shadow-neon-purple flex items-center justify-center">
            <div className="w-full h-full bg-void-950 rounded-[14px] flex items-center justify-center text-purple-400">
              <ShieldCheck className="w-7 h-7" />
            </div>
          </div>

          <h1 className="text-2xl font-black text-white font-display">AniSpin Admin Gateway</h1>
          <p className="text-slate-400 text-xs">Enter your secure passcode to access the website management dashboard.</p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="p-3.5 rounded-xl bg-red-950/80 border border-red-500/50 text-red-200 text-xs font-semibold flex items-center space-x-2 animate-in fade-in">
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
              Admin Passcode
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-purple-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-void-950 border border-white/10 text-white placeholder:text-slate-600 focus:outline-none focus:border-purple-500 text-sm font-mono"
              />
            </div>
            <p className="text-[10px] text-slate-500">Default passcode: <code className="text-purple-300">anispin2026</code> (configurable via ADMIN_PASSWORD env variable)</p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-bold text-sm shadow-neon-purple hover:shadow-neon-cyan transition-all flex items-center justify-center space-x-2 disabled:opacity-50"
          >
            <span>{loading ? 'Authenticating...' : 'Access Dashboard'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="text-center pt-2">
          <Link href="/" className="text-xs text-slate-400 hover:text-purple-300 transition-colors">
            &larr; Return to Official AniSpin Website
          </Link>
        </div>

      </div>
    </div>
  );
}
