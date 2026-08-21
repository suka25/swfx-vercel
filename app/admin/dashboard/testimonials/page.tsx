'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  MessageCircle, 
  Plus, 
  Edit, 
  Trash2, 
  ArrowLeft,
  CheckCircle,
  XCircle,
  Star,
  User,
  Calendar,
  Loader2,
  Save,
  X
} from 'lucide-react';

interface Testimonial {
  id: string;
  name: string;
  role: string;
  quote: string;
  rating: number;
  image: string;
  created_at: string;
  active: boolean;
}

export default function AdminTestimonialsPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<Testimonial | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    quote: '',
    rating: 5,
    image: '',
    active: true,
  });
  const [saving, setSaving] = useState(false);
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
      fetchTestimonials();
    } catch (error) {
      router.push('/admin/login');
    }
  };

  const fetchTestimonials = async () => {
    try {
      const res = await fetch('/api/admin/testimonials');
      const data = await res.json();
      if (data.success) {
        setTestimonials(data.data);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const url = editing 
        ? `/api/admin/testimonials/${editing.id}` 
        : '/api/admin/testimonials';
      const method = editing ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (data.success) {
        setShowModal(false);
        setEditing(null);
        setFormData({
          name: '',
          role: '',
          quote: '',
          rating: 5,
          image: '',
          active: true,
        });
        fetchTestimonials();
      } else {
        alert('Error saving testimonial: ' + data.error);
      }
    } catch (error) {
      alert('Error saving testimonial');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this testimonial?')) return;

    try {
      const res = await fetch(`/api/admin/testimonials/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        fetchTestimonials();
      }
    } catch (error) {
      alert('Error deleting testimonial');
    }
  };

  const handleEdit = (testimonial: Testimonial) => {
    setEditing(testimonial);
    setFormData({
      name: testimonial.name,
      role: testimonial.role,
      quote: testimonial.quote,
      rating: testimonial.rating,
      image: testimonial.image,
      active: testimonial.active,
    });
    setShowModal(true);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star key={i} size={14} className={`${i < rating ? 'text-[#F5A623] fill-[#F5A623]' : 'text-[#4B5563]'}`} />
    ));
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#080A0D]">
        <Loader2 size={32} className="text-[#39FF88] animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#080A0D] p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-[#F5F7FA] flex items-center gap-2">
            <MessageCircle size={24} className="text-[#39FF88]" />
            Testimonials
          </h1>
          <div className="flex gap-2">
            <button
              onClick={() => {
                setEditing(null);
                setFormData({
                  name: '',
                  role: '',
                  quote: '',
                  rating: 5,
                  image: '',
                  active: true,
                });
                setShowModal(true);
              }}
              className="px-4 py-2 bg-[#39FF88] text-[#080A0D] font-medium rounded-lg hover:bg-[#39FF88]/90 transition-colors flex items-center gap-2 min-h-[44px]"
            >
              <Plus size={18} />
              Add Testimonial
            </button>
            <a href="/admin/dashboard" className="text-xs md:text-sm text-[#8B949E] hover:text-[#F5F7FA] flex items-center gap-1 min-h-[44px] px-4 py-2 bg-white/5 rounded-lg">
              <ArrowLeft size={14} />
              Back
            </a>
          </div>
        </div>

        {/* List */}
        <div className="bg-[#0D1117] border border-[rgba(255,255,255,0.08)] rounded-2xl overflow-hidden">
          {testimonials.length === 0 ? (
            <div className="p-8 text-center text-[#8B949E]">
              <MessageCircle className="mx-auto mb-2" size={32} />
              <p className="text-lg">No testimonials yet</p>
              <p className="text-sm mt-2">Add your first testimonial above</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[#121820]">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-[#8B949E] uppercase">Name</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-[#8B949E] uppercase">Role</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-[#8B949E] uppercase">Quote</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-[#8B949E] uppercase">Rating</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-[#8B949E] uppercase">Status</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-[#8B949E] uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[rgba(255,255,255,0.08)]">
                  {testimonials.map((testimonial) => (
                    <tr key={testimonial.id}>
                      <td className="px-4 py-3 text-sm text-[#F5F7FA] flex items-center gap-2">
                        <img
                          src={testimonial.image}
                          alt={testimonial.name}
                          className="w-8 h-8 rounded-full"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(testimonial.name)}&background=39FF88&color=080A0D&size=32`;
                          }}
                        />
                        {testimonial.name}
                      </td>
                      <td className="px-4 py-3 text-sm text-[#8B949E]">{testimonial.role}</td>
                      <td className="px-4 py-3 text-sm text-[#8B949E] max-w-[200px] truncate">{testimonial.quote}</td>
                      <td className="px-4 py-3 text-sm">
                        <div className="flex">{renderStars(testimonial.rating)}</div>
                      </td>
                      <td className="px-4 py-3 text-sm">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          testimonial.active 
                            ? 'bg-[#39FF88]/20 text-[#39FF88]' 
                            : 'bg-[#4B5563]/20 text-[#8B949E]'
                        }`}>
                          {testimonial.active ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm">
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEdit(testimonial)}
                            className="px-3 py-1 bg-[#F5A623]/20 text-[#F5A623] rounded-lg hover:bg-[#F5A623]/30 text-xs flex items-center gap-1"
                          >
                            <Edit size={12} />
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(testimonial.id)}
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

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
          <div className="bg-[#0D1117] border border-[rgba(255,255,255,0.08)] rounded-2xl p-6 max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-[#F5F7FA] flex items-center gap-2">
                <MessageCircle size={20} className="text-accent-bullish" />
                {editing ? 'Edit Testimonial' : 'Add Testimonial'}
              </h3>
              <button
                onClick={() => {
                  setShowModal(false);
                  setEditing(null);
                }}
                className="p-1 hover:bg-white/5 rounded-lg transition-colors"
              >
                <X size={20} className="text-text-muted" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#8B949E] mb-1">Name *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 bg-[#121820] border border-[rgba(255,255,255,0.08)] rounded-lg text-[#F5F7FA] focus:outline-none focus:border-[#39FF88] min-h-[44px]"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#8B949E] mb-1">Role</label>
                <input
                  type="text"
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  placeholder="Full-Time Trader"
                  className="w-full px-4 py-2 bg-[#121820] border border-[rgba(255,255,255,0.08)] rounded-lg text-[#F5F7FA] focus:outline-none focus:border-[#39FF88] min-h-[44px]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#8B949E] mb-1">Quote *</label>
                <textarea
                  value={formData.quote}
                  onChange={(e) => setFormData({ ...formData, quote: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-2 bg-[#121820] border border-[rgba(255,255,255,0.08)] rounded-lg text-[#F5F7FA] focus:outline-none focus:border-[#39FF88]"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#8B949E] mb-1">Rating</label>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <button
                      key={rating}
                      type="button"
                      onClick={() => setFormData({ ...formData, rating })}
                      className="p-1 hover:scale-110 transition-transform"
                    >
                      <Star
                        size={24}
                        className={`${rating <= formData.rating ? 'text-[#F5A623] fill-[#F5A623]' : 'text-[#4B5563]'}`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#8B949E] mb-1">Image URL</label>
                <input
                  type="url"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  placeholder="https://example.com/image.jpg"
                  className="w-full px-4 py-2 bg-[#121820] border border-[rgba(255,255,255,0.08)] rounded-lg text-[#F5F7FA] focus:outline-none focus:border-[#39FF88] min-h-[44px]"
                />
                <p className="text-xs text-text-muted mt-1">
                  Leave empty for auto-generated avatar
                </p>
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-[#8B949E]">
                  <input
                    type="checkbox"
                    checked={formData.active}
                    onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
                    className="w-4 h-4 rounded border-[rgba(255,255,255,0.08)] bg-[#121820] text-[#39FF88] focus:ring-[#39FF88] focus:ring-offset-0"
                  />
                  Active (show on website)
                </label>
              </div>

              <button
                type="submit"
                disabled={saving}
                className="w-full py-3 bg-[#39FF88] text-[#080A0D] font-medium rounded-lg hover:bg-[#39FF88]/90 transition-colors disabled:opacity-50 min-h-[44px] flex items-center justify-center gap-2"
              >
                {saving ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save size={18} />
                    Save Testimonial
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
