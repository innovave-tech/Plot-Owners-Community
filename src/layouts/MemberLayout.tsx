import { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, User, Map, MessageSquare, Bell, FileText, Receipt,
  LogOut, Menu, Building2, ChevronRight,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { ASSOCIATION } from '../lib/constants';

const memberNav = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/member' },
  { icon: User, label: 'My Profile', path: '/member/profile' },
  { icon: Map, label: 'My Plots', path: '/member/plots' },
  { icon: MessageSquare, label: 'Complaints', path: '/member/complaints' },
  { icon: Bell, label: 'Notices', path: '/member/notices' },
  { icon: FileText, label: 'Meeting Minutes', path: '/member/minutes' },
  { icon: Receipt, label: 'Bills & Payments', path: '/member/bills' },
];

export default function MemberLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { profile, signOut } = useAuth();

  async function handleSignOut() {
    await signOut();
    navigate('/');
  }

  const Sidebar = () => (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-3 px-6 py-5 border-b border-gray-100">
        <div className="w-9 h-9 bg-primary-900 rounded-lg flex items-center justify-center">
          <Building2 className="w-5 h-5 text-white" />
        </div>
        <div>
          <p className="text-xs font-bold text-primary-900">{ASSOCIATION.shortName}</p>
          <p className="text-xs text-gray-500">Member Portal</p>
        </div>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {memberNav.map(({ icon: Icon, label, path }) => {
          const active = location.pathname === path;
          return (
            <Link
              key={path}
              to={path}
              onClick={() => setSidebarOpen(false)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                active
                  ? 'bg-primary-900 text-white shadow-sm'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Icon className="w-4 h-4 flex-shrink-0" />
              {label}
              {active && <ChevronRight className="w-3 h-3 ml-auto" />}
            </Link>
          );
        })}
      </nav>

      <div className="px-3 py-4 border-t border-gray-100 space-y-2">
        <div className="px-3 py-2">
          <p className="text-xs font-semibold text-gray-800 truncate">{profile?.full_name}</p>
          <p className="text-xs text-gray-500">Member</p>
        </div>
        <button
          onClick={handleSignOut}
          className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm font-medium text-red-600 hover:bg-red-50 transition-all"
        >
          <LogOut className="w-4 h-4" />
          Sign Out
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-60 bg-white border-r border-gray-100 fixed inset-y-0 left-0 z-30">
        <Sidebar />
      </aside>

      {/* Mobile Sidebar */}
      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-40 flex">
          <div className="fixed inset-0 bg-black/50" onClick={() => setSidebarOpen(false)} />
          <aside className="relative w-64 bg-white flex flex-col">
            <Sidebar />
          </aside>
        </div>
      )}

      {/* Main Content */}
      <div className="lg:ml-60 flex-1 flex flex-col min-h-screen">
        <header className="bg-white border-b border-gray-100 px-4 sm:px-6 h-16 flex items-center justify-between sticky top-0 z-20">
          <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2 rounded-lg hover:bg-gray-100">
            <Menu className="w-5 h-5 text-gray-600" />
          </button>
          <div className="hidden lg:flex items-center gap-2 text-sm text-gray-600">
            <Link to="/" className="hover:text-primary-900 transition-colors">Home</Link>
            <span>/</span>
            <span>Member Portal</span>
          </div>
          <div className="flex items-center gap-3 ml-auto">
            <div className="w-8 h-8 bg-primary-900 rounded-full flex items-center justify-center text-white text-xs font-bold">
              {profile?.full_name?.charAt(0) || 'M'}
            </div>
          </div>
        </header>

        <main className="flex-1 p-4 sm:p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
