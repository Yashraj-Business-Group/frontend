import React from 'react';
import { ShieldCheck, Briefcase, TrendingUp, Users } from 'lucide-react';

const AdminDashboard = () => {
  // Mock Data
  const recentServiceRequests = [
    { id: 'REQ-001', client: 'Reliance Industries', service: 'Security Services', date: '2024-05-12', status: 'Pending' },
    { id: 'REQ-002', client: 'Tech Mahindra', service: 'Facility Management', date: '2024-05-11', status: 'Reviewed' },
    { id: 'REQ-003', client: 'HDFC Bank', service: 'Housekeeping', date: '2024-05-10', status: 'Contacted' },
    { id: 'REQ-004', client: 'L&T Construction', service: 'Manpower Supply', date: '2024-05-09', status: 'Pending' },
  ];

  const recentJobApplications = [
    { id: 'APP-101', name: 'Ramesh Singh', role: 'Senior Security Guard', location: 'Mumbai', date: '2024-05-12', status: 'Under Review' },
    { id: 'APP-102', name: 'Suresh Patil', role: 'Facility Manager', location: 'Pune', date: '2024-05-11', status: 'Interview Scheduled' },
    { id: 'APP-103', name: 'Amit Sharma', role: 'Housekeeping Staff', location: 'Delhi', date: '2024-05-11', status: 'Under Review' },
    { id: 'APP-104', name: 'Vikram Desai', role: 'Head Guard', location: 'Bangalore', date: '2024-05-10', status: 'Rejected' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-headline font-bold text-slate-800">Dashboard Overview</h1>
        <p className="text-slate-500 mt-1">Welcome back, here's what's happening today.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border-t-4 border-blue-500 flex items-center justify-between">
          <div>
            <p className="text-sm font-bold text-slate-500 uppercase tracking-wider">New Requests</p>
            <h3 className="text-3xl font-black text-slate-800 mt-2">24</h3>
          </div>
          <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center text-blue-500">
            <ShieldCheck size={24} />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border-t-4 border-green-500 flex items-center justify-between">
          <div>
            <p className="text-sm font-bold text-slate-500 uppercase tracking-wider">Job Applications</p>
            <h3 className="text-3xl font-black text-slate-800 mt-2">156</h3>
          </div>
          <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center text-green-500">
            <Briefcase size={24} />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border-t-4 border-purple-500 flex items-center justify-between">
          <div>
            <p className="text-sm font-bold text-slate-500 uppercase tracking-wider">Active Clients</p>
            <h3 className="text-3xl font-black text-slate-800 mt-2">700+</h3>
          </div>
          <div className="w-12 h-12 bg-purple-50 rounded-full flex items-center justify-center text-purple-500">
            <TrendingUp size={24} />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border-t-4 border-orange-500 flex items-center justify-between">
          <div>
            <p className="text-sm font-bold text-slate-500 uppercase tracking-wider">Total Staff</p>
            <h3 className="text-3xl font-black text-slate-800 mt-2">2,450</h3>
          </div>
          <div className="w-12 h-12 bg-orange-50 rounded-full flex items-center justify-center text-orange-500">
            <Users size={24} />
          </div>
        </div>
      </div>

      {/* Main Tables Area */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Service Requests Table */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
            <h2 className="font-headline font-bold text-lg text-slate-800">Recent Service Requests</h2>
            <button className="text-sm text-primary font-bold hover:underline">View All</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-600">
              <thead className="bg-slate-50 text-slate-500 text-xs uppercase font-bold tracking-wider">
                <tr>
                  <th className="px-6 py-3">Client / Company</th>
                  <th className="px-6 py-3">Service Required</th>
                  <th className="px-6 py-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {recentServiceRequests.map((req) => (
                  <tr key={req.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 font-medium text-slate-800">{req.client}</td>
                    <td className="px-6 py-4">{req.service}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                        req.status === 'Pending' ? 'bg-orange-100 text-orange-700' : 
                        req.status === 'Reviewed' ? 'bg-blue-100 text-blue-700' : 
                        'bg-green-100 text-green-700'
                      }`}>
                        {req.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Job Applications Table */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
            <h2 className="font-headline font-bold text-lg text-slate-800">Recent Job Applications</h2>
            <button className="text-sm text-primary font-bold hover:underline">View All</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-600">
              <thead className="bg-slate-50 text-slate-500 text-xs uppercase font-bold tracking-wider">
                <tr>
                  <th className="px-6 py-3">Candidate</th>
                  <th className="px-6 py-3">Role Applied</th>
                  <th className="px-6 py-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {recentJobApplications.map((app) => (
                  <tr key={app.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4">
                        <div className="font-medium text-slate-800">{app.name}</div>
                        <div className="text-xs text-slate-400">{app.location}</div>
                    </td>
                    <td className="px-6 py-4">{app.role}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                        app.status === 'Under Review' ? 'bg-orange-100 text-orange-700' : 
                        app.status === 'Interview Scheduled' ? 'bg-blue-100 text-blue-700' : 
                        'bg-red-100 text-red-700'
                      }`}>
                        {app.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AdminDashboard;
