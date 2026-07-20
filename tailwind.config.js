/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        void: {
          950: '#06060A',
          900: '#0B0B11',
          850: '#111019',
          800: '#171622',
          700: '#222033',
        },
        surface: {
          container: '#1D1A2C',
          high: '#27233B',
          highest: '#322E4B',
          glow: 'rgba(168, 85, 247, 0.15)',
        },
        anime: {
          purple: '#A855F7',
          deepPurple: '#7E22CE',
          cyan: '#06B6D4',
          pink: '#EC4899',
          mint: '#10B981',
          gold: '#F59E0B',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        display: ['var(--font-outfit)', 'system-ui', 'sans-serif'],
      },
      animation: {
        'rgb-glow': 'rgbGlow 8s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s infinite',
      },
      keyframes: {
        rgbGlow: {
          '0%, 100%': { filter: 'hue-rotate(0deg)' },
          '50%': { filter: 'hue-rotate(180deg)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(1.05)' },
        },
        shimmer: {
          '100%': { transform: 'translateX(100%)' },
        },
      },
      boxShadow: {
        'neon-purple': '0 0 25px -5px rgba(168, 85, 247, 0.5), 0 0 10px -2px rgba(168, 85, 247, 0.3)',
        'neon-cyan': '0 0 25px -5px rgba(6, 182, 212, 0.5), 0 0 10px -2px rgba(6, 182, 212, 0.3)',
        'neon-pink': '0 0 25px -5px rgba(236, 72, 153, 0.5), 0 0 10px -2px rgba(236, 72, 153, 0.3)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
      },
    },
  },
  plugins: [],
}
