import { useEffect, useState } from 'react';
import { Plus, Edit2, Trash2, X, Save, Loader2, User } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { CommitteeMember } from '../../lib/types';
import { POSITIONS } from '../../lib/constants';

type FormData = Omit<CommitteeMember, 'id' | 'created_at'>;
const emptyForm: FormData = { name: '', position: POSITIONS[0], phone: '', email: '', photo_url: '', display_order: 0, active: true };

export default function CommitteeAdmin() {
  const [members, setMembers] = useState<CommitteeMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<string | null>(null);
  const [form, setForm] = useState<FormData>(emptyForm);
  const [saving, setSaving] = useState(false);

  async function load() {
    const { data } = await supabase.from('committee_members').select('*').order('display_order');
    setMembers(data ?? []);
    setLoading(false);
  }
  useEffect(() => { load(); }, []);

  function openNew() { setForm(emptyForm); setEditing(null); setShowForm(true); }
  function openEdit(m: CommitteeMember) {
    setForm({ name: m.name, position: m.position, phone: m.phone, email: m.email, photo_url: m.photo_url, display_order: m.display_order, active: m.active });
    setEditing(m.id);
    setShowForm(true);
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    if (editing) {
      await supabase.from('committee_members').update(form).eq('id', editing);
    } else {
      await supabase.from('committee_members').insert(form);
    }
    setSaving(false);
    setShowForm(false);
    load();
  }

  async function handleDelete(id: string) {
    if (!confirm('Remove this committee member?')) return;
    await supabase.from('committee_members').delete().eq('id', id);
    load();
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Committee Members</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Manage executive committee</p>
        </div>
        <button onClick={openNew} className="btn-accent text-sm">
          <Plus className="w-4 h-4" /> Add Member
        </button>
      </div>

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-100 dark:border-gray-700 sticky top-0 bg-white dark:bg-gray-900">
              <h3 className="font-bold text-gray-900 dark:text-white">{editing ? 'Edit Member' : 'Add Member'}</h3>
              <button onClick={() => setShowForm(false)} className="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleSave} className="p-6 space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1.5">Name *</label>
                  <input value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} required className="input-field" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1.5">Position *</label>
                  <select value={form.position} onChange={e => setForm(p => ({ ...p, position: e.target.value }))} className="input-field">
                    {POSITIONS.map(pos => <option key={pos} value={pos}>{pos}</option>)}
                  </select>
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1.5">Phone</label>
                  <input value={form.phone} onChange={e => setForm(p => ({ ...p, phone: e.target.value }))} className="input-field" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1.5">Email</label>
                  <input type="email" value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))} className="input-field" />
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1.5">Photo URL</label>
                  <input value={form.photo_url} onChange={e => setForm(p => ({ ...p, photo_url: e.target.value }))} className="input-field" placeholder="https://..." />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1.5">Display Order</label>
                  <input type="number" value={form.display_order} onChange={e => setForm(p => ({ ...p, display_order: parseInt(e.target.value) || 0 }))} className="input-field" />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" id="active" checked={form.active} onChange={e => setForm(p => ({ ...p, active: e.target.checked }))} className="rounded" />
                <label htmlFor="active" className="text-sm text-gray-700 dark:text-gray-200">Active member</label>
              </div>
              <div className="flex gap-3 pt-2">
                <button type="submit" disabled={saving} className="btn-accent flex-1 justify-center text-sm">
                  {saving ? <><Loader2 className="w-4 h-4 animate-spin" /> Saving...</> : <><Save className="w-4 h-4" /> Save</>}
                </button>
                <button type="button" onClick={() => setShowForm(false)} className="btn-outline flex-1 justify-center text-sm">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {loading ? (
        <div className="flex justify-center py-16"><Loader2 className="w-8 h-8 text-primary-900 animate-spin" /></div>
      ) : (
        <div className="space-y-3">
          {members.map(m => (
            <div key={m.id} className="card flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-700 overflow-hidden flex-shrink-0">
                {m.photo_url ? <img src={m.photo_url} alt={m.name} className="w-full h-full object-cover" /> :
                  <div className="w-full h-full flex items-center justify-center"><User className="w-6 h-6 text-gray-400" /></div>}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-gray-900 dark:text-white">{m.name}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{m.position}</p>
              </div>
              <span className={`text-xs px-2 py-0.5 rounded-full ${m.active ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400' : 'bg-gray-100 dark:bg-gray-700 text-gray-500'}`}>
                {m.active ? 'Active' : 'Inactive'}
              </span>
              <div className="flex gap-2">
                <button onClick={() => openEdit(m)} className="p-2 text-primary-900 dark:text-primary-300 hover:bg-primary-50 dark:hover:bg-primary-900/20 rounded-lg transition-colors">
                  <Edit2 className="w-4 h-4" />
                </button>
                <button onClick={() => handleDelete(m.id)} className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
