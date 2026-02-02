import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./biomarkers.css";

const questions = [
  {
    id: 1,
    question: "How often do you monitor your blood pressure?",
    options: {
      "Regularly (at least once a month)": 10,
      "Occasionally (a few times a year)": 7,
      "Rarely": 5,
      "Never": 2,
    },
  },
  {
    id: 2,
    question: "How is your fasting blood sugar level?",
    options: {
      "Normal": 10,
      "Borderline": 7,
      "Elevated": 5,
      "High": 2,
    },
  },
  {
    id: 3,
    question: "Do you get your cholesterol levels checked regularly?",
    options: {
      "Yes, annually": 10,
      "Occasionally": 7,
      "Rarely": 5,
      "Never": 2,
    },
  },
  {
    id: 4,
    question: "How often do you track your body mass index (BMI)?",
    options: {
      "Regularly": 10,
      "Sometimes": 7,
      "Rarely": 5,
      "Never": 2,
    },
  },
  {
    id: 5,
    question: "Are your vitamin D levels within the recommended range?",
    options: {
      "Yes, confirmed by a test": 10,
      "Not sure, but I feel fine": 7,
      "Not sure and I feel symptoms of deficiency": 5,
      "No, they are low": 2,
    },
  },
  {
    id: 6,
    question: "Do you track your hemoglobin levels?",
    options: {
      "Yes, regularly": 10,
      "Occasionally": 7,
      "Rarely": 5,
      "Never": 2,
    },
  },
  {
    id: 7,
    question: "How often do you assess your kidney function (e.g., creatinine levels)?",
    options: {
      "Regularly": 10,
      "Occasionally": 7,
      "Rarely": 5,
      "Never": 2,
    },
  },
  {
    id: 8,
    question: "How often do you check your thyroid function?",
    options: {
      "Annually": 10,
      "Every few years": 7,
      "Rarely": 5,
      "Never": 2,
    },
  },
  {
    id: 9,
    question: "Do you regularly monitor your hydration levels?",
    options: {
      "Yes, daily": 10,
      "Sometimes": 7,
      "Rarely": 5,
      "Never": 2,
    },
  },
  {
    id: 10,
    question: "How often do you undergo routine health check-ups?",
    options: {
      "Annually or more frequently": 10,
      "Every few years": 7,
      "Rarely": 5,
      "Never": 2,
    },
  },
];

const Biomarkers = () => {
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
          category: "biomarkers",
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
    <div className="biomarkers-container">
      <h1>Biomarkers Assessment</h1>
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

export default Biomarkers;






