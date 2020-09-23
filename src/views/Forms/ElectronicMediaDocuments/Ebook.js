import React, { useState } from "react";

import { Formik, FieldArray } from "formik";

import * as Yup from "yup";

import { Grid, Button as ButtonCore } from "@material-ui/core";

// components
import Input from "../../../components/InputWrapper/Input";
import Select from "../../../components/InputWrapper/Select";
import Button from "../../../components/Buttons";
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
  responsibleName: Yup.array().of(Yup.string().required("Obrigatório")),
  title: Yup.string().required("Obrigatório"),
  yearOfPublication: Yup.string().required("Obrigatório"),
  local: Yup.string().required("Obrigatório"),
});

const generateReference = (values) => {
  const {
    responsabilityType,
    responsibleName,
    title,
    caption,
    local,
    publishingCompany,
    yearOfPublication,
    pages,
    series,
    colorType,
    isbn,
    doi,
    url,
    accessedAt,
  } = values;

  const getResposabilityTypes = (responsabiltyTypes) => {
    switch (responsabiltyTypes) {
      case "organizator":
        return "(org.).";
      case "compiler":
        return "(comp.).";
      case "editor":
        return "(ed.).";
      default:
        return "";
    }
  };
  const getColorFormatted = (colorType) => {
    switch (colorType) {
      case "colorfull":
        return `color`;
      case "blackAndWhite":
        return `P&B`;
      default:
        break;
    }
    return;
  };
  const getNamesResponsible = (namesResponsible) => {
    if (namesResponsible.length >= 4) {
      return formatAuthorName(namesResponsible);
    }

    const name = formatAuthorName(namesResponsible);

    return name.slice(0, name.length - 2);
  };

  return (
    <span>
      {/* precisei pegar sem o ponto */}
      <>{responsibleName.length && getNamesResponsible(responsibleName)}</>
      {responsabilityType ? (
        <> {getResposabilityTypes(responsabilityType)} </>
      ) : (
        <>. </>
      )}
      {caption ? (
        <>
          {
            <>
              <b>{title}</b>: <>{caption}. </>
            </>
          }
        </>
      ) : (
        <b>{title}. </b>
      )}

      {publishingCompany ? (
        <>
          {
            <>
              <>{local}</>: <>{publishingCompany}, </>
            </>
          }
        </>
      ) : (
        `${local}. `
      )}

      {yearOfPublication && <>{yearOfPublication}. </>}
      {pages && <>E-book ({pages}p.) </>}
      {series && <>({series}). </>}
      {colorType && <>{getColorFormatted(colorType)}. </>}
      {isbn && <> ISBN: {isbn}. </>}
      {doi && `DOI: ${doi}. `}
      {accessedAt && url && (
        <>{` Disponível em: ${url}. Acesso em: ${formatDate(accessedAt)}. `}</>
      )}
    </span>
  );
};

