import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Users,
  GraduationCap,
  Calendar,
  Bell,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  FileText,
  Download,
  Phone,
  Mail,
  Clock,
  Send,
  CreditCard,
  ChevronRight,
  BookOpen,
  AlertCircle,
  PlusCircle,
  Award,
  Sparkles
} from 'lucide-react';
import ParentCareerAdvisory from '../components/ParentCareerAdvisory';
import PaymentGatewayModal from '../components/modals/PaymentGatewayModal';

export default function ParentView() {
  const {
    currentCollege,
    announcements,
    wardData: baseWardData,
    leaveRequests,
    submitLeaveRequest,
    showToast,
    students,
    authenticatedSessions,
    feeStructures
  } = useApp();

  const activeWard = authenticatedSessions?.parent?.ward || students[0];
  const guardianName = activeWard.parentName || `Guardian of ${activeWard.name}`;

  // Dynamically tailor wardData to the authenticated ward!
  const wardData = {
    ...baseWardData,
    name: activeWard.name,
    rollNo: activeWard.enrollmentNo,
    course: `${activeWard.department || 'BCA'} Degree Program`,
    semester: activeWard.semester || 3,
    overallAttendance: parseInt(activeWard.attendance) || 88,
    mentor: activeWard.department === 'B.Tech CSE' ? 'Prof. Neha Gupta' : 'Dr. Ananya Pandey'
  };

  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'attendance' | 'academics' | 'fees' | 'advisory' | 'leaves' | 'mentor'
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  
  // Leave form state
  const [leaveForm, setLeaveForm] = useState({
    type: 'Medical Leave',
    startDate: '',
    endDate: '',
    days: 1,
    reason: ''
  });

  // Mentor message state
  const [mentorMessage, setMentorMessage] = useState('');
  const [isSendingMessage, setIsSendingMessage] = useState(false);

  const handleLeaveSubmit = (e) => {
    e.preventDefault();
    if (!leaveForm.startDate || !leaveForm.endDate || !leaveForm.reason.trim()) {
      showToast('Please fill all leave dates and reason.', 'error');
      return;
    }
    submitLeaveRequest(leaveForm);
    setLeaveForm({
      type: 'Medical Leave',
      startDate: '',
      endDate: '',
      days: 1,
      reason: ''
    });
  };

  const handleDownloadReceipt = (receiptId, title) => {
    showToast(`Downloading official fee receipt: ${receiptId} (${title})...`, 'info');
    setTimeout(() => {
      showToast(`Receipt ${receiptId} downloaded successfully!`, 'success');
    }, 1200);
  };

  const handleSendMentorMessage = (e) => {
    e.preventDefault();
    if (!mentorMessage.trim()) return;
    setIsSendingMessage(true);
    setTimeout(() => {
      setIsSendingMessage(false);
      setMentorMessage('');
      showToast(`Message delivered to Mentor ${wardData.mentor}! You will receive an SMS reply shortly.`, 'success');
    }, 1000);
  };

  // Find any danger subjects (<75%)
  const dangerSubjects = wardData.subjectAttendance.filter(s => s.percentage < wardData.minRequiredAttendance);

  return (
    <div className="space-y-6">
      {/* Parent Header Banner */}
      <div className="bg-gradient-to-r from-amber-900 via-orange-950 to-slate-900 rounded-3xl p-6 md:p-8 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-bold uppercase tracking-wider mb-2">
            <Users className="w-3.5 h-3.5" />
            Guardian & Parent Oversight Portal
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">
            Welcome, {guardianName}
          </h1>
          <p className="text-xs text-amber-200 mt-1 max-w-xl">
            Ward: <strong className="text-white font-semibold">{wardData.name}</strong> • Roll No: <span className="font-mono font-bold text-white bg-white/20 px-1.5 py-0.5 rounded">{wardData.rollNo}</span> • {wardData.course} (Sem {wardData.semester}) • {currentCollege?.name || 'AITM Bhopal'}
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap items-center gap-2 p-1.5 bg-slate-900/60 backdrop-blur-md rounded-2xl border border-white/10 self-start md:self-auto">
          {[
            { id: 'overview', label: 'Overview' },
            { id: 'attendance', label: 'Live Attendance' },
            { id: 'academics', label: 'Report Card' },
            { id: 'fees', label: 'Fees & Online Pay' },
            { id: 'advisory', label: 'AI Career Roadmap' },
            { id: 'leaves', label: `Leaves (${leaveRequests.length})` },
            { id: 'mentor', label: 'Mentor Connect' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === tab.id
                  ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Low Attendance Alert Bar (if any subject < 75%) */}
      {dangerSubjects.length > 0 && (
        <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-2xl shadow-sm flex items-start justify-between gap-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5 shrink-0" />
            <div>
              <h4 className="text-sm font-bold text-amber-900">
                Attendance Shortage Notice: {dangerSubjects.map(s => s.name).join(', ')}
              </h4>
              <p className="text-xs text-amber-800 mt-0.5">
                University regulation requires a minimum of {wardData.minRequiredAttendance}% attendance to appear in final exams. Rohan is currently at {dangerSubjects[0].percentage}% in {dangerSubjects[0].name}. Needs {dangerSubjects[0].classesNeeded || 3} more consecutive classes to reach safe zone.
              </p>
            </div>
          </div>
          <button
            onClick={() => setActiveTab('attendance')}
            className="shrink-0 px-3 py-1.5 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold rounded-xl transition-all"
          >
            Inspect Subject Details
          </button>
        </div>
      )}

      {/* Top 4 KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Attendance */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm relative overflow-hidden">
          <div className="flex items-center justify-between">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Overall Attendance</p>
            <span className="p-2 rounded-xl bg-emerald-50 text-emerald-600 font-bold text-xs">Safe Zone</span>
          </div>
          <h3 className="text-3xl font-extrabold text-slate-900 mt-2">
            {wardData.overallAttendance}%
          </h3>
          <div className="w-full bg-slate-100 rounded-full h-2 mt-3 overflow-hidden">
            <div
              className={`h-full rounded-full transition-all ${
                wardData.overallAttendance >= 75 ? 'bg-emerald-500' : 'bg-amber-500'
              }`}
              style={{ width: `${Math.min(100, wardData.overallAttendance)}%` }}
            />
          </div>
          <p className="text-[11px] text-slate-500 mt-2 flex items-center justify-between">
            <span>Min Required: {wardData.minRequiredAttendance}%</span>
            <span className="text-emerald-600 font-semibold">+13.5% above cutoff</span>
          </p>
        </div>

        {/* Academic SGPA */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Current Term SGPA</p>
            <Award className="w-5 h-5 text-indigo-500" />
          </div>
          <h3 className="text-3xl font-extrabold text-indigo-600 mt-2">
            {wardData.currentSGPA} <span className="text-sm font-semibold text-slate-400">/ 10</span>
          </h3>
          <p className="text-xs text-slate-600 mt-3">
            Overall CGPA: <strong className="text-slate-900">{wardData.cgpa}</strong> • <span className="text-emerald-600 font-bold">0 Backlogs</span>
          </p>
          <p className="text-[11px] text-slate-400 mt-1">Class Rank: Top 8% of BCA Cohort</p>
        </div>

        {/* Fee Dues */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Fee Account Status</p>
            <CreditCard className="w-5 h-5 text-emerald-500" />
          </div>
          <h3 className="text-3xl font-extrabold text-emerald-600 mt-2">
            ₹0.00
          </h3>
          <p className="text-xs text-slate-600 mt-3 flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            <span className="font-semibold text-slate-800">100% Cleared for Term</span>
          </p>
          <p className="text-[11px] text-slate-400 mt-1">Receipt #{wardData.receipts[0]?.id}</p>
        </div>

        {/* Class Mentor */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Assigned Mentor</p>
            <ShieldCheck className="w-5 h-5 text-amber-500" />
          </div>
          <h3 className="text-base font-extrabold text-slate-900 mt-2 truncate">
            {wardData.mentor}
          </h3>
          <p className="text-xs text-slate-500 mt-1">HOD, Dept of Computer Applications</p>
          <div className="mt-3 flex items-center gap-2">
            <button
              onClick={() => setActiveTab('mentor')}
              className="text-xs font-bold text-amber-600 hover:text-amber-700 inline-flex items-center gap-1"
            >
              Direct Message <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* TAB 1: OVERVIEW */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Attendance Activity */}
          <div className="lg:col-span-2 bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-slate-900">Recent Class Attendance Log</h3>
                <p className="text-xs text-slate-500">Live timestamped entries recorded by course faculty in classroom</p>
              </div>
              <button
                onClick={() => setActiveTab('attendance')}
                className="text-xs font-bold text-indigo-600 hover:text-indigo-700"
              >
                View Subject-wise →
              </button>
            </div>

            <div className="divide-y divide-slate-100">
              {wardData.recentAttendanceLogs.map((log, idx) => (
                <div key={idx} className="py-3 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-xs ${
                        log.status === 'Present'
                          ? 'bg-emerald-50 text-emerald-600 border border-emerald-200'
                          : 'bg-rose-50 text-rose-600 border border-rose-200'
                      }`}
                    >
                      {log.status === 'Present' ? 'P' : 'A'}
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900">{log.subject}</h4>
                      <p className="text-[11px] text-slate-500">
                        {log.date} • {log.time} • <span className="text-slate-400">{log.method}</span>
                      </p>
                    </div>
                  </div>
                  <div>
                    <span
                      className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wide ${
                        log.status === 'Present'
                          ? 'bg-emerald-100/80 text-emerald-800'
                          : 'bg-rose-100 text-rose-700'
                      }`}
                    >
                      {log.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions & Official Notices */}
          <div className="space-y-4">
            {/* Quick Actions */}
            <div className="bg-gradient-to-br from-amber-500 to-orange-600 rounded-3xl p-6 text-white shadow-md">
              <h3 className="text-base font-bold">Quick Parent Services</h3>
              <p className="text-xs text-amber-100 mt-1">Official college requests for your ward</p>
              <div className="mt-4 space-y-2">
                <button
                  onClick={() => setActiveTab('leaves')}
                  className="w-full flex items-center justify-between p-3 rounded-2xl bg-white/10 hover:bg-white/20 backdrop-blur-sm text-xs font-bold transition-all"
                >
                  <span className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" /> Apply for Student Leave
                  </span>
                  <ChevronRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setActiveTab('fees')}
                  className="w-full flex items-center justify-between p-3 rounded-2xl bg-white/10 hover:bg-white/20 backdrop-blur-sm text-xs font-bold transition-all"
                >
                  <span className="flex items-center gap-2">
                    <Download className="w-4 h-4" /> Download Paid Fee Receipts
                  </span>
                  <ChevronRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setActiveTab('mentor')}
                  className="w-full flex items-center justify-between p-3 rounded-2xl bg-white/10 hover:bg-white/20 backdrop-blur-sm text-xs font-bold transition-all"
                >
                  <span className="flex items-center gap-2">
                    <Mail className="w-4 h-4" /> Ask Mentor Dr. Ananya
                  </span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Parent Circulars */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm space-y-3">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Bell className="w-4 h-4 text-amber-600" />
                Official Parent Circulars
              </h3>
              <div className="space-y-2 text-xs">
                {announcements.slice(0, 2).map((ann) => (
                  <div key={ann.id} className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
                    <span className="text-[10px] font-bold text-amber-700 uppercase">{ann.category}</span>
                    <h5 className="font-bold text-slate-800 mt-0.5">{ann.title}</h5>
                    <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">{ann.content}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: LIVE ATTENDANCE */}
      {activeTab === 'attendance' && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200/80 shadow-sm space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h3 className="text-xl font-extrabold text-slate-900">Subject-wise Live Attendance</h3>
                <p className="text-xs text-slate-500 mt-1">
                  Mandatory University threshold: <strong>75% per course subject</strong>. Verified via classroom authentication.
                </p>
              </div>
              <div className="flex items-center gap-4 text-xs font-bold">
                <span className="flex items-center gap-1.5 text-emerald-600">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span> Safe (≥75%)
                </span>
                <span className="flex items-center gap-1.5 text-rose-600">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span> Shortage Warning (&lt;75%)
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {wardData.subjectAttendance.map((sub, idx) => {
                const isSafe = sub.percentage >= wardData.minRequiredAttendance;
                return (
                  <div
                    key={idx}
                    className={`p-5 rounded-2xl border transition-all ${
                      isSafe
                        ? 'bg-slate-50/60 border-slate-200'
                        : 'bg-rose-50/40 border-rose-200 shadow-sm'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                          {sub.code} • Faculty: {sub.faculty}
                        </span>
                        <h4 className="text-sm font-bold text-slate-900 mt-0.5">{sub.name}</h4>
                      </div>
                      <span
                        className={`text-lg font-extrabold ${
                          isSafe ? 'text-emerald-600' : 'text-rose-600'
                        }`}
                      >
                        {sub.percentage}%
                      </span>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full bg-slate-200/80 rounded-full h-2.5 mt-3 overflow-hidden">
                      <div
                        className={`h-full rounded-full ${
                          isSafe ? 'bg-emerald-500' : 'bg-rose-500'
                        }`}
                        style={{ width: `${Math.min(100, sub.percentage)}%` }}
                      />
                    </div>

                    <div className="mt-3 flex items-center justify-between text-xs text-slate-500">
                      <span>Attended: <strong>{sub.attended}</strong> / {sub.total} Lectures</span>
                      {isSafe ? (
                        <span className="text-emerald-700 font-bold flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Eligible for Exam
                        </span>
                      ) : (
                        <span className="text-rose-600 font-bold flex items-center gap-1">
                          <AlertTriangle className="w-3.5 h-3.5" /> Attend next {sub.classesNeeded || 3} classes
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: ACADEMICS / REPORT CARD */}
      {activeTab === 'academics' && (
        <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200/80 shadow-sm space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h3 className="text-xl font-extrabold text-slate-900">Academic Scorecard & Progress</h3>
              <p className="text-xs text-slate-500 mt-1">
                Semester 3 Mid-Term Evaluated Marks & Teacher Feedback
              </p>
            </div>
            <div className="px-4 py-2 rounded-2xl bg-indigo-50 border border-indigo-100 text-xs font-bold text-indigo-700">
              Projected Term SGPA: 8.4 / 10.0
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider border-b border-slate-200">
                <tr>
                  <th className="py-3 px-4">Subject</th>
                  <th className="py-3 px-4">Mid-Term (30)</th>
                  <th className="py-3 px-4">Internal Quiz (20)</th>
                  <th className="py-3 px-4">Grade</th>
                  <th className="py-3 px-4">Faculty Remarks</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                {wardData.academicGrades.map((grade, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/50">
                    <td className="py-3.5 px-4 font-bold text-slate-900">
                      {grade.subject}
                      <span className="block text-[11px] font-normal text-slate-400">{grade.code}</span>
                    </td>
                    <td className="py-3.5 px-4 font-bold text-indigo-600">
                      {grade.midTerm} / {grade.maxMid}
                    </td>
                    <td className="py-3.5 px-4 font-bold text-slate-800">
                      {grade.internalQuiz} / {grade.maxQuiz}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 font-extrabold text-xs border border-emerald-200">
                        {grade.grade}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-slate-600 text-[11px] max-w-xs">
                      {grade.remarks}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 4: FEES & DUES */}
      {activeTab === 'fees' && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200/80 shadow-sm space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h3 className="text-xl font-extrabold text-slate-900">College Fee Ledger & Receipts</h3>
                <p className="text-xs text-slate-500 mt-1">
                  Complete breakdown of tuition, computer labs, library and university fees for Academic Year 2026.
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <span className="px-4 py-2 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold inline-flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" /> All Dues Cleared
                </span>
                <button
                  onClick={() => setIsPaymentModalOpen(true)}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs shadow-md shadow-amber-600/25 transition-all hover:scale-[1.02]"
                >
                  <CreditCard className="w-4 h-4" />
                  Pay Ward Fees Online
                </button>
              </div>
            </div>

            {/* Fee summary breakdown */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <span className="text-xs font-bold text-slate-400 uppercase">Total Annual Fee</span>
                <h4 className="text-2xl font-extrabold text-slate-900 mt-1">
                  ₹{((feeStructures?.find(f => f.department === (activeWard?.department || 'BCA'))?.totalFee) || wardData.totalFee).toLocaleString('en-IN')}
                </h4>
                <p className="text-[11px] text-slate-500 mt-1">{activeWard.department || 'BCA'} (Sem {wardData.semester})</p>
              </div>
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200">
                <span className="text-xs font-bold text-emerald-600 uppercase">Paid Amount</span>
                <h4 className="text-2xl font-extrabold text-emerald-700 mt-1">₹{wardData.paidFee.toLocaleString('en-IN')}</h4>
                <p className="text-[11px] text-emerald-600 mt-1">Verified via Online Gateway</p>
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <span className="text-xs font-bold text-slate-400 uppercase">Outstanding Balance</span>
                <h4 className="text-2xl font-extrabold text-slate-900 mt-1">₹{wardData.pendingFee || 0}</h4>
                <p className="text-[11px] text-emerald-600 font-semibold mt-1">Next installment: July 2027</p>
              </div>
            </div>

            {/* Stream fee structure breakdown */}
            <div className="p-4 rounded-2xl bg-slate-50/80 border border-slate-200 text-xs space-y-2">
              <h4 className="font-bold text-slate-800 uppercase tracking-wider text-[11px]">
                Configured Fee Structure for {activeWard?.department || 'BCA'}:
              </h4>
              {(() => {
                const streamFee = feeStructures?.find(f => f.department === (activeWard?.department || 'BCA')) || feeStructures?.[0];
                return (
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1">
                    <div className="bg-white p-3 rounded-xl border border-slate-200">
                      <span className="text-slate-500 block">Tuition Fee</span>
                      <strong className="text-sm font-bold text-slate-900">₹{streamFee?.tuitionFee?.toLocaleString('en-IN')}</strong>
                    </div>
                    <div className="bg-white p-3 rounded-xl border border-slate-200">
                      <span className="text-slate-500 block">Lab & E-Library</span>
                      <strong className="text-sm font-bold text-slate-900">₹{streamFee?.labLibraryFee?.toLocaleString('en-IN')}</strong>
                    </div>
                    <div className="bg-white p-3 rounded-xl border border-slate-200">
                      <span className="text-slate-500 block">Exam & Assessment</span>
                      <strong className="text-sm font-bold text-slate-900">₹{streamFee?.examFee?.toLocaleString('en-IN')}</strong>
                    </div>
                    <div className="bg-white p-3 rounded-xl border border-slate-200">
                      <span className="text-slate-500 block">Campus Development</span>
                      <strong className="text-sm font-bold text-slate-900">₹{streamFee?.developmentFee?.toLocaleString('en-IN')}</strong>
                    </div>
                  </div>
                );
              })()}
            </div>

            {/* Receipts table */}
            <div className="mt-6">
              <h4 className="text-sm font-bold text-slate-900 mb-3">Official Digital Receipts</h4>
              <div className="divide-y divide-slate-100 border border-slate-200 rounded-2xl overflow-hidden">
                {wardData.receipts.map((rec) => (
                  <div key={rec.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white hover:bg-slate-50 transition-all">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-indigo-600">{rec.id}</span>
                        <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold">
                          {rec.status}
                        </span>
                      </div>
                      <h5 className="text-xs font-bold text-slate-800 mt-1">{rec.type}</h5>
                      <p className="text-[11px] text-slate-400">Payment Date: {rec.date} • Mode: Net Banking / UPI</p>
                    </div>

                    <div className="flex items-center gap-4">
                      <span className="text-sm font-extrabold text-slate-900">
                        ₹{rec.amount.toLocaleString('en-IN')}
                      </span>
                      <button
                        onClick={() => handleDownloadReceipt(rec.id, rec.type)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-all shadow-sm"
                      >
                        <Download className="w-3.5 h-3.5" />
                        Download PDF
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB: AI CAREER ROADMAP & ACADEMIC ADVISORY */}
      {activeTab === 'advisory' && (
        <ParentCareerAdvisory />
      )}

      {/* TAB 5: LEAVES */}
      {activeTab === 'leaves' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Apply Form */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm space-y-4">
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-amber-600" />
              Apply Leave for Ward
            </h3>
            <p className="text-xs text-slate-500">
              Applications are reviewed directly by Mentor Dr. Ananya Pandey and department HOD.
            </p>

            <form onSubmit={handleLeaveSubmit} className="space-y-3 pt-2">
              <div>
                <label className="text-xs font-bold text-slate-700">Leave Reason / Type</label>
                <select
                  value={leaveForm.type}
                  onChange={(e) => setLeaveForm({ ...leaveForm, type: e.target.value })}
                  className="w-full mt-1 px-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500"
                >
                  <option value="Medical Leave">Medical Leave (Doctor / Health)</option>
                  <option value="Family Function">Family Event / Function</option>
                  <option value="Emergency Leave">Personal / Emergency</option>
                  <option value="Competitive Exam">External Entrance/Govt Exam</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-xs font-bold text-slate-700">Start Date</label>
                  <input
                    type="date"
                    value={leaveForm.startDate}
                    onChange={(e) => setLeaveForm({ ...leaveForm, startDate: e.target.value })}
                    className="w-full mt-1 px-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500"
                    required
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700">End Date</label>
                  <input
                    type="date"
                    value={leaveForm.endDate}
                    onChange={(e) => setLeaveForm({ ...leaveForm, endDate: e.target.value })}
                    className="w-full mt-1 px-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700">Detailed Reason</label>
                <textarea
                  rows={3}
                  value={leaveForm.reason}
                  onChange={(e) => setLeaveForm({ ...leaveForm, reason: e.target.value })}
                  placeholder="Explain reason for absence..."
                  className="w-full mt-1 px-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 px-4 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs transition-all shadow-md shadow-amber-600/20"
              >
                Submit Leave Application
              </button>
            </form>
          </div>

          {/* Past Leaves List */}
          <div className="lg:col-span-2 bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm space-y-4">
            <h3 className="text-lg font-bold text-slate-900">Application History & Status</h3>
            <div className="space-y-3">
              {leaveRequests.map((leave) => (
                <div key={leave.id} className="p-4 rounded-2xl border border-slate-200/80 bg-slate-50/50 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-slate-900">{leave.type}</span>
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        leave.status === 'Approved'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {leave.status}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600">{leave.reason}</p>
                  <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1 border-t border-slate-200/60">
                    <span>
                      Dates: <strong>{leave.startDate}</strong> to <strong>{leave.endDate}</strong> ({leave.days || 1} Days)
                    </span>
                    <span>Reviewer: {leave.approvedBy}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 6: MENTOR CONNECT */}
      {activeTab === 'mentor' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Mentor Profile */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-xl">
              AP
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">{wardData.mentor}</h3>
              <p className="text-xs text-slate-500 font-medium">{wardData.mentorDesignation}</p>
              <p className="text-[11px] text-slate-400 mt-1">Official Faculty Mentor for BCA Cohort 2023-2026</p>
            </div>

            <div className="space-y-2 pt-2 border-t border-slate-100 text-xs">
              <div className="flex items-center gap-2 text-slate-700">
                <Phone className="w-4 h-4 text-emerald-600" />
                <span>{wardData.mentorPhone}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-700">
                <Mail className="w-4 h-4 text-indigo-600" />
                <span>{wardData.mentorEmail}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-700">
                <Clock className="w-4 h-4 text-amber-600" />
                <span>Office Hours: 02:00 PM - 04:00 PM (Mon-Fri)</span>
              </div>
            </div>
          </div>

          {/* Send Message to Mentor */}
          <div className="lg:col-span-2 bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm space-y-4">
            <h3 className="text-lg font-bold text-slate-900">Direct Communication Channel</h3>
            <p className="text-xs text-slate-500">
              Send questions regarding your ward's attendance, internal exam scores, or request an in-person Parent-Teacher meeting.
            </p>

            <form onSubmit={handleSendMentorMessage} className="space-y-3 pt-2">
              <textarea
                rows={5}
                value={mentorMessage}
                onChange={(e) => setMentorMessage(e.target.value)}
                placeholder="Write your message or inquiry for Dr. Ananya Pandey..."
                className="w-full px-4 py-3 text-xs rounded-2xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500"
                required
              />
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={isSendingMessage}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs transition-all shadow-md shadow-amber-600/20 disabled:opacity-50"
                >
                  <Send className="w-3.5 h-3.5" />
                  {isSendingMessage ? 'Sending...' : 'Send Message to Mentor'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <PaymentGatewayModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        payerType="Parent"
        studentName={activeWard.name}
        rollNo={activeWard.enrollmentNo}
        amount={wardData.pendingFee > 0 ? wardData.pendingFee : ((feeStructures?.find(f => f.department === (activeWard?.department || 'BCA'))?.totalFee) || 35000)}
        course={wardData.course}
      />
    </div>
  );
}
