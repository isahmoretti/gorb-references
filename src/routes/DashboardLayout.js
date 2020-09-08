import React from "react";

import { Route } from "react-router-dom";

import LoggedLayout from "../layout/LoggedLayout";

const DashboardLayout = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(matchProps) => (
        <LoggedLayout>
          <Component {...matchProps} />
        </LoggedLayout>
      )}
    />
  );
};

export default DashboardLayout;
