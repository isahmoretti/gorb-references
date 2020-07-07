import React from "react";

import { Button } from "@material-ui/core";

const Buttons = ({ children, ...rest }) => {
  return (
    <Button style={{ marginLeft: 7 }} variant="contained" {...rest}>
      {children}
    </Button>
  );
};

Buttons.propTypes = {};

export default Buttons;
