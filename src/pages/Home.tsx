import { Link } from 'react-router-dom';
import {
  ChevronRight, Users, MapPin, Shield, Building2, Award, ArrowRight,
  CheckCircle, Zap, Droplets, TreePine, Phone, Mail,
} from 'lucide-react';
import { ASSOCIATION } from '../lib/constants';

const stats = [
  { label: 'Registered Members', value: '120+', icon: Users },
  { label: 'Total Plots', value: '320+', icon: MapPin },
  { label: 'Years Active', value: '10+', icon: Award },
  { label: 'Facilities', value: '16+', icon: Building2 },
];

const objectives = [
  { icon: Shield, title: 'Property Protection', desc: 'Protect owners from illegal transactions and encroachments.' },
  { icon: Zap, title: 'Infrastructure Development', desc: 'Roads, drainage, electricity and water facilities.' },
  { icon: Building2, title: 'Community Asset Management', desc: 'Protect common properties and association assets.' },
  { icon: CheckCircle, title: 'Accounts Transparency', desc: 'Maintain and audit accounts regularly.' },
  { icon: Shield, title: 'Security Services', desc: '24x7 security management for the community.' },
  { icon: Droplets, title: 'Community Development', desc: 'Support welfare activities and improvements.' },
  { icon: TreePine, title: 'Financial Welfare', desc: 'Utilize association funds responsibly.' },
  { icon: Users, title: 'Issue Resolution', desc: 'Address member concerns effectively and promptly.' },
];

