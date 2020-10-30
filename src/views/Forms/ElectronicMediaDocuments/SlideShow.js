import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import { Formik } from "formik";

import * as Yup from "yup";

import { Grid } from "@material-ui/core";

// components
import Input from "../../../components/InputWrapper/Input";
import Button from "../../../components/Buttons";
import Modal from "../../../components/Modal";
import Select from "../../../components/InputWrapper/Select";

// utils
import { formatDate } from "../../../utils/formatDate";
import { formatAuthorName } from "../../../utils/formatAuthorName";
import { generateCitationWithAuthor } from "../../../utils/generateCitationWithAuthor";
import { generateCitationWithoutAuthor } from "../../../utils/generateCitationWithoutAuthor";

import ArrowLeft from "../../../assets/images/arrow-left.svg";

// styles
import { Container, Card, Row, Content, Back, Actions, Title } from "./style";

const SignupSchema = Yup.object().shape({
  author: Yup.string().required("Obrigatório"),
  title: Yup.string().required("Obrigatório"),
  type: Yup.string().required("Obrigatório"),
  year: Yup.string().required("Obrigatório"),
});

const generateReference = (values) => {
  const {
    author,
    title,
    caption,
    day,
    month,
    year,
    type,
    local,
    producer,
    numberOfSlides,
    colorType,
    dimension,
    note,
    url,
    accessedAt,
  } = values;

  const getColorFormatted = (colorType) => {
    switch (colorType) {
      case "colorfull":
        return `color`;
      case "blackAndWhite":
        return `P&B`;
      default:
        break;
    }

    return;
  };
  return (
    <span>
      {author && <>{formatAuthorName(author)}</>}

      {caption ? (
        <>
          <b> {title}: </b>
          {caption}.{" "}
        </>
      ) : (
        <b>{title}. </b>
      )}

      {local && <>{local}. </>}
      {producer && <>{producer}. </>}

      {day && month && year && `${day} ${month}. ${year} `}
      {!day && month && year && `${month}. ${year} `}
      {!day && !month && year && `${year}. `}

      {type && <>{type}. </>}
      {numberOfSlides && <>{numberOfSlides} slides. </>}
      {colorType && <>{getColorFormatted(colorType)}, </>}
      {dimension && <>{dimension}. </>}
      {note && <>{note}. </>}
      {accessedAt &&
        url &&
        ` Disponível em: ${url}. Acesso em: ${formatDate(accessedAt)}. `}
    </span>
  );
};

const SlideShow = ({ back }) => {
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
        values.author,
        String(values.year)
      ),
      citation: generateCitationWithoutAuthor(
        values.author,
        String(values.year)
      ),
    }));

    setOpenModal(!openModal);
  };

  return (
    <Container>
      <Back onClick={() => history.push('/meio-eletronico')} src={ArrowLeft} />

      <Formik
        initialValues={{
          author: "",
          title: "",
          caption: "",
          day: "",
          month: "",
          year: "",
          type: "",
          local: "",
          producer: "",
          numberOfSlides: "",
          colorType: "",
          dimension: "",
          note: "",
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
                  SLIDES
                </p>
                Power Point, Open Office, Prezi etc
              </Title>
            </Actions>
            <Card>
              <Content>
                <Grid container spacing={2} style={{ marginBottom: 5 }}>
                  <Grid item xs={12} sm={12} md={6}>
                    <Input
                      type="text"
                      label="Nome do autor"
                      placeholder="Ex: Ana Carolina Puga"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.author}
                      name="author"
                      errors={props.errors}
                      touched={props.touched}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={6}>
                    <Input
                      type="text"
                      label="Título da apresentação"
                      placeholder="Ex: Ozonioterapia na Biomedicina"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.title}
                      name="title"
                      errors={props.errors}
                      touched={props.touched}
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={2} style={{ marginBottom: 5 }}>
                  <Grid item xs={12} sm={12} md={3}>
                    <Input
                      type="text"
                      label="Subtítulo"
                      placeholder="Ex: Subtítulo, se houver"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.caption}
                      name="caption"
                      errors={props.errors}
                      touched={props.touched}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={3}>
                    <Input
                      name="day"
                      type="number"
                      label="Dia da apresentação"
                      placeholder="Ex: 24"
                      InputProps={{ inputProps: { min: 0 } }}
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.day}
                      errors={props.errors}
                      touched={props.touched}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={3}>
                    <Select
                      name="month"
                      label="Mês da apresentação"
                      type="text"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.month}
                      errors={props.errors}
                      touched={props.touched}
                      options={[
                        { value: "jan", name: "Janeiro" },
                        { value: "fev", name: "Fevereiro" },
                        { value: "mar", name: "Março" },
                        { value: "abr", name: "Abril" },
                        { value: "mai", name: "Maio" },
                        { value: "jun", name: "Junho" },
                        { value: "jul", name: "Julho" },
                        { value: "ago", name: "Agosto" },
                        { value: "set", name: "Setembro" },
                        { value: "out", name: "Outubro" },
                        { value: "nov", name: "Novembro" },
                        { value: "dev", name: "Dezembro" },
                      ]}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={3}>
                    <Input
                      type="number"
                      label="Ano da apresentação"
                      placeholder="Ex: 2020"
                      InputProps={{ inputProps: { min: 0 } }}
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.year}
                      name="year"
                      errors={props.errors}
                      touched={props.touched}
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={2} style={{ marginBottom: 5 }}>
                  <Grid item xs={12} sm={12} md={4}>
                    <Input
                      label="Tipo de apresentação"
                      type="text"
                      placeholder="Ex: Apresentação de Power Point"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.type}
                      name="type"
                      errors={props.errors}
                      touched={props.touched}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={4}>
                    <Input
                      type="text"
                      label="Local"
                      placeholder="Ex: Sertãozinho, SP"
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
                      placeholder="Ex: SBBME"
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
                      label="N° de Slides"
                      placeholder="Ex: 52"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.numberOfSlides}
                      name="numberOfSlides"
                      errors={props.errors}
                      touched={props.touched}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={4}>
                    <Select
                      label="Colorido ou Preto e Branco"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.colorType}
                      name="colorType"
                      options={[
                        { value: "colorfull", name: "Colorido" },
                        { value: "blackAndWhite", name: "Preto e branco" },
                      ]}
                      errors={props.errors}
                      touched={props.touched}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={5}>
                    <Input
                      type="text"
                      label="Notas"
                      placeholder="Ex: Informações complementares"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.note}
                      name="note"
                      errors={props.errors}
                      touched={props.touched}
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={2} style={{ marginBottom: 5 }}>
                  <Grid item xs={12} sm={12} md={9}>
                    <Input
                      type="text"
                      label="Disponível em"
                      placeholder="Ex: https://pt.slideshare.net/biomedicinaestetica/ozonioterapia-na-biomedicina"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.url}
                      name="url"
                      errors={props.errors}
                      touched={props.touched}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={3}>
                    <Input
                      type="date"
                      label="Acesso em"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.accessedAt}
                      name="accessedAt"
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

export default SlideShow;
