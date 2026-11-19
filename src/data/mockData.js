export const initialColleges = [
  {
    id: "col-1",
    name: "Apex Institute of Technology & Management",
    code: "AITM",
    city: "Bhopal",
    state: "Madhya Pradesh",
    status: "approved", // 'approved' | 'pending' | 'rejected'
    plan: "Enterprise",
    adminName: "Dr. R. K. Sharma",
    adminEmail: "admin@aitm.edu.in",
    loginId: "CLG-AITM-2026",
    tempPassword: "aitm@admin2026",
    studentsCount: 2450,
    facultyCount: 112,
    established: 2008,
    approvedAt: "2024-06-15",
    logoText: "AITM",
    themeColor: "indigo"
  },
  {
    id: "col-2",
    name: "National College of Computer Applications",
    code: "NCCA",
    city: "Indore",
    state: "Madhya Pradesh",
    status: "approved",
    plan: "Pro",
    adminName: "Prof. Sunita Verma",
    adminEmail: "director@ncca.ac.in",
    loginId: "CLG-NCCA-2026",
    tempPassword: "ncca@admin2026",
    studentsCount: 1820,
    facultyCount: 78,
    established: 2012,
    approvedAt: "2024-08-01",
    logoText: "NCCA",
    themeColor: "blue"
  },
  {
    id: "col-3",
    name: "Saraswati Institute of Science & Technology",
    code: "SIST",
    city: "Jabalpur",
    state: "Madhya Pradesh",
    status: "pending", // Waiting for Super Admin approval
    plan: "Standard",
    adminName: "Dr. Vivek Mishra",
    adminEmail: "principal@sist.org",
    loginId: "CLG-SIST-2026",
    tempPassword: "sist@admin2026",
    studentsCount: 1200,
    facultyCount: 54,
    established: 2017,
    appliedAt: "2026-11-10",
    logoText: "SIST",
    themeColor: "emerald"
  },
  {
    id: "col-4",
    name: "Vidya Global Engineering & Business School",
    code: "VGEBS",
    city: "Gwalior",
    state: "Madhya Pradesh",
    status: "pending",
    plan: "Enterprise",
    adminName: "Er. Alok Saxena",
    adminEmail: "admin@vidyaglobal.edu",
    loginId: "CLG-VGEBS-2026",
    tempPassword: "vgebs@admin2026",
    studentsCount: 3100,
    facultyCount: 140,
    established: 2010,
    appliedAt: "2026-11-14",
    logoText: "VGEBS",
    themeColor: "violet"
  }
];

export const initialDepartments = [
  { id: "dept-1", code: "BCA", name: "Bachelor of Computer Applications", semesters: 6, students: 480 },
  { id: "dept-2", code: "B.Tech CSE", name: "Computer Science & Engineering", semesters: 8, students: 720 },
  { id: "dept-3", code: "MCA", name: "Master of Computer Applications", semesters: 4, students: 240 },
  { id: "dept-4", code: "BBA", name: "Bachelor of Business Administration", semesters: 6, students: 360 }
];

export const initialSubjects = [
  { id: "sub-1", code: "BCA-301", name: "Database Management Systems (DBMS)", department: "BCA", semester: 3 },
  { id: "sub-2", code: "BCA-302", name: "Data Structures & Algorithms in C++", department: "BCA", semester: 3 },
  { id: "sub-3", code: "BCA-303", name: "Web Technologies & Full-Stack", department: "BCA", semester: 3 },
  { id: "sub-4", code: "BCA-304", name: "Operating Systems Principles", department: "BCA", semester: 3 },
  { id: "sub-5", code: "BCA-401", name: "Computer Networks & Security", department: "BCA", semester: 4 },
  { id: "sub-6", code: "BCA-402", name: "Python Programming & Data Analysis", department: "BCA", semester: 4 }
];

