'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { AdminNavbar } from '@/components/admin/AdminNavbar';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        console.log('🔍 Checking auth in AdminLayout...');
        const res = await fetch('/api/admin/check', {
          cache: 'no-store',
          credentials: 'include',
        });
        const data = await res.json();
        console.log('📊 Auth check result:', data);
        
        if (!data.authenticated) {
          console.log('❌ Not authenticated, redirecting to login...');
          router.push('/admin/login');
          return;
        }
        console.log('✅ Authenticated, showing dashboard');
      } catch (error) {
        console.error('❌ Auth check error:', error);
        router.push('/admin/login');
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#080A0D]">
        <div className="text-[#8B949E]">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#080A0D]">
      <AdminNavbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
}
