import React from 'react';
import Link from 'next/link';
import { Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-void-950 flex items-center justify-center p-4 text-center">
      <div className="space-y-4 max-w-md bg-surface-container/80 border border-purple-500/30 p-8 rounded-3xl backdrop-blur-xl">
        <h1 className="text-6xl font-black text-purple-400 font-display">404</h1>
        <h2 className="text-xl font-bold text-white">Page Not Found</h2>
        <p className="text-slate-400 text-xs">The page you are looking for does not exist in the AniSpin ecosystem.</p>
        <div>
          <Link
            href="/"
            className="inline-flex items-center space-x-2 px-6 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow-neon-purple transition-all"
          >
            <Home className="w-4 h-4" />
            <span>Return Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
