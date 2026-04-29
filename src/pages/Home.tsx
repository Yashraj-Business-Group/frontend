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
          <img className="w-full h-full object-cover" data-alt="Professional security guards in tactical uniform standing in formation outside a modern corporate glass building during daytime" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCCM_nSTHhy6jiGQ6ZLciMORVZZEM29xGsOXVfNkdvNYEv_SU_gFWxEUKx2aXi-euz4lR36JVeji0OJJG_yYJxd3fPKK-3H1ZON_j9AWj3bA59ngE37KBKzjx_loun_vPD-fr2nVVXxYWTnK_M9MXOPc0Qw1wtjmSGXQztLCrrJDAkgF7jideIfh-09IyU67LEfKAZCODkOVhSjMkxgK8IvwsCuecackZiqpHawqI_vy2pe8jYvlekcpaPwzJvi44J0Z1_o_JobOKc"/>
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-transparent"></div>
        </div>
        <div className="relative z-10 h-full max-w-7xl mx-auto px-5 md:px-8 flex flex-col justify-center items-start text-white">
          <span className="label-sm font-bold uppercase tracking-[0.2em] text-on-primary-container mb-6 block">Elite Protection Services</span>
          <h1 className="font-headline text-5xl sm:text-6xl md:text-8xl font-extrabold tracking-tighter leading-[0.9] mb-8 max-w-4xl">
            COMMANDING <br/>SECURITY.
          </h1>
          <p className="text-xl max-w-xl text-slate-200 mb-10 font-medium leading-relaxed">
            Protecting your corporate assets with military-grade precision and unwavering vigilance across 16+ cities.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <button className="tactical-gradient px-8 py-4 sm:px-10 sm:py-5 font-bold uppercase text-sm tracking-widest hover:-translate-y-1 transition-transform">Get Secured Now</button>
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
          <button className="bg-white text-tertiary-container px-12 py-5 font-black uppercase tracking-widest text-sm hover:bg-slate-100 transition-colors">
            Secure Now
          </button>
        </div>
        <div className="absolute right-0 top-0 h-full w-1/3 bg-white/5 skew-x-[-20deg] translate-x-20"></div>
      </section>

      {/* Testimonials */}
      <section className="py-20 md:py-32 px-5 md:px-8 bg-surface-container-low">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-headline text-3xl md:text-4xl font-black text-primary mb-16 uppercase tracking-tighter text-center">Executive Testimonials</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:p-12">
            {[ 
              { quote: "Their security protocols are unmatched in the industry. We've seen a significant reduction in onsite risks since partnering with Yashraj Group.", author: "Director, Industrial Corp" },
              { quote: "Seamless facility management. They operate with a level of professionalism that allows us to focus entirely on our core business operations.", author: "CEO, Fintech Hub" },
              { quote: "Handling labour compliance used to be a headache. Yashraj Group's manpower solutions are reliable and fully compliant.", author: "HR Head, Manufacturing Ltd" }
            ].map((test, index) => (
              <div key={index} className="group h-[350px] bg-transparent [perspective:1000px]">
                <div className="relative w-full h-full transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                  <div className="absolute inset-0 bg-white p-8 lg:p-12 tactical-shadow border-t-8 border-primary [backface-visibility:hidden] flex flex-col justify-center items-center text-center">
                    <div className="flex gap-1 mb-6 text-tertiary-container">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                      ))}
                    </div>
                    <div className="font-bold text-primary uppercase text-lg tracking-widest">{test.author}</div>
                    <div className="text-sm text-slate-400 mt-4 uppercase tracking-widest">Hover to review</div>
                  </div>
                  <div className="absolute inset-0 bg-primary text-white p-8 lg:p-12 tactical-shadow border-t-8 border-tertiary-container [backface-visibility:hidden] [transform:rotateY(180deg)] flex flex-col justify-center items-center text-center">
                    <p className="italic text-blue-100 leading-relaxed text-lg mb-0">"{test.quote}"</p>
                  </div>
                </div>
              </div>
            ))}
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
