import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { useEffect } from 'react';

import PublicLayout from './layouts/PublicLayout';
import MemberLayout from './layouts/MemberLayout';
import AdminLayout from './layouts/AdminLayout';

import Home from './pages/Home';
import About from './pages/About';
import Facilities from './pages/Facilities';
import Committee from './pages/Committee';
import Gallery from './pages/Gallery';
import Membership from './pages/Membership';
import Meetings from './pages/Meetings';
import Layouts from './pages/Layouts';
import MembershipForm from './pages/MembershipForm';
import Login from './pages/Login';
import NotFound from './pages/NotFound';

import MemberDashboard from './pages/member/Dashboard';
import MemberProfile from './pages/member/Profile';
import MemberPlots from './pages/member/Plots';
import MemberComplaints from './pages/member/Complaints';
import MemberNotices from './pages/member/Notices';
import MemberBills from './pages/member/Bills';
import MeetingMinutes from './pages/member/Minutes';

import AdminDashboard from './pages/admin/Dashboard';
import CommitteeAdmin from './pages/admin/CommitteeAdmin';
import NoticesAdmin from './pages/admin/NoticesAdmin';
import ComplaintsAdmin from './pages/admin/ComplaintsAdmin';
import AccountsAdmin from './pages/admin/AccountsAdmin';
import ApplicationsAdmin from './pages/admin/ApplicationsAdmin';

// Scroll to top component
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function ProtectedMember({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  if (loading) return <div className="min-h-screen flex items-center justify-center"><div className="w-8 h-8 border-4 border-primary-900 border-t-transparent rounded-full animate-spin" /></div>;
  return user ? <>{children}</> : <Navigate to="/login" replace />;
}

function ProtectedAdmin({ children }: { children: React.ReactNode }) {
  const { user, isAdmin, loading } = useAuth();
  if (loading) return <div className="min-h-screen flex items-center justify-center"><div className="w-8 h-8 border-4 border-accent-500 border-t-transparent rounded-full animate-spin" /></div>;
  if (!user) return <Navigate to="/login" replace />;
  if (!isAdmin) return <Navigate to="/member" replace />;
  return <>{children}</>;
}

function AppRoutes() {
  return (
    <>
      <ScrollToTop />
      <Routes>
      {/* Public Routes */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
          <Route path="/facilities" element={<Facilities />} />
          <Route path="/committee" element={<Committee />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/contact" element={<Navigate to="/membership" replace />} />
          <Route path="/membership" element={<Membership />} />
          <Route path="/meetings" element={<Meetings />} />
          <Route path="/layouts" element={<Layouts />} />
          <Route path="/membership-form" element={<MembershipForm />} />
      </Route>

      {/* Auth */}
      <Route path="/login" element={<Login />} />

      {/* Member Routes */}
      <Route path="/member" element={<ProtectedMember><MemberLayout /></ProtectedMember>}>
        <Route index element={<MemberDashboard />} />
        <Route path="profile" element={<MemberProfile />} />
        <Route path="plots" element={<MemberPlots />} />
        <Route path="complaints" element={<MemberComplaints />} />
        <Route path="notices" element={<MemberNotices />} />
        <Route path="bills" element={<MemberBills />} />
        <Route path="minutes" element={<MeetingMinutes />} />
      </Route>

      {/* Admin Routes */}
      <Route path="/admin" element={<ProtectedAdmin><AdminLayout /></ProtectedAdmin>}>
        <Route index element={<AdminDashboard />} />
        <Route path="committee" element={<CommitteeAdmin />} />
        <Route path="notices" element={<NoticesAdmin />} />
        <Route path="complaints" element={<ComplaintsAdmin />} />
        <Route path="accounts" element={<AccountsAdmin />} />
        <Route path="applications" element={<ApplicationsAdmin />} />
        <Route path="facilities" element={<AdminDashboard />} />
        <Route path="documents" element={<AdminDashboard />} />
      </Route>

      <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}
