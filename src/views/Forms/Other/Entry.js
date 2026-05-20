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
import { formatMonosyllable } from "../../../utils/monosyllable";

import ArrowLeft from "../../../assets/images/arrow-left.svg";
import Plus from "../../../assets/images/plus-dark.svg";
import Minus from "../../../assets/images/minus.svg";
import Img from "../../../assets/images/explicativos/outros/referencia-abnt-verbete.jpg";

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
} from "./style";

const SignupSchema = Yup.object().shape({
  // entryTitle: Yup.string().required("Obrigatório"),
  // title: Yup.string().required("Obrigatório"),
  // publishingCompany: Yup.string().required("Obrigatório"),
  // year: Yup.string().required("Obrigatório"),
});

const generateReference = (values) => {
  const {
    entryAuthorType,
    entryResponsabilityType,
    partAuthors,
    abbreviate,
    entryTitle,
    entryCaption,

    authorType,
    responsabilityType,
    authorOfTheWhole,
    title,
    caption,
    edition,
    local,
    publishingCompany,
    year,

    initialPage,
    finalPage,
    series,
    notes,
    typeAndSupport,

    url,
    accessedAt,
  } = values;

  const getResposabilityTypes = (responsabilityType) => {
    if (responsabilityType === "compiler") return "(Comp.)";
    if (responsabilityType === "editor") return "(Ed.)";
    if (responsabilityType === "organizator") return "(Org.)";
    return "";
  };

  const mostrarEntidade = (entidades = []) => {
    return entidades.map((item) => item.toUpperCase()).join("; ");
  };

  const tipoAutor = {
    physicalPerson: (
      <>
        <>{formatAuthorName(partAuthors, abbreviate)}</>
        <>
          {entryCaption ? (
            <>
              {entryTitle}: {entryCaption}.&nbsp;
            </>
          ) : (
            <>{entryTitle}. </>
          )}
        </>
      </>
    ),
    entity: (
      <>
        <>{mostrarEntidade(partAuthors)}</>
        {entryResponsabilityType !== "author" ? (
          <> {getResposabilityTypes(entryResponsabilityType)}. </>
        ) : (
          <>. </>
        )}
        <>
          {entryCaption ? (
            <>
              {entryTitle}: {entryCaption}.&nbsp;
            </>
          ) : (
            <>{entryTitle}. </>
          )}
        </>
      </>
    ),
    withoutAuthorship: (
      <>
        {entryCaption ? (
          <>
            {formatMonosyllable(entryTitle)}: {entryCaption}.&nbsp;
          </>
        ) : (
          <>{formatMonosyllable(entryTitle)}. </>
        )}
      </>
    ),
  };

  const tipoAutorSegundaParte = {
    physicalPerson: (
      <>
        <>
          <i>In: </i>
          {formatAuthorName(authorOfTheWhole)}
        </>
        <>
          {caption ? (
            <>
              <b>{title}</b>: {caption}.&nbsp;
            </>
          ) : (
            <>
              <b>{title}</b>.{" "}
            </>
          )}
        </>
        {edition && <>{edition} ed. </>}
        {local ? <>{local}: </> : <>[S. l.]: </>}
        {publishingCompany && <>{publishingCompany}, </>}
        {year && <>{year}. </>}
        {initialPage && !finalPage && `p. ${initialPage}. `}
        {initialPage && finalPage && `p. ${initialPage}-${finalPage}. `}
        {series && <>({series}). </>}
        {notes && <>{notes}. </>}
      </>
    ),
    entity: (
      <>
        <>
          <i>In: </i>
          {mostrarEntidade(authorOfTheWhole)}.&nbsp;
        </>
        <>
          {caption ? (
            <>
              {title}: {caption}.&nbsp;
            </>
          ) : (
            <>{title}. </>
          )}
        </>
        {edition && <>{edition} ed. </>}
        {local ? <>{local}: </> : <>[S. l.]: </>}
        {publishingCompany && <>{publishingCompany}, </>}
        {year && <>{year}. </>}
        {initialPage && !finalPage && `p. ${initialPage}. `}
        {initialPage && finalPage && `p. ${initialPage}-${finalPage}. `}
        {series && <>({series}). </>}
      </>
    ),
    withoutAuthorship: (
      <>
        {caption ? (
          <>
            <i>In: </i>
            {formatMonosyllable(title)}: {caption}.&nbsp;
          </>
        ) : (
          <>
            <i>In: </i>
            {formatMonosyllable(title)}.{" "}
          </>
        )}

        {edition && <>{edition} ed. </>}
        {local ? <>{local}: </> : <>[S. l.]: </>}
        {publishingCompany && <>{publishingCompany}, </>}
        {year && <>{year}. </>}
        {initialPage && !finalPage && `p. ${initialPage}. `}
        {initialPage && finalPage && `p. ${initialPage}-${finalPage}. `}
        {series && <>({series}). </>}
        {notes && <>{notes}. </>}
      </>
    ),
  };

  const getTypeAndSupport = (type) => {
    switch (type) {
      case "cd-rom":
        return "CD-ROM. ";

      case "printed":
        return "Impresso. ";
      default:
        break;
    }
  };

  return (
    <span>
      <>{tipoAutor[entryAuthorType]}</>
      <>{tipoAutorSegundaParte[authorType]}</>
      {typeAndSupport && <>{getTypeAndSupport(typeAndSupport)}</>}
      {typeAndSupport !== "printed" &&
        accessedAt &&
        url &&
        `Disponível em: ${url}. Acesso em: ${formatDate(accessedAt)}. `}
    </span>
  );
};
const Entry = ({ back }) => {
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
      citationWithAuthor: "",
      citation: "",
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
        <Back onClick={() => history.push("/outros")} src={ArrowLeft} />
        <Formik
          initialValues={{
            entryAuthorType: "",
            entryResponsabilityType: "",
            abbreviate: false,
            partAuthors: [""],
            entryTitle: "",
            entryCaption: "",

            authorType: "",
            responsabilityType: "",
            authorOfTheWhole: [""],
            title: "",
            caption: "",
            edition: "",
            local: "",
            publishingCompany: "",
            year: "",

            initialPage: "",
            finalPage: "",
            series: "",
            notes: "",
            typeAndSupport: "",

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
                    Verbete de dicionário/enciclopédia
                  </p>
                </Title>
              </Actions>
              <Card>
                <p>
                  Preencha o formulário com informações sobre a obra consultada:
                </p>
                <p>Informações do Verbete</p>
                <Content>
                  <Grid container spacing={2} style={{ marginBottom: 5 }}>
                    <Grid container spacing={2} style={{ marginBottom: 5 }}>
                      <Grid item xs={12} sm={12} md={5}>
                        <Select
                          type="text"
                          label="Tipo do autor"
                          onChange={props.handleChange}
                          onBlur={props.handleBlur}
                          value={props.values.entryAuthorType}
                          name="entryAuthorType"
                          errors={props.errors}
                          touched={props.touched}
                          options={[
                            { value: "physicalPerson", name: "Pessoa física" },
                            { value: "entity", name: "Entidade" },
                            { value: "withoutAuthorship", name: "Sem autoria" },
                          ]}
                        />
                      </Grid>
                      <Grid item xs={12} sm={12} md={5}>
                        <Select
                          type="text"
                          label="Tipo de responsabilidade"
                          onChange={props.handleChange}
                          onBlur={props.handleBlur}
                          value={props.values.entryResponsabilityType}
                          name="entryResponsabilityType"
                          errors={props.errors}
                          touched={props.touched}
                          disabled={
                            props.values.entryAuthorType === "withoutAuthorship"
                          }
                          options={[
                            { value: "author", name: "Autor" },
                            { value: "compiler", name: "Compilador" },
                            { value: "editor", name: "Editor" },
                            { value: "organizator", name: "Organizador" },
                          ]}
                        />
                      </Grid>
                      <Grid item xs={12} sm={12} md={2}>
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
                    </Grid>
                    <Grid container spacing={2} style={{ marginBottom: 5 }}>
                      <Grid item xs={12} sm={12} md={12}>
                        <FieldArray
                          name="partAuthors"
                          render={(arrayHelpers) => (
                            <div>
                              {props.values.partAuthors &&
                              props.values.partAuthors.length > 0 ? (
                                props.values.partAuthors.map(
                                  (chapterAuthor, index) => (
                                    <FieldArrayContainer key={index}>
                                      <div
                                        style={{
                                          display: "flex",
                                          width: "100%",
                                        }}
                                      >
                                        <Input
                                          disabled={
                                            props.values.entryAuthorType ===
                                            "withoutAuthorship"
                                          }
                                          type="text"
                                          label={`Autor da parte ${index + 1}`}
                                          onChange={props.handleChange}
                                          onBlur={props.handleBlur}
                                          value={chapterAuthor}
                                          name={`partAuthors.${index}`}
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
                                            props.errors.partAuthors &&
                                            props.errors.partAuthors[index]}
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
                          label="Título do verbete"
                          placeholder="Ex: Audibilidade"
                          onChange={props.handleChange}
                          onBlur={props.handleBlur}
                          value={props.values.entryTitle}
                          name="entryTitle"
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
                          label="Subtítulo do verbete"
                          placeholder="Se houver"
                          onChange={props.handleChange}
                          onBlur={props.handleBlur}
                          value={props.values.entryCaption}
                          name="entryCaption"
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
                      ? "Fechar informações do todo"
                      : "Abrir informações do todo"}
                  </div>

                  <Collapse in={collapse}>
                    <Grid container spacing={2} style={{ marginBottom: 5 }}>
                      <Grid item xs={12} sm={12} md={12}>
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
                            { value: "physicalPerson", name: "Pessoa física" },
                            { value: "entity", name: "Entidade" },
                            { value: "withoutAuthorship", name: "Sem autoria" },
                          ]}
                        />
                      </Grid>
                      {/* <Grid item xs={12} sm={12} md={6}>
                        <Select
                          type="text"
                          label="Tipo de responsabilidade"
                          onChange={props.handleChange}
                          onBlur={props.handleBlur}
                          value={props.values.responsabilityType}
                          name="responsabilityType"
                          errors={props.errors}
                          touched={props.touched}
                          disabled={
                            props.values.authorType === "withoutAuthorship"
                          }
                          options={[
                            { value: "author", name: "Autor" },
                            { value: "compiler", name: "Compilador" },
                            { value: "editor", name: "Editor" },
                            { value: "organizator", name: "Organizador" },
                          ]}
                        />
                      </Grid> */}
                    </Grid>
                    <Grid container spacing={2} style={{ marginBottom: 5 }}>
                      <Grid item xs={12} sm={12} md={12}>
                        <FieldArray
                          name="authorOfTheWhole"
                          render={(arrayHelpers) => (
                            <div>
                              {props.values.authorOfTheWhole &&
                              props.values.authorOfTheWhole.length > 0 ? (
                                props.values.authorOfTheWhole.map(
                                  (chapterAuthor, index) => (
                                    <FieldArrayContainer key={index}>
                                      <div
                                        style={{
                                          display: "flex",
                                          width: "100%",
                                        }}
                                      >
                                        <Input
                                          disabled={
                                            props.values.authorType ===
                                            "withoutAuthorship"
                                          }
                                          type="text"
                                          label={`Autor da obra toda ${
                                            index + 1
                                          }`}
                                          onChange={props.handleChange}
                                          placeholder="Ex: Ricardo Pizzotti"
                                          onBlur={props.handleBlur}
                                          value={chapterAuthor}
                                          name={`authorOfTheWhole.${index}`}
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
                                            props.errors.authorOfTheWhole &&
                                            props.errors.authorOfTheWhole[
                                              index
                                            ]}
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
                      <Grid item xs={12} sm={12} md={5}>
                        <Input
                          type="text"
                          label="Título da publicação no todo"
                          placeholder="Ex: Enciclopédia básica da mídia eletrônica"
                          onChange={props.handleChange}
                          onBlur={props.handleBlur}
                          value={props.values.title}
                          name="title"
                          errors={props.errors}
                          touched={props.touched}
                        />
                      </Grid>
                      <Grid item xs={12} sm={12} md={5}>
                        <Input
                          type="text"
                          label="Subtítulo da publicação no todo"
                          placeholder="Ex: Incluir subtítulo, se houver"
                          onChange={props.handleChange}
                          onBlur={props.handleBlur}
                          value={props.values.caption}
                          name="caption"
                          errors={props.errors}
                          touched={props.touched}
                        />
                      </Grid>
                      <Grid item xs={12} sm={12} md={2}>
                        <Input
                          type="text"
                          label="Nº da Edição"
                          placeholder="Ex: 2"
                          onChange={props.handleChange}
                          onBlur={props.handleBlur}
                          value={props.values.edition}
                          name="edition"
                          errors={props.errors}
                          touched={props.touched}
                        />
                      </Grid>
                    </Grid>
                    <Grid container spacing={2} style={{ marginBottom: 5 }}>
                      <Grid item xs={12} sm={12} md={4}>
                        <Input
                          type="text"
                          label="Local de publicação"
                          placeholder="Ex: São Paulo"
                          onChange={props.handleChange}
                          onBlur={props.handleBlur}
                          value={props.values.local}
                          name="local"
                          errors={props.errors}
                          touched={props.touched}
                        />
                      </Grid>
                      <Grid item xs={12} sm={12} md={4}>
                        <Input
                          type="text"
                          label="Editora"
                          placeholder="Ex:Editora Senac São Paulo"
                          onChange={props.handleChange}
                          onBlur={props.handleBlur}
                          value={props.values.publishingCompany}
                          name="publishingCompany"
                          errors={props.errors}
                          touched={props.touched}
                        />
                      </Grid>
                      <Grid item xs={12} sm={12} md={4}>
                        <Input
                          type="text"
                          label="Ano"
                          placeholder="Ex: 2003"
                          onChange={props.handleChange}
                          onBlur={props.handleBlur}
                          value={props.values.year}
                          name="year"
                          errors={props.errors}
                          touched={props.touched}
                        />
                      </Grid>
                    </Grid>
                    <Grid container spacing={2} style={{ marginBottom: 5 }}>
                      <Grid item xs={12} sm={12} md={3}>
                        <Input
                          type="text"
                          label="Página Inicial"
                          placeholder="Ex: 23"
                          onChange={props.handleChange}
                          onBlur={props.handleBlur}
                          value={props.values.initialPage}
                          name="initialPage"
                          errors={props.errors}
                          touched={props.touched}
                        />
                      </Grid>
                      <Grid item xs={12} sm={12} md={3}>
                        <Input
                          type="text"
                          label="Página Final"
                          placeholder="Ex: 25"
                          onChange={props.handleChange}
                          onBlur={props.handleBlur}
                          value={props.values.finalPage}
                          name="finalPage"
                          errors={props.errors}
                          touched={props.touched}
                        />
                      </Grid>
                      <Grid item xs={12} sm={12} md={6}>
                        <Input
                          type="text"
                          label="Série e coleção"
                          placeholder="Ex: Nome da Série ou Coleção, se houver"
                          onChange={props.handleChange}
                          onBlur={props.handleBlur}
                          value={props.values.series}
                          name="series"
                          errors={props.errors}
                          touched={props.touched}
                        />
                      </Grid>
                    </Grid>
                    <Grid container spacing={2} style={{ marginBottom: 0 }}>
                      <Grid item xs={12} sm={12} md={9}>
                        <Input
                          type="text"
                          label="Notas"
                          placeholder="Ex: Informações complementares"
                          onChange={props.handleChange}
                          onBlur={props.handleBlur}
                          value={props.values.notes}
                          name="notes"
                          errors={props.errors}
                          touched={props.touched}
                        />
                      </Grid>
                      <Grid item xs={12} sm={12} md={3}>
                        <Select
                          type="text"
                          label="Tipo e suporte"
                          onChange={props.handleChange}
                          onBlur={props.handleBlur}
                          value={props.values.typeAndSupport}
                          name="typeAndSupport"
                          errors={props.errors}
                          touched={props.touched}
                          options={[
                            { value: "cd-rom", name: "CD-ROM" },
                            { value: "online", name: "Online" },
                            { value: "printed", name: "Impresso" },
                          ]}
                        />
                      </Grid>
                    </Grid>
                    <Grid container spacing={2} style={{ marginBottom: 5 }}>
                      <Grid item xs={12} sm={12} md={9}>
                        <Input
                          disabled={props.values.typeAndSupport === "printed"}
                          type="text"
                          label="Endereço(URL)"
                          placeholder="https://viacarreira.com/"
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
                          disabled={props.values.typeAndSupport === "printed"}
                          type="date"
                          onChange={props.handleChange}
                          onBlur={props.handleBlur}
                          value={props.values.accessedAt}
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
                  citationWithAuthor={
                    props.values.local && props.values.partAuthors[0].length
                      ? state.citationWithAuthor
                      : ""
                  }
                  citation={
                    props.values.local && props.values.partAuthors[0].length
                      ? state.citation
                      : ""
                  }
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
        <h1>Referência de verbete de dicionário ou enciclopédia (ABNT)</h1>

        <p>
          A NBR 6023 explica como fazer referência de verbete de dicionário ou
          enciclopédia no tópico "parte de monografia". A estrutura é bem
          semelhante ao de capítulo de livro.
        </p>

        <p>
          O pesquisador, muitas vezes, precisa apresentar conceitos e definições
          no seu trabalho acadêmico. Por esse motivo, torna-se necessária à
          consulta aos dicionários e enciclopédias.
        </p>

        <p>
          O verbete é parte da obra dicionário ou enciclopédia, assim como
          acontece com capítulo, volume ou outro tipo de fragmento.
        </p>

        <h2>Elementos essenciais</h2>

        <ul style={{ marginLeft: 15 }}>
          <li> Autor da parte: nome do responsável pela parte; </li>
          <li> Título da parte: título do verbete ou conceito; </li>
          <li>
            {" "}
            Expressão <i>In</i>: indica "dentro de";{" "}
          </li>
          <li>
            {" "}
            Nome do autor do todo: nome de quem escreveu ou organizou a obra
            toda;{" "}
          </li>
          <li> Título do todo: título da enciclopédia; </li>
          <li> Subtítulo da publicação no todo: se houver, incluir; </li>
          <li> N° da Edição; </li>
          <li> Local de publicação; </li>
          <li> Editora: responsável pela publicação; </li>
          <li> Data: ano de publicação; </li>
          <li> Página Inicial-final: página do verbete ou conceito; </li>
          <li> Série ou Coleção: se houver, incluir; </li>
          <li>
            {" "}
            Nota: Informações complementares para melhorar a identificação do
            documento;{" "}
          </li>
          <li>
            {" "}
            Suporte: quando a consulta ocorre por CD-ROM ou online, é necessário
            descrever o suporte.{" "}
          </li>
        </ul>

        <h2>Exemplos</h2>

        <p>
          A forma de referenciar verbete depende do tipo de autor, que pode ser
          pessoa física, entidade coletiva ou sem autoria.
        </p>

        <h2>Tipo de autor > Pessoa física</h2>

        <p>
          Quando o autor é uma pessoa física, a referência contém sobrenome em
          LETRAS MAIÚSCULAS, seguido pelo prenome. Aqui, vale a mesma regra
          aplicada em livros.
        </p>

        <h2>Exemplo</h2>

        <p>
          <mark>
            FERREIRA, Aurélio Buarque de Holanda. Etnografia. <i>In</i>:
            FERREIRA, Aurélio Buarque de Holanda. . <i>In</i>:{" "}
            <b>Míniaurélio</b>: o dicionário da língua portuguesa. 7 ed.
            Curitiba: Editora Positivo, 2008. p. 383. Coordenação e edição de
            Margarida dos Anjos e Marina Baird Ferreira.
          </mark>
        </p>

        <h2>Tipo de autor > sem autoria</h2>

        <p>
          Quando não há um autor declarado na enciclopédia, inicia-se a
          referência pelo verbete. A primeira palavra é em LETRAS MAIÚSCULAS e
          nenhum termo recebe negrito.
        </p>

        <h2>Exemplo</h2>

        <p>
          <mark>
            MORFOLOGIA dos artrópodes. <i>In</i>: ENCICLOPÉDIA multimídia dos
            seres vivos. [S. l.]: Planeta DeAgostini, c1998. CD-ROM 9.
          </mark>
        </p>

        <h2>Tipo de autor > entidade coletiva</h2>

        <p>
          Quando a autoria da obra pertence a uma entidade coletiva, como ONG ou
          empresa, a escrita do nome do autor é por extenso, em ordem direta e
          com LETRAS MAIÚSCULAS. Não tem negrito em nada.
        </p>

        <p>A estrutura fica assim:</p>

        <p>
          <mark>
            AUTOR DA PARTE. Título do Verbete: subtítulo do verbete. <i>In</i>:
            AUTOR DO TODO. Título da enciclopédia: subtítulo da enciclopédia.
            Edição. Local: Editora, Ano. Página inicial - Página final. (Série).
          </mark>
        </p>

        <h2>Verbete de enciclopédia em meio eletrônico</h2>

        <p>
          O suporte deve ser descrito na última parte da referência
          bibliográfica. No caso de uma consulta online, é importante incluir
          dados de disponibilidade e data de acesso.
        </p>

        <h2>Exemplo</h2>

        <p>
          <mark>
            TRANSPLANTE de medula óssea. In : WIKIPÉDIA: a enciclopédia livre.
            São Francisco, CA: Fundação Wikimedia, 2017. Disponível em:
            https://pt.wikipedia.org/wiki/Transplante_de_ medula_%C3%B3ssea.
            Acesso em: 6 jan. 2019.
          </mark>
        </p>

        <p>
          <mark>
            ALIMENTAÇÃO saudável. <i>In</i>: WIKIPÉDIA: a enciclopédia livre.
            São Francisco, CA: Fundação Wikimedia, 2013. Disponível em:
            http://pt.wikipedia.org/wiki/Alimentacao_saudavel. Acesso em: 22
            set. 2013.
          </mark>
        </p>

        <img src={Img} alt="verbete" width="100%" />

        <h2>Como referenciar enciclopédia toda?</h2>

        <p>
          Segue a mesma regra de referência bibliográfica de livro. Exemplo:
        </p>

        <p>
          <mark>
            KOOGAN, André; HOUAISS, Antônio (ed.).{" "}
            <b>Enciclopédia e dicionário digital 98</b>. São Paulo: Delta:
            Estadão, 1998. 5 CD-ROM.
          </mark>
        </p>
      </div>
      <Footer />
    </>
  );
};

export default Entry;
