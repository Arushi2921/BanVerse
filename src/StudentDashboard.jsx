import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./StudentDashboard.css";
import logo from "./assets/logo.png";

const StudentDashboard = () => {
  const navigate = useNavigate();
  const [student, setStudent] = useState({});

  useEffect(() => {
    setStudent({
      name: localStorage.getItem("studentName"),
      course: localStorage.getItem("studentCourse"),
      department: localStorage.getItem("studentDepartment"),
      id: localStorage.getItem("studentId"),
      image: localStorage.getItem("studentProfileImage"),
      resume: localStorage.getItem("studentResume")
    });
  }, []);

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <>
      <header className="header">
  <div className="header-left">
    <div className="logo-circle">
      <img src={logo} alt="Banverse" />
    </div>
    <span className="brand-name">Banverse</span>
  </div>

  <button className="logout-btn" onClick={logout}>
    Logout
  </button>
</header>


      <main className="dashboard-container">
        <div className="profile-card">
          <img
            src={student.image || "https://i.imgur.com/1X8JQ0G.png"}
            alt="Student"
          />
          <h3>{student.name}</h3>
          <p className="muted">{student.course}</p>
          <p className="muted">{student.department}</p>
          <p className="id-text">ID: {student.id}</p>

          <div className="actions">
            <button onClick={() => navigate("/studentprofile")}>
              Edit Profile
            </button>
            {student.resume && (
              <a href={student.resume} download className="secondary-btn">
                View Resume
              </a>
            )}
          </div>
        </div>
      </main>
    </>
  );
};

export default StudentDashboard;
