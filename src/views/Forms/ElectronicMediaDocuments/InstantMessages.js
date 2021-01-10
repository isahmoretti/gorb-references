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
import Footer from "../../../components/Footer";

// utils
import { formatDate } from "../../../utils/formatDate";
import { formatTime } from "../../../utils/formatTime";
import { formatAuthorName } from "../../../utils/formatAuthorName";
import { generateCitationWithAuthor } from "../../../utils/generateCitationWithAuthor";
import { generateCitationWithoutAuthor } from "../../../utils/generateCitationWithoutAuthor";

import ArrowLeft from "../../../assets/images/arrow-left.svg";
import Img from "../../../assets/images/change/Mensagens instantâneas.jpg";

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

  const history = useHistory();

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
    <>
      <Nav />
      <Container>
        <Back
          onClick={() => history.push("/meio-eletronico")}
          src={ArrowLeft}
        />

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
                <p>
                  Preencha o formulário com informações sobre a obra consultada:
                </p>
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
      <div
        className="container"
        style={{ paddingBottom: "40px", maxWidth: 830 }}
      >
        <h1>Referência de mensagens instantâneas (ABNT)</h1>
        <p>
          A Associação Brasileira de Normas Técnicas (ABNT) agora reconhece
          mensagens instantâneas como documentos que podem ser referenciados em
          trabalhos acadêmicos. Essa categoria inclui comunicações enviadas por
          aplicativos como WhatsApp e Telegram.
        </p>

        <h3>Elementos que compõem a referência</h3>
        <ul>
          <li>
            {" "}
            <b>Autor:</b> nome de quem enviou a mensagem;{" "}
          </li>
          <li>
            {" "}
            <b>Título:</b> título da informação em negrito;{" "}
          </li>
          <li>
            {" "}
            <b>Tipo de aplicativo:</b> WhatsApp, Instagram ou outro app;{" "}
          </li>
          <li>
            {" "}
            <b>Elementos complementares:</b> informações que ajudam a
            identificar melhor o documento;{" "}
          </li>
          <li>
            {" "}
            <b>Data de envio:</b> dia, mês e ano;{" "}
          </li>
          <li>
            {" "}
            <b>Horário:</b> horário de envio da mensagem;{" "}
          </li>
          <li>
            {" "}
            <b>Suporte:</b> descrição do meio eletrônico.{" "}
          </li>
        </ul>

        <p>
          Quando uma mensagem não tem título, você deve seguir a recomendação do
          item 8.2.7, da NBR 6023. Essa seção recomenda atribuir uma palavra ou
          frase que identifique o conteúdo do documento, entre colchetes.
        </p>
        <h3>Formato básico</h3>
        <p>
          <mark>
            SOBRENOME, Nome do autor. <b>[Título da informação]</b>. Tipo de
            aplicativo: [elemento complementar]. Data de envio. Horário.
            Descrição do meio eletrônico.
          </mark>
        </p>
        <h3>Exemplos aplicando o formato básico</h3>
        <img src={Img} alt="mensagem-instatanea" width="100%" />

        <p>
          <mark>
            SOUZA, Maria Paula.{" "}
            <b>[Uso da biblioteca pelos alunos do ensino médio]</b>. WhatsApp:
            [Grupo de funcionários EE. Prof. Baltazar de Godoy Moreira]. 7 out.
            2017. 15h30. 1 mensagem de WhatsApp.
          </mark>
        </p>

        <p>
          <mark>
            DIAS, Almiro.{" "}
            <b>[Orçamento do marceneiro para móveis planejados]</b>. WhatsApp:
            [Grupo sobre a reforma do restaurante]. 7 jul. 2020. 20h33. 1
            mensagem de WhatsApp.
          </mark>
        </p>

        <p>
          <mark>
            SOUZA, Leandro. <b>[Uso da brinquedoteca]</b>. WhatsApp: [Grupo
            Condomínio Recanto da Mata]. 8 out. 2020. 16:30. 1 mensagem de
            WhatsApp.
          </mark>
        </p>

        <h3>E se a mensagem for enviada por uma entidade coletiva?</h3>

        <p>
          Quando a mensagem é encaminhada por uma empresa, associação ou órgão
          público, o nome do autor deve ser escrito por extenso. Gere a
          referência no GORB e faça apenas essa alteração.
        </p>

        <p>Veja um exemplo:</p>

        <p>
          <mark>
            CLÍNICA DE ESTÉTICA BELA.{" "}
            <b>[Desconto para sessões de depilação a laser]</b>. WhatsApp:
            [Mensagem enviada para os clientes]. 7 jun. 2020. 20h33. 1 mensagem
            de WhatsApp.
          </mark>
        </p>
      </div>
      <Footer />
    </>
  );
};

export default InstantMessages;
