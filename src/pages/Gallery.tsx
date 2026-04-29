import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const galleryItems = [
    {
        category: 'OPERATIONS',
        title: 'Security Operations',
        image: 'https://images.unsplash.com/photo-1542626991-cbc4e32524cc?auto=format&fit=crop&q=80&w=800'
    },
    {
        category: 'FACILITY MANAGEMENT',
        title: 'Housekeeping Team',
        image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&q=80&w=800'
    },
    {
        category: 'INDUSTRIAL',
        title: 'Industrial Logistics',
        image: 'manpower-supply-main.png'
    },
    {
        category: 'CORPORATE',
        title: 'Executive Strategy',
        image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&q=80&w=800'
    },
    {
        category: 'REAL ESTATE',
        title: 'Project Milestone',
        image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&q=80&w=800'
    },
    {
        category: 'DIGITAL',
        title: 'Digital Infrastructure',
        image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=800'
    },
    {
        category: 'PLANNING',
        title: 'Technical Blueprinting',
        image: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&q=80&w=800'
    },
    {
        category: 'FLEET',
        title: 'Supply Chain Assets',
        image: 'https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&q=80&w=800'
    },
    {
        category: 'ADVISORY',
        title: 'Financial Analysis',
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800'
    },
    {
        category: 'HUMAN CAPITAL',
        title: 'Training Excellence',
        image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=800'
    },
    {
        category: 'MAINTENANCE',
        title: 'Specialized Cleaning',
        image: 'housekeeping-1.jpg'
    },
    {
        category: 'SECURITY',
        title: 'Night Vigilance',
        image: 'https://images.unsplash.com/photo-1497215842964-222b430dc094?auto=format&fit=crop&q=80&w=800'
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
