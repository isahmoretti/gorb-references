import React from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// pages
import HomePage from "./views/HomePage";
import Dashboard from "./views/Dashboard";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/app" element={<Dashboard />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
