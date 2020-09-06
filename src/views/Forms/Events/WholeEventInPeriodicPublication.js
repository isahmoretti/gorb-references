import React, { useState } from "react";

import { Formik } from "formik";
import * as Yup from "yup";

import { Grid } from "@material-ui/core";

// components
import Input from "../../../components/InputWrapper/Input";
import Button from "../../../components/Buttons";
import Select from "../../../components/InputWrapper/Select";
import Modal from "../../../components/Modal";

import { formatMessage } from "../../../utils/formatMessage";
import { formatDate } from "../../../utils/formatDate";
import { generateCitationWithAuthor } from "../../../utils/generateCitationWithAuthor";
import { generateCitationWithoutAuthor } from "../../../utils/generateCitationWithoutAuthor";

import ArrowLeft from "../../../assets/images/arrow-left.svg";

// styles
import { Container, Card, Row, Content, Back, Actions, Title } from "./style";

const SignupSchema = Yup.object().shape({
  eventName: Yup.string().required("Obrigatório"),
  numbering: Yup.string().required("Obrigatório"),
  year: Yup.string().required("Obrigatório"),
  placeOfTheEvent: Yup.string().required("Obrigatório"),
  documentTitle: Yup.string().required("Obrigatório"),
  periodicName: Yup.string().required("Obrigatório"),
  placeOfPublication: Yup.string().required("Obrigatório"),
  publishingCompany: Yup.string().required("Obrigatório"),
  publicationMonth: Yup.string().required("Obrigatório"),
  publicationYear: Yup.string().required("Obrigatório"),
});

