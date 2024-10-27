import  { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Hero from "./pages/Hero";
import RegisterPage from "./pages/Register";
import LoginPage from "./pages/Login";
import Dashboard from "./pages/Dashboard"; // New Dashboard component

const App = () => {
  // State to track if user is logged in
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));

  // Function to handle login (you can replace it with actual authentication logic)
  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <div>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Hero />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />

        {/* Protected Routes */}
        {isLoggedIn ? (
          <Route path="/dashboard/*" element={<Dashboard />} />
        ) : (
          <Route path="*" element={<Navigate to="/login" />} />
        )}
      </Routes>
    </div>
  );
};

export default App;
