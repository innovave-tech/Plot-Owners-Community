import { useEffect, useState } from 'react';
import { Map, MapPin, Loader2, Maximize2 } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../context/AuthContext';
import { Plot } from '../../lib/types';

export default function MemberPlots() {
  const { profile } = useAuth();
  const [plots, setPlots] = useState<Plot[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!profile) return;
    supabase
      .from('plots')
      .select('*')
      .eq('owner_id', profile.id)
      .then(({ data }) => { setPlots(data ?? []); setLoading(false); });
  }, [profile]);

  const totalArea = plots.reduce((s, p) => s + p.area_sq_yards, 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">My Plots</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">Your registered plot ownership details</p>
      </div>

      {plots.length > 0 && (
        <div className="grid grid-cols-2 gap-4">
          <div className="card text-center">
            <p className="text-2xl font-bold text-primary-900 dark:text-primary-300">{plots.length}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Total Plots</p>
          </div>
          <div className="card text-center">
            <p className="text-2xl font-bold text-accent-600 dark:text-accent-400">{totalArea.toFixed(0)}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Total Sq. Yards</p>
          </div>
        </div>
      )}

      {loading ? (
        <div className="flex justify-center py-16"><Loader2 className="w-8 h-8 text-primary-900 animate-spin" /></div>
      ) : plots.length === 0 ? (
        <div className="card text-center py-16">
          <Map className="w-12 h-12 mx-auto mb-3 text-gray-200 dark:text-gray-700" />
          <p className="text-gray-400 dark:text-gray-500 mb-3">No plots registered yet.</p>
          <p className="text-sm text-gray-400 dark:text-gray-600">Contact the association office to register your plot details.</p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 gap-4">
          {plots.map(plot => (
            <div key={plot.id} className="card hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="w-10 h-10 bg-primary-50 dark:bg-primary-900/30 rounded-xl flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-primary-900 dark:text-primary-300" />
                </div>
                <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                  plot.status === 'active' ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400' :
                  'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
                }`}>
                  {plot.status}
                </span>
              </div>
              <h3 className="font-bold text-gray-900 dark:text-white text-lg mb-1">Plot No. {plot.plot_number}</h3>
              <div className="space-y-2 mt-3">
                {plot.survey_number && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500 dark:text-gray-400">Survey No.</span>
                    <span className="font-medium text-gray-700 dark:text-gray-200">{plot.survey_number}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500 dark:text-gray-400">Area</span>
                  <span className="font-medium text-gray-700 dark:text-gray-200 flex items-center gap-1">
                    <Maximize2 className="w-3 h-3" />{plot.area_sq_yards} Sq. Yards
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500 dark:text-gray-400">Registered</span>
                  <span className="font-medium text-gray-700 dark:text-gray-200">{new Date(plot.created_at).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
