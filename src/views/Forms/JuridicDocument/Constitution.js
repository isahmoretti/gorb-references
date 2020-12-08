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
import Nav from "../../../components/Header";

// utils
import { formatDate } from "../../../utils/formatDate";

import ArrowLeft from "../../../assets/images/arrow-left.svg";

// styles
import { Container, Card, Row, Content, Back, Actions, Title } from "./style";

const SignupSchema = Yup.object().shape({
  country: Yup.string().required("Obrigatório"),
  title: Yup.string().required("Obrigatório"),
  year: Yup.string().required("Obrigatório"),
});

const Constitution = ({ back }) => {
  const [state, setState] = useState({
    values: {},
    clearInitialValues: false,
  });

  const history = useHistory();

  const generateReference = (values) => {
    const {
      country,
      year,
      title,
      caption,
      responsible,
      edition,
      yearPublication,
      numberPages,
      location,
      publishingCompany,
      notes,
      online,
      url,
      accessedAt,
    } = values;

    return (
      <span>
        {`${country.toUpperCase()}. `}
        {`[Constituição (${year})]. `}
        {caption ? (
          <>
            <b>{title}:</b> {`${caption}. `}
          </>
        ) : (
          <b> {`${title}. `} </b>
        )}
        {responsible && `Organização do texto: ${responsible}. `}
        {edition && `${edition}. ed. `}
        {location && `${location}: `}
        {publishingCompany && `${publishingCompany}, `}
        {yearPublication && `${yearPublication}. `}
        {numberPages && `${numberPages}. p. `}
        {notes && `${notes}. `}
        {online &&
          accessedAt &&
          url &&
          `Disponível em: ${url}. Acesso em: ${formatDate(accessedAt)}. `}
      </span>
    );
  };

  const [openModal, setOpenModal] = useState(false);

  const handleSubmit = (values) => {
    const references = generateReference(values);

    setState((prev) => ({
      ...prev,
      values,
      references,
    }));

    setOpenModal(!openModal);
  };

  return (
    <>
      <Nav />
      <Container>
        <Back
          onClick={() => history.push("/documentos-juridicos")}
          src={ArrowLeft}
        />

        <Formik
          initialValues={{
            country: "",
            year: "",
            title: "",
            caption: "",
            responsible: "",
            edition: "",
            yearPublication: "",
            numberPages: "",
            location: "",
            publishingCompany: "",
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
                    Constituição
                  </p>
                </Title>
              </Actions>
              <Card>
                <Content>
                  <Grid container spacing={2} style={{ marginBottom: 5 }}>
                    <Grid item xs={12} sm={12} md={8}>
                      <Input
                        name="country"
                        label="País, Estado ou Município"
                        placeholder="Ex: Brasil"
                        type="text"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.country}
                        errors={props.errors}
                        touched={props.touched}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={4}>
                      <Input
                        name="year"
                        label="Ano de promulgação"
                        placeholder="Ex: 1988"
                        type="text"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.year}
                        errors={props.errors}
                        touched={props.touched}
                      />
                    </Grid>
                  </Grid>
                  <Grid container spacing={2} style={{ marginBottom: 0 }}>
                    <Grid item xs={12} sm={12} md={6}>
                      <Input
                        name="title"
                        label="Título"
                        placeholder="Ex: Constituição da República Federativa do Brasil"
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
                        name="caption"
                        label="Subtítulo"
                        placeholder="Ex: promulgada em 5 de outubro de 1988"
                        type="text"
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
                        name="responsible"
                        label="Responsável pela organização do texto"
                        placeholder="Ex: Juarez de Oliveira"
                        type="text"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.responsible}
                        errors={props.errors}
                        touched={props.touched}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={2}>
                      <Input
                        name="edition"
                        label="Edição"
                        placeholder="Ex: 4"
                        type="text"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.edition}
                        errors={props.errors}
                        touched={props.touched}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={2}>
                      <Input
                        name="yearPublication"
                        label="Ano de publicação"
                        placeholder="Ex: 1990"
                        type="text"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.yearPublication}
                        errors={props.errors}
                        touched={props.touched}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={3}>
                      <Input
                        name="numberPages"
                        label="Número de páginas ou volumes"
                        placeholder="Ex: 168"
                        type="text"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.numberPages}
                        errors={props.errors}
                        touched={props.touched}
                      />
                    </Grid>
                  </Grid>
                  <Grid container spacing={2} style={{ marginBottom: 5 }}>
                    <Grid item xs={12} sm={12} md={4}>
                      <Input
                        name="location"
                        label="Local de publicação"
                        placeholder="Ex: São Paulo"
                        type="text"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.location}
                        errors={props.errors}
                        touched={props.touched}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={4}>
                      <Input
                        name="publishingCompany"
                        label="Editora"
                        placeholder="Ex: Saraiva"
                        type="text"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.publishingCompany}
                        errors={props.errors}
                        touched={props.touched}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={4}>
                      <Input
                        name="notes"
                        label="Notas"
                        placeholder="Ex: Série Legislação Brasileira"
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
                {state.references && (
                  <Modal
                    isOpen={openModal}
                    handleClose={() => setOpenModal(!openModal)}
                    text={state.references}
                    // citationWithAuthor={state.citationWithAuthor}
                    // citation={state.citation}
                  />
                )}
              </Card>
            </form>
          )}
        </Formik>
      </Container>
    </>
  );
};

export default Constitution;
