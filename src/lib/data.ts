import { SiteConfig, AppScreenshot, ChangelogItem, FAQItem, FeatureCard } from '@/types';

export const initialSiteConfig: SiteConfig = {
  appName: 'AniSpin',
  tagline: 'Your Next-Generation Dual Anime Streaming & Manga Reading Ecosystem',
  heroBadgeText: 'v1.2.0 Official Release',
  version: '1.2.0',
  releaseDate: 'July 2026',
  apkSize: '24.8 MB',
  minAndroidVersion: 'Android 8.0 (Oreo) or higher',
  sha256Hash: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
  primaryApkUrl: '/downloads/AniSpin-v1.2.0.apk',
  mirrors: [
    { id: '1', name: 'Official Direct Server (Fast)', url: 'https://download.anispin.app/v1.2.0/AniSpin-v1.2.0.apk', isPrimary: true, speed: '1 Gbps', location: 'Global CDN' },
    { id: '2', name: 'GitHub Releases Mirror', url: 'https://github.com/anispin/anispin/releases/download/v1.2.0/AniSpin.apk', isPrimary: false, speed: 'Fast', location: 'Worldwide' },
    { id: '3', name: 'Cloudflare Edge Mirror', url: 'https://cdn.anispin.app/builds/latest.apk', isPrimary: false, speed: 'Ultra Fast', location: 'Edge Node' }
  ],
  playStoreUrl: 'https://play.google.com/store/apps/details?id=app.anispin.official',
  playStoreEnabled: false,
  appStoreUrl: 'https://apps.apple.com/app/anispin/id640000000',
  appStoreEnabled: false,
  discordUrl: 'https://discord.gg/anispin',
  redditUrl: 'https://reddit.com/r/AniSpin',
  githubUrl: 'https://github.com/anispin/anispin',
  seoTitle: 'AniSpin - Watch Anime & Read Manga Free | Official Android App',
  seoDescription: 'Download AniSpin APK for Android. The ultimate anime streaming and manga reader app featuring dark Material 3 design, episode release predictions, progress tracking, and random rolls.',
  seoKeywords: ['AniSpin', 'AniSpin APK', 'Anime Streamer', 'Manga Reader', 'Anime App', 'Material 3 Anime App', 'Free Anime App', 'Anime Tracker'],
  themeSettings: {
    rgbGlowEnabled: true,
    primaryAccent: '#A855F7',
    darkVoidBackground: '#0B0B11',
    particleDensity: 'high'
  }
};

