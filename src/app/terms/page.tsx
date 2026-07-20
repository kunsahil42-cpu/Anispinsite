import React from 'react';

export const metadata = {
  title: 'Terms of Service - AniSpin Official',
  description: 'Read the official AniSpin Terms of Service covering application usage guidelines and distribution rights.',
};

export default function TermsPage() {
  return (
    <div className="pt-28 pb-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 text-slate-300 text-sm leading-relaxed">
      <div className="space-y-2 border-b border-white/10 pb-6">
        <h1 className="text-3xl sm:text-4xl font-black text-white font-display">Terms of Service</h1>
        <p className="text-xs text-purple-400 font-mono">Last Updated: July 2026</p>
      </div>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-white font-display">1. Acceptance of Terms</h2>
        <p>
          By downloading, installing, or accessing the AniSpin application or website, you agree to comply with and be bound by these Terms of Service.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-white font-display">2. Application Usage & License</h2>
        <p>
          AniSpin grants you a personal, non-exclusive, non-transferable license to use the application on compatible Android devices for personal entertainment. You agree not to decompile, reverse engineer, or redistribute modified packages containing malware.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-white font-display">3. Disclaimer of Warranties</h2>
        <p>
          AniSpin is provided "as is" and "as available" without warranties of any kind. While we strive to maintain uninterrupted service and high video playback reliability, we do not guarantee error-free streaming on all network conditions.
        </p>
      </section>
    </div>
  );
}
