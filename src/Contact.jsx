import React from "react";
import { useNavigate } from "react-router-dom";
import "./Contact.css";
import logo from "./assets/logo.png";

function Contact() {
  const navigate = useNavigate();

  const goToDashboard = () => {
    const role = localStorage.getItem("role");

    if (role === "student") navigate("/studentdashboard");
    else if (role === "club") navigate("/clubdashboard");
    else if (role === "admin") navigate("/admindashboard");
    else navigate("/login");
  };

  return (
    <>
      {/* HEADER */}
      <header className="header">
        <div className="header-left">
          <div className="logo-circle">
            <img src={logo} alt="Banverse Logo" />
          </div>
          <span className="brand-name">Banverse</span>
        </div>

        <div className="dashboard-circle" onClick={goToDashboard}>
          👤
        </div>
      </header>

      {/* CONTACT CONTENT */}
      <main className="contact-container">
        <section className="contact-card">
          <h2>University Administration</h2>
          <p><strong>Office:</strong> University Administration Block</p>
          <p><strong>Email:</strong> admin@university.edu</p>
          <p><strong>Phone:</strong> +91 98765 43210</p>
          <p><strong>Working Hours:</strong> Mon – Fri (9:00 AM – 5:00 PM)</p>
        </section>

        <section className="contact-card">
          <h2>Developer Contact</h2>
          <p><strong>Name:</strong> Banverse Development Team</p>
          <p><strong>Email:</strong> banverse.project@gmail.com</p>
          <p><strong>Phone:</strong> +91 9XXXXXXXXX</p>
          <p><strong>Role:</strong> Frontend & System Design</p>
        </section>
      </main>
    </>
  );
}

export default Contact;
