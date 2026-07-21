import fs from 'fs';
import path from 'path';
import { SiteConfig } from '@/types';
import { initialSiteConfig } from './data';

const CONFIG_FILE_PATH = path.join(process.cwd(), 'data', 'site-config.json');
const TMP_CONFIG_FILE_PATH = path.join('/tmp', 'site-config.json');

export function getSiteConfig(): SiteConfig {
  // 1. Try reading from ephemeral /tmp fallback path first
  try {
    if (fs.existsSync(TMP_CONFIG_FILE_PATH)) {
      const fileData = fs.readFileSync(TMP_CONFIG_FILE_PATH, 'utf-8');
      const parsed = JSON.parse(fileData);
      return { ...initialSiteConfig, ...parsed };
    }
  } catch (error) {
    // Normal if file does not exist yet
  }

  // 2. Try reading from primary local path
  try {
    if (fs.existsSync(CONFIG_FILE_PATH)) {
      const fileData = fs.readFileSync(CONFIG_FILE_PATH, 'utf-8');
      const parsed = JSON.parse(fileData);
      return { ...initialSiteConfig, ...parsed };
    }
  } catch (error) {
    console.error('Failed to read site config file, using default:', error);
  }

  return initialSiteConfig;
}

export function saveSiteConfig(newConfig: Partial<SiteConfig>): SiteConfig {
  const current = getSiteConfig();
  const updated = { ...current, ...newConfig };

  // 1. Try saving to primary local path
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

  // 2. Try saving to /tmp fallback
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
