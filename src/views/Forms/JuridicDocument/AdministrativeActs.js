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

// utils
import { formatDate } from "../../../utils/formatDate";

import ArrowLeft from "../../../assets/images/arrow-left.svg";
import Img from "../../../assets/images/explicativos/juridicos/elementos_ato_administrativo (1).jpg";

// styles
import { Container, Card, Row, Content, Back, Actions, Title } from "./style";

const SignupSchema = Yup.object().shape({
  author: Yup.string().required("Obrigatório"),
  responsible: Yup.string().required("Obrigatório"),
  year: Yup.string().required("Obrigatório"),
  publication: Yup.string().required("Obrigatório"),
});

const generateReference = (values) => {
  const {
    author,
    responsible,
    type,
    number,
    dateDoc,
    menu,
    publication,
    caption,
    location,
    year,
    numberl,
    page,
    yearPublication,
    online,
    url,
    accessedAt,
  } = values;

  return (
    <span>
      {author && `${author.toUpperCase()}. `}
      {responsible && `${responsible}. `}
      {type && `${type} `}
      {number && `nº ${number}, `}
      {dateDoc && `${dateDoc}. `}
      {menu && `${menu}. `}
      {caption ? (
        <>
          <b>{publication}: </b>
          <>{caption}, </>
        </>
      ) : (
        <>
          <b>{publication}. </b>
        </>
      )}
      {location && `${location}, `}
      {year &&
        `ano ${year}${
          numberl || page || yearPublication || online || accessedAt || url
            ? ", "
            : ". "
        }`}
      {numberl && `n. ${numberl}, `}
      {page && `p. ${page}, `}
      {yearPublication && `${formatDate(yearPublication)}. `}
      {online &&
        accessedAt &&
        url &&
        `Disponível em: ${url}. Acesso em: ${formatDate(accessedAt)}. `}
    </span>
  );
};

