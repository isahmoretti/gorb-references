import React, { useState } from "react";

import { Formik, Field, FieldArray } from "formik";
import * as Yup from "yup";

import { Grid, Button as ButtonCore } from "@material-ui/core";

// components
import Input from "../../components/InputWrapper/Input";
import Button from "../../components/Buttons";
import Select from "../../components/InputWrapper/Select";
import Modal from "../../components/Modal";
// styles
import {
  Container,
  Card,
  Row,
  Content,
  Footer,
  Back,
  AddIcon,
  RemoveIcon,
  FieldArrayContainer,
  ErrorText,
} from "./style";

const SignupSchema = Yup.object().shape({
  authors: Yup.array().of(Yup.string().required("Obrigatório")),
  title: Yup.string().required("Obrigatório"),
  local: Yup.string().required("Obrigatório"),
  publishingCompany: Yup.string().required("Obrigatório"),
  yearOfPublication: Yup.string().required("Obrigatório"),
});

const getAuthorName = (authors) => {
  const authorsTogether = authors.map((author) => {
    const authorSplit = author.split(" ");

    const firstName = authorSplit[0];

    const lastName = authorSplit[authorSplit.length - 1].toUpperCase(); // TODO: ultimo sobrenome ou primeiro?

    return `${lastName}, ${firstName[0]}`;
  });
  return authorsTogether.join("; ");
};

