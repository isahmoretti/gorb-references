import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import { Collapse } from "@material-ui/core";

import { Formik, FieldArray } from "formik";

import * as Yup from "yup";

import { Grid, Button as ButtonCore } from "@material-ui/core";

// components
import Input from "../../../components/InputWrapper/Input";
import Button from "../../../components/Buttons";
import Select from "../../../components/InputWrapper/Select";
import Modal from "../../../components/Modal";
import Nav from "../../../components/Header";
import Footer from "../../../components/Footer";

// utils
import { formatDate } from "../../../utils/formatDate";
import { formatAuthorName } from "../../../utils/formatAuthorName";
import { generateCitationWithAuthor } from "../../../utils/generateCitationWithAuthor";
import { generateCitationWithoutAuthor } from "../../../utils/generateCitationWithoutAuthor";

import ArrowLeft from "../../../assets/images/arrow-left.svg";
import Plus from "../../../assets/images/plus-dark.svg";
import Minus from "../../../assets/images/minus.svg";

import chamadasCitacao from "../../../assets/images/explicativos/livro/capitulo/chamadas_para_citacao_capitulo_de_livro.jpg";
import elementosComplementares from "../../../assets/images/explicativos/livro/capitulo/Elementos_complementares_capitulo_livro.jpg";
import elementosEssenciais from "../../../assets/images/explicativos/livro/capitulo/Elementos_essenciais_capitulo_livro.jpg";

// styles
import {
  Container,
  Card,
  Row,
  Content,
  Back,
  AddIcon,
  RemoveIcon,
  FieldArrayContainer,
  ErrorText,
  Actions,
  Title,
  Header,
} from "./style";
import RelatedLinks from "../../../components/RelatedLinks";

const SignupSchema = Yup.object().shape({
  chapterAuthors: Yup.array().of(Yup.string().required("Obrigatório")),
  chapterTitle: Yup.string().required("Obrigatório"),
  title: Yup.string().required("Obrigatório"),
  local: Yup.string().required("Obrigatório"),
  publishingCompany: Yup.string().required("Obrigatório"),
  yearOfPublication: Yup.string().required("Obrigatório"),
});

const getResposabilityTypes = (responsabiltyTypes) => {
  document.title = "Capítulo de Livro: Referência ABNT";
  const metaDesc = document.querySelector('meta[name="description"]'); if (metaDesc) metaDesc.setAttribute('content', "Referência de capítulo de livro no padrão ABNT NBR 6023:2018. Preencha os dados e copie a referência completa.");
  if (responsabiltyTypes === "organizator") return "(Org.)";
  if (responsabiltyTypes === "author") return "(Aut.)";
  if (responsabiltyTypes === "coordinator") return "(Coord.)";

  return "";
};

