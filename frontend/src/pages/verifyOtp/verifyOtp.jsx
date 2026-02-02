import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./verifyOtp.css";

const API = import.meta.env.VITE_API_URL;

function OtpVerificationPage() {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const email = location.state?.email;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      setError("Email not found. Please restart the process.");
      return;
    }

    try {
      const response = await fetch(
        `${API}/api/otp/verify-otp`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, otp }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        alert(data.message);

        // 🔑 Store email temporarily for change password
        localStorage.setItem("resetEmail", email);

        navigate("/changePassword");
      } else {
        setError(data.message || "Invalid or expired OTP");
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Try again.");
    }
  };

  return (
    <div className="otp-container">
      <h1 className="app-title">Healthguard Pro</h1>
      <div className="otp-box">
        <h2 className="otp-title">Verify OTP</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
          />
          <button type="submit" className="otp-btn">
            Verify OTP
          </button>
        </form>

        {error && <p className="error-message">{error}</p>}
      </div>
    </div>
  );
}

export default OtpVerificationPage;


