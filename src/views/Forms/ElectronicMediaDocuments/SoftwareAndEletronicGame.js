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
import {
  generateCitationWithoutAuthor,
  generateCitationWithoutAuthorSpread,
} from "../../../utils/generateCitationWithoutAuthor";
import { formatDate } from "../../../utils/formatDate";
import { formatMonosyllable } from "../../../utils/monosyllable";
import ArrowLeft from "../../../assets/images/arrow-left.svg";

// styles
import { Container, Card, Row, Content, Back, Actions, Title } from "./style";

const SignupSchema = Yup.object().shape({
  title: Yup.string().required("Obrigatório"),
  caption: Yup.string().required("Obrigatório"),
  editionOrVersion: Yup.string().required("Obrigatório"),
  local: Yup.string().required("Obrigatório"),
  producer: Yup.string().required("Obrigatório"),
  releaseYear: Yup.string().required("Obrigatório"),
  supportSpecification: Yup.string().required("Obrigatório"),
});

const generateReference = (values) => {
  const {
    title,
    caption,
    editionOrVersion,
    local,
    producer,
    releaseYear,
    supportSpecification,
    accessedAtUrl,
    url,
  } = values;

  return (
    <span>
      <>
        {formatMonosyllable(title)}: {caption}.{" "}
      </>
      {editionOrVersion && <>{editionOrVersion} </>}
      {local && <>{local}: </>}
      {producer && <>{producer}, </>}
      {releaseYear && <>{releaseYear}. </>}
      {supportSpecification && <>{supportSpecification}. </>}
      {accessedAtUrl &&
        url &&
        `Disponível em: ${url}. Acesso em: ${formatDate(accessedAtUrl)}. `}
    </span>
  );
};

const SoftwareAndEletronicGame = ({ back }) => {
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
      // citationWithAuthor: generateCitationWithAuthor(
      //   values.title,
      //   values.releaseYear
      // ),
      citation: generateCitationWithoutAuthorSpread(
        values.title,
        values.releaseYear
      ),
    }));

    setOpenModal(!openModal);
  };

  return (
    <Container>
      <Back onClick={back} src={ArrowLeft} />

      <Formik
        initialValues={{
          title: "",
          caption: "",
          editionOrVersion: "",
          local: "",
          producer: "",
          releaseYear: "",
          supportSpecification: "",
          accessedAtUrl: "",
          url: "",
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
                  Software e jogo eletrônico
                </p>
              </Title>
            </Actions>
            <Card>
              <Content>
                <Grid container spacing={2} style={{ marginBottom: 5 }}>
                  <Grid item xs={12} sm={12} md={6}>
                    <Input
                      type="text"
                      label="Título do jogo/software"
                      placeholder="Ex: A Game of Thrones"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.title}
                      name="title"
                      errors={props.errors}
                      touched={props.touched}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={6}>
                    <Input
                      type="text"
                      label="Subtítulo do jogo"
                      placeholder="Ex: The board game "
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.caption}
                      name="caption"
                      errors={props.errors}
                      touched={props.touched}
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={2} style={{ marginBottom: 5 }}>
                  <Grid item xs={12} sm={12} md={4}>
                    <Input
                      type="text"
                      label="Edição ou versão"
                      placeholder="Ex: 2nd ed."
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.editionOrVersion}
                      name="editionOrVersion"
                      errors={props.errors}
                      touched={props.touched}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={4}>
                    <Input
                      type="text"
                      label="Local"
                      placeholder="Ex: Roseville"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.local}
                      name="local"
                      errors={props.errors}
                      touched={props.touched}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={4}>
                    <Input
                      type="text"
                      label="Produtora"
                      placeholder="Ex: FFG"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.producer}
                      name="producer"
                      errors={props.errors}
                      touched={props.touched}
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={2} style={{ marginBottom: 5 }}>
                  <Grid item xs={12} sm={12} md={3}>
                    <Input
                      type="text"
                      label="Ano de lançamento"
                      placeholder="Ex: 2017"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.releaseYear}
                      name="releaseYear"
                      errors={props.errors}
                      touched={props.touched}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={5}>
                    <Input
                      type="text"
                      label="Especificação do suporte"
                      placeholder="Ex: 1 jogo eletrônico"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.supportSpecification}
                      name="supportSpecification"
                      errors={props.errors}
                      touched={props.touched}
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={2} style={{ marginBottom: 5 }}>
                  <Grid item xs={12} sm={12} md={3}>
                    <Input
                      name="accessedAtUrl"
                      type="date"
                      label="Data de acesso"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.accessedAtUrl}
                      errors={props.errors}
                      touched={props.touched}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={9}>
                    <Input
                      name="url"
                      label="Endereço (URL)"
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

export default SoftwareAndEletronicGame;
