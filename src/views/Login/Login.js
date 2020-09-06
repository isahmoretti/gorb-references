import React from "react";

// import PropTypes from "prop-types";

import { Formik, Form, Field } from "formik";
import { TextField, Button } from "@material-ui/core";

import { Container, WrapperInput, WrapperForm } from "./style";

const Input = (props) => {
  const { name } = props;
  return (
    <Field name={name}>
      {(propsField) => (
        <WrapperInput>
          <TextField
            variant="outlined"
            fullWidth
            {...props}
            {...propsField.field}
          />
          <span className="erro">
            {propsField.meta.touched &&
              propsField.meta.error &&
              propsField.meta.error}
          </span>
        </WrapperInput>
      )}
    </Field>
  );
};

const Login = () => {
  const handleSubmit = (values) => {
    console.log(values);
  };

  return (
    <Container>
      <Formik
        initialValues={{
          username: "",
          password: "",
        }}
        onSubmit={handleSubmit}
      >
        {(props) => (
          <WrapperForm>
            <h1> Login - GORB </h1>
            <Form>
              <Input name="username" label="Usuário" />
              <Input name="password" type="password" label="Senha" />

              <Button variant="outlined" color="secondary" type="submit">
                Entrar
              </Button>
            </Form>
          </WrapperForm>
        )}
      </Formik>
    </Container>
  );
};

Login.propTypes = {};

export default Login;
