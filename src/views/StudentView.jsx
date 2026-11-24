import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  BookOpen,
  Calendar,
  Bell,
  Search,
  Download,
  Eye,
  CheckCircle2,
  Clock,
  Sparkles,
  MapPin,
  FileText,
  User,
  ExternalLink,
  Award,
  Filter,
  ShieldCheck,
  AlertTriangle,
  CreditCard,
  Mic,
  Receipt
} from 'lucide-react';
import ViewNoteModal from '../components/modals/ViewNoteModal';
import StudentVivaSimulator from '../components/StudentVivaSimulator';
import PaymentGatewayModal from '../components/modals/PaymentGatewayModal';

export default function StudentView() {
  const {
    notes,
    events,
    announcements,
    toggleEventRegistration,
    currentCollege,
    wardData,
    activeAttendanceSession,
    studentMarkAttendance,
    students,
    authenticatedSessions,
    feeStructures,
    showToast
  } = useApp();

  const activeStudent = authenticatedSessions?.student || students[0];

  const [activeTab, setActiveTab] = useState('notes'); // 'notes' | 'attendance' | 'viva' | 'fees' | 'events' | 'circulars'
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [selectedSemester, setSelectedSemester] = useState('3');
  const [searchQuery, setSearchQuery] = useState('');
  const [readingNote, setReadingNote] = useState(null);
  const [enteredCode, setEnteredCode] = useState('');
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  const handleVerifyPresence = (e) => {
    e.preventDefault();
    if (!enteredCode.trim()) return;
    const ok = studentMarkAttendance(enteredCode);
    if (ok) {
      setEnteredCode('');
    }
  };

  // Filter notes
  const filteredNotes = notes.filter((note) => {
    const matchesSubject = selectedSubject === 'all' || note.subject === selectedSubject;
    const matchesSem = selectedSemester === 'all' || note.semester.toString() === selectedSemester;
    const matchesSearch =
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.unit.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSubject && matchesSem && matchesSearch;
  });

  // Extract unique subjects
  const subjectsList = Array.from(new Set(notes.map((n) => n.subject)));

  return (
    <div className="space-y-6">
      {/* Student Welcome Banner */}
      <div className="bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 rounded-3xl p-6 md:p-8 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold uppercase tracking-wider mb-2">
            Student Learning Portal
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">
            Hi {activeStudent?.name || 'Student'} 👋
          </h1>
          <p className="text-xs text-emerald-200 mt-1 max-w-xl">
            {activeStudent?.department || 'BCA'} {activeStudent?.semester ? `Sem ${activeStudent.semester}` : '3rd Sem'} (Sec {activeStudent?.section || 'A'}) • Roll No: <span className="font-mono font-bold text-white bg-white/20 px-1.5 py-0.5 rounded">{activeStudent?.enrollmentNo || '0103CA231045'}</span> • Attendance: <strong className="text-emerald-300 font-bold">{activeStudent?.attendance || '88%'}</strong> • {currentCollege?.name || 'AITM Bhopal'}.
          </p>
        </div>

        {/* Tab Switcher Pills */}
        <div className="flex flex-wrap items-center gap-2 p-1.5 bg-slate-900/60 backdrop-blur-md rounded-2xl border border-white/10 self-start md:self-auto">
          <button
            onClick={() => setActiveTab('notes')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'notes'
                ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/30'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            Study Notes ({notes.length})
          </button>
          <button
            onClick={() => setActiveTab('attendance')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'attendance'
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/30'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            Live Attendance ({wardData?.overallAttendance || 88.5}%)
          </button>
          <button
            onClick={() => setActiveTab('viva')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'viva'
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            <Mic className="w-3.5 h-3.5 text-emerald-300" />
            AI Viva Arena
          </button>
          <button
            onClick={() => setActiveTab('fees')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'fees'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            <CreditCard className="w-3.5 h-3.5" />
            Fees & Pay
          </button>
          <button
            onClick={() => setActiveTab('events')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'events'
                ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            <Calendar className="w-3.5 h-3.5" />
            Events ({events.length})
          </button>
          <button
            onClick={() => setActiveTab('circulars')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'circulars'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            <Bell className="w-3.5 h-3.5" />
            Notices ({announcements.length})
          </button>
        </div>
      </div>

      {/* TAB 1: NOTES (Solves WhatsApp Clutter) */}
      {activeTab === 'notes' && (
        <div className="space-y-4">
          {/* Filter Bar */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col md:flex-row items-center justify-between gap-3">
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search notes by topic, unit, formula..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600"
              />
            </div>

            <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
              <select
                value={selectedSemester}
                onChange={(e) => setSelectedSemester(e.target.value)}
                className="px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
              >
                <option value="all">All Semesters</option>
                {[1, 2, 3, 4, 5, 6].map((s) => (
                  <option key={s} value={s}>
                    Semester {s}
                  </option>
                ))}
              </select>

              <select
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                className="px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
              >
                <option value="all">All Subjects</option>
                {subjectsList.map((sub, idx) => (
                  <option key={idx} value={sub}>
                    {sub}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Notes Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
            {filteredNotes.map((note) => (
              <div
                key={note.id}
                className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="px-2.5 py-1 text-xs font-bold text-emerald-700 bg-emerald-50 rounded-lg border border-emerald-200">
                      {note.unit}
                    </span>
                    <span className="text-xs font-medium text-slate-400">
                      Sem {note.semester} • {note.date}
                    </span>
                  </div>

                  <h3 className="font-bold text-slate-900 text-base leading-snug hover:text-emerald-600 transition-colors">
                    {note.title}
                  </h3>

                  <p className="text-xs text-indigo-600 font-semibold mt-1 flex items-center gap-1">
                    <BookOpen className="w-3.5 h-3.5" /> {note.subject}
                  </p>

                  <p className="text-xs text-slate-600 mt-2 line-clamp-2 leading-relaxed">
                    {note.description}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1 text-slate-500">
                    <User className="w-3.5 h-3.5 text-slate-400" />
                    <span className="truncate max-w-[140px]">{note.uploadedBy}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setReadingNote(note)}
                      className="px-3 py-1.5 font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 rounded-xl transition-all flex items-center gap-1 text-xs"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      Read
                    </button>
                    <button
                      onClick={() => {
                        showToast(`Preparing "${note.title}.pdf" for download...`, 'info');
                        setTimeout(() => showToast(`"${note.title}.pdf" downloaded successfully!`, 'success'), 1200);
                      }}
                      className="px-3 py-1.5 font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-sm transition-all flex items-center gap-1 text-xs"
                    >
                      <Download className="w-3.5 h-3.5" />
                      PDF
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: IN-CLASS ATTENDANCE VERIFICATION */}
      {activeTab === 'attendance' && (
        <div className="space-y-6">
          {/* Smart Classroom Check-in Form */}
          <div className="bg-gradient-to-br from-amber-500 via-orange-500 to-amber-600 rounded-3xl p-6 md:p-8 text-white shadow-xl">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-bold uppercase tracking-wider">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Anti-Proxy Classroom Check-In
                </div>
                <h3 className="text-xl md:text-2xl font-extrabold">
                  Verify Your Physical Presence in Class
                </h3>
                <p className="text-xs text-amber-100 max-w-xl">
                  {activeAttendanceSession?.active ? (
                    <>
                      Active Lecture Session: <strong className="text-white">{activeAttendanceSession.subject}</strong> by {activeAttendanceSession.faculty}. Enter the 4-digit code displayed on the screen.
                    </>
                  ) : (
                    'No active class session right now. Once your faculty starts roll-call, enter the dynamic code here.'
                  )}
                </p>
              </div>

              {/* Code Input Form */}
              <form onSubmit={handleVerifyPresence} className="flex items-center gap-2 bg-white/10 backdrop-blur-md p-2 rounded-2xl border border-white/20">
                <input
                  type="text"
                  maxLength={6}
                  placeholder="e.g. 8492"
                  value={enteredCode}
                  onChange={(e) => setEnteredCode(e.target.value)}
                  className="w-32 px-4 py-2.5 rounded-xl bg-white text-slate-900 font-mono font-extrabold text-base tracking-widest text-center focus:outline-none focus:ring-2 focus:ring-white"
                />
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-slate-950 hover:bg-slate-900 text-white font-bold text-xs rounded-xl shadow-md transition-all hover:scale-[1.02]"
                >
                  Mark Present
                </button>
              </form>
            </div>
          </div>

          {/* Subject Attendance Breakdown Cards */}
          <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200/80 shadow-sm space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-lg font-bold text-slate-900">Your Course Attendance Status</h4>
                <p className="text-xs text-slate-500">Minimum 75% attendance required for semester exam eligibility</p>
              </div>
              <div className="text-right">
                <span className="text-xs font-bold text-slate-400 uppercase">Overall Attendance</span>
                <p className="text-2xl font-extrabold text-emerald-600">{wardData?.overallAttendance || 88.5}%</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {wardData?.subjectAttendance?.map((sub, idx) => {
                const isSafe = sub.percentage >= (wardData.minRequiredAttendance || 75);
                return (
                  <div
                    key={idx}
                    className={`p-5 rounded-2xl border ${
                      isSafe ? 'bg-slate-50/50 border-slate-200' : 'bg-rose-50/40 border-rose-200 shadow-sm'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                          {sub.code} • {sub.faculty}
                        </span>
                        <h5 className="text-sm font-bold text-slate-900 mt-0.5">{sub.name}</h5>
                      </div>
                      <span className={`text-base font-extrabold ${isSafe ? 'text-emerald-600' : 'text-rose-600'}`}>
                        {sub.percentage}%
                      </span>
                    </div>

                    <div className="w-full bg-slate-200 rounded-full h-2 mt-3 overflow-hidden">
                      <div
                        className={`h-full rounded-full ${isSafe ? 'bg-emerald-500' : 'bg-rose-500'}`}
                        style={{ width: `${Math.min(100, sub.percentage)}%` }}
                      />
                    </div>

                    <div className="mt-3 flex items-center justify-between text-xs text-slate-500">
                      <span>Attended: <strong>{sub.attended}</strong> / {sub.total} Classes</span>
                      {isSafe ? (
                        <span className="text-emerald-600 font-bold flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Exam Safe
                        </span>
                      ) : (
                        <span className="text-rose-600 font-bold flex items-center gap-1">
                          <AlertTriangle className="w-3.5 h-3.5" /> Shortage Warning!
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

      {/* TAB 3: EVENTS & HACKATHONS */}
      {activeTab === 'events' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {events.map((evt) => (
            <div
              key={evt.id}
              className="bg-white rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden flex flex-col justify-between"
            >
              <div className={`p-5 bg-gradient-to-r ${evt.bannerColor} text-white`}>
                <div className="flex items-center justify-between gap-2">
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-white/20 backdrop-blur-sm">
                    {evt.category}
                  </span>
                  <span className="text-xs font-semibold bg-white/10 px-2 py-0.5 rounded-md">
                    {evt.status}
                  </span>
                </div>
                <h3 className="text-xl font-extrabold mt-3 leading-snug">{evt.title}</h3>
                <div className="flex flex-wrap items-center gap-3 mt-3 text-xs text-white/90">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" /> {evt.date}
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5" /> {evt.venue}
                  </div>
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <p className="text-xs text-slate-600 leading-relaxed mb-3">{evt.description}</p>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {evt.tags?.map((t, idx) => (
                      <span key={idx} className="text-[10px] bg-slate-100 text-slate-600 font-semibold px-2 py-0.5 rounded-md">
                        #{t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs text-slate-500 font-medium">
                    Registered: <strong className="text-slate-800">{evt.registeredCount}</strong> / {evt.maxParticipants}
                  </span>
                  <button
                    onClick={() => toggleEventRegistration(evt.id)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-sm ${
                      evt.isRegisteredByMe
                        ? 'bg-rose-50 text-rose-600 hover:bg-rose-100'
                        : 'bg-purple-600 hover:bg-purple-700 text-white shadow-purple-600/20'
                    }`}
                  >
                    {evt.isRegisteredByMe ? 'Cancel Registration' : 'Register Now'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TAB: OFFICIAL NOTICES */}
      {activeTab === 'circulars' && (
        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm divide-y divide-slate-100 overflow-hidden">
          {announcements.map((ann) => (
            <div key={ann.id} className="p-5 hover:bg-slate-50/60 transition-colors flex items-start gap-4">
              <div
                className={`p-3 rounded-2xl ${
                  ann.category === 'Exam'
                    ? 'bg-rose-50 text-rose-600'
                    : ann.category === 'Placement'
                    ? 'bg-emerald-50 text-emerald-600'
                    : 'bg-blue-50 text-blue-600'
                }`}
              >
                <Bell className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-slate-100 text-slate-700">
                      {ann.category}
                    </span>
                    <h3 className="font-bold text-slate-900 text-sm">{ann.title}</h3>
                  </div>
                  <span className="text-xs text-slate-400 font-medium">{ann.date}</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed mt-2">{ann.content}</p>
                <div className="mt-2 text-[11px] text-slate-400 font-medium">
                  Issued by: {ann.postedBy}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TAB: AI VIVA VOCE & INTERVIEW SIMULATOR */}
      {activeTab === 'viva' && <StudentVivaSimulator />}

      {/* TAB: SEMESTER FEES & INSTANT ONLINE PAYMENT */}
      {activeTab === 'fees' && (
        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm p-6 md:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-blue-50 text-blue-700 text-[11px] font-extrabold uppercase tracking-wider mb-1.5">
                <CreditCard className="w-3.5 h-3.5" /> Institutional Fee Ledger & Clearance
              </div>
              <h2 className="text-xl font-extrabold text-slate-900">
                Semester 3 Tuition & Examination Dues
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Stream: {activeStudent?.department || 'BCA'} • Configured by {currentCollege?.name || 'AITM Bhopal'} Accounts Section.
              </p>
            </div>

            <button
              onClick={() => setIsPaymentModalOpen(true)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md shadow-emerald-600/25 transition-all hover:scale-[1.02] self-start sm:self-auto"
            >
              <CreditCard className="w-4 h-4" />
              Pay Fees Online (UPI / Card)
            </button>
          </div>

          {/* Dues Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Program Fee</span>
              <h3 className="text-2xl font-black text-slate-900">
                ₹{((feeStructures.find(f => f.department === (activeStudent?.department || 'BCA'))?.totalFee) || 35000).toLocaleString('en-IN')}
              </h3>
              <p className="text-xs text-slate-500">Includes Tuition, Lab, Exam & Campus Fund</p>
            </div>

            <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-2">
              <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider">Paid Amount</span>
              <h3 className="text-2xl font-black text-emerald-700">
                ₹{(wardData?.paidFee || 35000).toLocaleString('en-IN')}
              </h3>
              <p className="text-xs text-emerald-600 font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Cleared with official receipts
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-blue-50 border border-blue-200 space-y-2">
              <span className="text-xs font-bold text-blue-800 uppercase tracking-wider">Clearance Status</span>
              <h3 className="text-2xl font-black text-blue-700">
                {wardData?.pendingFee === 0 ? 'No Dues (Eligible for Exams)' : `₹${wardData?.pendingFee} Due`}
              </h3>
              <p className="text-xs text-blue-600">No late fine applied</p>
            </div>
          </div>

          {/* Stream Fee Breakdown */}
          <div className="p-4 rounded-2xl bg-slate-50/80 border border-slate-200 text-xs space-y-2">
            <h4 className="font-bold text-slate-800 uppercase tracking-wider text-[11px]">
              Itemized Fee Schedule for {activeStudent?.department || 'BCA'}:
            </h4>
            {(() => {
              const activeFee = feeStructures.find(f => f.department === (activeStudent?.department || 'BCA')) || feeStructures[0];
              return (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1">
                  <div className="bg-white p-3 rounded-xl border border-slate-200">
                    <span className="text-slate-500 block">Tuition Fee</span>
                    <strong className="text-sm font-bold text-slate-900">₹{activeFee?.tuitionFee?.toLocaleString('en-IN')}</strong>
                  </div>
                  <div className="bg-white p-3 rounded-xl border border-slate-200">
                    <span className="text-slate-500 block">Lab & E-Library</span>
                    <strong className="text-sm font-bold text-slate-900">₹{activeFee?.labLibraryFee?.toLocaleString('en-IN')}</strong>
                  </div>
                  <div className="bg-white p-3 rounded-xl border border-slate-200">
                    <span className="text-slate-500 block">Exam & Assessment</span>
                    <strong className="text-sm font-bold text-slate-900">₹{activeFee?.examFee?.toLocaleString('en-IN')}</strong>
                  </div>
                  <div className="bg-white p-3 rounded-xl border border-slate-200">
                    <span className="text-slate-500 block">Campus Development</span>
                    <strong className="text-sm font-bold text-slate-900">₹{activeFee?.developmentFee?.toLocaleString('en-IN')}</strong>
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      )}

      <PaymentGatewayModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        payerType="Student"
        studentName={activeStudent?.name || 'Rohan Vishwakarma'}
        rollNo={activeStudent?.enrollmentNo || '0103CA231045'}
        amount={wardData?.pendingFee > 0 ? wardData.pendingFee : ((feeStructures.find(f => f.department === (activeStudent?.department || 'BCA'))?.totalFee) || 35000)}
        course={`${activeStudent?.department || 'BCA'} Sem ${activeStudent?.semester || 3}`}
      />

      <ViewNoteModal note={readingNote} isOpen={!!readingNote} onClose={() => setReadingNote(null)} />
    </div>
  );
}
