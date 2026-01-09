import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../src/admin.css";
import logo from "./logo.png";

function AdminDashboard() {
  const [pendingClubs, setPendingClubs] = useState([]);
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setPendingClubs(JSON.parse(localStorage.getItem("pendingClubs")) || []);
    setPosts(JSON.parse(localStorage.getItem("posts")) || []);
  }, []);

  const approveClub = (id) => {
    let pending = [...pendingClubs];
    let clubs = JSON.parse(localStorage.getItem("clubs")) || [];

    const club = pending.find(c => c.id === id);
    if (!club) return;

    clubs.push(club);
    localStorage.setItem("clubs", JSON.stringify(clubs));

    pending = pending.filter(c => c.id !== id);
    localStorage.setItem("pendingClubs", JSON.stringify(pending));

    setPendingClubs(pending);
    alert(`${club.name} approved!`);
  };

  const rejectClub = (id) => {
    const updated = pendingClubs.filter(c => c.id !== id);
    localStorage.setItem("pendingClubs", JSON.stringify(updated));
    setPendingClubs(updated);
    alert("Club rejected");
  };

  const deletePost = (id) => {
    const updated = posts.filter(p => p.id !== id);
    localStorage.setItem("posts", JSON.stringify(updated));
    setPosts(updated);
    alert("Post deleted");
  };

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

      <main className="dashboard-container">
        {/* Pending Clubs */}
        <section className="pending-clubs">
          <h3>Pending Clubs</h3>

          {pendingClubs.length === 0 && <p>No pending clubs</p>}

          {pendingClubs.map(club => (
            <div className="club-card" key={club.id}>
              <h4>{club.name}</h4>
              <p>Email: {club.email}</p>
              <p>{club.description}</p>
              <button onClick={() => approveClub(club.id)}>Approve</button>
              <button onClick={() => rejectClub(club.id)}>Reject</button>
            </div>
          ))}
        </section>

        {/* All Posts */}
        <section className="all-posts">
          <h3>Club Posts</h3>

          {posts.length === 0 && <p>No posts available</p>}

          {posts.map(post => (
            <div className="post-card" key={post.id}>
              <h4>{post.title}</h4>
              <p>By: {post.clubName}</p>
              <p>{post.desc}</p>
              <p>Date: {post.date} | Time: {post.time}</p>
              <p>Venue: {post.venue}</p>
              <button onClick={() => deletePost(post.id)}>Delete Post</button>
            </div>
          ))}
        </section>
      </main>
    </>
  );
}

export default AdminDashboard;
