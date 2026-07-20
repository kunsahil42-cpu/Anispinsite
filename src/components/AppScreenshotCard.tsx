'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { AppScreenshot } from '@/types';
import { Sparkles, Maximize2 } from 'lucide-react';

interface AppScreenshotCardProps {
  screenshot: AppScreenshot;
  showOverlayTitle?: boolean;
}

export const AppScreenshotCard: React.FC<AppScreenshotCardProps> = ({
  screenshot,
  showOverlayTitle = false,
}) => {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget.getBoundingClientRect();
    const cardX = e.clientX - card.left;
    const cardY = e.clientY - card.top;
    const centerX = card.width / 2;
    const centerY = card.height / 2;

    const rX = ((cardY - centerY) / centerY) * -8;
    const rY = ((cardX - centerX) / centerX) * 8;

    setRotateX(rX);
    setRotateY(rY);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <div
      className="perspective-1000 relative group max-w-[320px] sm:max-w-[340px] mx-auto w-full transition-all duration-300 transform-gpu"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Ambient Neon RGB Lighting Glow Background */}
      <div className="absolute -inset-2 rounded-3xl bg-gradient-to-r from-purple-600/40 via-cyan-500/40 to-pink-500/40 blur-xl opacity-60 group-hover:opacity-100 transition-opacity duration-500 animate-rgb-glow -z-10" />

      {/* 3D Tilt Card Shell */}
      <div
        className="relative rounded-2xl overflow-hidden border border-white/15 bg-surface-container/90 shadow-2xl shadow-neon-purple/20 transition-transform duration-200 ease-out transform-gpu"
        style={{
          transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`,
        }}
      >
        {/* Actual AniSpin Screenshot Image */}
        <div className="relative w-full aspect-[9/19.5] overflow-hidden bg-void-950">
          <Image
            src={screenshot.imageSrc}
            alt={screenshot.title}
            fill
            sizes="(max-width: 768px) 100vw, 340px"
            className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
            priority
          />
          
          {/* Subtle 3D Glass Surface Lighting Layer */}
          <div className="absolute inset-0 bg-gradient-to-tr from-black/40 via-transparent to-white/10 opacity-70 pointer-events-none" />

          {/* Optional Title Badge Overlay */}
          {showOverlayTitle && (
            <div className="absolute bottom-3 left-3 right-3 bg-void-950/85 backdrop-blur-md p-3 rounded-xl border border-white/10 flex items-center justify-between text-white">
              <div>
                <span className="font-bold text-xs block">{screenshot.title}</span>
                <span className="text-[10px] text-purple-300 font-medium">{screenshot.subtitle}</span>
              </div>
              <span className="px-2 py-0.5 rounded text-[9px] font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30">
                {screenshot.badge || 'Actual UI'}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
