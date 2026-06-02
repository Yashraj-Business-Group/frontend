import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Shield, Droplets, Building2, Users, FileSignature, Landmark, Calculator, ArrowRight, BadgeCheck } from 'lucide-react';

// Mock database of services
const servicesData: Record<string, any> = {
  'security-guard': {
    title: 'Security Guard & Bouncers',
    icon: Shield,
    color: 'bg-primary',
    textColor: 'text-primary',
    description: 'We are specialists in all such categories and have well-trained staff to secure you and your business assets.',
    details: [
      'Corporate & Industrial Security',
      'Residential Security Services',
      'Bank & ATMs Guarding',
      'Hospital & IT Park Security',
      'Professional Bouncer Services for Events',
    ],
    image: '/career-middle-image.jpg'
  },
  'house-keeping': {
    title: 'House Keeping Services',
    icon: Droplets,
    color: 'bg-primary-container',
    textColor: 'text-primary-container',
    description: 'A clean and efficient work environment is essential to the success of any company. We provide complete house keeping and fog sanitization.',
    details: [
      'Corporate Office Cleaning',
      'Deep Sanitization & Fogging',
      'Pest Control Services',
      'Restroom Hygiene Management',
      'Waste Management Solutions',
    ],
    image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
  },
  'facility-management': {
    title: 'Facility Management',
    icon: Building2,
    color: 'bg-tertiary-container',
    textColor: 'text-tertiary-container',
    description: 'We are a leading facility management company offering specialized commercial maintenance and technical support.',
    details: [
      'Building Maintenance',
      'Electrical & Plumbing Support',
      'HVAC Systems Maintenance',
      'Landscaping & Gardening',
      'Vendor Management',
    ],
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
  },
  'manpower-labour': {
    title: 'Manpower / Labour Supply',
    icon: Users,
    color: 'bg-slate-700',
    textColor: 'text-slate-700',
    description: 'We are a leading service provider for expert labour service & required gadgets for their safety on industrial sites.',
    details: [
      'Skilled Industrial Labour',
      'Semi-skilled Workforce',
      'Warehouse & Logistics Staff',
      'Construction Site Workers',
      'Safety Gear Provision',
    ],
    image: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
  },
  'contract-staffing': {
    title: 'Contract Staffing',
    icon: FileSignature,
    color: 'bg-slate-700',
    textColor: 'text-slate-700',
    description: 'We bring you innovative staffing solutions which are agile enough to meet the rapidly changing talent requirements of your business.',
    details: [
      'Temporary Administrative Staff',
      'Seasonal Workforce Support',
      'Project-based Hiring',
      'Leave Cover Personnel',
      'IT & Technical Staffing',
    ],
    image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
  },
  'pf-esic': {
    title: 'PF, ESIC & P. Tax Reg.',
    icon: Landmark,
    color: 'bg-slate-700',
    textColor: 'text-slate-700',
    description: 'Ensure complete legal compliance with our expert handling of self-financing social security and health insurance schemes for employees.',
    details: [
      'Provident Fund (PF) Registration & Filing',
      'ESIC Returns & Compliance',
      'Professional Tax Registration',
      'Monthly Challan Generation',
      'Audit Assistance',
    ],
    image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
  },
  'all-taxation': {
    title: 'All Taxation Work',
    icon: Calculator,
    color: 'bg-slate-700',
    textColor: 'text-slate-700',
    description: 'Yashraj Taxway Consultancy provides all taxation work, Business Registrations & Licenses, and GST monthly compliances.',
    details: [
      'GST Registration & Returns',
      'Income Tax Returns (ITR)',
      'Company Incorporation (PVT LTD, LLP)',
      'Trade Licenses & Shop Act',
      'Accounting & Bookkeeping',
    ],
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
  },
  'psara-licensing': {
    title: 'PSARA Licensing Services',
    icon: BadgeCheck,
    color: 'bg-[#002451]',
    textColor: 'text-[#002451]',
    description: 'At Yashraj Taxway Consultancy, we provide comprehensive consultancy and compliance solutions for obtaining and maintaining PSARA (Private Security Agencies Regulation Act) Licenses across India. Our experienced team ensures a smooth, efficient, and legally compliant licensing process for security agencies.',
    details: [
      'PSARA License Registration',
      'New License Application Processing',
      'PSARA License Renewal',
      'State-wise Licensing Assistance',
      'Documentation & Compliance Management',
      'Police Verification Coordination',
      'Training Institute MOU Drafting',
      'Regulatory Compliance Advisory',
      'Security Agency Startup Consultancy',
      'Business Registration & Allied Compliance Support',
    ],
    image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
  }
};

