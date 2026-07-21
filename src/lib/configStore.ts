import fs from 'fs';
import path from 'path';
import { SiteConfig } from '@/types';
import { initialSiteConfig } from './data';
import { put, list } from '@vercel/blob';

const CONFIG_FILE_PATH = path.join(process.cwd(), 'data', 'site-config.json');
const TMP_CONFIG_FILE_PATH = path.join('/tmp', 'site-config.json');

// Memory cache
let cachedConfig: SiteConfig | null = null;

// Helper to list and find Vercel Blob URL for site config
async function getVercelBlobUrl(): Promise<string | null> {
  if (!process.env.BLOB_READ_WRITE_TOKEN) return null;
  try {
    const { blobs } = await list();
    const target = blobs.find(b => b.pathname === 'data/site-config.json');
    return target ? target.url : null;
  } catch (error) {
    console.error('Failed to list Vercel Blob for site config:', error);
    return null;
  }
}

export async function getSiteConfig(): Promise<SiteConfig> {
  // If memory cache exists, return it
  if (cachedConfig) {
    return cachedConfig;
  }

  // 1. Try reading from Vercel Blob if token is present
  if (process.env.BLOB_READ_WRITE_TOKEN) {
    try {
      const url = await getVercelBlobUrl();
      if (url) {
        const res = await fetch(url, { cache: 'no-store' });
        if (res.ok) {
          const data = await res.json();
          cachedConfig = { ...initialSiteConfig, ...data };
          return cachedConfig;
        }
      }
    } catch (error) {
      console.error('Failed to fetch site config from Vercel Blob:', error);
    }
  }

  // 2. Try reading from ephemeral /tmp fallback path first
  try {
    if (fs.existsSync(TMP_CONFIG_FILE_PATH)) {
      const fileData = fs.readFileSync(TMP_CONFIG_FILE_PATH, 'utf-8');
      const parsed = JSON.parse(fileData);
      cachedConfig = { ...initialSiteConfig, ...parsed };
      return cachedConfig;
    }
  } catch (error) {
    // Normal if file does not exist yet
  }

  // 3. Try reading from primary local path
  try {
    if (fs.existsSync(CONFIG_FILE_PATH)) {
      const fileData = fs.readFileSync(CONFIG_FILE_PATH, 'utf-8');
      const parsed = JSON.parse(fileData);
      cachedConfig = { ...initialSiteConfig, ...parsed };
      return cachedConfig;
    }
  } catch (error) {
    console.error('Failed to read site config file, using default:', error);
  }

  return initialSiteConfig;
}

export async function saveSiteConfig(newConfig: Partial<SiteConfig>): Promise<SiteConfig> {
  const current = await getSiteConfig();
  const updated = { ...current, ...newConfig };
  cachedConfig = updated;

  // 1. Save to Vercel Blob if token is present
  if (process.env.BLOB_READ_WRITE_TOKEN) {
    try {
      await put('data/site-config.json', JSON.stringify(updated, null, 2), {
        access: 'public',
        addRandomSuffix: false,
      });
      return updated;
    } catch (error) {
      console.error('Failed to save site config to Vercel Blob:', error);
    }
  }

  // 2. Try saving to primary local path
  try {
    const dirPath = path.dirname(CONFIG_FILE_PATH);
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }
    fs.writeFileSync(CONFIG_FILE_PATH, JSON.stringify(updated, null, 2), 'utf-8');
    return updated;
  } catch (error: any) {
    // Fallback to /tmp if primary fails (read-only filesystem on Vercel)
    console.warn('Primary site config write failed, trying /tmp fallback:', error.message);
  }

  // 3. Save to /tmp fallback
  try {
    const dirPath = path.dirname(TMP_CONFIG_FILE_PATH);
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }
    fs.writeFileSync(TMP_CONFIG_FILE_PATH, JSON.stringify(updated, null, 2), 'utf-8');
    return updated;
  } catch (error) {
    console.error('Failed to save site config to /tmp fallback:', error);
    throw error;
  }
}
