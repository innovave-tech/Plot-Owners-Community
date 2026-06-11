import { useEffect, useState } from 'react';
import { MessageSquare, Loader2, Save, X } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { Complaint } from '../../lib/types';

export default function ComplaintsAdmin() {
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Complaint | null>(null);
  const [notes, setNotes] = useState('');
  const [status, setStatus] = useState<Complaint['status']>('open');
  const [saving, setSaving] = useState(false);
  const [filter, setFilter] = useState('all');

  async function load() {
    const { data } = await supabase.from('complaints').select('*').order('created_at', { ascending: false });
    setComplaints(data ?? []);
    setLoading(false);
  }
  useEffect(() => { load(); }, []);

  function openDetail(c: Complaint) {
    setSelected(c);
    setNotes(c.admin_notes || '');
    setStatus(c.status);
  }

  async function handleUpdate() {
    if (!selected) return;
    setSaving(true);
    await supabase.from('complaints').update({ status, admin_notes: notes, updated_at: new Date().toISOString() }).eq('id', selected.id);
    setSaving(false);
    setSelected(null);
    load();
  }

  const filtered = filter === 'all' ? complaints : complaints.filter(c => c.status === filter);

  const badge = (s: Complaint['status']) => ({
    open: 'badge-open',
    in_progress: 'badge-progress',
    resolved: 'badge-resolved',
    closed: 'badge-resolved',
  }[s]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Complaints Management</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">Review and resolve member complaints</p>
      </div>

      <div className="flex gap-2 flex-wrap">
        {['all', 'open', 'in_progress', 'resolved', 'closed'].map(f => (
          <button key={f} onClick={() => setFilter(f)}
            className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all capitalize ${filter === f ? 'bg-primary-900 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'}`}>
            {f.replace('_', ' ')}
          </button>
        ))}
      </div>

      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-lg">
            <div className="flex items-center justify-between p-6 border-b border-gray-100 dark:border-gray-700">
              <h3 className="font-bold text-gray-900 dark:text-white">Update Complaint</h3>
              <button onClick={() => setSelected(null)} className="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"><X className="w-5 h-5" /></button>
            </div>
            <div className="p-6 space-y-4">
              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4">
                <p className="font-semibold text-gray-900 dark:text-white">{selected.title}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{selected.description}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1.5">Update Status</label>
                <select value={status} onChange={e => setStatus(e.target.value as Complaint['status'])} className="input-field">
                  {['open', 'in_progress', 'resolved', 'closed'].map(s => <option key={s} value={s} className="capitalize">{s.replace('_', ' ')}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1.5">Admin Notes / Response</label>
                <textarea value={notes} onChange={e => setNotes(e.target.value)} rows={3} className="input-field resize-none" placeholder="Add notes or response to member..." />
              </div>
              <div className="flex gap-3">
                <button onClick={handleUpdate} disabled={saving} className="btn-accent flex-1 justify-center text-sm">
                  {saving ? <><Loader2 className="w-4 h-4 animate-spin" /> Saving...</> : <><Save className="w-4 h-4" /> Update</>}
                </button>
                <button onClick={() => setSelected(null)} className="btn-outline flex-1 justify-center text-sm">Cancel</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {loading ? (
        <div className="flex justify-center py-16"><Loader2 className="w-8 h-8 text-primary-900 animate-spin" /></div>
      ) : filtered.length === 0 ? (
        <div className="card text-center py-16">
          <MessageSquare className="w-12 h-12 mx-auto mb-3 text-gray-200 dark:text-gray-700" />
          <p className="text-gray-400 dark:text-gray-500">No complaints found.</p>
        </div>
      ) : (
        <div className="card overflow-hidden p-0">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-700/50 border-b border-gray-100 dark:border-gray-700">
                {['Title', 'Category', 'Status', 'Date', 'Action'].map(h => (
                  <th key={h} className="text-left px-5 py-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
              {filtered.map(c => (
                <tr key={c.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
                  <td className="px-5 py-3 font-medium text-gray-900 dark:text-white max-w-xs truncate">{c.title}</td>
                  <td className="px-5 py-3 text-gray-500 dark:text-gray-400 capitalize">{c.category}</td>
                  <td className="px-5 py-3"><span className={badge(c.status)}>{c.status.replace('_', ' ')}</span></td>
                  <td className="px-5 py-3 text-gray-400 dark:text-gray-500">{new Date(c.created_at).toLocaleDateString()}</td>
                  <td className="px-5 py-3">
                    <button onClick={() => openDetail(c)} className="text-primary-900 dark:text-primary-300 text-xs font-medium hover:underline">Update</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
