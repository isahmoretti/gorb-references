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

import ArrowLeft from "../../../assets/images/arrow-left.svg";
import Img from "../../../assets/images/change/Podcast.jpg";

// styles
import { Container, Card, Row, Content, Back, Actions, Title } from "./style";

const SignupSchema = Yup.object().shape({
  title: Yup.string().required("Obrigatório"),
  locutors: Yup.string().required("Obrigatório"),
  productor: Yup.string().required("Obrigatório"),
  date: Yup.string().required("Obrigatório"),
  accessedAt: Yup.string().required("Obrigatório"),
  url: Yup.string().required("Obrigatório"),
});

const generateReference = (values) => {
  const {
    title,
    caption,
    locutors,
    hasInterviewee,
    nameInterviewee,
    location,
    productor,
    date,
    url,
    accessedAt,
  } = values;

  return (
    <span>
      {caption
        ? `${title.toUpperCase()}: ${caption}. `
        : `${title.toUpperCase()}. `}
      {`[Locução de]: ${locutors}. `}
      {hasInterviewee &&
        nameInterviewee &&
        `Entrevistada: ${nameInterviewee}. `}
      {location ? `${location}: ` : `[S.l.]: `}
      {`${productor}, `}
      {`${formatDate(date)}. `}
      {accessedAt && url && (
        <span>
          {" "}
          <i>Podcast.</i>
          {` Disponível em: ${url}. Acesso em: ${formatDate(
            accessedAt
          )}. `}{" "}
        </span>
      )}
    </span>
  );
};

