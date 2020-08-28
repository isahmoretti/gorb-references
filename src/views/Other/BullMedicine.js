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
  name: Yup.string().required("Obrigatório"),
  medicineForm: Yup.string().required("Obrigatório"),
  responsible: Yup.string().required("Obrigatório"),
  manufacturer: Yup.string().required("Obrigatório"),
  year: Yup.string().required("Obrigatório"),
});

const generateReference = (values) => {
  const {
    name,
    medicineForm,
    responsible,
    location,
    manufacturer,
    year,
    note,
    online,
    accessedAt,
    url,
  } = values;

  return <span>
    {medicineForm ? <>{`${name.toUpperCase()}: ${medicineForm}. `}</> : `${name.toUpperCase()}. `}
    {responsible && <>Responsável técnico {responsible}. </>}
    {manufacturer ? <>{`${location}: ${manufacturer}, `}</> : `${location}, `}
    {year && <>{year}. </>}
    {note && <>{note}. </>}
    {online &&
      accessedAt &&
      url &&
      `Disponível em: ${url}. Acesso em: ${formatDate(accessedAt)}. `}
  </span>;
};

const BullMedicine = ({ back }) => {
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
          name: "",
          medicineForm: "",
          responsible: "",
          location: "",
          manufacturer: "",
          year: "",
          note: "",
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
                  BULA DE REMÉDIO
                </p>
                <span></span>
              </Title>
            </Actions>
            <Card>
              <Content>
                <Grid container spacing={2} style={{ marginBottom: 0 }}>
                  <Grid item xs={12} sm={12} md={8}>
                    <Input
                      name="name"
                      type="text"
                      label="Nome do medicamento"
                      placeholder="Ex: Pantoprazol sódico sesqui-hidratado"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.name}
                      errors={props.errors}
                      touched={props.touched}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={4}>
                    <Input
                      name="medicineForm"
                      type="text"
                      label="Forma do remédio:"
                      placeholder="Ex: comprimidos"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.medicineForm}
                      errors={props.errors}
                      touched={props.touched}
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={2} style={{ marginBottom: 0 }}>
                  <Grid item xs={12} sm={12} md={6}>
                    <Input
                      name="responsible"
                      type="text"
                      label="Responsável técnico"
                      placeholder="Ex: Alberto Jorge Garcia Guimarães"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.responsible}
                      errors={props.errors}
                      touched={props.touched}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={6}>
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
                </Grid>

                <Grid container spacing={2} style={{ marginBottom: 0 }}>
                  <Grid item xs={12} sm={12} md={5}>
                    <Input
                      name="manufacturer"
                      type="text"
                      label="Fabricante/Laboratório"
                      placeholder="Ex: Biosintética Farmacêutica Ltda"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.manufacturer}
                      errors={props.errors}
                      touched={props.touched}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={2}>
                    <Input
                      name="year"
                      type="text"
                      label="Ano"
                      placeholder="Ex: 2018"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.year}
                      errors={props.errors}
                      touched={props.touched}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={5}>
                    <Input
                      name="note"
                      type="text"
                      label="Nota indicativa"
                      placeholder="Ex: 1 bula de remédio. 2 p."
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.note}
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

export default BullMedicine;
