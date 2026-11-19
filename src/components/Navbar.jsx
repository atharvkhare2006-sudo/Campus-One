import React from 'react';
import { useApp } from '../context/AppContext';
import {
  GraduationCap,
  Building2,
  Bell,
  Sparkles,
  Shield,
  UserCheck,
  RotateCcw,
  Users,
  Lock,
  ShieldCheck
} from 'lucide-react';
import InstitutionalLoginModal from './modals/InstitutionalLoginModal';

export default function Navbar() {
  const {
    currentRole,
    currentCollege,
    colleges,
    resetDemoData,
    authenticatedSessions,
    logoutRole,
    loginModalConfig,
    closeLoginModal
  } = useApp();

  const activeCollege = authenticatedSessions?.college_admin || currentCollege;
  const activeFaculty = authenticatedSessions?.faculty;
  const activeStudent = authenticatedSessions?.student;
  const activeParent = authenticatedSessions?.parent;

  const roleConfigs = {
    super_admin: {
      label: 'Super Admin',
      badge: 'bg-indigo-600 text-white',
      desc: 'SaaS Platform Owner',
      icon: <Shield className="w-4 h-4" />
    },
    college_admin: {
      label: 'College Admin',
      badge: 'bg-blue-600 text-white',
      desc: activeCollege ? `${activeCollege.name} (${activeCollege.code})` : 'College Administration',
      icon: <Building2 className="w-4 h-4" />
    },
    faculty: {
      label: 'Faculty',
      badge: 'bg-purple-600 text-white',
      desc: activeFaculty ? `${activeFaculty.name} (${activeFaculty.department})` : 'Faculty Portal',
      icon: <GraduationCap className="w-4 h-4" />
    },
    student: {
      label: 'Student',
      badge: 'bg-emerald-600 text-white',
      desc: activeStudent ? `${activeStudent.name} (Roll: ${activeStudent.enrollmentNo})` : 'Student Portal',
      icon: <UserCheck className="w-4 h-4" />
    },
    parent: {
      label: 'Parent Admin',
      badge: 'bg-amber-600 text-white',
      desc: activeParent?.ward ? `Ward: ${activeParent.ward.name} (${activeParent.ward.enrollmentNo})` : 'Parent Portal',
      icon: <Users className="w-4 h-4" />
    }
  };

  const activeRole = roleConfigs[currentRole] || roleConfigs.super_admin;
  const activeSession = authenticatedSessions ? authenticatedSessions[currentRole] : null;

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Brand */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-700 to-purple-600 flex items-center justify-center text-white shadow-md shadow-indigo-500/20">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-indigo-700 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  Campus One
                </span>
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200/60 uppercase">
                  OS
                </span>
              </div>
              <p className="text-[10px] text-slate-400 font-medium hidden sm:block">
                All-in-One Higher Ed & Campus Operating System
              </p>
            </div>
          </div>

          {/* Center: Read-Only Authenticated College Indicator (Switch Box Removed as requested) */}
          {currentRole === 'college_admin' && activeSession && (
            <div className="hidden md:flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-blue-50/80 border border-blue-200/80 shadow-xs">
              <Building2 className="w-4 h-4 text-blue-600" />
              <span className="text-xs font-bold text-blue-900 truncate max-w-[280px]">
                {activeCollege.name} ({activeCollege.code})
              </span>
              <span className="text-[10px] font-extrabold px-1.5 py-0.5 rounded bg-blue-600 text-white">
                {activeCollege.city || 'Verified'}
              </span>
            </div>
          )}

          {/* Right Action Items */}
          <div className="flex items-center gap-3">
            {/* Live API Status Indicator */}
            <div className="hidden lg:flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[11px] font-bold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>API: Online</span>
            </div>

            {/* Quick Reset State button */}
            <button
              onClick={resetDemoData}
              title="Reset State to Defaults"
              className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-xl transition-colors hidden xl:flex items-center gap-1.5 text-xs"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset State</span>
            </button>

            {/* Notification Bell */}
            <div className="relative">
              <button
                className="p-2 text-slate-600 hover:text-indigo-600 hover:bg-slate-100 rounded-xl transition-colors relative"
                title="Circulars & Notifications"
              >
                <Bell className="w-5 h-5" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-white animate-pulse" />
              </button>
            </div>

            {/* Lock / Log Out Action for Active Role */}
            {currentRole !== 'super_admin' && activeSession && (
              <div className="flex items-center gap-1.5">
                <div className="hidden md:flex items-center gap-1 px-2.5 py-1 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-[11px] font-bold">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="truncate max-w-[130px]">
                    {activeSession.name || activeSession.enrollmentNo || activeSession.loginId || 'Verified'}
                  </span>
                </div>
                <button
                  onClick={() => logoutRole(currentRole)}
                  className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-slate-100 hover:bg-rose-50 hover:text-rose-600 text-slate-600 text-xs font-semibold transition-all border border-slate-200"
                  title="Lock portal and sign out"
                >
                  <Lock className="w-3 h-3" />
                  <span className="hidden sm:inline">Lock Portal</span>
                </button>
              </div>
            )}

            {/* Active Role Card & Dropdown Switcher */}
            <div className="flex items-center pl-2 border-l border-slate-200">
              <div className="flex items-center gap-2.5">
                <div className="text-right hidden sm:block">
                  <div className="flex items-center justify-end gap-1.5">
                    <span className="text-xs font-bold text-slate-800">{activeRole.label}</span>
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${activeRole.badge}`}>
                      {currentRole === 'super_admin' || activeSession ? 'Live' : 'Locked'}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 truncate max-w-[180px]">
                    {activeRole.desc}
                  </p>
                </div>
                <div className="w-9 h-9 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-700 shadow-inner">
                  {activeRole.icon}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <InstitutionalLoginModal
        isOpen={loginModalConfig.isOpen}
        onClose={closeLoginModal}
      />
    </header>
  );
}