export const appScreenshots: AppScreenshot[] = [
  {
    id: 'home',
    title: 'Home Hub',
    subtitle: 'Seamless Dual Switch',
    screenType: 'home',
    description: 'Toggle instantly between Anime and Manga modes. Quick Random Roll buttons, Continue Watching feed, and Trending titles.',
    highlights: ['Anime & Manga mode toggle', '5-Dot Random Anime Roll', 'Open-Book Manga Roll', 'Continue Watching progress'],
    badge: 'Core UI',
    imageSrc: '/screenshots/home.jpg'
  },
  {
    id: 'search',
    title: 'Instant Search',
    subtitle: 'Lightning-Fast Discovery',
    screenType: 'search',
    description: 'Blazing fast search engine with real-time filters for anime titles, manga releases, and genre tags.',
    highlights: ['Multi-category query search', 'Instant switch between series types', 'Zero lag filter engine'],
    badge: 'Discovery',
    imageSrc: '/screenshots/search.jpg'
  },
  {
    id: 'anime_details',
    title: 'Anime Details',
    subtitle: 'Immersive Backdrop Cards',
    screenType: 'anime_details',
    description: 'Rich anime overview page with rating statistics, release status, bookmarking, and genre chips.',
    highlights: ['High-res artwork banner', 'Community rating badge', 'Genre tags chips', 'One-tap Favorites bookmark'],
    badge: 'Anime Engine',
    imageSrc: '/screenshots/anime_details.jpg'
  },
  {
    id: 'manga_details',
    title: 'Manga Details',
    subtitle: 'Complete Volume Overview',
    screenType: 'manga_details',
    description: 'Explore manga series with volume covers, status indicators, slice-of-life tags, and quick chapter jump.',
    highlights: ['Clean Jump Comics visual layout', 'Supernatural & Drama genres', 'Favorite tracker integration'],
    badge: 'Manga Engine',
    imageSrc: '/screenshots/manga_details.jpg'
  },
  {
    id: 'manga_reader',
    title: 'Manga Reader',
    subtitle: 'HD Vertical & Horizontal Reader',
    screenType: 'manga_reader',
    description: 'Distraction-free manga reading with high resolution chapter pages, page counter, and smooth gesture controls.',
    highlights: ['Mission & Chapter navigator', 'Page 1/17 counter floating bar', 'Next/Prev chapter shortcuts'],
    badge: 'Reader Experience',
    imageSrc: '/screenshots/manga_reader.jpg'
  },
  {
    id: 'player',
    title: 'Anime Player',
    subtitle: 'Interactive Episode Streamer',
    screenType: 'player',
    description: 'Integrated video streaming player with subtitles, full synopsis drawer, and predicted episode release countdown timer.',
    highlights: ['Built-in Subtitle engine', 'Predictive release timestamp alert', '1000+ episode index menu'],
    badge: 'HD Player',
    imageSrc: '/screenshots/player.jpg'
  },
  {
    id: 'favorites',
    title: 'Favorites Vault',
    subtitle: 'Personal Collection',
    screenType: 'favorites',
    description: 'Your saved anime and manga series organized in clean tabs for instant offline access.',
    highlights: ['Separate Anime/Manga tabs', 'One-tap removal and sorting', 'Cloud sync ready'],
    badge: 'Library',
    imageSrc: '/screenshots/favorites.jpg'
  },
  {
    id: 'tracker',
    title: 'Progress Tracker',
    subtitle: 'Detailed Watch & Read History',
    screenType: 'tracker',
    description: 'Track your watching history, completed titles, plan-to-watch lists, and detailed statistics.',
    highlights: ['Watching & Completed filters', 'Anime vs Manga progress history', 'Statistics breakdown'],
    badge: 'Analytics',
    imageSrc: '/screenshots/tracker.jpg'
  },
  {
    id: 'settings',
    title: 'App Settings',
    subtitle: 'Deep Personalization',
    screenType: 'settings',
    description: 'Customize theme appearance (System purple), playback audio/quality, reader scroll orientation, content filters, and cache clearing.',
    highlights: ['System Purple theme engine', 'Playback speed & audio selection', 'Cache calculator & manager'],
    badge: 'Customization',
    imageSrc: '/screenshots/settings.jpg'
  }
];

export const featureCards: FeatureCard[] = [
  {
    id: '1',
    title: 'Dual Engine Architecture',
    description: 'Switch effortlessly between streaming high-definition anime episodes and reading high-resolution manga volumes in one sleek app.',
    icon: 'Layers',
    badge: 'Unified',
    gradient: 'from-purple-600 to-indigo-600'
  },
  {
    id: '2',
    title: 'Anime & Manga Gacha Roll',
    description: 'Tired of scrolling? Hit the Anime Roll or Manga Roll to roll the dice and discover hand-picked hidden gems based on your taste.',
    icon: 'Dices',
    badge: 'Gacha',
    gradient: 'from-cyan-500 to-blue-600'
  },
  {
    id: '3',
    title: 'Predictive Release Schedule',
    description: 'Never miss an episode. AniSpin calculates exact predicted arrival timestamps for upcoming episode broadcasts in your local timezone.',
    icon: 'Clock',
    badge: 'Smart AI',
    gradient: 'from-amber-500 to-red-500'
  },
  {
    id: '4',
    title: 'Material 3 Dark Design',
    description: 'Inspired by cybernetic Japanese aesthetic and Material 3 design system with vibrant neon purple accents, glassmorphic cards, and fluid 60fps animations.',
    icon: 'Sparkles',
    badge: 'Cyberpunk',
    gradient: 'from-pink-500 to-purple-600'
  },
  {
    id: '5',
    title: 'Advanced Progress Tracker',
    description: 'Filter watch history into Watching, Completed, and Plan to Watch tabs with detailed viewing statistics and reading counters.',
    icon: 'BarChart3',
    badge: 'Sync',
    gradient: 'from-emerald-500 to-teal-600'
  },
  {
    id: '6',
    title: 'Zero Ads & Lightweight',
    description: 'Enjoy pure uninterrupted streaming and reading. Built with Flutter for smooth battery-friendly performance under 25MB.',
    icon: 'Zap',
    badge: 'Ultra Fast',
    gradient: 'from-violet-600 to-purple-800'
  }
];

