import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import { Formik } from "formik";
import * as Yup from "yup";

import { Grid } from "@material-ui/core";

// components
import Input from "../../../components/InputWrapper/Input";
import Button from "../../../components/Buttons";
import Select from "../../../components/InputWrapper/Select";
import Modal from "../../../components/Modal";
import Nav from "../../../components/Header";
import Footer from "../../../components/Footer";

import { formatMessage } from "../../../utils/formatMessage";
import { formatDate } from "../../../utils/formatDate";
import { generateCitationWithAuthor } from "../../../utils/generateCitationWithAuthor";
import { generateCitationWithoutAuthor } from "../../../utils/generateCitationWithoutAuthor";

import ArrowLeft from "../../../assets/images/arrow-left.svg";
import Img from "../../../assets/images/explicativos/evento/referencia-abnt-evento-no-todo-em-publicacao-periodica.jpg";

// styles
import { Container, Card, Row, Content, Back, Actions, Title } from "./style";

const SignupSchema = Yup.object().shape({
  eventName: Yup.string().required("Obrigatório"),
  year: Yup.string().required("Obrigatório"),
  placeOfTheEvent: Yup.string().required("Obrigatório"),
  documentTitle: Yup.string().required("Obrigatório"),
  periodicName: Yup.string().required("Obrigatório"),
  placeOfPublication: Yup.string().required("Obrigatório"),
  publishingCompany: Yup.string().required("Obrigatório"),
  publicationMonth: Yup.string().required("Obrigatório"),
  publicationYear: Yup.string().required("Obrigatório"),
});

