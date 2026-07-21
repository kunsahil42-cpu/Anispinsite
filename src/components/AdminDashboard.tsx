'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  ShieldCheck, LogOut, Save, RefreshCw, Download, Globe,
  Sparkles, MessageSquare, Send as Telegram, CheckCircle2, AlertCircle, FileText,
  Info, Trash2, Edit, Plus, Eye, AlertTriangle, Play, Apple, X, Check, History,
  Mail, Pin, PinOff, Copy, FileJson, Search, Filter
} from 'lucide-react';
import { SiteConfig, ChangelogItem, ContactMessage } from '@/types';

interface AdminDashboardProps {
  initialConfig: SiteConfig;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ initialConfig }) => {
  const [config, setConfig] = useState<SiteConfig>(initialConfig);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<'general' | 'downloads' | 'community' | 'seo' | 'messages'>('downloads');
  const [toastMessage, setToastMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  
  // Contact messages state
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [messagesLoading, setMessagesLoading] = useState(false);
  const [messageSearch, setMessageSearch] = useState('');
  const [messageFilter, setMessageFilter] = useState<'All' | 'Unread' | 'Read' | 'Replied' | 'Archived'>('All');
  const [messagePinFilter, setMessagePinFilter] = useState<'all' | 'pinned'>('all');

  const fetchMessages = async () => {
    setMessagesLoading(true);
    try {
      const res = await fetch('/api/admin/messages');
      if (res.ok) {
        const data = await res.json();
        setMessages(data);
      }
    } catch (error) {
      console.error('Failed to fetch messages:', error);
    } finally {
      setMessagesLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleUpdateMessageStatus = async (id: string, status: string) => {
    try {
      const res = await fetch('/api/admin/messages', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status })
      });
      if (res.ok) {
        setMessages(prev => prev.map(m => m.id === id ? { ...m, status: status as any } : m));
      } else {
        setToastMessage({ type: 'error', text: 'Failed to update message status.' });
      }
    } catch {
      setToastMessage({ type: 'error', text: 'Connection error while updating status.' });
    }
  };

  const handleToggleMessagePin = async (id: string, pinned: boolean) => {
    try {
      const res = await fetch('/api/admin/messages', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, pinned })
      });
      if (res.ok) {
        setMessages(prev => prev.map(m => m.id === id ? { ...m, pinned } : m));
      } else {
        setToastMessage({ type: 'error', text: 'Failed to toggle message pin.' });
      }
    } catch {
      setToastMessage({ type: 'error', text: 'Connection error while pinning.' });
    }
  };

  const handleDeleteMessage = async (id: string) => {
    if (confirm('Are you sure you want to delete this message permanently?')) {
      try {
        const res = await fetch(`/api/admin/messages?id=${id}`, {
          method: 'DELETE'
        });
        if (res.ok) {
          setMessages(prev => prev.filter(m => m.id !== id));
          setToastMessage({ type: 'success', text: 'Message permanently deleted.' });
        } else {
          setToastMessage({ type: 'error', text: 'Failed to delete message.' });
        }
      } catch {
        setToastMessage({ type: 'error', text: 'Connection error while deleting.' });
      }
    }
  };

  const handleExportMessages = () => {
    try {
      const jsonStr = JSON.stringify(messages, null, 2);
      const blob = new Blob([jsonStr], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `anispin-support-messages-${new Date().toISOString().slice(0, 10)}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setToastMessage({ type: 'success', text: 'Contact messages exported successfully!' });
    } catch {
      setToastMessage({ type: 'error', text: 'Failed to export messages.' });
    }
  };

  // State for Changelog Editor Sub-Form
  const [editingChangelog, setEditingChangelog] = useState<Partial<ChangelogItem> | null>(null);
  const [isAddingNewChangelog, setIsAddingNewChangelog] = useState(false);
  const [changelogFormValues, setChangelogFormValues] = useState({
    version: '',
    date: '',
    title: '',
    tag: 'Feature Update' as 'Major Release' | 'Feature Update' | 'Patch Fix',
    addedText: '',
    improvedText: '',
    fixedText: ''
  });

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
        router.refresh();
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

  // GitHub Release URL validation helper
  const getUrlValidation = (url: string) => {
    if (!url) return { isValid: false, message: 'URL cannot be empty' };
    if (!url.startsWith('https://github.com/')) {
      return { isValid: false, message: 'URL must start with https://github.com/' };
    }
    if (!url.includes('/releases/download/')) {
      return { isValid: false, message: 'URL must contain /releases/download/ (GitHub Release asset link)' };
    }
    if (!url.endsWith('.apk')) {
      return { isValid: false, message: 'URL must point to a direct .apk file' };
    }
    return { isValid: true, message: 'Verified GitHub Releases Direct Download Link' };
  };

  const validation = getUrlValidation(config.primaryApkUrl);

  // Changelog Editor Actions
  const handleEditChangelog = (item: ChangelogItem) => {
    setEditingChangelog(item);
    setIsAddingNewChangelog(false);
    setChangelogFormValues({
      version: item.version,
      date: item.date,
      title: item.title,
      tag: item.tag,
      addedText: item.changes.added ? item.changes.added.join('\n') : '',
      improvedText: item.changes.improved ? item.changes.improved.join('\n') : '',
      fixedText: item.changes.fixed ? item.changes.fixed.join('\n') : ''
    });
  };

  const handleAddNewChangelogClick = () => {
    setEditingChangelog(null);
    setIsAddingNewChangelog(true);
    setChangelogFormValues({
      version: '',
      date: '',
      title: '',
      tag: 'Feature Update',
      addedText: '',
      improvedText: '',
      fixedText: ''
    });
  };

  const handleSaveChangelogItem = () => {
    const { version, date, title, tag, addedText, improvedText, fixedText } = changelogFormValues;
    if (!version || !date || !title) {
      setToastMessage({ type: 'error', text: 'Changelog Version, Date, and Title are required.' });
      return;
    }

    const changes = {
      added: addedText.split('\n').map(l => l.trim()).filter(Boolean),
      improved: improvedText.split('\n').map(l => l.trim()).filter(Boolean),
      fixed: fixedText.split('\n').map(l => l.trim()).filter(Boolean),
    };

    const currentChangelogs = config.changelog ? [...config.changelog] : [];

    if (isAddingNewChangelog) {
      const newItem: ChangelogItem = {
        id: version.replace(/\s+/g, '-').toLowerCase(),
        version,
        date,
        title,
        tag,
        changes
      };
      // Prepend to the changelog list so latest versions stay at top
      setConfig({
        ...config,
        changelog: [newItem, ...currentChangelogs]
      });
      setIsAddingNewChangelog(false);
      setToastMessage({ type: 'success', text: `Added changelog for version ${version}!` });
    } else if (editingChangelog) {
      const updatedList = currentChangelogs.map(item => {
        if (item.version === editingChangelog.version) {
          return {
            ...item,
            version,
            date,
            title,
            tag,
            changes
          };
        }
        return item;
      });
      setConfig({
        ...config,
        changelog: updatedList
      });
      setEditingChangelog(null);
      setToastMessage({ type: 'success', text: `Updated changelog for version ${version}!` });
    }
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleDeleteChangelogItem = (version: string) => {
    if (confirm(`Are you sure you want to delete the changelog entry for ${version}?`)) {
      const currentChangelogs = config.changelog ? [...config.changelog] : [];
      setConfig({
        ...config,
        changelog: currentChangelogs.filter(item => item.version !== version)
      });
      setToastMessage({ type: 'success', text: `Deleted changelog for version ${version}!` });
      setTimeout(() => setToastMessage(null), 3000);
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
              <p className="text-xs text-slate-400">Manage release links, versioning, GitHub Release assets, and website aesthetics live.</p>
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
            { id: 'downloads', label: 'APK & Release Management', icon: Download },
            { id: 'general', label: 'App & Aesthetics', icon: FileText },
            { id: 'community', label: 'Social & Community Links', icon: Telegram },
            { id: 'seo', label: 'SEO & Meta Tags', icon: Globe },
            { id: 'messages', label: 'Contact Messages', icon: Mail },
          ].map((tab) => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            const unreadCount = messages.filter(m => m.status === 'Unread').length;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id as any);
                  setEditingChangelog(null);
                  setIsAddingNewChangelog(false);
                }}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-2 whitespace-nowrap ${
                  active
                    ? 'bg-purple-600 text-white shadow-neon-purple'
                    : 'bg-surface-container/60 text-slate-400 hover:text-white border border-white/5'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
                {tab.id === 'messages' && unreadCount > 0 && (
                  <span className="px-1.5 py-0.5 rounded-full text-[9px] font-black bg-red-500 text-white animate-pulse">
                    {unreadCount}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Tab: APK & Release Management */}
        {activeTab === 'downloads' && (
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Config Forms */}
            <div className="xl:col-span-7 space-y-6">
              
              {/* GitHub Releases Exclusive Distribution Guidelines */}
              <div className="bg-void-950/80 border border-purple-500/30 p-6 rounded-3xl space-y-4">
                <h3 className="text-lg font-bold text-white font-display flex items-center space-x-2">
                  <Globe className="w-5 h-5 text-purple-400" />
                  <span>GitHub Releases Distribution Method</span>
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  AniSpin APK hosting must adhere to strict repository guidelines. Direct file uploads, VPS solutions, or external file storage services are disabled. The primary download button points directly to GitHub Release assets.
                </p>
                <div className="bg-purple-950/30 border border-purple-500/20 p-4 rounded-2xl text-xs text-slate-300 space-y-2">
                  <span className="font-bold text-white block flex items-center space-x-1.5">
                    <Info className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span>How to deploy updates:</span>
                  </span>
                  <ol className="list-decimal pl-5 space-y-1 text-slate-400 font-medium">
                    <li>Build the production release APK on your local system.</li>
                    <li>Create a new release in the <a href={config.githubUrl} target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:underline">GitHub Repository</a>.</li>
                    <li>Upload your built <code className="text-purple-300">AniSpin.apk</code> asset to the release.</li>
                    <li>Right-click the uploaded asset link and select <strong>Copy Link Address</strong>.</li>
                    <li>Paste the copied URL in the field below, update version details, and save.</li>
                  </ol>
                </div>
              </div>

              {/* APK Metadata Configuration Form */}
              <div className="bg-surface-container/80 border border-white/10 p-6 sm:p-8 rounded-3xl space-y-6">
                <h3 className="text-lg font-bold text-white font-display border-b border-white/5 pb-3">APK Metadata Settings</h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-300 uppercase">APK Version</label>
                    <input
                      type="text"
                      value={config.version}
                      onChange={(e) => setConfig({ ...config, version: e.target.value })}
                      placeholder="e.g. 2.0.0"
                      className="w-full bg-void-950 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-purple-500 font-mono"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-300 uppercase">APK Size</label>
                    <input
                      type="text"
                      value={config.apkSize}
                      onChange={(e) => setConfig({ ...config, apkSize: e.target.value })}
                      placeholder="e.g. 70 MB"
                      className="w-full bg-void-950 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-purple-500"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-300 uppercase">Release Date</label>
                    <input
                      type="text"
                      value={config.releaseDate}
                      onChange={(e) => setConfig({ ...config, releaseDate: e.target.value })}
                      placeholder="e.g. July 2026"
                      className="w-full bg-void-950 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-purple-500"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-300 uppercase">Minimum Android Requirement</label>
                    <input
                      type="text"
                      value={config.minAndroidVersion}
                      onChange={(e) => setConfig({ ...config, minAndroidVersion: e.target.value })}
                      placeholder="e.g. Android 8.0 (Oreo) or higher"
                      className="w-full bg-void-950 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-purple-500"
                    />
                  </div>
                </div>

                {/* Primary APK Download Link (GitHub Releases) */}
                <div className="space-y-2 pt-2">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-slate-300 uppercase">APK Download URL (GitHub Releases URL)</label>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${
                      validation.isValid 
                        ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' 
                        : 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                    }`}>
                      {validation.isValid ? 'GitHub Release Validated' : 'Validation Alert'}
                    </span>
                  </div>
                  <input
                    type="text"
                    value={config.primaryApkUrl}
                    onChange={(e) => setConfig({ ...config, primaryApkUrl: e.target.value })}
                    placeholder="https://github.com/kunsahil42-cpu/AniSpin-v2/releases/download/v2.0.0/AniSpin.apk"
                    className="w-full bg-void-950 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-purple-500 font-mono"
                  />
                  {!validation.isValid && (
                    <div className="text-[11px] text-amber-400 font-medium flex items-center space-x-1.5 pt-1">
                      <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                      <span>{validation.message}</span>
                    </div>
                  )}
                </div>

                {/* Release Notes Textarea */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-300 uppercase">Release Notes (Displayed on Download Page)</label>
                  <textarea
                    rows={4}
                    value={config.releaseNotes || ''}
                    onChange={(e) => setConfig({ ...config, releaseNotes: e.target.value })}
                    placeholder="Describe major updates, new capabilities, optimizations..."
                    className="w-full bg-void-950 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-purple-500"
                  />
                </div>
              </div>

              {/* App Stores Distribution Settings */}
              <div className="bg-surface-container/80 border border-white/10 p-6 sm:p-8 rounded-3xl space-y-6">
                <h3 className="text-lg font-bold text-white font-display border-b border-white/5 pb-3">App Store Links & Toggles</h3>
                
                {/* Google Play Badges Controller */}
                <div className="space-y-4">
                  <div className="bg-void-950/80 p-5 rounded-2xl border border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <span className="font-bold text-sm text-white block">Google Play Store Button Badge</span>
                      <p className="text-xs text-slate-400">Enable play button link or keep it disabled as a "Coming Soon" badge.</p>
                    </div>
                    <button
                      onClick={() => setConfig({ ...config, playStoreEnabled: !config.playStoreEnabled })}
                      className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all ${
                        config.playStoreEnabled
                          ? 'bg-emerald-600 text-white border-emerald-500 shadow-sm'
                          : 'bg-slate-800 text-slate-400 border-white/10'
                      }`}
                    >
                      {config.playStoreEnabled ? 'Badge Link Active' : 'Disabled (Coming Soon)'}
                    </button>
                  </div>

                  {config.playStoreEnabled && (
                    <div className="space-y-2 pl-4 border-l-2 border-emerald-500 animate-in slide-in-from-left duration-250">
                      <label className="text-xs font-bold text-slate-300 uppercase">Google Play Store URL</label>
                      <input
                        type="text"
                        value={config.playStoreUrl}
                        onChange={(e) => setConfig({ ...config, playStoreUrl: e.target.value })}
                        className="w-full bg-void-950 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-purple-500 font-mono"
                      />
                    </div>
                  )}
                </div>

                {/* iOS App Store Badges Controller */}
                <div className="space-y-4 pt-4 border-t border-white/5">
                  <div className="bg-void-950/80 p-5 rounded-2xl border border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <span className="font-bold text-sm text-white block">Apple App Store Button Badge</span>
                      <p className="text-xs text-slate-400">Enable Apple store link or keep it disabled as a "Coming Soon" badge.</p>
                    </div>
                    <button
                      onClick={() => setConfig({ ...config, appStoreEnabled: !config.appStoreEnabled })}
                      className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all ${
                        config.appStoreEnabled
                          ? 'bg-emerald-600 text-white border-emerald-500 shadow-sm'
                          : 'bg-slate-800 text-slate-400 border-white/10'
                      }`}
                    >
                      {config.appStoreEnabled ? 'Badge Link Active' : 'Disabled (Coming Soon)'}
                    </button>
                  </div>

                  {config.appStoreEnabled && (
                    <div className="space-y-2 pl-4 border-l-2 border-emerald-500 animate-in slide-in-from-left duration-250">
                      <label className="text-xs font-bold text-slate-300 uppercase">iOS App Store URL</label>
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

              {/* Dynamic Changelog & Timeline CRUD Manager */}
              <div className="bg-surface-container/80 border border-white/10 p-6 sm:p-8 rounded-3xl space-y-6">
                <div className="flex items-center justify-between border-b border-white/5 pb-4">
                  <h3 className="text-lg font-bold text-white font-display flex items-center space-x-2">
                    <History className="w-5 h-5 text-purple-400" />
                    <span>Manage Release Timeline (Changelog)</span>
                  </h3>
                  {!editingChangelog && !isAddingNewChangelog && (
                    <button
                      onClick={handleAddNewChangelogClick}
                      className="px-3.5 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold flex items-center space-x-1 transition-all"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add Release</span>
                    </button>
                  )}
                </div>

                {/* Sub-Form for Add/Edit Changelog */}
                {(isAddingNewChangelog || editingChangelog) && (
                  <div className="bg-void-950/80 border border-purple-500/30 p-5 rounded-2xl space-y-4 animate-in fade-in duration-200">
                    <div className="flex items-center justify-between border-b border-white/5 pb-2">
                      <span className="font-bold text-sm text-purple-300 flex items-center space-x-1.5">
                        <Edit className="w-4 h-4" />
                        <span>{isAddingNewChangelog ? 'Add New Release Entry' : `Edit Release ${editingChangelog?.version}`}</span>
                      </span>
                      <button
                        onClick={() => {
                          setEditingChangelog(null);
                          setIsAddingNewChangelog(false);
                        }}
                        className="p-1 rounded-lg hover:bg-white/5 text-slate-400 hover:text-white"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-slate-400 uppercase">Version Tag</label>
                        <input
                          type="text"
                          value={changelogFormValues.version}
                          onChange={(e) => setChangelogFormValues({ ...changelogFormValues, version: e.target.value })}
                          placeholder="e.g. v2.1.0"
                          className="w-full bg-void-900 border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500 font-mono"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-slate-400 uppercase">Release Date</label>
                        <input
                          type="text"
                          value={changelogFormValues.date}
                          onChange={(e) => setChangelogFormValues({ ...changelogFormValues, date: e.target.value })}
                          placeholder="e.g. August 2026"
                          className="w-full bg-void-900 border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-slate-400 uppercase">Release Tag type</label>
                        <select
                          value={changelogFormValues.tag}
                          onChange={(e) => setChangelogFormValues({ ...changelogFormValues, tag: e.target.value as any })}
                          className="w-full bg-void-900 border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
                        >
                          <option value="Major Release">Major Release</option>
                          <option value="Feature Update">Feature Update</option>
                          <option value="Patch Fix">Patch Fix</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-400 uppercase">Overview Title</label>
                      <input
                        type="text"
                        value={changelogFormValues.title}
                        onChange={(e) => setChangelogFormValues({ ...changelogFormValues, title: e.target.value })}
                        placeholder="e.g. Gacha Recommendation Update"
                        className="w-full bg-void-900 border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
                      />
                    </div>

                    <div className="grid grid-cols-1 gap-3">
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-emerald-400 uppercase block">Added Features (One Per Line)</label>
                        <textarea
                          rows={3}
                          value={changelogFormValues.addedText}
                          onChange={(e) => setChangelogFormValues({ ...changelogFormValues, addedText: e.target.value })}
                          placeholder="Added episode predictive schedulers&#10;Added manga bookmarks sync"
                          className="w-full bg-void-900 border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-cyan-400 uppercase block">Improvements (One Per Line)</label>
                        <textarea
                          rows={3}
                          value={changelogFormValues.improvedText}
                          onChange={(e) => setChangelogFormValues({ ...changelogFormValues, improvedText: e.target.value })}
                          placeholder="Optimized 1080p stream cache&#10;Upgraded fluid animations"
                          className="w-full bg-void-900 border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-purple-400 uppercase block">Bug Fixes (One Per Line)</label>
                        <textarea
                          rows={3}
                          value={changelogFormValues.fixedText}
                          onChange={(e) => setChangelogFormValues({ ...changelogFormValues, fixedText: e.target.value })}
                          placeholder="Fixed minimize video frame freeze&#10;Resolved download path errors"
                          className="w-full bg-void-900 border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
                        />
                      </div>
                    </div>

                    <div className="flex items-center space-x-2 pt-2">
                      <button
                        onClick={handleSaveChangelogItem}
                        className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold flex items-center space-x-1.5"
                      >
                        <Check className="w-3.5 h-3.5" />
                        <span>Apply Entry</span>
                      </button>
                      <button
                        onClick={() => {
                          setEditingChangelog(null);
                          setIsAddingNewChangelog(false);
                        }}
                        className="px-4 py-2 rounded-xl bg-void-900 border border-white/10 text-slate-400 text-xs font-medium hover:text-white"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}

                {/* Changelog Timeline List representation */}
                <div className="space-y-4 max-h-[450px] overflow-y-auto pr-1 no-scrollbar">
                  {config.changelog && config.changelog.length > 0 ? (
                    config.changelog.map((item) => (
                      <div
                        key={item.version}
                        className="bg-void-950/60 border border-white/5 hover:border-purple-500/20 p-4 rounded-2xl flex items-start justify-between gap-4 transition-all"
                      >
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2 flex-wrap gap-1">
                            <span className="font-mono text-sm font-bold text-white">{item.version}</span>
                            <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-purple-950 text-purple-300 border border-purple-500/20">
                              {item.tag}
                            </span>
                            <span className="text-[10px] text-slate-400 font-mono">{item.date}</span>
                          </div>
                          <span className="font-bold text-xs text-slate-300 block">{item.title}</span>
                          
                          <div className="flex space-x-4 text-[10px] text-slate-400">
                            {item.changes.added && item.changes.added.length > 0 && (
                              <span>+{item.changes.added.length} Added</span>
                            )}
                            {item.changes.improved && item.changes.improved.length > 0 && (
                              <span>*{item.changes.improved.length} Improved</span>
                            )}
                            {item.changes.fixed && item.changes.fixed.length > 0 && (
                              <span>x{item.changes.fixed.length} Fixed</span>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center space-x-1.5 shrink-0">
                          <button
                            onClick={() => handleEditChangelog(item)}
                            className="p-2 rounded-lg bg-surface-container/60 hover:bg-cyan-500/10 text-slate-400 hover:text-cyan-300 border border-white/5 transition-colors"
                            title="Edit Release Entry"
                          >
                            <Edit className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDeleteChangelogItem(item.version)}
                            className="p-2 rounded-lg bg-surface-container/60 hover:bg-red-500/10 text-slate-400 hover:text-red-300 border border-white/5 transition-colors"
                            title="Delete Release Entry"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-6 text-xs text-slate-500">
                      No release changelog items stored. Click 'Add Release' to start your updates feed.
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Right Column: Live Website Mockup Preview */}
            <div className="xl:col-span-5 bg-void-900 border border-purple-500/20 rounded-3xl p-6 shadow-2xl space-y-6 xl:sticky xl:top-28">
              
              <div className="flex items-center justify-between border-b border-white/5 pb-3">
                <h3 className="text-sm font-bold text-purple-400 flex items-center space-x-2">
                  <Eye className="w-4 h-4" />
                  <span>Real-Time Website Preview</span>
                </h3>
                <span className="text-[9px] bg-purple-500/20 text-purple-300 border border-purple-500/40 px-2 py-0.5 rounded-full font-bold">Unsaved Draft</span>
              </div>

              {/* 1. Hero Section CTA area mockup */}
              <div className="space-y-3 bg-void-950 p-5 rounded-2xl border border-white/5">
                <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block">Hero Section Elements</span>
                
                {/* Release Version Badge */}
                <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-purple-900/30 border border-purple-500/40 text-purple-300 text-[10px] font-semibold">
                  <span className="h-1.5 w-1.5 rounded-full bg-purple-400" />
                  <span>{config.heroBadgeText}</span>
                </div>

                {/* Hero CTA main button */}
                <div className="px-5 py-3.5 rounded-xl bg-gradient-to-r from-purple-600 via-purple-700 to-cyan-500 text-white font-bold text-xs flex items-center justify-center space-x-2 shadow-neon-purple max-w-sm">
                  <Download className="w-3.5 h-3.5" />
                  <span>Download APK ({config.apkSize || '70 MB'})</span>
                </div>

                {/* Hero store button controls */}
                <div className="flex items-center space-x-2 pt-1.5 text-[9px]">
                  {config.playStoreEnabled ? (
                    <div className="flex items-center space-x-1.5 px-2.5 py-1.5 rounded-lg bg-void-900 border border-purple-500/30 text-purple-300">
                      <Play className="w-3 h-3 text-purple-400" />
                      <span>Get on Play Store</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-1.5 px-2.5 py-1.5 rounded-lg bg-void-900 border border-white/5 text-slate-500 opacity-60">
                      <Play className="w-3 h-3 text-slate-550" />
                      <span>Coming Soon</span>
                    </div>
                  )}

                  {config.appStoreEnabled ? (
                    <div className="flex items-center space-x-1.5 px-2.5 py-1.5 rounded-lg bg-void-900 border border-purple-500/30 text-purple-300">
                      <Apple className="w-3 h-3 text-purple-400" />
                      <span>Download on iOS</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-1.5 px-2.5 py-1.5 rounded-lg bg-void-900 border border-white/5 text-slate-500 opacity-60">
                      <Apple className="w-3 h-3 text-slate-550" />
                      <span>Coming Soon</span>
                    </div>
                  )}
                </div>
              </div>

              {/* 2. Download page section mockup */}
              <div className="space-y-4 bg-void-950 p-5 rounded-2xl border border-white/5">
                <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block">Download Section Card Mockup</span>
                
                {/* Mock Card */}
                <div className="bg-surface-container/60 border border-purple-500/20 rounded-2xl p-4.5 space-y-4 relative overflow-hidden">
                  <div className="absolute top-0 right-0 px-3 py-1 bg-gradient-to-l from-purple-600 to-cyan-500 text-white font-extrabold text-[9px] rounded-bl-xl uppercase tracking-wider">
                    {config.version || '2.0.0'} Stable
                  </div>

                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-cyan-500 p-0.5">
                      <div className="w-full h-full bg-void-950 rounded-[9px] flex items-center justify-center font-bold text-purple-400 text-sm">
                        A
                      </div>
                    </div>
                    <div>
                      <h4 className="font-bold text-xs text-white">{config.appName} Official Package</h4>
                      <p className="text-[9px] text-purple-300">Released {config.releaseDate} • {config.apkSize}</p>
                    </div>
                  </div>

                  {/* Requirements details */}
                  <div className="grid grid-cols-3 gap-2 text-[9px]">
                    <div className="bg-void-950/80 p-2 rounded-lg border border-white/5 text-center">
                      <span className="text-slate-500 block uppercase font-bold text-[7.5px]">Version</span>
                      <span className="font-bold text-white">{config.version}</span>
                    </div>
                    <div className="bg-void-950/80 p-2 rounded-lg border border-white/5 text-center">
                      <span className="text-slate-500 block uppercase font-bold text-[7.5px]">File Size</span>
                      <span className="font-bold text-white">{config.apkSize}</span>
                    </div>
                    <div className="bg-void-950/80 p-2 rounded-lg border border-white/5 text-center">
                      <span className="text-slate-500 block uppercase font-bold text-[7.5px]">Min OS</span>
                      <span className="font-bold text-slate-200 block truncate">{config.minAndroidVersion?.split('(')[0] || 'Android'}</span>
                    </div>
                  </div>

                  {/* Mock Release Notes */}
                  {config.releaseNotes && (
                    <div className="bg-void-950/40 p-3.5 rounded-xl border border-white/5 space-y-1">
                      <span className="text-[8px] text-purple-400 uppercase font-bold block">What's New in this Version</span>
                      <div className="text-[10.5px] text-slate-300 leading-relaxed whitespace-pre-line max-h-[100px] overflow-y-auto no-scrollbar">
                        {config.releaseNotes}
                      </div>
                    </div>
                  )}

                  {/* Play store links preview */}
                  <div className="space-y-2 pt-1.5">
                    <div className="w-full py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-bold text-xs flex items-center justify-center space-x-2">
                      <Download className="w-3.5 h-3.5" />
                      <span>Download AniSpin v{config.version} APK</span>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      {config.playStoreEnabled ? (
                        <div className="bg-void-950/80 p-2 rounded-xl border border-emerald-500/30 flex items-center space-x-2">
                          <Play className="w-3.5 h-3.5 text-emerald-400" />
                          <div className="text-left text-[8px]">
                            <div className="text-slate-400 font-bold uppercase text-[7px]">Google Play</div>
                            <div className="font-semibold text-white">Active Link</div>
                          </div>
                        </div>
                      ) : (
                        <div className="bg-void-950/80 p-2 rounded-xl border border-white/5 flex items-center space-x-2 opacity-50">
                          <Play className="w-3.5 h-3.5 text-slate-500" />
                          <div className="text-left text-[8px]">
                            <div className="text-slate-500 font-bold uppercase text-[7px]">Google Play</div>
                            <div className="font-semibold text-slate-400">Coming Soon</div>
                          </div>
                        </div>
                      )}

                      {config.appStoreEnabled ? (
                        <div className="bg-void-950/80 p-2 rounded-xl border border-emerald-500/30 flex items-center space-x-2">
                          <Apple className="w-3.5 h-3.5 text-emerald-400" />
                          <div className="text-left text-[8px]">
                            <div className="text-slate-400 font-bold uppercase text-[7px]">App Store</div>
                            <div className="font-semibold text-white">Active Link</div>
                          </div>
                        </div>
                      ) : (
                        <div className="bg-void-950/80 p-2 rounded-xl border border-white/5 flex items-center space-x-2 opacity-50">
                          <Apple className="w-3.5 h-3.5 text-slate-500" />
                          <div className="text-left text-[8px]">
                            <div className="text-slate-500 font-bold uppercase text-[7px]">App Store</div>
                            <div className="font-semibold text-slate-400">Coming Soon</div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab: App & Aesthetics */}
        {activeTab === 'general' && (
          <div className="bg-surface-container/80 border border-white/10 p-6 sm:p-8 rounded-3xl space-y-6">
            <h3 className="text-lg font-bold text-white font-display border-b border-white/5 pb-3">App Branding & Customizations</h3>
            
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
                <label className="text-xs font-bold text-slate-300 uppercase">Hero badge tag text</label>
                <input
                  type="text"
                  value={config.heroBadgeText}
                  onChange={(e) => setConfig({ ...config, heroBadgeText: e.target.value })}
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

            {/* Aesthetics Customizer */}
            <div className="space-y-4 pt-6 border-t border-white/5">
              <h4 className="text-base font-bold text-white font-display">Aesthetic Settings</h4>
              
              <div className="bg-void-950/80 p-5 rounded-2xl border border-white/5 flex items-center justify-between">
                <div className="space-y-1">
                  <span className="font-bold text-sm text-white block">RGB Ambient Aura Animation</span>
                  <p className="text-xs text-slate-400">Enable or disable dynamic neon glowing backdrop lights in sections.</p>
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
                  {config.themeSettings.rgbGlowEnabled ? 'Aura Glow active' : 'Glow Disabled'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Tab: Social & Community Links */}
        {activeTab === 'community' && (
          <div className="bg-surface-container/80 border border-white/10 p-6 sm:p-8 rounded-3xl space-y-6">
            <h3 className="text-lg font-bold text-white font-display border-b border-white/5 pb-3">Social & Community Invite URLs</h3>
            
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-300 uppercase flex items-center space-x-2">
                  <Telegram className="w-4 h-4 text-purple-400" />
                  <span>Telegram Channel URL</span>
                </label>
                <input
                  type="text"
                  value={config.telegramUrl || ''}
                  onChange={(e) => setConfig({ ...config, telegramUrl: e.target.value })}
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

        {/* Tab: SEO Settings */}
        {activeTab === 'seo' && (
          <div className="bg-surface-container/80 border border-white/10 p-6 sm:p-8 rounded-3xl space-y-6">
            <h3 className="text-lg font-bold text-white font-display border-b border-white/5 pb-3">SEO & Metadata Configuration</h3>
            
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

        {/* Tab: Contact Messages Management */}
        {activeTab === 'messages' && (
          <div className="bg-surface-container/85 border border-white/10 p-6 sm:p-8 rounded-3xl space-y-6 animate-in fade-in duration-200">
            
            {/* Header with Search and Export */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/5 pb-5">
              <div>
                <h3 className="text-lg font-bold text-white font-display flex items-center space-x-2">
                  <Mail className="w-5 h-5 text-purple-400" />
                  <span>Support Portal Influx ({messages.length} total)</span>
                </h3>
                <p className="text-xs text-slate-400">Inspect, organize, and reply to client dispatches live.</p>
              </div>
              <button
                onClick={handleExportMessages}
                className="px-4 py-2 rounded-xl bg-void-900 border border-white/10 hover:border-purple-500/40 text-slate-300 hover:text-purple-300 text-xs font-bold transition-all flex items-center space-x-2 w-fit"
              >
                <FileJson className="w-4 h-4" />
                <span>Export to JSON Backup</span>
              </button>
            </div>

            {/* Filters and Search Bar Container */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
              
              {/* Search Bar */}
              <div className="md:col-span-6 relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500">
                  <Search className="w-4 h-4" />
                </span>
                <input
                  type="text"
                  value={messageSearch}
                  onChange={(e) => setMessageSearch(e.target.value)}
                  placeholder="Search sender name, email, or message keyword..."
                  className="w-full bg-void-950 border border-white/10 focus:border-purple-500 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white focus:outline-none transition-all placeholder:text-slate-650"
                />
              </div>

              {/* Status Filter buttons */}
              <div className="md:col-span-6 flex flex-wrap gap-2 justify-start md:justify-end">
                {(['All', 'Unread', 'Read', 'Replied', 'Archived'] as const).map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setMessageFilter(filter)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all ${
                      messageFilter === filter
                        ? 'bg-purple-600 border-purple-500 text-white shadow-neon-purple/20'
                        : 'bg-void-950/80 border-white/5 text-slate-400 hover:text-white'
                    }`}
                  >
                    <span>{filter}</span>
                  </button>
                ))}
              </div>

            </div>

            {/* Messages Grid/List view */}
            <div className="space-y-4">
              {messagesLoading ? (
                <div className="flex flex-col items-center justify-center py-20 space-y-3">
                  <RefreshCw className="w-8 h-8 text-purple-400 animate-spin" />
                  <span className="text-xs text-slate-500">Loading messages from server...</span>
                </div>
              ) : (
                (() => {
                  // Filtered and Sorted messages
                  const filtered = messages
                    .filter((msg) => {
                      // Status filter
                      if (messageFilter !== 'All' && msg.status !== messageFilter) return false;
                      
                      // Search filter
                      const query = messageSearch.toLowerCase();
                      if (query) {
                        return (
                          msg.name.toLowerCase().includes(query) ||
                          msg.email.toLowerCase().includes(query) ||
                          msg.message.toLowerCase().includes(query)
                        );
                      }
                      return true;
                    })
                    .sort((a, b) => {
                      // Pin sorting: pinned items always float to the top
                      if (a.pinned && !b.pinned) return -1;
                      if (!a.pinned && b.pinned) return 1;
                      
                      // Secondary sorting: newer dates first
                      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
                    });

                  if (filtered.length === 0) {
                    return (
                      <div className="text-center py-16 bg-void-950/40 border border-dashed border-white/5 rounded-2xl text-xs text-slate-500">
                        No contact dispatches found matching criteria.
                      </div>
                    );
                  }

                  return filtered.map((msg) => {
                    const isUnread = msg.status === 'Unread';
                    return (
                      <div
                        key={msg.id}
                        className={`group relative bg-void-950/60 hover:bg-void-950 border rounded-2xl p-5 sm:p-6 transition-all duration-300 flex flex-col md:flex-row justify-between items-start gap-6 border-l-4 ${
                          msg.pinned
                            ? 'border-cyan-500/50'
                            : isUnread
                            ? 'border-purple-500'
                            : 'border-white/5'
                        }`}
                      >
                        {/* Message details */}
                        <div className="space-y-3 flex-1">
                          
                          {/* Sender details and Pin indicator */}
                          <div className="flex items-center space-x-2 flex-wrap gap-1.5">
                            {msg.pinned && (
                              <span className="px-2 py-0.5 rounded bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-[9px] font-black uppercase flex items-center space-x-1 animate-pulse">
                                <Pin className="w-2.5 h-2.5 fill-cyan-400 shrink-0" />
                                <span>Pinned</span>
                              </span>
                            )}
                            {isUnread && (
                              <span className="h-2 w-2 rounded-full bg-purple-500 animate-ping inline-block" />
                            )}
                            <span className={`px-2 py-0.5 rounded text-[9px] font-black uppercase border ${
                              isUnread 
                                ? 'bg-purple-500/10 text-purple-400 border-purple-500/30' 
                                : msg.status === 'Replied'
                                ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                                : msg.status === 'Archived'
                                ? 'bg-slate-800 text-slate-400 border-white/10'
                                : 'bg-blue-500/10 text-blue-400 border-blue-500/30'
                            }`}>
                              {msg.status}
                            </span>
                            <span className="text-xs font-black text-white font-display">{msg.name}</span>
                            <span className="text-slate-500 text-xs font-mono">&lt;{msg.email}&gt;</span>
                          </div>

                          {/* Message Body */}
                          <p className="text-xs sm:text-sm text-slate-350 leading-relaxed whitespace-pre-wrap break-words">
                            {msg.message}
                          </p>

                          {/* Timestamp and Metadata */}
                          <div className="flex items-center space-x-4 text-[10px] text-slate-500 border-t border-white/5 pt-2.5 flex-wrap gap-2">
                            <span>Logged: {new Date(msg.createdAt).toLocaleString()}</span>
                            {msg.ipAddress && (
                              <span>IP Address: <span className="font-mono text-slate-400">{msg.ipAddress}</span></span>
                            )}
                            {msg.userAgent && (
                              <span className="truncate max-w-[200px]" title={msg.userAgent}>Device: {msg.userAgent}</span>
                            )}
                          </div>

                        </div>

                        {/* Action buttons */}
                        <div className="flex items-center space-x-1.5 md:self-center shrink-0 w-full md:w-auto justify-end border-t border-white/5 md:border-t-0 pt-3 md:pt-0">
                          
                          {/* Toggle status: Read/Unread */}
                          {isUnread ? (
                            <button
                              onClick={() => handleUpdateMessageStatus(msg.id, 'Read')}
                              className="px-2.5 py-1.5 rounded-lg bg-surface-container/60 hover:bg-purple-650/20 text-slate-400 hover:text-purple-300 border border-white/5 text-[10px] font-bold transition-all"
                            >
                              Mark Read
                            </button>
                          ) : (
                            <button
                              onClick={() => handleUpdateMessageStatus(msg.id, 'Unread')}
                              className="px-2.5 py-1.5 rounded-lg bg-surface-container/60 hover:bg-purple-650/10 text-slate-450 hover:text-purple-400 border border-white/5 text-[10px] font-bold transition-all"
                            >
                              Mark Unread
                            </button>
                          )}

                          {/* Mark Replied */}
                          {msg.status !== 'Replied' && (
                            <button
                              onClick={() => handleUpdateMessageStatus(msg.id, 'Replied')}
                              className="px-2.5 py-1.5 rounded-lg bg-surface-container/60 hover:bg-emerald-600/20 text-slate-400 hover:text-emerald-300 border border-white/5 text-[10px] font-bold transition-all"
                            >
                              Mark Replied
                            </button>
                          )}

                          {/* Archive message */}
                          {msg.status !== 'Archived' ? (
                            <button
                              onClick={() => handleUpdateMessageStatus(msg.id, 'Archived')}
                              className="px-2.5 py-1.5 rounded-lg bg-surface-container/60 hover:bg-slate-800 text-slate-450 hover:text-slate-300 border border-white/5 text-[10px] font-bold transition-all"
                            >
                              Archive
                            </button>
                          ) : (
                            <button
                              onClick={() => handleUpdateMessageStatus(msg.id, 'Read')}
                              className="px-2.5 py-1.5 rounded-lg bg-surface-container/60 hover:bg-slate-800 text-slate-450 hover:text-slate-350 border border-white/5 text-[10px] font-bold transition-all"
                            >
                              Unarchive
                            </button>
                          )}

                          {/* Pin Toggle */}
                          <button
                            onClick={() => handleToggleMessagePin(msg.id, !msg.pinned)}
                            className={`p-2 rounded-lg border border-white/5 transition-all ${
                              msg.pinned
                                ? 'bg-cyan-500/10 text-cyan-400 hover:bg-cyan-500/20'
                                : 'bg-surface-container/60 text-slate-455 hover:text-cyan-300'
                            }`}
                            title={msg.pinned ? 'Unpin message' : 'Pin message'}
                          >
                            {msg.pinned ? (
                              <PinOff className="w-3.5 h-3.5" />
                            ) : (
                              <Pin className="w-3.5 h-3.5" />
                            )}
                          </button>

                          {/* Copy email */}
                          <button
                            onClick={() => {
                              navigator.clipboard.writeText(msg.email);
                              setToastMessage({ type: 'success', text: `Copied <${msg.email}> to clipboard!` });
                              setTimeout(() => setToastMessage(null), 3000);
                            }}
                            className="p-2 rounded-lg bg-surface-container/60 hover:bg-purple-600/10 text-slate-455 hover:text-purple-300 border border-white/5 transition-all"
                            title="Copy email to clipboard"
                          >
                            <Copy className="w-3.5 h-3.5" />
                          </button>

                          {/* Delete message */}
                          <button
                            onClick={() => handleDeleteMessage(msg.id)}
                            className="p-2 rounded-lg bg-surface-container/60 hover:bg-red-500/15 text-slate-455 hover:text-red-400 border border-white/5 transition-all"
                            title="Delete permanently"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>

                        </div>

                      </div>
                    );
                  });
                })()
              )}
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
