import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import { Formik, FieldArray } from "formik";

import * as Yup from "yup";

import { Grid } from "@material-ui/core";

// components
import Input from "../../../components/InputWrapper/Input";
import Button from "../../../components/Buttons";
import Modal from "../../../components/Modal";
import Nav from "../../../components/Header";

// utils
import { formatDate } from "../../../utils/formatDate";
import { formatAuthorName } from "../../../utils/formatAuthorName";
import { generateCitationWithAuthor } from "../../../utils/generateCitationWithAuthor";
import { generateCitationWithoutAuthor } from "../../../utils/generateCitationWithoutAuthor";

import ArrowLeft from "../../../assets/images/arrow-left.svg";
import Plus from "../../../assets/images/plus-dark.svg";
import Minus from "../../../assets/images/minus.svg";

import { Button as ButtonCore } from "@material-ui/core";

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
  articleTitle: Yup.string().required("Obrigatório"),
  responsible: Yup.string().required("Obrigatório"),
  blogTitle: Yup.string().required("Obrigatório"),
  url: Yup.string().required("Obrigatório"),
  accessedAt: Yup.string().required("Obrigatório"),
  publicationDate: Yup.string().required("Obrigatório"),
});

const generateReference = (values) => {
  const {
    authors,
    articleTitle,
    caption,
    responsible,
    blogTitle,
    local,
    publicationDate,
    url,
    accessedAt,
  } = values;

  return (
    <span>
      {authors && <>{formatAuthorName(authors)} </>}
      {caption ? (
        <>
          {articleTitle}: {caption}.&nbsp;
        </>
      ) : (
        <>{articleTitle}. </>
      )}
      {responsible && (
        <>
          <i>ln: </i>
          {responsible}.&nbsp;
        </>
      )}
      {blogTitle && <b>{blogTitle}. </b>}
      {local ? <>{local}, </> : <i>[S.l.]. </i>}
      {publicationDate && <>{formatDate(publicationDate)}. </>}
      {accessedAt &&
        url &&
        ` Disponível em: ${url}. Acesso em: ${formatDate(accessedAt)}. `}
    </span>
  );
};

const BlogArticle = ({ back }) => {
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
        values.authors,
        values.publicationDate
      ),
      citation: generateCitationWithoutAuthor(
        values.authors,
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
          onClick={() => history.push("/meio-eletronico")}
          src={ArrowLeft}
        />

        <Formik
          initialValues={{
            authors: [""],
            articleTitle: "",
            caption: "",
            responsible: "",
            blogTitle: "",
            local: "",
            publicationDate: "",
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
                    ARTIGO DE BLOG
                  </p>
                </Title>
              </Actions>
              <Card>
                <Content>
                  <Grid container spacing={2} style={{ marginBottom: 5 }}>
                    <Grid item xs={12} sm={12} md={12}>
                      <FieldArray
                        name="authors"
                        render={(arrayHelpers) => (
                          <div>
                            {props.values.authors &&
                            props.values.authors.length > 0 ? (
                              props.values.authors.map((author, index) => (
                                <FieldArrayContainer key={index}>
                                  <div
                                    style={{ display: "flex", width: "100%" }}
                                  >
                                    <Input
                                      type="text"
                                      label={`${index + 1}º Autor`}
                                      name={`authors.${index}`}
                                      placeholder={`Ex: Abel Laerte Packer`}
                                      onChange={props.handleChange}
                                      onBlur={props.handleBlur}
                                      value={author}
                                      errors={props.errors}
                                      touched={props.touched}
                                    />
                                    {index > 0 && (
                                      <ButtonCore
                                        type="button"
                                        onClick={() => arrayHelpers.remove("")}
                                      >
                                        <RemoveIcon src={Minus} />
                                      </ButtonCore>
                                    )}
                                    <ButtonCore
                                      type="button"
                                      onClick={() => arrayHelpers.push("")}
                                    >
                                      <AddIcon src={Plus} />
                                    </ButtonCore>
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
                  <Grid container spacing={2} style={{ marginBottom: 5 }}>
                    <Grid item xs={12} sm={12} md={6}>
                      <Input
                        type="text"
                        label="Título do artigo"
                        placeholder="Ex: SciELO pós 20 Anos"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.articleTitle}
                        name="articleTitle"
                        errors={props.errors}
                        touched={props.touched}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6}>
                      <Input
                        type="text"
                        label="Subtítulo do artigo"
                        placeholder="Ex: o futuro continua aberto"
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
                    <Grid item xs={12} sm={12} md={7}>
                      <Input
                        type="text"
                        label="Responsável pelo blog"
                        placeholder="Ex: SCIELO - Scientific Electronic Library Online."
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.responsible}
                        name="responsible"
                        errors={props.errors}
                        touched={props.touched}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={5}>
                      <Input
                        type="text"
                        label="Título do blog"
                        placeholder="Ex: SciELO em Perspectiva"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.blogTitle}
                        name="blogTitle"
                        errors={props.errors}
                        touched={props.touched}
                      />
                    </Grid>
                  </Grid>
                  <Grid container spacing={2} style={{ marginBottom: 5 }}>
                    <Grid item xs={12} sm={12} md={12}>
                      <Input
                        type="text"
                        label="Local"
                        placeholder="Ex: São Paulo"
                        onChange={props.handleChange}
                        onBlur={props.local}
                        value={props.values.message}
                        name="local"
                        errors={props.errors}
                        touched={props.touched}
                      />
                    </Grid>
                  </Grid>
                  <Grid container spacing={2} style={{ marginBottom: 5 }}>
                    <Grid item xs={12} sm={12} md={3}>
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
                    <Grid item xs={12} sm={12} md={6}>
                      <Input
                        type="text"
                        label="Disponível em"
                        placeholder="Ex: https://blog.scielo.org/blog/2018/12/19/scielo-pos-20-anos-o-futuro-continua-
                                            aberto"
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
    </>
  );
};

export default BlogArticle;
