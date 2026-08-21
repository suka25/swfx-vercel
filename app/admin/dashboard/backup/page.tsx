'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Download, 
  Upload, 
  RefreshCw, 
  Database, 
  Trash2, 
  ArrowLeft,
  CheckCircle,
  XCircle,
  Clock,
  FileJson
} from 'lucide-react';

export default function AdminBackupPage() {
  const [loading, setLoading] = useState(false);
  const [restoring, setRestoring] = useState(false);
  const [message, setMessage] = useState('');
  const [backupFiles, setBackupFiles] = useState<string[]>([]);
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
      fetchBackupFiles();
    } catch (error) {
      router.push('/admin/login');
    }
  };

  const fetchBackupFiles = async () => {
    try {
      const res = await fetch('/api/admin/backup');
      const data = await res.json();
      if (data.success) {
        setBackupFiles(data.files || []);
      }
    } catch (error) {
      console.error('Error fetching backups:', error);
    }
  };

  const handleBackup = async () => {
    setLoading(true);
    setMessage('');
    try {
      const res = await fetch('/api/admin/backup', { method: 'POST' });
      const data = await res.json();
      if (data.success) {
        setMessage(`✅ Backup created: ${data.filename}`);
        fetchBackupFiles();
      } else {
        setMessage(`❌ Backup failed: ${data.error}`);
      }
    } catch (error) {
      setMessage('❌ Network error');
    } finally {
      setLoading(false);
    }
  };

  const handleRestore = async (filename: string) => {
    if (!confirm(`Are you sure you want to restore ${filename}? This will overwrite current data.`)) return;
    
    setRestoring(true);
    setMessage('');
    try {
      const res = await fetch('/api/admin/backup', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ filename }),
      });
      const data = await res.json();
      if (data.success) {
        setMessage(`✅ Restored: ${filename}`);
        fetchBackupFiles();
      } else {
        setMessage(`❌ Restore failed: ${data.error}`);
      }
    } catch (error) {
      setMessage('❌ Network error');
    } finally {
      setRestoring(false);
    }
  };

  const handleDelete = async (filename: string) => {
    if (!confirm(`Delete backup ${filename}?`)) return;
    
    try {
      const res = await fetch(`/api/admin/backup?filename=${filename}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        setMessage(`✅ Deleted: ${filename}`);
        fetchBackupFiles();
      } else {
        setMessage(`❌ Delete failed: ${data.error}`);
      }
    } catch (error) {
      setMessage('❌ Network error');
    }
  };

  const formatDate = (filename: string) => {
    const match = filename.match(/backup-(.+)\.json/);
    if (match) {
      const dateStr = match[1].replace(/-/g, ':').replace(/T/g, ' ');
      return dateStr;
    }
    return filename;
  };

  return (
    <div className="min-h-screen bg-[#080A0D] p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-[#F5F7FA] flex items-center gap-2">
            <Database size={24} className="text-[#39FF88]" />
            Backup & Restore
          </h1>
          <a href="/admin/dashboard" className="text-xs md:text-sm text-[#8B949E] hover:text-[#F5F7FA] flex items-center gap-1">
            <ArrowLeft size={14} />
            Back to Dashboard
          </a>
        </div>

        {message && (
          <div className={`p-4 rounded-lg mb-4 flex items-center gap-2 ${
            message.includes('✅') 
              ? 'bg-[#39FF88]/10 text-[#39FF88] border border-[#39FF88]/20' 
              : 'bg-[#FF4D5F]/10 text-[#FF4D5F] border border-[#FF4D5F]/20'
          }`}>
            {message.includes('✅') ? (
              <CheckCircle size={18} />
            ) : (
              <XCircle size={18} />
            )}
            {message}
          </div>
        )}

        {/* Create Backup */}
        <div className="bg-[#0D1117] border border-[rgba(255,255,255,0.08)] rounded-2xl p-4 md:p-6 mb-6">
          <h2 className="text-lg font-semibold text-[#F5F7FA] mb-2 flex items-center gap-2">
            <Database size={20} className="text-[#39FF88]" />
            Create Backup
          </h2>
          <p className="text-sm text-[#8B949E] mb-4">
            Create a full backup of all data including users, signals, and settings.
          </p>
          <button
            onClick={handleBackup}
            disabled={loading}
            className="flex items-center gap-2 px-6 py-3 bg-[#39FF88] text-[#080A0D] font-medium rounded-lg hover:bg-[#39FF88]/90 transition-colors disabled:opacity-50 min-h-[44px]"
          >
            {loading ? (
              <>
                <RefreshCw size={18} className="animate-spin" />
                Creating...
              </>
            ) : (
              <>
                <Database size={18} />
                Create Backup
              </>
            )}
          </button>
        </div>

        {/* Backup Files */}
        <div className="bg-[#0D1117] border border-[rgba(255,255,255,0.08)] rounded-2xl p-4 md:p-6">
          <h2 className="text-lg font-semibold text-[#F5F7FA] mb-4 flex items-center gap-2">
            <Download size={20} className="text-[#39FF88]" />
            Backup Files
          </h2>
          {backupFiles.length === 0 ? (
            <p className="text-[#8B949E] flex items-center gap-2">
              <FileJson size={16} />
              No backups found. Create your first backup above.
            </p>
          ) : (
            <div className="space-y-2">
              {backupFiles.map((file) => (
                <div
                  key={file}
                  className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 bg-[#121820] rounded-lg border border-[rgba(255,255,255,0.05)] hover:border-[rgba(255,255,255,0.1)] transition-colors gap-3"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <FileJson size={16} className="text-[#39FF88] flex-shrink-0" />
                    <div className="min-w-0">
                      <span className="text-sm text-[#F5F7FA]">{formatDate(file)}</span>
                      <p className="text-xs text-[#8B949E] truncate">{file}</p>
                    </div>
                  </div>
                  <div className="flex gap-2 w-full sm:w-auto">
                    <button
                      onClick={() => handleRestore(file)}
                      disabled={restoring}
                      className="flex-1 sm:flex-none px-3 py-1.5 bg-[#39FF88]/20 text-[#39FF88] rounded-lg hover:bg-[#39FF88]/30 text-sm disabled:opacity-50 flex items-center gap-1 justify-center min-h-[36px]"
                    >
                      <Upload size={14} />
                      Restore
                    </button>
                    <button
                      onClick={() => handleDelete(file)}
                      className="flex-1 sm:flex-none px-3 py-1.5 bg-[#FF4D5F]/20 text-[#FF4D5F] rounded-lg hover:bg-[#FF4D5F]/30 text-sm flex items-center gap-1 justify-center min-h-[36px]"
                    >
                      <Trash2 size={14} />
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
