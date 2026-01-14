import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ClubProfile.css";

const ClubProfile = () => {
  const navigate = useNavigate();
  const [clubData, setClubData] = useState({
    clubName: "",
    description: "",
    email: "",
    phone: "",
    instagram: "",
    linkedin: "",
    logo: null,
    logoPreview: ""
  });

  // replaces body onload="loadClubProfile()"
  useEffect(() => {
    loadClubProfile();
  }, []);

  const loadClubProfile = () => {
    // Example: loading saved data (localStorage / API)
    const savedProfile = JSON.parse(localStorage.getItem("clubProfile"));
    if (savedProfile) {
      setClubData(savedProfile);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setClubData({ ...clubData, [name]: value });
  };

  const previewLogo = (e) => {
    const file = e.target.files[0];
    if (file) {
      const previewURL = URL.createObjectURL(file);
      setClubData({
        ...clubData,
        logo: file,
        logoPreview: previewURL
      });
    }
  };

  const saveClubProfile = () => {
    localStorage.setItem("clubProfile", JSON.stringify(clubData));
    localStorage.setItem("clubName", clubData.clubName);
    localStorage.setItem("clubDesc", clubData.description);
    localStorage.setItem("clubEmail", clubData.email);
    localStorage.setItem("clubPhone", clubData.phone);
    localStorage.setItem("clubInstagram", clubData.instagram);
    localStorage.setItem("clubLinkedIn", clubData.linkedin);
    if (clubData.logoPreview) {
      localStorage.setItem("clubLogo", clubData.logoPreview);
    }
    navigate("/clubdashboard");
  };

  const logout = () => {
    localStorage.removeItem("role");
    navigate("/login");
  };

  return (
    <>
      {/* HEADER */}
      <header className="header">
        <div className="header-left" onClick={() => navigate("/home")}>
          <div className="logo-circle">
            <img src="assets/logo.png" alt="logo" />
          </div>
          <span className="brand-name">Banverse</span>
        </div>

        <nav className="nav-menu">
          <button className="nav-item" onClick={() => navigate("/home")}>Home</button>
          <button className="nav-item" onClick={() => navigate("/about")}>About</button>
          <button className="nav-item" onClick={() => navigate("/contact")}>Contact</button>
          <button className="nav-item active">Profile</button>
        </nav>

        <div className="header-right">
          <button className="logout-btn" onClick={logout}>Logout</button>
        </div>
      </header>

      {/* PROFILE FORM */}
      <main className="profile-container">
        <div className="profile-wrapper">
          <div className="profile-header">
            <h2>🏢 Club Profile</h2>
            <p>Manage your club information and details</p>
          </div>

          <div className="profile-box">
          <label>Club Logo</label>
          <input type="file" accept="image/*" onChange={previewLogo} />

          {clubData.logoPreview && (
            <img
              src={clubData.logoPreview}
              alt="Preview"
              className="preview-img"
              style={{ display: "block" }}
            />
          )}

          <label>Club Name</label>
          <input
            type="text"
            name="clubName"
            value={clubData.clubName}
            onChange={handleChange}
          />

          <label>Description</label>
          <textarea
            name="description"
            rows="4"
            value={clubData.description}
            onChange={handleChange}
          />

          <label>Contact Email</label>
          <input
            type="email"
            name="email"
            value={clubData.email}
            onChange={handleChange}
          />

          <label>Contact Phone</label>
          <input
            type="text"
            name="phone"
            value={clubData.phone}
            onChange={handleChange}
          />

          <label>Instagram Handle</label>
          <input
            type="text"
            name="instagram"
            value={clubData.instagram}
            onChange={handleChange}
          />

          <label>LinkedIn Page</label>
          <input
            type="text"
            name="linkedin"
            value={clubData.linkedin}
            onChange={handleChange}
          />

          <button onClick={saveClubProfile}>
            ✓ Save / Update Profile
          </button>

          </div>
        </div>
      </main>
    </>
  );
};

export default ClubProfile;