export const initialFaculty = [
  {
    id: "fac-1",
    name: "Dr. Ananya Pandey",
    email: "ananya.pandey@aitm.edu.in",
    loginId: "FAC-BCA-101",
    tempPassword: "faculty@aitm",
    department: "BCA",
    designation: "Associate Professor & HOD",
    subjects: ["Database Management Systems (DBMS)", "Web Technologies & Full-Stack"],
    status: "active",
    joinedDate: "2020-07-10",
    phone: "+91 98765 43210"
  },
  {
    id: "fac-2",
    name: "Prof. Rajesh Joshi",
    email: "rajesh.joshi@aitm.edu.in",
    loginId: "FAC-BCA-102",
    tempPassword: "faculty@aitm",
    department: "BCA",
    designation: "Assistant Professor",
    subjects: ["Data Structures & Algorithms in C++", "Operating Systems Principles"],
    status: "active",
    joinedDate: "2021-08-15",
    phone: "+91 98234 56789"
  },
  {
    id: "fac-3",
    name: "Prof. Neha Gupta",
    email: "neha.gupta@aitm.edu.in",
    loginId: "FAC-CSE-103",
    tempPassword: "faculty@aitm",
    department: "B.Tech CSE",
    designation: "Assistant Professor",
    subjects: ["Computer Networks & Security"],
    status: "active",
    joinedDate: "2022-01-12",
    phone: "+91 91234 56780"
  }
];

export const initialStudents = [
  {
    id: "stu-1",
    enrollmentNo: "0103CA231045",
    loginId: "0103CA231045",
    tempPassword: "student@rohan",
    parentPin: "95891",
    parentName: "Mr. R. K. Vishwakarma",
    name: "Rohan Vishwakarma",
    email: "rohan.v@student.aitm.edu.in",
    department: "BCA",
    semester: 3,
    section: "A",
    attendance: "88%",
    collegeId: "col-1",
    phone: "+91 95891 12345"
  },
  {
    id: "stu-2",
    enrollmentNo: "0103CA231089",
    loginId: "0103CA231089",
    tempPassword: "student@pooja",
    parentPin: "94250",
    parentName: "Mrs. Shanti Patel",
    name: "Pooja Patel",
    email: "pooja.p@student.aitm.edu.in",
    department: "BCA",
    semester: 3,
    section: "B",
    attendance: "94%",
    collegeId: "col-1",
    phone: "+91 94250 88776"
  },
  {
    id: "stu-3",
    enrollmentNo: "0103CA231012",
    loginId: "0103CA231012",
    tempPassword: "student@aman",
    parentPin: "98112",
    parentName: "Mr. S. P. Tripathi",
    name: "Aman Tripathi",
    email: "aman.t@student.aitm.edu.in",
    department: "BCA",
    semester: 3,
    section: "A",
    attendance: "79%",
    collegeId: "col-1",
    phone: "+91 98112 33445"
  }
];

