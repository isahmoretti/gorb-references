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

//utils
import { formatDate } from "../../../utils/formatDate";
import { formatAuthorName } from "../../../utils/formatAuthorName";
import { generateCitationWithoutAuthor } from "../../../utils/generateCitationWithoutAuthor";
import { generateCitationWithAuthor } from "../../../utils/generateCitationWithAuthor";

import ArrowLeft from "../../../assets/images/arrow-left.svg";
import Plus from "../../../assets/images/plus-dark.svg";
import Minus from "../../../assets/images/minus.svg";

import AcceosEm from "../../../assets/images/explicativos/livro/um-autor/Disponível em e Acesso em.jpg";
import ChamadaCitacaoPagina from "../../../assets/images/explicativos/livro/um-autor/chamada_para_citacao_com_pagina.jpg";
import ChamadaCitacao from "../../../assets/images/explicativos/livro/um-autor/chamadas_citações_1_autor.jpg";
import Complementares from "../../../assets/images/explicativos/livro/um-autor/livro_1_autor_elementos_complementares.jpg";
import Essenciais from "../../../assets/images/explicativos/livro/um-autor/livro_1_autor_elementos_essenciais.jpg";
import Sobrenome from "../../../assets/images/explicativos/livro/um-autor/sobrenome_ano_iguais.jpg";

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
  Actions,
  Title,
} from "./style";

const SignupSchema = Yup.object().shape({
  author: Yup.string().required("Obrigatório"),
  title: Yup.string().required("Obrigatório"),
  local: Yup.string().required("Obrigatório"),
  publishingCompany: Yup.string().required("Obrigatório"),
  yearOfPublication: Yup.string().required("Obrigatório"),
});

const generateReference = (values) => {
  document.title = "Livro com Um Autor: Referência ABNT";
  const metaDesc = document.querySelector('meta[name="description"]'); if (metaDesc) metaDesc.setAttribute('content', "Gere a referência de livro com um autor no padrão ABNT NBR 6023:2018. Preencha os campos e copie a referência pronta em segundos.");
  const {
    author,
    abbreviate,
    title,
    caption,
    edition,
    local,
    publishingCompany,
    yearOfPublication,
    complementaryElements,
    series,
    pagination,
    isbn,
    volume,
    originalTitle,
    online,
    url,
    accessedAt,
    translator,
    translatorName,
  } = values;

  return (
    <span>
      <>{formatAuthorName([author], abbreviate)}</>
      {caption ? (
        <>
          <b>{title}: </b>
          <>{caption}. </>
        </>
      ) : (
        <b>{title}. </b>
      )}
      {complementaryElements && translator && translatorName.length && (
        <>Tradução: {translatorName.join("; ")}. </>
      )}
      {edition && <>{edition > 1 ? <>{edition}.</> : <>{edition}</>} ed. </>}
      {local}: <>{publishingCompany}, </>
      {volume && <> v. {volume}, </>}
      {yearOfPublication}.
      {complementaryElements && pagination && <> {pagination} p.</>}
      {complementaryElements && series && <> ({series}).</>}
      {complementaryElements && originalTitle && (
        <> Título original: {originalTitle}.</>
      )}
      {complementaryElements && isbn && <> ISBN: {isbn}.</>}
      {complementaryElements && online && url && <> Disponível em: {url}.</>}
      {complementaryElements && online && accessedAt && (
        <> Acesso em: {formatDate(accessedAt)}.</>
      )}
    </span>
  );
};

