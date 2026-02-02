import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token"); // Check if token exists

  if (!token) {
    // Redirect to login if token is missing
    return <Navigate to="/" replace />;
  }

  return children; // Render the child components (protected content)
};

export default ProtectedRoute;
