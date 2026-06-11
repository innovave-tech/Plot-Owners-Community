import { useEffect, useState } from 'react';
import { Receipt, Loader2, AlertCircle } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../context/AuthContext';
import { Bill } from '../../lib/types';

export default function MemberBills() {
  const { profile } = useAuth();
  const [bills, setBills] = useState<Bill[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!profile) return;
    supabase
      .from('bills')
      .select('*')
      .eq('member_id', profile.id)
      .order('due_date', { ascending: false })
      .then(({ data }) => { setBills(data ?? []); setLoading(false); });
  }, [profile]);

  const total = bills.reduce((s, b) => s + b.amount, 0);
  const paid = bills.filter(b => b.status === 'paid').reduce((s, b) => s + b.amount, 0);
  const pending = bills.filter(b => b.status !== 'paid').reduce((s, b) => s + b.amount, 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Bills & Payments</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">View your maintenance bills and payment history</p>
      </div>

      {/* Summary */}
      {bills.length > 0 && (
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: 'Total Billed', value: total, color: 'text-gray-900 dark:text-white' },
            { label: 'Paid', value: paid, color: 'text-accent-600 dark:text-accent-400' },
            { label: 'Pending', value: pending, color: 'text-orange-600 dark:text-orange-400' },
          ].map(({ label, value, color }) => (
            <div key={label} className="card text-center">
              <p className={`text-2xl font-bold ${color}`}>₹{value.toLocaleString()}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{label}</p>
            </div>
          ))}
        </div>
      )}

      {loading ? (
        <div className="flex justify-center py-16"><Loader2 className="w-8 h-8 text-primary-900 animate-spin" /></div>
      ) : bills.length === 0 ? (
        <div className="card text-center py-16">
          <Receipt className="w-12 h-12 mx-auto mb-3 text-gray-200 dark:text-gray-700" />
          <p className="text-gray-400 dark:text-gray-500">No bills generated yet.</p>
        </div>
      ) : (
        <div className="card overflow-hidden p-0">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-700/50 border-b border-gray-100 dark:border-gray-700">
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Description</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Amount</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Due Date</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
              {bills.map(b => (
                <tr key={b.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
                  <td className="px-6 py-4 text-gray-700 dark:text-gray-200">{b.description}</td>
                  <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">₹{b.amount.toLocaleString()}</td>
                  <td className="px-6 py-4 text-gray-500 dark:text-gray-400">{new Date(b.due_date).toLocaleDateString('en-IN')}</td>
                  <td className="px-6 py-4">
                    <span className={b.status === 'paid' ? 'badge-paid' : b.status === 'overdue' ? 'badge-open' : 'badge-pending'}>
                      {b.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-4 flex gap-3">
        <AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
        <p className="text-sm text-amber-700 dark:text-amber-300">
          Online payment integration coming soon. Please visit the association office to pay your dues.
        </p>
      </div>
    </div>
  );
}
