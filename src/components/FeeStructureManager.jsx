import React, { useState } from 'react';
import {
  CreditCard,
  Edit3,
  DollarSign,
  Calendar,
  CheckCircle2,
  AlertTriangle,
  Building2,
  X,
  Save,
  Plus,
  TrendingUp,
  Receipt
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function FeeStructureManager() {
  const { feeStructures, updateFeeStructure, currentCollege, authenticatedSessions } = useApp();
  const activeCollege = authenticatedSessions?.college_admin || currentCollege;

  const [editingDept, setEditingDept] = useState(null);
  const [editForm, setEditForm] = useState({
    tuitionFee: 0,
    labLibraryFee: 0,
    examFee: 0,
    developmentFee: 0,
    dueDate: '',
    lateFeePerDay: 50
  });

  const handleOpenEdit = (fee) => {
    setEditingDept(fee.department);
    setEditForm({
      tuitionFee: fee.tuitionFee,
      labLibraryFee: fee.labLibraryFee,
      examFee: fee.examFee,
      developmentFee: fee.developmentFee,
      dueDate: fee.dueDate,
      lateFeePerDay: fee.lateFeePerDay
    });
  };

  const handleSaveEdit = (e) => {
    e.preventDefault();
    if (!editingDept) return;
    updateFeeStructure(editingDept, editForm);
    setEditingDept(null);
  };

  const currentTotalCalculated =
    Number(editForm.tuitionFee || 0) +
    Number(editForm.labLibraryFee || 0) +
    Number(editForm.examFee || 0) +
    Number(editForm.developmentFee || 0);

  return (
    <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm p-6 md:p-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-5">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-blue-50 text-blue-700 text-[11px] font-extrabold uppercase tracking-wider mb-1.5">
            <CreditCard className="w-3.5 h-3.5" /> Institutional Finance & Accounts Directorate
          </div>
          <h2 className="text-xl font-extrabold text-slate-900">
            Stream-Wise Fee Structure & Tuition Maintenance
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Configure term fees, laboratory surcharges, and university exam dues for each academic stream of {activeCollege?.name}.
          </p>
        </div>

        <div className="flex items-center gap-2 font-mono text-xs font-bold text-slate-700 bg-slate-50 px-3.5 py-2 rounded-xl border border-slate-200">
          <Receipt className="w-4 h-4 text-emerald-600" />
          <span>Active Academic Year: 2026-27</span>
        </div>
      </div>

      {/* Stream Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {feeStructures.map((f) => {
          return (
            <div
              key={f.id}
              className="p-5 rounded-2xl bg-gradient-to-b from-slate-50 to-white border border-slate-200/90 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-extrabold text-sm text-slate-900">{f.department}</span>
                  <span className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 text-[10px] font-extrabold">
                    Sem {f.semester}
                  </span>
                </div>
                <p className="text-xs text-slate-500 truncate mb-4">{f.courseName}</p>

                {/* Breakdown List */}
                <div className="space-y-1.5 text-xs text-slate-600 border-t border-slate-100 pt-3">
                  <div className="flex justify-between">
                    <span>Tuition Fee:</span>
                    <strong className="text-slate-900">₹{f.tuitionFee?.toLocaleString('en-IN')}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Lab & Library:</span>
                    <strong className="text-slate-900">₹{f.labLibraryFee?.toLocaleString('en-IN')}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Exam / University:</span>
                    <strong className="text-slate-900">₹{f.examFee?.toLocaleString('en-IN')}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Development Fund:</span>
                    <strong className="text-slate-900">₹{f.developmentFee?.toLocaleString('en-IN')}</strong>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t-2 border-slate-200 flex items-baseline justify-between">
                  <span className="text-xs font-extrabold uppercase text-slate-500">Total Semester:</span>
                  <span className="text-lg font-black text-blue-700">
                    ₹{f.totalFee?.toLocaleString('en-IN')}
                  </span>
                </div>

                <div className="mt-2 text-[10px] text-slate-400 flex items-center justify-between">
                  <span>Due: {f.dueDate}</span>
                  <span>Late Fee: ₹{f.lateFeePerDay}/day</span>
                </div>
              </div>

              <button
                onClick={() => handleOpenEdit(f)}
                className="mt-4 w-full py-2 px-3 rounded-xl bg-blue-50 hover:bg-blue-600 hover:text-white text-blue-700 font-bold text-xs transition-all flex items-center justify-center gap-1.5 border border-blue-200"
              >
                <Edit3 className="w-3.5 h-3.5" /> Modify {f.department} Fees
              </button>
            </div>
          );
        })}
      </div>

      {/* Edit Fee Structure Modal */}
      {editingDept && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-lg w-full shadow-2xl border border-slate-200 overflow-hidden">
            <div className="p-6 bg-gradient-to-r from-blue-900 via-indigo-950 to-slate-900 text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-white/10 rounded-2xl">
                  <CreditCard className="w-6 h-6 text-blue-300" />
                </div>
                <div>
                  <h3 className="text-lg font-bold">Edit Fee Structure: {editingDept}</h3>
                  <p className="text-xs text-blue-200">Updates live fees for Student & Parent portals</p>
                </div>
              </div>
              <button
                onClick={() => setEditingDept(null)}
                className="p-1.5 rounded-full hover:bg-white/10 text-white/80 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="p-6 space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Tuition Fee (₹) *</label>
                  <input
                    type="number"
                    required
                    value={editForm.tuitionFee}
                    onChange={(e) => setEditForm({ ...editForm, tuitionFee: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Lab & Library Fee (₹) *</label>
                  <input
                    type="number"
                    required
                    value={editForm.labLibraryFee}
                    onChange={(e) => setEditForm({ ...editForm, labLibraryFee: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Exam & Evaluation Fee (₹) *</label>
                  <input
                    type="number"
                    required
                    value={editForm.examFee}
                    onChange={(e) => setEditForm({ ...editForm, examFee: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Campus Development Fund (₹) *</label>
                  <input
                    type="number"
                    required
                    value={editForm.developmentFee}
                    onChange={(e) => setEditForm({ ...editForm, developmentFee: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-1">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Payment Due Date</label>
                  <input
                    type="date"
                    value={editForm.dueDate}
                    onChange={(e) => setEditForm({ ...editForm, dueDate: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Late Fine (₹ per Day)</label>
                  <input
                    type="number"
                    value={editForm.lateFeePerDay}
                    onChange={(e) => setEditForm({ ...editForm, lateFeePerDay: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900"
                  />
                </div>
              </div>

              {/* Total Calculation Preview */}
              <div className="p-3.5 bg-blue-50/80 border border-blue-200 rounded-2xl flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-extrabold uppercase text-blue-800 block">
                    Calculated Total Semester Fee:
                  </span>
                  <span className="text-xl font-black text-blue-900">
                    ₹{currentTotalCalculated.toLocaleString('en-IN')}
                  </span>
                </div>
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                  Instant Student Portal Sync
                </span>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setEditingDept(null)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md transition-all"
                >
                  <Save className="w-3.5 h-3.5" /> Save Fee Schedule
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
