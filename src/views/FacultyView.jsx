import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  BookOpen,
  Upload,
  Calendar,
  Sparkles,
  FileText,
  Trash2,
  Eye,
  Download,
  Users,
  CheckCircle2,
  Clock,
  Plus,
  ShieldCheck,
  UserPlus
} from 'lucide-react';
import UploadNoteModal from '../components/modals/UploadNoteModal';
import CreateEventModal from '../components/modals/CreateEventModal';
import ViewNoteModal from '../components/modals/ViewNoteModal';
import TakeAttendanceModal from '../components/modals/TakeAttendanceModal';
import AddStudentModal from '../components/modals/AddStudentModal';
import GenerateExamPaperModal from '../components/modals/GenerateExamPaperModal';

export default function FacultyView() {
  const { notes, deleteNote, events, subjects, activeAttendanceSession, students, faculty, authenticatedSessions } = useApp();
  const activeFaculty = authenticatedSessions?.faculty || faculty[0];
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [isEventOpen, setIsEventOpen] = useState(false);
  const [isAttendanceOpen, setIsAttendanceOpen] = useState(false);
  const [isAddStudentOpen, setIsAddStudentOpen] = useState(false);
  const [isExamPaperOpen, setIsExamPaperOpen] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);
  const [selectedSubjectFilter, setSelectedSubjectFilter] = useState('all');

  const filteredNotes = notes.filter(
    (n) => selectedSubjectFilter === 'all' || n.subject === selectedSubjectFilter
  );

  return (
    <div className="space-y-6">
      {/* Faculty Hero Banner */}
      <div className="bg-gradient-to-r from-purple-900 via-indigo-900 to-slate-900 rounded-3xl p-6 md:p-8 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30 text-xs font-bold uppercase tracking-wider mb-2">
            Faculty Portal & Academic Hub
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">
            Welcome, {activeFaculty?.name || 'Faculty Member'}
          </h1>
          <p className="text-xs text-purple-200 mt-1 max-w-xl">
            {activeFaculty?.designation || 'Faculty Member'} • Department of {activeFaculty?.department || 'Computer Applications'} • Faculty ID: <span className="font-mono font-bold text-white bg-white/20 px-1.5 py-0.5 rounded">{activeFaculty?.loginId || 'FAC-BCA-101'}</span>. Upload course notes, conduct attendance, and admit students directly.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => setIsAttendanceOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 font-semibold text-white shadow-lg shadow-emerald-600/30 transition-all hover:scale-[1.02] text-xs"
          >
            <ShieldCheck className="w-4 h-4" />
            Take Attendance
          </button>
          <button
            onClick={() => setIsAddStudentOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-emerald-500 hover:bg-emerald-600 font-semibold text-white shadow-lg shadow-emerald-500/30 transition-all hover:scale-[1.02] text-xs"
          >
            <UserPlus className="w-4 h-4" />
            Enroll Student (ID Gen)
          </button>
          <button
            onClick={() => setIsExamPaperOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 font-semibold text-white shadow-lg shadow-purple-600/30 transition-all hover:scale-[1.02] text-xs"
          >
            <Sparkles className="w-4 h-4 text-amber-300" />
            AI Exam Paper Architect
          </button>
          <button
            onClick={() => setIsUploadOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-indigo-500 hover:bg-indigo-600 font-semibold text-white shadow-lg shadow-indigo-500/30 transition-all hover:scale-[1.02] text-xs"
          >
            <Upload className="w-4 h-4" />
            Upload Study Material
          </button>
          <button
            onClick={() => setIsEventOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-purple-600 hover:bg-purple-700 font-semibold text-white shadow-lg shadow-purple-600/30 transition-all hover:scale-[1.02] text-xs"
          >
            <Calendar className="w-4 h-4" />
            Host Event
          </button>
        </div>
      </div>

      {/* Metrics for Faculty */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Materials Published</p>
            <h3 className="text-2xl font-extrabold text-slate-900 mt-1">{notes.length}</h3>
            <p className="text-xs text-indigo-600 font-semibold mt-1">Organized by Unit & Sem</p>
          </div>
          <div className="p-3 bg-indigo-50 text-indigo-600 rounded-2xl">
            <BookOpen className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Student Downloads</p>
            <h3 className="text-2xl font-extrabold text-purple-600 mt-1">
              {notes.reduce((sum, n) => sum + (n.downloadCount || 0), 0)}
            </h3>
            <p className="text-xs text-emerald-600 font-medium mt-1">Zero WhatsApp clutter</p>
          </div>
          <div className="p-3 bg-purple-50 text-purple-600 rounded-2xl">
            <Download className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Active Campus Events</p>
            <h3 className="text-2xl font-extrabold text-slate-900 mt-1">{events.length}</h3>
            <p className="text-xs text-slate-500 mt-1">Hackathons & Seminars</p>
          </div>
          <div className="p-3 bg-amber-50 text-amber-600 rounded-2xl">
            <Calendar className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Uploaded Notes Manager */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div>
            <h3 className="font-bold text-slate-800">Published Notes & Syllabus Guides</h3>
            <p className="text-xs text-slate-400">Students instantly access and view these notes in their portal</p>
          </div>
          <div className="flex items-center gap-2">
            <select
              value={selectedSubjectFilter}
              onChange={(e) => setSelectedSubjectFilter(e.target.value)}
              className="px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-purple-500/20"
            >
              <option value="all">All Subjects</option>
              {subjects.map((s) => (
                <option key={s.id} value={s.name}>
                  {s.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="divide-y divide-slate-100">
          {filteredNotes.map((note) => (
            <div key={note.id} className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50/60 transition-colors">
              <div className="flex items-start gap-3">
                <div className="p-2.5 bg-purple-50 text-purple-600 rounded-xl mt-1">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded-md">
                      {note.unit}
                    </span>
                    <span className="text-xs text-slate-500">Sem {note.semester}</span>
                    <span className="text-[10px] text-slate-400">• {note.date}</span>
                  </div>
                  <h4 className="font-bold text-slate-900 text-sm mt-1">{note.title}</h4>
                  <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">{note.description}</p>
                  <p className="text-[11px] text-indigo-600 font-medium mt-1">
                    Subject: {note.subject} • Size: {note.fileSize}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 sm:self-center">
                <button
                  onClick={() => setSelectedNote(note)}
                  className="px-3 py-1.5 text-xs font-semibold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 rounded-xl transition-all flex items-center gap-1.5"
                >
                  <Eye className="w-3.5 h-3.5" />
                  Preview
                </button>
                <button
                  onClick={() => deleteNote(note.id)}
                  className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all"
                  title="Remove Material"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <UploadNoteModal isOpen={isUploadOpen} onClose={() => setIsUploadOpen(false)} />
      <CreateEventModal isOpen={isEventOpen} onClose={() => setIsEventOpen(false)} />
      <ViewNoteModal note={selectedNote} isOpen={!!selectedNote} onClose={() => setSelectedNote(null)} />
      <TakeAttendanceModal isOpen={isAttendanceOpen} onClose={() => setIsAttendanceOpen(false)} />
      <AddStudentModal isOpen={isAddStudentOpen} onClose={() => setIsAddStudentOpen(false)} />
      <GenerateExamPaperModal isOpen={isExamPaperOpen} onClose={() => setIsExamPaperOpen(false)} />
    </div>
  );
}
