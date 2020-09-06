import React, { useState } from "react";

import { Formik } from "formik";

import * as Yup from "yup";

import { Grid } from "@material-ui/core";

// components
import Input from "../../../components/InputWrapper/Input";
import Button from "../../../components/Buttons";
import Select from "../../../components/InputWrapper/Select";
import Modal from "../../../components/Modal";

// utils
import { formatDate } from "../../../utils/formatDate";
import { generateCitationWithAuthor } from "../../../utils/generateCitationWithAuthor";
import { generateCitationWithoutAuthor } from "../../../utils/generateCitationWithoutAuthor";

import ArrowLeft from "../../../assets/images/arrow-left.svg";

// styles
import { Container, Card, Row, Content, Back, Actions, Title } from "./style";

const SignupSchema = Yup.object().shape({
  jurisdiction: Yup.string().required("Obrigatório"),
  judicialOrgan: Yup.string().required("Obrigatório"),
  title: Yup.string().required("Obrigatório"),
  decisionNumber: Yup.string().required("Obrigatório"),
  relatedParties: Yup.string().required("Obrigatório"),
  publicationTitle: Yup.string().required("Obrigatório"),
  publicationLocal: Yup.string().required("Obrigatório"),
  UF: Yup.string().required("Obrigatório"),
  yearOfPublication: Yup.string().required("Obrigatório"),
});

const generateReference = (values) => {
  const {
    jurisdiction,
    judicialOrgan,
    title,
    decisionNumber,
    complementaryElements,
    relatedParties,
    proposed,
    reporter,
    decisionLocal,
    decisionUF,
    yearOfDecision,
    publicationTitle,
    captionPublication,
    publicationLocal,
    publishingCompany,
    yearOfPublication,
    volume,
    publicationNumber,
    initialPage,
    finalPage,
    online,
    url,
    accessedAt,
  } = values;

  return (
    <span>
      {`${jurisdiction.toUpperCase()}. `}
      {`${judicialOrgan}. `}
      {`${title} `}
      {`nº ${decisionNumber}. `}
      {complementaryElements && `${complementaryElements}. `}
      {relatedParties && `${relatedParties}. `}
      {proposed && `${proposed}. `}
      {reporter && `Relator: ${reporter}. `}
      {decisionLocal && `${decisionLocal}, `}
      {decisionUF && `${decisionUF}, `}
      {yearOfDecision && `${formatDate(yearOfDecision)}. `}
      {captionPublication ? (
        <>
          <b>{publicationTitle}: </b>
          {captionPublication}.{" "}
        </>
      ) : (
        <b>{publicationTitle}. </b>
      )}
      {`${publicationLocal}: `}
      {publishingCompany && `${publishingCompany}, `}
      {`${formatDate(yearOfPublication)}. `}
      {volume && `v. ${volume}, `}
      {publicationNumber && `n. ${publicationNumber}, `}
      {initialPage && !finalPage && `p. ${initialPage}. `}
      {initialPage && finalPage && `p. ${initialPage}-${finalPage}. `}
      {online &&
        accessedAt &&
        url &&
        `Disponível em: ${url}. Acesso em: ${formatDate(accessedAt)}. `}
    </span>
  );
};

