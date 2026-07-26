import fs from 'fs';
import path from 'path';
import { put, list } from '@vercel/blob';
import { cache } from 'react';

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  message: string;
  createdAt: string;
  ipAddress?: string;
  userAgent?: string;
  status: 'Unread' | 'Read' | 'Replied' | 'Archived';
  pinned?: boolean;
}

const PRIMARY_PATH = path.join(process.cwd(), 'data', 'contact-messages.json');
const TMP_PATH = path.join('/tmp', 'contact-messages.json');

// Helper to list and find Vercel Blob URL
async function getVercelBlobUrl(): Promise<string | null> {
  if (!process.env.BLOB_READ_WRITE_TOKEN) return null;
  try {
    const { blobs } = await list();
    const target = blobs.find(b => b.pathname === 'data/contact-messages.json');
    return target ? target.url : null;
  } catch (error) {
    console.error('Failed to list Vercel Blob for contact messages:', error);
    return null;
  }
}

export const getMessages = cache(async (): Promise<ContactMessage[]> => {
  // 1. Try reading from Vercel Blob if token is present
  if (process.env.BLOB_READ_WRITE_TOKEN) {
    try {
      const url = await getVercelBlobUrl();
      if (url) {
        const res = await fetch(url, { cache: 'no-store' });
        if (res.ok) {
          const data = await res.json();
          return data;
        }
      }
    } catch (error) {
      console.error('Failed to fetch contact messages from Vercel Blob:', error);
    }
  }

  // 2. Try reading from primary local path
  try {
    if (fs.existsSync(PRIMARY_PATH)) {
      const fileData = fs.readFileSync(PRIMARY_PATH, 'utf-8');
      const data = JSON.parse(fileData);
      return data;
    }
  } catch (error) {
    // Normal in serverless environments
  }

  // 3. Try reading from ephemeral /tmp fallback path
  try {
    if (fs.existsSync(TMP_PATH)) {
      const fileData = fs.readFileSync(TMP_PATH, 'utf-8');
      const data = JSON.parse(fileData);
      return data;
    }
  } catch (error) {
    // File doesn't exist yet
  }

  return [];
});

export async function saveMessages(messages: ContactMessage[]): Promise<void> {

  // 1. Save to Vercel Blob if token is present
  if (process.env.BLOB_READ_WRITE_TOKEN) {
    try {
      await put('data/contact-messages.json', JSON.stringify(messages, null, 2), {
        access: 'public',
        addRandomSuffix: false,
      });
      return;
    } catch (error) {
      console.error('Failed to save contact messages to Vercel Blob:', error);
    }
  }

  // 2. Try saving to primary local path
  try {
    const dirPath = path.dirname(PRIMARY_PATH);
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }
    fs.writeFileSync(PRIMARY_PATH, JSON.stringify(messages, null, 2), 'utf-8');
    return;
  } catch (error: any) {
    // Fallback to /tmp if primary fails (read-only filesystem EROFS on Vercel)
    console.warn('Primary contact messages write failed, trying /tmp fallback:', error.message);
  }

  // 3. Save to /tmp fallback
  try {
    const dirPath = path.dirname(TMP_PATH);
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }
    fs.writeFileSync(TMP_PATH, JSON.stringify(messages, null, 2), 'utf-8');
  } catch (error) {
    console.error('Failed to save contact messages to /tmp fallback:', error);
    throw error;
  }
}
