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
  typeAuthor: Yup.string().required("Obrigatório"),
  title: Yup.string().required("Obrigatório"),
  location: Yup.string().required("Obrigatório"),
  year: Yup.string().required("Obrigatório"),
  description: Yup.string().required("Obrigatório"),
});

const generateReference = (values) => {
  const {
    typeAuthor,
    author,
    subordination,
    title,
    caption,
    location,
    editor,
    year,
    description,
    scale,
    online,
    accessedAt,
    url,
  } = values;

  const getTitle = (title) => {
    if (!title) return
    const titleSplit = title.split(' ')
    return `${titleSplit[0].toUpperCase()} ${titleSplit.slice(1).join(' ')}`
  }
  return <span>
    {
      typeAuthor === 'withoutAuthorship'
        ? <>
          {caption ? <><b>{getTitle(title)}: </b>{caption}. </> : <>{getTitle(title)}. </>}
        </>
        : <>
          {author && <>{author.toUpperCase()}. </>}
          {caption ? <><b>{title}: </b>{caption}. </> : <b>{title}. </b>}
          {subordination && <>{subordination}. </>}
        </>
    }
    {editor ? <>{location}: {editor}, </> : <>{location}, </>}
    {year && <>{year}. </>}
    {description && <>{description}. </>}
    {scale && <>{scale}. </>}
    {online &&
      accessedAt &&
      url &&
      `Disponível em: ${url}. Acesso em: ${formatDate(accessedAt)}. `}
  </span>;
};

// in case we need it
// eslint-disable-next-line no-unused-vars
const getTypeAuthor = (type) => {
  switch (type) {
    case "physicalPerson":
      return "Pessoa física"
    case "entity":
      return "Entidade"
    case "withoutAuthorship":
      return "Sem autoria"
    default:
      break;
  }
}

const Maps = ({ back }) => {
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
          typeAuthor: "",
          author: "",
          subordination: "",
          title: "",
          caption: "",
          location: "",
          editor: "",
          year: "",
          description: "",
          scale: "",
          online: false,
          accessedAt: "",
          url: "",
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
                  Mapas
                </p>
                <span>
                  Inclui atlas, globo, fotografia aérea e outros documentos
                  cartográficos
                </span>
              </Title>
            </Actions>
            <Card>
              <Content>
                <Grid container spacing={2} style={{ marginBottom: 0 }}>
                  <Grid item xs={12} sm={12} md={3}>
                    <Select
                      name="typeAuthor"
                      label="Tipo de autor"
                      type="text"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.typeAuthor}
                      errors={props.errors}
                      touched={props.touched}
                      options={[
                        { value: "physicalPerson", name: "Pessoa física" },
                        { value: "entity", name: "Entidade" },
                        { value: "withoutAuthorship", name: "Sem autoria" },
                      ]}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={5}>
                    <Input
                      disabled={props.values.typeAuthor === 'withoutAuthorship'}
                      name="author"
                      type="text"
                      label="Nome do autor"
                      placeholder="Ex: Santa Catarina"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.author}
                      errors={props.errors}
                      touched={props.touched}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={4}>
                    <Input
                      name="subordination"
                      type="text"
                      label="Subordinação"
                      placeholder="Ex: Departamento Estadual de Geografia e Cartografia"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.subordination}
                      errors={props.errors}
                      touched={props.touched}
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={2} style={{ marginBottom: 0 }}>
                  <Grid item xs={12} sm={12} md={4}>
                    <Input
                      name="title"
                      type="text"
                      label="Título"
                      placeholder="Ex: Mapa geral do Estado de Santa Catarina"
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
                      type="text"
                      label="Subtítulo"
                      placeholder="Ex: nome do subtítulo"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.caption}
                      errors={props.errors}
                      touched={props.touched}
                    />
                  </Grid>

                  <Grid item xs={12} sm={12} md={4}>
                    <Input
                      name="location"
                      type="text"
                      label="Local"
                      placeholder="Ex: Florianópolis"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.location}
                      errors={props.errors}
                      touched={props.touched}
                    />
                  </Grid>
                </Grid>

                <Grid container spacing={2} style={{ marginBottom: 0 }}>
                  <Grid item xs={12} sm={12} md={3}>
                    <Input
                      name="editor"
                      type="text"
                      label="Editora"
                      placeholder="Ex: responsável pela publicação"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.editor}
                      errors={props.errors}
                      touched={props.touched}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={3}>
                    <Input
                      name="year"
                      type="text"
                      label="Data de publicação"
                      placeholder="Ex: 1958"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.year}
                      errors={props.errors}
                      touched={props.touched}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={4}>
                    <Input
                      name="description"
                      type="text"
                      label="Descrição física"
                      placeholder="Ex: 1 mapa, 78 x 57 cm"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.description}
                      errors={props.errors}
                      touched={props.touched}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={2}>
                    <Input
                      name="scale"
                      type="text"
                      label="Escala"
                      placeholder="Ex: Escala: 1:800:000"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.scale}
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
                      disabled={!props.values.online}
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
                      disabled={!props.values.online}
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

export default Maps;
