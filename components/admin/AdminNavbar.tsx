'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { 
  LayoutDashboard, 
  TrendingUp, 
  Users, 
  Settings, 
  LogOut,
  Home,
  Shield,
  Database,
  MessageCircle
} from 'lucide-react';

export function AdminNavbar() {
  const pathname = usePathname();
  const router = useRouter();

  const menuItems = [
    { label: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
    { label: 'Signals', href: '/admin/dashboard/signals', icon: TrendingUp },
    { label: 'Users', href: '/admin/dashboard/users', icon: Users },
    { label: 'Testimonials', href: '/admin/dashboard/testimonials', icon: MessageCircle },
    { label: 'Settings', href: '/admin/dashboard/settings', icon: Settings },
    { label: 'Backup', href: '/admin/dashboard/backup', icon: Database },
  ];

  const handleLogout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' });
    router.push('/admin/login');
  };

  const isActive = (href: string) => {
    if (href === '/admin/dashboard' && pathname === '/admin/dashboard') return true;
    if (href !== '/admin/dashboard' && pathname.startsWith(href)) return true;
    return false;
  };

  return (
    <nav className="bg-[#0D1117] border-b border-[rgba(255,255,255,0.08)] sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <span className="text-xl font-bold text-[#39FF88]">SWFX</span>
            <span className="text-xs text-[#8B949E] bg-[#121820] px-2 py-0.5 rounded flex items-center gap-1">
              <Shield size={12} />
              Admin
            </span>
            <div className="h-6 w-px bg-[rgba(255,255,255,0.08)]" />
            <Link href="/" className="text-xs text-[#8B949E] hover:text-[#F5F7FA] transition-colors flex items-center gap-1">
              <Home size={14} />
              View Site
            </Link>
          </div>

          <div className="hidden md:flex items-center gap-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`
                    flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
                    ${isActive(item.href) 
                      ? 'bg-[#39FF88]/10 text-[#39FF88]' 
                      : 'text-[#8B949E] hover:text-[#F5F7FA] hover:bg-white/5'
                    }
                  `}
                >
                  <Icon size={18} />
                  {item.label}
                </Link>
              );
            })}
          </div>

          <div className="md:hidden flex items-center gap-1 overflow-x-auto">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`
                    flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all duration-200
                    ${isActive(item.href) 
                      ? 'bg-[#39FF88]/10 text-[#39FF88]' 
                      : 'text-[#8B949E] hover:text-[#F5F7FA] hover:bg-white/5'
                    }
                  `}
                >
                  <Icon size={16} />
                  {item.label}
                </Link>
              );
            })}
          </div>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-[#FF4D5F] hover:bg-[#FF4D5F]/10 transition-all duration-200"
          >
            <LogOut size={18} />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </div>
    </nav>
  );
}
