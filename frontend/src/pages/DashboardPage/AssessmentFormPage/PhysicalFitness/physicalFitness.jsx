import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./physicalFitness.css";

const questions = [
  {
    id: 1,
    question: "How often do you engage in physical exercise?",
    options: {
      "Daily": 10,
      "3-4 times a week": 7,
      "Once a week": 5,
      "Never": 2,
    },
  },
  {
    id: 2,
    question: "Which of these exercises do you most often participate in?",
    options: {
      "Cardio (running, cycling, swimming)": 10,
      "Strength training (weightlifting)": 7,
      "Flexibility exercises (yoga, stretching)": 5,
      "None of the above": 2,
    },
  },
  {
    id: 3,
    question: "How would you rate your overall physical fitness?",
    options: {
      "Excellent": 10,
      "Good": 7,
      "Fair": 5,
      "Poor": 2,
    },
  },
  {
    id: 4,
    question: "Do you include warm-up and cool-down in your exercise routine?",
    options: {
      "Yes, every time": 10,
      "Sometimes": 7,
      "Rarely": 5,
      "Never": 2,
    },
  },
  {
    id: 5,
    question: "How many hours of sleep do you get on average per night?",
    options: {
      "7-9 hours": 10,
      "5-7 hours": 7,
      "Less than 5 hours": 5,
      "More than 9 hours": 2,
    },
  },
  {
    id: 6,
    question: "How would you describe your diet?",
    options: {
      "Balanced with proteins, carbs, and fats": 10,
      "High in processed foods": 5,
      "Low in fruits and vegetables": 7,
      "Very restrictive or irregular": 2,
    },
  },
  {
    id: 7,
    question: "Do you experience regular physical discomfort or pain?",
    options: {
      "No, rarely or never": 10,
      "Occasionally": 7,
      "Frequently": 5,
      "Constantly": 2,
    },
  },
  {
    id: 8,
    question: "Do you drink enough water daily?",
    options: {
      "Yes, at least 8 glasses": 10,
      "Sometimes": 7,
      "Rarely": 5,
      "Never": 2,
    },
  },
  {
    id: 9,
    question: "How would you rate your flexibility?",
    options: {
      "Excellent (can touch toes easily)": 10,
      "Average (can reach halfway down to toes)": 7,
      "Below average (can barely reach knees)": 5,
      "Poor (no flexibility)": 2,
    },
  },
  {
    id: 10,
    question: "How often do you take breaks from sitting or sedentary activities?",
    options: {
      "Every hour or more frequently": 10,
      "Every 2-3 hours": 7,
      "Rarely": 5,
      "Never": 2,
    },
  },
];

const PhysicalFitness = () => {
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
          category: "physicalFitness",
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
    <div className="physical-fitness-container">
      <h1>Physical Fitness Assessment</h1>
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

export default PhysicalFitness;

