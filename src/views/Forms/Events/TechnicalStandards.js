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
        <Back onClick={() => history.push("/evento")} src={ArrowLeft} />

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
        <h1> Referência de evento no todo em publicação periódica (ABNT) </h1>
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
        <ul>
          <li>Nome do evento</li>

          <li> Numeração do evento </li>
          <li> Nome do evento de participação </li>
          <li> Numeração do evento de participação </li>
          <li> Ano de realização do evento </li>
          <li> Local de realização do evento: </li>
          <li> Título do documento </li>
          <li> Nome do periódico </li>
          <li> Local de publicação do periódico </li>
          <li> Entidade publicadora </li>
          <li> Volume </li>
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

        <img src={Img} alt="normas-tecnicas" width="100%" />

        <h3>O que significa Suplemento?</h3>

        <p>
          No exemplo da imagem, temos a palavra Suplemento como parte da
          referência. De acordo com a NBR 6023, ela sinaliza um documento
          adicionado a outro, com relação exclusiva de editorial.
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
            Brasileira. Brasília, DF:{" "}
            <b>Sociedade de Olericultura do Brasil,</b> v. 19, n. 2, jul. 2001.
            Suplemento. Tema: Dos orgânicos aos transgênicos.
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

export default TechnicalStandards;