const Podcast = ({ back }) => {
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
            caption: "",
            locutors: "",
            hasInterviewee: true,
            nameInterviewee: "",
            location: "",
            productor: "",
            date: "",
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
                    Podcast
                  </p>
                  <span></span>
                </Title>
              </Actions>
              <Card>
                <p>
                  Preencha o formulário com informações sobre a obra consultada:
                </p>
                <Content>
                  <Grid container spacing={2} style={{ marginBottom: 0 }}>
                    <Grid item xs={12} sm={12} md={6}>
                      <Input
                        name="title"
                        type="text"
                        label="Título do podcast"
                        placeholder="Ex: Dragões de Garagem"
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
                        type="text"
                        label="Subtítulo do podcast"
                        placeholder="Ex: #137: vó Maria: vacinas e escolhas #semanadavacina."
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
                        name="locutors"
                        type="text"
                        label="Locutores"
                        placeholder="Ex: Barbara Paes"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.locutors}
                        errors={props.errors}
                        touched={props.touched}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={2}>
                      <Select
                        name="hasInterviewee"
                        label="Tem entrevistado?"
                        type="text"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.hasInterviewee}
                        errors={props.errors}
                        touched={props.touched}
                        options={[
                          { value: true, name: "Sim" },
                          { value: false, name: "Não" },
                        ]}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={5}>
                      <Input
                        name="nameInterviewee"
                        type="text"
                        label="Nome do Entrevistado"
                        placeholder="Ex: Maria da Silva"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.nameInterviewee}
                        errors={props.errors}
                        touched={props.touched}
                      />
                    </Grid>
                  </Grid>
                  <Grid container spacing={2} style={{ marginBottom: 0 }}>
                    <Grid item xs={12} sm={12} md={4}>
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
                    <Grid item xs={12} sm={12} md={4}>
                      <Input
                        name="productor"
                        type="text"
                        label="Produtora"
                        placeholder="Ex: Dragões de Garagem"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.productor}
                        errors={props.errors}
                        touched={props.touched}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={4}>
                      <Input
                        name="date"
                        type="date"
                        label="Data de publicação"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.date}
                        errors={props.errors}
                        touched={props.touched}
                      />
                    </Grid>
                  </Grid>
                  <Grid container spacing={2} style={{ marginBottom: 0 }}>
                    <Grid item xs={12} sm={12} md={9}>
                      <Input
                        name="url"
                        label="Disponível em"
                        type="text"
                        placeholder="http://dragoesdegaragem.com/podcast/dragoes-de-garagem-137-vo-maria-vacinas-e-escolhassemanadavacina/"
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
      <div
        className="container"
        style={{ paddingBottom: "40px", maxWidth: 830 }}
      >
        <h1>Referência Bibliográfica de podcast</h1>
        <p>
          A Associação Brasileira de Normas Técnicas (ABNT) explica como fazer
          referência bibliográfica de podcast na seção 7.13.5 da NBR 6023, que
          fala a respeito de documento sonoro em meio eletrônico.{" "}
        </p>

        <p>
          A era do podcast chegou e já conquistou os principais aplicativos de
          música, como Spotify e Deezer. Os programas de áudio contam histórias,
          apresentam entrevistas e ampliam conhecimentos sobre diversos
          assuntos. Portanto, esse novo tipo de documento pode servir de fonte
          de pesquisa para o seu trabalho acadêmico.
        </p>

        <h3>Elementos essenciais para referência de podcast</h3>

        <ul style={{ marginLeft: 15 }}>
          <li>
            {" "}
            <b> Título do podcast: </b> título do arquivo em áudio;{" "}
          </li>
          <li>
            {" "}
            <b> Subtítulo do podcast: </b> se houver;{" "}
          </li>
          <li>
            {" "}
            <b> Locutores: </b> responsáveis pela narração;{" "}
          </li>
          <li>
            {" "}
            <b> Entrevistado: </b> se houver entrevista, incluir o nome do
            entrevistado;{" "}
          </li>
          <li>
            {" "}
            <b> Local: </b> cidade onde ocorreu a produção;{" "}
          </li>
          <li>
            {" "}
            <b> Produtora: </b> responsável pela produção;{" "}
          </li>
          <li>
            {" "}
            <b> Data de publicação: </b> dia, mês e ano da publicação;{" "}
          </li>
          <li>
            {" "}
            <b> Podcast: </b> o termo Podcast deve ser inserido em itálico;{" "}
          </li>
          <li>
            {" "}
            <b> Disponibilidade: </b> endereço eletrônico, precedido por
            "Disponível em";{" "}
          </li>
          <li>
            {" "}
            <b> titulo: </b> texto;{" "}
          </li>
          <li>
            {" "}
            <b> Data de acesso: </b> dia, mês e ano, precedido de "Acesso em:";{" "}
          </li>
        </ul>

        <h3>Recomendações</h3>

        <p>
          A referência bibliográfica de podcast começa com o título do áudio,
          sempre com a primeira palavra em letras maiúsculas. Quando não se sabe
          o local, usa-se a expressão [S. l.], que significa sine loco.{" "}
        </p>

        <p>
          O termo Podcast aparece na referência em itálico, como uma forma de
          especificação do suporte.
        </p>

        <p>
          Se houver mais alguma informação relevante sobre o documento sonoro, é
          recomendado incluir na forma de nota, antes da URL e da data de
          acesso.
        </p>

        <h3>Formato básico</h3>

        <p>
          No esquema abaixo, você pode ver com detalhes a ordem dos elementos e
          a pontuação:
        </p>

        <p>
          <mark>
            TÍTULO: Subtítulo. [Locução de]: Nome do Locutor. Local:
            Publicadora, dia, mês e ano de publicação. <i>Podcast.</i>{" "}
            Disponível em: URL. Acesso em: dia, mês e ano de acesso.
          </mark>
        </p>

        <img src={Img} alt="podcast" width="100%" />

        <h3>Exemplos</h3>

        <p>
          <mark>
            EPISÓDIO 2: O Julgamento. [Locução de]: Branca Vianna.
            Entrevistados: Jacqueline Pitanguy; Hildete Pereira de Melo; Artur
            Xexéo et al. Rio de Janeiro: Rádio Novelo, 19 set. 2020.{" "}
            <i>Podcast.</i>
            (Série Praia dos Ossos). Disponível em:
            https://www.radionovelo.com.br/praiadosossos/. Acesso em: 29 out.
            2020.
          </mark>
        </p>

        <p>
          <mark>
            DRAGÕES de garagem #137: vó Maria: vacinas e escolhas
            #semanadavacina. [Locução de]: Barbara Paes. [S.l.]: Dragões de
            Garagem, 14 ago. 2018. <i>Podcast.</i> Disponívem em: http://
            dragoesdegaragem.com/podcast/dragoes-de-garagem-137-vo-maria-vacinas-e-escolhassemanadavacina/.
            Acesso em: 9 jan. 2019.
          </mark>
        </p>

        <p>
          <mark>
            PODCAST LXX: Brasil: parte 3: a república. [Locução de]: Christian
            Gutner. [S. l.]: Escriba Café, 19 mar. 2010. <i>Podcast.</i>{" "}
            Disponível em:
            http://www.escribacafe.com/podcast-lxx-brasil-parte-3-a-republica/.
            Acesso em: 4 out. 2010.
          </mark>
        </p>
      </div>
      <Footer />
    </>
  );
};

export default Podcast;
