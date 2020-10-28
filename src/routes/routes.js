import React from "react";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// pages
import Hexagon from "../views/Hexagon";
import Book from "../views/Forms/Book";
import AcademicWork from "../views/Forms/AcademicWork";
import JuridicDocument from "../views/Forms/JuridicDocument";
import ElectronicMediaDocuments from "../views/Forms/ElectronicMediaDocuments";
import Audiovisual from "../views/Forms/Audiovisual";
import Events from "../views/Forms/Events";
import Other from "../views/Forms/Other";

// pages teste vocacional
import VocationalTest from "../views/VocationalTest";

const AppRoutes = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Hexagon} />
        <Route exact path="/book" component={Book} />
        <Route exact path="/academicWork" component={AcademicWork} />
        <Route exact path="/audiovisual" component={Audiovisual} />
        <Route exact path="/events" component={Events} />
        <Route
          exact
          path="/electronicMediaDocuments"
          component={ElectronicMediaDocuments}
        />
        <Route exact path="/juridicDocument" component={JuridicDocument} />
        <Route exact path="/other" component={Other} />

        {/* teste vocacional */}
        <Route exact path="/test" component={VocationalTest} />
      </Switch>
    </Router>
  );
};

export default AppRoutes;
