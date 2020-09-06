import React from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// pages
import HomePage from "./views/HomePage";
import Login from "./views/Login";
import Hexagon from "./views/Hexagon";
import VocationalTest from "./views/VocationalTest";
import HomePageTest from "./views/HomePageTest";

import Dashboard from "./views/Dashborad";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/app" element={<Hexagon />} />
        <Route path="/test" element={<VocationalTest />} />
        <Route path="/home" element={<HomePageTest />} />
        {/* private route */}
        <Route path="/dash" element={<Dashboard />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
