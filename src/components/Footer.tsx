

const Footer: React.FC = () => {
  return (
    <footer className="w-full py-16 px-12 grid grid-cols-1 md:grid-cols-3 gap-12 bg-[#002451] dark:bg-black text-white">
      <div>
        <div className="text-2xl font-black text-white mb-6 uppercase font-headline">YASHRAJ GROUP</div>
        <p className="text-slate-400 text-sm leading-relaxed mb-8 max-w-xs">
          A multi-dimensional business group dedicated to providing excellence in security, facility management, and tactical corporate solutions.
        </p>
        <div className="flex gap-4">
          <a className="w-10 h-10 bg-white/10 flex items-center justify-center hover:bg-tertiary-container transition-colors" href="#"><span className="material-symbols-outlined text-sm">share</span></a>
          <a className="w-10 h-10 bg-white/10 flex items-center justify-center hover:bg-tertiary-container transition-colors" href="#"><span className="material-symbols-outlined text-sm">location_on</span></a>
          <a className="w-10 h-10 bg-white/10 flex items-center justify-center hover:bg-tertiary-container transition-colors" href="#"><span className="material-symbols-outlined text-sm">mail</span></a>
        </div>
      </div>
      <div>
        <h5 className="font-headline font-bold text-white mb-8 uppercase tracking-widest text-sm">Internal Access</h5>
        <nav className="flex flex-col gap-4">
          <a className="text-white underline text-sm" href="/">Home</a>
          <a className="text-slate-400 hover:text-white transition-colors text-sm" href="/company-profile">Company Profile</a>
          <a className="text-slate-400 hover:text-white transition-colors text-sm" href="/privacy-policy">Privacy Policy</a>
          <a className="text-slate-400 hover:text-white transition-colors text-sm" href="/terms-of-service">Terms of Service</a>
          <a className="text-slate-400 hover:text-white transition-colors text-sm" href="/sitemap">Sitemap</a>
        </nav>
      </div>
      <div>
        <h5 className="font-headline font-bold text-white mb-8 uppercase tracking-widest text-sm">Corporate H.Q.</h5>
        <p className="text-slate-400 text-sm leading-relaxed mb-4">
          Plot No. 44, Business Hub Center,<br />
          Tech Park Phase II, Mumbai - 400001
        </p>
        <p className="text-slate-400 text-sm mb-4">Contact: +91 22 2548 9XXX</p>
        <p className="text-slate-400 text-sm">Email: info@yashrajbusiness.com</p>
      </div>
      <div className="md:col-span-3 pt-12 border-t border-white/10 text-center text-slate-500 text-xs tracking-widest uppercase">
        © 2024 Yashraj Business Group Pvt. Ltd. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
