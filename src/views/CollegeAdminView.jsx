import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Building2,
  Users,
  GraduationCap,
  BookOpen,
  Plus,
  Search,
  Bell,
  CreditCard,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import AddFacultyModal from '../components/modals/AddFacultyModal';
import NAACAccreditationRadar from '../components/NAACAccreditationRadar';
import FeeStructureManager from '../components/FeeStructureManager';

export default function CollegeAdminView() {
  const { currentCollege, faculty, departments, toggleFacultyStatus, announcements, createAnnouncement, authenticatedSessions } = useApp();
  const activeCollege = authenticatedSessions?.college_admin || currentCollege;
  const [isAddFacultyModalOpen, setIsAddFacultyModalOpen] = useState(false);
  const [searchFaculty, setSearchFaculty] = useState('');
  const [newNoticeTitle, setNewNoticeTitle] = useState('');
  const [newNoticeCategory, setNewNoticeCategory] = useState('Exam');
  const [newNoticeContent, setNewNoticeContent] = useState('');

  const filteredFaculty = faculty.filter(
    (f) =>
      f.name.toLowerCase().includes(searchFaculty.toLowerCase()) ||
      f.department.toLowerCase().includes(searchFaculty.toLowerCase()) ||
      f.subjects.some((s) => s.toLowerCase().includes(searchFaculty.toLowerCase()))
  );

  const handlePostNotice = (e) => {
    e.preventDefault();
    if (!newNoticeTitle.trim()) return;

    createAnnouncement({
      title: newNoticeTitle,
      category: newNoticeCategory,
      priority: 'high',
      content: newNoticeContent || `Important notification issued for all departments of ${activeCollege?.code || 'the college'}.`
    });

    setNewNoticeTitle('');
    setNewNoticeContent('');
  };

  return (
    <div className="space-y-6">
      {/* College Admin Header */}
      <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200/80 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-wider mb-2">
            Institutional Administration
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900">
            {activeCollege?.name}
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Campus Code: <strong className="text-slate-800">{activeCollege?.code}</strong> | City: {activeCollege?.city} | License Tier: <span className="font-semibold text-purple-600">{activeCollege?.plan}</span> | Admin: <strong className="text-slate-700">{activeCollege?.adminName || 'College Administrator'}</strong>
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsAddFacultyModalOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm shadow-md shadow-blue-600/20 transition-all"
          >
            <Plus className="w-4 h-4" />
            Add Faculty Member
          </button>
        </div>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Departments</p>
          <h3 className="text-2xl font-extrabold text-slate-900 mt-1">{departments.length}</h3>
          <p className="text-xs text-slate-500 mt-1">BCA, B.Tech, MCA, BBA</p>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Teaching Faculty</p>
          <h3 className="text-2xl font-extrabold text-blue-600 mt-1">{faculty.length}</h3>
          <p className="text-xs text-emerald-600 font-medium mt-1">All verified credentials</p>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Active Students</p>
          <h3 className="text-2xl font-extrabold text-slate-900 mt-1">{activeCollege?.studentsCount || 2450}</h3>
          <p className="text-xs text-slate-500 mt-1">Across all semesters</p>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Fee Collection Status</p>
          <h3 className="text-2xl font-extrabold text-emerald-600 mt-1">92.4%</h3>
          <p className="text-xs text-slate-500 mt-1">Autumn Semester 2026</p>
        </div>
      </div>

      {/* Unique Enterprise Feature: NAAC Accreditation Radar & SSR Generator */}
      <NAACAccreditationRadar />

      {/* Unique Enterprise Feature: Stream-Wise Fee Structure & Maintenance */}
      <FeeStructureManager />

      {/* Main Grid: Faculty Directory & Broadcast Notice */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Faculty Directory */}
        <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden">
          <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div>
              <h3 className="font-bold text-slate-800">Assigned Faculty Members</h3>
              <p className="text-xs text-slate-400">Manage teachers who can upload course material and create events</p>
            </div>
            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search faculty or subject..."
                value={searchFaculty}
                onChange={(e) => setSearchFaculty(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600"
              />
            </div>
          </div>

          <div className="divide-y divide-slate-100">
            {filteredFaculty.map((f) => (
              <div key={f.id} className="p-4 flex items-center justify-between hover:bg-slate-50/60 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 font-bold flex items-center justify-center text-sm">
                    {f.name.split(' ').map((n) => n[0]).join('').substring(0, 2)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-slate-900 text-sm">{f.name}</h4>
                      <span className="text-[10px] font-mono font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded-md border border-purple-200">
                        ID: {f.loginId || 'FAC-BCA-101'}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500">
                      {f.designation} • <span className="text-blue-600 font-medium">{f.department}</span> • <span className="text-slate-400">pwd: {f.tempPassword || 'faculty@aitm'}</span>
                    </p>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {f.subjects.map((sub, idx) => (
                        <span key={idx} className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md font-medium">
                          {sub}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span
                    className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                      f.status === 'active'
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : 'bg-rose-50 text-rose-700 border border-rose-200'
                    }`}
                  >
                    {f.status === 'active' ? 'Active' : 'Suspended'}
                  </span>
                  <button
                    onClick={() => toggleFacultyStatus(f.id)}
                    className="text-xs text-slate-400 hover:text-slate-700 underline px-2 py-1"
                  >
                    {f.status === 'active' ? 'Deactivate' : 'Activate'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: College-Wide Circular Broadcast */}
        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm p-5 space-y-4">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-amber-50 text-amber-600 rounded-xl">
              <Bell className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-800 text-sm">Broadcast Notice</h3>
              <p className="text-xs text-slate-400">Send instant priority notifications to students</p>
            </div>
          </div>

          <form onSubmit={handlePostNotice} className="space-y-3">
            <div>
              <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">Notice Headline</label>
              <input
                type="text"
                required
                placeholder="e.g. Campus Holiday / Fee Deadline Reminder"
                value={newNoticeTitle}
                onChange={(e) => setNewNoticeTitle(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">Category</label>
              <select
                value={newNoticeCategory}
                onChange={(e) => setNewNoticeCategory(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600"
              >
                <option value="Exam">Exam Schedule</option>
                <option value="Placement">Placement Alert</option>
                <option value="Holiday">Holiday Circular</option>
                <option value="Fee">Fee Notice</option>
                <option value="General">General Notice</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">Notice Details</label>
              <textarea
                rows={3}
                placeholder="Detailed text of the announcement..."
                value={newNoticeContent}
                onChange={(e) => setNewNoticeContent(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs shadow-md shadow-blue-600/20 transition-all flex items-center justify-center gap-2"
            >
              <Bell className="w-3.5 h-3.5" />
              Publish Circular
            </button>
          </form>

          {/* Quick Notice History */}
          <div className="pt-2 border-t border-slate-100">
            <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">Recent Notices</h4>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {announcements.slice(0, 3).map((ann) => (
                <div key={ann.id} className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-800">{ann.title}</span>
                    <span className="text-[10px] text-slate-400">{ann.date}</span>
                  </div>
                  <p className="text-[11px] text-slate-500 truncate mt-0.5">{ann.content}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <AddFacultyModal isOpen={isAddFacultyModalOpen} onClose={() => setIsAddFacultyModalOpen(false)} />
    </div>
  );
}
