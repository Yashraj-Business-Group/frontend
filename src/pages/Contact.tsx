import React from 'react';

const Contact = () => {
  return (
    <div className="w-full bg-surface-bright min-h-screen pb-24">
      {/* Header */}
      <section className="bg-primary pt-32 pb-20 px-8 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent"></div>
        <div className="relative z-10 max-w-3xl mx-auto">
            <h1 className="font-headline text-5xl md:text-6xl font-black text-white mb-6 uppercase tracking-tighter">Contact Operations</h1>
            <p className="text-xl text-blue-100/90 font-medium leading-relaxed">
                Reach out to our command center for immediate security deployment, facility management quotes, or corporate inquiries.
            </p>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="max-w-7xl mx-auto px-8 -mt-10 relative z-20">
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
            <div className="bg-white tactical-shadow p-10 rounded-lg border-t-4 border-primary">
                <h3 className="font-headline text-2xl font-bold text-primary mb-6">Request Quotation</h3>
                <form className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">Full Name</label>
                            <input type="text" className="w-full border-gray-300 rounded-md shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50" placeholder="John Doe" />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">Company Name</label>
                            <input type="text" className="w-full border-gray-300 rounded-md shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50" placeholder="Acme Corp" />
                        </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">Email Address</label>
                            <input type="email" className="w-full border-gray-300 rounded-md shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50" placeholder="john@acme.com" />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">Phone Number</label>
                            <input type="tel" className="w-full border-gray-300 rounded-md shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50" placeholder="+91 XXXXX XXXXX" />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">Service Required</label>
                        <select className="w-full border-gray-300 rounded-md shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50">
                            <option>Select a service...</option>
                            <option>Security Services</option>
                            <option>Housekeeping</option>
                            <option>Facility Management</option>
                            <option>Manpower Supply</option>
                            <option>Other</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">Additional Requirements</label>
                        <textarea rows={4} className="w-full border-gray-300 rounded-md shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50" placeholder="Please describe your specific needs..."></textarea>
                    </div>

                    <button type="submit" className="w-full tactical-gradient text-white py-4 font-bold uppercase tracking-widest text-sm hover:opacity-90 transition-opacity rounded-sm shadow-lg">
                        Submit Request
                    </button>
                </form>
            </div>
        </div>
      </section>

    </div>
  );
};

export default Contact;
