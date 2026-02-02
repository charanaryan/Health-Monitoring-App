import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./login.css";

const API = import.meta.env.VITE_API_URL;

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z@$!%*?&\d]{6,12}$/;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate email
    if (!emailRegex.test(formData.email)) {
      alert("Please enter a valid email address.");
      return;
    }

    // Validate password
    if (!passwordRegex.test(formData.password)) {
      alert(
        "Password does not meet the eligible criteria. Ensure it is 6-12 characters long, includes at least one uppercase letter, one lowercase letter, one digit, one special character, and does not start with a digit or special character."
      );
      return;
    }

    try {
      const response = await fetch(`${API}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        alert(data.message);
        localStorage.setItem("token", data.token);
        localStorage.setItem("email", formData.email);
        navigate("/dashboard", { state: { username: data.username } });
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="login-container">
      <h1 className="app-title">Healthguard Pro</h1>
      <div className="login-box">
        <h2 className="login-title">Log In</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Enter email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Enter password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button className="login-btn" type="submit">
            Sign In
          </button>
        </form>
        <div className="signup-link">
          <p>
            New User? <Link to="/signup">Sign up</Link>
          </p>
          <p>
            <Link to="/forgotPassword-1">Forgot password?</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
