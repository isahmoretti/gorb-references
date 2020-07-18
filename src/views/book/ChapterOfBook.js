import React, { useState } from "react";

import { Formik, Field, FieldArray } from "formik";

import * as Yup from "yup";
import { format } from "date-fns";

import { Grid, Button as ButtonCore } from "@material-ui/core";

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
} from "./style";

const SignupSchema = Yup.object().shape({
  authorship: Yup.string().required("Obrigatório"),
  title: Yup.string().required("Obrigatório"),
  local: Yup.string().required("Obrigatório"),
  publishingCompany: Yup.string().required("Obrigatório"),
  yearOfPublication: Yup.string().required("Obrigatório"),
});

const getResposabilityTypes = (responsabiltyTypes) => {
  switch (responsabiltyTypes) {
    case "organizator":
      return "(org.)";
    case "author":
      return "(aut.)";
    case "coordinator":
      return "(coord.)";
    default:
      return "";
  }
};

const generateReference = (values) => {
  const {
    authorship,
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
    authorCaption,
    responsabilityType
  } = values;

  //autor do livro
  const authorshipSplit = authorship.split(" ");
  const firstNameAuthorship = authorshipSplit[0];
  const lastNameAuthorship = authorshipSplit[authorshipSplit.length - 1].toUpperCase();

  //autor do capitulo
  const authorCaptionSplit = authorCaption.split(" ");
  const firstNameAuthorCaption = authorCaptionSplit[0];
  const lastNameAuthorCaption = authorCaptionSplit[authorCaptionSplit.length - 1].toUpperCase();


  return (
    <span>
      {/* ÚLTIMO NOME, Primeiro Nome do autor do capítulo. Título do capítulo. In: */}
      {authorCaption &&
        <>{lastNameAuthorCaption}, {firstNameAuthorCaption[0]}</>}.

      {/* titulo do capitulo */}
      {chapterTitle && <> {chapterTitle}.</>}

      {/* ÚLTIMO NOME, Primeiro nome do autor */}
      {authorCaption &&
        <> In: {lastNameAuthorship}, {firstNameAuthorship[0]}.</>}

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
      {edition && <> {edition > 1 ? <>{edition}.</> : <>{edition}</>} ed. </>}
      {local}: {publishingCompany}, {yearOfPublication}.
      {complementaryElements && originalTitle && (
        <> Título original: {originalTitle}.</>
      )}
      {complementaryElements && translator && translatorName.length && (
        <> Tradução: {translatorName.join("; ")}.</>
      )}
      {complementaryElements && volume && <> {volume}.v,</>}

      {captionPageInit && captionPageFinish && `p. ${captionPageInit} - ${captionPageFinish}, `}
      {complementaryElements && pagination && <> {pagination} p.</>}

      {complementaryElements && series && <> ({series}).</>}
      {complementaryElements && othersResponsabilities && (
        <> {othersResponsabilities}.</>
      )}
      {complementaryElements && grades && <> {grades}.</>}
      {complementaryElements && isbn && <> {isbn}.</>}
      {complementaryElements && online && url && <> Disponível em: {url}.</>}
      {complementaryElements && online && accessedAt && (
        <> Acesso em: {format(new Date(accessedAt), "MMM. yyyy")}.</>
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
          originalTitley: "",
          edition: "",
          yearOfPublication: "",
          complementaryElements: false,
          pagination: "",
          series: "",
          grades: "",
          isbn: "",
          originalTitle: "",
          volume: "",
          online: false,
          accessedAt: "",
          url: "",
          translator: false,
          translatorName: [""],
          chapterTitle: "",
          captionChapter: "",
          captionPageInit: "",
          captionPageFinish: "",
          authorCaption: "",
        }}
        validationSchema={SignupSchema}
        onSubmit={handleSubmit}
      >
        {(props) => (
          <form onSubmit={props.handleSubmit}>
            <Actions>
              <Row container className="end">
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={props.resetForm}
                >
                  Limpar campos
                </Button>
                <Button type="submit" color="primary">
                  Gerar referencia
                </Button>
              </Row>
            </Actions>
            <Card>
              <Content>
                <Grid container spacing={2} style={{ marginBottom: 30 }}>
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
                        { value: 'person', name: "Pessoa" },
                        { value: 'entitie', name: "Entidade" },
                        { value: 'withoutAuthorship', name: "Sem autoria" },
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
                        { value: 'author', name: "Autor" },
                        { value: 'organizator', name: "Organizador" },
                        { value: 'coordinator', name: "Coordenador" },
                      ]}
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={2} style={{ marginBottom: 30 }}>
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
                <Grid container spacing={2} style={{ marginBottom: 30 }}>
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
                <Grid container spacing={2} style={{ marginBottom: 30 }}>
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
                <Grid container spacing={2} style={{ marginBottom: 15 }}>
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
                      placeholder="Ex: Submetida e aceita em uma revista mas ainda não foi publicada"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.grades}
                      name="grades"
                      errors={props.errors}
                      touched={props.touched}
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={2} style={{ marginBottom: 30 }}>
                  <Grid item xs={12} sm={12} md={4}>
                    <Input
                      disabled={!props.values.complementaryElements}
                      type="text"
                      label="Isbn"
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
                  <Grid item xs={12} sm={12} md={8}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "flex-end",
                    }}>
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
                </Grid>
                <Grid container spacing={2} style={{ marginBottom: 30 }}>
                  <Grid item xs={12} sm={12} md={4}>
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
                  <Grid item xs={12} sm={12} md={4}>
                    <Input
                      disabled={
                        !props.values.complementaryElements ||
                        !props.values.online
                      }
                      type="date"
                      // label="Acessado em"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.accessedAt}
                      name="accessedAt"
                      errors={props.errors}
                      touched={props.touched}
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={2} style={{ marginBottom: 30 }}>
                  <Grid item xs={12} sm={12} md={4}>
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
                  <Grid item xs={12} sm={12} md={4}>
                    <Input
                      type="text"
                      label="Nome do tradutor"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.translatorName}
                      name="translatorName"
                      errors={props.errors}
                      touched={props.touched}
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={2} style={{ marginBottom: 30 }}>
                  <Grid item xs={12} sm={12} md={4}>
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
                  <Grid item xs={12} sm={12} md={4}>
                    <Input
                      type="text"
                      label="Subtítulo do capítulo"
                      placeholder="Subtítulo do capítulo"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.captionChapter}
                      name="captionChapter"
                      errors={props.errors}
                      touched={props.touched}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={2}>
                    <Input
                      type="text"
                      label="Páginas do capítulo (início)"
                      placeholder="45"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.captionPageInit}
                      name="captionPageInit"
                      errors={props.errors}
                      touched={props.touched}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={2}>
                    <Input
                      type="text"
                      label="Páginas do capítulo (fim)"
                      placeholder="67"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.captionPageFinish}
                      name="captionPageFinish"
                      errors={props.errors}
                      touched={props.touched}
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={2} style={{ marginBottom: 30 }}>
                  <Grid item xs={12} sm={12} md={4}>
                    <Input
                      type="text"
                      label="Autor do capítulo"
                      placeholder="Nome e sobrenome do autor do capítulo"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.authorCaption}
                      name="authorCaption"
                      errors={props.errors}
                      touched={props.touched}
                    />
                  </Grid>
                </Grid>
              </Content>
              <Modal
                isOpen={openModal}
                handleClose={() => setOpenModal(!openModal)}
                text={state.references}
              />
            </Card>
          </form>
        )}
      </Formik>
    </Container>
  );
};

export default Book;
