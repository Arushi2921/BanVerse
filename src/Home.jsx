import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Home.css";

function Home() {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const navigate = useNavigate();

  useEffect(() => {
    const storedPosts = JSON.parse(localStorage.getItem("posts")) || [];
    setPosts(storedPosts);
  }, []);

  const role = localStorage.getItem("role");

  const filteredPosts = posts.filter((post) => {
    const matchText = post.title.toLowerCase().includes(search.toLowerCase());
    const matchCategory =
      category === "all" || post.category === category;
    return matchText && matchCategory;
  });

  const goToProfile = () => {
    if (role === "student") navigate("/student-profile");
    else if (role === "club") navigate("/club-profile");
    else if (role === "admin") navigate("/admin-profile");
    else navigate("/login");
  };

  const goToDashboard = () => {
    if (role === "student") navigate("/student-dashboard");
    else if (role === "club") navigate("/club-dashboard");
    else if (role === "admin") navigate("/admin-dashboard");
    else navigate("/login");
  };

  const openPost = (index) => {
    localStorage.setItem("viewPostIndex", index);
    navigate("/view-post");
  };

  return (
    <>
      {/* ===== HEADER ===== */}
      <header className="header">
        <div className="header-left">
          <div className="logo-circle">
            <img src="/assets/logo.png" alt="Banverse" />
          </div>
          <span className="brand-name">Banverse</span>
        </div>
        <div className="dashboard-circle" onClick={goToProfile}>👤</div>
      </header>

      {/* ===== SEARCH & FILTER ===== */}
      <section className="search-section">
        <input
          type="text"
          placeholder="Search events, workshops, hackathons..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="all">All Categories</option>
          <option value="hackathon">Hackathons / Ideathons</option>
          <option value="workshop">Workshops</option>
          <option value="event">Events</option>
          <option value="competition">Competitions</option>
          <option value="other">Other</option>
        </select>
      </section>

      {/* ===== TABS ===== */}
      <nav className="tabs">
        <button className="active">Home</button>
        <button onClick={() => navigate("/about")}>About</button>
        <button onClick={() => navigate("/contact")}>Contact</button>
        <button onClick={goToDashboard}>Dashboard</button>
      </nav>

      {/* ===== POSTS GRID ===== */}
      <main className="feed">
        {filteredPosts.length === 0 && <p>No posts found.</p>}

        {filteredPosts.map((post, index) => (
          <div
            key={index}
            className="post"
            onClick={() => openPost(index)}
          >
            <h3>
              📌 {post.title}
              {role === "admin" && (
                <span
                  className={`moderation-status ${
                    post.status === "approved"
                      ? "moderation-approved"
                      : post.status === "rejected"
                      ? "moderation-rejected"
                      : "moderation-pending"
                  }`}
                >
                  {post.status || "pending"}
                </span>
              )}
            </h3>

            <p className="club">By {post.clubName}</p>
            <img src={post.poster} alt={post.title} />
            <p className="desc">{post.desc}</p>
            <p><strong>Date:</strong> {post.date} | {post.time}</p>
            <p><strong>Venue:</strong> {post.venue}</p>
          </div>
        ))}
      </main>
    </>
  );
}

export default Home;
