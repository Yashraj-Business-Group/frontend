import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Users, ShieldCheck, Settings, LogOut, Briefcase, Image, FileText } from 'lucide-react';

const AdminLayout = () => {
  const location = useLocation();

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
          <Link to="/admin/requests" className={`flex items-center gap-3 px-4 py-3 rounded-md transition-colors ${isActive('/admin/requests')}`}>
            <ShieldCheck size={20} />
            <span className="font-medium text-sm">Service Requests</span>
          </Link>
          <Link to="/admin/jobs" className={`flex items-center gap-3 px-4 py-3 rounded-md transition-colors ${isActive('/admin/jobs')}`}>
            <Briefcase size={20} />
            <span className="font-medium text-sm">Job Applications</span>
          </Link>
          <Link to="/admin/partners" className={`flex items-center gap-3 px-4 py-3 rounded-md transition-colors ${isActive('/admin/partners')}`}>
            <Image size={20} />
            <span className="font-medium text-sm">Trusted Partners</span>
          </Link>
          <Link to="/admin/users" className={`flex items-center gap-3 px-4 py-3 rounded-md transition-colors ${isActive('/admin/users')}`}>
            <Users size={20} />
            <span className="font-medium text-sm">Users & Staff</span>
          </Link>
          <Link to="/admin/blogs" className={`flex items-center gap-3 px-4 py-3 rounded-md transition-colors ${location.pathname.startsWith('/admin/blogs') ? 'bg-primary-container text-white' : 'text-slate-300 hover:bg-primary-container/50 hover:text-white'}`}>
            <FileText size={20} />
            <span className="font-medium text-sm">Manage Blogs</span>
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
          <Link to="/" className="flex items-center gap-3 px-4 py-3 rounded-md text-slate-300 hover:bg-red-500/20 hover:text-red-400 transition-colors">
            <LogOut size={20} />
            <span className="font-medium text-sm">Logout</span>
          </Link>
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
                <div className="flex flex-col text-right">
                    <span className="text-sm font-bold text-slate-800">Admin User</span>
                    <span className="text-xs text-slate-500">Super Admin</span>
                </div>
                <div className="w-10 h-10 bg-primary-container rounded-full flex items-center justify-center text-white font-bold">
                    A
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
