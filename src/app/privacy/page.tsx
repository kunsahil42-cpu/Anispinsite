import React from 'react';

export const metadata = {
  title: 'Privacy Policy - AniSpin Official',
  description: 'Read the official AniSpin Privacy Policy regarding user data protection, local storage, and zero-telemetry guarantee.',
};

export default function PrivacyPage() {
  return (
    <div className="pt-28 pb-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 text-slate-300 text-sm leading-relaxed">
      <div className="space-y-2 border-b border-white/10 pb-6">
        <h1 className="text-3xl sm:text-4xl font-black text-white font-display">Privacy Policy</h1>
        <p className="text-xs text-purple-400 font-mono">Last Updated: July 2026</p>
      </div>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-white font-display">1. Zero Personal Data Collection</h2>
        <p>
          AniSpin is designed with a privacy-first architecture. The application does NOT require account registration, email addresses, phone numbers, or social media logins to function. We do not harvest or sell personal identifiable information.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-white font-display">2. On-Device Storage & Bookmarks</h2>
        <p>
          All watch history, reading progress, favorites lists, and custom settings (such as System Purple theme preferences and playback quality) are stored locally on your device using encrypted local storage.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-white font-display">3. Network & Content Fetching</h2>
        <p>
          AniSpin connects to public API endpoints solely to fetch streaming metadata, cover art, chapter images, and episode broadcast schedules. No analytics trackers or advertising ID SDKs are bundled inside the APK package.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-white font-display">4. Security & SHA-256 Checksums</h2>
        <p>
          Official APK releases are compiled directly from source code and signed with cryptographic keys. Users can verify package integrity using the SHA-256 checksums provided on our official website.
        </p>
      </section>
    </div>
  );
}
