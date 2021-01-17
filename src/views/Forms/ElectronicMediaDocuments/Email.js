import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import { Formik } from "formik";

import * as Yup from "yup";

import { Grid } from "@material-ui/core";

// components
import Input from "../../../components/InputWrapper/Input";
import Select from "../../../components/InputWrapper/Select";
import Button from "../../../components/Buttons";
import Modal from "../../../components/Modal";
import Nav from "../../../components/Header";
import Footer from "../../../components/Footer";

// utils
import { formatDate } from "../../../utils/formatDate";
import { formatAuthorName } from "../../../utils/formatAuthorName";
import { generateCitationWithAuthor } from "../../../utils/generateCitationWithAuthor";
import { generateCitationWithoutAuthor } from "../../../utils/generateCitationWithoutAuthor";

import ArrowLeft from "../../../assets/images/arrow-left.svg";
import Img from "../../../assets/images/explicativos/eletronicos/referencia-abnt-email.jpg";

// styles
import { Container, Card, Row, Content, Back, Actions, Title } from "./style";

const SignupSchema = Yup.object().shape({
  type: Yup.string().required("Obrigatório"),
  sender: Yup.string().required("Obrigatório"),
  subject: Yup.string().required("Obrigatório"),
  recipient: Yup.string().required("Obrigatório"),
  sendDate: Yup.string().required("Obrigatório"),
  supportSpecification: Yup.string().required("Obrigatório"),
});

const generateReference = (values) => {
  const {
    type,
    sender,
    subject,
    recipient,
    publicationLocal,
    sendDate,
    supportSpecification,
  } = values;

  const handleType = (text) => {
    if (text === "fisico") return formatAuthorName(sender);
    if (text === "entity") return <>{sender}. </>;
  };

  return (
    <span>
      {<>{handleType(type)}</>}
      {subject && <b>{subject}. </b>}
      {<>Destinatário: {recipient}. </>}
      {publicationLocal ? <>{publicationLocal}: </> : <i>[S.l.]. </i>}
      {<>{formatDate(sendDate)}. </>}
      {supportSpecification}.
    </span>
  );
};

