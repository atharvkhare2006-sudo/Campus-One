import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { X, Building2, Plus, ShieldCheck, RefreshCw, KeyRound, Sparkles } from 'lucide-react';

export default function AddCollegeModal({ isOpen, onClose }) {
  const { addCollege } = useApp();
  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('Madhya Pradesh');
  const [plan, setPlan] = useState('Enterprise');
  const [adminName, setAdminName] = useState('');
  const [adminEmail, setAdminEmail] = useState('');

  // Editable & Auto-generated unique College Login ID & Password
  const generateUniqueCollegeId = (prefix) => {
    const cleanPrefix = (prefix || 'COL').toUpperCase().replace(/[^A-Z]/g, '').slice(0, 5) || 'COL';
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    return `CLG-${cleanPrefix}-${randomSuffix}`;
  };

  const generateDefaultCollegePassword = (prefix) => {
    const cleanPrefix = (prefix || 'college').toLowerCase().replace(/[^a-z]/g, '').slice(0, 5) || 'college';
    const randomDigits = Math.floor(100 + Math.random() * 900);
    return `${cleanPrefix}@admin${randomDigits}`;
  };

  const [loginId, setLoginId] = useState(generateUniqueCollegeId('COL'));
  const [password, setPassword] = useState(generateDefaultCollegePassword('col'));

  useEffect(() => {
    if (code) {
      setLoginId(generateUniqueCollegeId(code));
      setPassword(generateDefaultCollegePassword(code));
    }
  }, [code]);

  if (!isOpen) return null;

  const handleRegenerate = () => {
    setLoginId(generateUniqueCollegeId(code || 'COL'));
    setPassword(generateDefaultCollegePassword(code || 'col'));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    addCollege({
      name,
      code: (code || 'COL').toUpperCase(),
      city: city || 'City',
      state,
      plan,
      adminName: adminName || 'College Administrator',
      adminEmail: adminEmail || `admin@${(code || 'college').toLowerCase()}.edu.in`,
      loginId: loginId.trim(),
      tempPassword: password.trim()
    });

    setName('');
    setCode('');
    setCity('');
    setAdminName('');
    setAdminEmail('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl max-w-lg w-full shadow-2xl border border-slate-100 overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/70 shrink-0">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-indigo-50 text-indigo-600 rounded-xl">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-800 text-sm">Onboard New College Institution</h3>
              <p className="text-xs text-slate-500">Super Admin SaaS Control Panel • Issues College Admin ID</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-200/50">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 overflow-y-auto">
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
              College / University Full Name *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Rajiv Gandhi Institute of Technology"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 text-slate-900"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                College Code (Short) *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. RGIT"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 uppercase text-slate-900"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Subscription Plan
              </label>
              <select
                value={plan}
                onChange={(e) => setPlan(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 text-slate-800"
              >
                <option value="Standard">Standard Tier (₹15k/yr)</option>
                <option value="Pro">Pro Tier (₹35k/yr)</option>
                <option value="Enterprise">Enterprise Unlimited (₹75k/yr)</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                City / Location
              </label>
              <input
                type="text"
                placeholder="Bhopal / Indore"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 text-slate-900"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                State
              </label>
              <input
                type="text"
                value={state}
                onChange={(e) => setState(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 text-slate-900"
              />
            </div>
          </div>

          <div className="border-t border-slate-100 pt-3">
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
              Primary College Admin Contact
            </h4>
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Admin / Director Name</label>
                <input
                  type="text"
                  placeholder="e.g. Dr. Sunil Agrawal"
                  value={adminName}
                  onChange={(e) => setAdminName(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 text-slate-900"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Official Email Address</label>
                <input
                  type="email"
                  placeholder="admin@college.edu.in"
                  value={adminEmail}
                  onChange={(e) => setAdminEmail(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 text-slate-900"
                />
              </div>
            </div>
          </div>

          {/* Interactive Unique College ID & Password Section */}
          <div className="p-3.5 bg-indigo-50/80 border border-indigo-200/80 rounded-2xl space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-indigo-700 flex items-center gap-1.5">
                <KeyRound className="w-3.5 h-3.5" /> College Admin Credentials (Set Custom or Auto-Unique)
              </span>
              <button
                type="button"
                onClick={handleRegenerate}
                title="Generate fresh unique ID & Password"
                className="inline-flex items-center gap-1 text-[11px] font-bold text-indigo-700 hover:text-indigo-900 bg-white px-2 py-0.5 rounded-md border border-indigo-300 shadow-xs transition-colors"
              >
                <RefreshCw className="w-3 h-3" /> Regenerate Unique
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-[11px] font-semibold text-slate-600 block mb-0.5">
                  Assigned College ID:
                </label>
                <input
                  type="text"
                  required
                  value={loginId}
                  onChange={(e) => setLoginId(e.target.value)}
                  className="w-full font-mono text-xs font-extrabold text-indigo-800 bg-white px-2.5 py-1.5 rounded-lg border border-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="text-[11px] font-semibold text-slate-600 block mb-0.5">
                  Admin Password:
                </label>
                <input
                  type="text"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full font-mono text-xs font-semibold text-slate-800 bg-white px-2.5 py-1.5 rounded-lg border border-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>
            <p className="text-[10px] text-slate-500">
              ⚡ College Admin will use this ID to sign in. Every generated ID is uniquely formatted per institution.
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-md shadow-indigo-600/20 transition-all flex items-center gap-2"
            >
              <ShieldCheck className="w-4 h-4" />
              Authorize & Onboard
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
