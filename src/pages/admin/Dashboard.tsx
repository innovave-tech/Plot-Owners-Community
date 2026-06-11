import { useEffect, useState } from 'react';
import { Users, MessageSquare, Bell, DollarSign, UserCheck, AlertCircle } from 'lucide-react';
import { supabase } from '../../lib/supabase';

interface Stats {
  members: number;
  openComplaints: number;
  pendingBills: number;
  notices: number;
  pendingApplications: number;
  committee: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({ members: 0, openComplaints: 0, pendingBills: 0, notices: 0, pendingApplications: 0, committee: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const [members, complaints, bills, notices, apps, committee] = await Promise.all([
        supabase.from('profiles').select('id', { count: 'exact' }).eq('role', 'member'),
        supabase.from('complaints').select('id', { count: 'exact' }).eq('status', 'open'),
        supabase.from('bills').select('id', { count: 'exact' }).eq('status', 'pending'),
        supabase.from('notices').select('id', { count: 'exact' }),
        supabase.from('membership_applications').select('id', { count: 'exact' }).eq('status', 'pending'),
        supabase.from('committee_members').select('id', { count: 'exact' }).eq('active', true),
      ]);
      setStats({
        members: members.count ?? 0,
        openComplaints: complaints.count ?? 0,
        pendingBills: bills.count ?? 0,
        notices: notices.count ?? 0,
        pendingApplications: apps.count ?? 0,
        committee: committee.count ?? 0,
      });
      setLoading(false);
    }
    load();
  }, []);

  const cards = [
    { icon: Users, label: 'Total Members', value: stats.members, color: 'bg-blue-50 text-blue-600', link: '/admin/committee' },
    { icon: MessageSquare, label: 'Open Complaints', value: stats.openComplaints, color: 'bg-red-50 text-red-600', link: '/admin/complaints' },
    { icon: DollarSign, label: 'Pending Bills', value: stats.pendingBills, color: 'bg-orange-50 text-orange-600', link: '/admin/accounts' },
    { icon: Bell, label: 'Active Notices', value: stats.notices, color: 'bg-accent-50 text-accent-600', link: '/admin/notices' },
    { icon: UserCheck, label: 'Pending Applications', value: stats.pendingApplications, color: 'bg-purple-50 text-purple-600', link: '/admin/applications' },
    { icon: Users, label: 'Committee Members', value: stats.committee, color: 'bg-primary-50 text-primary-600', link: '/admin/committee' },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-accent-50 border border-accent-100 rounded-2xl p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">Admin Dashboard</h1>
        <p className="text-gray-600 text-sm">Manage the Jagannathapuram Plot Owners Welfare Association</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        {cards.map(({ icon: Icon, label, value, color }) => (
          <div key={label} className="card hover:shadow-md transition-shadow">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-3 ${color}`}>
              <Icon className="w-6 h-6" />
            </div>
            <p className="text-3xl font-bold text-gray-900">{loading ? '—' : value}</p>
            <p className="text-sm text-gray-500 mt-1">{label}</p>
          </div>
        ))}
      </div>

      {/* Security Management Placeholder */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <AlertCircle className="w-5 h-5 text-orange-500" />
          Security Overview
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'Visitors Today', value: '—' },
            { label: 'Approved', value: '—' },
            { label: 'Rejected', value: '—' },
            { label: 'Active Alerts', value: '0' },
          ].map(({ label, value }) => (
            <div key={label} className="card text-center">
              <p className="text-2xl font-bold text-gray-900">{value}</p>
              <p className="text-xs text-gray-500 mt-1">{label}</p>
            </div>
          ))}
        </div>
        <div className="mt-4 bg-blue-50 border border-blue-200 rounded-xl p-4 flex gap-3">
          <AlertCircle className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-blue-700">
            MyGate integration is planned for visitor management. Security tracking data will appear here once integrated.
          </p>
        </div>
      </div>

      {/* Accounts Summary */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <DollarSign className="w-5 h-5 text-accent-600" />
          Accounts Summary
        </h2>
        <div className="grid sm:grid-cols-3 gap-4">
          {[
            { label: 'Bills Generated', value: '—', sub: 'Total bills raised' },
            { label: 'Bills Paid', value: '—', sub: 'Payments received' },
            { label: 'Pending Payments', value: stats.pendingBills, sub: 'Awaiting payment' },
          ].map(({ label, value, sub }) => (
            <div key={label} className="card">
              <p className="text-2xl font-bold text-gray-900">{loading ? '—' : value}</p>
              <p className="text-sm font-medium text-gray-700 mt-1">{label}</p>
              <p className="text-xs text-gray-400">{sub}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
