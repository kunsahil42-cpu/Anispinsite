export interface DownloadMirror {
  id: string;
  name: string;
  url: string;
  isPrimary?: boolean;
  speed?: string;
  location?: string;
}

export interface SiteConfig {
  appName: string;
  tagline: string;
  heroBadgeText: string;
  version: string;
  releaseDate: string;
  apkSize: string;
  minAndroidVersion: string;
  sha256Hash: string;
  primaryApkUrl: string;
  mirrors: DownloadMirror[];
  playStoreUrl: string;
  playStoreEnabled: boolean;
  appStoreUrl: string;
  appStoreEnabled: boolean;
  discordUrl: string;
  redditUrl: string;
  githubUrl: string;
  seoTitle: string;
  seoDescription: string;
  seoKeywords: string[];
  themeSettings: {
    rgbGlowEnabled: boolean;
    primaryAccent: string;
    darkVoidBackground: string;
    particleDensity: 'low' | 'medium' | 'high';
  };
  releaseNotes?: string;
  changelog?: ChangelogItem[];
}

export interface AppScreenshot {
  id: string;
  title: string;
  subtitle: string;
  screenType: 'home' | 'search' | 'anime_details' | 'manga_details' | 'manga_reader' | 'player' | 'favorites' | 'tracker' | 'settings';
  description: string;
  highlights: string[];
  badge?: string;
  imageSrc: string;
}

export interface ChangelogItem {
  id: string;
  version: string;
  date: string;
  title: string;
  tag: 'Major Release' | 'Feature Update' | 'Patch Fix';
  changes: {
    added?: string[];
    improved?: string[];
    fixed?: string[];
  };
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'General' | 'Installation' | 'Streaming' | 'Privacy' | 'Troubleshooting';
}

export interface FeatureCard {
  id: string;
  title: string;
  description: string;
  icon: string;
  badge: string;
  gradient: string;
}
