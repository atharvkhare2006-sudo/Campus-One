import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, Upload, FileText, Check } from 'lucide-react';

export default function UploadNoteModal({ isOpen, onClose }) {
  const { uploadNote, subjects } = useApp();
  const [title, setTitle] = useState('');
  const [subject, setSubject] = useState(subjects[0]?.name || 'Database Management Systems (DBMS)');
  const [semester, setSemester] = useState('3');
  const [unit, setUnit] = useState('Unit 1');
  const [description, setDescription] = useState('');
  const [contentPreview, setContentPreview] = useState('');
  const [fileSelected, setFileSelected] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    uploadNote({
      title,
      subject,
      semester: parseInt(semester),
      unit,
      description: description || `Lecture notes and exam reference materials for ${unit} of ${subject}.`,
      contentPreview: contentPreview || `Key concepts, summary and solved questions for ${title}. Prepared for BCA Semester ${semester}.`,
      fileType: 'pdf',
      fileSize: `${(Math.random() * 3 + 1.5).toFixed(1)} MB`
    });

    // Reset and close
    setTitle('');
    setDescription('');
    setContentPreview('');
    setFileSelected(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-2xl max-w-xl w-full shadow-2xl border border-slate-100 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/70">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
              <Upload className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-800">Upload Study Material & Notes</h3>
              <p className="text-xs text-slate-500">Students will get immediate access without WhatsApp clutter</p>
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
              Note Title / Topic *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Unit 2: Binary Search Trees & AVL Rotations"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Subject
              </label>
              <select
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600"
              >
                {subjects.map((sub) => (
                  <option key={sub.id} value={sub.name}>
                    {sub.name}
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
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600"
              >
                {[1, 2, 3, 4, 5, 6].map((sem) => (
                  <option key={sem} value={sem}>
                    Semester {sem}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Unit / Module
              </label>
              <select
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600"
              >
                <option value="Unit 1">Unit 1</option>
                <option value="Unit 2">Unit 2</option>
                <option value="Unit 3">Unit 3</option>
                <option value="Unit 4">Unit 4</option>
                <option value="Unit 5">Unit 5</option>
                <option value="Full Syllabus">Full Syllabus</option>
                <option value="Lab Manual">Lab Manual</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
              Short Summary for Students
            </label>
            <textarea
              rows={2}
              placeholder="Highlight key exam formulas, diagrams, and important topics covered..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
              Quick Notes / Reading Preview
            </label>
            <textarea
              rows={3}
              placeholder="Paste main definitions or key lecture bullet points so students can read directly on their phone screen..."
              value={contentPreview}
              onChange={(e) => setContentPreview(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm font-mono text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600"
            />
          </div>

          {/* Simulated File Dropzone */}
          <div
            onClick={() => setFileSelected(true)}
            className={`border-2 border-dashed rounded-xl p-4 text-center cursor-pointer transition-colors ${
              fileSelected ? 'border-emerald-400 bg-emerald-50/50' : 'border-slate-200 hover:border-indigo-400 bg-slate-50/50'
            }`}
          >
            {fileSelected ? (
              <div className="flex items-center justify-center gap-2 text-emerald-700 font-medium text-sm">
                <Check className="w-5 h-5 text-emerald-600" />
                <span>PDF Document attached: <strong>{title || 'Lecture_Notes.pdf'}</strong> (Ready to publish)</span>
              </div>
            ) : (
              <div className="space-y-1">
                <FileText className="w-6 h-6 mx-auto text-slate-400" />
                <p className="text-xs text-slate-600 font-medium">Click or drag PDF / PPT / Word file to attach</p>
                <p className="text-[11px] text-slate-400">PDF, DOCX, PPTX up to 25 MB</p>
              </div>
            )}
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
              className="px-5 py-2 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-md shadow-indigo-600/20 transition-all flex items-center gap-2"
            >
              <Upload className="w-4 h-4" />
              Publish Material
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
