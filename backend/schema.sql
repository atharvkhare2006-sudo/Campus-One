-- ========================================================
-- Campus One - All-in-One Higher Ed & Campus Operating System
-- Database Schema for MySQL
-- Tailored for BCA Final Year Project
-- ========================================================

CREATE DATABASE IF NOT EXISTS campus_one_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE campus_one_db;

-- 1. Colleges Table (Super Admin SaaS Multi-Tenant)
CREATE TABLE IF NOT EXISTS colleges (
    id INT AUTO_INCREMENT PRIMARY KEY,
    college_code VARCHAR(20) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    city VARCHAR(100) NOT NULL,
    state VARCHAR(100) NOT NULL,
    plan ENUM('Standard', 'Pro', 'Enterprise') DEFAULT 'Standard',
    status ENUM('pending', 'approved', 'rejected') DEFAULT 'pending',
    admin_name VARCHAR(150),
    admin_email VARCHAR(150) UNIQUE NOT NULL,
    students_count INT DEFAULT 0,
    faculty_count INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    approved_at TIMESTAMP NULL
);

-- 2. Departments Table (Managed by College Admin)
CREATE TABLE IF NOT EXISTS departments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    college_id INT NOT NULL,
    dept_code VARCHAR(20) NOT NULL,
    dept_name VARCHAR(150) NOT NULL,
    total_semesters INT DEFAULT 6,
    FOREIGN KEY (college_id) REFERENCES colleges(id) ON DELETE CASCADE
);

-- 3. Faculty Table (Added by College Admin)
CREATE TABLE IF NOT EXISTS faculty (
    id INT AUTO_INCREMENT PRIMARY KEY,
    college_id INT NOT NULL,
    dept_id INT NOT NULL,
    full_name VARCHAR(150) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    designation VARCHAR(100) DEFAULT 'Assistant Professor',
    phone VARCHAR(20),
    status ENUM('active', 'suspended') DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (college_id) REFERENCES colleges(id) ON DELETE CASCADE,
    FOREIGN KEY (dept_id) REFERENCES departments(id) ON DELETE CASCADE
);

-- 4. Students Table
CREATE TABLE IF NOT EXISTS students (
    id INT AUTO_INCREMENT PRIMARY KEY,
    college_id INT NOT NULL,
    dept_id INT NOT NULL,
    enrollment_no VARCHAR(50) UNIQUE NOT NULL,
    full_name VARCHAR(150) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    semester INT NOT NULL,
    section VARCHAR(10) DEFAULT 'A',
    attendance_pct DECIMAL(5, 2) DEFAULT 85.00,
    phone VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (college_id) REFERENCES colleges(id) ON DELETE CASCADE,
    FOREIGN KEY (dept_id) REFERENCES departments(id) ON DELETE CASCADE
);

-- 5. Notes & Study Materials Table (Uploaded by Faculty, Viewed by Students)
CREATE TABLE IF NOT EXISTS notes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    college_id INT NOT NULL,
    faculty_id INT NOT NULL,
    subject_name VARCHAR(150) NOT NULL,
    semester INT NOT NULL,
    unit VARCHAR(50) NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    content_preview TEXT,
    file_path VARCHAR(255),
    file_size VARCHAR(50),
    download_count INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (college_id) REFERENCES colleges(id) ON DELETE CASCADE,
    FOREIGN KEY (faculty_id) REFERENCES faculty(id) ON DELETE CASCADE
);

-- 6. Campus Events Table (Tech, Sports, Cultural, Workshops)
CREATE TABLE IF NOT EXISTS events (
    id INT AUTO_INCREMENT PRIMARY KEY,
    college_id INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    category ENUM('Tech', 'Sports', 'Cultural', 'Workshop') NOT NULL,
    event_date DATE NOT NULL,
    event_time VARCHAR(50),
    venue VARCHAR(255) NOT NULL,
    organizer VARCHAR(150),
    description TEXT,
    max_participants INT DEFAULT 100,
    status ENUM('Upcoming', 'Ongoing', 'Completed') DEFAULT 'Upcoming',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (college_id) REFERENCES colleges(id) ON DELETE CASCADE
);

-- 7. Event Registrations Table (Students Registering for Events)
CREATE TABLE IF NOT EXISTS event_registrations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    event_id INT NOT NULL,
    student_id INT NOT NULL,
    registered_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE KEY unique_registration (event_id, student_id),
    FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE CASCADE,
    FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE
);

-- 8. Announcements & Official Circulars Table
CREATE TABLE IF NOT EXISTS announcements (
    id INT AUTO_INCREMENT PRIMARY KEY,
    college_id INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    category ENUM('Exam', 'Placement', 'Holiday', 'Fee', 'General') DEFAULT 'General',
    priority ENUM('low', 'medium', 'high') DEFAULT 'medium',
    target_audience ENUM('all', 'students', 'faculty') DEFAULT 'all',
    content TEXT NOT NULL,
    posted_by VARCHAR(150),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (college_id) REFERENCES colleges(id) ON DELETE CASCADE
);

-- ========================================================
-- Seed Initial Demo Data
-- ========================================================
INSERT INTO colleges (college_code, name, city, state, plan, status, admin_name, admin_email, students_count, faculty_count)
VALUES 
('AITM', 'Apex Institute of Technology & Management', 'Bhopal', 'Madhya Pradesh', 'Enterprise', 'approved', 'Dr. R. K. Sharma', 'admin@aitm.edu.in', 2450, 112),
('NCCA', 'National College of Computer Applications', 'Indore', 'Madhya Pradesh', 'Pro', 'approved', 'Prof. Sunita Verma', 'director@ncca.ac.in', 1820, 78),
('SIST', 'Saraswati Institute of Science & Technology', 'Jabalpur', 'Madhya Pradesh', 'Standard', 'pending', 'Dr. Vivek Mishra', 'principal@sist.org', 1200, 54);
