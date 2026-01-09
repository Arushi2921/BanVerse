import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";

function Login() {
  const navigate = useNavigate();
  const [role, setRole] = useState("student");

  const handleLogin = (e) => {
    e.preventDefault();

    // TEMPORARY REDIRECT LOGIC
    if (role === "student") {
      navigate("/StudentProfile");
    } else if (role === "clubadmin") {
      navigate("/ClubProfile");
    } else if (role === "admin") {
      navigate("/AdminDashboard");
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h2>Login to Banverse</h2>

        <form onSubmit={handleLogin}>
          <label>Email</label>
          <input type="email" placeholder="Enter your email" />

          <label>Password</label>
          <input type="password" placeholder="Enter your password" />

          <label>Login As</label>
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="student">Student</option>
            <option value="clubadmin">Club Admin</option>
            <option value="admin">Admin</option>
          </select>

          <button type="submit" className="btn">
            Login
          </button>
        </form>

        <p className="signup-link">
          Don't have an account? <a href="/signup">Register here</a>
        </p>
      </div>
    </div>
  );
}

export default Login;
