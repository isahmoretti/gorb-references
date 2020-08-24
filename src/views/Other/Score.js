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
  compositor: Yup.string().required("Obrigatório"),
  title: Yup.string().required("Obrigatório"),
  instrument: Yup.string().required("Obrigatório"),
  editor: Yup.string().required("Obrigatório"),
  yaer: Yup.string().required("Obrigatório"),
  description: Yup.string().required("Obrigatório"),
});

const generateReference = (values) => {
  const {
    compositor,
    title,
    subtitle,
    instrument,
    location,
    editor,
    yaer,
    description,
    online,
    accessedAt,
    url,
  } = values;

  return <span></span>;
};

const Score = ({ back }) => {
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
          compositor: "Chiquinha Gonzaga",
          title: "GAÚCHO",
          subtitle:
            " O Corta Jaca da revista de costumes e fatos nacionais e estrangeiros CÁ E LÁ",
          instrument: "Piano",
          location: "Rio de Janeiro",
          editor: "Acervo digital Chiquinha Gonzaga",
          yaer: "1997",
          description: "1 partitura",
          online: true,
          accessedAt: "",
          url:
            "http://www.chiquinhagonzaga.com/acervo/?musica=gaucho&post_id=1463",
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
                  PARTITURA
                </p>
                <span></span>
              </Title>
            </Actions>
            <Card>
              <Content>
                <Grid container spacing={2} style={{ marginBottom: 0 }}>
                  <Grid item xs={12} sm={12} md={6}>
                    <Input
                      name="compositor"
                      type="text"
                      label="Compositor"
                      placeholder="Ex: Chiquinha Gonzaga"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.compositor}
                      errors={props.errors}
                      touched={props.touched}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={6}>
                    <Input
                      name="title"
                      type="text"
                      label="Título"
                      placeholder="Ex: GAÚCHO"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.title}
                      errors={props.errors}
                      touched={props.touched}
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={2} style={{ marginBottom: 0 }}>
                  <Grid item xs={12} sm={12} md={6}>
                    <Input
                      name="subtitle"
                      type="text"
                      label="Subtítulo"
                      placeholder="Ex: O Corta Jaca da revista de costumes e fatos nacionais e estrangeiros CÁ E LÁ"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.subtitle}
                      errors={props.errors}
                      touched={props.touched}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={6}>
                    <Input
                      name="instrument"
                      type="text"
                      label="Instrumento ao qual se destina"
                      placeholder="Ex: Paris"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.instrument}
                      errors={props.errors}
                      touched={props.touched}
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={2} style={{ marginBottom: 0 }}>
                  <Grid item xs={12} sm={12} md={5}>
                    <Input
                      name="location"
                      type="text"
                      label="Local"
                      placeholder="Ex: Rio de Janeiro"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.location}
                      errors={props.errors}
                      touched={props.touched}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={5}>
                    <Input
                      name="editor"
                      type="text"
                      label="Editor"
                      placeholder="Ex: Acervo digital Chiquinha Gonzaga"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.editor}
                      errors={props.errors}
                      touched={props.touched}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={2}>
                    <Input
                      name="yaer"
                      type="text"
                      label="Ano"
                      placeholder="Ex: 1997"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.yaer}
                      errors={props.errors}
                      touched={props.touched}
                    />
                  </Grid>
                </Grid>

                <Grid container spacing={2} style={{ marginBottom: 0 }}>
                  <Grid item xs={12} sm={12} md={6}>
                    <Input
                      name="description"
                      type="text"
                      label="Descrição"
                      placeholder="Ex: 1 partitura"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.description}
                      errors={props.errors}
                      touched={props.touched}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={6}>
                    <Input
                      name="description"
                      type="text"
                      label="Descrição"
                      placeholder="Ex: 1 partitura"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.description}
                      errors={props.errors}
                      touched={props.touched}
                    />
                  </Grid>
                </Grid>

                <Grid container spacing={2} style={{ marginBottom: 0 }}>
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
                  <Grid item xs={12} sm={12} md={6}>
                    <Input
                      name="url"
                      label="Disponível em"
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
                // citationWithAuthor={state.citationWithAuthor}
                // citation={state.citation}
              />
            </Card>
          </form>
        )}
      </Formik>
    </Container>
  );
};

export default Score;
