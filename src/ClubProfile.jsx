import React, { useEffect, useState } from "react";
import "./ClubProfile.css";

const ClubProfile = () => {
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
    alert("Club profile saved successfully!");
  };

  const logout = () => {
    alert("Logged out");
    // navigate("/login") if using react-router
  };

  return (
    <>
      {/* HEADER */}
      <header className="header">
        <div className="header-left">
          <div className="logo-circle">
            <img src="assets/logo.png" alt="logo" />
          </div>
          <span className="brand-name">Banverse</span>
        </div>

        <div className="logout-circle" onClick={logout}>
          Logout
        </div>
      </header>

      {/* PROFILE FORM */}
      <main className="profile-container">
        <h2>Club Profile</h2>

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
            Save / Update Profile
          </button>
        </div>
      </main>
    </>
  );
};

export default ClubProfile;
