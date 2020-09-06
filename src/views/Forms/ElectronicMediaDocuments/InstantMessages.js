import React, { useState } from "react";

import { Formik } from "formik";

import * as Yup from "yup";

import { Grid } from "@material-ui/core";

// components
import Input from "../../../components/InputWrapper/Input";
import Button from "../../../components/Buttons";
import Modal from "../../../components/Modal";

// utils
import { formatDate } from "../../../utils/formatDate";
import { formatTime } from "../../../utils/formatTime";
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
  sendDate: Yup.string().required("Obrigatório"),
  description: Yup.string().required("Obrigatório"),
});

const generateReference = (values) => {
  const {
    author,
    title,
    type,
    complementaryElements,
    sendDate,
    schedule,
    description,
  } = values;

  return (
    <span>
      {author && <>{formatAuthorName(author)} </>}
      {title && <b>[{title}]. </b>}
      {type && complementaryElements ? <>{type}: </> : <>{type}. </>}
      {complementaryElements && <>[{complementaryElements}]. </>}
      {sendDate && <>{formatDate(sendDate)}. </>}
      {schedule && <>{formatTime(schedule)}. </>}
      {description && <>{description}. </>}
    </span>
  );
};

const InstantMessages = ({ back }) => {
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
      citationWithAuthor: generateCitationWithAuthor(
        values.author,
        values.sendDate
      ),
      citation: generateCitationWithoutAuthor(values.author, values.sendDate),
    }));

    setOpenModal(!openModal);
  };

  return (
    <Container>
      <Back onClick={back} src={ArrowLeft} />

      <Formik
        initialValues={{
          author: "",
          title: "",
          type: "",
          complementaryElements: "",
          sendDate: "",
          schedule: "",
          description: "",
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
                  Mensagens instantâneas
                </p>
                Mensagens enviadas por WhatsApp e Telegram
              </Title>
            </Actions>
            <Card>
              <Content>
                <Grid container spacing={2} style={{ marginBottom: 5 }}>
                  <Grid item xs={12} sm={12} md={6}>
                    <Input
                      type="text"
                      label="Autor"
                      placeholder="Ex: Maria Paula Souza"
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
                      label="Título da informação"
                      placeholder="Ex: Uso da biblioteca pelos alunos do ensino médio"
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
                  <Grid item xs={12} sm={12} md={6}>
                    <Input
                      type="text"
                      label="Tipo de aplicativo"
                      placeholder="Ex: WhatsApp"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.type}
                      name="type"
                      errors={props.errors}
                      touched={props.touched}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={6}>
                    <Input
                      type="text"
                      label="Elemento complementar"
                      placeholder="Ex: Grupo de funcionários EE. Prof. Baltazar de Godoy Moreira"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.complementaryElements}
                      name="complementaryElements"
                      errors={props.errors}
                      touched={props.touched}
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={2} style={{ marginBottom: 5 }}>
                  <Grid item xs={12} sm={12} md={3}>
                    <Input
                      type="date"
                      label="Data de envio"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      value={props.values.sendDate}
                      name="sendDate"
                      errors={props.errors}
                      touched={props.touched}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={2}>
                    <Input
                      type="time"
                      label="Horário"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.schedule}
                      name="schedule"
                      errors={props.errors}
                      touched={props.touched}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={7}>
                    <Input
                      type="text"
                      label="Descrição"
                      placeholder="Ex: 1 mensagem de WhatsApp"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.description}
                      name="description"
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

export default InstantMessages;
