import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";
import logo from "./banasthali-logo.jpg"
function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "student",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLoginRequest = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/auth/login/request-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const contentType = response.headers.get("content-type");
      const data = contentType && contentType.includes("application/json")
        ? await response.json()
        : { error: "Unexpected response format" };

      if (response.ok) {
        alert("✅ OTP sent to your email");

        // Store email and role for OTP verification
        localStorage.setItem("loginEmail", formData.email);
        localStorage.setItem("loginRole", formData.role);

        // Redirect to OTP verification page
        navigate("/VerifyOtp");
      } else {
        alert(data.error || "Login failed");
      }
    } catch (error) {
      console.error("❌ Login request error:", error);
      alert("Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
                <img src={logo} className="logo" alt="logo" />
        <h2>Login to Banverse</h2>

        <form onSubmit={handleLoginRequest}>
          <label>Email</label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <label>Password</label>
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <label>Login As</label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            required
          >
            <option value="student">Student</option>
            <option value="clubleader">Club Leader</option>
            <option value="admin">Admin</option>
          </select>

          <button type="submit" className="btn" disabled={loading}>
            {loading ? "Sending OTP..." : "Login"}
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
