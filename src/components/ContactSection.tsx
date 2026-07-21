'use client';

import React, { useState } from 'react';
import { Mail, MessageSquare, User, Send, CheckCircle2, Sparkles, AlertCircle, HelpCircle } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      setError('Please fill in all the fields.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setSuccess(true);
        setForm({ name: '', email: '', message: '' });
      } else {
        setError(data.error || 'Failed to submit the message.');
      }
    } catch {
      setError('Network connection error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-24 bg-void-950 relative overflow-hidden border-t border-purple-900/30 min-h-[80vh] flex items-center">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/3 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[150px] pointer-events-none animate-pulse" />
      <div className="absolute bottom-1/4 right-1/3 w-[500px] h-[500px] bg-cyan-600/10 rounded-full blur-[150px] pointer-events-none animate-pulse" style={{ animationDelay: '2s' }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Support Portal Info */}
          <div className="lg:col-span-5 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-purple-900/40 border border-purple-500/30 text-purple-300 text-xs font-semibold shadow-neon-purple/20">
              <Sparkles className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '3s' }} />
              <span>AniSpin Support Guild</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight leading-[1.15] font-display">
              Have a Question? <br />
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
                Reach Out to Us!
              </span>
            </h1>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-xl mx-auto lg:mx-0">
              Need assistance with installing the APK? Encountered a streaming lag or reader glitch? Or want to submit feedback and recommend your favorite features? Send a direct dispatch to our team, and we will get on it.
            </p>

            <div className="space-y-4 pt-4 text-left max-w-md mx-auto lg:mx-0">
              {[
                { title: 'Response Target', value: 'Within 24 Hours' },
                { title: 'Community Support', value: 'Telegram channel active' },
                { title: 'Ad-Free Policy', value: 'Zero commercial sponsors' },
              ].map((item, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 rounded-2xl bg-void-900/80 border border-white/5">
                  <span className="text-xs text-slate-400 font-semibold">{item.title}</span>
                  <span className="text-xs text-purple-300 font-bold font-mono">{item.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Glassmorphic Contact Card */}
          <div className="lg:col-span-7">
            <div className="relative group">
              {/* Outer RGB glowing border */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-500 rounded-3xl opacity-30 group-hover:opacity-60 blur-md transition duration-500" />
              
              <div className="relative bg-surface-container/90 border border-white/10 rounded-3xl p-8 sm:p-10 shadow-2xl space-y-6">
                
                {success ? (
                  <div className="text-center py-12 space-y-6 animate-in zoom-in-95 duration-300">
                    <div className="w-20 h-20 mx-auto rounded-3xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shadow-neon-emerald/20">
                      <CheckCircle2 className="w-10 h-10" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-2xl font-black text-white font-display">Message Transmitted!</h3>
                      <p className="text-slate-350 text-sm max-w-sm mx-auto leading-relaxed">
                        Thank you for reaching out. Your dispatch has been logged securely in our system. The administration will inspect it shortly.
                      </p>
                    </div>
                    <button
                      onClick={() => setSuccess(false)}
                      className="px-6 py-2.5 rounded-xl border border-white/10 hover:border-purple-500/40 bg-void-900 hover:bg-purple-900/10 text-slate-300 hover:text-purple-300 text-xs font-bold transition-all"
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <h3 className="text-xl font-black text-white font-display">Send a Dispatch</h3>
                      <p className="text-slate-450 text-xs mt-0.5">Please provide your valid coordinates below.</p>
                    </div>

                    {error && (
                      <div className="p-3.5 rounded-2xl bg-red-950/80 border border-red-500/30 text-red-200 text-xs font-semibold flex items-center space-x-2 animate-in slide-in-from-top-2">
                        <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                        <span>{error}</span>
                      </div>
                    )}

                    {/* Form Inputs */}
                    <div className="space-y-4">
                      
                      {/* Name input */}
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-slate-300 uppercase tracking-wider block">Your Name</label>
                        <div className="relative">
                          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">
                            <User className="w-4 h-4" />
                          </span>
                          <input
                            type="text"
                            required
                            value={form.name}
                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                            placeholder="Otaku Wanderer"
                            className="w-full bg-void-950 border border-white/10 hover:border-white/20 focus:border-purple-500 rounded-2xl pl-11 pr-4 py-3 text-sm text-white focus:outline-none transition-all placeholder:text-slate-600 font-medium"
                          />
                        </div>
                      </div>

                      {/* Email input */}
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-slate-300 uppercase tracking-wider block">Email Address</label>
                        <div className="relative">
                          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">
                            <Mail className="w-4 h-4" />
                          </span>
                          <input
                            type="email"
                            required
                            value={form.email}
                            onChange={(e) => setForm({ ...form, email: e.target.value })}
                            placeholder="coordinates@anispin.app"
                            className="w-full bg-void-950 border border-white/10 hover:border-white/20 focus:border-purple-500 rounded-2xl pl-11 pr-4 py-3 text-sm text-white focus:outline-none transition-all placeholder:text-slate-600 font-mono text-purple-300 font-medium"
                          />
                        </div>
                      </div>

                      {/* Message textarea */}
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-slate-300 uppercase tracking-wider block">Your Message</label>
                        <div className="relative">
                          <span className="absolute left-4 top-3 text-slate-500">
                            <MessageSquare className="w-4 h-4" />
                          </span>
                          <textarea
                            rows={5}
                            required
                            value={form.message}
                            onChange={(e) => setForm({ ...form, message: e.target.value })}
                            placeholder="Type your message, query, bug log or recommendation here..."
                            className="w-full bg-void-950 border border-white/10 hover:border-white/20 focus:border-purple-500 rounded-2xl pl-11 pr-4 py-3 text-sm text-white focus:outline-none transition-all placeholder:text-slate-600 font-medium"
                          />
                        </div>
                      </div>

                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 text-white font-bold text-sm shadow-neon-purple hover:shadow-neon-cyan flex items-center justify-center space-x-2 transition-all disabled:opacity-50 transform hover:-translate-y-0.5 active:translate-y-0 duration-300"
                    >
                      {loading ? (
                        <RefreshCw className="w-4 h-4 animate-spin" />
                      ) : (
                        <Send className="w-4 h-4" />
                      )}
                      <span>{loading ? 'Transmitting Dispatch...' : 'Send Message'}</span>
                    </button>
                  </form>
                )}

              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

// Simple Refresh spinner for loading button
const RefreshCw: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
    <path d="M21 3v5h-5" />
    <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
    <path d="M3 21v-5h5" />
  </svg>
);
