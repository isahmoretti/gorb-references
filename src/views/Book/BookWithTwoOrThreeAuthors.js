import React, { useState } from "react";

import { Formik, FieldArray } from "formik";

import * as Yup from "yup";

import { Grid, Button as ButtonCore } from "@material-ui/core";

// components
import Input from "../../components/InputWrapper/Input";
import Button from "../../components/Buttons";
import Select from "../../components/InputWrapper/Select";
import Modal from "../../components/Modal";
import { formatDate } from "../../utils/formatDate";
import { formatAuthorName } from "../../utils/formatAuthorName";
import { generateCitationWithAuthor } from "../../utils/generateCitationWithAuthor";
import { generateCitationWithoutAuthor } from "../../utils/generateCitationWithoutAuthor";

import ArrowLeft from "../../assets/images/arrow-left.svg";
import Plus from "../../assets/images/plus-dark.svg";
import Minus from "../../assets/images/minus.svg";

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
  local: Yup.string().required("Obrigatório"),
  publishingCompany: Yup.string().required("Obrigatório"),
  yearOfPublication: Yup.string().required("Obrigatório"),
});

const generateReference = (values) => {
  const {
    authors,
    abbreviate,
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
      <>{formatAuthorName(authors, abbreviate)} </>
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
      {local}: {publishingCompany},{volume && <> v.{volume},</>}
      <> {yearOfPublication}</>.
      {complementaryElements && pagination && <> {pagination} p.</>}
      {complementaryElements && series && <> ({series}).</>}
      {complementaryElements && originalTitle && (
        <> Título original: {originalTitle}.</>
      )}
      {complementaryElements && othersResponsabilities && (
        <> {othersResponsabilities}.</>
      )}
      {complementaryElements && grades && <> {grades}.</>}
      {complementaryElements && isbn && <> ISBN: {isbn}.</>}
      {complementaryElements && online && url && <> Disponível em: {url}.</>}
      {complementaryElements && online && accessedAt && (
        <> Acesso em: {formatDate(accessedAt)}.</>
      )}
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
      citationWithAuthor: generateCitationWithAuthor(
        values.authors,
        values.yearOfPublication
      ),
      citation: generateCitationWithoutAuthor(
        values.authors,
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
          authors: ["", "", ""],
          abbreviate: false,
          title: "",
          caption: "",
          edition: "",
          local: "",
          publishingCompany: "",
          yearOfPublication: "",
          complementaryElements: false,
          othersResponsabilities: "",
          pagination: "",
          series: "",
          grades: "",
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
                  Referência de livro com dois ou três autores{" "}
                </p>
              </Title>
            </Actions>
            <Card>
              <Content>
                <Grid container spacing={2} style={{ marginBottom: 5 }}>
                  <Grid item xs={12} sm={12} md={12}>
                    <FieldArray
                      name="authors"
                      render={(arrayHelpers) => (
                        <div>
                          {props.values.authors &&
                          props.values.authors.length > 0 ? (
                            props.values.authors.map((author, index) => (
                              <FieldArrayContainer key={index}>
                                <div style={{ display: "flex", width: "100%" }}>
                                  <Input
                                    name={`authors.${index}`}
                                    type="text"
                                    label={`${index + 1}º Autor`}
                                    placeholder={`nome do ${index + 1}º autor`}
                                    onChange={props.handleChange}
                                    onBlur={props.handleBlur}
                                    value={author}
                                    errors={props.errors}
                                    touched={props.touched}
                                  />
                                  {index === 2 && (
                                    <ButtonCore
                                      type="button"
                                      disabled={index === 0}
                                      onClick={() => arrayHelpers.remove(index)}
                                    >
                                      <RemoveIcon src={Minus} />
                                    </ButtonCore>
                                  )}
                                  {index === props.values.authors.length - 1 &&
                                    index === 1 && (
                                      <ButtonCore
                                        type="button"
                                        onClick={() => arrayHelpers.push("")}
                                      >
                                        <AddIcon src={Plus} />
                                      </ButtonCore>
                                    )}
                                </div>
                                <div
                                  style={{
                                    width: "100%",
                                    marginBottom: "10px",
                                  }}
                                >
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
                </Grid>
                <Grid container spacing={2} style={{ marginBottom: 5 }}>
                  <Grid item xs={12} sm={12} md={3}>
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
                  <Grid item xs={12} sm={12} md={4}>
                    <Input
                      type="text"
                      label="Título"
                      placeholder="Título do livro"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.title}
                      name="title"
                      errors={props.errors}
                      touched={props.touched}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={5}>
                    <Input
                      type="text"
                      label="Subtítulo"
                      placeholder="Subtítulo do livro"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.caption}
                      name="caption"
                      errors={props.errors}
                      touched={props.touched}
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={2} style={{ marginBottom: 5 }}>
                  <Grid item xs={12} sm={12} md={3}>
                    <Input
                      type="text"
                      label="Local de publicação"
                      placeholder="Ex: São Paulo"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.local}
                      name="local"
                      errors={props.errors}
                      touched={props.touched}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={3}>
                    <Input
                      type="text"
                      label="Editora"
                      placeholder="Ex: Objetiva"
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
                      label="Edição"
                      placeholder="Ex: 4"
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
                      placeholder="Ex: 2010"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.yearOfPublication}
                      name="yearOfPublication"
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
                    md={3}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "flex-end",
                    }}
                  >
                    <Input
                      type="text"
                      label="Volume"
                      placeholder="Ex: 10"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.volume}
                      name="volume"
                      errors={props.errors}
                      touched={props.touched}
                    />
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={12}
                    md={3}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "flex-end",
                    }}
                  >
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
                  <Grid
                    item
                    xs={12}
                    sm={12}
                    md={2}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "flex-end",
                    }}
                  >
                    <Input
                      disabled={!props.values.complementaryElements}
                      type="text"
                      label="Páginas"
                      placeholder="Ex: 233"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.pagination}
                      name="pagination"
                      errors={props.errors}
                      touched={props.touched}
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
                    <Input
                      disabled={!props.values.complementaryElements}
                      type="text"
                      label="Séries e coleções"
                      placeholder="Ex: Grandes autores nacionais"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.series}
                      name="series"
                      errors={props.errors}
                      touched={props.touched}
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={2} style={{ marginBottom: 5 }}>
                  <Grid item xs={12} sm={12} md={3}>
                    <Input
                      disabled={!props.values.complementaryElements}
                      type="text"
                      label="ISBN"
                      placeholder="EX: 9788535238693"
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
                    md={3}
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
                                  <ButtonCore
                                    type="button"
                                    disabled={index === 0}
                                    onClick={() => arrayHelpers.remove(index)}
                                  >
                                    <RemoveIcon src={Minus} />
                                  </ButtonCore>
                                  {index ===
                                    props.values.translatorName.length - 1 && (
                                    <ButtonCore
                                      type="button"
                                      onClick={() => arrayHelpers.push("")}
                                    >
                                      <AddIcon src={Plus} />
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
                  <Grid item xs={12} sm={12} md={5}>
                    <Input
                      disabled={!props.values.complementaryElements}
                      type="text"
                      label="Título original"
                      placeholder="Título original do livro"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.originalTitle}
                      name="originalTitle"
                      errors={props.errors}
                      touched={props.touched}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={4}>
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
                </Grid>
                <Grid container spacing={2} style={{ marginBottom: 5 }}>
                  <Grid item xs={12} sm={12} md={8}>
                    <Input
                      disabled={
                        !props.values.complementaryElements ||
                        !props.values.online
                      }
                      type="text"
                      label="Endereço(URL)"
                      placeholder="https://viacarreira.com/"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.url}
                      name="url"
                      errors={props.errors}
                      touched={props.touched}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={4}>
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
