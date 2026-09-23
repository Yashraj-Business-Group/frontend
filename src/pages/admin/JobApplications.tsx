import React, { useState, useEffect, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  Plus, 
  Trash2, 
  Eye, 
  Briefcase, 
  FileText, 
  Search, 
  Mail, 
  Phone, 
  Calendar, 
  X, 
  Building2, 
  ExternalLink,
  AlertCircle 
} from 'lucide-react';
import { supabase } from '../../supabase';
import { sanitizeFields } from '../../utils/sanitizeText';
import { useConfirm } from '../../context/ConfirmContext';
import { isSpamSubmission } from '../../utils/spamFilter';

interface JobApplicationsProps {
  defaultTab?: 'roles' | 'applications';
}

const JobApplications: React.FC<JobApplicationsProps> = ({ defaultTab = 'roles' }) => {
  const confirm = useConfirm();
  const location = useLocation();
  const navigate = useNavigate();

  const isApplicationsRoute = location.pathname.includes('/applications');
  const [activeTab, setActiveTab] = useState<'roles' | 'applications'>(
    isApplicationsRoute ? 'applications' : defaultTab
  );

  useEffect(() => {
    if (location.pathname.includes('/applications')) {
      setActiveTab('applications');
    } else if (location.pathname.includes('/jobs')) {
      setActiveTab('roles');
    }
  }, [location.pathname]);

  const handleTabChange = (tab: 'roles' | 'applications') => {
    setActiveTab(tab);
    if (tab === 'applications') {
      navigate('/admin/applications');
    } else {
      navigate('/admin/jobs');
    }
  };
  
  // Job Postings State
  const [jobs, setJobs] = useState<any[]>([]);
  const [isRoleModalOpen, setIsRoleModalOpen] = useState(false);
  const [roleForm, setRoleForm] = useState({ title: '', location: '', type: 'Full-Time', salaryRange: '', description: '', isActive: true });
  
  // Applications State
  const [applications, setApplications] = useState<any[]>([]);
  const [appSearch, setAppSearch] = useState('');
  const [selectedApp, setSelectedApp] = useState<any | null>(null);
  const [deletingAppId, setDeletingAppId] = useState<string | null>(null);
  const [purgingSpamApps, setPurgingSpamApps] = useState(false);

  const fetchJobs = async () => {
    try {
      const { data, error } = await supabase
        .from('JobPosting')
        .select('*')
        .order('createdAt', { ascending: false });
      if (!error && data) setJobs(data);
    } catch (e) { console.error(e); }
  };

  const fetchApplications = async () => {
    try {
      const { data, error } = await supabase
        .from('JobApplication')
        .select('*, job:JobPosting(title, location)')
        .order('createdAt', { ascending: false });
      if (!error && data) {
        setApplications(data);
        window.dispatchEvent(new CustomEvent('ybg_badge_refresh'));
      }
    } catch (e) { console.error(e); }
  };

  useEffect(() => {
    if (activeTab === 'roles') fetchJobs();
    else fetchApplications();
  }, [activeTab]);

  const handleRoleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { error } = await supabase.from('JobPosting').insert([sanitizeFields(roleForm, 5000)]);
      if (!error) {
        setIsRoleModalOpen(false);
        setRoleForm({ title: '', location: '', type: 'Full-Time', salaryRange: '', description: '', isActive: true });
        fetchJobs();
      }
    } catch (e) { console.error(e); }
  };

  const deleteRole = async (id: string, title?: string) => {
    const ok = await confirm({
      title: 'Delete Job Role',
      message: `Are you sure you want to delete the role ${title ? `"${title}"` : ''}? This role will be removed and will no longer accept incoming candidate applications.`,
      confirmText: 'Delete Role',
      variant: 'danger',
      icon: 'trash',
    });
    if (!ok) return;

    try {
      const { error } = await supabase.from('JobPosting').delete().eq('id', id);
      if (!error) {
        fetchJobs();
      } else {
        await confirm({
          title: 'Error',
          message: 'Failed to delete role: ' + error.message,
          alertOnly: true,
          variant: 'danger',
        });
      }
    } catch (e: any) {
      console.error(e);
    }
  };

  const deleteApplication = async (id: string, name?: string) => {
    const displayName = name ? `"${name}"` : 'this applicant';
    const ok = await confirm({
      title: 'Delete Job Application',
      message: `Are you sure you want to delete the job application from ${displayName}? This action cannot be undone.`,
      confirmText: 'Delete Application',
      variant: 'danger',
      icon: 'trash',
    });
    if (!ok) return;

    setDeletingAppId(id);
    try {
      const { error } = await supabase
        .from('JobApplication')
        .delete()
        .eq('id', id);

      if (!error) {
        setApplications(prev => prev.filter(app => app.id !== id));
        if (selectedApp && selectedApp.id === id) {
          setSelectedApp(null);
        }
        window.dispatchEvent(new CustomEvent('ybg_badge_refresh'));
      } else {
        await confirm({
          title: 'Error',
          message: 'Failed to delete application: ' + error.message,
          alertOnly: true,
          variant: 'danger',
        });
      }
    } catch (e: any) {
      console.error(e);
      await confirm({
        title: 'Error',
        message: 'An unexpected error occurred while deleting the application.',
        alertOnly: true,
        variant: 'danger',
      });
    } finally {
      setDeletingAppId(null);
    }
  };

  // Filter machine-generated spam applications
  const spamApplications = useMemo(() => {
    return applications.filter(a => isSpamSubmission({
      fullName: a.fullName,
      email: a.email,
      phoneNumber: a.phoneNumber
    }).isSpam);
  }, [applications]);

  const handlePurgeSpamApplications = async () => {
    if (spamApplications.length === 0) return;
    const count = spamApplications.length;
    const ok = await confirm({
      title: `Purge ${count} Bot Spam Application${count > 1 ? 's' : ''}?`,
      message: `Detected ${count} machine-generated job applications containing mixed-case gibberish strings and bot patterns. This will permanently delete them while preserving all genuine candidate applications.`,
      confirmText: `Purge ${count} Spam Applications`,
      variant: 'danger',
      icon: 'trash',
    });
    if (!ok) return;

    setPurgingSpamApps(true);
    try {
      const ids = spamApplications.map(a => a.id);
      const { error } = await supabase
        .from('JobApplication')
        .delete()
        .in('id', ids);

      if (!error) {
        setApplications(prev => prev.filter(app => !ids.includes(app.id)));
        if (selectedApp && ids.includes(selectedApp.id)) {
          setSelectedApp(null);
        }
        window.dispatchEvent(new CustomEvent('ybg_badge_refresh'));
      } else {
        await confirm({
          title: 'Error',
          message: 'Failed to purge spam applications: ' + error.message,
          alertOnly: true,
          variant: 'danger',
        });
      }
    } catch (e: any) {
      console.error(e);
    } finally {
      setPurgingSpamApps(false);
    }
  };

  const filteredApplications = useMemo(() => {
    const q = appSearch.toLowerCase().trim();
    if (!q) return applications;
    return applications.filter(app => 
      app.fullName?.toLowerCase().includes(q) ||
      app.email?.toLowerCase().includes(q) ||
      app.phoneNumber?.toLowerCase().includes(q) ||
      app.job?.title?.toLowerCase().includes(q) ||
      app.job?.location?.toLowerCase().includes(q)
    );
  }, [applications, appSearch]);

  return (
    <div className="w-full space-y-6 animate-in fade-in slide-in-from-bottom-4">
      {/* Header */}
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-headline font-bold text-slate-800">
            {activeTab === 'applications' ? 'Job Applications' : 'Job Roles & Recruitment'}
          </h1>
          <p className="text-slate-500 mt-1">
            {activeTab === 'applications' 
              ? 'Review candidate profiles, view uploaded resumes, and manage incoming applications.' 
              : 'Create, update, and manage open job positions displayed on the careers portal.'}
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-4 border-b border-slate-200">
        <button 
          onClick={() => handleTabChange('roles')} 
          className={`pb-4 px-2 text-sm font-bold uppercase tracking-wider border-b-2 transition-colors flex items-center gap-2 ${activeTab === 'roles' ? 'border-[#002451] text-[#002451]' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
        >
          <Briefcase size={18} /> Manage Roles ({jobs.length})
        </button>
        <button 
          onClick={() => handleTabChange('applications')} 
          className={`pb-4 px-2 text-sm font-bold uppercase tracking-wider border-b-2 transition-colors flex items-center gap-2 ${activeTab === 'applications' ? 'border-[#002451] text-[#002451]' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
        >
          <FileText size={18} /> 
          <span>View Applications</span>
          {applications.length > 0 && (
            <span className="bg-blue-600 text-white text-xs px-2 py-0.5 rounded-full font-bold">
              {applications.length}
            </span>
          )}
        </button>
      </div>

      {/* Roles Tab */}
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
            <div className="overflow-x-auto">
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
        </div>
      )}

      {/* Applications Tab */}
      {activeTab === 'applications' && (
        <div className="space-y-4">
          {/* Bot Spam Detected Banner */}
          {spamApplications.length > 0 && (
            <div className="bg-rose-50 border border-rose-200 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-sm animate-in fade-in">
              <div className="flex items-start sm:items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-rose-100 flex items-center justify-center text-rose-600 shrink-0">
                  <AlertCircle size={20} />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-rose-950">
                    {spamApplications.length} Automated Bot Application{spamApplications.length > 1 ? 's' : ''} Detected
                  </h4>
                  <p className="text-xs text-rose-700 mt-0.5">
                    These applications matched machine-generated random alphanumeric strings or bot patterns. Genuine candidate applications are preserved.
                  </p>
                </div>
              </div>
              <button
                onClick={handlePurgeSpamApplications}
                disabled={purgingSpamApps}
                className="inline-flex items-center justify-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 active:scale-95 rounded-lg transition-all shadow-sm shrink-0 disabled:opacity-50"
              >
                <Trash2 size={14} />
                <span>{purgingSpamApps ? 'Purging...' : `Purge All ${spamApplications.length} Spam`}</span>
              </button>
            </div>
          )}

          {/* Search Box */}
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col sm:flex-row gap-3 items-center justify-between">
            <div className="relative w-full sm:max-w-md">
              <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={appSearch}
                onChange={(e) => setAppSearch(e.target.value)}
                placeholder="Search by candidate name, role, email, phone..."
                className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#002451] focus:border-[#002451]"
              />
              {appSearch && (
                <button 
                  onClick={() => setAppSearch('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <X size={16} />
                </button>
              )}
            </div>

            <div className="text-xs text-slate-500 self-end sm:self-auto">
              Showing <strong>{filteredApplications.length}</strong> of <strong>{applications.length}</strong> submitted applications
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[850px]">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 text-sm">
                    <th className="p-4 font-bold">Applicant</th>
                    <th className="p-4 font-bold">Role Applied</th>
                    <th className="p-4 font-bold">Contact Info</th>
                    <th className="p-4 font-bold whitespace-nowrap">Date</th>
                    <th className="p-4 font-bold text-center">Resume</th>
                    <th className="p-4 font-bold text-right whitespace-nowrap">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredApplications.map((app) => {
                    const isNew = (Date.now() - new Date(app.createdAt).getTime()) < 3 * 24 * 60 * 60 * 1000;
                    return (
                      <tr 
                        key={app.id} 
                        className="border-b border-slate-100 hover:bg-slate-50 transition-colors cursor-pointer"
                        onClick={() => setSelectedApp(app)}
                      >
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-slate-800">{app.fullName}</span>
                            {isSpamSubmission({ fullName: app.fullName, email: app.email, phoneNumber: app.phoneNumber }).isSpam ? (
                              <span 
                                className="bg-rose-100 text-rose-700 text-[10px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider border border-rose-200"
                                title="Detected machine-generated random alphanumeric strings or bot patterns"
                              >
                                Bot Spam
                              </span>
                            ) : isNew ? (
                              <span className="bg-blue-100 text-blue-700 text-[10px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider">
                                New
                              </span>
                            ) : null}
                          </div>
                        </td>
                        <td className="p-4 text-sm text-slate-700 font-medium">
                          {app.job?.title || 'Unknown Role'}
                          {app.job?.location && (
                            <span className="text-xs text-slate-400 block font-normal">{app.job.location}</span>
                          )}
                        </td>
                        <td className="p-4 text-sm text-slate-600" onClick={(e) => e.stopPropagation()}>
                          <div className="space-y-0.5 text-xs">
                            <a href={`mailto:${app.email}`} className="text-slate-600 hover:text-primary transition-colors block">
                              {app.email}
                            </a>
                            <a href={`tel:${app.phoneNumber}`} className="text-slate-600 hover:text-primary transition-colors font-mono block">
                              {app.phoneNumber}
                            </a>
                          </div>
                        </td>
                        <td className="p-4 text-sm text-slate-600 whitespace-nowrap">
                          {new Date(app.createdAt).toLocaleDateString(undefined, {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                          })}
                        </td>
                        <td className="p-4 text-sm text-center" onClick={(e) => e.stopPropagation()}>
                          {app.resumeUrl ? (
                            <a 
                              href={app.resumeUrl} 
                              target="_blank" 
                              rel="noopener noreferrer" 
                              className="inline-flex items-center gap-1 bg-blue-50 text-blue-600 hover:bg-blue-100 px-3 py-1 rounded font-medium text-xs transition-colors"
                            >
                              <FileText size={14} /> View Resume
                            </a>
                          ) : (
                            <span className="text-slate-400 text-xs">Not provided</span>
                          )}
                        </td>
                        <td className="p-4 text-right whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                          <div className="flex items-center justify-end gap-1">
                            <button
                              onClick={() => setSelectedApp(app)}
                              title="View Application Details"
                              className="p-1.5 text-slate-500 hover:text-primary hover:bg-slate-100 rounded transition-colors"
                            >
                              <Eye size={17} />
                            </button>
                            <button 
                              onClick={() => deleteApplication(app.id, app.fullName)} 
                              disabled={deletingAppId === app.id}
                              title="Delete Submitted Application"
                              className="p-1.5 rounded text-red-500 hover:bg-red-50 hover:text-red-700 transition-colors disabled:opacity-40"
                            >
                              <Trash2 size={17} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                  {filteredApplications.length === 0 && (
                    <tr>
                      <td colSpan={6} className="p-12 text-center text-slate-500">
                        {appSearch ? 'No applications match your search query.' : 'No applications found.'}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Role Creation Modal */}
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

      {/* Application Details Modal */}
      {selectedApp && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in"
          onClick={() => setSelectedApp(null)}
        >
          <div 
            className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden border border-slate-200 animate-in zoom-in-95 duration-150"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-[#002451] text-white px-6 py-5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                  <Briefcase size={22} className="text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold">Application Details</h3>
                  <p className="text-xs text-white/70">Candidate: {selectedApp.fullName}</p>
                </div>
              </div>
              <button 
                onClick={() => setSelectedApp(null)}
                className="text-white/70 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 flex items-center justify-between text-xs text-slate-500">
                <span className="font-semibold text-slate-700">Applied on</span>
                <span>{new Date(selectedApp.createdAt).toLocaleString()}</span>
              </div>

              {/* Spam Warning if flagged */}
              {isSpamSubmission({ fullName: selectedApp.fullName, email: selectedApp.email, phoneNumber: selectedApp.phoneNumber }).isSpam && (
                <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 flex items-start gap-2.5">
                  <AlertCircle size={16} className="text-rose-600 mt-0.5 shrink-0" />
                  <div className="text-xs text-rose-900">
                    <span className="font-bold">Flagged by Anti-Spam Pattern Filter: </span>
                    {isSpamSubmission({ fullName: selectedApp.fullName, email: selectedApp.email, phoneNumber: selectedApp.phoneNumber }).reason || 'Matched machine-generated mixed-case strings or bot patterns.'}
                  </div>
                </div>
              )}

              <div className="space-y-3">
                <div>
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Candidate Name</label>
                  <div className="text-base font-bold text-slate-900 mt-0.5">{selectedApp.fullName}</div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Target Role</label>
                  <div className="text-sm font-semibold text-primary mt-0.5">
                    {selectedApp.job?.title || 'Unknown Role'}
                    {selectedApp.job?.location && ` • ${selectedApp.job.location}`}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Email</label>
                    <a href={`mailto:${selectedApp.email}`} className="text-xs text-primary font-semibold hover:underline flex items-center gap-1.5 mt-1">
                      <Mail size={13} />
                      <span className="truncate">{selectedApp.email}</span>
                    </a>
                  </div>

                  <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Phone</label>
                    <a href={`tel:${selectedApp.phoneNumber}`} className="text-xs text-primary font-semibold hover:underline flex items-center gap-1.5 mt-1 font-mono">
                      <Phone size={13} />
                      <span>{selectedApp.phoneNumber}</span>
                    </a>
                  </div>
                </div>

                {selectedApp.resumeUrl && (
                  <div className="pt-2">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1.5">Submitted Resume</label>
                    <a
                      href={selectedApp.resumeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-3 rounded-lg border border-blue-200 bg-blue-50 text-blue-800 hover:bg-blue-100 transition-colors text-sm font-medium"
                    >
                      <span className="flex items-center gap-2">
                        <FileText size={18} className="text-blue-600" />
                        <span>Open Candidate Resume Document</span>
                      </span>
                      <ExternalLink size={16} />
                    </a>
                  </div>
                )}
              </div>
            </div>

            <div className="bg-slate-50 px-6 py-4 border-t border-slate-200 flex items-center justify-between">
              <button
                onClick={() => deleteApplication(selectedApp.id, selectedApp.fullName)}
                disabled={deletingAppId === selectedApp.id}
                className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
              >
                <Trash2 size={15} />
                <span>Delete Application</span>
              </button>

              <button
                onClick={() => setSelectedApp(null)}
                className="px-4 py-2 text-xs font-bold text-slate-700 bg-slate-200 hover:bg-slate-300 rounded-lg transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobApplications;
