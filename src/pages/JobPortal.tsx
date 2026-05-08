import React, { useState, useEffect } from 'react';
import { supabase } from '../supabase';

const JobPortal = () => {
  const [jobs, setJobs] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState<any>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  
  // Application form state
  const [formData, setFormData] = useState({ fullName: '', email: '', phoneNumber: '+91 ', resumeUrl: '', coverNote: '' });
  const [submitting, setSubmitting] = useState(false);
  const [uploadingResume, setUploadingResume] = useState(false);

  useEffect(() => {
    fetch('/api/jobs')
      .then(res => res.json())
      .then(data => setJobs(data))
      .catch(err => console.error(err));
  }, []);

  const openModal = (job: any) => {
    setSelectedJob(job);
    setIsModalOpen(true);
    setTimeout(() => setIsAnimating(true), 10);
  };

  const closeModal = () => {
    setIsAnimating(false);
    setTimeout(() => {
      setIsModalOpen(false);
      setSelectedJob(null);
      setFormData({ fullName: '', email: '', phoneNumber: '+91 ', resumeUrl: '', coverNote: '' });
    }, 300);
  };

  const handleResumeUpload = async (file: File) => {
    if (!file) return;
    setUploadingResume(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}_${Math.random().toString(36).substring(2, 9)}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('resumes')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data } = supabase.storage.from('resumes').getPublicUrl(filePath);
      setFormData({ ...formData, resumeUrl: data.publicUrl });
    } catch (err: any) {
      console.error(err);
      alert('Error uploading resume: ' + err.message + '\nMake sure the "resumes" bucket exists and is public.');
    } finally {
      setUploadingResume(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedJob) return;
    setSubmitting(true);
    
    try {
      const res = await fetch(`/api/jobs/${selectedJob.id}/apply`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        alert(`Application for ${selectedJob.title} submitted successfully!`);
        closeModal();
      } else {
        alert('Failed to submit application. Please try again.');
      }
    } catch (e) {
      console.error(e);
      alert('An error occurred.');
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    if (isModalOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
    return () => { document.body.style.overflow = 'unset'; }
  }, [isModalOpen]);

  return (
    <div className="w-full bg-surface-bright min-h-screen pb-24 relative">
      <section className="bg-primary pt-32 pb-20 px-4 md:px-8 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent"></div>
        <div className="relative z-10 max-w-3xl mx-auto">
            <h1 className="font-headline text-5xl md:text-6xl font-black text-white mb-6 uppercase tracking-tighter">Careers at Yashraj</h1>
            <p className="text-xl text-blue-100/90 font-medium leading-relaxed">
                Join our elite tactical forces and facility management teams. We are currently recruiting across 16+ cities.
            </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 md:px-8 -mt-10 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div className="bg-white tactical-shadow p-6 md:p-8 rounded-lg border-t-4 border-primary self-start">
                <h3 className="font-headline text-xl font-bold text-primary mb-6">Filter Positions</h3>
                <div className="space-y-6">
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">Job Role</label>
                        <select className="w-full border-gray-300 rounded-md shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50 bg-slate-50">
                            <option>All Roles</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">Location</label>
                        <select className="w-full border-gray-300 rounded-md shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50 bg-slate-50">
                            <option>All Cities</option>
                        </select>
                    </div>
                    <button className="w-full bg-primary text-white py-3 font-bold uppercase tracking-widest text-xs hover:bg-primary/90 transition-colors">
                        Apply Filters
                    </button>
                </div>
            </div>

            <div className="lg:col-span-2 space-y-6">
                {jobs.map(job => (
                  <div key={job.id} className="bg-white tactical-shadow p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 hover:border-l-4 hover:border-primary transition-all rounded-lg">
                      <div>
                          <div className="flex items-center gap-3 mb-2">
                              {/* <span className="bg-green-100 text-green-800 text-xs font-bold px-2.5 py-0.5 rounded uppercase tracking-wider">Hiring Now</span> */}
                              <span className="text-slate-500 text-sm font-medium">Posted recently</span>
                          </div>
                          <h3 className="font-headline text-2xl font-bold text-slate-800 mb-2">{job.title}</h3>
                          <div className="flex flex-wrap items-center gap-4 text-sm text-slate-600 font-medium">
                              <span className="flex items-center gap-1"><span className="material-symbols-outlined text-sm">location_on</span> {job.location}</span>
                              <span className="flex items-center gap-1"><span className="material-symbols-outlined text-sm">work</span> {job.type}</span>
                              {job.salaryRange && <span className="flex items-center gap-1"><span className="material-symbols-outlined text-sm">currency_rupee</span> ₹{job.salaryRange}</span>}
                          </div>
                      </div>
                      <button onClick={() => openModal(job)} className="whitespace-nowrap bg-[#002451] text-white px-8 py-3 font-bold uppercase tracking-wider text-sm shadow-lg hover:shadow-xl hover:bg-[#1A3A6B] active:scale-95 transition-all rounded">
                          Apply Now
                      </button>
                  </div>
                ))}
                {jobs.length === 0 && (
                  <div className="text-center p-8 text-slate-500 bg-white rounded-lg shadow-sm">No job positions currently open.</div>
                )}
            </div>
        </div>
      </section>

      {isModalOpen && selectedJob && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 sm:px-0">
          <div className={`absolute inset-0 bg-[#002451]/40 backdrop-blur-md transition-opacity duration-300 ${isAnimating ? 'opacity-100' : 'opacity-0'}`} onClick={closeModal}></div>
          <div className={`relative z-10 w-full max-w-lg transition-all duration-300 transform ${isAnimating ? 'scale-100 translate-y-0 opacity-100' : 'scale-95 translate-y-10 opacity-0'}`}>
            <div className="bg-white p-8 sm:p-10 rounded-2xl shadow-[0px_20px_40px_rgba(0,36,81,0.2)] border border-slate-100 relative overflow-hidden backdrop-blur-sm">
              <button onClick={closeModal} className="absolute top-4 right-4 text-slate-400 hover:text-red-500 hover:rotate-90 transition-all duration-300 p-2"><span className="material-symbols-outlined">close</span></button>
              <h3 className="font-headline text-2xl sm:text-3xl font-black text-[#002451] uppercase tracking-tighter mb-2">Apply for Role</h3>
              <p className="text-sm text-slate-500 mb-8 font-medium">Position: <strong className="text-primary">{selectedJob.title}</strong></p>
              
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="relative group/input">
                  <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-1 group-focus-within/input:text-[#002451] transition-colors">Full Name</label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within/input:text-[#002451] transition-colors text-lg">person</span>
                    <input required type="text" value={formData.fullName} onChange={e => setFormData({...formData, fullName: e.target.value})} className="w-full bg-slate-50/80 border border-slate-200 text-slate-800 rounded-md pl-11 pr-4 py-3 text-sm focus:bg-white focus:border-[#002451] focus:ring-4 focus:ring-[#002451]/10 outline-none transition-all placeholder:text-slate-400 group-hover/input:border-slate-300 shadow-sm" placeholder="John Doe" />
                  </div>
                </div>

                <div className="relative group/input">
                  <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-1 group-focus-within/input:text-[#002451] transition-colors">Email Address</label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within/input:text-[#002451] transition-colors text-lg">mail</span>
                    <input required type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full bg-slate-50/80 border border-slate-200 text-slate-800 rounded-md pl-11 pr-4 py-3 text-sm focus:bg-white focus:border-[#002451] focus:ring-4 focus:ring-[#002451]/10 outline-none transition-all placeholder:text-slate-400 group-hover/input:border-slate-300 shadow-sm" placeholder="john@example.com" />
                  </div>
                </div>

                <div className="relative group/input">
                  <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-1 group-focus-within/input:text-[#002451] transition-colors">Phone Number</label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within/input:text-[#002451] transition-colors text-lg">call</span>
                    <input required type="tel" value={formData.phoneNumber} onChange={e => setFormData({...formData, phoneNumber: e.target.value})} className="w-full bg-slate-50/80 border border-slate-200 text-slate-800 rounded-md pl-11 pr-4 py-3 text-sm focus:bg-white focus:border-[#002451] focus:ring-4 focus:ring-[#002451]/10 outline-none transition-all placeholder:text-slate-400 group-hover/input:border-slate-300 shadow-sm" placeholder="+91 XXXXX XXXXX" />
                  </div>
                </div>

                {/* Upload Resume */}
                <div className="relative group/input">
                  <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-1 group-focus-within/input:text-[#002451] transition-colors">Resume / CV (Optional)</label>
                  <div className="relative flex items-center justify-center w-full h-16 bg-slate-50/80 border-2 border-dashed border-slate-300 rounded-md group-hover/input:border-slate-400 group-focus-within/input:border-[#002451] group-focus-within/input:bg-white transition-all cursor-pointer overflow-hidden">
                    <input 
                      type="file" 
                      onChange={e => e.target.files && handleResumeUpload(e.target.files[0])}
                      className="absolute inset-0 opacity-0 cursor-pointer z-10" 
                    />
                    {uploadingResume ? (
                      <span className="text-sm text-slate-500 font-medium">Uploading...</span>
                    ) : formData.resumeUrl ? (
                      <span className="text-sm text-green-600 font-medium truncate px-4">Resume attached successfully!</span>
                    ) : (
                      <>
                        <span className="material-symbols-outlined text-slate-400 mr-2 group-focus-within/input:text-[#002451] transition-colors">upload_file</span>
                        <span className="text-sm text-slate-500 font-medium group-focus-within/input:text-[#002451] transition-colors">Click or drag file to upload</span>
                      </>
                    )}
                  </div>
                </div>

                {/* Cover Note */}
                <div className="relative group/input">
                  <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-1 group-focus-within/input:text-[#002451] transition-colors">Cover Note (Optional)</label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-4 top-3 text-slate-400 group-focus-within/input:text-[#002451] transition-colors text-lg">edit_note</span>
                    <textarea value={formData.coverNote} onChange={e => setFormData({...formData, coverNote: e.target.value})} rows={2} className="w-full bg-slate-50/80 border border-slate-200 text-slate-800 rounded-md pl-11 pr-4 py-3 text-sm focus:bg-white focus:border-[#002451] focus:ring-4 focus:ring-[#002451]/10 outline-none transition-all placeholder:text-slate-400 resize-none group-hover/input:border-slate-300 shadow-sm" placeholder="Why are you a good fit?"></textarea>
                  </div>
                </div>

                <button type="submit" disabled={submitting || uploadingResume} className="relative w-full overflow-hidden bg-[#002451] text-white py-4 font-bold uppercase tracking-widest text-xs rounded-md shadow-[0_8px_20px_rgba(0,36,81,0.25)] hover:shadow-[0_12px_25px_rgba(0,36,81,0.35)] active:scale-[0.98] transition-all mt-4 flex items-center justify-center gap-2 group cursor-pointer border border-[#002451]/50 disabled:opacity-70">
                  <span className="relative z-10 flex items-center gap-2">
                    {submitting ? 'Submitting...' : 'Submit Application'}
                    <span className="material-symbols-outlined text-sm">send</span>
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
