import React, { useState } from 'react';
import {
  Sparkles,
  TrendingUp,
  Award,
  BookOpen,
  Calendar,
  AlertTriangle,
  CheckCircle2,
  Briefcase,
  ChevronRight,
  UserCheck
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function ParentCareerAdvisory() {
  const { showToast, authenticatedSessions, students, wardData } = useApp();
  const activeWard = authenticatedSessions?.parent?.ward || students[0];
  const [isConsultationBooked, setIsConsultationBooked] = useState(false);

  const careerPaths = [
    {
      title: 'Cloud Database Administrator / Data Engineer',
      match: '94% Profile Affinity',
      rationale: `${activeWard.name} has scored 91.9% in DBMS with distinction remarks in Normalization, SQL indexing, and transaction logging.`,
      demand: 'High Industry Demand (Avg CTC: ₹8.5 - 14 LPA)',
      skillsToKeepSharpening: 'PostgreSQL, AWS RDS, Sharding & Query Optimization'
    },
    {
      title: 'Full-Stack Web Architect (MERN / Next.js)',
      match: '89% Profile Affinity',
      rationale: 'Scored 90.0% attendance and high practical grades in Web Technologies & React component state architectures.',
      demand: 'Very High (Avg CTC: ₹7.0 - 12 LPA)',
      skillsToKeepSharpening: 'REST APIs, Tailwind CSS, TypeScript & Docker'
    },
    {
      title: 'Systems & DevOps Engineer',
      match: '81% Profile Affinity',
      rationale: 'Shows strong logical grasp of OS process scheduling; needs slight boost in C++ pointer algorithms.',
      demand: 'Growing Demand (Avg CTC: ₹8.0 - 15 LPA)',
      skillsToKeepSharpening: 'Linux Bash, Concurrency, Git Versioning & CI/CD'
    }
  ];

  const handleBookConsultation = () => {
    setIsConsultationBooked(true);
    showToast(`1-on-1 Parent-Faculty consultation requested with HOD for ${activeWard.name}!`, 'success');
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm p-6 md:p-8 space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-5">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-amber-50 text-amber-700 text-[11px] font-extrabold uppercase tracking-wider mb-1.5">
            <Sparkles className="w-3.5 h-3.5" /> AI Child Progression & Career Roadmap Engine
          </div>
          <h2 className="text-xl font-extrabold text-slate-900">
            Predictive Academic Trajectory for {activeWard.name}
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            AI synthesis of semester attendance, internal test marks, and lab assignments to guide parental decisions and placements.
          </p>
        </div>

        <button
          onClick={handleBookConsultation}
          disabled={isConsultationBooked}
          className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs shadow-md shadow-amber-600/20 transition-all hover:scale-[1.02] disabled:opacity-70 self-start md:self-auto"
        >
          <UserCheck className="w-3.5 h-3.5" />
          {isConsultationBooked ? 'Consultation Confirmed' : 'Request 1-on-1 Faculty Meet'}
        </button>
      </div>

      {/* Trajectory Highlights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Projected SGPA Gauge */}
        <div className="p-5 rounded-2xl bg-gradient-to-br from-amber-900 via-orange-950 to-slate-900 text-white flex flex-col justify-between">
          <div>
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-amber-200">
              Projected Semester SGPA
            </span>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-4xl font-black text-amber-400">8.45</span>
              <span className="text-sm font-semibold text-amber-200">/ 10.0</span>
            </div>
            <p className="text-xs font-bold text-emerald-400 mt-1">
              Top 8% in BCA 3rd Semester Cohort
            </p>
          </div>
          <div className="pt-3 border-t border-white/10 mt-3 text-[11px] text-amber-100">
            Overall Attendance: <strong>{activeWard.attendance || '88%'}</strong> (Safe Tier)
          </div>
        </div>

        {/* Immediate Academic Action */}
        <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col justify-between">
          <div>
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400 block mb-1">
              Immediate Parental Guidance Tip
            </span>
            <h4 className="font-bold text-slate-800 text-sm">
              Focus on Operating Systems Lectures
            </h4>
            <p className="text-xs text-slate-600 mt-1 leading-relaxed">
              Operating Systems attendance is currently at 70.9% (needs 4 more classes before Nov 30 to cross the university 75% threshold).
            </p>
          </div>
          <div className="mt-3 flex items-center gap-1.5 text-[11px] font-bold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200 self-start">
            <AlertTriangle className="w-3.5 h-3.5" /> Attendance Boost Required
          </div>
        </div>

        {/* Strongest Aptitude Domain */}
        <div className="p-5 rounded-2xl bg-emerald-50/80 border border-emerald-200 flex flex-col justify-between">
          <div>
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-emerald-800 block mb-1">
              Key Academic Strength
            </span>
            <h4 className="font-bold text-emerald-950 text-sm">
              Advanced Database & Software Architecture
            </h4>
            <p className="text-xs text-emerald-800 mt-1 leading-relaxed">
              Consistently scoring 92%+ in database modeling, relational calculus, and practical full-stack labs.
            </p>
          </div>
          <div className="mt-3 flex items-center gap-1.5 text-[11px] font-bold text-emerald-700 self-start">
            <CheckCircle2 className="w-3.5 h-3.5" /> Faculty Commendation Recorded
          </div>
        </div>
      </div>

      {/* Top 3 AI Industry Career Pathways */}
      <div className="space-y-3 pt-2">
        <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
          <Briefcase className="w-4 h-4 text-amber-600" />
          Recommended Placement & Industry Career Alignments
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {careerPaths.map((cp, idx) => (
            <div key={idx} className="p-4 bg-white rounded-2xl border border-slate-200 space-y-2 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-amber-100 text-amber-900">
                    {cp.match}
                  </span>
                  <span className="text-[10px] font-semibold text-slate-400">Option #{idx + 1}</span>
                </div>
                <h5 className="font-bold text-slate-900 text-xs leading-snug">{cp.title}</h5>
                <p className="text-[11px] text-slate-600 mt-1 leading-normal">{cp.rationale}</p>
              </div>
              <div className="pt-2 border-t border-slate-100 text-[10px] text-slate-500">
                <p className="font-bold text-slate-700">{cp.demand}</p>
                <p className="truncate text-slate-400 mt-0.5">Focus: {cp.skillsToKeepSharpening}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
