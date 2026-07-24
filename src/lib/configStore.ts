import fs from 'fs';
import path from 'path';
import { SiteConfig } from '@/types';
import { initialSiteConfig } from './data';
import { put, list } from '@vercel/blob';

const CONFIG_FILE_PATH = path.join(process.cwd(), 'data', 'site-config.json');
const TMP_CONFIG_FILE_PATH = path.join('/tmp', 'site-config.json');

// In-memory cache — valid only within a single serverless function lifecycle.
// On Vercel, each cold-start resets this to null, which is intentional.
let cachedConfig: SiteConfig | null = null;

// Helper to find the Vercel Blob URL for the config file
async function getVercelBlobUrl(): Promise<string | null> {
  if (!process.env.BLOB_READ_WRITE_TOKEN) return null;
  try {
    const { blobs } = await list({ prefix: 'data/site-config.json' });
    const target = blobs.find(b => b.pathname === 'data/site-config.json');
    return target ? target.url : null;
  } catch (error) {
    console.error('[configStore] Failed to list Vercel Blob:', error);
    return null;
  }
}

export async function getSiteConfig(): Promise<SiteConfig> {
  // Return in-memory cache if available within this function instance
  if (cachedConfig) {
    return cachedConfig;
  }

  // 1. Try Vercel Blob first (persistent cloud storage — requires BLOB_READ_WRITE_TOKEN)
  if (process.env.BLOB_READ_WRITE_TOKEN) {
    try {
      const url = await getVercelBlobUrl();
      if (url) {
        // Add cache-busting query param to defeat CDN caching on reads
        const bustUrl = `${url}?t=${Date.now()}`;
        const res = await fetch(bustUrl, { cache: 'no-store' });
        if (res.ok) {
          const data = await res.json();
          const config: SiteConfig = { ...initialSiteConfig, ...data };
          cachedConfig = config;
          console.log('[configStore] Loaded config from Vercel Blob ✅');
          return config;
        }
      } else {
        console.log('[configStore] No config file in Vercel Blob yet — will use defaults.');
      }
    } catch (error) {
      console.error('[configStore] Failed to fetch config from Vercel Blob:', error);
    }
  } else {
    console.warn(
      '[configStore] ⚠️  BLOB_READ_WRITE_TOKEN is not set. ' +
      'Admin saves will NOT persist between serverless function restarts. ' +
      'Set up Vercel Blob Storage in your Vercel project dashboard to enable persistence.'
    );
  }

  // 2. Fallback: /tmp (ephemeral — only survives within the same warm function instance)
  try {
    if (fs.existsSync(TMP_CONFIG_FILE_PATH)) {
      const fileData = fs.readFileSync(TMP_CONFIG_FILE_PATH, 'utf-8');
      const parsed = JSON.parse(fileData);
      const config: SiteConfig = { ...initialSiteConfig, ...parsed };
      cachedConfig = config;
      console.log('[configStore] Loaded config from /tmp fallback (ephemeral)');
      return config;
    }
  } catch {
    // Expected if /tmp file doesn't exist yet
  }

  // 3. Fallback: bundled data/site-config.json (read-only on Vercel — baked into build)
  try {
    if (fs.existsSync(CONFIG_FILE_PATH)) {
      const fileData = fs.readFileSync(CONFIG_FILE_PATH, 'utf-8');
      const parsed = JSON.parse(fileData);
      const config: SiteConfig = { ...initialSiteConfig, ...parsed };
      cachedConfig = config;
      console.log('[configStore] Loaded config from bundled site-config.json (read-only)');
      return config;
    }
  } catch (error) {
    console.error('[configStore] Failed to read bundled config file:', error);
  }

  console.log('[configStore] Using hardcoded initialSiteConfig defaults');
  return initialSiteConfig;
}

export async function saveSiteConfig(newConfig: Partial<SiteConfig>): Promise<SiteConfig> {
  const current = await getSiteConfig();
  const updated: SiteConfig = { ...current, ...newConfig };

  // Always clear the in-memory cache so the next getSiteConfig() reads fresh data
  cachedConfig = null;

  // 1. Save to Vercel Blob (persistent — only available if BLOB_READ_WRITE_TOKEN is set)
  if (process.env.BLOB_READ_WRITE_TOKEN) {
    try {
      await put('data/site-config.json', JSON.stringify(updated, null, 2), {
        access: 'public',
        addRandomSuffix: false,
      });
      console.log('[configStore] Config saved to Vercel Blob ✅');
      // Re-populate cache with saved value
      cachedConfig = updated;
      return updated;
    } catch (error) {
      console.error('[configStore] Failed to save config to Vercel Blob:', error);
      throw new Error('Failed to save to Vercel Blob. Check your BLOB_READ_WRITE_TOKEN.');
    }
  }

  // 2. Try local data/ directory (only works locally, read-only on Vercel)
  try {
    const dirPath = path.dirname(CONFIG_FILE_PATH);
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }
    fs.writeFileSync(CONFIG_FILE_PATH, JSON.stringify(updated, null, 2), 'utf-8');
    console.log('[configStore] Config saved to local data/site-config.json ✅');
    cachedConfig = updated;
    return updated;
  } catch (error: any) {
    console.warn(
      '[configStore] Cannot write to data/ (expected on Vercel — filesystem is read-only). ' +
      'Falling back to /tmp. THIS CHANGE WILL NOT PERSIST ACROSS FUNCTION RESTARTS.',
      error.message
    );
  }

  // 3. /tmp fallback — ephemeral, lost on cold start
  try {
    const dirPath = path.dirname(TMP_CONFIG_FILE_PATH);
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }
    fs.writeFileSync(TMP_CONFIG_FILE_PATH, JSON.stringify(updated, null, 2), 'utf-8');
    console.warn(
      '[configStore] ⚠️  Config saved to /tmp only — this is EPHEMERAL and will be lost on next cold start. ' +
      'Set BLOB_READ_WRITE_TOKEN to enable permanent storage.'
    );
    cachedConfig = updated;
    return updated;
  } catch (error) {
    console.error('[configStore] All save attempts failed:', error);
    throw error;
  }
}
