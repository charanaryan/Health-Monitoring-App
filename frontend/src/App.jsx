import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/protectedRoutes";
import PublicRoute from "./components/publicRoutes"; // For unprotected routes
import DashboardPage from "./pages/DashboardPage/dashboard";
import AssessmentFormPage from "./pages/DashboardPage/AssessmentFormPage/assessmentform";
import Signup from "./pages/SignUpPage/signup";
import Login from "./pages/LoginPage/login";
import ForgotPasswordPage1 from "./pages/forgotPassword-1Page/forgotpassword-1";
import ChangePassword from "./pages/changePassword/changePassword";
import OtpVerificationPage from "./pages/verifyOtp/verifyOtp";
import PhysicalFitness from "./pages/DashboardPage/AssessmentFormPage/PhysicalFitness/physicalFitness";
import Lifestyle from "./pages/DashboardPage/AssessmentFormPage/Lifestyle/lifestyle";
import MentalWellBeing from "./pages/DashboardPage/AssessmentFormPage/MentalBeing/mentalBeing";
import Biomarkers from "./pages/DashboardPage/AssessmentFormPage/Biomarkers/biomarkers";
import Nutrition from "./pages/DashboardPage/AssessmentFormPage/Nutrition/nutrition";
import Blogs from "./pages/DashboardPage/Blogs/blogs";
import Cancer from "./pages/DashboardPage/Blogs/Chronic Ailments/Cancer/cancer";
import Thyroid from "./pages/DashboardPage/Blogs/Chronic Ailments/Thyroid/thyroid";
import Hypertension from "./pages/DashboardPage/Blogs/Chronic Ailments/Hypertension/hypertension";
import Asthma from "./pages/DashboardPage/Blogs/Chronic Ailments/Asthma/asthma";
import Arthritis from "./pages/DashboardPage/Blogs/Chronic Ailments/Arthritis/arthritis";
import Ayurveda from "./pages/DashboardPage/Blogs/Lifestyle/Ayurveda/ayurveda";
import Beauty from "./pages/DashboardPage/Blogs/Lifestyle/Beauty/beauty";
import Exercise from "./pages/DashboardPage/Blogs/Lifestyle/Exercise/exercise";
import FoodNutrition from "./pages/DashboardPage/Blogs/Lifestyle/Food&Nutrition/food&nutrition";
import MenHealth from "./pages/DashboardPage/Blogs/Wellness/menHealth/menhealth";
import WomenHealth from "./pages/DashboardPage/Blogs/Wellness/womenHealth.js/womenhealth";
import ChildCare from "./pages/DashboardPage/Blogs/Wellness/childCare/childcare";
import BoneHealth from "./pages/DashboardPage/Blogs/Wellness/boneHealth/bonehealth";
import Sleep from "./pages/DashboardPage/Blogs/Wellness/sleep/sleep";
import OralHealth from "./pages/DashboardPage/Blogs/Wellness/oralHealth/oralhealth";
import Diabetes from "./pages/DashboardPage/Blogs/Chronic Ailments/Diabetes/diabetes";
import Leaderboard from "./pages/DashboardPage/Leaderboard/leaderboard";
import AboutUs from "./pages/DashboardPage/AboutUs/aboutus";

function App() {
  const authenticatedRoutes = [
    { path: "/dashboard", element: <DashboardPage /> },
    { path: "/assessment", element: <AssessmentFormPage /> },
    { path: "/physical-fitness", element: <PhysicalFitness /> },
    { path: "/lifestyle", element: <Lifestyle /> },
    { path: "/mental-well-being", element: <MentalWellBeing /> },
    { path: "/biomarkers", element: <Biomarkers /> },
    { path: "/nutrition", element: <Nutrition /> },
    { path: "/blog", element: <Blogs /> },
    { path: "/cancer", element: <Cancer /> },
    { path: "/thyroid", element: <Thyroid /> },
    { path: "/hypertension", element: <Hypertension /> },
    { path: "/diabetes", element: <Diabetes /> },
    { path: "/asthma", element: <Asthma /> },
    { path: "/arthritis", element: <Arthritis /> },
    { path: "/ayurveda", element: <Ayurveda /> },
    { path: "/beauty", element: <Beauty /> },
    { path: "/exercise", element: <Exercise /> },
    { path: "/food&nutrition", element: <FoodNutrition /> },
    { path: "/menhealth", element: <MenHealth /> },
    { path: "/womenhealth", element: <WomenHealth /> },
    { path: "/childcare", element: <ChildCare /> },
    { path: "/bonehealth", element: <BoneHealth /> },
    { path: "/oralhealth", element: <OralHealth /> },
    { path: "/sleep", element: <Sleep /> },
    { path: "/leaderboard", element: <Leaderboard /> },
    { path: "/about-us", element: <AboutUs /> },
  ];

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route
          path="/"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/signup"
          element={
            <PublicRoute>
              <Signup />
            </PublicRoute>
          }
        />
        <Route
          path="/forgotPassword-1"
          element={
            <PublicRoute>
              <ForgotPasswordPage1 />
            </PublicRoute>
          }
        />
        <Route
          path="/changePassword"
          element={
            <PublicRoute>
              <ChangePassword />
            </PublicRoute>
          }
        />
        <Route
          path="/verifyOtp"
          element={
            <PublicRoute>
              <OtpVerificationPage />
            </PublicRoute>
          }
        />

        {/* Protected Routes */}
        {authenticatedRoutes.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            element={<ProtectedRoute>{route.element}</ProtectedRoute>}
          />
        ))}

        {/* Fallback Route */}
        <Route path="*" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
