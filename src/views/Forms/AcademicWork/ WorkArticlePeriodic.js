import React, { useState } from "react";

import { Formik, FieldArray } from "formik";
import * as Yup from "yup";

import { Grid, Button as ButtonCore } from "@material-ui/core";

// components
import Input from "../../../components/InputWrapper/Input";
import Button from "../../../components/Buttons";
import Select from "../../../components/InputWrapper/Select";
import Modal from "../../../components/Modal";

import { formatDate } from "../../../utils/formatDate";
import { formatAuthorName } from "../../../utils/formatAuthorName";

// citation
import { generateCitationWithAuthor } from "../../../utils/generateCitationWithAuthor";
import { generateCitationWithoutAuthor } from "../../../utils/generateCitationWithoutAuthor";

import ArrowLeft from "../../../assets/images/arrow-left.svg";
import Plus from "../../../assets/images/plus-dark.svg";
import Minus from "../../../assets/images/minus.svg";

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
  titlePeriodic: Yup.string().required("Obrigatório"),
  year: Yup.string().required("Obrigatório"),
  // publishingCompany: Yup.string().required("Obrigatório"),
  // yearOfPublication: Yup.string().required("Obrigatório"),
});

const generateReference = (values) => {
  const {
    constructionNames,
    abbreviate,
    title,
    caption,
    titlePeriodic,
    captionPeriodic,
    location,
    volume,
    pageInit,
    pageFinish,
    fascicle,
    day,
    month,
    year,
    online,
    accessedAtUrl,
    url,
    issn,
    doi,
    notes,
  } = values;

  return (
    <span>
      {" "}
      {constructionNames.length &&
        formatAuthorName(constructionNames, abbreviate)}
      {caption ? <>{`${title}: ${caption}. `}</> : `${title}. `}
      {titlePeriodic && <b>{`${titlePeriodic}`}</b>}
      {captionPeriodic ? `: ${captionPeriodic}, ` : ", "}
      {location ? `${location}, ` : "[s. l.], "}
      {volume && `v. ${volume}, `}
      {fascicle && `n. ${fascicle}, `}
      {pageInit && !pageFinish && `p. ${pageInit}, `}
      {pageInit && pageFinish && `p. ${pageInit}-${pageFinish}, `}
      {day && month && year && `${day} ${month}. ${year} `}
      {!day && month && year && `${month}. ${year} `}
      {!day && !month && year && `${year}. `}
      {issn && `${issn}. `}
      {notes && `${notes}. `}
      {doi && `DOI: https://doi.org/${doi}. `}
      {online &&
        accessedAtUrl &&
        url &&
        `Disponível em: ${url}. Acesso em: ${formatDate(accessedAtUrl)}. `}
      {online &&
        accessedAtUrl &&
        !url &&
        doi &&
        `Acesso em: ${formatDate(accessedAtUrl)}. `}
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
      citationWithAuthor: generateCitationWithAuthor(
        values.constructionNames,
        values.year
      ),
      citation: generateCitationWithoutAuthor(
        values.constructionNames,
        values.year
      ),
    }));

    setOpenModal(!openModal);
  };

  return (
    <Container>
      <Back onClick={back} src={ArrowLeft} />

      <Formik
        initialValues={{
          constructionNames: [""],
          abbreviate: false,
          title: "",
          caption: "",
          titlePeriodic: "",
          captionPeriodic: "",
          location: "",
          volume: "",
          pageInit: "",
          pageFinish: "",
          fascicle: "",
          day: "",
          month: "",
          year: "",
          online: false,
          accessedAtUrl: "",
          url: "",
          issn: "",
          doi: "",
          notes: "",
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
                  Artigo publicado em periódico
                </p>
              </Title>
            </Actions>
            <Card>
              <Content>
                <Grid container spacing={2} style={{ marginBottom: 5 }}>
                  <Grid item xs={12} sm={12} md={10}>
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
                                    style={{
                                      display: "flex",
                                      width: "100%",
                                      marginBottom: 10,
                                    }}
                                  >
                                    <Input
                                      name={`constructionNames.${index}`}
                                      label={`${index + 1}º Autor da obra`}
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
                                      <RemoveIcon src={Minus} />
                                    </ButtonCore>
                                    {index ===
                                      props.values.constructionNames.length -
                                        1 && (
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
                  <Grid item xs={12} sm={12} md={3}>
                    <Select
                      name="typeAthor"
                      label="Tipo de autor"
                      type="text"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.typeAthor}
                      errors={props.errors}
                      touched={props.touched}
                      options={[
                        { value: "fisic", name: "Pessoa física" },
                        { value: "entity", name: "Entidade" },
                      ]}
                    />
                  </Grid>
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
                  <Grid item xs={12} sm={12} md={4}>
                    <Input
                      name="titlePeriodic"
                      label="Titulo do periódico"
                      type="text"
                      placeholder="Nome do periódico"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.titlePeriodic}
                      errors={props.errors}
                      touched={props.touched}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={8}>
                    <Input
                      name="captionPeriodic"
                      label="Subtítulo do periódico"
                      type="text"
                      placeholder="Subtítulo do "
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.captionPeriodic}
                      errors={props.errors}
                      touched={props.touched}
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={2} style={{ marginBottom: 5 }}>
                  <Grid item xs={12} sm={12} md={6}>
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
                  <Grid item xs={12} sm={12} md={2}>
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
                  <Grid item xs={12} sm={12} md={4}>
                    <Input
                      name="fascicle"
                      label="Nº do Fascículo"
                      type="text"
                      placeholder="Ex: 4"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.fascicle}
                      errors={props.errors}
                      touched={props.touched}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={2}>
                    <Input
                      name="day"
                      type="number"
                      label="Dia"
                      InputProps={{ inputProps: { min: 0 } }}
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.day}
                      errors={props.errors}
                      touched={props.touched}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={3}>
                    <Select
                      name="month"
                      label="Mês"
                      type="text"
                      placeholder="Mês"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.month}
                      errors={props.errors}
                      touched={props.touched}
                      options={[
                        { value: "jan", name: "Janeiro" },
                        { value: "fev", name: "Fevereiro" },
                        { value: "mar", name: "Março" },
                        { value: "abr", name: "Abril" },
                        { value: "mai", name: "Maio" },
                        { value: "jun", name: "Junho" },
                        { value: "jul", name: "Julho" },
                        { value: "ago", name: "Agosto" },
                        { value: "set", name: "Setembro" },
                        { value: "out", name: "Outubro" },
                        { value: "nov", name: "Novembro" },
                        { value: "dev", name: "Dezembro" },
                      ]}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={3}>
                    <Input
                      name="year"
                      type="number"
                      label="Ano"
                      InputProps={{ inputProps: { min: 0 } }}
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
                      name="issn"
                      label="ISSN"
                      type="text"
                      help
                      helpText="Identificador único para revistas e periódicos"
                      placeholder="Ex: 2175-7941"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.issn}
                      errors={props.errors}
                      touched={props.touched}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={4}>
                    <Input
                      name="doi"
                      label="DOI"
                      type="text"
                      help
                      helpText="Digital Object Identifier é
                      um padrão de números e
                      letras que identificam
                      publicações."
                      placeholder="https://doi.org/10.1590/1981-
                      5794-1911-5"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.doi}
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
                      name="notes"
                      label="Nota"
                      type="text"
                      placeholder="Ex: Informações complementares"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.notes}
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

export default WorkArticlePeriodic;
