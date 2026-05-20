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
import Img from "../../../assets/images/explicativos/evento/referencia-abnt-norma-tecnica.jpg";

// styles
import { Container, Card, Row, Content, Back, Actions, Title } from "./style";

const SignupSchema = Yup.object().shape({
  firstName: Yup.string().required("Obrigatório"),
  secondName: Yup.string().required("Obrigatório"),
  title: Yup.string().required("Obrigatório"),
  caption: Yup.string().required("Obrigatório"),
  place: Yup.string().required("Obrigatório"),
  publisher: Yup.string().required("Obrigatório"),
  year: Yup.string().required("Obrigatório"),
  pages: Yup.string().required("Obrigatório"),
});

const generateReference = (values) => {
  document.title = "Normas Técnicas: Referência ABNT";
  const {
    firstName,
    secondName,
    title,
    caption,
    place,
    publisher,
    year,
    pages,
    online,
    url,
    accessedAt,
  } = values;

  return (
    <span>
      {secondName && <>{secondName} - </>}
      {firstName && <>{firstName}. </>}
      {title && <b>{title}: </b>}
      {caption && <>{caption}. </>}
      {place && <>{place}: </>}
      {publisher && <>{publisher}. </>}
      {year && <>{year}. </>}
      {pages && <>{pages} p. </>}
      {online &&
        url &&
        `Disponível em: ${url}. Acesso em: ${formatDate(accessedAt)}. `}
    </span>
  );
};

const generateCitationWithAuthor = (author, year) => {
  return (
    <>
      {author} ({year})
    </>
  );
};

