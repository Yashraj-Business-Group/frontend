import React, { useState, useEffect } from 'react';

const JobPortal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState('');
  const [isAnimating, setIsAnimating] = useState(false);

  const openModal = (jobTitle: string) => {
    setSelectedJob(jobTitle);
    setIsModalOpen(true);
    // Slight delay for animation classes
    setTimeout(() => setIsAnimating(true), 10);
  };

  const closeModal = () => {
    setIsAnimating(false);
    setTimeout(() => {
      setIsModalOpen(false);
      setSelectedJob('');
    }, 300); // Wait for transition before unmounting
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate submission
    closeModal();
    alert(`Application for ${selectedJob} submitted successfully!`);
  };

  // Prevent scrolling when modal is open
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; }
  }, [isModalOpen]);

  return (
    <div className="w-full bg-surface-bright min-h-screen pb-24 relative">
      {/* Header */}
      <section className="bg-primary pt-32 pb-20 px-4 md:px-8 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent"></div>
        <div className="relative z-10 max-w-3xl mx-auto">
            <h1 className="font-headline text-5xl md:text-6xl font-black text-white mb-6 uppercase tracking-tighter">Careers at Yashraj</h1>
            <p className="text-xl text-blue-100/90 font-medium leading-relaxed">
                Join our elite tactical forces and facility management teams. We are currently recruiting across 16+ cities.
            </p>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 -mt-10 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            
            {/* Search and Filters Sidebar */}
            <div className="bg-white tactical-shadow p-6 md:p-8 rounded-lg border-t-4 border-primary self-start">
                <h3 className="font-headline text-xl font-bold text-primary mb-6">Filter Positions</h3>
                
                <div className="space-y-6">
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">Job Role</label>
                        <select className="w-full border-gray-300 rounded-md shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50 bg-slate-50">
                            <option>All Roles</option>
                            <option>Security Guard</option>
                            <option>Head Guard</option>
                            <option>Facility Manager</option>
                            <option>Housekeeping Staff</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">Location</label>
                        <select className="w-full border-gray-300 rounded-md shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50 bg-slate-50">
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
                <div className="bg-white tactical-shadow p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 hover:border-l-4 hover:border-primary transition-all rounded-lg">
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
                    <button onClick={() => openModal('Senior Security Guard')} className="whitespace-nowrap bg-[#002451] text-white px-8 py-3 font-bold uppercase tracking-wider text-sm shadow-lg hover:shadow-xl hover:bg-[#1A3A6B] active:scale-95 transition-all rounded">
                        Apply Now
                    </button>
                </div>

                {/* Job Card 2 */}
                <div className="bg-white tactical-shadow p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 hover:border-l-4 hover:border-primary transition-all rounded-lg">
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
                    <button onClick={() => openModal('Facility Manager')} className="whitespace-nowrap bg-[#002451] text-white px-8 py-3 font-bold uppercase tracking-wider text-sm shadow-lg hover:shadow-xl hover:bg-[#1A3A6B] active:scale-95 transition-all rounded">
                        Apply Now
                    </button>
                </div>

                {/* Job Card 3 */}
                <div className="bg-white tactical-shadow p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 hover:border-l-4 hover:border-primary transition-all rounded-lg">
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
                    <button onClick={() => openModal('Housekeeping Staff')} className="whitespace-nowrap bg-[#002451] text-white px-8 py-3 font-bold uppercase tracking-wider text-sm shadow-lg hover:shadow-xl hover:bg-[#1A3A6B] active:scale-95 transition-all rounded">
                        Apply Now
                    </button>
                </div>

            </div>
        </div>
      </section>

      {/* Application Modal overlay */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 sm:px-0">
          {/* Backdrop with fade-in effect */}
          <div 
            className={`absolute inset-0 bg-[#002451]/40 backdrop-blur-md transition-opacity duration-300 ${isAnimating ? 'opacity-100' : 'opacity-0'}`} 
            onClick={closeModal}
          ></div>
          
          {/* Modal Container with scale/slide-up effect */}
          <div className={`relative z-10 w-full max-w-lg transition-all duration-300 transform ${isAnimating ? 'scale-100 translate-y-0 opacity-100' : 'scale-95 translate-y-10 opacity-0'}`}>
            
            {/* Animated Glow Background behind the form */}
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-teal-400 rounded-2xl blur-lg opacity-30 animate-pulse pointer-events-none"></div>

            <div className="bg-white p-8 sm:p-10 rounded-2xl shadow-[0px_20px_40px_rgba(0,36,81,0.2)] border border-slate-100 relative overflow-hidden backdrop-blur-sm">
              {/* Decorative Animated Top Border */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#002451] via-blue-500 to-[#002451] bg-[length:200%_auto] animate-gradient"></div>
              
              {/* Close Button */}
              <button onClick={closeModal} className="absolute top-4 right-4 text-slate-400 hover:text-red-500 hover:rotate-90 transition-all duration-300 p-2">
                <span className="material-symbols-outlined">close</span>
              </button>

              <h3 className="font-headline text-2xl sm:text-3xl font-black text-[#002451] uppercase tracking-tighter mb-2">Apply for Role</h3>
              <p className="text-sm text-slate-500 mb-8 font-medium">Position: <strong className="text-primary">{selectedJob}</strong></p>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Full Name */}
                <div className="relative group/input">
                  <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-1 group-focus-within/input:text-[#002451] transition-colors">Full Name</label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within/input:text-[#002451] transition-colors text-lg">person</span>
                    <input required type="text" className="w-full bg-slate-50/80 border border-slate-200 text-slate-800 rounded-md pl-11 pr-4 py-3 text-sm focus:bg-white focus:border-[#002451] focus:ring-4 focus:ring-[#002451]/10 outline-none transition-all placeholder:text-slate-400 group-hover/input:border-slate-300 shadow-sm" placeholder="John Doe" />
                  </div>
                </div>

                {/* Email Address */}
                <div className="relative group/input">
                  <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-1 group-focus-within/input:text-[#002451] transition-colors">Email Address</label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within/input:text-[#002451] transition-colors text-lg">mail</span>
                    <input required type="email" className="w-full bg-slate-50/80 border border-slate-200 text-slate-800 rounded-md pl-11 pr-4 py-3 text-sm focus:bg-white focus:border-[#002451] focus:ring-4 focus:ring-[#002451]/10 outline-none transition-all placeholder:text-slate-400 group-hover/input:border-slate-300 shadow-sm" placeholder="john@example.com" />
                  </div>
                </div>

                {/* Phone Number */}
                <div className="relative group/input">
                  <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-1 group-focus-within/input:text-[#002451] transition-colors">Phone Number</label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within/input:text-[#002451] transition-colors text-lg">call</span>
                    <input required type="tel" className="w-full bg-slate-50/80 border border-slate-200 text-slate-800 rounded-md pl-11 pr-4 py-3 text-sm focus:bg-white focus:border-[#002451] focus:ring-4 focus:ring-[#002451]/10 outline-none transition-all placeholder:text-slate-400 group-hover/input:border-slate-300 shadow-sm" placeholder="+91 XXXXX XXXXX" />
                  </div>
                </div>

                {/* Upload Resume */}
                <div className="relative group/input">
                  <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-1 group-focus-within/input:text-[#002451] transition-colors">Resume / CV (Optional)</label>
                  <div className="relative flex items-center justify-center w-full h-16 bg-slate-50/80 border-2 border-dashed border-slate-300 rounded-md group-hover/input:border-slate-400 group-focus-within/input:border-[#002451] group-focus-within/input:bg-white transition-all cursor-pointer overflow-hidden">
                    <input type="file" className="absolute inset-0 opacity-0 cursor-pointer z-10" />
                    <span className="material-symbols-outlined text-slate-400 mr-2 group-focus-within/input:text-[#002451] transition-colors">upload_file</span>
                    <span className="text-sm text-slate-500 font-medium group-focus-within/input:text-[#002451] transition-colors">Click or drag file to upload</span>
                  </div>
                </div>

                {/* Cover Note */}
                <div className="relative group/input">
                  <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-1 group-focus-within/input:text-[#002451] transition-colors">Cover Note (Optional)</label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-4 top-3 text-slate-400 group-focus-within/input:text-[#002451] transition-colors text-lg">edit_note</span>
                    <textarea rows={2} className="w-full bg-slate-50/80 border border-slate-200 text-slate-800 rounded-md pl-11 pr-4 py-3 text-sm focus:bg-white focus:border-[#002451] focus:ring-4 focus:ring-[#002451]/10 outline-none transition-all placeholder:text-slate-400 resize-none group-hover/input:border-slate-300 shadow-sm" placeholder="Why are you a good fit?"></textarea>
                  </div>
                </div>

                {/* Animated Submit Button */}
                <button type="submit" className="relative w-full overflow-hidden bg-[#002451] text-white py-4 font-bold uppercase tracking-widest text-xs rounded-md shadow-[0_8px_20px_rgba(0,36,81,0.25)] hover:shadow-[0_12px_25px_rgba(0,36,81,0.35)] active:scale-[0.98] transition-all mt-4 flex items-center justify-center gap-2 group cursor-pointer border border-[#002451]/50">
                  <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></span>
                  <span className="relative z-10 flex items-center gap-2">
                    Submit Application
                    <span className="material-symbols-outlined text-sm group-hover:translate-y-[-2px] group-hover:translate-x-1 transition-all duration-300">send</span>
                  </span>
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default JobPortal;
