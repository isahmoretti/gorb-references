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
import { formatDate } from "../../../utils/formatDate";
import { formatMonosyllable } from "../../../utils/monosyllable";

import ArrowLeft from "../../../assets/images/arrow-left.svg";

// styles
import { Container, Card, Row, Content, Back, Actions, Title } from "./style";

const SignupSchema = Yup.object().shape({
  title: Yup.string().required("Obrigatório"),
  year: Yup.string().required("Obrigatório"),
  time: Yup.string().required("Obrigatório"),
  responsible: Yup.string().required("Obrigatório"),
  url: Yup.string().required("Obrigatório"),
  accessedAt: Yup.string().required("Obrigatório"),
});

const generateReference = (values) => {
  const {
    title,
    subtitle,
    year,
    time,
    responsible,
    url,
    accessedAt,
    local,
    publisher,
  } = values;

  return (
    <span>
      {subtitle ? (
        <>
          {formatMonosyllable(title)}: {subtitle}.&nbsp;
        </>
      ) : (
        <>{formatMonosyllable(title)}. </>
      )}
      {local && `${local}, `}
      {publisher && `${publisher}, `}
      {!local && !publisher && <>[S. l.:s. n.], </>}
      {`${year}. `}
      {`1 vídeo (${time}). `}
      {`Publicado pelo ${responsible}. `}
      {accessedAt &&
        url &&
        `Disponível em: ${url}. Acesso em: ${formatDate(accessedAt)}. `}
    </span>
  );
};

const VideoInternet = ({ back }) => {
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
    }));

    setOpenModal(!openModal);
  };

  return (
    <>
      <Nav />
      <Container>
        <Back onClick={() => history.push("/audiovisual")} src={ArrowLeft} />

        <Formik
          initialValues={{
            title: "",
            subtitle: "",
            year: "",
            time: "",
            responsible: "",
            url: "",
            accessedAt: "",

            local: "",
            publisher: "",
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
                    Vídeo de Internet
                  </p>
                  <span>
                    Conteúdos de Youtube, Vimeo, DailyMotion, entre outras
                    plataformas de vídeo
                  </span>
                </Title>
              </Actions>
              <Card>
                <Content>
                  <Grid container spacing={2} style={{ marginBottom: 0 }}>
                    <Grid item xs={12} sm={12} md={6}>
                      <Input
                        type="text"
                        label="Título do vídeo"
                        placeholder="Ex: Eva Vertes olha para o futuro da medicina"
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
                        label="Subtítulo"
                        placeholder="Ex: Subtítulo (se houver)"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.subtitle}
                        name="subtitle"
                        errors={props.errors}
                        touched={props.touched}
                      />
                    </Grid>
                  </Grid>
                  <Grid container spacing={2} style={{ marginBottom: 0 }}>
                    <Grid item xs={12} sm={12} md={3}>
                      <Input
                        type="text"
                        label="Ano"
                        placeholder="Ex: 2015"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.year}
                        name="year"
                        errors={props.errors}
                        touched={props.touched}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={3}>
                      <Input
                        name="time"
                        type="text"
                        label="Tempo de duração"
                        placeholder="Ex: 10 min"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.time}
                        errors={props.errors}
                        touched={props.touched}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6}>
                      <Input
                        name="responsible"
                        type="text"
                        label="Responsabilidade"
                        placeholder="Ex: Canal TED Brasil"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.responsible}
                        errors={props.errors}
                        touched={props.touched}
                      />
                    </Grid>

                    <Grid item xs={12} sm={12} md={6}>
                      <Input
                        name="local"
                        type="text"
                        label="Local"
                        placeholder="Ex: Brasília"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.local}
                        errors={props.errors}
                        touched={props.touched}
                      />
                    </Grid>

                    <Grid item xs={12} sm={12} md={6}>
                      <Input
                        name="publisher"
                        type="text"
                        label="Publicadora"
                        placeholder="Ex: Publicadora"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.publisher}
                        errors={props.errors}
                        touched={props.touched}
                      />
                    </Grid>

                    <Grid item xs={12} sm={12} md={9}>
                      <Input
                        name="url"
                        label="Disponível em"
                        type="text"
                        placeholder="https://www.youtube.com/watch?v=wpLhm0UKTB"
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
    </>
  );
};

export default VideoInternet;
