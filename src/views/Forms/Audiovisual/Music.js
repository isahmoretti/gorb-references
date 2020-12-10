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
import { formatMonosyllable } from "../../../utils/monosyllable";

import ArrowLeft from "../../../assets/images/arrow-left.svg";

// styles
import { Container, Card, Row, Content, Back, Actions, Title } from "./style";

import Img from "../../../assets/images/explicativos/audiolivro/referencia-abnt-musica (1).jpg";

const SignupSchema = Yup.object().shape({
  title: Yup.string().required("Obrigatório"),
  interpreters: Yup.string().required("Obrigatório"),
  titleAlbum: Yup.string().required("Obrigatório"),
  interpretersAlbum: Yup.string().required("Obrigatório"),
  recordCompany: Yup.string().required("Obrigatório"),
  year: Yup.string().required("Obrigatório"),
});

const generateReference = (values) => {
  const {
    title,
    interpreters,
    composer,
    titleAlbum,
    interpretersAlbum,
    location,
    recordCompany,
    year,
    suport,
    whatSuport,
    url,
    accessedAt,
    duration,
    specificationSuport,
  } = values;

  return (
    <span>
      {`${formatMonosyllable(title)}. `}
      {`Intérprete: ${interpreters}. `}
      {composer && `Compositor: ${composer}. `}
      <i>In: </i>
      {`${formatMonosyllable(titleAlbum)}. `}
      {`Intérprete: ${interpretersAlbum}. `}
      {location ? `${location}: ` : <i>[S. l.]: </i>}
      {`${recordCompany}, `}
      {`${year}. `}
      {specificationSuport && `${specificationSuport}, `}
      {suport && whatSuport && `${whatSuport}, `}
      {duration && `(${duration}). `}
      {accessedAt &&
        url &&
        `Disponível em: ${url}. Acesso em: ${formatDate(accessedAt)}. `}
    </span>
  );
};