const Jurisprudence = ({ back }) => {
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
        values.jurisdiction,
        values.yearOfPublication
      ),
      citation: generateCitationWithoutAuthor(
        values.jurisdiction,
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
          jurisdiction: "",
          judicialOrgan: "",
          title: "",
          decisionNumber: "",
          complementaryElements: "",
          relatedParties: "",
          proposed: "",
          reporter: "",
          decisionLocal: "",
          decisionUF: "",
          yearOfDecision: "",
          publicationTitle: "",
          captionPublication: "",
          publicationLocal: "",
          UF: "",
          publishingCompany: "",
          yearOfPublication: "",
          volume: "",
          publicationNumber: "",
          initialPage: "",
          finalPage: "",
          online: false,
          url: "",
          accessedAt: "",
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
                  Jurisprudência
                </p>
              </Title>
            </Actions>
            <Card>
              <Content>
                <Grid container spacing={2} style={{ marginBottom: 5 }}>
                  <Grid item xs={12} sm={12} md={5}>
                    <Input
                      type="text"
                      label="Jurisdição"
                      placeholder="Ex: Brasil"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.jurisdiction}
                      name="jurisdiction"
                      errors={props.errors}
                      touched={props.touched}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={7}>
                    <Input
                      type="text"
                      label="Órgão Judiciário Compesmall-10te"
                      placeholder="Ex: Superior Tribunal da Justiça"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.judicialOrgan}
                      name="judicialOrgan"
                      errors={props.errors}
                      touched={props.touched}
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={2} style={{ marginBottom: 0 }}>
                  <Grid item xs={12} sm={12} md={5}>
                    <Input
                      type="text"
                      label="Título(natureza da decisão ou ementa)"
                      placeholder="Súmula"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.title}
                      name="title"
                      errors={props.errors}
                      touched={props.touched}
                    />
                  </Grid>

                  <Grid item xs={12} sm={12} md={3}>
                    <Input
                      type="text"
                      label="Número da Decisão"
                      placeholder="Ex: 22"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.decisionNumber}
                      name="decisionNumber"
                      errors={props.errors}
                      touched={props.touched}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={4}>
                    <Input
                      type="text"
                      label="Elementos Complementares"
                      placeholder="Adicionar informações complementares"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.complementaryElements}
                      name="complementaryElements"
                      errors={props.errors}
                      touched={props.touched}
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={2} style={{ marginBottom: 0 }}>
                  <Grid item xs={12} sm={12} md={6}>
                    <Input
                      type="text"
                      label="Partes envolvidas"
                      placeholder="Ex: Apelante: Joaquim de Assis e outros"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.relatedParties}
                      name="relatedParties"
                      errors={props.errors}
                      touched={props.touched}
                      help
                      helpText="Partes Envolvidas (se houver) 
                                            Propositor (qualificar o propositor. p.ex.: 
                                            'Apelante: Joaquim de Assis e outros')"
                    />
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={12}
                    md={6}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "flex-end",
                    }}
                  >
                    <Input
                      type="text"
                      label="Proposto"
                      placeholder="Ex: Apelada: Escola Técnica Federal do Acre"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.proposed}
                      name="proposed"
                      errors={props.errors}
                      touched={props.touched}
                      help
                      helpText="Proposto (qualificar o proposto. p.ex.: 
                                                'Apelada: Escola Técnica Federal do Acre')"
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={2} style={{ marginBottom: 5 }}>
                  <Grid item xs={12} sm={12} md={6}>
                    <Input
                      type="text"
                      label="Relator"
                      placeholder="Desembargador José de Souza"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.pagination}
                      name="reporter"
                      errors={props.errors}
                      touched={props.touched}
                      help
                      helpText="Relator (incluir o cargo do proposto. p.ex.: 'Juiz Nereu Santos')"
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
                    <Input
                      type="text"
                      label="Local da Decisão (cidade)"
                      placeholder="Ex: São Paulo"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.decisionLocal}
                      name="decisionLocal"
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
                    <Input
                      type="text"
                      label="UF onde ocorreu a Decisão"
                      placeholder="Ex: SP"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.decisionUF}
                      name="decisionUF"
                      errors={props.errors}
                      touched={props.touched}
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={2} style={{ marginBottom: 5 }}>
                  <Grid item xs={12} sm={12} md={3}>
                    <Input
                      type="date"
                      label="Data da Decisão"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.yearOfDecision}
                      name="yearOfDecision"
                      errors={props.errors}
                      touched={props.touched}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={5}>
                    <Input
                      type="text"
                      label="Título da Publicação"
                      placeholder="EX: Diário Oficial da União"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.publicationTitle}
                      name="publicationTitle"
                      errors={props.errors}
                      touched={props.touched}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={4}>
                    <Input
                      type="text"
                      label="Subtítulo da Publicação"
                      placeholder="EX: Diário Oficial da União"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.captionPublication}
                      name="captionPublication"
                      errors={props.errors}
                      touched={props.touched}
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={2} style={{ marginBottom: 5 }}>
                  <Grid item xs={12} sm={12} md={3}>
                    <Input
                      type="text"
                      label="Local da Publicação"
                      placeholder="Ex: Brasília"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.publicationLocal}
                      name="publicationLocal"
                      errors={props.errors}
                      touched={props.touched}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={3}>
                    <Input
                      type="text"
                      label="Unidade da Federação"
                      placeholder="Ex: DF"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.UF}
                      name="UF"
                      errors={props.errors}
                      touched={props.touched}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={3}>
                    <Input
                      type="text"
                      label="Editora"
                      placeholder="Ex: Saraiva"
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
                      type="date"
                      label="Data da Publicação"
                      InputLabelProps={{
                        shrink: true,
                      }}
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
                  <Grid item xs={12} sm={12} md={3}>
                    <Input
                      type="text"
                      label="Volume"
                      placeholder="Ex: 4"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.volume}
                      name="volume"
                      errors={props.errors}
                      touched={props.touched}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={3}>
                    <Input
                      type="text"
                      placeholder="Ex: 7"
                      label="Nº da Publicação"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.publicationNumber}
                      name="publicationNumber"
                      errors={props.errors}
                      touched={props.touched}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={3}>
                    <Input
                      type="text"
                      label="Página inicial"
                      placeholder="Ex: 56"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.initialPage}
                      name="initialPage"
                      errors={props.errors}
                      touched={props.touched}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={3}>
                    <Input
                      type="text"
                      label="Página final"
                      placeholder="Ex: 78"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.finalPage}
                      name="finalPage"
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
                      disabled={!props.values.online}
                      name="url"
                      label="Endereço(URL)"
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
                      label="Data de acesso"
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

export default Jurisprudence;
