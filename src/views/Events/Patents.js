import React, { useState } from "react";

import { Formik } from "formik";

import * as Yup from "yup";

import { Grid } from "@material-ui/core";

// components
import Input from "../../components/InputWrapper/Input";
import Select from "../../components/InputWrapper/Select";
import Button from "../../components/Buttons";
import Modal from "../../components/Modal";

import ArrowLeft from "../../assets/images/arrow-left.svg";

// utils
import { formatDate } from "../../utils/formatDate";
import { generateCitationWithAuthor } from "../../utils/generateCitationWithAuthor";
import { generateCitationWithoutAuthor } from "../../utils/generateCitationWithoutAuthor";

// styles
import { Container, Card, Row, Content, Back, Actions, Title } from "./style";

const SignupSchema = Yup.object().shape({
  name: Yup.string().required("Obrigatório"),
  title: Yup.string().required("Obrigatório"),
  type: Yup.string().required("Obrigatório"),
  typeDescription: Yup.string().required("Obrigatório"),
  patentNumber: Yup.string().required("Obrigatório"),
  depositDate: Yup.string().required("Obrigatório"),
});

const getTypeName = (type) => {
  switch (type) {
    case 'depositor':
      return 'Depositante'
    case 'holder':
      return 'Titular'
    default:
      return ''
  }
}
const generateReference = (values) => {
  const {
    name,
    title,
    type,
    typeDescription,
    attorney, // procurador
    patentNumber,
    depositDate,
    patentGrantDate,
    specification,
    url,
    accessedAt,
  } = values;

  return (
    <span>
    </span>
  );
};

const Patents = ({ back }) => {
  const [state, setState] = useState({
    values: {},
    clearInitialValues: false,
  });

  const [openModal, setOpenModal] = useState(false);

  const handleSubmit = (values) => {
    setState((prev) => ({
      ...prev,
      values,
      references: generateReference(values),
    }));

    setOpenModal(!openModal);
  };

  return (
    <Container>
      <Back onClick={back} src={ArrowLeft} />

      <Formik
        initialValues={{
          name: '',
          title: '',
          type: 'holder',
          typeDescription: '',
          attorney: '', // procurador
          patentNumber: '',
          depositDate: '',
          patentGrantDate: '',
          specification: '',
          url: '',
          accessedAt: '',
        }}
        validationSchema={SignupSchema}
        onSubmit={handleSubmit}
      >
        {(props) => (
          <form style={{ maxWidth: 1000 }} onSubmit={props.handleSubmit}>
            <Actions>
              <Title>
                <p
                  style={{
                    fontSize: "20px",
                  }}
                >
                  PATENTES
                </p>
              </Title>
            </Actions>
            <Card>
              <Content>
                <Grid container spacing={2} style={{ marginBottom: 0 }}>
                  <Grid item xs={12} sm={12} md={6}>
                    <Input
                      type="text"
                      label="Nome do inventor"
                      placeholder="Ex: Romeu Lehnen"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.name}
                      name="name"
                      errors={props.errors}
                      touched={props.touched}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={6}>
                    <Input
                      type="text"
                      label="Título da patente"
                      placeholder="Ex: Salto com mecanismo amortecedor"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.title}
                      name="title"
                      errors={props.errors}
                      touched={props.touched}
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={2} style={{ marginBottom: 0 }}>
                  <Grid item xs={12} sm={12} md={4}>
                    <Select
                      type="text"
                      label="Escolher entre dois itens"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.type}
                      name="type"
                      options={[
                        { value: 'depositor', name: 'Depositante' },
                        { value: 'holder', name: 'Titular' }
                      ]}
                      errors={props.errors}
                      touched={props.touched}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={8}>
                    <Input
                      type="text"
                      label={getTypeName(props.values.type)}
                      placeholder="Ex: Custódio de Almeida & Cia"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.attorney}
                      name="attorney"
                      errors={props.errors}
                      touched={props.touched}
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={2} style={{ marginBottom: 0 }}>
                  <Grid item xs={12} sm={12} md={8}>
                    <Input
                      type="text"
                      label="Procurador"
                      placeholder="Ex: Nome do procurador, se houver"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.typeDescription}
                      name="typeDescription"
                      errors={props.errors}
                      touched={props.touched}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={4}>
                    <Input
                      type="text"
                      label="Número da patente"
                      placeholder="Ex: MU 8803472-0 Y1"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.patentNumber}
                      name="patentNumber"
                      errors={props.errors}
                      touched={props.touched}
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={2} style={{ marginBottom: 0 }}>
                  <Grid item xs={12} sm={12} md={3}>
                    <Input
                      type="date"
                      label="Data de depósito"
                      InputLabelProps={{
                        shrink: true
                      }}
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.depositDate}
                      name="depositDate"
                      errors={props.errors}
                      touched={props.touched}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={3}>
                    <Input
                      type="date"
                      label="Data de concessão da patente"
                      InputLabelProps={{
                        shrink: true
                      }}
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.patentGrantDate}
                      name="patentGrantDate"
                      errors={props.errors}
                      touched={props.touched}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={6}>
                    <Input
                      type="text"
                      label="Especificações"
                      placeholder="Ex: Int. Ci. G02B 26/10 (2009.01), G02F 1/29 (2009.01)"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.specification}
                      name="specification"
                      errors={props.errors}
                      touched={props.touched}
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={2} style={{ marginBottom: 0 }}>
                  <Grid item xs={12} sm={12} md={9}>
                    <Input
                      name="url"
                      label="Disponível em"
                      type="text"
                      placeholder="https://viacarreira.com/"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.url}
                      errors={props.errors}
                      touched={props.touched}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={3}>
                    <Input
                      name="accessedAt"
                      type="date"
                      label="Acesso em"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.accessedAt}
                      errors={props.errors}
                      touched={props.touched}
                    />
                  </Grid>
                </Grid>
                <Row container className="end">
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={props.resetForm}
                  >
                    Limpar campos
                  </Button>
                  <Button type="submit" color="primary">
                    Gerar referência e citação
                  </Button>
                </Row>
              </Content>
              <Modal
                isOpen={openModal}
                handleClose={() => setOpenModal(!openModal)}
                text={state.references}
                citationWithAuthor={state.citationWithAuthor}
                citation={state.citation}
              />
            </Card>
          </form>
        )}
      </Formik>
    </Container>
  );
};

export default Patents;
