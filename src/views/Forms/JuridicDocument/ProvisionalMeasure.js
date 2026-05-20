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
import { generateCitationWithAuthor } from "../../../utils/generateCitationWithAuthor";
import { generateCitationWithoutAuthor } from "../../../utils/generateCitationWithoutAuthor";

import ArrowLeft from "../../../assets/images/arrow-left.svg";
import Img from "../../../assets/images/explicativos/juridicos/elementos_medida-provisoria.jpg";

// styles
import { Container, Card, Row, Content, Back, Actions, Title } from "./style";
import RelatedLinks from "../../../components/RelatedLinks";

const SignupSchema = Yup.object().shape({
  publicationDate: Yup.string().required("Obrigatório"),
  publication: Yup.string().required("Obrigatório"),
  author: Yup.string().required("Obrigatório"),
  type: Yup.string().required("Obrigatório"),
  number: Yup.string().required("Obrigatório"),
  documentSigningDate: Yup.string().required("Obrigatório"),
});

const generateReference = (values) => {
  document.title = "Medida Provisória: Referência ABNT";
  const metaDesc = document.querySelector('meta[name="description"]'); if (metaDesc) metaDesc.setAttribute('content', "Crie referências de medida provisória conforme a ABNT NBR 6023:2018. Ferramenta gratuita e atualizada.");
  const {
    author,
    type,
    number,
    documentSigningDate,
    menu, // ementa
    note,
    publication,
    publicationLocal,
    publicationDate,
    section,
    page,
    url,
    accessedAt,
  } = values;

  return (
    <span>
      {author && <>{author.toUpperCase()}. </>}
      {type && <>{type} </>}
      {number && <>nº {number},&nbsp;</>}
      {documentSigningDate && <>de {formatDate(documentSigningDate)}. </>}
      {menu && <>{menu}. </>}
      {publication && <b>{publication}, </b>}
      {publicationLocal && <>{publicationLocal}, </>}
      {publicationDate && <>{formatDate(publicationDate)}. </>}
      {section && <>Seção {section}, </>}
      {page && <> p. {page}. </>}
      {note && <>{note}. </>}
      {accessedAt &&
        url &&
        ` Disponível em: ${url}. Acesso em: ${formatDate(accessedAt)}. `}
    </span>
  );
};

