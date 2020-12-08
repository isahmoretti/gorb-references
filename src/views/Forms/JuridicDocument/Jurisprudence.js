import React, { useState } from "react";
import { useHistory } from "react-router-dom";

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
  typeDocument: Yup.string().required("Obrigatório"),
  numberProcess: Yup.string().required("Obrigatório"),
  // nameRelator: Yup.string().required("Obrigatório"),
  yearOfJudgment: Yup.string().required("Obrigatório"),
  title: Yup.string().required("Obrigatório"),
});

const generateReference = (values) => {
  const {
    jurisdiction,
    judicialOrgan,
    classOrRegion,
    typeDocument,
    numberProcess,
    menu,
    litigants,
    nameRelator,
    yearOfJudgment,
    title,
    location,
    dateOfPublication,
    volume,
    numberPublication,
    pageInit,
    pageFinish,
    yearOfPublication,
    online,
    url,
    accessedAt,
  } = values;

  return (
    <span>
      <>{jurisdiction.toUpperCase()}. </>
      <>{judicialOrgan}</>
      <>{classOrRegion ? ` (${classOrRegion}).` : ". "} </>
      {!online ? (
        `${typeDocument} ${numberProcess}. `
      ) : (
        <b>
          {typeDocument} {numberProcess}.
        </b>
      )}
      <>{menu ? `${menu}. ` : ""} </>
      <>{litigants ? `${litigants}.` : ""} </>
      <>Relatora: {nameRelator}, </>
      <>{yearOfJudgment}. </>
      {!online ? <b>{title}. </b> : `${title}. `}
      <>{location ? `${location},` : ""} </>
      <>v. {volume ? `${volume},` : ""} </>
      <>n. {numberPublication ? `${numberPublication},` : ""} </>
      <>p. {pageInit && !pageFinish ? `${pageInit},` : ""} </>
      <>p. {pageInit && pageFinish ? `${pageInit}-${pageFinish},` : ""} </>
      <>{yearOfPublication ? `${yearOfPublication}.` : ""} </>
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

  const history = useHistory();

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
      <Back
        onClick={() => history.push("/documentos-juridicos")}
        src={ArrowLeft}
      />

      <Formik
        initialValues={{
          jurisdiction: "",
          judicialOrgan: "",
          classOrRegion: "",
          typeDocument: "",
          numberProcess: "",
          menu: "",
          litigants: "",
          nameRelator: "",
          yearOfJudgment: "",
          title: "",
          location: "",
          dateOfPublication: "",
          volume: "",
          numberPublication: "",
          pageInit: "",
          pageFinish: "",
          yearOfPublication: "",
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
                <span>
                  Inclui súmula, enunciado, acórdão, sentença e outras decisões
                  judiciais.
                </span>
              </Title>
            </Actions>
            <Card>
              <Content>
                <Grid container spacing={2} style={{ marginBottom: 5 }}>
                  <Grid item xs={12} sm={12} md={5}>
                    <Input
                      type="text"
                      name="jurisdiction"
                      label="Jurisdição"
                      placeholder="Ex: Brasil"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.jurisdiction}
                      errors={props.errors}
                      touched={props.touched}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={7}>
                    <Input
                      type="text"
                      name="judicialOrgan"
                      label="Corte ou Tribunal"
                      placeholder="Ex: Superior Tribunal da Federal"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.judicialOrgan}
                      errors={props.errors}
                      touched={props.touched}
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={2} style={{ marginBottom: 0 }}>
                  <Grid item xs={12} sm={12} md={6}>
                    <Input
                      type="text"
                      name="classOrRegion"
                      label="Turma e/ou região"
                      placeholder="Ex: (2. Turma)"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.classOrRegion}
                      errors={props.errors}
                      touched={props.touched}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={6}>
                    <Input
                      type="text"
                      name="typeDocument"
                      label="Tipo de documento"
                      placeholder="Ex: Recurso Extraordinário"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.typeDocument}
                      errors={props.errors}
                      touched={props.touched}
                    />
                  </Grid>

                  <Grid item xs={12} sm={12} md={3}>
                    <Input
                      type="text"
                      name="numberProcess"
                      label="Número do processo"
                      placeholder="Ex: 313060/SP"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.numberProcess}
                      errors={props.errors}
                      touched={props.touched}
                    />
                  </Grid>

                  <Grid item xs={12} sm={12} md={9}>
                    <Input
                      type="text"
                      name="menu"
                      label="Ementa"
                      placeholder="E
                      x: Leis 10.927/91 e 11.262 do município de São Paulo.
                      Seguro obrigatório contra furto e roubo de automóveis. Shopping
                      centers, lojas de departamento, supermercados e empresas com
                      estacionamento para mais de cinquenta veículos."
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.menu}
                      errors={props.errors}
                      touched={props.touched}
                    />
                  </Grid>

                  <Grid item xs={12} sm={12} md={3}>
                    <Input
                      type="text"
                      label="Partes litigantes"
                      name="litigants"
                      placeholder="Ex: Recorrente: Banco do Estado de São Paulo S/A.
                      Recorrido: Município de São Paulo"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.litigants}
                      errors={props.errors}
                      touched={props.touched}
                    />
                  </Grid>

                  <Grid item xs={12} sm={12} md={3}>
                    <Input
                      type="text"
                      name="nameRelator"
                      label="Nome do relator"
                      placeholder="Ex: Min. Ellen Gracie"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.nameRelator}
                      errors={props.errors}
                      touched={props.touched}
                    />
                  </Grid>

                  <Grid item xs={12} sm={12} md={3}>
                    <Input
                      type="text"
                      name="yearOfJudgment"
                      label="Data de julgamento"
                      placeholder="Ex: 29 de novembro de 2005"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.yearOfJudgment}
                      errors={props.errors}
                      touched={props.touched}
                    />
                  </Grid>

                  <Grid item xs={12} sm={12} md={3}>
                    <Input
                      type="text"
                      name="title"
                      label="Título da publicação"
                      placeholder="Ex: Lex"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.title}
                      errors={props.errors}
                      touched={props.touched}
                    />
                  </Grid>

                  <Grid item xs={12} sm={12} md={3}>
                    <Input
                      type="text"
                      name="location"
                      label="Local da publicação"
                      placeholder="Ex: São Paulo"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.location}
                      errors={props.errors}
                      touched={props.touched}
                    />
                  </Grid>

                  <Grid item xs={12} sm={12} md={3}>
                    <Input
                      type="date"
                      name="dateOfPublication"
                      label="Data da publicação"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.dateOfPublication}
                      errors={props.errors}
                      touched={props.touched}
                    />
                  </Grid>

                  <Grid item xs={12} sm={12} md={3}>
                    <Input
                      type="text"
                      name="volume"
                      label="Volume"
                      placeholder="Ex: 28"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.volume}
                      errors={props.errors}
                      touched={props.touched}
                    />
                  </Grid>

                  <Grid item xs={12} sm={12} md={3}>
                    <Input
                      type="text"
                      name="numberPublication"
                      label="Número da publicação"
                      placeholder="Ex: 327"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.numberPublication}
                      errors={props.errors}
                      touched={props.touched}
                    />
                  </Grid>

                  <Grid item xs={12} sm={12} md={3}>
                    <Input
                      type="text"
                      name="pageInit"
                      label="Página inicial"
                      placeholder="Ex: 226"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.pageInit}
                      errors={props.errors}
                      touched={props.touched}
                    />
                  </Grid>

                  <Grid item xs={12} sm={12} md={3}>
                    <Input
                      type="text"
                      name="pageFinish"
                      label="Página final"
                      placeholder="Ex: 230"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.pageFinish}
                      errors={props.errors}
                      touched={props.touched}
                    />
                  </Grid>

                  <Grid item xs={12} sm={12} md={3}>
                    <Input
                      type="text"
                      name="yearOfPublication"
                      label="Ano da publicação"
                      placeholder="Ex: 2006"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.yearOfPublication}
                      errors={props.errors}
                      touched={props.touched}
                    />
                  </Grid>

                  <Grid item xs={12} sm={12} md={3}>
                    <Input
                      type="text"
                      name="decisionNumber"
                      label="Notas"
                      placeholder="Ex: informações complementares"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.decisionNumber}
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
                <Row container classOrRegionName="end">
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
