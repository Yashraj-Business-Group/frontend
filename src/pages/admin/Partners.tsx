import React, { useState } from 'react';
import { Plus, Building, Trash2, Link as LinkIcon, Image as ImageIcon } from 'lucide-react';

const AdminPartners = () => {
  const [partners, setPartners] = useState([
    { id: '1', name: 'Reliance Industries', url: 'https://ril.com', status: 'Active' },
    { id: '2', name: 'Tech Mahindra', url: 'https://techmahindra.com', status: 'Active' },
    { id: '3', name: 'HDFC Bank', url: 'https://hdfcbank.com', status: 'Active' },
    { id: '4', name: 'L&T Construction', url: 'https://lntecc.com', status: 'Inactive' },
  ]);

  const [isAdding, setIsAdding] = useState(false);

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-headline font-bold text-slate-800">Trusted Partners</h1>
          <p className="text-slate-500 mt-1">Manage the client logos displayed on the homepage slider.</p>
        </div>
        <button 
          onClick={() => setIsAdding(!isAdding)}
          className="tactical-gradient text-white px-6 py-3 font-bold uppercase tracking-wider text-sm flex items-center gap-2 rounded shadow-lg active:scale-95 transition-transform"
        >
          {isAdding ? 'Cancel' : <><Plus size={18} /> Add New Partner</>}
        </button>
      </div>

      {/* Add New Partner Form (Mock) */}
      {isAdding && (
        <div className="bg-white p-6 rounded-lg shadow-sm border-t-4 border-primary animate-in fade-in slide-in-from-top-4">
          <h2 className="font-headline font-bold text-lg text-slate-800 mb-4">Add New Partner Logo</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Company Name</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Building size={16} className="text-slate-400" />
                </div>
                <input type="text" className="pl-10 w-full border-gray-300 rounded-md shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50" placeholder="e.g. Acme Corp" />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Website URL (Optional)</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <LinkIcon size={16} className="text-slate-400" />
                </div>
                <input type="url" className="pl-10 w-full border-gray-300 rounded-md shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50" placeholder="https://" />
              </div>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-bold text-slate-700 mb-2">Upload Logo (PNG, SVG, JPG)</label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md hover:bg-slate-50 transition-colors cursor-pointer">
                <div className="space-y-1 text-center">
                  <ImageIcon className="mx-auto h-12 w-12 text-slate-400" />
                  <div className="flex text-sm text-slate-600 justify-center">
                    <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-primary hover:text-primary-container focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary">
                      <span>Upload a file</span>
                      <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-slate-500">PNG, JPG, GIF up to 2MB. Use transparent backgrounds if possible.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-6 flex justify-end">
             <button 
              onClick={() => setIsAdding(false)}
              className="bg-primary text-white px-8 py-2 font-bold uppercase tracking-wider text-sm rounded shadow active:scale-95 transition-transform"
             >
               Save Partner
             </button>
          </div>
        </div>
      )}

      {/* Partners List */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 bg-slate-50">
          <h2 className="font-headline font-bold text-lg text-slate-800">Current Partners</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-slate-50 text-slate-500 text-xs uppercase font-bold tracking-wider border-b border-slate-200">
              <tr>
                <th className="px-6 py-4">Logo Preview</th>
                <th className="px-6 py-4">Company Name</th>
                <th className="px-6 py-4">Website URL</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {partners.map((partner) => (
                <tr key={partner.id} className="hover:bg-slate-50 transition-colors items-center">
                  <td className="px-6 py-4">
                    <div className="w-24 h-12 bg-slate-100 rounded flex items-center justify-center border border-slate-200 font-bold text-slate-400 text-xs uppercase">
                        LOGO
                    </div>
                  </td>
                  <td className="px-6 py-4 font-medium text-slate-800">{partner.name}</td>
                  <td className="px-6 py-4 text-primary hover:underline cursor-pointer">{partner.url}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                      partner.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-500'
                    }`}>
                      {partner.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                      <button className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded transition-colors" title="Remove Partner">
                          <Trash2 size={18} />
                      </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminPartners;
