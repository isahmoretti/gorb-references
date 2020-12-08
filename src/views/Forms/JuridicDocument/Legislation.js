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
  numbering: Yup.string().required("Obrigatório"),
  publicationDate: Yup.string().required("Obrigatório"),
  publicationTitle: Yup.string().required("Obrigatório"),
  local: Yup.string().required("Obrigatório"),
});

const generateReference = (values) => {
  const {
    jurisdiction,
    title,
    numbering,
    caption,
    menu,
    publicationDate,
    publicationTitle,
    captionPublication,
    sessionNumber,
    local,
    initialPage,
    finalPage,
    notes,
    online,
    url,
    accessedAt,
  } = values;

  return (
    <span>
      {jurisdiction && <>{jurisdiction.toUpperCase()}. </>}
      {title && <>{title} </>}
      {!numbering && <>, </>}
      {numbering && <>nº {numbering}, </>}
      {caption && <>{caption}. </>}
      {menu && <>{menu}. </>}

      {captionPublication ? (
        <>
          <b>{publicationTitle}: </b>
          {captionPublication}.{" "}
        </>
      ) : (
        <b>{publicationTitle}. </b>
      )}

      {sessionNumber && <>seção {sessionNumber}, </>}

      {local && <>{local}, </>}

      {notes && <>{notes}. </>}

      {initialPage && !finalPage && <>p. {initialPage}, </>}

      {initialPage && finalPage && (
        <>
          p. {initialPage}-{finalPage},{" "}
        </>
      )}
      {publicationDate && <>{formatDate(publicationDate)}. </>}
      {online && accessedAt && url && (
        <>
          {online &&
            accessedAt &&
            url &&
            ` Disponível em: ${url}. Acesso em: ${formatDate(accessedAt)}. `}
        </>
      )}
    </span>
  );
};

const Legislation = ({ back }) => {
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
        values.publicationDate
      ),
      citation: generateCitationWithoutAuthor(
        values.jurisdiction,
        values.publicationDate
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
          title: "",
          numbering: "",
          caption: "",
          menu: "",
          publicationDate: "",
          publicationTitle: "",
          captionPublication: "",
          sessionNumber: "",
          local: "",
          initialPage: "",
          finalPage: "",
          notes: "",
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
                  Legislação
                </p>
                <span>Inclui leis e decretos</span>
              </Title>
            </Actions>
            <Card>
              <Content>
                <Grid container spacing={2} style={{ marginBottom: 5 }}>
                  <Grid item xs={12} sm={12} md={4}>
                    <Input
                      type="text"
                      label="Jurisdição ou Cabeçalho da Entidade"
                      placeholder="Ex: Brasil"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.jurisdiction}
                      name="jurisdiction"
                      errors={props.errors}
                      touched={props.touched}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={4}>
                    <Input
                      type="text"
                      label="Título"
                      placeholder="Ex: Lei"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.title}
                      name="title"
                      errors={props.errors}
                      touched={props.touched}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={4}>
                    <Input
                      type="text"
                      label="Numeração"
                      placeholder="Ex: 10.406"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.numbering}
                      name="numbering"
                      errors={props.errors}
                      touched={props.touched}
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={2} style={{ marginBottom: 5 }}>
                  <Grid item xs={12} sm={12} md={4}>
                    <Input
                      type="text"
                      label="Subtítulo"
                      placeholder="Ex: de 10 de janeiro de 2002"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.caption}
                      name="caption"
                      errors={props.errors}
                      touched={props.touched}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={8}>
                    <Input
                      type="text"
                      label="Ementa"
                      placeholder="Ex: Institui o Código Civil"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.menu}
                      name="menu" // ementa
                      errors={props.errors}
                      touched={props.touched}
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={2} style={{ marginBottom: 5 }}>
                  <Grid item xs={12} sm={12} md={4}>
                    <Input
                      type="date"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.publicationDate}
                      label="Data de publicação"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      name="publicationDate"
                      errors={props.errors}
                      touched={props.touched}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={4}>
                    <Input
                      type="text"
                      label="Título da Publicação"
                      placeholder="Ex: Diário Oficial da União"
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
                      placeholder="EX: se houver"
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
                      placeholder="Ex: 7"
                      label="Nº da Seção"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.sessionNumber}
                      name="sessionNumber"
                      errors={props.errors}
                      touched={props.touched}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={3}>
                    <Input
                      type="text"
                      label="Local"
                      placeholder="Ex: Brasília"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.local}
                      name="local"
                      errors={props.errors}
                      touched={props.touched}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={3}>
                    <Input
                      type="text"
                      label="Página inicial"
                      placeholder="Ex: 1"
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
                      placeholder="Ex: 74"
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
                  <Grid item xs={12} sm={12} md={8}>
                    <Input
                      type="text"
                      label="Notas"
                      placeholder="Ex: ano 139, n. 8"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.notes}
                      name="notes"
                      errors={props.errors}
                      touched={props.touched}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={4}>
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
                  <Grid item xs={12} sm={12} md={8}>
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
                  <Grid item xs={12} sm={12} md={4}>
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

export default Legislation;
