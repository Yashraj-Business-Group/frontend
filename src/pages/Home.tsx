import { Link } from 'react-router-dom';

const clientLogos = [
  "anna1.png", "bks1.jpg", "bom1.png", "dbp1.jpg", "epfo1.jpg", "hmm1.jpg",
  "jai hdabdkaba.jpg", "jap1.jpg", "kub1.jpg", "kvs1.jpg", "mms1.png",
  "mod1.jpg", "png1.jpg", "rda1.png", "re1.png", "si1.png", "st1.png", "sts1.png", "vish1.png"
];

const Home: React.FC = () => {
  return (
    <main>
      {/* Hero Slider */}
      <section className="relative h-[921px] w-full overflow-hidden">
       <div className="absolute inset-0 z-0">
  <video
    className="w-full h-full object-cover"
    autoPlay
    muted
    loop
    playsInline
    src="/background.mp4"
  />
  <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-transparent"></div>
</div>
       <div className="relative z-10 h-full w-full px-5 md:px-8 lg:px-16 flex flex-col justify-center items-start text-white">
          <span className="label-sm font-bold uppercase tracking-[0.2em] text-on-primary-container mb-6 block">Elite Protection Services</span>
          <h1 className="font-headline text-5xl sm:text-6xl md:text-8xl font-extrabold tracking-tighter leading-[0.9] mb-8 max-w-4xl">
            COMMANDING <br/>SECURITY.
          </h1>
          <p className="text-xl max-w-xl text-slate-200 mb-10 font-medium leading-relaxed">
            Protecting your corporate assets with military-grade precision and unwavering vigilance across 16+ cities.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Link to="/services" className="tactical-gradient px-8 py-4 sm:px-10 sm:py-5 font-bold uppercase text-sm tracking-widest hover:-translate-y-1 transition-transform text-center">Get Secured Now</Link>
            <button className="border-2 border-white px-8 py-4 sm:px-10 sm:py-5 font-bold uppercase text-sm tracking-widest hover:bg-white hover:text-primary transition-colors">Our Strategy</button>
          </div>
        </div>
      </section>

      {/* We Take Pride Section */}
      <section className="py-16 md:py-24 px-5 md:px-8 bg-surface-container-low">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:p-12">
            <div className="group h-[320px] bg-transparent [perspective:1000px]">
              <div className="relative w-full h-full transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                <div className="absolute inset-0 p-8 lg:p-12 bg-white tactical-shadow [backface-visibility:hidden] flex flex-col justify-center items-center text-center">
                  <span className="material-symbols-outlined text-6xl text-primary mb-6" data-icon="verified">verified</span>
                  <h3 className="font-headline text-2xl font-bold text-primary">Vast Experience</h3>
                </div>
                <div className="absolute inset-0 p-8 lg:p-12 bg-primary text-white tactical-shadow [backface-visibility:hidden] [transform:rotateY(180deg)] flex flex-col justify-center items-center text-center">
                  <p className="text-blue-100 leading-relaxed">Decades of operational excellence serving the nation's largest industrial complexes and financial institutions.</p>
                </div>
              </div>
            </div>
            
            <div className="group h-[320px] bg-transparent [perspective:1000px]">
              <div className="relative w-full h-full transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                <div className="absolute inset-0 p-8 lg:p-12 bg-white tactical-shadow [backface-visibility:hidden] flex flex-col justify-center items-center text-center">
                  <span className="material-symbols-outlined text-6xl text-primary mb-6" data-icon="military_tech">military_tech</span>
                  <h3 className="font-headline text-2xl font-bold text-primary">Pure Dedication</h3>
                </div>
                <div className="absolute inset-0 p-8 lg:p-12 bg-primary text-white tactical-shadow [backface-visibility:hidden] [transform:rotateY(180deg)] flex flex-col justify-center items-center text-center">
                  <p className="text-blue-100 leading-relaxed">Our workforce is trained to uphold the highest standards of integrity and tactical discipline in every mission.</p>
                </div>
              </div>
            </div>

            <div className="group h-[320px] bg-transparent [perspective:1000px]">
              <div className="relative w-full h-full transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                <div className="absolute inset-0 p-8 lg:p-12 bg-white tactical-shadow [backface-visibility:hidden] flex flex-col justify-center items-center text-center">
                  <span className="material-symbols-outlined text-6xl text-primary mb-6" data-icon="workspace_premium">workspace_premium</span>
                  <h3 className="font-headline text-2xl font-bold text-primary">Quality Services</h3>
                </div>
                <div className="absolute inset-0 p-8 lg:p-12 bg-primary text-white tactical-shadow [backface-visibility:hidden] [transform:rotateY(180deg)] flex flex-col justify-center items-center text-center">
                  <p className="text-blue-100 leading-relaxed">Tailored facility and business solutions designed to optimize your corporate workflow and security posture.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What We Offer - Bento Grid Style */}
      <section className="py-20 md:py-32 px-5 md:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16 md:mb-20 flex flex-col md:flex-row justify-between items-start md:items-end gap-6 md:gap-8">
            <div className="max-w-2xl">
              <span className="text-tertiary-container font-bold uppercase tracking-widest text-sm">Service Portfolio</span>
              <h2 className="font-headline text-4xl md:text-5xl font-black text-primary mt-4 tracking-tighter uppercase">Integrated Business Infrastructure</h2>
            </div>
            <Link className="font-bold border-b-4 border-primary text-primary pb-1 uppercase tracking-tighter" to="/services">View All Divisions</Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="group relative aspect-[4/5] bg-primary overflow-hidden">
              <img className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:scale-105 transition-transform duration-500" data-alt="Close up of a security guard's badge on a navy blue uniform, professional and stern atmosphere" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA3mZgl4kvyYJ29O29MOCDAJV1b1wKWnWkdawgify7kZPFbi8yWS2ripAakRUuoeJrEfOrD8nTNX0FosPQvhPMcRwSq-hwdLjhSW45PDwBxkc0LIC7vhP_9AmfOcQ_KteEHNTKrNv8ZJTUKclLKb_JdwnQjEhul4J8Cq73S9gnIczST-I2_jetYHtjAV235nUX3pl7mmOlcT8u4tIhnMjGdNVf_mR4qw-yJXCJKQ_3q_gAk6TBzW-FIbV7nYQPBtuqDdMi7XIiVVt0"/>
              <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/20 to-transparent p-6 lg:p-10 flex flex-col justify-end">
                <h3 className="text-3xl font-headline font-bold text-white mb-4">Security Services</h3>
                <p className="text-blue-100/80 mb-6">Manned guarding and tactical risk management.</p>
                <Link className="inline-flex items-center gap-2 text-white font-bold uppercase text-xs tracking-widest" to="/services/security-guard">Inquire <span className="material-symbols-outlined">trending_flat</span></Link>
              </div>
            </div>
            <div className="group relative aspect-[4/5] bg-primary-container overflow-hidden">
              <img className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:scale-105 transition-transform duration-500" data-alt="Modern office interior being cleaned by professional janitorial staff, focus on clean lines and sanitary environment" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBTIUSJn03oTYQP59XR0DTmdHzHYAKSz24sFdmM3a8gOjcHVvyXFzXS-1lwu1BYLN6kLOYqFQ2wBA7b0DhiY8zgAYDUUY9nfIvzDUcJdfjg8n0vjh3HivK97T4we-A07oLsLlV3YRArOsN7tPEgayQhvS4_hKGUdpJanXiTxZi-btswSvMDnTsiEFBeS7Ik1V0uCTPSDxqqmteqOz1zY0_dcMmiu1NTjIShxJItH4L9uDB3TX5rptXn5tr50_MQvclGpu_UiGp-6D0"/>
              <div className="absolute inset-0 bg-gradient-to-t from-primary-container via-transparent to-transparent p-6 lg:p-10 flex flex-col justify-end">
                <h3 className="text-3xl font-headline font-bold text-white mb-4">Housekeeping</h3>
                <p className="text-blue-100/80 mb-6">Corporate sanitation and aesthetic maintenance.</p>
                <Link className="inline-flex items-center gap-2 text-white font-bold uppercase text-xs tracking-widest" to="/services/house-keeping">Inquire <span className="material-symbols-outlined">trending_flat</span></Link>
              </div>
            </div>
            <div className="group relative aspect-[4/5] bg-tertiary-container overflow-hidden">
              <img className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:scale-105 transition-transform duration-500" data-alt="Skyscraper glass facade reflecting the sky, representing large scale facility management and corporate operations" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB_Jskpx3BVuHzYguxfFiM8HPTQlMsRBnl_TN3PQVdlO8Vn7_TrJdv5agw0t7rlOQxZ101bPAtcktzjlczROkcw5qDPQqgxgBLGJFxGwi0FWa0yKG8bJKCNAg5VTxdNCF7CoD0P4bMzRRmAbovgNu1dbFIEs-DJWW2iqNnrZBK44CVHnq5xqbe48r0_8nAavD8j1caXi-IiDcQdHrhJQXCSlBJtmrQ7BtRYnfCzQlUmPXpzfgBfREn1X0d5taqEEMNWMgKFKLlNEsQ"/>
              <div className="absolute inset-0 bg-gradient-to-t from-tertiary via-transparent to-transparent p-6 lg:p-10 flex flex-col justify-end">
                <h3 className="text-3xl font-headline font-bold text-white mb-4">Facility Management</h3>
                <p className="text-slate-100/80 mb-6">Complete ecosystem upkeep and technical support.</p>
                <Link className="inline-flex items-center gap-2 text-white font-bold uppercase text-xs tracking-widest" to="/services/facility-management">Inquire <span className="material-symbols-outlined">trending_flat</span></Link>
              </div>
            </div>
            <div className="group bg-transparent [perspective:1000px] aspect-[4/5]">
              <div className="relative w-full h-full transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                <div className="absolute inset-0 bg-surface-container-low p-8 lg:p-12 flex flex-col justify-center items-center text-center [backface-visibility:hidden]">
                  <span className="material-symbols-outlined text-6xl text-primary mb-6" data-icon="groups">groups</span>
                  <h3 className="text-2xl font-headline font-bold text-primary">Manpower Supply</h3>
                </div>
                <div className="absolute inset-0 bg-primary text-white p-8 lg:p-12 flex flex-col justify-center items-center text-center [backface-visibility:hidden] [transform:rotateY(180deg)]">
                  <p className="text-blue-100 mb-8 leading-relaxed">Deploying skilled, semi-skilled, and specialized labour forces for industrial scale.</p>
                  <Link className="text-white border-b border-white font-bold uppercase text-xs tracking-widest flex items-center gap-2 hover:text-blue-200 transition-colors" to="/services/manpower-labour">Details <span className="material-symbols-outlined">chevron_right</span></Link>
                </div>
              </div>
            </div>

            <div className="group bg-transparent [perspective:1000px] aspect-[4/5]">
              <div className="relative w-full h-full transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                <div className="absolute inset-0 bg-surface-container-low p-8 lg:p-12 flex flex-col justify-center items-center text-center [backface-visibility:hidden]">
                  <span className="material-symbols-outlined text-6xl text-primary mb-6" data-icon="assignment_ind">assignment_ind</span>
                  <h3 className="text-2xl font-headline font-bold text-primary">Contract Staffing</h3>
                </div>
                <div className="absolute inset-0 bg-primary text-white p-8 lg:p-12 flex flex-col justify-center items-center text-center [backface-visibility:hidden] [transform:rotateY(180deg)]">
                  <p className="text-blue-100 mb-8 leading-relaxed">Flexible workforce solutions for seasonal demands and long-term project stability.</p>
                  <Link className="text-white border-b border-white font-bold uppercase text-xs tracking-widest flex items-center gap-2 hover:text-blue-200 transition-colors" to="/services/contract-staffing">Details <span className="material-symbols-outlined">chevron_right</span></Link>
                </div>
              </div>
            </div>

            <div className="group bg-transparent [perspective:1000px] aspect-[4/5]">
              <div className="relative w-full h-full transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                <div className="absolute inset-0 bg-surface-container-low p-8 lg:p-12 flex flex-col justify-center items-center text-center [backface-visibility:hidden]">
                  <span className="material-symbols-outlined text-6xl text-primary mb-6" data-icon="payments">payments</span>
                  <h3 className="text-2xl font-headline font-bold text-primary">Taxation &amp; PF</h3>
                </div>
                <div className="absolute inset-0 bg-primary text-white p-8 lg:p-12 flex flex-col justify-center items-center text-center [backface-visibility:hidden] [transform:rotateY(180deg)]">
                  <p className="text-blue-100 mb-8 leading-relaxed">Regulatory compliance, PF management, and strategic taxation advisory services.</p>
                  <Link className="text-white border-b border-white font-bold uppercase text-xs tracking-widest flex items-center gap-2 hover:text-blue-200 transition-colors" to="/services/all-taxation">Details <span className="material-symbols-outlined">chevron_right</span></Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Counter Section */}
      <section className="tactical-gradient py-16 md:py-24 px-5 md:px-8 text-white">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 lg:p-12 text-center">
          <div>
            <div className="text-5xl md:text-6xl font-black font-headline tracking-tighter mb-2">02</div>
            <div className="text-blue-200 uppercase font-bold tracking-[0.2em] text-sm">Strategic Offices</div>
          </div>
          <div>
            <div className="text-5xl md:text-6xl font-black font-headline tracking-tighter mb-2">16+</div>
            <div className="text-blue-200 uppercase font-bold tracking-[0.2em] text-sm">Cities Presence</div>
          </div>
          <div>
            <div className="text-5xl md:text-6xl font-black font-headline tracking-tighter mb-2">110</div>
            <div className="text-blue-200 uppercase font-bold tracking-[0.2em] text-sm">Service Verticals</div>
          </div>
          <div>
            <div className="text-5xl md:text-6xl font-black font-headline tracking-tighter mb-2">700+</div>
            <div className="text-blue-200 uppercase font-bold tracking-[0.2em] text-sm">Active Clients</div>
          </div>
        </div>
      </section>

      {/* Security Banner */}
      <section className="bg-tertiary-container py-12 md:py-16 px-5 md:px-8 text-white overflow-hidden relative">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
          <h2 className="font-headline text-3xl md:text-4xl md:text-5xl font-black uppercase tracking-tighter leading-none max-w-3xl">
            We Will Guard &amp; Provide You Safe &amp; Protected Environment
          </h2>
          <Link to="/services" className="bg-white text-tertiary-container px-12 py-5 font-black uppercase tracking-widest text-sm hover:bg-slate-100 transition-colors text-center">
            Secure Now
          </Link>
        </div>
        <div className="absolute right-0 top-0 h-full w-1/3 bg-white/5 skew-x-[-20deg] translate-x-20"></div>
      </section>

      {/* Testimonials */}
      <section className="py-20 md:py-32 px-5 md:px-8 bg-surface-container-low">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col items-center mb-16 text-center">
            <h2 className="font-headline text-3xl md:text-4xl font-black text-primary uppercase tracking-tighter mb-4">What Our Clients Say</h2>
            <div className="flex items-center gap-4 bg-white px-6 py-3 rounded-full shadow-sm border border-slate-100">
              <span className="text-2xl font-black text-slate-800">4.9</span>
              <div className="flex gap-1 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="material-symbols-outlined text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                ))}
              </div>
              <span className="text-sm text-slate-500 font-medium border-l border-slate-200 pl-4">Based on 91 reviews</span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {[ 
              { 
                author: "Pradip Sake",
                time: "2 months ago",
                rating: 5,
                quote: "We are pleased to share that YBG Security has successfully obtained the PASARA license. The entire process was completed in a smooth, systematic, and professional manner. All required documentation and legal formalities were handled...",
                avatar: "P",
                color: "bg-purple-600"
              },
              { 
                author: "Sanjay Kumar",
                time: "5 months ago",
                rating: 5,
                quote: "Best security services in Pune. Very professional and well trained guards. Management is very responsive and helpful for society requirements.",
                avatar: "S",
                color: "bg-blue-600"
              },
              { 
                author: "Amit Sharma",
                time: "8 months ago",
                rating: 5,
                quote: "Excellent facility management and housekeeping services. They maintain our corporate office impeccably. Highly recommended for commercial spaces.",
                avatar: "A",
                color: "bg-emerald-600"
              }
            ].map((test, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex flex-col hover:shadow-md transition-shadow">
                <div className="flex items-center gap-4 mb-4">
                  <div className={`w-12 h-12 rounded-full ${test.color} text-white flex items-center justify-center font-bold text-xl`}>
                    {test.avatar}
                  </div>
                  <div>
                    <div className="font-bold text-slate-800">{test.author}</div>
                    <div className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                      {test.time} on 
                      <svg className="w-3.5 h-3.5 ml-0.5" viewBox="0 0 24 24">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="flex gap-0.5 mb-3 text-amber-400">
                  {[...Array(test.rating)].map((_, i) => (
                    <span key={i} className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                  ))}
                </div>
                <p className="text-slate-600 text-sm flex-grow leading-relaxed">"{test.quote}"</p>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <a href="https://www.google.com/search?q=Yashraj+Business+Group+Pvt+Ltd." target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 border border-slate-300 bg-white px-6 py-3 rounded-full font-bold text-sm text-slate-700 hover:bg-slate-50 transition-colors shadow-sm">
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              View all Google Reviews
            </a>
          </div>
        </div>
      </section>

      {/* Photo Gallery Preview */}
      <section className="py-20 md:py-32 px-5 md:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-12 md:mb-16">
            <h2 className="font-headline text-3xl md:text-4xl font-black text-primary uppercase tracking-tighter">Field Operations</h2>
            <a className="text-primary font-bold border-b-2 border-primary tracking-tighter mb-2" href="/gallery">FULL GALLERY</a>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="aspect-square bg-slate-200 overflow-hidden">
              <img className="w-full h-full object-cover hover:scale-110 transition-transform duration-700" data-alt="Industrial construction site at dusk with heavy machinery and workers in protective gear, dramatic orange light" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBmhD_dWaF2GfVNF24gXwStIq95zPKHiyacLnOk06W7Bs4P5-JPMIrJ51l7NS9ddmJQ51j82L0Svn_8tb7xhRQvODPoeUumJk3VdfH88dVBJJgw9-TintVhP7CfREsKqv92JPvF6jlYE3VGihONfzzjuKY_4731bKiqOI95Cx4jF9jMfMiZYBg4stv56vtgLfszXYFK20NFyaU7jfpi0xgNJVyrNN0SPL-yL2_U2UW6o6tbtNTio_AaHsbToe-ttUkvE-S_gN-6WDM"/>
            </div>
            <div className="aspect-square bg-slate-200 overflow-hidden">
              <img className="w-full h-full object-cover hover:scale-110 transition-transform duration-700" data-alt="Group of professional business consultants in a sleek boardroom setting, corporate high-stakes discussion" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAhtUj4Ajm3vRzsKyc0bkjMv99h5YxdZv7JgHUXqX1ekqIAMQ_gX-hOKHdreW672rF9qCGl_QoiIrxi4lNOWrY7LnT9LEvSjPM_0sLS9GSZDkgbOM4AHSaS3ep7Nlw42zOO4kRruZelUPrfuaJjrFXVMOEu_pHXxjpOMStssGp_b_V1Gz8M08o3MOErPzEuqHOdAt9WD1gGxCgET0pJHgKvlCJ7UlB6d8B7p-0I0Bzqrw5ARbLPFt6BQG7f_VDcNWy0wcjqQyeaJI0"/>
            </div>
            <div className="aspect-square bg-slate-200 overflow-hidden">
              <img className="w-full h-full object-cover hover:scale-110 transition-transform duration-700" data-alt="Security operations center with multiple monitors showing surveillance footage, high-tech control room environment" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCDhatkmlk3Ei2f5d5oECYoMVyTZWQeTnd3MwZCBRcmtfQxwT5HsNuh2-MkrWL8CW7za9iYyk_ZWcP5SoGrNv2CbBu0tQIUEWCXQDjP-eusb_pwveCMI9-7u11N_Dl45Y6P0jTV94rNkGFYQvm0opdBajEcT4kulPaciHLGxKMstOzhTL9OWy0xa2y0hs_kLYc0rkAjb3oWk7FIH_ZADCXigZGDiXvvOqKVQO1yQM2ifyUF9taJb0a4RB_-qW1Ohz_jwCHR_OLYZNY"/>
            </div>
            <div className="aspect-square bg-slate-200 overflow-hidden">
              <img className="w-full h-full object-cover hover:scale-110 transition-transform duration-700" data-alt="Janitorial team cleaning a modern commercial glass elevator, focus on hygiene and professional equipment" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAX11BaQOAOlWqgnaxPC-keGpjzkaQ9vp7utikBMJTBQ28TagmFWhi4kVkszUaX8k1WeJZJqjwK7RH2bDnRbEUqTiQzYJ1YU1Ecm2OqFPVyTen3Uev9lGjPUBZ6k8owGiLJgSrX5ZFSDE54ob1N1JxVJw53F4CGkL2vZe4C5Ldxr0-4Rark5_d85BHGM362Pk-s7NgnCfy7edhnwaY8Htwy-jg4TldcVmj-cpvc4dzxZH_HF1e3WD67-ticerBhGqVZxxwRWHR4iGc"/>
            </div>
            <div className="aspect-square bg-slate-200 overflow-hidden">
              <img className="w-full h-full object-cover hover:scale-110 transition-transform duration-700" data-alt="Large scale logistics warehouse with forklifts and organized pallet racking, industrial efficiency" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD_BZKq38TIss2TW5qv8YPTno9R6sfMomzC3Tg_ONaGBsFSVTEox8uhms93E1WvARynsupidrdDysdfEG0NB0OXEZ4EvkqlEFLER2_WyXJ9l1l_MROydDE0LeJt85VzRKjwkwL2WuhAcGMCR503B4mBtPQ_6wviXGOTnFUhNdo3eANu_DHWJ-vb754LdvfpmFFAUOHVWmYj79E6Q1DkEX0d6k_KWoClNh-q336kUy94cu275CKKBG3U-jLd3up1OyXLMVLRJ08qVS4"/>
            </div>
            <div className="aspect-square bg-slate-200 overflow-hidden">
              <img className="w-full h-full object-cover hover:scale-110 transition-transform duration-700" data-alt="Close up of tax documents and a calculator on a mahogany desk, financial precision and corporate advisory" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBlnvg_zzb6OvMVBlVlHRhlPtanFk61pFNKs5BVgYOxUMA59-ISBSZCE7pw9YjJ-dl5X5z-eeviTt3G_0_oH61RhEEGsbcIvQVaTTZnFRjPoSnEQMUCRBdl5_7851eP8n56QF4uWAk5nm_Ed6J8HXYsPAiJhbgBaDOJYHiBXmVKEAvxXf_mV05y7Mu4H9GH2JQNWqgbpHGuZ_jGeU5RtyCxFkny7rbv9udbTnBk1A8ccyHw0_plKb8gQ6_nR7gPNAZNphBwQOuIJQU"/>
            </div>
          </div>
        </div>
      </section>

      {/* Client Logo Scroll */}
      <section className="py-16 md:py-20 bg-surface-container-low overflow-hidden">
        <div className="max-w-7xl mx-auto px-8 mb-12">
          <h3 className="text-center font-bold text-slate-400 uppercase tracking-[0.5em] text-xs">Trusted By Industry Leaders</h3>
        </div>
        <div className="w-full inline-flex flex-nowrap overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]">
          <ul className="flex items-center justify-center md:justify-start [&_li]:mx-8 [&_img]:max-w-none animate-infinite-scroll">
            {clientLogos.map((logo, index) => (
              <li key={index}>
                <img src={`/${logo}`} alt={`Client Logo ${index + 1}`} className="h-20 w-auto object-contain transition-all duration-300" />
              </li>
            ))}
          </ul>
          <ul className="flex items-center justify-center md:justify-start [&_li]:mx-8 [&_img]:max-w-none animate-infinite-scroll" aria-hidden="true">
            {clientLogos.map((logo, index) => (
              <li key={`dup-${index}`}>
                <img src={`/${logo}`} alt={`Client Logo duplicate ${index + 1}`} className="h-20 w-auto object-contain transition-all duration-300" />
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Brochure Banner */}
      <section className="py-10 md:py-12 px-5 md:px-8 bg-surface-container-highest">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
          <div className="flex flex-col md:flex-row items-center text-center md:text-left gap-4 md:gap-6">
            <span className="material-symbols-outlined text-4xl text-primary" data-icon="description">description</span>
            <div>
              <h4 className="font-headline text-xl font-bold text-primary">Download Corporate Profile</h4>
              <p className="text-sm text-slate-600">Get a detailed look at our operational capabilities and service standards.</p>
            </div>
          </div>
          <button className="bg-primary text-white px-8 py-3 font-bold uppercase tracking-widest text-xs flex items-center gap-2">
            Download <span className="material-symbols-outlined text-sm">download</span>
          </button>
        </div>
      </section>
    </main>
  );
};

export default Home;
