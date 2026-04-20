

const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 w-full flex justify-between items-center px-8 h-20 bg-white/95 backdrop-blur-md shadow-[0px_20px_40px_rgba(0,36,81,0.08)]">
      <div className="text-2xl font-black tracking-tighter text-[#002451] dark:text-white uppercase font-headline">
        YASHRAJ BUSINESS GROUP
      </div>
      <nav className="hidden lg:flex items-center space-x-8">
        <a className="text-[#002451] border-b-2 border-[#1A3A6B] font-bold py-2 transition-colors duration-200" href="/">Home</a>
        <a className="text-slate-600 font-medium hover:text-[#1A3A6B] transition-colors duration-200" href="/company-profile">About Us</a>
        <div className="relative group">
          <button className="text-slate-600 font-medium hover:text-[#1A3A6B] transition-colors duration-200 flex items-center gap-1">
            Services <span className="material-symbols-outlined text-sm">keyboard_arrow_down</span>
          </button>
          <div className="absolute top-full -left-4 w-64 bg-white tactical-shadow py-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
            <a className="block px-6 py-2 text-sm text-slate-600 hover:bg-surface-container-low hover:text-primary" href="/security-guard">Security Services</a>
            <a className="block px-6 py-2 text-sm text-slate-600 hover:bg-surface-container-low hover:text-primary" href="/house-keeping">Housekeeping</a>
            <a className="block px-6 py-2 text-sm text-slate-600 hover:bg-surface-container-low hover:text-primary" href="/facility-management">Facility Management</a>
            <a className="block px-6 py-2 text-sm text-slate-600 hover:bg-surface-container-low hover:text-primary" href="/manpower-labour">Manpower Supply</a>
            <a className="block px-6 py-2 text-sm text-slate-600 hover:bg-surface-container-low hover:text-primary" href="/contract-staffing">Contract Staffing</a>
            <a className="block px-6 py-2 text-sm text-slate-600 hover:bg-surface-container-low hover:text-primary" href="/pf-esic">PF &amp; ESIC</a>
            <a className="block px-6 py-2 text-sm text-slate-600 hover:bg-surface-container-low hover:text-primary" href="/all-taxation">Taxation</a>
          </div>
        </div>
        <a className="text-slate-600 font-medium hover:text-[#1A3A6B] transition-colors duration-200" href="/gallery">Gallery</a>
        <a className="text-slate-600 font-medium hover:text-[#1A3A6B] transition-colors duration-200" href="/career">Career</a>
        <a className="text-slate-600 font-medium hover:text-[#1A3A6B] transition-colors duration-200" href="/blog">Blog</a>
        <a className="text-slate-600 font-medium hover:text-[#1A3A6B] transition-colors duration-200" href="/contact">Contact</a>
      </nav>
      <button className="tactical-gradient text-white px-8 py-3 font-bold uppercase tracking-wider text-sm active:scale-95 transition-transform">
        Call Us
      </button>
    </header>
  );
};

export default Header;
