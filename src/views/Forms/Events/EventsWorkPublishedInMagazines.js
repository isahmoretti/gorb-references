import React, { useState } from "react";
import { useHistory } from "react-router-dom";

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
  authors: Yup.array().of(Yup.string().required("Obrigatório")),
  workTitle: Yup.string().required("Obrigatório"),
  periodicTitle: Yup.string().required("Obrigatório"),
  place: Yup.string().required("Obrigatório"),
  // number: Yup.string().required("Obrigatório"),
  eventNumber: Yup.string().required("Obrigatório"),
  eventName: Yup.string().required("Obrigatório"),
  locationOfTheEvent: Yup.string().required("Obrigatório"),
  eventYear: Yup.string().required("Obrigatório"),
});

const generateReference = (values) => {
  const {
    authors,
    abbreviate,
    workTitle,
    caption,
    periodicTitle,
    periodicCaption,
    place,
    volume,
    number,
    supplement,
    pageInit,
    pageFinish,
    day,
    month,
    year,
    eventNumber,
    eventName,
    locationOfTheEvent,
    eventYear,
    online,
    url,
    accessedAt,
  } = values;

  return (
    <span>
      {authors.length && formatAuthorName(authors, abbreviate)}
      {caption ? <>{`${workTitle}: ${caption}. `}</> : `${workTitle}. `}
      {periodicTitle && <b>{`${periodicTitle}`}</b>}
      {periodicCaption ? `: ${periodicCaption}, ` : ", "}
      {place && <>{place}, </>}
      {volume && `v. ${volume}, `}
      {number && <>n. {number}, </>}
      {pageInit && !pageFinish && `p. ${pageInit}, `}
      {pageInit && pageFinish && `p. ${pageInit}-${pageFinish}, `}
      {day && month && year && `${day} ${month}. ${year}. `}
      {!day && month && year && `${month}. ${year}. `}
      {!day && !month && year && `${year}. `}
      {supplement && <>​{supplement}. </>}
      {eventNumber && eventName && (
        <>
          Trabalho apresentado no {eventNumber}° {eventName},&nbsp;
        </>
      )}
      {locationOfTheEvent && <>{locationOfTheEvent}, </>}
      {eventYear && <>{eventYear}. </>}
      {online &&
        url &&
        `Disponível em: ${url}. Acesso em: ${formatDate(accessedAt)}. `}
    </span>
  );
};
const EventsWorkPublishedInMagazines = ({ back }) => {
  const [state, setState] = useState({
    values: {},
    clearInitialValues: false,
  });

  const [openModal, setOpenModal] = useState(false);

  const history = useHistory()

  const handleSubmit = (values) => {
    setState((prev) => ({
      ...prev,
      values,
      references: generateReference(values),
      citationWithAuthor: generateCitationWithAuthor(
        values.authors,
        values.eventYear
      ),
      citation: generateCitationWithoutAuthor(values.authors, values.eventYear),
    }));

    setOpenModal(!openModal);
  };

  return (
    <Container>
      <Back onClick={() => history.push('/evento')} src={ArrowLeft} />

      <Formik
        initialValues={{
          authors: [""],
          abbreviate: false,
          workTitle: "",
          caption: "",
          periodicTitle: "",
          periodicCaption: "",
          place: "",
          volume: "",
          number: "",
          supplement: "",
          pageInit: "",
          pageFinish: "",
          day: "",
          month: "",
          year: "",
          eventNumber: "",
          eventName: "",
          locationOfTheEvent: "",
          eventYear: "",
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
                  Trabalhos de eventos publicados em revistas
                </p>
              </Title>
            </Actions>
            <Card>
              <Content>
                <Grid container spacing={2} style={{ marginBottom: 5 }}>
                  <Grid item xs={12} sm={12} md={10}>
                    <FieldArray
                      name="authors"
                      render={(arrayHelpers) => (
                        <div>
                          {props.values.authors &&
                          props.values.authors.length > 0 ? (
                            props.values.authors.map(
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
                                      name={`authors.${index}`}
                                      label={`${index + 1}º Autor`}
                                      type="text"
                                      placeholder="Nome do autor"
                                      onChange={props.handleChange}
                                      onBlur={props.handleBlur}
                                      value={constructionName}
                                      errors={props.errors}
                                      touched={props.touched}
                                    />
                                    {index > 0 && (
                                      <ButtonCore
                                        type="button"
                                        onClick={() =>
                                          arrayHelpers.remove(index)
                                        }
                                      >
                                        <RemoveIcon src={Minus} />
                                      </ButtonCore>
                                    )}
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
                  <Grid item xs={12} sm={12} md={8}>
                    <Input
                      name="workTitle"
                      label="Título do trabalho"
                      type="text"
                      placeholder="Ex: Avaliação do professor realizada pelo aluno: impacto nas práticas docentes"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.workTitle}
                      errors={props.errors}
                      touched={props.touched}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={4}>
                    <Input
                      name="caption"
                      label="Subtítulo"
                      type="text"
                      placeholder="Ex: Subtítulo (se houver)"
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
                      name="periodicTitle"
                      label="Titulo do periódico"
                      type="text"
                      placeholder="Ex: Revista Brasileira de Educação Médica"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.periodicTitle}
                      errors={props.errors}
                      touched={props.touched}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={8}>
                    <Input
                      name="captionPeriodic"
                      label="Subtítulo do periódico"
                      type="text"
                      placeholder="Subtítulo do periódico"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.captionPeriodic}
                      errors={props.errors}
                      touched={props.touched}
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={2} style={{ marginBottom: 5 }}>
                  <Grid item xs={12} sm={12} md={4}>
                    <Input
                      name="place"
                      label="Local de publicação"
                      type="text"
                      placeholder="Ex: Belo Horizonte"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.place}
                      errors={props.errors}
                      touched={props.touched}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={2}>
                    <Input
                      name="volume"
                      label="Volume"
                      type="text"
                      placeholder="Ex: 35"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.volume}
                      errors={props.errors}
                      touched={props.touched}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={2}>
                    <Input
                      name="number"
                      label="Número"
                      type="text"
                      placeholder="Ex: 4"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.number}
                      errors={props.errors}
                      touched={props.touched}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={2}>
                    <Input
                      name="pageInit"
                      label="Página inicial"
                      type="text"
                      placeholder="Ex: 141"
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
                      placeholder="Ex: 142"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.pageFinish}
                      errors={props.errors}
                      touched={props.touched}
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={2} style={{ marginBottom: 5 }}>
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
                  <Grid item xs={12} sm={12} md={2}>
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
                  <Grid item xs={12} sm={12} md={2}>
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
                  <Grid item xs={12} sm={12} md={4}>
                    <Input
                      name="supplement"
                      label="Suplemento"
                      type="text"
                      placeholder="Ex: supl. 1"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.supplement}
                      errors={props.errors}
                      touched={props.touched}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={2}>
                    <Input
                      name="eventNumber"
                      label="Número do evento"
                      type="text"
                      placeholder="Ex: 49"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.eventNumber}
                      errors={props.errors}
                      touched={props.touched}
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={2} style={{ marginBottom: 5 }}>
                  <Grid item xs={12} sm={12} md={4}>
                    <Input
                      name="eventName"
                      label="Nome do evento"
                      type="text"
                      placeholder="Ex: Congresso Brasileiro de Educação Médica"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.eventName}
                      errors={props.errors}
                      touched={props.touched}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={4}>
                    <Input
                      name="locationOfTheEvent"
                      label="Local de realização do evento"
                      type="text"
                      placeholder="Ex: Belo Horizonte"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.locationOfTheEvent}
                      errors={props.errors}
                      touched={props.touched}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={2}>
                    <Input
                      name="eventYear"
                      label="Ano"
                      type="text"
                      placeholder="Ex: 2011"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.eventYear}
                      errors={props.errors}
                      touched={props.touched}
                    />
                  </Grid>
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
                </Grid>
                <Grid container spacing={2} style={{ marginBottom: 5 }}>
                  <Grid item xs={12} sm={12} md={4}>
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
                  <Grid item xs={12} sm={12} md={8}>
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

export default EventsWorkPublishedInMagazines;
