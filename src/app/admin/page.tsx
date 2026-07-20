import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getSiteConfig } from '@/lib/configStore';
import { AdminDashboard } from '@/components/AdminDashboard';

export const metadata = {
  title: 'Admin Dashboard - AniSpin Official',
  robots: { index: false, follow: false },
};

export default async function AdminPage() {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get('anispin_admin_session');

  if (!sessionToken || !sessionToken.value.startsWith('authenticated_token_')) {
    redirect('/admin/login');
  }

  const config = getSiteConfig();

  return <AdminDashboard initialConfig={config} />;
}
