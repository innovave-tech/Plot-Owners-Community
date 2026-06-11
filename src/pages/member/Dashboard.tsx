import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Map, MessageSquare, Bell, Receipt, FileText, ArrowRight, AlertCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { supabase } from '../../lib/supabase';

interface Stats {
  plots: number;
  openComplaints: number;
  pendingBills: number;
  notices: number;
}

export default function MemberDashboard() {
  const { profile } = useAuth();
  const [stats, setStats] = useState<Stats>({ plots: 0, openComplaints: 0, pendingBills: 0, notices: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const [plots, complaints, bills, notices] = await Promise.all([
        supabase.from('plots').select('id', { count: 'exact' }).eq('owner_id', profile!.id),
        supabase.from('complaints').select('id', { count: 'exact' }).eq('member_id', profile!.id).eq('status', 'open'),
        supabase.from('bills').select('id', { count: 'exact' }).eq('member_id', profile!.id).eq('status', 'pending'),
        supabase.from('notices').select('id', { count: 'exact' }),
      ]);
      setStats({
        plots: plots.count ?? 0,
        openComplaints: complaints.count ?? 0,
        pendingBills: bills.count ?? 0,
        notices: notices.count ?? 0,
      });
      setLoading(false);
    }
    if (profile) load();
  }, [profile]);

  const cards = [
    { icon: Map, label: 'My Plots', value: stats.plots, path: '/member/plots', color: 'bg-blue-50 text-blue-600' },
    { icon: MessageSquare, label: 'Open Complaints', value: stats.openComplaints, path: '/member/complaints', color: 'bg-red-50 text-red-600' },
    { icon: Receipt, label: 'Pending Bills', value: stats.pendingBills, path: '/member/bills', color: 'bg-orange-50 text-orange-600' },
    { icon: Bell, label: 'Notices', value: stats.notices, path: '/member/notices', color: 'bg-accent-50 text-accent-600' },
  ];

  const quickLinks = [
    { icon: Map, label: 'My Plots', desc: 'View your plot ownership details', path: '/member/plots' },
    { icon: MessageSquare, label: 'File Complaint', desc: 'Raise a new complaint or issue', path: '/member/complaints' },
    { icon: Bell, label: 'View Notices', desc: 'Association announcements', path: '/member/notices' },
    { icon: FileText, label: 'Meeting Minutes', desc: 'Download meeting documents', path: '/member/minutes' },
    { icon: Receipt, label: 'Bills & Payments', desc: 'Check and pay maintenance dues', path: '/member/bills' },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome */}
      <div className="bg-primary-50 border border-primary-100 rounded-2xl p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">
          Welcome back, {profile?.full_name?.split(' ')[0] || 'Member'}!
        </h1>
        <p className="text-gray-600 text-sm">Here's an overview of your membership activity.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map(({ icon: Icon, label, value, path, color }) => (
          <Link key={path} to={path} className="card hover:shadow-md transition-all group">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-3 ${color}`}>
              <Icon className="w-6 h-6" />
            </div>
            <p className="text-2xl font-bold text-gray-900">{loading ? '—' : value}</p>
            <p className="text-sm text-gray-500 mt-0.5">{label}</p>
            <div className="flex items-center gap-1 mt-3 text-xs text-primary-900 opacity-0 group-hover:opacity-100 transition-opacity">
              View <ArrowRight className="w-3 h-3" />
            </div>
          </Link>
        ))}
      </div>

      {/* Quick Links */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {quickLinks.map(({ icon: Icon, label, desc, path }) => (
            <Link key={path} to={path} className="card hover:shadow-md hover:-translate-y-0.5 transition-all group flex items-center gap-4">
              <div className="w-10 h-10 bg-primary-50 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-primary-900 transition-colors">
                <Icon className="w-5 h-5 text-primary-900 group-hover:text-white transition-colors" />
              </div>
              <div>
                <p className="font-medium text-gray-900 text-sm">{label}</p>
                <p className="text-xs text-gray-500">{desc}</p>
              </div>
              <ArrowRight className="w-4 h-4 text-gray-300 ml-auto flex-shrink-0" />
            </Link>
          ))}
        </div>
      </div>

      {/* Info Banner */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex gap-3">
        <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-medium text-blue-900">MyGate Integration Coming Soon</p>
          <p className="text-xs text-blue-600 mt-0.5">Visitor management and security tracking will be available in a future update.</p>
        </div>
      </div>
    </div>
  );
}
