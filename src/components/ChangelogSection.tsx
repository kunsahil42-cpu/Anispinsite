'use client';

import React from 'react';
import { History, PlusCircle, Wrench, CheckCircle2, Tag } from 'lucide-react';
import { changelogData } from '@/lib/data';

export const ChangelogSection: React.FC = () => {
  return (
    <section className="py-24 bg-void-900/40 relative overflow-hidden border-t border-purple-900/30">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-cyan-900/30 border border-cyan-500/40 text-cyan-300 text-xs font-semibold">
            <History className="w-3.5 h-3.5" />
            <span>Release History</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight font-display">
            Version <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">Changelog</span>
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            Track our continuous updates, features, improvements, and performance optimizations.
          </p>
        </div>

        {/* Timeline Container */}
        <div className="relative border-l-2 border-purple-500/30 ml-4 sm:ml-8 space-y-12 pl-6 sm:pl-10">
          {changelogData.map((item) => (
            <div key={item.id} className="relative group">
              
              {/* Node Marker */}
              <div className="absolute -left-[31px] sm:-left-[47px] top-1.5 w-5 h-5 rounded-full bg-purple-600 border-4 border-void-950 shadow-neon-purple group-hover:scale-125 transition-transform" />

              {/* Release Card */}
              <div className="bg-surface-container/70 border border-white/10 hover:border-purple-500/40 rounded-3xl p-6 sm:p-8 transition-all shadow-xl space-y-6">
                
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/5 pb-4">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl font-black text-white font-display">{item.version}</span>
                    <span className="px-3 py-1 rounded-full bg-purple-900/50 text-purple-300 text-xs font-bold border border-purple-500/30">
                      {item.tag}
                    </span>
                  </div>
                  <span className="text-xs font-semibold text-slate-400 font-mono">{item.date}</span>
                </div>

                <h3 className="text-lg font-bold text-slate-200">{item.title}</h3>

                {/* Changes List */}
                <div className="space-y-4 text-xs sm:text-sm">
                  
                  {/* Added Items */}
                  {item.changes.added && item.changes.added.length > 0 && (
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2 font-bold text-emerald-400">
                        <PlusCircle className="w-4 h-4" />
                        <span>Added Features</span>
                      </div>
                      <ul className="space-y-1.5 pl-6 list-disc text-slate-300">
                        {item.changes.added.map((add, idx) => (
                          <li key={idx}>{add}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Improvements */}
                  {item.changes.improved && item.changes.improved.length > 0 && (
                    <div className="space-y-2 pt-2">
                      <div className="flex items-center space-x-2 font-bold text-cyan-400">
                        <Wrench className="w-4 h-4" />
                        <span>Improvements & Optimizations</span>
                      </div>
                      <ul className="space-y-1.5 pl-6 list-disc text-slate-300">
                        {item.changes.improved.map((imp, idx) => (
                          <li key={idx}>{imp}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Fixes */}
                  {item.changes.fixed && item.changes.fixed.length > 0 && (
                    <div className="space-y-2 pt-2">
                      <div className="flex items-center space-x-2 font-bold text-purple-400">
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Bug Fixes</span>
                      </div>
                      <ul className="space-y-1.5 pl-6 list-disc text-slate-300">
                        {item.changes.fixed.map((fix, idx) => (
                          <li key={idx}>{fix}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
