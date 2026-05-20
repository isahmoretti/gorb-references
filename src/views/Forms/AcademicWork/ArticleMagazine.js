import React, { useState } from "react";
import { useHistory } from "react-router-dom";

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

import ArrowLeft from "../../../assets/images/arrow-left.svg";
import Plus from "../../../assets/images/plus-dark.svg";
import Minus from "../../../assets/images/minus.svg";

import artigoRevista from "../../../assets/images/explicativos/academicos/artigo-de-revista.jpg";
import chamadaCitacao from "../../../assets/images/explicativos/academicos/chamadas-para-citacao-revista.jpg";

import { formatDate } from "../../../utils/formatDate";
import { formatMonosyllable } from "../../../utils/monosyllable";
import { formatAuthorName } from "../../../utils/formatAuthorName";
import { generateCitationWithAuthor } from "../../../utils/generateCitationWithAuthor";
import { generateCitationWithoutAuthor } from "../../../utils/generateCitationWithoutAuthor";

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

const firstUpperCase = (name) => {
  document.title = "Artigo de Revista: Referência ABNT";
  const firstName = name.split(" ")[0];

  return name.replace(firstName, firstName.toUpperCase());
};

const SignupSchema = Yup.object().shape({
  // authors: Yup.array().of(Yup.string().required("Obrigatório")),
  title: Yup.string().required("Obrigatório"),
  titleMagazine: Yup.string().required("Obrigatório"),
  location: Yup.string().required("Obrigatório"),
  // yearOfPublication: Yup.string().required("Obrigatório"),
  // publishingCompany: Yup.string().required("Obrigatório"),
});
const generateReference = (values) => {
  const {
    authors,
    title,
    caption,
    titleMagazine,
    location,
    publisher,
    frequency,
    edition,
    yearOfPublication,
    pageInit,
    pageFinish,
    fascicle,
    accessedAt,
    online,
    accessedAtUrl,
    url,
  } = values;

  return (
    <span>
      {" "}
      {authors.length !== 0 && formatAuthorName(authors)}
      {!authors.length ? (
        caption ? (
          <>{`${formatMonosyllable(title)}: ${caption}. `}</>
        ) : (
          `${formatMonosyllable(title)}. `
        )
      ) : caption ? (
        <>{`${title}: ${caption}. `}</>
      ) : (
        `${title}. `
      )}
      <b>{`${titleMagazine}`}</b>,&nbsp;
      {publisher ? <>{`${location}: ${publisher}, `}</> : `${location}, `}
      {edition && `ed. ${edition}, `}
      {yearOfPublication && `ano ${yearOfPublication}, `}
      {fascicle && `n. ${fascicle}, `}
      {pageInit && !pageFinish && `p. ${pageInit}. `}
      {pageInit && pageFinish && `p. ${pageInit}-${pageFinish}, `}
      {accessedAt && `${formatDate(accessedAt)}. `}
      {frequency && `${frequency}. `}
      {online &&
        accessedAtUrl &&
        url &&
        `Disponível em: ${url}. Acesso em: ${formatDate(accessedAtUrl)}. `}
    </span>
  );
};
const ArticleMagazine = ({ back }) => {
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
      ...(values.authors.length && {
        citationWithAuthor: generateCitationWithAuthor(
          values.authors,
          values.accessedAt
        ),
      }),
      ...(values.authors.length && {
        citation: generateCitationWithoutAuthor(
          values.authors,
          values.accessedAt
        ),
      }),
    }));

    setOpenModal(!openModal);
  };

  return (
    <>
      <Nav />
      <Container>
        <Back
          onClick={() =>
            history.push("/trabalhos-academicos-e-publicacoes-periodicas")
          }
          src={ArrowLeft}
        />

        <Formik
          initialValues={{
            authors: [""],
            title: "",
            caption: "",
            titleMagazine: "",
            location: "",
            publisher: "",
            frequency: "",
            edition: "",
            pageInit: "",
            pageFinish: "",
            fascicle: "",
            accessedAt: "",
            yearOfPublication: "",
            online: false,
            accessedAtUrl: "",
            url: "",
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
                    Artigo de revista
                  </p>
                  <span>
                    Inclui reportagem, notícia, entrevista, resenha, editorial e
                    outros
                  </span>
                </Title>
              </Actions>

              <Card>
                <p>
                  Preencha o formulário com informações sobre a obra consultada:
                </p>
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
                                    style={{
                                      display: "flex",
                                      width: "100%",
                                      marginBottom: 10,
                                    }}
                                  >
                                    <Input
                                      name={`authors.${index}`}
                                      label={`${index + 1}º Autor`}
                                      type="text"
                                      placeholder="Nome do autor"
                                      onChange={props.handleChange}
                                      onBlur={props.handleBlur}
                                      value={author}
                                      errors={props.errors}
                                      touched={props.touched}
                                    />
                                    <ButtonCore
                                      type="button"
                                      disabled={index === 0}
                                      onClick={() => arrayHelpers.remove(index)}
                                    >
                                      <RemoveIcon src={Minus} />
                                    </ButtonCore>
                                    {index ===
                                      props.values.authors.length - 1 && (
                                      <ButtonCore
                                        type="button"
                                        onClick={() => arrayHelpers.push("")}
                                      >
                                        <AddIcon src={Plus} />
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
                                Adicionar autor
                              </ButtonCore>
                            )}
                          </div>
                        )}
                      />
                    </Grid>
                  </Grid>
                  <Grid container spacing={2} style={{ marginBottom: 5 }}>
                    <Grid item xs={12} sm={12} md={8}>
                      <Input
                        name="title"
                        label="Título do artigo"
                        type="text"
                        placeholder="Nome do artigo"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.title}
                        errors={props.errors}
                        touched={props.touched}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={4}>
                      <Input
                        name="caption"
                        label="Subtítulo do artigo"
                        type="text"
                        placeholder="Subtítulo do artigo"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.caption}
                        errors={props.errors}
                        touched={props.touched}
                      />
                    </Grid>
                  </Grid>
                  <Grid container spacing={2} style={{ marginBottom: 5 }}>
                    <Grid item xs={12} sm={12} md={4}>
                      <Input
                        name="titleMagazine"
                        label="Titulo da revista"
                        type="text"
                        placeholder="Ex: VEJA"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.titleMagazine}
                        errors={props.errors}
                        touched={props.touched}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={4}>
                      <Input
                        name="location"
                        label="Local de publicação"
                        type="text"
                        placeholder="Ex: São Paulo"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.location}
                        errors={props.errors}
                        touched={props.touched}
                      />
                    </Grid>

                    <Grid item xs={12} sm={12} md={4}>
                      <Input
                        name="publisher"
                        label="Publicadora"
                        type="text"
                        placeholder="Ex: Abril"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.publisher}
                        errors={props.errors}
                        touched={props.touched}
                      />
                    </Grid>
                  </Grid>
                  <Grid container spacing={2} style={{ marginBottom: 5 }}>
                    <Grid item xs={12} sm={12} md={4}>
                      <Select
                        name="frequency"
                        label="Periodicidade"
                        type="text"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.frequency}
                        errors={props.errors}
                        touched={props.touched}
                        options={[
                          { value: "Semanal", name: "Semanal" },
                          { value: "Mensal", name: "Mensal" },
                          { value: "Bimestral", name: "Bimestral" },
                          { value: "Semestral", name: "Semestral" },
                          { value: "Anual", name: "Anual" },
                        ]}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={2}>
                      <Input
                        name="edition"
                        label="Edição"
                        type="text"
                        placeholder="Ex: 2373"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.edition}
                        errors={props.errors}
                        touched={props.touched}
                      />
                    </Grid>

                    <Grid item xs={12} sm={12} md={3}>
                      <Input
                        name="pageInit"
                        label="Página inicial"
                        type="text"
                        placeholder="Ex: 20"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.pageInit}
                        errors={props.errors}
                        touched={props.touched}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={3}>
                      <Input
                        name="pageFinish"
                        label="Página Final"
                        type="text"
                        placeholder="Ex: 42"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.pageFinish}
                        errors={props.errors}
                        touched={props.touched}
                      />
                    </Grid>
                  </Grid>
                  <Grid container spacing={2} style={{ marginBottom: 5 }}>
                    <Grid item xs={12} sm={12} md={4}>
                      <Input
                        name="fascicle"
                        label="Nº do Fascículo"
                        type="text"
                        placeholder="Ex: 4"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.fascicle}
                        errors={props.errors}
                        touched={props.touched}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={4}>
                      <Input
                        name="accessedAt"
                        type="date"
                        label="Data de publicação"
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
                    <Grid item xs={12} sm={12} md={4}>
                      <Input
                        name="yearOfPublication"
                        label="Ano da Revista"
                        type="text"
                        placeholder="Ex: 37"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.yearOfPublication}
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
                    <Grid item xs={12} sm={12} md={3}>
                      <Input
                        name="accessedAtUrl"
                        type="date"
                        label="Data de acesso"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        disabled={!props.values.online}
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.accessedAtUrl}
                        errors={props.errors}
                        touched={props.touched}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6}>
                      <Input
                        name="url"
                        label="Endereço (URL)"
                        type="text"
                        placeholder="https://exemplo.com/"
                        disabled={!props.values.online}
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.url}
                        errors={props.errors}
                        touched={props.touched}
                      />
                    </Grid>
                  </Grid>
                  <span>
                    Em caso de publicação em uma única página, preencher apenas
                    o item ​ <b>página inicial</b>
                  </span>
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
        <h1>Referência Bibliográfica de artigo de revista comum (ABNT)</h1>

        <p>
          Revistas que não são propriamente acadêmicas também podem ser
          referenciadas no trabalho. Em geral, elas possuem reportagens,
          notícias, entrevistas, resenhas, editoriais e outros materiais que são
          relevantes para a pesquisa.
        </p>

        <p>O formato básico para seguir:</p>

        <p>
          <mark>
            SOBRENOME, Nome. Título: Subtítulo. <b>Título da Revista</b>,
            Cidade, edição, ano, número, página inicial - página final, dia, mês
            e ano de publicação.
          </mark>
        </p>

        <h2>Elementos essenciais</h2>

        <ul style={{ marginLeft: 15 }}>
          <li>
            {" "}
            <b>Autor:</b> SOBRENOME e nome de cada responsável;{" "}
          </li>
          <li>
            {" "}
            <b>Título:</b> Título da matéria{" "}
          </li>
          <li>
            {" "}
            <b>Subtítulo:</b> incluir o subtítulo (se houver){" "}
          </li>
          <li>
            {" "}
            <b>Nome da revista:</b> título da revista em destaque{" "}
          </li>
          <li>
            {" "}
            <b>Local de publicação:</b> cidade onde a revista foi publicada;{" "}
          </li>
          <li>
            {" "}
            <b>Volume ou edição:</b> informar o número do volume ou da edição;{" "}
          </li>
          <li>
            {" "}
            <b>Numeração do fascículo:</b> preencher com o n. (se houver);{" "}
          </li>
          <li>
            {" "}
            <b>Data de publicação:</b> dia, mês e ano da publicação;{" "}
          </li>
          <li>
            {" "}
            <b>Páginas:</b> paginação correspondente.{" "}
          </li>
        </ul>

        <h2>Elementos complementares</h2>

        <ul style={{ marginLeft: 15 }}>
          <li>
            {" "}
            <b>Publicadora:</b> grupo responsável pela publicação da revista;{" "}
          </li>
          <li>
            {" "}
            <b>Periodicidade:</b> semanal, bimestral ou anual.{" "}
          </li>
        </ul>

        <img src={artigoRevista} alt="artigo-revista" width="100%" />

        <h2>E no caso de um artigo de revista online?</h2>

        <p>
          Nesse tipo de situação, não é preciso incluir informações de edição,
          numeração e página. A segunda parte da referência é composta por dados
          de disponibilidade e acesso. Assim:
        </p>

        <p>
          <mark>
            INGIZZA, Carolina; ANGRELA, Lucas; GUILHERME, Guilherme. O
            fantástico mercado dos games. <b>Revista Exame</b>, São Paulo, 13
            ago. 2020. Disponível em:
            https://exame.com/revista-exame/o-fantastico-mercado-dos-games/.
            Acesso em: 22 ago. 2020.
          </mark>
        </p>

        <h2>Como é feita a citação de revista no corpo do texto?</h2>

        <p>
          Quando há o nome do autor do artigo, o sistema de citação autor-data é
          mantido. Os formatos possíveis são:
        </p>

        <p>
          <mark>Petry (2015) [trecho citado]....</mark>
        </p>

        <p>
          <mark>Trecho citado… (PETRY, 2015)</mark>
        </p>

        <h2>Na referência:</h2>

        <p>
          <mark>
            PETRY, André. Certezas sem base. <b>Veja</b>, São Paulo, ed. 2416,
            ano 48, nº 10, p.58-59, 11 mar. 2015.
          </mark>
        </p>

        <p>
          Quando não há um autor, a chamada para citação segue sempre a entrada
          da referência.
        </p>

        <h2>Citação de matéria sem autoria</h2>

        <p>
          No caso de uma matéria sem autoria, a fonte é indicada pelo início do
          título.
        </p>

        <h2>Exemplo de citação:</h2>

        <p>
          <mark>(A POLÊMICA..., 2006, p. 17)</mark>
        </p>

        <h2>Na referência:</h2>

        <p>
          <mark>
            A POLÊMICA da dieta. <b>Revista Época</b>, São Paulo, n. 404, p. 17,
            fev. 2006.
          </mark>
        </p>

        <img src={chamadaCitacao} alt="chama-citacao" width="100%" />
      </div>
      <Footer />
    </>
  );
};

export default ArticleMagazine;
