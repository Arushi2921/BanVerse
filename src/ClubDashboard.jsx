import React, { useEffect, useState } from "react";
import "./ClubDashboard.css";

const ClubDashboard = () => {
  const [club, setClub] = useState({
    name: "",
    desc: "",
    email: "",
    phone: "",
    instagram: "",
    linkedin: "",
    logo: ""
  });

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    loadClubDashboard();
  }, []);

  const loadClubDashboard = () => {
    const clubData = {
      name: localStorage.getItem("clubName") || "Club Name",
      desc: localStorage.getItem("clubDesc") || "Club Description",
      email: localStorage.getItem("clubEmail") || "Not provided",
      phone: localStorage.getItem("clubPhone") || "Not provided",
      instagram: localStorage.getItem("clubInstagram"),
      linkedin: localStorage.getItem("clubLinkedIn"),
      logo: localStorage.getItem("clubLogo") || "assets/logo.png"
    };

    setClub(clubData);

    const allPosts = JSON.parse(localStorage.getItem("posts")) || [];
    const myPosts = allPosts.filter(
      (post) => post.clubName === clubData.name
    );
    setPosts(myPosts);
  };

  const logout = () => {
    localStorage.removeItem("role");
    window.location.href = "login.jsx";
  };

  const deletePost = (id) => {
    if (!window.confirm("Delete this event?")) return;

    let allPosts = JSON.parse(localStorage.getItem("posts")) || [];
    allPosts = allPosts.filter((post) => post.id !== id);
    localStorage.setItem("posts", JSON.stringify(allPosts));

    setPosts(posts.filter((post) => post.id !== id));
  };

  const editPost = (id) => {
    localStorage.setItem("editPostId", id);
    window.location.href = "create-post.html";
  };

  const goToCreatePost = () => {
    localStorage.removeItem("editPostId");
    window.location.href = "create-post.html";
  };

  return (
    <>
      {/* HEADER */}
      <header className="header">
        <div className="header-left">
          <div className="logo-circle">
            <img src="/assets/logo.png" alt="logo" />
          </div>
          <span className="brand-name">Banverse</span>
        </div>
        <div className="logout-circle" onClick={logout}>
          Logout
        </div>
      </header>

      {/* DASHBOARD */}
      <main className="dashboard-container">
        {/* CLUB CARD */}
        <div className="club-card">
          <img src={club.logo} alt="club logo" />

          <h3>{club.name}</h3>
          <p>{club.desc}</p>

          <div className="club-details">
            <p>
              <strong>Email:</strong> {club.email}
            </p>
            <p>
              <strong>Phone:</strong> {club.phone}
            </p>

            <div className="social-links">
              {club.instagram && (
                <a href={club.instagram} target="_blank" rel="noreferrer">
                  Instagram
                </a>
              )}
              {club.linkedin && (
                <a href={club.linkedin} target="_blank" rel="noreferrer">
                  LinkedIn
                </a>
              )}
            </div>
          </div>

          <button className="post-btn" onClick={goToCreatePost}>
            + Create Event
          </button>
        </div>

        {/* POSTS SECTION */}
        <div className="posts-section">
          <h2>Your Events</h2>

          <div className="posts-grid">
            {posts.length === 0 ? (
              <p>No events posted yet.</p>
            ) : (
              posts.map((post) => (
                // eslint-disable-next-line react/jsx-no-undef
                <PostCard
                  key={post.id}
                  post={post}
                  onEdit={editPost}
                  onDelete={deletePost}
                />
              ))
            )}
          </div>
        </div>
      </main>
    </>
  );
};

export default ClubDashboard;