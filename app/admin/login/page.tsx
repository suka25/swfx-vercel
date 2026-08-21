'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Shield, User, Lock, ArrowRight, AlertCircle, Loader2 } from 'lucide-react';

export default function AdminLoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch('/api/admin/check', {
          credentials: 'include',
        });
        const data = await res.json();
        if (data.authenticated) {
          router.push('/admin/dashboard');
        }
      } catch (error) {
        // Not logged in
      }
    };
    checkAuth();
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
        credentials: 'include',
      });

      const data = await res.json();

      if (data.success) {
        router.push('/admin/dashboard');
      } else {
        setError('Invalid credentials. Please try again.');
      }
    } catch (error) {
      setError('Network error. Please check your connection.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#080A0D] p-4">
      <div className="w-full max-w-md p-6 md:p-8 bg-[#0D1117] rounded-2xl border border-[rgba(255,255,255,0.08)]">
        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto rounded-full bg-[#39FF88]/10 flex items-center justify-center mb-4">
            <Shield size={32} className="text-[#39FF88]" />
          </div>
          <h1 className="text-2xl font-bold text-[#F5F7FA]">Admin Login</h1>
          <p className="text-sm text-[#8B949E] mt-2">Enter your credentials to access the dashboard</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[#8B949E] mb-1">
              Username
            </label>
            <div className="relative">
              <User size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#4B5563]" />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-[#121820] border border-[rgba(255,255,255,0.08)] rounded-lg text-[#F5F7FA] focus:outline-none focus:border-[#39FF88] min-h-[44px]"
                placeholder="Enter username"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-[#8B949E] mb-1">
              Password
            </label>
            <div className="relative">
              <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#4B5563]" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-[#121820] border border-[rgba(255,255,255,0.08)] rounded-lg text-[#F5F7FA] focus:outline-none focus:border-[#39FF88] min-h-[44px]"
                placeholder="Enter password"
                required
              />
            </div>
          </div>

          {error && (
            <div className="flex items-center gap-2 text-sm text-[#FF4D5F] bg-[#FF4D5F]/10 p-3 rounded-lg border border-[#FF4D5F]/20">
              <AlertCircle size={16} />
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-[#39FF88] text-[#080A0D] font-medium rounded-lg hover:bg-[#39FF88]/90 transition-colors disabled:opacity-50 min-h-[44px] flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                Logging in...
              </>
            ) : (
              <>
                Login
                <ArrowRight size={18} />
              </>
            )}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-xs text-[#4B5563]">
            Secure admin access only
          </p>
        </div>
      </div>
    </div>
  );
}
