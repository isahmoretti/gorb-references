import React, { useState } from "react";

import { Formik, FieldArray } from "formik";
import * as Yup from "yup";

import { Grid, Button as ButtonCore } from "@material-ui/core";

// components
import Input from "../../../components/InputWrapper/Input";
import Button from "../../../components/Buttons";
import Select from "../../../components/InputWrapper/Select";
import Modal from "../../../components/Modal";

import ArrowLeft from "../../../assets/images/arrow-left.svg";
import Plus from "../../../assets/images/plus-dark.svg";
import Minus from "../../../assets/images/minus.svg";

import { formatDate } from "../../../utils/formatDate";
import { formatMonosyllable } from "../../../utils/monosyllable";
import { formatAuthorName } from "../../../utils/formatAuthorName";
import { generateCitationWithAuthor } from "../../../utils/generateCitationWithAuthor";
import { generateCitationWithoutAuthor } from "../../../utils/generateCitationWithoutAuthor";

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
  // authors: Yup.array().of(Yup.string().required("Obrigatório")),
  title: Yup.string().required("Obrigatório"),
  titleNewspaper: Yup.string().required("Obrigatório"),
  accessedAt: Yup.string().required("Obrigatório"),
  // year: Yup.string().required("Obrigatório"),
  // publishingCompany: Yup.string().required("Obrigatório"),
  // yearOfPublication: Yup.string().required("Obrigatório"),
});

const firstUpperCase = (name) => {
  const firstName = name.split(" ")[0];

  return name.replace(firstName, firstName.toUpperCase());
};

const generateReference = (values) => {
  const {
    authors,
    title,
    caption,
    titleNewspaper,
    numerNewspaper,
    titleNotebook,
    location,
    volume,
    year,
    pageInit,
    pageFinish,
    accessedAt,
    online,
    accessedAtUrl,
    url,
  } = values;

  return (
    <span>
      {" "}
      {authors.length !== 0 && formatAuthorName(authors)}
      {console.log("authors: ", authors)}
      {!authors.length || authors.length === 0 ? (
        caption ? (
          <>{`${formatMonosyllable(title)}: ${caption}. `}</>
        ) : (
          `${formatMonosyllable(title)}. `
        )
      ) : caption ? (
        <>{`${title}: ${caption}. `}</>
      ) : (
        `${title}. `
      )}
      {titleNewspaper && <b>{` ${titleNewspaper}, `}</b>}
      {location && `${location}, `}
      {year && `ano ${year}, `}
      {volume && `v. ${volume}, `}
      {numerNewspaper && `n. ${numerNewspaper}, `}
      {accessedAt && `${formatDate(accessedAt)}. `}
      {titleNotebook && `${titleNotebook}, `}
      {pageInit && !pageFinish && `p. ${pageInit}. `}
      {pageInit && pageFinish && `p. ${pageInit}-${pageFinish}. `}
      {online &&
        accessedAtUrl &&
        url &&
        `Disponível em: ${url}. Acesso em: ${formatDate(accessedAtUrl)}. `}
    </span>
  );
};
const ArticleNewspaper = ({ back }) => {
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
      ...(values.authors.length && {
        citationWithAuthor: generateCitationWithAuthor(
          values.authors,
          values.accessedAt
        ),
      }),
      ...(values.authors.length && {
        citation: generateCitationWithoutAuthor(
          values.authors,
          values.accessedAt
        ),
      }),
    }));

    setOpenModal(!openModal);
  };

  return (
    <Container>
      <Back onClick={back} src={ArrowLeft} />

      <Formik
        initialValues={{
          authors: [],
          title: "",
          caption: "",
          titleNewspaper: "",
          titleNotebook: "",
          numerNewspaper: "",
          location: "",
          volume: "",
          year: "",
          pageInit: "",
          pageFinish: "",
          accessedAt: "",
          online: false,
          accessedAtUrl: "",
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
                  Artigo de jornal
                </p>
                <span>
                  Inclui reportagem, notícia, entrevista, resenha, editorial e
                  outros.
                </span>
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
                                    placeholder="Ex: Julio Abramczyk"
                                    onChange={props.handleChange}
                                    onBlur={props.handleBlur}
                                    value={author}
                                    errors={props.errors}
                                    touched={props.touched}
                                  />
                                  <ButtonCore
                                    type="button"
                                    onClick={() => arrayHelpers.remove(index)}
                                  >
                                    <RemoveIcon src={Minus} />
                                  </ButtonCore>
                                  {index ===
                                    props.values.authors.length - 1 && (
                                    <ButtonCore
                                      type="button"
                                      onClick={() => arrayHelpers.push("")}
                                    >
                                      <AddIcon src={Plus} />
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
                              Adicionar autor
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
                      name="title"
                      label="Título do artigo"
                      type="text"
                      placeholder="Ex: A fragilidade em idosos e a saúde bucal"
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
                      label="Subtítulo do artigo"
                      type="text"
                      placeholder="Subtítulo do artigo"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.caption}
                      errors={props.errors}
                      touched={props.touched}
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={2} style={{ marginBottom: 5 }}>
                  <Grid item xs={12} sm={12} md={6}>
                    <Input
                      name="titleNewspaper"
                      label="Título do jornal"
                      type="text"
                      placeholder="Ex: Folha de S.Paulo"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.local}
                      errors={props.errors}
                      touched={props.touched}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={6}>
                    <Input
                      name="titleNotebook"
                      label="Título do caderno ou seção"
                      type="text"
                      placeholder="Ex: Ciência + Saúde"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.local}
                      errors={props.errors}
                      touched={props.touched}
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={2} style={{ marginBottom: 5 }}>
                  <Grid item xs={12} sm={12} md={3}>
                    <Input
                      name="numerNewspaper"
                      label="Nº do jornal"
                      type="text"
                      placeholder="Ex: 32420"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.local}
                      errors={props.errors}
                      touched={props.touched}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={5}>
                    <Input
                      name="location"
                      label="Local de publicação"
                      type="text"
                      placeholder="Ex: São Paulo"
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
                      label="Volume"
                      type="text"
                      placeholder="Ex: 45"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.volume}
                      errors={props.errors}
                      touched={props.touched}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={2}>
                    <Input
                      name="year"
                      label="Ano"
                      type="text"
                      placeholder="Ex: 97"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.year}
                      errors={props.errors}
                      touched={props.touched}
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={2} style={{ marginBottom: 5 }}>
                  <Grid item xs={12} sm={12} md={4}>
                    <Input
                      type="date"
                      label="Data de publicação"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.accessedAt}
                      name="accessedAt"
                      errors={props.errors}
                      touched={props.touched}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={4}>
                    <Input
                      name="pageInit"
                      label="Página inicial"
                      type="text"
                      placeholder="Ex: 20"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.pageInit}
                      errors={props.errors}
                      touched={props.touched}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={4}>
                    <Input
                      name="pageFinish"
                      label="Página Final"
                      type="text"
                      placeholder="Ex: 4"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.pageFinish}
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
                  <Grid item xs={12} sm={12} md={3}>
                    <Input
                      name="accessedAtUrl"
                      type="date"
                      label="Data de acesso"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      disabled={!props.values.online}
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.accessedAtUrl}
                      errors={props.errors}
                      touched={props.touched}
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
                </Grid>
                <Row>
                  <span>
                    Em caso de publicação em uma única página, preencher apenas
                    o item <b>página inicial</b>
                  </span>
                </Row>
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

export default ArticleNewspaper;
