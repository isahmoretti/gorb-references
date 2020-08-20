import React, { useState } from "react";

import { Formik } from "formik";

import * as Yup from "yup";

import { Grid } from "@material-ui/core";

// components
import Input from "../../components/InputWrapper/Input";
import Button from "../../components/Buttons";
import Select from "../../components/InputWrapper/Select";
import Modal from "../../components/Modal";

// utils
import { formatDate } from "../../utils/formatDate";

import ArrowLeft from "../../assets/images/arrow-left.svg";

// styles
import { Container, Card, Row, Content, Back, Actions, Title } from "./style";

const SignupSchema = Yup.object().shape({
  // jurisdiction: Yup.string().required("Obrigatório"),
});

const generateReference = (values) => {
  const {
    author,
    responsible,
    type,
    number,
    dateDoc,
    menu,
    publication,
    location,
    year,
    numberl,
    page,
    yearPublication,
    online,
    url,
    accessedAt,
  } = values;

  return (
    <span>
      {`${author.toUpperCase()}. `}
      {`${responsible}. `}
      {`${type} `}
      {`nº ${number}, `}
      {`${dateDoc}. `}
      {`${menu}. `}
      <b>{publication}: </b>
      {`${location}, `}
      {`ano ${year}, `}
      {`n. ${numberl}, `}
      {`p. ${page}, `}
      {yearPublication && `${formatDate(yearPublication)}. `}
      {online &&
        accessedAt &&
        url &&
        `Disponível em: ${url}. Acesso em: ${formatDate(accessedAt)}. `}
    </span>
  );
};

const AdministrativeActs = ({ back }) => {
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
          author: "Banco Central do Brasil",
          responsible: "Diretoria Colegiada",
          type: "Circular",
          number: "3.336",
          dateDoc: "29 de dezembro de 1982",
          menu:
            "Altera o Regulamento do Mercado de Câmbio e Capitais Internacionais",
          notes: "Série Legislação Brasileira",

          publication: "Diário Oficial da União",
          location: "Brasília, DF",
          year: "2000",
          numberl: "3",
          page: "32",
          yearPublication: "",

          online: false,
          url: "",
          accessedAt: "",
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
                  Atos administrativos
                </p>
                <span>
                  Ato normativo, aviso, circular, contrato, decreto,
                  deliberação, despacho, edital, estatuto, instrução normativa,
                  ofício, parecer, parecer técnico, portaria, regimento,
                  regulamento e resolução
                </span>
              </Title>
            </Actions>
            <Card>
              <Content>
                <Grid container spacing={2} style={{ marginBottom: 5 }}>
                  <Grid item xs={12} sm={12} md={6}>
                    <Input
                      name="author"
                      label="Autor"
                      placeholder="Ex: Banco Central do Brasil"
                      type="text"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.author}
                      errors={props.errors}
                      touched={props.touched}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={6}>
                    <Input
                      name="responsible"
                      label="Responsável"
                      placeholder="Ex: Diretoria Colegiada"
                      type="text"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.responsible}
                      errors={props.errors}
                      touched={props.touched}
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={2} style={{ marginBottom: 0 }}>
                  <Grid item xs={12} sm={12} md={2}>
                    <Input
                      name="type"
                      label="Título"
                      placeholder="Ex: Circular"
                      type="text"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.type}
                      errors={props.errors}
                      touched={props.touched}
                    />
                  </Grid>

                  <Grid item xs={12} sm={12} md={2}>
                    <Input
                      name="number"
                      label="Número"
                      placeholder="Ex: 3.348"
                      type="text"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.number}
                      errors={props.errors}
                      touched={props.touched}
                    />
                  </Grid>

                  <Grid item xs={12} sm={12} md={8}>
                    <Input
                      name="dateDoc"
                      label="Data de assinatura do documento"
                      placeholder="Ex: 29 de dezembro de 1982"
                      type="text"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.dateDoc}
                      errors={props.errors}
                      touched={props.touched}
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={2} style={{ marginBottom: 0 }}>
                  <Grid item xs={12} sm={12} md={6}>
                    <Input
                      name="menu"
                      label="Ementa"
                      placeholder="Ex: Altera o Regulamento do Mercado de Câmbio e Capitais Internacionais"
                      type="text"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.menu}
                      errors={props.errors}
                      touched={props.touched}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={6}>
                    <Input
                      name="notes"
                      label="Notas"
                      placeholder="Notas"
                      type="text"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.notes}
                      errors={props.errors}
                      touched={props.touched}
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={2} style={{ marginBottom: 5 }}>
                  <Grid item xs={12} sm={12} md={6}>
                    <Input
                      name="publication"
                      label="Publicação"
                      placeholder="Ex: Diário Oficial da União"
                      type="text"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.publication}
                      errors={props.errors}
                      touched={props.touched}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={6}>
                    <Input
                      name="location"
                      label="Local da publicação"
                      placeholder="Ex: Brasília, DF"
                      type="text"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.location}
                      errors={props.errors}
                      touched={props.touched}
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={2} style={{ marginBottom: 5 }}>
                  <Grid item xs={12} sm={12} md={3}>
                    <Input
                      name="yearPublication"
                      type="date"
                      label="Data de publicação"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.yearPublication}
                      errors={props.errors}
                      touched={props.touched}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={3}>
                    <Input
                      name="year"
                      label="Ano"
                      placeholder="Ex: 144"
                      type="text"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.year}
                      errors={props.errors}
                      touched={props.touched}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={3}>
                    <Input
                      name="numberl"
                      label="Número"
                      placeholder="Ex: 85"
                      type="text"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.number}
                      errors={props.errors}
                      touched={props.touched}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={3}>
                    <Input
                      name="page"
                      label="Página"
                      placeholder="Ex: 32"
                      type="text"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.page}
                      errors={props.errors}
                      touched={props.touched}
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={2} style={{ marginBottom: 5 }}>
                  <Grid item xs={12} sm={12} md={3}>
                    <Select
                      name="online"
                      label="Online"
                      type="text"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.online}
                      errors={props.errors}
                      touched={props.touched}
                      options={[
                        { value: true, name: "Sim" },
                        { value: false, name: "Não" },
                      ]}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={6}>
                    <Input
                      disabled={!props.values.online}
                      name="url"
                      label="Endereço(URL)"
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
                      disabled={!props.values.online}
                      name="accessedAt"
                      type="date"
                      label="Data de acesso"
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
                // citationWithAuthor={state.citationWithAuthor}
                // citation={state.citation}
              />
            </Card>
          </form>
        )}
      </Formik>
    </Container>
  );
};

export default AdministrativeActs;
