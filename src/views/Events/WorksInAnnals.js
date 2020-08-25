import React, { useState } from "react";

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
import { formatMessage } from "../../utils/formatMessage";
import { generateCitationWithAuthor } from '../../utils/generateCitationWithAuthor'
import { generateCitationWithoutAuthor } from '../../utils/generateCitationWithoutAuthor'

import ArrowLeft from "../../assets/images/arrow-left.svg";
import Plus from "../../assets/images/plus-dark.svg";
import Minus from "../../assets/images/minus.svg";

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
  eventName: Yup.string().required("Obrigatório"),
  yearOfPerformance: Yup.string().required("Obrigatório"),
  placeOfEvent: Yup.string().required("Obrigatório"),
  documentTitle: Yup.string().required("Obrigatório"),
  placeOfPublication: Yup.string().required("Obrigatório"),
  responsibility: Yup.string().required("Obrigatório"),
  yearOfPublication: Yup.string().required("Obrigatório"),
});

const generateReference = (values) => {
  const {
    authors,
    workTitle,
    caption,
    eventName,
    eventNumbering,
    yearOfPerformance,
    placeOfEvent,
    documentTitle,
    placeOfPublication,
    responsibility,
    yearOfPublication,
    specification,
    volume,
    pageInit,
    pageFinish,
    online,
    url,
    accessedAt,
  } = values;

  return (
    <span>
      {authors && <>{formatAuthorName(authors)}</>}
      {caption ? <>{`${workTitle}: ${caption}. `}</> : `${workTitle}. `}
      
      {eventName && <><i>In:</i> {eventName.toUpperCase()}, </>}
      {eventNumbering && <>{eventNumbering}., </>}
      {yearOfPerformance && <>{yearOfPerformance}, </>}
      {placeOfEvent && <>{placeOfEvent}. </>}

      {documentTitle && <b>{formatMessage(documentTitle)}. </b>}
      {placeOfPublication && <>{placeOfPublication}: </>}
      {responsibility && <>{responsibility}, </>}
      {yearOfPublication && <>{yearOfPublication}. </>}

      {volume && `v. ${volume}, `}
      {pageInit && !pageFinish && `p. ${pageInit}, `}
      {pageInit && pageFinish && `p. ${pageInit}-${pageFinish}, `}
      
      {specification && <>{specification}. </>}
     
      {online && <>{online}</>}
      {online &&
        url &&
        accessedAt && 
        `Disponível em: ${url}. Acesso em: ${formatDate(accessedAt)}. `}
    </span>
  );
};
const WorksInAnnals = ({ back }) => {
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
      citationWithAuthor: generateCitationWithAuthor(values.authors, values.yearOfPublication),
      citation: generateCitationWithoutAuthor(values.authors, values.yearOfPublication)
    }));

    setOpenModal(!openModal);
  };

  return (
    <Container>
      <Back onClick={back} src={ArrowLeft} />

      <Formik
        initialValues={{
          authors: [""],
          abbreviate: false,
          workTitle: "",
          caption: "",
          eventName: "",
          eventNumbering: "",
          yearOfPerformance: "",
          placeOfEvent: "",
          documentTitle: "",
          placeOfPublication: "",
          responsibility: "",
          yearOfPublication: "",
          specification: "",
          volume: "",
          pageInit: "",
          pageFinish: "",
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
                  Trabalhos em anais
                </p>
                <div>Inclui anais, resumos e proceedings</div>
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
                                      {
                                        index > 0 &&
                                        <ButtonCore
                                          type="button"
                                          onClick={() => arrayHelpers.remove(index)}
                                        >
                                          <RemoveIcon src={Minus} />
                                        </ButtonCore>
                                      }
                                      {index ===
                                        props.values.authors.length -
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
                      placeholder="Ex: Avaliação do efeito da fototerapia com laser no crescimento de fibroblastos gengivais de pacientes com Síndrome
                      de Down"
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
                      name="eventName"
                      label="Nome do evento"
                      type="text"
                      placeholder="Ex: Congresso Brasileiro de Periodontologia"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.eventName}
                      errors={props.errors}
                      touched={props.touched}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={4}>
                    <Input
                      name="placeOfEvent"
                      label="Local do evento"
                      type="text"
                      placeholder="Ex: São Paulo"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.placeOfEvent}
                      errors={props.errors}
                      touched={props.touched}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={4}>
                    <Input
                      name="documentTitle"
                      label="Título do Documento"
                      type="text"
                      placeholder="Ex: Anais"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.documentTitle}
                      errors={props.errors}
                      touched={props.touched}
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={2} style={{ marginBottom: 5 }}>
                  <Grid item xs={12} sm={12} md={4}>
                    <Input
                      name="placeOfPublication"
                      label="Local da publicação"
                      type="text"
                      placeholder="Ex: Belo Horizonte"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.placeOfPublication}
                      errors={props.errors}
                      touched={props.touched}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={5}>
                    <Input
                      name="responsibility"
                      label="Responsabilidade da publicação"
                      type="text"
                      placeholder="Ex: Sociedade Brasileira de Periodontologia"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.responsibility}
                      errors={props.errors}
                      touched={props.touched}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={3}>
                    <Input
                      name="yearOfPublication"
                      label="Ano de publicação"
                      type="text"
                      placeholder="Ex: 2017"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.yearOfPublication}
                      errors={props.errors}
                      touched={props.touched}
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={2} style={{ marginBottom: 5 }}>
                  <Grid item xs={12} sm={12} md={4}>
                    <Input
                      name="specification"
                      label="Especificação do trabalho"
                      type="text"
                      placeholder="Trabalho 149/1085-0"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.specification}
                      errors={props.errors}
                      touched={props.touched}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={2}>
                    <Input
                      name="volume"
                      label="Volume"
                      type="text"
                      placeholder="Ex: v. 2"
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
                      label="Página Inicial"
                      type="text"
                      placeholder="Ex: 45"
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
                      placeholder="Ex: 65"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.pageFinish}
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
                citation={state.citation}
                citationWithAuthor={state.citationWithAuthor}
              />
            </Card>
          </form>
        )}
      </Formik>
    </Container >
  );
};

export default WorksInAnnals;
