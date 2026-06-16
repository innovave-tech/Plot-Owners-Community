import { ASSOCIATION } from '../lib/constants';

const layouts = [
  {
    name: 'Vinayak Nagar Layout',
    surveyNo: 'Survey No. 131',
    details: ['Koheda Village', 'Hayathnagar Mandal', 'Ranga Reddy District', 'Telangana'],
    image: '/images/layouts/vinayak-nagar.png',
  },
  {
    name: 'Sri Sai Syamala Nagar Layout',
    surveyNo: 'Survey No. 131 (Part)',
    details: ['Koheda Village', 'Hayathnagar Mandal', 'Ranga Reddy District', 'Telangana'],
    image: '/images/layouts/sri-sai-syamala-nagar.png',
  },
  {
    name: 'Jagannatha Puram Layout',
    surveyNo: 'Survey No. 131 (Part), Survey No. 132 (Part)',
    details: ['Koheda Village', 'Hayathnagar Mandal', 'Ranga Reddy District', 'Telangana'],
    image: '/images/layouts/jagannatha-puram.png',
  },
];

export default function Layouts() {
  return (
    <div className="pt-20 min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-primary-50 to-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-accent-700 font-medium text-sm uppercase tracking-wider mb-3">Est. {ASSOCIATION.established}</p>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Layouts</h1>
          <p className="text-gray-600 text-lg leading-relaxed">
            Jagannathapuram Plot Owners' Welfare Association comprises three residential layouts situated in Koheda Village, Hayathnagar Mandal, Ranga Reddy District, Telangana.
          </p>
        </div>
      </div>

      {/* Layouts Grid */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 space-y-12">
        {layouts.map((layout, idx) => (
          <div key={idx} className="card">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              {/* Layout Image */}
              <div className="rounded-xl overflow-hidden shadow-lg max-h-[600px]">
                <img
                  src={layout.image}
                  alt={layout.name}
                  className="w-full h-auto object-contain"
                />
              </div>

              {/* Layout Details */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">{layout.name}</h2>
                <p className="text-accent-700 font-semibold mb-6">{layout.surveyNo}</p>
                <ul className="space-y-3">
                  {layout.details.map((detail, i) => (
                    <li key={i} className="flex items-center gap-3 text-gray-700">
                      <span className="w-2 h-2 rounded-full bg-accent-600 flex-shrink-0"></span>
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}