const generateCitationWithoutAuthor = (author, year) => {
  return (
    <>
      ({author.toUpperCase()}, {year})
    </>
  );
};
const TechnicalStandards = ({ back }) => {
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
        values.secondName,
        values.year
      ),
      citation: generateCitationWithoutAuthor(values.secondName, values.year),
    }));

    setOpenModal(!openModal);
  };

  return (
    <>
      <Nav />
      <Container>
        <Back
          onClick={() => history.push("/eventos-patentes-e-normas-tecnicas")}
          src={ArrowLeft}
        />

        <Formik
          initialValues={{
            firstName: "",
            secondName: "",
            title: "",
            caption: "",
            place: "",
            publisher: "",
            year: "",
            pages: "",
            online: false,
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
                    NORMAS TÉCNICAS
                  </p>
                </Title>
              </Actions>
              <Card>
                <p>
                  Preencha o formulário com informações sobre a obra consultada:
                </p>
                <Content>
                  <Grid container spacing={2} style={{ marginBottom: 0 }}>
                    <Grid item xs={12} sm={12} md={7}>
                      <Input
                        type="text"
                        label="Primeira parte do nome da entidade"
                        placeholder="Ex: Associação Brasileira de Normas Técnicas"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.firstName}
                        name="firstName"
                        errors={props.errors}
                        touched={props.touched}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={5}>
                      <Input
                        type="text"
                        label="Segunda parte do nome da entidade"
                        placeholder="Ex: ABNT"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.secondName}
                        name="secondName"
                        errors={props.errors}
                        touched={props.touched}
                      />
                    </Grid>
                  </Grid>
                  <Grid container spacing={2} style={{ marginBottom: 0 }}>
                    <Grid item xs={12} sm={12} md={6}>
                      <Input
                        type="text"
                        label="Título da Norma"
                        placeholder="Ex: ABNT NBR ISO 14001:2015"
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
                        placeholder="Ex: Sistemas da gestão ambiental: Requisitos com orientações para uso"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.caption}
                        name="caption"
                        errors={props.errors}
                        touched={props.touched}
                      />
                    </Grid>
                  </Grid>
                  <Grid container spacing={2} style={{ marginBottom: 0 }}>
                    <Grid item xs={12} sm={12} md={4}>
                      <Input
                        type="text"
                        label="Local"
                        placeholder="Ex: Rio de Janeiro"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.place}
                        name="place"
                        errors={props.errors}
                        touched={props.touched}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={4}>
                      <Input
                        type="text"
                        label="Publicador"
                        placeholder="Ex: ABNT"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.publisher}
                        name="publisher"
                        errors={props.errors}
                        touched={props.touched}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={2}>
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
                    <Grid item xs={12} sm={12} md={2}>
                      <Input
                        type="text"
                        label="Total de Páginas"
                        placeholder="Ex: 41"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.pages}
                        name="pages"
                        errors={props.errors}
                        touched={props.touched}
                      />
                    </Grid>
                  </Grid>
                  <Grid container spacing={2} style={{ marginBottom: 0 }}>
                    <Grid item xs={12} sm={12} md={2}>
                      <Select
                        label="Online?"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.online}
                        name="online"
                        options={[
                          { value: true, name: "Sim" },
                          { value: false, name: "Não  " },
                        ]}
                        errors={props.errors}
                        touched={props.touched}
                      />
                    </Grid>

                    <Grid item xs={12} sm={12} md={7}>
                      <Input
                        disabled={!props.values.online}
                        name="url"
                        label="Disponível em"
                        type="text"
                        placeholder="Ex: https://www.abntcatalogo.com.br/norma.aspx?ID=345116"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.url}
                        errors={props.errors}
                        touched={props.touched}
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
        <h1>Referência bibliográfica de normas técnicas (ABNT)</h1>
        <p>
          A normatização existe com o objetivo de formular e aplicar regras para
          prevenir problemas ou encontrar soluções. Ela cria um padrão em
          diferentes contextos, seja para definir a apresentação de documentos
          ou padronizar a acessibilidade a edificações.
        </p>

        <p>
          No Brasil, a entidade responsável por definir as normas técnicas é a
          Associação Brasileira de Normas Técnicas (
          <a href="https://viacarreira.com/o-que-e-a-abnt/" target="blank">
            ABNT
          </a>
          ). Cada NBR é elaborada e avaliada por um comitê de especialistas
          antes de ser publicada.
        </p>

        <p>
          Quando a NBR tem a sigla ISO no título, significa que ela passou pela
          International Organization for Standardization, uma organização
          mundial com sede em Genebra que cuida da padronização e procedimentos.
        </p>

        <h2>Elementos essenciais</h2>

        <ul style={{ marginLeft: 15 }}>
          <li> Organização: nome da entidade responsável (por extenso); </li>
          <li> Título da norma; </li>
          <li> Subtítulo: se houver; </li>
          <li> Local: cidade de publicação; </li>
          <li> Publicador: entidade responsável pela publicação; </li>
          <li> Ano: ano de publicação; </li>
          <li>
            {" "}
            Total de páginas: número de páginas do documento consultado;{" "}
          </li>
        </ul>

        <h2>Estrutura</h2>

        <p>A ordem dos elementos segue a estrutura abaixo:</p>

        <p>
          <mark>
            NOME DA ORGANIZAÇÃO. <b>Título da norma:</b> Subtítulo. Local:
            Publicador, Ano. Total de páginas.
          </mark>
        </p>

        <img src={Img} alt="norma-tecnica" width="100%" />

        <h2>Mais exemplos</h2>

        <p>
          <mark>
            ABNT - Associação Brasileira de Normas Técnicas.{" "}
            <b>ABNT NBR ISO 12836: </b>
            odontologia: dispositivos para sistemas CAD/CAM para restaurações
            dentárias indiretas: métodos de ensaio para avaliação de exatidão.
            Rio de Janeiro: ABNT, 2017. 14 p.
          </mark>
        </p>

        <p>
          <mark>
            ABNT - Associação Brasileira de Normas Técnicas.{" "}
            <b>ABNT NBR 9050: </b>
            Acessibilidade a edificações, mobiliário, espaços e equipamentos
            urbanos. Rio de Janeiro: ABNT, 2004. 97 p.
          </mark>
        </p>

        <h2>Acesso em meio eletrônico</h2>

        <p>
          O documento de uma norma técnica pode ser consultado pela internet.
          Nesse caso, é necessário incluir o endereço eletrônico e a data de
          acesso (dia, mês e ano).
        </p>
      </div>
      <Footer />
    </>
  );
};

export default TechnicalStandards;