const generateReference = (values) => {
  const {
    eventName,
    numbering,
    participationEventName,
    participationEventNumbering,
    year,
    placeOfTheEvent,
    documentTitle,
    periodicName,
    placeOfPublication,
    publishingCompany,
    volume,
    issueNumber,
    publicationMonth,
    publicationYear,
    theme,
    online,
    url,
    accessedAt,
  } = values;

  return (
    <span>
      {eventName && <>{eventName.toUpperCase()}, </>}
      {numbering && <>{numbering}, </>}
      {participationEventName && <>{participationEventName.toUpperCase()}, </>}
      {participationEventNumbering && <>{participationEventNumbering}., </>}
      {year && <>{year}, </>}
      {placeOfTheEvent && <>{placeOfTheEvent}, </>}
      {documentTitle && <>{formatMessage(documentTitle)} </>}
      {periodicName && <b>{periodicName}. </b>}
      {placeOfPublication && <>{placeOfPublication}: </>}
      {publishingCompany && <>{publishingCompany}, </>}
      {volume && <>v. {volume}, </>}
      {issueNumber && <>n. {issueNumber}, </>}
      {publicationMonth && <>{publicationMonth}. </>}
      {publicationYear && <>{publicationYear}. </>}
      {theme && <>Tema: {theme}. </>}
      {online &&
        url &&
        accessedAt &&
        `Disponível em: ${url}. Acesso em: ${formatDate(accessedAt)}. `}
    </span>
  );
};
const WholeEventInPeriodicPublication = ({ back }) => {
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
        values.eventName,
        values.publicationYear
      ),
      citation: generateCitationWithoutAuthor(
        values.eventName,
        values.publicationYear
      ),
    }));

    setOpenModal(!openModal);
  };

  return (
    <Container>
      <Back onClick={back} src={ArrowLeft} />

      <Formik
        initialValues={{
          eventName: "",
          numbering: "",
          participationEventName: "",
          participationEventNumbering: "",
          year: "",
          placeOfTheEvent: "",
          documentTitle: "",
          periodicName: "",
          placeOfPublication: "",
          publishingCompany: "",
          volume: "",
          issueNumber: "",
          publicationMonth: "",
          publicationYear: "",
          theme: "",
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
                  Evento no todo em publicação periódica
                </p>
              </Title>
            </Actions>
            <Card>
              <Content>
                <Grid container spacing={2} style={{ marginBottom: 5 }}>
                  <Grid item xs={12} sm={12} md={5}>
                    <Input
                      name="eventName"
                      label="Nome do evento"
                      type="text"
                      placeholder="Ex: Congresso Brasileiro de Olericultura"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.eventName}
                      errors={props.errors}
                      touched={props.touched}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={2}>
                    <Input
                      name="numbering"
                      label="Numeração"
                      type="text"
                      placeholder="Ex: 41"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.numbering}
                      errors={props.errors}
                      touched={props.touched}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={5}>
                    <Input
                      name="participationEventName"
                      label="Nome do evento de participação"
                      type="text"
                      placeholder="Ex: Encontro sobre plantas medicinais, aromáticas e condimentares"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.participationEventName}
                      errors={props.errors}
                      touched={props.touched}
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={2} style={{ marginBottom: 5 }}>
                  <Grid item xs={12} sm={12} md={4}>
                    <Input
                      name="participationEventNumbering"
                      label="Numeração do evento de participação"
                      type="text"
                      placeholder="Ex: 1"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.participationEventNumbering}
                      errors={props.errors}
                      touched={props.touched}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={2}>
                    <Input
                      name="year"
                      label="Ano"
                      type="text"
                      placeholder="Ex: 2001"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.year}
                      errors={props.errors}
                      touched={props.touched}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={6}>
                    <Input
                      name="placeOfTheEvent"
                      label="Local de realização do evento"
                      type="text"
                      placeholder="Ex: Brasília, DF"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.placeOfTheEvent}
                      errors={props.errors}
                      touched={props.touched}
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={2} style={{ marginBottom: 5 }}>
                  <Grid item xs={12} sm={12} md={7}>
                    <Input
                      name="documentTitle"
                      label="Título do documento"
                      type="text"
                      placeholder="Ex: Apresentação, artigos, palestras, instruções..."
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.documentTitle}
                      errors={props.errors}
                      touched={props.touched}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={5}>
                    <Input
                      name="periodicName"
                      label="Nome do periódico"
                      type="text"
                      placeholder="Ex: Horticultura Brasileira"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.periodicName}
                      errors={props.errors}
                      touched={props.touched}
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={2} style={{ marginBottom: 5 }}>
                  <Grid item xs={12} sm={12} md={5}>
                    <Input
                      name="placeOfPublication"
                      label="Local de publicação do periódico"
                      type="text"
                      placeholder="Ex: Brasília, DF"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.placeOfPublication}
                      errors={props.errors}
                      touched={props.touched}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={5}>
                    <Input
                      name="publishingCompany"
                      label="Publicadora"
                      type="text"
                      placeholder="Ex: Sociedade de Olericultura do Brasil"
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
                      placeholder="Ex: 19"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.volume}
                      errors={props.errors}
                      touched={props.touched}
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={2} style={{ marginBottom: 5 }}>
                  <Grid item xs={12} sm={12} md={3}>
                    <Input
                      name="issueNumber"
                      label="Número do fascículo"
                      type="text"
                      placeholder="Ex: 2"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.issueNumber}
                      errors={props.errors}
                      touched={props.touched}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={3}>
                    <Select
                      name="publicationMonth"
                      label="Mês"
                      type="text"
                      placeholder="Mês"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.publicationMonth}
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
                      name="publicationYear"
                      type="number"
                      label="Ano"
                      InputProps={{ inputProps: { min: 0 } }}
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.publicationYear}
                      errors={props.errors}
                      touched={props.touched}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={3}>
                    <Input
                      name="theme"
                      type="text"
                      label="Tema"
                      InputProps={{ inputProps: { min: 0 } }}
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.theme}
                      errors={props.errors}
                      touched={props.touched}
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={2} style={{ marginBottom: 5 }}>
                  <Grid item xs={12} sm={12} md={2}>
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
                      name="accessedAt"
                      type="date"
                      label="Data de acesso"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      disabled={!props.values.online}
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.accessedAt}
                      errors={props.errors}
                      touched={props.touched}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={7}>
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
                citation={state.citation}
                citationWithAuthor={state.citationWithAuthor}
              />
            </Card>
          </form>
        )}
      </Formik>
    </Container>
  );
};

export default WholeEventInPeriodicPublication;
