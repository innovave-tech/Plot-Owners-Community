import { Link } from 'react-router-dom';
import { Building2, Phone, Mail, MapPin, Facebook, Twitter, Youtube } from 'lucide-react';
import { ASSOCIATION, NAV_LINKS } from '../lib/constants';

export default function Footer() {
  return (
    <footer className="bg-white text-gray-600 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-accent-500 rounded-xl flex items-center justify-center">
                <Building2 className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-gray-900 font-bold text-sm leading-tight">{ASSOCIATION.shortName}</p>
                <p className="text-gray-500 text-xs">Regd. No. {ASSOCIATION.regNumber}</p>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-gray-600 mb-6 max-w-sm">
              A registered Plot Owners Welfare Association dedicated to protecting the interests of all
              plot owners and ensuring continuous development of the layout.
            </p>
            <div className="flex gap-3">
              {[Facebook, Twitter, Youtube].map((Icon, i) => (
                <div key={i} className="group w-9 h-9 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-accent-500 transition-colors cursor-pointer">
                  <Icon className="w-4 h-4 text-gray-600 group-hover:text-white" />
                </div>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-gray-900 font-semibold mb-5 text-sm uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-2.5">
              {NAV_LINKS.map(link => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-gray-600 hover:text-accent-600 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link to="/membership-form" className="text-sm text-accent-600 hover:text-accent-700 transition-colors font-medium">
                  Apply for Membership
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-gray-900 font-semibold mb-5 text-sm uppercase tracking-wider">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-accent-600 flex-shrink-0 mt-0.5" />
                <span className="text-sm text-gray-600">{ASSOCIATION.address}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-accent-600 flex-shrink-0" />
                <span className="text-sm text-gray-600">{ASSOCIATION.phone}</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-accent-600 flex-shrink-0" />
                <span className="text-sm text-gray-600">{ASSOCIATION.email}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} {ASSOCIATION.name}. All rights reserved.
          </p>
          <p className="text-xs text-gray-500">
            Established {ASSOCIATION.established} | Regd. No. {ASSOCIATION.regNumber}
          </p>
        </div>
      </div>
    </footer>
  );
}
