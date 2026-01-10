import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Auth.css";
import logo from "./assets/logo.png";


function Signup() {
  const navigate = useNavigate();
  const [role, setRole] = useState("");

  const handleRegister = (e) => {
    e.preventDefault();

    if (!role) {
      alert("Please select a role");
      return;
    }

    localStorage.setItem("role", role);
    navigate("/Login");
  };

  return (
    <>
      <div className="background"></div>

      <div className="form-container">
        <img src={logo} className="logo" alt="logo" />
        <h2>Create Account</h2>

        <form onSubmit={handleRegister}>
          <input type="text" placeholder="Full Name" required />
          <input type="email" placeholder="Email" required />

          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="">Register as</option>
            <option value="student">Student</option>
            <option value="club">Club</option>
          </select>

          <input type="password" placeholder="Password" required />
          <button type="submit">Register</button>
        </form>

        <p>
          Already registered? <Link to="/Login">Login</Link>
        </p>
      </div>
    </>
  );
}

export default Signup;
