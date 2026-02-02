import React from "react";
import { useNavigate } from "react-router-dom";
import "./assessmentForm.css";

const AssessmentPage = () => {
  const navigate = useNavigate();

  return (
    <div className="assessment-container">
      <h1>Assessment Categories</h1>
      <div className="assessment-cards">
        <div className="assessment-card" onClick={() => navigate("/physical-fitness")}>
          <h3>Physical Fitness</h3>
        </div>
        <div className="assessment-card" onClick={() => navigate("/nutrition")}>
          <h3>Nutrition</h3>
        </div>
        <div className="assessment-card" onClick={() => navigate("/mental-well-being")}>
          <h3>Mental Well Being</h3>
        </div>
        <div className="assessment-card" onClick={() => navigate("/lifestyle")}>
          <h3>Lifestyle</h3>
        </div>
        <div className="assessment-card" onClick={() => navigate("/biomarkers")}>
          <h3>Biomarkers</h3>
        </div>
      </div>
    </div>
  );
};

export default AssessmentPage;
