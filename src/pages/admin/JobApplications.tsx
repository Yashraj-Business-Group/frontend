import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Eye, Briefcase, FileText } from 'lucide-react';

const JobApplications = () => {
  const [activeTab, setActiveTab] = useState<'roles' | 'applications'>('roles');
  
  // Job Postings State
  const [jobs, setJobs] = useState<any[]>([]);
  const [isRoleModalOpen, setIsRoleModalOpen] = useState(false);
  const [roleForm, setRoleForm] = useState({ title: '', location: '', type: 'Full-Time', salaryRange: '', description: '', isActive: true });
  
  // Applications State
  const [applications, setApplications] = useState<any[]>([]);

  const fetchJobs = async () => {
    try {
      const res = await fetch('/api/jobs');
      if (res.ok) setJobs(await res.json());
    } catch (e) { console.error(e); }
  };

  const fetchApplications = async () => {
    try {
      const res = await fetch('/api/admin/applications');
      if (res.ok) setApplications(await res.json());
    } catch (e) { console.error(e); }
  };

  useEffect(() => {
    if (activeTab === 'roles') fetchJobs();
    else fetchApplications();
  }, [activeTab]);

  const handleRoleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/admin/jobs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(roleForm)
      });
      if (res.ok) {
        setIsRoleModalOpen(false);
        setRoleForm({ title: '', location: '', type: 'Full-Time', salaryRange: '', description: '', isActive: true });
        fetchJobs();
      }
    } catch (e) { console.error(e); }
  };

  const deleteRole = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this role?')) return;
    try {
      const res = await fetch(`/api/admin/jobs/${id}`, { method: 'DELETE' });
      if (res.ok) fetchJobs();
    } catch (e) { console.error(e); }
  };

  return (
    <div className="max-w-6xl space-y-8 animate-in fade-in slide-in-from-bottom-4">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-headline font-bold text-slate-800">Job Management</h1>
          <p className="text-slate-500 mt-1">Manage job roles and view incoming applications.</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-4 border-b border-slate-200">
        <button 
          onClick={() => setActiveTab('roles')} 
          className={`pb-4 px-2 text-sm font-bold uppercase tracking-wider border-b-2 transition-colors flex items-center gap-2 ${activeTab === 'roles' ? 'border-[#002451] text-[#002451]' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
        >
          <Briefcase size={18} /> Manage Roles
        </button>
        <button 
          onClick={() => setActiveTab('applications')} 
          className={`pb-4 px-2 text-sm font-bold uppercase tracking-wider border-b-2 transition-colors flex items-center gap-2 ${activeTab === 'applications' ? 'border-[#002451] text-[#002451]' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
        >
          <FileText size={18} /> View Applications
        </button>
      </div>

      {activeTab === 'roles' && (
        <div className="space-y-6">
          <div className="flex justify-end">
            <button 
              onClick={() => setIsRoleModalOpen(true)}
              className="bg-[#002451] text-white px-6 py-2 font-bold uppercase tracking-wider text-sm flex items-center gap-2 rounded shadow-lg hover:-translate-y-0.5 transition-transform"
            >
              <Plus size={18} /> Create New Role
            </button>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 text-sm">
                  <th className="p-4 font-bold">Role Title</th>
                  <th className="p-4 font-bold">Location</th>
                  <th className="p-4 font-bold">Type</th>
                  <th className="p-4 font-bold">Salary</th>
                  <th className="p-4 font-bold text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {jobs.map((job) => (
                  <tr key={job.id} className="border-b border-slate-100 hover:bg-slate-50">
                    <td className="p-4 font-bold text-slate-800">{job.title}</td>
                    <td className="p-4 text-sm text-slate-600">{job.location}</td>
                    <td className="p-4 text-sm text-slate-600">{job.type}</td>
                    <td className="p-4 text-sm text-slate-600">{job.salaryRange || 'N/A'}</td>
                    <td className="p-4 text-right">
                      <button onClick={() => deleteRole(job.id)} className="p-2 rounded text-red-500 hover:bg-red-50 transition-colors">
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
                {jobs.length === 0 && (
                  <tr><td colSpan={5} className="p-8 text-center text-slate-500">No roles found. Create one.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'applications' && (
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 text-sm">
                <th className="p-4 font-bold">Applicant</th>
                <th className="p-4 font-bold">Role</th>
                <th className="p-4 font-bold">Contact</th>
                <th className="p-4 font-bold">Date</th>
                <th className="p-4 font-bold text-center">Resume</th>
              </tr>
            </thead>
            <tbody>
              {applications.map((app) => (
                <tr key={app.id} className="border-b border-slate-100 hover:bg-slate-50">
                  <td className="p-4 font-bold text-slate-800">{app.fullName}</td>
                  <td className="p-4 text-sm text-slate-600">{app.job?.title}</td>
                  <td className="p-4 text-sm text-slate-600">
                    {app.email}<br/>{app.phoneNumber}
                  </td>
                  <td className="p-4 text-sm text-slate-600">{new Date(app.createdAt).toLocaleDateString()}</td>
                  <td className="p-4 text-sm text-center">
                    {app.resumeUrl ? (
                      <a href={app.resumeUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 bg-blue-50 text-blue-600 hover:bg-blue-100 px-3 py-1 rounded font-medium transition-colors">
                        <FileText size={14} /> View
                      </a>
                    ) : (
                      <span className="text-slate-400 text-xs">Not provided</span>
                    )}
                  </td>
                </tr>
              ))}
              {applications.length === 0 && (
                <tr><td colSpan={5} className="p-8 text-center text-slate-500">No applications found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {isRoleModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-slate-900/50 backdrop-blur-sm">
          <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md relative">
            <h3 className="text-2xl font-bold mb-6 text-[#002451]">Create New Role</h3>
            <form onSubmit={handleRoleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Title</label>
                <input required type="text" value={roleForm.title} onChange={e => setRoleForm({...roleForm, title: e.target.value})} className="w-full border-gray-300 rounded-md shadow-sm p-2 border" />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Location</label>
                <input required type="text" value={roleForm.location} onChange={e => setRoleForm({...roleForm, location: e.target.value})} className="w-full border-gray-300 rounded-md shadow-sm p-2 border" />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Type</label>
                <select value={roleForm.type} onChange={e => setRoleForm({...roleForm, type: e.target.value})} className="w-full border-gray-300 rounded-md shadow-sm p-2 border">
                  <option>Full-Time</option>
                  <option>Part-Time</option>
                  <option>Contract</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Salary Range</label>
                <input type="text" value={roleForm.salaryRange} onChange={e => setRoleForm({...roleForm, salaryRange: e.target.value})} className="w-full border-gray-300 rounded-md shadow-sm p-2 border" placeholder="e.g. ₹15,000 - ₹20,000" />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Description</label>
                <textarea required rows={3} value={roleForm.description} onChange={e => setRoleForm({...roleForm, description: e.target.value})} className="w-full border-gray-300 rounded-md shadow-sm p-2 border"></textarea>
              </div>
              <div className="flex gap-4 pt-4">
                <button type="button" onClick={() => setIsRoleModalOpen(false)} className="flex-1 py-2 border border-slate-300 rounded-md text-slate-600 font-bold">Cancel</button>
                <button type="submit" className="flex-1 py-2 bg-[#002451] text-white rounded-md font-bold hover:bg-[#1a3a6b]">Create Role</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobApplications;
