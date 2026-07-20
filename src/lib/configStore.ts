import fs from 'fs';
import path from 'path';
import { SiteConfig } from '@/types';
import { initialSiteConfig } from './data';

const CONFIG_FILE_PATH = path.join(process.cwd(), 'data', 'site-config.json');

export function getSiteConfig(): SiteConfig {
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
  try {
    const current = getSiteConfig();
    const updated = { ...current, ...newConfig };
    const dirPath = path.dirname(CONFIG_FILE_PATH);
    
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }
    
    fs.writeFileSync(CONFIG_FILE_PATH, JSON.stringify(updated, null, 2), 'utf-8');
    return updated;
  } catch (error) {
    console.error('Failed to save site config file:', error);
    throw error;
  }
}
