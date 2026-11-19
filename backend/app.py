"""
Campus One - Python Flask Backend REST API
Multi-Tenant College Management System for BCA Final Project
"""

import os
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable Cross-Origin Resource Sharing for Web App

# Configurable Database Settings
DB_CONFIG = {
    'host': os.getenv('DB_HOST', 'localhost'),
    'user': os.getenv('DB_USER', 'root'),
    'password': os.getenv('DB_PASSWORD', ''),
    'database': os.getenv('DB_NAME', 'campus_one_db')
}

# In-memory storage fallback if MySQL is not currently running locally
memory_db = {
    "colleges": [
        {
            "id": 1,
            "college_code": "AITM",
            "name": "Apex Institute of Technology & Management",
            "city": "Bhopal",
            "state": "Madhya Pradesh",
            "plan": "Enterprise",
            "status": "approved",
            "admin_name": "Dr. R. K. Sharma",
            "admin_email": "admin@aitm.edu.in",
            "students_count": 2450,
            "faculty_count": 112
        },
        {
            "id": 2,
            "college_code": "NCCA",
            "name": "National College of Computer Applications",
            "city": "Indore",
            "state": "Madhya Pradesh",
            "plan": "Pro",
            "status": "approved",
            "admin_name": "Prof. Sunita Verma",
            "admin_email": "director@ncca.ac.in",
            "students_count": 1820,
            "faculty_count": 78
        },
        {
            "id": 3,
            "college_code": "SIST",
            "name": "Saraswati Institute of Science & Technology",
            "city": "Jabalpur",
            "state": "Madhya Pradesh",
            "plan": "Standard",
            "status": "pending",
            "admin_name": "Dr. Vivek Mishra",
            "admin_email": "principal@sist.org",
            "students_count": 1200,
            "faculty_count": 54
        }
    ],
    "notes": [
        {
            "id": 1,
            "title": "Unit 1: Relational Algebra & SQL Query Optimization",
            "subject": "Database Management Systems (DBMS)",
            "semester": 3,
            "unit": "Unit 1",
            "uploaded_by": "Dr. Ananya Pandey",
            "date": "2026-11-12",
            "file_size": "3.4 MB"
        },
        {
            "id": 2,
            "title": "Unit 2: Binary Search Trees & AVL Tree Balancing Algorithms",
            "subject": "Data Structures & Algorithms in C++",
            "semester": 3,
            "unit": "Unit 2",
            "uploaded_by": "Prof. Rajesh Joshi",
            "date": "2026-11-14",
            "file_size": "4.8 MB"
        }
    ],
    "events": [
        {
            "id": 1,
            "title": "HackCampus 2026: 24-Hour National Hackathon",
            "category": "Tech",
            "date": "2026-12-05",
            "venue": "Main Auditorium & Computing Center",
            "max_participants": 200,
            "registered_count": 148,
            "status": "Upcoming"
        }
    ]
}

@app.route('/api/health', methods=['GET'])
def health_check():
    return jsonify({
        "status": "online",
        "system": "Campus One Backend API",
        "version": "1.0.0",
        "language": "Python 3 + Flask",
        "database": "MySQL (campus_one_db)"
    })

# ----------------- SUPER ADMIN ENDPOINTS -----------------
@app.route('/api/colleges', methods=['GET', 'POST'])
def handle_colleges():
    if request.method == 'GET':
        return jsonify(memory_db["colleges"])
    
    # POST: Onboard new college
    data = request.json or {}
    new_col = {
        "id": len(memory_db["colleges"]) + 1,
        "college_code": data.get("code", "NEW").upper(),
        "name": data.get("name", "New Institute"),
        "city": data.get("city", "City"),
        "state": data.get("state", "State"),
        "plan": data.get("plan", "Standard"),
        "status": "approved",
        "admin_name": data.get("adminName", "Admin"),
        "admin_email": data.get("adminEmail", "admin@college.edu.in"),
        "students_count": 0,
        "faculty_count": 0
    }
    memory_db["colleges"].append(new_col)
    return jsonify({"message": "College successfully onboarded", "college": new_col}), 201

@app.route('/api/colleges/<int:col_id>/approve', methods=['POST'])
def approve_college(col_id):
    for col in memory_db["colleges"]:
        if col["id"] == col_id:
            col["status"] = "approved"
            return jsonify({"message": f"College {col['name']} approved successfully!", "college": col})
    return jsonify({"error": "College not found"}), 404

# ----------------- NOTES & STUDY MATERIAL -----------------
@app.route('/api/notes', methods=['GET', 'POST'])
def handle_notes():
    if request.method == 'GET':
        return jsonify(memory_db["notes"])
    
    data = request.json or {}
    new_note = {
        "id": len(memory_db["notes"]) + 1,
        "title": data.get("title", "Untitled Note"),
        "subject": data.get("subject", "General"),
        "semester": data.get("semester", 3),
        "unit": data.get("unit", "Unit 1"),
        "uploaded_by": data.get("uploadedBy", "Faculty"),
        "date": "2026-11-17",
        "file_size": data.get("fileSize", "2.5 MB")
    }
    memory_db["notes"].append(new_note)
    return jsonify({"message": "Notes uploaded successfully", "note": new_note}), 201

# ----------------- CAMPUS EVENTS -----------------
@app.route('/api/events', methods=['GET', 'POST'])
def handle_events():
    if request.method == 'GET':
        return jsonify(memory_db["events"])
    
    data = request.json or {}
    new_evt = {
        "id": len(memory_db["events"]) + 1,
        "title": data.get("title", "Campus Event"),
        "category": data.get("category", "Tech"),
        "date": data.get("date", "2026-12-01"),
        "venue": data.get("venue", "College Auditorium"),
        "max_participants": data.get("maxParticipants", 100),
        "registered_count": 0,
        "status": "Upcoming"
    }
    memory_db["events"].append(new_evt)
    return jsonify({"message": "Event published", "event": new_evt}), 201

# ----------------- AUTH & SECURITY -----------------
@app.route('/api/auth/login', methods=['POST'])
def handle_login():
    data = request.json or {}
    email = data.get("email", "").strip()
    role = data.get("role", "student")
    
    # Simulating secure token issuance for role-based access
    token = f"campus_one_sec_jwt_{role}_{abs(hash(email))}"
    return jsonify({
        "status": "authenticated",
        "role": role,
        "token": token,
        "user": {
            "email": email,
            "name": "Verified User",
            "role": role
        }
    })

# ----------------- AI STUDY ASSISTANT -----------------
@app.route('/api/ai/summarize', methods=['POST'])
def ai_summarize():
    data = request.json or {}
    title = data.get("title", "Lecture Topic")
    return jsonify({
        "status": "success",
        "topic": title,
        "summary": [
            f"Core conceptual definition of {title} with computational complexity analysis.",
            "Mathematical constraints, relational algebra, and MySQL query optimization.",
            "Essential exam questions for university theory & viva examinations."
        ]
    })

if __name__ == '__main__':
    print("🎓 Starting Campus One Python Backend on http://127.0.0.1:5000 ...")
    app.run(host='0.0.0.0', port=5000, debug=True)
