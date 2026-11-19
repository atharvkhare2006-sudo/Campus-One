import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Building2,
  CheckCircle,
  XCircle,
  Clock,
  Plus,
  TrendingUp,
  Users,
  GraduationCap,
  CreditCard,
  ShieldAlert,
  Search,
  Filter,
  ExternalLink
} from 'lucide-react';
import AddCollegeModal from '../components/modals/AddCollegeModal';
import SaaSMetricsAnalytics from '../components/SaaSMetricsAnalytics';

export default function SuperAdminView() {
  const { colleges, approveCollege, rejectCollege } = useApp();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredColleges = colleges.filter((col) => {
    const matchesStatus = filterStatus === 'all' || col.status === filterStatus;
    const matchesSearch =
      col.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      col.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      col.city.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const totalStudents = colleges.reduce((sum, c) => sum + (c.studentsCount || 0), 0);
  const totalFaculty = colleges.reduce((sum, c) => sum + (c.facultyCount || 0), 0);
  const approvedCount = colleges.filter((c) => c.status === 'approved').length;
  const pendingCount = colleges.filter((c) => c.status === 'pending').length;

  return (
    <div className="space-y-6">
      {/* SaaS Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-purple-950 p-6 md:p-8 text-white shadow-xl">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-xs font-semibold uppercase tracking-wider mb-3">
              Super Admin SaaS Headquarters
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">
              Campus One Enterprise Network
            </h1>
            <p className="mt-1 text-sm text-slate-300 max-w-2xl leading-relaxed">
              Global control panel to onboard universities, approve institutional licenses, and monitor multi-tenant campus operations.
            </p>
          </div>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-indigo-500 hover:bg-indigo-600 font-semibold text-white shadow-lg shadow-indigo-500/30 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <Plus className="w-5 h-5" />
            <span>Onboard New College</span>
          </button>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Active Colleges</p>
            <h3 className="text-2xl font-extrabold text-slate-900 mt-1">{approvedCount}</h3>
            <p className="text-xs text-emerald-600 font-semibold mt-1 flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5" /> +100% renewal rate
            </p>
          </div>
          <div className="p-3 bg-indigo-50 text-indigo-600 rounded-2xl">
            <Building2 className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Pending Approvals</p>
            <h3 className="text-2xl font-extrabold text-amber-600 mt-1">{pendingCount}</h3>
            <p className="text-xs text-slate-500 mt-1">Institutes waiting review</p>
          </div>
          <div className="p-3 bg-amber-50 text-amber-600 rounded-2xl">
            <Clock className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Enrolled Students</p>
            <h3 className="text-2xl font-extrabold text-slate-900 mt-1">{totalStudents.toLocaleString()}</h3>
            <p className="text-xs text-indigo-600 font-semibold mt-1">Across all colleges</p>
          </div>
          <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl">
            <GraduationCap className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Active Faculty</p>
            <h3 className="text-2xl font-extrabold text-slate-900 mt-1">{totalFaculty.toLocaleString()}</h3>
            <p className="text-xs text-purple-600 font-semibold mt-1">Professors & HODs</p>
          </div>
          <div className="p-3 bg-purple-50 text-purple-600 rounded-2xl">
            <Users className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Unique Enterprise Feature: SaaS Metrics & Predictive ARR Engine */}
      <SaaSMetricsAnalytics />

      {/* College Directory & Approval Queue */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden">
        {/* Table Controls */}
        <div className="p-5 border-b border-slate-100 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="relative flex-1 md:w-72">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search college, city, or code..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600"
              />
            </div>
            <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl text-xs font-semibold">
              <button
                onClick={() => setFilterStatus('all')}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  filterStatus === 'all' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                All ({colleges.length})
              </button>
              <button
                onClick={() => setFilterStatus('approved')}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  filterStatus === 'approved' ? 'bg-white text-emerald-700 shadow-sm' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Approved ({approvedCount})
              </button>
              <button
                onClick={() => setFilterStatus('pending')}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  filterStatus === 'pending' ? 'bg-white text-amber-700 shadow-sm' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Pending ({pendingCount})
              </button>
            </div>
          </div>
          <span className="text-xs text-slate-400">
            Showing {filteredColleges.length} of {colleges.length} registered institutions
          </span>
        </div>

        {/* Colleges Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-slate-50/80 text-xs font-bold text-slate-500 uppercase tracking-wider border-b border-slate-100">
              <tr>
                <th className="px-6 py-4">College Details</th>
                <th className="px-4 py-4">Location</th>
                <th className="px-4 py-4">SaaS Tier</th>
                <th className="px-4 py-4">Capacity</th>
                <th className="px-4 py-4">Status</th>
                <th className="px-6 py-4 text-right">Approval Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {filteredColleges.map((col) => {
                const isPending = col.status === 'pending';
                const isApproved = col.status === 'approved';

                return (
                  <tr key={col.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center font-bold text-indigo-700 text-xs">
                          {col.code}
                        </div>
                        <div>
                          <h4 className="font-bold text-slate-900">{col.name}</h4>
                          <div className="flex flex-wrap items-center gap-2 mt-1">
                            <span className="inline-flex items-center gap-1 text-[11px] font-mono font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-md border border-indigo-200">
                              Login ID: {col.loginId || `CLG-${col.code}-2026`}
                            </span>
                            <span className="text-xs text-slate-400">pwd: {col.tempPassword || `${col.code.toLowerCase()}@admin2026`}</span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-xs text-slate-600">
                      {col.city}, {col.state}
                    </td>
                    <td className="px-4 py-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-purple-50 text-purple-700 border border-purple-200">
                        {col.plan}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-xs text-slate-600">
                      <div><strong className="text-slate-800">{col.studentsCount}</strong> Students</div>
                      <div className="text-slate-400">{col.facultyCount} Faculty</div>
                    </td>
                    <td className="px-4 py-4">
                      {isApproved ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                          <CheckCircle className="w-3.5 h-3.5" /> Approved
                        </span>
                      ) : isPending ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-700 border border-amber-200 animate-pulse">
                          <Clock className="w-3.5 h-3.5" /> Awaiting Review
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-rose-50 text-rose-700 border border-rose-200">
                          <XCircle className="w-3.5 h-3.5" /> Rejected
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right">
                      {isPending ? (
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => approveCollege(col.id)}
                            className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-sm transition-all"
                          >
                            Approve College
                          </button>
                          <button
                            onClick={() => rejectCollege(col.id)}
                            className="px-3 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-600 text-xs font-bold rounded-xl transition-all"
                          >
                            Reject
                          </button>
                        </div>
                      ) : (
                        <span className="text-xs text-slate-400 italic">Operational</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <AddCollegeModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} />
    </div>
  );
}
