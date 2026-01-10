import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Welcome from "./Welcome";
import Home from "./Home";
import Otp from "./Otp";
import Signup from "./Signup";
import Login from "./Login";
import ClubDashboard from "./ClubDashboard";
import ClubProfile from "./ClubProfile";
import StudentDashboard from "./StudentDashboard";
import StudentProfile from "./StudentProfile";
import AdminDashboard from "./AdminDashboard";
import AdminProfile from "./AdminProfile";
import About from "./About";
import Contact from "./Contact";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/home" element={<Home />} />
        <Route path="/otp" element={<Otp />} />

        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        <Route path="/clubdashboard" element={<ClubDashboard />} />
        <Route path="/clubprofile" element={<ClubProfile />} />

        <Route path="/studentdashboard" element={<StudentDashboard />} />
        <Route path="/studentprofile" element={<StudentProfile />} />

        <Route path="/admindashboard" element={<AdminDashboard />} />
        <Route path="/adminprofile" element={<AdminProfile />} />
      </Routes>
    </Router>
  );
}

export default App;
