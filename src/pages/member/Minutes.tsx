import { useEffect, useState } from 'react';
import { FileText, Loader2, ExternalLink } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { MeetingDocument } from '../../lib/types';

const typeColors: Record<string, string> = {
  minutes: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300',
  circular: 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300',
  financial: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300',
  general: 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300',
};

export default function MeetingMinutes() {
  const [docs, setDocs] = useState<MeetingDocument[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    supabase
      .from('meeting_documents')
      .select('*')
      .order('created_at', { ascending: false })
      .then(({ data }) => { setDocs(data ?? []); setLoading(false); });
  }, []);

  const filtered = filter === 'all' ? docs : docs.filter(d => d.document_type === filter);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Meeting Documents</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">Meeting minutes, circulars, and financial reports</p>
      </div>

      <div className="flex gap-2 flex-wrap">
        {['all', 'minutes', 'circular', 'financial', 'general'].map(t => (
          <button
            key={t}
            onClick={() => setFilter(t)}
            className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all capitalize ${
              filter === t ? 'bg-primary-900 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            {t === 'all' ? 'All Documents' : t}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="flex justify-center py-16"><Loader2 className="w-8 h-8 text-primary-900 animate-spin" /></div>
      ) : filtered.length === 0 ? (
        <div className="card text-center py-16">
          <FileText className="w-12 h-12 mx-auto mb-3 text-gray-200 dark:text-gray-700" />
          <p className="text-gray-400 dark:text-gray-500">No documents available yet.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map(doc => (
            <div key={doc.id} className="card flex items-center gap-4 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-gray-50 dark:bg-gray-700 rounded-xl flex items-center justify-center flex-shrink-0">
                <FileText className="w-6 h-6 text-gray-500 dark:text-gray-400" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-gray-900 dark:text-white truncate">{doc.title}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full capitalize ${typeColors[doc.document_type]}`}>
                    {doc.document_type}
                  </span>
                  <span className="text-xs text-gray-400 dark:text-gray-500">
                    {new Date(doc.created_at).toLocaleDateString('en-IN')}
                  </span>
                </div>
              </div>
              <a href={doc.document_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-sm text-primary-900 dark:text-primary-300 hover:underline flex-shrink-0">
                <ExternalLink className="w-4 h-4" /> Open
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
