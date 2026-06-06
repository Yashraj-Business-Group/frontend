import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const defaultGalleryItems = [
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
    const [items, setItems] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [selectedImage, setSelectedImage] = useState<any | null>(null);

    // Close modal on Escape
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setSelectedImage(null);
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    useEffect(() => {
        window.scrollTo(0, 0);

        const fetchGallery = async () => {
            try {
                const res = await fetch('/api/gallery');
                if (!res.ok) throw new Error('Failed to fetch');
                const data = await res.json();
                const dbItems = Array.isArray(data) ? data.map((item: any) => ({
                    category: item.category,
                    title: item.title,
                    image: item.imageUrl,
                    isFromDb: true,
                    id: item.id
                })) : [];
                setItems([...dbItems, ...defaultGalleryItems]);
            } catch (err) {
                console.warn('API error, falling back to static gallery:', err);
                setItems(defaultGalleryItems);
            } finally {
                setLoading(false);
            }
        };

        fetchGallery();
    }, []);

    // Derived category data
    const categories = Array.from(new Set(items.map(item => item.category)));
    const categoryCards = categories.map(cat => {
        const catItems = items.filter(item => item.category === cat);
        return {
            category: cat,
            coverImage: catItems[0]?.image,
            count: catItems.length
        };
    });

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
                        {selectedCategory && (
                            <>
                                <span className="material-symbols-outlined text-sm">chevron_right</span>
                                <span className="text-white">{selectedCategory}</span>
                            </>
                        )}
                    </div>
                    <h1 className="font-headline text-5xl md:text-7xl font-black uppercase tracking-tighter mb-4">
                        {selectedCategory ? `${selectedCategory} GALLERY` : 'PHOTO GALLERY'}
                    </h1>
                    <div className="border-l-4 border-red-600 pl-4 py-1 max-w-2xl">
                        <p className="text-lg text-blue-100 italic">
                            {selectedCategory 
                                ? `View our work and operations in the ${selectedCategory} sector.`
                                : `Visual proof of our commitment to excellence across diverse operational sectors.`}
                        </p>
                    </div>
                </div>
            </section>

            {/* Grid Section */}
            <section className="max-w-7xl mx-auto px-8 py-16 bg-[#f8f9fa]">
                {loading ? (
                    <div className="text-center py-12 text-slate-500 font-medium">Loading gallery images...</div>
                ) : selectedCategory ? (
                    <div className="animate-in fade-in duration-300">
                        <button 
                            onClick={() => setSelectedCategory(null)} 
                            className="mb-8 flex items-center gap-2 text-slate-600 font-bold hover:text-primary transition-colors bg-white px-4 py-2 rounded-md shadow-sm border border-slate-200 inline-flex"
                        >
                            <span className="material-symbols-outlined">arrow_back</span> Back to Categories
                        </button>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                            {items.filter(item => item.category === selectedCategory).map((item, index) => (
                                <div key={index} onClick={() => setSelectedImage(item)} className="bg-white group cursor-pointer tactical-shadow hover:-translate-y-1 transition-all duration-300 border border-gray-100">
                                    <div className="aspect-[4/3] overflow-hidden bg-slate-100">
                                        <img
                                            src={item.image}
                                            alt={item.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                    </div>
                                    <div className="p-6">
                                        <h3 className="font-headline text-lg font-bold text-slate-800 mb-3 group-hover:text-primary transition-colors">
                                            {item.title}
                                        </h3>
                                        <div className="w-8 h-1 bg-slate-300 group-hover:bg-primary transition-colors"></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 animate-in fade-in duration-300">
                        {categoryCards.map((cat, index) => (
                            <div 
                                key={index} 
                                onClick={() => setSelectedCategory(cat.category)} 
                                className="bg-white group cursor-pointer tactical-shadow hover:-translate-y-1 transition-all duration-300 border border-gray-100 rounded-lg overflow-hidden"
                            >
                                <div className="aspect-[16/9] overflow-hidden relative bg-slate-200">
                                    {cat.coverImage && (
                                        <img
                                            src={cat.coverImage}
                                            alt={cat.category}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                        />
                                    )}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent group-hover:via-black/40 transition-colors"></div>
                                    <div className="absolute inset-0 flex flex-col justify-end p-6">
                                        <h2 className="text-white text-2xl font-black font-headline tracking-wider uppercase drop-shadow-md">
                                            {cat.category}
                                        </h2>
                                        <p className="text-blue-100 text-sm font-medium mt-1">
                                            {cat.count} {cat.count === 1 ? 'Image' : 'Images'}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
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
            {/* Lightbox Modal */}
            {selectedImage && (
                <div 
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-4 md:p-12 animate-in fade-in duration-200"
                    onClick={() => setSelectedImage(null)}
                >
                    <button 
                        className="absolute top-4 right-4 md:top-8 md:right-8 text-white bg-white/10 hover:bg-white hover:text-black p-2 md:p-3 rounded-full transition-colors flex items-center justify-center z-50 backdrop-blur-sm"
                        onClick={(e) => { e.stopPropagation(); setSelectedImage(null); }}
                    >
                        <span className="material-symbols-outlined">close</span>
                    </button>
                    <div 
                        className="relative max-w-full max-h-full flex flex-col items-center justify-center animate-in zoom-in-95 duration-200"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <img 
                            src={selectedImage.image} 
                            alt={selectedImage.title} 
                            className="max-w-full max-h-[75vh] md:max-h-[85vh] object-contain shadow-2xl rounded-sm"
                        />
                        <div className="mt-6 text-center">
                            <h3 className="text-white font-headline text-xl md:text-2xl font-bold mb-1">{selectedImage.title}</h3>
                            <div className="text-xs font-bold text-red-500 uppercase tracking-widest">
                                {selectedImage.category}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Gallery;
