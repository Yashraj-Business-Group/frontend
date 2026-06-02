import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown, Menu, X, User } from 'lucide-react';

const Navbar: React.FC = () => {
  const location = useLocation();
  const path = location.pathname;
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false); // For mobile accordion
  const drawerRef = useRef<HTMLDivElement>(null);

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
  }, [path]);

  // Lock body scroll when mobile menu is open (iOS-safe + blocks touch scroll via CSS)
  useEffect(() => {
    const html = document.documentElement;

    if (isMobileMenuOpen) {
      const scrollY = window.scrollY;
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      html.style.overflow = 'hidden';
      document.body.classList.add('menu-open');
    } else {
      const scrollY = document.body.style.top;
      document.body.classList.remove('menu-open');
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      html.style.overflow = '';
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || '0') * -1);
      }
    }

    return () => {
      document.body.classList.remove('menu-open');
      const scrollY = document.body.style.top;
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      html.style.overflow = '';
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || '0') * -1);
      }
    };
  }, [isMobileMenuOpen]);


  const serviceLinks = [
    { path: '/services/security-guard', label: 'Security Services' },
    { path: '/services/house-keeping', label: 'Housekeeping' },
    { path: '/services/facility-management', label: 'Facility Management' },
    { path: '/services/manpower-labour', label: 'Manpower Supply' },
    { path: '/services/contract-staffing', label: 'Contract Staffing' },
    { path: '/services/pf-esic', label: 'PF & ESIC' },
    { path: '/services/all-taxation', label: 'Taxation' },
    { path: '/services/psara-licensing', label: 'PSARA Licensing' }
  ];

  const socialLinks = [
    {
      name: 'WhatsApp',
      href: 'https://wa.me/7276580907?text=Hello%20Yashraj%20Business%20Group',
      badge: 'social.png'
    },
    {
      name: 'Instagram',
      href: 'https://www.instagram.com/yashraj.business.group?igsh=ejN3NXIzNW5heXk3&utm_source=qr',
      badge: 'instagram.png'
    },
    {
      name: 'Facebook',
      href: 'https://www.facebook.com/share/1ThFvN4Upy/?mibextid=wwXIfr',
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
              Services <ChevronDown className="w-4 h-4" />
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
        </nav>

        {/* Right Corner Actions */}
        <div className="flex items-center gap-2 sm:gap-3 z-50">
          <Link to="/admin/login" className="inline-flex items-center justify-center rounded-full border border-[#D1D9E6] bg-white/95 p-2 md:p-2.5 text-[#002451] shadow-sm backdrop-blur transition-all duration-200 hover:bg-[#F5F7FB] hover:border-[#002451]/20 focus:outline-none focus:ring-2 focus:ring-[#002451]/20" aria-label="Admin Login">
            <User className="w-4 h-4 md:w-5 md:h-5" />
          </Link>
          
          {socialLinks.map((social) => (
            <a
              key={social.name}
              href={social.href}
              target="_blank"
              rel="noreferrer"
              className="hidden lg:inline-flex items-center justify-center rounded-full border border-[#D1D9E6] bg-white/95 p-2 md:p-2.5 shadow-sm backdrop-blur transition-all duration-200 hover:bg-[#F5F7FB] hover:border-[#002451]/20 hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#002451]/20"
              aria-label={social.name}
            >
              <img
                src={`/${social.badge}`}
                alt={`${social.name} logo`}
                className="w-4 h-4 md:w-5 md:h-5 rounded-full object-cover bg-white"
              />
            </a>
          ))}

          <button className="lg:hidden text-[#002451] p-1 sm:p-2" onClick={() => setIsMobileMenuOpen(true)}>
            <Menu className="w-8 h-8" />
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 bg-[#002451]/60 backdrop-blur-sm z-[60] lg:hidden transition-opacity duration-300 ${isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`} onClick={() => setIsMobileMenuOpen(false)}></div>
      
      {/* Mobile Menu Panel */}
      <div ref={drawerRef} className={`fixed top-0 right-0 h-[100dvh] w-[85%] max-w-sm bg-white z-[60] lg:hidden transform transition-transform duration-300 ease-in-out shadow-2xl flex flex-col ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="h-20 border-b border-gray-100 flex items-center justify-between px-6">
          <span className="font-headline font-black text-xl text-[#002451] uppercase">Menu</span>
          <button onClick={() => setIsMobileMenuOpen(false)} className="text-[#002451] p-1 hover:bg-slate-100 rounded-full transition-colors flex items-center justify-center">
            <X className="w-8 h-8" />
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto drawer-scroll-area py-6 px-6 flex flex-col gap-2">
          <Link to="/" className={`text-lg font-bold py-3 border-b border-gray-100 ${isActive('/') ? 'text-primary' : 'text-slate-700'}`}>Home</Link>
          <Link to="/company-profile" className={`text-lg font-bold py-3 border-b border-gray-100 ${isActive('/company-profile') ? 'text-primary' : 'text-slate-700'}`}>About Us</Link>
          
          <div className="py-3 border-b border-gray-100">
            <button 
              className={`w-full flex justify-between items-center text-lg font-bold ${isActive('/services') ? 'text-primary' : 'text-slate-700'}`}
              onClick={() => setIsServicesOpen(!isServicesOpen)}
            >
              Services
              <ChevronDown className={`w-6 h-6 transition-transform ${isServicesOpen ? 'rotate-180' : ''}`} />
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
        </div>
        
        <div className="p-6 border-t border-gray-100 flex flex-col gap-4">
          {/* Social Icons in Drawer */}
          <div className="flex items-center justify-center gap-4">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                className="flex flex-col items-center gap-1 group"
                aria-label={social.name}
              >
                <span className="inline-flex items-center justify-center rounded-full border border-[#D1D9E6] bg-white p-3 shadow-sm transition-all duration-200 group-hover:bg-[#F5F7FB] group-hover:border-[#002451]/20 group-hover:scale-105 active:scale-95">
                  <img
                    src={`/${social.badge}`}
                    alt={`${social.name} logo`}
                    className="w-6 h-6 rounded-full object-cover bg-white"
                  />
                </span>
                <span className="text-xs text-slate-500 font-medium">{social.name}</span>
              </a>
            ))}
          </div>
          <a href="tel:+918090785907" className="w-full block text-center tactical-gradient text-white py-4 font-bold uppercase tracking-wider text-sm rounded">
            Call Us Now
          </a>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
