import React from 'react';
import { supabase } from '../supabase';
import { sanitizeFields } from '../utils/sanitizeText';
import { isSpamSubmission } from '../utils/spamFilter';
import { useSEO } from '../hooks/useSEO';
import Honeypot from '../components/Honeypot';
import { useRateLimit, formatRetryAfter } from '../hooks/useRateLimit';

const Contact = () => {
  useSEO({
    title: 'Contact Us',
    description: 'Get in touch with Yashraj Business Group for security deployment, facility management quotes, or corporate inquiries. Offices in Pune and Sangli.'
  });
  const [formData, setFormData] = React.useState({
    fullName: '',
    companyName: '',
    email: '',
    phoneNumber: '',
    serviceRequired: '',
    additionalReqs: ''
  });
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [submitStatus, setSubmitStatus] = React.useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = React.useState('');
  const [honeypot, setHoneypot] = React.useState('');
  const { checkLimit, recordAttempt } = useRateLimit('service-request', 3, 60 * 60 * 1000);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (honeypot) return; // bot filled the hidden field

    const { allowed, retryAfterMs } = checkLimit();
    if (!allowed) {
      setErrorMessage(`You've submitted too many requests. Please try again in ${formatRetryAfter(retryAfterMs)}.`);
      setSubmitStatus('error');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    // Pattern filter to reject automated bot spam and random mixed-case gibberish
    const spamCheck = isSpamSubmission(formData);
    if (spamCheck.isSpam) {
      // Shadow-drop the bot submission without inserting into the database
      setIsSubmitting(false);
      setSubmitStatus('success');
      setFormData({
        fullName: '',
        companyName: '',
        email: '',
        phoneNumber: '',
        serviceRequired: '',
        additionalReqs: ''
      });
      setTimeout(() => setSubmitStatus('idle'), 5000);
      return;
    }

    try {
      recordAttempt();
      const { error } = await supabase.from('ServiceRequest').insert([sanitizeFields(formData, 2000)]);
      if (error) throw error;
      setSubmitStatus('success');
      setFormData({
        fullName: '',
        companyName: '',
        email: '',
        phoneNumber: '',
        serviceRequired: '',
        additionalReqs: ''
      });
      setTimeout(() => setSubmitStatus('idle'), 5000);
    } catch (err) {
      setErrorMessage('There was an error submitting your request. Please try again later.');
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

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
                
                <div className="bg-white tactical-shadow p-8 rounded-lg border-t-4 border-primary flex items-start gap-6 hover:-translate-y-1 transition-transform duration-300">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary shrink-0">
                        <span className="material-symbols-outlined text-2xl">corporate_fare</span>
                    </div>
                    <div>
                        <h3 className="font-headline text-xl font-bold text-slate-800 mb-4">Corporate Office, Pune</h3>
                        
                        <div className="space-y-4">
                            <div className="flex items-start gap-3">
                                <span className="material-symbols-outlined text-primary text-lg mt-0.5 shrink-0">location_on</span>
                                <div>
                                    <p className="text-slate-600 leading-relaxed text-sm">
                                        27, Shree Ganesh Galaxy Complex, Alandi Road (PCMC), Pune-411105
                                    </p>
                                    <p className="text-slate-700 text-sm mt-1">
                                        <span className="font-bold">Landmark:</span> Near Dighi Police Station
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <span className="material-symbols-outlined text-primary text-lg shrink-0">call</span>
                                <p className="text-slate-600 text-sm">
                                    <span className="font-bold mr-1">Office Number:</span> 
                                    <a href="tel:+918090785907" className="hover:text-primary transition-colors">(+91) 809-078-5907</a>
                                </p>
                            </div>

                            <div className="flex items-center gap-3">
                                <span className="material-symbols-outlined text-primary text-lg shrink-0">mail</span>
                                <a href="mailto:info@yashrajbusinessgroup.com" className="text-slate-600 text-sm hover:text-primary transition-colors">
                                    info@yashrajbusinessgroup.com
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white tactical-shadow p-8 rounded-lg border-t-4 border-primary flex items-start gap-6 hover:-translate-y-1 transition-transform duration-300">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary shrink-0">
                        <span className="material-symbols-outlined text-2xl">domain</span>
                    </div>
                    <div>
                        <h3 className="font-headline text-xl font-bold text-slate-800 mb-4">Registered Office, Sangli</h3>
                        
                        <div className="space-y-4">
                            <div className="flex items-start gap-3">
                                <span className="material-symbols-outlined text-primary text-lg mt-0.5 shrink-0">location_on</span>
                                <p className="text-slate-600 leading-relaxed text-sm">
                                    At Post Shirdhon, Tal: K-Mahakal, Dist: Sangli, Pin:416419
                                </p>
                            </div>

                            <div className="flex items-center gap-3">
                                <span className="material-symbols-outlined text-primary text-lg shrink-0">call</span>
                                <a href="tel:+918090785907" className="text-slate-600 text-sm hover:text-primary transition-colors">
                                    (+91) 809-078-5907
                                </a>
                            </div>

                            <div className="flex items-start gap-3">
                                <span className="material-symbols-outlined text-primary text-lg mt-0.5 shrink-0">mail</span>
                                <div className="flex flex-col gap-1">
                                    <a href="mailto:yashraj.s87@yahoo.com" className="text-slate-600 text-sm hover:text-primary transition-colors">
                                        yashraj.s87@yahoo.com
                                    </a>
                                    <a href="mailto:hr.yashrajsp@gmail.com" className="text-slate-600 text-sm hover:text-primary transition-colors">
                                        hr.yashrajsp@gmail.com
                                    </a>
                                </div>
                            </div>
                        </div>
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

                {submitStatus === 'success' && (
                  <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-700 rounded-lg flex items-center gap-3">
                    <span className="material-symbols-outlined">check_circle</span>
                    Your request has been successfully submitted! We will contact you soon.
                  </div>
                )}
                {submitStatus === 'error' && (
                  <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg flex items-center gap-3">
                    <span className="material-symbols-outlined">error</span>
                    {errorMessage || 'There was an error submitting your request. Please try again later.'}
                  </div>
                )}

                <form className="space-y-6" onSubmit={handleSubmit}>
                    <Honeypot value={honeypot} onChange={(e) => setHoneypot(e.target.value)} />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="relative group/input">
                            <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-1 group-focus-within/input:text-[#002451] transition-colors">Full Name</label>
                            <div className="relative">
                                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within/input:text-[#002451] transition-colors text-lg">person</span>
                                <input required name="fullName" value={formData.fullName} onChange={handleChange} type="text" className="w-full bg-slate-50/80 border border-slate-200 text-slate-800 rounded-md pl-11 pr-4 py-3 text-sm focus:bg-white focus:border-[#002451] focus:ring-4 focus:ring-[#002451]/10 outline-none transition-all placeholder:text-slate-400 group-hover/input:border-slate-300 shadow-sm" placeholder="John Doe" />
                            </div>
                        </div>
                        <div className="relative group/input">
                            <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-1 group-focus-within/input:text-[#002451] transition-colors">Company Name</label>
                            <div className="relative">
                                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within/input:text-[#002451] transition-colors text-lg">domain</span>
                                <input required name="companyName" value={formData.companyName} onChange={handleChange} type="text" className="w-full bg-slate-50/80 border border-slate-200 text-slate-800 rounded-md pl-11 pr-4 py-3 text-sm focus:bg-white focus:border-[#002451] focus:ring-4 focus:ring-[#002451]/10 outline-none transition-all placeholder:text-slate-400 group-hover/input:border-slate-300 shadow-sm" placeholder="Acme Corp" />
                            </div>
                        </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="relative group/input">
                            <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-1 group-focus-within/input:text-[#002451] transition-colors">Email Address</label>
                            <div className="relative">
                                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within/input:text-[#002451] transition-colors text-lg">mail</span>
                                <input required name="email" value={formData.email} onChange={handleChange} type="email" className="w-full bg-slate-50/80 border border-slate-200 text-slate-800 rounded-md pl-11 pr-4 py-3 text-sm focus:bg-white focus:border-[#002451] focus:ring-4 focus:ring-[#002451]/10 outline-none transition-all placeholder:text-slate-400 group-hover/input:border-slate-300 shadow-sm" placeholder="john@acme.com" />
                            </div>
                        </div>
                        <div className="relative group/input">
                            <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-1 group-focus-within/input:text-[#002451] transition-colors">Phone Number</label>
                            <div className="relative">
                                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within/input:text-[#002451] transition-colors text-lg">call</span>
                                <input required name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} type="tel" className="w-full bg-slate-50/80 border border-slate-200 text-slate-800 rounded-md pl-11 pr-4 py-3 text-sm focus:bg-white focus:border-[#002451] focus:ring-4 focus:ring-[#002451]/10 outline-none transition-all placeholder:text-slate-400 group-hover/input:border-slate-300 shadow-sm" placeholder="+91 XXXXX XXXXX" />
                            </div>
                        </div>
                    </div>

                    <div className="relative group/input">
                        <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-1 group-focus-within/input:text-[#002451] transition-colors">Service Required</label>
                        <div className="relative">
                            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within/input:text-[#002451] transition-colors text-lg">business_center</span>
                            <select required name="serviceRequired" value={formData.serviceRequired} onChange={handleChange} className="w-full bg-slate-50/80 border border-slate-200 text-slate-800 rounded-md pl-11 pr-4 py-3 text-sm focus:bg-white focus:border-[#002451] focus:ring-4 focus:ring-[#002451]/10 outline-none transition-all appearance-none group-hover/input:border-slate-300 shadow-sm">
                                <option value="">Select a service...</option>
                                <option value="Security Services">Security Services</option>
                                <option value="Housekeeping">Housekeeping</option>
                                <option value="Facility Management">Facility Management</option>
                                <option value="Manpower Supply">Manpower Supply</option>
                                <option value="Other">Other</option>
                            </select>
                            <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none text-lg">expand_more</span>
                        </div>
                    </div>

                    <div className="relative group/input">
                        <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-1 group-focus-within/input:text-[#002451] transition-colors">Additional Requirements</label>
                        <div className="relative">
                            <span className="material-symbols-outlined absolute left-4 top-4 text-slate-400 group-focus-within/input:text-[#002451] transition-colors text-lg">description</span>
                            <textarea name="additionalReqs" value={formData.additionalReqs} onChange={handleChange} rows={4} className="w-full bg-slate-50/80 border border-slate-200 text-slate-800 rounded-md pl-11 pr-4 py-3 text-sm focus:bg-white focus:border-[#002451] focus:ring-4 focus:ring-[#002451]/10 outline-none transition-all placeholder:text-slate-400 resize-none group-hover/input:border-slate-300 shadow-sm" placeholder="Please describe your specific needs..."></textarea>
                        </div>
                    </div>

                    <button type="submit" disabled={isSubmitting} className="relative w-full overflow-hidden bg-[#002451] text-white py-4 font-bold uppercase tracking-widest text-xs rounded-md shadow-[0_8px_20px_rgba(0,36,81,0.25)] hover:shadow-[0_12px_25px_rgba(0,36,81,0.35)] active:scale-[0.98] transition-all mt-4 flex items-center justify-center gap-2 group cursor-pointer border border-[#002451]/50 disabled:opacity-70 disabled:cursor-not-allowed">
                        <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></span>
                        <span className="relative z-10 flex items-center gap-2">
                            {isSubmitting ? 'Submitting...' : 'Submit Request'}
                            {!isSubmitting && <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform duration-300">send</span>}
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
