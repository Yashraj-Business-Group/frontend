import React from 'react';
import { Link } from 'react-router-dom';

const Services = () => {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative py-32 bg-primary text-white overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20">
            <div className="absolute inset-0 bg-gradient-to-r from-primary to-transparent"></div>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-8">
            <span className="label-sm font-bold uppercase tracking-[0.2em] text-on-primary-container mb-4 block">Our Divisions</span>
            <h1 className="font-headline text-5xl md:text-7xl font-extrabold tracking-tighter leading-tight mb-6">
                INTEGRATED <br/>BUSINESS SOLUTIONS
            </h1>
            <p className="text-xl max-w-2xl text-slate-300 font-medium leading-relaxed">
                We provide a comprehensive suite of tactical, operational, and facility management services tailored for corporate enterprises and industrial complexes.
            </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 px-8 bg-surface-bright">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          
          {/* Security */}
          <Link to="/services/security-guard" className="bg-white p-10 tactical-shadow border-t-4 border-primary group hover:-translate-y-2 transition-transform duration-300 block">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6 text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                <span className="material-symbols-outlined text-3xl">security</span>
            </div>
            <h3 className="font-headline text-2xl font-bold text-primary mb-4">Security Services</h3>
            <p className="text-slate-600 mb-6 leading-relaxed">
                Manned guarding, tactical risk management, and electronic surveillance for maximum asset protection.
            </p>
            <div className="text-primary font-bold uppercase text-xs tracking-widest flex items-center gap-2 group-hover:gap-4 transition-all">
                Request Quote <span className="material-symbols-outlined">trending_flat</span>
            </div>
          </Link>

          {/* Housekeeping */}
          <Link to="/services/house-keeping" className="bg-white p-10 tactical-shadow border-t-4 border-primary-container group hover:-translate-y-2 transition-transform duration-300 block">
            <div className="w-16 h-16 bg-primary-container/10 rounded-full flex items-center justify-center mb-6 text-primary-container group-hover:bg-primary-container group-hover:text-white transition-colors duration-300">
                <span className="material-symbols-outlined text-3xl">cleaning_services</span>
            </div>
            <h3 className="font-headline text-2xl font-bold text-primary mb-4">Housekeeping</h3>
            <p className="text-slate-600 mb-6 leading-relaxed">
                Corporate sanitation, aesthetic maintenance, and specialized industrial cleaning solutions.
            </p>
            <div className="text-primary-container font-bold uppercase text-xs tracking-widest flex items-center gap-2 group-hover:gap-4 transition-all">
                Request Quote <span className="material-symbols-outlined">trending_flat</span>
            </div>
          </Link>

          {/* Facility Management */}
          <Link to="/services/facility-management" className="bg-white p-10 tactical-shadow border-t-4 border-tertiary-container group hover:-translate-y-2 transition-transform duration-300 block">
            <div className="w-16 h-16 bg-tertiary-container/10 rounded-full flex items-center justify-center mb-6 text-tertiary-container group-hover:bg-tertiary-container group-hover:text-white transition-colors duration-300">
                <span className="material-symbols-outlined text-3xl">domain</span>
            </div>
            <h3 className="font-headline text-2xl font-bold text-tertiary-container mb-4">Facility Management</h3>
            <p className="text-slate-600 mb-6 leading-relaxed">
                Complete ecosystem upkeep, technical support, and building maintenance services.
            </p>
            <div className="text-tertiary-container font-bold uppercase text-xs tracking-widest flex items-center gap-2 group-hover:gap-4 transition-all">
                Request Quote <span className="material-symbols-outlined">trending_flat</span>
            </div>
          </Link>

          {/* Manpower */}
          <Link to="/services/manpower-labour" className="bg-white p-10 tactical-shadow border-t-4 border-slate-700 group hover:-translate-y-2 transition-transform duration-300 block">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-6 text-slate-700 group-hover:bg-slate-700 group-hover:text-white transition-colors duration-300">
                <span className="material-symbols-outlined text-3xl">groups</span>
            </div>
            <h3 className="font-headline text-2xl font-bold text-slate-800 mb-4">Manpower Supply</h3>
            <p className="text-slate-600 mb-6 leading-relaxed">
                Deploying skilled, semi-skilled, and specialized labor forces for industrial scale projects.
            </p>
            <div className="text-slate-700 font-bold uppercase text-xs tracking-widest flex items-center gap-2 group-hover:gap-4 transition-all">
                Request Quote <span className="material-symbols-outlined">trending_flat</span>
            </div>
          </Link>

          {/* Contract Staffing */}
          <Link to="/services/contract-staffing" className="bg-white p-10 tactical-shadow border-t-4 border-slate-700 group hover:-translate-y-2 transition-transform duration-300 block">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-6 text-slate-700 group-hover:bg-slate-700 group-hover:text-white transition-colors duration-300">
                <span className="material-symbols-outlined text-3xl">assignment_ind</span>
            </div>
            <h3 className="font-headline text-2xl font-bold text-slate-800 mb-4">Contract Staffing</h3>
            <p className="text-slate-600 mb-6 leading-relaxed">
                Flexible workforce solutions for seasonal demands, temporary leave cover, and long-term project stability.
            </p>
            <div className="text-slate-700 font-bold uppercase text-xs tracking-widest flex items-center gap-2 group-hover:gap-4 transition-all">
                Request Quote <span className="material-symbols-outlined">trending_flat</span>
            </div>
          </Link>

          {/* Taxation & PF */}
          <Link to="/services/all-taxation" className="bg-white p-10 tactical-shadow border-t-4 border-slate-700 group hover:-translate-y-2 transition-transform duration-300 block">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-6 text-slate-700 group-hover:bg-slate-700 group-hover:text-white transition-colors duration-300">
                <span className="material-symbols-outlined text-3xl">payments</span>
            </div>
            <h3 className="font-headline text-2xl font-bold text-slate-800 mb-4">Taxation & PF</h3>
            <p className="text-slate-600 mb-6 leading-relaxed">
                Comprehensive regulatory compliance, PF management, ESIC support and strategic taxation advisory services.
            </p>
            <div className="text-slate-700 font-bold uppercase text-xs tracking-widest flex items-center gap-2 group-hover:gap-4 transition-all">
                Request Quote <span className="material-symbols-outlined">trending_flat</span>
            </div>
          </Link>

        </div>
      </section>
      
      {/* CTA Section */}
      <section className="bg-tertiary-container py-24 px-8 text-white text-center">
        <h2 className="font-headline text-4xl font-black uppercase tracking-tighter mb-6">Need a custom security plan?</h2>
        <p className="text-xl max-w-2xl mx-auto mb-10 opacity-90">Our experts will conduct a thorough risk assessment of your premises and propose a tailored tactical solution.</p>
        <button className="bg-white text-tertiary-container px-12 py-5 font-black uppercase tracking-widest text-sm hover:bg-slate-100 transition-colors">
            Contact Our Experts
        </button>
      </section>

    </div>
  );
};

export default Services;
