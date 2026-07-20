'use client';

import React, { useEffect, useRef } from 'react';

export const ParticleBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // 3D Particles Array
    const particleCount = Math.min(Math.floor(width / 25), 60);
    const particles = Array.from({ length: particleCount }).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      z: Math.random() * 3 + 0.5, // 3D depth z-index scale
      radius: Math.random() * 2 + 1,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      color: Math.random() > 0.5 ? 'rgba(168, 85, 247, ' : 'rgba(6, 182, 212, ',
      alpha: Math.random() * 0.5 + 0.2,
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.x += p.vx * p.z;
        p.y += p.vy * p.z;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius * (p.z / 2), 0, Math.PI * 2);
        ctx.fillStyle = p.color + p.alpha + ')';
        ctx.shadowBlur = p.z * 4;
        ctx.shadowColor = p.color + '0.8)';
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Dynamic Animated Ambient Orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[550px] h-[550px] rounded-full bg-purple-600/15 blur-[150px] animate-pulse-glow" />
      <div
        className="absolute top-[35%] right-[-10%] w-[650px] h-[650px] rounded-full bg-cyan-600/15 blur-[170px] animate-pulse-glow"
        style={{ animationDelay: '2.5s' }}
      />
      <div
        className="absolute bottom-[-10%] left-[20%] w-[600px] h-[600px] rounded-full bg-pink-600/10 blur-[160px] animate-pulse-glow"
        style={{ animationDelay: '4.5s' }}
      />

      {/* 3D Canvas Particle Dust System */}
      <canvas ref={canvasRef} className="absolute inset-0 opacity-70" />

      {/* Cyber Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f1a300a_1px,transparent_1px),linear-gradient(to_bottom,#1f1a300a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
    </div>
  );
};
