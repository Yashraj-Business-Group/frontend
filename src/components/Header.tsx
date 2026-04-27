

import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 w-full flex justify-between items-center px-8 h-20 bg-white/95 backdrop-blur-md shadow-[0px_20px_40px_rgba(0,36,81,0.08)]">
      <div className="text-2xl font-black tracking-tighter text-[#002451] dark:text-white uppercase font-headline">
        YASHRAJ BUSINESS GROUP
      </div>
      <nav className="hidden lg:flex items-center space-x-8">
        <Link className="text-[#002451] border-b-2 border-[#1A3A6B] font-bold py-2 transition-colors duration-200" to="/">Home</Link>
        <Link className="text-slate-600 font-medium hover:text-[#1A3A6B] transition-colors duration-200" to="/company-profile">About Us</Link>
        <div className="relative group">
          <Link to="/services" className="text-slate-600 font-medium hover:text-[#1A3A6B] transition-colors duration-200 flex items-center gap-1">
            Services <span className="material-symbols-outlined text-sm">keyboard_arrow_down</span>
          </Link>
          <div className="absolute top-full -left-4 w-64 bg-white tactical-shadow py-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
            <Link className="block px-6 py-2 text-sm text-slate-600 hover:bg-surface-container-low hover:text-primary" to="/services/security-guard">Security Services</Link>
            <Link className="block px-6 py-2 text-sm text-slate-600 hover:bg-surface-container-low hover:text-primary" to="/services/house-keeping">Housekeeping</Link>
            <Link className="block px-6 py-2 text-sm text-slate-600 hover:bg-surface-container-low hover:text-primary" to="/services/facility-management">Facility Management</Link>
            <Link className="block px-6 py-2 text-sm text-slate-600 hover:bg-surface-container-low hover:text-primary" to="/services/manpower-labour">Manpower Supply</Link>
            <Link className="block px-6 py-2 text-sm text-slate-600 hover:bg-surface-container-low hover:text-primary" to="/services/contract-staffing">Contract Staffing</Link>
            <Link className="block px-6 py-2 text-sm text-slate-600 hover:bg-surface-container-low hover:text-primary" to="/services/pf-esic">PF &amp; ESIC</Link>
            <Link className="block px-6 py-2 text-sm text-slate-600 hover:bg-surface-container-low hover:text-primary" to="/services/all-taxation">Taxation</Link>
          </div>
        </div>
        <Link className="text-slate-600 font-medium hover:text-[#1A3A6B] transition-colors duration-200" to="/gallery">Gallery</Link>
        <Link className="text-slate-600 font-medium hover:text-[#1A3A6B] transition-colors duration-200" to="/job-portal">Career</Link>
        <Link className="text-slate-600 font-medium hover:text-[#1A3A6B] transition-colors duration-200" to="/blog">Blog</Link>
        <Link className="text-slate-600 font-medium hover:text-[#1A3A6B] transition-colors duration-200" to="/contact">Contact</Link>
        <Link className="text-slate-600 font-medium hover:text-[#1A3A6B] transition-colors duration-200" to="/admin/login">Admin</Link>
      </nav>
      <button className="tactical-gradient text-white px-8 py-3 font-bold uppercase tracking-wider text-sm active:scale-95 transition-transform">
        Call Us
      </button>
    </header>
  );
};

export default Header;
