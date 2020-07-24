import React, { useState } from "react";
import { format } from "date-fns";

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
  constructionNames: Yup.array().of(Yup.string().required("Obrigatório")),
  title: Yup.string().required("Obrigatório"),
  titleNewspaper: Yup.string().required("Obrigatório"),
  // publishingCompany: Yup.string().required("Obrigatório"),
  // yearOfPublication: Yup.string().required("Obrigatório"),
});

const generateReference = (values) => {
  const {
    authors,
    title,
    caption,
    titleNewspaper,
    numerNewspaper,
    titleNotebook,
    location,
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
      {authors.length && formatAuthorName(authors)}
      {caption ? <>{` ${title}: ${caption}.`}</> : ` ${title}. `}
      {titleNewspaper && <b>{` ${titleNewspaper}, `}</b>}
      {location && `${location}, `}
      {numerNewspaper && `n. ${numerNewspaper}, `}
      {accessedAt && `${formatDate(accessedAt)}, `}
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
    }));

    setOpenModal(!openModal);
  };

  return (
    <Container>
      <Back onClick={back} />

      <Formik
        initialValues={{
          authors: [""],
          title: "",
          caption: "",
          titleNewspaper: "",
          titleNotebook: "",
          numerNewspaper: "",
          location: "",
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
                <p>Artigo de jornal</p>
                <span>
                  Inclui reportagem, notícia, entrevista, resenha, editorial e
                  outros.
                </span>
              </Title>
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
                                    placeholder="Nome do autor"
                                    onChange={props.handleChange}
                                    onBlur={props.handleBlur}
                                    value={author}
                                    errors={props.errors}
                                    touched={props.touched}
                                  />
                                  <ButtonCore
                                    type="button"
                                    disabled={index === 0}
                                    onClick={() => arrayHelpers.remove(index)}
                                  >
                                    <RemoveIcon />
                                  </ButtonCore>
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
                </Grid>
                <Grid container spacing={2} style={{ marginBottom: 5 }}>
                  <Grid item xs={12} sm={12} md={8}>
                    <Input
                      name="title"
                      label="Título do artigo"
                      type="text"
                      placeholder="Nome do artigo"
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
                      placeholder="Ex: Cultura"
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
                      placeholder="Ex: 78"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.local}
                      errors={props.errors}
                      touched={props.touched}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={9}>
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
                </Grid>
                <Grid container spacing={2} style={{ marginBottom: 5 }}>
                  <Grid item xs={12} sm={12} md={4}>
                    <Input
                      type="date"
                      label="Data de acesso"
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
                      placeholder="Ex: 42"
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
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.url}
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

export default ArticleNewspaper;
