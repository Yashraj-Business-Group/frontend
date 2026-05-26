import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const galleryItems = [
    {
        category: 'SECURITY',
        title: 'SECURITY GUARD',
        image: 'guard2.jpeg'
    },
    {
        category: 'MAINTENANCE',
        title: 'HOUSE KEEPING',
        image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&q=80&w=800'
    },
    {
        category: 'FACILITY',
        title: 'FACILITY MANAGEMENT-CLEANING',
        image: 'cleaning.jpeg'
    },
    {
        category: 'MANPOWER',
        title: 'MANPOWER / LABOUR SUPPLY',
        image: 'manpower.jpeg'
    },
    {
        category: 'STAFFING',
        title: 'CONTRACT STAFFING / PROJECT PLANNING',
        image: 'management.jpeg'
    },
    {
        category: 'COMPLIANCE',
        title: 'PF ESIC & P.TAX NEW REG.',
        image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80&w=800'
    },
    {
        category: 'TAXATION',
        title: 'ALL TAXATION WORK',
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800'
    }
];

const Gallery: React.FC = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="w-full bg-surface-bright pb-0">
            {/* Hero Section */}
            <section className="relative bg-primary pt-24 pb-20 px-8 overflow-hidden text-white min-h-[350px] flex items-center">
                <div className="absolute inset-0 z-0">
                    <img
                        className="w-full h-full object-cover opacity-20"
                        src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=2000"
                        alt="Corporate Building"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary/60"></div>
                </div>
                <div className="relative z-10 max-w-7xl mx-auto w-full">
                    <div className="text-xs font-bold tracking-widest text-blue-200 uppercase mb-4 flex items-center gap-2">
                        <Link to="/" className="hover:text-white transition-colors">Home</Link>
                        <span className="material-symbols-outlined text-sm">chevron_right</span>
                        <span className="text-white">Gallery</span>
                    </div>
                    <h1 className="font-headline text-5xl md:text-7xl font-black uppercase tracking-tighter mb-4">
                        Photo Gallery
                    </h1>
                    <div className="border-l-4 border-red-600 pl-4 py-1 max-w-2xl">
                        <p className="text-lg text-blue-100 italic">
                            Visual proof of our commitment to excellence across diverse operational sectors.
                        </p>
                    </div>
                </div>
            </section>

            {/* Grid Section */}
            <section className="max-w-7xl mx-auto px-8 py-16 bg-[#f8f9fa]">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {galleryItems.map((item, index) => (
                        <div key={index} className="bg-white group cursor-pointer tactical-shadow hover:-translate-y-1 transition-all duration-300 border border-gray-100">
                            <div className="aspect-[4/3] overflow-hidden">
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                            </div>
                            <div className="p-6">
                                <div className="text-[10px] font-bold text-red-600 uppercase tracking-widest mb-2">
                                    {item.category}
                                </div>
                                <h3 className="font-headline text-lg font-bold text-slate-800 mb-3 group-hover:text-primary transition-colors">
                                    {item.title}
                                </h3>
                                <div className="w-8 h-1 bg-slate-300 group-hover:bg-primary transition-colors"></div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Call to Action */}
            <section className="bg-primary-container py-24 px-8 text-center text-white">
                <div className="max-w-3xl mx-auto">
                    <h2 className="font-headline text-3xl md:text-5xl font-black uppercase tracking-tighter mb-6">
                        See Our Operations in Action
                    </h2>
                    <p className="text-blue-100 mb-10 text-lg">
                        Detailed case studies and project reports are available for authorized corporate entities.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <Link to="/contact" className="bg-white text-primary-container px-8 py-4 font-bold uppercase tracking-widest text-sm hover:bg-slate-100 transition-colors">
                            Contact Us
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Gallery;
