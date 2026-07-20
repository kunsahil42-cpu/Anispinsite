'use client';

import React from 'react';
import {
  Search, Dices, BookOpen, Star, Heart, Compass, Bookmark, Settings as SettingsIcon,
  Home as HomeIcon, Play, ChevronLeft, Share2, Bell, X, Film, Volume2, Sparkles, Filter, RefreshCw
} from 'lucide-react';
import { AppScreenshot } from '@/types';

interface PhoneMockupProps {
  screenshot: AppScreenshot;
  activeScreen?: string;
  onSelectScreen?: (screenType: any) => void;
}

export const PhoneMockup: React.FC<PhoneMockupProps> = ({ screenshot }) => {
  const { screenType } = screenshot;

  return (
    <div className="relative mx-auto w-[290px] sm:w-[320px] h-[580px] sm:h-[630px] bg-void-950 rounded-[44px] p-3 shadow-2xl border-4 border-slate-800 shadow-neon-purple/30 group transition-all duration-500 hover:scale-[1.02]">
      {/* Outer Glow Ring */}
      <div className="absolute -inset-1 rounded-[48px] bg-gradient-to-r from-purple-600/30 via-cyan-500/30 to-pink-500/30 blur-md opacity-70 group-hover:opacity-100 transition-opacity -z-10 animate-rgb-glow" />

      {/* Screen Frame Container */}
      <div className="relative w-full h-full bg-[#111017] rounded-[36px] overflow-hidden flex flex-col justify-between select-none text-white border border-white/10 font-sans">
        
        {/* Top Status Bar */}
        <div className="w-full px-6 pt-3 pb-1 flex items-center justify-between text-[11px] text-slate-300 font-medium z-30 bg-gradient-to-b from-black/60 to-transparent">
          <span>9:41</span>
          {/* Camera Notch */}
          <div className="w-20 h-4 bg-black rounded-full flex items-center justify-center space-x-1.5 px-2">
            <div className="w-2 h-2 rounded-full bg-purple-900/60" />
            <div className="w-1.5 h-1.5 rounded-full bg-slate-800" />
          </div>
          <div className="flex items-center space-x-1">
            <span className="text-[10px]">5G</span>
            <div className="w-4 h-2 rounded-sm border border-slate-300 p-0.5 flex items-center">
              <div className="w-full h-full bg-emerald-400 rounded-2xs" />
            </div>
          </div>
        </div>

        {/* Dynamic Screen Content */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden relative text-xs flex flex-col no-scrollbar">
          
          {/* HOME SCREEN */}
          {screenType === 'home' && (
            <div className="p-3.5 space-y-3">
              {/* Header */}
              <div className="bg-gradient-to-b from-purple-900/40 to-surface-container/60 p-3.5 rounded-2xl border border-purple-500/20 shadow-md">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[11px] text-slate-300">👋 Welcome to</span>
                  <div className="bg-surface-high/80 px-2 py-0.5 rounded-full flex items-center space-x-1 border border-white/10">
                    <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
                    <span className="text-[10px] font-semibold text-purple-300">Anime</span>
                    <span className="text-[10px] text-slate-400">Manga</span>
                  </div>
                </div>
                <h3 className="text-lg font-black text-white leading-none font-display">AniVerse</h3>
                <h3 className="text-lg font-black text-purple-400 leading-tight font-display mb-1">Anime</h3>
                <p className="text-[10px] text-slate-300">Discover your next favorite anime.</p>
              </div>

              {/* Search Bar */}
              <div className="bg-surface-container px-3 py-2 rounded-xl border border-white/5 flex items-center space-x-2 text-slate-400">
                <Search className="w-3.5 h-3.5" />
                <span className="text-[11px]">Search Anime or Manga...</span>
              </div>

              {/* Quick Roll Cards */}
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-surface-container p-2.5 rounded-xl border border-purple-500/20 text-center hover:bg-purple-900/20 transition-colors">
                  <div className="w-7 h-7 mx-auto bg-purple-600/30 text-purple-400 rounded-lg flex items-center justify-center mb-1">
                    <Dices className="w-4 h-4" />
                  </div>
                  <span className="font-bold text-[11px] block">Anime Roll</span>
                  <span className="text-[9px] text-slate-400">Random Anime</span>
                </div>
                <div className="bg-surface-container p-2.5 rounded-xl border border-cyan-500/20 text-center hover:bg-cyan-900/20 transition-colors">
                  <div className="w-7 h-7 mx-auto bg-cyan-600/30 text-cyan-400 rounded-lg flex items-center justify-center mb-1">
                    <BookOpen className="w-4 h-4" />
                  </div>
                  <span className="font-bold text-[11px] block">Manga Roll</span>
                  <span className="text-[9px] text-slate-400">Random Manga</span>
                </div>
              </div>

              {/* Section: Continue Watching */}
              <div>
                <h4 className="font-bold text-[11px] text-white mb-2 flex items-center space-x-1">
                  <span>⭐ Continue Watching</span>
                </h4>
                <div className="bg-surface-container p-2 rounded-xl border border-white/5 flex items-center space-x-2">
                  <div className="w-12 h-10 bg-slate-800 rounded-lg flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-indigo-900 opacity-60" />
                    <Play className="w-4 h-4 text-white z-10 fill-white" />
                  </div>
                  <div className="flex-1">
                    <span className="font-semibold text-[11px] text-white block">One Piece</span>
                    <span className="text-[9px] text-purple-300">Ep 1115 • 18:42 left</span>
                  </div>
                </div>
              </div>

              {/* Section: Trending Now */}
              <div>
                <h4 className="font-bold text-[11px] text-white mb-2 flex items-center space-x-1">
                  <span>🔥 Trending Now</span>
                </h4>
                <div className="grid grid-cols-2 gap-2">
                  <div className="relative rounded-xl overflow-hidden bg-slate-900 h-24 border border-white/10 group/card">
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent z-10" />
                    <div className="absolute top-1 left-1 z-20 bg-black/60 backdrop-blur-sm px-1.5 py-0.5 rounded-full flex items-center space-x-0.5 text-[9px] text-amber-400 font-bold">
                      <Star className="w-2.5 h-2.5 fill-amber-400" />
                      <span>70</span>
                    </div>
                    <div className="absolute bottom-1 left-1.5 z-20">
                      <span className="font-bold text-[10px] text-white block truncate">Jujutsu Kaisen</span>
                      <span className="text-[8px] text-slate-300">Action, Fantasy</span>
                    </div>
                  </div>
                  <div className="relative rounded-xl overflow-hidden bg-slate-900 h-24 border border-white/10 group/card">
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent z-10" />
                    <div className="absolute top-1 left-1 z-20 bg-black/60 backdrop-blur-sm px-1.5 py-0.5 rounded-full flex items-center space-x-0.5 text-[9px] text-amber-400 font-bold">
                      <Star className="w-2.5 h-2.5 fill-amber-400" />
                      <span>69</span>
                    </div>
                    <div className="absolute bottom-1 left-1.5 z-20">
                      <span className="font-bold text-[10px] text-white block truncate">Dragon Ball</span>
                      <span className="text-[8px] text-slate-300">Action, Sci-Fi</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* SEARCH SCREEN */}
          {screenType === 'search' && (
            <div className="p-3.5 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <ChevronLeft className="w-4 h-4 text-slate-300" />
                <span className="font-bold text-sm text-white">Search Anime</span>
                <div className="w-4" />
              </div>

              {/* Mode Pill Toggle */}
              <div className="bg-surface-container p-1 rounded-full flex items-center border border-white/10">
                <button className="flex-1 py-1 rounded-full bg-purple-600 text-white font-semibold text-[10px] text-center shadow-sm">
                  ✓ Anime
                </button>
                <button className="flex-1 py-1 rounded-full text-slate-400 text-[10px] text-center">
                  📖 Manga
                </button>
              </div>

              {/* Input */}
              <div className="bg-surface-container px-3 py-2 rounded-xl border border-purple-500/30 flex items-center space-x-2 text-white">
                <Search className="w-4 h-4 text-purple-400" />
                <span className="text-xs text-slate-300">Search anime...</span>
              </div>

              {/* Empty State */}
              <div className="pt-20 text-center space-y-2">
                <div className="w-12 h-12 mx-auto rounded-full bg-surface-container flex items-center justify-center text-slate-500">
                  <Search className="w-6 h-6" />
                </div>
                <p className="text-slate-400 text-xs">Start typing to search anime</p>
              </div>
            </div>
          )}

          {/* ANIME DETAILS SCREEN */}
          {screenType === 'anime_details' && (
            <div className="relative flex-1 flex flex-col">
              {/* Backdrop Artwork */}
              <div className="relative h-44 bg-gradient-to-b from-purple-900 via-indigo-950 to-void-950 p-3 flex flex-col justify-between">
                <div className="flex items-center justify-between z-10">
                  <div className="w-7 h-7 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white">
                    <ChevronLeft className="w-4 h-4" />
                  </div>
                  <div className="w-7 h-7 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white">
                    <Share2 className="w-4 h-4" />
                  </div>
                </div>

                {/* Poster Artwork */}
                <div className="w-24 h-32 mx-auto rounded-xl bg-purple-900/80 border-2 border-white/20 shadow-2xl flex flex-col items-center justify-center text-center p-2 z-20 relative transform translate-y-6">
                  <Film className="w-8 h-8 text-purple-300 mb-1" />
                  <span className="font-extrabold text-[10px] text-white">ONE PIECE</span>
                </div>
              </div>

              {/* Details Content */}
              <div className="pt-8 px-4 space-y-3 text-center">
                <h3 className="text-base font-black text-white tracking-wide">ONE PIECE</h3>
                <p className="text-[10px] text-slate-400 uppercase tracking-widest font-semibold">ONE PIECE</p>

                {/* Badges */}
                <div className="flex items-center justify-center space-x-2 pt-1">
                  <div className="bg-amber-500/20 text-amber-300 border border-amber-500/40 px-2 py-0.5 rounded-lg flex items-center space-x-1 text-[10px] font-bold">
                    <Star className="w-3 h-3 fill-amber-400" />
                    <span>87</span>
                  </div>
                  <div className="bg-blue-500/20 text-blue-300 border border-blue-500/40 px-2 py-0.5 rounded-lg text-[10px] font-semibold flex items-center space-x-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
                    <span>RELEASED</span>
                  </div>
                  <div className="bg-purple-500/20 text-purple-300 border border-purple-500/40 px-2 py-0.5 rounded-lg text-[10px] font-semibold flex items-center space-x-1">
                    <Heart className="w-3 h-3" />
                    <span>Favorite</span>
                  </div>
                </div>

                {/* Genres */}
                <div className="flex flex-wrap gap-1.5 justify-center pt-2">
                  {['Action', 'Adventure', 'Comedy', 'Drama', 'Fantasy'].map((g) => (
                    <span key={g} className="px-2 py-0.5 rounded-full bg-surface-container text-slate-300 border border-white/10 text-[9px]">
                      {g}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* MANGA DETAILS SCREEN */}
          {screenType === 'manga_details' && (
            <div className="relative flex-1 flex flex-col">
              <div className="relative h-44 bg-gradient-to-b from-cyan-900 via-teal-950 to-void-950 p-3 flex flex-col justify-between">
                <div className="flex items-center justify-between z-10">
                  <div className="w-7 h-7 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white">
                    <ChevronLeft className="w-4 h-4" />
                  </div>
                  <div className="w-7 h-7 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white">
                    <Share2 className="w-4 h-4" />
                  </div>
                </div>

                <div className="w-24 h-32 mx-auto rounded-xl bg-cyan-900/80 border-2 border-white/20 shadow-2xl flex flex-col items-center justify-center text-center p-2 z-20 relative transform translate-y-6">
                  <BookOpen className="w-8 h-8 text-cyan-300 mb-1" />
                  <span className="font-extrabold text-[9px] text-white">SPY×FAMILY</span>
                </div>
              </div>

              <div className="pt-8 px-4 space-y-3 text-center">
                <h3 className="text-base font-black text-white tracking-wide">SPY×FAMILY</h3>
                <p className="text-[10px] text-slate-400 uppercase tracking-widest font-semibold">SPY x FAMILY</p>

                <div className="flex items-center justify-center space-x-2 pt-1">
                  <div className="bg-amber-500/20 text-amber-300 border border-amber-500/40 px-2 py-0.5 rounded-lg flex items-center space-x-1 text-[10px] font-bold">
                    <Star className="w-3 h-3 fill-amber-400" />
                    <span>83</span>
                  </div>
                  <div className="bg-blue-500/20 text-blue-300 border border-blue-500/40 px-2 py-0.5 rounded-lg text-[10px] font-semibold flex items-center space-x-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                    <span>RELEASED</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1.5 justify-center pt-2">
                  {['Action', 'Comedy', 'Slice of Life', 'Supernatural'].map((g) => (
                    <span key={g} className="px-2 py-0.5 rounded-full bg-surface-container text-slate-300 border border-white/10 text-[9px]">
                      {g}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* MANGA READER SCREEN */}
          {screenType === 'manga_reader' && (
            <div className="flex-1 flex flex-col bg-white text-black">
              {/* Header bar */}
              <div className="bg-black text-white p-2.5 flex items-center justify-between border-b border-slate-800">
                <ChevronLeft className="w-4 h-4" />
                <div className="text-center">
                  <span className="font-black text-[11px] block leading-none">SPY×FAMILY</span>
                  <span className="text-[9px] text-slate-400">Chapter 138/50</span>
                </div>
                <div className="w-4" />
              </div>

              {/* Comic Panel Simulation */}
              <div className="flex-1 p-2 space-y-2 bg-slate-100 font-mono text-[9px]">
                <div className="border-2 border-black p-2 bg-white rounded shadow-sm">
                  <p className="font-bold text-[10px] mb-1">MISSION 138: BY TATSUYA ENDO</p>
                  <p className="text-slate-700 italic">"And so my dear Loid was admitted to the hospital..."</p>
                </div>
                <div className="grid grid-cols-2 gap-2 h-40">
                  <div className="border-2 border-black p-2 bg-white flex flex-col justify-between">
                    <span className="font-bold">Anya's visit...</span>
                    <span className="text-[8px] text-slate-500">Translation: Casey Loe</span>
                  </div>
                  <div className="border-2 border-black p-2 bg-white flex flex-col justify-between">
                    <span className="font-bold">Peasant fathers...</span>
                    <span className="text-[8px] text-slate-500">Lettering: Rina Mapa</span>
                  </div>
                </div>
              </div>

              {/* Bottom Floating Nav Bar */}
              <div className="bg-black text-white p-2 flex items-center justify-between text-[10px]">
                <span className="bg-slate-800 px-2 py-1 rounded">Page 1/17</span>
                <span className="font-bold">&lt; Ch. 138 &gt;</span>
              </div>
            </div>
          )}

          {/* ANIME PLAYER SCREEN */}
          {screenType === 'player' && (
            <div className="flex-1 flex flex-col space-y-3 p-3">
              {/* Video Player */}
              <div className="w-full h-36 bg-black rounded-xl relative overflow-hidden border border-purple-500/30 flex items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40" />
                <Play className="w-8 h-8 text-purple-400 fill-purple-400 z-10" />
                
                {/* Subtitle Overlay */}
                <div className="absolute bottom-2 bg-black/80 px-3 py-1 rounded text-[10px] text-yellow-300 font-semibold border border-white/10 z-20">
                  Yasotakeru.
                </div>
              </div>

              {/* Title & Synopsis */}
              <div>
                <h4 className="font-extrabold text-sm text-white">ONE PIECE</h4>
                <p className="text-[10px] text-slate-400 uppercase font-semibold">ONE PIECE</p>
              </div>

              <div className="bg-surface-container p-2.5 rounded-xl border border-white/5 space-y-1">
                <span className="font-bold text-[11px] text-white block">Synopsis</span>
                <p className="text-[9.5px] text-slate-300 leading-snug line-clamp-3">
                  Gold Roger was known as the Pirate King, the strongest and most infamous being to have sailed the Grand Line...
                </p>
                <span className="text-[9px] text-purple-400 font-semibold block">v Read More</span>
              </div>

              {/* Predicted Broadcast Alert */}
              <div className="bg-purple-950/60 border border-purple-500/40 p-2.5 rounded-xl flex items-start space-x-2 text-purple-200">
                <Bell className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                <div className="flex-1 text-[9.5px]">
                  <p className="font-medium leading-snug">The next episode is predicted to arrive on 2026/07/26 02:16 PM GMT (It's coming)</p>
                </div>
                <X className="w-3 h-3 text-purple-400" />
              </div>

              {/* Episodes List Header */}
              <div className="flex items-center justify-between text-[11px]">
                <span className="font-bold text-white flex items-center space-x-1">
                  <span>🎬 Episodes</span>
                </span>
                <span className="text-slate-400">1170 Episodes</span>
              </div>
            </div>
          )}

          {/* FAVORITES SCREEN */}
          {screenType === 'favorites' && (
            <div className="p-3.5 space-y-4">
              <div className="text-center border-b border-slate-800 pb-2">
                <span className="font-bold text-sm text-white flex items-center justify-center space-x-1">
                  <span>❤️ Favorites</span>
                </span>
              </div>

              <div className="flex border-b border-slate-800 text-[11px]">
                <button className="flex-1 py-1.5 text-purple-400 font-bold border-b-2 border-purple-500 text-center">
                  Anime
                </button>
                <button className="flex-1 py-1.5 text-slate-400 font-medium text-center">
                  Manga
                </button>
              </div>

              <div className="pt-16 text-center space-y-2">
                <div className="w-14 h-14 mx-auto rounded-full bg-pink-500/10 border border-pink-500/30 flex items-center justify-center text-pink-400">
                  <Heart className="w-7 h-7" />
                </div>
                <h4 className="font-bold text-sm text-white">No Favorite Anime Yet</h4>
                <p className="text-[10px] text-slate-400">Tap ❤️ on any anime to save it here.</p>
              </div>
            </div>
          )}

          {/* TRACKER SCREEN */}
          {screenType === 'tracker' && (
            <div className="p-3.5 space-y-3">
              <div className="text-center border-b border-slate-800 pb-2">
                <span className="font-bold text-sm text-white flex items-center justify-center space-x-1">
                  <span>📊 Track progress</span>
                </span>
              </div>

              <div className="flex text-[10px] border-b border-slate-800 pb-1">
                <span className="flex-1 text-purple-400 font-bold text-center border-b-2 border-purple-500 pb-1">Anime History</span>
                <span className="flex-1 text-slate-400 text-center">Manga History</span>
                <span className="flex-1 text-slate-400 text-center">Statistics</span>
              </div>

              <div className="flex items-center space-x-1 bg-surface-container p-1.5 rounded-xl border border-white/5">
                <Search className="w-3.5 h-3.5 text-slate-400" />
                <span className="text-[10px] text-slate-400 flex-1">Search anime in tracker...</span>
                <Filter className="w-3.5 h-3.5 text-slate-400" />
              </div>

              <div className="flex space-x-1 overflow-x-auto text-[9px] no-scrollbar">
                <span className="bg-purple-600 text-white px-2 py-0.5 rounded-full font-bold">✓ All</span>
                <span className="bg-surface-container text-slate-300 px-2 py-0.5 rounded-full">Watching</span>
                <span className="bg-surface-container text-slate-300 px-2 py-0.5 rounded-full">Completed</span>
                <span className="bg-surface-container text-slate-300 px-2 py-0.5 rounded-full">Plan</span>
              </div>

              <div className="pt-12 text-center space-y-2">
                <div className="w-12 h-12 mx-auto rounded-xl bg-surface-container flex items-center justify-center text-slate-500">
                  <Film className="w-6 h-6" />
                </div>
                <p className="text-[10px] text-slate-400">No matching anime watch history found.</p>
              </div>
            </div>
          )}

          {/* SETTINGS SCREEN */}
          {screenType === 'settings' && (
            <div className="p-3.5 space-y-3">
              <div className="border-b border-slate-800 pb-2 flex items-center space-x-2">
                <SettingsIcon className="w-4 h-4 text-purple-400" />
                <span className="font-bold text-sm text-white">Settings</span>
              </div>

              <div>
                <span className="text-[10px] text-purple-400 font-bold tracking-wider uppercase block mb-1">Preferences</span>
                <div className="bg-surface-container rounded-xl p-2.5 space-y-2.5 border border-white/5 text-[10px]">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-bold text-white block">Appearance & Theme</span>
                      <span className="text-slate-400">System (purple)</span>
                    </div>
                    <span className="text-slate-500">&gt;</span>
                  </div>
                  <div className="flex items-center justify-between border-t border-white/5 pt-2">
                    <div>
                      <span className="font-bold text-white block">Anime Playback</span>
                      <span className="text-slate-400">Quality, audio & speed</span>
                    </div>
                    <span className="text-slate-500">&gt;</span>
                  </div>
                  <div className="flex items-center justify-between border-t border-white/5 pt-2">
                    <div>
                      <span className="font-bold text-white block">Manga Reader</span>
                      <span className="text-slate-400">Direction & zoom</span>
                    </div>
                    <span className="text-slate-500">&gt;</span>
                  </div>
                </div>
              </div>

              <div>
                <span className="text-[10px] text-purple-400 font-bold tracking-wider uppercase block mb-1">System & Data</span>
                <div className="bg-surface-container rounded-xl p-2.5 space-y-2 border border-white/5 text-[10px]">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white">Notifications</span>
                    <span className="text-slate-500">&gt;</span>
                  </div>
                  <div className="flex items-center justify-between border-t border-white/5 pt-1.5">
                    <span className="font-bold text-white">Cache Manager</span>
                    <span className="text-slate-500">&gt;</span>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Bottom Navigation Bar */}
        <div className="bg-void-950/90 backdrop-blur-md border-t border-white/10 px-2 py-2 flex items-center justify-around text-[9px] text-slate-400 z-30">
          <div className={`flex flex-col items-center space-y-0.5 ${screenType === 'home' ? 'text-purple-400 font-bold' : ''}`}>
            <HomeIcon className="w-3.5 h-3.5" />
            <span>Home</span>
          </div>
          <div className={`flex flex-col items-center space-y-0.5 ${screenType === 'search' ? 'text-purple-400 font-bold' : ''}`}>
            <Compass className="w-3.5 h-3.5" />
            <span>Discover</span>
          </div>
          <div className={`flex flex-col items-center space-y-0.5 ${screenType === 'favorites' ? 'text-purple-400 font-bold' : ''}`}>
            <Heart className="w-3.5 h-3.5" />
            <span>Favorites</span>
          </div>
          <div className={`flex flex-col items-center space-y-0.5 ${screenType === 'tracker' ? 'text-purple-400 font-bold' : ''}`}>
            <Bookmark className="w-3.5 h-3.5" />
            <span>Tracker</span>
          </div>
          <div className={`flex flex-col items-center space-y-0.5 ${screenType === 'settings' ? 'text-purple-400 font-bold' : ''}`}>
            <SettingsIcon className="w-3.5 h-3.5" />
            <span>Settings</span>
          </div>
        </div>

        {/* Home Indicator */}
        <div className="w-full pb-1 flex justify-center bg-void-950">
          <div className="w-24 h-1 bg-slate-700 rounded-full" />
        </div>

      </div>
    </div>
  );
};
