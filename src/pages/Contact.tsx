import React from 'react';

const Contact = () => {
  return (
    <div className="w-full bg-surface-bright min-h-screen pb-24">
      {/* Header */}
      <section className="bg-primary pt-32 pb-20 px-4 md:px-8 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent"></div>
        <div className="relative z-10 max-w-3xl mx-auto">
            <h1 className="font-headline text-5xl md:text-6xl font-black text-white mb-6 uppercase tracking-tighter">Contact Operations</h1>
            <p className="text-xl text-blue-100/90 font-medium leading-relaxed">
                Reach out to our command center for immediate security deployment, facility management quotes, or corporate inquiries.
            </p>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 -mt-10 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            
            {/* Contact Info Cards */}
            <div className="space-y-6">
                
                <div className="bg-white tactical-shadow p-8 rounded-lg border-t-4 border-primary flex items-start gap-6">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary shrink-0">
                        <span className="material-symbols-outlined text-2xl">location_on</span>
                    </div>
                    <div>
                        <h3 className="font-headline text-xl font-bold text-slate-800 mb-2">Corporate Headquarters</h3>
                        <p className="text-slate-600 leading-relaxed mb-4">
                            Plot No. 44, Business Hub Center,<br/>
                            Tech Park Phase II, Mumbai - 400001
                        </p>
                        <a href="#" className="text-primary font-bold uppercase text-xs tracking-widest flex items-center gap-2 hover:gap-4 transition-all">
                            Get Directions <span className="material-symbols-outlined">trending_flat</span>
                        </a>
                    </div>
                </div>

                <div className="bg-white tactical-shadow p-8 rounded-lg border-t-4 border-primary flex items-start gap-6">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary shrink-0">
                        <span className="material-symbols-outlined text-2xl">call</span>
                    </div>
                    <div>
                        <h3 className="font-headline text-xl font-bold text-slate-800 mb-2">24/7 Control Room</h3>
                        <p className="text-slate-600 leading-relaxed mb-4">
                            Primary: +91 22 2548 9XXX<br/>
                            Emergency: +91 98XXX XXXXX
                        </p>
                        <button className="tactical-gradient text-white px-6 py-2 font-bold uppercase tracking-wider text-xs active:scale-95 transition-transform rounded-sm">
                            Call Now
                        </button>
                    </div>
                </div>

                <div className="bg-white tactical-shadow p-8 rounded-lg border-t-4 border-primary flex items-start gap-6">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary shrink-0">
                        <span className="material-symbols-outlined text-2xl">mail</span>
                    </div>
                    <div>
                        <h3 className="font-headline text-xl font-bold text-slate-800 mb-2">Direct Communications</h3>
                        <p className="text-slate-600 leading-relaxed mb-4">
                            Sales: sales@yashrajbusiness.com<br/>
                            Support: info@yashrajbusiness.com
                        </p>
                    </div>
                </div>

            </div>

            {/* Contact Form */}
            <div className="relative z-20">
              {/* Animated Glow Background behind the form */}
              <div className="absolute -inset-1 bg-gradient-to-r from-[#002451] to-blue-400 rounded-2xl blur-lg opacity-20 animate-pulse pointer-events-none"></div>

              <div className="bg-white p-10 rounded-xl shadow-[0px_20px_40px_rgba(0,36,81,0.08)] border border-slate-100 relative overflow-hidden transition-transform duration-500 hover:-translate-y-1 group/form z-10 backdrop-blur-sm">
                {/* Decorative Animated Top Border */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#002451] via-blue-500 to-[#002451] bg-[length:200%_auto] animate-gradient"></div>
                
                <h3 className="font-headline text-3xl font-black text-[#002451] uppercase tracking-tighter mb-2">Request Quotation</h3>
                <p className="text-sm text-slate-500 mb-8 font-medium">Fill out the form below to get a customized plan for your business.</p>

                <form className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="relative group/input">
                            <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-1 group-focus-within/input:text-[#002451] transition-colors">Full Name</label>
                            <div className="relative">
                                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within/input:text-[#002451] transition-colors text-lg">person</span>
                                <input required type="text" className="w-full bg-slate-50/80 border border-slate-200 text-slate-800 rounded-md pl-11 pr-4 py-3 text-sm focus:bg-white focus:border-[#002451] focus:ring-4 focus:ring-[#002451]/10 outline-none transition-all placeholder:text-slate-400 group-hover/input:border-slate-300 shadow-sm" placeholder="John Doe" />
                            </div>
                        </div>
                        <div className="relative group/input">
                            <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-1 group-focus-within/input:text-[#002451] transition-colors">Company Name</label>
                            <div className="relative">
                                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within/input:text-[#002451] transition-colors text-lg">domain</span>
                                <input required type="text" className="w-full bg-slate-50/80 border border-slate-200 text-slate-800 rounded-md pl-11 pr-4 py-3 text-sm focus:bg-white focus:border-[#002451] focus:ring-4 focus:ring-[#002451]/10 outline-none transition-all placeholder:text-slate-400 group-hover/input:border-slate-300 shadow-sm" placeholder="Acme Corp" />
                            </div>
                        </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="relative group/input">
                            <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-1 group-focus-within/input:text-[#002451] transition-colors">Email Address</label>
                            <div className="relative">
                                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within/input:text-[#002451] transition-colors text-lg">mail</span>
                                <input required type="email" className="w-full bg-slate-50/80 border border-slate-200 text-slate-800 rounded-md pl-11 pr-4 py-3 text-sm focus:bg-white focus:border-[#002451] focus:ring-4 focus:ring-[#002451]/10 outline-none transition-all placeholder:text-slate-400 group-hover/input:border-slate-300 shadow-sm" placeholder="john@acme.com" />
                            </div>
                        </div>
                        <div className="relative group/input">
                            <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-1 group-focus-within/input:text-[#002451] transition-colors">Phone Number</label>
                            <div className="relative">
                                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within/input:text-[#002451] transition-colors text-lg">call</span>
                                <input required type="tel" className="w-full bg-slate-50/80 border border-slate-200 text-slate-800 rounded-md pl-11 pr-4 py-3 text-sm focus:bg-white focus:border-[#002451] focus:ring-4 focus:ring-[#002451]/10 outline-none transition-all placeholder:text-slate-400 group-hover/input:border-slate-300 shadow-sm" placeholder="+91 XXXXX XXXXX" />
                            </div>
                        </div>
                    </div>

                    <div className="relative group/input">
                        <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-1 group-focus-within/input:text-[#002451] transition-colors">Service Required</label>
                        <div className="relative">
                            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within/input:text-[#002451] transition-colors text-lg">business_center</span>
                            <select className="w-full bg-slate-50/80 border border-slate-200 text-slate-800 rounded-md pl-11 pr-4 py-3 text-sm focus:bg-white focus:border-[#002451] focus:ring-4 focus:ring-[#002451]/10 outline-none transition-all appearance-none group-hover/input:border-slate-300 shadow-sm">
                                <option>Select a service...</option>
                                <option>Security Services</option>
                                <option>Housekeeping</option>
                                <option>Facility Management</option>
                                <option>Manpower Supply</option>
                                <option>Other</option>
                            </select>
                            <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none text-lg">expand_more</span>
                        </div>
                    </div>

                    <div className="relative group/input">
                        <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-1 group-focus-within/input:text-[#002451] transition-colors">Additional Requirements</label>
                        <div className="relative">
                            <span className="material-symbols-outlined absolute left-4 top-4 text-slate-400 group-focus-within/input:text-[#002451] transition-colors text-lg">description</span>
                            <textarea rows={4} className="w-full bg-slate-50/80 border border-slate-200 text-slate-800 rounded-md pl-11 pr-4 py-3 text-sm focus:bg-white focus:border-[#002451] focus:ring-4 focus:ring-[#002451]/10 outline-none transition-all placeholder:text-slate-400 resize-none group-hover/input:border-slate-300 shadow-sm" placeholder="Please describe your specific needs..."></textarea>
                        </div>
                    </div>

                    <button type="submit" className="relative w-full overflow-hidden bg-[#002451] text-white py-4 font-bold uppercase tracking-widest text-xs rounded-md shadow-[0_8px_20px_rgba(0,36,81,0.25)] hover:shadow-[0_12px_25px_rgba(0,36,81,0.35)] active:scale-[0.98] transition-all mt-4 flex items-center justify-center gap-2 group cursor-pointer border border-[#002451]/50">
                        <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></span>
                        <span className="relative z-10 flex items-center gap-2">
                            Submit Request
                            <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform duration-300">send</span>
                        </span>
                    </button>
                </form>
              </div>
            </div>
        </div>
      </section>

    </div>
  );
};

export default Contact;
