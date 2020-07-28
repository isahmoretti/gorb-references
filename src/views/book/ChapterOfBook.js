import React, { useState } from "react";

import { Formik, Field, FieldArray } from "formik";

import * as Yup from "yup";

import { Grid, Button as ButtonCore } from "@material-ui/core";

// components
import Input from "../../components/InputWrapper/Input";
import Button from "../../components/Buttons";
import Select from "../../components/InputWrapper/Select";
import Modal from "../../components/Modal";

// utils
import { formatDate } from "../../utils/formatDate";
import { formatAuthorName } from "../../utils/formatAuthorName";

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
  chapterAuthors: Yup.array().of(Yup.string().required("Obrigatório")),
  chapterTitle: Yup.string().required("Obrigatório"),
  authorship: Yup.string().required("Obrigatório"),
  title: Yup.string().required("Obrigatório"),
  local: Yup.string().required("Obrigatório"),
  publishingCompany: Yup.string().required("Obrigatório"),
  yearOfPublication: Yup.string().required("Obrigatório"),
});

const getResposabilityTypes = (responsabiltyTypes) => {
  switch (responsabiltyTypes) {
    case "organizator":
      return "(Org.)";
    case "author":
      return "(Aut.)";
    case "coordinator":
      return "(Coord.)";
    default:
      return "";
  }
};

