import React from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// pages
import HomePage from "./views/HomePage";
import Dashboard from "./views/Dashboard";
import VocationalTest from "./views/VocationalTest";
import HomePageTest from "./views/HomePageTest";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/app" element={<Dashboard />} />
        <Route path="/test" element={<VocationalTest />} />
        <Route path="/home" element={<HomePageTest />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
