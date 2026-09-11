import React from 'react';
import { useSEO } from '../hooks/useSEO';

const PrivacyPolicy = () => {
  useSEO({
    title: 'Privacy Policy',
    description: 'How Yashraj Business Group collects, uses, and protects your personal information.'
  });

  return (
    <div className="w-full bg-surface-bright pb-24">
      <section className="bg-primary pt-32 pb-16 px-4 md:px-8 text-center">
        <h1 className="font-headline text-4xl md:text-5xl font-black text-white uppercase tracking-tighter">Privacy Policy</h1>
      </section>

      <section className="max-w-3xl mx-auto px-4 md:px-8 py-16 space-y-8 text-slate-700 leading-relaxed">
        <p className="text-sm text-slate-500 italic">
          This is a working draft based on the data this website actually collects. Have it reviewed by a
          qualified professional before treating it as your finalized legal policy.
        </p>

        <div>
          <h2 className="font-headline text-xl font-bold text-slate-800 mb-3">Information We Collect</h2>
          <p>When you use this website, we may collect:</p>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>Contact and quotation requests: full name, company name, email address, phone number, and details of the service you're inquiring about.</li>
            <li>Job applications: full name, email address, phone number, resume/CV file, and any cover note you provide.</li>
          </ul>
        </div>

        <div>
          <h2 className="font-headline text-xl font-bold text-slate-800 mb-3">How We Use It</h2>
          <p>
            We use the information you submit solely to respond to service inquiries, process job applications,
            and communicate with you about the request you made. We do not sell your personal information.
          </p>
        </div>

        <div>
          <h2 className="font-headline text-xl font-bold text-slate-800 mb-3">Third-Party Services</h2>
          <p>
            Form submissions are stored using Supabase, our backend data provider. Fonts are loaded from Google
            Fonts. We do not use advertising or analytics tracking cookies on this site.
          </p>
        </div>

        <div>
          <h2 className="font-headline text-xl font-bold text-slate-800 mb-3">Data Retention & Your Rights</h2>
          <p>
            We retain submitted information for as long as needed to respond to your inquiry or application.
            To request access to, correction of, or deletion of your personal information, contact us at{' '}
            <a href="mailto:info@yashrajbusinessgroup.com" className="text-primary underline">info@yashrajbusinessgroup.com</a>.
          </p>
        </div>

        <div>
          <h2 className="font-headline text-xl font-bold text-slate-800 mb-3">Contact Us</h2>
          <p>
            27, Shree Ganesh Galaxy Complex, Alandi Road (PCMC), Pune - 411105<br />
            Email: info@yashrajbusinessgroup.com &middot; Phone: (+91) 809-078-5907
          </p>
        </div>
      </section>
    </div>
  );
};

export default PrivacyPolicy;