const Book = ({ back }) => {
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
        values.yearOfPublication
      ),
      citation: generateCitationWithoutAuthor(
        values.author,
        values.yearOfPublication
      ),
    }));

    setOpenModal(!openModal);
  };

  return (
    <>
      <Nav />
      <Container>
        <Back onClick={() => history.push("/livros")} src={ArrowLeft} />

        <Formik
          initialValues={{
            author: "",
            abbreviate: false,
            title: "",
            caption: "",
            edition: "",
            local: "",
            publishingCompany: "",
            yearOfPublication: "",
            complementaryElements: false,
            pagination: "",
            series: "",
            isbn: "",
            originalTitle: "",
            volume: "",
            online: false,
            url: "",
            accessedAt: "",
            translator: false,
            translatorName: [""],
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
                    Referência de livro com um autor{" "}
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
                        placeholder="Ex: Steven Johnson"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.author}
                        name="author"
                        errors={props.errors}
                        touched={props.touched}
                      />
                    </Grid>

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
                        label="Título"
                        placeholder="Ex: Cultura da Interface"
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
                    <Grid item xs={12} sm={12} md={4}>
                      <Input
                        type="text"
                        label="Subtítulo"
                        placeholder="Ex: Como o computador transforma nossa maneira de criar e se comunicar"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.caption}
                        name="caption"
                        errors={props.errors}
                        touched={props.touched}
                      />
                    </Grid>

                    <Grid item xs={12} sm={12} md={4}>
                      <Input
                        type="text"
                        label="Local de publicação"
                        placeholder="Ex: Rio de Janeiro"
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
                        label="Empresa de publicação (editora)"
                        placeholder="Ex: Zahar"
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
                    <Grid item xs={12} sm={12} md={3}>
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
                    <Grid item xs={12} sm={12} md={3}>
                      <Input
                        type="text"
                        label="Ano de publicação"
                        placeholder="Ex: 2001"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.yearOfPublication}
                        name="yearOfPublication"
                        errors={props.errors}
                        touched={props.touched}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={3}>
                      <Input
                        type="text"
                        label="Volume"
                        placeholder="Ex: 3"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.volume}
                        name="volume"
                        errors={props.errors}
                        touched={props.touched}
                      />
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      sm={12}
                      md={3}
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "flex-end",
                      }}
                    >
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
                  </Grid>
                  <Grid container spacing={2} style={{ marginBottom: 5 }}>
                    <Grid
                      item
                      xs={12}
                      sm={12}
                      md={3}
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "flex-end",
                      }}
                    >
                      <Input
                        type="text"
                        label="Páginas"
                        placeholder="Ex: 223"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.pagination}
                        name="pagination"
                        errors={props.errors}
                        touched={props.touched}
                        disabled={!props.values.complementaryElements}
                      />
                    </Grid>

                    <Grid
                      item
                      xs={12}
                      sm={12}
                      md={3}
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "flex-end",
                      }}
                    >
                      <Input
                        disabled={!props.values.complementaryElements}
                        type="text"
                        label="Séries e coleções"
                        placeholder="Série ou coleção"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.series}
                        name="series"
                        errors={props.errors}
                        touched={props.touched}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={3}>
                      <Input
                        disabled={!props.values.complementaryElements}
                        type="text"
                        label="ISBN"
                        placeholder="Ex: 9788571195898"
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
                    <Grid
                      item
                      xs={12}
                      sm={12}
                      md={3}
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "flex-end",
                      }}
                    >
                      <Select
                        disabled={!props.values.complementaryElements}
                        type="text"
                        label="Tradutor"
                        placeholder="Ex: Maria Luiza X. de A. Borges"
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
                    <Grid item xs={12} sm={12} md={12}>
                      <FieldArray
                        name="translatorName"
                        render={(arrayHelpers) => (
                          <div>
                            {props.values.translatorName &&
                            props.values.translatorName.length > 0 ? (
                              props.values.translatorName.map(
                                (author, index) => (
                                  <FieldArrayContainer key={index}>
                                    <div
                                      style={{
                                        display: "flex",
                                        width: "100%",
                                        marginBottom: 10,
                                      }}
                                    >
                                      <Input
                                        disabled={
                                          !props.values.complementaryElements ||
                                          !props.values.translator
                                        }
                                        type="text"
                                        label={`Tradutor ${index + 1}`}
                                        onChange={props.handleChange}
                                        onBlur={props.handleBlur}
                                        value={author}
                                        name={`translatorName.${index}`}
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
                                      {index ===
                                        props.values.translatorName.length -
                                          1 &&
                                        props.values.complementaryElements &&
                                        props.values.translator && (
                                          <ButtonCore
                                            type="button"
                                            onClick={() =>
                                              arrayHelpers.push("")
                                            }
                                          >
                                            <AddIcon src={Plus} />
                                          </ButtonCore>
                                        )}
                                    </div>
                                  </FieldArrayContainer>
                                )
                              )
                            ) : (
                              <ButtonCore
                                type="button"
                                onClick={() => arrayHelpers.push("")}
                              >
                                Adicione um tradutor
                              </ButtonCore>
                            )}
                          </div>
                        )}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={8}>
                      <Input
                        disabled={!props.values.complementaryElements}
                        type="text"
                        label="Título original"
                        placeholder="Ex: Interface Culture: How New Technology Transforms the Way We Create and Communicate"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.originalTitle}
                        name="originalTitle"
                        errors={props.errors}
                        touched={props.touched}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={4}>
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
                  </Grid>
                  <Grid container spacing={2} style={{ marginBottom: 5 }}>
                    <Grid item xs={12} sm={12} md={8}>
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
                    <Grid item xs={12} sm={12} md={4}>
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
        <h1>Referência de livro com um autor (ABNT)</h1>

        <p>
          A ABNT lista as normas para referenciar livros na seção de "Monografia
          no todo" e "Monografia no todo em meio eletrônico". As recomendações
          também servem para outros documentos, como manuais, guias e catálogos.
        </p>

        <p>
          Os elementos essenciais, definidos pela NBR 6023, são aqueles que não
          podem faltar na referência de livro, ou seja, são considerados
          obrigatórios. Já os elementos complementares são opcionais, mas quando
          adicionados melhoram a identificação do documento.
        </p>

        <h2>Elementos essenciais para referência de livro</h2>

        <p>
          Na referência de livro com um autor, os elementos obrigatórios são:
        </p>

        <ul style={{ marginLeft: 15 }}>
          <li>
            {" "}
            <b>Autor:</b> SOBRENOME, Nome.{" "}
          </li>
          <li>
            {" "}
            <b>Título:</b> Título em negrito.{" "}
          </li>
          <li>
            {" "}
            <b>Subtítulo (se houver):</b> Subtítulo sem negrito.{" "}
          </li>
          <li>
            {" "}
            <b>Edição (se houver):</b> Algarismos arábicos seguidos pela
            abreviatura (17. ed.){" "}
          </li>
          <li>
            {" "}
            <b>Local:</b> cidade da editora{" "}
          </li>
          <li>
            {" "}
            <b>Editora:</b> nome da empresa publicadora{" "}
          </li>
          <li>
            {" "}
            <b>Data:</b> Ano de publicação do livro.{" "}
          </li>
        </ul>

        <p>Esquema para referência de livro com um autor:</p>

        <p>
          <mark>
            SOBRENOME, Primeiro Nome. <b>Título</b>: Subtítulo. Local: Editora,
            ano.
          </mark>
        </p>

        <img loading="lazy" src={Essenciais} alt="elementos-essenciais" width="100%" />

        <h2>Elementos complementares</h2>

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
            <b>Número de páginas:</b> quantidade de páginas do documento em
            algarismos arábicos, seguido pela abreviatura [p.]{" "}
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
            <b>ISBN:</b> Número Padrão Internacional de livro.{" "}
          </li>
        </ul>

        <img loading="lazy" src={Complementares} alt="elementos-complementares" width="100%" />

        <p>
          Um livro com registro internacional (ISBN) transmite autoridade e
          credibilidade, por isso pode ser referenciado nos trabalhos
          acadêmicos. Esse número existe para facilitar a identificação de
          informações essenciais da obra, como título, autor, edição e editora.
        </p>

        <p>
          Quando um documento não é impresso, ou seja, é consultado pela
          internet, acrescenta-se informações sobre disponibilidade e acesso na
          referência bibliográfica.
        </p>

        <img loading="lazy" src={AcceosEm} alt="acessoem" width="100%" />

        <h2>Mais exemplos</h2>

        <p>
          <mark>
            BAPTISTA, Dulce. <b>Bibliotecária pós-moderna.</b> Brasília:
            Thesaurus, 2011. 144 p. ISBN 978-85-64494-44-2.
          </mark>
        </p>

        <p>
          <mark>
            CHEVALIER, Jean; GHEERBRANT, Alain. <b>Dicionário de símbolos.</b>{" "}
            3. ed. Rio de Janeiro: J. Olympio, 1990.
          </mark>
        </p>

        <p>
          <mark>
            BAUMAN, Zygmunt. <b>Globalização:</b> as conseqüências humanas. Rio
            de Janeiro: Jorge Zahar, 1999.
          </mark>
        </p>

        <h2>Chamadas para citações</h2>

        <p>
          Ao escrever o texto acadêmico, é necessário se preocupar com o uso das
          chamadas para citações, que adotam o sistema autor-data.
        </p>

        <p>
          Ao fazer uma citação direta ou indireta, a recomendação é incluir o
          sobrenome do responsável - em letras minúsculas dentro da sentença e
          em letras maiúsculas quando estiver entre parênteses.
        </p>

        <img loading="lazy" src={ChamadaCitacao} alt="chamada-citacoes" width="100%" />

        <p>
          Quando há coincidência de sobrenomes de autores diferentes e
          publicações no mesmo ano, é permitido o uso das iniciais para
          diferenciação.
        </p>

        <img loading="lazy" src={Sobrenome} alt="sobrenome" width="100%" />

        <h2>Número da página na citação</h2>

        <p>
          O número da página onde se encontra o trecho consultado pode ser
          inserido na chamada de citação. Esse tipo de informação é opcional,
          mas muito recomendado para especificar o local nativo do conteúdo. O
          formato fica assim:
        </p>

        <p>
          <mark>Sobrenome (ano, número da página)</mark>
        </p>

        <p>
          <mark>ou</mark>
        </p>

        <p>
          <mark>(SOBRENOME, ano, número da página)</mark>
        </p>
      </div>
      <Footer />
    </>
  );
};

export default Book;
