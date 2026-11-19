import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  initialColleges,
  initialDepartments,
  initialSubjects,
  initialFaculty,
  initialStudents,
  initialNotes,
  initialEvents,
  initialAnnouncements,
  initialWardData,
  initialLeaveRequests,
  initialFeeStructures
} from '../data/mockData';

const AppContext = createContext();

export function AppProvider({ children }) {
  // Persistent or initial state
  const [currentRole, setCurrentRole] = useState(() => {
    return localStorage.getItem('campus_one_role') || 'super_admin';
  });

  const [colleges, setColleges] = useState(() => {
    const saved = localStorage.getItem('campus_one_colleges');
    return saved ? JSON.parse(saved) : initialColleges;
  });

  const [departments, setDepartments] = useState(() => {
    const saved = localStorage.getItem('campus_one_departments');
    return saved ? JSON.parse(saved) : initialDepartments;
  });

  const [subjects, setSubjects] = useState(() => {
    const saved = localStorage.getItem('campus_one_subjects');
    return saved ? JSON.parse(saved) : initialSubjects;
  });

  const [faculty, setFaculty] = useState(() => {
    const saved = localStorage.getItem('campus_one_faculty');
    return saved ? JSON.parse(saved) : initialFaculty;
  });

  const [students, setStudents] = useState(() => {
    const saved = localStorage.getItem('campus_one_students');
    return saved ? JSON.parse(saved) : initialStudents;
  });

  const [notes, setNotes] = useState(() => {
    const saved = localStorage.getItem('campus_one_notes');
    return saved ? JSON.parse(saved) : initialNotes;
  });

  const [events, setEvents] = useState(() => {
    const saved = localStorage.getItem('campus_one_events');
    return saved ? JSON.parse(saved) : initialEvents;
  });

  const [announcements, setAnnouncements] = useState(() => {
    const saved = localStorage.getItem('campus_one_announcements');
    return saved ? JSON.parse(saved) : initialAnnouncements;
  });

  const [wardData, setWardData] = useState(() => {
    const saved = localStorage.getItem('campus_one_ward_data');
    return saved ? JSON.parse(saved) : initialWardData;
  });

  const [leaveRequests, setLeaveRequests] = useState(() => {
    const saved = localStorage.getItem('campus_one_leave_requests');
    return saved ? JSON.parse(saved) : initialLeaveRequests;
  });

  const [feeStructures, setFeeStructures] = useState(() => {
    const saved = localStorage.getItem('campus_one_fee_structures');
    return saved ? JSON.parse(saved) : initialFeeStructures;
  });

  // Strict Institutional Session Gatekeeper
  const [authenticatedSessions, setAuthenticatedSessions] = useState(() => {
    const saved = localStorage.getItem('campus_one_sessions');
    return saved ? JSON.parse(saved) : {
      super_admin: { role: 'super_admin', name: 'Super Admin HQ', loginId: 'admin@campusone.io' },
      college_admin: null,
      faculty: null,
      student: null,
      parent: null
    };
  });

  // Dedicated Login Modal control state
  const [loginModalConfig, setLoginModalConfig] = useState({
    isOpen: false,
    targetRole: 'college_admin'
  });

  const [activeAttendanceSession, setActiveAttendanceSession] = useState({
    active: true,
    code: '8492',
    subject: 'Database Management Systems (DBMS)',
    faculty: 'Dr. Ananya Pandey',
    createdAt: new Date().toISOString()
  });

  const [selectedCollegeId, setSelectedCollegeId] = useState('col-1');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [toast, setToast] = useState(null);

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem('campus_one_role', currentRole);
  }, [currentRole]);

  useEffect(() => {
    localStorage.setItem('campus_one_colleges', JSON.stringify(colleges));
  }, [colleges]);

  useEffect(() => {
    localStorage.setItem('campus_one_faculty', JSON.stringify(faculty));
  }, [faculty]);

  useEffect(() => {
    localStorage.setItem('campus_one_notes', JSON.stringify(notes));
  }, [notes]);

  useEffect(() => {
    localStorage.setItem('campus_one_events', JSON.stringify(events));
  }, [events]);

  useEffect(() => {
    localStorage.setItem('campus_one_announcements', JSON.stringify(announcements));
  }, [announcements]);

  useEffect(() => {
    localStorage.setItem('campus_one_ward_data', JSON.stringify(wardData));
  }, [wardData]);

  useEffect(() => {
    localStorage.setItem('campus_one_leave_requests', JSON.stringify(leaveRequests));
  }, [leaveRequests]);

  useEffect(() => {
    localStorage.setItem('campus_one_sessions', JSON.stringify(authenticatedSessions));
  }, [authenticatedSessions]);

  useEffect(() => {
    localStorage.setItem('campus_one_fee_structures', JSON.stringify(feeStructures));
  }, [feeStructures]);

  // College Admin: Update stream-wise fee structure
  const updateFeeStructure = (deptCode, updatedData) => {
    setFeeStructures(prev =>
      prev.map(f => {
        if (f.department.toLowerCase() === deptCode.toLowerCase()) {
          const tuition = Number(updatedData.tuitionFee ?? f.tuitionFee);
          const lab = Number(updatedData.labLibraryFee ?? f.labLibraryFee);
          const exam = Number(updatedData.examFee ?? f.examFee);
          const dev = Number(updatedData.developmentFee ?? f.developmentFee);
          const total = tuition + lab + exam + dev;
          return {
            ...f,
            ...updatedData,
            tuitionFee: tuition,
            labLibraryFee: lab,
            examFee: exam,
            developmentFee: dev,
            totalFee: total
          };
        }
        return f;
      })
    );
    showToast(`Fee structure updated for ${deptCode.toUpperCase()}! Total: ₹${Number(updatedData.tuitionFee || 0) + Number(updatedData.labLibraryFee || 0) + Number(updatedData.examFee || 0) + Number(updatedData.developmentFee || 0)}`, 'success');
  };

  // Student & Parent: Pay fees online
  const payStudentFees = ({ rollNo, amount, paymentMethod = 'UPI', termTitle = 'Semester 3 Tuition & Exam Fees' }) => {
    const newReceipt = {
      id: `RCP-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      amount: Number(amount),
      date: new Date().toISOString().split('T')[0],
      type: termTitle,
      status: 'Paid',
      paymentMethod: paymentMethod,
      transactionId: `TXN${Date.now().toString().slice(-8)}`
    };

    setWardData(prev => {
      const newPending = Math.max(0, (prev.pendingFee || 0) - Number(amount));
      const newPaid = (prev.paidFee || 0) + Number(amount);
      return {
        ...prev,
        pendingFee: newPending,
        paidFee: newPaid,
        feeStatus: newPending === 0 ? 'Paid' : 'Partial Paid',
        receipts: [newReceipt, ...(prev.receipts || [])]
      };
    });

    showToast(`Payment of ₹${amount} successful via ${paymentMethod}! Official receipt ${newReceipt.id} issued.`, 'success');
    return newReceipt;
  };

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 3500);
  };

  // Helper to open/close login modal for specific role
  const openLoginModal = (targetRole = 'college_admin') => {
    setLoginModalConfig({ isOpen: true, targetRole });
  };

  const closeLoginModal = () => {
    setLoginModalConfig({ isOpen: false, targetRole: null });
  };

  // Logout / Lock a role portal
  const logoutRole = (role) => {
    setAuthenticatedSessions(prev => ({ ...prev, [role]: null }));
    showToast(`Locked ${role.replace('_', ' ')} portal. Login credentials required.`, 'info');
  };

  // Gatekeeper Role Switcher: If not authenticated, open login pop-up modal immediately!
  const requestRoleAccess = (role) => {
    setCurrentRole(role);
    setActiveTab('dashboard');
    if (role !== 'super_admin' && (!authenticatedSessions || !authenticatedSessions[role])) {
      openLoginModal(role);
    }
  };

  // Helper to switch role
  const switchRole = (role) => {
    requestRoleAccess(role);
    const roleLabels = {
      super_admin: 'Super Admin (SaaS Owner)',
      college_admin: 'College Admin Portal',
      faculty: 'Faculty Academic Portal',
      student: 'Student Learning Workspace',
      parent: 'Parent & Guardian Portal'
    };
    showToast(`Accessing ${roleLabels[role] || role}`, 'info');
  };

  // Super Admin Actions
  const approveCollege = (collegeId) => {
    setColleges(prev =>
      prev.map(col =>
        col.id === collegeId ? { ...col, status: 'approved', approvedAt: new Date().toISOString().split('T')[0] } : col
      )
    );
    showToast('College successfully approved and onboarded!', 'success');
  };

  const rejectCollege = (collegeId) => {
    setColleges(prev =>
      prev.map(col =>
        col.id === collegeId ? { ...col, status: 'rejected' } : col
      )
    );
    showToast('College application rejected.', 'error');
  };

  const addCollege = (newCol) => {
    const generatedLoginId = newCol.loginId || `CLG-${(newCol.code || 'COL').toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`;
    const tempPassword = newCol.tempPassword || `${(newCol.code || 'col').toLowerCase()}@admin2026`;
    const colObj = {
      id: `col-${Date.now()}`,
      status: 'approved',
      studentsCount: 0,
      facultyCount: 0,
      established: 2026,
      approvedAt: new Date().toISOString().split('T')[0],
      logoText: newCol.code || 'COL',
      themeColor: 'indigo',
      ...newCol,
      loginId: generatedLoginId,
      tempPassword: tempPassword
    };
    setColleges(prev => [colObj, ...prev]);
    showToast(`College onboarded! Unique Login ID: ${generatedLoginId} | Password: ${tempPassword}`, 'success');
    return colObj;
  };

  // College Admin Actions
  const addFacultyMember = (facultyData) => {
    const deptPrefix = (facultyData.department || 'BCA').substring(0, 3).toUpperCase();
    const generatedLoginId = facultyData.loginId || `FAC-${deptPrefix}-${Math.floor(100 + Math.random() * 900)}`;
    const tempPassword = facultyData.tempPassword || `faculty@${deptPrefix.toLowerCase()}`;
    const newFac = {
      id: `fac-${Date.now()}`,
      status: 'active',
      joinedDate: new Date().toISOString().split('T')[0],
      ...facultyData,
      loginId: generatedLoginId,
      tempPassword: tempPassword
    };
    setFaculty(prev => [newFac, ...prev]);
    showToast(`Faculty "${facultyData.name}" assigned! Unique Login ID: ${generatedLoginId}`, 'success');
    return newFac;
  };

  // Faculty Actions: Student Admission & ID Generation
  const addStudent = (studentData) => {
    const cleanRoll = studentData.enrollmentNo || `0103CA23${Math.floor(1000 + Math.random() * 9000)}`;
    const cleanPass = studentData.tempPassword || `student@${Math.floor(100 + Math.random() * 900)}`;
    const newStu = {
      id: `stu-${Date.now()}`,
      enrollmentNo: cleanRoll,
      loginId: cleanRoll,
      tempPassword: cleanPass,
      parentPin: studentData.parentPin || (studentData.phone ? studentData.phone.slice(-5) : '12345'),
      parentName: studentData.parentName || `Guardian of ${studentData.name}`,
      attendance: studentData.attendance || '100%',
      collegeId: 'col-1',
      ...studentData
    };
    setStudents(prev => [newStu, ...prev]);
    showToast(`Student "${newStu.name}" enrolled! Roll No: ${cleanRoll} | Password: ${cleanPass}`, 'success');
    return newStu;
  };

  const loginWithCredentials = ({ role, loginId, password }) => {
    const cleanId = (loginId || '').trim().toLowerCase();

    // 1. College Admin Login
    if (role === 'college_admin') {
      const match = colleges.find(
        c => (c.loginId && c.loginId.toLowerCase() === cleanId) ||
             (c.code && c.code.toLowerCase() === cleanId) ||
             (c.adminEmail && c.adminEmail.toLowerCase() === cleanId)
      );
      if (match) {
        setSelectedCollegeId(match.id);
        setCurrentRole('college_admin');
        setAuthenticatedSessions(prev => ({
          ...prev,
          college_admin: { ...match, authenticatedAt: new Date().toISOString() }
        }));
        showToast(`Authenticated as ${match.name}! (ID: ${match.loginId || match.code})`, 'success');
        return true;
      }
    }

    // 2. Faculty Login
    if (role === 'faculty') {
      const match = faculty.find(
        f => (f.loginId && f.loginId.toLowerCase() === cleanId) ||
             (f.email && f.email.toLowerCase() === cleanId)
      );
      if (match) {
        setCurrentRole('faculty');
        setAuthenticatedSessions(prev => ({
          ...prev,
          faculty: { ...match, authenticatedAt: new Date().toISOString() }
        }));
        showToast(`Welcome Dr./Prof. ${match.name}! (ID: ${match.loginId || 'FAC-BCA-101'})`, 'success');
        return true;
      }
    }

    // 3. Student Login
    if (role === 'student') {
      const match = students.find(
        s => (s.loginId && s.loginId.toLowerCase() === cleanId) ||
             (s.enrollmentNo && s.enrollmentNo.toLowerCase() === cleanId) ||
             (s.email && s.email.toLowerCase() === cleanId)
      );
      if (match) {
        setCurrentRole('student');
        setAuthenticatedSessions(prev => ({
          ...prev,
          student: { ...match, authenticatedAt: new Date().toISOString() }
        }));
        showToast(`Welcome ${match.name} (Roll: ${match.enrollmentNo})!`, 'success');
        return true;
      }
    }

    // 4. Parent Login (Linked directly to Student ID)
    if (role === 'parent') {
      const match = students.find(
        s => (s.enrollmentNo && s.enrollmentNo.toLowerCase() === cleanId) ||
             (s.loginId && s.loginId.toLowerCase() === cleanId) ||
             (s.phone && s.phone.includes(cleanId))
      );
      if (match) {
        setCurrentRole('parent');
        setAuthenticatedSessions(prev => ({
          ...prev,
          parent: { ward: match, authenticatedAt: new Date().toISOString() }
        }));
        showToast(`Guardian access granted for ward: ${match.name} (${match.enrollmentNo})!`, 'success');
        return true;
      }
    }

    // 5. Super Admin Login
    if (role === 'super_admin') {
      setCurrentRole('super_admin');
      setAuthenticatedSessions(prev => ({
        ...prev,
        super_admin: { role: 'super_admin', name: 'Super Admin HQ', loginId: 'admin@campusone.io' }
      }));
      showToast('Super Admin Platform Headquarters authenticated!', 'success');
      return true;
    }

    showToast('Login failed: Invalid credentials or Login ID.', 'error');
    return false;
  };

  const toggleFacultyStatus = (facultyId) => {
    setFaculty(prev =>
      prev.map(f =>
        f.id === facultyId ? { ...f, status: f.status === 'active' ? 'suspended' : 'active' } : f
      )
    );
    showToast('Faculty status updated!', 'info');
  };

  // Faculty Actions
  const uploadNote = (noteData) => {
    const newNote = {
      id: `note-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      downloadCount: 0,
      uploadedBy: 'Dr. Ananya Pandey',
      department: 'BCA',
      fileSize: '3.1 MB',
      fileType: 'pdf',
      ...noteData
    };
    setNotes(prev => [newNote, ...prev]);
    showToast(`Notes for "${newNote.subject}" published to students!`, 'success');
  };

  const deleteNote = (noteId) => {
    setNotes(prev => prev.filter(n => n.id !== noteId));
    showToast('Note material removed.', 'info');
  };

  // Event Actions
  const createEvent = (eventData) => {
    const newEvt = {
      id: `evt-${Date.now()}`,
      registeredCount: 0,
      status: 'Upcoming',
      isRegisteredByMe: false,
      bannerColor: 'from-indigo-600 to-purple-700',
      ...eventData
    };
    setEvents(prev => [newEvt, ...prev]);
    showToast(`Event "${eventData.title}" announced campus-wide!`, 'success');
  };

  const toggleEventRegistration = (eventId) => {
    setEvents(prev =>
      prev.map(evt => {
        if (evt.id === eventId) {
          const isReg = !evt.isRegisteredByMe;
          return {
            ...evt,
            isRegisteredByMe: isReg,
            registeredCount: isReg ? evt.registeredCount + 1 : Math.max(0, evt.registeredCount - 1)
          };
        }
        return evt;
      })
    );
    const event = events.find(e => e.id === eventId);
    if (event?.isRegisteredByMe) {
      showToast('Registration cancelled for event.', 'info');
    } else {
      showToast(`Registered successfully for "${event?.title || 'Event'}"!`, 'success');
    }
  };

  // Announcement Actions
  const createAnnouncement = (annData) => {
    const newAnn = {
      id: `ann-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      postedBy: currentRole === 'super_admin' ? 'Campus One Headquarters' : 'College Administration',
      ...annData
    };
    setAnnouncements(prev => [newAnn, ...prev]);
    showToast('Official circular broadcasted successfully!', 'success');
  };

  // Reset demo data helper
  const resetDemoData = () => {
    localStorage.clear();
    setColleges(initialColleges);
    setFaculty(initialFaculty);
    setNotes(initialNotes);
    setEvents(initialEvents);
    setAnnouncements(initialAnnouncements);
    setWardData(initialWardData);
    setLeaveRequests(initialLeaveRequests);
    showToast('Demo data reset to defaults.', 'info');
  };

  const submitLeaveRequest = (leaveData) => {
    const newLeave = {
      id: `leave-${Date.now()}`,
      status: 'Pending',
      appliedDate: new Date().toISOString().split('T')[0],
      approvedBy: 'Under Review by HOD',
      ...leaveData
    };
    setLeaveRequests(prev => [newLeave, ...prev]);
    showToast('Leave application submitted to HOD & Class Mentor!', 'success');
  };

  const startAttendanceSession = ({ subject, code }) => {
    const dynamicCode = code || Math.floor(1000 + Math.random() * 9000).toString();
    setActiveAttendanceSession({
      active: true,
      code: dynamicCode,
      subject,
      faculty: 'Dr. Ananya Pandey',
      createdAt: new Date().toISOString()
    });
    showToast(`Smart Classroom Attendance started for "${subject}"! Code: ${dynamicCode}`, 'success');
    return dynamicCode;
  };

  const closeAttendanceSession = () => {
    setActiveAttendanceSession(prev => ({ ...prev, active: false }));
    showToast('Classroom Attendance session closed.', 'info');
  };

  const submitFacultyAttendance = ({ subject, studentStatuses, attendanceCode }) => {
    const rohanStatus = studentStatuses['0103CA231045'] || 'Present';
    
    setWardData(prev => {
      const updatedSubjects = prev.subjectAttendance.map(sub => {
        if (sub.name.toLowerCase().includes(subject.toLowerCase()) || subject.toLowerCase().includes(sub.code.toLowerCase()) || subject.toLowerCase().includes(sub.name.toLowerCase())) {
          const newAttended = rohanStatus === 'Present' ? sub.attended + 1 : sub.attended;
          const newTotal = sub.total + 1;
          const newPct = parseFloat(((newAttended / newTotal) * 100).toFixed(1));
          return {
            ...sub,
            attended: newAttended,
            total: newTotal,
            percentage: newPct,
            status: newPct >= 75 ? 'safe' : 'danger'
          };
        }
        return sub;
      });

      const totalAttended = updatedSubjects.reduce((acc, s) => acc + s.attended, 0);
      const totalLectures = updatedSubjects.reduce((acc, s) => acc + s.total, 0);
      const newOverallPct = parseFloat(((totalAttended / totalLectures) * 100).toFixed(1));

      const newLog = {
        date: new Date().toISOString().split('T')[0],
        subject: subject,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        status: rohanStatus,
        method: attendanceCode ? `Dynamic Code (${attendanceCode})` : 'Faculty In-Class Verification',
        alertSent: rohanStatus === 'Absent'
      };

      return {
        ...prev,
        overallAttendance: newOverallPct,
        subjectAttendance: updatedSubjects,
        recentAttendanceLogs: [newLog, ...prev.recentAttendanceLogs]
      };
    });

    showToast(`Attendance for ${subject} submitted and synced across Student & Parent portals!`, 'success');
  };

  const studentMarkAttendance = (enteredCode) => {
    if (!activeAttendanceSession || !activeAttendanceSession.active) {
      showToast('No active classroom attendance session right now!', 'error');
      return false;
    }
    if (enteredCode.trim() !== activeAttendanceSession.code.trim()) {
      showToast('Invalid Classroom Code! Please check the code displayed by your faculty.', 'error');
      return false;
    }

    submitFacultyAttendance({
      subject: activeAttendanceSession.subject,
      studentStatuses: { '0103CA231045': 'Present' },
      attendanceCode: enteredCode
    });
    showToast('Your attendance has been marked Present in the classroom!', 'success');
    return true;
  };

  const currentCollege = colleges.find(c => c.id === selectedCollegeId) || colleges[0];

  return (
    <AppContext.Provider
      value={{
        currentRole,
        switchRole,
        colleges,
        currentCollege,
        selectedCollegeId,
        setSelectedCollegeId,
        departments,
        subjects,
        faculty,
        students,
        notes,
        events,
        announcements,
        wardData,
        setWardData,
        leaveRequests,
        submitLeaveRequest,
        activeAttendanceSession,
        startAttendanceSession,
        closeAttendanceSession,
        submitFacultyAttendance,
        studentMarkAttendance,
        activeTab,
        setActiveTab,
        toast,
        showToast,
        // Authentication & Session Gatekeeper
        authenticatedSessions,
        loginModalConfig,
        openLoginModal,
        closeLoginModal,
        logoutRole,
        requestRoleAccess,
        // Actions
        approveCollege,
        rejectCollege,
        addCollege,
        addFacultyMember,
        addStudent,
        toggleFacultyStatus,
        uploadNote,
        deleteNote,
        createEvent,
        toggleEventRegistration,
        createAnnouncement,
        resetDemoData,
        loginWithCredentials,
        // Fee Structure & Online Payment
        feeStructures,
        updateFeeStructure,
        payStudentFees
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
