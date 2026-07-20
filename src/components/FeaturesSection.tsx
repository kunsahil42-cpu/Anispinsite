'use client';

import React from 'react';
import { Layers, Dices, Clock, Sparkles, BarChart3, Zap, ChevronRight } from 'lucide-react';
import { featureCards } from '@/lib/data';

const iconMap: Record<string, any> = {
  Layers,
  Dices,
  Clock,
  Sparkles,
  BarChart3,
  Zap
};

export const FeaturesSection: React.FC = () => {
  return (
    <section className="py-24 relative overflow-hidden bg-void-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-purple-900/40 border border-purple-500/30 text-purple-300 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Next-Gen Features</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight font-display">
            Built for Otakus. <br />
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
              Engineered for Speed.
            </span>
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            AniSpin combines streaming and reading into a single lightweight Android application with intelligent features designed around user comfort.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featureCards.map((card) => {
            const IconComponent = iconMap[card.icon] || Sparkles;
            return (
              <div
                key={card.id}
                className="group relative bg-surface-container/60 hover:bg-surface-high border border-white/10 hover:border-purple-500/50 p-8 rounded-3xl transition-all duration-300 shadow-xl hover:shadow-neon-purple/20 hover:-translate-y-1.5 flex flex-col justify-between"
              >
                {/* Glow Overlay */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-purple-600/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />

                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${card.gradient} p-0.5 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <div className="w-full h-full bg-void-950 rounded-[14px] flex items-center justify-center text-white">
                        <IconComponent className="w-7 h-7 text-purple-300" />
                      </div>
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-purple-900/40 text-purple-300 text-[10px] font-bold border border-purple-500/30">
                      {card.badge}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-purple-300 transition-colors font-display">
                    {card.title}
                  </h3>

                  <p className="text-slate-400 text-sm leading-relaxed mb-6">
                    {card.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/5 flex items-center text-xs font-semibold text-purple-400 group-hover:text-cyan-300 transition-colors">
                  <span>Explore capability</span>
                  <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
