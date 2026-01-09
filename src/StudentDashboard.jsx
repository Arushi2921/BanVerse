import React, { useEffect, useState } from "react";
import "./StudentDashboard.css";

const StudentDashboard = () => {
  const [student, setStudent] = useState({
    name: "",
    course: "",
    department: "",
    id: "",
    image: "",
    resume: ""
  });

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = () => {
    setStudent({
      name: localStorage.getItem("studentName") || "Student Name",
      course: localStorage.getItem("studentCourse") || "Course / Class",
      department: localStorage.getItem("studentDepartment") || "Department",
      id: localStorage.getItem("studentId") || "N/A",
      image: localStorage.getItem("studentProfileImage") || "assets/default-user.png",
      resume: localStorage.getItem("studentResume")
    });
  };

  return (
    <>
      {/* HEADER */}
      <header className="header">
        <div className="header-left">
          <div className="logo-circle">
            <img src="/assets/logo.png" alt="logo" />
          </div>
          <span className="brand-name">Banverse</span>
        </div>
      </header>

      {/* DASHBOARD */}
      <main className="dashboard-container">
        <div className="profile-card">
          <img src={student.image} alt="student" />
          <h3>{student.name}</h3>
          <p>{student.course}</p>
          <p>{student.department}</p>
          <p>ID: {student.id}</p>

          {student.resume && (
            <a
              href={student.resume}
              className="resume-btn"
              download
            >
              View Resume
            </a>
          )}
        </div>
      </main>
    </>
  );
};

export default StudentDashboard;