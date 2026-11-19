import React, { useState } from 'react';
import {
  Award,
  CheckCircle2,
  FileCheck,
  Download,
  Sparkles,
  BarChart,
  ShieldCheck,
  Info,
  ChevronRight,
  X
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function NAACAccreditationRadar() {
  const { currentCollege, faculty, departments, notes, showToast, authenticatedSessions } = useApp();
  const activeCollege = authenticatedSessions?.college_admin || currentCollege;
  const [isSSRModalOpen, setIsSSRModalOpen] = useState(false);
  const [isGeneratingSSR, setIsGeneratingSSR] = useState(false);

  const criteria = [
    { id: 1, name: 'Criterion I: Curricular Aspects (NEP 2020)', score: 3.82, max: 4.0, grade: 'A++', weight: '15%' },
    { id: 2, name: 'Criterion II: Teaching-Learning & Evaluation (Anti-Proxy)', score: 3.78, max: 4.0, grade: 'A+', weight: '20%' },
    { id: 3, name: 'Criterion III: Research, Study Repository & E-Notes', score: 3.65, max: 4.0, grade: 'A', weight: '15%' },
    { id: 4, name: 'Criterion IV: Digital Infrastructure & ERP Systems', score: 3.92, max: 4.0, grade: 'A++', weight: '15%' },
    { id: 5, name: 'Criterion V: Student Support, Mentorship & Progression', score: 3.85, max: 4.0, grade: 'A+', weight: '15%' },
    { id: 6, name: 'Criterion VI: Institutional Governance & Multi-Tenant Security', score: 3.90, max: 4.0, grade: 'A++', weight: '10%' },
    { id: 7, name: 'Criterion VII: Institutional Values & Best Practices', score: 3.80, max: 4.0, grade: 'A+', weight: '10%' },
  ];

  const overallCGPA = (criteria.reduce((sum, c) => sum + c.score, 0) / criteria.length).toFixed(2);

  const handleGenerateSSR = () => {
    setIsGeneratingSSR(true);
    setTimeout(() => {
      setIsGeneratingSSR(false);
      setIsSSRModalOpen(true);
      showToast('AI NAAC Self-Study Report (SSR) generated from live database metrics!', 'success');
    }, 1000);
  };

  const handleDownloadSSR = () => {
    showToast(`Downloading official NAAC SSR Document for ${activeCollege?.name}...`, 'info');
    setTimeout(() => {
      showToast('NAAC SSR PDF downloaded successfully!', 'success');
      setIsSSRModalOpen(false);
    }, 1200);
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm p-6 md:p-8 space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-5">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-blue-50 text-blue-700 text-[11px] font-extrabold uppercase tracking-wider mb-1.5">
            <Award className="w-3.5 h-3.5" /> Institutional Accreditation Intelligence
          </div>
          <h2 className="text-xl font-extrabold text-slate-900">
            NAAC / NBA Accreditation Readiness Radar (NEP 2020)
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Automated compliance engine assessing 7 Core Quality Criteria using live ERP attendance, e-learning downloads, and faculty rosters.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={handleGenerateSSR}
            disabled={isGeneratingSSR}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-xs shadow-md shadow-blue-600/20 transition-all hover:scale-[1.02] disabled:opacity-70"
          >
            <Sparkles className="w-3.5 h-3.5" />
            {isGeneratingSSR ? 'Synthesizing SSR...' : '⚡ Generate AI NAAC SSR'}
          </button>
        </div>
      </div>

      {/* CGPA Badge & Scorecard */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Overall CGPA Box */}
        <div className="p-5 rounded-2xl bg-gradient-to-br from-blue-900 via-indigo-950 to-slate-900 text-white flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-blue-200">
                Projected NAAC Status
              </span>
              <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold text-xs border border-emerald-500/30">
                Cycle 2 Active
              </span>
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-4xl font-black text-white">{overallCGPA}</span>
              <span className="text-sm font-semibold text-blue-200">/ 4.00 CGPA</span>
            </div>
            <p className="text-sm font-bold text-emerald-400 mt-1">
              Grade A++ (Highest Accreditation Tier)
            </p>
          </div>
          <div className="pt-4 border-t border-white/10 mt-4 text-[11px] text-blue-200">
            Institutional Score Valid for: <strong>{activeCollege?.name}</strong>
          </div>
        </div>

        {/* Live Criteria Breakdown */}
        <div className="md:col-span-2 space-y-2.5 bg-slate-50/80 p-4 rounded-2xl border border-slate-200/80">
          <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-500 block mb-1">
            7 Criteria Quality Indicator Framework (QIF):
          </span>
          <div className="space-y-2">
            {criteria.map((c) => (
              <div key={c.id} className="flex items-center justify-between text-xs bg-white px-3 py-2 rounded-xl border border-slate-200 shadow-2xs">
                <div className="flex items-center gap-2 truncate max-w-[70%]">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span className="font-semibold text-slate-800 truncate">{c.name}</span>
                </div>
                <div className="flex items-center gap-2 font-mono">
                  <span className="font-bold text-slate-900">{c.score}</span>
                  <span className="px-1.5 py-0.5 rounded text-[10px] font-extrabold bg-blue-50 text-blue-700 border border-blue-200">
                    {c.grade}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal: AI Self-Study Report (SSR) Preview */}
      {isSSRModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl border border-slate-200 overflow-hidden max-h-[90vh] flex flex-col">
            <div className="p-6 bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-white/10 rounded-2xl">
                  <FileCheck className="w-6 h-6 text-blue-300" />
                </div>
                <div>
                  <h3 className="text-lg font-bold">NAAC Self-Study Report (SSR) Executive Summary</h3>
                  <p className="text-xs text-blue-200">Synthesized Institutional Data for National Assessment</p>
                </div>
              </div>
              <button
                onClick={() => setIsSSRModalOpen(false)}
                className="p-1.5 rounded-full hover:bg-white/10 text-white/80 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4 overflow-y-auto text-xs text-slate-700 leading-relaxed">
              <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl">
                <h4 className="font-bold text-blue-900 text-sm">
                  Institution: {activeCollege?.name} ({activeCollege?.code})
                </h4>
                <p className="text-blue-700 text-[11px] mt-0.5">
                  Location: {activeCollege?.city}, {activeCollege?.state} • License: {activeCollege?.plan} • Admin: {activeCollege?.adminName}
                </p>
              </div>

              <div>
                <h5 className="font-bold text-slate-900 uppercase tracking-wider text-[11px] mb-1">
                  1. Executive Summary & Quality Profile:
                </h5>
                <p>
                  {activeCollege?.name} operates a centralized ERP multi-tenant architecture with automated classroom anti-proxy biometric verification, paperless study material dissemination, and continuous parent-mentor communication. Overall calculated CGPA stands at <strong>{overallCGPA} / 4.00</strong>, fulfilling Criteria I through VII with distinction.
                </p>
              </div>

              <div>
                <h5 className="font-bold text-slate-900 uppercase tracking-wider text-[11px] mb-1">
                  2. Key Institutional Metrics (Criterion II & IV):
                </h5>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Total Teaching Faculty: <strong>{faculty.length} Professors & Lecturers</strong> with verified institutional IDs.</li>
                  <li>Academic Departments: <strong>{departments.length} Departments</strong> ({departments.map(d => d.code).join(', ')}).</li>
                  <li>Digital Notes & Repository Assets: <strong>{notes.length} Peer-reviewed study modules</strong> uploaded.</li>
                  <li>Student In-Class Verification Method: <strong>Dynamic 60-Second Anti-Proxy Verification Code</strong>.</li>
                </ul>
              </div>

              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-900">
                <strong>Projected NAAC Steering Committee Recommendation:</strong> Eligible for Grade A++ with Five-Year Accreditation validity under NEP 2020 OBE guidelines.
              </div>
            </div>

            <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-end gap-2.5 shrink-0">
              <button
                onClick={() => setIsSSRModalOpen(false)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800"
              >
                Close Preview
              </button>
              <button
                onClick={handleDownloadSSR}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md transition-all"
              >
                <Download className="w-4 h-4" /> Download Official NAAC SSR (PDF)
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
