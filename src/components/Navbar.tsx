import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar: React.FC = () => {
  const location = useLocation();
  const path = location.pathname;
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false); // For mobile accordion
  const [isSocialMenuOpen, setIsSocialMenuOpen] = useState(false);
  const socialMenuRef = useRef<HTMLDivElement | null>(null);

  const isActive = (route: string) => {
    if (route === '/') return path === '/';
    return path.startsWith(route);
  };

  const getLinkClass = (route: string) => {
    const baseClass = "transition-colors duration-200 py-2 border-b-2";
    if (isActive(route)) {
      return `${baseClass} text-[#002451] border-[#1A3A6B] font-bold`;
    }
    return `${baseClass} text-slate-600 border-transparent font-medium hover:text-[#1A3A6B]`;
  };

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsServicesOpen(false);
    setIsSocialMenuOpen(false);
  }, [path]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      setIsSocialMenuOpen(false);
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; }
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (socialMenuRef.current && !socialMenuRef.current.contains(event.target as Node)) {
        setIsSocialMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const serviceLinks = [
    { path: '/services/security-guard', label: 'Security Services' },
    { path: '/services/house-keeping', label: 'Housekeeping' },
    { path: '/services/facility-management', label: 'Facility Management' },
    { path: '/services/manpower-labour', label: 'Manpower Supply' },
    { path: '/services/contract-staffing', label: 'Contract Staffing' },
    { path: '/services/pf-esic', label: 'PF & ESIC' },
    { path: '/services/all-taxation', label: 'Taxation' }
  ];

  const socialLinks = [
    {
      name: 'WhatsApp Bot',
      href: 'https://wa.me/7276580907?text=Hello%20Yashraj%20Business%20Group',
      description: 'Chat with support instantly',
      accent: 'from-[#25D366] to-[#128C7E]',
      badge: 'social.png'
    },
    {
      name: 'Instagram',
      href: 'https://www.instagram.com/yashraj.business.group?igsh=ejN3NXIzNW5heXk3&utm_source=qr',
      description: 'Follow updates and campaigns',
      accent: 'from-[#F58529] via-[#DD2A7B] to-[#515BD4]',
      badge: 'instagram.png'
    },
    {
      name: 'Facebook',
      href: 'https://www.facebook.com/share/1ThFvN4Upy/?mibextid=wwXIfr',
      description: 'See business updates',
      accent: 'from-[#1877F2] to-[#0B66D5]',
      badge: 'facebook.png'
    }
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md shadow-[0px_20px_40px_rgba(0,36,81,0.08)]">
      <div className="flex justify-between items-center px-4 md:px-8 h-20">
        <Link to="/" className="flex items-center gap-2 md:gap-3 z-50">
          <img src="/Logo2.jpg" alt="Yashraj Business Group Logo" className="h-14 md:h-20 w-auto object-contain" />
          <div className="text-[14px] leading-tight sm:text-lg md:text-2xl font-black tracking-tighter text-primary uppercase font-headline">
            YASHRAJ BUSINESS GROUP
          </div>
        </Link>
        
        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center space-x-8">
          <Link className={getLinkClass('/')} to="/">Home</Link>
          <Link className={getLinkClass('/company-profile')} to="/company-profile">About Us</Link>
          <div className="relative group flex items-center h-full">
            <Link to="/services" className={`${getLinkClass('/services')} flex items-center gap-1`}>
              Services <span className="material-symbols-outlined text-sm">keyboard_arrow_down</span>
            </Link>
            <div className="absolute top-full -left-4 w-64 bg-white tactical-shadow py-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
              {serviceLinks.map((service) => (
                <Link 
                  key={service.path}
                  className={`block px-6 py-2 text-sm transition-colors ${path === service.path ? 'bg-surface-container-low text-primary font-bold border-l-4 border-primary' : 'text-slate-600 hover:bg-surface-container-low hover:text-primary font-medium'}`} 
                  to={service.path}
                >
                  {service.label}
                </Link>
              ))}
            </div>
          </div>
          <Link className={getLinkClass('/gallery')} to="/gallery">Gallery</Link>
          <Link className={getLinkClass('/job-portal')} to="/job-portal">Career</Link>
          <Link className={getLinkClass('/blog')} to="/blog">Blog</Link>
          <Link className={getLinkClass('/contact')} to="/contact">Contact</Link>
          <Link className={getLinkClass('/admin/login')} to="/admin/login">Admin</Link>
        </nav>

        {/* Mobile Actions */}
        <div className="flex items-center gap-2 sm:gap-3 z-50">
          <div ref={socialMenuRef} className="relative">
            <button
              type="button"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-[#D1D9E6] bg-white/95 px-3 py-2 text-[10px] font-bold uppercase tracking-[0.24em] text-[#002451] shadow-sm backdrop-blur transition-all duration-200 hover:bg-[#F5F7FB] hover:border-[#002451]/20 focus:outline-none focus:ring-2 focus:ring-[#002451]/20 sm:px-4 sm:text-[11px] md:py-2.5"
              onClick={() => setIsSocialMenuOpen((open) => !open)}
              aria-expanded={isSocialMenuOpen}
              aria-haspopup="true"
              aria-label="Open social handles"
            >
              <span className="material-symbols-outlined text-base md:text-lg">share</span>
              <span className="hidden sm:inline">Socials</span>
            </button>

            {isSocialMenuOpen && (
              <div className="absolute right-0 top-full mt-2 w-64 rounded-2xl border border-slate-200 bg-white p-2 shadow-2xl z-[60]">
                <div className="px-2 py-1.5 text-[10px] font-bold uppercase tracking-[0.22em] text-slate-500">Connect with us</div>
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-3 rounded-xl px-3 py-2.5 transition-colors hover:bg-slate-50"
                    onClick={() => setIsSocialMenuOpen(false)}
                  >
                    <span className={`relative flex h-9 w-9 flex-shrink-0 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br ${social.accent} p-[1px] shadow-sm`}>
                      <img
                        src={`/${social.badge}`}
                        alt={`${social.name} logo`}
                        className="h-full w-full rounded-full object-cover bg-white"
                      />
                    </span>
                    <span className="flex-1">
                      <span className="block text-sm font-bold text-[#002451]">{social.name}</span>
                      <span className="block text-xs text-slate-500">{social.description}</span>
                    </span>
                  </a>
                ))}
              </div>
            )}
          </div>

          <button className="lg:hidden text-[#002451] p-1 sm:p-2" onClick={() => setIsMobileMenuOpen(true)}>
            <span className="material-symbols-outlined text-3xl">menu</span>
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 bg-[#002451]/60 backdrop-blur-sm z-[60] lg:hidden transition-opacity duration-300 ${isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`} onClick={() => setIsMobileMenuOpen(false)}></div>
      
      {/* Mobile Menu Panel */}
      <div className={`fixed top-0 right-0 h-[100dvh] w-[85%] max-w-sm bg-white z-[60] lg:hidden transform transition-transform duration-300 ease-in-out shadow-2xl flex flex-col ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="h-20 border-b border-gray-100 flex items-center justify-between px-6">
          <span className="font-headline font-black text-xl text-[#002451] uppercase">Menu</span>
          <button onClick={() => setIsMobileMenuOpen(false)} className="text-[#002451] p-1 hover:bg-slate-100 rounded-full transition-colors flex items-center justify-center">
            <span className="material-symbols-outlined text-3xl">close</span>
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto py-6 px-6 flex flex-col gap-2">
          <Link to="/" className={`text-lg font-bold py-3 border-b border-gray-100 ${isActive('/') ? 'text-primary' : 'text-slate-700'}`}>Home</Link>
          <Link to="/company-profile" className={`text-lg font-bold py-3 border-b border-gray-100 ${isActive('/company-profile') ? 'text-primary' : 'text-slate-700'}`}>About Us</Link>
          
          <div className="py-3 border-b border-gray-100">
            <button 
              className={`w-full flex justify-between items-center text-lg font-bold ${isActive('/services') ? 'text-primary' : 'text-slate-700'}`}
              onClick={() => setIsServicesOpen(!isServicesOpen)}
            >
              Services
              <span className={`material-symbols-outlined transition-transform ${isServicesOpen ? 'rotate-180' : ''}`}>keyboard_arrow_down</span>
            </button>
            <div className={`flex flex-col gap-3 overflow-hidden transition-all duration-300 ${isServicesOpen ? 'max-h-96 mt-4' : 'max-h-0'}`}>
              <Link to="/services" className="pl-4 text-sm font-bold text-primary">All Services</Link>
              {serviceLinks.map((service) => (
                <Link key={service.path} to={service.path} className={`pl-4 text-sm ${path === service.path ? 'text-primary font-bold' : 'text-slate-600'}`}>{service.label}</Link>
              ))}
            </div>
          </div>
          
          <Link to="/gallery" className={`text-lg font-bold py-3 border-b border-gray-100 ${isActive('/gallery') ? 'text-primary' : 'text-slate-700'}`}>Gallery</Link>
          <Link to="/job-portal" className={`text-lg font-bold py-3 border-b border-gray-100 ${isActive('/job-portal') ? 'text-primary' : 'text-slate-700'}`}>Career</Link>
          <Link to="/blog" className={`text-lg font-bold py-3 border-b border-gray-100 ${isActive('/blog') ? 'text-primary' : 'text-slate-700'}`}>Blog</Link>
          <Link to="/contact" className={`text-lg font-bold py-3 border-b border-gray-100 ${isActive('/contact') ? 'text-primary' : 'text-slate-700'}`}>Contact</Link>
          <Link to="/admin/login" className={`text-lg font-bold py-3 border-b border-gray-100 ${isActive('/admin/login') ? 'text-primary' : 'text-slate-700'}`}>Admin</Link>
        </div>
        
        <div className="p-6 border-t border-gray-100">
          <a href="tel:+918090785907" className="w-full block text-center tactical-gradient text-white py-4 font-bold uppercase tracking-wider text-sm rounded">
            Call Us Now
          </a>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
