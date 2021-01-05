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
import Footer from "../../../components/Footer";

// utils
import { formatDate } from "../../../utils/formatDate";
import { formatAuthorName } from "../../../utils/formatAuthorName";
import { generateCitationWithAuthor } from "../../../utils/generateCitationWithAuthor";
import { generateCitationWithoutAuthor } from "../../../utils/generateCitationWithoutAuthor";

import ArrowLeft from "../../../assets/images/arrow-left.svg";
import Plus from "../../../assets/images/plus-dark.svg";
import Minus from "../../../assets/images/minus.svg";
import Img from "../../../assets/images/change/Artigo de blog.jpg";

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
      <div
        className="container"
        style={{ paddingBottom: "40px", maxWidth: 830 }}
      >
        <h1>Referência bibliográfica de artigo de blog (ABNT)</h1>

        <p>
          A ABNT define regras para fazer referência bibliográfica de artigo de
          blog. Nesse caso, é muito importante identificar os nomes dos autores
          da publicação e dados sobre a plataforma onde o conteúdo está
          disponível para acesso.
        </p>

        <p>
          Quando o responsável pelo documento é uma pessoa física, a transcrição
          é feita da seguinte forma: o último sobrenome do autor em letras
          maiúsculas, seguido pelo prenome e outros elementos (que podem ser
          abreviados ou não). A separação dos autores ocorre com ponto e vírgula
          (;).
        </p>

        <h3>Elementos</h3>

        <ul>
          <li>
            {" "}
            <b>Autor:</b> nome do autor responsável pelo artigo;{" "}
          </li>
          <li>
            {" "}
            <b>Título:</b> Título do artigo{" "}
          </li>
          <li>
            {" "}
            <b>Subtítulo:</b> subtítulo do artigo (se houver);{" "}
          </li>
          <li>
            {" "}
            <b>In:</b> o termo, em itálico, sinaliza que o artigo está dentro de
            uma plataforma (no caso, o blog);{" "}
          </li>
          <li>
            {" "}
            <b>Título do blog:</b> nome do blog em negrito;{" "}
          </li>
          <li>
            {" "}
            <b>Subtítulo:</b> subtítulo do blog (se houver);{" "}
          </li>
          <li>
            {" "}
            <b>Responsável pelo blog:</b> nome da pessoa física ou entidade
            responsável pela página;{" "}
          </li>
          <li>
            {" "}
            <b>Local:</b> cidade;{" "}
          </li>
          <li>
            {" "}
            <b>Data de publicação:</b> dia, mês e ano;{" "}
          </li>
          <li>
            {" "}
            <b>Disponibilidade:</b> endereço eletrônico (URL);{" "}
          </li>
          <li>
            {" "}
            <b>Acesso:</b> data de acesso.{" "}
          </li>
        </ul>

        <h3>Formato básico</h3>

        <p>
          <mark>
            SOBRENOME, Prenome do autor. Título do artigo: subtítulo. <i>In</i>:
            Responsável pelo blog. <b>Título do blog</b>: subtítulo do blog.
            Local, dia, mês e ano. Disponível em: URL. Acesso em: dia, mês e
            ano.
          </mark>
        </p>

        <h3>Exemplos</h3>

        <p>
          <mark>
            PACKER, A. L. et al. SciELO pós 20 anos: o futuro continua aberto.
            <i>In</i>: SCIELO - Scientific Electronic Library Online.{" "}
            <b>SciELO em Perspectiva.</b> São Paulo, 19 dez. 2018. Disponível
            em:
            https://blog.scielo.org/blog/2018/12/19/scielo-pos-20-anos-o-futuro-continua-aberto/#.
            XDYD31xKiUk. Acesso em: 9 jan. 2019.
          </mark>
        </p>

        <p>
          <mark>
            MÜLLER, Vinícius. A linguagem republicana diante da crise: uma
            análise de A Revolta da Vacina, de Nicolau Sevcenko. ln: ANPOCS -
            Associação Nacional de Pós-Graduação e Pesquisa em Ciências Sociais.
            <b>Portal de Ciências Sociais Brasileiras.</b> São Paulo, 28 mar.
            2020. Disponível em:
            http://www.anpocs.com/index.php/ciencias-sociais/destaques/2314-boletim-n-3-as-ciencias-sociais-e-a-saude-coletiva-frente-a-atual-epidemia-de-ignorancia-irresponsabilidade-e-ma-fe-5.
            Acesso em: 29 out. 2020.
          </mark>
        </p>

        <img src={Img} alt="artigo-blog" width="100%" />

        <h3>E quando o autor do artigo de blog é uma entidade?</h3>

        <p>
          O GORB só gera referência de artigo de blog com autor pessoa física.
          No entanto, se a autoria do artigo for atribuída a uma entidade
          coletiva (empresa, associação ou órgão do governo), você só precisa
          alterar a parte do nome do autor, ou seja, deixar a ordem por extenso.
        </p>

        <p>Veja um exemplo:</p>

        <p>
          <mark>
            SCIELO - Scientific Electronic Library Online. Preprints são um
            problema? Cinco formas de melhorar a qualidade e credibilidade dos
            preprints. <i>In</i>: SCIELO - Scientific Electronic Library Online.{" "}
            <b>SciELO em Perspectiva.</b> São Paulo, 15 out. 2020. Disponível
            em:
            https://blog.scielo.org/blog/2020/10/15/preprints-sao-um-problema-cinco-formas-de-melhorar-a-qualidade-e-credibilidade-dos-preprints/#.X5rMoFNKjfZ.
            Acesso em: 29 out. 2020.
          </mark>
        </p>
      </div>
      <Footer />
    </>
  );
};

export default BlogArticle;
