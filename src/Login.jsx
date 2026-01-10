import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Auth.css";
import logo from "./assets/logo.png";


function Login() {
  const navigate = useNavigate();
  const [role, setRole] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    if (!role) {
      alert("Please select a role");
      return;
    }

    localStorage.setItem("role", role);
    navigate("/otp");
  };

  return (
    <>
      <div className="background"></div>

      <div className="form-container">
        <img src={logo} className="logo" alt="logo" />
        <h2>Login to Banverse</h2>

        <form onSubmit={handleLogin}>
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="">Login as</option>
            <option value="student">Student</option>
            <option value="club">Club</option>
            <option value="admin">Admin</option>
          </select>

          <input type="email" placeholder="Email" required />
          <input type="password" placeholder="Password" required />

          <button type="submit">Login</button>
        </form>

        <p>
          New user? <Link to="/signup">Register</Link>
        </p>
      </div>
    </>
  );
}

export default Login;
