import { useEffect, useState } from 'react';
import { Plus, MessageSquare, Loader2, X, Send } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../context/AuthContext';
import { Complaint } from '../../lib/types';

const categories = ['general', 'infrastructure', 'security', 'maintenance', 'billing', 'other'] as const;

export default function MemberComplaints() {
  const { profile } = useAuth();
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title: '', description: '', category: 'general' as typeof categories[number] });
  const [submitting, setSubmitting] = useState(false);

  async function load() {
    const { data } = await supabase
      .from('complaints')
      .select('*')
      .eq('member_id', profile!.id)
      .order('created_at', { ascending: false });
    setComplaints(data ?? []);
    setLoading(false);
  }

  useEffect(() => { if (profile) load(); }, [profile]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    await supabase.from('complaints').insert({ ...form, member_id: profile!.id });
    setForm({ title: '', description: '', category: 'general' });
    setShowForm(false);
    setSubmitting(false);
    load();
  }

  const statusBadge = (s: Complaint['status']) => ({
    open: 'badge-open',
    in_progress: 'badge-progress',
    resolved: 'badge-resolved',
    closed: 'badge-resolved',
  }[s]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">My Complaints</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Track and raise complaints</p>
        </div>
        <button onClick={() => setShowForm(true)} className="btn-primary text-sm">
          <Plus className="w-4 h-4" /> New Complaint
        </button>
      </div>

      {/* New Complaint Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-lg">
            <div className="flex items-center justify-between p-6 border-b border-gray-100 dark:border-gray-700">
              <h3 className="font-bold text-gray-900 dark:text-white">New Complaint</h3>
              <button onClick={() => setShowForm(false)} className="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1.5">Title *</label>
                <input value={form.title} onChange={e => setForm(p => ({ ...p, title: e.target.value }))} required className="input-field" placeholder="Brief description of issue" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1.5">Category</label>
                <select value={form.category} onChange={e => setForm(p => ({ ...p, category: e.target.value as typeof categories[number] }))} className="input-field">
                  {categories.map(c => <option key={c} value={c} className="capitalize">{c.charAt(0).toUpperCase() + c.slice(1)}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1.5">Description *</label>
                <textarea value={form.description} onChange={e => setForm(p => ({ ...p, description: e.target.value }))} required rows={4} className="input-field resize-none" placeholder="Detailed description of the issue..." />
              </div>
              <div className="flex gap-3 pt-2">
                <button type="submit" disabled={submitting} className="btn-primary flex-1 justify-center">
                  {submitting ? <><Loader2 className="w-4 h-4 animate-spin" /> Submitting...</> : <><Send className="w-4 h-4" /> Submit</>}
                </button>
                <button type="button" onClick={() => setShowForm(false)} className="btn-outline flex-1 justify-center">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {loading ? (
        <div className="flex justify-center py-16"><Loader2 className="w-8 h-8 text-primary-900 animate-spin" /></div>
      ) : complaints.length === 0 ? (
        <div className="card text-center py-16">
          <MessageSquare className="w-12 h-12 mx-auto mb-3 text-gray-200 dark:text-gray-700" />
          <p className="text-gray-400 dark:text-gray-500">No complaints yet. Click "New Complaint" to raise one.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {complaints.map(c => (
            <div key={c.id} className="card hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-2">
                    <span className={statusBadge(c.status)}>{c.status.replace('_', ' ')}</span>
                    <span className="text-xs text-gray-400 dark:text-gray-500 bg-gray-100 dark:bg-gray-700 px-2 py-0.5 rounded-full capitalize">{c.category}</span>
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">{c.title}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">{c.description}</p>
                  {c.admin_notes && (
                    <div className="mt-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 rounded-lg p-3">
                      <p className="text-xs font-medium text-blue-700 dark:text-blue-300">Admin Response:</p>
                      <p className="text-sm text-blue-600 dark:text-blue-400 mt-1">{c.admin_notes}</p>
                    </div>
                  )}
                </div>
                <p className="text-xs text-gray-400 dark:text-gray-500 flex-shrink-0">{new Date(c.created_at).toLocaleDateString()}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
