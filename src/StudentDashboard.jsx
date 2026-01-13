import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./StudentDashboard.css";
import logo from "./assets/logo.png";

const StudentDashboard = () => {
  const navigate = useNavigate();
  const [student, setStudent] = useState({});
  const [events, setEvents] = useState([]);

  useEffect(() => {
    setStudent({
      name: localStorage.getItem("studentName"),
      course: localStorage.getItem("studentCourse"),
      department: localStorage.getItem("studentDepartment"),
      id: localStorage.getItem("studentId"),
      image: localStorage.getItem("studentProfileImage"),
      resume: localStorage.getItem("studentResume")
    });

    // Demo events (can come from backend later)
    setEvents(
      JSON.parse(localStorage.getItem("studentEvents")) || [
        { title: "AI Workshop", date: "12 Jan 2026", status: "Registered" },
        { title: "Hackathon 2025", date: "28 Dec 2025", status: "Attended" },
        { title: "Tech Talk: React", date: "10 Dec 2025", status: "Attended" }
      ]
    );
  }, []);

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <>
      {/* HEADER */}
      <header className="header">
        <div className="header-left" onClick={() => navigate("/home")}>
          <div className="logo-circle">
            <img src={logo} alt="Banverse" />
          </div>
          <span className="brand-name">Banverse</span>
        </div>

        <nav className="nav-menu">
          <button className="nav-item" onClick={() => navigate("/home")}>Home</button>
          <button className="nav-item" onClick={() => navigate("/about")}>About</button>
          <button className="nav-item" onClick={() => navigate("/contact")}>Contact</button>
          <button className="nav-item active">Dashboard</button>
        </nav>

        <div className="header-right">
          <button className="logout-btn" onClick={logout}>
            Logout
          </button>
        </div>
      </header>

      {/* DASHBOARD */}
      <main className="dashboard-wrapper">
        <div className="dashboard-grid">

          {/* PROFILE CARD */}
          <div className="profile-card">
            <img
              src={student.image || "https://cdn-icons-png.flaticon.com/512/847/847969.png"}
              alt="Student"
            />
            <h3>{student.name}</h3>
            <p>{student.course}</p>
            <p>{student.department}</p>
            <span className="id-text">ID: {student.id}</span>

            <button onClick={() => navigate("/studentprofile")} className="primary-btn">
              ✏️ Edit Profile
            </button>

            {student.resume && (
              <button 
                onClick={() => window.open(student.resume, '_blank')} 
                className="resume-btn"
              >
                👁️ View Resume
              </button>
            )}
          </div>

          {/* EVENTS */}
          <div className="events-card">
            <h4>Event Participation History</h4>

            {events.map((event, index) => (
              <div className="event-item" key={index}>
                <div>
                  <strong>{event.title}</strong>
                  <span>{event.date}</span>
                </div>
                <span className={`status ${event.status.toLowerCase()}`}>
                  {event.status}
                </span>
              </div>
            ))}

            <button className="secondary-btn" onClick={() => navigate("/home")}>
              🏠 Explore More Events
            </button>
          </div>

        </div>
      </main>
    </>
  );
};

export default StudentDashboard;
