import React, { useState } from "react";

import { Formik, Field, FieldArray } from "formik";
import * as Yup from "yup";

import { Grid, Button as ButtonCore } from "@material-ui/core";

// components
import Input from "../../components/InputWrapper/Input";
import Button from "../../components/Buttons";
import Select from "../../components/InputWrapper/Select";
import Modal from "../../components/Modal";

import { formatDate } from "../../utils/formatDate";
import { formatAuthorName } from "../../utils/formatAuthorName";

// styles
import {
  Container,
  Card,
  Row,
  Content,
  Back,
  AddIcon,
  RemoveIcon,
  FieldArrayContainer,
  ErrorText,
  Actions,
  Title,
} from "./style";

const SignupSchema = Yup.object().shape({
  authors: Yup.array().of(Yup.string().required("Obrigatório")),
  title: Yup.string().required("Obrigatório"),
  yearOfDelivery: Yup.string().required("Obrigatório"),
  yearOfPublication: Yup.string().required("Obrigatório"),
  location: Yup.string().required("Obrigatório"),
  institute: Yup.string().required("Obrigatório"),
  course: Yup.string().required("Obrigatório"),
});

const generateCitationWithAuthor = (values) => {
  const { authors, yearOfPublication } = values;

  const authorSplit = authors[0].split(" ");

  const lastName = authorSplit[authorSplit.length - 1];

  return (
    <span>
      {lastName} ({yearOfPublication})
    </span>
  );
};

const generateCitation = (values) => {
  const { authors, yearOfPublication } = values;

  const authorSplit = authors[0].split(" ");

  const lastName = authorSplit[authorSplit.length - 1].toUpperCase();

  return (
    <span>
      ({lastName}, {yearOfPublication})
    </span>
  );
};

