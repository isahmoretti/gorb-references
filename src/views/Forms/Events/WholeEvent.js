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
// import { generateCitationWithAuthor } from "../../../utils/generateCitationWithAuthor";
// import { generateCitationWithoutAuthor } from "../../../utils/generateCitationWithoutAuthor";

import ArrowLeft from "../../../assets/images/arrow-left.svg";
import Img from "../../../assets/images/explicativos/evento/referencia-abnt-evento-no-todo.jpg";

// styles
import { Container, Card, Row, Content, Back, Actions, Title } from "./style";

const SignupSchema = Yup.object().shape({
  mainEventName: Yup.string().required("Obrigatório"),
  // mainEventNumber: Yup.string().required("Obrigatório"),
  // participationEventNumbering: Yup.string().required("Obrigatório"),
  placeOfPerformance: Yup.string().required("Obrigatório"),
  title: Yup.string().required("Obrigatório"),
  // placeOfPublication: Yup.string().required("Obrigatório"),
  publishingCompany: Yup.string().required("Obrigatório"),
  // yearOfPublication: Yup.string().required("Obrigatório"),
});

const generateReference = (values) => {
  const {
    mainEventName,
    mainEventNumber,
    participationEventName,
    participationEventNumbering,
    year,
    placeOfPerformance,
    title,
    placeOfPublication,
    publishingCompany,
    yearOfPublication,
    pages,
    theme,
    note,
    online,
    url,
    accessedAt,
  } = values;

  return (
    <span>
      {mainEventName && <>{mainEventName.toUpperCase()}, </>}
      {mainEventNumber && <>{mainEventNumber}.; </>}
      {participationEventName && <>{participationEventName.toUpperCase()}, </>}
      {participationEventNumbering && <>{participationEventNumbering}., </>}
      {year && <>{year}, </>}
      {placeOfPerformance && <>{placeOfPerformance}: </>}
      {title && (
        <>
          <b>{formatMessage(title)}</b> [...].&nbps;
        </>
      )}
      {placeOfPublication && <>{placeOfPublication}: </>}
      {publishingCompany && <>{publishingCompany}, </>}
      {yearOfPublication && <>{yearOfPublication}. </>}
      {pages && <>{pages} p. </>}
      {theme && <>Tema: {theme}. </>}
      {note && <>{note}. </>}
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

const WholeEvent = ({ back }) => {
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
        values.mainEventName,
        values.yearOfPublication
      ),
      citation: generateCitationWithoutAuthor(
        values.mainEventName,
        values.yearOfPublication
      ),
    }));

    setOpenModal(!openModal);
  };

  return (
    <>
      <Nav />
      <Container>
        <Back onClick={() => history.push("/evento")} src={ArrowLeft} />

        <Formik
          initialValues={{
            mainEventName: "",
            mainEventNumber: "",
            participationEventName: "",
            participationEventNumbering: "",
            year: "",
            placeOfPerformance: "",
            title: "",
            placeOfPublication: "",
            publishingCompany: "",
            yearOfPublication: "",
            pages: "",
            theme: "",
            note: "",
            online: false,
            url: "",
            accessedAt: "",
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
                    Evento no todo
                  </p>
                </Title>
              </Actions>
              <Card>
                <p>
                  Preencha o formulário com informações sobre a obra consultada:
                </p>
                <Content>
                  <Grid container spacing={2} style={{ marginBottom: 0 }}>
                    <Grid item xs={12} sm={12} md={8}>
                      <Input
                        type="text"
                        label="Nome do evento principal"
                        placeholder="Ex:Congresso Internacional do INES"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.mainEventName}
                        name="mainEventName"
                        errors={props.errors}
                        touched={props.touched}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={4}>
                      <Input
                        type="text"
                        label="Numeração do evento principal"
                        placeholder="Ex: 8"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.mainEventNumber}
                        name="mainEventNumber"
                        errors={props.errors}
                        touched={props.touched}
                      />
                    </Grid>
                  </Grid>
                  <Grid container spacing={2} style={{ marginBottom: 0 }}>
                    <Grid item xs={12} sm={12} md={8}>
                      <Input
                        type="text"
                        label="Nome do evento de participação"
                        placeholder="Ex: Seminário Nacional do INES"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.participationEventName}
                        name="participationEventName"
                        errors={props.errors}
                        touched={props.touched}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={4}>
                      <Input
                        type="text"
                        label="Numeração do evento de participação"
                        placeholder="Ex: 14"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.participationEventNumbering}
                        name="participationEventNumbering"
                        errors={props.errors}
                        touched={props.touched}
                      />
                    </Grid>
                  </Grid>
                  <Grid container spacing={2} style={{ marginBottom: 0 }}>
                    <Grid item xs={12} sm={12} md={2}>
                      <Input
                        type="text"
                        label="Ano"
                        placeholder="Ex: 2009"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.year}
                        name="year"
                        errors={props.errors}
                        touched={props.touched}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={4}>
                      <Input
                        type="text"
                        label="Local de realização do evento"
                        placeholder="Ex: Rio de Janeiro"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.placeOfPerformance}
                        name="placeOfPerformance"
                        errors={props.errors}
                        touched={props.touched}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6}>
                      <Input
                        type="text"
                        label="Título do documento"
                        placeholder="Ex: Atas, Anais, Proceedings"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.title}
                        name="title"
                        errors={props.errors}
                        touched={props.touched}
                      />
                    </Grid>
                  </Grid>
                  <Grid container spacing={2} style={{ marginBottom: 0 }}>
                    <Grid item xs={12} sm={12} md={4}>
                      <Input
                        type="text"
                        label="Local de publicação"
                        placeholder="Ex: Rio de Janeiro"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.placeOfPublication}
                        name="placeOfPublication"
                        errors={props.errors}
                        touched={props.touched}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={5}>
                      <Input
                        type="text"
                        label="Editora"
                        placeholder="Ex: Instituto Nacional de Educação de Surdos"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.publishingCompany}
                        name="publishingCompany"
                        errors={props.errors}
                        touched={props.touched}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={3}>
                      <Input
                        type="text"
                        label="Data de publicação"
                        placeholder="Ex: 2009"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.yearOfPublication}
                        name="yearOfPublication"
                        errors={props.errors}
                        touched={props.touched}
                      />
                    </Grid>
                  </Grid>

                  <Grid container spacing={2} style={{ marginBottom: 0 }}>
                    <Grid item xs={12} sm={12} md={4}>
                      <Input
                        type="text"
                        label="Número de páginas"
                        placeholder="Ex: 160"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.pages}
                        name="pages"
                        errors={props.errors}
                        touched={props.touched}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={8}>
                      <Input
                        type="text"
                        label="Tema"
                        placeholder="Ex: Múltiplos Atores e Saberes na Educação de Surdos"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.theme}
                        name="theme"
                        errors={props.errors}
                        touched={props.touched}
                      />
                    </Grid>
                  </Grid>

                  <Grid container spacing={2} style={{ marginBottom: 0 }}>
                    <Grid item xs={12} sm={12} md={9}>
                      <Input
                        type="text"
                        label="Nota"
                        placeholder="Ex: Inclui bibliografia."
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.note}
                        name="note"
                        errors={props.errors}
                        touched={props.touched}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={3}>
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
                  </Grid>

                  <Grid container spacing={2} style={{ marginBottom: 0 }}>
                    <Grid item xs={12} sm={12} md={9}>
                      <Input
                        disabled={!props.values.online}
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
        <h1>Referência de evento no todo</h1>

        <p>
          A NBR 60:23 tem uma seção dedicada exclusivamente para referência
          bibliográfica de evento no todo. O recurso deve ser usado quando o
          autor do trabalho deseja citar uma atividade que reúne pesquisadores e
          especialistas da área.
        </p>

        <p>
          Existem vários{" "}
          <a
            href="https://viacarreira.com/tipos-de-eventos-academicos/"
            target="blank"
          >
            tipos de eventos acadêmicos
          </a>{" "}
          que mobilizam a comunidade científica, como é o caso de congressos,
          conferências, jornadas, encontros, workshops, colóquios, feiras,
          seminários e exposições.
        </p>

        <p>
          Quando se diz evento no todo em monografia, significa que o autor do
          trabalho consultou atas, anais, proceedings, entre outros documentos
          resultantes da atividade.
        </p>

        <p>
          No contexto da NBR, o termo "monografia" é usado para dizer que o
          documento, constituído de uma parte só, foi consultado por completo.
        </p>

        <h3>Elementos para referenciar evento no todo</h3>

        <ul style={{ marginLeft: 15 }}>
          <li> Nome do evento principal </li>
          <li> Numeração (se houver) </li>
          <li> Nome do evento de participação </li>
          <li> Numeração do evento de participação (se houver) </li>
          <li> Cidade de realização </li>
          <li> Título do documento consultado </li>
          <li> Local de publicação do documento consultado </li>
          <li> Editora responsável pela publicação </li>
          <li> Data de publicação </li>
          <li> Número de páginas </li>
          <li> Tema </li>
        </ul>

        <p>
          A inclusão do evento de participação, bem como a sua numeração, o
          número de páginas do documento e o tema, não são elementos
          obrigatórios.
        </p>

        <h3>Formato básico</h3>

        <p>
          <mark>
            TÍTULO DO EVENTO, numeração., NOME DO EVENTO DE PARTICIPAÇÃO,
            numeração do evento de participação., ano, Cidade de realização.
            <b>Título do documento</b> [...]. Local de publicação: Editora, ano
            de publicação. Número de páginas p. Tema: Assunto do evento. Nota.
          </mark>
        </p>

        <p>
          No caso de uma consulta online ao documento, é necessário incluir a
          URL, precedida de "Disponível em:". Em seguida vem a data de acesso,
          precedida de "Acesso em".
        </p>

        <p>
          Na imagem abaixo, você pode entender melhor a ordem dos elementos e a
          identificação de cada um deles na referência. O primeiro exemplo tem
          detalhes sobre o evento de participação, já o segundo não. Veja:
        </p>

        <img src={Img} alt="evento-todo" width="100%" />

        <h3>Exemplos aplicando o formato básico</h3>

        <p>
          <mark>
            SEMINÁRIO BAIANO DE EMPREENDEDORISMO MUSICAL, 1., 2019, Salvador.
            <b> Anais</b> [...]. Salvador: Escola de Administração da UFBA,
            2019.
          </mark>
        </p>

        <p>
          <mark>
            SIMPÓSIO INTERNACIONAL SOBRE A JUVENTUDE BRASILEIRA, 4., 2010. Belo
            Horizonte, MG. <b>Anais</b> [...]. Belo Horizonte: PUC Minas, 2011.
          </mark>
        </p>

        <p>
          <mark>
            CONGRESSO BRASILEIRO DE UNIDADES DE CONSERVAÇÃO, 4., 2004, Curitiba.
            <b> Anais</b> [...]. Curitiba: Fundação Boticário de Proteção à
            Natureza, 2004. 224 p.
          </mark>
        </p>

        <p>
          <mark>
            CONGRESSO DE ECOLOGIA DO BRASIL, 6., 2003, Fortaleza. <b>Anais</b>{" "}
            [...]. Fortaleza: UFC, 2003.
          </mark>
        </p>

        <p>
          <mark>
            CONGRESSO DO MINISTÉRIO PÚBLICO DO ESTADO DE SÃO PAULO, 3., 2005.
            <b> Anais</b> [...]. São Paulo: Páginas & Letras, 2006. v. 2. ISBN
            85-86508-53-5.
          </mark>
        </p>
      </div>
      <Footer />
    </>
  );
};

export default WholeEvent;
