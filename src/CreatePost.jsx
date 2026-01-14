import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./createPost.css";
import logo from "./assets/logo.png";

export default function CreatePost() {
  const navigate = useNavigate();
  const [poster, setPoster] = useState("");
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    title: "",
    desc: "",
    date: "",
    time: "",
    venue: "",
    regLink: "",
    contact: "",
    participants: ""
  });

  const handlePoster = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setPoster(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const submit = (e) => {
    e.preventDefault();
    
    if (!poster || !form.title || !form.desc || !form.date || !form.time || !form.venue) {
      setError("Please fill all required fields");
      return;
    }

    try {
      const posts = JSON.parse(localStorage.getItem("posts")) || [];
      posts.unshift({
        id: Date.now().toString(),
        clubName: localStorage.getItem("clubName"),
        clubId: localStorage.getItem("clubId"),
        poster,
        ...form
      });

      localStorage.setItem("posts", JSON.stringify(posts));
      navigate("/clubdashboard");
    } catch (err) {
      setError("Error creating event. Please try again.");
    }
  };

  const handleCancel = () => {
    navigate("/clubdashboard");
  };

  return (
    <>
      <header className="header">
        <div className="header-left" onClick={() => navigate("/home")}>
          <div className="logo-circle">
            <img src={logo} alt="logo" />
          </div>
          <span className="brand-name">Banverse</span>
        </div>
        <button className="back-btn" onClick={handleCancel}>← Back to Dashboard</button>
      </header>

      <main className="create-container">
        <div className="create-wrapper">
          <div className="create-header">
            <h2>📝 Create Event</h2>
            <p>Share your club's upcoming events with the community</p>
          </div>

          <form className="create-box" onSubmit={submit}>
            {error && <div className="error-message">{error}</div>}

            <div className="form-section">
              <label className="file-label">
                <span>📸 Event Poster *</span>
                <input type="file" onChange={handlePoster} accept="image/*" />
              </label>
              {poster && (
                <div className="preview-container">
                  <img src={poster} className="preview-img" alt="Event poster" />
                  <button
                    type="button"
                    className="remove-btn"
                    onClick={() => setPoster("")}
                  >
                    ✕ Remove
                  </button>
                </div>
              )}
            </div>

            <div className="form-grid">
              <div className="form-group">
                <label>Event Title *</label>
                <input
                  type="text"
                  placeholder="e.g., Tech Talk 2024"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label>Date *</label>
                <input
                  type="date"
                  value={form.date}
                  onChange={(e) => setForm({ ...form, date: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label>Time *</label>
                <input
                  type="time"
                  value={form.time}
                  onChange={(e) => setForm({ ...form, time: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label>Venue *</label>
                <input
                  type="text"
                  placeholder="e.g., Main Auditorium"
                  value={form.venue}
                  onChange={(e) => setForm({ ...form, venue: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label>Registration Link</label>
                <input
                  type="url"
                  placeholder="https://example.com/register"
                  value={form.regLink}
                  onChange={(e) => setForm({ ...form, regLink: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label>Contact</label>
                <input
                  type="email"
                  placeholder="contact@example.com"
                  value={form.contact}
                  onChange={(e) => setForm({ ...form, contact: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label>Who can Participate?</label>
                <input
                  type="text"
                  placeholder="e.g., All Students, Members Only"
                  value={form.participants}
                  onChange={(e) => setForm({ ...form, participants: e.target.value })}
                />
              </div>
            </div>

            <div className="form-group full-width">
              <label>Description *</label>
              <textarea
                placeholder="Describe your event in detail..."
                value={form.desc}
                onChange={(e) => setForm({ ...form, desc: e.target.value })}
                required
              />
            </div>

            <div className="form-actions">
              <button type="submit" className="submit-btn">✓ Publish Event</button>
              <button type="button" className="cancel-btn" onClick={handleCancel}>Cancel</button>
            </div>
          </form>
        </div>
      </main>
    </>
  );
}
