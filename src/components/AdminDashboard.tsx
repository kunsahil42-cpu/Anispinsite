'use client';

import React, { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import {
  ShieldCheck, LogOut, Save, RefreshCw, Download, Globe,
  Sparkles, MessageSquare, Disc as Discord, CheckCircle2, AlertCircle, FileText,
  Upload, FileCheck
} from 'lucide-react';
import { SiteConfig } from '@/types';

interface AdminDashboardProps {
  initialConfig: SiteConfig;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ initialConfig }) => {
  const [config, setConfig] = useState<SiteConfig>(initialConfig);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'general' | 'downloads' | 'community' | 'seo' | 'theme'>('general');
  const [toastMessage, setToastMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const router = useRouter();

  const handleSave = async () => {
    setSaving(true);
    setToastMessage(null);

    try {
      const res = await fetch('/api/admin/config', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(config),
      });

      if (res.ok) {
        setToastMessage({ type: 'success', text: 'Website settings saved & updated successfully!' });
      } else {
        const data = await res.json();
        setToastMessage({ type: 'error', text: data.error || 'Failed to update settings.' });
      }
    } catch {
      setToastMessage({ type: 'error', text: 'Network connection error while saving.' });
    } finally {
      setSaving(false);
      setTimeout(() => setToastMessage(null), 4000);
    }
  };

  const handleLogout = async () => {
    await fetch('/api/admin/auth', { method: 'DELETE' });
    router.push('/admin/login');
    router.refresh();
  };

  const handleApkFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.name.endsWith('.apk')) {
      setToastMessage({ type: 'error', text: 'Selected file must be an .apk package.' });
      return;
    }

    setUploading(true);
    setUploadStatus(`Uploading ${file.name}...`);
    setToastMessage(null);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/admin/upload-apk', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setConfig((prev) => ({
          ...prev,
          primaryApkUrl: data.url,
          apkSize: data.size,
        }));
        setToastMessage({
          type: 'success',
          text: `APK uploaded successfully! Link set to ${data.url} (${data.size})`,
        });
        setUploadStatus(`Uploaded: ${file.name}`);
      } else {
        setToastMessage({ type: 'error', text: data.error || 'Failed to upload APK file.' });
        setUploadStatus(null);
      }
    } catch (err) {
      setToastMessage({ type: 'error', text: 'Network error during APK upload.' });
      setUploadStatus(null);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-void-950 text-white pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Admin Header */}
        <div className="bg-surface-container border border-purple-500/30 p-6 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-4 shadow-neon-purple/20">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-600 to-cyan-500 p-0.5 shadow-md">
              <div className="w-full h-full bg-void-950 rounded-[14px] flex items-center justify-center">
                <ShieldCheck className="w-6 h-6 text-purple-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-2xl font-black text-white font-display">AniSpin Admin Panel</h1>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                  Live Sync
                </span>
              </div>
              <p className="text-xs text-slate-400">Manage release links, versioning, direct APK uploads, and website aesthetics live.</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={handleSave}
              disabled={saving}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 font-bold text-sm text-white shadow-neon-purple flex items-center space-x-2 transition-all disabled:opacity-50"
            >
              {saving ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              <span>{saving ? 'Saving...' : 'Save All Changes'}</span>
            </button>

            <button
              onClick={handleLogout}
              className="px-4 py-2.5 rounded-xl bg-void-900 border border-white/10 hover:bg-red-900/30 hover:border-red-500/40 text-slate-300 hover:text-red-300 font-medium text-sm transition-colors flex items-center space-x-1.5"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </div>
        </div>

        {/* Toast Alert */}
        {toastMessage && (
          <div
            className={`p-4 rounded-2xl border flex items-center space-x-3 text-sm font-semibold animate-in fade-in ${
              toastMessage.type === 'success'
                ? 'bg-emerald-950/80 border-emerald-500/50 text-emerald-200'
                : 'bg-red-950/80 border-red-500/50 text-red-200'
            }`}
          >
            {toastMessage.type === 'success' ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
            ) : (
              <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />
            )}
            <span>{toastMessage.text}</span>
          </div>
        )}

        {/* Navigation Tabs */}
        <div className="flex space-x-2 border-b border-white/10 pb-4 overflow-x-auto no-scrollbar">
          {[
            { id: 'general', label: 'App & Versioning', icon: FileText },
            { id: 'downloads', label: 'Downloads & Direct APK Upload', icon: Download },
            { id: 'community', label: 'Social & Community Links', icon: Discord },
            { id: 'seo', label: 'SEO & Meta Tags', icon: Globe },
            { id: 'theme', label: 'Aesthetics & RGB Lighting', icon: Sparkles },
          ].map((tab) => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-2 whitespace-nowrap ${
                  active
                    ? 'bg-purple-600 text-white shadow-neon-purple'
                    : 'bg-surface-container/60 text-slate-400 hover:text-white border border-white/5'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab 1: General Versioning */}
        {activeTab === 'general' && (
          <div className="bg-surface-container/80 border border-white/10 p-6 sm:p-8 rounded-3xl space-y-6">
            <h3 className="text-lg font-bold text-white font-display border-b border-white/5 pb-3">App Package Metadata</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-300 uppercase">App Name</label>
                <input
                  type="text"
                  value={config.appName}
                  onChange={(e) => setConfig({ ...config, appName: e.target.value })}
                  className="w-full bg-void-950 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-purple-500"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-300 uppercase">Current App Version</label>
                <input
                  type="text"
                  value={config.version}
                  onChange={(e) => setConfig({ ...config, version: e.target.value })}
                  className="w-full bg-void-950 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-purple-500 font-mono"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-300 uppercase">APK File Size</label>
                <input
                  type="text"
                  value={config.apkSize}
                  onChange={(e) => setConfig({ ...config, apkSize: e.target.value })}
                  className="w-full bg-void-950 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-purple-500"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-300 uppercase">Release Date</label>
                <input
                  type="text"
                  value={config.releaseDate}
                  onChange={(e) => setConfig({ ...config, releaseDate: e.target.value })}
                  className="w-full bg-void-950 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-purple-500"
                />
              </div>

              <div className="sm:col-span-2 space-y-2">
                <label className="text-xs font-bold text-slate-300 uppercase">Hero Tagline</label>
                <input
                  type="text"
                  value={config.tagline}
                  onChange={(e) => setConfig({ ...config, tagline: e.target.value })}
                  className="w-full bg-void-950 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-purple-500"
                />
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Downloads & Direct APK Upload */}
        {activeTab === 'downloads' && (
          <div className="bg-surface-container/80 border border-white/10 p-6 sm:p-8 rounded-3xl space-y-8">
            
            {/* Direct APK File Upload Box */}
            <div className="bg-void-950/90 border border-purple-500/30 p-6 rounded-2xl space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-white font-display flex items-center space-x-2">
                    <Upload className="w-5 h-5 text-purple-400" />
                    <span>Direct APK File Uploader</span>
                  </h3>
                  <p className="text-xs text-slate-400">Upload new `.apk` files directly to the server without modifying code or manually copying files.</p>
                </div>
                {uploadStatus && (
                  <span className="text-xs font-mono px-3 py-1 rounded-full bg-purple-900/40 text-purple-300 border border-purple-500/30 flex items-center space-x-1.5">
                    {uploading && <RefreshCw className="w-3 h-3 animate-spin" />}
                    <span>{uploadStatus}</span>
                  </span>
                )}
              </div>

              {/* Upload Drag & Drop Area */}
              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-purple-500/40 hover:border-purple-400 bg-surface-container/50 hover:bg-purple-900/10 p-8 rounded-2xl text-center cursor-pointer transition-all space-y-3 group"
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".apk"
                  onChange={handleApkFileUpload}
                  className="hidden"
                />

                <div className="w-14 h-14 mx-auto rounded-2xl bg-purple-600/20 border border-purple-500/30 flex items-center justify-center text-purple-400 group-hover:scale-110 transition-transform">
                  {uploading ? <RefreshCw className="w-7 h-7 animate-spin" /> : <FileCheck className="w-7 h-7" />}
                </div>

                <div>
                  <span className="font-bold text-sm text-white block">
                    {uploading ? 'Uploading APK Package to Server...' : 'Click or Drag & Drop APK File Here'}
                  </span>
                  <span className="text-xs text-slate-400">Supports `.apk` format. Automatically updates download links & file size.</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-bold text-white font-display border-b border-white/5 pb-3">Primary APK Download Link</h3>
              <div className="space-y-2 pt-4">
                <label className="text-xs font-bold text-slate-300 uppercase">Primary Direct APK Download URL</label>
                <input
                  type="text"
                  value={config.primaryApkUrl}
                  onChange={(e) => setConfig({ ...config, primaryApkUrl: e.target.value })}
                  placeholder="/downloads/AniSpin-v1.2.0.apk or https://yourdomain.com/AniSpin.apk"
                  className="w-full bg-void-950 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-purple-500 font-mono"
                />
              </div>
            </div>

            {/* Store Buttons Controls */}
            <div className="space-y-4 pt-6 border-t border-white/10">
              <h4 className="text-base font-bold text-white font-display">Store Availability Badges</h4>
              
              {/* Google Play Store Control */}
              <div className="bg-void-950/80 p-5 rounded-2xl border border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <span className="font-bold text-sm text-white block">Google Play Store Button</span>
                  <p className="text-xs text-slate-400">Toggle whether Play Store button displays "Coming Soon" or links directly.</p>
                </div>
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => setConfig({ ...config, playStoreEnabled: !config.playStoreEnabled })}
                    className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all ${
                      config.playStoreEnabled
                        ? 'bg-emerald-600 text-white border-emerald-500'
                        : 'bg-slate-800 text-slate-400 border-white/10'
                    }`}
                  >
                    {config.playStoreEnabled ? 'Enabled' : 'Disabled (Coming Soon)'}
                  </button>
                </div>
              </div>

              {config.playStoreEnabled && (
                <div className="space-y-2 pl-4 border-l-2 border-emerald-500">
                  <label className="text-xs font-bold text-slate-300 uppercase">Google Play Store URL</label>
                  <input
                    type="text"
                    value={config.playStoreUrl}
                    onChange={(e) => setConfig({ ...config, playStoreUrl: e.target.value })}
                    className="w-full bg-void-950 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-purple-500 font-mono"
                  />
                </div>
              )}

              {/* App Store Control */}
              <div className="bg-void-950/80 p-5 rounded-2xl border border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <span className="font-bold text-sm text-white block">Apple App Store Button</span>
                  <p className="text-xs text-slate-400">Toggle whether App Store button displays "Coming Soon" or links directly.</p>
                </div>
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => setConfig({ ...config, appStoreEnabled: !config.appStoreEnabled })}
                    className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all ${
                      config.appStoreEnabled
                        ? 'bg-emerald-600 text-white border-emerald-500'
                        : 'bg-slate-800 text-slate-400 border-white/10'
                    }`}
                  >
                    {config.appStoreEnabled ? 'Enabled' : 'Disabled (Coming Soon)'}
                  </button>
                </div>
              </div>

              {config.appStoreEnabled && (
                <div className="space-y-2 pl-4 border-l-2 border-emerald-500">
                  <label className="text-xs font-bold text-slate-300 uppercase">App Store URL</label>
                  <input
                    type="text"
                    value={config.appStoreUrl}
                    onChange={(e) => setConfig({ ...config, appStoreUrl: e.target.value })}
                    className="w-full bg-void-950 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-purple-500 font-mono"
                  />
                </div>
              )}
            </div>

          </div>
        )}

        {/* Tab 3: Community & Social Links */}
        {activeTab === 'community' && (
          <div className="bg-surface-container/80 border border-white/10 p-6 sm:p-8 rounded-3xl space-y-6">
            <h3 className="text-lg font-bold text-white font-display border-b border-white/5 pb-3">Discord & Reddit Links</h3>
            
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-300 uppercase flex items-center space-x-2">
                  <Discord className="w-4 h-4 text-purple-400" />
                  <span>Discord Invite URL</span>
                </label>
                <input
                  type="text"
                  value={config.discordUrl}
                  onChange={(e) => setConfig({ ...config, discordUrl: e.target.value })}
                  className="w-full bg-void-950 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-purple-500 font-mono"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-300 uppercase flex items-center space-x-2">
                  <MessageSquare className="w-4 h-4 text-cyan-400" />
                  <span>Reddit Subreddit URL</span>
                </label>
                <input
                  type="text"
                  value={config.redditUrl}
                  onChange={(e) => setConfig({ ...config, redditUrl: e.target.value })}
                  className="w-full bg-void-950 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-purple-500 font-mono"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-300 uppercase flex items-center space-x-2">
                  <Globe className="w-4 h-4 text-emerald-400" />
                  <span>GitHub Repository URL</span>
                </label>
                <input
                  type="text"
                  value={config.githubUrl}
                  onChange={(e) => setConfig({ ...config, githubUrl: e.target.value })}
                  className="w-full bg-void-950 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-purple-500 font-mono"
                />
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: SEO Settings */}
        {activeTab === 'seo' && (
          <div className="bg-surface-container/80 border border-white/10 p-6 sm:p-8 rounded-3xl space-y-6">
            <h3 className="text-lg font-bold text-white font-display border-b border-white/5 pb-3">Search Engine Optimization</h3>
            
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-300 uppercase">SEO Page Title</label>
                <input
                  type="text"
                  value={config.seoTitle}
                  onChange={(e) => setConfig({ ...config, seoTitle: e.target.value })}
                  className="w-full bg-void-950 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-purple-500"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-300 uppercase">Meta Description</label>
                <textarea
                  rows={3}
                  value={config.seoDescription}
                  onChange={(e) => setConfig({ ...config, seoDescription: e.target.value })}
                  className="w-full bg-void-950 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-purple-500"
                />
              </div>
            </div>
          </div>
        )}

        {/* Tab 5: Aesthetics & RGB */}
        {activeTab === 'theme' && (
          <div className="bg-surface-container/80 border border-white/10 p-6 sm:p-8 rounded-3xl space-y-6">
            <h3 className="text-lg font-bold text-white font-display border-b border-white/5 pb-3">Theme & Aesthetic Customizer</h3>
            
            <div className="bg-void-950/80 p-5 rounded-2xl border border-white/5 flex items-center justify-between">
              <div className="space-y-1">
                <span className="font-bold text-sm text-white block">RGB Ambient Aura Animation</span>
                <p className="text-xs text-slate-400">Enable or disable smooth animated RGB aura backdrops on hero section and cards.</p>
              </div>
              <button
                onClick={() =>
                  setConfig({
                    ...config,
                    themeSettings: {
                      ...config.themeSettings,
                      rgbGlowEnabled: !config.themeSettings.rgbGlowEnabled,
                    },
                  })
                }
                className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all ${
                  config.themeSettings.rgbGlowEnabled
                    ? 'bg-purple-600 text-white border-purple-400 shadow-neon-purple'
                    : 'bg-slate-800 text-slate-400 border-white/10'
                }`}
              >
                {config.themeSettings.rgbGlowEnabled ? 'Enabled (RGB ON)' : 'Disabled'}
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
