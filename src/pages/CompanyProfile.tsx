import React from 'react';
import { Target, Shield, Users, Award, CheckCircle2 } from 'lucide-react';

const CompanyProfile = () => {
    return (
        <div className="w-full bg-surface-bright pb-24">
            {/* Hero Section */}
            <section className="relative pt-32 pb-24 px-4 md:px-8 bg-primary text-white overflow-hidden">
                <div className="absolute inset-0 z-0 opacity-20 bg-[url('https://www.t.png')]"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-primary to-transparent z-10"></div>

                <div className="relative z-20 max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12">
                    <div className="flex-1">
                        <span className="label-sm font-bold uppercase tracking-[0.2em] text-on-primary-container mb-4 block">Our Legacy</span>
                        <h1 className="font-headline text-5xl md:text-7xl font-extrabold tracking-tighter leading-tight mb-6">
                            A TRADITION OF <br />EXCELLENCE.
                        </h1>
                        <p className="text-xl max-w-2xl text-blue-100/90 font-medium leading-relaxed mb-8">
                            YASHRAJ BUSINESS GROUP PVT. LTD. (Formerly Known as YASHRAJ SECURITY) is a premier multi-dimensional service provider dedicated to securing and optimizing corporate operations across India.
                        </p>
                        <div className="flex gap-4">
                            <button className="tactical-gradient px-8 py-4 font-bold uppercase text-xs tracking-widest hover:-translate-y-1 transition-transform border border-white/20">
                                View Divisions
                            </button>
                        </div>
                    </div>

                    {/* Stats Grid Overlay */}
                    <div className="w-full md:w-[500px] grid grid-cols-2 gap-4">
                        <div className="bg-white/10 backdrop-blur-md p-6 border border-white/20">
                            <div className="text-4xl font-black font-headline text-white mb-1">02</div>
                            <div className="text-blue-200 uppercase font-bold tracking-[0.1em] text-xs">Registered Offices</div>
                        </div>
                        <div className="bg-white/10 backdrop-blur-md p-6 border border-white/20">
                            <div className="text-4xl font-black font-headline text-white mb-1">16+</div>
                            <div className="text-blue-200 uppercase font-bold tracking-[0.1em] text-xs">Cities Covered</div>
                        </div>
                        <div className="bg-white/10 backdrop-blur-md p-6 border border-white/20">
                            <div className="text-4xl font-black font-headline text-white mb-1">110</div>
                            <div className="text-blue-200 uppercase font-bold tracking-[0.1em] text-xs">Quality Services</div>
                        </div>
                        <div className="bg-white/10 backdrop-blur-md p-6 border border-white/20">
                            <div className="text-4xl font-black font-headline text-white mb-1">700+</div>
                            <div className="text-blue-200 uppercase font-bold tracking-[0.1em] text-xs">Happy Clients</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Founder's Message */}
            <section className="max-w-7xl mx-auto px-4 md:px-8 py-24">
                <div className="flex flex-col lg:flex-row gap-16 items-center">
                    <div className="w-full max-w-sm mx-auto lg:max-w-none lg:w-1/3">
                        <div className="relative aspect-[3/4] bg-slate-200 rounded-sm overflow-hidden border-b-8 border-primary tactical-shadow">
                            <img
                                src="/Vaibhav-Sir.jpg"
                                alt="Mr. Vaibhav Amrut Patil, Founder & Managing Director"
                                className="absolute inset-0 w-full h-full object-cover"
                            />
                        </div>
                    </div>
                    <div className="lg:w-2/3 space-y-8">
                        <span className="text-tertiary-container font-bold uppercase tracking-widest text-sm">Leadership</span>
                        <h2 className="font-headline text-4xl font-black text-primary uppercase tracking-tighter">
                            Message from the Founder
                        </h2>
                        <div className="prose prose-lg text-slate-600 font-medium leading-relaxed">
                            <p className="text-xl text-slate-800 italic font-serif border-l-4 border-primary pl-6 mb-8">
                                "Our mission has always been to provide uncompromising security and facility management solutions that allow our clients to focus entirely on their core business growth."
                            </p>
                            <p>
                                Founded by <strong>Mr. Vaibhav Amrut Patil</strong>, Yashraj Business Group started with a singular vision: to elevate the standard of security services in the corporate sector. Over the years, we have aggressively expanded our operational capabilities, transitioning from a pure security firm into a comprehensive business solutions ecosystem.
                            </p>
                            <p>
                                Today, we are proud to offer an integrated suite of services encompassing everything from tactical guarding and intensive housekeeping to complete corporate taxation compliance. Our growth across 16+ cities is a testament to our unwavering commitment to quality and client satisfaction.
                            </p>
                        </div>
                        <div className="pt-6 border-t border-slate-200">
                            <div className="font-headline font-bold text-xl text-primary">Mr. Vaibhav Amrut Patil</div>
                            <div className="text-sm font-bold text-slate-500 uppercase tracking-widest">Founder & Managing Director</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Another Team Member */}
            <section className="bg-white py-16 px-4 md:px-8 border-t border-slate-200">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12">
                    <div className="w-48 h-48 md:w-56 md:h-56 rounded-full overflow-hidden border-4 border-white tactical-shadow shrink-0 relative bg-slate-200">
                        {/* Add the other team member's image here later */}
                        <div className="absolute inset-0 flex items-center justify-center bg-primary/5">
                            <img src="/MrsAnuradhaPatil-white.jpg" alt="Mrs. Anuradha Patil" className="absolute inset-0 w-full h-full object-cover" />
                        </div>
                    </div>
                    <div>
                        <h3 className="font-headline text-3xl font-bold text-primary mb-2">Mrs. Anuradha Patil</h3>
                        <div className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-4">Team Member</div>
                        <p className="text-slate-600 leading-relaxed max-w-2xl">
                            An integral part of the Yashraj Business Group operations, ensuring the delivery of high-quality services and operational excellence across our divisions.
                        </p>
                    </div>
                </div>
            </section>

            {/* Core Values */}
            <section className="bg-surface-container-low py-24 px-4 md:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <span className="text-primary font-bold uppercase tracking-widest text-sm">Our Philosophy</span>
                        <h2 className="font-headline text-4xl font-black text-slate-800 mt-2 uppercase tracking-tighter">Core Principles</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                        <div className="bg-white p-10 tactical-shadow border-t-4 border-primary hover:-translate-y-1 transition-transform">
                            <Shield size={40} className="text-primary mb-6" />
                            <h3 className="font-headline text-2xl font-bold text-slate-800 mb-4">Uncompromising Security</h3>
                            <p className="text-slate-600 leading-relaxed">
                                We deploy highly trained personnel equipped with the latest protocols to ensure absolute safety and asset protection for our clients.
                            </p>
                        </div>
                        <div className="bg-white p-10 tactical-shadow border-t-4 border-primary hover:-translate-y-1 transition-transform">
                            <Award size={40} className="text-primary mb-6" />
                            <h3 className="font-headline text-2xl font-bold text-slate-800 mb-4">Operational Excellence</h3>
                            <p className="text-slate-600 leading-relaxed">
                                From housekeeping to facility management, we enforce rigorous quality control measures that guarantee pristine operational environments.
                            </p>
                        </div>
                        <div className="bg-white p-10 tactical-shadow border-t-4 border-primary hover:-translate-y-1 transition-transform">
                            <Target size={40} className="text-primary mb-6" />
                            <h3 className="font-headline text-2xl font-bold text-slate-800 mb-4">Strategic Compliance</h3>
                            <p className="text-slate-600 leading-relaxed">
                                Through our Taxway Consultancy division, we ensure your business remains flawlessly aligned with all legal, PF, and taxation requirements.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Mini CTA */}
            <section className="py-24 text-center px-4 md:px-8">
                <h2 className="font-headline text-3xl font-black text-primary mb-6 uppercase tracking-tighter">Ready to secure your business operations?</h2>
                <p className="text-slate-600 max-w-2xl mx-auto mb-10">Partner with an industry leader trusted by over 700 corporations across India.</p>
                <button onClick={() => { window.location.href = "/contact"; }} className="tactical-gradient text-white px-10 py-4 font-bold uppercase tracking-widest text-sm shadow-lg active:scale-95 transition-transform">
                    Contact Our Command Center
                </button>
            </section>
        </div>
    );
};

export default CompanyProfile;