const AdministrativeActs = ({ back }) => {
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
        <Back
          onClick={() => history.push("/documentos-juridicos")}
          src={ArrowLeft}
        />

        <Formik
          initialValues={{
            author: "",
            responsible: "",
            type: "",
            number: "",
            dateDoc: "",
            menu: "",
            notes: "",
            publication: "",
            location: "",
            year: "",
            numberl: "",
            page: "",
            yearPublication: "",
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
                    Atos administrativos
                  </p>
                  <span>
                    Ato normativo, aviso, circular, contrato, decreto,
                    deliberação, despacho, edital, estatuto, instrução
                    normativa, ofício, parecer, parecer técnico, portaria,
                    regimento, regulamento e resolução
                  </span>
                </Title>
              </Actions>
              <Card>
                <Content>
                  <Grid container spacing={2} style={{ marginBottom: 5 }}>
                    <Grid item xs={12} sm={12} md={6}>
                      <Input
                        name="author"
                        label="Autor"
                        placeholder="Ex: Banco Central do Brasil"
                        type="text"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.author}
                        errors={props.errors}
                        touched={props.touched}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6}>
                      <Input
                        name="responsible"
                        label="Responsável"
                        placeholder="Ex: Diretoria Colegiada"
                        type="text"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.responsible}
                        errors={props.errors}
                        touched={props.touched}
                      />
                    </Grid>
                  </Grid>
                  <Grid container spacing={2} style={{ marginBottom: 0 }}>
                    <Grid item xs={12} sm={12} md={2}>
                      <Input
                        name="type"
                        label="Título"
                        placeholder="Ex: Circular"
                        type="text"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.type}
                        errors={props.errors}
                        touched={props.touched}
                      />
                    </Grid>

                    <Grid item xs={12} sm={12} md={2}>
                      <Input
                        name="number"
                        label="Número"
                        placeholder="Ex: 3.348"
                        type="text"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.number}
                        errors={props.errors}
                        touched={props.touched}
                      />
                    </Grid>

                    <Grid item xs={12} sm={12} md={8}>
                      <Input
                        name="dateDoc"
                        label="Data de assinatura do documento"
                        placeholder="Ex: 3 de maio de 2007"
                        type="text"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.dateDoc}
                        errors={props.errors}
                        touched={props.touched}
                      />
                    </Grid>
                  </Grid>
                  <Grid container spacing={2} style={{ marginBottom: 0 }}>
                    <Grid item xs={12} sm={12} md={6}>
                      <Input
                        name="menu"
                        label="Ementa"
                        placeholder="Ex: Altera o Regulamento do Mercado de Câmbio e Capitais Internacionais"
                        type="text"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.menu}
                        errors={props.errors}
                        touched={props.touched}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6}>
                      <Input
                        name="notes"
                        label="Notas"
                        placeholder="Ex: Elementos complementares"
                        type="text"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.notes}
                        errors={props.errors}
                        touched={props.touched}
                      />
                    </Grid>
                  </Grid>
                  <Grid container spacing={2} style={{ marginBottom: 5 }}>
                    <Grid item xs={12} sm={12} md={4}>
                      <Input
                        name="publication"
                        label="Publicação"
                        placeholder="Ex: Diário Oficial da União"
                        type="text"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.publication}
                        errors={props.errors}
                        touched={props.touched}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={4}>
                      <Input
                        name="caption"
                        label="Subtítulo da publicação"
                        placeholder="Ex: Subitítulo, se houver"
                        type="text"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.caption}
                        errors={props.errors}
                        touched={props.touched}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={4}>
                      <Input
                        name="location"
                        label="Local da publicação"
                        placeholder="Ex: Brasília, DF"
                        type="text"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.location}
                        errors={props.errors}
                        touched={props.touched}
                      />
                    </Grid>
                  </Grid>
                  <Grid container spacing={2} style={{ marginBottom: 5 }}>
                    <Grid item xs={12} sm={12} md={3}>
                      <Input
                        name="yearPublication"
                        type="date"
                        label="Data de publicação"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.yearPublication}
                        errors={props.errors}
                        touched={props.touched}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={3}>
                      <Input
                        name="year"
                        label="Ano"
                        placeholder="Ex: 144"
                        type="text"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.year}
                        errors={props.errors}
                        touched={props.touched}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={3}>
                      <Input
                        name="numberl"
                        label="Número"
                        placeholder="Ex: 85"
                        type="text"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.numberl}
                        errors={props.errors}
                        touched={props.touched}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={3}>
                      <Input
                        name="page"
                        label="Página"
                        placeholder="Ex: 32"
                        type="text"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.page}
                        errors={props.errors}
                        touched={props.touched}
                      />
                    </Grid>
                  </Grid>
                  <Grid container spacing={2} style={{ marginBottom: 5 }}>
                    <Grid item xs={12} sm={12} md={3}>
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
                    <Grid item xs={12} sm={12} md={6}>
                      <Input
                        disabled={!props.values.online}
                        name="url"
                        label="Endereço(URL)"
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
                        label="Data de acesso"
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
                  // citationWithAuthor={state.citationWithAuthor}
                  // citation={state.citation}
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
        <h1>Referência bibliográfica de atos administrativos (ABNT)</h1>

        <p>
          A ABNT explica como fazer referência bibliográfica de atos
          administrativos na parte de documentos jurídicos na NBR 6023. Essa
          categoria inclui ato normativo, circular, decreto, despacho, edital,
          estatuto, deliberação, ordem de serviço, ofício, parecer técnico,
          portaria, regulamento, edital, estatuto, regimento, entre outros
          documentos.
        </p>

        <p>
          Um ato administrativo pode ser simples ou composto. Uma portaria
          expedida por um ministro, por exemplo, é considerado um ato simples,
          assim como a decisão de um órgão colegiado. Já o composto decorre da
          vontade de um único órgão, mas depende da verificação de por parte de
          outro.
        </p>

        <p>
          Nas modalidades de atos administrativos, também existe o ato complexo,
          que depende da conjugação de vontade de mais de um órgão. Exemplo: um
          decreto assinado pelo chefe do executivo e que depois é referendado
          pelo ministro de estado.
        </p>

        <h3>Elementos essenciais</h3>

        <ul>
          <li>
            {" "}
            <b>Jurisdição ou entidade:</b> em letras maiúsculas;{" "}
          </li>
          <li>
            {" "}
            <b>Responsável:</b> órgão que se responsabiliza pelo ato;{" "}
          </li>
          <li>
            {" "}
            <b>Tipo de documento:</b> pode ser decreto, circular, estatuto,
            entre outros;{" "}
          </li>
          <li>
            {" "}
            <b>Numeração:</b> número que identifica o documento;{" "}
          </li>
          <li>
            {" "}
            <b>Data de assinatura:</b> dia, mês e ano de quando o documento foi
            assinado;{" "}
          </li>
          <li>
            {" "}
            <b>Ementa:</b> síntese do ato administrativo;{" "}
          </li>
          <li>
            {" "}
            <b>Dados da publicação:</b> título da publicação, local da
            publicação, data, número e páginas.{" "}
          </li>
        </ul>

        <p>
          Itens como alterações, revogações e retificações podem ser inseridos
          como elementos complementares na referência.
        </p>

        <h3>Exemplos</h3>

        <img src={Img} alt="atos-administrativos" width="100%" />

        <p>
          <mark>
            CONSELHO ESTADUAL DE SAÚDE (Rio de Janeiro). Deliberação nº
            05/CES/SES, de 6 de junho de 1997. Aprova o Regimento Interno do
            Conselho Estadual de Saúde.{" "}
            <b>Diário Oficial [do] Estado do Rio de Janeiro:</b> parte 1: Poder
            Executivo, Niterói, ano 23, n. 139, p. 29-31, 30 jul. 1997.
          </mark>
        </p>

        <p>
          <mark>
            VARGINHA (MG). Edital de licitação nº189/2007. Pregão no 151/2007.
            [Aquisição de leite pasteurizado]. Varginha: órgão oficial do
            município, Varginha, ano 7, n. 494, p. 15, 31 maio 2007.
          </mark>
        </p>

        <h3>Ato administrativo consultado em meio eletrônico</h3>

        <p>
          <mark>
            BRASIL. Ministério da Educação. <b>Ofício circular 017/MEC.</b>{" "}
            Brasília, DF: Ministério da Educação, 26 jan. 2006. Assunto: FUNDEB.
            Disponível em:
            http://portal.mec.gov.br/seb/arquivos/pdf/Fundebef/ofsmeincl.pdf.
            Acesso em: 26 ago. 2020.
          </mark>
        </p>

        <p>
          <mark>
            UNIVERSIDADE FEDERAL DE UBERLÂNDIA. Conselho Universitário.
            <b> Resolução n° 01/2007,</b> de 29 de março de 2007. Dispõe sobre a
            criação da modalidade Bacharelado do curso de Graduação em Educação
            Física. Uberlândia: Conselho Universitário, 2007. Disponível em:
            http://www.reitoria.ufu.br/consultaAtaResolucao.php?tipoDocumento=resolucao&conselho=TODOS&anoInicioBusca=2007&anoFimBusca=2007&entrada=&pag=1.
            Acesso em: 26 ago. 2020.
          </mark>
        </p>

        <p>
          <mark>
            BRASIL. Ministério da Fazenda. Secretaria de Acompanhamento
            Econômico. <b>Parecer técnico nº 06370/2006/RJ.</b> Rio de Janeiro:
            Ministério da Fazenda, 13 set. 2006. Disponível em:
            http://www.cade.gov.
            br/Plenario/Sessao_386/Pareceres/ParecerSeae-AC-2006-08012.008423-International_BusInes_MachIne.
            PDF. Acesso em: 4 out. 2010.
          </mark>
        </p>

        <p>
          <mark>
            BRASIL. Ministério da Fazenda. Secretaria de Acompanhamento
            Econômico. <b>Parecer técnico nº 06370/2006/RJ.</b> Ministério da
            Fazenda: Rio de Janeiro, ano , n. , p. , 13 set. 2006. Disponível
            em: http://www.cade.gov.
            br/Plenario/Sessao_386/Pareceres/ParecerSeae-AC-2006-08012.008423-International_BusInes_MachIne.
            Acesso em: 26 ago. 2020.
          </mark>
        </p>
      </div>
      <Footer />
    </>
  );
};

export default AdministrativeActs;
