import React from "react";

import { Input, TextField } from "@material-ui/core";

import { Container } from "./style";

const InputWrapper = ({ ...rest }) => {
  return (
    <Container>
      <TextField variant="outlined" {...rest} />
    </Container>
  );
};

InputWrapper.propTypes = {};

export default InputWrapper;
