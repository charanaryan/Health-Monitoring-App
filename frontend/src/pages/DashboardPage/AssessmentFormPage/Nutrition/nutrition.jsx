import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./nutrition.css";

const questions = [
  {
    id: 1,
    question: "What is a balanced diet?",
    options: {
      "A diet with appropriate portions of proteins, fats, carbohydrates, vitamins, and minerals": 10,
      "A diet high in sugars and fats": 2,
      "A diet only consisting of vegetables": 5,
      "A diet with no carbohydrates": 7,
    },
  },
  {
    id: 2,
    question: "Which nutrient is the main source of energy?",
    options: {
      "Carbohydrates": 10,
      "Proteins": 5,
      "Vitamins": 2,
      "Minerals": 7,
    },
  },
  {
    id: 3,
    question: "What is the purpose of vitamins in the body?",
    options: {
      "To support the immune system and various metabolic processes": 10,
      "To provide energy": 5,
      "To build muscles": 2,
      "To repair damaged tissues": 7,
    },
  },
  {
    id: 4,
    question: "Which of the following is a good source of protein?",
    options: {
      "Chicken breast": 10,
      "Rice": 2,
      "Cucumbers": 5,
      "Olive oil": 7,
    },
  },
  {
    id: 5,
    question: "Which nutrient helps in the absorption of fat-soluble vitamins?",
    options: {
      "Fats": 10,
      "Water": 2,
      "Carbohydrates": 5,
      "Proteins": 7,
    },
  },
  {
    id: 6,
    question: "Which is an example of a micronutrient?",
    options: {
      "Vitamin D": 10,
      "Carbohydrates": 2,
      "Proteins": 7,
      "Fats": 5,
    },
  },
  {
    id: 7,
    question: "What are antioxidants?",
    options: {
      "Substances that help prevent cell damage from free radicals": 10,
      "Substances that cause damage to cells": 2,
      "Substances that provide energy": 5,
      "Substances that support muscle growth": 7,
    },
  },
  {
    id: 8,
    question: "Which food is high in fiber?",
    options: {
      "Whole grains": 10,
      "Butter": 2,
      "Cheese": 5,
      "Candy": 7,
    },
  },
  {
    id: 9,
    question: "What is the recommended daily water intake for adults?",
    options: {
      "8-10 cups of water per day": 10,
      "2 cups of water per day": 2,
      "10-12 cups of water per day": 7,
      "5-6 cups of water per day": 5,
    },
  },
  {
    id: 10,
    question: "Which of these is considered a healthy fat?",
    options: {
      "Olive oil": 10,
      "Butter": 2,
      "Lard": 5,
      "Fried foods": 7,
    },
  },
];

const Nutrition = () => {
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
          category: "nutrition",
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
    <div className="nutrition-container">
      <h1>Nutrition Assessment</h1>
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

export default Nutrition;

