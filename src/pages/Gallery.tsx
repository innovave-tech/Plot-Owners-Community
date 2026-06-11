import { useState } from 'react';
import { X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';

const categories = ['All', 'Community', 'Club House', 'Roads', 'Parks', 'Events'];

const photos = [
  { id: 1, src: 'https://images.pexels.com/photos/1396132/pexels-photo-1396132.jpeg', title: 'Gated Community Entrance', category: 'Community' },
  { id: 2, src: 'https://images.pexels.com/photos/271639/pexels-photo-271639.jpeg', title: 'Club House', category: 'Club House' },
  { id: 3, src: 'https://images.pexels.com/photos/280222/pexels-photo-280222.jpeg', title: 'Community Greens', category: 'Parks' },
  { id: 4, src: 'https://images.pexels.com/photos/1197095/pexels-photo-1197095.jpeg', title: 'Internal Roads', category: 'Roads' },
  { id: 5, src: 'https://images.pexels.com/photos/1552252/pexels-photo-1552252.jpeg', title: 'Fitness Center', category: 'Club House' },
  { id: 6, src: 'https://images.pexels.com/photos/1148998/pexels-photo-1148998.jpeg', title: 'Children\'s Playground', category: 'Parks' },
  { id: 7, src: 'https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg', title: 'Annual Meeting', category: 'Events' },
  { id: 8, src: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg', title: 'Community Center', category: 'Community' },
  { id: 9, src: 'https://images.pexels.com/photos/7005732/pexels-photo-7005732.jpeg', title: 'Picnic Area', category: 'Parks' },
  { id: 10, src: 'https://images.pexels.com/photos/1072179/pexels-photo-1072179.jpeg', title: 'Green Plantation', category: 'Parks' },
  { id: 11, src: 'https://images.pexels.com/photos/210617/pexels-photo-210617.jpeg', title: 'Township Overview', category: 'Community' },
  { id: 12, src: 'https://images.pexels.com/photos/209977/pexels-photo-209977.jpeg', title: 'Sports Courts', category: 'Events' },
];

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [lightbox, setLightbox] = useState<number | null>(null);

  const filtered = activeCategory === 'All' ? photos : photos.filter(p => p.category === activeCategory);

  function navigate(dir: 1 | -1) {
    if (lightbox === null) return;
    const idx = filtered.findIndex(p => p.id === lightbox);
    const next = (idx + dir + filtered.length) % filtered.length;
    setLightbox(filtered[next].id);
  }

  const lightboxPhoto = lightbox !== null ? filtered.find(p => p.id === lightbox) : null;

  return (
    <div className="pt-20 min-h-screen bg-white">
      <div className="bg-gradient-to-br from-primary-50 to-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-accent-700 font-medium text-sm uppercase tracking-wider mb-3">Our Community</p>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Photo Gallery</h1>
          <p className="text-gray-600 text-lg">A visual journey through our beautiful community and its facilities.</p>
        </div>
      </div>

      {/* Filter */}
      <div className="sticky top-16 md:top-20 z-10 bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-2 py-3 overflow-x-auto">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
                  activeCategory === cat
                    ? 'bg-primary-900 text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Masonry Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="columns-2 sm:columns-3 lg:columns-4 gap-4 space-y-4">
          {filtered.map((photo, i) => (
            <div
              key={photo.id}
              className="break-inside-avoid group relative overflow-hidden rounded-xl cursor-pointer shadow-sm hover:shadow-lg transition-all duration-300"
              onClick={() => setLightbox(photo.id)}
            >
              <img
                src={photo.src}
                alt={photo.title}
                className={`w-full object-cover group-hover:scale-105 transition-transform duration-500 ${i % 3 === 0 ? 'aspect-square' : i % 3 === 1 ? 'aspect-video' : 'aspect-[4/5]'}`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-3 left-3 right-3">
                  <p className="text-white text-sm font-medium">{photo.title}</p>
                  <p className="text-white/70 text-xs">{photo.category}</p>
                </div>
                <div className="absolute top-3 right-3 w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                  <ZoomIn className="w-4 h-4 text-white" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightboxPhoto && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
        >
          <button onClick={e => { e.stopPropagation(); navigate(-1); }} className="absolute left-4 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors">
            <ChevronLeft className="w-6 h-6" />
          </button>
          <div className="max-w-4xl max-h-full" onClick={e => e.stopPropagation()}>
            <img src={lightboxPhoto.src} alt={lightboxPhoto.title} className="max-h-[80vh] max-w-full rounded-xl shadow-2xl object-contain" />
            <p className="text-white text-center mt-4 font-medium">{lightboxPhoto.title}</p>
          </div>
          <button onClick={e => { e.stopPropagation(); navigate(1); }} className="absolute right-4 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors">
            <ChevronRight className="w-6 h-6" />
          </button>
          <button onClick={() => setLightbox(null)} className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  );
}
