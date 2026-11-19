import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  X,
  CheckCircle2,
  XCircle,
  Clock,
  ShieldCheck,
  RefreshCw,
  Users,
  Sparkles,
  QrCode,
  Radio
} from 'lucide-react';

export default function TakeAttendanceModal({ isOpen, onClose }) {
  const {
    subjects,
    students,
    activeAttendanceSession,
    startAttendanceSession,
    submitFacultyAttendance,
    showToast
  } = useApp();

  const [selectedSubject, setSelectedSubject] = useState('Database Management Systems (DBMS)');
  const [attendanceMode, setAttendanceMode] = useState('smart_code'); // 'smart_code' | 'roster'
  const [dynamicCode, setDynamicCode] = useState('8492');
  
  // Student statuses state (default all Present)
  const [studentStatuses, setStudentStatuses] = useState({
    '0103CA231045': 'Present', // Rohan Vishwakarma
    '0103CA231089': 'Present', // Pooja Patel
    '0103CA231012': 'Present'  // Aman Tripathi
  });

  if (!isOpen) return null;

  const handleGenerateNewCode = () => {
    const newCode = Math.floor(1000 + Math.random() * 9000).toString();
    setDynamicCode(newCode);
    startAttendanceSession({ subject: selectedSubject, code: newCode });
  };

  const toggleStudentStatus = (enrollmentNo) => {
    setStudentStatuses(prev => ({
      ...prev,
      [enrollmentNo]: prev[enrollmentNo] === 'Present' ? 'Absent' : 'Present'
    }));
  };

  const handleMarkAll = (status) => {
    const updated = {};
    students.forEach(s => {
      updated[s.enrollmentNo] = status;
    });
    setStudentStatuses(updated);
    showToast(`Marked all students as ${status}.`, 'info');
  };

  const handleSubmitAttendance = () => {
    submitFacultyAttendance({
      subject: selectedSubject,
      studentStatuses,
      attendanceCode: attendanceMode === 'smart_code' ? dynamicCode : null
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-slate-200">
        {/* Modal Header */}
        <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-gradient-to-r from-purple-900 to-indigo-900 text-white rounded-t-3xl">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-white/10 rounded-2xl">
              <ShieldCheck className="w-6 h-6 text-purple-300" />
            </div>
            <div>
              <h3 className="text-lg font-bold">Smart Classroom Attendance</h3>
              <p className="text-xs text-purple-200">Verify student physical presence in classroom</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/10 text-white/80 transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-5">
          {/* Subject & Section Selection */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-bold text-slate-700">Course Subject</label>
              <select
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                className="w-full mt-1 px-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-semibold text-slate-800"
              >
                <option value="Database Management Systems (DBMS)">Database Management Systems (DBMS)</option>
                <option value="Web Technologies & Full-Stack">Web Technologies & Full-Stack</option>
                <option value="Data Structures & Algorithms in C++">Data Structures & Algorithms in C++</option>
                <option value="Operating Systems Principles">Operating Systems Principles</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700">Class Cohort</label>
              <input
                type="text"
                disabled
                value="BCA 3rd Semester • Section A"
                className="w-full mt-1 px-3 py-2 text-xs rounded-xl bg-slate-100 border border-slate-200 text-slate-600 font-semibold"
              />
            </div>
          </div>

          {/* Mode Switcher */}
          <div className="flex items-center p-1 bg-slate-100 rounded-2xl">
            <button
              type="button"
              onClick={() => setAttendanceMode('smart_code')}
              className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-2 ${
                attendanceMode === 'smart_code'
                  ? 'bg-white text-indigo-700 shadow-sm'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <Radio className="w-3.5 h-3.5" />
              Dynamic In-Class Code (Anti-Proxy)
            </button>
            <button
              type="button"
              onClick={() => setAttendanceMode('roster')}
              className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-2 ${
                attendanceMode === 'roster'
                  ? 'bg-white text-indigo-700 shadow-sm'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              Manual Roll-Call Roster
            </button>
          </div>

          {/* MODE 1: SMART CODE DISPLAY */}
          {attendanceMode === 'smart_code' && (
            <div className="p-5 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl border border-indigo-100 text-center space-y-3">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-100 text-indigo-800 text-[11px] font-bold">
                <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                Display this code on Classroom Projector / Board
              </div>

              <div>
                <p className="text-xs text-slate-500">Live Dynamic 4-Digit Security Code:</p>
                <div className="flex items-center justify-center gap-3 my-2">
                  <div className="font-mono text-4xl font-extrabold tracking-widest text-indigo-600 px-6 py-2 bg-white rounded-2xl border-2 border-indigo-200 shadow-sm">
                    {dynamicCode}
                  </div>
                  <button
                    onClick={handleGenerateNewCode}
                    className="p-3 bg-white hover:bg-slate-50 text-slate-700 rounded-2xl border border-slate-200 shadow-sm transition-all"
                    title="Regenerate dynamic code"
                  >
                    <RefreshCw className="w-4 h-4 text-indigo-600" />
                  </button>
                </div>
                <p className="text-[11px] text-slate-500 max-w-sm mx-auto">
                  Students open their Campus One mobile or web portal and enter this code to automatically register attendance. Expiring session prevents attendance from outside class.
                </p>
              </div>
            </div>
          )}

          {/* MODE 2: MANUAL ROLL-CALL ROSTER */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-700">Enrolled Students Roster</span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleMarkAll('Present')}
                  className="px-2.5 py-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 rounded-lg hover:bg-emerald-100 transition-all"
                >
                  All Present
                </button>
                <button
                  type="button"
                  onClick={() => handleMarkAll('Absent')}
                  className="px-2.5 py-1 text-[11px] font-bold text-rose-700 bg-rose-50 rounded-lg hover:bg-rose-100 transition-all"
                >
                  All Absent
                </button>
              </div>
            </div>

            <div className="divide-y divide-slate-100 border border-slate-200 rounded-2xl overflow-hidden max-h-48 overflow-y-auto">
              {students.map((student) => {
                const status = studentStatuses[student.enrollmentNo] || 'Present';
                const isPresent = status === 'Present';
                return (
                  <div
                    key={student.id}
                    className="p-3 flex items-center justify-between gap-3 hover:bg-slate-50 transition-all"
                  >
                    <div>
                      <h5 className="text-xs font-bold text-slate-900">{student.name}</h5>
                      <p className="text-[11px] font-mono text-slate-400">
                        {student.enrollmentNo} • Sem {student.semester} ({student.section})
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => toggleStudentStatus(student.enrollmentNo)}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                        isPresent
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                          : 'bg-rose-100 text-rose-800 border border-rose-300'
                      }`}
                    >
                      {isPresent ? (
                        <>
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Present
                        </>
                      ) : (
                        <>
                          <XCircle className="w-3.5 h-3.5 text-rose-600" /> Absent
                        </>
                      )}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-6 border-t border-slate-100 flex items-center justify-between gap-3 bg-slate-50/50 rounded-b-3xl">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 text-xs font-bold text-slate-600 hover:text-slate-800 rounded-xl"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSubmitAttendance}
            className="px-6 py-2.5 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-lg shadow-indigo-600/30 transition-all hover:scale-[1.02]"
          >
            Submit & Sync Across Portals
          </button>
        </div>
      </div>
    </div>
  );
}
