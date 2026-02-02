import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./mentalBeing.css";

const questions = [
  {
    id: 1,
    question: "How often do you feel stressed?",
    options: {
      "Never": 10,
      "Occasionally": 7,
      "Frequently": 5,
      "Always": 2,
    },
  },
  {
    id: 2,
    question: "How would you rate your mood most days?",
    options: {
      "Very good": 10,
      "Good": 7,
      "Neutral": 5,
      "Low": 2,
    },
  },
  {
    id: 3,
    question: "Do you regularly practice relaxation techniques (e.g., meditation, deep breathing)?",
    options: {
      "Yes, every day": 10,
      "Occasionally": 7,
      "Rarely": 5,
      "Never": 2,
    },
  },
  {
    id: 4,
    question: "Do you feel connected to others socially?",
    options: {
      "Yes, strongly": 10,
      "Somewhat": 7,
      "Rarely": 5,
      "No, not at all": 2,
    },
  },
  {
    id: 5,
    question: "How well do you sleep at night?",
    options: {
      "Very well": 10,
      "Fairly well": 7,
      "Poorly": 5,
      "Very poorly": 2,
    },
  },
  {
    id: 6,
    question: "How often do you feel anxious?",
    options: {
      "Never": 10,
      "Occasionally": 7,
      "Frequently": 5,
      "Always": 2,
    },
  },
  {
    id: 7,
    question: "Do you feel that you have a good work-life balance?",
    options: {
      "Yes, always": 10,
      "Mostly": 7,
      "Sometimes": 5,
      "No, not at all": 2,
    },
  },
  {
    id: 8,
    question: "How often do you engage in activities that bring you joy?",
    options: {
      "Every day": 10,
      "A few times a week": 7,
      "Occasionally": 5,
      "Never": 2,
    },
  },
  {
    id: 9,
    question: "How would you rate your overall mental well-being?",
    options: {
      "Excellent": 10,
      "Good": 7,
      "Fair": 5,
      "Poor": 2,
    },
  },
  {
    id: 10,
    question: "How often do you take breaks to relax or refresh your mind?",
    options: {
      "Every day": 10,
      "A few times a week": 7,
      "Rarely": 5,
      "Never": 2,
    },
  },
];

const MentalWellBeing = () => {
  const navigate = useNavigate();
  const API = import.meta.env.VITE_API_URL;
  const [answers, setAnswers] = useState({});

  const handleOptionChange = (questionId, score) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: score,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const totalScore = Object.values(answers).reduce((sum, score) => sum + score, 0);

    try {
      const response = await fetch(`${API}/api/assessments/save-score`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          email: localStorage.getItem("email"),
          category: "mentalWellBeing",
          score: totalScore,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        alert(data.message);
        navigate("/dashboard");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while processing your request.");
    }
  };

  return (
    <div className="mental-well-being-container">
      <h1>Mental Well-Being Assessment</h1>
      <form onSubmit={handleSubmit}>
        {questions.map((q) => (
          <div className="question-card" key={q.id}>
            <h3>{q.question}</h3>
            <div className="options-container">
              {Object.entries(q.options).map(([option, score]) => (
                <label key={option} className="option-label">
                  <input
                    type="radio"
                    name={`question-${q.id}`}
                    value={score}
                    checked={answers[q.id] === score}
                    onChange={() => handleOptionChange(q.id, score)}
                  />
                  {option}
                </label>
              ))}
            </div>
          </div>
        ))}
        <button type="submit" className="submit-btn">Submit</button>
      </form>
    </div>
  );
};

export default MentalWellBeing;


