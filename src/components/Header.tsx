import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Building2, LogIn, LogOut, LayoutDashboard } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { NAV_LINKS, ASSOCIATION } from '../lib/constants';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, isAdmin, signOut } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setIsOpen(false), [location]);

  async function handleSignOut() {
    await signOut();
    navigate('/');
  }

  const isHome = location.pathname === '/';
  const headerBg = scrolled || !isHome
    ? 'bg-white shadow-md'
    : 'bg-white/90 backdrop-blur border-b border-gray-100';

  const textColor = 'text-gray-800';

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${headerBg}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 flex-shrink-0">
            <div className="w-10 h-10 bg-primary-900 rounded-xl flex items-center justify-center shadow-lg">
              <Building2 className="w-6 h-6 text-white" />
            </div>
            <div className="hidden sm:block">
              <p className={`text-sm font-bold leading-tight transition-colors ${textColor}`}>
                {ASSOCIATION.shortName}
              </p>
              <p className={`text-xs leading-tight transition-colors opacity-75 ${textColor}`}>
                Regd. No. {ASSOCIATION.regNumber}
              </p>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map(link => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${location.pathname === link.path
                    ? 'bg-primary-50 text-primary-900'
                    : `${textColor} hover:bg-gray-100`
                  }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            {user && (
              <div className="hidden lg:flex items-center gap-2">
                <Link
                  to={isAdmin ? '/admin' : '/member'}
                  className="flex items-center gap-2 px-4 py-2 bg-primary-900 text-white rounded-lg text-sm font-medium hover:bg-primary-800 transition-all"
                >
                  <LayoutDashboard className="w-4 h-4" />
                  Dashboard
                </Link>

                <button
                  onClick={handleSignOut}
                  className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 transition-all text-gray-700"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            )}

            <button
              className={`lg:hidden p-2 rounded-lg transition-colors hover:bg-gray-100 ${textColor}`}
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 shadow-xl animate-slide-down">
          <div className="px-4 py-4 space-y-1">
            {NAV_LINKS.map(link => (
              <Link
                key={link.path}
                to={link.path}
                className={`block px-4 py-3 rounded-lg text-sm font-medium transition-colors ${location.pathname === link.path
                    ? 'bg-primary-50 text-primary-900'
                    : 'text-gray-700 hover:bg-gray-50'
                  }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-3 border-t border-gray-100">
              {user ? (
                <div className="space-y-2">
                  <Link
                    to={isAdmin ? '/admin' : '/member'}
                    className="flex items-center gap-2 w-full px-4 py-3 bg-primary-900 text-white rounded-lg text-sm font-medium"
                  >
                    <LayoutDashboard className="w-4 h-4" />
                    Dashboard
                  </Link>
                  <button
                    onClick={handleSignOut}
                    className="flex items-center gap-2 w-full px-4 py-3 border border-gray-200 rounded-lg text-sm font-medium text-gray-700"
                  >
                    <LogOut className="w-4 h-4" />
                    Sign Out
                  </button>
                </div>
              ) : (
                <Link
                  to="/login"
                  className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-primary-900 text-white rounded-lg text-sm font-medium"
                >
                  <LogIn className="w-4 h-4" />
                  Member Login
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
