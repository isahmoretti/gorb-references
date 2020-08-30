import React, { useState } from "react";

import { Formik } from "formik";

import * as Yup from "yup";

import { Grid } from "@material-ui/core";

// components
import Input from "../../components/InputWrapper/Input";
import Select from "../../components/InputWrapper/Select";
import Button from "../../components/Buttons";
import Modal from "../../components/Modal";

// utils
import { formatDate } from "../../utils/formatDate";

import ArrowLeft from "../../assets/images/arrow-left.svg";

// styles
import { Container, Card, Row, Content, Back, Actions, Title } from "./style";

const SignupSchema = Yup.object().shape({
  title: Yup.string().required("Obrigatório"),
  locutors: Yup.string().required("Obrigatório"),
  productor: Yup.string().required("Obrigatório"),
  date: Yup.string().required("Obrigatório"),
  accessedAt: Yup.string().required("Obrigatório"),
  url: Yup.string().required("Obrigatório"),
});

const generateReference = (values) => {
  const {
    title,
    caption,
    locutors,
    hasInterviewee,
    nameInterviewee,
    location,
    productor,
    date,
    url,
    accessedAt,
  } = values;

  return (
    <span>
      {caption
        ? `${title.toUpperCase()}: ${caption}. `
        : `${title.toUpperCase()}. `}
      {`[Locução de]: ${locutors}. `}
      {hasInterviewee &&
        nameInterviewee &&
        `Entrevistada: ${nameInterviewee}. `}
      {location ? `${location}: ` : `[S.l.]: `}
      {`${productor}, `}
      {`${formatDate(date)}. `}
      {accessedAt && url && (
        <span>
          {" "}
          <i>Podcast.</i>
          {` Disponível em: ${url}. Acesso em: ${formatDate(
            accessedAt
          )}. `}{" "}
        </span>
      )}
    </span>
  );
};

const Podcast = ({ back }) => {
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
      <Back onClick={back} src={ArrowLeft} />

      <Formik
        initialValues={{
          title: "Dragões de Garagem #137",
          caption: "vó Maria vacinas e escolhas #semanadavacina",
          locutors: "Barbara Paes",
          hasInterviewee: true,
          nameInterviewee: "Ex: Maria da Silva",
          location: "São Paulo",
          productor: "Dragões de Garagem",
          date: "",
          url: "https://www.youtube.com/watch?v=wpLhm0UKTBY",
          accessedAt: "",
        }}
        validationSchema={SignupSchema}
        onSubmit={handleSubmit}
      >
        {(props) => (
          <form style={{ maxWidth: 1000 }} onSubmit={props.handleSubmit}>
            <Actions>
              <Title>
                <p
                  style={{
                    fontSize: "20px",
                  }}
                >
                  Podcast
                </p>
                <span></span>
              </Title>
            </Actions>
            <Card>
              <Content>
                <Grid container spacing={2} style={{ marginBottom: 0 }}>
                  <Grid item xs={12} sm={12} md={6}>
                    <Input
                      name="title"
                      type="text"
                      label="Título do podcast"
                      placeholder="Ex: Dragões de Garagem"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.title}
                      errors={props.errors}
                      touched={props.touched}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={6}>
                    <Input
                      name="caption"
                      type="text"
                      label="Subtítulo do podcast"
                      placeholder="Ex: #137: vó Maria: vacinas e escolhas #semanadavacina."
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.caption}
                      errors={props.errors}
                      touched={props.touched}
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={2} style={{ marginBottom: 0 }}>
                  <Grid item xs={12} sm={12} md={5}>
                    <Input
                      name="locutors"
                      type="text"
                      label="Locutores"
                      placeholder="Ex: Barbara Paes"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.locutors}
                      errors={props.errors}
                      touched={props.touched}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={2}>
                    <Select
                      name="hasInterviewee"
                      label="Tem entrevistado?"
                      type="text"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.hasInterviewee}
                      errors={props.errors}
                      touched={props.touched}
                      options={[
                        { value: true, name: "Sim" },
                        { value: false, name: "Não" },
                      ]}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={5}>
                    <Input
                      name="nameInterviewee"
                      type="text"
                      label="Nome do Entrevistado"
                      placeholder="Ex: Maria da Silva"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.nameInterviewee}
                      errors={props.errors}
                      touched={props.touched}
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={2} style={{ marginBottom: 0 }}>
                  <Grid item xs={12} sm={12} md={4}>
                    <Input
                      name="location"
                      type="text"
                      label="Local"
                      placeholder="Ex: São Paulo"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.location}
                      errors={props.errors}
                      touched={props.touched}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={4}>
                    <Input
                      name="productor"
                      type="text"
                      label="Produtora"
                      placeholder="Ex: Dragões de Garagem"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.productor}
                      errors={props.errors}
                      touched={props.touched}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={4}>
                    <Input
                      name="date"
                      type="date"
                      label="Data de publicação"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.date}
                      errors={props.errors}
                      touched={props.touched}
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={2} style={{ marginBottom: 0 }}>
                  <Grid item xs={12} sm={12} md={9}>
                    <Input
                      name="url"
                      label="Disponível em"
                      type="text"
                      placeholder="http://dragoesdegaragem.com/podcast/dragoes-de-garagem-137-vo-maria-vacinas-e-escolhassemanadavacina/"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.url}
                      errors={props.errors}
                      touched={props.touched}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={3}>
                    <Input
                      name="accessedAt"
                      type="date"
                      label="Acesso em"
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

export default Podcast;
