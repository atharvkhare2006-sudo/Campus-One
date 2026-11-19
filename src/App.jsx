import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import Navbar from './components/Navbar';
import RoleSwitcher from './components/RoleSwitcher';
import RoleGatekeeper from './components/RoleGatekeeper';
import Toast from './components/Toast';
import AICampusBot from './components/AICampusBot';
import SuperAdminView from './views/SuperAdminView';
import CollegeAdminView from './views/CollegeAdminView';
import FacultyView from './views/FacultyView';
import StudentView from './views/StudentView';
import ParentView from './views/ParentView';

function DashboardContent() {
  const { currentRole } = useApp();

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* 1-Click Role Switcher for seamless presentations and testing */}
      <RoleSwitcher />

      {/* Main Global Navigation */}
      <Navbar />

      {/* Main Content Area with Strict Institutional Role Gatekeeper */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {currentRole === 'super_admin' && <SuperAdminView />}

        {currentRole === 'college_admin' && (
          <RoleGatekeeper role="college_admin" roleTitle="College Admin">
            <CollegeAdminView />
          </RoleGatekeeper>
        )}

        {currentRole === 'faculty' && (
          <RoleGatekeeper role="faculty" roleTitle="Faculty">
            <FacultyView />
          </RoleGatekeeper>
        )}

        {currentRole === 'student' && (
          <RoleGatekeeper role="student" roleTitle="Student">
            <StudentView />
          </RoleGatekeeper>
        )}

        {currentRole === 'parent' && (
          <RoleGatekeeper role="parent" roleTitle="Parent & Guardian">
            <ParentView />
          </RoleGatekeeper>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200/80 py-6 mt-12 text-center text-xs text-slate-400">
        <p className="font-semibold text-slate-600">Campus One • All-in-One Higher Ed & Campus Operating System</p>
        <p className="mt-1">Developed for BCA Final Project • Multi-Tenant Architecture with Python & MySQL Integration</p>
      </footer>

      {/* Floating 24/7 Campus AI Chatbot */}
      <AICampusBot />

      {/* Floating Alerts & Toast */}
      <Toast />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <DashboardContent />
    </AppProvider>
  );
}
