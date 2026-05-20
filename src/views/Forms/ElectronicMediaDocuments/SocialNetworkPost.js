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
import { formatMessage } from "../../../utils/formatMessage";
import { generateCitationWithAuthor } from "../../../utils/generateCitationWithAuthor";
import { generateCitationWithoutAuthor } from "../../../utils/generateCitationWithoutAuthor";

import ArrowLeft from "../../../assets/images/arrow-left.svg";
import Img from "../../../assets/images/change/Postagem em rede social.jpg";

// styles
import { Container, Card, Row, Content, Back, Actions, Title } from "./style";

const SignupSchema = Yup.object().shape({
  type: Yup.string().required("Obrigatório"),
  firstName: Yup.string().required("Obrigatório"),
  lastSurname: Yup.string().required("Obrigatório"),
  // message: Yup.string().required("Obrigatório"),
  publicationDate: Yup.string().required("Obrigatório"),
  accountAddress: Yup.string().required("Obrigatório"),
  url: Yup.string().required("Obrigatório"),
  accessedAt: Yup.string().required("Obrigatório"),
});

const generateReference = (values) => {
  document.title = "Postagem em Rede Social: Referência ABNT";
  const {
    type,
    firstName,
    lastSurname,
    message,
    local,
    publicationDate,
    accountAddress,
    url,
    accessedAt,
  } = values;

  return (
    <span>
      {lastSurname && <>{lastSurname.toUpperCase()}, </>}
      {firstName && <>{firstName}. </>}
      {message && <b>{formatMessage(message)}. </b>}
      {local ? <>{local}, </> : <i>[S.l.]. </i>}
      {publicationDate && <>{formatDate(publicationDate)}. </>}
      {type && <>{type}: </>}
      {accountAddress && <>{accountAddress}. </>}
      {accessedAt &&
        url &&
        ` Disponível em: ${url}. Acesso em: ${formatDate(accessedAt)}. `}
    </span>
  );
};

