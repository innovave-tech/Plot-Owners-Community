import { useEffect, useState } from 'react';
import { Shield, Building2, Users, Dumbbell, PlayCircle, TreePine, Zap, Droplets, Lightbulb, MapPin, Wrench, Star, Loader2 } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { Facility } from '../lib/types';

const iconMap: Record<string, React.ElementType> = {
  Shield, Building2, Users, Dumbbell, PlayCircle, TreePine, Zap, Droplets,
  Lightbulb, MapPin, Wrench, Star, Circle: Star,
  RouteOff: MapPin, Trees: TreePine, Droplet: Droplets,
};

const categories = [
  { key: 'all', label: 'All Facilities' },
  { key: 'lifestyle', label: 'Lifestyle' },
  { key: 'infrastructure', label: 'Infrastructure' },
  { key: 'services', label: 'Services' },
];

export default function Facilities() {
  const [facilities, setFacilities] = useState<Facility[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('all');

  useEffect(() => {
    supabase
      .from('facilities')
      .select('*')
      .eq('active', true)
      .order('display_order')
      .then(({ data }) => {
        setFacilities(data ?? []);
        setLoading(false);
      });
  }, []);

  const filtered = activeCategory === 'all'
    ? facilities
    : facilities.filter(f => f.category === activeCategory);

  return (
    <div className="pt-20 min-h-screen bg-white">
      {/* Hero */}
      <div className="bg-gradient-to-br from-primary-50 to-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-accent-700 font-medium text-sm uppercase tracking-wider mb-3">Our Amenities</p>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">World-Class Facilities</h1>
          <p className="text-gray-600 text-lg">
            Enjoy a premium lifestyle with our comprehensive range of community facilities.
          </p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="sticky top-16 md:top-20 z-10 bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-1 py-3 overflow-x-auto">
            {categories.map(cat => (
              <button
                key={cat.key}
                onClick={() => setActiveCategory(cat.key)}
                className={`px-5 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
                  activeCategory === cat.key
                    ? 'bg-primary-900 text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {loading ? (
          <div className="flex justify-center items-center py-24">
            <Loader2 className="w-8 h-8 text-primary-900 animate-spin" />
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map(facility => {
              const Icon = iconMap[facility.icon] || Star;
              return (
                <div key={facility.id} className="group rounded-2xl overflow-hidden bg-white shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                  <div className="relative h-44 overflow-hidden">
                    <img
                      src={facility.image_url}
                      alt={facility.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <div className="absolute top-3 right-3 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-xl flex items-center justify-center shadow-md">
                      <Icon className="w-5 h-5 text-primary-900" />
                    </div>
                    <span className="absolute bottom-3 left-3 text-xs font-medium text-white/80 bg-black/30 px-2 py-1 rounded-md capitalize">
                      {facility.category}
                    </span>
                  </div>
                  <div className="p-5">
                    <h3 className="font-semibold text-gray-900 mb-2 text-base">{facility.name}</h3>
                    <p className="text-sm text-gray-500 leading-relaxed">{facility.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
