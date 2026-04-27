import React from 'react';

const JobPortal = () => {
  return (
    <div className="w-full bg-surface-bright min-h-screen pb-24">
      {/* Header */}
      <section className="bg-primary pt-32 pb-20 px-8 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent"></div>
        <div className="relative z-10 max-w-3xl mx-auto">
            <h1 className="font-headline text-5xl md:text-6xl font-black text-white mb-6 uppercase tracking-tighter">Careers at Yashraj</h1>
            <p className="text-xl text-blue-100/90 font-medium leading-relaxed">
                Join our elite tactical forces and facility management teams. We are currently recruiting across 16+ cities.
            </p>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="max-w-7xl mx-auto px-8 -mt-10 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            
            {/* Search and Filters Sidebar */}
            <div className="bg-white tactical-shadow p-8 rounded-lg border-t-4 border-primary self-start">
                <h3 className="font-headline text-xl font-bold text-primary mb-6">Filter Positions</h3>
                
                <div className="space-y-6">
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">Job Role</label>
                        <select className="w-full border-gray-300 rounded-md shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50">
                            <option>All Roles</option>
                            <option>Security Guard</option>
                            <option>Head Guard</option>
                            <option>Facility Manager</option>
                            <option>Housekeeping Staff</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">Location</label>
                        <select className="w-full border-gray-300 rounded-md shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50">
                            <option>All Cities</option>
                            <option>Mumbai</option>
                            <option>Pune</option>
                            <option>Delhi</option>
                            <option>Bangalore</option>
                        </select>
                    </div>

                    <button className="w-full bg-primary text-white py-3 font-bold uppercase tracking-widest text-xs hover:bg-primary/90 transition-colors">
                        Apply Filters
                    </button>
                </div>
            </div>

            {/* Job Listings */}
            <div className="lg:col-span-2 space-y-6">
                
                {/* Job Card 1 */}
                <div className="bg-white tactical-shadow p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 hover:border-l-4 hover:border-primary transition-all">
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <span className="bg-green-100 text-green-800 text-xs font-bold px-2.5 py-0.5 rounded uppercase tracking-wider">Hiring Now</span>
                            <span className="text-slate-500 text-sm font-medium">Posted 2 days ago</span>
                        </div>
                        <h3 className="font-headline text-2xl font-bold text-slate-800 mb-2">Senior Security Guard</h3>
                        <div className="flex flex-wrap items-center gap-4 text-sm text-slate-600 font-medium">
                            <span className="flex items-center gap-1"><span className="material-symbols-outlined text-sm">location_on</span> Mumbai</span>
                            <span className="flex items-center gap-1"><span className="material-symbols-outlined text-sm">work</span> Full-Time</span>
                            <span className="flex items-center gap-1"><span className="material-symbols-outlined text-sm">currency_rupee</span> ₹18,000 - ₹22,000 / month</span>
                        </div>
                    </div>
                    <button className="whitespace-nowrap tactical-gradient text-white px-8 py-3 font-bold uppercase tracking-wider text-sm active:scale-95 transition-transform">
                        Apply Now
                    </button>
                </div>

                {/* Job Card 2 */}
                <div className="bg-white tactical-shadow p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 hover:border-l-4 hover:border-primary transition-all">
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <span className="text-slate-500 text-sm font-medium">Posted 1 week ago</span>
                        </div>
                        <h3 className="font-headline text-2xl font-bold text-slate-800 mb-2">Facility Manager</h3>
                        <div className="flex flex-wrap items-center gap-4 text-sm text-slate-600 font-medium">
                            <span className="flex items-center gap-1"><span className="material-symbols-outlined text-sm">location_on</span> Pune</span>
                            <span className="flex items-center gap-1"><span className="material-symbols-outlined text-sm">work</span> Full-Time</span>
                            <span className="flex items-center gap-1"><span className="material-symbols-outlined text-sm">currency_rupee</span> ₹35,000 - ₹45,000 / month</span>
                        </div>
                    </div>
                    <button className="whitespace-nowrap tactical-gradient text-white px-8 py-3 font-bold uppercase tracking-wider text-sm active:scale-95 transition-transform">
                        Apply Now
                    </button>
                </div>

                {/* Job Card 3 */}
                <div className="bg-white tactical-shadow p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 hover:border-l-4 hover:border-primary transition-all">
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <span className="text-slate-500 text-sm font-medium">Posted 2 weeks ago</span>
                        </div>
                        <h3 className="font-headline text-2xl font-bold text-slate-800 mb-2">Housekeeping Staff</h3>
                        <div className="flex flex-wrap items-center gap-4 text-sm text-slate-600 font-medium">
                            <span className="flex items-center gap-1"><span className="material-symbols-outlined text-sm">location_on</span> Navi Mumbai</span>
                            <span className="flex items-center gap-1"><span className="material-symbols-outlined text-sm">work</span> Contract</span>
                            <span className="flex items-center gap-1"><span className="material-symbols-outlined text-sm">currency_rupee</span> ₹14,000 - ₹16,000 / month</span>
                        </div>
                    </div>
                    <button className="whitespace-nowrap tactical-gradient text-white px-8 py-3 font-bold uppercase tracking-wider text-sm active:scale-95 transition-transform">
                        Apply Now
                    </button>
                </div>

            </div>
        </div>
      </section>

    </div>
  );
};

export default JobPortal;
