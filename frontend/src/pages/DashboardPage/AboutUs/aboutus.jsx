import React from 'react';
import './aboutus.css';
import { useNavigate } from 'react-router-dom';

function AboutUs() {
  const navigate = useNavigate();

  return (
    <div className="container">
      <button className="back-button" onClick={() => navigate('/dashboard')}>
        ←
      </button>
      <h1 className="title">HealthGuard Pro</h1>
      <h2 className="subtitle">About Us</h2>
      <div className="content-box">
        <p>
          <strong>"HealthGuard Pro"</strong> is a comprehensive health monitoring platform that empowers individuals to take control of their well-being. Our app integrates modern technology with user-centric design to provide actionable health insights, spanning physical health, mental wellness, nutrition, and lifestyle habits.
        </p>
        <p>
          The app leverages cutting-edge technology, including secure data management and advanced analytics, to help users make informed decisions about their health. With a focus on accessibility and personalization, HealthGuard Pro ensures that every user, regardless of their technical proficiency, can benefit from its powerful tools.
        </p>
        <p>
          We believe in a holistic approach to health management. Our features include personalized health assessments, progress tracking, expert-curated blogs, and real-time insights into your health metrics. By analyzing your lifestyle choices and health parameters, HealthGuard Pro delivers tailored advice to help you achieve your goals.
        </p>
        <p>
          Our mission is to bridge the gap between healthcare and technology, creating a seamless experience for users to monitor and improve their overall well-being. HealthGuard Pro empowers users to take charge of their health, paving the way for a healthier and more informed future.
        </p>
        <p>
          Whether you're tracking your fitness goals, monitoring chronic conditions, or seeking guidance on healthier living, HealthGuard Pro provides the tools and insights you need. Join us in our journey to make health management smarter, easier, and more accessible for everyone.
        </p>
      </div>
    </div>
  );
}

export default AboutUs;