const generateReference = (values) => {
  const {
    responsabilityType,
    title,
    caption,
    local,
    publishingCompany,
    originalTitle,
    edition,
    yearOfPublication,
    complementaryElements,
    series,
    grades,
    isbn,
    volume,
    online,
    accessedAt,
    url,
    translator,
    chapter,
    translatorName,
    chapterTitle,
    chapterAuthors,
    chapterCaption,
    captionPageInit,
    captionPageFinish,
    authors,
    abbreviate,
  } = values;

  return (
    <span>
      {formatAuthorName(chapterAuthors, abbreviate)}&nbsp;
      {chapterCaption
        ? `${chapterTitle}: ${chapterCaption}. `
        : `${chapterTitle}. `}
      <i>In</i>: {formatAuthorName(authors, abbreviate)}
      {responsabilityType && `${getResposabilityTypes(responsabilityType)}. `}
      {caption ? (
        <span>
          <b>{`${title}: `}</b>
          {`${caption}. `}
        </span>
      ) : (
        <b> {`${title}. `} </b>
      )}
      {complementaryElements &&
        translator &&
        translatorName.length &&
        `Tradução: ${translatorName}. `}
      {edition && `${edition} ed. `}
      {complementaryElements && volume && `v. ${volume}, `}
      {`${local}: ${publishingCompany}, ${yearOfPublication}. `}
      {complementaryElements && chapter && `cap. ${chapter}. `}
      {captionPageInit &&
        captionPageFinish &&
        `p. ${captionPageInit}-${captionPageFinish}, `}
      {complementaryElements && series && `(${series}). `}
      {complementaryElements &&
        originalTitle &&
        `Título original: ${originalTitle}. `}
      {/* {complementaryElements &&
        othersResponsabilities &&
        `${othersResponsabilities}. `} */}
      {complementaryElements && grades && `${grades}. `}
      {complementaryElements && isbn && `ISBN: ${isbn}. `}
      {complementaryElements && online && url && `Disponível em: ${url}. `}
      {complementaryElements &&
        online &&
        accessedAt &&
        `Acesso em: ${formatDate(accessedAt)}. `}
    </span>
  );
};
const Book = ({ back }) => {
  const [state, setState] = useState({
    values: {},
    clearInitialValues: false,
  });

  const [collapse, setCollapase] = useState(false);

  const [openModal, setOpenModal] = useState(false);

  const history = useHistory();

  const handleSubmit = (values) => {
    setState((prev) => ({
      ...prev,
      values,
      references: generateReference(values),
      citationWithAuthor: generateCitationWithAuthor(
        values.chapterAuthors,
        values.yearOfPublication
      ),
      citation: generateCitationWithoutAuthor(
        values.chapterAuthors,
        values.yearOfPublication
      ),
    }));

    setOpenModal(!openModal);
  };

  const handleSetCollapse = () => {
    setCollapase(!collapse);
  };

  return (
    <>
      <Nav />
      <Container>
        <Back onClick={() => history.push("/livros")} src={ArrowLeft} />

        <Formik
          initialValues={{
            authorType: "",
            responsabilityType: "",
            title: "",
            caption: "",
            local: "",
            publishingCompany: "",
            originalTitle: "",
            edition: "",
            yearOfPublication: "",
            complementaryElements: false,
            pagination: "",
            series: "",
            grades: "",
            isbn: "",
            volume: "",
            online: false,
            accessedAt: "",
            url: "",
            translator: true,
            chapter: "",
            translatorName: [""],
            chapterTitle: "",
            chapterAuthors: [""],
            chapterCaption: "",
            captionPageInit: "",
            captionPageFinish: "",
            authors: [""],
            abbreviate: false,
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
                    Capítulo de livro Informações sobre a obra toda
                  </p>
                </Title>
              </Actions>
              <Card>
                <p>
                  Preencha o formulário com informações sobre a obra consultada:
                </p>
                <Content>
                  <Grid container spacing={2} style={{ marginBottom: 5 }}>
                    <Grid container spacing={2} style={{ marginBottom: 5 }}>
                      <Grid
                        item
                        xs={12}
                        sm={12}
                        md={6}
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "flex-end",
                        }}
                      >
                        <Input
                          type="text"
                          label="Título do capítulo"
                          placeholder="Ex: Atos de ameaça à face e à conversação em redes sociais"
                          onChange={props.handleChange}
                          onBlur={props.handleBlur}
                          value={props.values.chapterTitle}
                          name="chapterTitle"
                          errors={props.errors}
                          touched={props.touched}
                        />
                      </Grid>
                      <Grid
                        item
                        xs={12}
                        sm={12}
                        md={6}
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "flex-end",
                        }}
                      >
                        <Input
                          type="text"
                          label="Subtítulo do capítulo"
                          placeholder="Ex: Preencher com o subtítulo (se houver)"
                          onChange={props.handleChange}
                          onBlur={props.handleBlur}
                          value={props.values.chapterCaption}
                          name="chapterCaption"
                          errors={props.errors}
                          touched={props.touched}
                        />
                      </Grid>
                      <Grid item xs={12} sm={12} md={12}>
                        <FieldArray
                          name="chapterAuthors"
                          render={(arrayHelpers) => (
                            <div>
                              {props.values.chapterAuthors &&
                              props.values.chapterAuthors.length > 0 ? (
                                props.values.chapterAuthors.map(
                                  (chapterAuthor, index) => (
                                    <FieldArrayContainer key={index}>
                                      <div
                                        style={{
                                          display: "flex",
                                          width: "100%",
                                        }}
                                      >
                                        <Input
                                          type="text"
                                          label={`Nome do autor do capítulo ${
                                            index + 1
                                          }`}
                                          placeholder="Ex: Raquel Recuero"
                                          onChange={props.handleChange}
                                          onBlur={props.handleBlur}
                                          value={chapterAuthor}
                                          name={`chapterAuthors.${index}`}
                                          errors={props.errors}
                                          touched={props.touched}
                                        />
                                        {index > 0 && (
                                          <ButtonCore
                                            type="button"
                                            disabled={index === 0}
                                            onClick={() =>
                                              arrayHelpers.remove(index)
                                            }
                                          >
                                            <RemoveIcon src={Minus} />
                                          </ButtonCore>
                                        )}
                                        {
                                          <ButtonCore
                                            type="button"
                                            onClick={() =>
                                              arrayHelpers.push("")
                                            }
                                          >
                                            <AddIcon src={Plus} />
                                          </ButtonCore>
                                        }
                                      </div>
                                      <div
                                        style={{
                                          width: "100%",
                                          marginBottom: "10px",
                                        }}
                                      >
                                        <ErrorText>
                                          {props.errors &&
                                            props.errors.chapterAuthors &&
                                            props.errors.chapterAuthors[index]}
                                        </ErrorText>
                                      </div>
                                    </FieldArrayContainer>
                                  )
                                )
                              ) : (
                                <ButtonCore
                                  type="button"
                                  onClick={() => arrayHelpers.push("")}
                                >
                                  Add a author
                                </ButtonCore>
                              )}
                            </div>
                          )}
                        />
                      </Grid>
                    </Grid>
                    <Grid container spacing={2} style={{ marginBottom: 5 }}>
                      <Grid item xs={12} sm={12} md={4}>
                        <Input
                          type="text"
                          label="Página inícial"
                          placeholder="Ex: 51"
                          onChange={props.handleChange}
                          onBlur={props.handleBlur}
                          value={props.values.captionPageInit}
                          name="captionPageInit"
                          errors={props.errors}
                          touched={props.touched}
                        />
                      </Grid>
                      <Grid item xs={12} sm={12} md={4}>
                        <Input
                          type="text"
                          label="Página final"
                          placeholder="Ex: 69"
                          onChange={props.handleChange}
                          onBlur={props.handleBlur}
                          value={props.values.captionPageFinish}
                          name="captionPageFinish"
                          errors={props.errors}
                          touched={props.touched}
                        />
                      </Grid>
                      <Grid item xs={12} sm={12} md={4}>
                        <Input
                          type="text"
                          label="Capítulo"
                          placeholder="Ex: 3"
                          onChange={props.handleChange}
                          onBlur={props.handleBlur}
                          value={props.values.chapter}
                          name="chapter"
                          errors={props.errors}
                          touched={props.touched}
                        />
                      </Grid>
                    </Grid>
                  </Grid>

                  <div
                    onClick={handleSetCollapse}
                    style={{
                      width: "100%",
                      height: 50,
                      backgroundColor: "#e6e6e6",
                      borderRadius: 5,

                      margin: "20px 0",
                      cursor: "pointer",

                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {collapse
                      ? "Fechar informações"
                      : "Abrir informações sobre a obra toda"}
                  </div>

                  <Collapse in={collapse}>
                    <Grid container spacing={2} style={{ marginBottom: 5 }}>
                      <Grid item xs={12} sm={12} md={6}>
                        <Select
                          type="text"
                          label="Tipo do autor"
                          onChange={props.handleChange}
                          onBlur={props.handleBlur}
                          value={props.values.authorType}
                          name="authorType"
                          errors={props.errors}
                          touched={props.touched}
                          options={[
                            { value: "person", name: "Pessoa" },
                            { value: "entity", name: "Entidade" },
                            { value: "withoutAuthorship", name: "Sem autoria" },
                          ]}
                        />
                      </Grid>
                      <Grid item xs={12} sm={12} md={6}>
                        <Select
                          type="text"
                          label="Tipo de responsabilidade"
                          onChange={props.handleChange}
                          onBlur={props.handleBlur}
                          value={props.values.responsabilityType}
                          name="responsabilityType"
                          errors={props.errors}
                          touched={props.touched}
                          options={[
                            { value: "author", name: "Autor" },
                            { value: "organizator", name: "Organizador" },
                            { value: "coordinator", name: "Coordenador" },
                          ]}
                        />
                      </Grid>
                    </Grid>
                    <Grid container spacing={2} style={{ marginBottom: 5 }}>
                      <Grid item xs={12} sm={12} md={12}>
                        <FieldArray
                          name="authors"
                          render={(arrayHelpers) => (
                            <div>
                              {props.values.authors &&
                              props.values.authors.length > 0 ? (
                                props.values.authors.map(
                                  (chapterAuthor, index) => (
                                    <FieldArrayContainer key={index}>
                                      <div
                                        style={{
                                          display: "flex",
                                          width: "100%",
                                        }}
                                      >
                                        <Input
                                          type="text"
                                          label={`${
                                            index + 1
                                          }º Autoria do livro`}
                                          onChange={props.handleChange}
                                          onBlur={props.handleBlur}
                                          value={chapterAuthor}
                                          name={`authors.${index}`}
                                          errors={props.errors}
                                          touched={props.touched}
                                        />
                                        {index > 0 && (
                                          <ButtonCore
                                            type="button"
                                            disabled={index === 0}
                                            onClick={() =>
                                              arrayHelpers.remove(index)
                                            }
                                          >
                                            <RemoveIcon src={Minus} />
                                          </ButtonCore>
                                        )}
                                        {
                                          <ButtonCore
                                            type="button"
                                            onClick={() =>
                                              arrayHelpers.push("")
                                            }
                                          >
                                            <AddIcon src={Plus} />
                                          </ButtonCore>
                                        }
                                      </div>
                                      <div
                                        style={{
                                          width: "100%",
                                          marginBottom: "10px",
                                        }}
                                      >
                                        <ErrorText>
                                          {props.errors &&
                                            props.errors.authors &&
                                            props.errors.authors[index]}
                                        </ErrorText>
                                      </div>
                                    </FieldArrayContainer>
                                  )
                                )
                              ) : (
                                <ButtonCore
                                  type="button"
                                  onClick={() => arrayHelpers.push("")}
                                >
                                  Add a author
                                </ButtonCore>
                              )}
                            </div>
                          )}
                        />
                      </Grid>
                    </Grid>
                    <Grid container spacing={2} style={{ marginBottom: 5 }}>
                      <Grid item xs={12} sm={12} md={3}>
                        <Select
                          name="abbreviate"
                          label="abreviar autor?"
                          type="text"
                          onChange={props.handleChange}
                          onBlur={props.handleBlur}
                          value={props.values.abbreviate}
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
                          type="text"
                          label="Título do Livro"
                          placeholder="Ex: Interações em Rede"
                          onChange={props.handleChange}
                          onBlur={props.handleBlur}
                          value={props.values.title}
                          name="title"
                          errors={props.errors}
                          touched={props.touched}
                        />
                      </Grid>
                      <Grid item xs={12} sm={12} md={4}>
                        <Input
                          type="text"
                          label="Subtítulo do Livro"
                          placeholder="Ex: Preencher com o subtítulo (se houver)"
                          onChange={props.handleChange}
                          onBlur={props.handleBlur}
                          value={props.values.caption}
                          name="caption"
                          errors={props.errors}
                          touched={props.touched}
                        />
                      </Grid>
                    </Grid>
                    <Grid container spacing={2} style={{ marginBottom: 5 }}>
                      <Grid item xs={12} sm={12} md={6}>
                        <Input
                          type="text"
                          label="Local de publicação"
                          placeholder="Ex: Porto Alegre"
                          onChange={props.handleChange}
                          onBlur={props.handleBlur}
                          value={props.values.local}
                          name="local"
                          errors={props.errors}
                          touched={props.touched}
                        />
                      </Grid>
                      <Grid item xs={12} sm={12} md={6}>
                        <Input
                          type="text"
                          label="Empresa de publicação (editora)"
                          placeholder="Ex: Editora Sulina"
                          onChange={props.handleChange}
                          onBlur={props.handleBlur}
                          value={props.values.publishingCompany}
                          name="publishingCompany"
                          errors={props.errors}
                          touched={props.touched}
                        />
                      </Grid>
                    </Grid>
                    <Grid container spacing={2} style={{ marginBottom: 5 }}>
                      <Grid item xs={12} sm={12} md={4}>
                        <Input
                          type="text"
                          label="Edição"
                          placeholder="Ex: 2"
                          onChange={props.handleChange}
                          onBlur={props.handleBlur}
                          value={props.values.edition}
                          name="edition"
                          errors={props.errors}
                          touched={props.touched}
                        />
                      </Grid>
                      <Grid item xs={12} sm={12} md={4}>
                        <Input
                          type="text"
                          label="Ano"
                          placeholder="Ex: 2016"
                          onChange={props.handleChange}
                          onBlur={props.handleBlur}
                          value={props.values.yearOfPublication}
                          name="yearOfPublication"
                          errors={props.errors}
                          touched={props.touched}
                        />
                      </Grid>
                      <Grid item xs={12} sm={12} md={4}>
                        <Input
                          type="text"
                          label="Volume"
                          placeholder="Ex: 4"
                          onChange={props.handleChange}
                          onBlur={props.handleBlur}
                          value={props.values.volume}
                          name="volume"
                          errors={props.errors}
                          touched={props.touched}
                        />
                      </Grid>
                    </Grid>
                    <Grid container spacing={2} style={{ marginBottom: 0 }}>
                      <Grid item xs={12} sm={12} md={3}>
                        <Select
                          type="text"
                          label="Elementos complementares"
                          onChange={props.handleChange}
                          onBlur={props.handleBlur}
                          value={props.values.complementaryElements}
                          name="complementaryElements"
                          errors={props.errors}
                          touched={props.touched}
                          options={[
                            { value: true, name: "Sim" },
                            { value: false, name: "Não" },
                          ]}
                        />
                      </Grid>
                      <Grid item xs={12} sm={12} md={4}>
                        <Input
                          disabled={!props.values.complementaryElements}
                          type="text"
                          label="Séries e coleções"
                          placeholder="Ex: Coleção Cibercultura"
                          onChange={props.handleChange}
                          onBlur={props.handleBlur}
                          value={props.values.series}
                          name="series"
                          errors={props.errors}
                          touched={props.touched}
                        />
                      </Grid>
                      <Grid item xs={12} sm={12} md={5}>
                        <Input
                          disabled={!props.values.complementaryElements}
                          type="text"
                          label="Nota"
                          placeholder="Ex: Informações complementares"
                          onChange={props.handleChange}
                          onBlur={props.handleBlur}
                          value={props.values.grades}
                          name="grades"
                          errors={props.errors}
                          touched={props.touched}
                        />
                      </Grid>
                    </Grid>
                    <Grid container spacing={2} style={{ marginBottom: 5 }}>
                      <Grid item xs={12} sm={12} md={8}>
                        <Input
                          disabled={!props.values.complementaryElements}
                          type="text"
                          label="ISBN"
                          placeholder="Ex: 9788520506837"
                          onChange={props.handleChange}
                          onBlur={props.handleBlur}
                          value={props.values.isbn}
                          name="isbn"
                          errors={props.errors}
                          touched={props.touched}
                          help
                          helpText="Número de livro padrão internacional"
                        />
                      </Grid>
                      <Grid item xs={12} sm={12} md={4}>
                        <Select
                          disabled={!props.values.complementaryElements}
                          type="text"
                          label="Tradutor"
                          onChange={props.handleChange}
                          onBlur={props.handleBlur}
                          value={props.values.translator}
                          name="translator"
                          errors={props.errors}
                          touched={props.touched}
                          options={[
                            { value: true, name: "Sim" },
                            { value: false, name: "Não" },
                          ]}
                        />
                      </Grid>
                    </Grid>
                    <Grid container spacing={2} style={{ marginBottom: 5 }}>
                      <Grid
                        item
                        xs={12}
                        sm={12}
                        md={6}
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "flex-end",
                        }}
                      >
                        <Input
                          type="text"
                          label="Nome do tradutor"
                          disabled={
                            !props.values.complementaryElements ||
                            !props.values.translator
                          }
                          placeholder="Ex: Tradutor (se houver)"
                          onChange={props.handleChange}
                          onBlur={props.handleBlur}
                          value={props.values.translatorName}
                          name="translatorName"
                          errors={props.errors}
                          touched={props.touched}
                        />
                      </Grid>

                      <Grid
                        item
                        xs={12}
                        sm={12}
                        md={6}
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "flex-end",
                        }}
                      >
                        <Input
                          disabled={!props.values.complementaryElements}
                          type="text"
                          label="Título original da obra"
                          placeholder="Ex: Título original do livro (se houver)"
                          onChange={props.handleChange}
                          onBlur={props.handleBlur}
                          value={props.values.originalTitle}
                          name="originalTitle"
                          errors={props.errors}
                          touched={props.touched}
                        />
                      </Grid>
                    </Grid>
                    <Grid container spacing={2} style={{ marginBottom: 5 }}>
                      <Grid item xs={12} sm={12} md={3}>
                        <Select
                          disabled={!props.values.complementaryElements}
                          type="text"
                          label="Online"
                          onChange={props.handleChange}
                          onBlur={props.handleBlur}
                          value={props.values.online}
                          name="online"
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
                          disabled={
                            !props.values.complementaryElements ||
                            !props.values.online
                          }
                          type="text"
                          label="Endereço(URL)"
                          placeholder="https://exemplo.com/"
                          onChange={props.handleChange}
                          onBlur={props.handleBlur}
                          value={props.values.url}
                          name="url"
                          errors={props.errors}
                          touched={props.touched}
                        />
                      </Grid>
                      <Grid item xs={12} sm={12} md={3}>
                        <Input
                          disabled={
                            !props.values.complementaryElements ||
                            !props.values.online
                          }
                          type="date"
                          onChange={props.handleChange}
                          onBlur={props.handleBlur}
                          value={props.values.accessedAt}
                          label="Acesso em"
                        name="accessedAt"
                          errors={props.errors}
                          touched={props.touched}
                        />
                      </Grid>
                    </Grid>
                  </Collapse>

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
        <h1>Referência de capítulo de livro (ABNT)</h1>

        <p>
          O capítulo do livro é uma parte da obra, que possui seu próprio autor
          e título. Pode acontecer do autor da obra toda não ser o responsável
          pela autoria da parte. A entrada da referência se dá sempre pelo
          sobrenome do autor do capítulo, mas depois é necessário incluir
          informações que identificam a obra em sua totalidade.
        </p>

        <h2>Como fazer referência de capítulo de livro?</h2>

        <h2>Elementos essenciais</h2>

        <p>Na referência de capítulo de livro, os elementos essenciais são:</p>

        <ul style={{ marginLeft: 15 }}>
          <li>
            {" "}
            <b>Autor da parte:</b> sobrenome e nome do responsável pelo capítulo{" "}
          </li>
          <li>
            {" "}
            <b>Título da parte:</b> Título do capítulo{" "}
          </li>
          <li>
            {" "}
            <b>
              Expressão <i>In</i>:
            </b>{" "}
            expressão latina que significa «dentro de»{" "}
          </li>
          <li>
            {" "}
            <b>Título da obra:</b> Título da obra completa{" "}
          </li>
          <li>
            {" "}
            <b>Responsável pela obra completa:</b> nome do responsável pela obra{" "}
          </li>
          <li>
            {" "}
            <b>Edição:</b> informe a edição (se houver){" "}
          </li>
          <li>
            {" "}
            <b>informe a edição (se houver):</b> cidade da editora{" "}
          </li>
          <li>
            {" "}
            <b>Editora:</b> Nome da empresa publicadora{" "}
          </li>
          <li>
            {" "}
            <b>Ano:</b> Ano de publicação{" "}
          </li>
          <li>
            {" "}
            <b>Descrição física:</b> página inicial e página final do capítulo.{" "}
          </li>
        </ul>

        <p>
          Considerando apenas os elementos essenciais, a referência segue o
          seguinte formato:
        </p>

        <p>
          <mark>
            ÚLTIMO NOME, Primeiro Nome do autor do capítulo. Título do capítulo.
            <i>In</i>: ÚLTIMO NOME, Primeiro nome do autor.{" "}
            <b>Título da obra:</b>
            Subtítulo. Local: Editora, ano de publicação. p.(página inicial do
            capítulo) - (página final do capítulo).
          </mark>
        </p>

        <h2>
          Exemplo de referência de capítulo de livro (elementos essenciais)
        </h2>

        <img loading="lazy"
          src={elementosEssenciais}
          alt="Elementos essenciais para referência bibliográfica ABNT"
          width="100%"
        />

        <h2>Elementos complementares</h2>

        <p>
          Para melhorar a identificação do documento, os elementos
          complementares são bem-vindos na referência:
        </p>

        <ul style={{ marginLeft: 15 }}>
          <li>
            {" "}
            <b>Nome do tradutor:</b> Nome do tradutor por extenso, precedido por
            [Tradução:]{" "}
          </li>
          <li>
            {" "}
            <b>Título original da obra:</b> Título original da obra traduzida,
            precedido por [Título Original:]{" "}
          </li>
          <li>
            {" "}
            <b>Número do volume:</b> números algarismos arábicos precedido por
            “v.” e entre vírgulas.{" "}
          </li>
          <li>
            {" "}
            <b>Série ou Coleção:</b> nome da série entre parênteses.{" "}
          </li>
          <li>
            {" "}
            <b>ISBN:</b> Número Padrão Internacional de Livro.{" "}
          </li>
        </ul>

        <h2>
          Exemplo de referência de capítulo de livro (elementos complementares)
        </h2>

        <img loading="lazy"
          src={elementosComplementares}
          alt="Elementos complementares para referência bibliográfica ABNT"
          width="100%"
        />

        <p>
          Quando o autor do capítulo é o mesmo autor da parte referenciada,
          repete-se o nome do responsável após a expressão <i>In</i>:.
        </p>

        <p>
          No caso de um livro consultado pela internet, é necessário incluir
          informações sobre disponibilidade e acesso no final da referência.
        </p>

        <h2>Exemplo:</h2>

        <p>
          <mark>
            OLIVEIRA, H. P. C. DE; VIDOTTI, S. A. B. G.; BENTES, V. Arquitetura
            da informação. <i>In</i>: OLIVEIRA, H. P. C. DE; VIDOTTI, S. A. B.
            G.; BENTES, V.. <b>Arquitetura da informação pervasiva.</b> São
            Paulo: UNESP; São Paulo: Cultura Acadêmica, 2015. p. 43-74.
            Disponível em:
            http://static.scielo.org/scielobooks/6cn9c/pdf/oliveira-9788579836671.pdf.
            Acesso em: 13 ago 2020.
          </mark>
        </p>

        <h2>Chamadas para citações</h2>

        <img loading="lazy" src={chamadasCitacao} alt="Chamada para citação no sistema autor-data ABNT" width="100%" />

        <p>
          Embora seja opcional, apresentar a página em que o trecho ou
          pensamento se encontra é recomendado.
        </p>

        <h2>Exemplo:</h2>

        <p>
          <mark>Recuero (2016, p. 54) trecho citado [...]</mark>
        </p>

        <p>
          <mark>[...] trecho citado (RECUERO, 2016, p. 54).</mark>
        </p>
      </div>
      <RelatedLinks />

      <Footer />
    </>
  );
};

export default Book;