const ProvisionalMeasure = ({
  back }) => {
  document.title = "Medida Provisória: Referência ABNT";
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
        values.publicationDate
      ),
      citation: generateCitationWithoutAuthor(
        values.author,
        values.publicationDate
      ),
    }));

    setOpenModal(!openModal);
  };

  return (
    <>
      <Nav />
      <Container>
        <Back
          onClick={() => history.push("/documentos-juridicos-e-civis")}
          src={ArrowLeft}
        />

        <Formik
          initialValues={{
            author: "",
            type: "Medida Provisória",
            number: "",
            documentSigningDate: "",
            menu: "",
            note: "",
            publication: "",
            publicationLocal: "",
            publicationDate: "",
            section: "",
            page: "",
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
                    Medida Provisória
                  </p>
                </Title>
              </Actions>
              <Card>
                <p>
                  Preencha o formulário com informações sobre a obra consultada:
                </p>
                <Content>
                  <Grid container spacing={2} style={{ marginBottom: 5 }}>
                    <Grid item xs={12} sm={12} md={4}>
                      <Input
                        type="text"
                        label="Autor"
                        placeholder="Ex: Brasil"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.author}
                        name="author"
                        errors={props.errors}
                        touched={props.touched}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={4}>
                      <Input
                        type="text"
                        label="Tipo"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.type}
                        name="type"
                        errors={props.errors}
                        touched={props.touched}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={4}>
                      <Input
                        type="text"
                        label="Número"
                        placeholder="Ex: 648"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.number}
                        name="number"
                        errors={props.errors}
                        touched={props.touched}
                      />
                    </Grid>
                  </Grid>
                  <Grid container spacing={2} style={{ marginBottom: 5 }}>
                    <Grid item xs={12} sm={12} md={12}>
                      <Input
                        type="text"
                        label="Ementa"
                        rows="2"
                        placeholder="Altera a Lei nº 4.117, de 27 de agosto de 1962, e dispõe sobre a flexibilização do horário de transmissão do programa oficial de informações dos Poderes da República, durante a Copa do Mundo FIFA 2014"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.menu}
                        name="menu"
                        errors={props.errors}
                        touched={props.touched}
                      />
                    </Grid>
                  </Grid>
                  <Grid container spacing={2} style={{ marginBottom: 5 }}>
                    <Grid item xs={12} sm={12} md={4}>
                      <Input
                        type="date"
                        label="Data de assinatura do documento"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.documentSigningDate}
                        name="documentSigningDate"
                        errors={props.errors}
                        touched={props.touched}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={4}>
                      <Input
                        type="text"
                        label="Nota"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.note}
                        name="note"
                        errors={props.errors}
                        touched={props.touched}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={4}>
                      <Input
                        type="text"
                        label="Publicação"
                        placeholder="Ex: Diário Oficial da União"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.publication}
                        name="publication"
                        errors={props.errors}
                        touched={props.touched}
                      />
                    </Grid>
                  </Grid>
                  <Grid container spacing={2} style={{ marginBottom: 5 }}>
                    <Grid item xs={12} sm={12} md={4}>
                      <Input
                        type="text"
                        label="Local da publicação"
                        placeholder="Ex: Brasília, DF"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.publicationLocal}
                        name="publicationLocal"
                        errors={props.errors}
                        touched={props.touched}
                      />
                    </Grid>
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
                    <Grid item xs={12} sm={12} md={4}>
                      <Input
                        type="text"
                        label="Seção"
                        placeholder="Ex: Seção 1"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.section}
                        name="section"
                        errors={props.errors}
                        touched={props.touched}
                      />
                    </Grid>
                  </Grid>
                  <Grid container spacing={2} style={{ marginBottom: 5 }}>
                    <Grid item xs={12} sm={12} md={4}>
                      <Input
                        type="text"
                        label="Página"
                        placeholder="Ex: 1"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.page}
                        name="page"
                        errors={props.errors}
                        touched={props.touched}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={4}>
                      <Input
                        type="text"
                        label="Disponível em"
                        placeholder="Ex: https://exemplo.com/"
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
        <h1>Referência bibliográfica de medida provisória (ABNT)</h1>

        <p>
          As medidas provisórias, também conhecidas pela sigla MPVs, ocorrem
          quando o presidente da república edita uma lei em situação de
          urgência. Essa mudança na legislação, por sua vez, precisa ser
          aprovada na Câmara dos Deputados e no Senado Federal para se
          transformar em lei ordinária.
        </p>

        <p>
          Todo texto de medida provisória é publicado no Diário Oficial da
          União. A partir dessa publicação são contados os prazos de vigência e
          inicia-se a tramitação no Congresso Nacional.
        </p>

        <p>
          A ABNT ensina como fazer referência de medida provisória no tópico de
          documentos jurídicos, logo no subitem "legislação".
        </p>

        <h2>Elementos essenciais</h2>

        <p>
          A referência bibliográfica de medida provisória deve apresentar os
          seguintes elementos:
        </p>

        <ul style={{ marginLeft: 15 }}>
          <li>
            {" "}
            <b>Jurisdição:</b> em letras maiúsculas;{" "}
          </li>
          <li>
            {" "}
            <b>Tipo de documento jurídico:</b> Medida provisória;{" "}
          </li>
          <li>
            {" "}
            <b>Número:</b> indicação numérica que identifica a MP;{" "}
          </li>
          <li>
            {" "}
            <b>Data de criação:</b> dia, mês e ano da criação da medida;{" "}
          </li>
          <li>
            {" "}
            <b>Ementa:</b> síntese da medida provisória;{" "}
          </li>
          <li>
            {" "}
            <b>Publicação:</b> indicação de publicação oficial;{" "}
          </li>
          <li>
            {" "}
            <b>Local:</b> cidade onde ocorreu a publicação;{" "}
          </li>
          <li>
            {" "}
            <b>Data de publicação:</b> dia, mês e ano;{" "}
          </li>
          <li>
            {" "}
            <b>Páginação:</b> página inicial e página final onde se encontra o
            documento.{" "}
          </li>
        </ul>

        <p>
          Em caso de ementa grande, existe a possibilidade de usar o recurso de
          supressão de texto, ou seja, colocar apenas uma parte da ementa e
          completar com reticências entre colchetes [...].
        </p>

        <h2>Exemplos</h2>

        <img loading="lazy" src={Img} alt="Exemplo de referência de medida provisória ABNT" width="100%" />

        <p>
          <mark>
            BRASIL. Medida provisória nº 648, de 3 de junho de 2014. Altera a
            Lei nº 4.117, de 27 de agosto de 1962, e dispõe sobre a
            flexibilização do horário de transmissão do programa oficial de
            informações dos Poderes da República, durante a Copa do Mundo FIFA
            2014. <b>Diário Oficial da União</b>, Brasília, DF, 4 jun. 2014.
            Seção 1, p. 1.
          </mark>
        </p>

        <p>
          <mark>
            BRASIL. Medida Provisória nº 1.986-11, de 26 de outubro de 2000.
            FGTS. Seguro-desemprego. Empregado doméstico.{" "}
            <b>Diário Oficial da União</b>, Brasília, DF, 27 out. 2000. p. 48.
          </mark>
        </p>

        <h2>O que fazer se a MP for consultada pela internet? </h2>

        <p>
          Em caso de uma medida provisória consultada online, em fonte não
          oficial, é recomendado destacar o tipo de documento e a numeração.
          Outro ponto importante é mencionar o endereço eletrônico e a data de
          acesso na parte final da referência.
        </p>
      </div>
      <RelatedLinks />

      <Footer />
    </>
  );
};

export default ProvisionalMeasure;
