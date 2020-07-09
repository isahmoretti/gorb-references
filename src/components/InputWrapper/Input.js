import React from "react";

import { TextField } from "@material-ui/core";

import { Container, ErrorText } from "./style";

const InputWrapper = ({ ...rest }) => {
  const { errors, touched, name, nameField } = rest;

  return (
    <Container>
      <TextField variant="outlined" {...rest} />
      {errors &&
        touched &&
        errors[nameField || name] &&
        touched[nameField || name] && (
          <ErrorText>{errors[nameField || name]}</ErrorText>
        )}
    </Container>
  );
};

InputWrapper.propTypes = {};

export default InputWrapper;
