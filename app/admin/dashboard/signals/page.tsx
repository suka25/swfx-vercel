'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  TrendingUp, 
  Plus, 
  Edit, 
  Trash2, 
  ArrowLeft,
  CheckCircle,
  XCircle,
  Clock,
  Calendar,
  User,
  BarChart3,
  FileText,
  DollarSign,
  Target,
  Shield,
  Save,
  X
} from 'lucide-react';

interface Signal {
  id: string;
  title: string;
  pair: string;
  timeframe: string;
  direction: string;
  entry: number;
  sl: number;
  tp1: number;
  tp2: number;
  tp3: number;
  rr: string;
  description: string;
  image_url: string;
  status: string;
  created_at: string;
  journal?: {
    exitPrice: number;
    result: 'win' | 'loss';
    profit: number;
    notes: string;
    closedAt: string;
    strategy: string;
  };
}

export default function AdminSignalsPage() {
  const [signals, setSignals] = useState<Signal[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Signal | null>(null);
  const [showJournalModal, setShowJournalModal] = useState(false);
  const [selectedSignal, setSelectedSignal] = useState<Signal | null>(null);
  const [journalForm, setJournalForm] = useState({
    exitPrice: '',
    result: 'win',
    profit: '',
    notes: '',
    strategy: '',
  });
  const [formData, setFormData] = useState({
    title: '',
    pair: '',
    timeframe: '',
    direction: 'Neutral',
    entry: '',
    sl: '',
    tp1: '',
    tp2: '',
    tp3: '',
    rr: '',
    description: '',
    image_url: '',
    status: 'Active',
  });
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
      fetchSignals();
    } catch (error) {
      router.push('/admin/login');
    }
  };

  const fetchSignals = async () => {
    try {
      const res = await fetch('/api/admin/signals');
      const data = await res.json();
      if (data.success) {
        setSignals(data.data);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const url = editing 
      ? `/api/admin/signals/${editing.id}` 
      : '/api/admin/signals';
    const method = editing ? 'PUT' : 'POST';

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          entry: parseFloat(formData.entry) || null,
          sl: parseFloat(formData.sl) || null,
          tp1: parseFloat(formData.tp1) || null,
          tp2: parseFloat(formData.tp2) || null,
          tp3: parseFloat(formData.tp3) || null,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setEditing(null);
        setFormData({
          title: '',
          pair: '',
          timeframe: '',
          direction: 'Neutral',
          entry: '',
          sl: '',
          tp1: '',
          tp2: '',
          tp3: '',
          rr: '',
          description: '',
          image_url: '',
          status: 'Active',
        });
        fetchSignals();
      }
    } catch (error) {
      alert('Error saving signal');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this signal?')) return;

    try {
      const res = await fetch(`/api/admin/signals/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        fetchSignals();
      }
    } catch (error) {
      alert('Error deleting signal');
    }
  };

  const handleEdit = (signal: Signal) => {
    setEditing(signal);
    setFormData({
      title: signal.title,
      pair: signal.pair,
      timeframe: signal.timeframe || '',
      direction: signal.direction || 'Neutral',
      entry: signal.entry?.toString() || '',
      sl: signal.sl?.toString() || '',
      tp1: signal.tp1?.toString() || '',
      tp2: signal.tp2?.toString() || '',
      tp3: signal.tp3?.toString() || '',
      rr: signal.rr || '',
      description: signal.description || '',
      image_url: signal.image_url || '',
      status: signal.status || 'Active',
    });
  };

  const handleJournalSubmit = async () => {
    if (!selectedSignal) return;

    try {
      const res = await fetch(`/api/admin/signals/${selectedSignal.id}/journal`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          exitPrice: parseFloat(journalForm.exitPrice) || selectedSignal.entry,
          result: journalForm.result as 'win' | 'loss',
          profit: parseFloat(journalForm.profit) || 0,
          notes: journalForm.notes,
          strategy: journalForm.strategy || 'N/A',
          closedAt: new Date().toISOString(),
        }),
      });

      const data = await res.json();
      if (data.success) {
        setShowJournalModal(false);
        setSelectedSignal(null);
        setJournalForm({
          exitPrice: '',
          result: 'win',
          profit: '',
          notes: '',
          strategy: '',
        });
        fetchSignals();
        alert('✅ Journal updated successfully!');
      } else {
        alert('❌ Error updating journal: ' + data.error);
      }
    } catch (error) {
      alert('❌ Error updating journal');
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
            <TrendingUp size={24} className="text-[#39FF88]" />
            Signals
          </h1>
          <a href="/admin/dashboard" className="text-xs md:text-sm text-[#8B949E] hover:text-[#F5F7FA] flex items-center gap-1">
            <ArrowLeft size={14} />
            Back to Dashboard
          </a>
        </div>

        {/* Form */}
        <div className="bg-[#0D1117] border border-[rgba(255,255,255,0.08)] rounded-2xl p-4 md:p-6 mb-6">
          <h2 className="text-lg font-semibold text-[#F5F7FA] mb-4 flex items-center gap-2">
            {editing ? (
              <>
                <Edit size={18} className="text-[#F5A623]" />
                Edit Signal
              </>
            ) : (
              <>
                <Plus size={18} className="text-[#39FF88]" />
                Create New Signal
              </>
            )}
          </h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-[#8B949E] mb-1">Title *</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-4 py-2 bg-[#121820] border border-[rgba(255,255,255,0.08)] rounded-lg text-[#F5F7FA] focus:outline-none focus:border-[#39FF88] min-h-[44px]"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#8B949E] mb-1">Pair *</label>
              <input
                type="text"
                value={formData.pair}
                onChange={(e) => setFormData({ ...formData, pair: e.target.value })}
                placeholder="EURUSD"
                className="w-full px-4 py-2 bg-[#121820] border border-[rgba(255,255,255,0.08)] rounded-lg text-[#F5F7FA] focus:outline-none focus:border-[#39FF88] min-h-[44px]"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#8B949E] mb-1">Timeframe</label>
              <input
                type="text"
                value={formData.timeframe}
                onChange={(e) => setFormData({ ...formData, timeframe: e.target.value })}
                placeholder="H1, M15, 4H"
                className="w-full px-4 py-2 bg-[#121820] border border-[rgba(255,255,255,0.08)] rounded-lg text-[#F5F7FA] focus:outline-none focus:border-[#39FF88] min-h-[44px]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#8B949E] mb-1">Direction</label>
              <select
                value={formData.direction}
                onChange={(e) => setFormData({ ...formData, direction: e.target.value })}
                className="w-full px-4 py-2 bg-[#121820] border border-[rgba(255,255,255,0.08)] rounded-lg text-[#F5F7FA] focus:outline-none focus:border-[#39FF88] min-h-[44px]"
              >
                <option value="Neutral">Neutral</option>
                <option value="Buy">Buy</option>
                <option value="Sell">Sell</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#8B949E] mb-1">Entry</label>
              <input
                type="number"
                step="any"
                value={formData.entry}
                onChange={(e) => setFormData({ ...formData, entry: e.target.value })}
                className="w-full px-4 py-2 bg-[#121820] border border-[rgba(255,255,255,0.08)] rounded-lg text-[#F5F7FA] focus:outline-none focus:border-[#39FF88] min-h-[44px]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#8B949E] mb-1">SL</label>
              <input
                type="number"
                step="any"
                value={formData.sl}
                onChange={(e) => setFormData({ ...formData, sl: e.target.value })}
                className="w-full px-4 py-2 bg-[#121820] border border-[rgba(255,255,255,0.08)] rounded-lg text-[#F5F7FA] focus:outline-none focus:border-[#39FF88] min-h-[44px]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#8B949E] mb-1">TP1</label>
              <input
                type="number"
                step="any"
                value={formData.tp1}
                onChange={(e) => setFormData({ ...formData, tp1: e.target.value })}
                className="w-full px-4 py-2 bg-[#121820] border border-[rgba(255,255,255,0.08)] rounded-lg text-[#F5F7FA] focus:outline-none focus:border-[#39FF88] min-h-[44px]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#8B949E] mb-1">TP2</label>
              <input
                type="number"
                step="any"
                value={formData.tp2}
                onChange={(e) => setFormData({ ...formData, tp2: e.target.value })}
                className="w-full px-4 py-2 bg-[#121820] border border-[rgba(255,255,255,0.08)] rounded-lg text-[#F5F7FA] focus:outline-none focus:border-[#39FF88] min-h-[44px]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#8B949E] mb-1">TP3</label>
              <input
                type="number"
                step="any"
                value={formData.tp3}
                onChange={(e) => setFormData({ ...formData, tp3: e.target.value })}
                className="w-full px-4 py-2 bg-[#121820] border border-[rgba(255,255,255,0.08)] rounded-lg text-[#F5F7FA] focus:outline-none focus:border-[#39FF88] min-h-[44px]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#8B949E] mb-1">RR</label>
              <input
                type="text"
                value={formData.rr}
                onChange={(e) => setFormData({ ...formData, rr: e.target.value })}
                placeholder="1:3"
                className="w-full px-4 py-2 bg-[#121820] border border-[rgba(255,255,255,0.08)] rounded-lg text-[#F5F7FA] focus:outline-none focus:border-[#39FF88] min-h-[44px]"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-[#8B949E] mb-1">Image URL</label>
              <input
                type="url"
                value={formData.image_url}
                onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                placeholder="https://example.com/image.png"
                className="w-full px-4 py-2 bg-[#121820] border border-[rgba(255,255,255,0.08)] rounded-lg text-[#F5F7FA] focus:outline-none focus:border-[#39FF88] min-h-[44px]"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-[#8B949E] mb-1">Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
                className="w-full px-4 py-2 bg-[#121820] border border-[rgba(255,255,255,0.08)] rounded-lg text-[#F5F7FA] focus:outline-none focus:border-[#39FF88]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#8B949E] mb-1">Status</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="w-full px-4 py-2 bg-[#121820] border border-[rgba(255,255,255,0.08)] rounded-lg text-[#F5F7FA] focus:outline-none focus:border-[#39FF88] min-h-[44px]"
              >
                <option value="Active">Active</option>
                <option value="Closed">Closed</option>
                <option value="Pending">Pending</option>
              </select>
            </div>

            <div className="flex items-end gap-4">
              {editing && (
                <button
                  type="button"
                  onClick={() => {
                    setEditing(null);
                    setFormData({
                      title: '',
                      pair: '',
                      timeframe: '',
                      direction: 'Neutral',
                      entry: '',
                      sl: '',
                      tp1: '',
                      tp2: '',
                      tp3: '',
                      rr: '',
                      description: '',
                      image_url: '',
                      status: 'Active',
                    });
                  }}
                  className="px-4 py-2 bg-[#4B5563]/20 text-[#8B949E] rounded-lg hover:bg-[#4B5563]/30 min-h-[44px]"
                >
                  Cancel
                </button>
              )}
              <button
                type="submit"
                className="px-6 py-2 bg-[#39FF88] text-[#080A0D] font-medium rounded-lg hover:bg-[#39FF88]/90 min-h-[44px] flex items-center gap-2"
              >
                {editing ? (
                  <>
                    <Edit size={16} />
                    Update Signal
                  </>
                ) : (
                  <>
                    <Plus size={16} />
                    Create Signal
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Signal List */}
        <div className="bg-[#0D1117] border border-[rgba(255,255,255,0.08)] rounded-2xl overflow-hidden">
          {signals.length === 0 ? (
            <div className="p-8 text-center text-[#8B949E]">
              <BarChart3 className="mx-auto mb-2" size={32} />
              <p className="text-lg">No signals yet</p>
              <p className="text-sm mt-2">Create your first signal above</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[#121820]">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-[#8B949E] uppercase">Title</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-[#8B949E] uppercase">Pair</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-[#8B949E] uppercase">Direction</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-[#8B949E] uppercase">Status</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-[#8B949E] uppercase">Journal</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-[#8B949E] uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[rgba(255,255,255,0.08)]">
                  {signals.map((signal) => (
                    <tr key={signal.id}>
                      <td className="px-4 py-3 text-sm text-[#F5F7FA]">{signal.title}</td>
                      <td className="px-4 py-3 text-sm text-[#8B949E]">{signal.pair}</td>
                      <td className="px-4 py-3 text-sm">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          signal.direction === 'Buy' ? 'bg-[#39FF88]/20 text-[#39FF88]' :
                          signal.direction === 'Sell' ? 'bg-[#FF4D5F]/20 text-[#FF4D5F]' :
                          'bg-[#4B5563]/20 text-[#8B949E]'
                        }`}>
                          {signal.direction || 'Neutral'}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          signal.status === 'Active' ? 'bg-[#39FF88]/20 text-[#39FF88]' :
                          signal.status === 'Closed' ? 'bg-[#4B5563]/20 text-[#8B949E]' :
                          'bg-[#F5A623]/20 text-[#F5A623]'
                        }`}>
                          {signal.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm">
                        {signal.journal ? (
                          <span className={`px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${
                            signal.journal.result === 'win' 
                              ? 'bg-[#39FF88]/20 text-[#39FF88]' 
                              : 'bg-[#FF4D5F]/20 text-[#FF4D5F]'
                          }`}>
                            {signal.journal.result === 'win' ? '✅' : '❌'} 
                            ${signal.journal.profit.toFixed(2)}
                          </span>
                        ) : (
                          <span className="text-xs text-text-muted">—</span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-sm">
                        <div className="flex flex-wrap gap-2">
                          {signal.status !== 'Closed' && (
                            <button
                              onClick={() => {
                                setSelectedSignal(signal);
                                setShowJournalModal(true);
                              }}
                              className="px-3 py-1 bg-[#39FF88]/20 text-[#39FF88] rounded-lg hover:bg-[#39FF88]/30 text-xs flex items-center gap-1"
                            >
                              <FileText size={12} />
                              Journal
                            </button>
                          )}
                          <button
                            onClick={() => handleEdit(signal)}
                            className="px-3 py-1 bg-[#F5A623]/20 text-[#F5A623] rounded-lg hover:bg-[#F5A623]/30 text-xs flex items-center gap-1"
                          >
                            <Edit size={12} />
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(signal.id)}
                            className="px-3 py-1 bg-[#FF4D5F]/20 text-[#FF4D5F] rounded-lg hover:bg-[#FF4D5F]/30 text-xs flex items-center gap-1"
                          >
                            <Trash2 size={12} />
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Journal Modal */}
      {showJournalModal && selectedSignal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
          <div className="bg-[#0D1117] border border-[rgba(255,255,255,0.08)] rounded-2xl p-6 max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-[#F5F7FA] flex items-center gap-2">
                <FileText size={20} className="text-accent-bullish" />
                Journal Entry
              </h3>
              <button
                onClick={() => {
                  setShowJournalModal(false);
                  setSelectedSignal(null);
                  setJournalForm({
                    exitPrice: '',
                    result: 'win',
                    profit: '',
                    notes: '',
                    strategy: '',
                  });
                }}
                className="p-1 hover:bg-white/5 rounded-lg transition-colors"
              >
                <X size={20} className="text-text-muted" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="bg-[#121820] rounded-lg p-3">
                <p className="text-xs text-text-muted">Signal</p>
                <p className="text-sm font-medium text-text-primary">{selectedSignal.title}</p>
                <p className="text-xs text-text-secondary">{selectedSignal.pair} • {selectedSignal.direction} • Entry: {selectedSignal.entry}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#8B949E] mb-1">Exit Price</label>
                <input
                  type="number"
                  step="any"
                  value={journalForm.exitPrice}
                  onChange={(e) => setJournalForm({ ...journalForm, exitPrice: e.target.value })}
                  placeholder={selectedSignal.entry.toString()}
                  className="w-full px-4 py-2 bg-[#121820] border border-[rgba(255,255,255,0.08)] rounded-lg text-[#F5F7FA] focus:outline-none focus:border-[#39FF88] min-h-[44px]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#8B949E] mb-1">Result</label>
                <select
                  value={journalForm.result}
                  onChange={(e) => setJournalForm({ ...journalForm, result: e.target.value })}
                  className="w-full px-4 py-2 bg-[#121820] border border-[rgba(255,255,255,0.08)] rounded-lg text-[#F5F7FA] focus:outline-none focus:border-[#39FF88] min-h-[44px]"
                >
                  <option value="win">✅ Win</option>
                  <option value="loss">❌ Loss</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#8B949E] mb-1">Profit / Loss ($)</label>
                <input
                  type="number"
                  step="any"
                  value={journalForm.profit}
                  onChange={(e) => setJournalForm({ ...journalForm, profit: e.target.value })}
                  placeholder="0.00"
                  className="w-full px-4 py-2 bg-[#121820] border border-[rgba(255,255,255,0.08)] rounded-lg text-[#F5F7FA] focus:outline-none focus:border-[#39FF88] min-h-[44px]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#8B949E] mb-1">Strategy</label>
                <input
                  type="text"
                  value={journalForm.strategy}
                  onChange={(e) => setJournalForm({ ...journalForm, strategy: e.target.value })}
                  placeholder="e.g., Breakout Trading"
                  className="w-full px-4 py-2 bg-[#121820] border border-[rgba(255,255,255,0.08)] rounded-lg text-[#F5F7FA] focus:outline-none focus:border-[#39FF88] min-h-[44px]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#8B949E] mb-1">Notes</label>
                <textarea
                  value={journalForm.notes}
                  onChange={(e) => setJournalForm({ ...journalForm, notes: e.target.value })}
                  rows={3}
                  placeholder="Trading notes..."
                  className="w-full px-4 py-2 bg-[#121820] border border-[rgba(255,255,255,0.08)] rounded-lg text-[#F5F7FA] focus:outline-none focus:border-[#39FF88]"
                />
              </div>

              <button
                onClick={handleJournalSubmit}
                className="w-full py-3 bg-[#39FF88] text-[#080A0D] font-medium rounded-lg hover:bg-[#39FF88]/90 transition-colors min-h-[44px] flex items-center justify-center gap-2"
              >
                <Save size={18} />
                Save Journal Entry
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
