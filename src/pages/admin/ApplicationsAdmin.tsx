import { useEffect, useState } from 'react';
import { UserCheck, Loader2, Eye, X, CheckCircle, XCircle } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { MembershipApplication } from '../../lib/types';

export default function ApplicationsAdmin() {
  const [apps, setApps] = useState<MembershipApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<MembershipApplication | null>(null);
  const [filter, setFilter] = useState('all');

  async function load() {
    const { data } = await supabase.from('membership_applications').select('*').order('submitted_at', { ascending: false });
    setApps(data ?? []);
    setLoading(false);
  }
  useEffect(() => { load(); }, []);

  async function updateStatus(id: string, status: 'approved' | 'rejected') {
    await supabase.from('membership_applications').update({ status, reviewed_at: new Date().toISOString() }).eq('id', id);
    setSelected(null);
    load();
  }

  const filtered = filter === 'all' ? apps : apps.filter(a => a.status === filter);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Membership Applications</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">Review and process membership requests</p>
      </div>

      <div className="flex gap-2">
        {['all', 'pending', 'approved', 'rejected'].map(f => (
          <button key={f} onClick={() => setFilter(f)}
            className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all capitalize ${filter === f ? 'bg-primary-900 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'}`}>
            {f}
          </button>
        ))}
      </div>

      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-100 dark:border-gray-700 sticky top-0 bg-white dark:bg-gray-900">
              <h3 className="font-bold text-gray-900 dark:text-white">Application Details</h3>
              <button onClick={() => setSelected(null)} className="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"><X className="w-5 h-5" /></button>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4">
                  <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">1st Applicant</p>
                  <p className="font-bold text-gray-900 dark:text-white">{selected.applicant1_first_name} {selected.applicant1_last_name}</p>
                  <p className="text-sm text-gray-500">{selected.applicant1_contact}</p>
                  <p className="text-sm text-gray-500">{selected.applicant1_email}</p>
                  <p className="text-sm text-gray-500">{selected.applicant1_city}</p>
                </div>
                {selected.applicant2_first_name && (
                  <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4">
                    <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">2nd Applicant</p>
                    <p className="font-bold text-gray-900 dark:text-white">{selected.applicant2_first_name} {selected.applicant2_last_name}</p>
                    <p className="text-sm text-gray-500">{selected.applicant2_contact}</p>
                  </div>
                )}
              </div>
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">Plots</p>
                <div className="space-y-2">
                  {selected.plots.map((p, i) => (
                    <div key={i} className="flex gap-4 text-sm bg-gray-50 dark:bg-gray-700/30 px-4 py-2 rounded-lg">
                      <span>Plot: <strong>{p.plot_number}</strong></span>
                      <span>Sy.No: <strong>{p.survey_number}</strong></span>
                      <span>Area: <strong>{p.sq_yards} Sq.Y</strong></span>
                    </div>
                  ))}
                </div>
                <p className="text-sm font-semibold text-gray-900 dark:text-white mt-2">Total: {selected.total_sq_yards} Sq. Yards</p>
              </div>
              {selected.status === 'pending' && (
                <div className="flex gap-3 pt-2">
                  <button onClick={() => updateStatus(selected.id, 'approved')} className="btn-accent flex-1 justify-center text-sm">
                    <CheckCircle className="w-4 h-4" /> Approve
                  </button>
                  <button onClick={() => updateStatus(selected.id, 'rejected')} className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg text-sm font-medium hover:bg-red-600 transition-colors">
                    <XCircle className="w-4 h-4" /> Reject
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {loading ? (
        <div className="flex justify-center py-16"><Loader2 className="w-8 h-8 text-primary-900 animate-spin" /></div>
      ) : filtered.length === 0 ? (
        <div className="card text-center py-16">
          <UserCheck className="w-12 h-12 mx-auto mb-3 text-gray-200 dark:text-gray-700" />
          <p className="text-gray-400 dark:text-gray-500">No applications found.</p>
        </div>
      ) : (
        <div className="card overflow-hidden p-0">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-700/50 border-b border-gray-100 dark:border-gray-700">
                {['Applicant Name', 'Contact', 'Plots', 'Total Sq.Y', 'Status', 'Date', 'Action'].map(h => (
                  <th key={h} className="text-left px-5 py-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
              {filtered.map(a => (
                <tr key={a.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
                  <td className="px-5 py-3 font-medium text-gray-900 dark:text-white">{a.applicant1_first_name} {a.applicant1_last_name}</td>
                  <td className="px-5 py-3 text-gray-500 dark:text-gray-400">{a.applicant1_contact}</td>
                  <td className="px-5 py-3 text-gray-500 dark:text-gray-400">{a.plots.length}</td>
                  <td className="px-5 py-3 text-gray-500 dark:text-gray-400">{a.total_sq_yards}</td>
                  <td className="px-5 py-3">
                    <span className={a.status === 'approved' ? 'badge-resolved' : a.status === 'rejected' ? 'badge-open' : 'badge-pending'}>{a.status}</span>
                  </td>
                  <td className="px-5 py-3 text-gray-400 dark:text-gray-500">{new Date(a.submitted_at).toLocaleDateString()}</td>
                  <td className="px-5 py-3">
                    <button onClick={() => setSelected(a)} className="text-primary-900 dark:text-primary-300 text-xs font-medium hover:underline flex items-center gap-1">
                      <Eye className="w-3 h-3" /> View
                    </button>
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
