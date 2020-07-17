import React, { useState } from "react";
import { compareAsc, format } from "date-fns";

import { Formik, Field, FieldArray } from "formik";
import * as Yup from "yup";

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
  Title,
} from "./style";

const SignupSchema = Yup.object().shape({
  constructionNames: Yup.array().of(Yup.string().required("Obrigatório")),
  title: Yup.string().required("Obrigatório"),
  // local: Yup.string().required("Obrigatório"),
  // publishingCompany: Yup.string().required("Obrigatório"),
  // yearOfPublication: Yup.string().required("Obrigatório"),
});

const getContructionNames = (names) => {
  const namesTogether = names.map((author) => {
    const namesSplit = author.split(" ");

    const firstName = namesSplit[0];

    const lastName = namesSplit[namesSplit.length - 1].toUpperCase(); // TODO: ultimo sobrenome ou primeiro?

    return `${lastName}, ${firstName[0]}`;
  });
  return namesTogether.join("; ");
};

const generateReference = (values) => {
  const {
    constructionNames,
    title,
    caption,
    titlePeriodic,
    location,
    volume,
    pageInit,
    pageFinish,
    fascicle,
    accessedAt,
    yearOfPublication,
    online,
    accessedAtUrl,
    url,
    doi,
  } = values;

  return (
    <span>
      {" "}
      {constructionNames.length && getContructionNames(constructionNames)}
      .&nbsp;
      {caption ? <>{`${title}: ${caption}.`}</> : `${title}.`}
      <b>{` ${titlePeriodic}`}</b>,&nbsp; {location && `${location}, `}
      {volume && `v. ${volume}, `}
      {fascicle && `n. ${fascicle}, `}
      {pageInit && pageFinish && `p. ${pageInit} - ${pageFinish}, `}
      {accessedAt && `${format(new Date(accessedAt), "MMM. yyyy")}. `}
      {online &&
        accessedAtUrl &&
        url &&
        `Disponível em: ${url}. Acesso em: ${format(
          new Date(accessedAtUrl),
          "d MMM. yyyy"
        )}. `}
      {doi && doi}
    </span>
  );
};
const WorkArticlePeriodic = ({ back }) => {
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
          constructionNames: [""],
          title: "",
          caption: "",
          titlePeriodic: "",
          location: "",
          volume: "",
          pageInit: "",
          pageFinish: "",
          fascicle: "",
          accessedAt: "",
          yearOfPublication: "",
          online: false,
          accessedAtUrl: "",
          url: "",
          doi: "",
        }}
        validationSchema={SignupSchema}
        onSubmit={handleSubmit}
      >
        {(props) => (
          <form onSubmit={props.handleSubmit}>
            <Actions>
              <Title>
                <p>Artigo publicado em periódico</p>
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
                  Gerar referencia
                </Button>
              </Row>
            </Actions>
            <Card>
              <Content>
                <Grid container spacing={2} style={{ marginBottom: 30 }}>
                  <Grid item xs={12} sm={12} md={12}>
                    <FieldArray
                      name="constructionNames"
                      render={(arrayHelpers) => (
                        <div>
                          {props.values.constructionNames &&
                          props.values.constructionNames.length > 0 ? (
                            props.values.constructionNames.map(
                              (constructionName, index) => (
                                <FieldArrayContainer key={index}>
                                  <div
                                    style={{ display: "flex", width: "100%" }}
                                  >
                                    <Input
                                      name={`constructionNames.${index}`}
                                      label={`Autor da obra ${index + 1}`}
                                      type="text"
                                      placeholder="Nome do autor"
                                      onChange={props.handleChange}
                                      onBlur={props.handleBlur}
                                      value={constructionName}
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
                                      props.values.constructionNames.length -
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
                                        props.errors.constructionNames &&
                                        props.errors.constructionNames[index]}
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
                <Grid container spacing={2} style={{ marginBottom: 30 }}>
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
                <Grid container spacing={2} style={{ marginBottom: 30 }}>
                  <Grid item xs={12} sm={12} md={4}>
                    <Input
                      name="titlePeriodic"
                      label="Titulo do periódico"
                      type="text"
                      placeholder="Nome do periódico"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.local}
                      errors={props.errors}
                      touched={props.touched}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={8}>
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
                <Grid container spacing={2} style={{ marginBottom: 30 }}>
                  <Grid item xs={12} sm={12} md={4}>
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
                <Grid container spacing={2} style={{ marginBottom: 30 }}>
                  <Grid item xs={12} sm={12} md={4}>
                    <Input
                      name="fascicle"
                      label="Nº do Fasncílico"
                      type="text"
                      placeholder="Ex: 4"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.fascicle}
                      errors={props.errors}
                      touched={props.touched}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={4}>
                    <Input
                      type="date"
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
                  <Grid item xs={12} sm={12} md={3}>
                    <Input
                      name="accessedAtUrl"
                      type="date"
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
                <Grid container spacing={2} style={{ marginBottom: 30 }}>
                  <Grid item xs={12} sm={12} md={6}>
                    <Input
                      name="doi"
                      label="DOI"
                      type="text"
                      help
                      helpText="Digital Object Identifier é
                      um padrão de números e
                      letras que identificam
                      publicações."
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.doi}
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

export default WorkArticlePeriodic;