const generateReference = (values) => {
  const {
    authors,
    abbreviate,
    title,
    caption,
    yearOfPublication,
    pages,
    volume,
    course,
    department,
    institute,
    location,
    advisor,
    yearOfDelivery,
    online,
    accessedAt,
    url,
  } = values;

  return (
    <span>
      {authors.length && formatAuthorName(authors, abbreviate)}
      <b>
        {title}
        {caption ? ": " : ". "}
      </b>
      {caption && `${caption}. `}
      {advisor && `Orientador: ${advisor}. `}
      {`${yearOfDelivery}. `}
      {pages && `${pages} f. `}
      {volume && `v. ${volume}, `}
      Dissertação (Mestrado) - Curso de&nbsp;
      {`${course}, `}
      {department && `${department}, `}
      {`${institute}, `}
      {location ? `${location}, ` : "[s. l.], "}
      {yearOfPublication && `${yearOfPublication}. `}
      {online &&
        accessedAt &&
        url &&
        `Disponível em: ${url}. Acesso em: ${formatDate(accessedAt)}. `}
    </span>
  );
};
const Dissertation = ({ back }) => {
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
      citationWithAuthor: generateCitationWithAuthor(values),
      citation: generateCitation(values),
    }));

    setOpenModal(!openModal);
  };

  return (
    <Container>
      <Back onClick={back} />

      <Formik
        initialValues={{
          authors: [""],
          abbreviate: false,
          title: "",
          caption: "",
          yearOfPublication: "",
          pages: "",
          volume: "",
          course: "",
          department: "",
          institute: "",
          location: "",
          advisor: "",
          yearOfDelivery: "",
          online: false,
          accessedAt: "",
          url: "",
        }}
        validationSchema={SignupSchema}
        onSubmit={handleSubmit}
      >
        {(props) => (
          <form onSubmit={props.handleSubmit}>
            <Actions>
              <Title>
                <p
                  style={{
                    fontSize: "20px",
                  }}
                >
                  Referência de dissertação
                </p>
                <span>
                  Trabalho acadêmico-científico apresentado para a conclusão do
                  mestrado.
                </span>
              </Title>
            </Actions>
            <Card>
              <Content>
                <Grid container spacing={2} style={{ marginBottom: 5 }}>
                  <Grid item xs={12} sm={12} md={10}>
                    <FieldArray
                      name="authors"
                      render={(arrayHelpers) => (
                        <div>
                          {props.values.authors &&
                          props.values.authors.length > 0 ? (
                            props.values.authors.map((author, index) => (
                              <FieldArrayContainer key={index}>
                                <div
                                  style={{
                                    display: "flex",
                                    width: "100%",
                                    marginBottom: 10,
                                  }}
                                >
                                  <Input
                                    name={`authors.${index}`}
                                    label={`${index + 1}º Autor`}
                                    type="text"
                                    placeholder="Nome do autor"
                                    onChange={props.handleChange}
                                    onBlur={props.handleBlur}
                                    value={author}
                                    errors={props.errors}
                                    touched={props.touched}
                                  />
                                  {index > 0 && (
                                    <ButtonCore
                                      type="button"
                                      onClick={() => arrayHelpers.remove(index)}
                                    >
                                      <RemoveIcon />
                                    </ButtonCore>
                                  )}
                                  {index ===
                                    props.values.authors.length - 1 && (
                                    <ButtonCore
                                      type="button"
                                      onClick={() => arrayHelpers.push("")}
                                    >
                                      <AddIcon />
                                    </ButtonCore>
                                  )}
                                </div>
                                <div style={{ width: "100%" }}>
                                  <ErrorText>
                                    {props.errors &&
                                      props.errors.authors &&
                                      props.errors.authors[index]}
                                  </ErrorText>
                                </div>
                              </FieldArrayContainer>
                            ))
                          ) : (
                            <ButtonCore
                              type="button"
                              onClick={() => arrayHelpers.push("")}
                            >
                              Add a author
                            </ButtonCore>
                          )}
                        </div>
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={2}>
                    <Select
                      name="abbreviate"
                      label="abreviar autor?"
                      type="text"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.abbreviate}
                      errors={props.errors}
                      touched={props.touched}
                      options={[
                        { value: true, name: "Sim" },
                        { value: false, name: "Não" },
                      ]}
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={2} style={{ marginBottom: 5 }}>
                  <Grid item xs={12} sm={12} md={8}>
                    <Input
                      name="title"
                      label="Título da dissertação"
                      type="text"
                      placeholder="Nome da dissertação"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.title}
                      errors={props.errors}
                      touched={props.touched}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={4}>
                    <Input
                      name="caption"
                      label="Subtítulo da dissertação"
                      type="text"
                      placeholder="Subtítulo da dissertação"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.caption}
                      errors={props.errors}
                      touched={props.touched}
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={2} style={{ marginBottom: 5 }}>
                  <Grid item xs={12} sm={12} md={4}>
                    <Input
                      name="advisor"
                      label="Orientador"
                      type="text"
                      placeholder="Nome do orientador"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.advisor}
                      errors={props.errors}
                      touched={props.touched}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={4}>
                    <Input
                      name="location"
                      label="Local de publicação"
                      type="text"
                      placeholder="Local de publicação"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.publishingCompany}
                      errors={props.errors}
                      touched={props.touched}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={2}>
                    <Input
                      name="volume"
                      label="Nº de volume"
                      type="text"
                      placeholder="Ex: 304"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.volume}
                      errors={props.errors}
                      touched={props.touched}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={2}>
                    <Input
                      name="pages"
                      label="Folhas"
                      type="text"
                      placeholder="Ex: 20"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.page}
                      errors={props.errors}
                      touched={props.touched}
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={2} style={{ marginBottom: 5 }}>
                  <Grid item xs={12} sm={12} md={8}>
                    <Input
                      name="institute"
                      label="Instituíção"
                      type="text"
                      placeholder="Ex: Universidade Federal..."
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.institute}
                      errors={props.errors}
                      touched={props.touched}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={4}>
                    <Input
                      name="course"
                      label="Curso"
                      type="text"
                      placeholder="Ex: Arquitetura"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.course}
                      errors={props.errors}
                      touched={props.touched}
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={2} style={{ marginBottom: 5 }}>
                  <Grid item xs={12} sm={12} md={6}>
                    <Input
                      name="department"
                      label="Departamento"
                      type="text"
                      placeholder="Ex: Centro urbano"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.department}
                      errors={props.errors}
                      touched={props.touched}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={3}>
                    <Input
                      name="yearOfDelivery"
                      label="Ano de entrega"
                      type="text"
                      placeholder="Ex: 2005"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.yearOfDelivery}
                      errors={props.errors}
                      touched={props.touched}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={3}>
                    <Input
                      name="yearOfPublication"
                      label="Ano de publicação"
                      type="text"
                      placeholder="Ex: 2005"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.yearOfPublication}
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
                      name="url"
                      label="Endereço (URL)"
                      type="text"
                      placeholder="https://viacarreira.com/"
                      disabled={!props.values.online}
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
                      label="Data de acesso"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      disabled={!props.values.online}
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

export default Dissertation;
