import React, { useState, useEffect } from 'react';
import {
  X,
  Shield,
  Building2,
  GraduationCap,
  UserCheck,
  Users,
  KeyRound,
  Lock,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Info,
  AlertCircle
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function InstitutionalLoginModal({ isOpen: propIsOpen, onClose: propOnClose }) {
  const {
    loginModalConfig,
    closeLoginModal,
    loginWithCredentials,
    colleges,
    faculty,
    students
  } = useApp();

  // Can be controlled via prop OR via context's loginModalConfig
  const isOpen = propIsOpen !== undefined ? propIsOpen : loginModalConfig.isOpen;
  const handleClose = propOnClose || closeLoginModal;

  const [selectedRole, setSelectedRole] = useState(loginModalConfig.targetRole || 'college_admin');
  const [loginId, setLoginId] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  // Whenever modal opens or targetRole changes, sync role & credentials
  useEffect(() => {
    const activeTarget = loginModalConfig.targetRole || 'college_admin';
    setSelectedRole(activeTarget);
    setErrorMsg('');
    loadDefaultCredentials(activeTarget);
  }, [loginModalConfig.targetRole, isOpen]);

  const loadDefaultCredentials = (role) => {
    if (role === 'college_admin') {
      const col = colleges[0] || {};
      setLoginId(col.loginId || 'CLG-AITM-2026');
      setPassword(col.tempPassword || 'aitm@admin2026');
    } else if (role === 'faculty') {
      const fac = faculty[0] || {};
      setLoginId(fac.loginId || 'FAC-BCA-101');
      setPassword(fac.tempPassword || 'faculty@aitm');
    } else if (role === 'student') {
      const stu = students[0] || {};
      setLoginId(stu.enrollmentNo || '0103CA231045');
      setPassword(stu.tempPassword || 'student@rohan');
    } else if (role === 'parent') {
      const stu = students[0] || {};
      setLoginId(stu.enrollmentNo || '0103CA231045');
      setPassword(stu.parentPin || '95891');
    } else if (role === 'super_admin') {
      setLoginId('admin@campusone.io');
      setPassword('superadmin@2026');
    }
  };

  const handleRoleChange = (role) => {
    setSelectedRole(role);
    setErrorMsg('');
    loadDefaultCredentials(role);
  };

  if (!isOpen) return null;

  const roleTabs = [
    { id: 'college_admin', label: 'College Admin', icon: <Building2 className="w-4 h-4" /> },
    { id: 'faculty', label: 'Faculty Portal', icon: <GraduationCap className="w-4 h-4" /> },
    { id: 'student', label: 'Student Portal', icon: <UserCheck className="w-4 h-4" /> },
    { id: 'parent', label: 'Parent Portal', icon: <Users className="w-4 h-4" /> },
    { id: 'super_admin', label: 'Super Admin', icon: <Shield className="w-4 h-4" /> }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!loginId.trim()) {
      setErrorMsg('Please enter a valid Institutional Login ID.');
      return;
    }
    const ok = loginWithCredentials({ role: selectedRole, loginId, password });
    if (ok) {
      handleClose();
    } else {
      setErrorMsg('Invalid Credentials. Please enter the assigned Institutional ID and Password.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/75 backdrop-blur-md animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-lg w-full shadow-2xl border border-slate-200 overflow-hidden max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-slate-900 via-indigo-950 to-purple-950 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-white/10 rounded-2xl shadow-inner border border-white/10">
              <KeyRound className="w-6 h-6 text-indigo-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-black tracking-tight">Institutional Login Gate</h3>
                <span className="text-[10px] uppercase font-bold bg-indigo-500/30 text-indigo-200 px-2 py-0.5 rounded-full border border-indigo-400/30">
                  Permission Required
                </span>
              </div>
              <p className="text-xs text-indigo-200 mt-0.5">Authentication required to view confidential portal data</p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="p-2 rounded-full hover:bg-white/10 text-white/80 transition-colors"
            title="Close Pop-up"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Role Switcher in Modal */}
        <div className="p-3 bg-slate-100 border-b border-slate-200 overflow-x-auto flex items-center gap-1.5 shrink-0">
          {roleTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleRoleChange(tab.id)}
              className={`shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                selectedRole === tab.id
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                  : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 overflow-y-auto">
          {errorMsg && (
            <div className="p-3 bg-rose-50 border border-rose-200 rounded-2xl flex items-center gap-2.5 text-xs text-rose-800 font-semibold animate-shake">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          <div className="p-3 bg-indigo-50/70 border border-indigo-100 rounded-2xl flex items-start gap-2.5 text-xs text-indigo-950">
            <Info className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
            <div className="space-y-0.5">
              {selectedRole === 'college_admin' && (
                <p>
                  <strong>College Admin:</strong> Generated by Super Admin during onboarding. (e.g. <code>CLG-AITM-2026</code>)
                </p>
              )}
              {selectedRole === 'faculty' && (
                <p>
                  <strong>Faculty Portal:</strong> Issued by College Admin during department allocation. (e.g. <code>FAC-BCA-101</code>)
                </p>
              )}
              {selectedRole === 'student' && (
                <p>
                  <strong>Student Portal:</strong> Official Student Enrollment / Roll Number issued by Faculty. (e.g. <code>0103CA231045</code>)
                </p>
              )}
              {selectedRole === 'parent' && (
                <p>
                  <strong>Parent Portal:</strong> Directly linked to Student Enrollment Number (<code>0103CA231045</code>).
                </p>
              )}
              {selectedRole === 'super_admin' && (
                <p>
                  <strong>Super Admin:</strong> Platform headquarters master controller.
                </p>
              )}
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">
              {selectedRole === 'parent'
                ? "Ward's Student Roll No / Enrollment ID *"
                : 'Assigned Institutional Login ID *'}
            </label>
            <input
              type="text"
              required
              value={loginId}
              onChange={(e) => { setLoginId(e.target.value); setErrorMsg(''); }}
              placeholder="Enter assigned Login ID..."
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">
              {selectedRole === 'parent' ? 'Registered Guardian PIN / Mobile *' : 'Portal Password *'}
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => { setPassword(e.target.value); setErrorMsg(''); }}
              placeholder="Enter password..."
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900"
            />
          </div>

          {/* Quick Demo Credentials Chips for instant fill during presentation */}
          <div className="pt-2">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
              Available Active Accounts (Click to Fill):
            </span>
            <div className="flex flex-wrap gap-1.5">
              {selectedRole === 'college_admin' && (
                <>
                  {colleges.map((c) => (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => {
                        setLoginId(c.loginId || `CLG-${c.code}-2026`);
                        setPassword(c.tempPassword || `${c.code.toLowerCase()}@admin2026`);
                        setErrorMsg('');
                      }}
                      className="px-2.5 py-1 text-[11px] font-semibold bg-slate-100 hover:bg-indigo-50 text-slate-700 hover:text-indigo-700 rounded-lg border border-slate-200 transition-colors"
                    >
                      {c.code} ({c.loginId || `CLG-${c.code}-2026`})
                    </button>
                  ))}
                </>
              )}

              {selectedRole === 'faculty' && (
                <>
                  {faculty.map((f) => (
                    <button
                      key={f.id}
                      type="button"
                      onClick={() => {
                        setLoginId(f.loginId || 'FAC-BCA-101');
                        setPassword(f.tempPassword || 'faculty@aitm');
                        setErrorMsg('');
                      }}
                      className="px-2.5 py-1 text-[11px] font-semibold bg-slate-100 hover:bg-purple-50 text-slate-700 hover:text-purple-700 rounded-lg border border-slate-200 transition-colors"
                    >
                      {f.name} ({f.loginId || 'FAC-BCA-101'})
                    </button>
                  ))}
                </>
              )}

              {selectedRole === 'student' && (
                <>
                  {students.map((s) => (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => {
                        setLoginId(s.enrollmentNo);
                        setPassword(s.tempPassword || 'student@2026');
                        setErrorMsg('');
                      }}
                      className="px-2.5 py-1 text-[11px] font-semibold bg-slate-100 hover:bg-emerald-50 text-slate-700 hover:text-emerald-700 rounded-lg border border-slate-200 transition-colors"
                    >
                      {s.name} ({s.enrollmentNo})
                    </button>
                  ))}
                </>
              )}

              {selectedRole === 'parent' && (
                <>
                  {students.map((s) => (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => {
                        setLoginId(s.enrollmentNo);
                        setPassword(s.parentPin || '95891');
                        setErrorMsg('');
                      }}
                      className="px-2.5 py-1 text-[11px] font-semibold bg-slate-100 hover:bg-amber-50 text-slate-700 hover:text-amber-700 rounded-lg border border-slate-200 transition-colors"
                    >
                      Ward {s.name} (Roll: {s.enrollmentNo})
                    </button>
                  ))}
                </>
              )}

              {selectedRole === 'super_admin' && (
                <button
                  type="button"
                  onClick={() => {
                    setLoginId('admin@campusone.io');
                    setPassword('superadmin@2026');
                    setErrorMsg('');
                  }}
                  className="px-2.5 py-1 text-[11px] font-semibold bg-slate-100 hover:bg-indigo-50 text-slate-700 rounded-lg border border-slate-200"
                >
                  Master Console (admin@campusone.io)
                </button>
              )}
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-2 shrink-0">
            <button
              type="button"
              onClick={handleClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-lg shadow-indigo-600/30 transition-all hover:scale-[1.02]"
            >
              <KeyRound className="w-3.5 h-3.5" />
              Verify & Unlock Portal <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
