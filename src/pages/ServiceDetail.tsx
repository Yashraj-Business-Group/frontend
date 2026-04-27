import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Shield, Droplets, Building2, Users, FileSignature, Landmark, Calculator, ArrowRight } from 'lucide-react';

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
    image: 'https://images.unsplash.com/photo-1628151015968-3a4429e9ef04?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
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
  }
};

const ServiceDetail = () => {
  const { serviceId } = useParams();
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', details: '' });
  
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would POST to /api/requests
    alert(`Quotation requested for ${service.title}! (This will be sent to the Admin Dashboard)`);
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
            <div className="lg:col-span-1">
                <div className="bg-white p-8 rounded-lg tactical-shadow border-t-8 border-primary sticky top-28">
                    <h3 className="font-headline text-2xl font-black text-primary uppercase tracking-tighter mb-2">Request Quotation</h3>
                    <p className="text-sm text-slate-500 mb-6">Fill out the form below to get a customized plan for {service.title}.</p>
                    
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Full Name</label>
                            <input required type="text" className="w-full border-gray-300 rounded focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50 bg-slate-50" placeholder="John Doe" />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Company Name</label>
                            <input required type="text" className="w-full border-gray-300 rounded focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50 bg-slate-50" placeholder="Your Company" />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Email</label>
                            <input required type="email" className="w-full border-gray-300 rounded focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50 bg-slate-50" placeholder="john@example.com" />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Phone</label>
                            <input required type="tel" className="w-full border-gray-300 rounded focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50 bg-slate-50" placeholder="+91 XXXX XXXX" />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Specific Requirements</label>
                            <textarea rows={3} className="w-full border-gray-300 rounded focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50 bg-slate-50" placeholder="Number of guards, area size, etc..."></textarea>
                        </div>
                        <button type="submit" className="w-full tactical-gradient text-white py-4 font-bold uppercase tracking-widest text-sm active:scale-95 transition-transform mt-4">
                            Send Request
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
