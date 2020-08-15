import React, { useState } from "react";

import { Formik } from "formik";

import * as Yup from "yup";

import { Grid } from "@material-ui/core";

// components
import Input from "../../components/InputWrapper/Input";
import Button from "../../components/Buttons";
import Select from "../../components/InputWrapper/Select";
import Modal from "../../components/Modal";

// utils
import { formatDate } from "../../utils/formatDate";
import { formatAuthorName } from "../../utils/formatAuthorName";
import { generateCitationWithAuthor } from "../../utils/generateCitationWithAuthor";
import { generateCitationWithoutAuthor } from "../../utils/generateCitationWithoutAuthor";

// styles
import { Container, Card, Row, Content, Back, Actions, Title } from "./style";

const SignupSchema = Yup.object().shape({
  title: Yup.string().required("Obrigatório"),
  director: Yup.string().required("Obrigatório"),
  productor: Yup.string().required("Obrigatório"),
  location: Yup.string().required("Obrigatório"),
  company: Yup.string().required("Obrigatório"),
  year: Yup.string().required("Obrigatório"),
});

const citation1 = (title, yaer) => {
  const frist = title.split(" ")[0];
  const temp = title.split(" ")[0].toUpperCase();

  const name = title.replace(frist, temp);

  return `${name} (${yaer})`;
};
const citation2 = (title, yaer) => {
  const frist = title.split(" ")[0];
  const temp = title.split(" ")[0].toUpperCase();

  const name = title.replace(frist, temp);

  return `(${name}, ${yaer})`;
};

const generateReference = (values) => {
  const {
    title,
    director,
    productor,
    screenwriter,
    interpreters,
    location,
    company,
    year,
    colorful,
    sound,
    suport,
    whatSuport,
    specificationSuport,
    duration,
    subtitled,
    whatSubtitled,
    serie,
    notes,
    online,
    url,
    accessedAt,
  } = values;

  const formatTitle = (title) => {
    const frist = title.split(" ")[0];
    const temp = title.split(" ")[0].toUpperCase();

    return title.replace(frist, temp);
  };

  // title: Yup.string().required("Obrigatório"),
  // director: Yup.string().required("Obrigatório"),
  // productor: Yup.string().required("Obrigatório"),
  // location: Yup.string().required("Obrigatório"),
  // company: Yup.string().required("Obrigatório"),
  // year: Yup.string().required("Obrigatório"),

  return (
    <span>
      {`${formatTitle(title)}. `}
      {`Direção: ${director}. `}
      {`Produção: ${productor}. `}
      {interpreters && `Intérpretes: ${interpreters}. `}
      {screenwriter && `Roteiro: ${screenwriter}. `}
      {location ? `${location}: ` : `[S. l.]: `}
      {`${company}, `}
      {`${year}. `}
      {specificationSuport && `${specificationSuport} `}
      {duration && `(${duration}), `}
      {suport && whatSuport && `${whatSuport}, `}
      {sound && `son. `}
      {colorful && `color. `}
      {subtitled && whatSubtitled && `Legendado. ${whatSubtitled}. `}
      {serie && `${serie}. `}
      {notes && `${notes}. `}
      {online &&
        accessedAt &&
        url &&
        `Disponível em: ${url}. Acesso em: ${formatDate(accessedAt)}. `}
    </span>
  );
};