export default function Home() {
  return (
    <div className="overflow-hidden">
      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('https://images.pexels.com/photos/1396132/pexels-photo-1396132.jpeg')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-white/95 via-white/85 to-primary-50/70" />

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-32">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-full text-gray-700 text-sm mb-8 animate-fade-in">
            <span className="w-2 h-2 rounded-full bg-accent-500 animate-pulse" />
            Regd. No. {ASSOCIATION.regNumber}
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight mb-6 animate-slide-up">
            {ASSOCIATION.name}
          </h1>

          <p className="text-lg sm:text-xl text-gray-700 mb-4 flex items-center justify-center gap-2 animate-fade-in">
            <MapPin className="w-5 h-5 text-accent-600" />
            {ASSOCIATION.address}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-6 mb-12 mt-8">
            {stats.map(({ label, value }) => (
              <div key={label} className="text-center">
                <p className="text-3xl font-bold text-gray-900">{value}</p>
                <p className="text-gray-600 text-sm">{label}</p>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up">
            <Link to="/about" className="btn-accent text-base px-8 py-4">
              About Association <ChevronRight className="w-5 h-5" />
            </Link>
            <Link to="/facilities" className="inline-flex items-center gap-2 px-8 py-4 bg-primary-50 border border-primary-100 text-primary-900 rounded-lg font-medium hover:bg-primary-100 transition-all text-base">
              Explore Facilities
            </Link>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-gray-300 rounded-full flex items-start justify-center pt-2">
            <div className="w-1.5 h-3 bg-gray-400 rounded-full" />
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-white border-y border-gray-100 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {stats.map(({ label, value, icon: Icon }) => (
              <div key={label} className="flex flex-col items-center gap-2">
                <Icon className="w-7 h-7 text-accent-600" />
                <p className="text-3xl font-bold text-gray-900">{value}</p>
                <p className="text-gray-600 text-sm">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who We Are */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-accent-600 dark:text-accent-400 font-semibold text-sm uppercase tracking-wider mb-3">Who We Are</p>
              <h2 className="section-title mb-6">
                Building a Better Community Together
              </h2>
              <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed mb-8">
                We are a registered Plot Owners Welfare Association dedicated to protecting the interests
                of all plot owners and ensuring continuous development of the layout. Established in 2015,
                we have been serving our community with transparency and dedication.
              </p>
              <div className="grid grid-cols-2 gap-4 mb-8">
                {[
                  { label: 'Registered Association', color: 'bg-primary-50 dark:bg-primary-900/20 text-primary-900 dark:text-primary-300' },
                  { label: '120+ Members', color: 'bg-accent-50 dark:bg-accent-900/20 text-accent-700 dark:text-accent-300' },
                  { label: '320+ Plots', color: 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300' },
                  { label: 'Active Executive Committee', color: 'bg-orange-50 dark:bg-orange-900/20 text-orange-700 dark:text-orange-300' },
                ].map(({ label, color }) => (
                  <div key={label} className={`px-4 py-3 rounded-xl font-medium text-sm ${color}`}>
                    <CheckCircle className="w-4 h-4 mb-1 inline-block mr-2" />
                    {label}
                  </div>
                ))}
              </div>
              <Link to="/about" className="btn-primary">
                Learn More <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.pexels.com/photos/280222/pexels-photo-280222.jpeg"
                  alt="Community"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 w-40 h-40 rounded-2xl overflow-hidden shadow-xl border-4 border-white dark:border-gray-800">
                <img
                  src="https://images.pexels.com/photos/210617/pexels-photo-210617.jpeg"
                  alt="Township"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -top-4 -right-4 bg-accent-500 text-white px-5 py-3 rounded-2xl font-bold text-center shadow-lg">
                <p className="text-2xl">10+</p>
                <p className="text-xs">Years of</p>
                <p className="text-xs">Excellence</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Objectives */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-accent-600 dark:text-accent-400 font-semibold text-sm uppercase tracking-wider mb-3">Our Mission</p>
            <h2 className="section-title">Association Objectives</h2>
            <p className="section-subtitle">
              We are committed to these core principles that guide every decision we make for our community.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {objectives.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="card hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group"
              >
                <div className="w-12 h-12 bg-primary-50 dark:bg-primary-900/30 rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary-900 transition-colors">
                  <Icon className="w-6 h-6 text-primary-900 dark:text-primary-300 group-hover:text-white transition-colors" />
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="section-title">Explore Our Platform</h2>
            <p className="section-subtitle">Everything you need to manage your plot and stay connected with the community.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: 'Facilities', desc: 'Explore all community facilities available to plot owners.', path: '/facilities', img: 'https://images.pexels.com/photos/271639/pexels-photo-271639.jpeg', color: 'from-blue-600' },
              { title: 'Committee Members', desc: 'Meet the dedicated team managing the association.', path: '/committee', img: 'https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg', color: 'from-emerald-600' },
              { title: 'Apply for Membership', desc: 'Join our community and enjoy all benefits.', path: '/membership-form', img: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg', color: 'from-orange-600' },
            ].map(({ title, desc, path, img, color }) => (
              <Link key={path} to={path} className="group relative overflow-hidden rounded-2xl h-64 shadow-md hover:shadow-xl transition-all duration-300">
                <img src={img} alt={title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className={`absolute inset-0 bg-gradient-to-t ${color}/80 to-transparent`} />
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="font-bold text-xl mb-1">{title}</h3>
                  <p className="text-sm text-white/80">{desc}</p>
                </div>
                <div className="absolute top-4 right-4 w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <ArrowRight className="w-4 h-4 text-white" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Ready to Join Our Community?</h2>
          <p className="text-gray-600 text-lg mb-10">
            Apply for membership and become part of the Jagannathapuram family.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/membership-form" className="btn-accent text-base px-8 py-4">
              Apply for Membership <ArrowRight className="w-5 h-5" />
            </Link>
            <Link to="/contact" className="inline-flex items-center gap-2 px-8 py-4 border-2 border-primary-900/30 text-primary-900 rounded-lg font-medium hover:bg-primary-100 transition-all text-base">
              <Phone className="w-5 h-5" />
              Contact Us
            </Link>
          </div>
          <div className="mt-10 flex flex-col sm:flex-row gap-6 justify-center text-gray-600 text-sm">
            <span className="flex items-center gap-2"><Phone className="w-4 h-4" />{ASSOCIATION.phone}</span>
            <span className="flex items-center gap-2"><Mail className="w-4 h-4" />{ASSOCIATION.email}</span>
            <span className="flex items-center gap-2"><MapPin className="w-4 h-4" />{ASSOCIATION.address}</span>
          </div>
        </div>
      </section>
    </div>
  );
}
