import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import { Formik } from "formik";

import * as Yup from "yup";

import { Grid } from "@material-ui/core";

// components
import Input from "../../../components/InputWrapper/Input";
import Button from "../../../components/Buttons";
import Modal from "../../../components/Modal";
import Nav from "../../../components/Header";

// utils
import { formatAuthorName } from "../../../utils/formatAuthorName";
import { generateCitationWithAuthor } from "../../../utils/generateCitationWithAuthor";
import { generateCitationWithoutAuthor } from "../../../utils/generateCitationWithoutAuthor";

import ArrowLeft from "../../../assets/images/arrow-left.svg";

// styles
import { Container, Card, Row, Content, Back, Actions, Title } from "./style";

const SignupSchema = Yup.object().shape({
  author: Yup.string().required("Obrigatório"),
  title: Yup.string().required("Obrigatório"),
  year: Yup.string().required("Obrigatório"),
  specification: Yup.string().required("Obrigatório"),
});

const generateReference = (values) => {
  const {
    author,
    title,
    location,
    manufacturer,
    year,
    specification,
    note,
  } = values;

  return (
    <span>
      {author && <>{formatAuthorName(author)} </>}
      {title && <b>{title}. </b>}
      {manufacturer ? <>{`${location}: ${manufacturer}, `}</> : `${location}, `}
      {year && <>{year}. </>}
      {specification && <>{specification}. </>}
      {note && <>{note}. </>}
    </span>
  );
};

const ObjectThree = ({ back }) => {
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
      citation: generateCitationWithoutAuthor(values.author, values.year),
      citationWithAuthor: generateCitationWithAuthor(
        values.author,
        values.year
      ),
    }));

    setOpenModal(!openModal);
  };

  return (
    <>
      <Nav />
      <Container>
        <Back onClick={() => history.push("/outros")} src={ArrowLeft} />

        <Formik
          initialValues={{
            author: "",
            title: "",
            location: "",
            manufacturer: "",
            year: "",
            specification: "",
            note: "",
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
                    Tridimensional
                  </p>
                  <span>
                    Inclui fósseis, esqueletos, esculturas, animais empalhados,
                    maquetes, monumentos
                  </span>
                </Title>
              </Actions>
              <Card>
                <Content>
                  <Grid container spacing={2} style={{ marginBottom: 0 }}>
                    <Grid item xs={12} sm={12} md={6}>
                      <Input
                        name="author"
                        type="text"
                        label="Autor"
                        placeholder="Ex: Marcel Duchamp"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.author}
                        errors={props.errors}
                        touched={props.touched}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6}>
                      <Input
                        name="title"
                        type="text"
                        label="Título"
                        placeholder="Ex: Roda de bicicleta"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.title}
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
                        placeholder="Ex: Paris"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.location}
                        errors={props.errors}
                        touched={props.touched}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={5}>
                      <Input
                        name="manufacturer"
                        type="text"
                        label="Produtor ou fabricante"
                        placeholder="Ex: Nome do
                      fabricante, se houver"
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
                        placeholder="Ex: 1951"
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
                        name="specification"
                        type="text"
                        label="Especificação do documento tridimensional"
                        placeholder="Ex: 1 escultura de com roda de bicicleta e banco de
                      madeira"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.specification}
                        errors={props.errors}
                        touched={props.touched}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6}>
                      <Input
                        name="note"
                        type="text"
                        label="Nota"
                        placeholder="Ex: Informações complementares sobre o objeto"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.note}
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
    </>
  );
};

export default ObjectThree;
