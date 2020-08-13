import React, { useState } from "react";

import { Formik } from "formik";

import * as Yup from "yup";

import { Grid } from "@material-ui/core";

// components
import Input from "../../components/InputWrapper/Input";
import Select from "../../components/InputWrapper/Select";
import Button from "../../components/Buttons";
import Modal from "../../components/Modal";

// utils
import { formatDate } from "../../utils/formatDate";
import { generateCitationWithAuthor } from "../../utils/generateCitationWithAuthor";
import { generateCitationWithoutAuthor } from "../../utils/generateCitationWithoutAuthor";

// styles
import { Container, Card, Row, Content, Back, Actions, Title } from "./style";

const SignupSchema = Yup.object().shape({
  jurisdiction: Yup.string().required("Obrigatório"),
  nameOfTheNotaryOrIssuingBody: Yup.string().required("Obrigatório"),
  documentType: Yup.string().required("Obrigatório"),
});

const generateReference = (values) => {
  const {
    jurisdiction,
    nameOfTheNotaryOrIssuingBody,
    documentType,
    registrationDate,
    complementaryElement,
  } = values;

  return (
    <span>
      {jurisdiction && <>{jurisdiction}. </>}
      {nameOfTheNotaryOrIssuingBody && <>{nameOfTheNotaryOrIssuingBody}. </>}
      {documentType && <b>{documentType}. </b>}
      {registrationDate && <>Registro em:{formatDate(registrationDate)}. </>}
      {complementaryElement && <>{complementaryElement}. </>}
    </span>
  );
};

const Music = ({ back }) => {
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
      citationWithAuthor: generateCitationWithAuthor(
        values.jurisdiction,
        values.registrationDate
      ),
      citation: generateCitationWithoutAuthor(
        values.jurisdiction,
        values.registrationDate
      ),
    }));

    setOpenModal(!openModal);
  };

  return (
    <Container>
      <Back onClick={back} />

      <Formik
        initialValues={{
          title: "Vizinha Faladeira",
          interpreters: "Alcione",
          composer: "Acyr Marques",
          titleAlbum: "Ouro e Cobre",
          interpretersAlbum: "Alcione",
          location: "São Paulo",
          recordCompany: "RCA Victor",
          yaer: "1988",
          suport: "sim",
          whatSuport: "1 disco vinil, lado A, faixa 4, (3 min)",
          url: "",
          accessedAt: "",
          duration: "4 min",
          specificationSuport: "33 1/3 rpm, estéreo., 12 pol",
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
                  Música
                </p>
                <span></span>
              </Title>
            </Actions>
            <Card>
              <Content>
                <Grid container spacing={2} style={{ marginBottom: 0 }}>
                  <Grid item xs={12} sm={12} md={6}>
                    <Input
                      name="title"
                      type="text"
                      label="Título"
                      placeholder="Ex: Vizinha Faladeira"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.title}
                      errors={props.errors}
                      touched={props.touched}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={6}>
                    <Input
                      name="interpreters"
                      type="text"
                      label="Intérprete"
                      placeholder="Ex: Alcione"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.interpreters}
                      errors={props.errors}
                      touched={props.touched}
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={2} style={{ marginBottom: 0 }}>
                  <Grid item xs={12} sm={12} md={6}>
                    <Input
                      name="composer"
                      type="text"
                      label="Compositor"
                      placeholder="Ex: Acyr Marques"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.composer}
                      errors={props.errors}
                      touched={props.touched}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={6}>
                    <Input
                      name="titleAlbum"
                      type="text"
                      label="Título do álbum"
                      placeholder="Ex: Ouro e Cobre"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.titleAlbum}
                      errors={props.errors}
                      touched={props.touched}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={6}>
                    <Input
                      name="interpretersAlbum"
                      label="Intérprete do álbum"
                      type="text"
                      placeholder="Ex: Alcione"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.interpretersAlbum}
                      errors={props.errors}
                      touched={props.touched}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={3}>
                    <Input
                      name="location"
                      label="Local"
                      type="text"
                      placeholder="Ex: São Paulo"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.location}
                      errors={props.errors}
                      touched={props.touched}
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={2} style={{ marginBottom: 0 }}>
                  <Grid item xs={12} sm={12} md={6}>
                    <Input
                      name="recordCompany"
                      type="text"
                      label="Gravadora"
                      placeholder="Ex: RCA Victor"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.recordCompany}
                      errors={props.errors}
                      touched={props.touched}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={6}>
                    <Input
                      name="yaer"
                      type="text"
                      label="Ano"
                      placeholder="Ex: 1988"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.yaer}
                      errors={props.errors}
                      touched={props.touched}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={6}>
                    <Select
                      name="suport"
                      label="Suporte físico? "
                      type="text"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.suport}
                      errors={props.errors}
                      touched={props.touched}
                      options={[
                        { value: true, name: "Sim" },
                        { value: false, name: "Não" },
                      ]}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={3}>
                    <Input
                      name="whatSuport"
                      label="Qual suporte"
                      type="text"
                      placeholder="Ex: 1 disco vinil, lado A, faixa 4, (3 min)"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.whatSuport}
                      errors={props.errors}
                      touched={props.touched}
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={2} style={{ marginBottom: 0 }}>
                  <Grid item xs={12} sm={12} md={3}>
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
                <Grid container spacing={2} style={{ marginBottom: 0 }}>
                  <Grid item xs={12} sm={12} md={3}>
                    <Input
                      name="duration"
                      label="Duração"
                      type="text"
                      placeholder="Ex: 4 min"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.duration}
                      errors={props.errors}
                      touched={props.touched}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={3}>
                    <Input
                      name="specificationSuport"
                      label="Especificações do suporte"
                      type="text"
                      placeholder="Ex: 33 1/3 rpm, estéreo., 12 pol."
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.specificationSuport}
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

export default Music;
