import React from "react";
import { useNavigate } from "react-router-dom";
import "./Auth.css";
import logo from "./assets/logo.png";


function Otp() {
  const navigate = useNavigate();

  const verifyOtp = () => {
    navigate("/Home");
  };

  return (
    <>
      <div className="background"></div>

      <div className="form-container">
        <img src={logo} className="logo" alt="logo" />
        <h2>Verify OTP</h2>

        <input type="text" placeholder="Enter 6-digit OTP" maxLength="6" />
        <button onClick={verifyOtp}>Verify OTP</button>
      </div>
    </>
  );
}

export default Otp;
