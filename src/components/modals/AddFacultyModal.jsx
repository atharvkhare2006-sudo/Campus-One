import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { X, UserPlus, GraduationCap, RefreshCw, KeyRound, ShieldCheck } from 'lucide-react';

export default function AddFacultyModal({ isOpen, onClose }) {
  const { addFacultyMember, departments, subjects } = useApp();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [department, setDepartment] = useState('BCA');
  const [designation, setDesignation] = useState('Assistant Professor');
  const [selectedSubject, setSelectedSubject] = useState(subjects[0]?.name || '');
  const [phone, setPhone] = useState('');

  // Editable & Auto-generated unique Faculty ID & Password
  const generateUniqueFacultyId = (dept) => {
    const cleanDept = (dept || 'BCA').substring(0, 3).toUpperCase();
    const randomDigits = Math.floor(100 + Math.random() * 900);
    return `FAC-${cleanDept}-${randomDigits}`;
  };

  const generateDefaultFacultyPassword = (dept) => {
    const cleanDept = (dept || 'bca').substring(0, 3).toLowerCase();
    const randomDigits = Math.floor(10 + Math.random() * 90);
    return `fac#${cleanDept}${randomDigits}`;
  };

  const [facultyLoginId, setFacultyLoginId] = useState(generateUniqueFacultyId('BCA'));
  const [facultyPassword, setFacultyPassword] = useState(generateDefaultFacultyPassword('bca'));

  useEffect(() => {
    if (department) {
      setFacultyLoginId(generateUniqueFacultyId(department));
      setFacultyPassword(generateDefaultFacultyPassword(department));
    }
  }, [department]);

  if (!isOpen) return null;

  const handleRegenerate = () => {
    setFacultyLoginId(generateUniqueFacultyId(department || 'BCA'));
    setFacultyPassword(generateDefaultFacultyPassword(department || 'bca'));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    addFacultyMember({
      name,
      email: email || `${name.toLowerCase().replace(/\s+/g, '.')}@aitm.edu.in`,
      department,
      designation,
      subjects: selectedSubject ? [selectedSubject] : ['Computer Fundamentals'],
      phone: phone || '+91 98900 12345',
      loginId: facultyLoginId.trim(),
      tempPassword: facultyPassword.trim()
    });

    setName('');
    setEmail('');
    setPhone('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl max-w-lg w-full shadow-2xl border border-slate-100 overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/70 shrink-0">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-blue-50 text-blue-600 rounded-xl">
              <UserPlus className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-800 text-sm">Add Faculty Member</h3>
              <p className="text-xs text-slate-500">Issued by College Admin • Generates Unique Faculty Login ID</p>
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
              Faculty Full Name *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Prof. Sandeep Saxena"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 text-slate-900"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Department
              </label>
              <select
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 text-slate-800"
              >
                {departments.map((d) => (
                  <option key={d.id} value={d.code}>
                    {d.code} - {d.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Designation
              </label>
              <select
                value={designation}
                onChange={(e) => setDesignation(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 text-slate-800"
              >
                <option value="Assistant Professor">Assistant Professor</option>
                <option value="Associate Professor">Associate Professor</option>
                <option value="Professor & HOD">Professor & HOD</option>
                <option value="Visiting Lecturer">Visiting Lecturer</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
              Assigned Teaching Subject
            </label>
            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 text-slate-800"
            >
              {subjects.map((sub) => (
                <option key={sub.id} value={sub.name}>
                  {sub.name} ({sub.department} Sem {sub.semester})
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Official Email
              </label>
              <input
                type="email"
                placeholder="faculty@aitm.edu.in"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 text-slate-900"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Mobile Number
              </label>
              <input
                type="text"
                placeholder="+91 98xxx xxxxx"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 text-slate-900"
              />
            </div>
          </div>

          {/* Interactive Faculty Login ID & Password Generator */}
          <div className="p-3.5 bg-purple-50/80 border border-purple-200/80 rounded-2xl space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-purple-700 flex items-center gap-1.5">
                <KeyRound className="w-3.5 h-3.5" /> Faculty Portal Credentials (Custom / Unique)
              </span>
              <button
                type="button"
                onClick={handleRegenerate}
                className="inline-flex items-center gap-1 text-[11px] font-bold text-purple-700 hover:text-purple-900 bg-white px-2 py-0.5 rounded-md border border-purple-300 shadow-xs transition-colors"
              >
                <RefreshCw className="w-3 h-3" /> Regenerate Unique
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-[11px] font-semibold text-slate-600 block mb-0.5">
                  Assigned Faculty ID:
                </label>
                <input
                  type="text"
                  required
                  value={facultyLoginId}
                  onChange={(e) => setFacultyLoginId(e.target.value)}
                  className="w-full font-mono text-xs font-extrabold text-purple-800 bg-white px-2.5 py-1.5 rounded-lg border border-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div>
                <label className="text-[11px] font-semibold text-slate-600 block mb-0.5">
                  Default Password:
                </label>
                <input
                  type="text"
                  required
                  value={facultyPassword}
                  onChange={(e) => setFacultyPassword(e.target.value)}
                  className="w-full font-mono text-xs font-semibold text-slate-800 bg-white px-2.5 py-1.5 rounded-lg border border-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>
            <p className="text-[10px] text-slate-500">
              ⚡ Issued by College Admin to the faculty member for taking attendance and publishing notes.
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
              className="px-5 py-2.5 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-md shadow-blue-600/20 transition-all flex items-center gap-2"
            >
              <GraduationCap className="w-4 h-4" />
              Add & Issue Faculty ID
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
