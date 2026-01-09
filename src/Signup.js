import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './App.css'; // Or use a separate Signup.css if preferred
import banasthaliLogo from './banasthali-logo.jpg';

function Signup() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    role: 'student',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
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
          <select name="role" value={formData.role} onChange={handleChange} required>
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
          <button type="submit" className="btn">Register</button>
        </form>
        <p className="login-link">
          Already registered? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;