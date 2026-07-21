import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { getMessages, saveMessages } from '@/lib/messageStore';

const AUTH_COOKIE_NAME = 'anispin_admin_session';

async function isAuthorized() {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get(AUTH_COOKIE_NAME);
  return Boolean(sessionToken && sessionToken.value.startsWith('authenticated_token_'));
}

export async function GET() {
  if (!(await isAuthorized())) {
    return NextResponse.json({ error: 'Unauthorized admin access' }, { status: 401 });
  }

  const messages = await getMessages();
  return NextResponse.json(messages);
}

export async function PUT(request: Request) {
  if (!(await isAuthorized())) {
    return NextResponse.json({ error: 'Unauthorized admin access' }, { status: 401 });
  }

  try {
    const { id, status, pinned } = await request.json();

    if (!id) {
      return NextResponse.json({ error: 'Message ID is required' }, { status: 400 });
    }

    const messages = await getMessages();
    const messageIndex = messages.findIndex(m => m.id === id);

    if (messageIndex === -1) {
      return NextResponse.json({ error: 'Message not found' }, { status: 404 });
    }

    // Update status if provided
    if (status !== undefined) {
      messages[messageIndex].status = status;
    }

    // Update pinned state if provided
    if (pinned !== undefined) {
      messages[messageIndex].pinned = pinned;
    }

    await saveMessages(messages);
    return NextResponse.json({ success: true, message: messages[messageIndex] });
  } catch (error: any) {
    console.error('Error updating message:', error);
    return NextResponse.json({ error: 'Failed to update message' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  if (!(await isAuthorized())) {
    return NextResponse.json({ error: 'Unauthorized admin access' }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Message ID is required' }, { status: 400 });
    }

    const messages = await getMessages();
    const updatedMessages = messages.filter(m => m.id !== id);

    if (messages.length === updatedMessages.length) {
      return NextResponse.json({ error: 'Message not found' }, { status: 404 });
    }

    await saveMessages(updatedMessages);
    return NextResponse.json({ success: true, message: 'Message successfully deleted' });
  } catch (error: any) {
    console.error('Error deleting message:', error);
    return NextResponse.json({ error: 'Failed to delete message' }, { status: 500 });
  }
}
