import React from "react";
import { useNavigate } from "react-router-dom";
import "./blogs.css";

const Blogs = () => {
  const navigate = useNavigate();

  const dropdowns = {
    "Chronic Ailments": [
      { label: "Cancer", route: "/cancer" },
      { label: "Diabetes", route: "/diabetes" },
      { label: "Hypertension", route: "/hypertension" },
      { label: "Asthma", route: "/asthma" },
      { label: "Arthritis", route: "/arthritis" },
      { label: "Thyroid", route: "/thyroid" },
    ],
    Lifestyle: [
      { label: "Ayurveda", route: "/ayurveda" },
      { label: "Food & Nutrition", route: "/food&nutrition" },
      { label: "Exercise", route: "/exercise" },
      { label: "Beauty", route: "/beauty" },
    ],
    Wellness: [
      { label: "Men's Health", route: "/menhealth" },
      { label: "Women's Health", route: "/womenhealth" },
      { label: "Child's Care", route: "/childcare" },
      { label: "Sleep", route: "/sleep" },
      { label: "Oral Health", route: "/oralhealth" },
      { label: "Bone Health", route: "/bonehealth" },
    ],
  };

  return (
    <div className="blogs-container">
      <h1>Explore Our Blog Categories</h1>
      <div className="blog-cards">
        {Object.entries(dropdowns).map(([category, options]) => (
          <div key={category} className="blog-card">
            <h3>{category}</h3>
            <ul className="dropdown-menu">
              {options.map((option) => (
                <li
                  key={option.route}
                  className="dropdown-item"
                  onClick={() => navigate(option.route)}
                >
                  {option.label}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blogs;

