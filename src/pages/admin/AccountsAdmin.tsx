import { useEffect, useState } from 'react';
import { DollarSign, Plus, Loader2, X, Save } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { Bill } from '../../lib/types';

export default function AccountsAdmin() {
  const [bills, setBills] = useState<Bill[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ member_id: '', amount: '', description: 'Maintenance Fee', due_date: '' });
  const [saving, setSaving] = useState(false);
  const [filter, setFilter] = useState('all');

  async function load() {
    const { data } = await supabase.from('bills').select('*').order('created_at', { ascending: false });
    setBills(data ?? []);
    setLoading(false);
  }
  useEffect(() => { load(); }, []);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    await supabase.from('bills').insert({
      member_id: form.member_id,
      amount: parseFloat(form.amount),
      description: form.description,
      due_date: form.due_date,
    });
    setSaving(false);
    setShowForm(false);
    setForm({ member_id: '', amount: '', description: 'Maintenance Fee', due_date: '' });
    load();
  }

  const filtered = filter === 'all' ? bills : bills.filter(b => b.status === filter);
  const total = bills.reduce((s, b) => s + b.amount, 0);
  const paid = bills.filter(b => b.status === 'paid').reduce((s, b) => s + b.amount, 0);
  const pending = bills.filter(b => b.status !== 'paid').reduce((s, b) => s + b.amount, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Accounts & Finance</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Manage maintenance bills and payments</p>
        </div>
        <button onClick={() => setShowForm(true)} className="btn-accent text-sm">
          <Plus className="w-4 h-4" /> Generate Bill
        </button>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Total Billed', value: `₹${total.toLocaleString()}`, color: 'text-gray-900 dark:text-white' },
          { label: 'Collected', value: `₹${paid.toLocaleString()}`, color: 'text-accent-600 dark:text-accent-400' },
          { label: 'Outstanding', value: `₹${pending.toLocaleString()}`, color: 'text-orange-600 dark:text-orange-400' },
        ].map(({ label, value, color }) => (
          <div key={label} className="card text-center">
            <p className={`text-2xl font-bold ${color}`}>{value}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{label}</p>
          </div>
        ))}
      </div>

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-md">
            <div className="flex items-center justify-between p-6 border-b border-gray-100 dark:border-gray-700">
              <h3 className="font-bold text-gray-900 dark:text-white">Generate Bill</h3>
              <button onClick={() => setShowForm(false)} className="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleSave} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1.5">Member ID *</label>
                <input value={form.member_id} onChange={e => setForm(p => ({ ...p, member_id: e.target.value }))} required className="input-field" placeholder="Profile UUID" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1.5">Amount (₹) *</label>
                  <input type="number" value={form.amount} onChange={e => setForm(p => ({ ...p, amount: e.target.value }))} required className="input-field" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1.5">Due Date *</label>
                  <input type="date" value={form.due_date} onChange={e => setForm(p => ({ ...p, due_date: e.target.value }))} required className="input-field" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1.5">Description</label>
                <input value={form.description} onChange={e => setForm(p => ({ ...p, description: e.target.value }))} className="input-field" />
              </div>
              <div className="flex gap-3">
                <button type="submit" disabled={saving} className="btn-accent flex-1 justify-center text-sm">
                  {saving ? <><Loader2 className="w-4 h-4 animate-spin" /> Saving...</> : <><Save className="w-4 h-4" /> Generate</>}
                </button>
                <button type="button" onClick={() => setShowForm(false)} className="btn-outline flex-1 justify-center text-sm">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="flex gap-2 flex-wrap">
        {['all', 'pending', 'paid', 'overdue'].map(f => (
          <button key={f} onClick={() => setFilter(f)}
            className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all capitalize ${filter === f ? 'bg-primary-900 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'}`}>
            {f}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="flex justify-center py-16"><Loader2 className="w-8 h-8 text-primary-900 animate-spin" /></div>
      ) : filtered.length === 0 ? (
        <div className="card text-center py-16">
          <DollarSign className="w-12 h-12 mx-auto mb-3 text-gray-200 dark:text-gray-700" />
          <p className="text-gray-400 dark:text-gray-500">No bills generated yet.</p>
        </div>
      ) : (
        <div className="card overflow-hidden p-0">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-700/50 border-b border-gray-100 dark:border-gray-700">
                {['Description', 'Amount', 'Due Date', 'Status'].map(h => (
                  <th key={h} className="text-left px-5 py-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
              {filtered.map(b => (
                <tr key={b.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
                  <td className="px-5 py-3 text-gray-700 dark:text-gray-200">{b.description}</td>
                  <td className="px-5 py-3 font-semibold text-gray-900 dark:text-white">₹{b.amount.toLocaleString()}</td>
                  <td className="px-5 py-3 text-gray-500 dark:text-gray-400">{new Date(b.due_date).toLocaleDateString('en-IN')}</td>
                  <td className="px-5 py-3">
                    <span className={b.status === 'paid' ? 'badge-paid' : b.status === 'overdue' ? 'badge-open' : 'badge-pending'}>{b.status}</span>
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