const ServiceDetail = () => {
  const { serviceId } = useParams();
  const [formData, setFormData] = useState({ fullName: '', companyName: '', email: '', phoneNumber: '+91 ', additionalReqs: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Ensure the route matches a valid service, otherwise show 404/fallback
  const service = serviceId ? servicesData[serviceId] : null;

  useEffect(() => {
    // Scroll to top when loading a new service
    window.scrollTo(0, 0);
  }, [serviceId]);

  if (!service) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-8">
        <h1 className="text-4xl font-headline font-black text-primary mb-4">Service Not Found</h1>
        <p className="text-slate-600 mb-8">The requested operational division does not exist.</p>
        <Link to="/services" className="tactical-gradient text-white px-8 py-3 font-bold uppercase text-sm">View All Services</Link>
      </div>
    );
  }

  const IconComponent = service.icon;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const payload = {
        ...formData,
        serviceRequired: service.title
      };

      const res = await fetch('/api/requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      
      if (res.ok) {
        alert(`Quotation requested for ${service.title}! We will contact you soon.`);
        setFormData({ fullName: '', companyName: '', email: '', phoneNumber: '+91 ', additionalReqs: '' });
      } else {
        alert('Failed to submit request. Please try again.');
      }
    } catch (err) {
      console.error(err);
      alert('An error occurred. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full bg-surface-bright pb-24">

      {/* Service Header */}
      <section className={`${service.color} pt-32 pb-20 px-8 relative overflow-hidden text-white`}>
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10"></div>
        {/* We use a solid color background with a gradient overlay instead of relying on the image for the main hero to ensure text readability */}
        <div className="relative z-20 max-w-7xl mx-auto flex items-center gap-6">
          <div className="w-20 h-20 bg-white/10 backdrop-blur-md rounded-lg flex items-center justify-center border border-white/20 shrink-0 hidden md:flex">
            <IconComponent size={40} className="text-white" />
          </div>
          <div>
            <span className="font-bold uppercase tracking-widest text-sm text-white/80 block mb-2">Service Division</span>
            <h1 className="font-headline text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none">
              {service.title}
            </h1>
          </div>
        </div>
      </section>

      {/* Main Content Layout */}
      <section className="max-w-7xl mx-auto px-8 -mt-10 relative z-30">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

          {/* Left Content (Image & Details) */}
          <div className="lg:col-span-2 space-y-12">
            <div className="bg-white p-2 rounded-lg tactical-shadow">
              <div className="aspect-[21/9] rounded overflow-hidden relative bg-slate-200">
                <img src={service.image} alt={service.title} className="w-full h-full object-cover" />
              </div>
            </div>

            <div className="bg-white p-10 rounded-lg tactical-shadow border-t-4 border-slate-200">
              <h2 className="font-headline text-3xl font-bold text-slate-800 mb-6">Overview</h2>
              <p className="text-lg text-slate-600 leading-relaxed mb-8">
                {service.description}
              </p>

              <h3 className="font-headline text-2xl font-bold text-slate-800 mb-6">What We Provide</h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {service.details.map((detail: string, index: number) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className={`mt-1 rounded-full p-1 bg-slate-100 ${service.textColor}`}>
                      <ArrowRight size={16} />
                    </span>
                    <span className="text-slate-700 font-medium">{detail}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Content (Quotation Form) */}
          <div className="lg:col-span-1 relative z-20">
            {/* Animated Glow Background behind the form */}
            <div className="absolute -inset-1 bg-gradient-to-r from-[#002451] to-blue-400 rounded-2xl blur-lg opacity-20 animate-pulse hidden lg:block pointer-events-none"></div>
            
            <div className="bg-white p-8 rounded-xl shadow-[0px_20px_40px_rgba(0,36,81,0.08)] border border-slate-100 relative overflow-hidden sticky top-28 transition-transform duration-500 hover:-translate-y-1 group/form z-10 backdrop-blur-sm">
              {/* Decorative Animated Top Border */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#002451] via-blue-500 to-[#002451] bg-[length:200%_auto] animate-gradient"></div>
              
              <h3 className="font-headline text-2xl font-black text-[#002451] uppercase tracking-tighter mb-2">Request Quotation</h3>
              <p className="text-sm text-slate-500 mb-8 font-medium">Get a customized tactical plan for {service.title}.</p>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Full Name */}
                <div className="relative group/input">
                  <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-1 group-focus-within/input:text-[#002451] transition-colors">Full Name</label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within/input:text-[#002451] transition-colors text-lg">person</span>
                    <input required type="text" value={formData.fullName} onChange={e => setFormData({...formData, fullName: e.target.value})} className="w-full bg-slate-50/80 border border-slate-200 text-slate-800 rounded-md pl-11 pr-4 py-3 text-sm focus:bg-white focus:border-[#002451] focus:ring-4 focus:ring-[#002451]/10 outline-none transition-all placeholder:text-slate-400 group-hover/input:border-slate-300 shadow-sm" placeholder="John Doe" />
                  </div>
                </div>

                {/* Company Name */}
                <div className="relative group/input">
                  <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-1 group-focus-within/input:text-[#002451] transition-colors">Company Name</label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within/input:text-[#002451] transition-colors text-lg">domain</span>
                    <input type="text" value={formData.companyName} onChange={e => setFormData({...formData, companyName: e.target.value})} className="w-full bg-slate-50/80 border border-slate-200 text-slate-800 rounded-md pl-11 pr-4 py-3 text-sm focus:bg-white focus:border-[#002451] focus:ring-4 focus:ring-[#002451]/10 outline-none transition-all placeholder:text-slate-400 group-hover/input:border-slate-300 shadow-sm" placeholder="Your Company Ltd." />
                  </div>
                </div>

                {/* Email Address */}
                <div className="relative group/input">
                  <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-1 group-focus-within/input:text-[#002451] transition-colors">Email Address</label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within/input:text-[#002451] transition-colors text-lg">mail</span>
                    <input required type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full bg-slate-50/80 border border-slate-200 text-slate-800 rounded-md pl-11 pr-4 py-3 text-sm focus:bg-white focus:border-[#002451] focus:ring-4 focus:ring-[#002451]/10 outline-none transition-all placeholder:text-slate-400 group-hover/input:border-slate-300 shadow-sm" placeholder="john@company.com" />
                  </div>
                </div>

                {/* Phone Number */}
                <div className="relative group/input">
                  <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-1 group-focus-within/input:text-[#002451] transition-colors">Phone Number</label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within/input:text-[#002451] transition-colors text-lg">call</span>
                    <input required type="tel" value={formData.phoneNumber} onChange={e => setFormData({...formData, phoneNumber: e.target.value})} className="w-full bg-slate-50/80 border border-slate-200 text-slate-800 rounded-md pl-11 pr-4 py-3 text-sm focus:bg-white focus:border-[#002451] focus:ring-4 focus:ring-[#002451]/10 outline-none transition-all placeholder:text-slate-400 group-hover/input:border-slate-300 shadow-sm" placeholder="+91 XXXXX XXXXX" />
                  </div>
                </div>

                {/* Requirements */}
                <div className="relative group/input">
                  <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-1 group-focus-within/input:text-[#002451] transition-colors">Specific Requirements</label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-4 top-4 text-slate-400 group-focus-within/input:text-[#002451] transition-colors text-lg">description</span>
                    <textarea rows={3} value={formData.additionalReqs} onChange={e => setFormData({...formData, additionalReqs: e.target.value})} className="w-full bg-slate-50/80 border border-slate-200 text-slate-800 rounded-md pl-11 pr-4 py-3 text-sm focus:bg-white focus:border-[#002451] focus:ring-4 focus:ring-[#002451]/10 outline-none transition-all placeholder:text-slate-400 resize-none group-hover/input:border-slate-300 shadow-sm" placeholder="Describe your operational needs..."></textarea>
                  </div>
                </div>

                {/* Animated Submit Button */}
                <button type="submit" disabled={isSubmitting} className="relative w-full overflow-hidden bg-[#002451] text-white py-4 font-bold uppercase tracking-widest text-xs rounded-md shadow-[0_8px_20px_rgba(0,36,81,0.25)] hover:shadow-[0_12px_25px_rgba(0,36,81,0.35)] active:scale-[0.98] transition-all mt-4 flex items-center justify-center gap-2 group cursor-pointer border border-[#002451]/50 disabled:opacity-70">
                  <span className="relative z-10 flex items-center gap-2">
                    {isSubmitting ? 'Submitting...' : 'Submit Request'}
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

export default ServiceDetail;