export const initialNotes = [
  {
    id: "note-1",
    title: "Unit 1: Relational Algebra & SQL Query Optimization",
    subject: "Database Management Systems (DBMS)",
    department: "BCA",
    semester: 3,
    unit: "Unit 1",
    uploadedBy: "Dr. Ananya Pandey",
    date: "2026-11-12",
    fileSize: "3.4 MB",
    fileType: "pdf",
    downloadCount: 142,
    description: "Complete handwritten notes covering Cartesian products, Join operations, Normalization (1NF, 2NF, 3NF, BCNF) and indexed search tree structures.",
    contentPreview: "DATABASE MANAGEMENT SYSTEMS - UNIT 1\n\nTopics Covered:\n1. Relational Data Model Concepts\n2. Integrity Constraints & Foreign Keys\n3. Relational Algebra Operations (Select, Project, Union, Set Difference, Cartesian Product, Joins)\n4. Tuple Relational Calculus\n5. Normal Forms: Functional Dependencies and Decomposition (1NF to BCNF)\n\nKey Exam Questions:\n- Explain the difference between theta join, equi join, and natural join with queries.\n- Why 3NF is preferred over BCNF in production systems?"
  },
  {
    id: "note-2",
    title: "Unit 2: Binary Search Trees & AVL Tree Balancing Algorithms",
    subject: "Data Structures & Algorithms in C++",
    department: "BCA",
    semester: 3,
    unit: "Unit 2",
    uploadedBy: "Prof. Rajesh Joshi",
    date: "2026-11-14",
    fileSize: "4.8 MB",
    fileType: "pdf",
    downloadCount: 98,
    description: "Detailed code implementations of AVL rotations (LL, RR, LR, RL), insertion complexities, and deletion edge cases with diagrams.",
    contentPreview: "DATA STRUCTURES IN C++ - UNIT 2: TREES & AVL\n\nTopics Covered:\n1. Tree Terminologies and Binary Tree Properties\n2. Binary Search Tree (BST) operations: Insert, Search, Delete\n3. Self-Balancing Trees: AVL Trees & Balance Factor\n4. Rotations: Single (LL, RR) & Double (LR, RL) Rotations\n5. Time and Space Complexity Proofs\n\nCode Snippet included for AVL Node Insertion and Rebalancing."
  },
  {
    id: "note-3",
    title: "Unit 3: Modern React Hooks & State Management Guide",
    subject: "Web Technologies & Full-Stack",
    department: "BCA",
    semester: 3,
    unit: "Unit 3",
    uploadedBy: "Dr. Ananya Pandey",
    date: "2026-11-15",
    fileSize: "2.1 MB",
    fileType: "pdf",
    downloadCount: 176,
    description: "Practical guide to useState, useEffect, useContext, custom hooks, and Tailwind CSS responsive grid systems for university project submissions.",
    contentPreview: "WEB TECHNOLOGIES - UNIT 3: MODERN REACT & FRONTEND\n\nTopics Covered:\n1. Component Architecture & Props vs State\n2. Hook Rules & useEffect Dependency Arrays\n3. Context API vs Global State\n4. REST API Integration with fetch and Axios\n5. Responsive Web Design using Tailwind CSS\n\nSample Project: Creating a dynamic CRUD interface with client-side caching."
  },
  {
    id: "note-4",
    title: "Unit 2: Process Synchronization & Deadlock Handling",
    subject: "Operating Systems Principles",
    department: "BCA",
    semester: 3,
    unit: "Unit 2",
    uploadedBy: "Prof. Rajesh Joshi",
    date: "2026-11-08",
    fileSize: "5.2 MB",
    fileType: "pdf",
    downloadCount: 110,
    description: "Semaphores, Peterson's Algorithm, Classical IPC problems (Producer-Consumer, Dining Philosophers), and Banker's Algorithm with solved numericals.",
    contentPreview: "OPERATING SYSTEMS - UNIT 2: SYNCHRONIZATION & DEADLOCKS\n\nTopics Covered:\n1. Critical Section Problem & Conditions for Solution\n2. Hardware and Software Solutions (TestAndSet, Peterson's)\n3. Counting & Binary Semaphores with Mutex\n4. Deadlock Necessary Conditions (Mutual Exclusion, Hold and Wait, No Preemption, Circular Wait)\n5. Banker's Algorithm for Deadlock Avoidance (Complete Solved Numerical)"
  }
];

export const initialEvents = [
  {
    id: "evt-1",
    title: "HackCampus 2026: 24-Hour National Hackathon",
    category: "Tech",
    date: "2026-12-05",
    time: "09:00 AM onwards",
    venue: "Main Auditorium & Computing Center",
    organizer: "Dept of Computer Applications",
    description: "Develop innovative solutions in AI, Smart Campus, EdTech and Sustainability. Cash prize pool of ₹1,00,000 + Internship opportunities.",
    maxParticipants: 200,
    registeredCount: 148,
    status: "Upcoming",
    isRegisteredByMe: true,
    bannerColor: "from-blue-600 to-indigo-700",
    tags: ["Hackathon", "Coding", "Cash Prize", "BCA / B.Tech"]
  },
  {
    id: "evt-2",
    title: "Annual Inter-College Sports Carnival 2026",
    category: "Sports",
    date: "2026-12-15",
    time: "08:00 AM - 05:00 PM",
    venue: "College Sports Complex & Cricket Ground",
    organizer: "Sports Directorate",
    description: "Competitions in Cricket, Football, Volleyball, Badminton, Table Tennis, and 100m/400m Athletics. Trophies and certificates for all winners.",
    maxParticipants: 500,
    registeredCount: 380,
    status: "Upcoming",
    isRegisteredByMe: false,
    bannerColor: "from-amber-500 to-orange-600",
    tags: ["Cricket", "Football", "Athletics", "Inter-College"]
  },
  {
    id: "evt-3",
    title: "Workshop on Full-Stack Development & Cloud Deployment",
    category: "Workshop",
    date: "2026-11-28",
    time: "02:00 PM - 05:00 PM",
    venue: "Seminar Hall 2 & Live Stream",
    organizer: "ACM Student Chapter",
    description: "Hands-on session on building React apps, Docker containers, and deploying to cloud with live CI/CD pipeline demonstrations.",
    maxParticipants: 120,
    registeredCount: 115,
    status: "Upcoming",
    isRegisteredByMe: false,
    bannerColor: "from-emerald-600 to-teal-700",
    tags: ["React", "Cloud", "Hands-on", "Certification"]
  },
  {
    id: "evt-4",
    title: "Tarang 2026: Annual Cultural Fest & Battle of Bands",
    category: "Cultural",
    date: "2026-12-22",
    time: "04:00 PM onwards",
    venue: "Open Air Amphitheatre",
    organizer: "Student Cultural Committee",
    description: "Dance competitions, theatrical drama, fashion runway, DJ night, and national band performances. Food stalls and gaming zones included.",
    maxParticipants: 1000,
    registeredCount: 650,
    status: "Upcoming",
    isRegisteredByMe: true,
    bannerColor: "from-fuchsia-600 to-pink-600",
    tags: ["Music", "Dance", "Fest", "Celebrity Night"]
  }
];

