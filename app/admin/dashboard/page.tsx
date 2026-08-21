'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  LayoutDashboard, 
  TrendingUp, 
  Users, 
  Settings, 
  Database,
  BarChart3,
  Activity,
  CheckCircle,
  XCircle,
  ArrowRight,
  Loader2
} from 'lucide-react';

export default function AdminDashboardPage() {
  const [stats, setStats] = useState({
    totalSignals: 0,
    activeSignals: 0,
    closedSignals: 0,
    totalUsers: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        console.log('🔍 Checking auth in dashboard...');
        const res = await fetch('/api/admin/check', {
          cache: 'no-store',
          credentials: 'include',
        });
        const data = await res.json();
        console.log('📊 Dashboard auth check:', data);
        
        if (!data.authenticated) {
          console.log('❌ Not authenticated, redirecting...');
          router.push('/admin/login');
          return;
        }
        console.log('✅ Authenticated, fetching stats...');
        fetchStats();
      } catch (error) {
        console.error('❌ Auth error:', error);
        router.push('/admin/login');
      }
    };
    checkAuth();
  }, [router]);

  const fetchStats = async () => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('📊 Fetching stats...');
      const res = await fetch('/api/admin/dashboard/stats', {
        credentials: 'include',
        headers: {
          'Cache-Control': 'no-cache',
        },
      });
      
      console.log('📊 Response status:', res.status);
      
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      
      const data = await res.json();
      console.log('📊 Stats data:', data);
      
      if (data.success) {
        setStats(data.data);
      } else {
        setError(data.error || 'Failed to fetch stats');
      }
    } catch (error) {
      console.error('❌ Error fetching stats:', error);
      setError('Failed to load statistics');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#080A0D]">
        <div className="flex flex-col items-center gap-3">
          <Loader2 size={32} className="text-[#39FF88] animate-spin" />
          <div className="text-[#8B949E]">Loading dashboard...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#080A0D] p-4">
        <div className="bg-[#0D1117] border border-[rgba(255,255,255,0.08)] rounded-2xl p-6 md:p-8 max-w-md w-full text-center">
          <div className="text-4xl mb-4">⚠️</div>
          <h2 className="text-xl font-semibold text-[#F5F7FA] mb-2">Failed to Load Dashboard</h2>
          <p className="text-sm text-[#8B949E] mb-4">{error}</p>
          <button
            onClick={fetchStats}
            className="px-4 py-2 bg-[#39FF88] text-[#080A0D] font-medium rounded-lg hover:bg-[#39FF88]/90 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  const cards = [
    { label: 'Total Signals', value: stats.totalSignals, icon: BarChart3, color: 'text-[#39FF88]' },
    { label: 'Active Signals', value: stats.activeSignals, icon: Activity, color: 'text-[#39FF88]' },
    { label: 'Closed Signals', value: stats.closedSignals, icon: XCircle, color: 'text-[#FF4D5F]' },
    { label: 'Total Users', value: stats.totalUsers, icon: Users, color: 'text-[#8B949E]' },
  ];

  const menuItems = [
    { label: 'Signals', href: '/admin/dashboard/signals', icon: TrendingUp, desc: 'Manage signals' },
    { label: 'Users', href: '/admin/dashboard/users', icon: Users, desc: 'Manage users' },
    { label: 'Settings', href: '/admin/dashboard/settings', icon: Settings, desc: 'Site settings' },
    { label: 'Backup', href: '/admin/dashboard/backup', icon: Database, desc: 'Backup & restore' },
  ];

  return (
    <div className="min-h-screen bg-[#080A0D] p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold text-[#F5F7FA] mb-8 flex items-center gap-2">
          <LayoutDashboard size={24} className="text-[#39FF88]" />
          Dashboard
        </h1>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-6 md:mb-8">
          {cards.map((card) => {
            const Icon = card.icon;
            return (
              <div key={card.label} className="bg-[#0D1117] border border-[rgba(255,255,255,0.08)] rounded-2xl p-4 md:p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs md:text-sm text-[#8B949E]">{card.label}</p>
                    <p className="text-xl md:text-2xl font-bold text-[#F5F7FA] mt-1">{card.value}</p>
                  </div>
                  <div className={`p-2 md:p-3 rounded-lg bg-[#39FF88]/10 ${card.color}`}>
                    <Icon size={20} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Menu Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link key={item.label} href={item.href} className="block">
                <div className="bg-[#0D1117] border border-[rgba(255,255,255,0.08)] rounded-2xl p-4 md:p-6 hover:border-[#39FF88]/30 transition-all h-full">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs md:text-sm text-[#8B949E]">{item.desc}</p>
                      <p className="text-base md:text-lg font-semibold text-[#F5F7FA] mt-1">{item.label}</p>
                    </div>
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-[#39FF88]/10 rounded-lg flex items-center justify-center">
                      <Icon size={20} className="text-[#39FF88]" />
                    </div>
                  </div>
                  <p className="text-xs md:text-sm text-[#39FF88] mt-3 md:mt-4 flex items-center gap-1">
                    Manage <ArrowRight size={14} />
                  </p>
                </div>
              </Link>
            );
          })}
        </div>

        <div className="mt-6 md:mt-8">
          <a
            href="/"
            className="text-xs md:text-sm text-[#8B949E] hover:text-[#F5F7FA] transition-colors flex items-center gap-1"
          >
            <ArrowRight size={14} className="rotate-180" />
            Back to Website
          </a>
        </div>
      </div>
    </div>
  );
}
