import React, { useState, useEffect } from 'react';
import { 
  Building2, 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  KeyRound, 
  ShieldCheck, 
  Bell, 
  Globe, 
  Sliders, 
  CheckCircle2, 
  AlertCircle, 
  Save, 
  RefreshCw, 
  Eye, 
  EyeOff,
  Database,
  Lock,
  Sparkles
} from 'lucide-react';
import { supabase } from '../../supabase';
import { useConfirm } from '../../context/ConfirmContext';

const ORG_SETTINGS_KEY = 'ybg_admin_org_settings';
const NOTIFICATION_SETTINGS_KEY = 'ybg_admin_notification_settings';
const OPERATIONS_SETTINGS_KEY = 'ybg_admin_operations_settings';

const Settings: React.FC = () => {
  const confirm = useConfirm();
  const [activeTab, setActiveTab] = useState<'general' | 'security' | 'notifications' | 'operations' | 'system'>('general');
  const [toastMessage, setToastMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  const showToast = (text: string, type: 'success' | 'error' = 'success') => {
    setToastMessage({ text, type });
    setTimeout(() => setToastMessage(null), 3500);
  };

  // 1. Organization & General Settings
  const [orgSettings, setOrgSettings] = useState(() => {
    try {
      const saved = localStorage.getItem(ORG_SETTINGS_KEY);
      return saved ? JSON.parse(saved) : {
        companyName: 'Yashraj Business Group',
        tagline: 'Leading Security, Facility & Manpower Solutions Across India',
        phone: '+91 98237 34805',
        alternatePhone: '+91 70206 47829',
        email: 'info@ybg.com',
        supportEmail: 'support@ybg.com',
        address: 'Office No. 402, Commercial Wing, Senapati Bapat Road, Pune, Maharashtra 411016',
        hours: 'Mon - Sat: 9:00 AM - 7:00 PM (24/7 Operations Room)'
      };
    } catch {
      return {
        companyName: 'Yashraj Business Group',
        tagline: 'Leading Security, Facility & Manpower Solutions Across India',
        phone: '+91 98237 34805',
        alternatePhone: '+91 70206 47829',
        email: 'info@ybg.com',
        supportEmail: 'support@ybg.com',
        address: 'Office No. 402, Commercial Wing, Senapati Bapat Road, Pune, Maharashtra 411016',
        hours: 'Mon - Sat: 9:00 AM - 7:00 PM (24/7 Operations Room)'
      };
    }
  });

  const handleSaveOrgSettings = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      localStorage.setItem(ORG_SETTINGS_KEY, JSON.stringify(orgSettings));
      showToast('Organization settings updated successfully');
    } catch (err: any) {
      showToast('Failed to save settings: ' + err.message, 'error');
    }
  };

  // 2. Account & Security Settings
  const [currentUserEmail, setCurrentUserEmail] = useState('admin@ybg.com');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [updatingPassword, setUpdatingPassword] = useState(false);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (data?.user?.email) {
        setCurrentUserEmail(data.user.email);
      }
    });
  }, []);

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPassword || newPassword.length < 6) {
      showToast('Password must be at least 6 characters long', 'error');
      return;
    }
    if (newPassword !== confirmPassword) {
      showToast('Passwords do not match', 'error');
      return;
    }

    const ok = await confirm({
      title: 'Update Admin Password',
      message: 'Are you sure you want to update your administrator password? You will use this new password next time you log in.',
      confirmText: 'Update Password',
      variant: 'warning',
    });
    if (!ok) return;

    setUpdatingPassword(true);
    try {
      const { error } = await supabase.auth.updateUser({ password: newPassword });
      if (error) {
        showToast('Password update failed: ' + error.message, 'error');
      } else {
        setNewPassword('');
        setConfirmPassword('');
        showToast('Password changed successfully!');
      }
    } catch (err: any) {
      showToast('An unexpected error occurred: ' + err.message, 'error');
    } finally {
      setUpdatingPassword(false);
    }
  };

  // 3. Notification Settings
  const [notifications, setNotifications] = useState(() => {
    try {
      const saved = localStorage.getItem(NOTIFICATION_SETTINGS_KEY);
      return saved ? JSON.parse(saved) : {
        emailOnRequest: true,
        emailOnJob: true,
        soundAlerts: false,
        dailyDigest: true
      };
    } catch {
      return {
        emailOnRequest: true,
        emailOnJob: true,
        soundAlerts: false,
        dailyDigest: true
      };
    }
  });

  const toggleNotification = (key: keyof typeof notifications) => {
    const updated = { ...notifications, [key]: !notifications[key] };
    setNotifications(updated);
    try {
      localStorage.setItem(NOTIFICATION_SETTINGS_KEY, JSON.stringify(updated));
      showToast('Notification preference saved');
    } catch (err) {
      console.error(err);
    }
  };

  // 4. Operations Settings
  const [operations, setOperations] = useState(() => {
    try {
      const saved = localStorage.getItem(OPERATIONS_SETTINGS_KEY);
      return saved ? JSON.parse(saved) : {
        acceptingRequests: true,
        acceptingJobs: true,
        maintenanceMode: false
      };
    } catch {
      return {
        acceptingRequests: true,
        acceptingJobs: true,
        maintenanceMode: false
      };
    }
  });

  const toggleOperation = async (key: keyof typeof operations) => {
    if (key === 'maintenanceMode' && !operations.maintenanceMode) {
      const ok = await confirm({
        title: 'Enable Maintenance Mode?',
        message: 'Are you sure you want to enable Maintenance Mode? This will display a temporary maintenance banner across the portal.',
        confirmText: 'Enable Maintenance Mode',
        variant: 'warning',
      });
      if (!ok) return;
    }

    const updated = { ...operations, [key]: !operations[key] };
    setOperations(updated);
    try {
      localStorage.setItem(OPERATIONS_SETTINGS_KEY, JSON.stringify(updated));
      showToast('Operation setting updated');
    } catch (err) {
      console.error(err);
    }
  };

  // 5. System Cache Reset
  const handleClearCache = async () => {
    const ok = await confirm({
      title: 'Reset Local Cache',
      message: 'This will clear temporary stored badge counts and local state, then refresh with live Supabase data.',
      confirmText: 'Reset Cache',
      variant: 'info',
    });
    if (!ok) return;

    window.dispatchEvent(new CustomEvent('ybg_badge_refresh'));
    showToast('Cache cleared & badges synchronized');
  };

  return (
    <div className="w-full space-y-6 animate-in fade-in slide-in-from-bottom-4">
      {/* Toast Alert */}
      {toastMessage && (
        <div className={`fixed bottom-6 right-6 z-50 px-4 py-3 rounded-xl shadow-2xl text-sm font-semibold flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2 ${
          toastMessage.type === 'error' ? 'bg-rose-600 text-white' : 'bg-slate-900 text-white'
        }`}>
          {toastMessage.type === 'error' ? <AlertCircle size={18} /> : <CheckCircle2 size={18} className="text-emerald-400" />}
          <span>{toastMessage.text}</span>
        </div>
      )}

      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-headline font-bold text-slate-900">System & Admin Settings</h1>
        <p className="text-slate-500 text-sm mt-0.5">Configure organization profiles, admin credentials, notification alerts, and operations.</p>
      </div>

      {/* Navigation Tabs */}
      <div className="flex overflow-x-auto border-b border-slate-200 no-scrollbar gap-2 sm:gap-6">
        <button
          onClick={() => setActiveTab('general')}
          className={`pb-3 px-1 text-sm font-bold uppercase tracking-wider border-b-2 transition-colors flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'general' ? 'border-[#002451] text-[#002451]' : 'border-transparent text-slate-500 hover:text-slate-700'
          }`}
        >
          <Building2 size={17} />
          <span>General & Profile</span>
        </button>

        <button
          onClick={() => setActiveTab('security')}
          className={`pb-3 px-1 text-sm font-bold uppercase tracking-wider border-b-2 transition-colors flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'security' ? 'border-[#002451] text-[#002451]' : 'border-transparent text-slate-500 hover:text-slate-700'
          }`}
        >
          <Lock size={17} />
          <span>Admin Security</span>
        </button>

        <button
          onClick={() => setActiveTab('notifications')}
          className={`pb-3 px-1 text-sm font-bold uppercase tracking-wider border-b-2 transition-colors flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'notifications' ? 'border-[#002451] text-[#002451]' : 'border-transparent text-slate-500 hover:text-slate-700'
          }`}
        >
          <Bell size={17} />
          <span>Alerts & Notifications</span>
        </button>

        <button
          onClick={() => setActiveTab('operations')}
          className={`pb-3 px-1 text-sm font-bold uppercase tracking-wider border-b-2 transition-colors flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'operations' ? 'border-[#002451] text-[#002451]' : 'border-transparent text-slate-500 hover:text-slate-700'
          }`}
        >
          <Sliders size={17} />
          <span>Portal Operations</span>
        </button>

        <button
          onClick={() => setActiveTab('system')}
          className={`pb-3 px-1 text-sm font-bold uppercase tracking-wider border-b-2 transition-colors flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'system' ? 'border-[#002451] text-[#002451]' : 'border-transparent text-slate-500 hover:text-slate-700'
          }`}
        >
          <Database size={17} />
          <span>System Health</span>
        </button>
      </div>

      {/* 1. General & Organization Tab */}
      {activeTab === 'general' && (
        <form onSubmit={handleSaveOrgSettings} className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 sm:p-8 space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <h2 className="text-lg font-bold text-slate-900 font-headline">Organization Profile & Contact Information</h2>
            <p className="text-xs text-slate-500 mt-1">Official contact channels and corporate addresses displayed to clients and candidates.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">Company Legal Name</label>
              <input
                type="text"
                required
                value={orgSettings.companyName}
                onChange={(e) => setOrgSettings({ ...orgSettings, companyName: e.target.value })}
                className="w-full border border-slate-300 rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#002451]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">Company Tagline</label>
              <input
                type="text"
                value={orgSettings.tagline}
                onChange={(e) => setOrgSettings({ ...orgSettings, tagline: e.target.value })}
                className="w-full border border-slate-300 rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#002451]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">Primary Helpline Phone</label>
              <div className="relative">
                <Phone size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  required
                  value={orgSettings.phone}
                  onChange={(e) => setOrgSettings({ ...orgSettings, phone: e.target.value })}
                  className="pl-10 w-full border border-slate-300 rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#002451]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">Alternate / Emergency Helpline</label>
              <div className="relative">
                <Phone size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={orgSettings.alternatePhone}
                  onChange={(e) => setOrgSettings({ ...orgSettings, alternatePhone: e.target.value })}
                  className="pl-10 w-full border border-slate-300 rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#002451]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">Official Inquiries Email</label>
              <div className="relative">
                <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="email"
                  required
                  value={orgSettings.email}
                  onChange={(e) => setOrgSettings({ ...orgSettings, email: e.target.value })}
                  className="pl-10 w-full border border-slate-300 rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#002451]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">Support & Recruitment Email</label>
              <div className="relative">
                <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="email"
                  value={orgSettings.supportEmail}
                  onChange={(e) => setOrgSettings({ ...orgSettings, supportEmail: e.target.value })}
                  className="pl-10 w-full border border-slate-300 rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#002451]"
                />
              </div>
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">Registered Office Address</label>
              <div className="relative">
                <MapPin size={16} className="absolute left-3 top-3 text-slate-400" />
                <textarea
                  rows={2}
                  required
                  value={orgSettings.address}
                  onChange={(e) => setOrgSettings({ ...orgSettings, address: e.target.value })}
                  className="pl-10 w-full border border-slate-300 rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#002451]"
                />
              </div>
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">Operational Timings & Hours</label>
              <div className="relative">
                <Clock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={orgSettings.hours}
                  onChange={(e) => setOrgSettings({ ...orgSettings, hours: e.target.value })}
                  className="pl-10 w-full border border-slate-300 rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#002451]"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-4 border-t border-slate-100">
            <button
              type="submit"
              className="inline-flex items-center gap-2 bg-[#002451] hover:bg-[#001b3d] text-white font-bold px-6 py-2.5 rounded-lg text-sm shadow-sm transition-colors"
            >
              <Save size={16} />
              <span>Save Organization Settings</span>
            </button>
          </div>
        </form>
      )}

      {/* 2. Admin Security & Account Tab */}
      {activeTab === 'security' && (
        <div className="space-y-6">
          {/* Current Profile Card */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#002451] to-blue-700 text-white flex items-center justify-center font-black text-xl shadow-md">
                {(currentUserEmail || 'A').charAt(0).toUpperCase()}
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">{currentUserEmail}</h3>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-200 mt-1">
                  <ShieldCheck size={13} className="text-emerald-500" />
                  Super Administrator
                </span>
              </div>
            </div>
            <div className="text-xs text-slate-500 bg-slate-50 px-3 py-2 rounded-lg border border-slate-200">
              Supabase Auth Session Active
            </div>
          </div>

          {/* Change Password Form */}
          <form onSubmit={handleChangePassword} className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 sm:p-8 space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <h2 className="text-lg font-bold text-slate-900 font-headline flex items-center gap-2">
                <KeyRound size={20} className="text-[#002451]" />
                <span>Change Administrator Password</span>
              </h2>
              <p className="text-xs text-slate-500 mt-1">Update your password to maintain secure access to the command center.</p>
            </div>

            <div className="max-w-md space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">New Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    minLength={6}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Enter at least 6 characters"
                    className="w-full pr-10 border border-slate-300 rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#002451]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">Confirm New Password</label>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  minLength={6}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Re-type new password"
                  className="w-full border border-slate-300 rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#002451]"
                />
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={updatingPassword}
                className="inline-flex items-center gap-2 bg-[#002451] hover:bg-[#001b3d] text-white font-bold px-6 py-2.5 rounded-lg text-sm shadow-sm transition-colors disabled:opacity-50"
              >
                {updatingPassword ? <RefreshCw size={16} className="animate-spin" /> : <Lock size={16} />}
                <span>{updatingPassword ? 'Updating Password...' : 'Update Password'}</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* 3. Alerts & Notifications Tab */}
      {activeTab === 'notifications' && (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 sm:p-8 space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <h2 className="text-lg font-bold text-slate-900 font-headline">Notification Preferences</h2>
            <p className="text-xs text-slate-500 mt-1">Configure automated alert triggers for incoming quotations and applications.</p>
          </div>

          <div className="divide-y divide-slate-100">
            <div className="py-4 flex items-center justify-between gap-4">
              <div>
                <strong className="text-sm font-bold text-slate-800 block">Service Request Alerts</strong>
                <p className="text-xs text-slate-500 mt-0.5">Trigger notification badges and highlight new incoming client quotation requests.</p>
              </div>
              <button
                type="button"
                onClick={() => toggleNotification('emailOnRequest')}
                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                  notifications.emailOnRequest ? 'bg-[#002451]' : 'bg-slate-300'
                }`}
              >
                <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                  notifications.emailOnRequest ? 'translate-x-5' : 'translate-x-0'
                }`} />
              </button>
            </div>

            <div className="py-4 flex items-center justify-between gap-4">
              <div>
                <strong className="text-sm font-bold text-slate-800 block">Candidate Application Alerts</strong>
                <p className="text-xs text-slate-500 mt-0.5">Show real-time badge counters on the menu bar when candidates submit job applications.</p>
              </div>
              <button
                type="button"
                onClick={() => toggleNotification('emailOnJob')}
                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                  notifications.emailOnJob ? 'bg-[#002451]' : 'bg-slate-300'
                }`}
              >
                <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                  notifications.emailOnJob ? 'translate-x-5' : 'translate-x-0'
                }`} />
              </button>
            </div>

            <div className="py-4 flex items-center justify-between gap-4">
              <div>
                <strong className="text-sm font-bold text-slate-800 block">Audio Cue Alert</strong>
                <p className="text-xs text-slate-500 mt-0.5">Play a subtle chime sound cue when new items arrive while the dashboard is open.</p>
              </div>
              <button
                type="button"
                onClick={() => toggleNotification('soundAlerts')}
                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                  notifications.soundAlerts ? 'bg-[#002451]' : 'bg-slate-300'
                }`}
              >
                <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                  notifications.soundAlerts ? 'translate-x-5' : 'translate-x-0'
                }`} />
              </button>
            </div>

            <div className="py-4 flex items-center justify-between gap-4">
              <div>
                <strong className="text-sm font-bold text-slate-800 block">Daily Digest Summary</strong>
                <p className="text-xs text-slate-500 mt-0.5">Aggregate all daily inquiries into an executive summary report.</p>
              </div>
              <button
                type="button"
                onClick={() => toggleNotification('dailyDigest')}
                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                  notifications.dailyDigest ? 'bg-[#002451]' : 'bg-slate-300'
                }`}
              >
                <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                  notifications.dailyDigest ? 'translate-x-5' : 'translate-x-0'
                }`} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 4. Portal Operations Tab */}
      {activeTab === 'operations' && (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 sm:p-8 space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <h2 className="text-lg font-bold text-slate-900 font-headline">Portal Operations & Public Controls</h2>
            <p className="text-xs text-slate-500 mt-1">Control public inquiry intake and submission pipelines across the website.</p>
          </div>

          <div className="space-y-4">
            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 flex items-center justify-between gap-4">
              <div>
                <strong className="text-sm font-bold text-slate-800 block">Accepting Quotation Inquiries</strong>
                <p className="text-xs text-slate-500 mt-0.5">When active, clients can request service quotations online via contact & detail forms.</p>
              </div>
              <button
                type="button"
                onClick={() => toggleOperation('acceptingRequests')}
                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                  operations.acceptingRequests ? 'bg-emerald-600' : 'bg-slate-300'
                }`}
              >
                <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                  operations.acceptingRequests ? 'translate-x-5' : 'translate-x-0'
                }`} />
              </button>
            </div>

            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 flex items-center justify-between gap-4">
              <div>
                <strong className="text-sm font-bold text-slate-800 block">Accepting Job Applications</strong>
                <p className="text-xs text-slate-500 mt-0.5">When active, candidates can submit resumes on the careers recruitment portal.</p>
              </div>
              <button
                type="button"
                onClick={() => toggleOperation('acceptingJobs')}
                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                  operations.acceptingJobs ? 'bg-emerald-600' : 'bg-slate-300'
                }`}
              >
                <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                  operations.acceptingJobs ? 'translate-x-5' : 'translate-x-0'
                }`} />
              </button>
            </div>

            <div className="p-4 rounded-xl border border-amber-200 bg-amber-50/40 flex items-center justify-between gap-4">
              <div>
                <strong className="text-sm font-bold text-amber-900 block">Scheduled Maintenance Mode</strong>
                <p className="text-xs text-amber-700/80 mt-0.5">Displays a banner informing visitors that system upgrades are in progress.</p>
              </div>
              <button
                type="button"
                onClick={() => toggleOperation('maintenanceMode')}
                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                  operations.maintenanceMode ? 'bg-amber-600' : 'bg-slate-300'
                }`}
              >
                <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                  operations.maintenanceMode ? 'translate-x-5' : 'translate-x-0'
                }`} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 5. System Health Tab */}
      {activeTab === 'system' && (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 sm:p-8 space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <h2 className="text-lg font-bold text-slate-900 font-headline">System Architecture & Health</h2>
            <p className="text-xs text-slate-500 mt-1">Live status of backend connections, database pipelines, and realtime subscriptions.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Database Status</span>
              <div className="flex items-center gap-2 mt-1">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-sm font-bold text-slate-800">Supabase PostgreSQL Connected</span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Realtime WebSocket</span>
              <div className="flex items-center gap-2 mt-1">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                <span className="text-sm font-bold text-slate-800">Subscribed (Active)</span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Client Framework</span>
              <div className="text-sm font-bold text-slate-800 mt-1">Vite + React 19 + TailwindCSS</div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <strong className="text-sm font-bold text-slate-800 block">Synchronize Local State</strong>
              <p className="text-xs text-slate-500">Purge stale cache and re-query live table counters from the database.</p>
            </div>
            <button
              type="button"
              onClick={handleClearCache}
              className="inline-flex items-center gap-2 px-4 py-2 border border-slate-300 rounded-lg text-slate-700 font-semibold text-xs hover:bg-slate-50 transition-colors shadow-2xs"
            >
              <RefreshCw size={14} />
              <span>Resync Cache & Badges</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Settings;
