import React, { useState, useEffect } from 'react';
import { Plus, Building, Trash2, Link as LinkIcon, Image as ImageIcon, ExternalLink, X, CheckCircle2 } from 'lucide-react';
import { useConfirm } from '../../context/ConfirmContext';

interface Partner {
  id: string;
  name: string;
  url?: string;
  status: 'Active' | 'Inactive';
  logoUrl?: string;
  createdAt?: string;
}

const STORAGE_KEY = 'ybg_trusted_partners_list';

const AdminPartners = () => {
  const confirm = useConfirm();
  const [partners, setPartners] = useState<Partner[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isAdding, setIsAdding] = useState(false);
  const [name, setName] = useState('');
  const [url, setUrl] = useState('');
  const [status, setStatus] = useState<'Active' | 'Inactive'>('Active');
  const [logoUrl, setLogoUrl] = useState('');
  const [previewError, setPreviewError] = useState(false);
  const [successToast, setSuccessToast] = useState('');

  const showToast = (msg: string) => {
    setSuccessToast(msg);
    setTimeout(() => setSuccessToast(''), 3000);
  };

  const handleSavePartner = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const newPartner: Partner = {
      id: Date.now().toString(),
      name: name.trim(),
      url: url.trim() || undefined,
      status,
      logoUrl: logoUrl.trim() || undefined,
      createdAt: new Date().toISOString()
    };

    const updated = [newPartner, ...partners];
    setPartners(updated);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (err) {
      console.error('Failed to save to localStorage:', err);
    }

    setName('');
    setUrl('');
    setStatus('Active');
    setLogoUrl('');
    setIsAdding(false);
    showToast('New partner added successfully');
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      alert('File size exceeds 2MB limit.');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setLogoUrl(reader.result);
        setPreviewError(false);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleDeletePartner = async (id: string, partnerName: string) => {
    const ok = await confirm({
      title: 'Remove Trusted Partner',
      message: `Are you sure you want to remove "${partnerName}" from the trusted partners list?`,
      confirmText: 'Remove Partner',
      variant: 'danger',
      icon: 'trash',
    });
    if (!ok) return;

    const updated = partners.filter(p => p.id !== id);
    setPartners(updated);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (err) {
      console.error('Failed to save to localStorage:', err);
    }
    showToast('Partner removed');
  };

  return (
    <div className="w-full space-y-6 animate-in fade-in slide-in-from-bottom-4">
      {/* Toast Notification */}
      {successToast && (
        <div className="fixed bottom-6 right-6 z-50 px-4 py-3 rounded-lg shadow-xl text-sm font-medium flex items-center gap-2 bg-slate-900 text-white animate-in fade-in slide-in-from-bottom-2">
          <CheckCircle2 size={16} className="text-emerald-400" />
          <span>{successToast}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-headline font-bold text-slate-800">Trusted Partners</h1>
          <p className="text-slate-500 text-sm mt-0.5">Manage partner companies and client logos displayed across the website.</p>
        </div>
        <button 
          onClick={() => setIsAdding(!isAdding)}
          className="tactical-gradient text-white px-5 py-2.5 font-bold uppercase tracking-wider text-xs flex items-center gap-2 rounded-lg shadow-sm active:scale-95 transition-transform"
        >
          {isAdding ? <><X size={16} /> Cancel</> : <><Plus size={16} /> Add New Partner</>}
        </button>
      </div>

      {/* Add New Partner Form */}
      {isAdding && (
        <form onSubmit={handleSavePartner} className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 border-t-4 border-t-[#002451] animate-in fade-in slide-in-from-top-4 space-y-5">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h2 className="font-headline font-bold text-lg text-slate-800">Add New Partner Logo</h2>
            <button type="button" onClick={() => setIsAdding(false)} className="text-slate-400 hover:text-slate-600">
              <X size={18} />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">Company Name *</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Building size={16} className="text-slate-400" />
                </div>
                <input 
                  type="text" 
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="pl-10 w-full border border-slate-300 rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#002451] focus:border-[#002451]" 
                  placeholder="e.g. Tata Consultancy Services" 
                />
              </div>
            </div>
            
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">Website URL (Optional)</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <LinkIcon size={16} className="text-slate-400" />
                </div>
                <input 
                  type="url" 
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="pl-10 w-full border border-slate-300 rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#002451] focus:border-[#002451]" 
                  placeholder="https://example.com" 
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">Display Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as 'Active' | 'Inactive')}
                className="w-full border border-slate-300 rounded-lg p-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#002451] focus:border-[#002451]"
              >
                <option value="Active">Active (Visible)</option>
                <option value="Inactive">Inactive (Hidden)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">Logo URL or Direct Link (Optional)</label>
              <input 
                type="text" 
                value={logoUrl}
                onChange={(e) => {
                  setLogoUrl(e.target.value);
                  setPreviewError(false);
                }}
                className="w-full border border-slate-300 rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#002451] focus:border-[#002451]" 
                placeholder="https://.../logo.png or upload below" 
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">Upload Partner Logo Image</label>
              <label className="border-2 border-dashed border-slate-300 hover:border-[#002451] rounded-xl p-5 flex flex-col items-center justify-center bg-slate-50 hover:bg-slate-100/80 transition-colors cursor-pointer block text-center">
                {logoUrl && !previewError ? (
                  <div className="space-y-2">
                    <img 
                      src={logoUrl} 
                      alt="Logo Preview" 
                      onError={() => setPreviewError(true)}
                      className="h-16 max-w-[200px] object-contain mx-auto border rounded bg-white p-2" 
                    />
                    <span className="text-xs text-slate-500 block">Click to choose a different logo image</span>
                  </div>
                ) : (
                  <>
                    <ImageIcon size={32} className="text-slate-400 mb-2" />
                    <span className="text-sm font-semibold text-slate-700">Click to upload logo file</span>
                    <span className="text-xs text-slate-400 mt-0.5">PNG, SVG, or JPG (max 2MB)</span>
                  </>
                )}
                <input 
                  type="file" 
                  accept="image/png,image/jpeg,image/svg+xml"
                  onChange={handleLogoUpload}
                  className="hidden" 
                />
              </label>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-3 border-t border-slate-100">
            <button 
              type="button" 
              onClick={() => setIsAdding(false)} 
              className="px-4 py-2 border border-slate-300 rounded-lg text-slate-700 text-sm font-semibold hover:bg-slate-50 transition-colors"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="bg-[#002451] hover:bg-[#001b3d] text-white px-6 py-2 rounded-lg font-bold text-sm shadow-sm transition-colors"
            >
              Save Partner
            </button>
          </div>
        </form>
      )}

      {/* Partners List */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden w-full">
        <div className="px-6 py-4 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
          <h2 className="font-headline font-bold text-base text-slate-800">Current Partners ({partners.length})</h2>
          <span className="text-xs text-slate-400">Total registered partner brands</span>
        </div>
        <div className="overflow-x-auto w-full">
          <table className="w-full text-left text-sm text-slate-600 border-collapse min-w-[700px]">
            <thead className="bg-slate-50 text-slate-600 text-xs uppercase font-bold tracking-wider border-b border-slate-200">
              <tr>
                <th className="px-6 py-3.5">Logo</th>
                <th className="px-6 py-3.5">Company Name</th>
                <th className="px-6 py-3.5">Website URL</th>
                <th className="px-6 py-3.5">Status</th>
                <th className="px-6 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {partners.map((partner) => (
                <tr key={partner.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="px-6 py-4">
                    {partner.logoUrl ? (
                      <img 
                        src={partner.logoUrl} 
                        alt={partner.name}
                        className="h-10 max-w-[100px] object-contain rounded border border-slate-200 bg-white p-1" 
                      />
                    ) : (
                      <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center border border-slate-200 font-bold text-slate-600 text-xs">
                        {(partner.name || 'P').charAt(0).toUpperCase()}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 font-semibold text-slate-900">{partner.name}</td>
                  <td className="px-6 py-4 text-xs">
                    {partner.url ? (
                      <a 
                        href={partner.url} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-primary hover:underline inline-flex items-center gap-1 font-medium"
                      >
                        <span className="truncate max-w-[220px]">{partner.url}</span>
                        <ExternalLink size={12} />
                      </a>
                    ) : (
                      <span className="text-slate-400 italic">None</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider ${
                      partner.status === 'Active' 
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                        : 'bg-slate-100 text-slate-600 border border-slate-200'
                    }`}>
                      {partner.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button 
                      onClick={() => handleDeletePartner(partner.id, partner.name)}
                      className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-lg transition-colors" 
                      title="Remove Partner"
                    >
                      <Trash2 size={17} />
                    </button>
                  </td>
                </tr>
              ))}

              {partners.length === 0 && (
                <tr>
                  <td colSpan={5} className="py-16 text-center text-slate-500">
                    <div className="flex flex-col items-center justify-center gap-2">
                      <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                        <Building size={24} />
                      </div>
                      <span className="font-bold text-slate-800 text-base">No trusted partners added yet.</span>
                      <p className="text-xs text-slate-400 max-w-sm">
                        All mock entries have been removed. Click "Add New Partner" to add real partner and client logos.
                      </p>
                      <button
                        onClick={() => setIsAdding(true)}
                        className="mt-2 text-xs font-bold bg-[#002451] text-white px-4 py-2 rounded-lg hover:bg-[#001b3d] transition-colors"
                      >
                        + Add First Partner
                      </button>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminPartners;
