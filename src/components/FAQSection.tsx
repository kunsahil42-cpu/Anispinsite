'use client';

import React, { useState } from 'react';
import { HelpCircle, ChevronDown, Search } from 'lucide-react';
import { faqData } from '@/lib/data';

export const FAQSection: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>('1');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredFaqs = faqData.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section className="py-24 bg-void-950 relative overflow-hidden border-t border-purple-900/30">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-purple-900/40 border border-purple-500/30 text-purple-300 text-xs font-semibold">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Got Questions?</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight font-display">
            Frequently Asked <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">Questions</span>
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            Find instant answers regarding AniSpin installation, security, features, and release schedules.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative mb-10 max-w-xl mx-auto">
          <Search className="w-5 h-5 text-purple-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search questions (e.g. installation, safety, update)..."
            className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-surface-container border border-white/10 text-white placeholder:text-slate-500 focus:outline-none focus:border-purple-500 shadow-inner text-sm"
          />
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-4">
          {filteredFaqs.length === 0 ? (
            <div className="text-center py-10 text-slate-400 text-sm">
              No matching questions found for "{searchQuery}".
            </div>
          ) : (
            filteredFaqs.map((faq) => {
              const isOpen = openId === faq.id;
              return (
                <div
                  key={faq.id}
                  className="bg-surface-container/70 border border-white/10 rounded-2xl overflow-hidden transition-all duration-200"
                >
                  <button
                    onClick={() => setOpenId(isOpen ? null : faq.id)}
                    className="w-full px-6 py-4 text-left flex items-center justify-between font-bold text-white text-base hover:text-purple-300 transition-colors"
                  >
                    <span>{faq.question}</span>
                    <ChevronDown
                      className={`w-5 h-5 text-purple-400 shrink-0 transition-transform duration-300 ${
                        isOpen ? 'rotate-180 text-cyan-400' : ''
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-5 pt-1 text-slate-300 text-sm leading-relaxed border-t border-white/5 space-y-2">
                      {faq.answer.split('\n').map((paragraph, i) => (
                        <p key={i}>{paragraph}</p>
                      ))}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

      </div>
    </section>
  );
};
