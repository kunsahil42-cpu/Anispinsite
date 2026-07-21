import { NextResponse } from 'next/server';
import { getMessages, saveMessages, ContactMessage } from '@/lib/messageStore';

export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Name, email, and message are required.' }, { status: 400 });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Please provide a valid email address.' }, { status: 400 });
    }

    // Capture IP address from standard headers
    const ipAddress = request.headers.get('x-forwarded-for')?.split(',')[0].trim() || 
                      request.headers.get('x-real-ip') || 
                      '127.0.0.1';

    // Capture User Agent
    const userAgent = request.headers.get('user-agent') || 'Unknown Browser';

    const newMessage: ContactMessage = {
      id: 'msg_' + Math.random().toString(36).substring(2, 11) + '_' + Date.now(),
      name: name.trim(),
      email: email.trim().toLowerCase(),
      message: message.trim(),
      createdAt: new Date().toISOString(),
      ipAddress,
      userAgent,
      status: 'Unread',
      pinned: false
    };

    const currentMessages = getMessages();
    saveMessages([newMessage, ...currentMessages]);

    return NextResponse.json({ success: true, message: 'Your message has been submitted successfully!' });
  } catch (error: any) {
    console.error('Error handling contact submission:', error);
    return NextResponse.json({ error: 'Internal server error while processing message.' }, { status: 500 });
  }
}