const AdministrativeActs = ({ back }) => {
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
      citation: citation2(values.title, values.year),
      citationWithAuthor: citation1(values.title, values.year),
    }));

    setOpenModal(!openModal);
  };

  return (
    <Container>
      <Back onClick={back} />

      <Formik
        initialValues={{
          title: "Central do Brasil",
          director: "Walter Salles Júnior",
          productor: "Martire de Clemont-Tonnerre e Arthur Cohn",
          screenwriter:
            " Marcos Bernstein, João Emanuel Carneiro e Walter Salles Junior",
          interpreters:
            "Fernanda Montenegro, Marilia Pera, Sônia Lira, Othon Bastos, Matheus Nachtergaele et al.",
          location: "Rio de Janeiro",
          company: "Riofilme",
          year: "1998",
          colorful: "sim",
          sound: "sim",
          suport: "sim",
          whatSuport: "VHS",
          specificationSuport: "1 fta de vídeo",
          duration: "106min",
          subtitled: "sim",
          whatSubtitled: "Port",
          serie: "Série se Houver",
          notes: "Informações complementares",
          online: false,
          url: "",
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
                  Filme
                </p>
              </Title>
            </Actions>
            <Card>
              <Content>
                <Grid container spacing={2} style={{ marginBottom: 5 }}>
                  <Grid item xs={12} sm={12} md={6}>
                    <Input
                      name="title"
                      label="Título"
                      placeholder="Ex: Central do Brasil"
                      type="text"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.title}
                      errors={props.errors}
                      touched={props.touched}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={6}>
                    <Input
                      name="director"
                      label="Diretor"
                      placeholder="Ex: Walter Salles Júnior"
                      type="text"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.director}
                      errors={props.errors}
                      touched={props.touched}
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={2} style={{ marginBottom: 0 }}>
                  <Grid item xs={12} sm={12} md={4}>
                    <Input
                      name="productor"
                      label="Produtor"
                      placeholder="Ex: Martire de Clemont-Tonnerre e Arthur Cohn"
                      type="text"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.productor}
                      errors={props.errors}
                      touched={props.touched}
                    />
                  </Grid>

                  <Grid item xs={12} sm={12} md={4}>
                    <Input
                      name="screenwriter"
                      label="Roterista"
                      placeholder="Ex: Marcos Bernstein, João Emanuel Carneiro e Walter Salles Junior"
                      type="text"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.screenwriter}
                      errors={props.errors}
                      touched={props.touched}
                    />
                  </Grid>

                  <Grid item xs={12} sm={12} md={4}>
                    <Input
                      name="interpreters"
                      label="Intérpretes"
                      placeholder="Ex: Fernanda Montenegro, Marilia Pera, Sônia Lira, Othon Bastos, Matheus Nachtergaele et al"
                      type="text"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.interpreters}
                      errors={props.errors}
                      touched={props.touched}
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={2} style={{ marginBottom: 0 }}>
                  <Grid item xs={12} sm={12} md={5}>
                    <Input
                      name="location"
                      label="Local"
                      placeholder="Ex: Rio de Janeiro "
                      type="text"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.location}
                      errors={props.errors}
                      touched={props.touched}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={5}>
                    <Input
                      name="company"
                      label="Emprsa produtora ou distribuidora"
                      placeholder="Ex: Riofilme"
                      type="text"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.company}
                      errors={props.errors}
                      touched={props.touched}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={2}>
                    <Input
                      name="year"
                      label="Ano de publicação"
                      placeholder="Ex: 1998"
                      type="text"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.year}
                      errors={props.errors}
                      touched={props.touched}
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={2} style={{ marginBottom: 5 }}>
                  <Grid item xs={12} sm={12} md={2}>
                    <Select
                      name="colorful"
                      label="Colorido ?"
                      type="text"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.colorful}
                      errors={props.errors}
                      touched={props.touched}
                      options={[
                        { value: true, name: "Sim" },
                        { value: false, name: "Não" },
                      ]}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={2}>
                    <Select
                      name="sound"
                      label="Som ?"
                      type="text"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.sound}
                      errors={props.errors}
                      touched={props.touched}
                      options={[
                        { value: true, name: "Sim" },
                        { value: false, name: "Não" },
                      ]}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={2}>
                    <Select
                      name="suport"
                      label="Suporte Físico?"
                      type="text"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.suport}
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
                      name="whatSuport"
                      label="Qual tipo de suporte"
                      placeholder="Ex: VHS"
                      type="text"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.whatSuport}
                      errors={props.errors}
                      touched={props.touched}
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={2} style={{ marginBottom: 5 }}>
                  <Grid item xs={12} sm={12} md={4}>
                    <Input
                      name="specificationSuport"
                      label="Especificação física do suporte"
                      placeholder="Ex: 1 fta de vídeo"
                      type="text"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.specificationSuport}
                      errors={props.errors}
                      touched={props.touched}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={2}>
                    <Input
                      name="duration"
                      label="Duração do filme"
                      placeholder="Ex: :106min"
                      type="text"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.duration}
                      errors={props.errors}
                      touched={props.touched}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={2}>
                    <Select
                      name="subtitled"
                      label="Legendado? "
                      type="text"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.subtitled}
                      errors={props.errors}
                      touched={props.touched}
                      options={[
                        { value: true, name: "Sim" },
                        { value: false, name: "Não" },
                      ]}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={4}>
                    <Input
                      name="whatSubtitled"
                      label="Qual língua?"
                      placeholder="Ex: Port."
                      type="text"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.whatSubtitled}
                      errors={props.errors}
                      touched={props.touched}
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={2} style={{ marginBottom: 5 }}>
                  <Grid item xs={12} sm={12} md={6}>
                    <Input
                      name="serie"
                      label="Série"
                      placeholder="Ex: Sua séria aqui."
                      type="text"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.serie}
                      errors={props.errors}
                      touched={props.touched}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={6}>
                    <Input
                      name="notes"
                      label="Nota"
                      placeholder="Ex: Informações complementares"
                      type="text"
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

export default AdministrativeActs;
