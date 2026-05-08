import React, { useState, useEffect } from 'react';

const ServiceRequests = () => {
  const [requests, setRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/admin/requests')
      .then(res => res.json())
      .then(data => {
        setRequests(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="max-w-6xl space-y-8 animate-in fade-in slide-in-from-bottom-4">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-headline font-bold text-slate-800">Service Requests</h1>
          <p className="text-slate-500 mt-1">View all incoming service quotations and requests from clients.</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-slate-500">Loading requests...</div>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 text-sm">
                <th className="p-4 font-bold">Client / Company</th>
                <th className="p-4 font-bold">Service Required</th>
                <th className="p-4 font-bold">Contact Info</th>
                <th className="p-4 font-bold">Additional Reqs</th>
                <th className="p-4 font-bold">Date</th>
                <th className="p-4 font-bold">Status</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((req) => (
                <tr key={req.id} className="border-b border-slate-100 hover:bg-slate-50">
                  <td className="p-4 text-sm">
                    <strong className="text-slate-800 block">{req.fullName}</strong>
                    <span className="text-slate-500">{req.companyName || 'N/A'}</span>
                  </td>
                  <td className="p-4 font-bold text-primary">{req.serviceRequired}</td>
                  <td className="p-4 text-sm text-slate-600">
                    {req.email}<br />{req.phoneNumber}
                  </td>
                  <td className="p-4 text-sm text-slate-600 max-w-xs truncate" title={req.additionalReqs}>
                    {req.additionalReqs || 'None'}
                  </td>
                  <td className="p-4 text-sm text-slate-600">{new Date(req.createdAt).toLocaleDateString()}</td>
                  <td className="p-4 text-sm">
                    <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs font-bold uppercase tracking-wider">
                      {req.status}
                    </span>
                  </td>
                </tr>
              ))}
              {requests.length === 0 && (
                <tr><td colSpan={6} className="p-8 text-center text-slate-500">No service requests found.</td></tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default ServiceRequests;
