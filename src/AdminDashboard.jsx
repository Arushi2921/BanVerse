import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./admin.css";
import logo from "./assets/logo.png";

function AdminDashboard() {
  const [pendingClubs, setPendingClubs] = useState([]);
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setPendingClubs(JSON.parse(localStorage.getItem("pendingClubs")) || []);
    setPosts(JSON.parse(localStorage.getItem("posts")) || []);
  }, []);

  const approveClub = (id) => {
    const pending = pendingClubs.filter(c => c.id !== id);
    const club = pendingClubs.find(c => c.id === id);
    const clubs = JSON.parse(localStorage.getItem("clubs")) || [];

    clubs.push(club);
    localStorage.setItem("clubs", JSON.stringify(clubs));
    localStorage.setItem("pendingClubs", JSON.stringify(pending));
    setPendingClubs(pending);
  };

  const rejectClub = (id) => {
    const updated = pendingClubs.filter(c => c.id !== id);
    localStorage.setItem("pendingClubs", JSON.stringify(updated));
    setPendingClubs(updated);
  };

  const deletePost = (id) => {
    const updated = posts.filter(p => p.id !== id);
    localStorage.setItem("posts", JSON.stringify(updated));
    setPosts(updated);
  };

  return (
    <>
      {/* HEADER */}
      <header className="header">
        <div className="header-left">
          <div className="logo-circle">
            <img src={logo} alt="logo" />
          </div>
          <span className="brand-name">Banverse Admin</span>
        </div>

        {/* CENTERED NAVBAR */}
        <nav className="nav-menu nav-center">
          <button className="nav-item" onClick={() => navigate("/home")}>Home</button>
          <button className="nav-item" onClick={() => navigate("/about")}>About</button>
          <button className="nav-item" onClick={() => navigate("/contact")}>Contact</button>
          <button className="nav-item active">Dashboard</button>
        </nav>
      </header>

      {/* DASHBOARD */}
      <main className="dashboard">
        <div className="dashboard-header">
          <h2>Admin Dashboard</h2>
          <p>Manage clubs and monitor activities</p>
        </div>

        <div className="stats-container">
          <div className="stat-card">
            <div className="stat-number">{pendingClubs.length}</div>
            <div className="stat-label">Pending Clubs</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">{posts.length}</div>
            <div className="stat-label">Total Posts</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">
              {(JSON.parse(localStorage.getItem("clubs")) || []).length}
            </div>
            <div className="stat-label">Approved Clubs</div>
          </div>
        </div>

        <section className="card">
          <h3>📋 Pending Clubs</h3>
          {pendingClubs.length === 0 && <p className="empty">✨ No pending requests</p>}

          {pendingClubs.map(club => (
            <div className="item-card" key={club.id}>
              <div className="item-content">
                <h4>{club.name}</h4>
                <p className="muted">📧 {club.email}</p>
                <p>{club.description}</p>
              </div>
              <div className="actions">
                <button className="approve" onClick={() => approveClub(club.id)}>✓ Approve</button>
                <button className="reject" onClick={() => rejectClub(club.id)}>✗ Reject</button>
              </div>
            </div>
          ))}
        </section>

        <section className="card">
          <h3>📰 Club Posts</h3>
          {posts.length === 0 && <p className="empty">📭 No posts available</p>}

          {posts.map(post => (
            <div className="item-card" key={post.id}>
              <div className="item-content">
                <h4>{post.title}</h4>
                <p className="muted">🏢 {post.clubName} • 📅 {post.date} ⏰ {post.time}</p>
                <p>{post.desc}</p>
                <p className="muted">📍 {post.venue}</p>
              </div>
              <button className="reject" onClick={() => deletePost(post.id)}>🗑️ Delete</button>
            </div>
          ))}
        </section>
      </main>
    </>
  );
}

export default AdminDashboard;
