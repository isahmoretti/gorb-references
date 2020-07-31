import React, { useState } from "react";

import { Formik, Field, FieldArray } from "formik";

import * as Yup from "yup";

import { Grid, Button as ButtonCore } from "@material-ui/core";

import { formatAuthorName } from "../../utils/formatAuthorName";
import { formatDate } from "../../utils/formatDate";
import { generateCitationWithAuthor } from "../../utils/generateCitationWithAuthor"
import { generateCitationWithoutAuthor } from "../../utils/generateCitationWithoutAuthor"

// components
import Input from "../../components/InputWrapper/Input";
import Button from "../../components/Buttons";
import Select from "../../components/InputWrapper/Select";
import Modal from "../../components/Modal";

// styles
import {
  Container,
  Card,
  Row,
  Content,
  Footer,
  Back,
  AddIcon,
  RemoveIcon,
  FieldArrayContainer,
  ErrorText,
  Actions,
  Title,
} from "./style";

const SignupSchema = Yup.object().shape({
  namesResponsible: Yup.array().of(Yup.string().required("Obrigatório")),
  title: Yup.string().required("Obrigatório"),
  local: Yup.string().required("Obrigatório"),
  publishingCompany: Yup.string().required("Obrigatório"),
  yearOfPublication: Yup.string().required("Obrigatório"),
});


const getResposabilityTypes = (responsabiltyTypes) => {
  switch (responsabiltyTypes) {
    case "organizator":
      return "(org.).";
    case "editor":
      return "(ed.).";
    case "coordinator":
      return "(coord.).";
    default:
      return "";
  }
};