const SocialNetworkPost = ({ back }) => {
  const [state, setState] = useState({
    values: {},
    clearInitialValues: false,
  });

  const [openModal, setOpenModal] = useState(false);

  const history = useHistory();

  const handleCitation = (text, yaer) => {
    const date = yaer.split("-")[0];
    return {
      cit1: `${text} (${date})`,
      cit2: `(${text.toUpperCase()}, ${date})`,
    };
  };

  const handleSubmit = (values) => {
    setState((prev) => ({
      ...prev,
      values,
      references: generateReference(values),
      citationWithAuthor: handleCitation(
        values.lastSurname,
        values.publicationDate
      ).cit1,
      citation: handleCitation(values.lastSurname, values.publicationDate).cit2,
    }));

    setOpenModal(!openModal);
  };

  return (
    <>
      <Nav />
      <Container>
        <Back
          onClick={() => history.push("/documentos-de-meio-eletronico")}
          src={ArrowLeft}
        />

        <Formik
          initialValues={{
            type: "",
            firstName: "",
            lastSurname: "",
            message: "",
            local: "",
            publicationDate: "",
            accountAddress: "",
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
                    Postagem em rede social
                  </p>
                  Publicações em Facebook, Twitter, Instagram e outras redes
                  sociais digitais.
                </Title>
              </Actions>
              <Card>
                <p>
                  Preencha o formulário com informações sobre a obra consultada:
                </p>
                <Content>
                  <Grid container spacing={2} style={{ marginBottom: 5 }}>
                    <Grid item xs={12} sm={12} md={4}>
                      <Select
                        type="text"
                        label="Tipo de meio"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.type}
                        name="type"
                        errors={props.errors}
                        touched={props.touched}
                        options={[
                          { value: "Twitter", name: "Twitter" },
                          { value: "Facebook", name: "Facebook" },
                          { value: "Instagram", name: "Instagram" },
                        ]}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={8}>
                      <Input
                        type="text"
                        label="Primeira parte do nome do Autor ou Entidade"
                        placeholder="Ex: Agência Nacional de Vigilância Sanitária"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.firstName}
                        name="firstName"
                        errors={props.errors}
                        touched={props.touched}
                      />
                    </Grid>
                  </Grid>
                  <Grid container spacing={2} style={{ marginBottom: 5 }}>
                    <Grid item xs={12} sm={12} md={7}>
                      <Input
                        type="text"
                        label="Último Sobrenome do Autor"
                        placeholder="Ex: ANVISA"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.lastSurname}
                        name="lastSurname"
                        errors={props.errors}
                        touched={props.touched}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={5}>
                      <Input
                        type="text"
                        name="local"
                        label="Local de envio"
                        placeholder="Ex: Brasília"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.local}
                        errors={props.errors}
                        touched={props.touched}
                      />
                    </Grid>
                  </Grid>
                  <Grid container spacing={2} style={{ marginBottom: 5 }}>
                    <Grid item xs={12} sm={12} md={12}>
                      <Input
                        type="text"
                        label="Mensagem"
                        rowns={3}
                        placeholder="Ex: Apresentamos um avanço significativo após a implementação do nosso Plano
                                            Digital, aprovado em 2019. Os serviços digitais passaram de 36 para um total de 113."
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.message}
                        name="message"
                        errors={props.errors}
                        touched={props.touched}
                      />
                    </Grid>
                  </Grid>
                  <Grid container spacing={2} style={{ marginBottom: 5 }}>
                    <Grid item xs={12} sm={12} md={4}>
                      <Input
                        type="date"
                        label="Data de publicação"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.publicationDate}
                        name="publicationDate"
                        errors={props.errors}
                        touched={props.touched}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={8}>
                      <Input
                        type="text"
                        label="Endereço da conta"
                        placeholder="Ex: @anvisa_oficial"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.accountAddress}
                        name="accountAddress"
                        errors={props.errors}
                        touched={props.touched}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={8}>
                      <Input
                        type="text"
                        label="Disponível em"
                        placeholder="Ex: https://twitter.com/anvisa_oficial/status/1260575029127000068"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.url}
                        name="url"
                        errors={props.errors}
                        touched={props.touched}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={4}>
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
      <div
        className="container"
        style={{ paddingBottom: "40px", maxWidth: 830 }}
      >
        <h1>Referência de postagem em rede social (ABNT)</h1>

        <p>
          Na última atualização da{" "}
          NBR 6023
          , a Associação Brasileira de Normas Técnicas (ABNT) incluiu novos
          tipos de documentos digitais, como é o caso das publicações em redes
          sociais. Com isso, passou a existir uma normatização para referenciar
          postagens de Facebook, Twitter, Instagram, entre outras mídias.
        </p>
        <p>
          De acordo com Raquel Recuero, pesquisadora na área de mídias digitais,
          rede social é definida como um conjunto de dois elementos: atores
          (pessoas, instituições ou grupos) e suas conexões ( laços sociais).
        </p>

        <p>
          As interações que ocorrem através das redes são citadas nas reflexões
          de muitos trabalhos acadêmicos, especialmente das áreas de ciências
          humanas.
        </p>

        <h2>Elementos para referência de postagem em rede social</h2>

        <ul style={{ marginLeft: 15 }}>
          <li>
            {" "}
            <b>Autor:</b> pode ser pessoa física ou entidade coletiva;{" "}
          </li>
          <li>
            {" "}
            <b>Mensagem:</b> texto da publicação escrito por extenso;{" "}
          </li>
          <li>
            {" "}
            <b>Local:</b> cidade onde ocorreu a publicação (se houver);{" "}
          </li>
          <li>
            {" "}
            <b>Data de publicação:</b> dia, mês e ano da postagem;{" "}
          </li>
          <li>
            {" "}
            <b>Tipo de meio:</b> nome da rede social usada;{" "}
          </li>
          <li>
            {" "}
            <b>Endereço da conta:</b> exemplo @cnpqoficial{" "}
          </li>
          <li>
            {" "}
            <b>Disponibilidade:</b> endereço da postagem (URL);{" "}
          </li>
          <li>
            {" "}
            <b>Acesso:</b> dia, mês e ano de acesso.{" "}
          </li>
        </ul>

        <p>
          <b>Importante:</b> Quando for mais de 100 palavras na mensagem, você
          deve incluir o recurso de supressão [...]. Assim, a referência não
          fica longa demais.
        </p>

        <h2>Formato básico</h2>

        <p>
          <mark>
            ÚLTIMO SOBRENOME, Primeira parte do nome. <b>Mensagem</b> [...].
            Local, dia, mês e ano de publicação. Tipo de meio: endereço da
            conta. Disponível em: URL. Acesso em: dia, mês e ano.
          </mark>
        </p>

        <h2>Exemplos</h2>

        <img src={Img} alt="post-rede-social" width="100%" />

        <p>
          <mark>
            OLIVEIRA, José P. M.{" "}
            <b>
              Repositório digital da UFRGS é destaque em ranking internacional.
            </b>{" "}
            Maceió, 19 ago. 2011. Twitter: @biblioufal. Disponível em:
            http://twitter.com/#!/biblioufal. Acesso em: 20 ago. 2011.
          </mark>
        </p>

        <p>
          <mark>
            MENA-CHALCO, J.{" "}
            <b>
              As práticas de publicação estão condicionadas pelas políticas de
              avaliação?
            </b>{" "}
            [...]. São Paulo, 31 out. 2018. Twitter: @jmenac. Disponível em:
            https://twitter.com/ jmenac/status/1057660006634536961. Acesso em: 6
            jan. 2019.
          </mark>
        </p>

        <p>
          <mark>
            NASA - NATIONAL AERONAUTICS AND SPACE ADMINISTRATION.{" "}
            <b>
              Twas the night before launch! The U.S. will soon have two of the
              most advanced weather satellites ever, operating in tandem.
            </b>{" "}
            [...]. [S.l.]. 1 mar. 2018. Instagram: @nasa. Disponível em:
            https://www.instagram.com/p/Bfw_zcynDfl/?taken-by=nasa. Acesso em:
            29 out. 2020.
          </mark>
        </p>
      </div>
      <Footer />
    </>
  );
};

export default SocialNetworkPost;
