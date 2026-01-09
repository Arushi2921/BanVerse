import React, { useEffect, useState } from "react";
import "./StudentProfile.css";

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
    loadStudentProfile();
  }, []);

  const loadStudentProfile = () => {
    setProfile({
      name: localStorage.getItem("studentName") || "",
      course: localStorage.getItem("studentCourse") || "",
      department: localStorage.getItem("studentDepartment") || "",
      studentId: localStorage.getItem("studentId") || "",
      image: localStorage.getItem("studentProfileImage") || "",
      resume: localStorage.getItem("studentResume") || ""
    });
  };

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

  const saveProfile = () => {
    localStorage.setItem("studentName", profile.name);
    localStorage.setItem("studentCourse", profile.course);
    localStorage.setItem("studentDepartment", profile.department);
    localStorage.setItem("studentId", profile.studentId);

    if (profile.resume) {
      localStorage.setItem("studentResume", profile.resume);
    }

    alert("Profile saved successfully!");
    window.location.href = "/studentdashboard";
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

  const logout = () => {
    localStorage.removeItem("role");
    window.location.href = "/login";
  };

  return (
    <>
      {/* HEADER */}
      <header className="header">
        <div className="header-left">
          <div className="logo-circle">
            <img src="assets/logo.png" alt="logo" />
          </div>
          <span className="brand-name">Banverse</span>
        </div>
        <div className="logout-circle" onClick={logout}>Logout</div>
      </header>

      {/* PROFILE */}
      <main className="profile-container">
        <h2>Student Profile</h2>

        <div className="profile-box">
          <label>Profile Photo</label>
          <input type="file" accept="image/*" onChange={previewImage} />

          {profile.image && (
            // eslint-disable-next-line jsx-a11y/alt-text
            <img src={profile.image} className="preview-img" style={{ display: "block" }} />
          )}

          <label>Full Name</label>
          <input name="name" value={profile.name} onChange={handleChange} />

          <label>Course / Class</label>
          <input name="course" value={profile.course} onChange={handleChange} />

          <label>Department</label>
          <input name="department" value={profile.department} onChange={handleChange} />

          <label>University ID</label>
          <input name="studentId" value={profile.studentId} onChange={handleChange} />

          <label>Resume (PDF)</label>
          <input type="file" accept="application/pdf" onChange={uploadResume} />

          <button onClick={saveProfile}>Save / Update Profile</button>
        </div>
      </main>
    </>
  );
};

export default StudentProfile;