const Email = ({ back }) => {
  const [state, setState] = useState({
    values: {},
    clearInitialValues: false,
  });

  const [openModal, setOpenModal] = useState(false);

  const history = useHistory();

  const handleCitation1 = (name, date) => {
    const year = date.split("-")[0];

    return `${name} (${year})`;
  };

  const handleCitation2 = (name, date) => {
    const year = date.split("-")[0];

    return `(${name.toUpperCase()}, ${year})`;
  };

  const handleSubmit = (values) => {
    setState((prev) => ({
      ...prev,
      values,
      references: generateReference(values),
      citationWithAuthor:
        values.type === "entity"
          ? handleCitation1(values.sender, values.sendDate)
          : generateCitationWithAuthor(values.sender, values.sendDate),
      citation:
        values.type === "entity"
          ? handleCitation2(values.sender, values.sendDate)
          : generateCitationWithoutAuthor(values.sender, values.sendDate),
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
            type: "",
            sender: "",
            subject: "",
            recipient: "",
            publicationLocal: "",
            sendDate: "",
            supportSpecification: "",
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
                    Email
                  </p>
                </Title>
              </Actions>
              <Card>
                <p>
                  Preencha o formulário com informações sobre a obra consultada:
                </p>
                <Content>
                  <Grid container spacing={2} style={{ marginBottom: 5 }}>
                    <Grid item xs={12} sm={12} md={3}>
                      <Select
                        name="type"
                        label="Tipo de remetente"
                        type="text"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.type}
                        errors={props.errors}
                        touched={props.touched}
                        options={[
                          { value: "fisico", name: "Pessoa física" },
                          { value: "entity", name: "Entidade" },
                        ]}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={4}>
                      <Input
                        type="text"
                        label="Remetente"
                        placeholder="Ex: SIBi – Sistema Integrado de Bibliotecas."
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.sender}
                        name="sender"
                        errors={props.errors}
                        touched={props.touched}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={5}>
                      <Input
                        type="text"
                        label="Assunto"
                        placeholder="Ex: Portal de Revistas da USP tem novo design"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.subject}
                        name="subject"
                        errors={props.errors}
                        touched={props.touched}
                      />
                    </Grid>
                  </Grid>
                  <Grid container spacing={2} style={{ marginBottom: 5 }}>
                    <Grid item xs={12} sm={12} md={6}>
                      <Input
                        type="text"
                        label="Destinatário"
                        placeholder="Ex: Rede de bibliotecas do SIBi"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.recipient}
                        name="recipient"
                        errors={props.errors}
                        touched={props.touched}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6}>
                      <Input
                        type="text"
                        label="Local de envio"
                        placeholder="Ex: São Paulo"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.publicationLocal}
                        name="publicationLocal"
                        errors={props.errors}
                        touched={props.touched}
                      />
                    </Grid>
                  </Grid>
                  <Grid container spacing={2} style={{ marginBottom: 5 }}>
                    <Grid item xs={12} sm={12} md={3}>
                      <Input
                        type="date"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        label="Data de envio"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.sendDate}
                        name="sendDate"
                        errors={props.errors}
                        touched={props.touched}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={5}>
                      <Input
                        type="text"
                        label="Especificações do suporte"
                        placeholder="Ex: 1 mensagem eletrônica"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.supportSpecification}
                        name="supportSpecification"
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
        <h1>Referência bibliográfica de e-mail (ABNT)</h1>

        <p>
          A referência bibliográfica de e-mail no trabalho acadêmico pede
          atenção para quatro itens especiais: remetente, destinatário, data de
          envio e especificação do suporte.
        </p>

        <p>
          A Associação Brasileira de Normas Técnicas (ABNT) ensina como
          referenciar mensagens eletrônicas na NBR 6023. Esse é um dos itens da
          seção de "Documento de acesso exclusivo em meio eletrônico".
        </p>

        <p>
          Quando o remetente é uma entidade coletiva (empresa, órgão do governo
          ou associação), o nome do autor é escrito por extenso. Por outro lado,
          se for uma pessoa física, o autor deve ser indicado pelo último
          sobrenome, em letras maiúsculas, seguido do prenome.
        </p>

        <h3>Elementos importantes para referência de e-mail</h3>

        <p>
          Para referenciar correspondência via e-mail, os elementos essenciais
          são:
        </p>

        <ul style={{ marginLeft: 15 }}>
          <li>
            {" "}
            <b>Remetente:</b> nome da pessoa ou entidade que envia a mensagem;{" "}
          </li>
          <li>
            {" "}
            <b>Destinatário:</b> nome da pessoa ou entidade que recebe a
            mensagem, precedido pela expressão Destinatário:;{" "}
          </li>
          <li>
            {" "}
            <b>Assunto:</b> Título da mensagem em negrito;{" "}
          </li>
          <li>
            {" "}
            <b>Local:</b> cidade onde aconteceu o envio;{" "}
          </li>
          <li>
            {" "}
            <b>Data de envio:</b> dia, mês e ano do envio da mensagem;{" "}
          </li>
          <li>
            {" "}
            <b>Descrição física do meio eletrônico:</b> 1 mensagem eletrônica.{" "}
          </li>
        </ul>

        <p>
          Quando julgar necessário, você pode incluir elementos complementares
          na referência bibliográfica de e-mail, a fim de melhorar a
          identificação do documento.
        </p>

        <p>
          Caso não exista título no assunto, deve-se escolher uma palavra ou
          frase capaz de identificar o documento. Coloque a expressão entre
          colchetes [ ].
        </p>

        <h3>Formato básico</h3>

        <p>
          <mark>
            ÚLTIMO SOBRENOME, Primeira parte do nome. <b>Assunto da mensagem</b>
            . Destinatário: Nome do destinatário. Local, dia, mês e ano de
            envio. Especificação do suporte.
          </mark>
        </p>

        <h3>Exemplo com autor entidade</h3>

        <p>
          <mark>
            SIBi – Sistema Integrado de Bibliotecas.{" "}
            <b>Portal de Revistas da USP tem novo design.</b> Destinatário: Rede
            de bibliotecas do SIBi.. São Paulo: 18 mar. 2020. 1 mensagem
            eletrônica.
          </mark>
        </p>

        <h3>Exemplo com autor pessoa física</h3>

        <p>
          <mark>
            NEVES, Bianca. <b>Relatório de desempenho</b>. Destinatário: Nila
            Maria. São Paulo: 18 mar. 2020. 1 mensagem eletrônica.
          </mark>
        </p>

        <img src={Img} alt="email" width="100%" />

        <h3>Como fica a referência em caso de bilhete, carta ou cartão?</h3>

        <p>
          Correspondências que não são eletrônicas possuem uma formatação
          específica, que lembra a mensagem de e-mail. Os elementos obrigatórios
          são: remetente, título, destinatário, local, data e descrição física
          do suporte.
        </p>

        <h3>Exemplos</h3>

        <p>
          <mark>
            FERREIRA, Paulo. <b>[Correspondência]</b>. Destinatário: José Clóvis
            Ferreira. Ribeirão Preto, 6 jun. 1996. 1 carta.
          </mark>
        </p>

        <p>
          Em caso de correspondências consultadas online, é fundamental
          mencionar a URL e a data de acesso.
        </p>

        <p>
          <mark>
            LISPECTOR, Clarice. <b>[Carta enviada para suas irmãs]</b>.
            Destinatário: Elisa e Tânia Lispector. Lisboa, 4 ago. 1944. 1 carta.
            Disponível em:
            http://www.claricelispector.com.br/manuscrito_minhasqueridas.aspx.
            Acesso em: 4 set. 2010.
          </mark>
        </p>
      </div>
      <Footer />
    </>
  );
};

export default Email;
