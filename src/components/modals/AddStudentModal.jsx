import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, UserPlus, Sparkles, RefreshCw, GraduationCap, ShieldCheck } from 'lucide-react';

export default function AddStudentModal({ isOpen, onClose }) {
  const { addStudent, departments } = useApp();
  const [name, setName] = useState('');
  const [department, setDepartment] = useState('BCA');
  const [semester, setSemester] = useState(3);
  const [section, setSection] = useState('A');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [parentName, setParentName] = useState('');

  // Auto-generated unique roll number & password
  const generateUniqueRoll = () => {
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    return `0103CA23${randomSuffix}`;
  };

  const generateDefaultPassword = (studentName) => {
    const clean = (studentName || 'student').toLowerCase().split(' ')[0].replace(/[^a-z]/g, '');
    return `${clean}@${Math.floor(100 + Math.random() * 900)}`;
  };

  const [enrollmentNo, setEnrollmentNo] = useState(generateUniqueRoll());
  const [studentPassword, setStudentPassword] = useState('student@2026');

  if (!isOpen) return null;

  const handleRegenerateCredentials = () => {
    const newRoll = generateUniqueRoll();
    setEnrollmentNo(newRoll);
    setStudentPassword(generateDefaultPassword(name));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    addStudent({
      name,
      department,
      semester: Number(semester),
      section,
      enrollmentNo: enrollmentNo.trim().toUpperCase(),
      loginId: enrollmentNo.trim().toUpperCase(),
      tempPassword: studentPassword.trim(),
      email: email || `${name.toLowerCase().replace(/\s+/g, '.')}@student.aitm.edu.in`,
      phone: phone || '+91 95891 00000',
      parentName: parentName || `Guardian of ${name}`,
      parentPin: phone ? phone.slice(-5) : '12345',
      attendance: '100%',
      collegeId: 'col-1'
    });

    setName('');
    setEmail('');
    setPhone('');
    setParentName('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl max-w-lg w-full shadow-2xl border border-slate-100 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/70">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-emerald-50 text-emerald-600 rounded-xl">
              <UserPlus className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-800 text-sm">Enroll New Student</h3>
              <p className="text-xs text-slate-500">Issued by Faculty • Hierarchical Student ID Generation</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-200/50">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
              Student Full Name *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Rahul Sharma"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (!studentPassword || studentPassword === 'student@2026') {
                  setStudentPassword(generateDefaultPassword(e.target.value));
                }
              }}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 text-slate-900"
            />
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Department
              </label>
              <select
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 text-slate-800"
              >
                {departments.map((d) => (
                  <option key={d.id} value={d.code}>
                    {d.code}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Semester
              </label>
              <select
                value={semester}
                onChange={(e) => setSemester(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 text-slate-800"
              >
                {[1, 2, 3, 4, 5, 6].map((s) => (
                  <option key={s} value={s}>
                    Sem {s}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Section
              </label>
              <select
                value={section}
                onChange={(e) => setSection(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 text-slate-800"
              >
                <option value="A">Section A</option>
                <option value="B">Section B</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Parent / Guardian Name
              </label>
              <input
                type="text"
                placeholder="Mr./Mrs. Sharma"
                value={parentName}
                onChange={(e) => setParentName(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 text-slate-800"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Parent Contact Mobile
              </label>
              <input
                type="text"
                placeholder="+91 98xxx xxxxx"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 text-slate-800"
              />
            </div>
          </div>

          {/* Student ID & Password Generator */}
          <div className="p-3.5 bg-emerald-50/80 border border-emerald-200/80 rounded-2xl space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-800">
                Institutional ID & Credentials Generator
              </span>
              <button
                type="button"
                onClick={handleRegenerateCredentials}
                className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 hover:text-emerald-900 bg-white px-2 py-0.5 rounded-md border border-emerald-300 shadow-xs transition-colors"
              >
                <RefreshCw className="w-3 h-3" /> Regenerate Unique
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-[11px] font-semibold text-slate-600 block mb-0.5">
                  Roll / Enrollment ID:
                </label>
                <input
                  type="text"
                  required
                  value={enrollmentNo}
                  onChange={(e) => setEnrollmentNo(e.target.value)}
                  className="w-full font-mono text-xs font-bold text-emerald-800 bg-white px-2.5 py-1.5 rounded-lg border border-emerald-300 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-[11px] font-semibold text-slate-600 block mb-0.5">
                  Initial Password:
                </label>
                <input
                  type="text"
                  required
                  value={studentPassword}
                  onChange={(e) => setStudentPassword(e.target.value)}
                  className="w-full font-mono text-xs font-semibold text-slate-800 bg-white px-2.5 py-1.5 rounded-lg border border-emerald-300 focus:outline-none"
                />
              </div>
            </div>
            <p className="text-[10px] text-slate-500">
              💡 The Parent Portal also logs in using this same Student ID with guardian contact!
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex items-center justify-end gap-3 pt-2 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-md shadow-emerald-600/20 transition-all flex items-center gap-2"
            >
              <ShieldCheck className="w-4 h-4" />
              Enroll & Issue Student ID
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
