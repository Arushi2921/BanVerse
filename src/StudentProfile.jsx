import React, { useEffect, useState } from "react";
import "./StudentProfile.css";
import logo from "./assets/logo.png";

const StudentProfile = () => {
  const [profile, setProfile] = useState({
    name: "",
    course: "",
    department: "",
    studentId: "",
    image: "",
    resume: ""
  });

  useEffect(() => {
    setProfile({
      name: localStorage.getItem("studentName") || "",
      course: localStorage.getItem("studentCourse") || "",
      department: localStorage.getItem("studentDepartment") || "",
      studentId: localStorage.getItem("studentId") || "",
      image: localStorage.getItem("studentProfileImage") || "",
      resume: localStorage.getItem("studentResume") || ""
    });
  }, []);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const previewImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setProfile({ ...profile, image: reader.result });
      localStorage.setItem("studentProfileImage", reader.result);
    };
    reader.readAsDataURL(file);
  };

  const uploadResume = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setProfile({ ...profile, resume: reader.result });
    };
    reader.readAsDataURL(file);
  };

  const saveProfile = () => {
    localStorage.setItem("studentName", profile.name);
    localStorage.setItem("studentCourse", profile.course);
    localStorage.setItem("studentDepartment", profile.department);
    localStorage.setItem("studentId", profile.studentId);
    if (profile.resume) localStorage.setItem("studentResume", profile.resume);

    alert("Profile saved successfully!");
    window.location.href = "/studentdashboard";
  };

  return (
    <>
      {/* HEADER (NO LOGOUT HERE) */}
      <header className="header">
        <div className="header-left">
          <div className="logo-circle">
            <img src={logo} alt="logo" />
          </div>
          <span className="brand-name">Banverse</span>
        </div>
      </header>

      {/* PROFILE */}
      <main className="profile-wrapper">
        <div className="profile-card">
          <h2>Student Profile</h2>
          <p className="subtitle">Keep your academic details up to date</p>

          {/* Avatar */}
          <div className="avatar-section">
            <label className="avatar-upload">
              <input type="file" accept="image/*" onChange={previewImage} />
              <img
                src={profile.image || "https://i.imgur.com/1X8JQ0G.png"}
                alt="profile"
              />
              <span>Edit</span>
            </label>
          </div>

          {/* Form */}
          <div className="form-grid">
            <div>
              <label>Full Name</label>
              <input name="name" value={profile.name} onChange={handleChange} />
            </div>

            <div>
              <label>Course / Class</label>
              <input name="course" value={profile.course} onChange={handleChange} />
            </div>

            <div>
              <label>Department</label>
              <input name="department" value={profile.department} onChange={handleChange} />
            </div>

            <div>
              <label>University ID</label>
              <input name="studentId" value={profile.studentId} onChange={handleChange} />
            </div>
          </div>

          <label className="resume-label">
            Upload Resume (PDF)
            <input type="file" accept="application/pdf" onChange={uploadResume} />
          </label>

          <button className="save-btn" onClick={saveProfile}>
            Save Profile
          </button>
        </div>
      </main>
    </>
  );
};

export default StudentProfile;