export const initialAnnouncements = [
  {
    id: "ann-1",
    title: "Mid-Semester Examination Schedule Announced (Sem 3 & 5)",
    category: "Exam",
    priority: "high",
    date: "2026-11-16",
    postedBy: "Examination Controller Office",
    targetAudience: "students",
    content: "The Mid-Semester Theory and Practical examinations will commence from December 10, 2026. Detailed date sheets by roll number have been uploaded to the portal. Please ensure all previous library dues are cleared before downloading admit cards."
  },
  {
    id: "ann-2",
    title: "TCS & Infosys Campus Placement Drive for BCA & MCA",
    category: "Placement",
    priority: "high",
    date: "2026-11-14",
    postedBy: "Training & Placement Cell (T&P)",
    targetAudience: "all",
    content: "Registration is now open for the upcoming joint campus recruitment drive. Eligibility: 60% or 6.5 CGPA throughout without active backlogs. Last date to submit resume on Campus One is November 25, 2026."
  },
  {
    id: "ann-3",
    title: "Library Timings Extended for Exam Preparations",
    category: "General",
    priority: "medium",
    date: "2026-11-12",
    postedBy: "Chief Librarian",
    targetAudience: "all",
    content: "The Central Digital Library will remain open until 10:00 PM on all weekdays and Saturdays starting from next Monday to assist students during exam preparations."
  }
];

