'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, CheckCircle2, Touchpad as Touch, ChevronLeft, ChevronRight, ArrowLeft, ArrowRight } from 'lucide-react';
import { AppScreenshot } from '@/types';
import { AppScreenshotCard } from './AppScreenshotCard';

interface ScreenshotsSectionProps {
  screenshots: AppScreenshot[];
}

export const ScreenshotsSection: React.FC<ScreenshotsSectionProps> = ({ screenshots }) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [direction, setDirection] = useState<number>(0);

  const activeScreenshot = screenshots[currentIndex] || screenshots[0];

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % screenshots.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + screenshots.length) % screenshots.length);
  };

  const selectIndex = (idx: number) => {
    setDirection(idx > currentIndex ? 1 : -1);
    setCurrentIndex(idx);
  };

  // Drag End handler for swipe gestures
  const handleDragEnd = (_: any, info: { offset: { x: number } }) => {
    const swipeThreshold = 40;
    if (info.offset.x < -swipeThreshold) {
      handleNext();
    } else if (info.offset.x > swipeThreshold) {
      handlePrev();
    }
  };

  // Keyboard navigation support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex]);

  return (
    <section className="py-20 bg-void-900/60 relative overflow-hidden border-t border-purple-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-cyan-900/30 border border-cyan-500/40 text-cyan-300 text-xs font-semibold">
            <Touch className="w-3.5 h-3.5" />
            <span>Swipe Left & Right to Explore</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight font-display">
            Official UI & <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">App Screens</span>
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            Drag or swipe left and right (or use the arrow buttons) to browse all 9 official AniSpin screens.
          </p>
        </div>

        {/* Screen Tabs Selector Bar */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-4 mb-8 no-scrollbar justify-start sm:justify-center">
          {screenshots.map((s, idx) => {
            const isSelected = idx === currentIndex;
            return (
              <button
                key={s.id}
                onClick={() => selectIndex(idx)}
                className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all duration-300 whitespace-nowrap flex items-center space-x-2 border ${
                  isSelected
                    ? 'bg-gradient-to-r from-purple-600 to-cyan-600 text-white border-purple-400 shadow-neon-purple scale-105'
                    : 'bg-surface-container/80 text-slate-400 hover:text-white border-white/5 hover:bg-surface-high'
                }`}
              >
                <span>{s.title}</span>
                {s.badge && (
                  <span className={`text-[9px] px-1.5 py-0.5 rounded ${isSelected ? 'bg-white/20 text-white' : 'bg-purple-900/40 text-purple-300'}`}>
                    {s.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Swipeable Container Grid */}
        <div className="relative group">
          
          {/* Left Arrow Button */}
          <button
            onClick={handlePrev}
            className="absolute left-2 sm:-left-6 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-void-950/90 border border-purple-500/40 text-purple-300 hover:text-white hover:bg-purple-600 shadow-neon-purple flex items-center justify-center transition-all hover:scale-110"
            aria-label="Previous Screenshot"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Right Arrow Button */}
          <button
            onClick={handleNext}
            className="absolute right-2 sm:-right-6 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-void-950/90 border border-purple-500/40 text-purple-300 hover:text-white hover:bg-purple-600 shadow-neon-purple flex items-center justify-center transition-all hover:scale-110"
            aria-label="Next Screenshot"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Static Card Container Frame */}
          <div className="bg-surface-container/40 rounded-3xl border border-white/10 shadow-2xl overflow-hidden relative">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={activeScreenshot.id}
                custom={direction}
                initial={{ opacity: 0, x: direction > 0 ? 30 : -30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction > 0 ? -30 : 30 }}
                transition={{ duration: 0.25, ease: 'easeInOut' }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.15}
                onDragEnd={handleDragEnd}
                className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center p-6 sm:p-10 cursor-grab active:cursor-grabbing touch-pan-y"
              >
                {/* Actual Screenshot Image Column */}
                <div className="lg:col-span-5 flex justify-center">
                  <AppScreenshotCard screenshot={activeScreenshot} />
                </div>

                {/* Description & Feature Breakdown Column */}
                <div className="lg:col-span-7 space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="inline-block px-3 py-1 rounded-lg bg-purple-900/40 border border-purple-500/30 text-purple-300 text-xs font-bold uppercase tracking-wider">
                      {activeScreenshot.badge || 'Screen Spotlight'}
                    </div>
                    <span className="text-xs text-slate-400 font-mono">
                      Screen {currentIndex + 1} of {screenshots.length}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-2xl sm:text-3xl font-black text-white font-display mb-1">
                      {activeScreenshot.title}
                    </h3>
                    <p className="text-sm text-cyan-400 font-semibold mb-3">
                      {activeScreenshot.subtitle}
                    </p>
                    <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                      {activeScreenshot.description}
                    </p>
                  </div>

                  {/* Feature Highlights */}
                  <div className="space-y-3 pt-2">
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                      Analyzed UI Features
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {activeScreenshot.highlights.map((h, i) => (
                        <div key={i} className="flex items-center space-x-3 text-xs sm:text-sm text-slate-200 bg-void-950/60 p-3 rounded-xl border border-white/5">
                          <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0" />
                          <span>{h}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Interactive Controls Bar */}
                  <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center space-x-2 text-xs text-slate-400">
                      <Touch className="w-4 h-4 text-cyan-400" />
                      <span>Swipe left or right to change screens</span>
                    </div>

                    <div className="flex items-center space-x-3">
                      <button
                        onClick={handlePrev}
                        className="px-3.5 py-2 rounded-xl bg-void-950 hover:bg-purple-900/40 border border-white/10 text-xs font-bold text-slate-300 hover:text-white flex items-center space-x-1 transition-all"
                      >
                        <ArrowLeft className="w-3.5 h-3.5" />
                        <span>Prev</span>
                      </button>
                      <button
                        onClick={handleNext}
                        className="px-3.5 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-xs font-bold text-white shadow-neon-purple flex items-center space-x-1 transition-all"
                      >
                        <span>Next</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center items-center space-x-2 pt-6">
            {screenshots.map((_, i) => (
              <button
                key={i}
                onClick={() => selectIndex(i)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === currentIndex
                    ? 'w-8 bg-gradient-to-r from-purple-500 to-cyan-400 shadow-neon-purple'
                    : 'w-2 bg-slate-700 hover:bg-slate-500'
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};