const generateReference = (values) => {
  const {
    authors,
    title,
    caption,
    edition,
    local,
    publishingCompany,
    yearOfPublication,
    complementaryElements,
    othersResponsabilities,
    series,
    pagination,
    grades,
    isbn,
    volume
  } = values;

  return (
    <span>
      {" "}
      {authors.length && getAuthorName(authors)}.
      {caption ? (
        <>
          <b> {title}: </b>
          {caption}.{" "}
        </>
      ) : (
          <b>{title}. </b>
        )}
      {edition && <> {edition > 1 ? <>{edition}.</> : <>{edition}</>} ed. </>}
      {local}: {publishingCompany}, {yearOfPublication}.
      {complementaryElements && volume && <> {volume}.v,</>}
      {complementaryElements && pagination && <> {pagination} p.</>}
      {complementaryElements && series && <> ({series}).</>}
      {complementaryElements && othersResponsabilities && (
        <> {othersResponsabilities}.</>
      )}
      {complementaryElements && grades && <> {grades}.</>}
      {complementaryElements && isbn && <> {isbn}.</>}

    </span> //TODO: edition apenas em português
  );
};
const BookWithTwoOrThreeAuthors = ({ back }) => {
  const [state, setState] = useState({
    values: {},
    clearInitialValues: false,
  });

  const [openModal, setOpenModal] = useState(false);

  const handleSubmit = (values, ...rest) => {
    setState((prev) => ({
      ...prev,
      values,
      references: generateReference(values),
    }));

    setOpenModal(!openModal);
  };

  return (
    <Container>
      <Back onClick={back} />

      <Formik
        initialValues={{
          authors: [""],
          title: "",
          caption: "",
          edition: "",
          local: "",
          publishingCompany: "",
          yearOfPublication: "",
          complementaryElements: false,
          othersResponsabilities: "",
          pagination: "",
          series: "",
          grades: "",
          isbn: "",
          volume: ""
        }}
        validationSchema={SignupSchema}
        onSubmit={handleSubmit}
      >
        {(props) => (
          <form onSubmit={props.handleSubmit}>
            <Card>
              <Content>
                <Grid container spacing={2} style={{ marginBottom: 30 }}>
                  <Grid item xs={12} sm={12} md={12}>
                    <FieldArray
                      name="authors"
                      render={(arrayHelpers) => (
                        <div>
                          {props.values.authors &&
                            props.values.authors.length > 0 ? (
                              props.values.authors.map((author, index) => (
                                <FieldArrayContainer key={index}>
                                  <div style={{ display: "flex", width: "100%" }}>
                                    <Input
                                      type="text"
                                      label={`Author ${index + 1}`}
                                      onChange={props.handleChange}
                                      onBlur={props.handleBlur}
                                      value={author}
                                      name={`authors.${index}`}
                                      errors={props.errors}
                                      touched={props.touched}
                                    />
                                    <ButtonCore
                                      type="button"
                                      disabled={index === 0}
                                      onClick={() => arrayHelpers.remove(index)}
                                    >
                                      <RemoveIcon />
                                    </ButtonCore>
                                    {index ===
                                      props.values.authors.length - 1 && (
                                        <ButtonCore
                                          type="button"
                                          onClick={() => arrayHelpers.push("")}
                                        >
                                          <AddIcon />
                                        </ButtonCore>
                                      )}
                                  </div>
                                  <div style={{ width: "100%" }}>
                                    <ErrorText>
                                      {props.errors &&
                                        props.errors.authors &&
                                        props.errors.authors[index]}
                                    </ErrorText>
                                  </div>
                                </FieldArrayContainer>
                              ))
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
                <Grid container spacing={2} style={{ marginBottom: 30 }}>
                  <Grid item xs={12} sm={12} md={6}>
                    <Input
                      type="text"
                      label="Título"
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
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.caption}
                      name="caption"
                      errors={props.errors}
                      touched={props.touched}
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={2} style={{ marginBottom: 30 }}>
                  <Grid item xs={12} sm={12} md={6}>
                    <Input
                      type="text"
                      label="Local de publicação(editora)"
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
                      label="Empresa de publicação"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.publishingCompany}
                      name="publishingCompany"
                      errors={props.errors}
                      touched={props.touched}
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={2} style={{ marginBottom: 30 }}>
                  <Grid item xs={12} sm={12} md={3}>
                    <Input
                      type="text"
                      label="Edição"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.edition}
                      name="edition"
                      errors={props.errors}
                      touched={props.touched}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={3}>
                    <Input
                      type="text"
                      label="Ano de publicação"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.yearOfPublication}
                      name="yearOfPublication"
                      errors={props.errors}
                      touched={props.touched}
                    />
                  </Grid>
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
                  <Grid item xs={12} sm={12} md={3}>
                    <Input
                      disabled={!props.values.complementaryElements}
                      type="text"
                      label="Outras responsabilidades"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.othersResponsabilities}
                      name="othersResponsabilities"
                      errors={props.errors}
                      touched={props.touched}
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={2} style={{ marginBottom: 30 }}>
                  <Grid item xs={12} sm={12} md={4}>
                    <Input
                      disabled={!props.values.complementaryElements}
                      type="text"
                      label="Paginas"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.pagination}
                      name="pagination"
                      errors={props.errors}
                      touched={props.touched}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={4}>
                    <Input
                      disabled={!props.values.complementaryElements}
                      type="text"
                      label="Serie"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.series}
                      name="series"
                      errors={props.errors}
                      touched={props.touched}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={4}>
                    <Input
                      disabled={!props.values.complementaryElements}
                      type="text"
                      label="Nota"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.grades}
                      name="grades"
                      errors={props.errors}
                      touched={props.touched}
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={2} style={{ marginBottom: 30 }}>
                  <Grid item xs={12} sm={12} md={4}>
                    <Input
                      disabled={!props.values.complementaryElements}
                      type="text"
                      label="Isbn"
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
                      disabled={!props.values.complementaryElements}
                      type="text"
                      label="Volume"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.volume}
                      name="volume"
                      errors={props.errors}
                      touched={props.touched}
                    />
                  </Grid>
                </Grid>
              </Content>
              <Footer>
                <Row container className="end">
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={props.resetForm}
                  >
                    Limpar campos
                  </Button>
                  <Button type="submit" color="primary">
                    Gerar referencia
                  </Button>
                </Row>
              </Footer>
              <Modal
                isOpen={openModal}
                handleClose={() => setOpenModal(!openModal)}
                text={state.references}
              />
            </Card>
          </form>
        )}
      </Formik>
    </Container>
  );
};

export default BookWithTwoOrThreeAuthors;
