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
import { formatMessage } from "../../utils/formatMessage";
// import { generateCitationWithAuthor } from "../../utils/generateCitationWithAuthor";
// import { generateCitationWithoutAuthor } from "../../utils/generateCitationWithoutAuthor";

import ArrowLeft from "../../assets/images/arrow-left.svg";

// styles
import { Container, Card, Row, Content, Back, Actions, Title } from "./style";

const SignupSchema = Yup.object().shape({
  mainEventName: Yup.string().required("Obrigatório"),
  mainEventNumber: Yup.string().required("Obrigatório"),
  participationEventNumbering: Yup.string().required("Obrigatório"),
  year: Yup.string().required("Obrigatório"),
  placeOfPerformance: Yup.string().required("Obrigatório"),
  title: Yup.string().required("Obrigatório"),
  placeOfPublication: Yup.string().required("Obrigatório"),
  publishingCompany: Yup.string().required("Obrigatório"),
  yearOfPublication: Yup.string().required("Obrigatório"),
});

const generateReference = (values) => {
  const {
    mainEventName,
    mainEventNumber,
    participationEventName,
    participationEventNumbering,
    year,
    placeOfPerformance,
    title,
    placeOfPublication,
    publishingCompany,
    yearOfPublication,
    pages,
    theme,
    note,
    online,
    url,
    accessedAt,
  } = values;

  return (
    <span>
      {mainEventName && <>{mainEventName.toUpperCase()}, </>}
      {mainEventNumber && <>{mainEventNumber}., </>}
      {participationEventName && <>{participationEventName.toUpperCase()}, </>}
      {participationEventNumbering && <>{participationEventNumbering}., </>}
      {year && <>{year}, </>}
      {placeOfPerformance && <>{placeOfPerformance}: </>}
      {title && <b>{formatMessage(title)}. </b>}
      {placeOfPublication && <>{placeOfPublication}: </>}
      {publishingCompany && <>{publishingCompany}, </>}
      {yearOfPublication && <>{yearOfPublication}. </>}
      {pages && <>{pages} p. </>}
      {theme && <>Tema: {theme}. </>}
      {note && <>{note}. </>}
      {online &&
        url &&
        `Disponível em: ${url}. Acesso em: ${formatDate(accessedAt)}. `}
    </span>
  );
};

const generateCitationWithAuthor = (author, year) => {
  return (
    <>
      {author} ({year})
    </>
  );
};

const generateCitationWithoutAuthor = (author, year) => {
  return (
    <>
      ({author.toUpperCase()}, {year})
    </>
  );
};

const WholeEvent = ({ back }) => {
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
        values.mainEventName,
        values.yearOfPublication
      ),
      citation: generateCitationWithoutAuthor(
        values.mainEventName,
        values.yearOfPublication
      ),
    }));

    setOpenModal(!openModal);
  };

  return (
    <Container>
      <Back onClick={back} src={ArrowLeft} />

      <Formik
        initialValues={{
          mainEventName: "",
          mainEventNumber: "",
          participationEventName: "",
          participationEventNumbering: "",
          year: "",
          placeOfPerformance: "",
          title: "",
          placeOfPublication: "",
          publishingCompany: "",
          yearOfPublication: "",
          pages: "",
          theme: "",
          note: "",
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
                  Evento no todo
                </p>
              </Title>
            </Actions>
            <Card>
              <Content>
                <Grid container spacing={2} style={{ marginBottom: 0 }}>
                  <Grid item xs={12} sm={12} md={8}>
                    <Input
                      type="text"
                      label="Nome do evento principal"
                      placeholder="Ex:Congresso Internacional do INES"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.mainEventName}
                      name="mainEventName"
                      errors={props.errors}
                      touched={props.touched}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={4}>
                    <Input
                      type="text"
                      label="Numeração do evento principal"
                      placeholder="Ex: 8"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.mainEventNumber}
                      name="mainEventNumber"
                      errors={props.errors}
                      touched={props.touched}
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={2} style={{ marginBottom: 0 }}>
                  <Grid item xs={12} sm={12} md={8}>
                    <Input
                      type="text"
                      label="Nome do evento de participação"
                      placeholder="Ex: Seminário Nacional do INES"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.participationEventName}
                      name="participationEventName"
                      errors={props.errors}
                      touched={props.touched}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={4}>
                    <Input
                      type="text"
                      label="Numeração do evento de participação"
                      placeholder="Ex: 14"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.participationEventNumbering}
                      name="participationEventNumbering"
                      errors={props.errors}
                      touched={props.touched}
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={2} style={{ marginBottom: 0 }}>
                  <Grid item xs={12} sm={12} md={2}>
                    <Input
                      type="text"
                      label="Ano"
                      placeholder="Ex: 2009"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.year}
                      name="year"
                      errors={props.errors}
                      touched={props.touched}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={4}>
                    <Input
                      type="text"
                      label="Local de realização do evento"
                      placeholder="Ex: Rio de Janeiro"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.placeOfPerformance}
                      name="placeOfPerformance"
                      errors={props.errors}
                      touched={props.touched}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={6}>
                    <Input
                      type="text"
                      label="Título do documento"
                      placeholder="Ex: Atas, Anais, Proceedings"
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
                    <Input
                      type="text"
                      label="Local de publicação"
                      placeholder="Ex: Rio de Janeiro"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.placeOfPublication}
                      name="placeOfPublication"
                      errors={props.errors}
                      touched={props.touched}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={5}>
                    <Input
                      type="text"
                      label="Editora"
                      placeholder="Ex: Instituto Nacional de Educação de Surdos"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.publishingCompany}
                      name="publishingCompany"
                      errors={props.errors}
                      touched={props.touched}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={3}>
                    <Input
                      type="text"
                      label="Data de publicação"
                      placeholder="Ex: 2009"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.yearOfPublication}
                      name="yearOfPublication"
                      errors={props.errors}
                      touched={props.touched}
                    />
                  </Grid>
                </Grid>

                <Grid container spacing={2} style={{ marginBottom: 0 }}>
                  <Grid item xs={12} sm={12} md={4}>
                    <Input
                      type="text"
                      label="Número de páginas"
                      placeholder="Ex: 160p."
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.pages}
                      name="pages"
                      errors={props.errors}
                      touched={props.touched}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={8}>
                    <Input
                      type="text"
                      label="Tema"
                      placeholder="Ex: Múltiplos Atores e Saberes na Educação de Surdos"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.theme}
                      name="theme"
                      errors={props.errors}
                      touched={props.touched}
                    />
                  </Grid>
                </Grid>

                <Grid container spacing={2} style={{ marginBottom: 0 }}>
                  <Grid item xs={12} sm={12} md={9}>
                    <Input
                      type="text"
                      label="Nota"
                      placeholder="Ex: Inclui bibliografia."
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.note}
                      name="note"
                      errors={props.errors}
                      touched={props.touched}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={3}>
                    <Select
                      label="Online?"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.online}
                      name="online"
                      options={[
                        { value: true, name: "Sim" },
                        { value: false, name: "Não  " },
                      ]}
                      errors={props.errors}
                      touched={props.touched}
                    />
                  </Grid>
                </Grid>

                <Grid container spacing={2} style={{ marginBottom: 0 }}>
                  <Grid item xs={12} sm={12} md={9}>
                    <Input
                      disabled={!props.values.online}
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
                      disabled={!props.values.online}
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

export default WholeEvent;
