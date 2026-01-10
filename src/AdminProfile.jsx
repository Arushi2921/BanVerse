import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./admin.css";
import logo from "./assets/logo.png";

function AdminProfile() {
  const [admin, setAdmin] = useState({ name: "", email: "" });
  const navigate = useNavigate();

  useEffect(() => {
    const storedAdmin =
      JSON.parse(localStorage.getItem("admin")) ||
      { name: "Admin", email: "admin@banverse.com" };

    setAdmin(storedAdmin);
  }, []);

  const logout = () => {
    localStorage.removeItem("role");
    navigate("/login");
  };

  return (
    <>
      <header className="header">
        <div className="header-left">
          <div className="logo-circle">
            <img src={logo} alt="logo" />
          </div>
          <span className="brand-name">Banverse Admin</span>
        </div>
        <div className="logout-circle" onClick={logout}>Logout</div>
      </header>

      <main className="profile-container">
        <h2>Admin Profile</h2>

        <div className="profile-box">
          <label>Name</label>
          <input type="text" value={admin.name} readOnly />

          <label>Email</label>
          <input type="email" value={admin.email} readOnly />
        </div>

        <button onClick={() => navigate("/admin-dashboard")}>
          Go to Dashboard
        </button>
      </main>
    </>
  );
}

export default AdminProfile;
