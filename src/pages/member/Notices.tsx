import { useEffect, useState } from 'react';
import { Bell, Pin, Loader2, Calendar } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { Notice } from '../../lib/types';

export default function MemberNotices() {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from('notices')
      .select('*')
      .order('pinned', { ascending: false })
      .order('created_at', { ascending: false })
      .then(({ data }) => { setNotices(data ?? []); setLoading(false); });
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Notices & Announcements</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">Association announcements and updates</p>
      </div>

      {loading ? (
        <div className="flex justify-center py-16"><Loader2 className="w-8 h-8 text-primary-900 animate-spin" /></div>
      ) : notices.length === 0 ? (
        <div className="card text-center py-16">
          <Bell className="w-12 h-12 mx-auto mb-3 text-gray-200 dark:text-gray-700" />
          <p className="text-gray-400 dark:text-gray-500">No notices at the moment.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {notices.map(n => (
            <div key={n.id} className={`card hover:shadow-md transition-shadow border-l-4 ${n.pinned ? 'border-l-primary-900' : 'border-l-gray-200 dark:border-l-gray-600'}`}>
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    {n.pinned && (
                      <span className="flex items-center gap-1 text-xs font-medium text-primary-900 dark:text-primary-300 bg-primary-50 dark:bg-primary-900/20 px-2 py-0.5 rounded-full">
                        <Pin className="w-3 h-3" /> Pinned
                      </span>
                    )}
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-white text-base">{n.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mt-2 leading-relaxed">{n.content}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <div className="flex items-center gap-1 text-xs text-gray-400 dark:text-gray-500">
                    <Calendar className="w-3 h-3" />
                    {new Date(n.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </div>
                  {n.expires_at && (
                    <p className="text-xs text-orange-500 mt-1">Expires: {new Date(n.expires_at).toLocaleDateString()}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