export const changelogData: ChangelogItem[] = [
  {
    id: 'v1.2.0',
    version: 'v1.2.0',
    date: 'July 2026',
    title: 'Predictive Episode Timers & Enhanced Reader',
    tag: 'Major Release',
    changes: {
      added: [
        'Added Predictive Episode Broadcast alert card with local timezone conversion.',
        'Added 5-Dot Anime Roll and Manga Roll random recommendation engine.',
        'Added Cache Manager with automatic image cache cleaner in Settings.',
        'Added full support for Android 15 & edge-to-edge navigation.'
      ],
      improved: [
        'Upgraded Manga Reader scrolling smoothness and page 1/N gesture accuracy.',
        'Enhanced Material 3 System Purple theme contrast and neon lighting effects.',
        'Reduced memory consumption during 1080p playback by 35%.'
      ],
      fixed: [
        'Fixed occasional episode progress sync reset on app minimize.',
        'Fixed poster image flicker in search results grid.'
      ]
    }
  },
  {
    id: 'v1.1.0',
    version: 'v1.1.0',
    date: 'May 2026',
    title: 'Dual Anime & Manga Switch Engine',
    tag: 'Feature Update',
    changes: {
      added: [
        'Introduced unified top toggle for Anime and Manga mode in Home & Search screens.',
        'Added Favorites vault with cloud backup export feature.',
        'Added genre filter tags (Action, Slice of Life, Supernatural, Fantasy).'
      ],
      improved: [
        'Accelerated search indexing response time to under 50ms.'
      ],
      fixed: [
        'Resolved subtitle sync lag on slow networks.'
      ]
    }
  },
  {
    id: 'v1.0.0',
    version: 'v1.0.0',
    date: 'March 2026',
    title: 'Initial Public Release',
    tag: 'Patch Fix',
    changes: {
      added: [
        'Core anime video player and manga reader engines.',
        'Dark mode Material 3 design system with custom purple theme.'
      ]
    }
  }
];

export const faqData: FAQItem[] = [
  {
    id: '1',
    question: 'Is AniSpin completely free to download and use?',
    answer: 'Yes! AniSpin is 100% free with no hidden subscriptions or forced paywalls. You can stream anime and read manga freely.',
    category: 'General'
  },
  {
    id: '2',
    question: 'How do I install the AniSpin APK on my Android device?',
    answer: '1. Click the "Download APK" button on this website.\n2. When prompted by your browser, grant permission to download the file.\n3. Open your device Settings > Security > Install Unknown Apps and allow your browser.\n4. Open the downloaded file and tap Install.',
    category: 'Installation'
  },
  {
    id: '3',
    question: 'Is AniSpin safe and virus-free?',
    answer: 'Yes, all AniSpin APK releases are built with clean source code, digitally signed, and verified against SHA-256 hashes to guarantee zero malware, spyware, or adware.',
    category: 'Privacy'
  },
  {
    id: '4',
    question: 'Will AniSpin be available on Google Play and Apple App Store?',
    answer: 'We are currently preparing official submissions for both Google Play Store and Apple App Store. In the meantime, Android users can install the APK directly from our website.',
    category: 'General'
  },
  {
    id: '5',
    question: 'How does the Predictive Airing Schedule work?',
    answer: 'AniSpin cross-references official Japanese TV network broadcasting schedules and calculates precise countdowns converted to your device local timezone.',
    category: 'Streaming'
  },
  {
    id: '6',
    question: 'How do I update to the latest version of AniSpin?',
    answer: 'AniSpin includes built-in update notifications in the Settings screen. When a new version is available, you will receive an alert with a direct download button.',
    category: 'Troubleshooting'
  }
];