const Ebook = ({ back }) => {
  const [state, setState] = useState({
    values: {},
    clearInitialValues: false,
  });

  const [openModal, setOpenModal] = useState(false);

  const handleCitation = (namesResponsible, yaer) => {
    if (namesResponsible.length >= 4) {
      const name = namesResponsible[0].split(" ")[0];

      return {
        cit1: `${name} et al. (${yaer})`,
        cit2: `(${name} et al., ${yaer})`,
      };
    }

    const names = [];

    namesResponsible.forEach((name) => {
      const part = name.split(" ")[0];

      names.push(part);
    });

    return {
      cit1: `${names.join(" e ")} (${yaer})`,
      cit2: `(${names.join(" e ")}, ${yaer})`,
    };
  };

  const handleSubmit = (values) => {
    setState((prev) => ({
      ...prev,
      values,
      references: generateReference(values),
      citationWithAuthor: handleCitation(
        values.responsibleName,
        values.yearOfPublication
      ).cit1,
      citation: handleCitation(values.responsibleName, values.yearOfPublication)
        .cit2,
    }));

    setOpenModal(!openModal);
  };

  return (
    <Container>
      <Back onClick={back} src={ArrowLeft} />

      <Formik
        initialValues={{
          responsibleName: [""],
          responsabilityType: "",
          title: "",
          caption: "",
          local: "",
          publishingCompany: "",
          yearOfPublication: "",
          pages: "",
          series: "",
          colorType: "",
          isbn: "",
          doi: "",
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
                  E-book
                </p>
              </Title>
            </Actions>
            <Card>
              <Content>
                <Grid container spacing={2} style={{ marginBottom: 5 }}>
                  <Grid item xs={12} sm={12} md={12}>
                    <FieldArray
                      name="responsibleName"
                      render={(arrayHelpers) => (
                        <div>
                          {props.values.responsibleName &&
                          props.values.responsibleName.length > 0 ? (
                            props.values.responsibleName.map(
                              (chapterAuthor, index) => (
                                <FieldArrayContainer key={index}>
                                  <div
                                    style={{ display: "flex", width: "100%" }}
                                  >
                                    <Input
                                      type="text"
                                      label={`Nome do ${index + 1}º Autor`}
                                      onChange={props.handleChange}
                                      onBlur={props.handleBlur}
                                      value={chapterAuthor}
                                      name={`responsibleName.${index}`}
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
                                        props.errors.responsibleName &&
                                        props.errors.responsibleName[index]}
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
                        { value: "organizator", name: "Organizador" },
                        { value: "compiler", name: "Compilador" },
                        { value: "editor", name: "Editor" },
                      ]}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={6}>
                    <Input
                      type="text"
                      label="Título:"
                      placeholder="Ex: Noventa Anos de Rádio no Brasil"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.title}
                      name="title"
                      errors={props.errors}
                      touched={props.touched}
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={2} style={{ marginBottom: 5 }}>
                  <Grid item xs={12} sm={12} md={6}>
                    <Input
                      type="text"
                      label="Local"
                      placeholder="Ex: Uberlândia, MG"
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
                      label="Editora"
                      placeholder="Ex: Edufu"
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
                  <Grid item xs={12} sm={12} md={2}>
                    <Input
                      type="text"
                      label="Ano de publicação"
                      placeholder="Ex: 2016"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.yearOfPublication}
                      name="yearOfPublication"
                      errors={props.errors}
                      touched={props.touched}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={2}>
                    <Input
                      type="text"
                      label="N° de páginas"
                      placeholder="Ex: 211"
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
                      label="Série e Coleção"
                      placeholder="Ex: Coleção História da Comunicação Brasileira"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.series}
                      name="series"
                      errors={props.errors}
                      touched={props.touched}
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={2} style={{ marginBottom: 5 }}>
                  <Grid item xs={12} sm={12} md={4}>
                    <Select
                      label="Colorido ou Preto e Branco"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.colorType}
                      name="colorType"
                      options={[
                        { value: "colorfull", name: "Colorido" },
                        { value: "blackAndWhite", name: "Preto e branco" },
                      ]}
                      errors={props.errors}
                      touched={props.touched}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={4}>
                    <Input
                      type="text"
                      label="ISBN"
                      placeholder="Ex: 978-85-7078-4447-6"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.isbn}
                      name="isbn"
                      errors={props.errors}
                      touched={props.touched}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={4}>
                    <Input
                      type="text"
                      label="DOI"
                      placeholder="Ex: 10.7476/9788575413524"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.doi}
                      name="doi"
                      errors={props.errors}
                      touched={props.touched}
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={2} style={{ marginBottom: 5 }}>
                  <Grid item xs={12} sm={12} md={8}>
                    <Input
                      type="text"
                      label="Disponível em"
                      placeholder="Ex: https://sucupira.capes.gov.br/sucupira/"
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
  );
};

export default Ebook;
