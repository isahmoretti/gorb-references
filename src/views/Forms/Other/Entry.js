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

// utils
import { formatDate } from "../../../utils/formatDate";
import { formatAuthorName } from "../../../utils/formatAuthorName";
import { generateCitationWithAuthor } from "../../../utils/generateCitationWithAuthor";
import { generateCitationWithoutAuthor } from "../../../utils/generateCitationWithoutAuthor";

import ArrowLeft from "../../../assets/images/arrow-left.svg";
import Plus from "../../../assets/images/plus-dark.svg";
import Minus from "../../../assets/images/minus.svg";

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
  entryTitle: Yup.string().required("Obrigatório"),
  title: Yup.string().required("Obrigatório"),
  publishingCompany: Yup.string().required("Obrigatório"),
  year: Yup.string().required("Obrigatório"),
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

  const getTypeAndSupport = (type) => {
    switch (type) {
      case "cd-rom":
        return "CD-ROM";
      // case "online":
      //   return "Online";
      // case "printed":
      //   return "Impresso";
      default:
        break;
    }
  };
  const getNamesResponsible = (namesResponsible, abbreviate = false) => {
    if (responsabilityType === "author") abbreviate = false;

    if (!namesResponsible.length || namesResponsible[0] === "") return;

    if (namesResponsible.length >= 4) {
      return formatAuthorName(namesResponsible, abbreviate);
    }

    const name = formatAuthorName(namesResponsible, abbreviate);

    return `${name.slice(0, name.length - 2)}`;
  };

  const firstUpperCase = (title) => {
    if (!title) return;

    const titleSplit = title.split(" ");

    if (titleSplit.length === 1) return title;

    return `${titleSplit[0].toUpperCase()} ${titleSplit.slice(1).join(" ")}`;
  };

  const hasAuthor = !!partAuthors.length && !!partAuthors[0].length;
  const entryTitleFormatted = hasAuthor ? firstUpperCase(entryTitle) : entryTitle;
  return (
    <span>
      {hasAuthor && (entryAuthorType !== "withoutAuthorship" || entryAuthorType !== "sameAuthor") && (
        <>
          {<>{getNamesResponsible(partAuthors, abbreviate)}. </>}
          {entryResponsabilityType && (
            <>{getResposabilityTypes(entryResponsabilityType)}{responsabilityType !== 'author' && <>. </>}</>
          )}
        </>
      )}
      {entryCaption ? (
        <>
          {entryAuthorType === "withoutAuthorship" ?
            <>{entryTitleFormatted}: {entryCaption}.{" "}</>
            : <><b>{entryTitleFormatted}</b>: {entryCaption}.{" "}</>

          }
        </>
      ) : (
          <>{entryTitle && <>{entryTitleFormatted}. </>}</>
        )}

      {authorOfTheWhole && authorOfTheWhole[0] !== "" && authorType !== "withoutAuthorship" && (
        <>
          <i>In:</i> <>{formatAuthorName(authorOfTheWhole)}</>{" "}
        </>
      )}
      {responsabilityType && <>{getResposabilityTypes(responsabilityType)}. </>}
      {caption ? (
        <>
          <i>In: </i><>{authorType === 'withoutAuthorship' || !authorOfTheWhole[0].trim().length ? firstUpperCase(title): <b>{title}</b>}</>: {caption}.{" "}
        </>
      ) : (
          <><i>In: </i><>{authorType === 'withoutAuthorship' || !authorOfTheWhole[0].trim().length  ? firstUpperCase(title): <b>{title}</b>}</>. </>
        )}

      {edition && <>{edition} ed. </>}
      {local ? <>{local}: </> : <>[S. l.]: </>}
      {publishingCompany && <>{publishingCompany}, </>}
      {year && <>{year}. </>}
      {initialPage && !finalPage && `p. ${initialPage}. `}
      {initialPage && finalPage && `p. ${initialPage}-${finalPage}. `}
      {series && <>({series}). </>}
      {notes && <>{notes}. </>}
      {typeAndSupport && typeAndSupport === 'cd-rom' && <>{getTypeAndSupport(typeAndSupport)}. </>} 

      {(typeAndSupport && typeAndSupport !== 'printed') && accessedAt &&
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

  const history = useHistory()

  const getCitationWithAuthor = (authors, year) => {
    return (
      <>
        {formatAuthorName(authors)} ({year})
      </>
    );
  };

  const getCitationWithoutAuthor = (authors, year) => {
    return (
      <>
        ({authors[0].toUpperCase()}, {year})
      </>
    );
  };

  const handleSubmit = (values) => {
    setState((prev) => ({
      ...prev,
      values,
      references: generateReference(values),
      citationWithAuthor: values.local && 
      // values.entryAuthorType === "physicalPerson"
          // ? getCitationWithAuthor(values.partAuthors, values.year)
          // : 
          generateCitationWithAuthor(values.partAuthors, values.year),
      citation:
      values.local && 
      // values.entryAuthorType === "physicalPerson"
          // ? getCitationWithoutAuthor(values.partAuthors, values.year)
          // : 
          generateCitationWithoutAuthor(values.partAuthors, values.year),
    }));

    setOpenModal(!openModal);
  };

  const handleSetCollapse = () => {
    setCollapase(!collapse);
  };

  return (
    <Container>
      <Back onClick={() => history.push('/outros')} src={ArrowLeft} />
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
                Informações do Verbete
              </Title>
            </Actions>
            <Card>
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
                          {
                            value: "sameAuthor",
                            name: "Mesmo autor da enciclopédia",
                          },
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
                                        style={{ display: "flex", width: "100%" }}
                                      >
                                        <Input
                                          disabled={
                                            props.values.entryAuthorType ===
                                            "sameAuthor" ||
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
                                            onClick={() => arrayHelpers.push("")}
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
                          { value: "physicalPerson", name: "Pessoa física" },
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
                          { value: "compiler", name: "Compilador" },
                          { value: "editor", name: "Editor" },
                          { value: "organizator", name: "Organizador" },
                        ]}
                      />
                    </Grid>
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
                                        style={{ display: "flex", width: "100%" }}
                                      >
                                        <Input
                                          disabled={
                                            props.values.entryAuthorType ===
                                            "withoutAuthorship"
                                          }
                                          type="text"
                                          label={`Autor da obra toda ${index + 1}`}
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
                                            onClick={() => arrayHelpers.push("")}
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
                                            props.errors.authorOfTheWhole[index]}
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
                        disabled={props.values.typeAndSupport === 'printed'}
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
                        disabled={props.values.typeAndSupport === 'printed'}
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
                citationWithAuthor={props.values.local && props.values.partAuthors[0].length ? state.citationWithAuthor : ''}
                citation={props.values.local && props.values.partAuthors[0].length ? state.citation : ''}
              />
            </Card>
          </form>
        )}
      </Formik>
    </Container>
  );
};

export default Entry;
