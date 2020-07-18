import React, { useState } from "react";

import { TextField, Button, Popover, Typography } from "@material-ui/core";

import { Container, ErrorText, IconHelp, ContainerHelp } from "./style";

import "./style.css";

const InputWrapper = ({ ...rest }) => {
  const { errors, touched, name, nameField, help, helpText } = rest;

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <Container>
      {help && (
        <ContainerHelp>
          <Button
            className="color-transparent"
            aria-describedby={id}
            variant="contained"
            color="primary"
            onClick={handleClick}
          >
            <IconHelp />
          </Button>
          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "center",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
          >
            <Typography style={{ padding: 20 }}>{helpText}</Typography>
          </Popover>
        </ContainerHelp>
      )}
      <TextField size="small" variant="outlined" {...rest} />
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
