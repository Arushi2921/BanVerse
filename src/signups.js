import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './App.css';
import banasthaliLogo from './banasthali-logo.jpg';

function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    roles: ['student'],
    password: ''
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'roles') {
      const selectedOptions = Array.from(e.target.selectedOptions, (option) => option.value);
      setFormData({ ...formData, roles: selectedOptions });
    } else {
      setFormData({ ...formData, [name]: value.trim() });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      formData.roles.includes("student") &&
      !formData.email.toLowerCase().endsWith("@banasthali.in")
    ) {
      alert("Students must register using a @banasthali.in email address.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: formData.fullName,
          email: formData.email,
          role: formData.roles, // send array of roles
          password: formData.password
        }),
        credentials: "include",
      });

      const data = await response.json();

      if (response.ok) {
        alert("✅ Registration successful!");
        navigate("/login");
      } else {
        console.error("❌ Server responded with error:", data);
        alert(data.error || "Registration failed");
      }
    } catch (error) {
      console.error("❌ Network or server error:", error);
      alert("Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-page">
      <div className="register-card">
        <img src={banasthaliLogo} alt="Banasthali Logo" className="logo" />
        <h2>Create Account</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <select
            name="roles"
            multiple
            value={formData.roles}
            onChange={handleChange}
            required
          >
            <option value="student">Student</option>
            <option value="clubleader">Club Leader</option>
            <option value="admin">Admin</option>
          </select>
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button type="submit" className="btn" disabled={loading}>
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>
        <p className="login-link">
          Already registered? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
