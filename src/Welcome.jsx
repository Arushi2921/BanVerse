import React from "react";
import { useNavigate } from "react-router-dom";
import "./Welcome.css";
import logo from "./assets/logo.png";


function Welcome() {
  const navigate = useNavigate();

  return (
    <>
      <div className="background"></div>

      <div className="container">
        <img src={logo} alt="Banverse Logo" className="logo" />
        <h1>Welcome to Banverse</h1>

        <p className="description">
          Banverse is a university event management platform that connects
          students and clubs in one place.
        </p>

        <div className="buttons">
          <button onClick={() => navigate("/login")}>Login</button>
          <button className="register" onClick={() => navigate("/signup")}>
            Register
          </button>
        </div>
      </div>
    </>
  );
}

export default Welcome;