const generateReference = (values) => {
  const {
    namesResponsible,
    responbiltyTypes,
    title,
    caption,
    edition,
    local,
    publishingCompany,
    yearOfPublication,
    complementaryElements,
    othersResponsabilities,
    series,
    pagination,
    grades,
    isbn,
    volume,
    originalTitle,
    online,
    url,
    accessedAt,
    translator,
    translatorName,
  } = values;
  return (
    <span>
      {" "}
      {namesResponsible.length && formatAuthorName(namesResponsible)}
      {getResposabilityTypes(responbiltyTypes)}&nbsp;
      {caption ? (
        <>
          <b>{title}: </b>
          {caption}.{" "}
        </>
      ) : (
        <b>{title}. </b>
      )}
      {complementaryElements && translator && translatorName.length && (
        <> Tradução: {translatorName.join("; ")}.</>
      )}
      {edition && <> {edition > 1 ? <>{edition}.</> : <>{edition}</>} ed. </>}
      {local}: {publishingCompany}, {yearOfPublication}.
      {complementaryElements && pagination && <> {pagination} p.</>}
      {complementaryElements && series && <> ({series}).</>}
      {complementaryElements && originalTitle && (
        <> Título original: {originalTitle}.</>
      )}
      {complementaryElements && volume && <> v.{volume}.</>}
      {complementaryElements && othersResponsabilities && (
        <> {othersResponsabilities}.</>
      )}
      {complementaryElements && grades && <> {grades}.</>}
      {complementaryElements &&
        online &&
        accessedAt &&
        url &&
        ` Disponível em: ${url}. Acesso em: ${formatDate(accessedAt)}.`}
      {complementaryElements && isbn && <> ISBN: {isbn}.</>}
    </span>
  );
};
const Book = ({ back }) => {
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
      citationWithAuthor: generateCitationWithAuthor(values.namesResponsible, values.yearOfPublication),
      citation: generateCitationWithoutAuthor(values.namesResponsible, values.yearOfPublication),
    }));

    setOpenModal(!openModal);
  };

  return (
    <Container>
      <Back onClick={back} />
      <Formik
        initialValues={{
          namesResponsible: [""],
          responbiltyTypes: "",
          title: "",
          caption: "",
          edition: "",
          local: "",
          publishingCompany: "",
          yearOfPublication: "",
          complementaryElements: false,
          pagination: "",
          series: "",
          isbn: "",
          originalTitle: "",
          volume: "",
          online: false,
          url: "",
          accessedAt: "",
          translator: false,
          translatorName: [""],
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
                  Referência de livro com responsável intelectual ao invés de
                  autor{" "}
                </p>
                <span>Editor, coordenador ou organizador.</span>
              </Title>
            </Actions>
            <Card>
              <Content>
                <Grid container spacing={2} style={{ marginBottom: 5 }}>
                  <Grid item xs={12} sm={12} md={12}>
                    <FieldArray
                      name="namesResponsible"
                      render={(arrayHelpers) => (
                        <div>
                          {props.values.namesResponsible &&
                          props.values.namesResponsible.length > 0 ? (
                            props.values.namesResponsible.map(
                              (namesResponsible, index) => (
                                <FieldArrayContainer key={index}>
                                  <div
                                    style={{
                                      display: "flex",
                                      width: "100%",
                                      marginBottom: 10,
                                    }}
                                  >
                                    <Input
                                      type="text"
                                      label={`Nome do ${
                                        index + 1
                                      }º responsável`}
                                      placeholder={`nome do ${
                                        index + 1
                                      }º responsável`}
                                      onChange={props.handleChange}
                                      onBlur={props.handleBlur}
                                      value={namesResponsible}
                                      name={`namesResponsible.${index}`}
                                      errors={props.errors}
                                      touched={props.touched}
                                    />
                                    {index > 0 && (
                                      <ButtonCore
                                        type="button"
                                        disabled={index === 0}
                                        onClick={() =>
                                          arrayHelpers.remove(index)
                                        }
                                      >
                                        <RemoveIcon />
                                      </ButtonCore>
                                    )}
                                    {index ===
                                      props.values.namesResponsible.length -
                                        1 && (
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
                                        props.errors.namesResponsible &&
                                        props.errors.namesResponsible[index]}
                                    </ErrorText>
                                  </div>
                                </FieldArrayContainer>
                              )
                            )
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
                </Grid>
                <Grid container spacing={2} style={{ marginBottom: 5 }}>
                  <Grid item xs={12} sm={12} md={4}>
                    <Select
                      type="text"
                      label="Tipos de responsabilidade"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.responbiltyTypes}
                      name="responbiltyTypes"
                      errors={props.errors}
                      touched={props.touched}
                      options={[
                        { value: "organizator", name: "Organizador" },
                        { value: "editor", name: "Editor(es)" },
                        { value: "coordinator", name: "Coordenador(es)" },
                      ]}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={8}>
                    <Input
                      type="text"
                      label="Título"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.title}
                      name="title"
                      errors={props.errors}
                      touched={props.touched}
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={2} style={{ marginBottom: 5 }}>
                  <Grid item xs={12} sm={12} md={4}>
                    <Input
                      type="text"
                      label="Subtítulo"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.caption}
                      name="caption"
                      errors={props.errors}
                      touched={props.touched}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={4}>
                    <Input
                      type="text"
                      label="Local de publicação"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.local}
                      name="local"
                      errors={props.errors}
                      touched={props.touched}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={4}>
                    <Input
                      type="text"
                      label="Empresa de publicação(editora)"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.publishingCompany}
                      name="publishingCompany"
                      errors={props.errors}
                      touched={props.touched}
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={2} style={{ marginBottom: 5 }}>
                  <Grid item xs={12} sm={12} md={3}>
                    <Input
                      type="text"
                      label="Edição"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.edition}
                      name="edition"
                      errors={props.errors}
                      touched={props.touched}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={3}>
                    <Input
                      type="text"
                      label="Ano de publicação"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.yearOfPublication}
                      name="yearOfPublication"
                      errors={props.errors}
                      touched={props.touched}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={3}>
                    <Select
                      type="text"
                      label="Elementos complementares"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.complementaryElements}
                      name="complementaryElements"
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
                      disabled={!props.values.complementaryElements}
                      type="text"
                      label="Páginas"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.pagination}
                      name="pagination"
                      errors={props.errors}
                      touched={props.touched}
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={2} style={{ marginBottom: 5 }}>
                  <Grid
                    item
                    xs={12}
                    sm={12}
                    md={4}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "flex-end",
                    }}
                  >
                    <Input
                      disabled={!props.values.complementaryElements}
                      type="text"
                      label="Serie"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.series}
                      name="series"
                      errors={props.errors}
                      touched={props.touched}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={4}>
                    <Input
                      disabled={!props.values.complementaryElements}
                      type="text"
                      label="ISBN"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.isbn}
                      name="isbn"
                      errors={props.errors}
                      touched={props.touched}
                      help
                      helpText="Número de livro padrão internacional"
                    />
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={12}
                    md={4}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "flex-end",
                    }}
                  >
                    <Select
                      disabled={!props.values.complementaryElements}
                      type="text"
                      label="Tradutor"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.translator}
                      name="translator"
                      errors={props.errors}
                      touched={props.touched}
                      options={[
                        { value: true, name: "Sim" },
                        { value: false, name: "Não" },
                      ]}
                    />
                  </Grid>
                </Grid>
                <Grid>
                  <Grid item xs={12} sm={12} md={12}>
                    <FieldArray
                      name="translatorName"
                      render={(arrayHelpers) => (
                        <div>
                          {props.values.translatorName &&
                          props.values.translatorName.length > 0 ? (
                            props.values.translatorName.map((author, index) => (
                              <FieldArrayContainer key={index}>
                                <div
                                  style={{
                                    display: "flex",
                                    width: "100%",
                                    marginBottom: 10,
                                  }}
                                >
                                  <Input
                                    disabled={
                                      !props.values.complementaryElements ||
                                      !props.values.translator
                                    }
                                    type="text"
                                    label={`Tradutor ${index + 1}`}
                                    onChange={props.handleChange}
                                    onBlur={props.handleBlur}
                                    value={author}
                                    name={`translatorName.${index}`}
                                    errors={props.errors}
                                    touched={props.touched}
                                  />
                                  {index > 0 && (
                                    <ButtonCore
                                      type="button"
                                      disabled={index === 0}
                                      onClick={() => arrayHelpers.remove(index)}
                                    >
                                      <RemoveIcon />
                                    </ButtonCore>
                                  )}
                                  {index ===
                                    props.values.translatorName.length - 1 && (
                                    <ButtonCore
                                      type="button"
                                      onClick={() => arrayHelpers.push("")}
                                    >
                                      <AddIcon />
                                    </ButtonCore>
                                  )}
                                </div>
                              </FieldArrayContainer>
                            ))
                          ) : (
                            <ButtonCore
                              type="button"
                              onClick={() => arrayHelpers.push("")}
                            >
                              Adicione um tradutor
                            </ButtonCore>
                          )}
                        </div>
                      )}
                    />
                  </Grid>
                </Grid>

                <Grid container spacing={2} style={{ marginBottom: 5 }}>
                  <Grid item xs={12} sm={12} md={8}>
                    <Input
                      disabled={!props.values.complementaryElements}
                      type="text"
                      label="Título original"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.originalTitle}
                      name="originalTitle"
                      errors={props.errors}
                      touched={props.touched}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={4}>
                    <Input
                      disabled={!props.values.complementaryElements}
                      type="text"
                      label="Volume"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.volume}
                      name="volume"
                      errors={props.errors}
                      touched={props.touched}
                    />
                  </Grid>

                  <Grid item xs={12} sm={12} md={3}>
                    <Select
                      disabled={!props.values.complementaryElements}
                      type="text"
                      label="Online"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.online}
                      name="online"
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
                      disabled={
                        !props.values.complementaryElements ||
                        !props.values.online
                      }
                      type="text"
                      label="Endereço(URL)"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.url}
                      name="url"
                      errors={props.errors}
                      touched={props.touched}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={3}>
                    <Input
                      disabled={
                        !props.values.complementaryElements ||
                        !props.values.online
                      }
                      type="date"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.accessedAt}
                      name="accessedAt"
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

export default Book;
