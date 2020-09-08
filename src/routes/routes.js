import React from "react";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// layout
import DashboardLayout from "./DashboardLayout";

// pages
import HomePage from "../views/HomePage";
import Login from "../views/Login";
import Hexagon from "../views/Hexagon";
import VocationalTest from "../views/VocationalTest";
import HomePageTest from "../views/HomePageTest";
// pages logged
import Dashboard from "../views/Dashborad";
import Entity from "../views/Entity";

const AppRoutes = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/login" component={Login} />
        <Route path="/app" component={Hexagon} />
        <Route path="/test" component={VocationalTest} />
        <Route path="/home" component={HomePageTest} />
        {/* private route */}
        <DashboardLayout path="/dashboard" component={Dashboard} />
        <DashboardLayout path="/entity/:id" component={Entity} />
      </Switch>
    </Router>
  );
};

export default AppRoutes;
