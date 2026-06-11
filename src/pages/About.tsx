import { CheckCircle, Shield, Zap, Building2, DollarSign, Lock, Droplets, TreePine, MessageCircle } from 'lucide-react';
import { ASSOCIATION } from '../lib/constants';

const objectives = [
  { icon: Shield, title: 'Property Protection', desc: 'Protect owners from illegal transactions and encroachments on plots and common areas.' },
  { icon: Zap, title: 'Infrastructure Development', desc: 'Develop and maintain roads, drainage, electricity and water facilities for all residents.' },
  { icon: Building2, title: 'Community Asset Management', desc: 'Protect and maintain common properties and association assets for generations.' },
  { icon: DollarSign, title: 'Financial Welfare', desc: 'Utilize association funds responsibly and transparently for community benefit.' },
  { icon: Lock, title: 'Security Services', desc: '24x7 security management ensuring safety and peace of mind for all plot owners.' },
  { icon: CheckCircle, title: 'Accounts Transparency', desc: 'Maintain, audit, and publish accounts regularly for member review.' },
  { icon: Droplets, title: 'Banking & Operations', desc: 'Handle maintenance and operational expenses through proper banking channels.' },
  { icon: TreePine, title: 'Community Development', desc: 'Support welfare activities, events, and improvements for community wellbeing.' },
  { icon: MessageCircle, title: 'Issue Resolution', desc: 'Address member concerns effectively and provide timely resolutions to all issues.' },
];

export default function About() {
  return (
    <div className="pt-20 min-h-screen bg-white">
      {/* Hero */}
      <div className="bg-gradient-to-br from-primary-50 to-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-accent-700 font-medium text-sm uppercase tracking-wider mb-3">Est. {ASSOCIATION.established}</p>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">About Our Association</h1>
          <p className="text-gray-600 text-lg leading-relaxed">
            A decade of dedicated service to the plot owners of Jagannathapuram Layout
          </p>
        </div>
      </div>

      {/* Who We Are */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/1396132/pexels-photo-1396132.jpeg"
                alt="Community"
                className="w-full rounded-3xl shadow-2xl object-cover aspect-video"
              />
              <div className="absolute -bottom-6 -right-6 bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 border border-gray-100 dark:border-gray-700">
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <p className="text-2xl font-bold text-primary-900 dark:text-primary-300">120+</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Members</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-primary-900 dark:text-primary-300">320+</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Plots</p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <p className="text-accent-600 dark:text-accent-400 font-semibold text-sm uppercase tracking-wider mb-3">Who We Are</p>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                Serving the Jagannathapuram Community Since 2015
              </h2>
              <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed mb-6">
                We are a registered Plot Owners Welfare Association dedicated to protecting the interests of
                all plot owners and ensuring continuous development of the layout. Our association was founded
                with a vision to create a harmonious, well-governed community where every plot owner's rights
                are protected.
              </p>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-8">
                With over a decade of service, we have successfully managed the layout's infrastructure,
                resolved numerous member disputes, and created a strong sense of community among our
                {' '}{ASSOCIATION.totalMembers}+ members owning {ASSOCIATION.totalPlots}+ plots.
              </p>
              <div className="space-y-3">
                {['Registered under the Societies Registration Act', 'Transparent governance and accounting', 'Regular general body meetings', 'Active welfare programs'].map(item => (
                  <div key={item} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-accent-500 flex-shrink-0" />
                    <span className="text-gray-700 dark:text-gray-200">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Registration Details */}
      <section className="py-12 bg-primary-50 dark:bg-primary-900/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="card border-l-4 border-primary-900">
            <div className="grid sm:grid-cols-3 gap-6 text-center sm:text-left">
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">Registration Number</p>
                <p className="text-xl font-bold text-primary-900 dark:text-primary-300">{ASSOCIATION.regNumber}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">Established</p>
                <p className="text-xl font-bold text-primary-900 dark:text-primary-300">Year {ASSOCIATION.established}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">Office Address</p>
                <p className="text-sm font-medium text-gray-700 dark:text-gray-200 leading-snug">{ASSOCIATION.address}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Objectives */}
      <section className="py-20 bg-gray-50 dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-accent-600 dark:text-accent-400 font-semibold text-sm uppercase tracking-wider mb-3">Our Mission</p>
            <h2 className="section-title">Association Objectives</h2>
            <p className="section-subtitle">
              Our objectives are the pillars of our governance and community development activities.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {objectives.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="card hover:shadow-md transition-shadow group">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary-50 dark:bg-primary-900/30 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-primary-900 transition-colors">
                    <Icon className="w-6 h-6 text-primary-900 dark:text-primary-300 group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{title}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Future Modules */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Upcoming Features</h2>
            <p className="text-gray-500 dark:text-gray-400">Exciting developments on the roadmap for our community platform</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {['MyGate Integration', 'Visitor Management', 'Online Payments', 'Mobile App', 'Security Tracking', 'Community Forum'].map(feature => (
              <div key={feature} className="text-center p-4 rounded-xl border border-dashed border-gray-200 dark:border-gray-700 text-gray-400 dark:text-gray-500 hover:border-accent-300 hover:text-accent-500 transition-colors cursor-default">
                <p className="text-xs font-medium">{feature}</p>
                <span className="text-xs text-gray-300 dark:text-gray-600 mt-1 block">Coming Soon</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
