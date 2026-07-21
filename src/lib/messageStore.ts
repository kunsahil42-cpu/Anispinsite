import fs from 'fs';
import path from 'path';

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

const MESSAGES_FILE_PATH = path.join(process.cwd(), 'data', 'contact-messages.json');

export function getMessages(): ContactMessage[] {
  try {
    if (fs.existsSync(MESSAGES_FILE_PATH)) {
      const fileData = fs.readFileSync(MESSAGES_FILE_PATH, 'utf-8');
      return JSON.parse(fileData);
    }
  } catch (error) {
    console.error('Failed to read contact messages file, returning empty:', error);
  }
  return [];
}

export function saveMessages(messages: ContactMessage[]): void {
  try {
    const dirPath = path.dirname(MESSAGES_FILE_PATH);
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }
    fs.writeFileSync(MESSAGES_FILE_PATH, JSON.stringify(messages, null, 2), 'utf-8');
  } catch (error) {
    console.error('Failed to save contact messages file:', error);
    throw error;
  }
}
