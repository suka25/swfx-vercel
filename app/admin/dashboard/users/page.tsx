'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Users, User, Calendar, Shield, ArrowLeft } from 'lucide-react';

interface User {
  id: string;
  username: string;
  role: string;
  created_at: string;
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const res = await fetch('/api/admin/check');
      const data = await res.json();
      if (!data.authenticated) {
        router.push('/admin/login');
        return;
      }
      fetchUsers();
    } catch (error) {
      router.push('/admin/login');
    }
  };

  const fetchUsers = async () => {
    try {
      const res = await fetch('/api/admin/users');
      const data = await res.json();
      if (data.success) {
        setUsers(data.data);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#080A0D]">
        <div className="text-[#8B949E]">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#080A0D] p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-[#F5F7FA] flex items-center gap-2">
            <Users size={24} className="text-[#39FF88]" />
            Users
          </h1>
          <a href="/admin/dashboard" className="text-xs md:text-sm text-[#8B949E] hover:text-[#F5F7FA] flex items-center gap-1">
            <ArrowLeft size={14} />
            Back to Dashboard
          </a>
        </div>

        <div className="bg-[#0D1117] border border-[rgba(255,255,255,0.08)] rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#121820]">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-[#8B949E] uppercase">Username</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-[#8B949E] uppercase">Role</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-[#8B949E] uppercase">Created</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[rgba(255,255,255,0.08)]">
                {users.map((user) => (
                  <tr key={user.id}>
                    <td className="px-4 py-3 text-sm text-[#F5F7FA] flex items-center gap-2">
                      <User size={16} className="text-[#8B949E]" />
                      {user.username}
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <span className="px-2 py-1 rounded-full text-xs font-medium bg-[#39FF88]/20 text-[#39FF88] flex items-center gap-1 w-fit">
                        <Shield size={12} />
                        {user.role}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-[#8B949E] flex items-center gap-2">
                      <Calendar size={14} />
                      {new Date(user.created_at).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
