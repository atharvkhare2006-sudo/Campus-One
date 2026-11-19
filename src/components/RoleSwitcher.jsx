import React from 'react';
import { useApp } from '../context/AppContext';
import { Shield, Building2, GraduationCap, UserCheck, Users, Lock, CheckCircle2 } from 'lucide-react';

export default function RoleSwitcher() {
  const { currentRole, switchRole, authenticatedSessions } = useApp();

  const roles = [
    {
      id: 'super_admin',
      label: 'Super Admin',
      sub: 'Platform Owner',
      icon: <Shield className="w-4 h-4" />,
      color: 'hover:border-indigo-500 hover:text-indigo-600',
      activeColor: 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
    },
    {
      id: 'college_admin',
      label: 'College Admin',
      sub: 'AITM Bhopal',
      icon: <Building2 className="w-4 h-4" />,
      color: 'hover:border-blue-500 hover:text-blue-600',
      activeColor: 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
    },
    {
      id: 'faculty',
      label: 'Faculty',
      sub: 'Dr. Ananya Pandey',
      icon: <GraduationCap className="w-4 h-4" />,
      color: 'hover:border-purple-500 hover:text-purple-600',
      activeColor: 'bg-purple-600 text-white shadow-md shadow-purple-600/30'
    },
    {
      id: 'student',
      label: 'Student',
      sub: 'Rohan (BCA 3rd)',
      icon: <UserCheck className="w-4 h-4" />,
      color: 'hover:border-emerald-500 hover:text-emerald-600',
      activeColor: 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30'
    },
    {
      id: 'parent',
      label: 'Parent Admin',
      sub: 'Parent Portal',
      icon: <Users className="w-4 h-4" />,
      color: 'hover:border-amber-500 hover:text-amber-600',
      activeColor: 'bg-amber-600 text-white shadow-md shadow-amber-600/30'
    }
  ];

  return (
    <div className="bg-slate-900 text-white px-4 py-2 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
      <div className="flex items-center gap-2 text-slate-300 font-medium">
        <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
          <span className="font-bold uppercase tracking-wider text-[10px]">Enterprise Live</span>
        </div>
        <span className="hidden sm:inline text-slate-300 font-semibold">Institutional Portal Navigation:</span>
      </div>

      <div className="flex items-center gap-1.5 overflow-x-auto py-0.5">
        {roles.map((r) => {
          const isActive = currentRole === r.id;
          const isAuthed = r.id === 'super_admin' || Boolean(authenticatedSessions && authenticatedSessions[r.id]);

          return (
            <button
              key={r.id}
              onClick={() => switchRole(r.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-medium transition-all ${
                isActive
                  ? r.activeColor
                  : 'bg-slate-800/80 text-slate-300 hover:bg-slate-800 hover:text-white border border-slate-700/60'
              }`}
            >
              {r.icon}
              <span className="font-semibold">{r.label}</span>
              {/* Security lock/check badge */}
              {r.id !== 'super_admin' && (
                <span className="ml-0.5 opacity-80" title={isAuthed ? 'Authenticated' : 'Requires Login ID'}>
                  {isAuthed ? (
                    <CheckCircle2 className="w-3 h-3 text-emerald-400 inline" />
                  ) : (
                    <Lock className="w-3 h-3 text-slate-400 inline" />
                  )}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
