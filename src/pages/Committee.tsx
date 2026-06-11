import { useEffect, useState } from 'react';
import { Phone, Mail, User, Loader2 } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { CommitteeMember } from '../lib/types';

const positionColors: Record<string, string> = {
  'President': 'bg-primary-100 dark:bg-primary-900/30 text-primary-800 dark:text-primary-300',
  'Secretary': 'bg-accent-100 dark:bg-accent-900/30 text-accent-800 dark:text-accent-300',
  'Treasurer': 'bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-300',
  'PRO': 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300',
  'Executive Committee Member': 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300',
};

export default function Committee() {
  const [members, setMembers] = useState<CommitteeMember[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from('committee_members')
      .select('*')
      .eq('active', true)
      .order('display_order')
      .then(({ data }) => {
        setMembers(data ?? []);
        setLoading(false);
      });
  }, []);

  return (
    <div className="pt-20 min-h-screen bg-white">
      <div className="bg-gradient-to-br from-primary-50 to-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-accent-700 font-medium text-sm uppercase tracking-wider mb-3">Leadership</p>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Executive Committee</h1>
          <p className="text-gray-600 text-lg">
            Meet the dedicated individuals who manage the association and serve our community.
          </p>
        </div>
      </div>

      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {loading ? (
          <div className="flex justify-center py-24">
            <Loader2 className="w-8 h-8 text-primary-900 animate-spin" />
          </div>
        ) : (
          <>
            {/* Featured top 3 */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {members.slice(0, 3).map((m) => (
                <div key={m.id} className="card text-center hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
                  <div className="w-28 h-28 mx-auto mb-5 rounded-full overflow-hidden bg-gray-100 dark:bg-gray-700 ring-4 ring-primary-100 dark:ring-primary-800 group-hover:ring-accent-200 transition-all">
                    {m.photo_url ? (
                      <img src={m.photo_url} alt={m.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <User className="w-12 h-12 text-gray-400" />
                      </div>
                    )}
                  </div>
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium mb-3 ${positionColors[m.position] || positionColors['Executive Committee Member']}`}>
                    {m.position}
                  </span>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">{m.name}</h3>
                  <div className="space-y-2 text-sm text-gray-500 dark:text-gray-400">
                    {m.phone && (
                      <a href={`tel:${m.phone}`} className="flex items-center justify-center gap-2 hover:text-primary-900 dark:hover:text-primary-300 transition-colors">
                        <Phone className="w-4 h-4" /> {m.phone}
                      </a>
                    )}
                    {m.email && (
                      <a href={`mailto:${m.email}`} className="flex items-center justify-center gap-2 hover:text-primary-900 dark:hover:text-primary-300 transition-colors truncate">
                        <Mail className="w-4 h-4 flex-shrink-0" /> {m.email}
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Remaining members */}
            {members.length > 3 && (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {members.slice(3).map((m) => (
                  <div key={m.id} className="card flex items-center gap-4 hover:shadow-md transition-shadow">
                    <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-100 dark:bg-gray-700 flex-shrink-0 ring-2 ring-gray-100 dark:ring-gray-600">
                      {m.photo_url ? (
                        <img src={m.photo_url} alt={m.name} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <User className="w-8 h-8 text-gray-400" />
                        </div>
                      )}
                    </div>
                    <div className="min-w-0">
                      <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium mb-1 ${positionColors[m.position] || positionColors['Executive Committee Member']}`}>
                        {m.position}
                      </span>
                      <h3 className="font-semibold text-gray-900 dark:text-white text-sm truncate">{m.name}</h3>
                      {m.phone && (
                        <a href={`tel:${m.phone}`} className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1 hover:text-primary-900 transition-colors mt-1">
                          <Phone className="w-3 h-3" /> {m.phone}
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {members.length === 0 && (
              <div className="text-center py-20 text-gray-400">
                <User className="w-12 h-12 mx-auto mb-3 opacity-30" />
                <p>Committee member details will be updated soon.</p>
              </div>
            )}
          </>
        )}
      </section>
    </div>
  );
}
