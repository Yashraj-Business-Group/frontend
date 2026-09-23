import React, { useState, useEffect, useMemo } from 'react';
import { 
  ShieldCheck, 
  Search, 
  RefreshCw, 
  Eye, 
  Trash2, 
  Mail, 
  Phone, 
  Building2, 
  Calendar, 
  X, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  XCircle,
  FileSpreadsheet
} from 'lucide-react';
import { supabase } from '../../supabase';
import { useConfirm } from '../../context/ConfirmContext';
import { isSpamSubmission } from '../../utils/spamFilter';

type ServiceRequestItem = {
  id: string;
  fullName: string;
  companyName?: string;
  email: string;
  phoneNumber: string;
  serviceRequired: string;
  additionalReqs?: string;
  status: string;
  createdAt: string;
};

const STATUS_OPTIONS = ['Pending', 'In Review', 'Completed', 'Rejected'] as const;

const ServiceRequests: React.FC = () => {
  const confirm = useConfirm();
  const [requests, setRequests] = useState<ServiceRequestItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [serviceFilter, setServiceFilter] = useState<string>('all');
  const [selectedRequest, setSelectedRequest] = useState<ServiceRequestItem | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [purgingSpam, setPurgingSpam] = useState(false);
  const [messageToast, setMessageToast] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const showToast = (text: string, type: 'success' | 'error' = 'success') => {
    setMessageToast({ text, type });
    setTimeout(() => setMessageToast(null), 3500);
  };

  const fetchRequests = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('ServiceRequest')
        .select('*')
        .order('createdAt', { ascending: false });

      if (error) {
        console.error('Error fetching requests:', error);
        showToast('Failed to load requests: ' + error.message, 'error');
      } else {
        setRequests(data || []);
        window.dispatchEvent(new CustomEvent('ybg_badge_refresh'));
      }
    } catch (err: any) {
      console.error(err);
      showToast('An unexpected error occurred while loading requests.', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  // Update status in Supabase
  const handleUpdateStatus = async (id: string, newStatus: string) => {
    setUpdatingId(id);
    try {
      const { error } = await supabase
        .from('ServiceRequest')
        .update({ status: newStatus })
        .eq('id', id);

      if (error) {
        showToast('Failed to update status: ' + error.message, 'error');
      } else {
        setRequests(prev => prev.map(r => r.id === id ? { ...r, status: newStatus } : r));
        if (selectedRequest && selectedRequest.id === id) {
          setSelectedRequest(prev => prev ? { ...prev, status: newStatus } : null);
        }
        showToast(`Status updated to "${newStatus}"`);
        window.dispatchEvent(new CustomEvent('ybg_badge_refresh'));
      }
    } catch (err: any) {
      showToast('Error updating status.', 'error');
    } finally {
      setUpdatingId(null);
    }
  };

  // Delete request
  const handleDeleteRequest = async (id: string, clientName?: string) => {
    const ok = await confirm({
      title: 'Delete Service Request',
      message: `Are you sure you want to delete the service request from ${clientName ? `"${clientName}"` : 'this client'}? All inquiry details will be permanently removed.`,
      confirmText: 'Delete Request',
      variant: 'danger',
      icon: 'trash',
    });
    if (!ok) return;

    setDeletingId(id);
    try {
      const { error } = await supabase
        .from('ServiceRequest')
        .delete()
        .eq('id', id);

      if (error) {
        showToast('Failed to delete request: ' + error.message, 'error');
      } else {
        setRequests(prev => prev.filter(r => r.id !== id));
        if (selectedRequest && selectedRequest.id === id) {
          setSelectedRequest(null);
        }
        showToast('Service request deleted successfully');
        window.dispatchEvent(new CustomEvent('ybg_badge_refresh'));
      }
    } catch (err: any) {
      showToast('Error deleting request.', 'error');
    } finally {
      setDeletingId(null);
    }
  };

  // Compute detected bot spam submissions (e.g. random mixed-case strings, bot emails)
  const spamRequests = useMemo(() => {
    return requests.filter(r => isSpamSubmission({
      fullName: r.fullName,
      companyName: r.companyName,
      email: r.email,
      phoneNumber: r.phoneNumber,
      additionalReqs: r.additionalReqs
    }).isSpam);
  }, [requests]);

  // Purge all detected bot spam entries in one click
  const handlePurgeSpam = async () => {
    if (spamRequests.length === 0) return;
    const count = spamRequests.length;
    const ok = await confirm({
      title: `Purge ${count} Bot Spam Request${count > 1 ? 's' : ''}?`,
      message: `Detected ${count} machine-generated spam entry(ies) containing mixed-case gibberish strings and bot patterns. This will permanently delete them while keeping all genuine client inquiries intact.`,
      confirmText: `Purge ${count} Spam Entries`,
      variant: 'danger',
      icon: 'trash',
    });
    if (!ok) return;

    setPurgingSpam(true);
    try {
      const ids = spamRequests.map(r => r.id);
      const { error } = await supabase
        .from('ServiceRequest')
        .delete()
        .in('id', ids);

      if (error) {
        showToast('Failed to purge spam: ' + error.message, 'error');
      } else {
        setRequests(prev => prev.filter(r => !ids.includes(r.id)));
        if (selectedRequest && ids.includes(selectedRequest.id)) {
          setSelectedRequest(null);
        }
        showToast(`Successfully purged ${ids.length} bot spam entries!`);
        window.dispatchEvent(new CustomEvent('ybg_badge_refresh'));
      }
    } catch (err: any) {
      showToast('Error purging spam: ' + err.message, 'error');
    } finally {
      setPurgingSpam(false);
    }
  };

  // Filter unique service names for dropdown
  const uniqueServices = useMemo(() => {
    const set = new Set<string>();
    requests.forEach(r => {
      if (r.serviceRequired) set.add(r.serviceRequired);
    });
    return Array.from(set).sort();
  }, [requests]);

  // Filter requests
  const filteredRequests = useMemo(() => {
    return requests.filter(req => {
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch = !query || (
        req.fullName?.toLowerCase().includes(query) ||
        req.companyName?.toLowerCase().includes(query) ||
        req.email?.toLowerCase().includes(query) ||
        req.phoneNumber?.toLowerCase().includes(query) ||
        req.serviceRequired?.toLowerCase().includes(query) ||
        req.additionalReqs?.toLowerCase().includes(query)
      );

      const matchesStatus = statusFilter === 'all' || 
        req.status?.toLowerCase() === statusFilter.toLowerCase();

      const matchesService = serviceFilter === 'all' || 
        req.serviceRequired === serviceFilter;

      return matchesSearch && matchesStatus && matchesService;
    });
  }, [requests, searchQuery, statusFilter, serviceFilter]);

  // Metrics
  const stats = useMemo(() => {
    const total = requests.length;
    const pending = requests.filter(r => (r.status || '').toLowerCase() === 'pending').length;
    const inReview = requests.filter(r => ['in review', 'reviewed'].includes((r.status || '').toLowerCase())).length;
    const completed = requests.filter(r => (r.status || '').toLowerCase() === 'completed').length;
    return { total, pending, inReview, completed };
  }, [requests]);

  // Export to CSV
  const handleExportCSV = () => {
    if (filteredRequests.length === 0) {
      showToast('No requests available to export.', 'error');
      return;
    }

    const headers = ['ID', 'Date', 'Full Name', 'Company Name', 'Email', 'Phone', 'Service', 'Status', 'Additional Requirements'];
    const rows = filteredRequests.map(r => [
      `"${r.id}"`,
      `"${new Date(r.createdAt).toISOString()}"`,
      `"${(r.fullName || '').replace(/"/g, '""')}"`,
      `"${(r.companyName || '').replace(/"/g, '""')}"`,
      `"${(r.email || '').replace(/"/g, '""')}"`,
      `"${(r.phoneNumber || '').replace(/"/g, '""')}"`,
      `"${(r.serviceRequired || '').replace(/"/g, '""')}"`,
      `"${(r.status || '').replace(/"/g, '""')}"`,
      `"${(r.additionalReqs || '').replace(/"/g, '""')}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `service_requests_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Exported requests to CSV');
  };

  const getStatusBadge = (status: string) => {
    const s = (status || 'pending').toLowerCase();
    if (s === 'pending') {
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-50 text-amber-700 border border-amber-200">
          <Clock size={12} className="text-amber-500" />
          Pending
        </span>
      );
    }
    if (s === 'in review' || s === 'reviewed') {
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-blue-50 text-blue-700 border border-blue-200">
          <AlertCircle size={12} className="text-blue-500" />
          In Review
        </span>
      );
    }
    if (s === 'completed') {
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-200">
          <CheckCircle2 size={12} className="text-emerald-500" />
          Completed
        </span>
      );
    }
    if (s === 'rejected' || s === 'cancelled') {
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-rose-700 border border-rose-200">
          <XCircle size={12} className="text-rose-500" />
          Rejected
        </span>
      );
    }
    return (
      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-slate-100 text-slate-700 border border-slate-200">
        {status}
      </span>
    );
  };

  return (
    <div className="w-full space-y-6 animate-in fade-in slide-in-from-bottom-4">
      {/* Toast Notification */}
      {messageToast && (
        <div className={`fixed bottom-6 right-6 z-50 px-4 py-3 rounded-lg shadow-xl text-sm font-medium flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2 ${
          messageToast.type === 'error' ? 'bg-rose-600 text-white' : 'bg-slate-900 text-white'
        }`}>
          {messageToast.type === 'error' ? <AlertCircle size={16} /> : <CheckCircle2 size={16} className="text-emerald-400" />}
          <span>{messageToast.text}</span>
        </div>
      )}

      {/* Header with Title and Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-200 pb-5">
        <div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#002451] flex items-center justify-center text-white shadow-sm">
              <ShieldCheck size={22} />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-headline font-bold text-slate-900">All Service Requests</h1>
              <p className="text-slate-500 text-sm mt-0.5">Manage, review, and respond to quotation inquiries and service orders.</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 self-stretch sm:self-auto">
          {spamRequests.length > 0 && (
            <button
              onClick={handlePurgeSpam}
              disabled={purgingSpam || loading}
              title={`Purge all ${spamRequests.length} bot spam submissions`}
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-3.5 py-2 text-sm font-semibold rounded-lg bg-rose-50 text-rose-700 border border-rose-200 hover:bg-rose-100 hover:text-rose-800 transition-colors shadow-sm disabled:opacity-50"
            >
              <Trash2 size={16} className="text-rose-600" />
              <span>Purge Spam ({spamRequests.length})</span>
            </button>
          )}

          <button
            onClick={handleExportCSV}
            title="Export filtered requests to CSV"
            className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-semibold rounded-lg border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 transition-colors shadow-sm"
          >
            <FileSpreadsheet size={16} className="text-emerald-600" />
            <span>Export CSV</span>
          </button>
          
          <button
            onClick={fetchRequests}
            disabled={loading}
            className="inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-semibold rounded-lg bg-[#002451] text-white hover:bg-[#001b3d] transition-colors shadow-sm disabled:opacity-50"
          >
            <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
            <span>Refresh</span>
          </button>
        </div>
      </div>

      {/* Bot Spam Detected Banner */}
      {spamRequests.length > 0 && (
        <div className="bg-rose-50 border border-rose-200 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-sm animate-in fade-in">
          <div className="flex items-start sm:items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-rose-100 flex items-center justify-center text-rose-600 shrink-0">
              <AlertCircle size={20} />
            </div>
            <div>
              <h4 className="text-sm font-bold text-rose-950">
                {spamRequests.length} Automated Bot Spam Submission{spamRequests.length > 1 ? 's' : ''} Detected
              </h4>
              <p className="text-xs text-rose-700 mt-0.5">
                These submissions matched machine-generated random mixed-case strings (e.g. bhNaZkAx...) or bot email patterns. Genuine customer inquiries are preserved.
              </p>
            </div>
          </div>
          <button
            onClick={handlePurgeSpam}
            disabled={purgingSpam}
            className="inline-flex items-center justify-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 active:scale-95 rounded-lg transition-all shadow-sm shrink-0 disabled:opacity-50"
          >
            <Trash2 size={14} />
            <span>{purgingSpam ? 'Purging...' : `Purge All ${spamRequests.length} Spam`}</span>
          </button>
        </div>
      )}

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div 
          onClick={() => setStatusFilter('all')}
          className={`cursor-pointer p-4 rounded-xl border bg-white shadow-sm transition-all hover:border-slate-400 ${statusFilter === 'all' ? 'ring-2 ring-[#002451] border-[#002451]' : 'border-slate-200'}`}
        >
          <div className="text-xs font-bold uppercase tracking-wider text-slate-500">Total Requests</div>
          <div className="text-2xl font-black text-slate-900 mt-1">{stats.total}</div>
          <div className="text-xs text-slate-400 mt-1">All incoming inquiries</div>
        </div>

        <div 
          onClick={() => setStatusFilter('pending')}
          className={`cursor-pointer p-4 rounded-xl border bg-white shadow-sm transition-all hover:border-amber-400 ${statusFilter.toLowerCase() === 'pending' ? 'ring-2 ring-amber-500 border-amber-500' : 'border-slate-200'}`}
        >
          <div className="text-xs font-bold uppercase tracking-wider text-amber-700">Pending Action</div>
          <div className="text-2xl font-black text-amber-600 mt-1">{stats.pending}</div>
          <div className="text-xs text-slate-400 mt-1">Awaiting review / contact</div>
        </div>

        <div 
          onClick={() => setStatusFilter('in review')}
          className={`cursor-pointer p-4 rounded-xl border bg-white shadow-sm transition-all hover:border-blue-400 ${statusFilter.toLowerCase() === 'in review' ? 'ring-2 ring-blue-500 border-blue-500' : 'border-slate-200'}`}
        >
          <div className="text-xs font-bold uppercase tracking-wider text-blue-700">In Review</div>
          <div className="text-2xl font-black text-blue-600 mt-1">{stats.inReview}</div>
          <div className="text-xs text-slate-400 mt-1">Active discussions</div>
        </div>

        <div 
          onClick={() => setStatusFilter('completed')}
          className={`cursor-pointer p-4 rounded-xl border bg-white shadow-sm transition-all hover:border-emerald-400 ${statusFilter.toLowerCase() === 'completed' ? 'ring-2 ring-emerald-500 border-emerald-500' : 'border-slate-200'}`}
        >
          <div className="text-xs font-bold uppercase tracking-wider text-emerald-700">Completed</div>
          <div className="text-2xl font-black text-emerald-600 mt-1">{stats.completed}</div>
          <div className="text-xs text-slate-400 mt-1">Resolved & fulfilled</div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-3">
        <div className="flex flex-col md:flex-row gap-3">
          {/* Search Box */}
          <div className="relative flex-1">
            <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by client name, company, email, phone, or requirements..."
              className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#002451] focus:border-[#002451]"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X size={16} />
              </button>
            )}
          </div>

          {/* Status Dropdown */}
          <div className="w-full md:w-48">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full py-2 px-3 border border-slate-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#002451] focus:border-[#002451]"
            >
              <option value="all">All Statuses ({stats.total})</option>
              <option value="pending">Pending ({stats.pending})</option>
              <option value="in review">In Review ({stats.inReview})</option>
              <option value="completed">Completed ({stats.completed})</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>

          {/* Service Filter */}
          <div className="w-full md:w-56">
            <select
              value={serviceFilter}
              onChange={(e) => setServiceFilter(e.target.value)}
              className="w-full py-2 px-3 border border-slate-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#002451] focus:border-[#002451]"
            >
              <option value="all">All Service Types</option>
              {uniqueServices.map(srv => (
                <option key={srv} value={srv}>{srv}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Active Filter Chips */}
        {(searchQuery || statusFilter !== 'all' || serviceFilter !== 'all') && (
          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100 text-xs">
            <span className="text-slate-500 font-medium">Active filters:</span>
            {searchQuery && (
              <span className="inline-flex items-center gap-1 bg-slate-100 text-slate-700 px-2 py-1 rounded">
                Search: "{searchQuery}"
                <button onClick={() => setSearchQuery('')} className="hover:text-red-500"><X size={12} /></button>
              </span>
            )}
            {statusFilter !== 'all' && (
              <span className="inline-flex items-center gap-1 bg-slate-100 text-slate-700 px-2 py-1 rounded capitalize">
                Status: {statusFilter}
                <button onClick={() => setStatusFilter('all')} className="hover:text-red-500"><X size={12} /></button>
              </span>
            )}
            {serviceFilter !== 'all' && (
              <span className="inline-flex items-center gap-1 bg-slate-100 text-slate-700 px-2 py-1 rounded">
                Service: {serviceFilter}
                <button onClick={() => setServiceFilter('all')} className="hover:text-red-500"><X size={12} /></button>
              </span>
            )}
            <button
              onClick={() => {
                setSearchQuery('');
                setStatusFilter('all');
                setServiceFilter('all');
              }}
              className="text-primary hover:underline font-semibold ml-2"
            >
              Reset all
            </button>
            <span className="ml-auto text-slate-500">
              Showing {filteredRequests.length} of {requests.length} requests
            </span>
          </div>
        )}
      </div>

      {/* Main Full-Width Table Card */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden w-full">
        {loading ? (
          <div className="p-16 flex flex-col items-center justify-center text-slate-500 gap-3">
            <RefreshCw size={28} className="animate-spin text-primary" />
            <span className="font-medium text-sm">Loading all service requests...</span>
          </div>
        ) : (
          <div className="overflow-x-auto w-full">
            <table className="w-full text-left border-collapse min-w-[950px]">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-700 text-xs uppercase font-bold tracking-wider">
                  <th className="py-4 px-6">Client / Company</th>
                  <th className="py-4 px-6">Service Required</th>
                  <th className="py-4 px-6">Contact Info</th>
                  <th className="py-4 px-6">Requirements</th>
                  <th className="py-4 px-6 whitespace-nowrap">Date</th>
                  <th className="py-4 px-6 whitespace-nowrap">Status</th>
                  <th className="py-4 px-6 text-right whitespace-nowrap">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                {filteredRequests.map((req) => (
                  <tr 
                    key={req.id} 
                    className="hover:bg-slate-50/80 transition-colors group cursor-pointer"
                    onClick={() => setSelectedRequest(req)}
                  >
                    {/* Client & Company */}
                    <td className="py-4 px-6">
                      <div className="flex items-start gap-3">
                        <div className="w-9 h-9 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center font-bold text-slate-700 shrink-0 text-xs">
                          {(req.fullName || 'C').charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <strong className="text-slate-900 block font-semibold leading-tight group-hover:text-primary transition-colors">
                              {req.fullName || 'Unnamed Client'}
                            </strong>
                            {isSpamSubmission({
                              fullName: req.fullName,
                              companyName: req.companyName,
                              email: req.email,
                              phoneNumber: req.phoneNumber,
                              additionalReqs: req.additionalReqs
                            }).isSpam && (
                              <span 
                                className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold bg-rose-100 text-rose-700 border border-rose-200 shrink-0" 
                                title="Detected machine-generated random alphanumeric strings or bot patterns"
                              >
                                Bot Spam
                              </span>
                            )}
                          </div>
                          <span className="text-xs text-slate-500 inline-flex items-center gap-1 mt-0.5">
                            <Building2 size={12} className="text-slate-400" />
                            {req.companyName || 'Individual / None'}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Service */}
                    <td className="py-4 px-6">
                      <span className="inline-block bg-slate-100 text-slate-800 font-semibold px-2.5 py-1 rounded text-xs border border-slate-200">
                        {req.serviceRequired || 'General Inquiry'}
                      </span>
                    </td>

                    {/* Contact Info */}
                    <td className="py-4 px-6" onClick={(e) => e.stopPropagation()}>
                      <div className="space-y-1 text-xs">
                        <a 
                          href={`mailto:${req.email}`} 
                          className="inline-flex items-center gap-1.5 text-slate-600 hover:text-primary transition-colors"
                          title="Send Email"
                        >
                          <Mail size={13} className="text-slate-400" />
                          <span className="truncate max-w-[180px]">{req.email || 'N/A'}</span>
                        </a>
                        <br />
                        <a 
                          href={`tel:${req.phoneNumber}`} 
                          className="inline-flex items-center gap-1.5 text-slate-600 hover:text-primary transition-colors font-mono"
                          title="Call Client"
                        >
                          <Phone size={13} className="text-slate-400" />
                          <span>{req.phoneNumber || 'N/A'}</span>
                        </a>
                      </div>
                    </td>

                    {/* Additional Requirements */}
                    <td className="py-4 px-6">
                      <p 
                        className="text-xs text-slate-600 max-w-xs line-clamp-2"
                        title={req.additionalReqs || 'No additional notes'}
                      >
                        {req.additionalReqs || <span className="text-slate-400 italic">None provided</span>}
                      </p>
                    </td>

                    {/* Date */}
                    <td className="py-4 px-6 whitespace-nowrap text-xs text-slate-600">
                      <div className="flex items-center gap-1.5">
                        <Calendar size={13} className="text-slate-400" />
                        <span>{new Date(req.createdAt).toLocaleDateString(undefined, {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })}</span>
                      </div>
                    </td>

                    {/* Status with Quick Update Dropdown */}
                    <td className="py-4 px-6 whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                      <div className="inline-flex items-center gap-1.5">
                        <select
                          value={req.status || 'Pending'}
                          disabled={updatingId === req.id}
                          onChange={(e) => handleUpdateStatus(req.id, e.target.value)}
                          className="text-xs font-semibold rounded-lg px-2.5 py-1 border border-slate-200 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-[#002451] cursor-pointer"
                        >
                          {STATUS_OPTIONS.map(opt => (
                            <option key={opt} value={opt}>{opt}</option>
                          ))}
                        </select>
                        {getStatusBadge(req.status)}
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="py-4 px-6 text-right whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => setSelectedRequest(req)}
                          title="View Full Details"
                          className="p-1.5 text-slate-600 hover:text-primary hover:bg-slate-100 rounded-md transition-colors"
                        >
                          <Eye size={17} />
                        </button>
                        <button
                          onClick={() => handleDeleteRequest(req.id)}
                          disabled={deletingId === req.id}
                          title="Delete Request"
                          className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-md transition-colors disabled:opacity-40"
                        >
                          <Trash2 size={17} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}

                {filteredRequests.length === 0 && (
                  <tr>
                    <td colSpan={7} className="py-16 text-center text-slate-500">
                      <div className="flex flex-col items-center justify-center gap-2">
                        <ShieldCheck size={36} className="text-slate-300" />
                        <span className="font-semibold text-base text-slate-700">No service requests match your filter.</span>
                        <p className="text-xs text-slate-400">Try changing your search keywords or resetting filters.</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* Footer info bar */}
        {!loading && filteredRequests.length > 0 && (
          <div className="bg-slate-50/75 border-t border-slate-200 px-6 py-3 flex items-center justify-between text-xs text-slate-500">
            <span>Showing <strong className="text-slate-800">{filteredRequests.length}</strong> of <strong className="text-slate-800">{requests.length}</strong> service requests</span>
            <span>Click any row to open the complete request dossier</span>
          </div>
        )}
      </div>

      {/* Request Details Modal */}
      {selectedRequest && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in"
          onClick={() => setSelectedRequest(null)}
        >
          <div 
            className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden border border-slate-200 animate-in zoom-in-95 duration-150"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="bg-[#002451] text-white px-6 py-5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                  <ShieldCheck size={22} className="text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold">Service Request Details</h3>
                  <p className="text-xs text-white/70">ID: {selectedRequest.id}</p>
                </div>
              </div>
              <button 
                onClick={() => setSelectedRequest(null)}
                className="text-white/70 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
              {/* Status and Date Banner */}
              <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Current Status:</span>
                  {getStatusBadge(selectedRequest.status)}
                </div>
                <div className="flex items-center gap-1.5 text-xs text-slate-500">
                  <Calendar size={14} className="text-slate-400" />
                  <span>Submitted: {new Date(selectedRequest.createdAt).toLocaleString()}</span>
                </div>
              </div>

              {/* Spam Warning Banner if flagged */}
              {isSpamSubmission({
                fullName: selectedRequest.fullName,
                companyName: selectedRequest.companyName,
                email: selectedRequest.email,
                phoneNumber: selectedRequest.phoneNumber,
                additionalReqs: selectedRequest.additionalReqs
              }).isSpam && (
                <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 flex items-start gap-2.5">
                  <AlertCircle size={16} className="text-rose-600 mt-0.5 shrink-0" />
                  <div className="text-xs text-rose-900">
                    <span className="font-bold">Flagged by Anti-Spam Pattern Filter: </span>
                    {isSpamSubmission({
                      fullName: selectedRequest.fullName,
                      companyName: selectedRequest.companyName,
                      email: selectedRequest.email,
                      phoneNumber: selectedRequest.phoneNumber,
                      additionalReqs: selectedRequest.additionalReqs
                    }).reason || 'Matched machine-generated mixed-case strings or bot patterns.'}
                  </div>
                </div>
              )}

              {/* Client & Service Info Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl border border-slate-100 bg-slate-50/50 space-y-1">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Client Name</span>
                  <div className="text-base font-bold text-slate-900">{selectedRequest.fullName || 'N/A'}</div>
                </div>

                <div className="p-4 rounded-xl border border-slate-100 bg-slate-50/50 space-y-1">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Company / Organization</span>
                  <div className="text-base font-bold text-slate-900">{selectedRequest.companyName || 'None / Individual'}</div>
                </div>

                <div className="p-4 rounded-xl border border-slate-100 bg-slate-50/50 space-y-1">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Email Address</span>
                  <div className="text-sm font-semibold text-slate-900 break-all">
                    <a href={`mailto:${selectedRequest.email}`} className="text-primary hover:underline flex items-center gap-1.5 mt-0.5">
                      <Mail size={14} />
                      {selectedRequest.email}
                    </a>
                  </div>
                </div>

                <div className="p-4 rounded-xl border border-slate-100 bg-slate-50/50 space-y-1">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Phone Number</span>
                  <div className="text-sm font-semibold text-slate-900">
                    <a href={`tel:${selectedRequest.phoneNumber}`} className="text-primary hover:underline flex items-center gap-1.5 mt-0.5">
                      <Phone size={14} />
                      {selectedRequest.phoneNumber}
                    </a>
                  </div>
                </div>
              </div>

              {/* Service Required */}
              <div className="p-4 rounded-xl border border-blue-100 bg-blue-50/40 space-y-1">
                <span className="text-xs font-bold text-blue-900 uppercase tracking-wider">Service Requested</span>
                <div className="text-base font-bold text-[#002451]">{selectedRequest.serviceRequired}</div>
              </div>

              {/* Additional Requirements / Client Message */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Additional Requirements & Client Message
                </span>
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-800 leading-relaxed whitespace-pre-wrap min-h-[90px]">
                  {selectedRequest.additionalReqs ? selectedRequest.additionalReqs : (
                    <span className="text-slate-400 italic">No additional notes or specifications provided by client.</span>
                  )}
                </div>
              </div>

              {/* Quick Status Update Selector in Modal */}
              <div className="space-y-2 pt-2 border-t border-slate-100">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Update Request Status</span>
                <div className="flex flex-wrap gap-2">
                  {STATUS_OPTIONS.map((st) => (
                    <button
                      key={st}
                      disabled={updatingId === selectedRequest.id}
                      onClick={() => handleUpdateStatus(selectedRequest.id, st)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${
                        selectedRequest.status?.toLowerCase() === st.toLowerCase()
                          ? 'bg-[#002451] text-white shadow-sm ring-2 ring-[#002451]/20'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="bg-slate-50 px-6 py-4 border-t border-slate-200 flex items-center justify-between">
              <button
                onClick={() => handleDeleteRequest(selectedRequest.id)}
                disabled={deletingId === selectedRequest.id}
                className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
              >
                <Trash2 size={15} />
                <span>Delete Request</span>
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setSelectedRequest(null)}
                  className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-200 rounded-lg transition-colors"
                >
                  Close
                </button>
                <a
                  href={`mailto:${selectedRequest.email}?subject=Regarding Your Service Request - ${selectedRequest.serviceRequired}`}
                  className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-[#002451] hover:bg-[#001b3d] rounded-lg shadow-sm transition-colors"
                >
                  <Mail size={14} />
                  <span>Reply via Email</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ServiceRequests;