const Music = ({ back }) => {
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
            interpreters: "",
            composer: "",
            titleAlbum: "",
            interpretersAlbum: "",
            location: "",
            recordCompany: "",
            year: "",
            suport: true,
            whatSuport: "",
            url: "",
            accessedAt: "",
            duration: "",
            specificationSuport: "",
          }}
          validationSchema={SignupSchema}
          onSubmit={handleSubmit}
        >
          {(props) => (
            <form style={{ maxWidth: 830 }} onSubmit={props.handleSubmit}>
              <Actions>
                <Title>
                  <p
                    style={{
                      fontSize: "20px",
                    }}
                  >
                    Música
                  </p>
                  <span></span>
                </Title>
              </Actions>
              <Card>
                <Content>
                  <Grid container spacing={2} style={{ marginBottom: 0 }}>
                    <Grid item xs={12} sm={12} md={4}>
                      <Input
                        name="title"
                        type="text"
                        label="Título"
                        placeholder="Ex: Vizinha Faladeira"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.title}
                        errors={props.errors}
                        touched={props.touched}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={4}>
                      <Input
                        name="interpreters"
                        type="text"
                        label="Intérprete"
                        placeholder="Ex: Alcione"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.interpreters}
                        errors={props.errors}
                        touched={props.touched}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={4}>
                      <Input
                        name="composer"
                        type="text"
                        label="Compositor"
                        placeholder="Ex: Acyr Marques"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.composer}
                        errors={props.errors}
                        touched={props.touched}
                      />
                    </Grid>
                  </Grid>
                  <Grid container spacing={2} style={{ marginBottom: 0 }}>
                    <Grid item xs={12} sm={12} md={6}>
                      <Input
                        name="titleAlbum"
                        type="text"
                        label="Título do álbum"
                        placeholder="Ex: Ouro e Cobre"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.titleAlbum}
                        errors={props.errors}
                        touched={props.touched}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6}>
                      <Input
                        name="interpretersAlbum"
                        label="Intérprete do álbum"
                        type="text"
                        placeholder="Ex: Alcione"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.interpretersAlbum}
                        errors={props.errors}
                        touched={props.touched}
                      />
                    </Grid>
                  </Grid>
                  <Grid container spacing={2} style={{ marginBottom: 0 }}>
                    <Grid item xs={12} sm={12} md={5}>
                      <Input
                        name="location"
                        label="Local"
                        type="text"
                        placeholder="Ex: São Paulo"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.location}
                        errors={props.errors}
                        touched={props.touched}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={5}>
                      <Input
                        name="recordCompany"
                        type="text"
                        label="Gravadora"
                        placeholder="Ex: RCA Victor"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.recordCompany}
                        errors={props.errors}
                        touched={props.touched}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={2}>
                      <Input
                        name="year"
                        type="text"
                        label="Ano"
                        placeholder="Ex: 1988"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.year}
                        errors={props.errors}
                        touched={props.touched}
                      />
                    </Grid>
                  </Grid>
                  <Grid container spacing={2} style={{ marginBottom: 0 }}>
                    <Grid item xs={12} sm={12} md={3}>
                      <Select
                        name="suport"
                        label="Suporte Físico?"
                        type="text"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.suport}
                        errors={props.errors}
                        touched={props.touched}
                        options={[
                          { value: true, name: "Sim" },
                          { value: false, name: "Não" },
                        ]}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={9}>
                      <Input
                        name="whatSuport"
                        label="Qual tipo de suporte"
                        placeholder="Ex: 1 disco vinil, lado A, faixa 4"
                        type="text"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.whatSuport}
                        errors={props.errors}
                        touched={props.touched}
                      />
                    </Grid>
                  </Grid>
                  <Grid container spacing={2} style={{ marginBottom: 0 }}>
                    <Grid item xs={12} sm={12} md={3}>
                      <Input
                        name="duration"
                        label="Duração"
                        type="text"
                        placeholder="Ex: 4 min"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.duration}
                        errors={props.errors}
                        touched={props.touched}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={9}>
                      <Input
                        name="specificationSuport"
                        label="Especificações do suporte"
                        type="text"
                        placeholder="Ex: 33 1/3 rpm, estéreo., 12 pol."
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.specificationSuport}
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
        <h1 style={{ textAlign: "left" }}>
          Referência Bibliográfica de música
        </h1>
        <p>
          Músicas também podem ser referenciadas nos trabalhos acadêmicos, desde
          que as normas da ABNT sejam respeitadas. A NBR 6023:2018 fala sobre
          referência bibliográfica de música no item "parte de documento
          sonoro".
        </p>

        <p>
          A escrita da referência começa sempre pelo título da música, com a
          primeira palavra em letras maiúsculas. Usa-se a expressão "In" para
          indicar que o documento se encontra dentro de um álbum.
        </p>

        <h3>Elementos essenciais</h3>

        <ul>
          <li>
            {" "}
            <b> Título da música: </b> nome da canção;{" "}
          </li>
          <li>
            {" "}
            <b> Intérprete: </b> nome do cantor, precedido da expressão
            "Intérprete:";{" "}
          </li>
          <li>
            {" "}
            <b> Compositor: </b> nome do compositor, precedido da expressão
            "Compositor:";{" "}
          </li>
          <li>
            {" "}
            <b>
              {" "}
              <i>In</i>:{" "}
            </b>{" "}
            significa "dentro de";{" "}
          </li>
          <li>
            {" "}
            <b> Título do álbum: </b> nome do álbum no qual a música se
            encontra;{" "}
          </li>
          <li>
            {" "}
            <b> Intérprete do álbum: </b> cantor do álbum, precedido da
            expressão "Intérprete:";{" "}
          </li>
          <li>
            {" "}
            <b> Local: </b> Cidade da gravadora;{" "}
          </li>
          <li>
            {" "}
            <b> Gravadora: </b> nome da empresa responsável pela gravação;{" "}
          </li>
          <li>
            {" "}
            <b> Ano: </b> ano de lançamento;{" "}
          </li>
          <li>
            {" "}
            <b> Suporte: </b> descrição do suporte;{" "}
          </li>
        </ul>

        <h3>Formato básico</h3>

        <p>
          <mark>
            TÍTULO da música. Intérprete: Nome do intérprete. Compositor: Nome
            do compositor. In: Título do álbum. Intérprete: Nome do intérprete
            do álbum. Local: Gravadora, Ano. Especificações do suporte (duração
            da música).
          </mark>
        </p>

        <h3>Exemplos aplicando o formato</h3>

        <img src={Img} alt="musica" width="100%" />

        <p>
          <mark>
            PROCISSÃO. Intérprete: Gilberto Gil. Compositor: Gilberto Gil. In:
            EM CONCERTO. Intérprete: Gilberto Gil. Rio de Janeiro: Geleia Geral,
            1987. 1 disco vinil, lado A, faixa 2, (2m).
          </mark>
        </p>

        <p>
          <mark>
            JURA Secreta. Intérprete: Simone. Compositor: S. Costa e A. Silva.
            In: FACE a Face. Intérprete: Simone. [S. l.]: Emi-Odeon Brasil,
            1977. 1 CD, faixa 7, (2 min).
          </mark>
        </p>

        <h3>E se a música for online?</h3>

        <p>
          No caso de um documento acessado pela internet, é necessário incluir a
          URL, precedida da expressão "Disponível em", e a data de acesso,
          precedida por "Acesso em". Veja um exemplo:
        </p>

        <p>
          <mark>
            TE ENSINEI certin. Intérprete: Ludmilla. Compositores: Umberto
            Tavares Oliveira e Jefferson Júnior. In: HELLO Mundo (Ao vivo).
            Intérprete: Ludmilla. Rio de Janeiro: Warner Music, 2019. Streaming
            de música Spotify, faixa 2 (4 min). Disponível em:
            https://open.spotify.com/album/3VDQ3Oa1bICtnbII8HowVw. Acesso em: 31
            out. 2020.
          </mark>
        </p>

        <h3>Como fazer referência de álbum completo?</h3>

        <p>
          Na seção “Documento sonoro no todo”, a ABNT ensina como fazer
          referência de álbum musical completo. Os elementos essenciais são
          título, intérprete, compositor, local, gravadora, data e descrição do
          suporte.
        </p>

        <p>Veja exemplos:</p>

        <p>
          <mark>
            THE NINE symphonies. Compositor: Ludwig van Beethoven. Orquestra:
            Wiener Philharmoniker. Regente: Leonard Bernstein. Soprano: Gwyneth
            Jones. Contralto: Hanna Schwarz. Tenor: René Kollo. Baixo: Kurt
            Moll. Coro: Konzertvereinigung Wiener Staatsopernchor. Hamburg:
            Deutsche Gramophon, 1980. 5 CD.
          </mark>
        </p>

        <p>
          <mark>
            DE REPENTE. Intérprete: Arthur Moreira Lima. Rio de Janeiro:
            Polygram do Brasil, 1984. 1 disco vinil.
          </mark>
        </p>
      </div>

      <Footer />
    </>
  );
};

export default Music;