const generateReference = (values) => {
  const {
    eventName,
    numbering,
    participationEventName,
    participationEventNumbering,
    year,
    placeOfTheEvent,
    documentTitle,
    periodicName,
    placeOfPublication,
    publishingCompany,
    volume,
    issueNumber,
    publicationMonth,
    publicationYear,
    theme,
    online,
    url,
    accessedAt,
  } = values;

  return (
    <span>
      {eventName && <>{eventName.toUpperCase()}, </>}
      {numbering && <>{numbering}.; </>}
      {participationEventName && <>{participationEventName.toUpperCase()}, </>}
      {participationEventNumbering && <>{participationEventNumbering}., </>}
      {year && <>{year}, </>}
      {placeOfTheEvent && <>{placeOfTheEvent}. </>}
      {documentTitle && <>{formatMessage(documentTitle)} </>}
      {periodicName && <b>{periodicName}. </b>}
      {placeOfPublication && <>{placeOfPublication}: </>}
      {publishingCompany && <>{publishingCompany}, </>}
      {volume && <>v. {volume}, </>}
      {issueNumber && <>n. {issueNumber}, </>}
      {publicationMonth && <>{publicationMonth}. </>}
      {publicationYear && <>{publicationYear}. </>}
      <>Suplemento. </>
      {theme && <>Tema: {theme}. </>}
      {online &&
        url &&
        accessedAt &&
        `Disponível em: ${url}. Acesso em: ${formatDate(accessedAt)}. `}
    </span>
  );
};
const WholeEventInPeriodicPublication = ({ back }) => {
  const [state, setState] = useState({
    values: {},
    clearInitialValues: false,
  });

  const [openModal, setOpenModal] = useState(false);

  const history = useHistory();

  const handleCitation = (text, yaer) => {
    return {
      cit1: `${text} (${yaer})`,
      cit2: `(${text.toUpperCase()}, ${yaer})`,
    };
  };

  const handleSubmit = (values) => {
    setState((prev) => ({
      ...prev,
      values,
      references: generateReference(values),
      citationWithAuthor: handleCitation(
        values.eventName,
        values.publicationYear
      ).cit1,
      citation: handleCitation(values.eventName, values.publicationYear).cit2,
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
            eventName: "",
            numbering: "",
            participationEventName: "",
            participationEventNumbering: "",
            year: "",
            placeOfTheEvent: "",
            documentTitle: "",
            periodicName: "",
            placeOfPublication: "",
            publishingCompany: "",
            volume: "",
            issueNumber: "",
            publicationMonth: "",
            publicationYear: "",
            theme: "",
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
                    Evento no todo em publicação periódica
                  </p>
                </Title>
              </Actions>
              <Card>
                <p>
                  Preencha o formulário com informações sobre a obra consultada:
                </p>
                <Content>
                  <Grid container spacing={2} style={{ marginBottom: 5 }}>
                    <Grid item xs={12} sm={12} md={5}>
                      <Input
                        name="eventName"
                        label="Nome do evento"
                        type="text"
                        placeholder="Ex: Congresso Brasileiro de Olericultura"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.eventName}
                        errors={props.errors}
                        touched={props.touched}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={2}>
                      <Input
                        name="numbering"
                        label="Numeração"
                        type="text"
                        placeholder="Ex: 41"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.numbering}
                        errors={props.errors}
                        touched={props.touched}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={5}>
                      <Input
                        name="participationEventName"
                        label="Nome do evento de participação"
                        type="text"
                        placeholder="Ex: Encontro sobre plantas medicinais, aromáticas e condimentares"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.participationEventName}
                        errors={props.errors}
                        touched={props.touched}
                      />
                    </Grid>
                  </Grid>
                  <Grid container spacing={2} style={{ marginBottom: 5 }}>
                    <Grid item xs={12} sm={12} md={4}>
                      <Input
                        name="participationEventNumbering"
                        label="Numeração do evento de participação"
                        type="text"
                        placeholder="Ex: 1"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.participationEventNumbering}
                        errors={props.errors}
                        touched={props.touched}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={2}>
                      <Input
                        name="year"
                        label="Ano"
                        type="text"
                        placeholder="Ex: 2001"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.year}
                        errors={props.errors}
                        touched={props.touched}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6}>
                      <Input
                        name="placeOfTheEvent"
                        label="Local de realização do evento"
                        type="text"
                        placeholder="Ex: Brasília, DF"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.placeOfTheEvent}
                        errors={props.errors}
                        touched={props.touched}
                      />
                    </Grid>
                  </Grid>
                  <Grid container spacing={2} style={{ marginBottom: 5 }}>
                    <Grid item xs={12} sm={12} md={7}>
                      <Input
                        name="documentTitle"
                        label="Título do documento"
                        type="text"
                        placeholder="Ex: Apresentação, artigos, palestras, instruções..."
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.documentTitle}
                        errors={props.errors}
                        touched={props.touched}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={5}>
                      <Input
                        name="periodicName"
                        label="Nome do periódico"
                        type="text"
                        placeholder="Ex: Horticultura Brasileira"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.periodicName}
                        errors={props.errors}
                        touched={props.touched}
                      />
                    </Grid>
                  </Grid>
                  <Grid container spacing={2} style={{ marginBottom: 5 }}>
                    <Grid item xs={12} sm={12} md={5}>
                      <Input
                        name="placeOfPublication"
                        label="Local de publicação do periódico"
                        type="text"
                        placeholder="Ex: Brasília, DF"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.placeOfPublication}
                        errors={props.errors}
                        touched={props.touched}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={5}>
                      <Input
                        name="publishingCompany"
                        label="Publicadora"
                        type="text"
                        placeholder="Ex: Sociedade de Olericultura do Brasil"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.publishingCompany}
                        errors={props.errors}
                        touched={props.touched}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={2}>
                      <Input
                        name="volume"
                        label="Volume"
                        type="text"
                        placeholder="Ex: 19"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.volume}
                        errors={props.errors}
                        touched={props.touched}
                      />
                    </Grid>
                  </Grid>
                  <Grid container spacing={2} style={{ marginBottom: 5 }}>
                    <Grid item xs={12} sm={12} md={3}>
                      <Input
                        name="issueNumber"
                        label="Número do fascículo"
                        type="text"
                        placeholder="Ex: 2"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.issueNumber}
                        errors={props.errors}
                        touched={props.touched}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={3}>
                      <Select
                        name="publicationMonth"
                        label="Mês"
                        type="text"
                        placeholder="Mês"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.publicationMonth}
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
                        name="publicationYear"
                        type="number"
                        label="Ano"
                        InputProps={{ inputProps: { min: 0 } }}
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.publicationYear}
                        errors={props.errors}
                        touched={props.touched}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={3}>
                      <Input
                        name="theme"
                        type="text"
                        label="Tema"
                        placeholder="Ex: Dos orgânicos aos transgênicos"
                        InputProps={{ inputProps: { min: 0 } }}
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.theme}
                        errors={props.errors}
                        touched={props.touched}
                      />
                    </Grid>
                  </Grid>
                  <Grid container spacing={2} style={{ marginBottom: 5 }}>
                    <Grid item xs={12} sm={12} md={2}>
                      <Select
                        name="online"
                        label="Online"
                        type="text"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.online}
                        errors={props.errors}
                        touched={props.touched}
                        options={[
                          { value: true, name: "Sim" },
                          { value: false, name: "Não" },
                        ]}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={3}>
                      <Input
                        name="accessedAt"
                        type="date"
                        label="Data de acesso"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        disabled={!props.values.online}
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.accessedAt}
                        errors={props.errors}
                        touched={props.touched}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={7}>
                      <Input
                        name="url"
                        label="Endereço (URL)"
                        type="text"
                        placeholder="https://viacarreira.com/"
                        disabled={!props.values.online}
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.url}
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
                  citation={state.citation}
                  citationWithAuthor={state.citationWithAuthor}
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
        <h1>Referência de evento no todo em publicação periódica</h1>
        <p>
          Os trabalhos produzidos em eventos podem ser publicados em uma revista
          científica. Nesse caso, é importante conhecer as normas da ABNT para
          referência de evento no todo em publicação periódica.
        </p>
        <p>
          A referência inclui os mesmos elementos de "evento no todo", exceto
          pelo fato de conter informações da publicação periódica. Aliás, o
          destaque em negrito deve ser aplicado no título da revista.
        </p>
        <h3>Elementos para referenciar evento no todo em periódico</h3>
        <p>
          Os elementos obrigatórios são: nome do evento, numeração, ano, local
          de realização, tipo de documento e dados do periódico. Você pode
          formular sua referência com os elementos da lista abaixo:
        </p>
        <ul style={{ marginLeft: 15 }}>
          <li> Nome do evento </li>
          <li> Numeração do evento </li>
          <li> Nome do evento de participação </li>
          <li> Numeração do evento de participação </li>
          <li> Ano de realização do evento </li>
          <li> Local de realização do evento: </li>
          <li> Título do documento </li>
          <li> Nome do periódico </li>
          <li> Local de publicação do periódico </li>
          <li> Entidade publicadora </li>
          <li> Entidade publicadora </li>
          <li> Número do fascículo </li>
          <li> Data de publicação </li>
          <li> Tema </li>
        </ul>

        <h3>Formato básico</h3>

        <p>
          <mark>
            NOME DO EVENTO PRINCIPAL, numeração.; NOME DO EVENTO DE
            PARTICIPAÇÃO, numeração., Ano, Local do evento. Tipo de documento.
            <b>Nome do periódico.</b> Local do periódico: Editora, volume,
            número do fascículo, data de publicação. Tema.
          </mark>
        </p>

        <p>
          No caso de uma consulta online ao documento, é necessário incluir a
          URL, precedida de "Disponível em:". Em seguida vem a data de acesso,
          precedida de "Acesso em".
        </p>
        <p>
          Na imagem abaixo, identificamos cada elemento dentro de um exemplo de
          referência de evento no todo em publicação periódica:
        </p>

        <img src={Img} alt="evento-todo-periodico" width="100%" />

        <h3>O que significa Suplemento?</h3>

        <p>
          No exemplo da imagem, temos a palavra Suplemento como parte da
          referência. De acordo com a NBR 6023, ela sinaliza um documento
          adicionado a outro, com relação exclusiva de editorial.1
        </p>

        <h3>Mais exemplos aplicando o formato básico</h3>

        <p>
          <mark>
            CONGRESSO DO CENTRO-OESTE DE CLÍNICOS VETERINÁRIOS DE PEQUENOS
            ANIMAIS, 3.; FEIRA DO CENTRO-OESTE DO MERCADO PET, 3., 2006,
            [Brasília, DF]. [Trabalhos científicos e casos clínicos].{" "}
            <b>Ciência Animal Brasileira.</b> Goiânia: UFG, nov. 2006.
            Suplemento 1.
          </mark>
        </p>

        <p>
          <mark>
            CONGRESSO BRASILEIRO DE OLERICULTURA, 41.; ENCONTRO SOBRE PLANTAS
            MEDICINAIS, AROMÁTICAS E CONDIMENTARES, 1., 2001, Brasília, DF.
            Apresentação, artigos, palestras, instruções.... Horticultura
            Brasileira. Brasília, DF: <b>Sociedade de Olericultura do Brasil</b>
            , v. 19, n. 2, jul. 2001. Suplemento. Tema: Dos orgânicos aos
            transgênicos.
          </mark>
        </p>

        <p>
          <mark>
            SEMINÁRIO INTERNACIONAL DE HISTÓRIA DA LITERATURA, 6., 2005, Porto
            Alegre. Anais [...].{" "}
            <b>Cadernos do Centro de Pesquisas Literárias da PUCRS.</b> Porto
            Alegre: Ed. PUCRS, v. 12, n. 1, 2006.
          </mark>
        </p>

        <p>
          <mark>
            SEMINÁRIO INTERNACIONAL DE HISTÓRIA DA LITERATURA, 6., 2005, Porto
            Alegre. Anais [...].{" "}
            <b>Cadernos do Centro de Pesquisas Literárias da PUCRS.</b> Porto
            Alegre: Ed. PUCRS, v. 12, n. 1, 2006. Tema: Literatura: memória e
            história.
          </mark>
        </p>
      </div>
      <Footer />
    </>
  );
};

export default WholeEventInPeriodicPublication;