const generateReference = (values) => {
  const {
    authorship,
    chapterAuthors,
    chapterTitle,
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
    captionPageInit,
    captionPageFinish,
    grades,
    isbn,
    volume,
    originalTitle,
    online,
    url,
    accessedAt,
    translator,
    translatorName,
    authorType,
    responsabilityType,
    chapterCaption,
  } = values;

  //autor do livro
  const authorshipSplit = authorship.split(" ");
  const firstNameAuthorship = authorshipSplit[0];
  const lastNameAuthorship = authorshipSplit[
    authorshipSplit.length - 1
  ].toUpperCase();

  //autor do capitulo
  // const chapterAuthorsSplit = chapterAuthors.split(" ");
  // const firstNameChapterAuthors = chapterAuthorsSplit[0];
  // const lastNameChapterAuthors = chapterAuthorsSplit[
  //   chapterAuthorsSplit.length - 1
  // ].toUpperCase();

  return (
    <span>
      {/* ÚLTIMO NOME, Primeiro Nome do autor do capítulo. Título do capítulo. In: */}
      {/* {chapterAuthors && (
        <>
          {lastNameChapterAuthors}, {firstNameChapterAuthors[0]}
        </>
      )} */}
      <>{formatAuthorName(chapterAuthors)}</>
      {/* titulo do capitulo */}
      {chapterCaption ? (
        <>
          <> {chapterTitle}: </>
          {chapterCaption}.{" "}
        </>
      ) : (
        <>{chapterTitle}. </>
      )}
      {/* ÚLTIMO NOME, Primeiro nome do autor */}
      {chapterAuthors && (
        <>
          {" "}
          In: {lastNameAuthorship}, {firstNameAuthorship[0]}.
        </>
      )}
      <> {getResposabilityTypes(responsabilityType)}. </>
      {/* Titulo da obra */}
      {caption ? (
        <>
          <b> {title}: </b>
          {caption}.{" "}
        </>
      ) : (
        <b>{title}. </b>
      )}
      {}
      {complementaryElements && translator && translatorName.length && (
        <> Tradução: {translatorName}.</>
      )}
      {edition && <> {edition > 1 ? <>{edition}.</> : <>{edition}</>} ed. </>}
      {complementaryElements && volume && <> v.{volume},</>}
      {local}: {publishingCompany}, {yearOfPublication}.
      {complementaryElements && pagination && <> {pagination} p.</>}
      {captionPageInit &&
        captionPageFinish &&
        `p. ${captionPageInit}-${captionPageFinish}, `}
      {complementaryElements && series && <> ({series}).</>}
      {complementaryElements && originalTitle && (
        <> Título original: {originalTitle}.</>
      )}
      {complementaryElements && othersResponsabilities && (
        <> {othersResponsabilities}.</>
      )}
      {complementaryElements && grades && <> {grades}.</>}
      {complementaryElements && online && url && <> Disponível em: {url}.</>}
      {complementaryElements && online && accessedAt && (
        <> Acesso em: {formatDate(accessedAt)}.</>
      )}
      {complementaryElements && isbn && <> ISBN: {isbn}.</>}
    </span>
  );
};
const generateCitationWithAuthor = (values) => {
  const { authorship, yearOfPublication } = values;

  const authorSplit = authorship.split(" ");

  const lastName = authorSplit[authorSplit.length - 1];

  return (
    <span>
      {lastName} ({yearOfPublication})
    </span>
  );
};
const generateCitation = (values) => {
  const { authorship, yearOfPublication } = values;

  const authorSplit = authorship.split(" ");

  const lastName = authorSplit[authorSplit.length - 1].toUpperCase();

  return (
    <span>
      ({lastName}, {yearOfPublication})
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
          authorType: "",
          responsabilityType: "",
          authorship: "",
          title: "",
          caption: "",
          local: "",
          publishingCompany: "",
          originalTitle: "",
          edition: "",
          yearOfPublication: "",
          complementaryElements: false,
          pagination: "",
          series: "",
          grades: "",
          isbn: "",
          volume: "",
          online: false,
          accessedAt: "",
          url: "",
          translator: false,
          translatorName: [""],
          chapterTitle: "",
          chapterAuthors: [""],
          chapterCaption: "",
          captionPageInit: "",
          captionPageFinish: "",
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
                  Capítulo de livro{" "}
                </p>
              </Title>
            </Actions>
            <Card>
              <Content>
                <Grid container spacing={2} style={{ marginBottom: 5 }}>
                  <Grid item xs={12} sm={12} md={6}>
                    <Select
                      type="text"
                      label="Tipo do autor"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.authorType}
                      name="authorType"
                      errors={props.errors}
                      touched={props.touched}
                      options={[
                        { value: "person", name: "Pessoa" },
                        { value: "entitie", name: "Entidade" },
                        { value: "withoutAuthorship", name: "Sem autoria" },
                      ]}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={6}>
                    <Select
                      type="text"
                      label="Tipo de responsabilidade"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.responsabilityType}
                      name="responsabilityType"
                      errors={props.errors}
                      touched={props.touched}
                      options={[
                        { value: "author", name: "Autor" },
                        { value: "organizator", name: "Organizador" },
                        { value: "coordinator", name: "Coordenador" },
                      ]}
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={2} style={{ marginBottom: 5 }}>
                  <Grid item xs={12} sm={12} md={6}>
                    <Input
                      type="text"
                      label="Autoria"
                      placeholder="Nome e sobrenome do autor do livro"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.authorship}
                      name="authorship"
                      errors={props.errors}
                      touched={props.touched}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={6}>
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
                </Grid>
                <Grid container spacing={2} style={{ marginBottom: 5 }}>
                  <Grid item xs={12} sm={12} md={4}>
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

                  <Grid item xs={12} sm={12} md={4}>
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
                  <Grid item xs={12} sm={12} md={4}>
                    <Input
                      type="text"
                      label="Empresa de publicação(editora)"
                      placeholder="Ex: Objetivo"
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
                      label="Paginas"
                      placeholder="Ex: 223"
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
                  <Grid item xs={12} sm={12} md={4}>
                    <Input
                      disabled={!props.values.complementaryElements}
                      type="text"
                      label="Séries e coleções"
                      placeholder="Ex: Grandes Autores Nacionais"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.series}
                      name="series"
                      errors={props.errors}
                      touched={props.touched}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={8}>
                    <Input
                      disabled={!props.values.complementaryElements}
                      type="text"
                      label="Nota"
                      placeholder="Ex: Informações complementares"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.grades}
                      name="grades"
                      errors={props.errors}
                      touched={props.touched}
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={2} style={{ marginBottom: 5 }}>
                  <Grid item xs={12} sm={12} md={4}>
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

                  <Grid
                    item
                    xs={12}
                    sm={12}
                    md={5}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "flex-end",
                    }}
                  >
                    <Input
                      type="text"
                      label="Nome do tradutor"
                      disabled={
                        !props.values.complementaryElements ||
                        !props.values.translator
                      }
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.translatorName}
                      name="translatorName"
                      errors={props.errors}
                      touched={props.touched}
                    />
                  </Grid>

                  <Grid
                    item
                    xs={12}
                    sm={12}
                    md={5}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "flex-end",
                    }}
                  >
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
                  <Grid item xs={12} sm={12} md={3}>
                    <Input
                      disabled={!props.values.complementaryElements}
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
                <Grid container spacing={2} style={{ marginBottom: 5 }}>
                  <Grid item xs={12} sm={12} md={6}>
                    <Input
                      type="text"
                      label="Título do capítulo"
                      placeholder="Título do capítulo"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.chapterTitle}
                      name="chapterTitle"
                      errors={props.errors}
                      touched={props.touched}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={6}>
                    <Input
                      type="text"
                      label="Subtítulo do capítulo"
                      placeholder="Subtítulo do capítulo"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.captionChapter}
                      name="chapterCaption"
                      errors={props.errors}
                      touched={props.touched}
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={2} style={{ marginBottom: 0 }}>
                  <Grid item xs={12} sm={12} md={12}>
                    <FieldArray
                      name="chapterAuthors"
                      render={(arrayHelpers) => (
                        <div>
                          {props.values.chapterAuthors &&
                          props.values.chapterAuthors.length > 0 ? (
                            props.values.chapterAuthors.map(
                              (chapterAuthor, index) => (
                                <FieldArrayContainer key={index}>
                                  <div
                                    style={{ display: "flex", width: "100%" }}
                                  >
                                    <Input
                                      type="text"
                                      label={`Autor do capítulo ${index + 1}`}
                                      onChange={props.handleChange}
                                      onBlur={props.handleBlur}
                                      value={chapterAuthor}
                                      name={`chapterAuthors.${index}`}
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
                                    {
                                      <ButtonCore
                                        type="button"
                                        onClick={() => arrayHelpers.push("")}
                                      >
                                        <AddIcon />
                                      </ButtonCore>
                                    }
                                  </div>
                                  <div
                                    style={{
                                      width: "100%",
                                      marginBottom: "10px",
                                    }}
                                  >
                                    <ErrorText>
                                      {props.errors &&
                                        props.errors.chapterAuthors &&
                                        props.errors.chapterAuthors[index]}
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
                    <Input
                      type="text"
                      label="Páginas do capítulo (início)"
                      placeholder="Ex: 45"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.captionPageInit}
                      name="captionPageInit"
                      errors={props.errors}
                      touched={props.touched}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={4}>
                    <Input
                      type="text"
                      label="Páginas do capítulo (fim)"
                      placeholder="Ex: 67"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.captionPageFinish}
                      name="captionPageFinish"
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