export const initialWardData = {
  name: "Rohan Vishwakarma",
  rollNo: "0103CA231045",
  course: "BCA (Bachelor of Computer Applications)",
  semester: 3,
  section: "A",
  mentor: "Dr. Ananya Pandey",
  mentorDesignation: "Associate Professor & HOD",
  mentorPhone: "+91 98765 43210",
  mentorEmail: "ananya.pandey@aitm.edu.in",
  overallAttendance: 88.5,
  minRequiredAttendance: 75,
  currentSGPA: 8.4,
  cgpa: 8.35,
  backlogs: 0,
  feeStatus: "Paid",
  totalFee: 65000,
  paidFee: 65000,
  pendingFee: 0,
  receipts: [
    { id: "RCP-2026-8831", amount: 35000, date: "2026-08-10", type: "Semester 3 Tuition & Lab Fee", status: "Paid" },
    { id: "RCP-2026-4412", amount: 30000, date: "2026-10-15", type: "Semester 3 Exam, Library & Sports Fee", status: "Paid" }
  ],
  subjectAttendance: [
    { code: "BCA-301", name: "Database Management Systems (DBMS)", faculty: "Dr. Ananya Pandey", attended: 34, total: 37, percentage: 91.9, status: "safe" },
    { code: "BCA-302", name: "Data Structures & Algorithms in C++", faculty: "Prof. Rajesh Joshi", attended: 29, total: 34, percentage: 85.3, status: "safe" },
    { code: "BCA-303", name: "Web Technologies & Full-Stack", faculty: "Dr. Ananya Pandey", attended: 36, total: 40, percentage: 90.0, status: "safe" },
    { code: "BCA-304", name: "Operating Systems Principles", faculty: "Prof. Rajesh Joshi", attended: 22, total: 31, percentage: 70.9, status: "danger", classesNeeded: 4 }
  ],
  academicGrades: [
    { subject: "Database Management Systems (DBMS)", code: "BCA-301", midTerm: 28, maxMid: 30, internalQuiz: 19, maxQuiz: 20, grade: "A+", remarks: "Outstanding conceptual clarity in Normalization and SQL" },
    { subject: "Web Technologies & Full-Stack", code: "BCA-303", midTerm: 29, maxMid: 30, internalQuiz: 20, maxQuiz: 20, grade: "A+", remarks: "Excellent practical implementation of React components" },
    { subject: "Data Structures & Algorithms in C++", code: "BCA-302", midTerm: 26, maxMid: 30, internalQuiz: 18, maxQuiz: 20, grade: "A", remarks: "Good tree & graph traversal logic, needs slight practice in DP" },
    { subject: "Operating Systems Principles", code: "BCA-304", midTerm: 22, maxMid: 30, internalQuiz: 15, maxQuiz: 20, grade: "B+", remarks: "Fair understanding; improve attendance in process scheduling lectures" }
  ],
  recentAttendanceLogs: [
    { date: "2026-11-17", subject: "Web Technologies & Full-Stack", time: "10:00 AM", status: "Present", method: "In-Class Dynamic OTP Code" },
    { date: "2026-11-17", subject: "Database Management Systems", time: "11:30 AM", status: "Present", method: "Classroom Verification" },
    { date: "2026-11-16", subject: "Data Structures & Algorithms", time: "09:30 AM", status: "Present", method: "Classroom Verification" },
    { date: "2026-11-15", subject: "Operating Systems Principles", time: "01:30 PM", status: "Absent", method: "Absent marked by Faculty", alertSent: true },
    { date: "2026-11-14", subject: "Web Technologies & Full-Stack", time: "10:00 AM", status: "Present", method: "In-Class Dynamic OTP Code" }
  ]
};

export const initialLeaveRequests = [
  {
    id: "leave-1",
    type: "Medical Leave",
    startDate: "2026-10-04",
    endDate: "2026-10-06",
    days: 3,
    reason: "Severe viral fever and doctor prescribed bed rest.",
    status: "Approved",
    appliedDate: "2026-10-03",
    approvedBy: "Dr. Ananya Pandey (HOD)"
  },
  {
    id: "leave-2",
    type: "Family Function",
    startDate: "2026-11-01",
    endDate: "2026-11-02",
    days: 2,
    reason: "Attended elder sister's engagement ceremony.",
    status: "Approved",
    appliedDate: "2026-10-28",
    approvedBy: "Dr. Ananya Pandey (HOD)"
  }
];

export const initialFeeStructures = [
  {
    id: "fee-bca",
    department: "BCA",
    courseName: "Bachelor of Computer Applications",
    semester: 3,
    tuitionFee: 22000,
    labLibraryFee: 6000,
    examFee: 3500,
    developmentFee: 3500,
    totalFee: 35000,
    dueDate: "2026-12-10",
    lateFeePerDay: 50
  },
  {
    id: "fee-btech",
    department: "B.Tech CSE",
    courseName: "Computer Science & Engineering",
    semester: 3,
    tuitionFee: 42000,
    labLibraryFee: 12000,
    examFee: 5000,
    developmentFee: 6000,
    totalFee: 65000,
    dueDate: "2026-12-10",
    lateFeePerDay: 100
  },
  {
    id: "fee-mca",
    department: "MCA",
    courseName: "Master of Computer Applications",
    semester: 3,
    tuitionFee: 28000,
    labLibraryFee: 7000,
    examFee: 4000,
    developmentFee: 4000,
    totalFee: 43000,
    dueDate: "2026-12-10",
    lateFeePerDay: 75
  },
  {
    id: "fee-bba",
    department: "BBA",
    courseName: "Bachelor of Business Administration",
    semester: 3,
    tuitionFee: 20000,
    labLibraryFee: 4000,
    examFee: 3000,
    developmentFee: 3000,
    totalFee: 30000,
    dueDate: "2026-12-10",
    lateFeePerDay: 50
  }
];


