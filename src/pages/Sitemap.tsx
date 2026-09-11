import React from 'react';
import { Link } from 'react-router-dom';
import { useSEO } from '../hooks/useSEO';

const links: { to: string; label: string }[] = [
  { to: '/', label: 'Home' },
  { to: '/company-profile', label: 'Company Profile' },
  { to: '/services', label: 'Services' },
  { to: '/job-portal', label: 'Careers' },
  { to: '/blog', label: 'Blog' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/contact', label: 'Contact' },
  { to: '/privacy-policy', label: 'Privacy Policy' },
  { to: '/terms-of-service', label: 'Terms of Service' },
];

const Sitemap = () => {
  useSEO({
    title: 'Sitemap',
    description: 'Browse all pages on the Yashraj Business Group website.'
  });

  return (
    <div className="w-full bg-surface-bright pb-24">
      <section className="bg-primary pt-32 pb-16 px-4 md:px-8 text-center">
        <h1 className="font-headline text-4xl md:text-5xl font-black text-white uppercase tracking-tighter">Sitemap</h1>
      </section>

      <section className="max-w-2xl mx-auto px-4 md:px-8 py-16">
        <ul className="space-y-4">
          {links.map(link => (
            <li key={link.to}>
              <Link to={link.to} className="text-primary font-bold hover:underline text-lg">{link.label}</Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default Sitemap;
