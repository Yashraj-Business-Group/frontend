import React from 'react';
import { useSEO } from '../hooks/useSEO';

const TermsOfService = () => {
  useSEO({
    title: 'Terms of Service',
    description: 'The terms and conditions governing use of the Yashraj Business Group website.'
  });

  return (
    <div className="w-full bg-surface-bright pb-24">
      <section className="bg-primary pt-32 pb-16 px-4 md:px-8 text-center">
        <h1 className="font-headline text-4xl md:text-5xl font-black text-white uppercase tracking-tighter">Terms of Service</h1>
      </section>

      <section className="max-w-3xl mx-auto px-4 md:px-8 py-16 space-y-8 text-slate-700 leading-relaxed">
        <p className="text-sm text-slate-500 italic">
          This is a working draft. Have it reviewed by a qualified professional before treating it as your
          finalized legal terms.
        </p>

        <div>
          <h2 className="font-headline text-xl font-bold text-slate-800 mb-3">Use of This Website</h2>
          <p>
            This website is provided by Yashraj Business Group Pvt. Ltd. for informational purposes and to allow
            prospective clients and job applicants to submit inquiries and applications. By using this site, you
            agree to provide accurate information and not to misuse the contact, quotation, or job application
            forms (including submitting false information or attempting to compromise the site's security).
          </p>
        </div>

        <div>
          <h2 className="font-headline text-xl font-bold text-slate-800 mb-3">No Guarantee of Services</h2>
          <p>
            Submitting a service request or job application through this website does not guarantee that a
            service will be provided or that an application will be accepted. All engagements are subject to
            separate agreement between the parties.
          </p>
        </div>

        <div>
          <h2 className="font-headline text-xl font-bold text-slate-800 mb-3">Intellectual Property</h2>
          <p>
            All content on this website, including text, images, and branding, is the property of Yashraj
            Business Group Pvt. Ltd. unless otherwise noted, and may not be reproduced without permission.
          </p>
        </div>

        <div>
          <h2 className="font-headline text-xl font-bold text-slate-800 mb-3">Limitation of Liability</h2>
          <p>
            This website and its content are provided "as is" without warranties of any kind. Yashraj Business
            Group Pvt. Ltd. is not liable for any damages arising from your use of this website.
          </p>
        </div>

        <div>
          <h2 className="font-headline text-xl font-bold text-slate-800 mb-3">Contact Us</h2>
          <p>
            Questions about these terms can be sent to{' '}
            <a href="mailto:info@yashrajbusinessgroup.com" className="text-primary underline">info@yashrajbusinessgroup.com</a>.
          </p>
        </div>
      </section>
    </div>
  );
};

export default TermsOfService;
