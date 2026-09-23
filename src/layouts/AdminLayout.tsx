import React, { useEffect, useState, useCallback } from 'react';
import { Outlet, Link, useLocation, Navigate, useNavigate } from 'react-router-dom';
import type { Session } from '@supabase/supabase-js';
import { LayoutDashboard, ShieldCheck, Settings, LogOut, Briefcase, Image, FileText, Images } from 'lucide-react';
import { supabase } from '../supabase';

const AdminLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  // `undefined` = still checking, `null` = confirmed logged out.
  const [session, setSession] = useState<Session | null | undefined>(undefined);
  const [pendingRequestsCount, setPendingRequestsCount] = useState<number>(0);
  const [newApplicationsCount, setNewApplicationsCount] = useState<number>(0);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data.session));

    const { data: subscription } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
    });

    return () => subscription.subscription.unsubscribe();
  }, []);

  const fetchBadgeCounts = useCallback(async () => {
    try {
      const [requestsRes, applicationsRes] = await Promise.all([
        supabase
          .from('ServiceRequest')
          .select('id, status'),
        supabase
          .from('JobApplication')
          .select('id, createdAt')
      ]);

      if (requestsRes.data) {
        const pending = requestsRes.data.filter(
          (r: any) => (r.status || 'pending').toLowerCase() === 'pending'
        ).length;
        setPendingRequestsCount(pending);
      }

      if (applicationsRes.data) {
        setNewApplicationsCount(applicationsRes.data.length);
      }
    } catch (err) {
      console.error('Error fetching admin badge counts:', err);
    }
  }, []);

  useEffect(() => {
    if (!session) return;

    fetchBadgeCounts();

    // Supabase Realtime subscription for instant updates on inserts, updates, deletes
    const channel = supabase
      .channel('admin-menu-badges')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'ServiceRequest' }, () => {
        fetchBadgeCounts();
      })
      .on('postgres_changes', { event: '*', schema: 'public', table: 'JobApplication' }, () => {
        fetchBadgeCounts();
      })
      .subscribe();

    const handleCustomRefresh = () => fetchBadgeCounts();
    window.addEventListener('ybg_badge_refresh', handleCustomRefresh);
    window.addEventListener('focus', handleCustomRefresh);

    // Periodic check every 25 seconds
    const interval = setInterval(fetchBadgeCounts, 25000);

    return () => {
      supabase.removeChannel(channel);
      window.removeEventListener('ybg_badge_refresh', handleCustomRefresh);
      window.removeEventListener('focus', handleCustomRefresh);
      clearInterval(interval);
    };
  }, [session, fetchBadgeCounts]);

  // Re-fetch badge counts when switching pages
  useEffect(() => {
    if (session) {
      fetchBadgeCounts();
    }
  }, [location.pathname, session, fetchBadgeCounts]);

  if (session === undefined) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface-bright text-slate-500 font-medium">
        Checking session...
      </div>
    );
  }

  if (!session) {
    return <Navigate to="/admin/login" replace />;
  }

  const user = {
    name: session.user.user_metadata?.name || session.user.email || 'Admin User',
    role: session.user.user_metadata?.role || 'Admin',
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/admin/login');
  };

  const isActive = (path: string) => {
    return location.pathname === path ? 'bg-primary-container text-white' : 'text-slate-300 hover:bg-primary-container/50 hover:text-white';
  };

  return (
    <div className="min-h-screen flex bg-surface-bright font-body">
      {/* Sidebar */}
      <aside className="w-64 bg-primary text-white flex flex-col fixed h-full z-20">
        <div className="h-20 flex items-center px-6 border-b border-white/10">
          <span className="font-headline font-black text-xl tracking-tighter uppercase text-white">YBG Admin</span>
        </div>
        
        <nav className="flex-1 py-6 px-4 space-y-2 overflow-y-auto">
          <Link to="/admin" className={`flex items-center gap-3 px-4 py-3 rounded-md transition-colors ${isActive('/admin')}`}>
            <LayoutDashboard size={20} />
            <span className="font-medium text-sm">Dashboard</span>
          </Link>
          
          <div className="pt-4 pb-2 px-4">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Management</span>
          </div>

          {/* Service Requests with Notification Badge */}
          <Link 
            to="/admin/requests" 
            className={`flex items-center justify-between px-4 py-3 rounded-md transition-colors ${isActive('/admin/requests')}`}
          >
            <div className="flex items-center gap-3">
              <ShieldCheck size={20} />
              <span className="font-medium text-sm">Service Requests</span>
            </div>
            {pendingRequestsCount > 0 && (
              <span 
                title={`${pendingRequestsCount} pending requests`}
                className="bg-amber-500 text-white font-bold text-xs px-2 py-0.5 rounded-full shadow-sm min-w-5 text-center"
              >
                {pendingRequestsCount}
              </span>
            )}
          </Link>

          {/* View Applications with Notification Badge */}
          <Link 
            to="/admin/applications" 
            className={`flex items-center justify-between px-4 py-3 rounded-md transition-colors ${isActive('/admin/applications')}`}
          >
            <div className="flex items-center gap-3">
              <FileText size={20} />
              <span className="font-medium text-sm">View Applications</span>
            </div>
            {newApplicationsCount > 0 && (
              <span 
                title={`${newApplicationsCount} submitted applications`}
                className="bg-blue-500 text-white font-bold text-xs px-2 py-0.5 rounded-full shadow-sm min-w-5 text-center"
              >
                {newApplicationsCount}
              </span>
            )}
          </Link>

          {/* Job Postings / Roles */}
          <Link 
            to="/admin/jobs" 
            className={`flex items-center gap-3 px-4 py-3 rounded-md transition-colors ${isActive('/admin/jobs')}`}
          >
            <Briefcase size={20} />
            <span className="font-medium text-sm">Job Roles</span>
          </Link>

          <Link to="/admin/partners" className={`flex items-center gap-3 px-4 py-3 rounded-md transition-colors ${isActive('/admin/partners')}`}>
            <Image size={20} />
            <span className="font-medium text-sm">Trusted Partners</span>
          </Link>
          <Link to="/admin/blogs" className={`flex items-center gap-3 px-4 py-3 rounded-md transition-colors ${location.pathname.startsWith('/admin/blogs') ? 'bg-primary-container text-white' : 'text-slate-300 hover:bg-primary-container/50 hover:text-white'}`}>
            <FileText size={20} />
            <span className="font-medium text-sm">Manage Blogs</span>
          </Link>
          <Link to="/admin/gallery" className={`flex items-center gap-3 px-4 py-3 rounded-md transition-colors ${location.pathname.startsWith('/admin/gallery') ? 'bg-primary-container text-white' : 'text-slate-300 hover:bg-primary-container/50 hover:text-white'}`}>
            <Images size={20} />
            <span className="font-medium text-sm">Manage Gallery</span>
          </Link>

          <div className="pt-4 pb-2 px-4">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">System</span>
          </div>
          <Link to="/admin/settings" className={`flex items-center gap-3 px-4 py-3 rounded-md transition-colors ${isActive('/admin/settings')}`}>
            <Settings size={20} />
            <span className="font-medium text-sm">Settings</span>
          </Link>
        </nav>

        <div className="p-4 border-t border-white/10">
          <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 rounded-md text-slate-300 hover:bg-red-500/20 hover:text-red-400 transition-colors">
            <LogOut size={20} />
            <span className="font-medium text-sm">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 flex flex-col min-h-screen">
        {/* Top Navbar */}
        <header className="h-20 bg-white shadow-sm flex items-center justify-between px-8 sticky top-0 z-10">
          <div className="flex items-center gap-4">
            <h2 className="font-headline font-bold text-slate-800 text-xl hidden sm:block">Command Center</h2>
          </div>
          <div className="flex items-center gap-4">
            {/* Quick summary badges in top navbar */}
            {(pendingRequestsCount > 0 || newApplicationsCount > 0) && (
              <div className="hidden md:flex items-center gap-2">
                {pendingRequestsCount > 0 && (
                  <Link 
                    to="/admin/requests" 
                    title={`${pendingRequestsCount} Pending Service Requests`}
                    className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-800 border border-amber-200 hover:bg-amber-100 transition-colors shadow-2xs"
                  >
                    <ShieldCheck size={14} className="text-amber-600" />
                    <span>{pendingRequestsCount} Requests</span>
                  </Link>
                )}
                {newApplicationsCount > 0 && (
                  <Link 
                    to="/admin/jobs" 
                    title={`${newApplicationsCount} Submitted Job Applications`}
                    className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-800 border border-blue-200 hover:bg-blue-100 transition-colors shadow-2xs"
                  >
                    <Briefcase size={14} className="text-blue-600" />
                    <span>{newApplicationsCount} Jobs</span>
                  </Link>
                )}
              </div>
            )}

            <div className="flex flex-col text-right">
              <span className="text-sm font-bold text-slate-800">{user.name || 'Admin User'}</span>
              <span className="text-xs text-slate-500">{user.role || 'Admin'}</span>
            </div>
            <div className="w-10 h-10 bg-primary-container rounded-full flex items-center justify-center text-white font-bold">
              {(user.name || 'A').charAt(0).toUpperCase()}
            </div>
          </div>
        </header>

        {/* Dashboard Content Area */}
        <div className="p-8 flex-1">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
