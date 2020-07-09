import React from "react";

import { TextField } from "@material-ui/core";

import { Container, ErrorText } from "./style";

const InputWrapper = ({ ...rest }) => {
  const { errors, touched, name } = rest;

  return (
    <Container>
      <TextField variant="outlined" {...rest} />
      {errors && touched && errors[name] && touched[name] && (
        <ErrorText>{errors[name]}</ErrorText>
      )}
    </Container>
  );
};

InputWrapper.propTypes = {};

export default InputWrapper;
