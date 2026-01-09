import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link as RouterLink } from 'react-router-dom';
import { Link as ScrollLink } from 'react-scroll';
import Signup from './Signup';
import Login from './Login';
import banasthaliLogo from './banasthali-logo.jpg'; // Make sure this import exists
import ClubDashboard from "./ClubDashboard";
import ClubProfile from "./ClubProfile";
import StudentProfile from "./StudentProfile";
import StudentDashboard from "./StudentDashboard";
import AdminProfile from "./AdminProfile";
import AdminDashboard from "./AdminDashboard";

function Home() {
  return (
    <div className="App">
      <nav className="navbar">
        <div className="nav-left">
          <div className="nav-logo">Banverse</div>
          <ul className="nav-links">
            <li><ScrollLink to="home" smooth={true} duration={500}>Home</ScrollLink></li>
            <li><ScrollLink to="about" smooth={true} duration={500}>About</ScrollLink></li>
            <li><ScrollLink to="contact" smooth={true} duration={500}>Contact Us</ScrollLink></li>
          </ul>
        </div>
        <div className="nav-right">
          <RouterLink to="/signup"><button className="btn nav-btn">Register</button></RouterLink>
          <RouterLink to="/login"><button className="btn nav-btn">Login</button></RouterLink>
        </div>
      </nav>

      <section id="home" className="section">
        <div className="card full-width">
          <img src={banasthaliLogo} alt="Banasthali Logo" className="logo" />
          <h1>Welcome to Banverse</h1>
          <h3>
            <b>Banverse</b> is a university event management platform that connects students and clubs/organizations in one place.
            <br /> Discover events, workshops, hackathons, competitions, participate, and stay updated with campus activities effortlessly.
          </h3>
        </div>
      </section>

      <section id="about" className="section">
        <div className="card full-width">
          <h2>About Us</h2>
          <h4>
            Banverse is built to empower students and organizations at Banasthali University to collaborate, organize, and participate in events with ease.
            <br /> Our mission is to streamline campus engagement and foster a vibrant student community.
          </h4>
        </div>
      </section>

      <section id="contact" className="section">
        <div className="card full-width">
          <h2>Contact Us</h2>
          <p>Email: support@banverse.in</p>
          <p>Phone: +91-12345-67890</p>
          <p>Address: Banasthali Vidyapith, Rajasthan, India</p>
        </div>
      </section>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/clubdashboard" element={<ClubDashboard  />} />
        <Route path="/clubprofile" element={<ClubProfile  />} />
        <Route path="/studentdashboard" element={<StudentDashboard />} />
        <Route path="/studentprofile" element={<StudentProfile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/adminprofile" element={<AdminProfile />} />
        <Route path="/admindashboard" element={<AdminDashboard />} />
        <Route path="/home" element={<Home />} />
      </Routes>      
    </Router>
    
  );
}

export default App;