import React, { useState } from "react";

import { Formik } from "formik";

import * as Yup from "yup";

import { Grid } from "@material-ui/core";

// components
import Input from "../../../components/InputWrapper/Input";
import Select from "../../../components/InputWrapper/Select";
import Button from "../../../components/Buttons";
import Modal from "../../../components/Modal";

// utils
import { formatDate } from "../../../utils/formatDate";

import ArrowLeft from "../../../assets/images/arrow-left.svg";

// styles
import { Container, Card, Row, Content, Back, Actions, Title } from "./style";

const SignupSchema = Yup.object().shape({
  firstName: Yup.string().required("Obrigatório"),
  secondName: Yup.string().required("Obrigatório"),
  title: Yup.string().required("Obrigatório"),
  caption: Yup.string().required("Obrigatório"),
  place: Yup.string().required("Obrigatório"),
  publisher: Yup.string().required("Obrigatório"),
  year: Yup.string().required("Obrigatório"),
  pages: Yup.string().required("Obrigatório"),
});

const generateReference = (values) => {
  const {
    firstName,
    secondName,
    title,
    caption,
    place,
    publisher,
    year,
    pages,
    online,
    url,
    accessedAt,
  } = values;

  return (
    <span>
      {secondName && <>{secondName} - </>}
      {firstName && <>{firstName}. </>}
      {title && <b>{title}: </b>}
      {caption && <>{caption}. </>}
      {place && <>{place}: </>}
      {publisher && <>{publisher}. </>}
      {year && <>{year}. </>}
      {pages && <>{pages} p. </>}
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
const TechnicalStandards = ({ back }) => {
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
        values.secondName,
        values.year
      ),
      citation: generateCitationWithoutAuthor(values.secondName, values.year),
    }));

    setOpenModal(!openModal);
  };

  return (
    <Container>
      <Back onClick={back} src={ArrowLeft} />

      <Formik
        initialValues={{
          firstName: "",
          secondName: "",
          title: "",
          caption: "",
          place: "",
          publisher: "",
          year: "",
          pages: "",
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
                  NORMAS TÉCNICAS
                </p>
              </Title>
            </Actions>
            <Card>
              <Content>
                <Grid container spacing={2} style={{ marginBottom: 0 }}>
                  <Grid item xs={12} sm={12} md={7}>
                    <Input
                      type="text"
                      label="Primeira parte do nome da entidade"
                      placeholder="Ex: Associação Brasileira de Normas Técnicas"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.firstName}
                      name="firstName"
                      errors={props.errors}
                      touched={props.touched}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={5}>
                    <Input
                      type="text"
                      label="Segunda parte do nome da entidade"
                      placeholder="Ex: ABNT"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.secondName}
                      name="secondName"
                      errors={props.errors}
                      touched={props.touched}
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={2} style={{ marginBottom: 0 }}>
                  <Grid item xs={12} sm={12} md={6}>
                    <Input
                      type="text"
                      label="Título da Norma"
                      placeholder="Ex: ABNT NBR ISO 14001:2015"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.title}
                      name="title"
                      errors={props.errors}
                      touched={props.touched}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={6}>
                    <Input
                      type="text"
                      label="Subtítulo"
                      placeholder="Ex: Sistemas da gestão ambiental: Requisitos com orientações para uso"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.caption}
                      name="caption"
                      errors={props.errors}
                      touched={props.touched}
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={2} style={{ marginBottom: 0 }}>
                  <Grid item xs={12} sm={12} md={4}>
                    <Input
                      type="text"
                      label="Local"
                      placeholder="Ex: Rio de Janeiro"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.place}
                      name="place"
                      errors={props.errors}
                      touched={props.touched}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={4}>
                    <Input
                      type="text"
                      label="Publicador"
                      placeholder="Ex: ABNT"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.publisher}
                      name="publisher"
                      errors={props.errors}
                      touched={props.touched}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={2}>
                    <Input
                      type="text"
                      label="Ano"
                      placeholder="Ex: 2015"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.year}
                      name="year"
                      errors={props.errors}
                      touched={props.touched}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={2}>
                    <Input
                      type="text"
                      label="Total de Páginas"
                      placeholder="Ex: 41"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.pages}
                      name="pages"
                      errors={props.errors}
                      touched={props.touched}
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={2} style={{ marginBottom: 0 }}>
                  <Grid item xs={12} sm={12} md={2}>
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

                  <Grid item xs={12} sm={12} md={7}>
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

export default TechnicalStandards;
