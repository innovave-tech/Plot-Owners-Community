import { useEffect, useState } from 'react';
import { Plus, Trash2, X, Save, Loader2, Bell, Pin } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../context/AuthContext';
import { Notice } from '../../lib/types';

export default function NoticesAdmin() {
  const { user } = useAuth();
  const [notices, setNotices] = useState<Notice[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title: '', content: '', pinned: false, expires_at: '' });
  const [saving, setSaving] = useState(false);

  async function load() {
    const { data } = await supabase.from('notices').select('*').order('pinned', { ascending: false }).order('created_at', { ascending: false });
    setNotices(data ?? []);
    setLoading(false);
  }
  useEffect(() => { load(); }, []);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    await supabase.from('notices').insert({
      title: form.title,
      content: form.content,
      pinned: form.pinned,
      expires_at: form.expires_at || null,
      posted_by: user!.id,
    });
    setSaving(false);
    setShowForm(false);
    setForm({ title: '', content: '', pinned: false, expires_at: '' });
    load();
  }

  async function handleDelete(id: string) {
    if (!confirm('Delete this notice?')) return;
    await supabase.from('notices').delete().eq('id', id);
    load();
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Notices</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Create and manage announcements</p>
        </div>
        <button onClick={() => setShowForm(true)} className="btn-accent text-sm">
          <Plus className="w-4 h-4" /> New Notice
        </button>
      </div>

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-lg">
            <div className="flex items-center justify-between p-6 border-b border-gray-100 dark:border-gray-700">
              <h3 className="font-bold text-gray-900 dark:text-white">New Notice</h3>
              <button onClick={() => setShowForm(false)} className="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleSave} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1.5">Title *</label>
                <input value={form.title} onChange={e => setForm(p => ({ ...p, title: e.target.value }))} required className="input-field" placeholder="Notice title" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1.5">Content *</label>
                <textarea value={form.content} onChange={e => setForm(p => ({ ...p, content: e.target.value }))} required rows={4} className="input-field resize-none" placeholder="Notice content..." />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1.5">Expiry Date (optional)</label>
                <input type="date" value={form.expires_at} onChange={e => setForm(p => ({ ...p, expires_at: e.target.value }))} className="input-field" />
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" id="pinned" checked={form.pinned} onChange={e => setForm(p => ({ ...p, pinned: e.target.checked }))} className="rounded" />
                <label htmlFor="pinned" className="text-sm text-gray-700 dark:text-gray-200">Pin this notice</label>
              </div>
              <div className="flex gap-3 pt-2">
                <button type="submit" disabled={saving} className="btn-accent flex-1 justify-center text-sm">
                  {saving ? <><Loader2 className="w-4 h-4 animate-spin" /> Saving...</> : <><Save className="w-4 h-4" /> Publish</>}
                </button>
                <button type="button" onClick={() => setShowForm(false)} className="btn-outline flex-1 justify-center text-sm">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {loading ? (
        <div className="flex justify-center py-16"><Loader2 className="w-8 h-8 text-primary-900 animate-spin" /></div>
      ) : notices.length === 0 ? (
        <div className="card text-center py-16">
          <Bell className="w-12 h-12 mx-auto mb-3 text-gray-200 dark:text-gray-700" />
          <p className="text-gray-400 dark:text-gray-500">No notices yet. Create one above.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {notices.map(n => (
            <div key={n.id} className={`card flex items-start gap-4 border-l-4 ${n.pinned ? 'border-l-primary-900' : 'border-l-gray-200 dark:border-l-gray-600'}`}>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  {n.pinned && <Pin className="w-3.5 h-3.5 text-primary-900 dark:text-primary-300" />}
                  <h3 className="font-semibold text-gray-900 dark:text-white">{n.title}</h3>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">{n.content}</p>
                <p className="text-xs text-gray-400 dark:text-gray-600 mt-2">{new Date(n.created_at).toLocaleDateString('en-IN')}</p>
              </div>
              <button onClick={() => handleDelete(n.id)} className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors flex-shrink-0">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
